
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}
