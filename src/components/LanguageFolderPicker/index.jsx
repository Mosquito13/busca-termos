import { useCallback, useRef } from 'react';
import { FiXOctagon, FiMoreHorizontal } from 'react-icons/fi';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon, { EXTRA_SMALL } from '../common/Icon';
import InputText from '../common/InputText';
import Button from '../common/Button';

import './styles.scss';

const getErrorMessage = (error) => {
  if (!Boolean(error)) {
    return '';
  }

  return (
    <>
      <div className="language-folder-picker__error-icon">
        <Icon size={EXTRA_SMALL}>
          <FiXOctagon />
        </Icon>
      </div>
      <div className="language-folder-picker__error-message">{error}</div>
    </>
  );
};

const LanguageFolderPicker = ({ value, error, onChange, disabled }) => {
  const inputFileRef = useRef();

  const handleClickButtonFind = useCallback(() => {
    inputFileRef.current.click();
  }, []);

  const onChangeFolder = useCallback(
    (event) => {
      if (event.currentTarget.files.length === 0) {
        return;
      }

      const folderPath = event.currentTarget.files[0].path.split('\\');

      folderPath.pop();
      onChange(folderPath.join('/'));
    },
    [onChange]
  );

  const errorClasses = classNames(
    'language-folder-picker__error',
    !Boolean(error) && 'language-folder-picker__error--hidden'
  );

  return (
    <div className="language-folder-picker">
      <div className="language-folder-picker__fields">
        <InputText
          value={value}
          onChange={onChange}
          placeholder="Caminho até a pasta language..."
          disabled={disabled}
        />
        <div className="language-folder-picker__button">
          <Button
            icon={
              <Icon>
                <FiMoreHorizontal />
              </Icon>
            }
            tooltip="Selecionar pasta..."
            onClick={handleClickButtonFind}
            disabled={disabled}
          />
        </div>
        <input
          className="language-folder-picker__input-file"
          onChange={onChangeFolder}
          ref={inputFileRef}
          type="file"
          id="filepicker"
          name="fileList"
          webkitdirectory=""
          directory=""
        />
      </div>
      <div className={errorClasses}>{getErrorMessage(error)}</div>
    </div>
  );
};

LanguageFolderPicker.propTypes = {
  /**
   * Valor do campo
   */
  value: PropTypes.string,
  /**
   * Mensagem de erro no campo
   */
  error: PropTypes.string,
  /**
   * Funcao para trocar o valor do campo
   */
  onChange: PropTypes.func,
  /**
   * Indica se esta desabilitado
   */
  disabled: PropTypes.bool
};

export default LanguageFolderPicker;
