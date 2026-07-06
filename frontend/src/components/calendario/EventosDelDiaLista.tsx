//src/components/calendario/EventosDelDiaLista.tsx

import type { FC } from 'react';
import { eventosDelDiaListaStyles } from '../../styles/components/calendario/eventosDelDiaLista_styles';
import type { EventoCalendario } from '../../types/calendario.types';

interface EventosDelDiaListaProps {
  fecha: string;
  eventos: EventoCalendario[];
  eventoSeleccionadoId: string | null;
  onSeleccionarEvento: (id: string) => void;
}

const formatearFecha = (fechaISO: string): string =>
  new Date(`${fechaISO}T00:00:00`).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

const EventosDelDiaLista: FC<EventosDelDiaListaProps> = ({ fecha, eventos, eventoSeleccionadoId, onSeleccionarEvento }) => (
  <div style={eventosDelDiaListaStyles.contenedor}>
    <h3 style={eventosDelDiaListaStyles.titulo}>{formatearFecha(fecha)}</h3>
    <ul style={eventosDelDiaListaStyles.lista}>
      {eventos.map((evento) => (
        <li key={evento.id}>
          <button
            type="button"
            style={{
              ...eventosDelDiaListaStyles.item,
              ...(evento.id === eventoSeleccionadoId ? eventosDelDiaListaStyles.itemActivo : {}),
            }}
            onClick={() => onSeleccionarEvento(evento.id)}
          >
            <span style={eventosDelDiaListaStyles.nombre}>{evento.nombreEvento}</span>
            <span style={eventosDelDiaListaStyles.hora}>{evento.horaEvento}</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default EventosDelDiaLista;