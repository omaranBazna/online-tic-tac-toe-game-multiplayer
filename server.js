const express = require("express");
const port = 3000;
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

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
  res.send(`room Created successfully at id: ${id}
  <html>

  <body>

  <form action="/joinroom" method="post">
  <input type="text" placeholder="room id" name="room" value=${id} />
  <button>Join room</button>
  </form>

  </body>

  </html>
  
  `);
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

let player;
let room_id;
app.post("/joinroom", (req, res) => {
  const id = req.body.room;

  room_id = id;

  if (roomData[id].numPlayers < 2) {
    console.log("yes");
    roomData[id].numPlayers += 1;

    if (roomData[i].numPlayers == 1) {
      player = "x";
    } else {
      player = "o";
    }
    res.sendFile(__dirname + "/public/game.html");
  } else {
    res.send("sorry this room is full");
  }
});
app.get("/getdata", (req, res) => {
  res.send({ player, room_id });
});
app.listen(port, () => {
  console.log("app is listening on port " + port);
});
