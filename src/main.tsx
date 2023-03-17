import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import dotenv from 'dotenv';
import { FontStyles } from './assets/fonts';
import { BrowserRouter } from 'react-router-dom';

dotenv.config();

const rootHTML = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootHTML);

root.render(
  <BrowserRouter>
    <FontStyles />
    <App />
  </BrowserRouter>
);
