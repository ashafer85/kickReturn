import Hash from './hash.js';

class YardLine {
  constructor(krCanvas, ctx, y) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;

    this.x = 0;
    this.y = y;

    this.hashes = [];
    for (let i = 0; i < 4; i++) {
      this.hashes.push(new Hash(this.ctx, y - (i*20)));
    }

    this.render = this.render.bind(this);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.krCanvas.width, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
    for (let r = 0; r < 4; r++) {
      this.hashes[r].render(this.y - (20 + r*20));
    }
  }

}

export default YardLine;
