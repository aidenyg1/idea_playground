// script.js - Consolidated JavaScript for the FPS Reaction Time Training web app

let translations = {};
let currentLanguage = localStorage.getItem('lang') || 'ko'; // Default to Korean

const elementsToTranslate = [
    { selector: '.app-title', key: 'app_title' },
    { selector: '.nav-train', key: 'nav_train' },
    { selector: '.nav-blog', key: 'nav_blog' },
    { selector: '.nav-about', key: 'nav_about' },
    { selector: '.hero-tagline', key: 'hero_tagline' },
    { selector: '.hero-button', key: 'hero_button' },
    { selector: '.why-train-title', key: 'why_train_title' },
    { selector: '.feature-accurate-title', key: 'feature_accurate_title' },
    { selector: '.feature-accurate-desc', key: 'feature_accurate_desc' },
    { selector: '.feature-progress-title', key: 'feature_progress_title' },
    { selector: '.feature-progress-desc', key: 'feature_progress_desc' },
    { selector: '.feature-free-title', key: 'feature_free_title' },
    { selector: '.feature-free-desc', key: 'feature_free_desc' },
    { selector: '.adsense-label', key: 'adsense_label' },
    { selector: '.footer-rights', key: 'footer_rights' },
    { selector: '.footer-privacy', key: 'footer_privacy' },
    { selector: '.footer-terms', key: 'footer_terms' },
    { selector: '.trainer-heading', key: 'trainer_heading' },
    { selector: '.trainer-instruction', key: 'trainer_instruction' },
    { selector: '.last-score-label', key: 'last_score' },
    { selector: '.best-score-label', key: 'best_score' },
    { selector: '.average-score-label', key: 'average_score' },
    { selector: '.start-test-button', key: 'start_test_button' },
    { selector: '.reset-scores-button', key: 'reset_scores_button' },
    { selector: '.game-selection-label', key: 'game_selection_label' },
    { selector: '#game-selection option[value="valorant"]', key: 'game_valorant' },
    { selector: '#game-selection option[value="overwatch2"]', key: 'game_overwatch2' },
    { selector: '#game-selection option[value="pubg"]', key: 'game_pubg' },
    { selector: '.mode-selection-label', key: 'mode_selection_label' },
    { selector: '#mode-selection option[value="classic"]', key: 'mode_classic' },
    { selector: '#mode-selection option[value="hardcore"]', key: 'mode_hardcore' },
    { selector: '#mode-selection option[value="color_reaction"]', key: 'mode_color_reaction' },
    { selector: '.apply-settings-button', key: 'apply_settings_button' },
    { selector: '.rank-label', key: 'rank_label' },
    { selector: '#estimated-rank', key: 'rank_iron' }, // Placeholder for initial translation, actual rank will be dynamic
    { selector: '.blog-articles-heading', key: 'blog_articles_heading' },
    { selector: '.blog-article1-title', key: 'blog_article1_title' },
    { selector: '.blog-article1-meta', key: 'blog_article1_meta' },
    { selector: '.blog-article1-summary', key: 'blog_article1_summary' },
    { selector: '.blog-read-more', key: 'blog_read_more' },
    { selector: '.blog-article2-title', key: 'blog_article2_title' },
    { selector: '.blog-article2-meta', key: 'blog_article2_meta' },
    { selector: '.blog-article2-summary', key: 'blog_article2_summary' },
    { selector: '.about-heading', key: 'about_heading' },
    { selector: '.about-welcome', key: 'about_welcome' },
    { selector: '.about-mission-title', key: 'about_mission_title' },
    { selector: '.about-mission-desc', key: 'about_mission_desc' },
    { selector: '.about-mission-li1', key: 'about_mission_li1' },
    { selector: '.about-mission-li2', key: 'about_mission_li2' },
    { selector: '.about-mission-li3', key: 'about_mission_li3' },
    { selector: '.about-tech-title', key: 'about_tech_title' },
    { selector: '.about-tech-desc', key: 'about_tech_desc' },
    { selector: '.about-get-started-title', key: 'about_get_started_title' },
    { selector: '.about-get-started-desc', key: 'about_get_started_desc' }
];

