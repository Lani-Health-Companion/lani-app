export const THEME = {
  colors: {
    primary: '#4A90D9',
    primaryLight: '#5BA0E8',
    primaryDark: '#357ABD',
    warmWhite: '#FFF8F0',
    text: '#1A1A2E',
    lightText: '#666666',
    lightGray: '#F5F5F5',
    darkGray: '#E0E0E0',
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    emergency: '#E74C3C',
    laniMessageBg: '#D6E8F7',
    userMessageBg: '#4A90D9',
    userMessageText: '#FFFFFF',
    border: '#CCCCCC',
  },
  fonts: {
    // Minimum 20px for seniors
    title: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 36,
    },
    subtitle: {
      fontSize: 22,
      fontWeight: '600',
      lineHeight: 30,
    },
    heading: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    body: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 26,
    },
    bodyBold: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 26,
    },
    caption: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 22,
    },
    button: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    small: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 22,
    },
    tiny: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 24,
  },
  // Minimum touch target: 64px (48px is standard, but 64px is better for seniors)
  touchTarget: {
    min: 64,
    large: 72,
  },
  // Button heights and widths
  button: {
    height: 64,
    smallHeight: 48,
    largeHeight: 72,
  },
  // Icon sizes
  icon: {
    small: 24,
    medium: 32,
    large: 48,
    xl: 64,
  },
  // Shadow
  shadow: {
    small: {
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    medium: {
      elevation: 4,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
  },
};

export type Theme = typeof THEME;
