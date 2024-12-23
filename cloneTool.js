function CloneTool() {
  // TODO: get correct image for clone tool
  this.icon = "assets/freehand.jpg";
  this.name = "clone";

  // size of the circle used for the selected area
  let selectionSize = 25;

  // Used to track when a target is selected and stores the x,y coordinates
  let selectionPosition;

  // Used to determine the difference between the mouse and the selected area
  // This will allow me to sync movements between the target circle and the current
  let selectionAndTargetCoordinateDifference;

  /*
   * getCoordinatesWithinSelection
   * @params
   * selectionPosition: object with x and y values. e.g {x: 0, y: 1}
   *
   * returns: array - An array of objects that is used for all the coordinates that are within selection boundaries
   * e.g. [{x: 0, y:1}, {x:0, y:2}, {x:1, y:3}]
   */
  const getCoordinatesWithinSelection = () => {
    const radius = selectionSize / 2;
    const circleBoundBoxStartX = selectionPosition.x - radius;
    const circleBoundBoxEndX = selectionPosition.x + radius;
    const circleBoundBoxStartY = selectionPosition.y - radius;
    const circleBoundBoxEndY = selectionPosition.y + radius;
    const coordinatesWithinSelection = [];

    for (let y = circleBoundBoxStartY; y <= circleBoundBoxEndY; y++) {
      for (let x = circleBoundBoxStartX; x <= circleBoundBoxEndX; x++) {
        if (
          (x - selectionPosition.x) ** 2 + (y - selectionPosition.y) ** 2 <=
          radius ** 2
        ) {
          coordinatesWithinSelection.push({ x, y });
        }
      }
    }

    return coordinatesWithinSelection;
  };

  /*
   * cloneSelectionCoordinatesPixelsToTarget
   * Description: Copy all the pixels rgba values from selection coordinates to target pixels
   * @params coordinates
   * 
   */
  const cloneSelectionCoordinatesPixelsToTarget = (coordinates) => {
    const pd = pixelDensity();

    coordinates.forEach(({ x, y }) => {
      const targetX = x - selectionAndTargetCoordinateDifference.x;
      const targetY = y - selectionAndTargetCoordinateDifference.y;

      for (let i = 0; i < pd; i += 1) {
        for (let j = 0; j < pd; j += 1) {
          let index = 4 * ((y * pd + j) * width * pd + (x * pd + i));
          let targetIndex = 4 * ((targetY * pd + j) * width * pd + (targetX * pd + i));
          pixels[targetIndex] = pixels[index];
          pixels[targetIndex + 1] = pixels[index + 1];
          pixels[targetIndex + 2] = pixels[index + 2];
          pixels[targetIndex + 3] = pixels[index + 3];
        }
      }
    });
    updatePixels();
  };

  const startCloning = () => {
    const coordinates = getCoordinatesWithinSelection();
    cloneSelectionCoordinatesPixelsToTarget(coordinates);
  };

  this.draw = () => {
    // Reset
    background(255);

    // Preserve drawing from other tools
    updatePixels();

    strokeWeight(1);
    noFill();

    if (selectionPosition) {
      //draw circle for the selection
      ellipse(selectionPosition.x, selectionPosition.y, selectionSize);
    }

    // draw circle at current mouse position - will move with the mouse
    ellipse(mouseX, mouseY, selectionSize);
  };

  this.populateOptions = function () {
    // Add input for selecting the size target
  };

  this.handleMousePressed = function () {
    // keyIsDown reference: https://p5js.org/reference/p5/keyIsDown/
    // Ctrl + click to set the targetArea
    if (keyIsDown(OPTION)) {
      selectionPosition = { x: mouseX, y: mouseY };
      return;
    }

    // Store the distance between the target circle and current mouse circle
    if (!selectionAndTargetCoordinateDifference) {
      selectionAndTargetCoordinateDifference = {
        x: selectionPosition.x - mouseX,
        y: selectionPosition.y - mouseY
      };
    }
  };

  // target circle will follow mouse circle movements
  this.handleMouseDragged = function () {
    if (selectionAndTargetCoordinateDifference) {
      selectionPosition.x = selectionAndTargetCoordinateDifference.x + mouseX;
      selectionPosition.y = selectionAndTargetCoordinateDifference.y + mouseY;
      startCloning();
    }
  };

  // Reset difference when the mouse is released
  this.handleMouseReleased = function () {
    if (selectionAndTargetCoordinateDifference) {
      selectionAndTargetCoordinateDifference = null;
    }
  };
}
