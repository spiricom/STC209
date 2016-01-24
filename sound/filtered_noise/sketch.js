/*
White noise through a bandpass filter. X axis is filter cutoff frequency, Y axis is envelope time.
 */
var my_noise, env, analyzer;
var filter, filterFreq, filterWidth;
var freezeSpot = [];
var rhythm = [2, 4, 8, 8, 4, 2, 4, 4, 8, 8, 8, 8, 8];
var length = 7;
var i = 0;
var xoff = .4;

function setup() {
  createCanvas(710, 200);
  my_noise = new p5.Noise(); // other types include 'brown' and 'pink'
  my_noise.disconnect(); // Disconnect soundfile from master output...
  filter = new p5.BandPass();
  filter.process(my_noise); // ...and connect to filter so we'll only hear BandPass.
  my_noise.start();
  frameRate(100);

  // multiply noise volume by 0
  // (keep it quiet until we're ready to make noise!)
  my_noise.amp(0);

  // the Env accepts time / value pairs to
  // create a series of timed fades
  env = new p5.Env(.0, 1, .5, 0.0);

  // p5.Amplitude will analyze all sound in the sketch
  // unless the setInput() method is used to specify an input.
  analyzer = new p5.Amplitude();
  //background(0);
}

function draw() {
  
  background(0);
  // get volume reading from the p5.Amplitude analyzer
  var level = analyzer.getLevel();
  
    // Map mouseX to a bandpass freq from the FFT spectrum range: 10Hz - 22050Hz
  filterFreq = map (freezeSpot[0], 0, width, 10, 9000);
  // Map mouseY to resonance/width
  filterWidth = 2;

  // set filter parameters
  filter.set(filterFreq, filterWidth);

  // use level to draw a green rectangle
  var levelHeight = map(level, 0, .4, 0, 200);
  
  var r = map( noise (freezeSpot[0]/width, level), 0.0, 1.0, 0, 255);
  var g = map( noise (level, freezeSpot[1]/height), 0.0, 1.0, 0, 255);
  var b = map( noise (level, level), 0.0, 1.0, 0, 255);
  
  fill(r,g,b);
  
  ellipse(freezeSpot[0], freezeSpot[1], levelHeight, levelHeight);
  /*
  env.play(noise);
  frameRate(rhythm[i % length]);
  i++;
  */
}

function mousePressed() {
  freezeSpot[0] = mouseX;
  freezeSpot[1] = mouseY;
  env.set(.0, 1, map(freezeSpot[1], 0, height, 1.5, .05), 0.0, 0., 0., 0., 0., 1);
  env.setExp(1);
  env.play(my_noise);

}
