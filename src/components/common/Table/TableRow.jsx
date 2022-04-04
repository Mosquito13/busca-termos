import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableCell, { SMALL, AUTO } from './TableCell';

const buildCells = (header, columns, data, onSelect, selectedCell, idField, hasCopyButton, odd) =>
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
        hasCopyButton={hasCopyButton}
        odd={odd}
      />
    );
  });

const TableRow = ({ header, columns, data, odd, selectedCell, onSelect, idField, hasCopyButton }) => {
  const classes = classNames('table__row', header && 'table__row--header');

  return (
    <div className={classes}>
      {buildCells(header, columns, data, onSelect, selectedCell, idField, hasCopyButton, odd)}
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
      /**
       * Titulo da coluna
       */
      title: PropTypes.string,
      /**
       * Nome da chave dos dados
       */
      dataKey: PropTypes.string,
      /**
       * Tamanho da coluna
       */
      size: PropTypes.oneOf([SMALL, AUTO])
    })
  ),
  /**
   * Identificador da celula selecionada
   */
  selectedCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Funcao executada ao selecionar uma celula
   */
  onSelect: PropTypes.func,
  /**
   * Nome da chave dos dados onde deve-se buscar o identificador da linha
   */
  idField: PropTypes.string,
  /**
   * Indica se mostra botao de copiar na celula
   */
  hasCopyButton: PropTypes.bool
};

export default TableRow;
