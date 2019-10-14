const { Router } = require("express");
const { postUser, getUser } = require("./users-controllers");
const router = Router();

router.post("/", postUser);
router.get("/:id", getUser);

module.exports = router;
