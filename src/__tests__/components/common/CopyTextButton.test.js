import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import CopyTextButton from '../../../components/common/CopyTextButton';

describe(`${CopyTextButton.name}`, () => {
  describe('tests', () => {
    let wrapper;

    beforeAll(() => {
      Object.assign(global.navigator, {
        clipboard: {
          writeText: jest.fn()
        }
      });

      wrapper = shallow(<CopyTextButton value="A value" />);
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.copy-text-button')).toHaveLength(1);
    });

    it('should set value to clipboard when click', () => {
      wrapper.find('.copy-text-button').simulate('click');
      expect(global.navigator.clipboard.writeText).toBeCalled();
      expect(global.navigator.clipboard.writeText).toBeCalledWith('A value');
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render with margin right', () => {
      const tree = renderer.create(<CopyTextButton value="abc" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render without margin right', () => {
      const tree = renderer
        .create(<CopyTextButton noMarginRight value="abc" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
