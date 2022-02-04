import renderer from 'react-test-renderer';
import { FiAlertOctagon } from 'react-icons/fi';

import Icon, {
  EXTRA_SMALL,
  SMALL,
  MEDIUM,
  LARGE,
  RESPONSIVE
} from '../../../components/common/Icon';

describe(`${Icon.name}`, () => {
  it('should render extra small', () => {
    const tree = renderer
      .create(
        <Icon size={EXTRA_SMALL}>
          <FiAlertOctagon />
        </Icon>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render small', () => {
    const tree = renderer
      .create(
        <Icon size={SMALL}>
          <FiAlertOctagon />
        </Icon>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render medium', () => {
    const tree = renderer
      .create(
        <Icon size={MEDIUM}>
          <FiAlertOctagon />
        </Icon>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render large', () => {
    const tree = renderer
      .create(
        <Icon size={LARGE}>
          <FiAlertOctagon />
        </Icon>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render responsive', () => {
    const tree = renderer
      .create(
        <Icon size={RESPONSIVE}>
          <FiAlertOctagon />
        </Icon>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
