const url = require("url");
const fs = require("fs");
const path = require("path");
const dbProducts = require("./../../db/products/all-products.json");

const filePath = path.join(
  __dirname,
  "../../../",
  "src",
  "db",
  "products",
  "all-products.json"
);

const json = fs.statSync(filePath);

const getProducts = (request, response) => {
  const myURL = new URL(`localhost:8080${request.url}`);

  if (request.url === "/products") {
    response.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": json.size
    });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  }

  if (Number(request.url.split("/")[2])) {
    const findById = dbProducts.filter(
      el => el.id === Number(request.url.split("/")[2])
    );
    const answer = JSON.stringify({
      status: "success",
      user: findById
    });
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(answer);
  }

  if (myURL.searchParams.get("ids")) {
    let ids = myURL.searchParams.get("ids").split(",");
    let iterator = ids[Symbol.iterator]();
    let arr = [];

    while (true) {
      let result = iterator.next();
      if (result.done) break;
      let filteredItems = Object.assign(
        {},
        ...dbProducts.filter(el => el.id.toString() === result.value)
      );
      arr.push(filteredItems);
    }
    const answer = JSON.stringify({
      status: "success",
      products: arr
    });
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(answer);
  }
  if (myURL.searchParams.get("category")) {
    const category = myURL.searchParams.get("category").toString();
    const data = dbProducts.filter(el => el.categories.includes(category));

    if (data[0] === undefined) {
      const answer = JSON.stringify({
        status: "no products",
        products: []
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(answer);
    } else {
      const answer = JSON.stringify({
        status: "success",
        products: data
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(answer);
    }
  }
};

module.exports = getProducts;
