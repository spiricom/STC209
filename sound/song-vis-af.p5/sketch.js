/*
 * AF Visualizer, made with bits of code from P5 examples.
 */
 
var innerR = 20;
var stepR  = 10;
var wiggle = 20;
var rings  = 40;
 
var song, analyzer, fft;
var spectra = [];

var titles = [
 'hello-adele.mp3',
 'let-it-be-beatles.mp3',
 'natural-blues-moby.mp3',
 'pio-mentiroso-all-stars.mp3',
 'whats-up-4-non-blondes.mp3'
];

function preload() {
  var len  = titles.length;
  var ind  = round(random(1,len)-1);
  var full = 'assets/' + titles[ind];
  song = loadSound(full);
}

function setup() {
  createCanvas(800, 800);
  noFill();
  song.play();

  analyzer = new p5.Amplitude();

  analyzer.setInput(song);
  
  fft = new p5.FFT(0.4);
  fft.setInput(song);  
}

var phase = 0;
var frame = 0;

function setColor(ring) {
  var rms = analyzer.getLevel();
  var colorScale = 0.01;
  var perlin = noise( (frame-ring) * colorScale );
	var angle = map( perlin, 0.2, 0.8, 0, 720 ); 
  angle = int(floor(angle));
  angle = angle % 120 + 120;
  colorMode(HSB,360,1,1);
  fill(angle,0.6,0.8-rms*0.6,0.1);
  stroke("black");
}

function drawSpectrumFullRing(spectrum, radius, ring) {
  var center = width / 2;
  var len = spectrum.length;
  setColor(ring);
  beginShape();
  var seam = spectrum[len-1] - spectrum[0];
  for (var i = 0; i<len; i++) {
    var t = i / (len-1);     // [0..1]
    var a = 2 * Math.PI * t; // [0..2pi]
    var g = a + phase - ring * 0.02;
    var x = cos( g );
    var y = sin( g );
    var s = spectrum[i] - t * seam;
    var r = map(s, 0, 255, radius, radius+wiggle);
    vertex(center + x * r, center - y * r);
  }
  endShape();
}

function drawSpectra() {
  background("black");
  var n = spectra.length;
  for (var i = n-1; i>=0; i--) {
    var spectrum = spectra[n-i-1];
    var r = innerR + i * stepR;
    drawSpectrumFullRing(spectrum, r, i);
  }
}

function draw() {
  if (spectra.length >= rings) {
    spectra.shift();
  }
  
  // should do something different if sound is not playing...
  var spectrum = fft.analyze();

  // the first 40% seems most interesting
  var len = round(spectrum.length * 0.4);
  spectrum = spectrum.slice(0,len);
  
  spectra.push(spectrum);
  drawSpectra();
  phase += 0.01;
  frame++;
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    var d = floor(song.duration()-10);
    var p = random(10,d);
    song.jump(p);
  }
}
