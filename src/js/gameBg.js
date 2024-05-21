import { coordsToIndex, randomUnoccupiedIndex, resetDirection } from "./utils";
import { getDirection } from "./utils";
import { addPointToScore, resetScore } from "./score";
import { getBgItemByCoords } from "./controls";
import { indexToCoords } from "./utils";

let SNAKEBODYLEN = 3; //
let SNAKESTARTCOL = 3;
let SNAKESTARTROW = 4;
let SNAKEARRAY = [];
let cherryCoords = [];

const numberOfColsRows = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--number-of-cols-rows'));

export function getSnakeBodyLen(){ return SNAKEBODYLEN }
export function getNumberOfColsRows(){ return numberOfColsRows }

export function createGameBoardBackground() {
    //  
    let gameContainer = document.getElementById('game-grid');
   
    for (let i = 0; i < numberOfColsRows**2; i++) { //square grid
        let gridNode = document.createElement('div');
        gridNode.classList.add('bg-item');
        gridNode.setAttribute('x', i % numberOfColsRows);
        gridNode.setAttribute('y', Math.floor(i / 10))

        gameContainer.appendChild(gridNode);
    }
    return gameContainer;
}

export function resetSnake() {
    let snakeItems = document.getElementsByClassName('snake-body');
    let i = 0;
    for (let snakeItem of snakeItems) {
        console.log(snakeItem)
        let parent = snakeItem.parentElement;
        parent.removeChild(snakeItem); 
        i++;
        console.log(`${i} nodes removed`)
    }
    
    let snakeHead = document.getElementsByClassName('snake-head');
    let parent = snakeHead[0].parentElement;
    parent.removeChild(snakeHead[0]);

    let cherries = document.getElementsByClassName('cherry');
    parent = cherries[0].parentElement;
    parent.removeChild(cherries[0]);

    SNAKEARRAY = []
    resetDirection();
    createSnake();
}

export function createSnake() {
    // 
    let snakeBody = '-';
    let snakeHead = '<';
    let snakeRow = SNAKESTARTROW;

    let snakeDiv = document.createElement('div');
    snakeDiv.setAttribute('class', 'snake-body');
    
    let snakeItem;
    
    let bgItems = document.getElementsByClassName('bg-item');
    let currentBgDiv;

    for (let i = SNAKESTARTCOL; i < SNAKESTARTCOL + SNAKEBODYLEN; i++) {
        currentBgDiv = bgItems[snakeRow*10 + i];
        
        snakeItem = document.createElement('p');
        snakeItem.setAttribute('class', 'snake-body');
        snakeItem.innerHTML = snakeBody;
        currentBgDiv.appendChild(snakeItem);
        snakeItem.style.setProperty('grid-column-start', `${i}`);

        SNAKEARRAY.push([i, SNAKESTARTROW]);
    }

    currentBgDiv = bgItems[snakeRow*10 + (SNAKEBODYLEN + SNAKESTARTCOL)];

    snakeItem = document.createElement('p');
    snakeItem.setAttribute('class', 'snake-body');
    snakeItem.setAttribute('class', 'snake-head');
    snakeItem.innerHTML = snakeHead;
    currentBgDiv.appendChild(snakeItem);
    snakeItem.style.setProperty('grid-column-start', SNAKEBODYLEN + SNAKESTARTCOL);
    SNAKEARRAY.push([ SNAKEBODYLEN + SNAKESTARTCOL, SNAKESTARTROW]);

    return snakeDiv;
}

export function extendSnake(newTail) {
    SNAKEARRAY.unshift(newTail); 
}


export function spawnCherry(){
    let bgItems = document.getElementsByClassName('bg-item');
    let curIndex = randomUnoccupiedIndex();

    let cherry = document.createElement('p');
    cherry.setAttribute('class', 'cherry');
    cherry.innerHTML = '*';

    bgItems[curIndex].appendChild(cherry);

    cherryCoords = indexToCoords(curIndex);
}

// snake utils
export function getSnakeCoords() {
   let head = document.getElementsByClassName('snake-head')[0];
   let headX = head.parentElement.getAttribute('x');
   let headY = head.parentElement.getAttribute('y');

   let tailX, tailY;
   // TODO: check direction until a turn event ???
   let lastDir = getDirection() ? getDirection() : "right"; 
   if (lastDir == "right") {
     tailX = headX - SNAKEBODYLEN % 10;
     if (tailX < 0) {
        tailX = numberOfColsRows + tailX;
     }
     tailY = headY; // won't always be true 
   } else {
    console.log("NOT YET HANDLED")
   }

   return [[parseInt(headX), parseInt(headY)], [parseInt(tailX), parseInt(tailY)]]
}

export function getSnakeArray() {
    return SNAKEARRAY ? SNAKEARRAY : [];
}

export function getCherryCoords() {
    return cherryCoords;
}

export function pointDetection(head) {
    if (head[0] == cherryCoords[0] && head[1] == cherryCoords[1]) {
        let oldCherryCoords = cherryCoords;
        addPointToScore();
        spawnCherry();
        return oldCherryCoords
    }
    return
}

export function collisionDetection(head) {
    for (let coord of SNAKEARRAY) {
        if (head[0] === coord[0] && head[1] === coord[1]){
            console.log("GAME OVER");
            resetScore();
            return true;
    }}
    return false;
}