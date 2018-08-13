// const getOrderCount = require("./models/queries/orders/CountOrders");
const getProductCount = require("./models/queries/product/CountProducts");
const getProductCatsCount = require("./models/queries/productCategory/CountProductCategories");
// const getCouponCount = require("./models/queries/coupons/");
module.exports = {
  name: "Products",
  async theFunction(name, blogCount) {
    let orderCount, productCount, productCatsCount, couponCount;
    await Promise.all([getProductCount(), getProductCatsCount()]).then(result => {
      orderCount = "-";
      productCount = result[0];
      productCatsCount = result[1];
      couponCount = "-";
    });
    return `
    <div class="admin-blocks">
    <a href="/admin/products">
        <h5>
            ${name}
        </h5>
        <h4>
            orders:
        </h4>
        <h5>
            ${orderCount}
        </h5>
        <h4>
            products:
        </h4>
        <h5>
            ${productCount}
        </h5>
        <h4>
            product categories:
        </h4>
        <h5>
            ${productCatsCount}
        </h5>
        <h4>
            active coupons:
        </h4>
        <h5>
            ${couponCount}
        </h5>
        </a>
    </div>
        `;
  }
};

