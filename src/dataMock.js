import { languageMapping } from './mapping/languages';

const buildData = () => {
  const data = {};

  Object.keys(languageMapping).forEach((langEnumeration) => {
    const lang = languageMapping[langEnumeration];

    data[lang.id] = [
      {
        id: 100,
        content: `${lang.id} - Token 100`
      },
      {
        id: 200,
        content: `${lang.id} - Token 200`
      }
    ];
  });

  return data;
};

const dataMock = buildData();

export default dataMock;
