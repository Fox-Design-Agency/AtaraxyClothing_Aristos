const variants = require("../../../expansion/plugins/printful/product_variants");

// GET product model
const findProductWithParam = require("../../../expansion/upgrade/products/models/queries/product/FindProductWithParam");

// GET page model
const findPageWithParam = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");

//GET media model
const findAllMedia = require("../../../important/admin/adminModels/queries/media/FindAllMedia");

//GET orders model
const createOrder = require("../../../expansion/upgrade/products/models/queries/orders/CreateOrder");
const findOrderByID = require("../../../expansion/upgrade/products/models/queries/orders/FindOneOrderByID");
module.exports = {
  getAddToCart(req, res, next) {
    let slug = req.params.product;
    findProductWithParam({ slug: slug }).then(product => {
      if (typeof req.session.cart == "undefined") {
        req.session.cart = [];
        req.session.cart.push({
          title: slug,
          qty: 1,
          price: parseFloat(product.price).toFixed(2),
          image:
            "/images/product_images/" + product[0]._id + "/" + product[0].image,
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
  },

  postAddToCart(req, res, next) {
    let slug = req.params.product;

    findProductWithParam({ slug: slug }).then(product => {

      let variant = variants(
        product[0].productType,
        req.body.color,
        req.body.size
      );

      if (typeof req.session.cart == "undefined") {
        req.session.cart = [];
        req.session.cart.push({
          title: slug,
          qty: 1,
          price: parseFloat(product[0].price).toFixed(2),
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
            price: parseFloat(product[0].price).toFixed(2),
            image: "/product_images/" + product[0]._id + "/" + product[0].image,
            description: "",
            author: "",
            keywords: "",
            fileId: product[0].printfile,
            variant: variant
          });
        }
      }

      req.flash("success_msg", "Product added!");
      res.redirect("/cart/checkout");
    });
  },

  checkout(req, res, next) {
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
  },
  updateProduct(req, res, next) {
    let slug = req.params.product;
    let cart = req.session.cart;
    let action = req.query.action;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].title == slug) {
        switch (action) {
          case "add":
            cart[i].qty++;
            delete req.session.shipping;
            break;
          case "remove":
            cart[i].qty--;
            if (cart[i].qty < 1) {
              cart.splice(i, 1);
              if (cart.length === 0) {
                delete cart;
              }
            }
            delete req.session.shipping;
            break;
          case "clear":
            cart.splice(i, 1);
            if (cart.length === 0) {
              delete cart;
            }
            delete req.session.shipping;
            break;
          default:
            console.log("update problem");
            break;
        }
      }
    }
    req.flash("success_msg", "Cart updated!");
    res.redirect("/cart/checkout");
  },
  clearCart(req, res, next) {
    delete req.session.cart;
    delete req.session.shipping;
    req.flash("success_msg", "Cart cleared!");
    res.redirect("/cart/checkout");
  }
};
