import renderer from 'react-test-renderer';

import Heading1 from '../../../components/common/Heading1';

describe(`${Heading1.name}`, () => {
  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer
        .create(<Heading1 value="value for heading" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
