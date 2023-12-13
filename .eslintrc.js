module.exports = {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module',
    },
    env: {
        node: true,
        jest: true,
    },
    rules: {
        'prettier/prettier': 4,
        'arrow-body-style': [2, 'as-needed'],
        'no-use-before-define': [2, { variables: false }],
        'consistent-return': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-console': [2, { allow: ['warn', 'error', 'info'] }],
    },
};
