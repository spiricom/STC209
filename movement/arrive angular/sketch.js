// Modifying Daniel Shiffman's Vehicle Class http://natureofcode.com

var v;
var flag = 0;
var targetradius = 30;
var targets = [];
var numtargets = 2;
var currenttarget = 0;

function setup() {
  createCanvas(1000,600);
  v = new Vehicle(width/2, height/2,0.1,1);
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
      if(currenttarget<numtargets){
        currenttarget++;
      }
      else{noLoop();}
    }

  }

  v.display();

};


function mouseClicked(){

  if(targets.length<numtargets){
    targets.push(createVector(mouseX, mouseY));
  }
  else if(flag == 0){
    targets.push(createVector(mouseX, mouseY));
    flag = 1;
  }
}