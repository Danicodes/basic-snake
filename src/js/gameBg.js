export function createGameBoardBackground() {
    //  
    const numberOfColsRows = getComputedStyle(document.documentElement)
    .getPropertyValue('--number-of-cols-rows');

    console.log("Number of columns " + numberOfColsRows );
    
    let gameContainer = document.getElementById('game-grid');
   
    for (let i = 0; i < numberOfColsRows**2; i++) {
        let gridNode = document.createElement('div');
        gridNode.classList.add('bg-item');

        gameContainer.appendChild(gridNode);

    }
}