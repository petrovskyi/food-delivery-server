const fs = require("fs");
const path = require("path");

const imageController = (req, res, next) => {
  oldPath = path.join(__dirname, `../../uploads/${req.file.originalname}`);
  newPath = path.join(
    __dirname,
    `../products/products-image/${req.file.originalname}`
  );
  pathProducts = path.join(__dirname, "../db/all-products.json");

  const reader = fs.createReadStream(oldPath);
  reader.on("error", err => console.log(err));
  reader.on("close", () => console.log("read stream closed"));

  const writer = fs.createWriteStream(newPath);
  writer.on("error", err => console.log(err));
  writer.on("close", () => console.log("write stream closed"));

  reader.pipe(writer);

  fs.unlink(oldPath, err => {
    if (err) throw err;
  });

  fs.readFile(pathProducts, (err, data) => {
    if (err) throw err;

    const id = Number(req.body.id);
    const parsedData = JSON.parse(data);
    const searchById = parsedData.find(el => el.id === id);
    const oldData = parsedData.map(el => el.id).indexOf(id);
    const updatedData = { ...searchById, image: newPath };

    parsedData.splice(oldData, 1, updatedData);

    fs.writeFile(pathProducts, JSON.stringify(parsedData, null, 4), err => {
      if (err) throw err;
    });
  });
};

module.exports = imageController;
