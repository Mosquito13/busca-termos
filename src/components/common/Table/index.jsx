import { useCallback } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';

import { SMALL, AUTO } from './TableCell';
import EmptyState from './EmptyState';
import TableRow from './TableRow';

import coreActions from '../../../actions/core';
import coreSelectors from '../../../selectors/core';

import './styles.scss';

const isOdd = (index) => index % 2 !== 0;

const Table = ({ data, columns, idField }) => {
  const dispatch = useDispatch();
  const selectedItemId = useSelector(coreSelectors.getSelectedItemId);
  const onSelectRow = useCallback(
    (id) => dispatch(coreActions.setSelectedItemId(id)),
    [dispatch]
  );

  return (
    <div className="table">
      <div className="table__header">
        <TableRow header columns={columns} />
      </div>
      <div className="table__body">
        {Boolean(!data?.length) && <EmptyState />}
        {Boolean(data?.length) && (
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                width={width}
                height={height}
                itemSize={30}
                itemCount={data.length}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <TableRow
                      data={data[index]}
                      columns={columns}
                      odd={isOdd(index)}
                      onSelect={onSelectRow}
                      selected={selectedItemId === data[index][idField]}
                      idField={idField}
                    />
                  </div>
                )}
              </FixedSizeList>
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  );
};

Table.propTypes = {
  /**
   * Campo unico dos dados que para identificacao da linha
   */
  idField: PropTypes.string.isRequired,
  /**
   * Dados para exibicao
   */
  data: PropTypes.array,
  /**
   * Configuracao das colunas da tabela
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      dataKey: PropTypes.string,
      size: PropTypes.oneOf([SMALL, AUTO])
    })
  )
};

export { SMALL, AUTO };
export default Table;
