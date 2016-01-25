// Modifying Daniel Shiffman's Vehicle Class http://natureofcode.com
 
// Click the mouse to choose the targets
// The agent will then steer to the targets

// Steering function is: 
// angularacceleration = k1*(target_angle-angle) - k2*angularvelocity;

// i.e. the agent always moves at a constant speed and we can apply a control torque to turn it

//*****************************************
// Play with changing the following parameters:
var numtargets = 4; // number of waypoints
var targetradius = 30; // size of each target
var k1 = 0.1,
    k2 = 1,
    speed = 5;
//*****************************************


var v; // stores the 'vehicle' object
var flag = 0; // Used to alternate between 'input mode' and 'simulation mode'
var targets = []; // Stores targets
var currenttarget = 0; // Stores current target

function setup() {
  createCanvas(1000,600);
  v = new Vehicle(width/2, height/2,speed,k1,k2);
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

    // target is reached if agent enters targetradius/2 (this threshold can be changed below)
    if(v.within(targets[currenttarget],targetradius/2)){
      if(currenttarget<numtargets-1){
        currenttarget++; // if target is reached, aim for the next target
      }
      else{noLoop();} // if final target is reached, stop the program
    }

  }

  // display the vehicle
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