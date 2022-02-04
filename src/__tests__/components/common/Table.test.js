import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import Table, { AUTO, SMALL } from '../../../components/common/Table';

const dataMock = [
  {
    uid: 1,
    id: 'id1',
    name: 'name1'
  },
  {
    uid: 2,
    id: 'id2',
    name: 'name2'
  },
  {
    uid: 3,
    id: 'id3',
    name: 'name3'
  }
];

const columnsMock = [
  {
    dataKey: 'id',
    title: 'Id',
    size: SMALL
  },
  {
    dataKey: 'name',
    title: 'Name',
    size: AUTO
  }
];

jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }) =>
      children({ height: 500, width: 500 })
);

describe(`${Table.name}`, () => {
  describe('tests', () => {
    let wrapper, dispatchMock;

    beforeAll(() => {
      dispatchMock = jest.fn();

      jest
        .spyOn(reactRedux, 'useDispatch')
        .mockImplementation(() => dispatchMock);
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => false);

      Object.assign(global.navigator, {
        clipboard: {
          writeText: jest.fn()
        }
      });

      wrapper = mount(
        <Table idField="uid" data={dataMock} columns={columnsMock} />
      );
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('[data-testid="empty-state"]')).toHaveLength(0);
      expect(wrapper.find('[data-testid="table-row"]')).toHaveLength(3);
      expect(
        wrapper.find('[data-testid="fixed-size-list"]').props().itemSize
      ).toBe(30);
    });

    it('should fire select', () => {
      act(() => {
        wrapper.find('[data-testid="table-row"]').at(1).props().onSelect();
      });
      wrapper.update();
      expect(dispatchMock).toBeCalledTimes(1);
    });

    it('should render with compact layout', () => {
      wrapper.unmount();
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => true);

      wrapper = mount(
        <Table idField="uid" data={dataMock} columns={columnsMock} />
      );

      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('[data-testid="empty-state"]')).toHaveLength(0);
      expect(wrapper.find('[data-testid="table-row"]')).toHaveLength(3);
      expect(
        wrapper.find('[data-testid="fixed-size-list"]').props().itemSize
      ).toBe(24);
    });

    it('should render empty state', () => {
      wrapper.setProps({ data: [] });
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('[data-testid="empty-state"]')).toHaveLength(1);
      expect(wrapper.find('[data-testid="table-row"]')).toHaveLength(0);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render with default layout', () => {
      jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => jest.fn());
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => false);

      const tree = renderer
        .create(<Table idField="uid" data={dataMock} columns={columnsMock} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with compact layout', () => {
      jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => jest.fn());
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => true);

      const tree = renderer
        .create(<Table idField="uid" data={dataMock} columns={columnsMock} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
