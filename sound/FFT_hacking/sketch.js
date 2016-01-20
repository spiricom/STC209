function preload(){
  //sound = loadSound('sample.mp3');
}

function setup(){
  cnv = createCanvas(800,400);
  //sound.amp(0);
  //sound.loop();

  sound = new p5.AudioIn();
  sound.start();

  fft = new p5.FFT();
  sound.connect(fft);
  
}


function draw(){

var normalization = 0.0;
var cumulative_sum = 0.0;
var centroid = 0.0;
var centroidplot = 0.0;


  background(0);

  var spectrum = fft.analyze(); 
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    var x = map(log(i), 0, log(spectrum.length), 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )

    cumulative_sum += i*spectrum[i];
    normalization += spectrum[i];
  }


if(normalization != 0)
{
  centroid = map(cumulative_sum/normalization, 0, spectrum.length, 0, width);
  centroidplot = map(log(cumulative_sum/normalization), 0, log(spectrum.length), 0, width);

  
}
else
{
 centroid = 0;
}

  fill(255);
  rect(centroidplot, 0, width / spectrum.length, height)
  
  var sampleRate = 44100;
  var fftSize = 2048;
  var spectralCentroid = centroid * sampleRate / fftSize;

  textSize(40);
  text("centroid: "+spectralCentroid, width-400, 100);


  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  isMouseOverCanvas();
}

// fade sound if mouse is over canvas

function isMouseOverCanvas() {
  var mX = mouseX, mY = mouseY;
  if (mX > 0 && mX < width && mY < height && mY > 0) {
      sound.amp(0.5, 0.2);
  } else {
    sound.amp(0, 0.2);
  }
}

