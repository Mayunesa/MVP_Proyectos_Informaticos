import type { CSSProperties } from 'react';

export const colors = {
  primary: '#4B3F9E',
  primaryLight: '#7B6FD1',
  primaryDark: '#2E2566',
  accent: '#3FA9F5',
  white: '#FFFFFF',
  background: '#F7F7FB',
  surface: '#FFFFFF',
  border: '#E3E3EE',
  textPrimary: '#1F1B33',
  textSecondary: '#6B6880',
  success: '#3CB878',
  warning: '#F2A93B',
  danger: '#E4574C',
  info: '#3FA9F5',
} as const;

export const typography = {
  fontFamily: "'Inter', sans-serif",
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    md: '1.125rem',
    lg: '1.375rem',
    xl: '1.75rem',
    xxl: '2.25rem',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
} as const;

export const radii = {
  sm: '0.375rem',
  md: '0.75rem',
  lg: '1.25rem',
  round: '50%',
} as const;

export const shadows = {
  sm: '0 0.0625rem 0.125rem rgba(31, 27, 51, 0.06)',
  md: '0 0.25rem 0.75rem rgba(31, 27, 51, 0.08)',
  lg: '0 0.5rem 1.5rem rgba(31, 27, 51, 0.12)',
} as const;

export const breakpoints = {
  mobile: '30em',
  tablet: '48em',
  desktop: '64em',
  wide: '80em',
} as const;

export const globalStyles: Record<string, CSSProperties> = {
  appShell: {
    boxSizing: 'border-box',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: typography.fontFamily,
    backgroundColor: colors.background,
    color: colors.textPrimary,
    lineHeight: 1.5,
  },
};