//src/pages/Dashboard.tsx

import { useEffect, useMemo, useState } from 'react';
import Header from '../components/common/Header';
import SectionCard from '../components/dashboard/sectionCard';
import ActivityFeed from '../components/dashboard/activityFeed';
import EstadoEventosChart from '../components/dashboard/estadoEventosChart';
import { dashboardStyles } from '../styles/pages/Dashboard_styles';
import { sectionCardStyles } from '../styles/components/sectionCard_styles';
import { coloresPorEstado } from '../styles/components/estadoEventosChart_styles';
import { coloresPorTipoEvento, coloresPorCategoriaProveedor } from '../styles/components/donutColorMaps_styles';
import { agruparPorCampo } from '../utils/agruparPorCampo';
import { diasHastaEvento } from '../utils/fechas';
import { estadoEventoLabels } from '../utils/estadoEvento';
import { getEvents } from '../services/eventApi';
import type { Evento, EstadoEvento } from '../types/event.types';
import type { ActividadReciente, ReservaProveedorPendiente } from '../types/dashboard.types';

// Mock intencional: aún no existe el flujo real de cancelaciones de proveedores.
const reservasPendientesMock: ReservaProveedorPendiente[] = [
  { id: '1', nombreEvento: 'Boda Herrera - Soto', nombreProveedor: 'Banquetería Don Sabor', categoriaProveedor: 'Banquetería', servicioAcordado: 'Servicio de banquetería', estadoReserva: 'Reservado' },
  { id: '2', nombreEvento: 'Boda Herrera - Soto', nombreProveedor: 'Florería Bellaflor', categoriaProveedor: 'Decoración', servicioAcordado: 'Decoración floral', estadoReserva: 'Pagado' },
  { id: '3', nombreEvento: 'Evento Social Familia Vidal', nombreProveedor: 'Iluminación Total', categoriaProveedor: 'Iluminación', servicioAcordado: 'Set de iluminación', estadoReserva: 'Reservado' },
];

// Mock intencional: aún no existe el registro real de actividad.
const actividadMock: ActividadReciente[] = [
  { id: '1', descripcion: 'Se activó el cargo por cancelación de "Matrimonio Herrera - Soto"', tiempoTranscurrido: 'Hace 20 min' },
  { id: '2', descripcion: 'Contrato firmado para "Lanzamiento Producto Nova"', tiempoTranscurrido: 'Hace 3 horas' },
  { id: '3', descripcion: 'Proveedor "Iluminación Total" actualizó su tabla de penalidades', tiempoTranscurrido: 'Ayer' },
];

const Dashboard = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [diasFiltro, setDiasFiltro] = useState(30);

  const fetchEventos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEvents();
      setEventos(data);
    } catch {
      setError('No se pudieron cargar los eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const datosPorEstado = useMemo(
    () =>
      (Object.keys(coloresPorEstado) as EstadoEvento[]).map((estado) => ({
        estado,
        etiqueta: estadoEventoLabels[estado],
        cantidad: eventos.filter((e) => e.estado === estado).length,
        color: coloresPorEstado[estado],
      })),
    [eventos],
  );

  const eventosProximos = useMemo(
    () =>
      eventos.filter((e) => {
        if (!e.estado || !['Confirmado', 'Ejecucion', 'Reagendado'].includes(e.estado)) return false;
        const dias = diasHastaEvento(e.fecha_evento);
        return dias >= 0 && dias <= diasFiltro;
      }),
    [eventos, diasFiltro],
  );

  const eventosEnCotizacion = useMemo(
    () => eventos.filter((e) => e.estado === 'Cotizacion'),
    [eventos],
  );

  return (
    <div style={dashboardStyles.page}>
      <Header />
      <main style={dashboardStyles.main}>
        <h1 style={dashboardStyles.heading}>Dashboard</h1>

        {loading && <p style={dashboardStyles.loadingState}>Cargando información del dashboard...</p>}

        {!loading && error && (
          <div style={dashboardStyles.errorState}>
            <p>{error}</p>
            <button style={dashboardStyles.retryButton} onClick={fetchEventos}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <EstadoEventosChart datos={datosPorEstado} />
            <ActivityFeed items={actividadMock} />
            <div style={dashboardStyles.sectionsGrid}>
              <SectionCard
                title="Próximos Eventos"
                items={eventosProximos.map((e) => ({
                  id: e.id,
                  primaryText: e.nombre_evento,
                  secondaryText: `${diasHastaEvento(e.fecha_evento)} días`,
                  tono: 'info',
                }))}
                segmentosDona={agruparPorCampo(eventosProximos, 'tipo_evento', coloresPorTipoEvento)}
                emptyText="No hay eventos confirmados en este rango"
                headerAction={
                  <select
                    style={sectionCardStyles.select}
                    value={diasFiltro}
                    onChange={(e) => setDiasFiltro(Number(e.target.value))}
                  >
                    <option value={30}>30 días</option>
                    <option value={60}>60 días</option>
                    <option value={90}>90 días</option>
                  </select>
                }
              />

              <SectionCard
                title="Cancelaciones por Resolver"
                items={reservasPendientesMock.map((r) => ({
                  id: r.id,
                  primaryText: `${r.nombreProveedor} — ${r.nombreEvento}`,
                  secondaryText: r.estadoReserva,
                  tono: 'danger',
                }))}
                segmentosDona={agruparPorCampo(reservasPendientesMock, 'categoriaProveedor', coloresPorCategoriaProveedor)}
                emptyText="No hay reservas de proveedores pendientes de resolver"
              />

              <SectionCard
                title="Pendientes de Confirmación"
                items={eventosEnCotizacion.map((e) => ({
                  id: e.id,
                  primaryText: e.nombre_evento,
                  secondaryText: e.tipo_evento,
                  tono: 'warning',
                }))}
                segmentosDona={agruparPorCampo(eventosEnCotizacion, 'tipo_evento', coloresPorTipoEvento)}
                emptyText="No hay eventos en cotización"
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;