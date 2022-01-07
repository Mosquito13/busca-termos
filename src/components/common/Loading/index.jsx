import classNames from 'classnames';
import { PacmanLoader } from 'react-spinners';

import './styles.scss';

const Loading = ({ loading }) => {
  const classes = classNames(
    'loading',
    !loading && 'loading--loaded'
  )

  return (
    <div className={classes}>
      <div className="loading__icon">
        <PacmanLoader size={50} speedMultiplier={2} color="currentColor" />
      </div>
    </div>
  );
};

export default Loading;
