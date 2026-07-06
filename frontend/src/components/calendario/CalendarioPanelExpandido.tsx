//src/components/calendario/CalendarioPanelExpandido.tsx

import type { FC } from 'react';
import { Plus } from 'lucide-react';
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
  onCrearEvento?: (fecha: string) => void;
  onEditarEvento?: (id: string) => void;
  onPagarProveedor?: (proveedorId: string) => void;
}

const CalendarioPanelExpandido: FC<CalendarioPanelExpandidoProps> = ({
  fecha, eventos, eventoSeleccionadoId, detalleEvento, cargandoDetalle,
  onSeleccionarEvento, onCrearEvento, onEditarEvento, onPagarProveedor,
}) => (
  <div style={calendarioPanelExpandidoStyles.contenedor}>
    <div style={calendarioPanelExpandidoStyles.columnaLista}>
      <EventosDelDiaLista
        fecha={fecha}
        eventos={eventos}
        eventoSeleccionadoId={eventoSeleccionadoId}
        onSeleccionarEvento={onSeleccionarEvento}
      />
      {onCrearEvento && (
        <button
          type="button"
          onClick={() => onCrearEvento(fecha)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.75rem',
            padding: '0.375rem 0.75rem', background: 'none', border: '1px dashed #cbd5e1',
            borderRadius: '0.375rem', color: '#4B3F9E', cursor: 'pointer', fontSize: '0.8125rem',
            width: '100%', justifyContent: 'center', fontFamily: 'inherit',
          }}
        >
          <Plus size={14} /> Nuevo Evento
        </button>
      )}
    </div>
    <div style={calendarioPanelExpandidoStyles.columnaDetalle}>
      <EventoDetalle evento={detalleEvento} cargando={cargandoDetalle} onEditar={onEditarEvento} onPagarProveedor={onPagarProveedor} />
    </div>
  </div>
);

export default CalendarioPanelExpandido;