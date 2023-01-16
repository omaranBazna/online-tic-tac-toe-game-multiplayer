const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hi All");
});

app.listen(port, () => {
  console.log("app is listening on port " + port);
});
