//Jeff made this new crazy diff - with different thresholds for the different colors - it’s slower, 
//but it looks super cool.

var img;
var previmg = new Array(640*480);

function preload() {
  img = createCapture(VIDEO);

  img.hide();
}

function setup() {
  createCanvas(640, 480);
    pixelDensity(.6);
}

function draw()
{
  image(img, 0, 0);

  loadPixels();
  
  
  for (var i = 0; i < pixels.length; i+=4)
  {
    if (abs(previmg[i] - pixels[i]) < 60)
    {
      previmg[i] = pixels[i];

      pixels[i] = 255;
    }
      else
    {
      previmg[i] = pixels[i];
      pixels[i]=0;
    }
  
    if (abs(previmg[i+1] - pixels[i+1]) < 40)
    {
      previmg[i+1] = pixels[i+1];
      pixels[i+1] = 255;
    }
    else
    {
      previmg[i+1] = pixels[i+1];
      pixels[i+1]=0;
    }
    if (abs(previmg[i+2] - pixels[i+2]) < 30)
    {
      previmg[i+2] = pixels[i+2];
      pixels[i+2] = 255;
    }
    else
    {
      previmg[i+2] = pixels[i+2];
      pixels[i+2]=0;
    }
    

  }  
  updatePixels();

}

