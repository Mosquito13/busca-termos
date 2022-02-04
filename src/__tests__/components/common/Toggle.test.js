import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { FiActivity } from 'react-icons/fi';

import Toggle from '../../../components/common/Toggle';

describe(`${Toggle.name}`, () => {
  describe('tests', () => {
    let wrapper, onChangeSpy;

    beforeAll(() => {
      onChangeSpy = jest.fn();

      wrapper = shallow(<Toggle label="A label" onChange={onChangeSpy} />);
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.toggle')).toHaveLength(1);
    });

    it('should fire onChange', () => {
      wrapper.find('.toggle__input').simulate('click');
      expect(onChangeSpy).toBeCalledTimes(1);
    });

    it('should not fire onChange when it is disabled', () => {
      wrapper.setProps({ disabled: true });
      wrapper.find('.toggle__input').simulate('click');
      expect(onChangeSpy).toBeCalledTimes(0);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render unchecked', () => {
      const tree = renderer.create(<Toggle value={false} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render checked', () => {
      const tree = renderer.create(<Toggle value />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with icon', () => {
      const tree = renderer
        .create(<Toggle value icon={<FiActivity />} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render disabled', () => {
      const tree = renderer.create(<Toggle value disabled />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
