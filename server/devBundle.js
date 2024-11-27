import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.client.js';

const devBundle = (app) => {
  const compiler = webpack(webpackConfig);
  
  // Webpack Dev Middleware: Serves bundled assets from memory
  app.use(
    middleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
    })
  );

  // Webpack Hot Middleware: Enables hot module replacement
  app.use(hotMiddleware(compiler));
};

export default devBundle;
