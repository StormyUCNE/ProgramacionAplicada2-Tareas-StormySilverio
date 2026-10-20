export const COLORS = {
  heroBackground: '#071A2B', // Fondo del hero
  gradientMedium: '#0B2E52', // Degradado medio
  primary: '#2F6BFF',        // Acción principal
  primaryDark: '#1E54E0',    // Botón (pulsado/degradado)
  lagoon: '#14C8B0',         // Acento
  mist: '#F2F5FA',           // Fondo de pantalla
  ink: '#0B1B2B',            // Títulos
  body: '#4A5B70',           // Texto secundario
  muted: '#8493A8',          // Placeholders e iconos inactivos
  line: '#DCE3EE',           // Bordes
  field: '#F6F8FC',          // Fondo de inputs
  danger: '#E5484D',         // Error
  warn: '#F5A524',           // Aviso
  success: '#12B76A',        // Éxito
};

export const TYPOGRAPHY = {
  fonts: {
    sora: {
      semibold: 'Sora-SemiBold', 
      bold: 'Sora-Bold',         
    },
    dmSans: {
      regular: 'DMSans-Regular', 
      medium: 'DMSans-Medium',      
      bold: 'DMSans-Bold',    
    },
  },
  sizes: {
    heroTitle: {
      fontSize: 28,
      lineHeight: 34,
    },
    button: {
      fontSize: 16,
    },
    input: {
      fontSize: 15.5,
    },
    label: {
      fontSize: 13.5,
    },
    supportText: {
      fontSize: 13.5,
    },
    supportTextLarge: {
      fontSize: 15,
    }
  },
  paddings:{
      heroTitle: 30
  }
};

export const THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
};

export default THEME;