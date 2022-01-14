import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableCell, { SMALL, AUTO } from './TableCell';

const buildCells = (header, columns, data, onSelect, selectedCell, idField, odd) =>
  columns.map(({ title, dataKey, size }) => {
    const keyPrefix = header ? 'head_' : 'col_';
    const value = header ? title : data[dataKey];
    const cellId = `{${data?.[idField]}_${dataKey}}`;

    return (
      <TableCell
        key={`${keyPrefix}${dataKey}`}
        id={cellId}
        itemId={data?.[idField]}
        size={size}
        value={value}
        header={header}
        onSelect={onSelect}
        selected={selectedCell === cellId}
        odd={odd}
      />
    );
  });

const TableRow = ({
  header,
  columns,
  data,
  odd,
  selectedCell,
  onSelect,
  idField
}) => {
  const classes = classNames(
    'table__row',
    header && 'table__row--header'
  );

  return (
    <div className={classes}>
      {buildCells(header, columns, data, onSelect, selectedCell, idField, odd)}
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
