const { Router } = require("express");
const postOrder = require("./orders-controller");
const router = Router();

router.post("/", postOrder);

module.exports = router;
