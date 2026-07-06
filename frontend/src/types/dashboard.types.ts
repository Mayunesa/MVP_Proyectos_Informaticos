//src/types/dashboard.types.ts

export type Tono = 'success' | 'warning' | 'danger' | 'info';
export type TipoEvento = 'Matrimonio' | 'Corporativo' | 'Social' | 'Otro';
export type EstadoEvento = 'Cotizacion' | 'Confirmado' | 'Ejecucion' | 'Finalizado' | 'Cancelado' | 'Reagendado';
export type EstadoReservaProveedor = 'Pendiente' | 'Reservado' | 'Pagado' | 'Cancelado';

export interface EventoResumen {
  id: string;
  nombreEvento: string;
  tipoEvento: TipoEvento;
  fechaEvento: string;
  estado: EstadoEvento;
}

export interface ReservaProveedorPendiente {
  id: string;
  nombreEvento: string;
  nombreProveedor: string;
  categoriaProveedor: string;
  servicioAcordado: string;
  estadoReserva: EstadoReservaProveedor;
}

export interface ProveedorPendiente {
  id: string;
  nombreProveedor: string;
  servicioAcordado: string;
  estadoReserva: 'Pendiente' | 'Reservado' | 'Pagado' | 'Cancelado';
}

export interface CancelacionResumen {
  id: string;
  nombreEvento: string;
  montoNoRecuperable: number;
  horasRestantesSLA: number;
}

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface ActividadReciente {
  id: string;
  descripcion: string;
  tiempoTranscurrido: string;
}