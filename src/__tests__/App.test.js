import { shallow } from 'enzyme';

import App from '../App';

jest.mock('use-keyboard-shortcut', () => jest.fn());
jest.mock('react-redux', () => ({
  useSelector: () => jest.fn(),
  useDispatch: () => jest.fn()
}));

describe(`${App.name} test`, () => {
  it('should render', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
