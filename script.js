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
                // Handle innerHTML for elements with potential HTML content (like about_get_started_desc)
                if (item.key.includes('_desc') || item.key.includes('_welcome')) {
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
            startButton.textContent = translations[currentLanguage]['start_test_button'];
            startButton.disabled = false;
            clearTimeout(timeoutId);
            waitingForClick = false;
        }

        // --- Game Logic ---
        startButton.addEventListener('click', () => {
            startButton.disabled = true;
            startButton.textContent = translations[currentLanguage]['get_ready'];
            reactionBox.className = 'ready'; // Set to yellow
            reactionBox.style.display = 'block';

            const randomDelay = Math.floor(Math.random() * 3000) + 1500; // 1.5 to 4.5 seconds

            timeoutId = setTimeout(() => {
                reactionBox.className = 'go'; // Set to green
                startTime = new Date().getTime();
                waitingForClick = true;
                startButton.textContent = translations[currentLanguage]['click_now'];
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
                alert(translations[currentLanguage]['alert_too_early']);
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
