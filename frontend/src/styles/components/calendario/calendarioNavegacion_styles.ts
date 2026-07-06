//src/styles/components/calendario/calendarioNavegacion_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii } from '../../Global';

export const calendarioNavegacionStyles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  boton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: radii.round,
    border: `0.0625rem solid ${colors.border}`,
    backgroundColor: colors.surface,
    color: colors.primary,
    cursor: 'pointer',
  },
  titulo: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    minWidth: '12rem',
    textAlign: 'center',
    margin: 0,
    textTransform: 'capitalize',
  },
};