let player;
let room_id;
fetch("/getdata")
  .then((res) => res.json())
  .then(({ player, room_id }) => {
    if (player == "x") {
      $(".player").html("X");
      player = "x";
    } else {
      $(".player").html("O");
      player = "o";
    }
    room_id = room_id;
  });

$(".cell").click(function () {
  const el = $(this);
  const [x, y] = $(this).attr("data-cor").split("-");
  fetch("/move", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ x, y, player, id: room_id }),
  })
    .then((res) => {
      return res.json();
    })
    .then(({ err, msg }) => {
      if (err) {
        $(".error").html(msg);
      } else {
        el.css("background-color", player == "x" ? "green" : "red");
      }
    });
});
