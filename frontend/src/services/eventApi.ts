import type {
  CreateEventoDTO, Evento,
  Proveedor, EventoProveedor, EventoProveedorFormData,
  ContratoCliente, ContratoClienteFormData,
} from '../types/event.types';

const BASE_URL = '/api/eventos';
const PROVEEDORES_URL = '/api/proveedores';
const EVENTO_PROVEEDOR_URL = '/api/eventos-proveedores';
const CONTRATOS_URL = '/api/contratos-cliente';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    super(`API error ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (res.status === 204) return undefined as T;

  const body = await res.json();

  if (!res.ok) {
    throw new ApiError(res.status, body);
  }

  return body as T;
}

export const createEvent = (data: CreateEventoDTO): Promise<Evento> =>
  request<Evento>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getEvents = (): Promise<Evento[]> =>
  request<Evento[]>(BASE_URL);

export const getEventById = (id: string): Promise<Evento> =>
  request<Evento>(`${BASE_URL}/${id}`);

export const updateEvent = (id: string, data: Partial<CreateEventoDTO>): Promise<Evento> =>
  request<Evento>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteEvent = (id: string): Promise<void> =>
  request<void>(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

export const getProviders = (): Promise<Proveedor[]> =>
  request<Proveedor[]>(PROVEEDORES_URL);

export const getProviderById = (id: string): Promise<Proveedor> =>
  request<Proveedor>(`${PROVEEDORES_URL}/${id}`);

export const createProvider = (data: Omit<Proveedor, 'id'>): Promise<Proveedor> =>
  request<Proveedor>(PROVEEDORES_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateProvider = (id: string, data: Partial<Proveedor>): Promise<Proveedor> =>
  request<Proveedor>(`${PROVEEDORES_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteProvider = (id: string): Promise<void> =>
  request<void>(`${PROVEEDORES_URL}/${id}`, {
    method: 'DELETE',
  });

export const getEventProviders = (): Promise<EventoProveedor[]> =>
  request<EventoProveedor[]>(EVENTO_PROVEEDOR_URL);

export const createEventProvider = (data: EventoProveedor): Promise<EventoProveedor> =>
  request<EventoProveedor>(EVENTO_PROVEEDOR_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const deleteEventProvider = (id: string): Promise<void> =>
  request<void>(`${EVENTO_PROVEEDOR_URL}/${id}`, {
    method: 'DELETE',
  });

export const createContract = (data: ContratoCliente): Promise<ContratoCliente> =>
  request<ContratoCliente>(CONTRATOS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getContracts = (): Promise<ContratoCliente[]> =>
  request<ContratoCliente[]>(CONTRATOS_URL);
