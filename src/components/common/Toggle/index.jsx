import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Toggle = ({ label, icon, value, onChange, disabled }) => {
  const classesInput = classNames(
    'toggle__input',
    value && 'toggle__input--checked',
    disabled && 'toggle__input--disabled'
  );

  const classesCircle = classNames(
    'toggle__circle',
    icon && 'toggle__circle--with-icon',
    value && 'toggle__circle--checked'
  );

  const classesLabel = classNames(
    'toggle__label',
    disabled && 'toggle__label--disabled'
  );

  const handleChange = onChange && !disabled ? onChange : null;
  const IconCmp = icon || '';

  return (
    <div className="toggle">
      <div className={classesInput} onClick={handleChange}>
        <div className={classesCircle}>{IconCmp}</div>
      </div>
      <div className={classesLabel} onClick={handleChange}>
        {label}
      </div>
    </div>
  );
};

Toggle.propTypes = {
  /**
   * Texto exibido ao lado do toggle
   */
  label: PropTypes.string,
  /**
   * Icone exibido dentro do toggle
   */
  icon: PropTypes.node,
  /**
   * Valor (marcado ou nao)
   */
  value: PropTypes.bool,
  /**
   * Funcao executada ao clicar no toggle
   */
  onChange: PropTypes.func,
  /**
   * Indica se esta desabilitado
   */
  disabled: PropTypes.bool
};

export default Toggle;
