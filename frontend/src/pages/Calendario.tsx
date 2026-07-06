//src/pages/Calendario.tsx

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import CalendarioNavegacion from '../components/calendario/CalendarioNavegacion';
import CalendarioGrid from '../components/calendario/CalendarioGrid';
import CalendarioPanelExpandido from '../components/calendario/CalendarioPanelExpandido';
import { calendarioStyles } from '../styles/pages/Calendario_styles';
import { generarDiasDelMes } from '../utils/calendario';
import { agruparEventosPorFecha } from '../utils/agruparEventosPorFecha';
import type { EventoCalendario, EventoDetalleCompleto } from '../types/calendario.types';
import type { EstadoReservaProveedor } from '../types/dashboard.types';
import { getEvents, getEventById, getEventProviders, getProviders } from '../services/eventApi';

const Calendario = () => {
  const navigate = useNavigate();
  const hoy = new Date();
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth());
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);
  const [eventoSeleccionadoId, setEventoSeleccionadoId] = useState<string | null>(null);
  const [eventos, setEventos] = useState<EventoCalendario[]>([]);
  const [detalleEvento, setDetalleEvento] = useState<EventoDetalleCompleto | null>(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  useEffect(() => {
    getEvents().then(data => {
      setEventos(
        data.map(e => ({
          id: e.id,
          nombreEvento: e.nombre_evento,
          tipoEvento: e.tipo_evento as EventoCalendario['tipoEvento'],
          fechaEvento: e.fecha_evento,
          horaEvento: '',
          estado: e.estado as EventoCalendario['estado'],
        }))
      );
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!eventoSeleccionadoId) {
      setDetalleEvento(null);
      return;
    }
    setCargandoDetalle(true);
    Promise.all([
      getEventById(eventoSeleccionadoId),
      getEventProviders(),
      getProviders(),
    ])
      .then(([evento, eps, proveedores]) => {
        const ep = eps.filter(e => e.id_evento === eventoSeleccionadoId);
        const proveedoresAsociados = ep.map(epp => {
          const prov = proveedores.find(p => p.id === epp.id_proveedor);
          return {
            id: epp.id ?? epp.id_proveedor,
            nombreProveedor: prov?.nombre_empresa ?? epp.id_proveedor,
            categoria: prov?.categoria ?? '',
            servicioAcordado: epp.servicio_acordado,
            costoAcordado: epp.costo_acordado,
            estadoReserva: (epp.estado_reserva ?? 'Pendiente') as EstadoReservaProveedor,
          };
        });
        setDetalleEvento({
          id: evento.id,
          nombreEvento: evento.nombre_evento,
          tipoEvento: evento.tipo_evento as EventoCalendario['tipoEvento'],
          fechaEvento: evento.fecha_evento,
          horaEvento: '',
          estado: evento.estado as EventoCalendario['estado'],
          presupuestoTotal: evento.presupuesto_total,
          costoTotalReal: evento.costo_total_real ?? 0,
          anticipoPagado: null,
          proveedoresAsociados,
        });
      })
      .catch(() => setDetalleEvento(null))
      .finally(() => setCargandoDetalle(false));
  }, [eventoSeleccionadoId]);

  const dias = useMemo(() => generarDiasDelMes(anio, mes), [anio, mes]);
  const eventosPorFecha = useMemo(() => agruparEventosPorFecha(eventos), [eventos]);

  const eventosDelDiaSeleccionado = fechaSeleccionada ? eventosPorFecha.get(fechaSeleccionada) ?? [] : [];

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

  const handleCrearEvento = (fecha: string) => {
    navigate(`/eventos/crear?fecha=${fecha}`);
  };

  const handleEditarEvento = (id: string) => {
    navigate(`/eventos/${id}`);
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
            cargandoDetalle={cargandoDetalle}
            onSeleccionarEvento={(id) => setEventoSeleccionadoId(id === eventoSeleccionadoId ? null : id)}
            onCrearEvento={handleCrearEvento}
            onEditarEvento={handleEditarEvento}
          />
        )}
      </main>
    </div>
  );
};

export default Calendario;
