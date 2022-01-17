import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon, { SMALL } from '../common/Icon';
import InputText from '../common/InputText';

import coreSelectors from '../../selectors/core';
import translationActions from '../../actions/translation';
import translationSelectors from '../../selectors/translation';

import './styles.scss';

const TranslationField = ({ id, title, FlagIcon }) => {
  const dispatch = useDispatch();
  const translation = useSelector((state) => translationSelectors.getTranslation(state, id));
  const selectedTermId = useSelector(coreSelectors.getSelectedItemId);

  useEffect(() => {
    if (selectedTermId) {
      dispatch(translationActions.loadTranslation(id, selectedTermId));
    }
  }, [dispatch, id, selectedTermId]);

  return (
    <div className="translation-field">
      <div className="translation-field__flag">
        <div className="translation-field__icon" title={title}>
          <Icon size={SMALL}>{FlagIcon}</Icon>
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

export default TranslationField;
