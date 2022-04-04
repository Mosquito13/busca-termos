import { useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CopyTextButton from '../CopyTextButton';

import './styles.scss';

const InputText = forwardRef(
  ({ placeholder, value, onChange, disabled, borderless, hasCopyButton }, ref) => {
    const classes = classNames(
      'input-text__input',
      disabled && 'input-text__input--disabled',
      borderless && 'input-text__input--borderless'
    );

    const handleChange = useCallback((event) => onChange(event.target.value), [onChange]);

    return (
      <div className="input-text">
        <input
          ref={ref}
          className={classes}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          spellCheck={false}
        />
        {hasCopyButton && (
          <div className="input-text__copy-button">
            <CopyTextButton value={value} />
          </div>
        )}
      </div>
    );
  }
);

InputText.propTypes = {
  /**
   * Placeholder do campo
   */
  placeholder: PropTypes.string,
  /**
   * Valor do campo
   */
  value: PropTypes.string,
  /**
   * Funcao para alterar o valor do campo
   */
  onChange: PropTypes.func,
  /**
   * Indica se esta desabilitado
   */
  disabled: PropTypes.bool,
  /**
   * Indica se deve renderizar sem bordas
   */
  borderless: PropTypes.bool,
  /**
   * Indica se deve mostrar o botao de copiar texto
   */
  hasCopyButton: PropTypes.bool
};

InputText.defaultProps = {
  placeholder: '',
  value: ''
};

InputText.name = 'InputText';

export default InputText;
