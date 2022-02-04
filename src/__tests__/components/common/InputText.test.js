import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import InputText from '../../../components/common/InputText';

describe(`${InputText.name}`, () => {
  describe('tests', () => {
    let wrapper, onChangeSpy;

    beforeAll(() => {
      onChangeSpy = jest.fn();

      wrapper = shallow(
        <InputText
          value=""
          onChange={onChangeSpy}
          placeholder="A placeholder"
        />
      );
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.input-text')).toHaveLength(1);
      expect(wrapper.find('.input-text__input')).toHaveLength(1);
    });

    it('should call onChange', () => {
      wrapper
        .find('.input-text__input')
        .simulate('change', { target: { value: 'newValue' } });
      expect(onChangeSpy).toBeCalledTimes(1);
      expect(onChangeSpy).toBeCalledWith('newValue');
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render without modifier', () => {
      const tree = renderer.create(<InputText />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render borderless', () => {
      const tree = renderer.create(<InputText borderless />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render disabled', () => {
      const tree = renderer.create(<InputText disabled />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
