import PropTypes from 'prop-types';

import Icon, { RESPONSIVE } from '../Icon/index';

import './styles.scss';

const Link = ({ value, icon, onClick }) => {
  return (
    <button className="link" onClick={onClick}>
      <div className="link__text">{value}</div>
      {icon && (
        <div className="link__icon">
          <Icon size={RESPONSIVE}>{icon}</Icon>
        </div>
      )}
    </button>
  );
};

Link.propTypes = {
  /**
   * Texto exibido no link
   */
  value: PropTypes.string,
  /**
   * Icone exibido apos o link
   */
  icon: PropTypes.node,
  /**
   * Acao do link
   */
  onClick: PropTypes.func
};

export default Link;
