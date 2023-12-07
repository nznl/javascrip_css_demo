export class TrafficLight {
  /**
   * 
   * @param {各个颜色灯光持续时间以及初始灯光} options 
   */
  constructor(options = {}) {
    const {
      redSeconds = 5,
      greenSeconds = 5,
      yellowSeconds = 3,
      initial = 'red'
    } = options;
    this._colorsList = {
      red: {
        seconds: redSeconds,
        next: 'yellow'
      },
      green: {
        seconds: greenSeconds,
        next: 'yellow'
      },
      yellow: {
        seconds: yellowSeconds
      }
    }
    this._switch(initial);
  }

  /**
   * 
   * @param {切换灯色，获取切换当前时间, 以及当前灯色持续时间} color 
   */
  _switch(color) {
    this._time = Date.now(); 
    this._currentColor = color;
    this._seconds = this._colorsList[color].seconds;
  }
  
  /**
   * 轮到一下个灯色
   */
  _next() {
    // 获取黄色的 next
    if (this._currentColor === 'red') {
      this._colorsList['yellow'].next = 'green';
    } else if (this._currentColor === 'green') {
      this._colorsList['yellow'].next = 'red';
    }
    this._switch(this._colorsList[this._currentColor].next);
  }

  getCurrentLight() {
    const remain = Math.ceil(this._seconds - (Date.now() - this._time) / 1000);
    if (remain <= 0) {
      this._next();
      return this.getCurrentLight();
    }
    return {
      color: this._currentColor, // 当前灯色
      remain // 剩余时间
    }
  }
}