//workspaces/MVP_Proyectos_Informaticos/frontend/src/pages/Dashboard.tsx

import { useMemo, useState } from 'react';
import Header from '../components/common/Header';
import KpiCard from '../components/dashboard/kpiCard';
import SectionCard from '../components/dashboard/sectionCard';
import ActivityFeed from '../components/dashboard/activityFeed';
import { dashboardStyles } from '../styles/pages/Dashboard_styles';
import { sectionCardStyles } from '../styles/components/sectionCard_styles';
import type {
  EventoResumen,
  CancelacionResumen,
  ProveedorPendiente,
  ActividadReciente,
} from '../types/dashboard.types';

// TODO: reemplazar mocks por datos reales desde Supabase (eventos, evento_proveedor, contratos_cliente)

const eventosMock: EventoResumen[] = [
  { id: '1', nombreEvento: 'Matrimonio Fuentes - Rojas', fechaEvento: '2026-07-18', estado: 'Confirmado' },
  { id: '2', nombreEvento: 'Aniversario Corporativo ACME', fechaEvento: '2026-08-02', estado: 'Confirmado' },
  { id: '3', nombreEvento: 'Cumpleaños 50 - Sra. Paredes', fechaEvento: '2026-09-10', estado: 'Cotizacion' },
  { id: '4', nombreEvento: 'Lanzamiento Producto Nova', fechaEvento: '2026-09-29', estado: 'Confirmado' },
];

const cancelacionesMock: CancelacionResumen[] = [
  { id: '1', nombreEvento: 'Matrimonio Herrera - Soto', montoNoRecuperable: 850000, horasRestantesSLA: 2 },
  { id: '2', nombreEvento: 'Evento Social Familia Vidal', montoNoRecuperable: 320000, horasRestantesSLA: 6 },
];

const proveedoresPendientesMock: ProveedorPendiente[] = [
  { id: '1', nombreProveedor: 'Banquetería Don Sabor', servicioAcordado: 'Banquetería', estadoReserva: 'Pendiente' },
  { id: '2', nombreProveedor: 'Florería Bellaflor', servicioAcordado: 'Decoración floral', estadoReserva: 'Pendiente' },
];

const actividadMock: ActividadReciente[] = [
  { id: '1', descripcion: 'Se activó el cargo por cancelación de "Matrimonio Herrera - Soto"', tiempoTranscurrido: 'Hace 20 min' },
  { id: '2', descripcion: 'Contrato firmado para "Lanzamiento Producto Nova"', tiempoTranscurrido: 'Hace 3 horas' },
  { id: '3', descripcion: 'Proveedor "Iluminación Total" actualizó su tabla de penalidades', tiempoTranscurrido: 'Ayer' },
];

const diasHastaEvento = (fechaISO: string): number => {
  const hoy = new Date();
  const fecha = new Date(fechaISO);
  const diferenciaMs = fecha.getTime() - hoy.getTime();
  return Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
};

const Dashboard = () => {
  const [diasFiltro, setDiasFiltro] = useState(30);

  const eventosProximos = useMemo(
    () =>
      eventosMock.filter((evento) => {
        const dias = diasHastaEvento(evento.fechaEvento);
        return dias >= 0 && dias <= diasFiltro;
      }),
    [diasFiltro],
  );

  const montoTotalEnRiesgo = cancelacionesMock.reduce((total, c) => total + c.montoNoRecuperable, 0);

  return (
    <div style={dashboardStyles.page}>
      <Header />
      <main style={dashboardStyles.main}>
        <div>
          <h1 style={dashboardStyles.heading}>Dashboard</h1>
          <p style={dashboardStyles.subheading}>
            Resumen general de eventos, cancelaciones y alertas financieras
          </p>
        </div>

        <div style={dashboardStyles.kpiGrid}>
          <KpiCard
            label="Eventos confirmados"
            value={String(eventosMock.filter((e) => e.estado === 'Confirmado').length)}
          />
          <KpiCard label="Cancelaciones activas" value={String(cancelacionesMock.length)} helperText="Requieren revisión" />
          <KpiCard
            label="Monto en riesgo"
            value={`$${montoTotalEnRiesgo.toLocaleString('es-CL')}`}
            helperText="Por penalidades sin cobrar"
          />
          <KpiCard label="Proveedores pendientes" value={String(proveedoresPendientesMock.length)} helperText="Sin confirmar reserva" />
        </div>

        <ActivityFeed items={actividadMock} />

        <div style={dashboardStyles.sectionsGrid}>
          <SectionCard
            title="Próximos Eventos"
            items={eventosProximos.map((evento) => ({
              id: evento.id,
              primaryText: evento.nombreEvento,
              secondaryText: `${diasHastaEvento(evento.fechaEvento)} días`,
              tono: 'info',
            }))}
            emptyText="No hay eventos en este rango"
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
            title="Cancelaciones sin Resolver"
            items={cancelacionesMock.map((c) => ({
              id: c.id,
              primaryText: c.nombreEvento,
              secondaryText: `${c.horasRestantesSLA} h restantes`,
              tono: c.horasRestantesSLA <= 3 ? 'danger' : 'warning',
            }))}
            emptyText="Sin cancelaciones pendientes"
          />

          <SectionCard
            title="Pendientes de Confirmación"
            items={proveedoresPendientesMock.map((p) => ({
              id: p.id,
              primaryText: p.nombreProveedor,
              secondaryText: p.servicioAcordado,
              tono: 'warning',
            }))}
            emptyText="Todos los proveedores están confirmados"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;