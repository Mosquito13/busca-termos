import { Outlet } from 'react-router-dom';

import AppFrame from '../../components/AppFrame';

import './styles.scss';

const BaseLayout = () => {
  return (
    <div className="base-layout">
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