// global variables to track the score
let computerScore = 0;
let playerScore = 0;


// whenever a button is clicked, play a round
const buttons = document.querySelectorAll('button.selection');

buttons.forEach(button => {
    button.addEventListener('click', playRound)
});

const newGame = document.getElementById('new-game');
newGame.addEventListener('click', resetGame);


// play one round of Rock, Paper, Scissors
function playRound(e) {
    let computerSelection = computerPlay();
    let playerSelection = this.id;

    document.getElementById('round-choices').textContent = `You chose ${playerSelection}, the computer chose ${computerSelection}.`;

    // if computerSelection and playerSelection are the same, declare a tie
    if (computerSelection === playerSelection) {
        document.getElementById('round-results').textContent = 'You tie.';
    }

    // if computer has rock and player has scissors, or computer has paper and player has rock, or computer has scissors and player has rock, computer wins.
    else if ( (computerSelection === 'rock' && playerSelection === 'scissors') || (computerSelection === 'paper' && playerSelection === 'rock') || (computerSelection === 'scissors' && playerSelection === 'paper') ) {
        document.getElementById('round-results').textContent = 'Sorry, you lose this round.';
        computerScore++;
    }
    
    // otherwise, the player wins the round
    else {
        document.getElementById('round-results').textContent = 'Way to go, you win this round!';
        playerScore++;
    }

    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;

}

// return either Rock, Paper, or Scissors as the computer's selection
function computerPlay() {
    // get a random number from 0 to 2
    let randomNum = Math.floor(Math.random() * 3);

    // return either 'rock', 'paper', or 'scissors', depending on the number
    switch (randomNum) {
        case 0:
            return 'rock';
        
        case 1:
            return 'paper';
        
        case 2:
            return 'scissors';
    }
}

function resetGame() {
    computerScore = 0;
    playerScore = 0;
    document.getElementById('round-choices').textContent = 'Make your choice to start playing.';
    document.getElementById('round-results').textContent = 'First to 3 wins.';
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
}