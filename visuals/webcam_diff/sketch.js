var img;
var previmg = new Array(640*480);

function preload() {
  img = createCapture(VIDEO);
  img.hide();
}

function setup() {
  createCanvas(640, 480);

}

function draw()
{
  image(img, 0, 0);

  loadPixels();
  
//  for (var i = 0; i < pixels.length; i++) 
//  {
//    previmg[i] = pixels[i];
//  }
  
  for (var i = 0; i < pixels.length; i+=4) 
  {
    if (abs(previmg[i] - pixels[i]) < 50)
    {
      previmg[i] = pixels[i];

      pixels[i] = 255;
      pixels[i+1] = 255;
      pixels[i+2] = 255;

    }
    else
    {
      previmg[i] = pixels[i];
  
      pixels[i]=0;
      pixels[i+1]=0;
      pixels[i+2]=0;
    }

  }  
  //  pixels[i] = 255 - pixels[i];
  updatePixels();
  
}

