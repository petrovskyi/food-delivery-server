const { Router } = require("express");
const postOrder = require("../controllers/orders-controller");
const router = Router();

router.post("/", postOrder);

module.exports = router;
