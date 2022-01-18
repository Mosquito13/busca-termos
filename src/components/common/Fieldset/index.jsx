import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const Fieldset = ({ noMarginTop, title, children }) => {
  const classes = classNames(
    'fieldset',
    noMarginTop && 'fieldset--no-margin-top'
  );

  return (
    <fieldset className={classes}>
      <legend className="fieldset__title">{title}</legend>
      {children}
    </fieldset>
  );
};

Fieldset.propTypes = {
  /**
   * Titulo do fieldset
   */
  title: PropTypes.string,
  /**
   * Conteudo
   */
  children: PropTypes.node,
  /**
   * Indica se nao vai ter margem superior
   */
  noMarginTop: PropTypes.bool
};

export default Fieldset;
