import { createGameBoardBackground, createSnake, spawnCherry } from './gameBg'
import { resetScore } from './score';
import { startAnimation } from './controls';
import { recordDirection } from './utils';

resetScore();
let gameBoard = createGameBoardBackground();
let initialSnake = createSnake();
gameBoard.appendChild(initialSnake);
spawnCherry();


// Start game
// Define and register collision, inputs, sideeffects
recordDirection();
startAnimation();