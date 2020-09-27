module.exports = {
    '*.{md,json,scss,css}': ['prettier --write', 'git add'],
    '*.{js,ts,tsx}': ['eslint --max-warnings=0 --fix', 'git add'],
}
