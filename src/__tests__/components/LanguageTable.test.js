import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import LanguageTable from '../../components/LanguageTable';
import { languageMapping } from '../../mapping/languages';

const dataMock = {
  [languageMapping.USA.id]: [
    {
      uid: 1,
      id: '100000',
      content: 'Incluir'
    }
  ]
};

const getStateMock = (loading) => ({
  Core: {
    loading,
    data: dataMock,
    filter: ''
  },
  Settings: {
    mainLanguage: languageMapping.USA.id
  }
});

describe(`${LanguageTable.type.name}`, () => {
  describe('snapshots', () => {
    beforeAll(() => {
      jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => jest.fn());
    });

    it('should render loading', () => {
      jest
        .spyOn(reactRedux, 'useSelector')
        .mockImplementation((selector) => selector(getStateMock(true)));

      const tree = renderer.create(<LanguageTable />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render without loading', () => {
      jest
        .spyOn(reactRedux, 'useSelector')
        .mockImplementation((selector) => selector(getStateMock(false)));

      const tree = renderer.create(<LanguageTable />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
