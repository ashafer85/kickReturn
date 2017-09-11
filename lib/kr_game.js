import KickReturner from './kick_returner.js';
import Defender from './defender.js';
import YardLine from './yard_line.js';
import EndZone from './endzone.js';

// const KickReturner = require("./kick_returner");
// const Defender = require("./defender");

class KRGame {
  constructor(krCanvas, ctx) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.gameOver = false;
    this.winner = false;
    this.y2S = 100;
    this.pix2S;

    this.yardLines = [];
    for(let i = 0; i < 21; i++) {
      this.yardLines.push(new YardLine(this.krCanvas, this.ctx, this.krCanvas.height - (i+1)*100));
      if (i === 20) {
        this.yardLines.push(new EndZone(this.krCanvas, this.ctx, this.krCanvas.height - (i+3)*100));
      }
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
    this.slowKR = this.slowKR.bind(this);
    // this.tackle = this.tackle.bind(this);
  }

  clearField() {
    this.ctx.clearRect(0, 0, this.krCanvas.width, this.krCanvas.height);
  }

  spreadPyth(x1, y1, x2, y2) {
    return Math.floor(Math.sqrt(Math.pow((x1-x2), 2) + Math.pow(y1-y2, 2)));
  }

  slowKR() {
    if (this.kR.delta > 0) {
      this.kR.delta -= 1;
    };
  }

  checkCollision(def) {
    if ( this.spreadPyth(def.returner.x, def.returner.y, def.x, def.y) <= (def.returner.radius*2)) {
      this.slowKR();
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

  checkTouchdown() {
    if (this.y2S <= 0) {
      this.winner = true;
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
    this.pix2S = (this.kR.y - (this.kR.yardLines[21].y + 210));
    this.y2S = Math.floor((this.kR.y - (this.kR.yardLines[21].y + 210)) / 20);
    if (this.y2S <= 0) {
      this.winner = true;
      this.gameOver = true;
    }
    debugger
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

    return this.gameOver;
  }

  // tackle() {
  //   // document.removeEventListener('keydown');
  //   debugger
  //   moveTo1X = this.kR.x - 24;
  //   moveTo1Y = this.kR.y + 24;
  //   moveTo2X = this.kR.x + 24;
  //   moveTo2Y = this.kR.y + 24;
  //
  //   lineTo1X
  //
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(moveTo1X, moveTo1Y);
  //   this.ctx.lineTo(this.kR.x + 24, this.kR.y - 24);
  //   this.ctx.moveTo(moveTo2X, moveTo2Y);
  //   this.ctx.lineTo(this.kR.x - 24, this.kR.y - 24);
  //   this.ctx.lineWidth = 6:
  //   this.ctx.strokeStyle = 'red';
  //   this.ctx.stroke();
  //   this.ctx.closePath();
  // }

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
      def.render();
      if (this.checkCollision(def)) {
        // this.tackle();
        // this.gameOver = true;
      }
    });


  }

  // touchdown(){
  //   this.winner = true;
  // }
  // window.requestAnimationFrame(chase);
}

export default KRGame;
