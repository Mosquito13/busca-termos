import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiInfo, FiSettings } from 'react-icons/fi';
import debounce from 'lodash/debounce';

import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Heading1 from '../../components/common/Heading1';
import InputText from '../../components/common/InputText';
import LanguageTable from '../../components/LanguageTable';
import TranslationsPanel from '../../components/TranslationsPanel';

import settingsSelectors from '../../selectors/settings';
import settingsActions from '../../actions/settings';
import coreSelectors from '../../selectors/core';
import coreActions from '../../actions/core';

import './styles.scss';
import { useRef } from 'react';
import useKeyboardShortcut from 'use-keyboard-shortcut';

const Main = () => {
  const searchFieldRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValid = useSelector(settingsSelectors.isValid);
  const isLoading = useSelector(coreSelectors.isLoading);
  const [searchValue, setSearchValue] = useState('');

  const focusSearchField = useCallback(() => searchFieldRef.current.focus(), []);

  useKeyboardShortcut(['Control', 'F'], focusSearchField, { ignoreInputFields: false });

  useEffect(() => dispatch(settingsActions.loadSettings()), [dispatch]);

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

  const filterTable = useCallback((value) => dispatch(coreActions.setFilter(value)), [dispatch]);
  const debouncedFilterTable = useMemo(() => debounce(filterTable, 500), [filterTable]);

  const handleChange = useCallback((value) => {
    setSearchValue(value);
    debouncedFilterTable(value);
  }, [debouncedFilterTable]);

  return (
    <>
      <div className="main">
        <div className="main__header">
          <Heading1>{'Busca Termos'}</Heading1>
          <div className="main__header-buttons">
            <Button
              borderless
              tooltip="Preferências"
              icon={<Icon><FiSettings /></Icon>}
              onClick={onClickSettings}
            />
            <Button
              borderless
              tooltip="Sobre"
              icon={<Icon><FiInfo /></Icon>}
              onClick={onClickAbout}
            />
          </div>
        </div>
        <div className="main__content">
          <div className="main__left">
            <div className="main__search">
              <InputText
                ref={searchFieldRef}
                placeholder="Procurar por..."
                value={searchValue}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="main__table">
              <LanguageTable />
            </div>
          </div>
          <div className="main__right">
            <TranslationsPanel />
          </div>
        </div>
      </div>
      <Loading loading={isLoading} />
    </>
  );
};

export default Main;
