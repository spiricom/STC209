// Modification of The "Vehicle" class
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


function Vehicle(x,y,v,k1,k2) {
  this.angularacceleration = 0;
  this.angularvelocity = 0;
  this.angle = 0;
  this.position = createVector(x,y);
  this.speed = v;
  this.target_angle_previous_value = 0;
  this.r = 6;

  // Integrate acceleration
  this.update = function() {
    this.angularvelocity += this.angularacceleration;
    this.angle += this.angularvelocity;
    this.angle %= (2*PI)
    this.position.add(createVector(this.speed*cos(this.angle),this.speed*sin(this.angle)));
    // Reset acceleration to 0 each cycle
    this.angularacceleration = 0;
  }

  this.steer = function(target) {
    var positionError = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
    var target_angle = positionError.heading();
    var prev_angle = this.target_angle_previous_value;

    if(abs(target_angle-prev_angle)>PI){
      if(target_angle<prev_angle){
        target_angle += 2*PI;
      }
      else if(target_angle>prev_angle){
        target_angle -= 2*PI;
      }
    }

    target_angle %= 2*PI;

    print("Heading to: "+round(target_angle*180/PI*100)/100+ " degrees / " +round(target_angle*100)/100 +" radians");
    this.angularacceleration = k1*(target_angle-this.angle) - k2*this.angularvelocity;
    this.target_angle_previous_value = target_angle;
  }


  this.within = function(target,targetradius) {
     var positionError = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
     if(positionError.mag()<targetradius){
      return true;
     }

 }

      
  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x,this.position.y);
    rotate(this.angle + PI/2);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape(CLOSE);
    pop();
  }
}



