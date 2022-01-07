import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import Icon, { SMALL, RESPONSIVE } from '../../components/common/Icon';
import Button from '../../components/common/Button';
import Toggle from '../../components/common/Toggle';
import Select from '../../components/common/Select';
import Fieldset from '../../components/common/Fieldset';
import { languageMapping } from '../../mapping/languages';

import coreActions from '../../actions/core';
import settingsActions from '../../actions/settings';
import settingsSelectors from '../../selectors/settings'

import './styles.scss';

const getLanguageItems = (mainLanguage, translation, onChangeTranslation) => {
  const languageToggles = [];
  const languageOptions = [];

  orderBy(languageMapping, ['title'])
    .forEach(({ id, title, getIcon }) => {
      languageToggles.push((
        <div key={id} className="settings__field">
          <Toggle
            label={title}
            icon={<Icon size={RESPONSIVE}>{getIcon()}</Icon>}
            value={translation[id] && mainLanguage !== id}
            onChange={() => onChangeTranslation(id, !translation[id])}
            disabled={mainLanguage === id}
          />
        </div>
      ));

      languageOptions.push({
        icon: <Icon size={SMALL}>{getIcon()}</Icon>,
        text: title,
        value: id
      });
    });

  return [languageToggles, languageOptions];
};

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkTheme = useSelector(settingsSelectors.isDarkTheme);
  const translation = useSelector(settingsSelectors.getTranslation);
  const mainLanguage = useSelector(settingsSelectors.getMainLanguage);

  const onClickApply = useCallback(() => {
    dispatch(coreActions.setLoading(true));
    dispatch(settingsActions.saveSettings({ mainLanguage, translation, darkTheme }));
    navigate(-1);
  }, [navigate, dispatch, mainLanguage, translation, darkTheme]);

  const onChangeDarkTheme = useCallback(() => {
    dispatch(settingsActions.toggleDarkTheme(!darkTheme));
  }, [dispatch, darkTheme]);

  const onChangeMainLanguage = useCallback((value) => {
    dispatch(settingsActions.setMainLanguage(value));
    dispatch(settingsActions.toggleTranslation(value, false));
  }, [dispatch]);

  const onChangeTranslation = useCallback((id, value) => {
    dispatch(settingsActions.toggleTranslation(id, value));
  }, [dispatch]);

  const [languageToggles, languageOptions] = getLanguageItems(mainLanguage, translation, onChangeTranslation);

  return (
    <div className="settings">
      <div className="settings__content">
        <Fieldset title="Aparência" noMarginTop>
          <div className="settings__field">
            <Toggle
              disabled
              label="Tema escuro"
              value={darkTheme}
              onChange={onChangeDarkTheme}
            />
          </div>
        </Fieldset>
        <Fieldset title="Idioma padrão">
          <div className="settings__field settings__field--50">
            <Select
              useRoundIconBorder
              options={languageOptions}
              value={mainLanguage}
              onChange={onChangeMainLanguage}
            />
          </div>
        </Fieldset>
        <Fieldset title="Mostrar no painel de traduções">
          <div className="settings__language-toggle-container">
            {languageToggles}
          </div>
        </Fieldset>
      </div>
      <div className="settings__footer">
        <Button
          text="Aplicar"
          onClick={onClickApply}
        />
      </div>
    </div>
  );
};

export default Settings;