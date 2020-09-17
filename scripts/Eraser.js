/**********************************************
 * Drawing Line Functionality
 * ==================================
 ***********************************************/

class Eraser extends PaintFunction {
  // This class extends the PaintFunction class
  constructor(contextReal) {
    super();
    this.context = contextReal;
  }

  // On mouse down, ensure that the pen has these features
  onMouseDown(coord, event) {
    var brushSize = this.context.lineWidth + 40;
    this.context.clearRect(coord[0], coord[1], brushSize, brushSize);
  }
  onDragging(coord, event) {
    var brushSize = this.context.lineWidth + 40;
    this.context.clearRect(coord[0], coord[1], brushSize, brushSize);
  }

  onMouseMove() {}
  onMouseUp() {}
  onMouseLeave() {}
  onMouseEnter() {}

  draw(x, y) {
    this.context.lineTo(x, y);

    this.context.stroke();
  }
}
