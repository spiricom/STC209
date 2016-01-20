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
List<ParticleMesh> meshes;

int DIM=20;
int REST_LENGTH = 100;
float STRENGTH = 0.99;


// display flat mesh + select points to pin
//  - select 3 points, and use sliders to select force 
// slider for strength
// restarting physics button
// export stl

int normalLength;
boolean doUpdate=true;
boolean isWireframe=true;


void setup() {
  size(800,800,P3D);
  meshes=new ArrayList<ParticleMesh>();
  gfx=new ToxiclibsSupport(this);
  initPhysics();
  setupGui();
}

void draw() {
  if (doUpdate) {
    physics.update();
  }
  background(255);
  noStroke();
  
  pushMatrix();
  
  translate(width*0.5,height*0.5,100);
  rotateX(map(mouseY,0,height,-PI,PI));
  rotateY(map(mouseX,0,width,-PI,PI));
  scale(2);
  lights();
 
 
  for(ParticleMesh m : meshes) {
    
    /*
    for (VerletParticle p : m.particles) {
      stroke(0);
      fill(0);
      pushMatrix();
      translate(p.x, p.y, p.z);
    
      ellipse(0, 0, 5, 5);
      popMatrix();
    }
    */
    for (VerletSpring s : m.springs) {
      stroke(0,50);
      noFill();
      pushMatrix();
      line(s.a.x, s.a.y, s.a.z, s.b.x, s.b.y, s.b.z);
      popMatrix();
    }

    /*
    if (isWireframe) {
      //stroke(m.col.toARGB());
      stroke(0);
      noFill();
    } else {
      fill(m.col.toARGB());
      noStroke();
    }
    m.buildMesh();
    gfx.mesh(m.mesh,true,normalLength);
  */  
  }
 
  
  
  popMatrix();
  
  cp5.draw();
  
}

void keyPressed() {
  switch(key) {
  case ' ':
    TriangleMesh export=new TriangleMesh();
    for(ParticleMesh m : meshes) {
      export.addMesh(m.mesh);
    }
    export.saveAsSTL(sketchPath("catanary.stl"));
    break;
  case 'n':
    normalLength=(normalLength==0) ? 10 : 0;
    break;
  case 'u':
    doUpdate=!doUpdate;
    break;
  case 'v':
    saveVoxelized();
    break;
  case 'r':
    initPhysics();
    break;
  case 'w':
    isWireframe=!isWireframe;
    break;
  }
}

void initPhysics() {
  physics=new VerletPhysics();
  //physics.addBehavior(new GravityBehavior(new Vec3D(0,0,0.5)));
  physics.setWorldBounds(new AABB(new Vec3D(0,0,0),500));
  
  
  
  meshes.clear();
  //ParticleMesh m1 = new ParticleMesh(DIM,REST_LENGTH,STRENGTH,TColor.CYAN);
  ParticleMesh m1 = new ParticleMesh(REST_LENGTH,STRENGTH,TColor.CYAN);
  meshes.add(m1);  

  // pin corners of 1st mesh in space
//  m1.getParticleAt(new Vec2D(0,0)).lock();
//  m1.getParticleAt(new Vec2D(DIM-1,0)).lock();
//  m1.getParticleAt(new Vec2D(DIM-1,DIM-1)).lock();
//  m1.getParticleAt(new Vec2D(0,DIM-1)).lock();
//  m1.getParticleAt(new Vec2D(DIM/2,DIM/2)).lock();
//  //for (int i=0; i<50; i++)
    //m1.particles.get(i).lock();
  
  
  ConstantForceBehavior cfb = new ConstantForceBehavior(new Vec3D(0, 0, 0.1));
  m1.particles.get(100).addBehavior(cfb);
  
//  ConstantForceBehavior cfb = new ConstantForceBehavior(new Vec3D(0, 0, 0.5));
  //cfb.apply(m1.getParticleAt(new Vec2D(0,0)));
  //physics.addBehavior(cfb);
 
}
