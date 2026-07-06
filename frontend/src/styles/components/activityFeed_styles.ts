//src/styles/components/activityFeed_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii, shadows } from '../Global';

export const activityFeedStyles: Record<string, CSSProperties> = {
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
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dot: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: radii.round,
    backgroundColor: colors.accent,
    marginTop: '0.4rem',
    flexShrink: 0,
  },
  textGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
  description: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
  },
  time: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
};