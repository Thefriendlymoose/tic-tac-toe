let currentGame;

//Game Board
const cells = document.querySelectorAll(".board-cell");




// Factories/Modules

const NewGame = (One, Two, gameMode) => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let playerTurn = true;
    let playerOne = One;
    let playerTwo = Two;
    let mode = gameMode;
    const getGameMode = () => mode;
    const updateGameMode = (gmode) => mode = gmode; 
    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;
    const updatePlayerOne = (player) => playerOne = player;
    const updatePlayerTwo = (player) => playerTwo = player;
    const getCell = (i) => gameBoard[i];
    const updateCell = (i, item) => gameBoard[i] = item;
    const getBoard = () => gameBoard;
    const getEmptyCells = () => {
        let empties = [];
        gameBoard.forEach((item, index) => {
            if(item === ""){
                empties.push(index);
            }
            
        });
        return empties
    };
    const getPlayerTurn = () => playerTurn;
    const updatePlayerTurn = () => {
        if(playerTurn){
            playerTurn = false;
        } else{
            playerTurn = true;
        }
    };
    const resetGame = () => {
        // gameBoard = ["", "", "", "", "", "", "", "", ""];
        for(i=0; i<9; i++){
            gameBoard[i] = "";
        }
        playerTurn = true;
        cells.forEach((cell) => {
            cell.textContent = "";
        });
    }

    return {getPlayerOne, getPlayerTwo, getCell, updateCell, getBoard, getPlayerTurn, updatePlayerTurn, getGameMode, resetGame, updatePlayerOne, updatePlayerTwo, getEmptyCells, updateGameMode}
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

const Ai = () => {
    const getPlayer = () => "Computer";
    const getNumber = () => 2;
    const getPlayerMark = () => "O";
    const getMove = (game) => {
        return game.getEmptyCells()[Math.floor(Math.random() * (game.getEmptyCells().length))];
    }

    return {getPlayer, getNumber, getPlayerMark, getMove}
}

const checkWinner = (() => {
    const checkHorizontal = (game) => {
        for(i=0; i<9; i = i + 3){
            if(game.getCell(i) === game.getCell(i+1) && game.getCell(i) === game.getCell(i+2) && game.getCell(i) !== ""){
                if(game.getCell(i) === game.getPlayerOne().getPlayerMark()){
                    announce(`${game.getPlayerOne().getPlayer()} wins`);
                } else{
                    announce(`${game.getPlayerTwo().getPlayer()} wins`);
                }
            }
        }
    };
    const checkVertical = (game) => {
        for(i=0; i<3; i++){
            if(game.getCell(i) === game.getCell(i+3) && game.getCell(i) === game.getCell(i+6) && game.getCell(i) !== ""){
                if(game.getCell(i) === game.getPlayerOne().getPlayerMark()){
                    announce(`${game.getPlayerOne().getPlayer()} wins`);
                } else{
                    announce(`${game.getPlayerTwo().getPlayer()} wins`);
                }
            }
        }
    };
    const checkDiagonal = (game) => {
        if(game.getCell(0) === game.getCell(4) && game.getCell(0) === game.getCell(8) && game.getCell(0) !== ""){
            if(game.getCell(0) === game.getPlayerOne().getPlayerMark()){
                announce(`${game.getPlayerOne().getPlayer()} wins`);
            } else{
                announce(`${game.getPlayerTwo().getPlayer()} wins`);
            }
        } else if(game.getCell(2) === game.getCell(4) && game.getCell(2) === game.getCell(6) && game.getCell(2) !== ""){
            if(game.getCell(2) === game.getPlayerOne().getPlayerMark()){
                announce(`${game.getPlayerOne().getPlayer()} wins`);
            } else{
                announce(`${game.getPlayerTwo().getPlayer()} wins`);
            }
        }
        
    }

    const checkDraw = (game) => {
        const draw = game.getBoard().includes("");
        if(!draw){
            announce(`DRAW`);
        }
    }

    return {checkVertical, checkHorizontal, checkDiagonal, checkDraw}
})();


