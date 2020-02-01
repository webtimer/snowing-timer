/**
 * 雪片
 */
export default class Snowflake {
  constructor(p) {
    this.p = p
    this.posX = 0
    this.posY = p.random(-50, 0)
    this.initialangle = p.random(0, 2 * p.PI)
    this.size = p.random(2, 5)
    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = p.sqrt(p.random(p.pow(p.width / 2, 2)))
  }

  updatePosition(time, snowflakes, piledSnowflakes, piledHeight) {
    // x position follows a circle
    let w = 0.6 // angular speed
    let angle = w * time + this.initialangle
    this.posX = this.p.width / 2 + this.radius * this.p.sin(angle)
    // different size snowflakes fall at slightly different y speeds
    this.posY += this.p.pow(this.size, 0.5)
    // delete snowflake if past end of piled snow line
    if (this.posY > this.p.height - piledHeight) {
      // add piledSnowflake instead of deleting snowflake
      piledSnowflakes.push(this)
      let index = snowflakes.indexOf(this)
      snowflakes.splice(index, 1)
    }
  }

  display() {
    this.p.ellipse(this.posX, this.posY, this.size)
  }

  /**
   * 積もった雪の下に埋め込まれた雪片を削除します。
   */
  deleteBuriedSnowflakes(piledSnowflakes, piledHeight) {
    if (this.posY > this.p.height - piledHeight + 5) {
      let index = piledSnowflakes.indexOf(this)
      piledSnowflakes.splice(index, 1)
    }
  }
}
