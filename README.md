# GFG C++ Interview Prep Platform

A quiz-style progress tracker focused on 5 GeeksforGeeks C++ interview articles.

## Quick Preview
If your IDE's markdown preview is blank, preview the actual web app instead:

1. Start a local static server:
   ```bash
   python3 -m http.server 8000
   ```
2. Open: `http://localhost:8000`
3. You should see the full dashboard with 3 sections: **Your Progress**, **5 Great GFG Articles**, and **Quiz**.

## Features
- 5 curated GFG C++ interview topics with direct links.
- Article summaries and key revision points.
- Quiz mode per article.
- Local progress tracking (read status + quiz scores) using browser `localStorage`.
- Reset progress button.

## Files
- `index.html` – page structure
- `styles.css` – UI styling
- `app.js` – data, quiz logic, and progress persistence
