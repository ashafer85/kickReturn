

class KickReturner {

  constructor(krCanvas, ctx, yardLines){
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.yardLines = yardLines;
    this.ob = false;

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
    this.yardsToScore = 100;

    this.render = this.render.bind(this);
    this.trigCalc = this.trigCalc.bind(this);
    this.receiveDefs = this.receiveDefs.bind(this);
  }

  receiveDefs(defs) {
    this.defs = defs;
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
        if (this.y < 180 && this.deltaY < 0) {
          this.yardLines.forEach( (yl) => {
            yl.y -= this.deltaY;
          });

          this.defs.forEach( (def) => {
            def.y -= this.deltaY;
          });
        } else if (this.y > 370 && this.deltaY > 0) {
          this.yardLines.forEach( (yl) => {
            yl.y -= this.deltaY;
          });
          this.defs.forEach( (def) => {
            def.y -= this.deltaY;
          });

        } else {
          this.y += this.deltaY;
        }
        if (((this.x + this.deltaX) > 10) && ((this.x + this.deltaX) < 590)) {
          this.x += this.deltaX;
        } else {
          this.x += this.deltaX;
          this.oB = true;
          this.delta = 0;
        }

      } else {
        if (this.y < 180 && this.deltaY > 0) {
          this.yardLines.forEach( (yl) => {
            yl.y += this.deltaY;
          });
          this.defs.forEach( (def) => {
            def.y += this.deltaY;
          });
        } else if (this.y > 370 && this.deltaY < 0) {
          this.yardLines.forEach( (yl) => {
            yl.y += this.deltaY;
          });
          this.defs.forEach( (def) => {
            def.y += this.deltaY;
          });
        } else {
          this.y -= this.deltaY
        }

        if (((this.x - this.deltaX) > 10) && ((this.x - this.deltaX) < 390)) {
          this.x -= this.deltaX;
        } else {
          this.x -= this.deltaX;
        }
        
      }
  }
}


export default KickReturner;
