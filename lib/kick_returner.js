

class KickReturner {

  constructor(krCanvas, ctx){
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.krX = krCanvas.width/2;
    this.krY = krCanvas.height - 100;
    this.krRadius = 16;
    this.krDirStart = 0;
    this.krDirEnd = this.krDirStart + Math.PI;
    this.krDirVector = this.krDirStart - Math.PI/2;
    this.krDelta = 24;
    this.krJukeMultiple = 2;
    this.krDeltaY;
    this.krDeltaX;
    this.krColorB = "#068653";
    this.krColorT = "white";

    this.render = this.render.bind(this);
    this.trigCalc = this.trigCalc.bind(this);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.krX, this.krY, this.krRadius, this.krDirStart, this.krDirEnd, false);
    this.ctx.fillStyle = this.krColorB;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(this.krX, this.krY, this.krRadius, this.krDirStart, this.krDirEnd, true);
    this.ctx.fillStyle = this.krColorT;
    this.ctx.fill();
    this.ctx.closePath();
  }

  trigCalc(ref, bool = true) {
      if (Math.sin(this.krDirVector) >= 0) {
        this.krDeltaY = Math.floor(this.krDelta*Math.sin(ref));
      } else {
        this.krDeltaY = Math.ceil(this.krDelta*Math.sin(ref));
      }
      if (Math.cos(this.krDirVector) >= 0) {
        this.krDeltaX = Math.floor(this.krDelta*Math.cos(ref));
      } else {
        this.krDeltaX = Math.ceil(this.krDelta*Math.cos(ref));
      }
      if (bool === true) {
        this.krY += this.krDeltaY;
        this.krX += this.krDeltaX;
      } else {
        this.krY -= this.krDeltaY;
        this.krX -= this.krDeltaX;
      }
  }
}


export default KickReturner;