async function loadTranslations() {
    try {
        const response = await fetch('/translations.json');
        translations = await response.json();
        translateUI();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function translateUI() {
    elementsToTranslate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            if (translations[currentLanguage] && translations[currentLanguage][item.key]) {
                if (item.selector.includes('option')) { // Handle option elements specifically
                    element.textContent = translations[currentLanguage][item.key];
                }
                else if (item.key.includes('_desc') || item.key.includes('_welcome')) {
                    element.innerHTML = translations[currentLanguage][item.key];
                } else if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                    element.value = translations[currentLanguage][item.key];
                }
                else {
                    element.textContent = translations[currentLanguage][item.key];
                }
            }
        });
    });

    // Translate specific attributes if necessary
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', currentLanguage);

    // Update meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaOgTitle = document.querySelector('meta[property="og:title"]');
    const metaOgDescription = document.querySelector('meta[property="og:description"]');
    const metaTwitterTitle = document.querySelector('meta[property="twitter:title"]');
    const metaTwitterDescription = document.querySelector('meta[property="twitter:description"]');
    const titleElement = document.querySelector('title');

    if (translations[currentLanguage]) {
        // Dynamic title update based on current page
        let pageSpecificTitleKey = '';
        let pageSpecificDescKey = '';
        if (document.body.id === 'training-page') {
            pageSpecificTitleKey = 'training_page_title';
            pageSpecificDescKey = 'training_page_desc';
        } else if (document.body.id === 'blog-page') {
            pageSpecificTitleKey = 'blog_page_title';
            pageSpecificDescKey = 'blog_page_desc';
        } else if (document.body.id === 'about-page') {
            pageSpecificTitleKey = 'about_page_title';
            pageSpecificDescKey = 'about_page_desc';
        } else { // index page
            pageSpecificTitleKey = 'app_title'; // Using app_title for index page title
            pageSpecificDescKey = 'hero_tagline'; // Using hero_tagline for index page description
        }

        if (titleElement && translations[currentLanguage][pageSpecificTitleKey]) {
            titleElement.textContent = translations[currentLanguage][pageSpecificTitleKey];
        }
        if (metaDescription && translations[currentLanguage][pageSpecificDescKey]) {
            metaDescription.setAttribute('content', translations[currentLanguage][pageSpecificDescKey]);
        }
        if (metaOgTitle && translations[currentLanguage][pageSpecificTitleKey]) {
            metaOgTitle.setAttribute('content', translations[currentLanguage][pageSpecificTitleKey]);
        }
        if (metaOgDescription && translations[currentLanguage][pageSpecificDescKey]) {
            metaOgDescription.setAttribute('content', translations[currentLanguage][pageSpecificDescKey]);
        }
        if (metaTwitterTitle && translations[currentLanguage][pageSpecificTitleKey]) {
            metaTwitterTitle.setAttribute('content', translations[currentLanguage][pageSpecificTitleKey]);
        }
        if (metaTwitterDescription && translations[currentLanguage][pageSpecificDescKey]) {
            metaTwitterDescription.setAttribute('content', translations[currentLanguage][pageSpecificDescKey]);
        }

        // Keywords are static for now but could be dynamic if needed
        // For demonstration, keywords are generic per page, not translated directly.
        // A more robust solution would have translated keyword lists in translations.json
    }

    // Update language toggle button text
    const langToggleButton = document.getElementById('lang-toggle');
    if (langToggleButton) {
        langToggleButton.textContent = currentLanguage === 'ko' ? 'ENG' : 'KOR';
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('lang', lang);
    translateUI();
}

