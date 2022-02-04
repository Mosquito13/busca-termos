import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';
import { FiAirplay } from 'react-icons/fi';

import Button from '../../../components/common/Button';

describe(`${Button.name}`, () => {
  describe('tests', () => {
    let wrapper, onClickSpy;

    beforeAll(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => false);

      onClickSpy = jest.fn();

      wrapper = shallow(<Button text="A text" onClick={onClickSpy} />);
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.button')).toHaveLength(1);
    });

    it('should call onClick when clicked', () => {
      wrapper.find('.button').simulate('click');
      expect(onClickSpy).toBeCalledTimes(1);
    });

    it('should not call onClick when it is loading', () => {
      wrapper.setProps({ loading: true });
      wrapper.find('.button').simulate('click');
      expect(onClickSpy).toBeCalledTimes(0);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    beforeEach(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => false);
    });

    it('should render with text', () => {
      const tree = renderer
        .create(<Button text="A text" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render borderless', () => {
      const tree = renderer
        .create(<Button text="A text" borderless />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render disabled', () => {
      const tree = renderer
        .create(<Button text="A text" disabled />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render loading', () => {
      const tree = renderer
        .create(<Button text="A text" loading />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with icon', () => {
      const tree = renderer
        .create(<Button icon={<FiAirplay />} tooltip="A tooltip" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with marker', () => {
      const tree = renderer
        .create(<Button icon={<FiAirplay />} marker={<FiAirplay />} tooltip="A tooltip" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with marker in compact layout', () => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => true);

      const tree = renderer
        .create(<Button icon={<FiAirplay />} marker={<FiAirplay />} tooltip="A tooltip" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
