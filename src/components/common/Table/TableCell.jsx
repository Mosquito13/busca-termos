import PropTypes from 'prop-types';
import classNames from 'classnames';

const SMALL = 'small';
const AUTO = 'auto';

const TableCell = ({ size, value }) => {
  const classes = classNames(
    'table__cell',
    size === SMALL && 'table__cell--small'
  );

  return <div className={classes}>{value}</div>;
};

TableCell.propTypes = {
  /**
   * Valor a ser exibido
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Tamanho da celula
   */
  size: PropTypes.oneOf([SMALL, AUTO])
};

export { SMALL, AUTO };
export default TableCell;
