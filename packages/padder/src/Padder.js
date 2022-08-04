import { fix } from '../utils/ansiPadLength.js'

export class Padder {
  wd
  sp
  gr
  constructor(width = 0, fill = ' ', ansi) {
    this.wd = width
    this.sp = fill
    this.gr = ansi
  }
  build({ fill, ansi, width } = {}) {
    return new Padder(fill, ansi, width)
  }
  lpad(x) { return x.padStart(this.wd, this.sp) }
  rpad(x) { return x.padEnd(this.wd, this.sp) }
  lpadAnsi(x) { return x.padStart(fix(x, this.wd), this.sp) }
  rpadAnsi(x) { return x.padEnd(fix(x, this.wd), this.sp) }
  render(x, n) {
    return this.gr
      ? isNaN(n) ? this.rpadAnsi(x) : this.lpadAnsi(x)
      : isNaN(n) ? this.rpad(x) : this.lpad(x)
  }
}
