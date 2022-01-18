import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import Heading1 from '../../components/common/Heading1';
import Paragraph from '../../components/common/Paragraph';

import coreActions from '../../actions/core';

import './styles.scss';

const About = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickClose = useCallback(() => {
    navigate(-1);
    dispatch(coreActions.setLoading(true));
  }, [navigate, dispatch]);

  return (
    <div className="about">
      <div className="about__title">
        <Heading1 value="Busca Termos" />
        <div className="about__title-date">
          <Paragraph value={`2021 - ${new Date().getFullYear()}`} />
        </div>
      </div>
      <div className="about__info">
        <div className="about__info-item">
          <Paragraph value="Versão" bold />
          <Paragraph value="BOTAR_A_VERSAO" />
        </div>
        <div className="about__info-item">
          <Paragraph value="Desenvolvido por:" bold />
          <Paragraph value="Giovane de Oliveira" />
          <Paragraph value="giovane.oliveira@softexpert.com" />
        </div>
      </div>
      <div className="about__button">
        <Button text="Voltar" onClick={onClickClose} />
      </div>
    </div>
  );
};

export default About;
