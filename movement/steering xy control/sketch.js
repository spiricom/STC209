// Modifying Daniel Shiffman's Vehicle Class http://natureofcode.com

// Click the mouse to choose the targets
// The agent will then steer to the targets

// Steering function is 
// acceleration_x = k1x*(target_position_x - position_x) - k2x*(velocity_x)
// acceleration_y = k1y*(target_position_y - position_y) - k2x*(velocity_y)

// i.e. we control the motion of the agent with a force in the x direction and a force in the y direction

var numtargets = 3;
var targetradius = 30;
var k1x = 0.1,
    k2x = 1,
    k1y = 0.1,
    k2y = 1;

var v; // vehicle
var flag = 0; // Used to alternate between 'input mode' and 'simulation mode'
var targets = []; // Stores targets
var currenttarget = 0; // Stores current target

function setup() {
  createCanvas(1000,600);
  v = new Vehicle(width/2, height/2,k1x,k2x,k1y,k2y);
}

function draw() {
  background(51);

  fill(127);
  stroke(200);
  strokeWeight(2);

  if(flag == 0){
    // show an ellipse for mouse in input mode
    ellipse(mouseX, mouseY, targetradius, targetradius);
  }

  for(var i = 0; i<targets.length; i++){
    // show ellipses for targets
    ellipse(targets[i].x, targets[i].y, targetradius, targetradius);
  }

  if(flag == 1){

    // steer to target
    v.steer(targets[currenttarget]);
    v.update();

    // if target is reached, aim for the next target
    if(v.within(targets[currenttarget],targetradius/2)){
      if(currenttarget<numtargets-1){
        currenttarget++;
      }
      else{noLoop();} //if final target is reached, stop the program
    }

  }

  // show the vehicle
  v.display();

};

// This is used to input targets in 'input mode'
function mouseClicked(){

  if(targets.length<numtargets-1){
    targets.push(createVector(mouseX, mouseY));
  }
  else if(flag == 0){
    targets.push(createVector(mouseX, mouseY));
    flag = 1;
  }
}