var a = 200; //circle radius
var b = 50;
var h = 50;

function preload(){}

function setup() {
  createCanvas(600, 600);
  stroke(0);
  fill(0);
//  frameRate(50);

  x = width/2;
  y = height/2;

  //noLoop();
 
  // create sliders
  aSlider = createSlider(0, 200, 160);
  aSlider.position(20, 20);
  bSlider = createSlider(0, 50, 33);
  bSlider.position(20, 50);
  hSlider = createSlider(0, 400, 150);
  hSlider.position(20, 80); 

  text("a", 165, 35);
  text("b", 165, 65);
  text("h", 165, 95);
  
}

function draw() {

  var a = aSlider.value();
  var b = bSlider.value();
  var h = hSlider.value();

  background(255);

  if((a-b)/b > 1)
  {
    max = (a-b)/b;
  }
  else
  {
    max = 1;
  }
  

  for(var t=0;t<=b*2*PI; t += 0.001)
  {
    point(x + (a-b)*cos(t) + h*cos(((a-b)/b)*t), x + (a-b)*sin(t) - h*sin(((a-b)/b)*t));
  }

  noLoop();
}

function mouseClicked() {
  loop();
}

