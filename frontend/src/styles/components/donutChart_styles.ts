//src/styles/components/donutChart_styles.ts

import type { CSSProperties } from 'react';
import { colors, radii, typography } from '../Global';

export const donutChartStyles: Record<string, CSSProperties> = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem 0',
  },
  ring: {
    width: '6rem',
    height: '6rem',
    borderRadius: radii.round,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hole: {
    width: '3.75rem',
    height: '3.75rem',
    borderRadius: radii.round,
    backgroundColor: colors.surface,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg,
    color: colors.textPrimary,
  },
};