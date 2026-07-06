//src/components/calendario/CalendarioPanelExpandido.tsx

import type { FC } from 'react';
import { calendarioPanelExpandidoStyles } from '../../styles/components/calendario/calendarioPanelExpandido_styles';
import EventosDelDiaLista from './EventosDelDiaLista';
import EventoDetalle from './EventoDetalle';
import type { EventoCalendario, EventoDetalleCompleto } from '../../types/calendario.types';

interface CalendarioPanelExpandidoProps {
  fecha: string;
  eventos: EventoCalendario[];
  eventoSeleccionadoId: string | null;
  detalleEvento: EventoDetalleCompleto | null;
  cargandoDetalle: boolean;
  onSeleccionarEvento: (id: string) => void;
}

const CalendarioPanelExpandido: FC<CalendarioPanelExpandidoProps> = ({
  fecha, eventos, eventoSeleccionadoId, detalleEvento, cargandoDetalle, onSeleccionarEvento,
}) => (
  <div style={calendarioPanelExpandidoStyles.contenedor}>
    <div style={calendarioPanelExpandidoStyles.columnaLista}>
      <EventosDelDiaLista
        fecha={fecha}
        eventos={eventos}
        eventoSeleccionadoId={eventoSeleccionadoId}
        onSeleccionarEvento={onSeleccionarEvento}
      />
    </div>
    <div style={calendarioPanelExpandidoStyles.columnaDetalle}>
      <EventoDetalle evento={detalleEvento} cargando={cargandoDetalle} />
    </div>
  </div>
);

export default CalendarioPanelExpandido;