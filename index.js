const server = require("./src/server");
const { port } = require("./config");

server.listen(port, () => {
  console.log(`Ganesha Server is ready :)`);
});
