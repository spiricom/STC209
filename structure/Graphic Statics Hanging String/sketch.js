// Creates two nodes (endpoints of string)
var node1 = new p5.Vector(100,300);
var node2 = new p5.Vector(500,300);
var node_radius = 20;

var flag = 0; // variable used to drag nodes with mouse
var forces = []; // Array of vectors to store forces
var forcepos = [];
var y_offset = [];
var numforces_prev = 0; // Used to keep track of whether forces have changed
var numforces = 5;
var weight = 0;
var changeforce = 0;

function setup() { // Setup is run just once
  createCanvas(1000,600);

  // slider for horizontal component of tension in first cord (controls length)
  T1xSlider = createSlider(0, 1000, 400);
  T1xSlider.position(20, 20);

  // slider for number of forces acting on string
  numforcesSlider = createSlider(0, 10, numforces);
  numforcesSlider.position(20, 50);

  // slide for weight
  forceSlider = createSlider(0, 100, 50);
  forceSlider.position(20, 80);

}

function draw() { // Draw is looped forever
  background(0); //clear screen

  noStroke();
  fill(255);
  textSize(15);
  textAlign(LEFT);
  text("T1x", 165, 35);
  text("Number of Weights", 165, 65);
  text("Weight", 165, 95);

  textAlign(CENTER);
  text("Drag Endpoints to Adjust String", width/4, height-25);
  text("Force Polygon", 3*width/4, height-25);

  numforces = numforcesSlider.value(); // number of forces set by slider
  var spacing = (node2.x-node1.x)/(numforces+1); // force spacing set to equal intervals between nodes

  // If number of forces has changes or weight has changes
  if(numforces != numforces_prev || forceSlider.value() != weight){
    for (var count = 0;count<numforces; count++){
      // Re-initialize forces
      forces[count] = new p5.Vector(0,forceSlider.value());
    }
    numforces_prev = numforces;
    weight = forceSlider.value();
  }


/*
  for (var count = 0;count<numforces; count++){
    forces[count] = new p5.Vector(0,forceSlider.value());
    //  forces[count] = new p5.Vector(0,50*mouseX/width);
    //  forces[count] = new p5.Vector(0,50*(width-abs(mouseX-(node1.x+(count+1)*spacing)))/width);
  }  
*/

  // draw nodes at their current position
  noStroke();
  fill(255,100);
  ellipse(node1.x,node1.y,node_radius,node_radius);
  ellipse(node2.x,node2.y,node_radius,node_radius);

  //line(node1.x,node1.y,node2.x,node2.y);


/*
  stroke(100);
  strokeWeight(1);
  for(var i = 1; i<=numforces; i++){
  line(node1.x+i*spacing,0,node1.x+i*spacing,height);
  }
*/

  // THIS PART SETS THE FORCE IN FIRST CORD WHICH CONTROLS THE SHAPE OF THE ENTIRE STRING

  // Calculate the vertical component of tension in the first cord
  // Required for the rope to start and end at the nodes
  var T1y = 0;
  //var T1x = 100;
  var T1x = T1xSlider.value();

  for(var i=0; i<numforces; i++){
    T1y += forces[i].y - (i+1)*spacing*forces[i].y/(node2.x-node1.x);
  }
  T1y += T1x*(node2.y-node1.y)/(node2.x-node1.x)

  // resultant = a vector storing the cumulative force as you move down the string from left to right
  // initialized to be tension force in first chord
  var resultant = new p5.Vector(-T1x,-T1y); 

  // dummy variables used for drawing the string and forces
  var startx = node1.x;
  var starty = node1.y;

  // position of origin on the force polygon
  var Ox = width-50;
  var Oy = height/2;

  
  for(var count = 0;count<=numforces; count++){

    stroke(255,100);
    strokeWeight(5);
  
    // Draw string ("funicular polygon") using graphic statics 
  
    // scale the resultant force vector...
    resultant_scale = p5.Vector.mult(resultant,spacing/resultant.x);
    // ..and use it to draw the next cord in the string
    line(startx,starty,startx+resultant_scale.x,starty+resultant_scale.y);

    // Also draw force arrows
    if(count>0){
    line(startx,starty,startx,starty+forces[count-1].y);
    ellipse(startx,starty+forces[count-1].y,10,10);
    forcepos[count-1] = new p5.Vector(startx,starty+forces[count-1].y);
    y_offset[count-1] = starty;
    }
    
    // And go to the next chord of the string
    startx += resultant_scale.x;
    starty += resultant_scale.y;

    // Draw force polygon
    stroke(255);
    strokeWeight(2);
    line(Ox,Oy,Ox+resultant.x,Oy+resultant.y);
    if(count<numforces){
      line(Ox+resultant.x,Oy+resultant.y,Ox+resultant.x,Oy+resultant.y+forces[count].y);
    }


    //calculate cumulative sum of force vectors (for force polygon and string shape)
    resultant.add(forces[count]);

  }



  // dragging nodes behavior
  if(flag == 1){
   node1.x=mouseX;
   node1.y=mouseY;
  }

  // dragging nodes behavior
  if(flag == 2){
   node2.x=mouseX;
   node2.y=mouseY;
  }
  
  if(flag ==3){
    forces[changeforce].y = mouseY - y_offset[changeforce];
  }

  
}

function mouseDragged(){

  if(abs(mouseX-node1.x)<2*node_radius && abs(mouseY-node1.y)<2*node_radius){
   flag = 1;
  }
  
  else if(abs(mouseX-node2.x)<2*node_radius && abs(mouseY-node2.y)<2*node_radius){
   flag = 2;
  }

  else{
    for(var count = 0;count<numforces; count++){
      if(abs(mouseX-forcepos[count].x)<10 && abs(mouseY-forcepos[count].y)<10){
        flag = 3;
        changeforce = count;
      }
    }

  }
}

function mouseReleased(){
 flag = 0; 
}
