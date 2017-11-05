const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const createRouteMiddleware = require('@paralleldrive/react-feature-toggles/dist/create-route-middleware');
const features = require('./features');

const featureToggleHandler = createRouteMiddleware(features);

app.prepare().then(() => {
  const server = express();

  // This will check the feature and set the status the correct status for this route.
  // 200 if the feature is enabled, otherwise it will be 404.
  server.use('/profile', featureToggleHandler('profile'));

  // Then render the profile component at the same path.
  // This is required, if you let this get to nextjs default handler it will override the 404
  // with a 200 status.
  server.get('/profile', (req, res) => {
    return app.render(req, res, '/profile', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
