const signUpRoute = require("./singup/signUpRoute");
const productsRoute = require("./products/products");

const router = {
  "/signup": signUpRoute,
  "/products": productsRoute,
  default: signUpRoute
};

module.exports = router;
