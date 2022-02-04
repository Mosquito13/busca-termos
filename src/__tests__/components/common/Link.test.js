import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { FiAward } from 'react-icons/fi';

import Link from '../../../components/common/Link';

describe(`${Link.name}`, () => {
  describe('tests', () => {
    let wrapper, onClickSpy;

    beforeAll(() => {
      onClickSpy = jest.fn();

      wrapper = shallow(<Link value="Text" onClick={onClickSpy} />);
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.link')).toHaveLength(1);
      expect(wrapper.text()).toContain('Text');
    });

    it('should fire onClick', () => {
      wrapper.find('.link').simulate('click');
      expect(onClickSpy).toBeCalledTimes(1);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render without icon', () => {
      const tree = renderer.create(<Link value="Text" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with icon', () => {
      const tree = renderer
        .create(<Link value="Text" icon={<FiAward />} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
