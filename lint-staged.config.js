module.exports = {
    '*.{md,json,scss,css}': ['prettier --write', 'git add'],
    '*.{js,ts,tsx}': ['eslint --fix', 'git add'],
}
