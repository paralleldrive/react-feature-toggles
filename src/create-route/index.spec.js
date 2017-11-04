import {describe} from 'riteway';
import createFeatures from '../test/fixtures/createFeatures';
import Response from './test/Response';
import Request from './test/Request';

import createRoute from './index';

describe('createRoute()', async should => {
  const { assert } = should('apply the render function to the correct arguments');

  {
    const features = createFeatures();

    const render = (req, res, path, ...rest) => {
      assert({
        given: 'a req arg',
        should: 'should pass through the req arg',
        actual: req,
        expected: Request()
      });

      assert({
        given: 'a feature that is enabled',
        should: 'should have a status code of 200',
        actual: res.statusCode,
        expected: 200
      });

      assert({
        given: 'a component path',
        should: 'pass through the component path',
        actual: path,
        expected: '/posts'
      });

      assert({
        given: 'extra arguments',
        should: 'pass through the extra arguments',
        actual: rest,
        expected: ['a', 'b', 'c']
      });
    };

    const route = createRoute({ featureName: 'posts', path: '/posts' }, features, render);

    route(Request(), Response(), 'a', 'b', 'c');
  }

  {
    const features = createFeatures();

    const render = (req, res, path, ...rest) => {
      assert({
        given: 'a req arg',
        should: 'should pass through the req arg',
        actual: req,
        expected: Request()
      });

      assert({
        given: 'a feature that is enabled',
        should: 'should have a status code of 404',
        actual: res.statusCode,
        expected: 404
      });

      assert({
        given: 'a component path',
        should: 'pass through the component path',
        actual: path,
        expected: '/help'
      });

      assert({
        given: 'extra arguments',
        should: 'pass through the extra arguments',
        actual: rest,
        expected: ['a', 'b', 'c']
      });
    };

    const route = createRoute({ featureName: 'help', path: '/help' }, features, render);

    route(Request(), Response(), 'a', 'b', 'c');
  } 
});