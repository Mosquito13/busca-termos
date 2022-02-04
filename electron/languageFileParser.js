const fs = require('fs').promises;
const path = require('path');

const languages = require('./constants/languages');

const getId = (line) => parseInt(line.substring(5, 11), 10);
const getContent = (line) => line.substring(14, line.length - 2);

const parseFileData = (data) => {
  const parsed = [];

  data.split(/\r?\n/).forEach((line) => {
    if (line.charAt(0) !== '$') return;

    parsed.push({
      id: getId(line),
      content: getContent(line)
    });
  });

  return parsed;
};

const parseFile = async (basePath, language) => {
  const fileContent = await fs.readFile(path.join(basePath, `sesuite.${language}.utf-8.inc`), 'utf-8');

  return [language, parseFileData(fileContent)];
};

exports.parseAll = async (basePath) => {
  const parsedData = {};

  const parsingPromises = [];

  Object.keys(languages).forEach(key => {
    parsingPromises.push(parseFile(basePath, languages[key]));
  });

  const values = await Promise.all(parsingPromises);

  values.forEach(([language, data]) => {
    parsedData[language] = data;
  });

  return parsedData;
};
