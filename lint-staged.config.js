module.exports = {
  '**/*.js?(x)': (filenames) =>
    filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.ts?(x)': () => 'npx tsc -p tsconfig.json --noEmit',
};
