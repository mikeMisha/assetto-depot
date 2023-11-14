import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';
import NavBar from '../src/components/NavBar';
import { wrapper } from '../src/store/store';
import type { AppProps } from 'next/app';
import '../src/styles/globals.css';

// Extend AppProps with additional properties if needed

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        {/* Spread the pageProps onto the component */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
