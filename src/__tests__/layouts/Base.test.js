import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import BaseLayout from '../../layouts/Base';

const getStateMock = (darkTheme, compactLayout) => ({
  Settings: {
    darkTheme,
    compactLayout
  },
  Frame: {
    maximized: false
  }
});

const prepareMocks = (dispatchMock, stateMock) => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);
  jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((selector) => selector(stateMock));
};

describe(`${BaseLayout.name}`, () => {
  describe('snapshots', () => {
    it('should render normal layout and light theme', () => {
      prepareMocks(jest.fn(), getStateMock(false, false));

      const tree = renderer.create(<BaseLayout />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render normal layout and dark theme', () => {
      prepareMocks(jest.fn(), getStateMock(true, false));

      const tree = renderer.create(<BaseLayout />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render compact layout and light theme', () => {
      prepareMocks(jest.fn(), getStateMock(false, true));

      const tree = renderer.create(<BaseLayout />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render compact layout and dark theme', () => {
      prepareMocks(jest.fn(), getStateMock(true, true));

      const tree = renderer.create(<BaseLayout />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
