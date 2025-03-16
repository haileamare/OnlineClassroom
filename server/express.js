import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import App from '../client/App';
import template from '../template';
import theme from '../client/theme';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import devBundle from './devBundle.js';
import MainRouter from '../client/MainRouter.js';
import courseRoutes from './routes/course.routes.js'
import enrollmentRoutes from './routes/enrollment.routes.js'
import { AuthProvider } from '../client/auth/auth-helper.js';
dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }));

if (process.env.NODE_ENV === 'development') {
  devBundle(app);
}

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.use(cookieParser());
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/',courseRoutes);
app.use('/',enrollmentRoutes)

app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};

  const appString = renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <AuthProvider>
         <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
        </AuthProvider>

      </StaticRouter>
    )
  );

  if (context.url) {
    return res.redirect(303, context.url);
  }

  const css = sheets.toString();
  res.status(200).send(template({
    appString,
    css,
  }));
});

export default app;
