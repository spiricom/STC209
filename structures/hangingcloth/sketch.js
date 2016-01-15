// Aatish Bhatia 01/14/2016 (@aatishb)
// Built starting from Dan Shiffman's Nature of Code
// http://natureofcode.com/book/chapter-5-physics-libraries/
// https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js

// Reference to physics world
var physics;

var particles = [];
var springs = [];
var cloth_particles_wide = 15;
var cloth_particles_tall = 15;

var cloth_width = 200;
var cloth_height = 200;
var stiffness = 0.2;

var x_spacing = cloth_width/cloth_particles_wide;
var y_spacing = cloth_height/cloth_particles_tall;

var i0 = cloth_particles_wide-1;
var j0 = cloth_particles_tall-1;

function setup() {
  createCanvas(640,360);


  // Initialize the physics
  physics=new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.5)));

  // Set the world's bounding box
  physics.setWorldBounds(new Rect(0,0,width,height));
  
  // Make particles
  for(var i = 0; i<cloth_particles_wide; i++){

    particles[i] = [];
    springs[i] = [];

    for(var j = 0; j<cloth_particles_tall; j++){
    
      particles[i][j] = new Particle(new Vec2D(width/2-cloth_width/2+i*x_spacing,j*y_spacing));

      // Anything we make, we have to add into the physics world
      physics.addParticle(particles[i][j]);
  
      if(i>0){
        // Make a spring connecting both Particles
        springs[i-1][j]=new VerletSpring2D(particles[i-1][j],particles[i][j],x_spacing,stiffness);
        physics.addSpring(springs[i-1][j]);
      }
      if(j>0){
        // Make a spring connecting both Particles
        springs[i][j-1]=new VerletSpring2D(particles[i][j-1],particles[i][j],y_spacing,stiffness);
        physics.addSpring(springs[i][j-1]);
      }
    }
  }

  // Lock corners in place
  particles[0][0].lock();
  particles[cloth_particles_wide-1][0].lock();


}

function draw() {

  // Update the physics world
  physics.update();

  background(51);

  // This next bit draws lines between the particles
  stroke(200);
  strokeWeight(2);
  

  for(var i = 0; i<cloth_particles_wide; i++){
    for(var j = 0; j<cloth_particles_tall; j++){

      // Display the particles
      //particles[i][j].display();
      
      if(i>0){
        line(particles[i-1][j].x,particles[i-1][j].y,particles[i][j].x,particles[i][j].y);
      }
      if(j>0){
        line(particles[i][j-1].x,particles[i][j-1].y,particles[i][j].x,particles[i][j].y);
      }
    }
  }
  

  // Move the nearest particle by dragging the mouse
  if (mouseIsPressed) {
    for(var i = 0; i<cloth_particles_wide; i++){
      for(var j = 0; j<cloth_particles_tall; j++){
        if(abs(particles[i][j].x-mouseX)<x_spacing && abs(particles[i][j].y-mouseY)<y_spacing){
          i0 = i;
          j0 = j;
        }
      }
    }

    particles[i0][j0].lock();
    particles[i0][j0].x = mouseX;
    particles[i0][j0].y = mouseY;
    particles[i0][j0].unlock();

  } 
}
