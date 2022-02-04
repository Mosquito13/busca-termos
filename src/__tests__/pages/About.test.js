import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import About from '../../pages/About';
import url from '../../constants/url';
import * as coreActions from '../../actions/core';

const navigateMock = jest.fn();
const reactRouterDomMock = { useNavigate: () => navigateMock };

jest.mock('react-router-dom', () => reactRouterDomMock);

const getStateMock = (appHasUpdate) => ({
  Core: {
    version: '1.6.9',
    appHasUpdate,
    updateURL: 'anURL/latest'
  },
  Settings: {
    compactLayout: false
  }
});

const prepareMocks = (dispatchMock, stateMock) => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);
  jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((selector) => selector(stateMock));
};

describe(`${About.name}`, () => {
  describe('tests', () => {
    let wrapper, dispatchMock;

    beforeAll(() => {
      dispatchMock = jest.fn();

      jest.spyOn(coreActions, 'openBrowserWithURL');
      jest.spyOn(coreActions, 'setLoading');
    });

    it('should render without app update', () => {
      prepareMocks(dispatchMock, getStateMock(false));

      wrapper = shallow(<About />);

      expect(wrapper.find('.about')).toHaveLength(1);

      expect(wrapper.find('.about__info-updates-icon')).toHaveLength(1);
      expect(wrapper.find('.about__info-updates-icon--red')).toHaveLength(0);

      expect(wrapper.find('[data-testid="link-update"]')).toHaveLength(0);
      expect(wrapper.find('[data-testid="p-app-updated"]')).toHaveLength(1);
    });

    it('should open issues page', () => {
      wrapper.find('[data-testid="link-issues"]').simulate('click');

      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(
        coreActions.openBrowserWithURL(url.ISSUES_PAGE)
      );
    });

    it('should render with app update', () => {
      wrapper.unmount();

      prepareMocks(dispatchMock, getStateMock(true));

      wrapper = shallow(<About />);

      expect(wrapper.find('.about')).toHaveLength(1);

      expect(wrapper.find('.about__info-updates-icon')).toHaveLength(1);
      expect(wrapper.find('.about__info-updates-icon--red')).toHaveLength(1);

      expect(wrapper.find('[data-testid="link-update"]')).toHaveLength(1);
      expect(wrapper.find('[data-testid="p-app-updated"]')).toHaveLength(0);
    });

    it('should open update page', () => {
      wrapper.find('[data-testid="link-update"]').simulate('click');

      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(
        coreActions.openBrowserWithURL('anURL/latest')
      );
    });

    it('should navigate back when close', () => {
      wrapper.find('[data-testid="btn-close"]').simulate('click');

      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toBeCalledWith(-1);

      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(coreActions.setLoading(true));
    });
  });

  describe('snapshots', () => {
    it('should render without app update', () => {
      prepareMocks(jest.fn(), getStateMock(false));

      const tree = renderer.create(<About />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with app update', () => {
      prepareMocks(jest.fn(), getStateMock(true));

      const tree = renderer.create(<About />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
