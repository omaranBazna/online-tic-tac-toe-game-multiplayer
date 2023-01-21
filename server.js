const express = require("express");
const port = 3000;
const app = express();

const bodyParser = require("body-parser");
const e = require("express");
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
    turn: "x",
    chats: [],
    player1Name: "",
    player2Name: "",
    id: id,
  };

  roomData[id].numPlayers += 1;

  if (roomData[id].numPlayers == 1) {
    player = "x";
  } else {
    player = "o";
  }
  console.log(rooms);
  console.log(roomData[id]);

  res.redirect("/" + id);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("id is :" + id);
  room_id = id;

  if (roomData[id].numPlayers < 2) {
    console.log("yes");
    roomData[id].numPlayers += 1;

    if (roomData[id].numPlayers == 1) {
      player = "x";
    } else {
      player = "o";
    }
    res.sendFile(__dirname + "/public/game.html");
  } else {
    res.send("sorry this room is full");
  }
});

app.post("/check", (req, res) => {
  const id = req.body.id;
  const room = roomData[id];

  let winner;
  if (room && room.state) {
    winner = check(room.state);
  } else {
    winner = -1;
  }

  res.send({ ...room, winner: winner });
});
app.post("/move", (req, res) => {
  console.log("get move from player");
  console.log(req.body);
  const { x, y, player, id } = req.body;

  const room = roomData[id];
  if (room.numPlayers == 2) {
    if (room.turn == player) {
      const empty = room.state[x][y] == 0;
      if (empty) {
        room.state[x][y] = player == "x" ? 1 : 2;
        room.turn = player == "x" ? "o" : "x";
        let winner = check(room.state);
        res.send({
          err: false,
          msg: "no error",
          state: room.state,
          winner: winner,
        });
      } else {
        res.send({ err: true, msg: "it is not an empty cell" });
      }
    } else {
      res.send({ err: true, msg: "it is not your turn" });
    }
  } else {
    res.send({ err: true, msg: "there is no other player" });
  }
});

app.listen(port, () => {
  console.log("app is listening on port " + port);
});
function check(state) {
  ///checking the rows
  for (let i in [0, 1, 2]) {
    if (
      state[0][i] > 0 &&
      state[0][i] == state[1][i] &&
      state[0][i] == state[2][i]
    ) {
      return state[0][i];
    }
  }

  ///checking the cols
  for (let i in [0, 1, 2]) {
    if (
      state[i][0] > 0 &&
      state[i][0] == state[i][1] &&
      state[i][0] == state[i][2]
    ) {
      return state[i][0];
    }
  }

  ///check left-to-right
  if (
    state[0][0] > 0 &&
    state[0][0] == state[1][1] &&
    state[0][0] == state[2][2]
  ) {
    return state[0][0];
  }

  ///check right-to-left
  if (
    state[0][2] > 0 &&
    state[1][1] == state[0][2] &&
    state[0][2] == state[1][1]
  ) {
    return state[1][1];
  }

  ///check draw
  for (let i in [0, 1, 2]) {
    for (let j in [0, 1, 2]) {
      if (state[i][j] == 0) {
        return -1;
      }
    }
  }
  return 3;
}

///we have an issue even when we try to log in to a room
///both players are x ,x
