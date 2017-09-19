/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__kr_game_js__ = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', () => {

  var krCanvas = document.getElementById('kr-canvas');
  var ctx = krCanvas.getContext('2d');

  var game = new __WEBPACK_IMPORTED_MODULE_0__kr_game_js__["a" /* default */](krCanvas, ctx);
  game.reDraw();

  ctx.fillStyle = 'rgba(0, 0, 0, .7)';
  ctx.fillRect(35, 30, 530, 240);

  ctx.fillStyle = 'white';
  ctx.font = '26px Arial';
  ctx.fillText('The DEFENSE is Coming!!!', 125, 80);

  ctx.fillStyle = '#068653';
  ctx.font = '22px Arial';
  ctx.fillText('Navigate Up the Field to Score!', 145, 130);
  ctx.fillText('...Avoid All Defenders!', 185, 160);
  ctx.fillStyle = 'white';
  ctx.font = '18px Arial';
  ctx.fillText('GAME INSTRUCTIONS BELOW:', 160, 190);

  ctx.font = '36px Arial';
  ctx.fillText('Press -SPACE BAR- to Begin', 55, 250);

  let interval;

  const playInterval = () => {
    if (game.gameOver === false) {
      game.moveDefense();
    } else {
      game.handleEnd();
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      game = new __WEBPACK_IMPORTED_MODULE_0__kr_game_js__["a" /* default */](krCanvas, ctx);
      game.play();
      if (!interval) interval = setInterval(playInterval, 80);
    }
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__kick_returner_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__defender_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__yard_line_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__endzone_js__ = __webpack_require__(6);





// const KickReturner = require("./kick_returner");
// const Defender = require("./defender");

class KRGame {
  constructor(krCanvas, ctx) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.gameOver = false;
    this.winner = false;
    this.y2S = 100;

    this.refTD = new Image();
    this.refTD.src = './img/refereeTOUCHDOWN.gif';
    this.refDB = new Image();
    this.refDB.src = './img/refereeDEADBALL.gif';

    this.yardLines = [];
    for(let i = 0; i < 21; i++) {
      if ( i === 0) {
        this.yardLines.push(new __WEBPACK_IMPORTED_MODULE_3__endzone_js__["a" /* default */](this.krCanvas, this.ctx, this.krCanvas.height - 100))
      }
      this.yardLines.push(new __WEBPACK_IMPORTED_MODULE_2__yard_line_js__["a" /* default */](this.krCanvas, this.ctx, this.krCanvas.height - (i+1)*100));
      if (i === 20) {
        this.yardLines.push(new __WEBPACK_IMPORTED_MODULE_3__endzone_js__["a" /* default */](this.krCanvas, this.ctx, this.krCanvas.height - (i+3)*100));
      }
    }

    this.kR = new __WEBPACK_IMPORTED_MODULE_0__kick_returner_js__["a" /* default */](this.krCanvas, this.ctx, this.yardLines);
    this.kR.onLeft = 0;

    this.numDefs = 22;
    this.defs = [];
    for (let i = 0; i < this.numDefs; i++) {
      this.defs.push(new __WEBPACK_IMPORTED_MODULE_1__defender_js__["a" /* default */](this.krCanvas, this.ctx, this.kR));
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
    if (this.kR.delta > 1) {
      this.kR.delta -= 2;
    } else if (this.kR.delta === 1) {
      this.kR.delta -= 1;
    } else {
      this.kR.delta = 0;
    }
  }
  speedKR() {
    if (this.kR.delta < 15) {
      this.kR.delta += 0.03;
    };
  }

  checkCollision(def) {
    if ( this.spreadPyth(def.returner.x, def.returner.y, def.x, def.y) <= (def.returner.radius*2)) {
      this.slowKR();
      return true;
    } else {
      this.speedKR();
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

    if (this.kR.delta < 0) this.kR.delta = 0;
    this.kR.render();

    this.defs.forEach( (def) => {
      def.trigCalc();
      def.render();
    });
    this.y2S = Math.ceil((this.kR.y - (this.kR.yardLines[22].y + 200)) / 20);
    this.kR.y2S = this.y2S;

    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Score in: ' + this.y2S + ' yards', 33, 23);
  }

  play() {
    this.clearField();
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
      this.checkPursue(def);
      if(def.pursue === true) {
        def.trigCalc();
        def.chase();
      };
      def.render();
      this.checkCollision(def);
    });

    if (this.y2S <= 0) {
      this.winner = true;
      this.gameOver = true;
    }
    if (this.kR.delta < 1) {
      this.gameOver = true;
    }
    if (this.kR.oB === true) {
      this.gameOver = true;
    }
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
      this.ctx.drawImage(this.refTD, 30, 100, 200, 200);
      this.ctx.fillStyle = 'red';
      this.ctx.font = '60px Arial';
      this.ctx.fillText('TOUCHDOWN!!!', 100, 250);
      this.ctx.fillStyle = 'rgba(0, 0, 0, .7)';
      this.ctx.fillRect(35, 10, 530, 60);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Press -SPACE- to Play Again', 190, 45);
    } else if (this.kR.oB === true) {
      this.ctx.drawImage(this.refDB, (60 + this.kR.onLeft), 100, 200, 250);
      this.ctx.fillStyle = 'rgba(0, 0, 0, .7)';
      this.ctx.fillRect(35, 10, 530, 80);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '40px Arial';
      this.ctx.fillText('Your Return: ' + (100 - this.y2S) + ' yards', 100, 50);
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Press -SPACE- to Try Again', 190, 80);
      this.ctx.fillStyle = 'red';
      this.ctx.font = '40px Arial';
      this.ctx.fillText('OUT OF BOUNDS!', (150), 300);
    } else {
      this.ctx.drawImage(this.refDB, (60 + this.kR.onLeft), 100, 200, 250);
      this.ctx.fillStyle = 'rgba(0, 0, 0, .7)';
      this.ctx.fillRect(35, 10, 530, 80);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '40px Arial';
      this.ctx.fillText('Your Return: ' + (100 - this.y2S) + ' yards', 100, 50);
      this.ctx.font = '20px Arial';
      this.ctx.fillText('Press -SPACE- to Try Again', 190, 80);
      this.ctx.fillStyle = 'red';
      this.ctx.font = '40px Arial';
      this.ctx.fillText('TACKLED!', (60 + this.kR.onLeft), 300);
    }


  }
}

