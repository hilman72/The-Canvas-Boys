/**********************************************
 * Drawing Line Functionality
 * ==================================
 ***********************************************/

class DrawingLine extends PaintFunction {
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
    contextDraft.moveTo(this.origX,this.origY);
    contextDraft.lineTo(coord[0],coord[1]);
    contextDraft.stroke();
  }
  

  onMouseMove() {}
  onMouseUp(coord) {
    contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.contextReal.beginPath();
    this.contextReal.moveTo(this.origX,this.origY);
    this.contextReal.lineTo(coord[0],coord[1]);
    contextReal.stroke();
  
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
