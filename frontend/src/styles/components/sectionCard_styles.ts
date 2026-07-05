//src/styles/components/sectionCard_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii, shadows } from '../Global';

export const sectionCardStyles: Record<string, CSSProperties> = {
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    boxShadow: shadows.sm,
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    margin: 0,
  },
  badge: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.white,
    backgroundColor: colors.primary,
    borderRadius: radii.round,
    padding: `${spacing.xs} ${spacing.sm}`,
    minWidth: '1.5rem',
    textAlign: 'center',
  },
  select: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    backgroundColor: colors.background,
    border: `0.0625rem solid ${colors.border}`,
    borderRadius: radii.sm,
    padding: `${spacing.xs} ${spacing.sm}`,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottom: `0.0625rem solid ${colors.border}`,
  },
  itemPrimary: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    fontWeight: typography.weights.medium,
  },
  itemSecondary: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
  empty: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
};

export const toneColors: Record<string, string> = {
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
  info: colors.info,
};