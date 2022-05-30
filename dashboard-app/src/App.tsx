import React from 'react';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from './utils/createEmotionCache';
import { theme } from './theme/theme';

const emotionCache = createEmotionCache();

const App = () => {
  const content = useRoutes(routes);
  return (
    <CacheProvider value={emotionCache}>
      {/* //   <Head>
    //     <title>
    //       Material Kit Pro
    //     </title>
    //     <meta
          //       name="viewport"
          //       content="initial-scale=1, width=device-width"
          //     />
          //   </Head> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {content}
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
