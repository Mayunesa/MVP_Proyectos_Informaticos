//src/styles/components/calendario/eventoDetalle_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii } from '../../Global';

export const eventoDetalleStyles: Record<string, CSSProperties> = {
  contenedor: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  vacio: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '8rem',
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  encabezado: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  titulo: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    margin: 0,
  },
  estado: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.white,
    backgroundColor: colors.info,
    borderRadius: radii.round,
    padding: `${spacing.xs} ${spacing.sm}`,
  },
  filaDato: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottom: `0.0625rem solid ${colors.border}`,
  },
  etiqueta: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  valor: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  subtitulo: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    marginBottom: 0,
  },
  listaProveedores: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  proveedorItem: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: colors.background,
  },
  proveedorNombre: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  proveedorServicio: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  proveedorEstado: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  sinProveedores: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
};