import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const Paragraph = ({ value, bold, smallFont }) => {
  const classes = classNames(
    'paragraph',
    bold && 'paragraph--bold',
    smallFont && 'paragraph--small'
  );

  return <p className={classes}>{value}</p>;
};

Paragraph.propTypes = {
  /**
   * Texto do paragrafo
   */
  value: PropTypes.string,
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
