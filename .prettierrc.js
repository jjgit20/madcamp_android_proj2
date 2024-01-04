module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '@src/navigation/*',
    '@src/screens/*',
    '@src/components/*',
    '@src/assets/*',
    '@src/styles/*',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tabWidth: 2,
};
