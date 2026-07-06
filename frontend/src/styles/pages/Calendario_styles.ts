//src/styles/pages/Calendario_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography } from '../Global';

export const calendarioStyles: Record<string, CSSProperties> = {
  pagina: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: colors.background,
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: '90rem',
    margin: '0 auto',
    padding: spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  encabezado: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
};