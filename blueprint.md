# Blueprint for FPS Reaction Time Training Web App

## Overview
This blueprint outlines the development plan for a production-ready, fully static FPS Reaction Time Training web application. The app will be built using HTML, CSS, and Vanilla JavaScript, adhering to a "no backend" philosophy, and designed for optimal SEO and deployment on Cloudflare Pages.

## Project Requirements
- Fully static site (HTML, CSS, Vanilla JS only)
- No backend server
- No Firebase database usage
- No paid API usage
- No external paid services
- Google AdSense ready layout
- SEO optimized
- Cloudflare Pages deployment ready
- Default language: Korean
- Add language toggle button (KOR / ENG)
- Use a simple JSON-based translation system
- Translate all UI text including buttons, headings, and messages
- Keep SEO meta tags optimized for Korean keywords

## Pages
- `index.html` (Landing Page)
- `training.html` (Reaction Time Training Game)
- `blog.html` (Placeholder for articles)
- `about.html` (About the app/project)

## Features
- Reaction time test
- Millisecond score display
- Best score stored in `localStorage`
- Average score calculation
- No real-time database
- Pre-game settings screen in `training.html`:
  - Game selection dropdown: Valorant, Overwatch 2, PUBG
  - Mode selection dropdown: Classic, Hardcore, Color Reaction
  - Save selected settings in `localStorage`
  - Apply settings before game starts
  - Clean UI design matching dark gamer theme
- New Color Reaction Mode:
  - Box changes through random colors.
  - User clicks only when a specific target color (blue) appears.
  - Incorrect clicks (wrong color or too early) reset the game.
- Estimated Valorant rank system:
  - Based on average reaction time.
  - Only applies when Valorant is selected.
  - Ranks: Iron, Bronze, Silver, Gold, Platinum, Diamond, Ascendant, Immortal, Radiant.

## SEO
- Optimized title and description (`<title>`, `<meta name="description">`)
- Proper heading structure (`<h1>`, `<h2>`, etc.)
- Open Graph tags (`og:title`, `og:description`, `og:image`, etc.)
- `sitemap.xml`
- `robots.txt`
- Structured data (JSON-LD)

## Target Keywords
- FPS reaction time test
- Valorant aim training
- Overwatch aim practice
- Free FPS training site

## Proposed Folder Structure

```
/
├── index.html
├── training.html
├── blog.html
├── about.html
├── style.css
├── script.js
├── sitemap.xml
├── robots.txt
├── blueprint.md
├── translations.json
├── assets/
│   └── images/
│       └── favicon.ico
│   └── fonts/
```

