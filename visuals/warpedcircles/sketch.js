var theta;
var phase = 0;

function setup() {

  createCanvas(600, 600);
  background(0);
  noStroke();
  frameRate(50);

}

function draw() {

	background(0);
	translate(width/2,height/2);

	fill(255,255,178);
	makeShape(200);
	fill(254,204,92);
	makeShape(160);
	fill(253,141,60);
	makeShape(120);
	//fill(227,26,28);
	fill(240,59,32)
	makeShape(80);
	fill(189,0,38);
	makeShape(40);

	phase += 0.01;

}

function makeShape(size){
  
  beginShape();
  theta = 0;
  while(theta<2*PI)
  {
    x = size*cos(theta);
    y = size*sin(theta);
    jitter = 2*noise(cos(round(5*(mouseX/width))*theta)+phase,sin(round(5*(mouseY/height))*theta)+phase);
    vertex(jitter*x, jitter*y);
    theta = theta + 0.02;
  }
  endShape();

}
