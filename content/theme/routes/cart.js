const express = require("express");
const paypal = require("paypal-rest-sdk");
const request = require("request");
const rp = require("request-promise-native");
const router = express.Router();
const variants = require("../../../expansion/plugins/printful/product_variants");
const config = require("../../../important/AppStuff/config/config");
// GET product model
const findProductWithParam = require("../../../expansion/upgrade/products/models/queries/product/FindProductWithParam");

// GET page model
const PfindPageWithParam = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");

//GET media model
const findAllMedia = require("../../../important/admin/adminModels/queries/media/FindAllMedia");

//GET orders model
const createOrder = require("../../../expansion/upgrade/products/models/queries/orders/CreateOrder");
const findOrderByID = require("../../../expansion/upgrade/products/models/queries/orders/FindOneOrderByID");

//Configure Paypal (remove if not needed)
paypal.configure({
  mode: "live", //sandbox or live
  client_id: config.read("paypalSandboxClient_id"),
  client_secret: config.read("paypalSandboxSecret")
});

/*
* GET  add product to cart
*/
router.get("/add/:product", function(req, res) {
  let slug = req.params.product;

  findProductWithParam({ slug: slug }).then(product => {
    
    if (typeof req.session.cart == "undefined") {
      req.session.cart = [];
      req.session.cart.push({
        title: slug,
        qty: 1,
        price: parseFloat(product.price).toFixed(2),
        image: "/images/product_images/" + product[0]._id + "/" + product[0].image,
        description: "",
        author: "",
        keywords: ""
      });
    } else {
      let cart = req.session.cart;
      let newItem = true;

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].title == slug) {
          cart[i].qty++;
          newItem = false;
          break;
        }
      }

      if (newItem) {
        cart.push({
          title: slug,
          qty: 1,
          price: parseFloat(product.price).toFixed(2),
          image: "/product_images/" + product._id + "/" + product.image,
          description: "",
          author: "",
          keywords: ""
        });
      }
    }
    req.flash("success_msg", "Product added!");
    res.redirect("/cart/checkout");
  });
});
/*
* POST  add product to cart
*/
router.post("/add/:product", async function(req, res) {
  let slug = req.params.product;

  findProductWithParam({ slug: slug }).then(product => {
    let variant = variants(product.productType, req.body.color, req.body.size);

    if (typeof req.session.cart == "undefined") {
      req.session.cart = [];
      req.session.cart.push({
        title: slug,
        qty: 1,
        price: parseFloat(product.price).toFixed(2),
        image: "/product_images/" + product[0]._id + "/" + product[0].image,
        description: "",
        author: "",
        keywords: "",
        fileId: product.printfile,
        variant: variant
      });
    } else {
      let cart = req.session.cart;
      let newItem = true;

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].title == slug) {
          cart[i].qty++;
          newItem = false;
          break;
        }
      }

      if (newItem) {
        cart.push({
          title: slug,
          qty: 1,
          price: parseFloat(product.price).toFixed(2),
          image: "/product_images/" + product._id + "/" + product.image,
          description: "",
          author: "",
          keywords: "",
          fileId: product.printfile,
          variant: variant
        });
      }
    }

    req.flash("success_msg", "Product added!");
    res.redirect("/cart/checkout");
  });
});

/*
* GET  checkout product
*/
router.get("/checkout", function(req, res) {
  if (req.session.cart && req.session.cart.length == 0) {
    delete req.session.cart;
    delete req.session.shipping;
    res.redirect("/cart/checkout");
  } else {
    let total = 0;
    if (req.session.cart) {
      req.session.cart.forEach(function(product) {
        let sub = parseFloat(product.qty * product.price).toFixed(2);
        total += +sub;
      });
    }
    let orderid = "";
    if (req.query.orderid) {
      orderid = req.query.orderid;
    }
    let shipping =
      req.session.shipping !== undefined ? req.session.shipping : 0;
    total += +shipping;
    res.render("cart_checkout/checkout", {
      title: "checkout",
      shipping: parseFloat(shipping).toFixed(2),
      total: parseFloat(total).toFixed(2),
      cart: req.session.cart,
      description: "",
      author: "",
      keywords: "",
      orderid: orderid
    });
  }
});

/*
* GET  update product
*/
router.get("/update/:product", function(req, res) {
  let slug = req.params.product;
  let cart = req.session.cart;
  let action = req.query.action;
  for (let i = 0; i < cart.length; i++) {
    switch (action) {
      case "add":
        cart[i].qty++;
        delete req.session.shipping;
        break;
      case "remove":
        cart[i].qty--;
        if (cart[i].qty < 1) {
          cart.splice(i, 1);
          if (cart.length == 0) {
            delete cart;
          }
        }
        delete req.session.shipping;
        break;
      case "clear":
        cart.splice(i, 1);
        if (cart.length == 0) {
          delete cart;
        }
        delete req.session.shipping;
        break;
      default:
        console.log("update problem");
        break;
    }
    break;
  }
  req.flash("success_msg", "Cart updated!");
  res.redirect("/cart/checkout");
});

/*
* GET  clear cart
*/
router.get("/clear", function(req, res) {
  delete req.session.cart;
  delete req.session.shipping;
  req.flash("success_msg", "Cart cleared!");
  res.redirect("/cart/checkout");
});

/*
* POST pay
*/
router.get("/pay/:orderid", (req, res) => {
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
  Order.findById(req.params.orderid, function(err, order) {
    let itemsOrder = [];
    req.session.cart.map((x, i, arr) => {
      itemsOrder.push({
        quantity: x.qty,
        variant_id: x.variant,
        files: [{ id: x.fileId }]
      });
    });
    if (err) {
      console.log(err);
    }
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
});

/*
* Paypal redirect from payment confirmation
*/
router.get("/success/:order", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  Order.findById(req.params.order, function(err, order) {
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
        Page.findOne({ slug: "home" }, function(err, page) {
          Media.find({}, function(err, media) {
            if (err) {
              console.log(err);
            }
            res.render("index", {
              title: page.title,
              content: page.content,
              keywords: page.keywords,
              description: page.description,
              author: page.author,
              media: media
            });
          });
        });
      }
    });
  });
});
/*
* GET paypal cancel
*/
router.get("/cancel", (req, res) => {
  res.send("cancel");
});

/*
* POST shipping information
*/
router.post("/shipping-information", async (req, res) => {
  let cartItems = [];
  req.session.cart.map((x, i, arr) => {
    cartItems.push({ quantity: x.qty, variant_id: x.variant });
  });
  let address = req.body.streetaddress;
  let zip = req.body.zipCode;
  let state = req.body.state;
  let city = req.body.city;
  let name = req.body.firstname + " " + req.body.lastname;
  let order = new Order({
    total: "0",
    name: name,
    address: address,
    city: city,
    state: state,
    zip: zip,
    userid: 1,
    status: "initial",
    shipping: "0"
  });
  await rp({
    method: "POST",
    url: "https://api.printful.com/shipping/rates",
    headers: {
      Authorization: config.printfulKey
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
    order.shipping = res.result[0].rate;
    return (req.session.shipping = res.result[0].rate);
  });

  order.save(function(err) {
    if (err) {
      return console.log(err);
    }
  });
  res.redirect("/cart/checkout?orderid=" + order._id);
});

//Exports
module.exports = router;
