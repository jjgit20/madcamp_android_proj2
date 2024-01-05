module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  settings: {},
  plugins: ['import', 'unused-imports', '@typescript-eslint'],
  rules: {
    'no-duplicate-imports': 'warn',
    'import/no-duplicates': ['warn', {considerQueryString: true}],
    'unused-imports/no-unused-imports': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'spaced-comment': 'warn',
    'react-native/no-inline-styles': 'off',
  },
};
