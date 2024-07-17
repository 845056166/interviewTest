window.addEventListener('load', () => {
  const canvas = document.getElementById('tree');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const tree = new Tree({
    width,
    height,
    ctx,
    flowerColor: "pink",
  });
  tree.draw();
  
});

class Tree {
  /**
   * @param {Object} obj 参数
   * @param {number} obj.width 画布宽度
   * @param {number} obj.height 画布高度
   * @param {CanvasRenderingContext2D} obj.ctx 画布上下文
   * @param {number}  [obj.branchLength=80] 分支初始长度
   * @param {number}  [obj.lineWidth=3] 线条初始宽度
   * @param {string}  [obj.color='#333'] 树的颜色
   * @param {string} [obj.flowerColor='red'] 分支的颜色
   * @param {[number, number]} obj.point 树的根部位置
   * @param {number} [obj.branchCoefficient=0.7] 分支长度衰减系数
   * @param {number} [obj.thickCoefficient=0.7] 分支长度衰减系数
   * @param {number} [obj.angleCoefficient=50] 分支角度衰减系数
   */
  constructor({ctx, width, height, branchLength = 80, color = "#333", lineWidth = 3, flowerColor = 'red', point = [0, 0], branchCoefficient = 0.7, angleCoefficient = 50, thickCoefficient = 0.7 }) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = point[0];
    this.y = point[1];
    this.branchLength = branchLength;
    this.branchAngle = 90;
    this.branchCoefficient = branchCoefficient
    this.angleCoefficient = angleCoefficient;
    this.thickCoefficient = thickCoefficient;
    this.flowerColor = flowerColor
    this.branchColor = color;
    ctx.translate(width / 2, height);
    ctx.scale(1, -1);
    ctx.lineWidth = lineWidth
    this.lineWidth = lineWidth;
  }
  drawBranch([x, y], length, think, angle) {
    const ctx = this.ctx
    if (think < 0.2) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.strokeStyle = this.flowerColor
      ctx.stroke()
      return
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + length * Math.cos((angle * Math.PI) / 180),
      y + length * Math.sin((angle * Math.PI) / 180),
    );
    ctx.strokeStyle = this.branchColor;
    ctx.lineWidth = think;
    ctx.stroke();
    this.drawBranch([x + length * Math.cos((angle * Math.PI) / 180), y + length * Math.sin((angle * Math.PI) / 180)], length * this.branchCoefficient, think * this.thickCoefficient, angle + Math.random() * this.angleCoefficient);
    this.drawBranch([x + length * Math.cos((angle * Math.PI) / 180), y + length * Math.sin((angle * Math.PI) / 180)], length * this.branchCoefficient, think * this.thickCoefficient, angle - Math.random() * this.angleCoefficient);
  };

  draw() {
    this.drawBranch([0,0], this.branchLength, this.lineWidth, this.branchAngle);
  }
}
