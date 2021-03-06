import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';

import AppFrame from '../../components/AppFrame';
import settingsSelectors from '../../selectors/settings';

import './styles.scss';

const BaseLayout = () => {
  const darkTheme = useSelector(settingsSelectors.isDarkTheme);
  const compactLayout = useSelector(settingsSelectors.isCompactLayout);

  useEffect(() => {
    const htmlDOM = document.getElementsByTagName('html')?.[0];

    if (compactLayout) {
      htmlDOM?.classList?.add?.('compact');
    } else {
      htmlDOM?.classList?.remove?.('compact');
    }
  }, [compactLayout]);

  const classes = classNames(
    'base-layout',
    compactLayout && 'base-layout--compact',
    darkTheme && 'theme--dark',
    !darkTheme && 'theme--light'
  );

  return (
    <div className={classes}>
      <div className="base-layout__frame">
        <AppFrame />
      </div>
      <div className="base-layout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
