const express = require("express");
const router = require("./src/router");
const bodyParser = require("body-parser");
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
