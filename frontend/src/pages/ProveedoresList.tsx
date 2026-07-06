import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Header from '../components/common/Header';
import { proveedoresListStyles as s } from '../styles/pages/ProveedoresList_styles';
import type { Proveedor } from '../types/event.types';
import { getProviders, deleteProvider } from '../services/eventApi';
import { colors } from '../styles/Global';

const ProveedoresList = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProviders();
      setProviders(data);
    } catch {
      setError('Error al cargar los proveedores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleDelete = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Eliminar el proveedor "${nombre}"?`)) return;
    try {
      await deleteProvider(id);
      setProviders(prev => prev.filter(p => p.id !== id));
    } catch {
      // TODO: mostrar notificación de error
    }
  };

  return (
    <div style={s.page}>
      <Header />
      <main style={s.main}>
        <div style={s.headerSection}>
          <div style={s.headerText}>
            <h1 style={s.heading}>Proveedores</h1>
            <p style={s.subheading}>Gestiona los proveedores registrados en el sistema</p>
          </div>
          <Link to="/proveedores/crear" style={s.createButton}>
            <Plus size={18} />
            Nuevo Proveedor
          </Link>
        </div>

        <div style={s.card}>
          {loading && <div style={s.loadingState}>Cargando proveedores...</div>}

          {!loading && error && (
            <div style={s.emptyState}>
              <p>{error}</p>
              <button style={{ ...s.createButton, marginTop: '1rem', display: 'inline-flex' }} onClick={fetchProviders}>
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && providers.length === 0 && (
            <div style={s.emptyState}>No hay proveedores registrados.</div>
          )}

          {!loading && !error && providers.length > 0 && (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Empresa</th>
                  <th style={s.th}>Categoría</th>
                  <th style={s.th}>Contacto</th>
                  <th style={s.th}>Teléfono</th>
                  <th style={s.th}>Alianza</th>
                  <th style={s.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {providers.map(p => (
                  <tr key={p.id}>
                    <td style={s.td}>{p.nombre_empresa}</td>
                    <td style={s.td}>{p.categoria}</td>
                    <td style={s.td}>{p.contacto_nombre || '-'}</td>
                    <td style={s.td}>{p.telefono || '-'}</td>
                    <td style={s.td}>
                      <span style={{
                        ...s.badge,
                        backgroundColor: p.estado_alianza === 'Activo' ? '#D1FAE5' : '#FEE2E2',
                        color: p.estado_alianza === 'Activo' ? '#059669' : '#DC2626',
                      }}>
                        {p.estado_alianza}
                      </span>
                    </td>
                    <td style={s.td}>
                      <button
                        style={{ ...s.actionButton, backgroundColor: '#EEF2FF', color: colors.primary }}
                        onClick={() => navigate(`/proveedores/${p.id}`)}
                        title="Editar"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        style={{ ...s.actionButton, backgroundColor: '#FEE2E2', color: colors.danger }}
                        onClick={() => handleDelete(p.id, p.nombre_empresa)}
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProveedoresList;
