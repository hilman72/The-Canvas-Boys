/**********************************************
 undo/redo Functionality
 * ==================================
 ***********************************************/
 canvasReal = document.getElementById("canvas-real");
 contextReal = canvasReal.getContext("2d");

      var redo_list = [];
      var undo_list = [];

      var saveState = function  (canvasReal, list, keep_redo) { //save state as a function accepts canvas, a redo/unlist list and keep redo (a boolean) as parameters
        keep_redo = keep_redo || false; // saveState will run regardless of whether redo is true or false 
        if(!keep_redo) { // if keep redo is not true, then return the redo.list array
          this.redo_list = [];
        }
        (list || this.undo_list).push(canvasReal.toDataURL());   // if keep redo is true, then push push the data from the undo list to the Canvas 
      }

    // undo function 

      var undo = function (canvasReal, contextReal) {
          console.log('assume')
        this.restoreState(canvasReal, contextReal, this.undo_list, this.redo_list); // undo will pass these parameters into the restore state function 
      };

    // redo function 

      var redo = function (canvasReal, contextReal) {
        this.restoreState(canvasReal, contextReal, this.redo_list, this.undo_list); // redo will pass these parameters into the restore state function 
      };

    // restore to previous/future state

      var restoreState = function (canvasReal, contextReal,  pop, push) { // the restore state function will accept the canvas, ctx, pop and push as parameters
        console.log(redo_list)
        console.log(undo_list)
        if(pop.length) { 
            console.log('assumed right')

//if there are any items in pop/ the redo list -> then the following parameters (canvas, push (a undo/redo list), true) will be passd onto the saved state function
          this.saveState(canvasReal, push, true);

    // A new variable, restore_state is declared, which removes the items from the list array and draws it back onto the canvas
          var restore_state = pop.pop();
    
    // a new img variable is declared, 
    // console.log(restore_state)

          var img = document.createElement('img');
            img.src = restore_state;

            console.log(img)
            
    
          img.onload = function() { // img.onload function will clear the canvas and re-draw the existing image according to the selected restore state 
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
            contextReal.drawImage(img, 0, 0, canvasReal.width, canvasReal.height); //, 0, 0, contextReal.length, contextReal.height  
            console.log('image loaded')
          }
        }
    }


    $('#undo').click(function() { 
        // console.log("hello");
        undo(canvasReal, contextReal); 
      });
      
      $('#redo').click(function() {
        redo(canvasReal, contextReal);
      });
