import P5 from "p5";

let sketch = function(p) {
  let snowflakes = []; // array to hold snowflake objects
  let piledSnowflakes = [];

  let piledSpeed = 0.05;
  let piledHeight = -300 * piledSpeed;

  p.setup = function() {
    p.createCanvas(400, 600);
    p.fill(240);
    p.noStroke();
  };

  p.draw = function() {
    p.background("brown");
    let t = p.frameCount / 60; // update time

    // create a random number of snowflakes each frame
    for (var i = 0; i < p.random(5); i++) {
      snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
      flake.update(t); // update snowflake position
      flake.display(); // draw snowflake
    }

    // draw piled snow using rectangle
    piledHeight += piledSpeed;
    p.fill("white");
    p.rect(0, p.height - piledHeight, p.width, piledHeight);
    // draw piledSnowflakes
    for (let piledFlake of piledSnowflakes) {
      piledFlake.deleteBuriedSnowflakes();
      piledFlake.display();
    }
  };

  // snowflake class
  let snowflake = function() {
    // initialize coordinates
    this.posX = 0;
    this.posY = p.random(-50, 0);
    this.initialangle = p.random(0, 2 * p.PI);
    this.size = p.random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = p.sqrt(p.random(p.pow(p.width / 2, 2)));

    this.update = function(time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = p.width / 2 + this.radius * p.sin(angle);

      // different size snowflakes fall at slightly different y speeds
      this.posY += p.pow(this.size, 0.5);

      // delete snowflake if past end of piled snow line
      if (this.posY > p.height - piledHeight) {
        // add piledSnowflake instead of deleting snowflake
        piledSnowflakes.push(this);

        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };

    this.display = function() {
      p.ellipse(this.posX, this.posY, this.size);
    };

    // delete piledSnowflakes under piled snow line
    this.deleteBuriedSnowflakes = function() {
      if (this.posY > p.height - piledHeight + 5) {
        let index = piledSnowflakes.indexOf(this);
        piledSnowflakes.splice(index, 1);
      }
    };
  };
};

new P5(sketch);
