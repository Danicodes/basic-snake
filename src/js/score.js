let SCORE = 0;

function getScoreDiv() {
    let scoreNode = document.getElementById('score-keeper');
    return scoreNode;
}

function getScoreNode() {
    let scoreDiv = getScoreDiv();
    return scoreDiv.children[0];
}

export function addPointToScore() {
    let scoreNode = getScoreNode();
    SCORE += 1;
    scoreNode.innerHTML = SCORE;
}

export function resetScore() {
    let scoreNode = getScoreNode();
    SCORE = 0;
    scoreNode.innerHTML = SCORE;
}