import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import FontStyles from './assets/fonts/fonts'
import PaletteStyles from './stylesheets/PaletteStyles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <FontStyles />
    <PaletteStyles />
    <App />
  </BrowserRouter>
)
