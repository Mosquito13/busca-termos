import PropTypes from 'prop-types';
import classNames from 'classnames';

const FrameButton = ({ close, icon, onClick }) => {
  const classes = classNames(
    'app-frame__button',
    close && 'app-frame__button--close'
  );

  return (
    <button className={classes} onClick={onClick}>
      <div className="app-frame__button-icon">{icon}</div>
    </button>
  );
};

FrameButton.propTypes = {
  /**
   * Acao do botao
   */
  onClick: PropTypes.func,
  /**
   * Icone exibido dentro do botao
   */
  icon: PropTypes.node,
  /**
   * Indica se e o botao de fechar
   */
  close: PropTypes.bool
};

export default FrameButton;
