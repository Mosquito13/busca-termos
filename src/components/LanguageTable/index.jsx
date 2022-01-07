import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Table, { SMALL, AUTO } from '../common/Table';

import coreSelectors from '../../selectors/core';
import settingsSelectors from '../../selectors/settings';

const columnsConfiguration = [
  {
    title: 'Código',
    dataKey: 'id',
    size: SMALL
  },
  {
    title: 'Termo',
    dataKey: 'content',
    size: AUTO
  }
];

const LanguageTable = () => {
  const data = useSelector(coreSelectors.getData);
  const filter = useSelector(coreSelectors.getFilter);
  const loading = useSelector(coreSelectors.isLoading);
  const mainLanguage = useSelector(settingsSelectors.getMainLanguage);

  const filteredData = useMemo(() => {
    if (loading) return [];

    let filterValue = filter.toLowerCase().trim();

    const matchStart = filterValue.charAt(0) === '"';
    const matchEnd = filterValue.charAt(filterValue.length - 1) === '"';

    if (matchStart) filterValue = filterValue.slice(1);
    if (matchEnd) filterValue = filterValue.slice(0, -1);

    return data[mainLanguage].filter(d => {
      const id = `${d.id}`;
      const content = d.content.toLowerCase().trim();

      if (matchStart && matchEnd) return id === filterValue || content === filterValue;
      if (matchStart) return id.startsWith(filterValue) || content.startsWith(filterValue);
      if (matchEnd) return id.endsWith(filterValue) || content.endsWith(filterValue);

      return id.includes(filterValue) || content.includes(filterValue);
    });
  }, [loading, data, filter, mainLanguage]);

  return (
    <Table
      idField="id"
      data={filteredData}
      columns={columnsConfiguration}
    />
  );
};

export default memo(LanguageTable);
