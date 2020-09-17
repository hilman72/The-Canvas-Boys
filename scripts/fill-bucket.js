/**********************************************
 * Drawing Line Functionality
 * ==================================
 ***********************************************/

class DrawingFill extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    // this.contextDraft = contextDraft
  }

  onMouseDown() {
    saveState(canvasReal);
  }
  onDragging() {}
  onMouseMove() {}
  onMouseUp(coord) {
    paintBucketFill(coord, this.contextReal);
  }
  onMouseLeave() {}
  onMouseEnter() {}
}

function paintBucketFill(coord, context) {
  let newPos, x, y, pixelPos, reachLeft, reachRight;
  console.log(curFill);

  let imgData = context.getImageData(0, 0, canvasReal.width, canvasReal.height);

  let pixelData = context.getImageData(coord[0], coord[1], 1, 1);
  let pixelStack = [coord];

  let startR = pixelData.data[0];
  let startG = pixelData.data[1];
  let startB = pixelData.data[2];

  let curFillRGBA = curFill
    .replace(/\s+/g, "")
    .split("(")[1]
    .split(")")[0]
    .split(",");

  while (pixelStack.length) {
    newPos = pixelStack.pop();
    x = newPos[0];
    y = newPos[1];

    // Get current pixel position
    pixelPos = (y * canvasWidth + x) * 4;

    // Go up the page as long as the colour matches
    while (
      y >= 0 &&
      matchStartColour(pixelPos, startR, startG, startB, imgData)
    ) {
      y--;
      pixelPos -= canvasWidth * 4;
    }

    pixelPos += canvasWidth * 4;
    y++;
    reachLeft = false;
    reachRight = false;

    // Go down the page as long as the colour matches and is in the canvas
    while (
      y <= canvasHeight - 1 &&
      matchStartColour(pixelPos, startR, startG, startB, imgData)
    ) {
      y++;

      colorPixel(pixelPos, imgData, curFillRGBA);

      if (pixelPos === undefined || imgData.data[pixelPos] === undefined) {
        y = canvasHeight;
      }

      if (x > 0) {
        if (matchStartColour(pixelPos - 4, startR, startG, startB, imgData)) {
          if (!reachLeft) {
            // Add pixel to stack
            pixelStack.push([x - 1, y]);
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (x < canvasWidth - 1) {
        if (matchStartColour(pixelPos + 4, startR, startG, startB, imgData)) {
          if (!reachRight) {
            // Add pixed to stack
            pixelStack.push([x + 1, y]);
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }

      pixelPos += canvasWidth * 4;
    }
  }
  context.putImageData(imgData, 0, 0);
}

function matchStartColour(pixelPos, startR, startG, startB, imgData) {
  let r = imgData.data[pixelPos];
  let g = imgData.data[pixelPos + 1];
  let b = imgData.data[pixelPos + 2];

  return r == startR && g == startG && b == startB;
}

function colorPixel(pixelPos, imgData, curFillRGBA) {
  imgData.data[pixelPos] = Number(curFillRGBA[0]);
  imgData.data[pixelPos + 1] = Number(curFillRGBA[1]);
  imgData.data[pixelPos + 2] = Number(curFillRGBA[2]);
  imgData.data[pixelPos + 3] = Math.round(Number(curFillRGBA[3]) * 255);
}
