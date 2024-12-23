//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;


function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

  // Create and load all the tools in the toolbox
	toolbox.loadTools();
	background(255);

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}

function mousePressed() {
  if (toolbox.selectedTool.hasOwnProperty("handleMousePressed")) {
		toolbox.selectedTool.handleMousePressed();
	} 
}

function mouseDragged() {
  if (toolbox.selectedTool.hasOwnProperty("handleMouseDragged")) {
		toolbox.selectedTool.handleMouseDragged();
	} 
}
function mouseReleased() {
  if (toolbox.selectedTool.hasOwnProperty("handleMouseReleased")) {
		toolbox.selectedTool.handleMouseReleased();
	} 
}