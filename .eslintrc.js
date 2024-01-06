module.exports = {
  root: true,
  extends: ['@react-native', 'prettier', 'eslint-config-prettier'],
  settings: {
    // 'import/resolver': {
    //   alias: {
    //     map: [['@src', './src']],
    //   },
    // },
  },
  plugins: ['import', 'unused-imports', '@typescript-eslint'],
  rules: {
    'no-duplicate-imports': 'warn',
    'import/no-duplicates': ['warn', {considerQueryString: true}],
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: {order: 'asc', caseInsensitive: true},
      },
    ],
    'unused-imports/no-unused-imports': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'spaced-comment': 'warn',
    'react-native/no-inline-styles': 'off',
  },
};
