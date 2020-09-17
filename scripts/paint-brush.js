/**********************************************
 * Drawing Line Functionality
 * ==================================
 ***********************************************/

class Drawingpaintb extends PaintFunction {
  // This class extends the PaintFunction class
  constructor(contextReal) {
    super();
    this.context = contextReal;
    this.drawing;
  }

  // On mouse down, ensure that the pen has these features
  onMouseDown(coord, event) {
    this.Drawing = true;
    this.context.moveTo(coord[0], coord[1]);
  }
  onDragging() {}

  onMouseMove(coord) {
    if (this.Drawing) {
      var radgrad = this.context.createRadialGradient(
        coord[0],
        coord[1],
        10,
        coord[0],
        coord[1],
        20
      );

      radgrad.addColorStop(0, curst_first);
      radgrad.addColorStop(0.5, curst_second);
      radgrad.addColorStop(1, curst_third);
      this.context.fillStyle = radgrad;

      this.context.fillRect(coord[0] - 20, coord[1] - 20, 40, 40);
    }
  }
  onMouseUp() {
    this.Drawing = false;
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
