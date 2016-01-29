// Modifying Daniel Shiffman's Vehicle Class http://natureofcode.com
 
// Click the mouse to choose the targets in input mode
// The agent will then steer to the targets
// While the agent is steering, you can change the parameters with the sliders
// If you want to take a screenshot of your pattern, click the mouse

// Steering function is: 
// angularacceleration = k1*(target_angle-angle) - k2*angularvelocity;

// i.e. the agent always moves at a constant speed and we can apply a control angular acceleration

var k1_Slider, k2_Slider;
var numtargets = 5;
var targetradius = 20;

var maxgain = 0.25;  // this sets the maximum gain, which is the upper limit of the sliders
var k1 = 0.005,
    k2 = 0.05,
    speed = 4;


var v; // vehicle
var flag = 0; // Used to alternate between 'input mode' and 'simulation mode'
var targets = []; // Stores targets
var currenttarget = 0; // Stores current target


function setup() {
  createCanvas(1100,670);
  v = new Vehicle(width/2, height/2,speed);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(15)
  noStroke();

  // create sliders
  k1_Slider = createSlider(0, 1000*maxgain, 1000*k1);
  k1_Slider.position(20, 20);
  k2_Slider = createSlider(0, 1000*maxgain, 1000*k2);
  k2_Slider.position(20, 50);
}

function draw() {
  if(flag==0){
    background(100)
  }

  fill(255,143,0);
  stroke(0);
  strokeWeight(2);
  
  k1 = k1_Slider.value()/1000;
  k2 = k2_Slider.value()/1000;
  
  text("Stiffness", 155, 25);
  text("Damping", 155, 55);
  
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
    v.steer(targets[currenttarget],k1,k2);
    v.update();
    
    // if target is reached, aim for the next target
    if(v.within(targets[currenttarget],targetradius/2)){
      if(currenttarget<numtargets-1){
        currenttarget++;
      }
      else{noLoop();} //if final target is reached, stop the program
    }

  }

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