import { useSelector } from 'react-redux';
import orderBy from 'lodash/orderBy';
import chunk from 'lodash/chunk';

import { languageMapping } from '../../mapping/languages';
import TranslationField from '../TranslationField';

import settingsSelectors from '../../selectors/settings';

import './styles.scss';

const TranslationsPanel = () => {
  const mainLanguage = useSelector(settingsSelectors.getMainLanguage);
  const translation = useSelector(settingsSelectors.getTranslation);

  const fields = [];

  orderBy(languageMapping, ['title']).forEach(({ id, title, getIcon }) => {
    if (id !== mainLanguage && translation[id]) {
      fields.push(
        <div key={id} className="translations-panel__field">
          <TranslationField
            id={id}
            title={title}
            FlagIcon={getIcon()}
          />
        </div>
      );
    }
  });

  const fieldsChunks = chunk(fields, 3);

  return (
    <div className="translations-panel">
      <div className="translations-panel__header">
        {'Traduções'}
      </div>
      <div className="translations-panel__fields">
        {fieldsChunks.map((fieldsChunk, idx) => {
          return (
            <div key={idx} className="translations-panel__field-row">
              {fieldsChunk.map(field => field)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TranslationsPanel;
