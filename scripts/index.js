let canvasReal = document.getElementById("canvas-real");
let contextReal = canvasReal.getContext("2d");
let canvasDraft = document.getElementById("canvas-draft");
let contextDraft = canvasDraft.getContext("2d");
let currentFunction;
let dragging = false;
contextReal.strokeStyle = "rgba(0, 0, 0, 1)";
contextReal.fillStyle = "rgba(0, 0, 0, 1)";
contextDraft.strokeStyle = "rgba(0, 0, 0, 1)";
contextDraft.fillStyle = "rgba(0, 0, 0, 1)"; // initial brush color
contextReal.lineWidth = 1;
contextDraft.lineWidth = 1;
contextDraft.lineCap = "round";
contextReal.lineCap = "round";
contextDraft.lineJoin = "round";
contextReal.lineJoin = "round";
var canvasWidth = canvasReal.width;
var canvasHeight = canvasReal.height;

// resizing canvas window 

var render = function () {
  canvasReal.width = document.documentElement.clientWidth * 0.8;
  canvasReal.height = document.documentElement.clientHeight * 0.8;

  canvasDraft.width = document.documentElement.clientWidth * 0.8;
  canvasDraft.height = document.documentElement.clientHeight * 0.8;
}

window.addEventListener("resize", render);
render();


$("#canvas-draft").mousedown(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseDown([mouseX, mouseY], e);
  dragging = true;
});

$("#canvas-draft").mousemove(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  if (dragging) {
    currentFunction.onDragging([mouseX, mouseY], e);
  }
  currentFunction.onMouseMove([mouseX, mouseY], e);
});

$("#canvas-draft").mouseup(function (e) {
  dragging = false;
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseUp([mouseX, mouseY], e);
});

$("#canvas-draft").mouseleave(function (e) {
  dragging = false;
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$("#canvas-draft").mouseenter(function (e) {
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  currentFunction.onMouseEnter([mouseX, mouseY], e);
});

// Handle Colors


// Handle Brushes
var brushes = document.getElementsByClassName("brushes")[0];

brushes.addEventListener("click", function (event) {
  contextReal.lineWidth = event.target.value;
  contextDraft.lineWidth = event.target.value;
});

//CLear btn
var clearButton = document.getElementById("clear");

clearButton.addEventListener("click", function () {
  contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
});

// Handle Save Button
var saveButton = document.getElementById("save");

saveButton.addEventListener("click", function () {
  var imageName = prompt("Please enter image name");
  var canvasDataURL = canvasReal.toDataURL();
  var a = document.createElement("a");
  a.href = canvasDataURL;
  a.download = imageName || "drawing";
  a.click();
});

//redo undo

var history = {
  redo_list: [],
  undo_list: [],
  saveState: function (canvasReal, list, keep_redo) {
    keep_redo = keep_redo || false;
    if (!keep_redo) {
      this.redo_list = [];
    }

    (list || this.undo_list).push(canvasReal.toDataURL());
  },
  undo: function (canvasReal, contextReal) {
    this.restoreState(canvasReal, contextReal, this.undo_list, this.redo_list);
  },
  redo: function (canvasReal, contextReal) {
    this.restoreState(canvasReal, contextReal, this.redo_list, this.undo_list);
  },
  restoreState: function (canvasReal, contextReal, pop, push) {
    if (pop.length) {
      this.saveState(canvasReal, push, true);
      var restore_state = pop.pop();
      var img = new Element("img", { src: restore_state });
      img.onload = function () {
        contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
        contextReal.drawImage(
          img,
          0,
          0,
          canvasReal.width,
          canvasReal.height,
          0,
          0,
          canvasReal.width,
          canvasReal.height
        );
      };
    }
  },
};

/** # Class (all classes will have these methods) #
/*  ====================== */
class PaintFunction {
  constructor() {}
  onMouseDown() {}
  onDragging() {}
  onMouseMove() {}
  onMouseUp() {}
  onMouseLeave() {}
  onMouseEnter() {}
}
