'use strict';

const {
  getRandomNum,
  shuffle,
  getImgFileName
} = require(`./utils`);

const {
  DEFAULT_COUNT,
  MAX_COUNT,
  FILE_NAME,
  CATEGORIES_MIN_NUM,
  TITLES,
  SENTENCES,
  CATEGORIES,
  SumRestrict,
  OfferType,
  PictureRestrict,
  SentencesNum,
  ExitCode
} = require(`./constants`);

const fs = require(`fs`);

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    title: TITLES[getRandomNum(0, TITLES.length - 1)],
    description: shuffle(SENTENCES).slice(0, getRandomNum(SentencesNum.MIN, SentencesNum.MAX)).join(` `),
    sum: getRandomNum(SumRestrict.MIN, SumRestrict.MAX),
    picture: `item${getImgFileName(getRandomNum(PictureRestrict.MIN, PictureRestrict.MAX))}.jpg`,
    category: shuffle(CATEGORIES).slice(0, getRandomNum(CATEGORIES_MIN_NUM, CATEGORIES.length - 1))
  }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    if (count > MAX_COUNT) {
      console.error(`Максимальное количество элементов равно ${MAX_COUNT}...`);
      process.exit(ExitCode.ERROR);
    }
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = JSON.stringify(generateOffers(offersCount));

    fs.writeFile(FILE_NAME, offers, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }

      console.info(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);

    });
  }
};
