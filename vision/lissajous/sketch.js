var theta;
var offset = 0;

function setup() {

  // Sets the screen to be 720 pixels wide and 400 pixels high
  createCanvas(800, 400);
  background(0);
  stroke(255);
  strokeWeight(5);
  frameRate(50);

}

function draw() {

background(0);


translate(width/4,height/2);
fill(255);

beginShape();
theta = 0;
while(theta<2*PI)
{
  x = 150*cos(round(10*(mouseX/width))*theta);
  y = 150*sin(round(20*(mouseY/width))*theta + offset);
  //jitter = 2*noise(x+offset,y+offset);
  //jitter = 1;
  //jitter = 2*random();
  vertex(y, x);
  theta = theta + 0.01;
}
endShape();

translate(width/2,0);
noFill();

beginShape();
theta = 0;
while(theta<2*PI)
{
  x = 150*cos(round(10*(mouseX/width))*theta);
  y = 150*sin(round(20*(mouseY/width))*theta + offset);
  //jitter = 2*noise(x+offset,y+offset);
  //jitter = 1;
  //jitter = 2*random();
  vertex(y, x);
  theta = theta + 0.01;
}
endShape();


offset += 0.01;
}