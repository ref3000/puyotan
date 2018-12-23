class Random {
  constructor (seed) {
    if (seed == null) {
      this.y = Math.random() * 2147483647
    } else {
      this.y = seed
    }
  }
  setSeed (seed) {
    this.y = seed
  }
  next () {
    this.y = this.y ^ (this.y << 13)
    this.y = this.y ^ (this.y >> 17)
    this.y = this.y ^ (this.y << 15)
    return this.y >>> 0
  }
  nextInt (max) { // 0 ~ max未満のランダムな整数を返す
    const r = Math.abs(this.next())
    return r % max
  }
}

export default Random
