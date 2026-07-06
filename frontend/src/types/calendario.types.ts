//src/types/calendario.types.ts

import type { TipoEvento, EstadoEvento, EstadoReservaProveedor } from './dashboard.types';

export interface EventoCalendario {
  id: string;
  nombreEvento: string;
  tipoEvento: TipoEvento;
  fechaEvento: string; // 'YYYY-MM-DD', columna fecha_evento
  horaEvento: string;  // 'HH:mm', columna nueva hora_evento
  estado: EstadoEvento;
}

export interface ProveedorAsociado {
  id: string;
  nombreProveedor: string;
  categoria: string;
  servicioAcordado: string;
  costoAcordado: number;
  estadoReserva: EstadoReservaProveedor;
}

export interface EventoDetalleCompleto extends EventoCalendario {
  presupuestoTotal: number;
  costoTotalReal: number;
  anticipoPagado: number | null;
  proveedoresAsociados: ProveedorAsociado[];
}