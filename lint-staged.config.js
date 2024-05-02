module.exports = {
  '**/*.js?(x)': (filenames) =>
    filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.ts?(x)': () => 'npm run type-check',
};
