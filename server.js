const express = require("express");
const port = 3000;
const app = express();
const state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
app.use(express.json());
app.use("/", express.static("public"));
app.post("/move", (req, res) => {
  const move = req.body;
});

app.listen(port, () => {
  console.log("app is listening on port " + port);
});
