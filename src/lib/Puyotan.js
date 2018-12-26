import Puyo from './Puyo'

class Player {
  constructor() {
    this.field = new Puyo.Field();
  }
}

export default class Puyotan {
  constructor() {
    this.next = new Puyo.Next();
    this.players = [
      new Player(),
      new Player()
    ];
  }
}
