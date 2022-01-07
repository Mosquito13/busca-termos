import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableCell, { SMALL, AUTO } from './TableCell';

const buildCells = (header, columns, data, onSelect) =>
  columns.map(({ title, dataKey, size }) => {
    const keyPrefix = header ? 'head_' : 'col_';
    const value = header ? title : data[dataKey];

    return (
      <TableCell
        key={`${keyPrefix}${dataKey}`}
        size={size}
        value={value}
        onSelect={onSelect}
      />
    );
  });

const TableRow = ({
  header,
  columns,
  data,
  odd,
  selected,
  onSelect,
  idField
}) => {
  const classes = classNames(
    'table__row',
    odd && 'table__row--odd',
    header && 'table__row--header',
    selected && 'table__row--selected'
  );

  return (
    <div className={classes} onClick={() => onSelect?.(data[idField])}>
      {buildCells(header, columns, data, onSelect)}
    </div>
  );
};

TableRow.propTypes = {
  /**
   * Indica se a linha e do cabecalho
   */
  header: PropTypes.bool,
  /**
   * Dados para a linha
   */
  data: PropTypes.object,
  /**
   * Indica se e impar para usar a zebra
   */
  odd: PropTypes.bool,
  /**
   * Configuracao das colunas da tabela/linha
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      dataKey: PropTypes.string,
      size: PropTypes.oneOf([SMALL, AUTO])
    })
  )
};

export default TableRow;
