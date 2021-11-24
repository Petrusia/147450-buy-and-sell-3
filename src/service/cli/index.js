'use strict';

const help = require(`./help`);
const generate = require(`./generate`);
const version = require(`./version`);

const Cli = {
  [generate.name]: generate,
  [version.name]: version,
  [help.name]: help,
};

module.exports = {Cli};
