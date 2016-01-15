function preload(){
  //sound = loadSound('440.mp3');
}

function setup(){
  cnv = createCanvas(800,400);
  //sound.amp(1);
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
  var spectralCentroid = 0;
  
  
  background(0);
  stroke(0,255,0);
  var spectrum = fft.analyze(); 
  //noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    var x = map(log(i), 0, log(spectrum.length), 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    //var next_x = map(log(i+1), 0, log(spectrum.length), 0, width);
    //var rectangle_width = next_x - x;
    var rectangle_width = (log(i+1)-log(i))*(width/log(spectrum.length));
    rect(x, height, rectangle_width, -h )
  
    cumulative_sum += (i)*spectrum[i];
    normalization += spectrum[i];
  }
  
 
 
  var sampleRate = 44100;
  var fftSize = 2048;
  
  if(normalization != 0)
  {
    var mean_freq_index = cumulative_sum/normalization;
    //centroid = map(mean_freq_index, 0, spectrum.length, 0, width);
    centroidplot = map(log(mean_freq_index), 0, log(spectrum.length), 0, width);
    spectralCentroid = mean_freq_index * sampleRate / fftSize;
  }

  fill(255);
  rect(centroidplot, 0, width / spectrum.length, height)

  textSize(40);
  text("centroid: "+round(spectralCentroid)+" Hz", width-400, 100);


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

}

// fade sound if mouse is over canvas

