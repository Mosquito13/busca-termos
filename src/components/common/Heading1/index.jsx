import PropTypes from 'prop-types';

import './styles.scss';

const Heading1 = ({ value }) => <h1 className="heading-1">{value}</h1>;

Heading1.propTypes = {
  /**
   * Valor do cabecalho
   */
  value: PropTypes.string
};

export default Heading1;
