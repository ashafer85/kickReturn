
class Defender {

  constructor(krCanvas, ctx, returner){
    this.returner = returner;
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.x = Math.floor(krCanvas.width*Math.random());
    this.y = krCanvas.height - (350 + 1600*Math.random());
    this.radius = 16;
    this.dirStart = 0;
    this.dirEnd = this.dirStart + Math.PI;
    this.dirVector = this.dirStart - Math.PI/2;
    this.delta = 5 + Math.ceil(3*Math.random());
    // Math.floor(6 + 15*Math.random());
    this.deltaY;
    this.deltaX;
    this.styleHelmet = false;
    this.colorDark = "#068653";
    this.colorLight = "white";
    this.pastDef = false;

    this.pursue = false; //WILL START AS FALSE AND BECOME TRUE AS RETURNER REACHES CERTAIN SPREAD
    this.spreadX;
    this.spreadY;

    this.render = this.render.bind(this);
    this.trigCalc = this.trigCalc.bind(this);
    this.chase = this.chase.bind(this);

  }

  render() {
    // Light Color base helmet
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.dirStart, this.dirStart + Math.PI*2, false);
    this.ctx.fillStyle = this.colorLight;
    this.ctx.fill();
    this.ctx.closePath();
    // Blue sides to create yellow mid-stripe
    // right side
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, (this.dirVector - (Math.PI/32)), (this.dirStart + (17*(Math.PI/32))), true);
    this.ctx.fillStyle = this.colorDark;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, (this.dirVector + (Math.PI/32)), (this.dirStart + (15*(Math.PI/32))), false);
    this.ctx.fillStyle = this.colorDark;
    this.ctx.fill();
    this.ctx.closePath();



    if (this.styleHelmet === true) {
      // Yellow side stripes
      //right side
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
      // Blue super Sides to create yellow side stripes
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
      //Yellow front
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, (this.dirVector - (3*Math.PI/8)), (this.dirVector + (3*Math.PI/8)), false);
      this.ctx.fillStyle = this.colorLight;
      this.ctx.fill();
      this.ctx.closePath();
    } else {
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
