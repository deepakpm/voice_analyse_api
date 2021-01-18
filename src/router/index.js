const express = require("express");
const {
  uploadfile,
  read_transcribe,
} = require("../controller/transcribe_cotroller");
const { upload } = require("../helpers/middlewares");

const router = express.Router();

router.post("/upload", upload.single("audio"), uploadfile);
router.get("/read", read_transcribe);

module.exports = router;
