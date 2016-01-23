// Modification of The "Vehicle" class
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


function Vehicle(x,y,k1x,k2x,k1y,k2y) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,-2);
  this.position = createVector(x,y);
  this.r = 6;

  // Integrate acceleration
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  this.steer = function(target) {

    // k1_x*(x_t-x) - k2_x*v_t
    // k1_y*(x_t-x) - k2_y*v_t

    var positionError = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
    var control = createVector(k1x*positionError.x-k2x*this.velocity.x,k1y*positionError.y-k2y*this.velocity.y);

    this.acceleration = control;
  }


  this.within = function(target,targetradius) {
     var positionError = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
     if(positionError.mag()<targetradius){
      return true;
     }

 }

      
  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x,this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape(CLOSE);
    pop();
  }
}



