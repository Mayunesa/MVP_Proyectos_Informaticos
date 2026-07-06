//src/styles/components/estadoEventosChart_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii, shadows } from '../Global';
import type { EstadoEvento } from '../../types/dashboard.types';

export const coloresPorEstado: Record<EstadoEvento, string> = {
  Cotizacion: colors.warning,
  Confirmado: colors.info,
  Ejecucion: colors.primary,
  Finalizado: colors.success,
  Cancelado: colors.danger,
  Reagendado: colors.primaryLight,
};

export const estadoEventosChartStyles: Record<string, CSSProperties> = {
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    boxShadow: shadows.sm,
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    margin: 0,
  },
  chartArea: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
    height: '10rem',
  },
  barGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    height: '100%',
    gap: spacing.xs,
  },
  barValue: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
  },
  bar: {
    width: '70%',
    borderRadius: `${radii.sm} ${radii.sm} 0 0`,
    minHeight: '0.25rem',
  },
  barLabel: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
};