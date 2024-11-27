import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import expressApp from './express';
import App from '../client/App.js';
import template from '../template.js';
// Only load devBundle in development mode
import devBundle from './devBundle.js';
import { ServerStyleSheets } from '@mui/styles';
import theme from '../client/theme.js';
import { ThemeProvider } from '@mui/material/styles';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const server = expressApp;

// Use devBundle only in decvelopment
if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV)
  devBundle(server);
}

server.use('/dist', express.static(path.resolve(__dirname, '../dist')));

// Server-Side Rendering Route
server.get('*', (req, res) => {
  const sheets=new ServerStyleSheets();
  
  const content = ReactDOMServer.renderToString(
    sheets.collect(
        <ThemeProvider theme={theme}>
             <App />
        </ThemeProvider>
    )
 
);
  res.status(200).send(template({appString:content}));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


