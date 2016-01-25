
void initMesh() {
  mesh = new ParticleMesh(STRENGTH);
}

void initPhysics() {
  
  physics.setWorldBounds(new AABB(new Vec3D(0,0,0),500));

  //physics.addBehavior(new GravityBehavior(new Vec3D(0,0,0.5)));
  
  /*
  ConstantForceBehavior cfb = new ConstantForceBehavior(new Vec3D(0, 0, 0.1));
  mesh.particles.get(100).addBehavior(cfb);
    mesh.particles.get(10).addBehavior(cfb);
    mesh.particles.get(30).addBehavior(cfb);
    mesh.particles.get(50).addBehavior(cfb);
    mesh.particles.get(200).addBehavior(cfb);
  */
    
  for (Integer idx : selectedParticles) {
    //ConstantForceBehavior f = new ConstantForceBehavior(new Vec3D(fx, fy, fz));
    println("add to " + idx + " " + fx + ", " + fy + ", " + fz);
  //  mesh.particles.get(idx).addBehavior(f);
    
    ConstantForceBehavior cfb = new ConstantForceBehavior(new Vec3D(fx, fy, fz));
    mesh.particles.get(idx).addBehavior(cfb);
  
    

  }
  
  
  
  // pin corners of 1st mesh in space
//  m1.getParticleAt(new Vec2D(0,0)).lock();
//  m1.getParticleAt(new Vec2D(DIM-1,0)).lock();
//  m1.getParticleAt(new Vec2D(DIM-1,DIM-1)).lock();
//  m1.getParticleAt(new Vec2D(0,DIM-1)).lock();
//  m1.getParticleAt(new Vec2D(DIM/2,DIM/2)).lock();
//  //for (int i=0; i<50; i++)
    //m1.particles.get(i).lock();
  
  
//  ConstantForceBehavior cfb = new ConstantForceBehavior(new Vec3D(0, 0, 0.1));
//  m1.particles.get(100).addBehavior(cfb);
  
}

