//src/styles/components/calendarioPanelExpandido_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, radii, shadows } from '../../Global';

export const calendarioPanelExpandidoStyles: Record<string, CSSProperties> = {
  contenedor: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    boxShadow: shadows.md,
    padding: spacing.lg,
  },
  columnaLista: {
    flex: '1 1 16rem',
    minWidth: '16rem',
  },
  columnaDetalle: {
    flex: '2 1 20rem',
    minWidth: '16rem',
  },
};