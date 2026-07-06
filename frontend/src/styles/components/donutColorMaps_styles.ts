//src/components/dashboard/donutColorMaps.ts

import { colors } from '../Global';

export const coloresPorTipoEvento: Record<string, string> = {
  Matrimonio: colors.primary,
  Corporativo: colors.info,
  Social: colors.success,
  Otro: colors.warning,
};

export const coloresPorCategoriaProveedor: Record<string, string> = {
  Banquetería: colors.primary,
  Decoración: colors.accent,
  Iluminación: colors.warning,
  Mobiliario: colors.success,
};