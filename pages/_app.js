import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Head from 'next/head';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Course Creation Copilot</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;