import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import AppFrame from '../../../components/AppFrame';
import * as frameActions from '../../../actions/frame';

const getStateMock = (maximized) => ({ Frame: { maximized } });

describe(`${AppFrame.name}`, () => {
  describe('tests', () => {
    let wrapper, dispatchMock, useSelectorSpy, useDispatchSpy;

    beforeAll(() => {
      dispatchMock = jest.fn();

      useSelectorSpy = jest.spyOn(reactRedux, 'useSelector').mockImplementation(selector => selector(getStateMock(false)));
      useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);

      jest.spyOn(frameActions, 'close');
      jest.spyOn(frameActions, 'minimize');
      jest.spyOn(frameActions, 'maximize');
      jest.spyOn(frameActions, 'unmaximize');

      wrapper = shallow(
        <AppFrame />
      );
    });

    it('should render unmaximized', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.app-frame')).toHaveLength(1);
      expect(wrapper.find('.app-frame__buttons')).toHaveLength(1);
    });

    it('should call close when double click app icon', () => {
      wrapper.find('.app-frame__title-icon').simulate('doubleclick');
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(frameActions.close());
    });

    it('should call minimize', () => {
      wrapper.find('[data-testid="btn-minimize"]').simulate('click');
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(frameActions.minimize());
    });

    it('should call maximize', () => {
      wrapper.find('[data-testid="btn-maximize"]').simulate('click');
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(frameActions.maximize());
    });

    it('should render maximized', () => {
      wrapper.unmount();
      useSelectorSpy.mockImplementation(selector => selector(getStateMock(true)));
      useDispatchSpy.mockImplementation(() => dispatchMock);

      wrapper = shallow(
        <AppFrame />
      );

      expect(wrapper.find('.app-frame')).toHaveLength(1);
      expect(wrapper.find('.app-frame__buttons')).toHaveLength(1);
    });

    it('should call unmaximize', () => {
      wrapper.find('[data-testid="btn-maximize"]').simulate('click');
      expect(dispatchMock).toBeCalledTimes(1);
      expect(dispatchMock).toBeCalledWith(frameActions.unmaximize());
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    let useSelectorSpy;

    beforeEach(() => {
      jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => jest.fn());
      useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
    });

    it('should render maximized', () => {
      useSelectorSpy.mockImplementation(selector => selector(getStateMock(true)));

      const tree = renderer
        .create(<AppFrame />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render unmaximized', () => {
      useSelectorSpy.mockImplementation(selector => selector(getStateMock(false)));

      const tree = renderer
        .create(<AppFrame />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
