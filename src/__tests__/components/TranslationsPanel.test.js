import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import TranslationsPanel from '../../components/TranslationsPanel';
import { languageMapping } from '../../mapping/languages';

const getStateMock = (translationColumns, enableFields) => ({
  Core: {
    selectedItemId: 321
  },
  Settings: {
    mainLanguage: languageMapping.USA.id,
    translationColumns,
    translation: {
      [languageMapping.USA.id]: enableFields,
      [languageMapping.SPAIN.id]: enableFields,
      [languageMapping.BRAZIL.id]: enableFields,
      [languageMapping.FRANCE.id]: enableFields,
      [languageMapping.FINLAND.id]: enableFields
    }
  }
});

const prepareReactReduxMocks = (translationColumns, enableFields) => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => jest.fn());
  jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((selector) => selector(getStateMock(translationColumns, enableFields)));
};

describe(`${TranslationsPanel.name}`, () => {
  describe('tests', () => {
    let wrapper;

    beforeAll(() => {
      prepareReactReduxMocks(3, true);

      wrapper = shallow(<TranslationsPanel />);
    });

    it('should render with selected fields', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.translations-panel__field-row')).toHaveLength(2);
      expect(wrapper.find('.translations-panel__field')).toHaveLength(4);
    });
  });

  describe('snapshots', () => {
    it('should render empty state when does not have fields enabled', () => {
      prepareReactReduxMocks(3, false);

      const tree = renderer.create(<TranslationsPanel />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with 3 columns', () => {
      prepareReactReduxMocks(3, true);

      const tree = renderer.create(<TranslationsPanel />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with 2 columns', () => {
      prepareReactReduxMocks(2, true);

      const tree = renderer.create(<TranslationsPanel />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with 1 column', () => {
      prepareReactReduxMocks(1, true);

      const tree = renderer.create(<TranslationsPanel />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
