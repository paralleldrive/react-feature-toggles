import {describe} from 'riteway';
import createFeatures from '../test/fixtures/createFeatures';
import Response from './test/Response';
import Request from './test/Request';
import Next from './test/Next';

import createRouteMiddleware from './index';

describe('createRouteMiddleware()', async should => {
  const { assert } = should('update the status code correctly');

  {
    const features = createFeatures();
    const featureName = 'posts';
    const middleware = createRouteMiddleware(features, featureName);
    const req = Request();
    const res = Response();
    const next = Next();

    middleware(req, res, next.next);

    assert({
      given: 'a feature that is enabled',
      should: 'res should have the correct status code',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'next callback',
      should: 'should call next after completeing',
      actual: next.valueOf(),
      expected: true
    });
  }

  {
    const features = createFeatures();
    const featureName = 'help';
    const middleware = createRouteMiddleware(features, featureName);
    const req = Request();
    const res = Response();
    const next = Next();

    middleware(req, res, next.next);

    assert({
      given: 'a feature that is disabled',
      should: 'res should have the correct status code',
      actual: res.statusCode,
      expected: 404
    });

    assert({
      given: 'next callback',
      should: 'should call next after completeing',
      actual: next.valueOf(),
      expected: true
    });
  }

  {
    const features = createFeatures();
    const featureName = 'help';
    const middleware = createRouteMiddleware(features, featureName);
    const req = Request({ url: 'http://mydomain.com/help?ft=help' });
    const res = Response();
    const next = Next();

    middleware(req, res, next.next);

    assert({
      given: 'a feature that is disabled and a search string that enables it',
      should: 'res should have the correct status code',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'next callback',
      should: 'should call next after completeing',
      actual: next.valueOf(),
      expected: true
    });
  }
});

describe('createRouteMiddleware() auto curried', async should => {
  const { assert } = should('update the status code correctly');

  {
    const features = createFeatures();
    const featureName = 'posts';
    const middleware = createRouteMiddleware(features)(featureName);
    const req = Request();
    const res = Response();
    const next = Next();

    middleware(req, res, next.next);

    assert({
      given: 'a feature that is enabled',
      should: 'res should have the correct status code',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'next callback',
      should: 'should call next after completeing',
      actual: next.valueOf(),
      expected: true
    });
  }
});