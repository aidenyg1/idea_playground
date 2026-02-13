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
    // Temporarily removed rank labels for debugging scope
    // { selector: '.rank-label', key: 'rank_label' },
    // { selector: '#estimated-rank', key: 'rank_iron' },
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
    console.log("[script.js] Attempting to load translations...");
    try {
        const response = await fetch('/translations.json');
        translations = await response.json();
        console.log("[script.js] Translations loaded:", translations);
        translateUI();
    } catch (error) {
        console.error('[script.js] Error loading translations:', error);
    }
}

function translateUI() {
    console.log("[script.js] Translating UI for language:", currentLanguage);
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
            } else {
                console.warn(`[script.js] Missing translation for key '${item.key}' in language '${currentLanguage}' for selector '${item.selector}'.`);
            }
        });
    });

    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', currentLanguage);

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaOgTitle = document.querySelector('meta[property="og:title"]');
    const metaOgDescription = document.querySelector('meta[property="og:description"]');
    const metaTwitterTitle = document.querySelector('meta[property="twitter:title"]');
    const metaTwitterDescription = document.querySelector('meta[property="twitter:description"]');
    const titleElement = document.querySelector('title');

    if (translations[currentLanguage]) {
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
            pageSpecificTitleKey = 'app_title';
            pageSpecificDescKey = 'hero_tagline';
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
    }

    const langToggleButton = document.getElementById('lang-toggle');
    if (langToggleButton) {
        langToggleButton.textContent = currentLanguage === 'ko' ? 'ENG' : 'KOR';
    }
}

function setLanguage(lang) {
    console.log("[script.js] Setting language to:", lang);
    currentLanguage = lang;
    localStorage.setItem('lang', lang);
    translateUI();
}

