//src/pages/Calendario.tsx

import { useMemo, useState } from 'react';
import Header from '../components/common/Header';
import CalendarioNavegacion from '../components/calendario/CalendarioNavegacion';
import CalendarioGrid from '../components/calendario/CalendarioGrid';
import CalendarioPanelExpandido from '../components/calendario/CalendarioPanelExpandido';
import { calendarioStyles } from '../styles/pages/Calendario_styles';
import { generarDiasDelMes } from '../utils/calendario';
import { agruparEventosPorFecha } from '../utils/agruparEventosPorFecha';
import type { EventoCalendario, EventoDetalleCompleto } from '../types/calendario.types';

// Mock de filas de "eventos". TODO: reemplazar por select real:
// select id, nombre_evento, tipo_evento, fecha_evento, hora_evento, estado
// from eventos where fecha_evento between :inicioMesVisible and :finMesVisible
const eventosMock: EventoCalendario[] = [
  { id: '1', nombreEvento: 'Boda Fuentes - Rojas', tipoEvento: 'Matrimonio', fechaEvento: '2026-07-18', horaEvento: '18:00', estado: 'Confirmado' },
  { id: '2', nombreEvento: 'Aniversario ACME', tipoEvento: 'Corporativo', fechaEvento: '2026-07-18', horaEvento: '20:30', estado: 'Confirmado' },
  { id: '3', nombreEvento: 'Lanzamiento Nova', tipoEvento: 'Corporativo', fechaEvento: '2026-07-25', horaEvento: '19:00', estado: 'Confirmado' },
  { id: '8', nombreEvento: 'Seminario Fintech', tipoEvento: 'Corporativo', fechaEvento: '2026-07-01', horaEvento: '09:00', estado: 'Ejecucion' },
];

// Mock del detalle completo (join eventos + contratos_cliente + evento_proveedor + proveedores).
// TODO: reemplazar por consulta real al hacer clic en un evento, usando su id.
const detalleMock: Record<string, EventoDetalleCompleto> = {
  '1': {
    id: '1', nombreEvento: 'Boda Fuentes - Rojas', tipoEvento: 'Matrimonio', fechaEvento: '2026-07-18',
    horaEvento: '18:00', estado: 'Confirmado', presupuestoTotal: 8500000, costoTotalReal: 7200000,
    anticipoPagado: 4250000,
    proveedoresAsociados: [
      { id: 'p1', nombreProveedor: 'Banquetería Don Sabor', categoria: 'Banquetería', servicioAcordado: 'Servicio de banquetería', costoAcordado: 3200000, estadoReserva: 'Pagado' },
      { id: 'p2', nombreProveedor: 'Florería Bellaflor', categoria: 'Decoración', servicioAcordado: 'Decoración floral', costoAcordado: 900000, estadoReserva: 'Reservado' },
    ],
  },
  '2': {
    id: '2', nombreEvento: 'Aniversario ACME', tipoEvento: 'Corporativo', fechaEvento: '2026-07-18',
    horaEvento: '20:30', estado: 'Confirmado', presupuestoTotal: 5000000, costoTotalReal: 4100000,
    anticipoPagado: 2500000,
    proveedoresAsociados: [
      { id: 'p3', nombreProveedor: 'Iluminación Total', categoria: 'Iluminación', servicioAcordado: 'Set de iluminación', costoAcordado: 600000, estadoReserva: 'Reservado' },
    ],
  },
  '3': {
    id: '3', nombreEvento: 'Lanzamiento Nova', tipoEvento: 'Corporativo', fechaEvento: '2026-07-25',
    horaEvento: '19:00', estado: 'Confirmado', presupuestoTotal: 6200000, costoTotalReal: 0,
    anticipoPagado: 3100000, proveedoresAsociados: [],
  },
  '8': {
    id: '8', nombreEvento: 'Seminario Fintech', tipoEvento: 'Corporativo', fechaEvento: '2026-07-01',
    horaEvento: '09:00', estado: 'Ejecucion', presupuestoTotal: 3000000, costoTotalReal: 2950000,
    anticipoPagado: null, proveedoresAsociados: [],
  },
};

const Calendario = () => {
  const hoy = new Date();
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth());
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);
  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState<string | null>(null);

  const dias = useMemo(() => generarDiasDelMes(anio, mes), [anio, mes]);
  const eventosPorFecha = useMemo(() => agruparEventosPorFecha(eventosMock), []);

  const eventosDelDiaSeleccionado = fechaSeleccionada ? eventosPorFecha.get(fechaSeleccionada) ?? [] : [];
  const detalleEvento = eventoSeleccionadoId ? detalleMock[eventoSeleccionadoId] ?? null : null;

  const cambiarMes = (delta: number) => {
    const nuevaFecha = new Date(anio, mes + delta, 1);
    setAnio(nuevaFecha.getFullYear());
    setMes(nuevaFecha.getMonth());
    setFechaSeleccionada(null);
    setEventoSeleccionadoId(null);
  };

  const seleccionarFecha = (fecha: string) => {
    setFechaSeleccionada(fecha === fechaSeleccionada ? null : fecha);
    setEventoSeleccionadoId(null);
  };

  return (
    <div style={calendarioStyles.pagina}>
      <Header />
      <main style={calendarioStyles.main}>
        <h1 style={calendarioStyles.encabezado}>Calendario de Eventos</h1>

        <CalendarioNavegacion
          anio={anio}
          mes={mes}
          onMesAnterior={() => cambiarMes(-1)}
          onMesSiguiente={() => cambiarMes(1)}
        />

        <CalendarioGrid
          dias={dias}
          eventosPorFecha={eventosPorFecha}
          fechaSeleccionada={fechaSeleccionada}
          onSeleccionarFecha={seleccionarFecha}
        />

        {fechaSeleccionada && (
          <CalendarioPanelExpandido
            fecha={fechaSeleccionada}
            eventos={eventosDelDiaSeleccionado}
            eventoSeleccionadoId={eventoSeleccionadoId}
            detalleEvento={detalleEvento}
            cargandoDetalle={false}
            onSeleccionarEvento={(id) => setEventoSeleccionadoId(id === eventoSeleccionadoId ? null : id)}
          />
        )}
      </main>
    </div>
  );
};

export default Calendario;