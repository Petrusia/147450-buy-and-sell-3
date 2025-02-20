'use strict';

const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    console.info(`Номер версии нашего приложения: ${version}.`);
  }
};
