import Random from './Random'

/** ぷよの種類用列挙型 */
const Kind = {
  BRANK: 0,
  RED: 1,
  GREEN: 2,
  BLUE: 3,
  YELLOW: 4,
  PURPLE: 5,
  IRON: 6,
  OJAMA: 7,
  WALL: 8,
  PEKE: 9
}

// 補助関数
function isNull(obj) {
  return obj == null
}

//------------------------------------------ クラス定義
/** ぷよの組 */
class PuyoPair {
  constructor(axis, sub) {
    this.axis = isNull(axis) ? Kind.BRANK : axis
    this.sub = isNull(sub) ? Kind.BRANK : sub
  }
}

/**
 * seed を元に PuyoPair を生成するクラス
 * mode は現在 random のみ対応…
 */
class Next {
  constructor(seed, mode) {
    this.init(seed, mode)
  }
  init(seed, mode) {
    if (mode == null) mode = 'random'
    this._mode = mode
    if (seed == null) {
      let r = new Random()
      seed = r.nextInt(64 * 64 * 64 * 64)
    }
    this._seed = seed
    this._random = new Random(this._seed)
    this._size = 1000
    this._puyos = []
    for (let i = 0; i < this._size; i++) {
      this._puyos.push(new PuyoPair(this._nextKind(), this._nextKind()))
    }
  }
  size() {
    return this._size
  }
  get(num) {
    return this._puyos[num % 1024]
  }
  _nextKind() {
    switch (this._random.nextInt(4)) {
      case 0: return Kind.RED
      case 1: return Kind.GREEN
      case 2: return Kind.BLUE
      case 3: return Kind.YELLOW
      default: throw new Error("unexpected error")
    }
  }
  seed() {
    return this._seed
  }
  edit(turn, kind, isAxis) {
    if (turn >= this._size || turn < 0) return
    if (isAxis) {
      this._puyos[turn].axis = kind
    } else {
      this._puyos[turn].sub = kind
    }
  }
}

/** ぷよの設置位置 */
class Pos {
  constructor(x, y) {
    this.x = isNaN(x) ? 0 : x
    this.y = isNaN(y) ? 0 : y
  }
}

/**
 * ぷよフィールド
 * 6*13のグリッド内に常にぷよが収まる事を想定
 * 14段目も考慮する
 * fall()後に存在する14段目ぷよは全て消える（通のように残ったりしない）
 */
