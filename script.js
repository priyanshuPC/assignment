
const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            status.textContent = `Player ${gameBoard[a]} wins!`;
            document.querySelectorAll(".cell").forEach(cell => cell.classList.add("taken"));
            return true;
        }
    }
    if (!gameBoard.includes("")) {
        status.textContent = "It's a draw!";
        return true;
    }
    return false;
}

function makeMove(index, cell) {
    if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    board.innerHTML = "";
    createBoard();
}

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => makeMove(index, cell));
        board.appendChild(cell);
    });
}

createBoard();
