/**********************************************
 * Drawing Rectangle Functionality
 * ==================================
 ***********************************************/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect

class TextFill extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    // this.contextDraft = contextDraft;
  }

  onMouseDown(coord, event) { 
    this.contextReal.fillStyle = "#f44";
    this.origX = coord[0];
    this.origY = coord[1];
    this.addInput(this.origX, this.origY);
    saveState(canvasReal);
  }

  onDragging() {}

  onMouseMove() {}
  onMouseUp() {}
  onMouseLeave() {}
  onMouseEnter() {}

  addInput(x, y) {

    console.log("Hello");


   this.input = document.createElement('input'); // creates new element called input/textbox

    this.input.type = 'text'; // defines new element input as text 
    this.input.style.position = 'fixed'; // defines that new element wil be at fixed position
    this.input.style.left = (x + 290) + 'px'; //offsets position of x and adds px to determine position on the doc
    this.input.style.top = (y + 120) + 'px'; //offsets position of y and adds px to determine position on the doc

    this.input.onkeydown = this.handleEnter; // defines that on keydown, the handle enter function will be called

    document.body.appendChild(this.input);  // appends the child element (input) to the body of the document 

    // this.input.focus(); // the input element will be the main focus of any keyboard and similar events

}

drawText(txt, x, y) { 
    this.contextReal.textBaseline = 'top'; // determines the text baseline when drawing the element
    this.contextReal.textAlign = 'left'; // determines the alignment for text content
    this.contextReal.font = '30px serif';
    this.contextReal.fillStyle = '#000000';
    this.contextReal.fillText(txt, x, y - 10); //determines where text will be placed, offsetting the position of x and y by -4 
    }


handleEnter=(e)=> {
    var keyCode = e.keyCode; // defines new variable keycode and links event to the keycode variable
    if (keyCode === 13) {  // conditional that states that if keycode equals to 13/ enter key 
        console.log(this.input.value)
        this.drawText(this.input.value, this.origX, this.origY); 
         // converts x into a number to determine offset position, similarly with y 
        document.body.removeChild(this.input);   // removes child(textbox) from the document body
        } 
    }
}

