import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import Settings from '../../pages/Settings';
import * as coreActions from '../../actions/core';
import * as settingsActions from '../../actions/settings';
import { languageMapping } from '../../mapping/languages';

const navigateMock = jest.fn();
const reactRouterDomMock = { useNavigate: () => navigateMock };

jest.mock('react-router-dom', () => reactRouterDomMock);

const translationInitial = {};

Object.values(languageMapping).forEach(
  ({ id }) => (translationInitial[id] = true)
);

const getStateMock = () => ({
  Settings: {
    darkTheme: false,
    compactLayout: false,
    translationColumns: 3,
    translation: translationInitial,
    mainLanguage: languageMapping.USA.id
  }
});

const prepareMocks = (dispatchMock, stateMock) => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);
  jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((selector) => selector(stateMock));
};

describe(`${Settings.name}`, () => {
  describe('tests', () => {
    let wrapper, dispatchMock;

    beforeAll(() => {
      dispatchMock = jest.fn();

      prepareMocks(dispatchMock, getStateMock());

      jest.spyOn(settingsActions, 'saveSettings');
      jest.spyOn(settingsActions, 'setMainLanguage');
      jest.spyOn(settingsActions, 'toggleCompactLayout');
      jest.spyOn(settingsActions, 'toggleDarkTheme');
      jest.spyOn(settingsActions, 'toggleTranslation');
      jest.spyOn(settingsActions, 'setTranslationColumns');
      jest.spyOn(coreActions, 'setLoading');

      wrapper = shallow(<Settings />);
    });

    it('should render', () => {
      expect(wrapper.find('.settings')).toHaveLength(1);
      expect(wrapper.find('[data-testid="toggle-dark-theme"]')).toHaveLength(1);
      expect(wrapper.find('[data-testid="toggle-compact-layout"]')).toHaveLength(1);
      expect(wrapper.find('[data-testid="select-main-lang"]')).toHaveLength(1);
      expect(wrapper.find('[data-testid="toggle-translation"]')).toHaveLength(16);
    });

    it('should toggle dark theme', () => {
      wrapper.find('[data-testid="toggle-dark-theme"]').simulate('change');
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(settingsActions.toggleDarkTheme(true));
    });

    it('should toggle compact layout', () => {
      wrapper.find('[data-testid="toggle-compact-layout"]').simulate('change');
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(settingsActions.toggleCompactLayout(true));
    });

    it('should change main language', () => {
      const czechId = languageMapping.CZECH.id;

      wrapper.find('[data-testid="select-main-lang"]').simulate('change', czechId);
      expect(dispatchMock).toBeCalledTimes(2);
      expect(dispatchMock).nthCalledWith(1, settingsActions.setMainLanguage(czechId));
      expect(dispatchMock).nthCalledWith(2, settingsActions.toggleTranslation(czechId, false));
    });

    it('should change translation', () => {
      const turkeyId = languageMapping.TURKEY.id;

      wrapper.find('[data-testid="toggle-translation"]').at(15).simulate('change');
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(settingsActions.toggleTranslation(turkeyId, false));
    });

    it('should change translation columns', () => {
      wrapper.find('[data-testid="translation-layout-selector"]').simulate('change', 2);
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(settingsActions.setTranslationColumns(2));
    });

    it('should save and navigate back', () => {
      wrapper.find('[data-testid="btn-back"]').simulate('click');
      expect(dispatchMock).toBeCalledTimes(2);
      expect(dispatchMock).nthCalledWith(1, coreActions.setLoading(true));
      expect(dispatchMock).nthCalledWith(2, settingsActions.saveSettings(
        languageMapping.USA.id,
        translationInitial,
        false,
        false
      ));
      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith(-1);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render', () => {
      prepareMocks(jest.fn(), getStateMock());

      const tree = renderer.create(<Settings />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
