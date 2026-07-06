//src/utils/agruparPorCampo.ts

import type { DonutSegment } from '../types/dashboard.types';

export function agruparPorCampo<T, K extends keyof T>(
  items: T[],
  campo: K,
  colores: Record<string, string>,
): DonutSegment[] {
  const conteo = new Map<string, number>();
  items.forEach((item) => {
    const clave = String(item[campo]);
    conteo.set(clave, (conteo.get(clave) ?? 0) + 1);
  });
  return Array.from(conteo.entries()).map(([label, value]) => ({
    label,
    value,
    color: colores[label] ?? '#999999',
  }));
}