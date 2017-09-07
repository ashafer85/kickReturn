import KickReturner from './kick_returner.js';
import Defender from './defender.js';

// const KickReturner = require("./kick_returner");
// const Defender = require("./defender");


document.addEventListener('DOMContentLoaded', () => {

  var krCanvas = document.getElementById('kr-canvas');
  var ctx = krCanvas.getContext('2d');

  var kR = new KickReturner(krCanvas, ctx)
  var numDefs = 9;
  var defs = [];

  for (let i = 0; i < numDefs; i++) {
    defs.push(new Defender(krCanvas, ctx, kR));
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
