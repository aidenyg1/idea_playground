// script.js - Consolidated JavaScript for the FPS Reaction Time Training web app

// Global JavaScript functionalities
document.addEventListener('DOMContentLoaded', () => {
    console.log("Global JavaScript loaded and DOM is ready.");

    // Smooth scroll for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Core logic for the FPS Reaction Time Training game (only on training.html)
    if (document.body.id === 'training-page') { // Add an ID to the body of training.html for conditional loading
        const reactionBox = document.getElementById('reaction-box');
        const startButton = document.getElementById('start-button');
        const lastScoreSpan = document.getElementById('last-score');
        const bestScoreSpan = document.getElementById('best-score');
        const averageScoreSpan = document.getElementById('average-score');
        const resetScoresButton = document.getElementById('reset-scores');

        let startTime;
        let endTime;
        let timeoutId;
        let waitingForClick = false;
        let scores = JSON.parse(localStorage.getItem('reactionScores')) || [];
        let bestScore = localStorage.getItem('bestReactionScore') || 0;

        // --- Helper Functions ---
        function updateScoresDisplay() {
            if (scores.length > 0) {
                const sum = scores.reduce((a, b) => a + b, 0);
                const average = sum / scores.length;
                averageScoreSpan.textContent = average.toFixed(0);
            } else {
                averageScoreSpan.textContent = '0';
            }
            bestScoreSpan.textContent = bestScore;
        }

        function saveScores() {
            localStorage.setItem('reactionScores', JSON.stringify(scores));
            localStorage.setItem('bestReactionScore', bestScore);
        }

        function resetGame() {
            reactionBox.style.display = 'none';
            reactionBox.className = ''; // Clear all classes
            startButton.textContent = 'Start Test';
            startButton.disabled = false;
            clearTimeout(timeoutId);
            waitingForClick = false;
        }

        // --- Game Logic ---
        startButton.addEventListener('click', () => {
            startButton.disabled = true;
            startButton.textContent = 'Get Ready...';
            reactionBox.className = 'ready'; // Set to yellow
            reactionBox.style.display = 'block';

            const randomDelay = Math.floor(Math.random() * 3000) + 1500; // 1.5 to 4.5 seconds

            timeoutId = setTimeout(() => {
                reactionBox.className = 'go'; // Set to green
                startTime = new Date().getTime();
                waitingForClick = true;
                startButton.textContent = 'Click Now!';
            }, randomDelay);
        });

        reactionBox.addEventListener('click', () => {
            if (waitingForClick) {
                endTime = new Date().getTime();
                const reactionTime = endTime - startTime;
                lastScoreSpan.textContent = reactionTime;

                scores.push(reactionTime);
                if (bestScore === 0 || reactionTime < bestScore) {
                    bestScore = reactionTime;
                }
                updateScoresDisplay();
                saveScores();
                resetGame();
            } else if (reactionBox.classList.contains('ready')) {
                // Clicked too early
                alert('Too early! Click only when the box turns green.');
                resetGame();
            }
        });

        resetScoresButton.addEventListener('click', () => {
            scores = [];
            bestScore = 0;
            lastScoreSpan.textContent = '0';
            saveScores();
            updateScoresDisplay();
        });

        // Initial display update
        updateScoresDisplay();
    }
});
