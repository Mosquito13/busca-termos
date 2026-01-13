/* istanbul ignore file */
import store from '../store';
import coreSelectors from '../selectors/core';
import settingsSelectors from '../selectors/settings';
import searchUtils from './searchUtils';

const FILE_NAME = 'busca-termos-export.txt';
const FILE_TYPE = 'text/plain';

const buildFileContent = (data) =>
  data
    .map(({ id, content }) => `${id}\t${content}`)
    .join('\n');

const listDownloadUtils = {
  downloadCurrentList() {
    const state = store.getState();

    const data = coreSelectors.getData(state);
    const filter = coreSelectors.getFilter(state);
    const mainLanguage = settingsSelectors.getMainLanguage(state);

    const filteredData = searchUtils.applyFilter(data, filter, mainLanguage);

    const blob = new Blob([buildFileContent(filteredData)], {
      type: FILE_TYPE
    });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = FILE_NAME;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};

export default listDownloadUtils;
