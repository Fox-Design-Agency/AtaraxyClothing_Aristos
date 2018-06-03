

module.exports = app => {
    let mkdirp = require("mkdirp");
    //Need to check for upgrade folder and if true then =>
    /*
    * This is theme specific, needs to move!!
    */
    // Get product category model
    let ProductCategory = require("../upgrade/products/models/productCategory");
    // Get blog category model
    let BlogCategory = require("../upgrade/blog/models/blogCategory");
    //Get media category model
    let MediaCategory = require("../../includes/models/mediaCategory")
    //update to product category
    // Get all product categories to pass to header.ejs
    ProductCategory.find(function (err, categories) {
        if (err) {
            console.log(err)
        } else {
            app.locals.productcategories = categories;
        }
    })
    BlogCategory.find(function (err, categories) {
        if (err) {
            console.log(err)
        } else {
            app.locals.blogcategories = categories;
        }
    })
    MediaCategory.findOne({ title: "main_slider" }, function (err, category) {
        if (!category) {
            let category = new MediaCategory({
                title: "main_slider",
                slug: "main-slider"
            });
            mkdirp("content/public/images/main_slider", function (err) {
                if (err) { console.log(err) }
            })
            category.save(function (err) {
                if (err) { return console.log(err) };
            })
        }

    })
    MediaCategory.findOne({ title: "product_categories" }, function (err, category) {
        if (!category) {
            let category = new MediaCategory({
                title: "product_categories",
                slug: "product-categories"
            });
            mkdirp("content/public/images/product_categories", function (err) {
                if (err) { console.log(err) }
            })
            category.save(function (err) {
                if (err) { return console.log(err) };
            })
        }
    })
    MediaCategory.findOne({ title: "bottom_img" }, function (err, category) {
        if (!category) {
            let category = new MediaCategory({
                title: "bottom_img",
                slug: "bottom-img"
            });
            mkdirp("content/public/images/bottom_img", function (err) {
                if (err) { console.log(err) }
            })
            category.save(function (err) {
                if (err) { return console.log(err) };
            })
        }

    })
    MediaCategory.findOne({ title: "team" }, function (err, category) {
        if (!category) {
            let category = new MediaCategory({
                title: "team",
                slug: "team"
            });
            mkdirp("content/public/images/team", function (err) {
                if (err) { console.log(err) }
            })
            category.save(function (err) {
                if (err) { return console.log(err) };
            })
        }
    })
    /*
    * End of theme specific items
    */
    const pages = require("./routes/pages")
    const products = require("./routes/products")
    const cart = require("./routes/cart")
    const users = require("./routes/users")
    const blogs = require("./routes/blogs")
    const about = require("./routes/about")
    const contact = require("./routes/contact")

  

    app.use("/about", about)
    app.use("/contact", contact)
    app.use("/blog", blogs)
    app.use("/store", products)
    app.use("/products", products)
    app.use("/cart", cart)
    app.use("/users", users)
    app.use("/", pages)

}