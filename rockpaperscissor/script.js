// Game state variables
let humanScore = 0;      // Tracks human player's score
let computerScore = 0;   // Tracks computer player's score
const winningScore = 2;  // First player to reach this score wins

// DOM element references
const buttons = document.querySelectorAll('#buttons button');         // All game choice buttons
const humanScoreEl = document.getElementById('humanScore');         // Human score display element
const computerScoreEl = document.getElementById('computerScore');    // Computer score display element
const resultEl = document.getElementById('result');                  // Result text display element
const resetBtn = document.getElementById('reset');                  // Reset button element

// Array of available game choices
const choices = ['rock', 'paper', 'scissors'];

/**
 * Generates a random choice for the computer player
 * @returns {string} - Randomly selected choice (rock, paper, or scissors)
 */
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Determines the winner of a round by comparing choices
 * @param {string} humanChoice - The human player's choice
 * @param {string} computerChoice - The computer player's choice
 * @returns {string} - 'human', 'computer', or 'tie'
 */
function determineWinner(humanChoice, computerChoice) {
    // Check for tie - both chose the same option
    if (humanChoice === computerChoice) {
        return 'tie';
    }
    
    // Check if human wins
    if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'human';
    }
    
    // Otherwise computer wins
    return 'computer';
}

/**
 * Updates the score display in the HTML
 */
function updateScore() {
    humanScoreEl.textContent = humanScore;
    computerScoreEl.textContent = computerScore;
}

/**
 * Checks if either player has reached the winning score
 * Disables buttons if game is over
 * @returns {boolean} - True if game is over, false otherwise
 */
function checkGameOver() {
    if (humanScore >= winningScore) {
        resultEl.textContent = '🎉 You win the game!';
        disableButtons();
        return true;
    }
    if (computerScore >= winningScore) {
        resultEl.textContent = '💻 Computer wins the game!';
        disableButtons();
        return true;
    }
    return false;
}

/**
 * Disables all game choice buttons (used when game is over)
 */
function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

/**
 * Enables all game choice buttons (used when game is reset)
 */
function enableButtons() {
    buttons.forEach(button => {
        button.disabled = false;
    });
}

/**
 * Plays a single round of the game
 * @param {string} humanChoice - The human player's choice
 */
function playRound(humanChoice) {
    const computerChoice = getComputerChoice();  // Get computer's choice
    const winner = determineWinner(humanChoice, computerChoice);  // Determine winner
    
    // Update score and result based on who won
    if (winner === 'human') {
        humanScore++;
        resultEl.textContent = `You chose ${humanChoice}, Computer chose ${computerChoice}. You win this round!`;
    } else if (winner === 'computer') {
        computerScore++;
        resultEl.textContent = `You chose ${humanChoice}, Computer chose ${computerChoice}. Computer wins this round!`;
    } else {
        resultEl.textContent = `You chose ${humanChoice}, Computer chose ${computerChoice}. It's a tie!`;
    }
    
    updateScore();      // Update the displayed score
    checkGameOver();    // Check if game is over
}

/**
 * Resets the game to initial state
 * Resets scores to 0 and re-enables buttons
 */
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    updateScore();
    resultEl.textContent = 'First to 2 wins.';
    enableButtons();
}

// Event Listeners

// Add click event listeners to all game choice buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const choice = button.getAttribute('data-choice');  // Get choice from data attribute
        playRound(choice);  // Play a round with this choice
    });
});

// Add click event listener to reset button
resetBtn.addEventListener('click', resetGame);
