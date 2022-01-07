import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const Paragraph = ({ bold, smallFont, children }) => {
  const classes = classNames(
    'paragraph',
    bold && 'paragraph--bold',
    smallFont && 'paragraph--small'
  );

  return <p className={classes}>{children}</p>;
};

Paragraph.propTypes = {
  /**
   * Indica se e negrito
   */
  bold: PropTypes.bool,
  /**
   * Indica se deve renderizar com uma fonte menor do que o normal
   */
  smallFont: PropTypes.bool
};

export default Paragraph;
