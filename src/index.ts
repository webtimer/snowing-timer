import * as P5 from 'p5'
import Snowflake from './snowflake'

let sketch = function (p: any) {
  // 雪片を保持する配列
  let snowflakes: Snowflake[] = []
  let piledSnowflakes: Snowflake[] = []

  let piledSpeed = 0.05
  let piledHeight = -300 * piledSpeed

  p.setup = function () {
    p.createCanvas(400, 600)
    p.fill(240)
    p.noStroke()
  }

  p.draw = function () {
    p.background('brown')
    let t = p.frameCount / 60 // update time

    // フレームごとにランダムな数の雪片を生成して追加
    for (var i = 0; i < p.random(5); i++) {
      snowflakes.push(new Snowflake(p))
    }

    // 雪変を更新
    for (let flake of snowflakes) {
      flake.updatePosition(t, snowflakes, piledSnowflakes, piledHeight)
      flake.display()
    }

    // 長方形で積もった雪を描画
    piledHeight += piledSpeed
    p.fill('white')
    p.rect(0, p.height - piledHeight, p.width, piledHeight)
    // 積もった雪を描画
    for (let piledFlake of piledSnowflakes) {
      piledFlake.deleteBuriedSnowflakes(piledSnowflakes, piledHeight)
      piledFlake.display()
    }
  }
}

new P5(sketch)
