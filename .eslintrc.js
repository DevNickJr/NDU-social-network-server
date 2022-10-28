module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
    },
}
