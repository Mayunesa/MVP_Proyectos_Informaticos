//src/styles/components/calendario/calendarioGrid_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii, shadows } from '../../Global';

export const calendarioGridStyles: Record<string, CSSProperties> = {
  wrapper: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    boxShadow: shadows.sm,
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  filaEncabezado: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: spacing.xs,
  },
  encabezadoDia: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: spacing.xs,
  },
};