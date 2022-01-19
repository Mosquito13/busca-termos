import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ClipLoader } from 'react-spinners';

import Icon, { RESPONSIVE } from '../Icon';
import settingsSelectors from '../../../selectors/settings';

import './styles.scss';

const getContent = (text, icon, loading) => {
  if (loading) {
    return <ClipLoader size={25} color="currentColor" />;
  }

  return icon || text;
};

const Button = ({ text, icon, marker, tooltip, onClick, loading, disabled, borderless }) => {
  const compactLayout = useSelector(settingsSelectors.isCompactLayout);

  const classes = classNames(
    'button',
    borderless && 'button--borderless',
    icon && 'button--with-icon',
    loading && 'button--loading',
    disabled && 'button--disabled'
  );

  const handleClick = useCallback(() => {
    if (loading) {
      return false;
    }

    onClick();
  }, [loading, onClick]);

  return (
    <button
      className={classes}
      title={tooltip}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className="button__content">{getContent(text, icon, loading)}</div>
      {marker && (
        <div className="button__marker">
          <Icon size={RESPONSIVE}>
            {!compactLayout && marker}
          </Icon>
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  /**
   * Texto exibido dentro do botao
   */
  text: PropTypes.string,
  /**
   * Icone exibido dentro do botao
   */
  icon: PropTypes.node,
  /**
   * Hint do botao
   */
  tooltip: PropTypes.string,
  /**
   * Acao ao clicar
   */
  onClick: PropTypes.func,
  /**
   * Indica se esta carregando, nao dispara o onClick se estiver carregando
   */
  loading: PropTypes.bool,
  /**
   * Indica se esta desabilitado
   */
  disabled: PropTypes.bool,
  /**
   * Indica se o botao deve ter borda invisivel
   */
  borderless: PropTypes.bool
};

export default Button;
