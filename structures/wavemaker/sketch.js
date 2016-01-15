var x, y;
var t = 0;
var phase;
var signx,signy;

a = 25; //circle radius
w = 8; //angular frequency
p = 3; // pulse frequency

function preload(){
  bg = loadImage('circles.png');
}

function setup() {
  createCanvas(600, 600);
  stroke(0);
  fill(0);
  frameRate(50);
}

function draw() {

  background(bg);

  for(var x = 0; x<width+a; x+=1.2*a)
  {
    for(var y = 0; y<height+a; y+=1.2*a)
    {

      phasex = p*PI*(x/width)
      phasey = p*PI*(y/width)
      
      if(mouseX<width)
      {
        signx = (mouseX-width/2)/(width/2);
      }
      else
      {
        signx = 1;
      }
      
      if(mouseY<height)
      {
        signy = (mouseY-height/2)/(height/2);
      }
      else
      {
        signy = 1;
      }
      
      phase = signx*phasex + signy*phasey;

      // Draw particles
      ellipse(x + a*cos(w*t + phase), y + a*sin(w*t + phase), 10, 10);
    
    /*
      // Code for drawing circles
      // This bit isn't run because it's preloaded as an image instead to reduce CPU load
      strokeWeight(1);
      noFill();
      ellipse(x , y, 2*a, 2*a);
	*/
    
    }
  }


  
  if(w*t>=2*PI)
  {
    t=0;
  }

  t += 0.01;
}