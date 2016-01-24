var posx;
var posy;
var pixel = [];
var downsample = 40;
var scaling = 1;
var myImage;
var i;
var offset = 0;
var noisePos = 0;
var lastOffset = 0;
var lastDownsample = 0;
var overlap = 0;

var myPixels = [];
var osc = [];
var envelope = [];
var lp = [];
var myX = 0;
var myY = 0;
var lastX = 0;
var lastY = 0;
var numOsc = 3;
var readReady = 0;

function preload()
{
  myImage = loadImage("hqdefault.jpg");
  for (i = 0; i < numOsc; i++)
  {
    osc[i] = new p5.SawOsc(); // set frequency and type
    osc[i].amp(.0);
    lp[i] = new p5.BandPass();
    envelope[i] = new p5.Env(0.01, 0.3, .2, 0.5);
    
    osc[i].disconnect();
    osc[i].connect(lp[i]);
    osc[i].start();
  }
}

function setup()
{
  createCanvas(640, 480);

  image(myImage, 0, 0);
  myImage.loadPixels();
  myImage.updatePixels();
  resizeCanvas(myImage.width * scaling, myImage.height * scaling);
  frameRate(60);
  pixelate();
}
 
function draw()
{
  if ((frameCount % 10 == 0) && (readReady == 1)) 
  {
    
    for (i = 0; i < numOsc; i++)
    {
      var midiValue = (myPixels[myX][myY][i] / 4) + 40;
      var freqValue = midiToFreq(midiValue);
      osc[i].freq(freqValue);
      //print(myPixels[myX][myY][2]/ 255.0)
      envelope[i].set(0.01, (myPixels[myX][myY][(i+2)%3]/ (255.0 * numOsc)), .5, 0.5);
      lp[i].freq(midiToFreq((myPixels[myX][myY][(i+1)%3]) / 2));
      lp[i].res(midiToFreq((myPixels[myX][myY][(i)%3]) / 255.0 * numOsc));
      envelope[i].play(osc[i]);
    }
    
    


    //reset the previous dot to original color
    pixel = myImage.get(lastX*downsample,lastY*downsample);
    noStroke();
    fill(pixel);
    rect(lastX*downsample*scaling-overlap,lastY*downsample*scaling-overlap,downsample*scaling+overlap,downsample*scaling+overlap);
    lastX = myX;
    lastY = myY;
    
    //highlight the current dot
    fill(255);
    rect(myX*downsample*scaling-overlap,myY*downsample*scaling-overlap,downsample*scaling+overlap,downsample*scaling+overlap);
    
    pixel = myImage.get(myX*downsample,myY*downsample);
    pixel[3] = 150;
    fill(pixel);
    rect(myX*downsample*scaling-overlap,myY*downsample*scaling-overlap,downsample*scaling+overlap,downsample*scaling+overlap);
    
    
    myX = (myX + 1) % (int)(myImage.width / downsample);
    if(myX == 0)
    {
      myY = (myY+ 1) % (int)(myImage.height / downsample);
    }
  }
}

function mousePressed()
{
  
  
  //click the right side of the window for higher downsampling
  downsample = ((int) (mouseX / width * 20)) + 5;
  
  //get a drifting offset value to apply to the chosen pixel choose for the downsampled pixel position
  offset = (int)((noise(noisePos)) * downsample);
  noisePos++;
  
  //if the parameters changed, redraw the pixelated image
  if ((offset != lastOffset) || (downsample != lastDownsample))
  {
    //update the canvas size to account for the new downsampling value (this is to make the edges line up nice)
    print("downsample = " + downsample);
    var wCorrection = round(((myImage.width / downsample) - ((int) (myImage.width / downsample))) * downsample);
    print("wCorrection = " + wCorrection);
    var hCorrection = round(((myImage.height / downsample) - ((int) (myImage.height / downsample))) * downsample);
    print("hCorrection = " + hCorrection);
    var newWidth = (myImage.width - wCorrection) * scaling;
    var newHeight = (myImage.height - hCorrection) * scaling;
    resizeCanvas(newWidth, newHeight);
    
    //now run the pixelate function to draw the picture
    pixelate();
  }
  
  //update the previous value variables
  lastOffset = offset;
  lastDownsample = downsample;
  
}

function pixelate()
{
  var xpos;
  var ypos;
  
  readReady = 0;
  for (i = 0; i < (myImage.width / downsample); i++)
  {
        myPixels[i] = [];
        for (j = 0; j <  (myImage.height / downsample); j++)
        {
          myPixels[i][j] = [0,0,0,0];
        }
  }
  
  
  for (i = 0; i < myImage.width; i+=downsample)
  {

    for (j = 0; j < myImage.height; j+=downsample)
    {
 
      //make sure the offset doesn't push the color picker off the image
      if (i+offset < myImage.width)
      {
        xpos = i+offset;
      }
      else
      {
        xpos = i;
      }
      if (j+offset < myImage.height)
      {
        ypos = j+offset;
      }
      else
      {
        ypos = j;
      }
      
      //get the color at the picker position
      pixel = myImage.get(xpos,ypos);
      var newxpos = (int)(i / downsample);
      var newypos = (int)(j / downsample);
      //print("newypos = " + newypos);
      myPixels[newxpos][newypos] = pixel;
      //myPixels[i/downsample][j/downsample] = pixel;
      //print(myPixels[i][j]);
      //draw a box with the picker color at the downsampled position
      noStroke();
      fill(pixel);
      rect(i*scaling-overlap,j*scaling-overlap,downsample*scaling+overlap,downsample*scaling+overlap);
    }
  }
  readReady = 1;
}