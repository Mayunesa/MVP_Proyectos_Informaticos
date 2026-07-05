//src/styles/pages/Dashboard_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography } from '../Global';

export const dashboardStyles: Record<string, CSSProperties> = {
  page: {
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
    gap: spacing.xl,
  },
  heading: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  subheading: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
    marginTop: spacing.xs,
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
    gap: spacing.lg,
  },
  sectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
    gap: spacing.lg,
  },
};