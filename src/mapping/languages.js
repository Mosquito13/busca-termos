import { ReactComponent as BrazilIcon } from '../assets/svg/brazil.svg';
import { ReactComponent as CataloniaIcon } from '../assets/svg/catalonia.svg';
import { ReactComponent as CzechIcon } from '../assets/svg/czech.svg';
import { ReactComponent as DenmarkIcon } from '../assets/svg/denmark.svg';
import { ReactComponent as FinlandIcon } from '../assets/svg/finland.svg';
import { ReactComponent as FranceIcon } from '../assets/svg/france.svg';
import { ReactComponent as GermanyIcon } from '../assets/svg/germany.svg';
import { ReactComponent as ItalyIcon } from '../assets/svg/italy.svg';
import { ReactComponent as PolandIcon } from '../assets/svg/poland.svg';
import { ReactComponent as PortugalIcon } from '../assets/svg/portugal.svg';
import { ReactComponent as RomaniaIcon } from '../assets/svg/romania.svg';
import { ReactComponent as RussiaIcon } from '../assets/svg/russia.svg';
import { ReactComponent as SlovakiaIcon } from '../assets/svg/slovakia.svg';
import { ReactComponent as SpainIcon } from '../assets/svg/spain.svg';
import { ReactComponent as TurkeyIcon } from '../assets/svg/turkey.svg';
import { ReactComponent as UsaIcon } from '../assets/svg/usa.svg';

const languageMapping = {
  BRAZIL: {
    id: 'pt-br',
    title: 'Português (Brasil)',
    getIcon: () => <BrazilIcon />
  },
  CATALONIA: {
    id: 'ca',
    title: 'Catalão',
    getIcon: () => <CataloniaIcon />
  },
  CZECH: {
    id: 'cs',
    title: 'Tcheco',
    getIcon: () => <CzechIcon />
  },
  DENMARK: {
    id: 'da',
    title: 'Dinamarquês',
    getIcon: () => <DenmarkIcon />
  },
  FINLAND: {
    id: 'fi',
    title: 'Finlandês',
    getIcon: () => <FinlandIcon />
  },
  FRANCE: {
    id: 'fr',
    title: 'Francês',
    getIcon: () => <FranceIcon />
  },
  GERMANY: {
    id: 'de',
    title: 'Alemão',
    getIcon: () => <GermanyIcon />
  },
  ITALY: {
    id: 'it',
    title: 'Italiano',
    getIcon: () => <ItalyIcon />
  },
  POLAND: {
    id: 'pl',
    title: 'Polonês',
    getIcon: () => <PolandIcon />
  },
  PORTUGAL: {
    id: 'pt',
    title: 'Português (Portugal)',
    getIcon: () => <PortugalIcon />
  },
  ROMANIA: {
    id: 'ro',
    title: 'Romeno',
    getIcon: () => <RomaniaIcon />
  },
  RUSSIA: {
    id: 'ru',
    title: 'Russo',
    getIcon: () => <RussiaIcon />
  },
  SLOVAKIA: {
    id: 'sk',
    title: 'Eslovaco',
    getIcon: () => <SlovakiaIcon />
  },
  SPAIN: {
    id: 'es',
    title: 'Espanhol',
    getIcon: () => <SpainIcon />
  },
  TURKEY: {
    id: 'tr',
    title: 'Turco',
    getIcon: () => <TurkeyIcon />
  },
  USA: {
    id: 'en-us',
    title: 'Inglês (EUA)',
    getIcon: () => <UsaIcon />
  }
};

export { languageMapping };
