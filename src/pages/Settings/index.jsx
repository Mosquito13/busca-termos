import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import Icon, { SMALL, RESPONSIVE } from '../../components/common/Icon';
import { languageMapping } from '../../mapping/languages';
import TranslationLayoutSelector from '../../components/TranslationLayoutSelector';
import Fieldset from '../../components/common/Fieldset';
import Button from '../../components/common/Button';
import Toggle from '../../components/common/Toggle';
import Select from '../../components/common/Select';

import {
  saveSettings,
  setMainLanguage,
  setTranslationColumns,
  toggleCompactLayout,
  toggleDarkTheme,
  toggleTranslation
} from '../../actions/settings';
import { setLoading } from '../../actions/core';
import settingsSelectors from '../../selectors/settings';

import './styles.scss';

const getLanguageItems = (mainLanguage, translation, onChangeTranslation) => {
  const languageToggles = [], languageOptions = [];

  orderBy(languageMapping, ['title']).forEach(({ id, title, getIcon }) => {
    languageToggles.push(
      <div key={id} className="settings__field">
        <Toggle
          label={title}
          icon={<Icon size={RESPONSIVE}>{getIcon()}</Icon>}
          value={translation[id] && mainLanguage !== id}
          onChange={() => onChangeTranslation(id, !translation[id])}
          disabled={mainLanguage === id}
          data-testid="toggle-translation"
        />
      </div>
    );

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
  const compactLayout = useSelector(settingsSelectors.isCompactLayout);
  const translationColumns = useSelector(settingsSelectors.getTranslationColumns);

  const onClickBack = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(saveSettings({ mainLanguage, translation, darkTheme, compactLayout, translationColumns }));
    navigate(-1);
  }, [navigate, dispatch, mainLanguage, translation, darkTheme, compactLayout, translationColumns]);

  const onChangeDarkTheme = useCallback(() => {
    dispatch(toggleDarkTheme(!darkTheme));
  }, [dispatch, darkTheme]);

  const onChangeCompactLayout = useCallback(() => {
    dispatch(toggleCompactLayout(!compactLayout));
  }, [dispatch, compactLayout]);

  const onChangeMainLanguage = useCallback((value) => {
    dispatch(setMainLanguage(value));
    dispatch(toggleTranslation(value, false));
  }, [dispatch]);

  const onChangeTranslation = useCallback((id, value) => {
    dispatch(toggleTranslation(id, value));
  }, [dispatch]);

  const onChangeTranslationColumns = useCallback((value) => {
    dispatch(setTranslationColumns(value));
  }, [dispatch]);

  const [languageToggles, languageOptions] = getLanguageItems(
    mainLanguage,
    translation,
    onChangeTranslation
  );

  return (
    <div className="settings">
      <div className="settings__content">
        <Fieldset title="Aparência" noMarginTop>
          <div className="settings__field">
            <Toggle
              label="Tema escuro"
              value={darkTheme}
              onChange={onChangeDarkTheme}
              data-testid="toggle-dark-theme"
            />
          </div>
          <div className="settings__field">
            <Toggle
              label="Tema compacto"
              value={compactLayout}
              onChange={onChangeCompactLayout}
              data-testid="toggle-compact-layout"
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
              data-testid="select-main-lang"
            />
          </div>
        </Fieldset>
        <Fieldset title="Disposição do painel de traduções">
          <TranslationLayoutSelector
            value={translationColumns}
            onChange={onChangeTranslationColumns}
            data-testid="translation-layout-selector"
          />
        </Fieldset>
        <Fieldset title="Mostrar no painel de traduções">
          <div className="settings__language-toggle-container">
            {languageToggles}
          </div>
        </Fieldset>
      </div>
      <div className="settings__footer">
        <Button
          text="Voltar"
          onClick={onClickBack}
          data-testid="btn-back"
        />
      </div>
    </div>
  );
};

export default Settings;
