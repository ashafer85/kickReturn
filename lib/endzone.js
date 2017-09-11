class EndZone {
  constructor(krCanvas, ctx, y) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.x = 0;
    this.y = y;

    this.render = this.render.bind(this);

    this.ctx.beginPath();
    this.ctx.rect(0, this.y, this.krCanvas.width, 200);
    this.ctx.fillStyle = 'pink';
    this.ctx.fill();
    this.ctx.closePath();
  }


    render() {
      this.ctx.beginPath();
      this.ctx.rect(0, this.y, this.krCanvas.width, 200);
      this.ctx.fillStyle = 'green';
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.rect(0, this.y, this.krCanvas.width, 4);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
      this.ctx.closePath();
    }

}

export default EndZone;
