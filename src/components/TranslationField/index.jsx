import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon, { SMALL } from '../common/Icon';
import InputText from '../common/InputText';

import coreSelectors from '../../selectors/core';
import { loadTranslation } from '../../actions/translation';
import translationSelectors from '../../selectors/translation';

import './styles.scss';

const TranslationField = ({ id, tooltip, icon }) => {
  const dispatch = useDispatch();
  const translation = useSelector((state) => translationSelectors.getTranslation(state, id));
  const selectedTermId = useSelector(coreSelectors.getSelectedItemId);

  useEffect(() => {
    if (selectedTermId) {
      dispatch(loadTranslation(id, selectedTermId));
    }
  }, [dispatch, id, selectedTermId]);

  return (
    <div className="translation-field">
      <div className="translation-field__flag">
        <div className="translation-field__icon" title={tooltip}>
          <Icon size={SMALL}>{icon}</Icon>
        </div>
      </div>
      <InputText
        placeholder="Selecione um item na lista"
        value={translation}
        borderless
        disabled
      />
    </div>
  );
};

TranslationField.propTypes = {
  /**
   * Identificador do idioma
   */
  id: PropTypes.string,
  /**
   * Hint da bandeira do campo
   */
  tooltip: PropTypes.string,
  /**
   * Icone exibido ao lado do campo
   */
  icon: PropTypes.node
};

export default TranslationField;
