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
      <div className={classesLabel} onClick={handleChange}>{label}</div>
    </div>
  );
};

export default Toggle;