### Folder Structure Explanation
-   **`/` (Root Directory):** Contains all primary HTML files, consolidated CSS/JS, and root-level SEO files (`sitemap.xml`, `robots.txt`).
-   **`index.html`:** The landing page of the application.
-   **`training.html`:** The page containing the FPS reaction time training game.
-   **`blog.html`:** A placeholder for a blog or articles (though content won't be dynamic due to no backend).
-   **`about.html`:** Information about the web app.
-   **`style.css`:** Consolidated stylesheet for all global, layout, and component styles.
-   **`script.js`:** Consolidated JavaScript file for all global and training game logic, including translation system.
-   **`sitemap.xml`:** XML sitemap for search engines.
-   **`robots.txt`:** Directives for web crawlers.
-   **`blueprint.md`:** Detailed plan and documentation for the project.
-   **`translations.json`:** JSON file for language translations.
-   **`assets/`:** Directory for static assets.
    *   **`images/`:** For images, icons, and a `favicon.ico`.
    *   **`fonts/`:** For custom web fonts.

## Current Plan:
1.  Define the folder structure. (Completed)
2.  Create `blueprint.md` with the overall plan and folder structure. (Completed)
3.  Create the initial HTML files (`index.html`, `training.html`, `blog.html`, `about.html`) with basic boilerplate, SEO meta tags, and proper heading structure. (Completed)
4.  Create initial CSS files (`style.css`, `css/components.css`, `css/layout.css`). (Completed)
5.  Create initial JavaScript files (`main.js`, `js/training.js`, `js/global.js`). (Completed)
6.  Create `sitemap.xml` and `robots.txt`. (Completed)
7.  Add AdSense ready layout comments and placeholders. (Completed)
8.  Implement the core reaction time test logic in `js/training.js`. (Completed)
9.  Implement local storage for best score and average score. (Completed)
10. Integrate global JavaScript functionalities and event listeners in `js/global.js`. (Completed)
11. Add Open Graph tags to HTML files. (Completed)
12. Implement Structured Data (JSON-LD) for relevant pages. (Completed)
13. Consolidate JavaScript files into `script.js` and update HTML files. (Completed)
14. Consolidate CSS files into `style.css` and update HTML files. (Completed)
15. Delete old `js` and `css` directories and `main.js`. (Completed)
16. Prepare for Cloudflare Pages deployment. (Completed)
17. Upload project to GitHub. (Completed)
18. Add Korean language support:
    *   Create `translations.json`. (Completed)
    *   Modify `script.js` to implement translation system. (Completed)
    *   Modify all HTML files to include `lang="ko"`, language toggle, translation classes, and Korean SEO meta tags. (Completed)
    *   Add basic CSS for the language toggle button to `style.css`. (Completed)
19. Add a pre-game settings screen in `training.html`:
    *   Modify `training.html` to add settings screen UI. (Completed)
    *   Modify `translations.json` to add new translation keys. (Completed)
    *   Modify `script.js` to implement settings logic (load/save, apply, UI interaction). (Completed)
    *   Modify `style.css` to add styling for settings screen. (Completed)
20. Remove sensitivity setting completely from `training.html`:
    *   Modify `training.html` to remove sensitivity UI. (Completed)
    *   Modify `translations.json` to remove sensitivity keys and add mode selection keys. (Completed)
    *   Modify `script.js` to remove sensitivity logic and integrate mode selection. (Completed)
    *   Verify `style.css` does not require specific changes for sensitivity (Confirmed). (Completed)
21. Add a new Color Reaction Mode:
    *   Modify `translations.json` to add new translation keys for mode. (Completed)
    *   Modify `training.html` to add new mode to dropdown. (Completed)
    *   Modify `script.js` to implement mode-specific game logic and UI updates. (Completed)
    *   Verify `style.css` does not require specific changes for new mode (Confirmed). (Completed)
22. Add estimated Valorant rank system:
    *   Modify `translations.json` to add rank labels. (Completed)
    *   Modify `training.html` to add rank display element. (Completed)
    *   Modify `script.js` to implement rank calculation and display logic. (Completed)
    *   Verify `style.css` does not require specific changes for rank display (Confirmed). (Completed)
23. Fix training start button issue (stable reaction test system) as per user feedback:
    *   Remove `data-cfasync="false"` from `script.js` include in `training.html`. (Completed)
    *   Change `id="start-button"` to `id="start-btn"` in `training.html` and update `script.js` to match. (Completed)
    *   Remove `if (document.body.id === 'training-page')` condition in `script.js`. (Completed)
    *   Move global translation variables and functions inside `DOMContentLoaded` in `script.js`. (Completed)
    *   Add `console.log("Training JS loaded. DOMContentLoaded fired.");` at the top of the `DOMContentLoaded` block in `script.js`. (Completed)
    *   Re-add other strategic console logs for debugging in `script.js`. (Completed)
    *   Re-enable Valorant Rank Display elements and logic in `script.js` and `training.html`. (Completed)
    *   Implement explicit red-yellow-green color sequence for reaction box in classic mode using CSS classes and adjusted 2-5 sec delay. (Completed)
    *   Refine `applySettingsButton` logic to prepare `start-btn` for user interaction, instead of programmatically clicking it. (Completed)
    *   Ensure `resetGame()` properly prepares `start-btn` for a new game and clears all dynamic styles. (Completed)
    *   Refine `startColorReactionGame` to use class names for color changes. (Completed)
