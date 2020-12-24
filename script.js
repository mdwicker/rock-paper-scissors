// global variables to track the score, etc
let computerScore = 0;
let playerScore = 0;
let gameCount = 0;

// global variable to check if the game is paused
let gamePaused = false;

// div elements to toggle game vs endgame page
const divScore = document.getElementById('overall-score');
const endGame = document.getElementById('endgame');


// whenever a button is clicked, play a round
const buttons = document.querySelectorAll('button.selection');

buttons.forEach(button => {
    button.addEventListener('click', playRound)
});

// when New Game is clicked, reset the game
const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', newGame);

// when "You" is clicked, toggle lizard-Spock mode
let lizardSpock = false;
const lizardSpockMode = document.getElementById('lizard-spock');
const lizardSpockItems = document.querySelectorAll('.lizard-spock');
lizardSpockMode.addEventListener('click', toggleLizardSpockMode);

// play one round of Rock, Paper, Scissors
function playRound(e) {
    if (gamePaused) {
        return;
    }

    let computerSelection = computerPlay();
    let playerSelection = this.id;

    document.getElementById('round-choices').textContent = `You chose ${playerSelection}, the computer chose ${computerSelection}.`;

    winner = checkRoundWinner(computerSelection, playerSelection);
    fightReport = getFightReport(computerSelection, playerSelection);

    // announce round winner
    if (winner === 'tie') {
        document.getElementById('round-results').textContent = 'Nothing happens.';
    }
    else if (winner === 'computer') {
        document.getElementById('round-results').textContent = `${fightReport} Sorry, you lose this round.`;
        computerScore++;
    }
    else if (winner === 'player') {
        document.getElementById('round-results').textContent = `${fightReport} You win this round!`;
        playerScore++;
    }
    else {
        document.getElementById('round-results').textContent = 'Glitch in the Matrix. Hmm....';
    }

    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;

    // check for the end of the game
    if (playerScore >= 3) {
        gameOver('player');
    }
    else if (computerScore >= 3) {
        gameOver('computer');
    }
}

// return the computer's selection
function computerPlay() {
    // get a random number from 0 to 2, unless it's lizard Spock mode
    let randomNum;
    if (!lizardSpock) {
        randomNum = Math.floor(Math.random() * 3);
    }
    else {
        randomNum = Math.floor(Math.random() * 5);
    }

    // return either 'rock', 'paper', or 'scissors' (or lizard or Spock), depending on the number
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
            return 'Spock';
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

        // if the computer chose paper, they beat rock and Spock
        case 'paper':
            if ( (playerSelection === 'rock') || (playerSelection === 'Spock') ) {
                return 'computer';
            }
            return 'player';
        
        // if the computer chose scissors, they beat paper and lizard
        case 'scissors':
            if ( (playerSelection === 'paper') || (playerSelection === 'lizard') ) {
                return 'computer';
            }
            return 'player';
        
        // if the computer chose lizard, they beat Spock and paper
        case 'lizard':
            if ( (playerSelection === 'Spock') || (playerSelection === 'paper') ) {
                return 'computer';
            }
            return 'player';
        
        // if the computer chose Spock, they beat rock and scissors
        case 'Spock':
            if ( (playerSelection === 'rock') || (playerSelection === 'scissors') ) {
                return 'computer';
            }
            return 'player';
    }
}

function getFightReport(firstSelection, secondSelection) {
    let rock = (firstSelection === 'rock' || secondSelection === 'rock');
    let paper = (firstSelection === 'paper' || secondSelection === 'paper');
    let scissors = (firstSelection === 'scissors' || secondSelection === 'scissors');
    let lizard = (firstSelection === 'lizard' || secondSelection === 'lizard');
    let Spock = (firstSelection === 'Spock' || secondSelection === 'Spock');

    switch (true) {
        case (scissors && lizard): return 'Scissors decapitates lizard.';
        case (scissors && paper): return 'Scissors cuts paper.';
        case (paper && rock): return 'Paper covers rock.';
        case (rock && lizard): return 'Rock crushes lizard.';
        case (lizard && Spock): return 'Lizard poisons Spock.';
        case (Spock && scissors): return 'Spock smashes scissors.';
        case (scissors && lizard): return 'Scissors decapitates lizard.';
        case (lizard && paper): return 'Lizard eats paper.';
        case (paper && Spock): return 'Paper disproves Spock.';
        case (Spock && rock): return 'Spock vaporizes rock.';
        case (rock && scissors): return 'Rock crushes scissors.';
    }
}

function gameOver(winner) {
    gamePaused = true;
    gameCount++;
    endGame.style.fontSize = '50px';

    if (winner === 'player') {
        endGame.textContent = `Game over.\r\n You beat the computer ${playerScore} to ${computerScore}!`;
    }
    else if (winner === 'computer') {
        endGame.textContent = `Game over.\r\nYou lost ${playerScore} to ${computerScore}.`;
    }

    if (gameCount === 10) {
        endGame.textContent += "\r\n \r\n You've been playing for a while now. \r\n\r\n If you want a bit of a change,\r\n next time check out the score tally labels."
        endGame.style.fontSize = '30px';
    }
    
    divScore.classList.toggle('invisible');
    endGame.classList.toggle('invisible');
}

function newGame() {
    computerScore = 0;
    playerScore = 0;
    document.getElementById('round-choices').textContent = 'Make your choice to start playing.';
    document.getElementById('round-results').textContent = 'First to 3 wins.';
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
    divScore.classList.remove('invisible');
    endGame.classList.add('invisible');
    gamePaused = false;
}

function toggleLizardSpockMode() {
    lizardSpockItems.forEach (lizardSpockItem => {
        lizardSpockItem.classList.toggle('invisible');}
        );
    lizardSpock = !lizardSpock;
}