import * as P5 from 'p5'
import Snowflake from './snowflake'

// timer setting
const TIMER_SECONDS = 60

// colors
const FILL_COLOR = 240
const BACKGROUND_COLOR = 'brown'
const SNOW_COLOR = 'white'

// speeds
const FRAME_PER_SECOND = 60
const UPDATE_TIME = 60

const PILED_SPEED = 0.05
const NEW_SNOWFLAKE_COUNT_PER_FRAME = 5

let sketch = function (p: any) {

  let snowflakes: Snowflake[] = []
  let piledSnowflakes: Snowflake[] = []

  var piledHeight = 0

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.frameRate(FRAME_PER_SECOND)
    p.fill(FILL_COLOR)
    p.noStroke()
  }

  p.draw = function () {
    p.background(BACKGROUND_COLOR)

    generateNewSnowflakes()
    updateSnowflakePositions()

    let snowflakeReachedBottom = true
    if (snowflakeReachedBottom) {
      showPiledSnow()
    }

    removeSnowflakesUnderPiledSnow()
  }

  let generateNewSnowflakes = function () {
    let generateSnowflakeCount = p.random(NEW_SNOWFLAKE_COUNT_PER_FRAME)
    for (var i = 0; i < generateSnowflakeCount; i++) {
      snowflakes.push(new Snowflake(p))
    }
  }

  let updateSnowflakePositions = function () {
    let t = p.frameCount / UPDATE_TIME
    for (let flake of snowflakes) {
      flake.updatePosition(t)
      flake.removeIfUnnecessaryWithLeavingOnSurface(snowflakes, piledSnowflakes, piledHeight)
      flake.display()
    }
  }

  let showPiledSnow = function () {
    piledHeight += PILED_SPEED
    p.fill(SNOW_COLOR)
    p.rect(0, p.height - piledHeight, p.width, piledHeight)
  }

  let removeSnowflakesUnderPiledSnow = function () {
    for (let piledFlake of piledSnowflakes) {
      deleteIfUnderPiledSnow(piledFlake)
      piledFlake.display()
    }
  }

  let deleteIfUnderPiledSnow = function (piledFlake: Snowflake) {
    if (piledFlake.isUnderSurfaceOfPiledSnow(piledHeight)) {
      let index = piledSnowflakes.indexOf(this)
      piledSnowflakes.splice(index, 1)
    }
  }

}

new P5(sketch)