/* harmony default export */ __webpack_exports__["a"] = (KRGame);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class KickReturner {

  constructor(krCanvas, ctx, yardLines){
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.yardLines = yardLines;
    this.ob = false;

    this.x = krCanvas.width/2;
    this.y = krCanvas.height - 100;

    // Michigan
    // this.wingedHelmet = true;
    // this.colorDark = "#144498";
    // this.colorLight = "#ffcb05";

    // Michigan State
    // this.wingedHelmet = false;
    // this.colorDark = "#068653";
    // this.colorLight = "white";

    // Princeton
    this.wingedHelmet = true;
    this.colorLight = "#000000";
    this.colorDark = "#f58426";

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


/* harmony default export */ __webpack_exports__["a"] = (KickReturner);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Defender {

  constructor(krCanvas, ctx, returner){
    this.returner = returner;
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.x = Math.floor(krCanvas.width*Math.random());
    this.y = krCanvas.height - (450 + 1600*Math.random());
    this.radius = 16;
    this.dirStart = 0;
    this.dirEnd = this.dirStart + Math.PI;
    this.dirVector = this.dirStart - Math.PI/2;
    this.delta = 4 + Math.ceil(3*Math.random());
    this.deltaY;
    this.deltaX;
    this.pastDef = false;

    // MICHIGAN
    // this.wingedHelmet = true;
    // this.colorDark = "#144498";
    // this.colorLight = "#ffcb05";

    // MICHIGAN STATE
    // this.wingedHelmet = false;
    // this.colorDark = "white";
    // this.colorLight = "#068653";

    // HARVARD
    this.wingedHelmet = false;
    this.colorDark = "#e3be6e";
    this.colorLight = "#a51c30";


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
    if (this.wingedHelmet === true) {
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
      this.dirVector = 3*Math.PI/2 - Math.atan(this.spreadX/this.spreadY);
      this.dirStart = this.dirVector + Math.PI/2;
      this.dirEnd = this.dirStart - Math.PI;
    } else {
      this.dirVector = Math.PI/2 - Math.atan(this.spreadX/this.spreadY);
      this.dirStart = this.dirVector + Math.PI/2;
      this.dirEnd = this.dirStart - Math.PI;
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
      this.y += this.deltaY;
      this.x += this.deltaX;
    } else {
      this.y += this.deltaY;
      this.x += this.deltaX;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Defender);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hash_js__ = __webpack_require__(5);


class YardLine {
  constructor(krCanvas, ctx, y) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;

    this.x = 0;
    this.y = y;

    this.hashes = [];
    for (let i = 0; i < 4; i++) {
      this.hashes.push(new __WEBPACK_IMPORTED_MODULE_0__hash_js__["a" /* default */](this.ctx, y - (i*20)));
    }

    this.render = this.render.bind(this);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.krCanvas.width, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
    for (let r = 0; r < 4; r++) {
      this.hashes[r].render(this.y - (20 + r*20));
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (YardLine);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Hash {
  constructor(ctx, y) {
    this.ctx = ctx;
    this.y = y;

    this.render = this.render.bind(this);

    this.ctx.beginPath();
    this.ctx.rect(0, (this.y - 20), 30, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.rect(570, (this.y - 20), 30, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
  }

  render(y) {
    this.ctx.beginPath();
    this.ctx.rect(0, y, 30, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.rect(570, y, 30, 4);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.closePath();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Hash);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EndZone {
  constructor(krCanvas, ctx, y) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.x = 0;
    this.y = y;
    // this.colorDark = colorDark;
    // this.colrLight = colorLight;

    this.render = this.render.bind(this);

    this.ctx.beginPath();
    this.ctx.rect(0, this.y, this.krCanvas.width, 200);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.closePath();
  }


    render() {
      this.ctx.beginPath();
      this.ctx.rect(0, this.y, this.krCanvas.width, 200);
      this.ctx.fillStyle = '#f58426';
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.rect(0, this.y, this.krCanvas.width, 4);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      // this.ctx.font = '85px Verdana';
      // this.ctx.fillText('WOLVERINES', 10, (this.y + 140));
      this.ctx.font = '100px Verdana';
      this.ctx.fillText('PRINCETON', 10, (this.y + 140));
    }

}

/* harmony default export */ __webpack_exports__["a"] = (EndZone);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map