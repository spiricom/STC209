// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Reference to physics world
var physics;

var particles = [];
var spring = [];
var num_particles = 20;
var num_springs = num_particles - 1;
var length = 200;
var stiffness = 0.2;


function setup() {
  createCanvas(640,360);

  var spacing = length/(num_springs);

  // Initialize the physics
  physics=new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0,0.5)));

  // Set the world's bounding box
  physics.setWorldBounds(new Rect(0,0,width,height));
  
  // Make particles
  for(var i = 0; i<num_particles; i++){
    particles[i] = new Particle(new Vec2D(width/2,i*spacing));

    // Anything we make, we have to add into the physics world
    physics.addParticle(particles[i]);

    if(i>0){
    // Make a spring connecting both Particles
    spring[i-1]=new VerletSpring2D(particles[i-1],particles[i],spacing,stiffness);
    physics.addSpring(spring[i-1]);

    }
  }

  // Lock one in place
  particles[0].lock();


}

function draw() {

  // Update the physics world
  physics.update();

  background(51);

  // Draw a line between the particles
  stroke(200);
  strokeWeight(2);
  

  // Display the particles
  for(var i = 0; i<num_particles; i++){
  //particles[i].display();
  if(i>0){
    line(particles[i-1].x,particles[i-1].y,particles[i].x,particles[i].y);
    }
  }
  
  //particles[num_particles-1].display();
  
  // Move the second one according to the mouse
  if (mouseIsPressed) {
    particles[num_particles-1].lock();
    particles[num_particles-1].x = mouseX;
    particles[num_particles-1].y = mouseY;
    particles[num_particles-1].unlock();
  } 
}
