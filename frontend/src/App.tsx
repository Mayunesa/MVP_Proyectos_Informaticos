import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Dashboard from './pages/Dashboard';
import { globalStyles } from './styles/Global';

function App() {
  return (
    <BrowserRouter>
      <div style={globalStyles.appShell}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;