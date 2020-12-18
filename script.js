const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', playRound)
});

        



// play a game of Rock, Paper, Scissors
function game() {
    // variables to keep track of score
    let winner;
    let computerScore = 0;
    let playerScore = 0;    

    // play 5 rounds
    
    winner = playRound();

    if (winner === 'computer') {
        computerScore++;
    } else if (winner === 'player') {
        playerScore++;
    }

    console.log('Computer: ' + computerScore + ' Player: ' + playerScore + '.');

    // report the winner
    reportWinner(computerScore, playerScore);
}

// play one round of Rock, Paper, Scissors, returning the winner
function playRound(e) {
    let computerSelection = computerPlay();
    playerSelection = this.id;
    console.log(`You chose ${playerSelection}, the computer chose ${computerSelection}`);

    // if computerSelection and playerSelection are the same, declare a tie

    if (computerSelection === playerSelection) {
        console.log('You tie.');
        return 'tie';
    }

    // if computer has rock and player has scissors, or computer has paper and player has rock, or computer has scissors and player has rock, computer wins.
    else if ( (computerSelection === 'rock' && playerSelection === 'scissors') || (computerSelection === 'paper' && playerSelection === 'rock') || (computerSelection === 'scissors' && playerSelection === 'paper') ) {
        console.log('Sorry, you lose this round.');
        return 'computer';
    }
    
    // otherwise, the player wins the round
    else {
        console.log('Way to go, you win this round!');
        return 'player';
    }
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


// report the overall winner/loser of the game
function reportWinner(computerScore, playerScore) {
    // check for a tie
    if (computerScore === playerScore) {
        console.log('You tied with the computer ' + computerScore + ' to ' + playerScore + '!');
    }
    
    // check for computer win
    else if (computerScore > playerScore) {
        console.log('Better luck next time! The computer beat you ' + computerScore + ' to ' + playerScore + '.');
    }

    // otherwise, the player wins!
    else {
        console.log('Way to go! You beat the computer ' + playerScore + ' to ' + computerScore + '.');
    }
}