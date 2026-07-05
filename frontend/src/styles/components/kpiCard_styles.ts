//src/styles/components/kpiCard_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii, shadows } from '../Global';

export const kpiCardStyles: Record<string, CSSProperties> = {
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    boxShadow: shadows.sm,
    borderTop: `0.25rem solid ${colors.primary}`,
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  label: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  value: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xxl,
    color: colors.textPrimary,
    fontWeight: typography.weights.bold,
  },
  helper: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
};