import renderer from 'react-test-renderer';

import Fieldset from '../../../components/common/Fieldset';

describe(`${Fieldset.name}`, () => {
  describe('snapshots', () => {
    it('should render normally', () => {
      const tree = renderer
        .create(
          <Fieldset>
            <div />
          </Fieldset>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render without margin top', () => {
      const tree = renderer
        .create(
          <Fieldset noMarginTop>
            <div />
          </Fieldset>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
