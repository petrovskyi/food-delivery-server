const { Router } = require("express");
const multer = require("multer");

const imageConroller = require("../controllers/image-controller");

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, "uploads/");
  },
  filename: (req, file, next) => {
    next(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("photo"), imageConroller);

module.exports = router;
