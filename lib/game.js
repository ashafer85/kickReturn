import KRGame from './kr_game.js';

document.addEventListener('DOMContentLoaded', () => {

  var krCanvas = document.getElementById('kr-canvas');
  var ctx = krCanvas.getContext('2d');

  var game = new KRGame(krCanvas, ctx);
  game.play();
});
