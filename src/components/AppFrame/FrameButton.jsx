import classNames from 'classnames';

const FrameButton = ({ close, icon, onClick }) => {
  const classes = classNames(
    'app-frame__button',
    close && 'app-frame__button--close'
  );

  return (
    <button className={classes} onClick={onClick}>
      <div className="app-frame__button-icon">
        {icon}
      </div>
    </button>
  );
};

export default FrameButton;
