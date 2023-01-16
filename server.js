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
app.post("/state", (req, res) => {
  const { x, y } = req.body;
  const empty = state[x][y] == 0;
  if (empty) {
    state[x][y] = 1;
  }
  res.send({ empty });
});

app.listen(port, () => {
  console.log("app is listening on port " + port);
});
