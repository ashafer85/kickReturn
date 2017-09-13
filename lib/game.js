import KRGame from './kr_game.js';

document.addEventListener('DOMContentLoaded', () => {

  var krCanvas = document.getElementById('kr-canvas');
  var ctx = krCanvas.getContext('2d');

  var game = new KRGame(krCanvas, ctx);
  game.reDraw();

  ctx.fillStyle = 'white';
  ctx.font = '30px Times';
  ctx.fillText('The DEFENSE is Coming!!!', 125, 80);

  ctx.fillStyle = '#068653';
  ctx.font = '25px Times';
  ctx.fillText('Navigate Up the Field to Score', 145, 130);
  ctx.fillStyle = '#068653';
  ctx.font = '25px Times';
  ctx.fillText('Avoid All Defenders', 195, 160);
  ctx.fillStyle = '#068653';
  ctx.font = '20px Times';
  ctx.fillText('KEYBOARD INSTRUCTIONS BELOW:', 125, 190);

  ctx.fillStyle = 'white';
  ctx.font = '40px Times';
  ctx.fillText('Press - SPACE BAR - to Begin', 55, 250);

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
      game = new KRGame(krCanvas, ctx);
      game.play();
      if (!interval) interval = setInterval(playInterval, 80);
    }
  });
});
