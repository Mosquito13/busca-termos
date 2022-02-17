import renderer from 'react-test-renderer';

import TranslationLayoutSelector from '../../components/TranslationLayoutSelector';

describe(`${TranslationLayoutSelector}`, () => {
  describe('snapshots', () => {
    it('should render', () => {
      const tree = renderer
        .create(<TranslationLayoutSelector value={2} onChange={jest.fn()} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
