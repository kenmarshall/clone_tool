function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background(255, 255, 255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("myPicture", "jpg");
	});


	//event handler for the load image button. loads an image from file system onto canvas
	select("#loadImageButton").mouseClicked(function() {
    
    // Add hidden input into DOM
    input = createFileInput((file) => {
      if (file.type !== 'image'){
        alert("File is not an image, please select an image file")
      }

      loadImage(file.data, (img) => {
        image(img, 0, 0);
      })
    });

    // Simulate click on the DOM input element
    input.elt.click()
	});

}