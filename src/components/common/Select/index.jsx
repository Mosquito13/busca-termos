import { useCallback, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SelectOption from './SelectOption';
import Icon from '../Icon';

import './styles.scss';

const Select = ({ options, value, onChange, useRoundIconBorder }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = useCallback(
    () => setShowDropdown(!showDropdown),
    [setShowDropdown, showDropdown]
  );
  const closeDropdown = useCallback(() => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  }, [setShowDropdown, showDropdown]);

  useEffect(() => {
    document.body.addEventListener('click', closeDropdown);

    return () => document.body.removeEventListener('click', closeDropdown);
  }, [closeDropdown]);

  const selectedValue = options?.find((o) => o.value === value);

  const classesFieldContainer = classNames(
    'select__field-container',
    showDropdown && 'select__field-container--active'
  );

  const classesDropdown = classNames(
    'select__dropdown',
    showDropdown && 'select__dropdown--active'
  );

  return (
    <div className="select">
      <div className={classesFieldContainer} onClick={toggleDropdown}>
        <div className="select__field">
          <SelectOption
            icon={selectedValue?.icon}
            text={selectedValue?.text}
            useRoundIconBorder={useRoundIconBorder}
          />
        </div>
        <div className="select__field-icon">
          <Icon>
            <FiChevronDown />
          </Icon>
        </div>
      </div>
      <div className={classesDropdown}>
        {options?.map((option, index) => (
          <SelectOption
            key={index}
            icon={option.icon}
            text={option.text}
            selected={option.value === value}
            onSelect={() => onChange(option.value)}
            useRoundIconBorder={useRoundIconBorder}
          />
        ))}
      </div>
    </div>
  );
};

Select.propTypes = {
  /**
   * Opcoes disponiveis no select
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  /**
   * Valor atual do campo (deve bater com o value do options)
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Funcao para alterar o valor do campo
   */
  onChange: PropTypes.func,
  /**
   * Indica se mostra uma borda redonda em volta do icone
   */
  useRoundIconBorder: PropTypes.bool
};

export default Select;
