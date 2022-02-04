import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';

import TranslationField from '../../components/TranslationField';
import { languageMapping } from '../../mapping/languages';

const getStateMock = (selectedItemId) => ({
  Core: {
    selectedItemId
  },
  Translation: {
    [languageMapping.USA.id]: 'Translated',
    [languageMapping.TURKEY.id]: null
  }
});

const prepareReactReduxMocks = (selectedItemId, dispatchMock) => {
  jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);
  jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((selector) => selector(getStateMock(selectedItemId)));
};

describe(`${TranslationField.name}`, () => {
  describe('tests', () => {
    let wrapper, dispatchMock;

    beforeAll(() => {
      dispatchMock = jest.fn();

      prepareReactReduxMocks(null, dispatchMock);

      wrapper = mount(
        <TranslationField
          id={languageMapping.USA.id}
          tooltip={languageMapping.USA.title}
          icon={languageMapping.USA.getIcon()}
        />
      );
    });

    it('should render and not fire loadTranslation when selection is empty', () => {
      expect(wrapper.isEmptyRender()).toBeFalsy();
      expect(dispatchMock).toBeCalledTimes(0);
    });

    it('should fire loadTranslation when has selection', () => {
      wrapper.unmount();

      prepareReactReduxMocks(321, dispatchMock);

      wrapper = mount(
        <TranslationField
          id={languageMapping.TURKEY.id}
          tooltip={languageMapping.TURKEY.title}
          icon={languageMapping.TURKEY.getIcon()}
        />
      );

      expect(dispatchMock).toBeCalledTimes(1);
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('snapshots', () => {
    it('should render', () => {
      prepareReactReduxMocks(null, jest.fn());

      const tree = renderer
        .create(
          <TranslationField
            id={languageMapping.TURKEY.id}
            tooltip={languageMapping.TURKEY.title}
            icon={languageMapping.TURKEY.getIcon()}
          />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