// Global JavaScript functionalities
document.addEventListener('DOMContentLoaded', () => {
    console.log("Global JavaScript loaded and DOM is ready.");

    loadTranslations().then(() => {
        // Set initial language or default to Korean
        const storedLang = localStorage.getItem('lang');
        if (storedLang) {
            setLanguage(storedLang);
        } else {
            setLanguage('ko'); // Default to Korean
        }
    });

    // Smooth scroll for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Language Toggle Button Event Listener
    const langToggleButton = document.getElementById('lang-toggle');
    if (langToggleButton) {
        langToggleButton.addEventListener('click', () => {
            const newLang = currentLanguage === 'ko' ? 'en' : 'ko';
            setLanguage(newLang);
        });
    }

    // Core logic for the FPS Reaction Time Training game (only on training.html)
    if (document.body.id === 'training-page') { // Add an ID to the body of training.html for conditional loading
        const settingsScreen = document.getElementById('settings-screen');
        const gameArea = document.getElementById('game-area');
        const applySettingsButton = document.getElementById('apply-settings-button');
        const gameSelection = document.getElementById('game-selection');
        const modeSelection = document.getElementById('mode-selection'); // New

        const trainerInstruction = document.querySelector('.trainer-instruction'); // Get instruction element
        const valorantRankDisplay = document.getElementById('valorant-rank-display'); // New
        const estimatedRankSpan = document.getElementById('estimated-rank'); // New

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
        let currentColor = ''; // For Color Reaction Mode

        const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']; // Available colors
        const targetColor = 'blue'; // Target color for Color Reaction Mode

        // Game Settings
        let gameSettings = JSON.parse(localStorage.getItem('gameSettings')) || {
            game: 'valorant',
            mode: 'classic' // New default mode
        };

        // --- Settings UI Functions ---
        function loadSettings() {
            gameSelection.value = gameSettings.game;
            modeSelection.value = gameSettings.mode; // Load mode setting
        }

        function saveSettings() {
            gameSettings.game = gameSelection.value;
            gameSettings.mode = modeSelection.value; // Save mode setting
            localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
        }

        // --- Event Listeners for Settings ---
        gameSelection.addEventListener('change', () => {
            saveSettings();
            updateScoresDisplay(); // Update display for rank visibility
        });
        modeSelection.addEventListener('change', () => {
            saveSettings();
            updateTrainerInstruction(); // Update instruction when mode changes
        });

        applySettingsButton.addEventListener('click', () => {
            saveSettings(); // Save settings when apply button is clicked
            settingsScreen.style.display = 'none';
            gameArea.style.display = 'block';
            resetGame(); // Ensure game is in a clean state
            updateScoresDisplay(); // Update scores after settings are applied
            updateTrainerInstruction(); // Update instruction based on selected mode
        });

        // --- Helper Functions ---
        function updateScoresDisplay() {
            if (scores.length > 0) {
                const sum = scores.reduce((a, b) => a + b, 0);
                const average = sum / scores.length;
                averageScoreSpan.textContent = average.toFixed(0);

                // Calculate and display Valorant rank if game is Valorant
                if (gameSettings.game === 'valorant') {
                    valorantRankDisplay.style.display = 'block';
                    estimatedRankSpan.textContent = calculateValorantRank(average);
                } else {
                    valorantRankDisplay.style.display = 'none';
                }

            } else {
                averageScoreSpan.textContent = '0';
                valorantRankDisplay.style.display = 'none'; // Hide if no scores
            }
            bestScoreSpan.textContent = bestScore;
        }

        function calculateValorantRank(avgReactionTime) {
            // This is a simplified estimation based on general human reaction times.
            // Real Valorant rank depends on many factors.
            if (avgReactionTime <= 150) return translations[currentLanguage]['rank_radiant'];
            if (avgReactionTime <= 170) return translations[currentLanguage]['rank_immortal'];
            if (avgReactionTime <= 190) return translations[currentLanguage]['rank_ascendant'];
            if (avgReactionTime <= 210) return translations[currentLanguage]['rank_diamond'];
            if (avgReactionTime <= 230) return translations[currentLanguage]['rank_platinum'];
            if (avgReactionTime <= 250) return translations[currentLanguage]['rank_gold'];
            if (avgReactionTime <= 280) return translations[currentLanguage]['rank_silver'];
            if (avgReactionTime <= 320) return translations[currentLanguage]['rank_bronze'];
            return translations[currentLanguage]['rank_iron'];
        }

        function saveScores() {
            localStorage.setItem('reactionScores', JSON.stringify(scores));
            localStorage.setItem('bestReactionScore', bestScore);
        }
        
        function updateTrainerInstruction() {
            if (gameSettings.mode === 'color_reaction') {
                trainerInstruction.textContent = translations[currentLanguage]['trainer_instruction_color_reaction'];
            } else {
                trainerInstruction.textContent = translations[currentLanguage]['trainer_instruction'];
            }
        }

        function resetGame() {
            reactionBox.style.display = 'none';
            reactionBox.className = ''; // Clear all classes
            startButton.textContent = translations[currentLanguage]['start_test_button'];
            startButton.disabled = false;
            clearTimeout(timeoutId);
            waitingForClick = false;
            currentColor = ''; // Reset color for color reaction mode
        }

        // --- Game Logic ---
        startButton.addEventListener('click', () => {
            startButton.disabled = true;
            startButton.textContent = translations[currentLanguage]['get_ready'];
            reactionBox.style.display = 'block';

            if (gameSettings.mode === 'color_reaction') {
                reactionBox.className = 'color-cycle'; // Initial state for color reaction
                startColorReactionGame();
            } else { // Classic mode
                reactionBox.className = 'ready'; // Set to yellow
                const randomDelay = Math.floor(Math.random() * 3000) + 1500; // 1.5 to 4.5 seconds

                timeoutId = setTimeout(() => {
                    reactionBox.className = 'go'; // Set to green
                    startTime = new Date().getTime();
                    waitingForClick = true;
                    startButton.textContent = translations[currentLanguage]['click_now'];
                }, randomDelay);
            }
        });

        function startColorReactionGame() {
            let cycleCount = 0;
            const maxCycles = 10; // Max random color changes before target
            const minCycles = 3;  // Min random color changes before target
            const randomMaxCycles = Math.floor(Math.random() * (maxCycles - minCycles + 1)) + minCycles;

            function changeColor() {
                if (!waitingForClick && cycleCount < randomMaxCycles) {
                    let randomColor;
                    do {
                        randomColor = colors[Math.floor(Math.random() * colors.length)];
                    } while (randomColor === currentColor); // Avoid same color twice in a row
                    
                    reactionBox.style.backgroundColor = randomColor;
                    currentColor = randomColor;
                    cycleCount++;

                    timeoutId = setTimeout(changeColor, Math.random() * 500 + 300); // Change color every 0.3-0.8 seconds
                } else if (!waitingForClick) { // Time to show target color
                    reactionBox.style.backgroundColor = targetColor;
                    currentColor = targetColor;
                    startTime = new Date().getTime();
                    waitingForClick = true;
                    startButton.textContent = translations[currentLanguage]['click_now'];
                }
            }
            changeColor();
        }

        reactionBox.addEventListener('click', () => {
            if (gameSettings.mode === 'color_reaction') {
                if (waitingForClick) {
                    if (currentColor === targetColor) {
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
                    } else {
                        // Clicked on wrong color
                        alert(translations[currentLanguage]['alert_wrong_color']);
                        resetGame();
                    }
                } else {
                    // Clicked too early (before target color appeared)
                    alert(translations[currentLanguage]['alert_wrong_color']); // Using wrong color alert for early click
                    resetGame();
                }
            } else { // Classic mode
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
                    alert(translations[currentLanguage]['alert_too_early']);
                    resetGame();
                }
            }
        });

        resetScoresButton.addEventListener('click', () => {
            scores = [];
            bestScore = 0;
            lastScoreSpan.textContent = '0';
            saveScores();
            updateScoresDisplay();
        });

        // Initial setup for training page
        loadSettings(); // Load settings when page loads
        settingsScreen.style.display = 'block'; // Always start with settings
        gameArea.style.display = 'none';
        updateScoresDisplay();
        updateTrainerInstruction(); // Initial instruction update
    }
});
