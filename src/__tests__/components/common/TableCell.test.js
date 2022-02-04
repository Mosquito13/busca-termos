import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import TableCell, { SMALL } from '../../../components/common/Table/TableCell';

describe(`${TableCell.name}`, () => {
  describe('tests', () => {
    let wrapper, onSelectSpy;

    beforeAll(() => {
      onSelectSpy = jest.fn();

      wrapper = shallow(
        <TableCell
          value="A value"
          onSelect={onSelectSpy}
          id="666_123"
          itemId="666"
        />
      );
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.table__cell')).toHaveLength(1);
      expect(wrapper.text()).toContain('A value');
    });

    it('should fire onSelect', () => {
      wrapper.find('.table__cell').simulate('click');
      expect(onSelectSpy).toBeCalledTimes(1);
      expect(onSelectSpy).toBeCalledWith('666', '666_123', 'A value');
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer.create(<TableCell value="123" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with odd modifier', () => {
      const tree = renderer.create(<TableCell odd value="123" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with header modifier', () => {
      const tree = renderer.create(<TableCell header value="123" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with selected modifier', () => {
      const tree = renderer.create(<TableCell selected value="123" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with small modifier', () => {
      const tree = renderer
        .create(<TableCell size={SMALL} value="123" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
