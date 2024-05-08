export function createGameBoardBackground() {
    //  
    const numberOfColsRows = getComputedStyle(document.documentElement)
    .getPropertyValue('--number-of-cols-rows');

    let gameContainer = document.getElementById('game-grid');
   
    for (let i = 0; i < numberOfColsRows**2; i++) { //square grid
        let gridNode = document.createElement('div');
        gridNode.classList.add('bg-item');

        gameContainer.appendChild(gridNode);
    }
    return gameContainer;
}

export function createSnake() {
    // 
}