import { shallow } from 'enzyme';

import Button from '../../../components/common/Button';

describe(`${Button.name} tests`, () => {
  it('should render', () => {
    const wrapper = shallow(<Button text="btn_text" onClick={jest.fn()} />);

    expect(wrapper.isEmptyRender()).toBeFalsy();

    wrapper.unmount();
  });
});
