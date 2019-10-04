const fs = require("fs");
const path = require("path");
const helper = require("../../helpers/answer");

const getProducts = (request, response) => {
  const productsDbPath = path.join(
    __dirname,
    "../../db/products/all-products.json"
  );
  const myURL = new URL(`localhost:8080${request.url}`);
  const products = request.url === "/products";
  const id = Number(request.url.split("/")[2]);
  const ids = myURL.searchParams.get("ids");
  const category = myURL.searchParams.get("category");

  fs.readFile(productsDbPath, "utf8", (error, contents) => {
    const db = JSON.parse(contents);

    if (error) {
      console.log("Error -->" + error);
      throw error;
    }

    response.writeHead(200, {
      "Content-Type": "application/json"
    });

    if (products) {
      response.end(contents);
    }

    if (id) {
      const findById = db.filter(
        el => el.id === Number(request.url.split("/")[2])
      );
      response.end(helper.answer(findById));
    }

    if (ids) {
      const idsArray = myURL.searchParams
        .get("ids")
        .split(",");
      const filterByIds = db.filter(el =>
        idsArray.includes(String(el.id))
      );

      response.end(helper.answer(filterByIds));
    }

    if (category) {
      const categoryString = String(
        myURL.searchParams.get("category")
      );
      const data = db.filter(el =>
        el.categories.includes(categoryString)
      );

      data.length === 0
        ? response.end("can't find anything")
        : response.end(helper.answer(data));
    }
  });
};

module.exports = getProducts;
