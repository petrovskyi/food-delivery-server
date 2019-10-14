const { Router } = require("express");
const productsController = require("../controllers/products-controllers");
const router = Router();

router.get("/", productsController);
router.get("/:id", productsController);

module.exports = router;
