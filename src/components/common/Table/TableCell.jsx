import PropTypes from 'prop-types';
import classNames from 'classnames';

const SMALL = 'small';
const AUTO = 'auto';

const TableCell = ({ size, value, header, onSelect, selected, id, itemId, odd }) => {
  const classes = classNames(
    'table__cell',
    odd && 'table__cell--odd',
    header && 'table__cell--header',
    selected && 'table__cell--selected',
    size === SMALL && 'table__cell--small'
  );

  return (
    <div className={classes} onClick={() => onSelect?.(itemId, id, value)}>
      <span className="table__cell-text">{value}</span>
    </div>
  );
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
