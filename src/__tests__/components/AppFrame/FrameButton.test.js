import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import FrameButton from '../../../components/AppFrame/FrameButton';

describe(`${FrameButton.name}`, () => {
  const iconMock = <span className="an-icon" />;

  describe('tests', () => {
    let wrapper, onClickFn;

    beforeAll(() => {
      onClickFn = jest.fn();

      wrapper = shallow(<FrameButton onClick={onClickFn} icon={iconMock} />);
    });

    it('should render default button', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.app-frame__button')).toHaveLength(1);
      expect(wrapper.find('.app-frame__button--close')).toHaveLength(0);
      expect(wrapper.find('.an-icon')).toHaveLength(1);
    });

    it('should render close button', () => {
      wrapper.setProps({ close: true });
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.app-frame__button')).toHaveLength(1);
      expect(wrapper.find('.app-frame__button--close')).toHaveLength(1);
      expect(wrapper.find('.an-icon')).toHaveLength(1);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render default button', () => {
      const tree = renderer
        .create(<FrameButton icon={iconMock} onClick={jest.fn()} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render close button', () => {
      const tree = renderer
        .create(<FrameButton close icon={iconMock} onClick={jest.fn()} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
