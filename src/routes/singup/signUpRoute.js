const fs = require("fs");
const path = require("path");

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";
    let userData = "";

    request.on("data", data => {
      body = body + data;
      userData = JSON.parse(body);

      const filePath = path.join(
        __dirname,
        "../../../",
        "src",
        "db",
        "users",
        `${userData.username}.json`
      );
      fs.writeFile(filePath, data, err => {
        if (err) throw err;
        console.log("User Saved in DB!");
      });
    });
    request.on("end", () => {
      const answer = JSON.stringify({
        status: "success",
        user: userData
      });

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(answer);
    });
  }
};

module.exports = signUpRoute;
