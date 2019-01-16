import Puyo from './Puyo'
import Random from './Random'

/** アクション用列挙型 TODO: v2ではクラス階層で表現する */
const ActionType = {
  PASS: 0,
  PUT: 1,
  CHAIN: 2,
  CHAIN_FALL: 3,
  OJAMA: 4,
}

class Action {
  constructor(type = ActionType.PASS, x = 0, dir = 0) {
    this.type = type;
    this.x = x;
    this.dir = dir;
  }
}

class ActionHistory {
  constructor(action, remainingFrame = 0) {
    this.action = action;
    this.remainingFrame = remainingFrame;
  }
}

class Player {
  constructor(random) {
    this.field = new Puyo.Field();
    this.actionHistories = [];
    this.activeNextPos = 0;
    this.score = 0;
    this.usedScore = 0;
    this.nonActiveOjama = 0;
    this.activeOjama = 0;
    this.chain = 0;
    // 乱数生成器
    this.random = random;
  }

  fallOjama(num) {
    while (num > 0) {
      if (num >= 6) {
        for (let x = 1; x <= 6; x++) this.field.setAndFall(x, Puyo.Kind.OJAMA);
        num -= 6;
      } else {
        let memo = [false, false, false, false, false, false];
        for (let i = 0; i < num; i++) {
          let pos = this.random.nextInt(6 - i);
          let cnt = 0;
          for (let j = 0; j < 6; j++) {
            if (!memo[j]) {
              if (cnt++ === pos) memo[j] = true;
            }
          }
        }
        for (let x = 1; x <= 6; x++) {
          if (memo[x - 1]) this.field.setAndFall(x, Puyo.Kind.OJAMA);
        }
        num = 0;
      }
    }
  }
}

class Puyotan {
  constructor(seed) {
    this.random = new Random(seed);
    this.next = new Puyo.Next(this.random);
    this.players = [
      new Player(this.random),
      new Player(this.random)
    ];
    this.frame = 0;
    this.gameStatusText = "待機中";
  }

  getPlayer(id) {
    return this.players[id];
  }

  start() {
    if (this.frame === 0) {
      this.frame++;
      this.gameStatusText = "対戦中";
    }
  }

  setAction(id, action) {
    if (this.frame <= 0) return false;
    let history = this.players[id].actionHistories[this.frame];
    if (history == null) {
      switch (action.type) {
        case ActionType.PASS:
          this.players[id].actionHistories[this.frame] = new ActionHistory(action, 0);
          return true;
        case ActionType.PUT:
          this.players[id].actionHistories[this.frame] = new ActionHistory(action, 1);
          return true;
        default:
          throw new Error('unsupported action type.');
      }
    }
    return false;
  }

  canStepNextFrame() {
    if (this.frame <= 0) return false;
    return this.players.every(p => p.actionHistories[this.frame] != null);
  }

