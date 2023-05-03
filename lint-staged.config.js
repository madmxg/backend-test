'use strict';

const fs = require('fs');

function generateTSConfig(stagedFilenames) {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  tsconfig.include = stagedFilenames;
  if (typeof tsconfig.exclude !== 'undefined') {
    delete tsconfig.exclude;
  }
  fs.writeFileSync('tsconfig.lint.json', JSON.stringify(tsconfig, null, 2));
  return 'tsc --noEmit --project tsconfig.lint.json';
}

module.exports = {
  '*.{js,json,md}': ['prettier --write'],
  '*.ts': ['eslint --cache --fix', generateTSConfig],
};
