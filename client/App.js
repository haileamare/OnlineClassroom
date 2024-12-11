import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Menu from './core/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
   
    if (jssStyles) {
      console.log('hay')
      jssStyles.parentNode.removeChild(jssStyles);
      console.log(jssStyles)
    }
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Menu />
        <MainRouter /> {/* Ensure that MainRouter is included */}
      </ThemeProvider>
  );
};

export default App;
