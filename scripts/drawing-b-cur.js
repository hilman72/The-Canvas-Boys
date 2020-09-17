/**********************************************
 * Drawing Line Functionality
 * ==================================
 ***********************************************/

class Drawingbcur extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    // this.contextDraft = contextDraft;
    this.clickNum =0;
  }

  onMouseDown(coord, event) {
    saveState(canvasReal);
    
  }
  onDragging(coord, event) {
  
    
  }
  

  onMouseMove(coord) {
    if(this.clickNum ===1){
      var cpointX_1 = this.origX ;
      var cpointY_1 = this.origY ;
      var cpointX_2 = coord[0] ;
      var cpointY_2 = coord[1] ;
    contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height)
    contextDraft.beginPath();
    contextDraft.moveTo(this.origX,this.origY);
    contextDraft.bezierCurveTo(cpointX_1,cpointY_1,cpointX_2,cpointY_2,coord[0],coord[1]);
    contextDraft.stroke();
    }else if(this.clickNum===2){
      var cpointX_1 = coord[0]
      var cpointY_1 = coord[1]
      var cpointX_2 = coord[0] ;
      var cpointY_2 = coord[1] ;
      contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height)
     contextDraft.beginPath();
     contextDraft.moveTo(this.origX,this.origY);
     contextDraft.bezierCurveTo(cpointX_1,cpointY_1,cpointX_2,cpointY_2,this.endPtx,this.endPty);
     contextDraft.stroke();
    }else if(this.clickNum===3){
      var cpointX_2 = coord[0]
      var cpointY_2 = coord[1]
      contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height)
     contextDraft.beginPath();
     contextDraft.moveTo(this.origX,this.origY);
     contextDraft.bezierCurveTo(this.final_cpointX_1,this.final_cpointY_1,cpointX_2,cpointY_2,this.endPtx,this.endPty);
     contextDraft.stroke();
    }

    
}
  
  onMouseUp(coord) {
    if(this.clickNum ===0){
      contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height)
      this.origX = coord[0];
      this.origY = coord[1];
      this.clickNum++
      console.log("hi 0")
    }else if(this.clickNum === 1){
      this.endPtx = coord[0];
      this.endPty = coord[1];
      var cpointX_1 = this.origX ;
      var cpointY_1 = this.origY ;
      var cpointX_2 = coord[0] ;
      var cpointY_2 = coord[1] ;
      contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height)
      contextDraft.beginPath();
      contextDraft.moveTo(this.origX,this.origY);
      contextDraft.bezierCurveTo(cpointX_1,cpointY_1,cpointX_2,cpointY_2,this.endPtx,this.endPty);
      contextDraft.stroke();
      console.log("hi 1")
      this.clickNum++
    }else if(this.clickNum === 2){
      contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height)
      this.final_cpointX_1 = coord[0]
      this.final_cpointY_1 = coord[1]
      contextDraft.beginPath();
      contextDraft.moveTo(this.origX,this.origY);
      contextDraft.bezierCurveTo(this.final_cpointX_1,this.final_cpointY_1,cpointX_2,cpointY_2,this.endPtx,this.endPty);
      contextDraft.stroke();
      console.log("hi 2");
      this.clickNum++

    }else if(this.clickNum === 3){
      var cpointX_2 = coord[0]
      var cpointY_2 = coord[1]
      contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height)
      this.contextReal.beginPath();
      this.contextReal.moveTo(this.origX,this.origY);
      this.contextReal.bezierCurveTo(this.final_cpointX_1,this.final_cpointY_1,cpointX_2,cpointY_2,this.endPtx,this.endPty);
      this.contextReal.stroke();
      console.log("hi 3");
      this.clickNum = 0;

    }

  
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
