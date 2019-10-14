const fs = require("fs");
const path = require("path");

const search = require("../services/products-services");
const products = path.join(__dirname, "../db/all-products.json");

const getProducts = (req, res, next) => {
  const id = req.params.id;
  const ids = req.query.ids;
  const category = req.query.category;

  fs.readFile(products, "utf8", (err, data) => {
    const parsedData = JSON.parse(data);

    if (err) throw err;

    if (id) {
      search.byID(parsedData, id, res);
    } else if (ids) {
      search.byIDs(parsedData, ids, res);
    } else if (category) {
      search.byCategory(parsedData, category, res);
    } else {
      search.byAll(parsedData, res);
    }
  });
};

module.exports = getProducts;
