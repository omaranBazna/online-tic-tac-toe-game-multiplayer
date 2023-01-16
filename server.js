const express = require("express");
const port = 3000;
const app = express();
const state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
app.use("/", express.static("public"));

app.listen(port, () => {
  console.log("app is listening on port " + port);
});
