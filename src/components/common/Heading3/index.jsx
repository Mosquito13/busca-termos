import PropTypes from 'prop-types';

import './styles.scss';

const Heading3 = ({ value }) => <h3 className="heading-3">{value}</h3>;

Heading3.propTypes = {
  /**
   * Valor do cabecalho
   */
  value: PropTypes.string
};

export default Heading3;
