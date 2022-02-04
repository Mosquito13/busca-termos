import renderer from 'react-test-renderer';

import Paragraph from '../../../components/common/Paragraph';

describe(`${Paragraph.name}`, () => {
  describe('snapshots', () => {
    it('should render default', () => {
      const tree = renderer.create(<Paragraph value="text" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with bold font', () => {
      const tree = renderer.create(<Paragraph bold value="text" />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with small font', () => {
      const tree = renderer
        .create(<Paragraph smallFont value="text" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
