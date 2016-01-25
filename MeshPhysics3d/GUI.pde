import controlP5.*;

ControlP5 cp5;

void setupGui() {
  
  cp5 = new ControlP5(this);
  
  // add a horizontal sliders, the value of this slider will be linked
  // to variable 'sliderValue' 
  cp5.addSlider("forceX").setPosition(20,20).setSize(100,20).setRange(-1,1).setColorCaptionLabel(0);
  cp5.addSlider("forceY").setPosition(20,45).setSize(100,20).setRange(-1,1).setColorCaptionLabel(0);
  cp5.addSlider("forceZ").setPosition(20,70).setSize(100,20).setRange(-1,1).setColorCaptionLabel(0);
  cp5.addButton("GO").setPosition(20,95);
  
  cp5.setAutoDraw(false);
}

void GO(boolean val) {
  goToSimulation();
}

void forceX(float theValue) {fx = theValue;}
void forceY(float theValue) {fy = theValue;}
void forceZ(float theValue) {fz = theValue;}

