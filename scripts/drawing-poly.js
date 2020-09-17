/**********************************************
 * Drawing Rectangle Functionality
 * ==================================
 ***********************************************/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
class DrawingPoly extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    // this.contextDraft = contextDraft;
  }

  onMouseDown(coord, event) {
    this.origX = coord[0];
    this.origY = coord[1];
    saveState(canvasReal);
  }
  onDragging(coord, event) {
    contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    let radius = Math.sqrt(
      Math.pow(this.origX - coord[0], 2) + Math.pow(this.origY - coord[1], 2)
    );

    var sides = document.getElementById("polygonSides").value;
    var angle = (2 * Math.PI) / sides;

    var startAngle = coord[1] * 0.007;
    console.log(startAngle);

    /************************************************** */

    // Begining Point Coordinates
    var beginX = this.origX + radius * Math.cos(startAngle);
    var beginY = this.origY - radius * Math.sin(startAngle);

    contextDraft.moveTo(beginX, beginY);
    contextDraft.beginPath();
    // Draw Lines
    for (var i = 1; i <= sides; i++) {
      // Current point'S coordinates
      var currentAngle = startAngle + i * angle;
      console.log(currentAngle);
      var currentPointX = this.origX + radius * Math.cos(currentAngle);
      var currentPointY = this.origY - radius * Math.sin(currentAngle);

      // Draw the line
      contextDraft.lineTo(currentPointX, currentPointY);
    }

    contextDraft.closePath();

    if (fillBox.checked) {
      contextDraft.fill();
    } else {
      contextDraft.stroke();
    }
  }

  onMouseMove() {}
  onMouseUp(coord) {
    contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    let radius = Math.sqrt(
      Math.pow(this.origX - coord[0], 2) + Math.pow(this.origY - coord[1], 2)
    );

    var sides = document.getElementById("polygonSides").value;
    var angle = (2 * Math.PI) / sides;

    var startAngle = coord[1] * 0.007;
    console.log(startAngle);

    // Begining Point Coordinates
    var beginX = this.origX + radius * Math.cos(startAngle);
    var beginY = this.origY - radius * Math.sin(startAngle);

    this.contextReal.moveTo(beginX, beginY);
    this.contextReal.beginPath();
    // Draw Lines
    for (var i = 0; i <= sides; i++) {
      // Current point'S coordinates
      var currentAngle = startAngle + i * angle;
      var currentPointX = this.origX + radius * Math.cos(currentAngle);
      var currentPointY = this.origY - radius * Math.sin(currentAngle);

      // Draw the line
      this.contextReal.lineTo(currentPointX, currentPointY);
    }

    this.contextReal.closePath();
    if (fillBox.checked) {
      this.contextReal.fill();
    } else {
      this.contextReal.stroke();
    }
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
