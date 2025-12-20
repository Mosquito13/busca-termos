import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import BaseLayout from './layouts/Base';
import store from './store';

import Main from './pages/Main';
import About from './pages/About';
import Settings from './pages/Settings';
import ConfigNotFound from './pages/ConfigNotFound';

import './sass/styles.scss';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Main />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/configNotFound" element={<ConfigNotFound />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);

export default App;
