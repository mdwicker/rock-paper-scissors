// global variables to track the score
let computerScore = 0;
let playerScore = 0;

// div elements to toggle game vs endgame page
const divGame = document.getElementById('game');
const endGame = document.getElementById('endgame');


// whenever a button is clicked, play a round
const buttons = document.querySelectorAll('button.selection');

buttons.forEach(button => {
    button.addEventListener('click', playRound)
});

// when New Game is clicked, reset the game
const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', newGame);

// when "You" is clicked, toggle lizard-spock mode
let lizardSpock = false;
const lizardSpockMode = document.getElementById('lizard-spock');
const lizardSpockItems = document.querySelectorAll('.lizard-spock');
lizardSpockMode.addEventListener('click', toggleLizardSpockMode);

// play one round of Rock, Paper, Scissors
function playRound(e) {
    let computerSelection = computerPlay();
    let playerSelection = this.id;

    document.getElementById('round-choices').textContent = `You chose ${playerSelection}, the computer chose ${computerSelection}.`;

    winner = checkRoundWinner(computerSelection, playerSelection);

    // announce round winner
    if (winner === 'tie') {
        document.getElementById('round-results').textContent = 'Nothing happens.';
    }
    else if (winner === 'computer') {
        document.getElementById('round-results').textContent = 'Sorry, you lose this round.';
        computerScore++;
    }
    else if (winner === 'player') {
        document.getElementById('round-results').textContent = 'Way to go, you win this round!';
        playerScore++;
    }
    else {
        document.getElementById('round-results').textContent = 'Glitch in the Matrix. Hmm....';
    }

    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;

    // check for the end of the game
    if (playerScore === 3) {
        gameOver('player');
    }
    else if (computerScore === 3) {
        gameOver('computer');
    }
}

// return the computer's selection
function computerPlay() {
    // get a random number from 0 to 2, unless it's lizard spock mode
    let randomNum;
    if (!lizardSpock) {
        randomNum = Math.floor(Math.random() * 3);
    }
    else {
        randomNum = Math.floor(Math.random() * 5);
    }

    // return either 'rock', 'paper', or 'scissors' (or lizard or spock), depending on the number
    switch (randomNum) {
        case 0:
            return 'rock';
        
        case 1:
            return 'paper';
        
        case 2:
            return 'scissors';
        
        case 3: 
            return 'lizard';
        
        case 4:
            return 'spock';
    }
}

function checkRoundWinner(computerSelection, playerSelection) {
    // if they are the same, it's a tie
    if (computerSelection === playerSelection) {
        return 'tie';
    }

    // otherwise, check who wins for each possible computer choice
    switch (computerSelection) {
        // if the computer chose rock, then they will beat lizard or scissors
        case 'rock':
            if ( (playerSelection === 'lizard') || (playerSelection === 'scissors') ) {
                return 'computer';
            }
            return 'player';

        // if the computer chose paper, they beat rock and spock
        case 'paper':
            if ( (playerSelection === 'rock') || (playerSelection === 'spock') ) {
                return 'computer';
            }
            return 'player';
        
        // if the computer chose scissors, they beat paper and lizard
        case 'scissors':
            if ( (playerSelection === 'paper') || (playerSelection === 'lizard') ) {
                return 'computer';
            }
            return 'player';
        
        // if the computer chose lizard, they beat spock and paper
        case 'lizard':
            if ( (playerSelection === 'spock') || (playerSelection === 'paper') ) {
                return 'computer';
            }
            return 'player';
        
        // if the computer chose spock, they beat rock and scissors
        case 'spock':
            if ( (playerSelection === 'rock') || (playerSelection === 'scissors') ) {
                return 'computer';
            }
            return 'player';
    }
}

function gameOver(winner) {
    if (winner === 'player') {
        endGame.textContent = `You beat the computer ${playerScore} to ${computerScore}!`;
    }
    else if (winner === 'computer') {
        endGame.textContent = `Whoops, you lost ${playerScore} to ${computerScore}.`;
    }
    
    divGame.classList.toggle('invisible');
    endGame.classList.toggle('invisible');
}

function newGame() {
    computerScore = 0;
    playerScore = 0;
    document.getElementById('round-choices').textContent = 'Make your choice to start playing.';
    document.getElementById('round-results').textContent = 'First to 3 wins.';
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
    divGame.classList.remove('invisible');
    endGame.classList.add('invisible');
}

function toggleLizardSpockMode() {
    lizardSpockItems.forEach (lizardSpockItem => {
        lizardSpockItem.classList.toggle('invisible');}
        );
    lizardSpock = !lizardSpock;
}