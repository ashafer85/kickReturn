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
  game.play();
  setInterval(game.moveDefense, 80);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__kick_returner_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__defender_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__yard_line_js__ = __webpack_require__(4);




// const KickReturner = require("./kick_returner");
// const Defender = require("./defender");

class KRGame {
  constructor(krCanvas, ctx) {
    this.krCanvas = krCanvas;
    this.ctx = ctx;

    this.yardLines = [];
    for(let i = 0; i < 20; i++) {
      this.yardLines.push(new __WEBPACK_IMPORTED_MODULE_2__yard_line_js__["a" /* default */](this.krCanvas, this.ctx, this.krCanvas.height - (i+1)*99))
    }

    this.kR = new __WEBPACK_IMPORTED_MODULE_0__kick_returner_js__["a" /* default */](this.krCanvas, this.ctx, this.yardLines);

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
        debugger
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
        this.x += this.deltaX + 1;

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
        this.x -= this.deltaX - 1;
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map