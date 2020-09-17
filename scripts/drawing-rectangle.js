/**********************************************
 * Drawing Rectangle Functionality
 * ==================================
 ***********************************************/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
class DrawingRectangle extends PaintFunction {
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
    
    contextDraft.beginPath();
    contextDraft.rect(
      this.origX,
      this.origY,
      coord[0] - this.origX,
      coord[1] - this.origY
    );
    if (fillBox.checked) {
      contextDraft.fill();
  } else {
      contextDraft.stroke();
  }
  }

  onMouseMove() {}
  onMouseUp(coord) {
    contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.contextReal.beginPath();
    this.contextReal.rect(
      this.origX,
      this.origY,
      coord[0] - this.origX,
      coord[1] - this.origY
    );
    if (fillBox.checked) {
      this.contextReal.fill();
  } else {
      contextReal.stroke();
  }
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
