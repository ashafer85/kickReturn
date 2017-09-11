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

    this.refTD = new Image();
    this.refTD.src = './refereeTOUCHDOWN.gif';
    this.refDB = new Image();
    this.refDB.src = './refereeDEADBALL.gif';

    this.yardLines = [];
    for(let i = 0; i < 21; i++) {
      this.yardLines.push(new YardLine(this.krCanvas, this.ctx, this.krCanvas.height - (i+1)*100));
      if (i === 20) {
        this.yardLines.push(new EndZone(this.krCanvas, this.ctx, this.krCanvas.height - (i+3)*100));
      }
    }

    this.kR = new KickReturner(this.krCanvas, this.ctx, this.yardLines);
    this.kR.onLeft = 0;

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
  speedKR() {
    if (this.kR.delta < 18) {
      this.kR.delta += 1;
    };
  }

  checkCollision(def) {
    if ( this.spreadPyth(def.returner.x, def.returner.y, def.x, def.y) <= (def.returner.radius*2)) {
      this.slowKR();
      return true;
    } else {
      // this.speedKR();
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
    debugger
    this.pix2S = (this.kR.y - (this.kR.yardLines[21].y + 200));
    this.y2S = Math.ceil((this.kR.y - (this.kR.yardLines[21].y + 200)) / 20);
    this.kR.y2S = this.y2S;

    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Score in: ' + this.y2S + ' yards', 33, 23);

    if (this.y2S <= 0) {
      this.winner = true;
      this.gameOver = true;
    }
    if (this.kR.delta < 1) {
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
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Score in: ' + this.y2S + ' yards', 33, 23);

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

  moveDefense() {
    this.clearField();
    this.yardLines.forEach( (yl) => {
      yl.render();
    });

    this.kR.render();
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Score in: ' + this.y2S + ' yards', 33, 23);

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

  handleEnd() {
    // stop game and display stats...
    this.clearField();
    this.yardLines.forEach( (yl) => {
      yl.render();
    });
    this.kR.render();
    this.defs.forEach( (def) => {
      def.trigCalc();
      def.render();
    });

    if (this.kR.x < 280) {
      this.kR.onLeft = 240;
    }

    if (this.winner === true) {
      this.ctx.drawImage(this.refTD, (60 + this.kR.onLeft), 100, 180, 200);
      this.ctx.fillStyle = 'red';
      this.ctx.font = '60px Arial';
      this.ctx.fillText('TOUCHDOWN!!!', 100, 250);
    } else {
      this.ctx.drawImage(this.refDB, (60 + this.kR.onLeft), 100, 180, 200);
      this.ctx.fillStyle = 'red';
      this.ctx.font = '40px Arial';
      this.ctx.fillText('TACKLED!', (60 + this.kR.onLeft), 250);
      this.ctx.fillStyle = 'black';
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Your Return: ' + (100 - this.y2S) + ' yards', (60 + this.kR.onLeft), 330);
    }
  }
}

export default KRGame;
