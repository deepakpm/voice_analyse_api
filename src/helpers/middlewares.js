const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

var s3 = new AWS.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "voiceanalysisapp",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const extension = file.originalname.split(".")[1];
      cb(null, Date.now().toString() + "." + extension);
    },
  }),
});

module.exports = { upload };
