let snowflakes = []; // array to hold snowflake objects
let piledSnowflakes = [];

let piledSpeed = 0.05;
let piledHeight = -300 * piledSpeed;

function setup() {
  createCanvas(400, 600);
  fill(240);
  noStroke();
}

function draw() {
  background('brown');
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (var i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }

  // draw piled snow using rectangle
  piledHeight += piledSpeed;    
  fill('white');
  rect(0, height - piledHeight, width, piledHeight);
  // draw piledSnowflakes
  for (let piledFlake of piledSnowflakes) {
    piledFlake.deleteBuriedSnowflakes();
    piledFlake.display();
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of piled snow line
    if (this.posY > height - piledHeight) {
      // add piledSnowflake instead of deleting snowflake
      piledSnowflakes.push(this);

      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };

  // delete piledSnowflakes under piled snow line
  this.deleteBuriedSnowflakes = function() {
    if (this.posY > height - piledHeight + 5) {
      let index = piledSnowflakes.indexOf(this);
      piledSnowflakes.splice(index, 1);
    }
  };
}
