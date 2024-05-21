import { getBgItemByCoords } from "./controls";

let DIRECTION = 'right';
let COORDSPRESSED = [];
export function recordDirection() {
    document.addEventListener('keydown', (event) => {
    // !Note: Registers when pressed once and held
        const key = event.key;
        if ((key == "ArrowUp" || key.toLowerCase() == "w") && DIRECTION !== 'down') { 
            DIRECTION = "up"
        } else if ((key == "ArrowDown" || key.toLowerCase() == "s") && DIRECTION !== 'up') { 
            DIRECTION = 'down';
            console.log(DIRECTION);
            let headNode = document.getElementsByClassName('snake-head');
            headNode = headNode[0];
            let x = headNode.getAttribute('x')
            let y = headNode.getAttribute('y')
            COORDSPRESSED.push([x, y]);
        } else if ((key == "ArrowRight" || key.toLowerCase() == "d") && DIRECTION !== 'left') { 
            DIRECTION = "right";
            let headNode = document.getElementsByClassName('snake-head');
            headNode = headNode[0];
            let x = headNode.getAttribute('x')
            let y = headNode.getAttribute('y')
            COORDSPRESSED.push([x, y]);

        } else if ((key == "ArrowLeft" || key.toLowerCase() == "a") && DIRECTION !== 'right') { 
            DIRECTION = "left";
            let headNode = document.getElementsByClassName('snake-head');
            headNode = headNode[0];
            let x = headNode.getAttribute('x')
            let y = headNode.getAttribute('y')
            COORDSPRESSED.push([x, y]);
        }
})
}

export function randomUnoccupiedIndex() {
    let bgItems = document.getElementsByClassName('bg-item');
    let randomIndex = Math.floor(Math.random() * 100);
    while (bgItems[randomIndex].children.length > 1) {
        randomIndex = Math.floor(Math.random * 100);
    }

    return randomIndex;
}

export function coordsToIndex(x, y) {
    // ascend in value to the right and down from top left
    // using value of columns and rows
    // top left is 0,0
    return (y * 10) + x
}

export function indexToCoords(index) {
    return [index % 10, Math.floor(index / 10)]
}

export function getDirection() {
    return DIRECTION; 
}

export function resetDirection() {
    DIRECTION = 'right'
}