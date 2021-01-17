const express = require("express");
const { uploadfile } = require("../controller/transcribe_cotroller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/upload", upload.single("audio"), uploadfile);

module.exports = router;
