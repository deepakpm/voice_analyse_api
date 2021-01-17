const multer = require("multer");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination");
    cb(null, "temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(uniqueSuffix);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

var upload = multer({ storage: storage });
module.exports = { upload };
