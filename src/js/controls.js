import { getSnakeCoords, getSnakeBodyLen, getSnakeArray, getNumberOfColsRows, collisionDetection, extendSnake, spawnCherry, resetSnake } from "./gameBg";
import { pointDetection , collisionDetection } from "./gameBg";
import { resetScore } from "./score";
import { getDirection } from "./utils";

let COLLISION = false;
function animateSnake() {
    if (COLLISION) {
        resetScore()
        resetSnake()
        spawnCherry();
        COLLISION = false;
        return;
    }
    let boundary = getNumberOfColsRows();

    let snakeLen = getSnakeBodyLen();
    let direction = getDirection();

    let SNAKEARRAY = getSnakeArray();
    let head = SNAKEARRAY[SNAKEARRAY.length - 1]
    let headNode = getBgItemByCoords(head[0], head[1]);
    let headHTML = headNode.firstChild;

    for (let i = 0; i <= SNAKEARRAY.length - 2; i++) {
        let node = getBgItemByCoords(SNAKEARRAY[i][0], SNAKEARRAY[i][1]);
        let nextNode = getBgItemByCoords(SNAKEARRAY[i+1][0], SNAKEARRAY[i+1][1]);

        SNAKEARRAY[i] = SNAKEARRAY[i+1];

        let nodeChild;
        if (node.firstChild != null) {
            nodeChild = node.firstChild;
        } else {
            let cherryElement = document.createElement('p');
            cherryElement.innerHTML = '-'
            cherryElement.setAttribute('class', 'snake-body');
            nodeChild = cherryElement;
        }

        nextNode.appendChild(nodeChild);
    }

    switch (direction) {
        default: {
            // right
            // prevCoords[0] = (prevCoords[0] + 1) % boundary  
            let head = SNAKEARRAY[SNAKEARRAY.length - 1] 
            let newHead = [(head[0] + 1) % boundary, head[1]];
            let nextNode = getBgItemByCoords(newHead[0], newHead[1]);
           
            COLLISION = collisionDetection(newHead)
            SNAKEARRAY[SNAKEARRAY.length - 1] = newHead;
            let cherryCoords = pointDetection(newHead);
            nextNode.innerHTML = '';
            nextNode.appendChild(headHTML);
            nextNode.firstChild.innerHTML = '<';
            // Extend after head has moved
            if (cherryCoords != null) { extendSnake(cherryCoords) }
            break;
        }
        case "up": {
            let head = SNAKEARRAY[SNAKEARRAY.length - 1] 
            let newHead = [head[0], ((head[1] - 1) + boundary) % boundary];
            
            let nextNode = getBgItemByCoords(newHead[0], newHead[1]);
           
            COLLISION = collisionDetection(newHead)
            SNAKEARRAY[SNAKEARRAY.length - 1] = newHead
            let cherryCoords = pointDetection(newHead);
            nextNode.innerHTML = '';
            nextNode.appendChild(headHTML);
            nextNode.firstChild.innerHTML = 'v';

            if (cherryCoords != null) { extendSnake(cherryCoords) }
            break;     
        }
        case "left": {
            let head = SNAKEARRAY[SNAKEARRAY.length - 1] 
            let newHead = [((head[0] - 1) + boundary) % boundary, head[1]];
            let nextNode = getBgItemByCoords(newHead[0], newHead[1]);
           
            COLLISION = collisionDetection(newHead)
            SNAKEARRAY[SNAKEARRAY.length - 1] = newHead;
            let cherryCoords = pointDetection(newHead);

            nextNode.innerHTML = '';
            nextNode.appendChild(headHTML);
            nextNode.firstChild.innerHTML = '>';

            if (cherryCoords != null) { extendSnake(cherryCoords) }
            break;     
        }
        case "down": {
            let head = SNAKEARRAY[SNAKEARRAY.length - 1] 
            let newHead = [head[0], (head[1] + 1) % boundary];
            let nextNode = getBgItemByCoords(newHead[0], newHead[1]);
           
            COLLISION = collisionDetection(newHead)
            SNAKEARRAY[SNAKEARRAY.length - 1] = newHead;
            let cherryCoords = pointDetection(newHead);

            nextNode.innerHTML = '';
            nextNode.appendChild(headHTML);
            nextNode.firstChild.innerHTML = '^';
            if (cherryCoords != null) { extendSnake(cherryCoords) }
            break;

        }
    }
}

export function startAnimation() {
    console.log("Starting animation")
    return setInterval(animateSnake, 1000 * .2);
}

export function getBgItemByCoords(x, y) {
    let bgItemsX = document.querySelectorAll(`[x=\'${x}\']`);
    for (let node of bgItemsX) {
        if (node.getAttribute('y') == y) {
            return node;
        }   
    }
}