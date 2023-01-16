$(".cell").click(function () {
  const el = $(this);
  const [x, y] = $(this).attr("data-cor").split("-");
  fetch("/state", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ x: x, y: y }),
  })
    .then((res) => {
      return res.json();
    })
    .then(({ empty }) => {
      if (empty) {
        console.log(el);
        el.css("background-color", "green");
      }
    });
});
