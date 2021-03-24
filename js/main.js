//Game Board
const cells = document.querySelectorAll(".board-cell");

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        e.target.textContent = "hello";
    });
});


// Factories/Modules

const newGame = (playerOne, playerTwo) => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;
    const getCell = (i) => gameBoard[i];
    const updateCell = (i, item) => gameBoard[i] = item;
    const getBoard = () => gameBoard

    return {getPlayerOne, getPlayerTwo, getCell, updateCell, getBoard}
};

const Player = (name, number) => {
    const getPlayer = () => name;
    const getNumber = () => number;
    const getPlayerMark = () => {
        if(number == "1"){
            return "X"
        } else{
            return "O"
        }
    }
    return {getPlayer, getNumber, getPlayerMark}
};

const checkWinner = (() => {
    const checkVertical = (array) => {

    };
    const checkHorizontal = (array) => {

    };
    const checkDiagonal = (array) => {

    }
})();


// Facotries/Moduels End

// check winner





function openGameMode(){
    modalContainer.style.display = "block";
    gameMode.style.display = "flex";
}

function chooseOnePlayer(){
    gameMode.style.display = "none";
    modeOnePlayer.style.display = "flex";
} 

function chooseTwoPlayer(){
    gameMode.style.display = "none";
    modeTwoPlayer.style.display = "flex";
}

function startOnePlayer(){
    modalContainer.style.display = "none";
    modeOnePlayer.style.display = "none";
}

function startTwoPlayer(){
    modalContainer.style.display = "none";
    modeTwoPlayer.style.display = "none";
}


// Modal

const modalContainer = document.getElementById("main-modal-container");
const gameMode = document.getElementById("game-mode");
const modeOnePlayer = document.getElementById("g1-name");
const modeTwoPlayer = document.getElementById("g2-names");


// Modal EventListeners

const onePlayer = document.getElementById("one-player");
const twoPlayer = document.getElementById("two-player");

onePlayer.addEventListener("click", () => {
    chooseOnePlayer();
});

twoPlayer.addEventListener("click", () => {
    chooseTwoPlayer();
});

const onePlayerForm = document.getElementById("g1-form");
const onePlayerName = document.getElementById("name1");
const onePlayerSubmit = document.getElementById("start-1p-game");

onePlayerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
    startOnePlayer();
});

const twoPlayerForm = document.getElementById("g2-form");
const twoPlayerNameOne = document.getElementById("name2");
const twoPlayerNameTwo = document.getElementById("name3");
const twoPlayerSubmit = document.getElementById("start-2p-game");

twoPlayerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.target.reset();
    startTwoPlayer();
});


const changeMode = document.getElementById("change-mode");

changeMode.addEventListener("click", () => {
    openGameMode();
});