module.exports = {
    '*.{md,json,scss,css}': ['prettier --write --ignore-path .gitignore', 'git add'],
    '*.{js,ts,tsx}': ['eslint --fix --ignore-path .gitignore', 'git add'],
}
