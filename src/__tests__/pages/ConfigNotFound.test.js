import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import ConfigNotFound from '../../pages/ConfigNotFound';
import * as settingsActions from '../../actions/settings';

const navigateMock = jest.fn();
const reactRouterDomMock = { useNavigate: () => navigateMock };

jest.mock('react-router-dom', () => reactRouterDomMock);

const getStateMock = (valid, languageFolder) => ({
  Settings: {
    valid,
    validating: false,
    languageFolder
  }
});

const prepareMocks = (dispatchMock, stateMock) => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);
  jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((selector) => selector(stateMock));
};

describe(`${ConfigNotFound.name}`, () => {
  describe('tests', () => {
    let wrapper, dispatchMock;

    beforeAll(() => {
      dispatchMock = jest.fn();

      prepareMocks(dispatchMock, getStateMock(false));

      jest.spyOn(settingsActions, 'setLanguageFolder');
      jest.spyOn(settingsActions, 'validateAndSaveFirstSettings');

      wrapper = mount(<ConfigNotFound />);
    });

    it('should render and stay on page while folder is not valid', () => {
      expect(wrapper.find('.config-not-found')).toHaveLength(1);
      expect(navigateMock).toBeCalledTimes(0);
    });

    it('should set language folder', () => {
      wrapper
        .find('[data-testid="folder-picker"]')
        .props()
        .onChange('a/folder/');

      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(
        settingsActions.setLanguageFolder('a/folder/')
      );
    });

    it('should validate when click save', () => {
      wrapper.unmount();

      prepareMocks(dispatchMock, getStateMock(false, 'a/folder/that/is/set/'));

      wrapper = mount(<ConfigNotFound />);

      wrapper.find('[data-testid="btn-save"]').props().onClick();

      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(
        settingsActions.validateAndSaveFirstSettings('a/folder/that/is/set/')
      );
    });

    it('should navigate to main page when the folder is valid', () => {
      wrapper.unmount();

      prepareMocks(dispatchMock, getStateMock(true));

      wrapper = mount(<ConfigNotFound />);

      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith('/');
    });
  });

  describe('snapshots', () => {
    it('should render', () => {
      prepareMocks(jest.fn(), getStateMock(false));

      const tree = renderer.create(<ConfigNotFound />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
