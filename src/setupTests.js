import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

global.API = {
  validateLanguageFolder: jest.fn(),
  loadData: jest.fn(),
  loadAppVersion: jest.fn(),
  openBrowserWithURL: jest.fn(),
  closeSplashAndShowApp: jest.fn(),
  close: jest.fn(),
  minimize: jest.fn(),
  maximize: jest.fn(),
  unmaximize: jest.fn(),
  registerMaximizeListener: jest.fn(),
  registerUnmaximizeListener: jest.fn()
};
