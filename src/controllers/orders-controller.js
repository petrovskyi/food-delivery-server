const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const {
  jsonUpdater,
  checkUserById,
  checkAllProducts
} = require("../services/orders-services");

const usersJson = path.join(__dirname, "../db/all-users.json");
const productsJson = path.join(__dirname, "../db/all-products.json");
const ordersJson = path.join(__dirname, "../db/all-orders.json");

const postOrders = (req, res, next) => {
  try {
    fs.readFile(usersJson, "utf8", (err, readUsers) => {
      if (err) {
        console.log("Users reading err: ", err);
      }
      fs.readFile(productsJson, "utf8", (err, readProducts) => {
        if (err) {
          console.log("Products reading err: ", err);
        }
        fs.readFile(ordersJson, "utf8", (err, readOrders) => {
          if (err) {
            console.log("Orders reading err: ", err);
          }

          const orderWithID = { id: uuid(), ...req.body };

          if (
            checkUserById(req.body, readUsers) &&
            checkAllProducts(req.body, readProducts)
          ) {
            fs.writeFile(
              ordersJson,
              jsonUpdater(readOrders, orderWithID),
              err => {
                if (err) {
                  console.log("Order writing Error", e);
                }
              }
            );
            res.status(200).json({
              status: "success",
              order: {
                ...orderWithID
              }
            });
          } else {
            res.status(200).json({ status: "failed", order: null });
          }
        });
      });
    });
  } catch (error) {}
};

module.exports = postOrders;
