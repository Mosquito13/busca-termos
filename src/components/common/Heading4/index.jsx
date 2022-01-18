import PropTypes from 'prop-types';

import './styles.scss';

const Heading4 = ({ value }) => <h4 className="heading-4">{value}</h4>;

Heading4.propTypes = {
  /**
   * Valor do cabecalho
   */
  value: PropTypes.string
};

export default Heading4;
