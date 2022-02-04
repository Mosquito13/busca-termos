import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { FiAnchor } from 'react-icons/fi';

import SelectOption from '../../../components/common/Select/SelectOption';

describe(`${SelectOption.name}`, () => {
  describe('tests', () => {
    let wrapper, onSelectSpy;

    beforeAll(() => {
      onSelectSpy = jest.fn();

      wrapper = shallow(
        <SelectOption text="option text" onSelect={onSelectSpy} />
      );
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.select__option')).toHaveLength(1);
      expect(wrapper.text()).toContain('option text');
    });

    it('should fire onSelect', () => {
      wrapper.find('.select__option').simulate('click');
      expect(onSelectSpy).toBeCalledTimes(1);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer
        .create(<SelectOption text="option" onSelect={jest.fn()} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with icon', () => {
      const tree = renderer
        .create(
          <SelectOption
            text="option"
            icon={<FiAnchor />}
            onSelect={jest.fn()}
          />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with icon with rounded borders', () => {
      const tree = renderer
        .create(
          <SelectOption
            text="option"
            icon={<FiAnchor />}
            onSelect={jest.fn()}
            useRoundIconBorder
          />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render selected', () => {
      const tree = renderer
        .create(<SelectOption selected text="option" onSelect={jest.fn()} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render unselectable', () => {
      const tree = renderer.create(<SelectOption text="option" />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
