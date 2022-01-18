import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Table, { SMALL, AUTO } from '../common/Table';

import settingsSelectors from '../../selectors/settings';
import coreSelectors from '../../selectors/core';
import searchUtils from '../../utils/searchUtils';

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

    return searchUtils.applyFilter(data, filter, mainLanguage);
  }, [loading, data, filter, mainLanguage]);

  return (
    <Table idField="id" data={filteredData} columns={columnsConfiguration} />
  );
};

export default memo(LanguageTable);
