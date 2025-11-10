import Home from './pages/homePage.jsx';
import { BrowserRouter } from 'react-router-dom';
import Routers from './components/routers.jsx';
export default function App() {

  return (
    <BrowserRouter>
      <Routers />
      
    </BrowserRouter>
  );
}