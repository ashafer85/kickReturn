

class KickReturner {

  constructor(krCanvas, ctx){
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.x = krCanvas.width/2;
    this.y = krCanvas.height - 100;
    this.colorB = "#068653";
    this.colorT = "white";
    this.radius = 16;
    this.dirStart = 0;
    this.dirEnd = this.dirStart + Math.PI;
    this.dirVector = this.dirStart - Math.PI/2;

    this.delta = 18;
    this.jukeMultiple = 2;
    this.deltaY;
    this.deltaX;

    this.render = this.render.bind(this);
    this.trigCalc = this.trigCalc.bind(this);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.dirStart, this.dirEnd, false);
    this.ctx.fillStyle = this.colorB;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.dirStart, this.dirEnd, true);
    this.ctx.fillStyle = this.colorT;
    this.ctx.fill();
    this.ctx.closePath();
  }

  trigCalc(ref, bool = true) {
      if (Math.sin(this.dirVector) >= 0) {
        this.deltaY = Math.floor(this.delta*Math.sin(ref));
      } else {
        this.deltaY = Math.ceil(this.delta*Math.sin(ref));
      }
      if (Math.cos(this.dirVector) >= 0) {
        this.deltaX = Math.floor(this.delta*Math.cos(ref));
      } else {
        this.deltaX = Math.ceil(this.delta*Math.cos(ref));
      }
      if (bool === true) {
        this.y += this.deltaY;
        this.x += this.deltaX + 1;
      } else {
        this.y -= this.deltaY;
        this.x -= this.deltaX - 1;
      }
  }
}


export default KickReturner;
