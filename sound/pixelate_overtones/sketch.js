var posx;
var posy;
var pixel = [];
var downsample = 43;
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
var myX = 0;
var myY = 0;
var lastX = -1;
var lastY = 0;

var readReady = 0;

var myWidth = 0;
var myHeight = 0;

var myPart;


var phrases;
var pattern = [];

var whichBeat = 0;

function preload()
{
  myImage = loadImage("hqdefault.jpg");
  //osc = new p5.TriOsc(); // set frequency and type
  //osc.amp(.0);
  //pixelDensity(.025);
  //envelope = new p5.Env(0.01, 0.5, .5, 0.5);
  //osc.start();
}

function setup()
{
  createCanvas(640, 480);

  image(myImage, 0, 0);
  myImage.loadPixels();
  myImage.updatePixels();
  resizeMe();
  //resizeCanvas(myImage.width * scaling, myImage.height * scaling);
  frameRate(60);
  //background(0);
  pixelate();
}
 
function draw()
{
  if (readReady == 1)
  {
    prepareSequence();
  }
  var localBeat = whichBeat;
  if ((readReady == 3) && (localBeat != lastX))
  {
    //print("drawing");
    
    for (myY = 0; myY < myHeight; myY++)
    {
      //reset the previous dot to original color
      if (lastX != -1)
      {
        pixel = myPixels[lastX][myY];
        noStroke();
        fill(pixel);
        ellipse(lastX*downsample*scaling + (.5 * downsample * scaling),myY*downsample*scaling + (.5 * downsample * scaling),downsample*scaling,downsample*scaling);
      }
      //highlight the current dot
      pixel = myPixels[whichBeat][myY];
      //pixel[0] = 0;
      fill(0);
      ellipse(localBeat*downsample*scaling +  (.5 * downsample * scaling),myY*downsample*scaling + (.5 * downsample * scaling),downsample*scaling,downsample*scaling);
    }
    lastX = localBeat;
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
    resizeMe();
    
    //now run the pixelate function to draw the picture
    pixelate();
  }
  
  //update the previous value variables
  lastOffset = offset;
  lastDownsample = downsample;
  //print("downsample is now " + downsample);
}

function resizeMe()
{
  //update the canvas size to account for the new downsampling value (this is to make the edges line up nice)
  print("downsample = " + downsample);
  var wCorrection = round(((myImage.width / downsample) - ((int) (myImage.width / downsample))) * downsample);
  //print("wCorrection = " + wCorrection);
  var hCorrection = round(((myImage.height / downsample) - ((int) (myImage.height / downsample))) * downsample);
  //print("hCorrection = " + hCorrection);
  var newWidth = (myImage.width - wCorrection) * scaling;
  var newHeight = (myImage.height - hCorrection) * scaling;
  resizeCanvas(newWidth, newHeight);
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
  print("myImage " + myImage.width);
  
  myWidth = (int)(myImage.width / downsample);
  myHeight = (int)(myImage.height / downsample);
  print("myHeight = " + myHeight);
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
      if ((i == myWidth * downsample) && (j == myHeight * downsample))
      {
         readReady = 1;
         print("finished filling array");
      }
    }
  }

}

function prepareSequence()
{

  readReady = 2;
  print("prepareSequence");  
  var which = 0;
  myPart = new p5.Part();

  //prepare the number of voices
  for (which = 0; which < myHeight; which++)
  {
    pattern[which] = [];
    
    
    osc[which] = new p5.SinOsc();
    envelope[which] = new p5.Env(.25, 0.7, .25, 0.5);
    
    envelope[which].setInput(osc[which]);
    osc[which].start();
    

    
  }
  phrases = new p5.Phrase('beats', playPhrase, 1);
  myPart.addPhrase(phrases);
  myPart.setBPM(80);
  masterVolume(0.2);
  myPart.loop();
  readReady = 3;
}

function playPhrase(time)
{
  if (readReady == 3)
  {
    //print("hello");
    for (var voice = 0; voice < myHeight; voice++)
    {
        //var myPitch = midiToFreq((myPixels[whichBeat][voice][0]) / 2.5);
        var myPitch = (int(myPixels[whichBeat][voice][0]/16)) * 50.0;
        osc[voice].freq(myPitch);
        if (myPixels[whichBeat][voice][0] > 0)
        {
          envelope[voice].play(osc[voice], time);
        }
    }
    //print("whichBeat = " + whichBeat);
    setTimeout(incrementBeat, time * 1000);
    //print(time);
  }
}

function incrementBeat()
{
    whichBeat = (whichBeat + 1) % int(myWidth);
    //print("whichBeat timeout = " + whichBeat);
}

