//src/components/calendario/EventoDetalle.tsx

import type { FC } from 'react';
import { Pencil } from 'lucide-react';
import { eventoDetalleStyles } from '../../styles/components/calendario/eventoDetalle_styles';
import type { EventoDetalleCompleto } from '../../types/calendario.types';

interface EventoDetalleProps {
  evento: EventoDetalleCompleto | null;
  cargando: boolean;
  onEditar?: (id: string) => void;
}

const formatoCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

const EventoDetalle: FC<EventoDetalleProps> = ({ evento, cargando, onEditar }) => {
  if (cargando) {
    return <div style={eventoDetalleStyles.vacio}>Cargando detalle del evento...</div>;
  }

  if (!evento) {
    return <div style={eventoDetalleStyles.vacio}>Selecciona un evento para ver el detalle</div>;
  }

  return (
    <div style={eventoDetalleStyles.contenedor}>
      <div style={eventoDetalleStyles.encabezado}>
        <h3 style={eventoDetalleStyles.titulo}>{evento.nombreEvento}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={eventoDetalleStyles.estado}>{evento.estado}</span>
          {onEditar && (
            <button type="button"
              onClick={() => onEditar(evento.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--color-primary, #4B3F9E)', padding: '0.25rem',
              }}
              title="Editar evento"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      </div>

      <div style={eventoDetalleStyles.filaDato}>
        <span style={eventoDetalleStyles.etiqueta}>Tipo</span>
        <span style={eventoDetalleStyles.valor}>{evento.tipoEvento}</span>
      </div>
      <div style={eventoDetalleStyles.filaDato}>
        <span style={eventoDetalleStyles.etiqueta}>Horario</span>
        <span style={eventoDetalleStyles.valor}>{evento.horaEvento} hrs</span>
      </div>
      <div style={eventoDetalleStyles.filaDato}>
        <span style={eventoDetalleStyles.etiqueta}>Presupuesto total</span>
        <span style={eventoDetalleStyles.valor}>{formatoCLP.format(evento.presupuestoTotal)}</span>
      </div>
      <div style={eventoDetalleStyles.filaDato}>
        <span style={eventoDetalleStyles.etiqueta}>Costo real</span>
        <span style={eventoDetalleStyles.valor}>{formatoCLP.format(evento.costoTotalReal)}</span>
      </div>
      {evento.anticipoPagado !== null && (
        <div style={eventoDetalleStyles.filaDato}>
          <span style={eventoDetalleStyles.etiqueta}>Anticipo pagado</span>
          <span style={eventoDetalleStyles.valor}>{formatoCLP.format(evento.anticipoPagado)}</span>
        </div>
      )}

      <h4 style={eventoDetalleStyles.subtitulo}>Proveedores asociados</h4>
      <ul style={eventoDetalleStyles.listaProveedores}>
        {evento.proveedoresAsociados.length === 0 && (
          <li style={eventoDetalleStyles.sinProveedores}>Sin proveedores asociados</li>
        )}
        {evento.proveedoresAsociados.map((proveedor) => (
          <li key={proveedor.id} style={eventoDetalleStyles.proveedorItem}>
            <span style={eventoDetalleStyles.proveedorNombre}>{proveedor.nombreProveedor}</span>
            <span style={eventoDetalleStyles.proveedorServicio}>{proveedor.servicioAcordado}</span>
            <span style={eventoDetalleStyles.proveedorEstado}>{proveedor.estadoReserva}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventoDetalle;