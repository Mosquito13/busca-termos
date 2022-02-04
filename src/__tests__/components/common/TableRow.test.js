import renderer from 'react-test-renderer';

import TableRow from '../../../components/common/Table/TableRow';
import { AUTO, SMALL } from '../../../components/common/Table/TableCell';

const columnsMock = [
  {
    dataKey: 'id',
    title: 'Id',
    size: SMALL
  },
  {
    dataKey: 'nm',
    title: 'Name',
    size: AUTO
  }
];

const dataMock = {
  uid: 123123123,
  id: 'An id',
  nm: 'A name'
};

describe(`${TableRow.name}`, () => {
  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer
        .create(
          <TableRow columns={columnsMock} data={dataMock} idField="uid" />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with header modifier', () => {
      const tree = renderer
        .create(
          <TableRow
            header
            columns={columnsMock}
            data={dataMock}
            idField="uid"
          />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
