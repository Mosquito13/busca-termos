import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const EXTRA_SMALL = 1;
const SMALL = 2;
const MEDIUM = 3;
const LARGE = 4;
const RESPONSIVE = 5;

const Icon = ({ size, children }) => {
  const classes = classNames(
    'icon',
    size === EXTRA_SMALL && 'icon--extra-small',
    size === SMALL && 'icon--small',
    size === MEDIUM && 'icon--medium',
    size === LARGE && 'icon--large'
  );

  return <div className={classes}>{children}</div>;
};

Icon.propTypes = {
  /**
   * Tamanho do botao
   */
  size: PropTypes.oneOf([null, EXTRA_SMALL, SMALL, MEDIUM, LARGE, RESPONSIVE])
};

Icon.defaultProps = {
  size: MEDIUM
};

export { EXTRA_SMALL, SMALL, MEDIUM, LARGE, RESPONSIVE };
export default Icon;
