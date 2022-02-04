import renderer from 'react-test-renderer';

import Heading4 from '../../../components/common/Heading4';

describe(`${Heading4.name}`, () => {
  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer
        .create(<Heading4 value="value for heading" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
