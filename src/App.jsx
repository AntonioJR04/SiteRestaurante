import Home from './pages/homePage.jsx';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header.jsx';
import Routers from './components/routers.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routers />
      <Header />
    </BrowserRouter>
  );
}
