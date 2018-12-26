import Puyo from './Puyo'

export default class Puyotan {
  constructor() {
    this.field = new Puyo.Field()
    this.next = new Puyo.Next()
    this.orgNext = new Puyo.Next(this.next._seed)
    this.ops = {
      pos: new Puyo.Pos(),
      dir: 0,
      available: false
    }
    this.turn = 0
    this.score = 0
    this.sumScore = 0
    this.chain = 0
    this.moveTurn(0)
    this.statisticsMaxChain = 0
    this.statisticsMaxScore = 0
    this.statisticsMaxConcurrent = 0
    this.statisticsAllClear = 0
    this.statisticsCount = 0
  }
}
