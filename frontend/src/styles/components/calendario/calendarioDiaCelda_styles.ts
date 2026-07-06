//src/styles/components/calendario/calendarioDiaCelda_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii } from '../../Global';

export const calendarioDiaCeldaStyles: Record<string, CSSProperties> = {
  celda: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    aspectRatio: '1 / 1',
    width: '100%',
    borderRadius: radii.sm,
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    cursor: 'pointer',
  },
  fueraDeMes: {
    color: colors.textSecondary,
    opacity: 0.4,
    cursor: 'default',
  },
  hoy: {
    border: `0.0625rem solid ${colors.primary}`,
  },
  seleccionada: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  numero: {
    fontWeight: typography.weights.medium,
  },
  indicador: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.white,
    backgroundColor: colors.accent,
    borderRadius: radii.round,
    minWidth: '1.25rem',
    height: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${spacing.xs}`,
  },
};