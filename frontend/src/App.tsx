//src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Dashboard from './pages/Dashboard';
import EventForm from './pages/CreateEvent';
import EventsList from './pages/EventsList';
import ProveedoresList from './pages/ProveedoresList';
import ProveedorForm from './pages/ProveedorForm';
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
          <Route path="/eventos" element={<EventsList />} />
          <Route path="/eventos/crear" element={<EventForm />} />
          <Route path="/eventos/:id" element={<EventForm />} />
          <Route path="/proveedores" element={<ProveedoresList />} />
          <Route path="/proveedores/crear" element={<ProveedorForm />} />
          <Route path="/proveedores/:id" element={<ProveedorForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;