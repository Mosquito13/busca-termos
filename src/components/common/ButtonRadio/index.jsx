import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const getOption = (option, value, onChange) => {
  const customProps = {};

  if (option.customContent) {
    customProps.title = option.text;
  }

  const optionClasses = classNames(
    'button-radio__option',
    value === option.value && 'button-radio__option--selected'
  );

  return (
    <button
      key={`option_${option.value}`}
      className={optionClasses}
      {...customProps}
      onClick={() => onChange(option.value)}
    >
      {option.customContent || option.text}
    </button>
  );
};

const ButtonRadio = ({ options, onChange, value }) => {
  return (
    <div className="button-radio">
      {options.map(option => getOption(option, value, onChange))}
    </div>
  );
};

ButtonRadio.propTypes = {
  /**
   * Opcoes do campo
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Texto exibido dentro da opcao
       * Se for passado um customContent, o text vira tooltip
       */
      text: PropTypes.string,
      /**
       * Conteudo do botao
       * Sobrescreve text
       */
      customContent: PropTypes.node,
      /**
       * Valor quando selecionado
       */
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  /**
   * Funcao para alterar o valor
   */
  onChange: PropTypes.func,
  /**
   * Valor selecionado
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default ButtonRadio;
