//src/pages/Calendario.tsx

import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { getEvents, getEventById, getEventProviders, getProviders, updateEventProvider } from '../services/eventApi';

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

  function nearest15th(date: Date): Date {
    const y = date.getFullYear();
    const m = date.getMonth();
    const candidates = [
      new Date(y, m - 1, 15),
      new Date(y, m, 15),
      new Date(y, m + 1, 15),
    ];
    return candidates.reduce((closest, c) =>
      Math.abs(c.getTime() - date.getTime()) < Math.abs(closest.getTime() - date.getTime())
        ? c
        : closest
    );
  }

  function calcularAnticipo(evento: { created_at?: string; fecha_evento: string; presupuesto_total: number; estado: string }): number {
    const minimo = evento.estado === 'Confirmado' ? 0.5 : 0;
    if (!evento.created_at) return Math.round(evento.presupuesto_total * minimo * 100) / 100;
    const fechaReservacion = new Date(evento.created_at);
    const fechaEvento = new Date(evento.fecha_evento);
    const fechaCancelacion = new Date();
    const duracionTotal = fechaEvento.getTime() - fechaReservacion.getTime();
    if (duracionTotal <= 0) return Math.round(evento.presupuesto_total * minimo * 100) / 100;
    const fechaHito25 = new Date(fechaReservacion.getTime() + duracionTotal * 0.25);
    const fechaHito50 = new Date(fechaReservacion.getTime() + duracionTotal * 0.5);
    const fechaHito75 = new Date(fechaReservacion.getTime() + duracionTotal * 0.75);
    const pago25 = nearest15th(fechaHito25);
    const pago50 = nearest15th(fechaHito50);
    const pago75 = nearest15th(fechaHito75);
    let porcentaje: number;
    if (fechaCancelacion >= pago75) {
      porcentaje = 1;
    } else if (fechaCancelacion >= pago50) {
      porcentaje = 0.75;
    } else if (fechaCancelacion >= pago25) {
    porcentaje = 0.5;
    } else {
      porcentaje = minimo;
    }
    return Math.max(
      Math.round(evento.presupuesto_total * porcentaje * 100) / 100,
      Math.round(evento.presupuesto_total * minimo * 100) / 100
    );
  }

  function buildDetalle(
    evento: { id: string; nombre_evento: string; tipo_evento: string; fecha_evento: string; estado: string; presupuesto_total: number; created_at?: string },
    proveedoresAsociados: EventoDetalleCompleto['proveedoresAsociados']
  ): EventoDetalleCompleto {
    const costoTotalReal = proveedoresAsociados
      .filter(p => p.estadoReserva === 'Pagado')
      .reduce((sum, p) => sum + p.costoAcordado, 0);
    const anticipoPagado = calcularAnticipo(evento);
    return {
      id: evento.id,
      nombreEvento: evento.nombre_evento,
      tipoEvento: evento.tipo_evento as EventoCalendario['tipoEvento'],
      fechaEvento: evento.fecha_evento,
      horaEvento: '',
      estado: evento.estado as EventoCalendario['estado'],
      presupuestoTotal: evento.presupuesto_total,
      costoTotalReal,
      anticipoPagado,
      proveedoresAsociados,
    };
  }

  const cargarDetalle = useCallback(async (eventoId: string) => {
    setCargandoDetalle(true);
    try {
      const [evento, eps, proveedores] = await Promise.all([
        getEventById(eventoId),
        getEventProviders(),
        getProviders(),
      ]);
      const ep = eps.filter(e => e.id_evento === eventoId);
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
      setDetalleEvento(buildDetalle(evento, proveedoresAsociados));
    } catch {
      setDetalleEvento(null);
    } finally {
      setCargandoDetalle(false);
    }
  }, []);

  useEffect(() => {
    if (!eventoSeleccionadoId) {
      setDetalleEvento(null);
      return;
    }
    cargarDetalle(eventoSeleccionadoId);
  }, [eventoSeleccionadoId, cargarDetalle]);

  const handlePagarProveedor = async (proveedorId: string) => {
    try {
      await updateEventProvider(proveedorId, { estado_reserva: 'Pagado' });
      if (eventoSeleccionadoId) {
        cargarDetalle(eventoSeleccionadoId);
      }
    } catch {
      // ignore
    }
  };

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
            onPagarProveedor={handlePagarProveedor}
          />
        )}
      </main>
    </div>
  );
};

export default Calendario;
