import renderer from 'react-test-renderer';

import Loading from '../../../components/common/Loading';

describe(`${Loading.name}`, () => {
  describe('snapshots', () => {
    it('should render without show', () => {
      const tree = renderer.create(<Loading />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with show', () => {
      const tree = renderer.create(<Loading show />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
