import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PacmanLoader } from 'react-spinners';

import './styles.scss';

const Loading = ({ show }) => {
  const classes = classNames(
    'loading',
    !show && 'loading--loaded'
  );

  return (
    <div className={classes}>
      <div className="loading__icon">
        <PacmanLoader size={50} speedMultiplier={2} color="currentColor" />
      </div>
    </div>
  );
};

Loading.propTypes = {
  /**
   * Indica se exibe o carregando
   */
  show: PropTypes.bool
};

export default Loading;