// Facotries/Moduels End


function playGame(game){
        cells.forEach(cell => {
            cell.addEventListener("click", (e) => {
                if(e.target.textContent === ""){
                    if(game.getGameMode() == "1"){
                        game.updateCell(e.target.dataset.pos - 1, game.getPlayerOne().getPlayerMark());
                        game.updateCell(game.getPlayerTwo().getMove(game), game.getPlayerTwo().getPlayerMark());
    

                    } else{
                        if(game.getPlayerTurn()){
                            game.updateCell(e.target.dataset.pos - 1, game.getPlayerOne().getPlayerMark());
                            game.updatePlayerTurn();
                        } else{
                            game.updateCell(e.target.dataset.pos - 1, game.getPlayerTwo().getPlayerMark());
                            game.updatePlayerTurn();
                        }
                    }
                
                    cells.forEach((cell, index) => {
                        cell.textContent = game.getCell(index);
                    });

                    checkWinner.checkHorizontal(game);
                    checkWinner.checkVertical(game);
                    checkWinner.checkDiagonal(game);
                    checkWinner.checkDraw(game);
                }
                
            });
        });
}


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
    const playerOne = Player(onePlayerName.value, onePlayerName.dataset.player);
    const playerTwo = Ai();

    if(currentGame === undefined){
        currentGame = NewGame(playerOne, playerTwo, 1);
    } else{
        currentGame.updatePlayerOne(playerOne);
        currentGame.updatePlayerTwo(playerTwo);
        currentGame.updateGameMode(1);
    }
    playGame(currentGame);

}

function startTwoPlayer(){
    modalContainer.style.display = "none";
    modeTwoPlayer.style.display = "none";
    const playerOne = Player(twoPlayerNameOne.value, twoPlayerNameOne.dataset.player);
    const playerTwo = Player(twoPlayerNameTwo.value, twoPlayerNameTwo.dataset.player);
    if(currentGame === undefined){
        currentGame = NewGame(playerOne, playerTwo, 2);
    } else{
        currentGame.updatePlayerOne(playerOne);
        currentGame.updatePlayerTwo(playerTwo);
        currentGame.updateGameMode(2);
    }
    playGame(currentGame);
    
}

function announce(string){
    modalContainer.style.display = "block";
    announcement.style.display = "flex";
    banner.textContent = string;
    
    announcement.dataset.mode = currentGame.getGameMode();
}


// Modal

const modalContainer = document.getElementById("main-modal-container");
const gameMode = document.getElementById("game-mode");
const modeOnePlayer = document.getElementById("g1-name");
const modeTwoPlayer = document.getElementById("g2-names");
const announcement = document.getElementById("annoucement");
const banner = document.getElementById("banner");


//announcement buttons
const playAgain = document.getElementById("play-again");
const selectMode = document.getElementById("select-mode");

playAgain.addEventListener("click", () => {
    currentGame.resetGame();
    announcement.style.display = "none";
    if(announcement.dataset.mode === "2"){
        startTwoPlayer();
    } else{
        startOnePlayer();
    }
});

selectMode.addEventListener("click", () =>{
    currentGame.resetGame();
    announcement.style.display = "none";
    openGameMode();
});


//nav buttons
const reset = document.getElementById("reset");

reset.addEventListener("click", () => {
    currentGame.resetGame();
    if(announcement.dataset.mode === "2"){
        startTwoPlayer();
    } else{
        startOnePlayer();
    }
});

const changeMode = document.getElementById("change-mode");

changeMode.addEventListener("click", () => {
    currentGame.resetGame();
    openGameMode();
});

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
    startOnePlayer(); 
    event.preventDefault();
});

const twoPlayerForm = document.getElementById("g2-form");
const twoPlayerNameOne = document.getElementById("name2");
const twoPlayerNameTwo = document.getElementById("name3");
const twoPlayerSubmit = document.getElementById("start-2p-game");

twoPlayerForm.addEventListener("submit", (event) => {
    startTwoPlayer();
    event.preventDefault();
});


