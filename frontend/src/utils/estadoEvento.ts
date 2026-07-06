//src/utils/estadoEvento.ts

import type { EstadoEvento } from '../types/event.types';

export const estadoEventoLabels: Record<EstadoEvento, string> = {
  Cotizacion: 'En Cotización',
  Confirmado: 'Confirmado',
  Ejecucion: 'En Ejecución',
  Finalizado: 'Finalizado',
  Cancelado: 'Cancelado',
  Reagendado: 'Reagendado',
};

export const estadoEventoOptions: { value: EstadoEvento; label: string }[] =
  (Object.keys(estadoEventoLabels) as EstadoEvento[]).map((value) => ({
    value,
    label: estadoEventoLabels[value],
  }));