// Modifying Daniel Shiffman's Vehicle Class http://natureofcode.com

// Click the mouse to choose the targets in input mode
// The agent will then steer to the targets
// While the agent is steering, you can change the parameters with the sliders
// If you want to take a screenshot of your pattern, click the mouse

// Steering function is 
// acceleration_x = k1x*(target_position_x - position_x) - k2x*(velocity_x)
// acceleration_y = k1y*(target_position_y - position_y) - k2x*(velocity_y)

// i.e. we control the motion of the agent with a damped spring force in the x direction 
// and a damped spring force in the y direction

var k1x_Slider, k1y_Slider, k2x_Slider,  k2y_Slider;
var numtargets = 8;
var targetradius = 20;

var maxgain = 0.25; // this sets the maximum gain, which is the upper limit of the sliders
var k1x = 0.01,
    k1y = 0.01,
    k2x = 0.02,  
    k2y = 0.02;

var v; // vehicle
var flag = 0; // Used to alternate between 'input mode' and 'simulation mode'
var targets = []; // Stores targets
var currenttarget = 0; // Stores current target

function setup() {
  createCanvas(1100,670);
  v = new Vehicle(width/2, height/2);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(15)
  noStroke();

  // create sliders
  k1x_Slider = createSlider(0, 1000*maxgain, 1000*k1x);
  k1x_Slider.position(20, 20);
  k1y_Slider = createSlider(0, 1000*maxgain, 1000*k1y);
  k1y_Slider.position(20, 50);
  k2x_Slider = createSlider(0, 1000*maxgain, 1000*k2x);
  k2x_Slider.position(20, 80);
  k2y_Slider = createSlider(0, 1000*maxgain, 1000*k2y);
  k2y_Slider.position(20, 110);
}

function draw() {
  if(flag==0){
    background(100);
  }

  fill(255,143,0);
  stroke(0);
  strokeWeight(2);
  
  k1x = k1x_Slider.value()/1000;
  k1y = k1y_Slider.value()/1000;
  k2x = k2x_Slider.value()/1000;
  k2y = k2y_Slider.value()/1000;
  
  text("X - stiffness", 155, 25);
  text("Y - stiffness", 155, 55);
  text("X - damping", 155, 85);
  text("Y - damping", 155, 115);

  
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
    v.steer(targets[currenttarget],k1x,k2x,k1y,k2y);
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
  else if(flag == 1){
    save('screenshot.gif');
  }
}