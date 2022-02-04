const fs = require('fs').promises;

const languages = require('../constants/languages');
const { parseAll } = require('../languageFileParser');

const fakeLinePtBr = '<?php\n$str[100000]="Incluir";\n?>';
const fakeLineEnUs = '<?php\n$str[100000]="Add";\n?>';

describe('API > languageFileParser test', () => {
  it('should return parsed data', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation(path => {
      if (path.includes(languages.BRAZIL)) {
        return fakeLinePtBr;
      }
      return fakeLineEnUs;
    });

    const response = await parseAll('folder');

    expect(response[languages.BRAZIL].length).toBeGreaterThan(0);
    expect(response[languages.BRAZIL][0]).toMatchObject({
      id: 100000,
      content: 'Incluir'
    });
    expect(response[languages.USA].length).toBeGreaterThan(0);
    expect(response[languages.USA][0]).toMatchObject({
      id: 100000,
      content: 'Add'
    });
  });
});
