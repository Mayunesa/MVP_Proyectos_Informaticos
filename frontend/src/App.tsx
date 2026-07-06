//src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Dashboard from './pages/Dashboard';
import { globalStyles } from './styles/Global';
import Calendario from './pages/Calendario';

function App() {
  return (
    <BrowserRouter>
      <div style={globalStyles.appShell}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendario" element={<Calendario />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;