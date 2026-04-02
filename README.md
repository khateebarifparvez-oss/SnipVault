https://eclectic-starship-7c3d50.netlify.app/ Deployed

# SnipVault - Personal Code Snippet Library
A lightweight, browser-based code snippet manager built with plain HTML, CSS, and JavaScript. No frameworks, no backend, no account needed. Your snippets are saved locally in your browser.

## About
SnipVault lets you save, organize, and quickly copy reusable pieces of code. Think of it as your personal library for the code you write or use often — utility functions, CSS tricks, SQL queries, bash commands, and anything else worth keeping.

## Features
- Add snippets with a title, language, optional tag, description, and code
- Edit or delete any snippet
- Copy code to clipboard with one click
- Search across title, description, tag, and code content
- Filter snippets by programming language
- Tracks how many times you have copied snippets
- Data persists in localStorage — survives page refresh and browser restarts
- Keyboard shortcuts: Escape to close modals, Ctrl+K to open the new snippet form

## Project Structure
snipvault/
├── index.html      - Page structure and markup
├── style.css       - All styles
├── script.js       - All logic, storage, and rendering
└── favicon.svg     - Browser tab icon
```

## How to Run
1. Clone or download the repository
2. Open index.html in any browser
3. No installation or server needed

## Supported Languages
HTML, CSS, JavaScript, TypeScript, Python, Java, C++, SQL, Bash, and Other

## Notes
- All data is stored in your browser's localStorage under the key snipvault_snippets
- Clearing browser data or localStorage will erase your snippets — export important ones manually
- No data is sent to any server

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript
- localStorage API
