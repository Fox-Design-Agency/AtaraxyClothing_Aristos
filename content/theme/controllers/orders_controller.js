const request = require("request");
const rp = require("request-promise-native");
const config = require("../../../important/AppStuff/config/config");
const paypal = require("paypal-rest-sdk");
//page queries
const findPageWithParams = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");
// media queries
const findAllMedia = require("../../../important/admin/adminModels/queries/media/FindAllMedia");
// order queries
const createOrder = require("../../../expansion/upgrade/products/models/queries/orders/CreateOrder");
const updateOrder = require("../../../expansion/upgrade/products/models/queries/orders/EditOrder");
const findOrderByID = require("../../../expansion/upgrade/products/models/queries/orders/FindOneOrderByID");

//Configure Paypal (remove if not needed)
paypal.configure({
  mode: "live", //sandbox or live
  client_id: config.read("paypalSandboxClient_id"),
  client_secret: config.read("paypalSandboxSecret")
});
module.exports = {
  async shippingInformation(req, res, next) {
    let cartItems = [];
    req.session.cart.map((x, i, arr) => {
      cartItems.push({ quantity: x.qty, variant_id: x.variant });
    });
    let address = req.body.streetaddress;
    let zip = req.body.zipCode;
    let state = req.body.state;
    let city = req.body.city;
    let name = req.body.firstname + " " + req.body.lastname;
    let orderid = "";
    createOrder({
      total: "0",
      name: name,
      address: address,
      city: city,
      state: state,
      zip: zip,
      userid: 1,
      status: "initial",
      shipping: "0"
    }).then(order => {
      orderid = order._id;
    });
    await rp({
      method: "POST",
      url: "https://api.printful.com/shipping/rates",
      headers: {
        Authorization: config.read("printfulKey")
      },
      body: {
        recipient: {
          address1: address,
          city: city,
          country_code: "US",
          state_code: state,
          zip: zip
        },
        items: cartItems
      },
      json: true
    }).then(res => {
      updateOrder({ shipping: res.result[0].rate });
      return (req.session.shipping = res.result[0].rate);
    });
    res.redirect("/cart/checkout?orderid=" + orderid);
  },
  postPay(req, res, next) {
    let total = req.session.cart
      .map((x, i, arr) => {
        return x.price * x.qty;
      })
      .reduce((p, x) => p + x, 0);
    let items = req.session.cart.map((x, i, arr) => {
      return {
        name: x.title,
        sku: "001",
        price: x.price,
        currency: "USD",
        quantity: x.qty
      };
    });
    findOrderByID(req.params.orderid).then(order => {
      let itemsOrder = [];
      req.session.cart.map((x, i, arr) => {
        itemsOrder.push({
          quantity: x.qty,
          variant_id: x.variant,
          files: [{ id: x.fileId }]
        });
      });
      order.total = total + +order.shipping;
      order.status = "pending";
      order.items = itemsOrder;

      order.save(function(err) {
        if (err) {
          return console.log(err);
        }
        var create_payment_json = {
          intent: "sale",
          payer: {
            payment_method: "paypal"
          },
          redirect_urls: {
            return_url: "http://localhost:3000/cart/success/" + order._id,
            cancel_url: "http://localhost:3000/cart/cancel"
          },
          transactions: [
            {
              amount: {
                currency: "USD",
                total: +order.total,
                details: {
                  subtotal: +total,
                  shipping: +order.shipping,
                  tax: 0
                }
              },
              item_list: {
                items: items
              },
              description: "This is the payment description."
            }
          ]
        };

        delete req.session.cart;
        paypal.payment.create(create_payment_json, function(error, payment) {
          if (error) {
            console.log(error.response.details);
            throw error;
          } else {
            for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === "approval_url") {
                res.redirect(payment.links[i].href);
              }
            }
          }
        });
      });
    });
  },
  paypallSuccess(req, res, next) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    findOrderByID(req.params.order).then(order => {
      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: +order.total
            }
          }
        ]
      };

      paypal.payment.execute(paymentId, execute_payment_json, async function(
        error,
        payment
      ) {
        if (error) {
          console.log(error.response.details);
          throw error;
        } else {
          await rp({
            method: "POST",
            url: "https://api.printful.com/orders",
            headers: {
              Accept: "application/json",
              Authorization: config.printfulKey
            },
            body: {
              shipping: "DHLGLOBALMAIL_PARCELSEXPEDITEDDOMESTIC",
              recipient: {
                name: order.name,
                address1: order.address,
                city: order.city,
                country_code: "US",
                state_code: order.state,
                zip: order.zip
              },
              items: order.items,
              costs: {
                subtotal: +order.total,
                discount: "",
                shipping: +order.shipping,
                tax: "",
                total: +order.total
              }
            },
            json: true
          });
          const findpage = findPageWithParams({ slug: "home" });
          const allMedia = findAllMedia();
          Promise.all([findpage, allMedia]).then(result => {
            res.render("index", {
              title: result[0].title,
              content: result[0].content,
              keywords: result[0].keywords,
              description: presult[0].description,
              author: result[0].author,
              media: result[1]
            });
          });
        }
      });
    });
  },
  paypallCancel(req, res, next) {
    res.send("cancel");
  }
};
