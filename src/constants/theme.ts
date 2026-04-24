/**
 * Centralized design constants for the Morse Code App
 * Following Recipe 3: Hardware / Specialist Tool
 */

export const THEME = {
  colors: {
    background: '#0A0B0E', // Darker elegant black
    surface: '#15181E',    // Primary surface
    surfaceLight: '#1E232B', // Lighter surface for containers
    primary: '#FFD700',    // Elegant Gold
    secondary: '#1E232B',  // For secondary buttons/elements
    text: {
      primary: '#E2E8F0',
      secondary: '#94A3B8',
      accent: '#FFD700',
    },
    border: 'rgba(255, 255, 255, 0.05)',
    borderLight: 'rgba(255, 255, 255, 0.1)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  typography: {
    fontSans: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontMono: '"Courier New", Courier, monospace',
  },
  transitions: {
    default: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  shadows: {
    glow: '0 0 20px rgba(255, 215, 0, 0.3)',
    elevated: '0 40px 100px rgba(0, 0, 0, 0.5)',
    inner: 'inset 5px 5px 10px #0e1115, inset -5px -5px 10px #202631',
    outset: '10px 10px 20px #0e1115, -10px -10px 20px #202631',
  }
};
