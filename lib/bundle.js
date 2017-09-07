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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__kick_returner_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__defender_js__ = __webpack_require__(2);



// const KickReturner = require("./kick_returner");
// const Defender = require("./defender");


document.addEventListener('DOMContentLoaded', () => {

  var krCanvas = document.getElementById('kr-canvas');
  var ctx = krCanvas.getContext('2d');

  var kR = new __WEBPACK_IMPORTED_MODULE_0__kick_returner_js__["a" /* default */](krCanvas, ctx)
  var numDefs = 9;
  var defs = [];

  for (let i = 0; i < numDefs; i++) {
    defs.push(new __WEBPACK_IMPORTED_MODULE_1__defender_js__["a" /* default */](krCanvas, ctx, kR));
  }

  const clearField = () => {
    ctx.clearRect(0, 0, krCanvas.width, krCanvas.height);
  }

  const spreadPyth = (x1, y1, x2, y2) => {
    return Math.floor(Math.sqrt(Math.pow((x1-x2), 2) + Math.pow(y1-y2, 2)));
  }
  const checkCollision = (def) => {
    if ( spreadPyth(kR.krX, kR.krY, def.defX, def.defY) <= (kR.krRadius*2)) {
      return true;
    } else {
      return false;
    }
  }

  const reDraw = (pursue = true) => {
    clearField();
    kR.render();
    defs.forEach( (def) => {
      if(pursue === true) {
        def.trigCalc();
        def.chase();
      };
      if (checkCollision(def)) {
        def.defRadius += 5;
      }
      def.render();
    });
  }


  kR.render();
  defs.forEach( (def) => {
    def.render();
  });

  document.addEventListener('keydown', (e) => {
    console.log(e.keyCode)

    switch(e.keyCode) {
      case(38):
        kR.trigCalc(kR.krDirVector);
        reDraw();
        break;
      case(40):
        kR.trigCalc(kR.krDirVector, false);
        reDraw();
        break;
      case(39):
        kR.krDirStart += Math.PI/4;
        kR.krDirEnd = kR.krDirStart + Math.PI;
        kR.krDirVector = kR.krDirStart - Math.PI/2;
        reDraw(false);
        break;
      case(37):
        kR.krDirStart -= Math.PI/4;
        kR.krDirEnd = kR.krDirStart + Math.PI;
        kR.krDirVector = kR.krDirStart - Math.PI/2;
        reDraw(false);
        break;
      case(83):
        kR.trigCalc(kR.krDirEnd);
        reDraw();
        break;
      case(68):
        kR.trigCalc(kR.krDirStart);
        reDraw();
        break;
    }; // KeyCode switch statement
  }); // Keydown Event Listener

  // window.requestAnimationFrame(chase);


}); // DOMContentLoaded Listener


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class KickReturner {

  constructor(krCanvas, ctx){
    this.krCanvas = krCanvas;
    this.ctx = ctx;
    this.krX = krCanvas.width/2;
    this.krY = krCanvas.height - 100;
    this.krRadius = 16;
    this.krDirStart = 0;
    this.krDirEnd = this.krDirStart + Math.PI;
    this.krDirVector = this.krDirStart - Math.PI/2;
    this.krDelta = 24;
    this.krJukeMultiple = 2;
    this.krDeltaY;
    this.krDeltaX;
    this.krColorB = "#068653";
    this.krColorT = "white";

    this.render = this.render.bind(this);
    this.trigCalc = this.trigCalc.bind(this);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.krX, this.krY, this.krRadius, this.krDirStart, this.krDirEnd, false);
    this.ctx.fillStyle = this.krColorB;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(this.krX, this.krY, this.krRadius, this.krDirStart, this.krDirEnd, true);
    this.ctx.fillStyle = this.krColorT;
    this.ctx.fill();
    this.ctx.closePath();
  }

  trigCalc(ref, bool = true) {
      if (Math.sin(this.krDirVector) >= 0) {
        this.krDeltaY = Math.floor(this.krDelta*Math.sin(ref));
      } else {
        this.krDeltaY = Math.ceil(this.krDelta*Math.sin(ref));
      }
      if (Math.cos(this.krDirVector) >= 0) {
        this.krDeltaX = Math.floor(this.krDelta*Math.cos(ref));
      } else {
        this.krDeltaX = Math.ceil(this.krDelta*Math.cos(ref));
      }
      if (bool === true) {
        this.krY += this.krDeltaY;
        this.krX += this.krDeltaX;
      } else {
        this.krY -= this.krDeltaY;
        this.krX -= this.krDeltaX;
      }
  }
}


/* harmony default export */ __webpack_exports__["a"] = (KickReturner);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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

/* harmony default export */ __webpack_exports__["a"] = (Defender);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map