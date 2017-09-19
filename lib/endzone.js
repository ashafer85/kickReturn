class EndZone {
  constructor(krCanvas, ctx, y) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.x = 0;
    this.y = y;
    // this.colorDark = colorDark;
    // this.colrLight = colorLight;

    this.render = this.render.bind(this);

    this.ctx.beginPath();
    this.ctx.rect(0, this.y, this.krCanvas.width, 200);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.closePath();
  }


    render() {
      this.ctx.beginPath();
      this.ctx.rect(0, this.y, this.krCanvas.width, 200);
      this.ctx.fillStyle = '#f58426';
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.rect(0, this.y, this.krCanvas.width, 4);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      // this.ctx.font = '85px Verdana';
      // this.ctx.fillText('WOLVERINES', 10, (this.y + 140));
      this.ctx.font = '140px Verdana';
      this.ctx.fillText('TIGERS', 40, (this.y + 150));
    }

}

export default EndZone;
