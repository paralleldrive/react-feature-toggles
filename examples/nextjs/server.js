const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const {
  createExpressMiddleware
} = require('@paralleldrive/react-feature-toggles');
const initialFeatures = require('./features');

const createHandler = createExpressMiddleware({ initialFeatures });

app.prepare().then(() => {
  const server = express();

  // This will check the feature and set the correct status code for this route.
  // 200 if the feature is enabled, otherwise it will be 404.
  server.use(
    '/profile',
    createHandler({
      requiredFeature: 'profile',
      get: (req, res) => {
        return app.render(req, res, '/profile', req.query);
      }
    })
  );

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
