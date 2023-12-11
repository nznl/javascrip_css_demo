export default class CreateCanvas {

  constructor(container) {
    this.container = container; // 父级dom元素
  }

  /**
   *  矩形 
   */
   rect() {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement("canvas");
        // canvas.width = 150; // 不设置默认300
        // canvas.height = 100; // 不设置默认150
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#0099e5";
        ctx.fillRect(0, 5, 90, 50); // 填充矩形，  0,5 = 左上角坐标， 100，100 = 宽高
        ctx.strokeStyle = "#ff4c4c";
        ctx.strokeRect(100, 5, 90, 50); // 矩形边框
        ctx.clearRect(90, 5, 100, 50); // 清除画布指定矩形区域
        ctx.fillRect(50, 50, 100, 100);
        ctx.clearRect(70, 70, 60, 60);
        ctx.strokeRect(80, 80, 40, 40);
        this.container.append(canvas);
        canvas.toBlob(blob => {
          resolve({
            blob, // 二进制大文件
            url:  URL.createObjectURL(blob) || canvas.toDataURL() // base64地址
          })
        })
      } catch(error) {
        reject(error);
      }
    })
  }

  /**
   * 三角形
   */
  triangulrar() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, 100);
    ctx.lineTo(100, 70);
    ctx.lineTo(30, 10);
    ctx.stroke();
    this.container.append(canvas);
  }

  /**
   * 填充文字
   */
  drawText() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "48px serif";
    ctx.fillText("water", 10, 50);
    this.container.append(canvas);
  }
}