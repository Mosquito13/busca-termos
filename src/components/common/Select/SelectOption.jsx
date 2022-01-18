import PropTypes from 'prop-types';
import classNames from 'classnames';

const SelectOption = ({ icon, text, selected, onSelect, useRoundIconBorder }) => {
  const optionClasses = classNames(
    'select__option',
    selected && 'select__option--selected',
    !onSelect && 'select__option--unselectable'
  );

  const iconClasses = classNames(
    'select__option-icon',
    useRoundIconBorder && 'select__option-icon--rounded-border'
  );

  return (
    <div className={optionClasses} onClick={onSelect}>
      {icon && <div className={iconClasses}>{icon}</div>}
      <div className="select__option-text">{text}</div>
    </div>
  );
};

SelectOption.propTypes = {
  /**
   * Icone do item
   */
  icon: PropTypes.node,
  /**
   * Texto exibido no item
   */
  text: PropTypes.string,
  /**
   * Indica se e o item selecionado
   */
  selected: PropTypes.bool,
  /**
   * Funcao executada ao selecionar um item
   */
  onSelect: PropTypes.func,
  /**
   * Indica se mostra uma borda redonda em volta do icone
   */
  useRoundIconBorder: PropTypes.bool
};

export default SelectOption;