class Field {
  constructor() {
    this.height = 13
    this.width = 6
    this._field = []
    for (let y = 0; y < this.height + 1; y++) {
      let line = []
      for (let x = 0; x < this.width; x++) {
        line.push(Kind.BRANK)
      }
      this._field.push(line)
    }
  }
  isBrank(pos) {
    return this.get(pos) === Kind.BRANK
  }
  get(pos) {
    if (pos.y < 1 || pos.x < 1 || pos.x > this.width) {
      return Kind.WALL
    }
    if (pos.y > this.height) {
      return Kind.BRANK
    }
    return this._field[pos.y - 1][pos.x - 1]
  }
  set(pos, kind) {
    if (pos.y < 1 || pos.y > this.height + 1 || pos.x < 1 || pos.x > this.width) {
      return
    }
    this._field[pos.y - 1][pos.x - 1] = kind
  }
  fall() {
    let flag = false // 落下が発生したかどうか
    for (let x = 1; x <= this.width; x++) {
      let t = 1
      for (let y = 1; y <= this.height; y++) {
        let p = this.get(new Pos(x, y))
        if (p === Kind.BRANK) continue
        if (p === Kind.WALL) {
          t = y + 1
          continue
        }
        this.set(new Pos(x, y), this.get(new Pos(x, t)))
        this.set(new Pos(x, t), p)
        if (t !== y) flag = true
        t++
      }
    }
    for (let x = 1; x <= this.width; x++) this.set(new Pos(x, 14), Kind.BRANK)
    return flag
  }
  canFall() {
    for (let x = 1; x <= this.width; x++) {
      for (let y = 2; y <= this.height; y++) {
        if (this.isBrank(new Pos(x, y - 1)) && !this.isBrank(new Pos(x, y)) && this.get(new Pos(x, y)) !== Kind.WALL) return true
      }
    }
    return false
  }
  _countConnection(pos, kind, flags) {
    if (this.get(pos) === Kind.IRON) return 0
    if (this.get(pos) === Kind.PEKE) return 0
    if (this.get(pos) === Kind.WALL) return 0
    if (this.get(pos) === Kind.BRANK) return 0
    if (this.get(pos) === Kind.OJAMA) return 0
    if (this.get(pos) !== kind) return 0
    if (flags.get(pos) !== Kind.BRANK) return 0
    if (pos.y >= 13) return 0
    flags.set(pos, kind)
    return this._countConnection(new Pos(pos.x, pos.y + 1), kind, flags) +
      this._countConnection(new Pos(pos.x + 1, pos.y), kind, flags) +
      this._countConnection(new Pos(pos.x, pos.y - 1), kind, flags) +
      this._countConnection(new Pos(pos.x - 1, pos.y), kind, flags) + 1
  }
  countConnection(pos) {
    return this._countConnection(pos, this.get(pos), new Field())
  }
  _deleteConnection(pos, kind) {
    if (this.get(pos) === Kind.BRANK) return 0
    if (this.get(pos) === Kind.OJAMA) {
      this.set(pos, Kind.BRANK)
      return 0
    }
    if (this.get(pos) !== kind) return 0
    if (pos.y >= 13) return 0
    this.set(pos, Kind.BRANK)
    return this._deleteConnection(new Pos(pos.x, pos.y + 1), kind) +
      this._deleteConnection(new Pos(pos.x + 1, pos.y), kind) +
      this._deleteConnection(new Pos(pos.x, pos.y - 1), kind) +
      this._deleteConnection(new Pos(pos.x - 1, pos.y), kind) + 1
  }
  deleteConnection(pos) {
    return this._deleteConnection(pos, this.get(pos))
  }
  canFire() {
    let flags = new Field()
    for (let y = 1; y < this.height; y++) {
      for (let x = 1; x <= this.width; x++) {
        let pos = new Pos(x, y)
        if (this._countConnection(pos, this.get(pos), flags) >= 4) return true
      }
    }
    return false
  }
  stepFire() {
    class Step {
      constructor() {
        this.num = 0          // 消えたぷよの数
        this.connections = [] // 連結数
        this.color = 0        // 色数
      }
    }
    let step = new Step()
    let flags = new Field()
    var colorFlags = {}
    for (let y = 1; y < this.height; y++) {
      for (let x = 1; x <= this.width; x++) {
        let pos = new Pos(x, y)
        let kind = this.get(pos)
        let n = this._countConnection(pos, kind, flags)
        if (n >= 4) {
          this.deleteConnection(pos)
          step.num += n
          step.connections.push(n)
          colorFlags[kind] = true
        }
      }
    }
    step.color = Object.keys(colorFlags).length
    return step
  }
  Height() {
    return this.height
  }
  Width() {
    return this.width
  }
  copy() {
    let fd = new Field()
    for (let y = 1; y <= this.height; y++) {
      for (let x = 1; x <= this.width; x++) {
        let pos = new Pos(x, y)
        fd.set(pos, this.get(pos))
      }
    }
    return fd
  }
  equal(field) {
    for (let y = 1; y <= this.height; y++) {
      for (let x = 1; x <= this.width; x++) {
        let pos = new Pos(x, y)
        if (this.get(pos) !== field.get(pos)) return false
      }
    }
    return true
  }
  isAllClear() {
    for (let y = 1; y <= this.height; y++) {
      for (let x = 1; x <= this.width; x++) {
        let pos = new Pos(x, y)
        if (this.get(pos) !== Kind.BRANK) return false
      }
    }
    return true
  }
  map(transform) {
    let array = [];
    for (let y = 1; y <= this.height; y++) {
      for (let x = 1; x <= this.width; x++) {
        let pos = new Pos(x, y)
        let kind = this.get(pos)
        array.push(transform(pos, kind));
      }
    }
    return array;
  }
}

export default {
  Kind: Kind,
  Pos: Pos,
  Next: Next,
  Field: Field
}
