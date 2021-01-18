const express = require("express");
const router = require("./src/router");
const bodyParser = require("body-parser");
const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: "AKIASDSCMQLJFULDIZGI",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);
app.get("/", (req, res) => {
  res.end("Hello");
});

app.listen(port, () => {
  console.log("Service running");
});
