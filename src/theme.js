import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    h2: {
      fontWeight: 'medium',
      fontSize: '2rem',

      '@media (min-width:900px)': {
        fontSize: '2.4rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '4rem',
      },
    },
    icon: {
      color: 'rgba(0, 0, 0, 0.6)',
    },
    title: {
      fontWeight: 'medium',
      fontFamily: 'Russo One',
      fontSize: '1.5rem',
      color: '#2C2E43',

      '@media (min-width:600px)': {
        fontSize: '2.0rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.4rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '4rem',
      },
    },
    icon: {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },

  components: {
    // Name of the component

    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              '&:hover': {
                color: '#fff',
              },
            }),
        }),
      },
    },
  },

  palette: {
    primary: {
      main: '#FDB827',
      dark: '#d69102',
    },
    secondary: {
      main: '#EEEEEE',
    },
    error: {
      main: red.A400,
    },
    background: {
      main: '#595260',
    },
    text: {
      main: '#2C2E43',
    },
  },
});

export default theme;
