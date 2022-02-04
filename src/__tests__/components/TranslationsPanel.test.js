import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import TranslationsPanel from '../../components/TranslationsPanel';
import { languageMapping } from '../../mapping/languages';

const stateMock = {
  Core: {
    selectedItemId: 321
  },
  Settings: {
    mainLanguage: languageMapping.USA.id,
    translation: {
      [languageMapping.USA.id]: true,
      [languageMapping.SPAIN.id]: true,
      [languageMapping.BRAZIL.id]: true,
      [languageMapping.FRANCE.id]: true,
      [languageMapping.FINLAND.id]: true
    }
  }
};

const prepareReactReduxMocks = () => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => jest.fn());
  jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((selector) => selector(stateMock));
};

describe(`${TranslationsPanel.name}`, () => {
  describe('tests', () => {
    let wrapper;

    beforeAll(() => {
      prepareReactReduxMocks();

      wrapper = shallow(<TranslationsPanel />);
    });

    it('should render with selected fields', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.translations-panel__field-row')).toHaveLength(2);
      expect(wrapper.find('.translations-panel__field')).toHaveLength(4);
    });
  });

  describe('snapshots', () => {
    it('should render', () => {
      prepareReactReduxMocks();

      const tree = renderer.create(<TranslationsPanel />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
