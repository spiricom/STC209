// Modifying Daniel Shiffman's Vehicle Class http://natureofcode.com
 
// Click the mouse to choose the targets
// The agent will then steer to the targets

// Steering function is: 
// angularacceleration = k1*(target_angle-angle) - k2*angularvelocity;

// i.e. the agent always moves at a constant speed and we can apply a control torque to turn it

var numtargets = 4;
var targetradius = 30;
var k1 = 0.1,
    k2 = 1,
    speed = 5;

var v;
var flag = 0;
var targets = [];
var currenttarget = 0;

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
    ellipse(mouseX, mouseY, targetradius, targetradius);
  }

  for(var i = 0; i<targets.length; i++){
    ellipse(targets[i].x, targets[i].y, targetradius, targetradius);
  }

  if(flag == 1){
    v.steer(targets[currenttarget]);
    v.update();
    if(v.within(targets[currenttarget],targetradius/2)){
      if(currenttarget<numtargets-1){
        currenttarget++;
      }
      else{noLoop();}
    }

  }

  v.display();

};


function mouseClicked(){

  if(targets.length<numtargets-1){
    targets.push(createVector(mouseX, mouseY));
  }
  else if(flag == 0){
    targets.push(createVector(mouseX, mouseY));
    flag = 1;
  }
}