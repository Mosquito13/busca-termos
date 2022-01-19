import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiExternalLink, FiCheck, FiRefreshCcw } from 'react-icons/fi';
import classNames from 'classnames';

import Link from '../../components/common/Link';
import Button from '../../components/common/Button';
import Heading1 from '../../components/common/Heading1';
import Paragraph from '../../components/common/Paragraph';
import Icon, { RESPONSIVE } from '../../components/common/Icon';

import url from '../../constants/url';
import coreActions from '../../actions/core';
import coreSelectors from '../../selectors/core';

import './styles.scss';

const About = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appVersion = useSelector(coreSelectors.getAppVersion);
  const appHasUpdate = useSelector(coreSelectors.getAppHasUpdate);
  const lastUpdateLink = useSelector(coreSelectors.getUpdateURL);

  const onClickIssueLink = useCallback(() => {
    dispatch(coreActions.openBrowserWithURL(url.ISSUES_PAGE));
  }, [dispatch]);

  const onClickUpdateLink = useCallback(() => {
    dispatch(coreActions.openBrowserWithURL(lastUpdateLink));
  }, [dispatch, lastUpdateLink]);

  const onClickClose = useCallback(() => {
    navigate(-1);
    dispatch(coreActions.setLoading(true));
  }, [navigate, dispatch]);

  const classesIconUpdate = classNames(
    'about__info-updates-icon',
    appHasUpdate && 'about__info-updates-icon--red'
  );

  return (
    <div className="about">
      <div className="about__title">
        <Heading1 value="BuscaTermos" />
        <div className="about__title-date">
          <Paragraph value={`2014 - ${new Date().getFullYear()}`} />
        </div>
      </div>
      <div className="about__info">
        <div className="about__info-item">
          <Paragraph value="Versão:" bold />
          <Paragraph value={appVersion} />
        </div>
        <div className="about__info-item">
          <Paragraph value="Atualizações:" bold />
          <div className="about__info-updates">
            <div className={classesIconUpdate}>
              <Icon size={RESPONSIVE}>
                {appHasUpdate ? <FiRefreshCcw /> : <FiCheck />}
              </Icon>
            </div>
            {appHasUpdate ? (
              <Link
                value="Existem atualizações disponíveis"
                icon={<FiExternalLink />}
                onClick={onClickUpdateLink}
              />
            ) : (
              <Paragraph value="O aplicativo está atualizado" />
            )}
          </div>
        </div>
        <div className="about__info-item">
          <Paragraph value="Desenvolvido por:" bold />
          <Paragraph value="Giovane de Oliveira" />
          <Paragraph value="giovane.oliveira@softexpert.com" />
        </div>
        <div className="about__info-item">
          <Paragraph value="Bugs e/ou melhorias? Cadastre uma issue em:" bold />
          <Link
            value="BuscaTermos - Issues"
            icon={<FiExternalLink />}
            onClick={onClickIssueLink}
          />
        </div>
      </div>
      <div className="about__button">
        <Button text="Voltar" onClick={onClickClose} />
      </div>
    </div>
  );
};

export default About;
