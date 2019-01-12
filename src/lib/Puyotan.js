import Puyo from './Puyo'

/** アクション用列挙型 TODO: v2ではクラス階層で表現する */
const ActionType = {
  NONE: 0,
  PASS: 1,
  PUT: 2
}

class Action {
  constructor(type = ActionType.NONE, x = 0, y = 0) {
    this.type = type;
    this.x = x;
    this.dir = y;
  }
}

class Player {
  constructor() {
    this.field = new Puyo.Field();
    this.actionHistory = [];
  }

  setAction(frame, action) {
    this.actionHistory[frame] = action;
  }

  getAction(frame) {
    return this.actionHistory[frame];
  }
}

class Puyotan {
  constructor() {
    this.next = new Puyo.Next();
    this.players = [
      new Player(),
      new Player()
    ];
    this.frame = 0;
  }

  getPlayer(id) {
    return this.players[id];
  }

  setAction(id, action) {
    this.players[id].setAction(this.frame, action);
  }

  stepNextFrame() {
    this.players.forEach((p, i) => {
      if (p.getAction(this.frame) == null) throw new Error(`player ${i} have not selected action.`);
    })
    this.frame++;
  }
}

export default {
  Puyotan: Puyotan,
  Action: Action,
  ActionType: ActionType,
  Player: Player
}