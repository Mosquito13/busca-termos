import searchUtils from '../../utils/searchUtils';
import { languageMapping } from '../../mapping/languages';

const langId = languageMapping.USA.id;
const dataMock = {
  [langId]: [
    {
      id: 123456,
      content: 'ThE First One'
    },
    {
      id: 987654,
      content: 'Second oNe'
    },
    {
      id: 333333,
      content: 'The third'
    }
  ]
};

describe('searchUtils tests', () => {
  it('should return everything when filter is empty', () => {
    const filtered = searchUtils.applyFilter(dataMock, '', langId);

    expect(filtered).toHaveLength(3);
  });

  it('should filter by id', () => {
    const filtered = searchUtils.applyFilter(dataMock, '3', langId);

    expect(filtered).toHaveLength(2);
    expect(filtered[0].id).toBe(123456);
    expect(filtered[1].id).toBe(333333);
  });

  it('should filter by id matching the start', () => {
    const filtered = searchUtils.applyFilter(dataMock, '3"', langId);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(333333);
  });

  it('should filter by id matching the end', () => {
    const filtered = searchUtils.applyFilter(dataMock, '"3', langId);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(333333);
  });

  it('should filter by content ignoring case', () => {
    const filtered = searchUtils.applyFilter(dataMock, 'OnE', langId);

    expect(filtered).toHaveLength(2);
    expect(filtered[0].content).toBe('ThE First One');
    expect(filtered[1].content).toBe('Second oNe');
  });

  it('should filter by content matching the start', () => {
    const filtered = searchUtils.applyFilter(dataMock, '"the', langId);

    expect(filtered).toHaveLength(2);
    expect(filtered[0].content).toBe('ThE First One');
    expect(filtered[1].content).toBe('The third');
  });

  it('should filter by content matching start and end', () => {
    const filtered = searchUtils.applyFilter(dataMock, '"the first one"', langId);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].content).toBe('ThE First One');
  });
});
