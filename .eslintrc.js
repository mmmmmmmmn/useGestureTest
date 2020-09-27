module.exports = {
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
    },
    overrides: [
        {
            files: ['*.js'],
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
            rules: {
                // for samples
                'no-unused-vars': 2,
            },
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'eslint:recommended',
                'plugin:prettier/recommended',
                'prettier/@typescript-eslint',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:react/recommended',
            ],
            plugins: ['@typescript-eslint', 'react', 'react-hooks'],
            parser: '@typescript-eslint/parser',
            rules: {
                '@typescript-eslint/no-empty-function': 2,
                '@typescript-eslint/no-use-before-define': 0, // bug?
                '@typescript-eslint/explicit-function-return-type': 0,
                'react/prop-types': 0,
                'react/react-in-jsx-scope': 0,
                // interface等のメンバーを定義する際、複数行にまたがる場合はデミリタ無しとする (prettierとの競合解消)
                // https://kic-yuuki.hatenablog.com/entry/2019/10/19/141601#prettiersemi%E3%81%A8-typescript-eslintmember-delimiter-style%E3%81%8C%E7%AB%B6%E5%90%88%E3%81%97%E3%81%9F
                '@typescript-eslint/member-delimiter-style': [
                    'error',
                    {
                        multiline: {
                            delimiter: 'none',
                            requireLast: false,
                        },
                        singleline: {
                            delimiter: 'semi',
                            requireLast: false,
                        },
                    },
                ],
                eqeqeq: 2,
                'react-hooks/rules-of-hooks': 2,
            },
        },
    ],
}
