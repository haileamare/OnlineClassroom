import React from 'react';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ReactDOMServer from 'react-dom/server';
import bodyParser from 'body-parser';
import App from '../client/App.js';
import template from '../template.js';
// Only load devBundle in development mode
import devBundle from './devBundle.js';
import { ServerStyleSheets } from '@mui/styles';
import theme from '../client/theme.js';
import { ThemeProvider } from '@mui/material/styles';
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));



// Use devBundle only in decvelopment
if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV)
  devBundle(app);
}

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.use(cookieParser());
app.use('/',userRoutes);
app.use('/',authRoutes)
// Server-Side Rendering Route
app.get('*', (req, res) => {
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

export default app;
