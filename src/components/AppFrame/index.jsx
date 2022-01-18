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

import frameActions from '../../actions/frame';
import frameSelectors from '../../selectors/frame';

import './styles.scss';

const AppFrame = () => {
  const dispatch = useDispatch();
  const isMaximized = useSelector(frameSelectors.isMaximized);

  const onClose = useCallback(() => dispatch(frameActions.close()), [dispatch]);
  const onMinimize = useCallback(() => dispatch(frameActions.minimize()), [dispatch]);
  const onMaximize = useCallback(() => {
    if (isMaximized) {
      return dispatch(frameActions.unmaximize());
    }
    return dispatch(frameActions.maximize());
  }, [dispatch, isMaximized]);

  useEffect(() => dispatch(frameActions.registerFrameListeners()), [dispatch]);

  return (
    <div className="app-frame">
      <div className="app-frame__title">
        <div className="app-frame__title-icon" onDoubleClick={onClose}>
          <AppIcon />
        </div>
      </div>
      <div className="app-frame__buttons">
        <FrameButton icon={<VscChromeMinimize />} onClick={onMinimize} />
        <FrameButton
          icon={isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
          onClick={onMaximize}
        />
        <FrameButton close icon={<VscChromeClose />} onClick={onClose} />
      </div>
    </div>
  );
};

export default AppFrame;
