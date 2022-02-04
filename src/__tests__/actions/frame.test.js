import {
  close,
  maximize,
  minimize,
  registerFrameListeners,
  setMaximized,
  unmaximize
} from '../../actions/frame';
import apiUtils from '../../utils/apiUtils';
import actionTypes from '../../constants/actionTypes';

describe('frame actions tests', () => {
  let dispatchMock;

  beforeAll(() => {
    dispatchMock = jest.fn();

    jest.spyOn(apiUtils, 'close');
    jest.spyOn(apiUtils, 'minimize');
    jest.spyOn(apiUtils, 'maximize');
    jest.spyOn(apiUtils, 'unmaximize');
    jest.spyOn(apiUtils, 'registerMaximizeListener');
    jest.spyOn(apiUtils, 'registerUnmaximizeListener');
  });

  it('should create action to maximize', () => {
    expect(setMaximized(true)).toMatchObject({
      type: actionTypes.SET_MAXIMIZED,
      value: true
    });
  });

  it('should call close from api', () => {
    close()();
    expect(apiUtils.close).toBeCalled();
  });

  it('should call minimize from api', () => {
    minimize()();
    expect(apiUtils.minimize).toBeCalled();
  });

  it('should call maximize from api', () => {
    maximize()();
    expect(apiUtils.maximize).toBeCalled();
  });

  it('should call unmaximize from api', () => {
    unmaximize()();
    expect(apiUtils.unmaximize).toBeCalled();
  });

  it('should register frame listeners', () => {
    let maximizeListener, unmaximizeListener;

    apiUtils.registerMaximizeListener.mockImplementation((cb) => (maximizeListener = cb));
    apiUtils.registerUnmaximizeListener.mockImplementation((cb) => (unmaximizeListener = cb));

    registerFrameListeners()(dispatchMock);

    maximizeListener();
    expect(dispatchMock).lastCalledWith(setMaximized(true));

    unmaximizeListener();
    expect(dispatchMock).lastCalledWith(setMaximized(false));
  });
});
