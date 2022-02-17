import PropTypes from 'prop-types';
import times from 'lodash/times';

import ButtonRadio from '../common/ButtonRadio';

import './styles.scss';

const getCustomContent = value => (
  <div className="translation-layout-selector__custom-content">
    {times(value, (v) => <span key={`span_${v}`} />)}
  </div>
);

const TranslationLayoutSelector = ({ value, onChange }) => {
  return (
    <div className="translation-layout-selector">
      <ButtonRadio
        value={value}
        onChange={onChange}
        options={[
          {
            value: 1,
            text: 'Uma coluna',
            customContent: getCustomContent(1)
          },
          {
            value: 2,
            text: 'Duas colunas',
            customContent: getCustomContent(2)
          },
          {
            value: 3,
            text: 'Três colunas',
            customContent: getCustomContent(3)
          }
        ]}
      />
    </div>
  );
};

TranslationLayoutSelector.propTypes = {
  /**
   * Valor
   */
  value: PropTypes.number,
  /**
   * Funcao para alterar o valor
   */
  onChange: PropTypes.func
};

export default TranslationLayoutSelector;
