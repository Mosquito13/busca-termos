import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeRestore,
  VscChromeClose
} from 'react-icons/vsc';

import { ReactComponent as AppIcon } from '../../assets/svg/icon.svg';
import FrameButton from './FrameButton';

import { close, maximize, minimize, registerFrameListeners, unmaximize } from '../../actions/frame';
import frameSelectors from '../../selectors/frame';

import './styles.scss';

const AppFrame = () => {
  const dispatch = useDispatch();
  const isMaximized = useSelector(frameSelectors.isMaximized);

  const onClose = useCallback(() => dispatch(close()), [dispatch]);
  const onMinimize = useCallback(() => dispatch(minimize()), [dispatch]);
  const onMaximize = useCallback(() => {
    if (isMaximized) {
      return dispatch(unmaximize());
    }
    return dispatch(maximize());
  }, [dispatch, isMaximized]);

  useEffect(() => dispatch(registerFrameListeners()), [dispatch]);

  return (
    <div className="app-frame">
      <div className="app-frame__title">
        <div className="app-frame__title-icon" onDoubleClick={onClose}>
          <AppIcon />
        </div>
      </div>
      <div className="app-frame__buttons">
        <FrameButton
          data-testid="btn-minimize"
          icon={<VscChromeMinimize />}
          onClick={onMinimize}
        />
        <FrameButton
          data-testid="btn-maximize"
          icon={isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
          onClick={onMaximize}
        />
        <FrameButton
          close
          data-testid="btn-close"
          icon={<VscChromeClose />}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default AppFrame;
