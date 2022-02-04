import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import EmptyState from '../../../components/common/Table/EmptyState';

describe(`${EmptyState.name}`, () => {
  describe('tests', () => {
    let wrapper;

    beforeAll(() => {
      jest.useFakeTimers();

      wrapper = mount(<EmptyState />);
    });

    it('should render without fancy image', () => {
      expect(wrapper.find('.table__empty-state')).toHaveLength(1);
      expect(
        wrapper.find('.table__empty-state-image-wrapper--open')
      ).toHaveLength(0);
    });

    it('should render with fancy image', () => {
      act(() => {
        jest.runAllTimers();
      });
      wrapper.update();
      expect(
        wrapper.find('.table__empty-state-image-wrapper--open')
      ).toHaveLength(1);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer.create(<EmptyState />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
