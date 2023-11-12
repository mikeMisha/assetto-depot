import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    h2: {
      fontWeight: 'medium',
      fontSize: '2rem',
      '@media (min-width:400px)': {
        fontSize: '1.6rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.4rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '3rem',
      },
    },

    h1: {
      fontWeight: 'medium',
      fontFamily: 'Russo One, Arial, Helvetica, sans-serif',
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
  },

  components: {
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

    text: {
      primary: '#2C2E43',
    },
  },
});

export default theme;
