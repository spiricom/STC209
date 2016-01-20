function preload(){
  //sound = loadSound('440.mp3');
}

function setup(){
  cnv = createCanvas(800,600);
  //sound.amp(1);
  //sound.loop();

  sound = new p5.AudioIn();
  sound.start();

  fft = new p5.FFT();
  sound.connect(fft);
  
}


function draw(){

	background(0);

  var normalization = 0.0;
  var cumulative_sum = 0.0;
  var centroid = 0.0;
  var centroidplot = 0.0;
  var spectralCentroid = 0;
  
  
  var spectrum = fft.analyze(); 
  for (var i = 0; i< spectrum.length; i++){
    var x = map(log(i), 0, log(spectrum.length), 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    var rectangle_width = (log(i+1)-log(i))*(width/log(spectrum.length));
    //rect(x, height, rectangle_width, -h )
  
    cumulative_sum += (i)*spectrum[i];
    normalization += spectrum[i];
  }

  var sampleRate = 44100;
  var fftSize = 2048;
  
  if(normalization != 0)
  {
    var mean_freq_index = cumulative_sum/normalization;
    centroidplot = map(log(mean_freq_index), 0, log(spectrum.length), 0, width);
    spectralCentroid = mean_freq_index * sampleRate / fftSize;
  }

  //fill(255);
  //rect(centroidplot, 0, width / spectrum.length, height)
  //textSize(40);
  //text("centroid: "+round(spectralCentroid)+" Hz", width-400, 100);

  var waveform = fft.waveform();

  noFill();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);

/*
  beginShape();
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
*/


  //This part draws a circle
  //that can be modulated
  var size = 200;
  push();
	translate(width/2,height/2);
  beginShape();
  theta = 0;


  for (var i = 0; i< waveform.length; i++){
    //var x = map(i, 0, waveform.length, 0, width);
    var theta = 2*PI*(i/waveform.length);
    var modulate = waveform[i];
    var x = (200+200*modulate)*cos(theta);
    var y = (200+200*modulate)*sin(theta);
    vertex(x,y);
  }



/*
while(theta<2*PI)
  {
    x = size*cos(theta);
    y = size*sin(theta);
    jitter = 1;
    vertex(jitter*x, jitter*y);
    theta = theta + 0.02;
  }
*/

  endShape();
  pop();

}

