import { useSelector } from 'react-redux';
import orderBy from 'lodash/orderBy';

import { languageMapping } from '../../mapping/languages';
import TranslationField from '../TranslationField';
import Heading4 from '../common/Heading4';

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

  return (
    <div className="translations-panel">
      <div className="translations-panel__header">
        <Heading4>{'Traduções'}</Heading4>
      </div>
      <div className="translations-panel__fields">
        {fields}
      </div>
    </div>
  );
};

export default TranslationsPanel;