// Global JavaScript functionalities
document.addEventListener('DOMContentLoaded', () => {
    console.log("[script.js] DOMContentLoaded fired.");

    loadTranslations().then(() => {
        const storedLang = localStorage.getItem('lang');
        if (storedLang) {
            setLanguage(storedLang);
        } else {
            setLanguage('ko');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const langToggleButton = document.getElementById('lang-toggle');
    if (langToggleButton) {
        langToggleButton.addEventListener('click', () => {
            console.log("[script.js] Language toggle button clicked.");
            const newLang = currentLanguage === 'ko' ? 'en' : 'ko';
            setLanguage(newLang);
        });
    }

    if (document.body.id === 'training-page') {
        console.log("[script.js] Training page specific logic initializing.");

        const settingsScreen = document.getElementById('settings-screen');
        const gameArea = document.getElementById('game-area');
        const applySettingsButton = document.getElementById('apply-settings-button');
        const gameSelection = document.getElementById('game-selection');
        const modeSelection = document.getElementById('mode-selection');

        const trainerInstruction = document.querySelector('.trainer-instruction');

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
        let currentColor = ''; 

        const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
        const targetColor = 'blue';

        let gameSettings = JSON.parse(localStorage.getItem('gameSettings')) || {
            game: 'valorant',
            mode: 'classic'
        };

        function loadSettings() {
            console.log("[script.js] loadSettings called.");
            gameSelection.value = gameSettings.game;
            modeSelection.value = gameSettings.mode;
            console.log("[script.js] Loaded game settings:", gameSettings);
        }

        function saveSettings() {
            gameSettings.game = gameSelection.value;
            gameSettings.mode = modeSelection.value;
            localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
            console.log("[script.js] Saved game settings:", gameSettings);
        }

        gameSelection.addEventListener('change', () => {
            console.log("[script.js] Game selection changed.");
            saveSettings();
            updateScoresDisplay();
        });
        modeSelection.addEventListener('change', () => {
            console.log("[script.js] Mode selection changed.");
            saveSettings();
            updateTrainerInstruction();
        });

        applySettingsButton.addEventListener('click', () => {
            console.log("[script.js] Apply Settings button clicked.");
            saveSettings();
            settingsScreen.style.display = 'none';
            gameArea.style.display = 'block';
            resetGame(); // Ensure game is in a clean state
            // Programmatically click the start button to ensure the game start flow is triggered
            startButton.click();
            updateScoresDisplay();
            updateTrainerInstruction();
            console.log("[script.js] Transitioned from settings to game area and triggered game start.");
        });

        function updateScoresDisplay() {
            console.log("[script.js] updateScoresDisplay called.");
            if (scores.length > 0) {
                const sum = scores.reduce((a, b) => a + b, 0);
                const average = sum / scores.length;
                averageScoreSpan.textContent = average.toFixed(0);
            } else {
                averageScoreSpan.textContent = '0';
            }
            bestScoreSpan.textContent = bestScore;
            console.log("[script.js] Scores updated. Last:", lastScoreSpan.textContent, "Best:", bestScore, "Avg:", averageScoreSpan.textContent);
        }

        function updateTrainerInstruction() {
            console.log("[script.js] updateTrainerInstruction called for mode:", gameSettings.mode);
            if (gameSettings.mode === 'color_reaction') {
                trainerInstruction.textContent = translations[currentLanguage]['trainer_instruction_color_reaction'];
            } else {
                trainerInstruction.textContent = translations[currentLanguage]['trainer_instruction'];
            }
        }

        function resetGame() {
            console.log("[script.js] resetGame called.");
            reactionBox.style.display = 'none';
            reactionBox.className = '';
            // Restore start button to initial text and enable it
            startButton.textContent = translations[currentLanguage]['start_test_button'];
            startButton.disabled = false;
            clearTimeout(timeoutId);
            waitingForClick = false;
            currentColor = '';
            console.log("[script.js] Game reset complete. Start button text:", startButton.textContent);
        }

        startButton.addEventListener('click', () => {
            console.log("[script.js] Start button clicked. Current mode:", gameSettings.mode);
            // If the button is already disabled (e.g., during a game cycle), ignore further clicks
            if (startButton.disabled && startButton.textContent !== translations[currentLanguage]['get_ready']) {
                console.log("[script.js] Start button click ignored: already disabled or game in progress.");
                return;
            }

            startButton.disabled = true;
            startButton.textContent = translations[currentLanguage]['get_ready'];
            reactionBox.style.display = 'block';

            if (gameSettings.mode === 'color_reaction') {
                console.log("[script.js] Starting Color Reaction Game.");
                reactionBox.className = 'color-cycle';
                startColorReactionGame();
            } else { // Classic mode
                console.log("[script.js] Starting Classic Mode Game.");
                reactionBox.className = 'ready';
                const randomDelay = Math.floor(Math.random() * 3000) + 1500;
                console.log("[script.js] Classic mode: Random delay set to", randomDelay, "ms.");

                timeoutId = setTimeout(() => {
                    console.log("[script.js] Classic mode: Delay finished, box turning green.");
                    reactionBox.className = 'go';
                    startTime = new Date().getTime();
                    waitingForClick = true;
                    startButton.textContent = translations[currentLanguage]['click_now'];
                }, randomDelay);
            }
        });

        function startColorReactionGame() {
            console.log("[script.js] startColorReactionGame called.");
            let cycleCount = 0;
            const maxCycles = 10;
            const minCycles = 3;
            const randomMaxCycles = Math.floor(Math.random() * (maxCycles - minCycles + 1)) + minCycles;
            console.log("[script.js] Color Reaction: Will cycle", randomMaxCycles, "times before target color.");

            function changeColor() {
                if (!waitingForClick && cycleCount < randomMaxCycles) {
                    let randomColor;
                    do {
                        randomColor = colors[Math.floor(Math.random() * colors.length)];
                    } while (randomColor === currentColor);
                    
                    reactionBox.style.backgroundColor = randomColor;
                    currentColor = randomColor;
                    cycleCount++;
                    console.log("[script.js] Color Reaction: Changed color to", currentColor, "(cycle", cycleCount, ")");

                    timeoutId = setTimeout(changeColor, Math.random() * 500 + 300);
                } else if (!waitingForClick) {
                    console.log("[script.js] Color Reaction: Delay finished, box turning target color (", targetColor, ").");
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
            console.log("[script.js] Reaction box clicked. Waiting for click:", waitingForClick, "Current color:", currentColor);
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
                        console.log("[script.js] Color Reaction: Correct click. Reaction time:", reactionTime);
                    } else {
                        alert(translations[currentLanguage]['alert_wrong_color']);
                        resetGame();
                        console.log("[script.js] Color Reaction: Clicked on wrong color.");
                    }
                } else {
                    alert(translations[currentLanguage]['alert_wrong_color']);
                    resetGame();
                    console.log("[script.js] Color Reaction: Clicked too early (before target color).");
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
                    console.log("[script.js] Classic Mode: Correct click. Reaction time:", reactionTime);
                } else if (reactionBox.classList.contains('ready')) {
                    alert(translations[currentLanguage]['alert_too_early']);
                    resetGame();
                    console.log("[script.js] Classic Mode: Clicked too early (box was yellow).");
                } else {
                     console.log("[script.js] Classic Mode: Clicked before ready state or after game ended. Ignoring.");
                }
            }
        });

        resetScoresButton.addEventListener('click', () => {
            console.log("[script.js] Reset Scores button clicked.");
            scores = [];
            bestScore = 0;
            lastScoreSpan.textContent = '0';
            saveScores();
            updateScoresDisplay();
            resetGame(); // Ensure game is reset after clearing scores
            console.log("[script.js] Scores reset.");
        });

        // Initial setup for training page
        loadSettings();
        settingsScreen.style.display = 'block';
        gameArea.style.display = 'none';
        updateScoresDisplay();
        updateTrainerInstruction();
        console.log("[script.js] Training page initial setup complete.");
    }
});
