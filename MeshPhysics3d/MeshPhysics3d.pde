import toxi.color.*;
import toxi.volume.*;
import toxi.processing.*;
import toxi.geom.*;
import toxi.geom.mesh.*;
import toxi.physics.*;
import toxi.physics.behaviors.*;
import java.util.List;

VerletPhysics physics;
ToxiclibsSupport gfx;
ParticleMesh mesh;

// Parameters
float STRENGTH = 0.99;
float scaleAmt = 3;;
float rotateLerpSpeed = 0.05;

// global variables
float strength;
int idxClosest;
boolean selectionScreen;
boolean isMouseMoving;
float fx, fy, fz;
float rotX, rotY;
float rotateLerpSpeed_;
ArrayList<Integer> selectedParticles;


// different forces for different points? 
// slider for strength
// restarting physics button
// export stl


void setup() {
  size(800, 800, P3D);
  gfx = new ToxiclibsSupport(this);
  physics=new VerletPhysics();
  initMesh();
  setupGui();
  goToSelectionMode();
  initPhysics();
}

void goToSelectionMode() {
  selectionScreen = true;
  selectedParticles = new ArrayList<Integer>();
  initMesh();
  initPhysics();
  rotateLerpSpeed_ = 0;
}

void goToSimulation() {
  selectionScreen = false;
  initPhysics();
}

void update() {
  physics.update();
  
  if (selectionScreen && isMouseMoving) {
    isMouseMoving = false;    
    float minDist = width+height;
    
    for (int i=0; i<mesh.particles.size(); i++) {
      float d = dist((mouseX-width/2)/scaleAmt, (mouseY-height/2)/scaleAmt, mesh.particles.get(i).x, mesh.particles.get(i).y);
      if (d < minDist) {
        minDist = d;
        idxClosest = i;
      }
    }
    if (minDist > 10) {
      idxClosest = -1;
    }
  }

  if (isMouseMoving && pmouseX==mouseX && pmouseY==mouseY) {
    isMouseMoving = false;
  }
}

void draw() {
  update();
  
  background(255);
  noStroke();
  
  pushMatrix();
  translate(width*0.5, height*0.5, 0);
  
  if (!selectionScreen) {
    rotateLerpSpeed_ = lerp(rotateLerpSpeed_, rotateLerpSpeed, 0.05);
    rotX = lerp(rotX, map(mouseY,0,height,-PI,PI), rotateLerpSpeed_);
    rotY = lerp(rotY, map(mouseX,0,width,-PI,PI), rotateLerpSpeed_);
    rotateX(rotX);
    rotateY(rotY);
  }
  
  scale(scaleAmt);
  
  // draw springs
  for (VerletSpring s : mesh.springs) {
    stroke(0,50);
    noFill();
    pushMatrix();
    line(s.a.x, s.a.y, s.a.z, s.b.x, s.b.y, s.b.z);
    popMatrix();
  }

  // draw selected particles
  for (int idx : selectedParticles) {
    fill(0, 255, 0);
    pushMatrix();
    translate(mesh.particles.get(idx).x, mesh.particles.get(idx).y, mesh.particles.get(idx).z);
    sphere(2);
    popMatrix();
  }
  if (idxClosest != -1) {
    fill(255, 0, 0);
    pushMatrix();
    translate(mesh.particles.get(idxClosest).x, mesh.particles.get(idxClosest).y, mesh.particles.get(idxClosest).z);
    sphere(2);
    popMatrix();
  }

  popMatrix();
    
  if (selectionScreen) {  
    cp5.draw();
  }
}

void keyPressed() {
  if (key==' ') {
    if (selectionScreen)  goToSimulation();
    else goToSelectionMode();
  }
}

void mousePressed() {
  if (selectionScreen) {
    if (idxClosest != -1) {
      selectedParticles.add(idxClosest);
    }
  }
}

void mouseMoved() {
  isMouseMoving = true;
}
