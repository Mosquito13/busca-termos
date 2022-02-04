import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import LanguageFolderPicker from '../../components/LanguageFolderPicker';

describe(`${LanguageFolderPicker.name}`, () => {
  describe('tests', () => {
    let wrapper, onChangeSpy;

    beforeAll(() => {
      onChangeSpy = jest.fn();

      wrapper = shallow(<LanguageFolderPicker onChange={onChangeSpy} />);
    });

    it('should render', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(wrapper.find('.language-folder-picker')).toHaveLength(1);
      expect(
        wrapper.find('.language-folder-picker__error-message')
      ).toHaveLength(0);
      expect(wrapper.find('[data-testid="lfp-input"]')).toHaveLength(1);
      expect(wrapper.find('[data-testid="lfp-btn"]')).toHaveLength(1);
    });

    it('should not fire onChange when nothing was selected on the input', () => {
      wrapper.find('.language-folder-picker__input-file').simulate('change', {
        currentTarget: {
          files: []
        }
      });
      expect(onChangeSpy).toBeCalledTimes(0);
    });

    it('should fire onChange with the path', () => {
      wrapper.find('.language-folder-picker__input-file').simulate('change', {
        currentTarget: {
          files: [
            {
              path: 'C:\\aFolder\\anotherFolder\\fileName.txt'
            }
          ]
        }
      });
      expect(onChangeSpy).toBeCalledTimes(1);
      expect(onChangeSpy).toBeCalledWith('C:/aFolder/anotherFolder');
    });

    it('should render error message', () => {
      wrapper.setProps({ error: 'An error message ' });
      expect(
        wrapper.find('.language-folder-picker__error-message')
      ).toHaveLength(1);
      expect(wrapper.text()).toContain('An error message');
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    beforeAll(() => {
      jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => false);
    });

    it('should render without value', () => {
      const tree = renderer.create(<LanguageFolderPicker />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with value', () => {
      const tree = renderer
        .create(<LanguageFolderPicker value="C:/folder/anotherFolder/" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render with error', () => {
      const tree = renderer
        .create(<LanguageFolderPicker error="An error" />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render disabled', () => {
      const tree = renderer.create(<LanguageFolderPicker disabled />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
