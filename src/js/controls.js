import { getSnakeCoords, getSnakeBodyLen, getNumberOfColsRows } from "./gameBg";
import { getDirection } from "./utils";

export function turnRight(snake) {
    // when right key or 'D' pressed
    snake
    document.addEventListener("keyup", control);
}

export function changeDir(direction) {// direction = (<-right, >-left, v - up, ^ down)


}

function animateSnake() {
    let coords = getSnakeCoords()
    let headCoords = coords[0];
    let boundary = getNumberOfColsRows();

    let snakeLen = getSnakeBodyLen();
    let direction = getDirection();
    console.log(direction);

    switch (direction) {
        default:
            // right
            for (let i = 0; i <= snakeLen; i++) {
                let headNode = getBgItemByCoords(headCoords[0], headCoords[1]);
                let nextNode = getBgItemByCoords((headCoords[0] + 1) % boundary, headCoords[1])
                nextNode.innerHTML = headNode.innerHTML;
                headNode.innerHTML = '';
                
                // Move coordinates back for next iteration
                headCoords[0] -= 1;
                if (headCoords[0] < 0) {
                    headCoords[0] = boundary + headCoords[0]
                }
            }
            break;
        case "up":
             for (let i = 0; i <= snakeLen; i++) {
                let headNode = getBgItemByCoords(headCoords[0], headCoords[1]);
                let nextNode = getBgItemByCoords(headCoords[0], (headCoords[1] - 1) + boundary)
                nextNode.innerHTML = headNode.innerHTML;
                headNode.innerHTML = '';
                
                headCoords[1] += 1;
                if (headCoords[1] < 0) {
                    headCoords[1] = headCoords[1] - boundary
                }
            }
            break;     
        case "left":
            for (let i = 0; i <= snakeLen; i++) {
                let headNode = getBgItemByCoords(headCoords[0], headCoords[1]);
                let nextNode = getBgItemByCoords((headCoords[0] - 1) + boundary, headCoords[1])
                nextNode.innerHTML = headNode.innerHTML;
                headNode.innerHTML = '';
                
                headCoords[1] += 1;
                if (headCoords[1] < 0) {
                    headCoords[1] = headCoords[1] - boundary
                }
            }
            break;     

        case "down":
          for (let i = 0; i <= snakeLen; i++) {
                let headNode = getBgItemByCoords(headCoords[0], headCoords[1]);
                let nextNode = getBgItemByCoords(headCoords[0], (headCoords[1] + 1) % boundary)
                nextNode.innerHTML = headNode.innerHTML;
                headNode.innerHTML = '';
                
                headCoords[1] -= 1;
                if (headCoords[1] < 0) {
                    headCoords[1] = boundary + headCoords[1]
                }
            }
            break;     

    }
    // SHIFT WHOLE SNAKE BY ONE CELL
}

export function startAnimation() {
    console.log("Starting animation")
    setInterval(animateSnake, 1000);
}

export function getBgItemByCoords(x, y) {
    let bgItemsX = document.querySelectorAll(`[x=\'${x}\']`);
    for (let node of bgItemsX) {
        if (node.getAttribute('y') == y) {
            return node;
        }   
    }
}