const fs = require("fs");
const path = require("path");

const uuid = require("uuid");
const { jsonUpdater } = require("./users-services");
const json = path.join(__dirname, "../db/all-users.json");

module.exports = {
  postUser: (req, res, next) => {
    try {
      fs.readFile(json, "utf8", (err, data) => {
        if (err) {
          console.log("readFile Error --->", "/n", err);
        }

        const newUser = { id: uuid(), created: Date.now(), ...req.body };
        const toWrite = jsonUpdater(data, newUser);

        fs.writeFile(json, toWrite, err => {
          if (err) {
            console.log("writeFile Error --->", "/n", err);
          }
          res.status(200).json({
            status: "success",
            user: newUser
          });
        });
      });
    } catch (error) {
      console.log("Catched error from postUser ", error);
    }
  },
  getUser: (req, res, next) => {
    try {
      fs.readFile(json, "utf8", (err, data) => {
        if (err) throw err;
        const result = JSON.parse(data).filter(el => el.id === req.params.id);

        res.status(200).json(
          result.length !== 0
            ? {
                status: "success",
                user: result
              }
            : {
                status: "no user found",
                user: result
              }
        );
      });
    } catch (error) {
      console.log("Catched error from getUser ", error);
    }
  }
};
