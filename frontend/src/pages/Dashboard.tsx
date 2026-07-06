//workspaces/MVP_Proyectos_Informaticos/frontend/src/pages/Dashboard.tsx

import { useMemo, useState } from 'react';
import Header from '../components/common/Header';
import SectionCard from '../components/dashboard/sectionCard';
import ActivityFeed from '../components/dashboard/activityFeed';
import { dashboardStyles } from '../styles/pages/Dashboard_styles';
import { sectionCardStyles } from '../styles/components/sectionCard_styles';
import type {
  EventoResumen,  ActividadReciente,
  ReservaProveedorPendiente, EstadoEvento
} from '../types/dashboard.types';
import EstadoEventosChart from '../components/dashboard/estadoEventosChart';
import { coloresPorEstado } from '../styles/components/estadoEventosChart_styles';
import { coloresPorTipoEvento, coloresPorCategoriaProveedor } from '../styles/components/donutColorMaps_styles';
import { agruparPorCampo } from '../utils/agruparPorCampo';

// Mocks que representan filas reales de "eventos" y "evento_proveedor" en Supabase.
// TODO: reemplazar por consultas reales cuando el cliente de Supabase esté conectado.

const eventosMock: EventoResumen[] = [
  { id: '1', nombreEvento: 'Boda Fuentes - Rojas', tipoEvento: 'Matrimonio', fechaEvento: '2026-07-18', estado: 'Confirmado' },
  { id: '2', nombreEvento: 'Aniversario ACME', tipoEvento: 'Corporativo', fechaEvento: '2026-08-02', estado: 'Confirmado' },
  { id: '3', nombreEvento: 'Lanzamiento Nova', tipoEvento: 'Corporativo', fechaEvento: '2026-07-25', estado: 'Confirmado' },
  { id: '4', nombreEvento: 'Cumpleaños Sra. Paredes', tipoEvento: 'Social', fechaEvento: '2026-09-10', estado: 'Cotizacion' },
  { id: '5', nombreEvento: 'Gala Fundación Luz', tipoEvento: 'Otro', fechaEvento: '2026-09-20', estado: 'Cotizacion' },
  { id: '6', nombreEvento: 'Boda Herrera - Soto', tipoEvento: 'Matrimonio', fechaEvento: '2026-06-14', estado: 'Cancelado' },
  { id: '7', nombreEvento: 'Evento Social Familia Vidal', tipoEvento: 'Social', fechaEvento: '2026-06-20', estado: 'Cancelado' },
  { id: '8', nombreEvento: 'Seminario Fintech', tipoEvento: 'Corporativo', fechaEvento: '2026-07-01', estado: 'Ejecucion' },
  { id: '9', nombreEvento: 'Boda Muñoz - Díaz', tipoEvento: 'Matrimonio', fechaEvento: '2026-05-10', estado: 'Finalizado' },
  { id: '10', nombreEvento: 'Cóctel Corporativo Delta', tipoEvento: 'Corporativo', fechaEvento: '2026-04-22', estado: 'Finalizado' },
  { id: '11', nombreEvento: 'Baby Shower Familia Rojas', tipoEvento: 'Social', fechaEvento: '2026-03-15', estado: 'Finalizado' },
  { id: '12', nombreEvento: 'Boda Contreras - Lagos', tipoEvento: 'Matrimonio', fechaEvento: '2026-10-05', estado: 'Reagendado' },
];

const reservasPendientesMock: ReservaProveedorPendiente[] = [
  { id: '1', nombreEvento: 'Boda Herrera - Soto', nombreProveedor: 'Banquetería Don Sabor', categoriaProveedor: 'Banquetería', servicioAcordado: 'Servicio de banquetería', estadoReserva: 'Reservado' },
  { id: '2', nombreEvento: 'Boda Herrera - Soto', nombreProveedor: 'Florería Bellaflor', categoriaProveedor: 'Decoración', servicioAcordado: 'Decoración floral', estadoReserva: 'Pagado' },
  { id: '3', nombreEvento: 'Evento Social Familia Vidal', nombreProveedor: 'Iluminación Total', categoriaProveedor: 'Iluminación', servicioAcordado: 'Set de iluminación', estadoReserva: 'Reservado' },
];

const actividadMock: ActividadReciente[] = [
  { id: '1', descripcion: 'Se activó el cargo por cancelación de "Matrimonio Herrera - Soto"', tiempoTranscurrido: 'Hace 20 min' },
  { id: '2', descripcion: 'Contrato firmado para "Lanzamiento Producto Nova"', tiempoTranscurrido: 'Hace 3 horas' },
  { id: '3', descripcion: 'Proveedor "Iluminación Total" actualizó su tabla de penalidades', tiempoTranscurrido: 'Ayer' },
];

const diasHastaEvento = (fechaISO: string): number => {
  const hoy = new Date();
  const fecha = new Date(fechaISO);
  return Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
};

const Dashboard = () => {
  const [diasFiltro, setDiasFiltro] = useState(30);

  const datosPorEstado = useMemo(
    () =>
      (Object.keys(coloresPorEstado) as EstadoEvento[]).map((estado) => ({
        estado,
        cantidad: eventosMock.filter((e) => e.estado === estado).length,
        color: coloresPorEstado[estado],
      })),
    [],
  );

  const eventosProximos = useMemo(
    () =>
      eventosMock.filter((e) => {
        if (e.estado !== 'Confirmado') return false;
        const dias = diasHastaEvento(e.fechaEvento);
        return dias >= 0 && dias <= diasFiltro;
      }),
    [diasFiltro],
  );

  const eventosEnCotizacion = eventosMock.filter((e) => e.estado === 'Cotizacion');

  return (
    <div style={dashboardStyles.page}>
      <Header />
      <main style={dashboardStyles.main}>
        <h1 style={dashboardStyles.heading}>Dashboard</h1>

        <EstadoEventosChart datos={datosPorEstado} />
        <ActivityFeed items={actividadMock} />
        <div style={dashboardStyles.sectionsGrid}>
          <SectionCard
            title="Próximos Eventos"
            items={eventosProximos.map((e) => ({
              id: e.id,
              primaryText: e.nombreEvento,
              secondaryText: `${diasHastaEvento(e.fechaEvento)} días`,
              tono: 'info',
            }))}
            segmentosDona={agruparPorCampo(eventosProximos, 'tipoEvento', coloresPorTipoEvento)}
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
              primaryText: e.nombreEvento,
              secondaryText: e.tipoEvento,
              tono: 'warning',
            }))}
            segmentosDona={agruparPorCampo(eventosEnCotizacion, 'tipoEvento', coloresPorTipoEvento)}
            emptyText="No hay eventos en cotización"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