  stepNextFrame() {
    // 2. 行動選択・予約
    // パス・設置から選択（※硬直中は選択は無効化される）（全プレイヤーが選択するまで待つ）
    // 設置なら行動予約する（硬直２）
    if (!this.canStepNextFrame()) {
      return console.error(`can not step next frame.`);
    }
    this.players.forEach((p, id) => {
      let currentHistory = p.actionHistories[this.frame];
      if (currentHistory.remainingFrame > 0) {
        p.actionHistories[this.frame + 1] = new ActionHistory(currentHistory.action, currentHistory.remainingFrame - 1);
      }
    });
    // 3. 行動実行
    // 硬直カウント減算して０になったら予約された行動を実行
    // 設置：フィールドに設置、消せるぷよがあれば連鎖を行動予約（硬直３）
    // 連鎖：ぷよを消去し得点を増加、相殺を処理（非アクティブを優先）し、落下し消せるぷよがあれば連鎖を行動予約（硬直３）、なければ送ったおじゃまをアクティブに
    // おじゃま：アクティブなおじゃまから最大５段分設置
    this.players.forEach((p, id) => {
      const currentHistory = p.actionHistories[this.frame];
      if (currentHistory.remainingFrame === 0) {
        switch (currentHistory.action.type) {
          case ActionType.PASS:
            break;
          case ActionType.PUT:
            let tumo = this.next.get(p.activeNextPos);
            const x = currentHistory.action.x;
            const dir = currentHistory.action.dir;
            switch (dir) {
              case 0:
                p.field.setAndFall(x, tumo.axis);
                p.field.setAndFall(x, tumo.sub);
                break;
              case 1:
                p.field.setAndFall(x, tumo.axis);
                p.field.setAndFall(x + 1, tumo.sub);
                break;
              case 2:
                p.field.setAndFall(x, tumo.sub);
                p.field.setAndFall(x, tumo.axis);
                break;
              case 3:
                p.field.setAndFall(x, tumo.axis);
                p.field.setAndFall(x - 1, tumo.sub);
                break;
              default:
                throw Error(`unsupported direction range or type. ${dir}`);
            }
            if (p.field.canFire()) {
              p.chain = 0;
              p.actionHistories[this.frame + 1] = new ActionHistory(new Action(ActionType.CHAIN), 1);
            }
            break;
          case ActionType.CHAIN:
            let info = p.field.stepFire();
            p.chain++;
            p.score += this.calcScore(info.num, info.color, info.connections, p.chain);
            let ojama = Math.floor((p.score - p.usedScore) / 70);
            p.usedScore += ojama * 70;
            if (p.nonActiveOjama > 0) {
              let usedNum = Math.min(ojama, p.nonActiveOjama);
              p.nonActiveOjama -= usedNum;
              ojama -= usedNum;
            }
            if (p.activeOjama > 0) {
              let usedNum = Math.min(ojama, p.activeOjama);
              p.activeOjama -= usedNum;
              ojama -= usedNum;
            }
            if (ojama > 0) {
              this.sendOjama(id, ojama);
            }
            if (p.field.isAllClear()) {
              p.score += 2100;
            }
            if (p.field.canFall()) {
              p.actionHistories[this.frame + 1] = new ActionHistory(new Action(ActionType.CHAIN_FALL), 0);
            } else {
              this.activeOjama(id);
            }
            break;
          case ActionType.CHAIN_FALL:
            if (!p.field.canFall()) throw new Error('failed to fall puyo.');
            p.field.fall();
            if (p.field.canFire()) {
              p.actionHistories[this.frame + 1] = new ActionHistory(new Action(ActionType.CHAIN), 1);
            } else {
              this.activeOjama(id);
            }
            break;
          case ActionType.OJAMA:
            if (p.activeOjama <= 0) throw new Error('failed to fall ojama.');
            let fallOjamaNum = Math.min(p.activeOjama, 30);
            p.activeOjama -= fallOjamaNum;
            p.fallOjama(fallOjamaNum);
            break;
          default:
            throw new Error('unsupported action type.');
        }
      }
    });
    // 4. 窒息判定
    // 勝敗がついていれば終了
    let aliveCount = 0;
    let alivePlayerId = 0;
    this.players.forEach((p, id) => {
      if (p.actionHistories[this.frame + 1] == null && p.field.get(new Puyo.Pos(3, 12)) !== Puyo.Kind.BRANK) {
      } else {
        aliveCount++;
        alivePlayerId = id;
      }
    });
    if (aliveCount === 0) {
      this.gameStatusText = `引き分け…`;
    }
    if (aliveCount === 1) {
      this.gameStatusText = `Player ${alivePlayerId + 1} の勝利！`;
    }
    // 5. おじゃま処理
    // 今フレームがおじゃまでなく次フレームが操作可能でアクティブなおじゃまがあったらおじゃまを行動予約（硬直１）
    this.players.forEach((p, id) => {
      if (p.actionHistories[this.frame].action.type !== ActionType.OJAMA && p.actionHistories[this.frame + 1] == null && p.activeOjama > 0) {
        p.actionHistories[this.frame + 1] = new ActionHistory(new Action(ActionType.OJAMA), 0);
      }
    });
    // 0. フレーム遷移
    // 今回フレームがパス以外で硬直状態でなければツモを進める
    this.players.forEach((p, id) => {
      const currentHistory = p.actionHistories[this.frame];
      const nextHistory = p.actionHistories[this.frame + 1];
      if (currentHistory.action.type !== ActionType.PASS && nextHistory == null) {
        p.activeNextPos++;
      }
    });
    this.frame++;
  }

  calcScore(num, color, connections, chain) {
    const A = [0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512]
    const B = [0, 3, 6, 12, 24]
    const C = [0, 2, 3, 4, 5, 6, 7, 10]
    let base = num * 10
    let rate = A[chain - 1]
    if (rate === undefined) rate = 512
    rate += B[color - 1]
    for (let i = 0; i < connections.length; i++) {
      let n = connections[i]
      if (n > 11) rate += 10
      else rate += C[n - 4]
    }
    if (rate === 0) rate = 1
    return base * rate
  }

  sendOjama(senderId, ojama) {
    this.players.forEach((p, id) => {
      if (id !== senderId) {
        p.nonActiveOjama += ojama;
      }
    });
  }

  activeOjama(senderId) {
    this.players.forEach((p, id) => {
      if (id !== senderId) {
        p.activeOjama += p.nonActiveOjama;
        p.nonActiveOjama = 0;
      }
    });
  }

  getViewModel() {
    return {
      frame: this.frame,
      players: this.players.map(p => ({
        activePair: this.frame === 0 ? new Puyo.PuyoPair() : this.next.get(p.activeNextPos),
        next1: this.frame === 0 ? this.next.get(0) : this.next.get(p.activeNextPos + 1),
        next2: this.frame === 0 ? this.next.get(1) : this.next.get(p.activeNextPos + 2),
        field: p.field,
        actionHistories: p.actionHistories,
        chain: p.chain,
        score: p.score,
        usedScore: p.usedScore,
        nonActiveOjama: p.nonActiveOjama,
        activeOjama: p.activeOjama,
      })),
      gameStatusText: this.gameStatusText,
    };
  }
}

export default {
  Puyotan: Puyotan,
  Action: Action,
  ActionType: ActionType,
  Player: Player
}