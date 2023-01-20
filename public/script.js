let gplayer;
let arr = window.location.href.split("/");
let groom_id = arr[arr.length - 1];
$(".id").html(groom_id);
let end = false;
console.log(URL.arguments);
setInterval(() => {
  fetch("/check", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: groom_id }),
  })
    .then((res) => {
      return res.json();
    })
    .then((room) => {
      const { turn, state, winner } = room;
      console.log("winner: ", winner);
      if (!end) {
        $(".turn").html(turn);
        console.log("state :", state);

        if (winner == 1) {
          $(".msg").html("X win!!");
          end = true;
        } else if (winner == 2) {
          $(".msg").html("O win!!");
          end = true;
        } else if (winner == 3) {
          $(".msg").html("Draw");
          end = true;
        }

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            console.log(state[i][j]);
            const el2 = $(`div[data-cor=${i}-${j}]`);
            el2.html(state[i][j] == 0 ? "" : state[i][j] == 1 ? "X" : "O");
          }
        }
      }
    })
    .catch((e) => console.log(e));
}, 300);

$(".cell").click(function () {
  const el = $(this);
  const [x, y] = $(this).attr("data-cor").split("-");
  console.log("Player " + gplayer);
  fetch("/move", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ x, y, player: gplayer, id: groom_id }),
  })
    .then((res) => {
      return res.json();
    })
    .then(({ err, msg, state, winner }) => {
      if (err) {
        $(".error").html(msg);
      } else {
        if (!end) {
          if (winner == 1) {
            $(".msg").html("X win!!");
            end = true;
          } else if (winner == 2) {
            $(".msg").html("O win!!");
            end = true;
          } else if (winner == 3) {
            $(".msg").html("Draw");
            end = true;
          }

          $(".error").html("");

          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              console.log(state[i][j]);
              const el2 = $(`div[data-cor=${i}-${j}]`);

              el2.html(state[i][j] == 0 ? "" : state[i][j] == 1 ? "X" : "O");
            }
          }
        }
      }
    });
});
