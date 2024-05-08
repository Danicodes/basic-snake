import { createGameBoardBackground } from './gameBg'

let gameBoard = createGameBoardBackground();
let initialSnake = document.createElement('p');
initialSnake.innerHTML = '----<';
gameBoard.appendChild(initialSnake);
