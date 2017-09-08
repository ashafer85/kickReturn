import KickReturner from './kick_returner.js';
import Defender from './defender.js';
import YardLine from './yard_line.js'

// const KickReturner = require("./kick_returner");
// const Defender = require("./defender");

class KRGame {
  constructor(krCanvas, ctx) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;

    this.yardLines = [];
    for(let i = 0; i < 20; i++) {
      this.yardLines.push(new YardLine(this.krCanvas, this.ctx, this.krCanvas.height - (i+1)*99))
    }

    this.kR = new KickReturner(this.krCanvas, this.ctx, this.yardLines);

    this.numDefs = 22;
    this.defs = [];
    for (let i = 0; i < this.numDefs; i++) {
      this.defs.push(new Defender(this.krCanvas, this.ctx, this.kR));
    }

    this.kR.receiveDefs(this.defs);

    this.checkCollision = this.checkCollision.bind(this);
    this.reDraw = this.reDraw.bind(this);
    this.play = this.play.bind(this);
    this.clearField = this.clearField.bind(this);
    this.moveDefense = this.moveDefense.bind(this);
  }

  clearField() {
    this.ctx.clearRect(0, 0, this.krCanvas.width, this.krCanvas.height);
  }

  spreadPyth(x1, y1, x2, y2) {
    return Math.floor(Math.sqrt(Math.pow((x1-x2), 2) + Math.pow(y1-y2, 2)));
  }

  checkCollision(def) {
    if ( this.spreadPyth(def.returner.x, def.returner.y, def.x, def.y) <= (def.returner.radius*2)) {
      return true;
    } else {
      return false;
    }
  }

  checkPursue(def) {
    if ( this.spreadPyth(def.returner.x, def.returner.y, def.x, def.y) <= (400) || ((def.returner.y - 150) < def.y)) {
      def.pursue = true;
    } else {
      def.pursue = false;
    }
  }

  reDraw(pursue = true) {
    this.clearField();
    this.yardLines.forEach( (yl) => {
      yl.render();
    });
    this.kR.render();
    this.defs.forEach( (def) => {
      def.trigCalc();
      def.render();
    });
  }

  play() {
    this.yardLines.forEach( (yl) => {
      yl.render();
    });
    this.kR.render();
    this.defs.forEach( (def) => {
      def.render();
    });
    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case(38):
        this.kR.trigCalc(this.kR.dirVector);
        this.reDraw();
        break;
        case(40):
        this.kR.trigCalc(this.kR.dirVector, false);
        this.reDraw();
        break;
        case(39):
        this.kR.dirStart += Math.PI/4;
        this.kR.dirEnd = this.kR.dirStart + Math.PI;
        this.kR.dirVector = this.kR.dirStart - Math.PI/2;
        this.reDraw(false);
        break;
        case(37):
        this.kR.dirStart -= Math.PI/4;
        this.kR.dirEnd = this.kR.dirStart + Math.PI;
        this.kR.dirVector = this.kR.dirStart - Math.PI/2;
        this.reDraw(false);
        break;
        case(83):
        this.kR.trigCalc(this.kR.dirEnd);
        this.reDraw();
        break;
        case(68):
        this.kR.trigCalc(this.kR.dirStart);
        this.reDraw();
        break;
      }; // KeyCode switch statement
    }); // Keydown Event Listener


  }

  moveDefense() {
    this.clearField();
    this.yardLines.forEach( (yl) => {
      yl.render();
    });
    this.kR.render();
    this.defs.forEach( (def) => {
      if(this.checkPursue(def)) {

      };
      if(def.pursue === true) {
        def.trigCalc();
        def.chase();
      };
      if (this.checkCollision(def)) {
        def.radius += 1;
      }
      def.render();
    });

    // setInterval(this.startDefense, 500);
  }


  // window.requestAnimationFrame(chase);
}

export default KRGame;
