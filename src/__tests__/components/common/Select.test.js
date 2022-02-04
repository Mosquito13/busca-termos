import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { FiActivity } from 'react-icons/fi';

import Select from '../../../components/common/Select';

const optionsMock = [
  {
    icon: <FiActivity />,
    text: 'text1',
    value: 1
  },
  {
    text: 'text2',
    value: 2
  }
];

describe(`${Select.name}`, () => {
  describe('tests', () => {
    let wrapper, onChangeSpy;

    beforeAll(() => {
      onChangeSpy = jest.fn();

      wrapper = mount(<Select options={optionsMock} onChange={onChangeSpy} />);
    });

    it('should render', () => {
      expect(wrapper.find('.select')).toHaveLength(1);
      expect(wrapper.find('[data-testid="select-option"]')).toHaveLength(2);
    });

    it('should open dropdown', () => {
      expect(wrapper.find('.select__dropdown')).toHaveLength(1);
      expect(wrapper.find('.select__dropdown--active')).toHaveLength(0);

      wrapper.find('.select__field-container').simulate('click');

      expect(wrapper.find('.select__dropdown')).toHaveLength(1);
      expect(wrapper.find('.select__dropdown--active')).toHaveLength(1);
    });

    it('should close dropdown', () => {
      expect(wrapper.find('.select__dropdown')).toHaveLength(1);
      expect(wrapper.find('.select__dropdown--active')).toHaveLength(1);

      act(() => {
        global.document.dispatchEvent(new Event('click'));
      });
      wrapper.setProps({});

      act(() => {
        global.document.dispatchEvent(new Event('click'));
      });
      wrapper.setProps({});

      expect(wrapper.find('.select__dropdown')).toHaveLength(1);
      expect(wrapper.find('.select__dropdown--active')).toHaveLength(0);
    });

    it('should fire onChange when select option', () => {
      wrapper.find('[data-testid="select-option"]').at(1).props().onSelect();
      expect(onChangeSpy).toBeCalledTimes(1);
      expect(onChangeSpy).toBeCalledWith(2);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer.create(<Select options={optionsMock} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
