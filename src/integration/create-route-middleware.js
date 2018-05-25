import express from 'express';
import request from 'supertest';
import { createRouteMiddleware } from '../create-route-middleware';
import { createFeatures } from '../test-fixtures/create-features';
import { describe } from 'riteway';

describe('createRouteMiddleware()', async should => {
  const { assert } = should();

  {
    const app = express();
    const features = createFeatures();
    const handler = createRouteMiddleware(features, {
      requiredFeature: 'posts',
      get: (req, res) => {
        res.send();
      }
    });
    const path = '/posts';
    app.use(path, handler);

    request(app)
      .get(path)
      .end(function(err, res) {
        assert({
          given: 'a feature that is enabled',
          should: 'set the correct response status code',
          actual: res.statusCode,
          expected: 200
        });
      });
  }

  {
    const app = express();
    const features = createFeatures();
    const handler = createRouteMiddleware(features, {
      requiredFeature: 'help',
      get: (req, res) => {
        res.send();
      }
    });
    const path = '/posts';
    app.use(path, handler);

    request(app)
      .get(path)
      .end(function(err, res) {
        assert({
          given: 'a feature that is disabled',
          should: 'set the correct response status code',
          actual: res.statusCode,
          expected: 404
        });
      });
  }

  {
    const app = express();
    const features = createFeatures();
    const handler = createRouteMiddleware(features, {
      requiredFeature: 'help',
      get: (req, res) => {
        res.send();
      }
    });
    const path = '/posts';
    app.use(path, handler);

    request(app)
      .get(`${path}?ft=posts`)
      .end(function(err, res) {
        assert({
          given:
            'the path has param override that is not relevant to the given disabled feature',
          should: 'set the correct response status code',
          actual: res.statusCode,
          expected: 404
        });
      });
  }

  {
    const app = express();
    const features = createFeatures();
    const handler = createRouteMiddleware(features, {
      requiredFeature: 'help',
      get: (req, res) => {
        res.send();
      }
    });
    const path = '/posts';
    app.use(path, handler);

    request(app)
      .get(`${path}?ft=help`)
      .end(function(err, res) {
        assert({
          given: 'the path has param override that enables a disabled feature',
          should: 'set the correct response status code',
          actual: res.statusCode,
          expected: 200
        });
      });
  }

  {
    const app = express();
    const features = createFeatures();
    const path = '/posts';
    const handler = createRouteMiddleware(features, {
      requiredFeature: 'posts',
      get: (req, res) => {
        // Simulate async handler delay
        // This allows subsequent express methods to be called that could possibly
        // cause errors or change the response status if the `next` callback is not
        // used correctly.
        setTimeout(() => res.send(), 3000);
      }
    });
    app.use(path, handler);
    app.get('*', (req, res) => {
      res.status(404);
      res.send();
    });

    request(app)
      .get(path)
      .end(function(err, res) {
        if (err) throw err;
        assert({
          given: 'given subsequent handlers',
          should: 'not effect the correct handler response status',
          actual: res.statusCode,
          expected: 200
        });
      });
  }

  {
    const app = express();
    const features = createFeatures();
    const handler = createRouteMiddleware(features, {
      requiredFeature: 'posts',
      post: (req, res) => {
        res.send();
      }
    });
    const path = '/posts';
    app.use(path, handler);

    request(app)
      .post(path)
      .end(function(err, res) {
        assert({
          given: 'a post method',
          should: 'should use the post method',
          actual: res.statusCode,
          expected: 200
        });
      });
  }

  {
    const app = express();
    const features = createFeatures();
    const handler = createRouteMiddleware(features, {
      requiredFeature: 'posts',
      put: (req, res) => {
        res.send();
      }
    });
    const path = '/posts';
    app.use(path, handler);

    request(app)
      .put(path)
      .end(function(err, res) {
        assert({
          given: 'a put method',
          should: 'should use the put method',
          actual: res.statusCode,
          expected: 200
        });
      });
  }
});
