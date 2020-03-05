/**
 * 雪片
 */
export default class Snowflake {

  private p: any
  private posX: number
  private posY: number
  private initialangle: number
  private size: number
  private radius: number

  constructor(p: any) {
    this.p = p
    this.posX = 0
    this.posY = p.random(-50, 0)
    this.initialangle = p.random(0, 2 * p.PI)
    this.size = p.random(2, 5)
    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = p.sqrt(p.random(p.pow(p.width / 2, 2)))
  }

  updatePosition(time: number) {
    // x position follows a circle
    let w = 0.6 // angular speed
    let angle = w * time + this.initialangle
    this.posX = this.p.width / 2 + this.radius * this.p.sin(angle)
    // different size snowflakes fall at slightly different y speeds
    this.posY += this.p.pow(this.size, 0.5)
  }

  display() {
    this.p.ellipse(this.posX, this.posY, this.size)
  }

  isOnTheSurfaceOfPiledSnow(piledHeight: number) {
    return this.posY > this.p.height - piledHeight
  }

  isUnderSurfaceOfPiledSnow(piledHeight: number) {
    return this.posY > this.p.height - piledHeight + 5
  }

  removeIfUnnecessaryWithLeavingOnSurface(snowflakes: Snowflake[], piledSnowflakes: Snowflake[], piledHeight: number) {
    // delete snowflake if past end of piled snow line
    if (this.isOnTheSurfaceOfPiledSnow(piledHeight)) {
      // add piledSnowflake instead of deleting snowflake
      piledSnowflakes.push(this)
      let index = snowflakes.indexOf(this)
      snowflakes.splice(index, 1)
    }
  }

  /**
   * 積もった雪の下に埋め込まれた雪片を削除します。
   */
  deleteIfUnderPiledSnow(piledSnowflakes: Snowflake[], piledHeight: number) {
    if (this.isUnderSurfaceOfPiledSnow(piledHeight)) {
      let index = piledSnowflakes.indexOf(this)
      piledSnowflakes.splice(index, 1)
    }
  }
}
