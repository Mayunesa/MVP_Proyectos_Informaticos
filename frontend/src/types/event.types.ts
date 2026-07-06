export type TipoEvento = 'Matrimonio' | 'Corporativo' | 'Social' | 'Otro';
export type EstadoEvento = 'Cotizacion' | 'Confirmado' | 'Ejecucion' | 'Finalizado' | 'Cancelado' | 'Reagendado';
export type EstadoReserva = 'Pendiente' | 'Reservado' | 'Pagado' | 'Cancelado';
export type EstadoContrato = 'Vigente' | 'Cancelado' | 'Reagendado';
export type EstadoAlianza = 'Activo' | 'Inactivo';

export interface CreateEventoDTO {
  nombre_evento: string;
  tipo_evento: TipoEvento;
  fecha_evento: string;
  fecha_cancelacion?: string;
  presupuesto_total: number;
  costo_total_real?: number;
  estado?: EstadoEvento;
}

export interface Evento extends CreateEventoDTO {
  id: string;
}

export type EventoFormData = CreateEventoDTO;
export type UpdateEventoDTO = Partial<CreateEventoDTO>;

export type CreateProveedorDTO = Omit<Proveedor, 'id'>;
export type ProveedorFormData = CreateProveedorDTO;

export interface Proveedor {
  id: string;
  nombre_empresa: string;
  categoria: string;
  contacto_nombre?: string;
  telefono?: string;
  email?: string;
  estado_alianza: EstadoAlianza;
  penalidad_default_porcentaje: number;
}

export interface EventoProveedor {
  id?: string;
  id_evento: string;
  id_proveedor: string;
  servicio_acordado: string;
  costo_acordado: number;
  porcentaje_penalidad_aplicado?: number;
  estado_reserva?: EstadoReserva;
}

export type EventoProveedorFormData = Omit<EventoProveedor, 'id' | 'id_evento'>;

export interface ContratoCliente {
  id?: string;
  id_evento: string;
  fecha_firma: string;
  anticipo_pagado: number;
  url_documento_firmado?: string;
  estado_contrato?: EstadoContrato;
}

export type ContratoClienteFormData = Omit<ContratoCliente, 'id' | 'id_evento'>;
