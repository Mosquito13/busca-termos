import { useSelector } from 'react-redux';
import classNames from 'classnames';
import orderBy from 'lodash/orderBy';
import chunk from 'lodash/chunk';

import { languageMapping } from '../../mapping/languages';
import settingsSelectors from '../../selectors/settings';
import TranslationField from '../TranslationField';
import Paragraph from '../common/Paragraph';

import './styles.scss';

const TranslationsPanel = () => {
  const translation = useSelector(settingsSelectors.getTranslation);
  const mainLanguage = useSelector(settingsSelectors.getMainLanguage);
  const translationColumns = useSelector(settingsSelectors.getTranslationColumns);

  const fields = [];

  const fieldClasses = classNames(
    'translations-panel__field',
    `translations-panel__field--columns-${translationColumns}`
  );

  orderBy(languageMapping, ['title']).forEach(({ id, title, getIcon }) => {
    if (id !== mainLanguage && translation[id]) {
      fields.push(
        <div key={id} className={fieldClasses}>
          <TranslationField id={id} tooltip={title} icon={getIcon()} />
        </div>
      );
    }
  });

  const fieldsChunks = chunk(fields, translationColumns);

  return (
    <div className="translations-panel">
      <div className="translations-panel__header">{'Traduções'}</div>
      {fields.length === 0 && (
        <div className="translations-panel__empty-state">
          <Paragraph value="Você pode habilitar traduções através da página de preferências." />
        </div>
      )}
      {fields.length > 0 && (
        <div className="translations-panel__fields">
          {fieldsChunks.map((fieldsChunk, idx) => (
            <div key={idx} className="translations-panel__field-row">
              {fieldsChunk.map((field) => field)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslationsPanel;
