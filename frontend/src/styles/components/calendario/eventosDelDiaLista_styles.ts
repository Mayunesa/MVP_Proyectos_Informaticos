//src/styles/components/calendario/eventosDelDiaLista_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii } from '../../Global';

export const eventosDelDiaListaStyles: Record<string, CSSProperties> = {
  contenedor: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  titulo: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.textSecondary,
    textTransform: 'capitalize',
    margin: 0,
  },
  lista: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  item: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: radii.sm,
    border: `0.0625rem solid ${colors.border}`,
    backgroundColor: colors.background,
    cursor: 'pointer',
    textAlign: 'left',
  },
  itemActivo: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    boxShadow: `0 0 0 0.0625rem ${colors.primary}`,
  },
  nombre: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  hora: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.accent,
  },
};