import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import Heading3 from '../../components/common/Heading3';
import Paragraph from '../../components/common/Paragraph';
import Icon, { LARGE } from '../../components/common/Icon';
import LanguageFolderPicker from '../../components/LanguageFolderPicker';

import settingsActions from '../../actions/settings';
import settingsSelectors from '../../selectors/settings';

import './styles.scss';

const ConfigNotFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValid = useSelector(settingsSelectors.isValid);
  const isValidating = useSelector(settingsSelectors.isValidating);
  const languageFolder = useSelector(settingsSelectors.getLanguageFolder);
  const languageFolderError = useSelector(settingsSelectors.getLanguageFolderError);

  useEffect(() => {
    if (isValid) {
      navigate('/');
    }
  }, [isValid, navigate]);

  const handleChangeLanguageFolder = useCallback(
    (value) => {
      dispatch(settingsActions.setLanguageFolder(value));
    },
    [dispatch]
  );

  const onClickValidate = useCallback(() => {
    dispatch(settingsActions.validateAndSaveFirstSettings(languageFolder));
  }, [dispatch, languageFolder]);

  return (
    <div className="config-not-found">
      <Icon size={LARGE}>
        <FiAlertTriangle />
      </Icon>
      <div className="config-not-found__message">
        <div className="config-not-found__message-title">
          <Heading3>{'Configuração não encontrada.'}</Heading3>
        </div>
        <div className="config-not-found__message-help">
          <Paragraph>
            {
              'Insira ou selecione o caminho até a pasta language do seu repositório.'
            }
          </Paragraph>
        </div>
        <div className="config-not-found__message-help-example">
          <Paragraph smallFont>
            {
              'A pasta language fica em {{seu_repositorio}}/System/web/include/language'
            }
          </Paragraph>
        </div>
      </div>
      <div className="config-not-found__folder-picker">
        <LanguageFolderPicker
          value={languageFolder}
          error={languageFolderError}
          onChange={handleChangeLanguageFolder}
          disabled={isValidating}
        />
      </div>
      <div className="config-not-found__btn-validate">
        <Button
          text="Validar e salvar"
          loading={isValidating}
          onClick={onClickValidate}
        />
      </div>
    </div>
  );
};

export default ConfigNotFound;
