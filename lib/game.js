import KRGame from './kr_game.js';

document.addEventListener('DOMContentLoaded', () => {

  var krCanvas = document.getElementById('kr-canvas');
  var ctx = krCanvas.getContext('2d');

  var game = new KRGame(krCanvas, ctx);
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
      game = new KRGame(krCanvas, ctx);
      game.play();
      if (!interval) interval = setInterval(playInterval, 80);
    }
  });
});
