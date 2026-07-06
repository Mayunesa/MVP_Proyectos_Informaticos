//frontend/src/pages/EventsList.tsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Header from '../components/common/Header';
import { eventsListStyles as s } from '../styles/pages/EventsList_styles';
import type { Evento } from '../types/event.types';
import { getEvents, deleteEvent } from '../services/eventApi';
import { colors } from '../styles/Global';
import { estadoEventoLabels } from '../utils/estadoEvento';

const estadoColors: Record<string, { bg: string; text: string }> = {
  Cotizacion: { bg: '#EEF2FF', text: '#4F46E5' },
  Confirmado: { bg: '#E0F2FE', text: '#0284C7' },
  Ejecucion: { bg: '#FEF3C7', text: '#D97706' },
  Finalizado: { bg: '#D1FAE5', text: '#059669' },
  Cancelado: { bg: '#FEE2E2', text: '#DC2626' },
  Reagendado: { bg: '#F3E8FF', text: '#9333EA' },
};

const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch {
      setError('Error al cargar los eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Eliminar el evento "${nombre}"?`)) return;
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch {
      // TODO: mostrar notificación de error
    }
  };

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString('es-CL')}`;

  return (
    <div style={s.page}>
      <Header />
      <main style={s.main}>
        <div style={s.headerSection}>
          <div style={s.headerText}>
            <h1 style={s.heading}>Eventos</h1>
            <p style={s.subheading}>Gestiona los eventos registrados en el sistema</p>
          </div>
          <Link to="/eventos/crear" style={s.createButton}>
            <Plus size={18} />
            Nuevo Evento
          </Link>
        </div>

        <div style={s.card}>
          {loading && (
            <div style={s.loadingState}>Cargando eventos...</div>
          )}

          {!loading && error && (
            <div style={s.emptyState}>
              <p>{error}</p>
              <button
                style={{ ...s.createButton, marginTop: '1rem', display: 'inline-flex' }}
                onClick={fetchEvents}
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div style={s.emptyState}>
              No hay eventos registrados. Crea tu primer evento.
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Nombre</th>
                  <th style={s.th}>Tipo</th>
                  <th style={s.th}>Fecha</th>
                  <th style={s.th}>Presupuesto</th>
                  <th style={s.th}>Estado</th>
                  <th style={s.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {events.map(evento => {
                  const badge = estadoColors[evento.estado] || estadoColors.Cotizacion;
                  return (
                    <tr key={evento.id}>
                      <td style={s.td}>{evento.nombre_evento}</td>
                      <td style={s.td}>{evento.tipo_evento}</td>
                      <td style={s.td}>{evento.fecha_evento}</td>
                      <td style={s.td}>{formatCurrency(evento.presupuesto_total)}</td>
                      <td style={s.td}>
                        <span
                          style={{
                            ...s.estadoBadge,
                            backgroundColor: badge.bg,
                            color: badge.text,
                          }}
                        >
                          {evento.estado}
                        </span>
                      </td>
                      <td style={s.td}>
                        <button
                          style={{
                            ...s.actionButton,
                            backgroundColor: '#EEF2FF',
                            color: colors.primary,
                          }}
                          onClick={() => navigate(`/eventos/${evento.id}`)}
                          title="Editar"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          style={{
                            ...s.actionButton,
                            backgroundColor: '#FEE2E2',
                            color: colors.danger,
                          }}
                          onClick={() => handleDelete(evento.id, evento.nombre_evento)}
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default EventsList;
