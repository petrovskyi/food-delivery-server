const express = require("express");
const corsMiddleware = require("cors");
const addRequestId = require("express-request-id");

const productsRoute = require("./routes/products-routes");
const usersRoute = require("./routes/users-routes");
const ordersRoute = require("./routes/orders-routes");
const imageRoute = require("./routes/image-routes");

const app = express();

app
  .use(express.json())
  .use(corsMiddleware())
  .use(addRequestId())

  .use("/users", usersRoute)
  .use("/products", productsRoute)
  .use("/orders", ordersRoute)
  .use("/image", imageRoute)

  .use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send("error");
  });

module.exports = app;
