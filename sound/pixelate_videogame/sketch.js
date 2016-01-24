var posx;
var posy;
var pixel = [];
var downsample = 10;
var scaling = 1;
var myImage;
var i;
var offset = 0;
var noisePos = 0;
var lastOffset = 0;
var lastDownsample = 0;
var overlap = 0;

var myPixels = [];
var osc;
var envelope;
var myX = 0;
var myY = 0;
var lastX = 0;
var lastY = 0;

var readReady = 0;

function preload()
{
  myImage = loadImage("plaid3.jpg");
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(.0);

  envelope = new p5.Env(0.01, 0.5, .5, 0.5);
  osc.start();

}

function setup()
{
  createCanvas(640, 480);

  image(myImage, 0, 0);
  myImage.loadPixels();
  myImage.updatePixels();
  resizeCanvas(myImage.width * scaling, myImage.height * scaling);
  frameRate(60);
  background(0);
  pixelate();
}
 
function draw()
{
  if (readReady == 1)
  {
    var midiValue = (myPixels[myX][myY][0]/(3));
    var freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);
    envelope.play(osc);

    //reset the previous dot to original color
    pixel = myImage.get(lastX*downsample,lastY*downsample);
    noStroke();
    fill(pixel);
    ellipse(lastX*downsample*scaling + (.5 * downsample * scaling),lastY*downsample*scaling + (.5 * downsample * scaling),downsample*scaling,downsample*scaling);

    //highlight the current dot
    fill(255);
    ellipse(myX*downsample*scaling +  (.5 * downsample * scaling),myY*downsample*scaling + (.5 * downsample * scaling),downsample*scaling,downsample*scaling);
    
    lastX = myX;
    lastY = myY;
    
    myX = (myX + 1) % ((int)(myImage.width / downsample));
    if (myX ==0)
    {
      myY = (myY + 1) % ((int)(myImage.height / downsample))
    }
  }
}

function mousePressed()
{
  
  /*
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
  */
}

function pixelate()
{
  var xpos;
  var ypos;
  
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
      var newxpos = i / downsample;
      var newypos = j / downsample;
      //print("newypos = " + newypos);
      myPixels[newxpos][newypos] = pixel;
      //myPixels[i/downsample][j/downsample] = pixel;
      //print(myPixels[i][j]);
      //draw a box with the picker color at the downsampled position
      noStroke();
      fill(pixel);
      ellipse(i*scaling + (.5 * downsample * scaling),(j*scaling)  + (.5 * downsample * scaling),downsample*scaling ,downsample*scaling);
    }
  }
  readReady = 1;
}