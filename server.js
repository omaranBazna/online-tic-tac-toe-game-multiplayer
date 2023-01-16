const express = require("express");
const port = 3000;
const app = express();

const generateRandomId = () => {
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
};
const rooms = [];
const roomData = {};
const state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let turn = true;
app.use(express.json());
app.use("/", express.static("public"));

app.post("/createroom", (req, res) => {
  let id = generateRandomId();
  while (rooms.indexOf(id) > -1) {
    id = generateRandomId();
  }
  rooms.push(id);
  roomData[id] = {
    numPlayers: 0,
    state: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    chats: [],
    player1Name: "",
    player2Name: "",
    id: id,
  };
  res.send(`room Created successfully at id: ${id}`);
});

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
