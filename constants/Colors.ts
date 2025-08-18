const primaryAccent = '#003b49'; // Teal
const secondaryAccent = '#2EC4B6'; // Teal
const alertAccent = '#E76F51';   // Coral-red
const successColor = '#4CAF50';  // Green

const shadow={
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 8,
}

export default {
  light: {
    text: '#0D1B2A',             // Dark navy text
    textSecondary: '#e9edf2',    // Medium gray text
    background: '#F4F7FB',       // Soft light gray-blue
    card: '#FFFFFF',             // White surfaces
    tint: primaryAccent,
    tintSecondary: secondaryAccent,
    alert: alertAccent,
    
    success: successColor,
    divider: '#CFD8DC',          // Light gray divider
    tabIconDefault: '#B0BEC5',   // Muted gray for inactive icons
    tabIconSelected: primaryAccent,
    borderRadius: 20,
    shadowColor: shadow.shadowColor,
    shadowOffset: shadow.shadowOffset,
    shadowOpacity: shadow.shadowOpacity,
    shadowRadius: shadow.shadowRadius,
    elevation: shadow.elevation,
  },
  dark: {
    text: '#FFFFFF',             // White text
    textSecondary: '#B0BEC5',    // Light gray text
    // background: '#0D1B2A',       // Deep navy
    background: '#F4F7FB', 
    card: '#1B263B',             // Slightly lighter navy
    tint: primaryAccent,
    tintSecondary: secondaryAccent,
    alert: alertAccent,
    success: successColor,
    divider: '#415A77',          // Low-contrast navy divider
    tabIconDefault: '#B0BEC5',   // Muted gray for inactive icons
    tabIconSelected: primaryAccent,
    borderRadius: 20,
    shadowColor: shadow.shadowColor,
    shadowOffset: shadow.shadowOffset,
    shadowOpacity: shadow.shadowOpacity,
    shadowRadius: shadow.shadowRadius,
    elevation: shadow.elevation,
  },
};
