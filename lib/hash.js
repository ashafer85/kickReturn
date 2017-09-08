
class Hash {
  constructor(ctx, y) {
    this.ctx = ctx;
    this.y = y;

    this.render = this.render.bind(this);

    this.ctx.beginPath();
    this.ctx.rect(0, (this.y - 20), 30, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.rect(570, (this.y - 20), 30, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
  }

  render(y) {
    this.ctx.beginPath();
    this.ctx.rect(0, y, 30, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.rect(570, y, 30, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
  }

}

export default Hash;
