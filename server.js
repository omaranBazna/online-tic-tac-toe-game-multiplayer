const express = require("express");
const port = 3000;
const app = express();
const state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let turn = true;
app.use(express.json());
app.use("/", express.static("public"));
app.get("/turn", (req, res) => {
  turn = !turn;
  res.send({ turn });
});
app.post("/state", (req, res) => {
  const { x, y, player } = req.body;
  console.log(player);
  console.log(!turn);
  if ((turn && player == "x") || (!turn && player == "o")) {
    const empty = state[x][y] == 0;
    if (empty) {
      state[x][y] = 1;
    }
    turn = !turn;
    res.send({ empty });
  } else {
    res.send({ empty: false });
  }
});

app.listen(port, () => {
  console.log("app is listening on port " + port);
});
