import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import Main from '../../pages/Main';
import * as coreActions from '../../actions/core';
import * as settingsActions from '../../actions/settings';
import { languageMapping } from '../../mapping/languages';
import dataMock from '../../dataMock';

const navigateMock = jest.fn();
const reactRouterDomMock = { useNavigate: () => navigateMock };

jest.mock('react-router-dom', () => reactRouterDomMock);

const useKeyboardShortcutMock = jest.fn();
const useKeyboardShortcutModuleMock = () => useKeyboardShortcutMock;

jest.mock('use-keyboard-shortcut', () => useKeyboardShortcutModuleMock);

jest.mock('lodash/debounce', () => jest.fn(cb => cb()));

const translationInitial = {};

Object.values(languageMapping).forEach(
  ({ id }) => (translationInitial[id] = true)
);

const getStateMock = (valid, appHasUpdate) => ({
  Core: {
    appHasUpdate,
    loading: false,
    data: dataMock,
    filter: ''
  },
  Settings: {
    mainLanguage: languageMapping.USA.id,
    translation: translationInitial,
    valid
  }
});

const prepareMocks = (dispatchMock, stateMock) => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);
  jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((selector) => selector(stateMock));
};

describe(`${Main.type.name}`, () => {
  describe('tests', () => {
    let wrapper, dispatchMock;

    beforeAll(() => {
      dispatchMock = jest.fn();

      prepareMocks(dispatchMock, getStateMock(true, true));

      jest.spyOn(coreActions, 'setFilter');
      jest.spyOn(settingsActions, 'loadSettings');

      wrapper = mount(<Main />);
    });

    it('should render and load settings', () => {
      expect(wrapper.find('.main')).toHaveLength(1);
    });

    it('should navigate to settings', () => {
      wrapper.find('[data-testid="btn-settings"]').props().onClick();
      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith('/settings');
    });

    it('should navigate to about', () => {
      wrapper.find('[data-testid="btn-about"]').props().onClick();
      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith('/about');
    });

    it('should navigate to configNotFound when path is not valid', () => {
      wrapper.unmount();

      prepareMocks(dispatchMock, getStateMock(false, false));

      wrapper = mount(<Main />);

      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith('/configNotFound');
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render without update', () => {
      prepareMocks(jest.fn(), getStateMock(true, false));

      const tree = renderer.create(<Main />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with update', () => {
      prepareMocks(jest.fn(), getStateMock(true, true));

      const tree = renderer.create(<Main />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
