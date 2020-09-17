/**********************************************
 * Drawing Rectangle Functionality
 * ==================================
 ***********************************************/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
class DrawingCircle extends PaintFunction {
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

    contextDraft.beginPath();
    contextDraft.arc(this.origX, this.origY, radius, 0, 2 * Math.PI, false);
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
    this.contextReal.beginPath();
    this.contextReal.arc(this.origX, this.origY, radius, 0, 2 * Math.PI, false);
    if (fillBox.checked) {
      this.contextReal.fill();
  } else {
      this.contextReal.stroke();
  }
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
