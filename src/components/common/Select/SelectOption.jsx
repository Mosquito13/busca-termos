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
      {icon && (
        <div className={iconClasses}>{icon}</div>
      )}
      <div className="select__option-text">{text}</div>
    </div>
  );
};

export default SelectOption;
