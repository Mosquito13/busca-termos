import { useRef, useEffect, useState, useCallback, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiInfo, FiSettings, FiRefreshCw, FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import debounce from 'lodash/debounce';

import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Heading1 from '../../components/common/Heading1';
import InputText from '../../components/common/InputText';
import LanguageTable from '../../components/LanguageTable';
import TranslationsPanel from '../../components/TranslationsPanel';

import listDownloadUtils from '../../utils/listDownloadUtils';
import settingsSelectors from '../../selectors/settings';
import { loadSettings } from '../../actions/settings';
import { setFilter } from '../../actions/core';
import coreSelectors from '../../selectors/core';

import './styles.scss';

const Main = () => {
  const searchFieldRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValid = useSelector(settingsSelectors.isValid);
  const isLoading = useSelector(coreSelectors.isLoading);
  const appHasUpdate = useSelector(coreSelectors.getAppHasUpdate);
  const [searchValue, setSearchValue] = useState('');

  const focusSearchField = useCallback(() => searchFieldRef.current.select(), []);

  useKeyboardShortcut(['Control', 'F'], focusSearchField, {
    ignoreInputFields: false
  });

  useEffect(() => dispatch(loadSettings()), [dispatch]);

  useEffect(() => {
    if (!isValid) {
      navigate('/configNotFound');
    }
  }, [isValid, navigate]);

  useEffect(() => {
    if (!isLoading && searchFieldRef.current) {
      focusSearchField();
    }
  }, [isLoading, focusSearchField]);

  const onClickAbout = useCallback(() => navigate('/about'), [navigate]);
  const onClickSettings = useCallback(() => navigate('/settings'), [navigate]);

  const filterTable = useCallback((value) => dispatch(setFilter(value)), [dispatch]);
  const debouncedFilterTable = useMemo(() => debounce(filterTable, 500), [filterTable]);

  /* istanbul ignore next: something weird is happening that debouncedFilterTable is undefined here */
  const handleChange = useCallback((value) => {
    setSearchValue(value);
    debouncedFilterTable(value);
  }, [debouncedFilterTable]);

  return (
    <>
      <div className="main">
        <div className="main__header">
          <div className="main__header-title">
            <Heading1 value="BuscaTermos" />
          </div>
          <div className="main__header-search">
            <InputText
              ref={searchFieldRef}
              placeholder="Procurar por..."
              value={searchValue}
              onChange={handleChange}
              disabled={isLoading}
              data-testid="search-field"
            />
          </div>
          <div className="main__header-buttons">
            <Button
              borderless
              tooltip="Baixar lista em texto"
              icon={<Icon><FiDownload /></Icon>}
              onClick={listDownloadUtils.downloadCurrentList}
              data-testid="btn-download"
            />
            <Button
              borderless
              tooltip="Preferências"
              icon={
                <Icon>
                  <FiSettings />
                </Icon>
              }
              onClick={onClickSettings}
              data-testid="btn-settings"
            />
            <Button
              borderless
              tooltip={`Sobre${
                appHasUpdate ? ' (Existe uma atualização)' : ''
              }`}
              icon={
                <Icon>
                  <FiInfo />
                </Icon>
              }
              marker={appHasUpdate && <FiRefreshCw />}
              onClick={onClickAbout}
              data-testid="btn-about"
            />
          </div>
        </div>
        <div className="main__table">
          <LanguageTable />
        </div>
        <div className="main__translations">
          <TranslationsPanel />
        </div>
      </div>
      <Loading show={isLoading} />
    </>
  );
};

export default memo(Main);
