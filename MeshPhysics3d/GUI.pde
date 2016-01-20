import controlP5.*;

ControlP5 cp5;

void setupGui() {
  
  cp5 = new ControlP5(this);
  
  // add a horizontal sliders, the value of this slider will be linked
  // to variable 'sliderValue' 
  cp5.addSlider("slider")
     .setPosition(20,20)
     .setSize(100,25)
     .setRange(0,255);
  
  cp5.setAutoDraw(false);
}

void slider(float theValue) {
  //myColor = color(theColor);
  println("a slider event. setting background to "+theValue);
}

