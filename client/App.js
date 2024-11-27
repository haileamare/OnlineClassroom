import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {hot} from 'react-hot-loader'
import theme from './theme';
import Menu from './core/Menu';
import { Button, CssBaseline } from '@mui/material';
const App = () => (
  <div>
   <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Menu/>
   </ThemeProvider>
  </div>
);

export default App;
