import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categorias from './componente/Categorias.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Categorias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;