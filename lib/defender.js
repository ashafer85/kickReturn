
class Defender {

  constructor(krCanvas, ctx, returner){
    this.returner = returner;
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.x = Math.floor(krCanvas.width*Math.random());
    this.y = krCanvas.height - (300 + 1200*Math.random());
    this.radius = 16;
    this.dirStart = 0;
    this.dirEnd = this.dirStart + Math.PI;
    this.dirVector = this.dirStart - Math.PI/2;
    this.delta = 3 + Math.ceil(3*Math.random());
    // Math.floor(6 + 15*Math.random());
    this.deltaY;
    this.deltaX;
    this.colorB = "#ffcb05";
    this.colorT = "#144498";
    this.pastDef = false;

    this.pursue = false; //WILL START AS FALSE AND BECOME TRUE AS RETURNER REACHES CERTAIN SPREAD
    this.spreadX;
    this.spreadY;

    this.render = this.render.bind(this);
    this.trigCalc = this.trigCalc.bind(this);
    this.chase = this.chase.bind(this);

  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.dirStart, this.dirEnd, this.pastDef);
    this.ctx.fillStyle = this.colorB;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.dirStart, this.dirEnd, !this.pastDef);
    this.ctx.fillStyle = this.colorT;
    this.ctx.fill();
    this.ctx.closePath();
  }

  trigCalc() {
    this.spreadX = this.x - this.returner.x;
    this.spreadY = this.y - this.returner.y;

    if (this.returner.y < this.y) {
      this.dirVector = Math.PI/2 - Math.atan(this.spreadX/this.spreadY);
      this.dirStart = this.dirVector + Math.PI/2;
      this.dirEnd = this.dirStart - Math.PI;
    } else {
      this.dirVector = Math.PI/2 - Math.atan(this.spreadX/this.spreadY);
      this.dirStart = this.dirVector - Math.PI/2;
      this.dirEnd = this.dirStart + Math.PI;
    }

    if (Math.sin(this.dirVector) >= 0) {
      this.deltaY = Math.floor(this.delta*Math.sin(this.dirVector));
    } else {
      this.deltaY = Math.ceil(this.delta*Math.sin(this.dirVector));
    }

    if (Math.cos(this.dirVector) >= 0) {
      this.deltaX = Math.floor(this.delta*Math.cos(this.dirVector));
    } else {
      this.deltaX = Math.ceil(this.delta*Math.cos(this.dirVector));
    }
  }

  chase(){
    if (this.returner.y < this.y) {
      this.y -= this.deltaY;
      this.x -= this.deltaX;
    } else {
      this.y += this.deltaY;
      this.x += this.deltaX;
    }
  }

}

export default Defender;
