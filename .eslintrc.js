module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: '&{workspaceFolder}/tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended'
    // 'eslint:recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',



    'space-before-blocks': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'spaced-comment': ['error', 'always', { 'exceptions': ['-', '+', '*'] }],
    'block-spacing': 'error',
    'no-whitespace-before-property': 'error', // before object properties - foo. bar
    'space-infix-ops': 'error', // space between/before operators
    'switch-colon-spacing': 'error',
    'keyword-spacing': 'error',
    'implicit-arrow-linebreak': ['error', 'beside'], // return of a single line in arrow function
    'no-multi-spaces': 'error',
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'semi': 'error'
  },
};
