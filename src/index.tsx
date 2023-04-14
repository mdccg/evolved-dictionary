import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import FontStyles from './assets/fonts/fonts';
import PaletteStyles from './stylesheets/PaletteStyles';
import { UserContextProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserContextProvider>
    <BrowserRouter>
      <FontStyles />
      <PaletteStyles />
      <App />
    </BrowserRouter>
  </UserContextProvider>
);