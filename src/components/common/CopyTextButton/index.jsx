import { useCallback } from 'react';
import { FiCopy } from 'react-icons/fi';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon, { SMALL } from '../Icon';

import './styles.scss';

const CopyTextButton = ({ noMarginRight, value }) => {
  const classes = classNames(
    'copy-text-button',
    noMarginRight && 'copy-text-button--no-margin-right'
  );

  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(value);
  }, [value]);

  return (
    <div className={classes} onClick={handleCopy} title="Copiar">
      <Icon size={SMALL}>
        <FiCopy />
      </Icon>
    </div>
  );
};

CopyTextButton.propTypes = {
  /**
   * Valor para ser copiado
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Se esconde a margem direita
   */
  noMarginRight: PropTypes.bool
};

export default CopyTextButton;
