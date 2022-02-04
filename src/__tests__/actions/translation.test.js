import { loadTranslation, setTranslation } from '../../actions/translation';
import { languageMapping } from '../../mapping/languages';
import actionTypes from '../../constants/actionTypes';

describe('translation actions tests', () => {
  it('should create action set translation', () => {
    expect(setTranslation(languageMapping.POLAND.id, false)).toMatchObject({
      type: actionTypes.SET_TRANSLATION,
      id: languageMapping.POLAND.id,
      value: false
    });
  });

  it('should load translation', () => {
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn().mockReturnValue({
      Core: {
        data: {
          [languageMapping.USA.id]: [
            {
              id: 101101,
              content: 'Nenhum'
            }
          ]
        }
      }
    });

    loadTranslation(languageMapping.USA.id, 101101)(dispatchMock, getStateMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(
      setTranslation(languageMapping.USA.id, 'Nenhum')
    );
  });
});
