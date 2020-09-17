// Sidebar collapse
let start = false;
let canvasStart = document.getElementById("canvas-real");
let contextStart = canvasStart.getContext("2d");

$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar, #content").toggleClass("active");
    if (start === false) {
      canvasStart.style.backgroundColor = "white";
      contextStart.fillStyle = "white";
      contextStart.fillRect(0, 0, canvasStart.width, canvasStart.height);
      contextStart.fillStyle = "black";
      start = true;
    }
  });
});

$(document).ready(function () {
  $("#sidebarCollapse2").on("click", function () {
    $("#premiumSidebar, #content").toggleClass("active");
  });
});
