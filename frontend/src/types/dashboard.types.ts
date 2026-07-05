export type Tono = 'success' | 'warning' | 'danger' | 'info';

export interface EventoResumen {
  id: string;
  nombreEvento: string;
  fechaEvento: string;
  estado: 'Cotizacion' | 'Confirmado' | 'Ejecucion' | 'Finalizado' | 'Cancelado' | 'Reagendado';
}

export interface CancelacionResumen {
  id: string;
  nombreEvento: string;
  montoNoRecuperable: number;
  horasRestantesSLA: number;
}

export interface ProveedorPendiente {
  id: string;
  nombreProveedor: string;
  servicioAcordado: string;
  estadoReserva: 'Pendiente' | 'Reservado' | 'Pagado' | 'Cancelado';
}

export interface ActividadReciente {
  id: string;
  descripcion: string;
  tiempoTranscurrido: string;
}