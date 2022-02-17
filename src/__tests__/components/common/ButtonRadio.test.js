import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ButtonRadio from '../../../components/common/ButtonRadio';

const textOptions = [
  {
    value: 1,
    text: 'One'
  },
  {
    value: 2,
    text: 'Two'
  }
];

const customOptions = [
  {
    value: 1,
    text: 'One',
    customContent: <div>{'Custom option one'}</div>
  },
  {
    value: 2,
    text: 'Two',
    customContent: <div>{'Custom option two'}</div>
  },
  {
    value: 3,
    text: 'Three',
    customContent: <div>{'Custom option three'}</div>
  }
];

describe(`${ButtonRadio}`, () => {
  describe('tests', () => {
    let wrapper, onChangeSpy;

    beforeAll(() => {
      onChangeSpy = jest.fn();

      wrapper = shallow(
        <ButtonRadio value={1} onChange={onChangeSpy} options={textOptions} />
      );
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.button-radio')).toHaveLength(1);
      expect(wrapper.find('.button-radio__option')).toHaveLength(2);
    });

    it('should call onChange when click', () => {
      wrapper.find('.button-radio__option').at(1).simulate('click');
      expect(onChangeSpy).toBeCalledTimes(1);
      expect(onChangeSpy).toBeCalledWith(2);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render with text options', () => {
      const tree = renderer
        .create(
          <ButtonRadio options={textOptions} onChange={jest.fn()} value={1} />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with custom options', () => {
      const tree = renderer
        .create(
          <ButtonRadio options={customOptions} onChange={jest.fn()} value={1} />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
