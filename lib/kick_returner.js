

class KickReturner {

  constructor(krCanvas, ctx, yardLines){
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.yardLines = yardLines;
    this.ob = false;

    this.x = krCanvas.width/2;
    this.y = krCanvas.height - 100;

    this.wingedHelmet = false;
    this.colorDark = "#068653";
    this.colorLight = "white";

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


  trigCalc(ref, bool = true) {
      if (Math.sin(ref) >= 0) {
        this.deltaY = Math.floor(this.delta*Math.sin(ref));
      } else {
        this.deltaY = Math.ceil(this.delta*Math.sin(ref));
      }
      if (Math.cos(ref) >= 0) {
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

  render() {
    // Base helmet
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.dirStart, this.dirStart + Math.PI*2, this.pastDef);
    this.ctx.fillStyle = this.colorLight;
    this.ctx.fill();
    this.ctx.closePath();

    if (this.wingedHelmet === true) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector - (Math.PI/32)), (this.dirStart + (17*(Math.PI/32))), !this.pastDef);
      this.ctx.fillStyle = this.colorDark;
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector + (Math.PI/32)), (this.dirStart + (15*(Math.PI/32))), this.pastDef);
      this.ctx.fillStyle = this.colorDark;
      this.ctx.fill();
      this.ctx.closePath();
      // Side stripes
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector + (Math.PI/16)), (this.dirStart + (Math.PI/4)), false);
      this.ctx.fillStyle = this.colorLight;
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector - (Math.PI/16)), (this.dirEnd - (Math.PI/4)), true);
      this.ctx.fillStyle = this.colorLight;
      this.ctx.fill();
      this.ctx.closePath();
      // Super Sides to create side stripes
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector + (7*Math.PI/64)), (this.dirStart + 3*Math.PI/16), false);
      this.ctx.fillStyle = this.colorDark;
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector - (7*Math.PI/64)), (this.dirEnd - 3*Math.PI/16), true);
      this.ctx.fillStyle = this.colorDark;
      this.ctx.fill();
      this.ctx.closePath();
      // Front of Helmet
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector - (3*Math.PI/8)), (this.dirVector + (3*Math.PI/8)), false);
      this.ctx.fillStyle = this.colorLight;
      this.ctx.fill();
      this.ctx.closePath();
    } else {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector - (Math.PI/8)), (this.dirStart + (17*(Math.PI/32))), !this.pastDef);
      this.ctx.fillStyle = this.colorDark;
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector + (Math.PI/8)), (this.dirStart + (15*(Math.PI/32))), this.pastDef);
      this.ctx.fillStyle = this.colorDark;
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirStart + 3*Math.PI/16), (this.dirStart - 3*Math.PI/16), true);
      this.ctx.fillStyle = this.colorLight;
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirEnd + (3*Math.PI/16)), (this.dirEnd - (3*Math.PI/16)), true);
      this.ctx.fillStyle = this.colorLight;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}


export default KickReturner;
