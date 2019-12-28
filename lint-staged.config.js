module.exports = {
    '*.{js,ts,tsx,md,json,css}': ['prettier --write', 'git add'],
    // '*.{js,ts,tsx}': ['eslint'], // eslintをかけてerrorのものがあればコミットしない設定を後で足したい
}
