
class Defender {

  constructor(krCanvas, ctx, returner){
    this.returner = returner;
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.defX = Math.floor(krCanvas.width*Math.random());
    this.defY = krCanvas.height - (krCanvas.height - (30 + 100*Math.random()));
    this.defRadius = 16;
    this.defDirStart = 0;
    this.defDirEnd = this.defDirStart + Math.PI;
    this.defDirVector = this.defDirStart - Math.PI/2;
    this.defDelta = Math.floor(6 + 15*Math.random());
    this.defDeltaY;
    this.defDeltaX;
    this.defColorB = "#ffcb05";
    this.defColorT = "#144498";
    this.pastDef = false;

    this.pursue = true; //WILL START AS FALSE AND BECOME TRUE AS RETURNER REACHES CERTAIN SPREAD
    this.spreadX;
    this.spreadY;

    this.render = this.render.bind(this);
    this.trigCalc = this.trigCalc.bind(this);
    this.chase = this.chase.bind(this);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.defX, this.defY, this.defRadius, this.defDirStart, this.defDirEnd, this.pastDef);
    this.ctx.fillStyle = this.defColorB;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(this.defX, this.defY, this.defRadius, this.defDirStart, this.defDirEnd, !this.pastDef);
    this.ctx.fillStyle = this.defColorT;
    this.ctx.fill();
    this.ctx.closePath();
  }

  trigCalc() {
    this.spreadX = this.defX - this.returner.krX;
    this.spreadY = this.defY - this.returner.krY;
    if (this.returner.krY < this.defY) {
      this.defDirVector = Math.PI/2 - Math.atan(this.spreadX/this.spreadY);
      this.defDirStart = this.defDirVector + Math.PI/2;
      this.defDirEnd = this.defDirStart - Math.PI;
    } else {
      this.defDirVector = Math.PI/2 - Math.atan(this.spreadX/this.spreadY);
      this.defDirStart = this.defDirVector - Math.PI/2;
      this.defDirEnd = this.defDirStart + Math.PI;
    }

    if (Math.sin(this.defDirVector) >= 0) {
      this.defDeltaY = Math.floor(this.defDelta*Math.sin(this.defDirVector));
    } else {
      this.defDeltaY = Math.ceil(this.defDelta*Math.sin(this.defDirVector));
    }

    if (Math.cos(this.defDirVector) >= 0) {
      this.defDeltaX = Math.floor(this.defDelta*Math.cos(this.defDirVector));
    } else {
      this.defDeltaX = Math.ceil(this.defDelta*Math.cos(this.defDirVector));
    }
  }

  chase(){
    if (this.returner.krY < this.defY) {
      this.defY -= this.defDeltaY;
      this.defX -= this.defDeltaX;
    } else {
      this.defY += this.defDeltaY;
      this.defX += this.defDeltaX;
    }
  }

}

export default Defender;
