import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as EmptyStateImage } from '../../../assets/svg/emptystate.svg';
import Heading4 from '../Heading4';

const EmptyState = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const imageTimeout = setTimeout(() => setShowImage(true), 3000);

    return () => {
      clearTimeout(imageTimeout);
      setShowImage(false);
    };
  }, []);

  const imageWrapperClasses = classNames(
    'table__empty-state-image-wrapper',
    showImage && 'table__empty-state-image-wrapper--open'
  );

  return (
    <div className="table__empty-state">
      <div className="table__empty-state-message">
        <Heading4 value="Nenhum resultado encontrado." />
      </div>
      <div className={imageWrapperClasses}>
        <div className="table__empty-state-image">
          <EmptyStateImage />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
