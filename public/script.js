let player;

fetch("/turn")
  .then((res) => res.json())
  .then(({ turn }) => {
    if (turn) {
      $(".player").html("X");
      player = "x";
    } else {
      $(".player").html("O");
      player = "o";
    }
  });

$(".cell").click(function () {
  const el = $(this);
  const [x, y] = $(this).attr("data-cor").split("-");
  fetch("/state", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ x, y, player }),
  })
    .then((res) => {
      return res.json();
    })
    .then(({ empty }) => {
      console.log(empty);
      if (empty) {
        el.css("background-color", player == "x" ? "green" : "red");
      }
    });
});
