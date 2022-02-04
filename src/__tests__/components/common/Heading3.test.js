import renderer from 'react-test-renderer';

import Heading3 from '../../../components/common/Heading3';

describe(`${Heading3.name}`, () => {
  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer
        .create(<Heading3 value="value for heading" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
