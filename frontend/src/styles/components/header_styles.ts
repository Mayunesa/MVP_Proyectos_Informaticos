//src/styles/components/header_styles.ts

import type { CSSProperties } from 'react';
import { colors, spacing, typography, radii } from '../Global';

export const headerStyles: Record<string, CSSProperties> = {
  header: {
    backgroundColor: colors.primary,
    padding: `${spacing.md} ${spacing.xl}`,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.md,
    maxWidth: '90rem',
    margin: '0 auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoImage: {
    height: '2rem',
    width: 'auto',
  },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    letterSpacing: '0.05em',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: radii.sm,
    color: colors.white,
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s ease',
  },
  activeNavLink: {
    backgroundColor: colors.primaryDark,
  },
};

export const navLinkHoverBg = 'rgba(255, 255, 255, 0.12)';