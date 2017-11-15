import { describe } from 'riteway';
import createFeatures from '../test/fixtures/createFeatures';
import Response from './test/Response';
import Request from './test/Request';
import Next from './test/Next';
import Callback from './test/Callback';

import createRouteMiddleware from './index';

describe('createRouteMiddleware()', async should => {
  const { assert } = should('update the status code correctly');

  {
    const features = createFeatures();
    const req = Request();
    const res = Response();
    const next = Next();
    const middleware = createRouteMiddleware(features, { requiredFeature: 'posts' });
    
    middleware(req, res, next.next);

    assert({
      given: 'a feature that is enabled',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }

  

  {
    const features = createFeatures();
    const req = Request({ method: 'GET' });
    const res = Response();
    const next = Next();
    const middleware = createRouteMiddleware(features, { requiredFeature : 'help' });
    
    middleware(req, res, next.next);

    assert({
      given: 'a feature that is disabled',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 404
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }

  {
    const features = createFeatures();
    const req = Request({ url: 'http://mydomain.com/help?ft=help' });
    const res = Response();
    const next = Next();
    const middleware = createRouteMiddleware(features, { requiredFeature: 'help' });
    
    middleware(req, res, next.next);

    assert({
      given: 'a feature that is disabled and a search string that enables it',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }

  {
    const features = createFeatures();
    const req = Request({ url: 'http://mydomain.com/help?ft=posts' });
    const res = Response();
    const next = Next();
    const middleware = createRouteMiddleware(features, { requiredFeature: 'help' });
    
    middleware(req, res, next.next);

    assert({
      given: 'a feature that is disabled and an incorrect search string',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 404
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }
});

describe('createRouteMiddleware() auto curried', async should => {
  const { assert } = should('update the status code correctly');

  {
    const features = createFeatures();
    const requiredFeature = 'posts';
    const middleware = createRouteMiddleware(features)({requiredFeature});
    const req = Request();
    const res = Response();
    const next = Next();

    middleware(req, res, next.next);

    assert({
      given: 'a feature that is enabled',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }

  {
    const features = createFeatures();
    const getHander = Callback();
    const req = Request({ method: 'GET' });
    const res = Response();
    const next = Next();
    const middleware = createRouteMiddleware(features, { requiredFeature: 'posts', get: getHander.callback });
    
    middleware(req, res, next.next);

    assert({
      given: 'a feature that is enabled',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'a GET request and a get handler',
      should: 'call the get handler',
      actual: getHander.isCalled,
      expected: true
    });

    assert({
      given: 'a GET request and a get handler',
      should: 'pass the correct arguments to the handler',
      actual: getHander.args,
      expected: [req, res]
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }

  {
    const features = createFeatures();
    const postHander = Callback();
    const req = Request({ method: 'POST' });
    const res = Response();
    const next = Next();
    const middleware = createRouteMiddleware(features, { requiredFeature: 'posts', post: postHander.callback });
    
    middleware(req, res, next.next);

    assert({
      given: 'a feature that is enabled',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'a POST request and a post handler',
      should: 'call the post handler',
      actual: postHander.isCalled,
      expected: true
    });

    assert({
      given: 'a POST request and a post handler',
      should: 'pass the correct arguments to the handler',
      actual: postHander.args,
      expected: [req, res]
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }

  {
    const features = createFeatures();
    const deleteHander = Callback();
    const req = Request({ method: 'DELETE' });
    const res = Response();
    const next = Next();
    const middleware = createRouteMiddleware(features, { requiredFeature: 'posts', delete: deleteHander.callback });
    
    middleware(req, res, next.next);

    assert({
      given: 'a feature that is enabled',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'a DELETE request and a delete handler',
      should: 'call the delete handler',
      actual: deleteHander.isCalled,
      expected: true
    });

    assert({
      given: 'a DELETE request and a delete handler',
      should: 'pass the correct arguments to the handler',
      actual: deleteHander.args,
      expected: [req, res]
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }

  {
    const features = createFeatures();
    const putHander = Callback();
    const req = Request({ method: 'PUT' });
    const res = Response();
    const next = Next();
    const middleware = createRouteMiddleware(features, { requiredFeature: 'posts', put: putHander.callback });
    
    middleware(req, res, next.next);

    assert({
      given: 'a feature that is enabled',
      should: 'have the correct status code for res',
      actual: res.statusCode,
      expected: 200
    });

    assert({
      given: 'a PUT request and a put handler',
      should: 'call the put handler',
      actual: putHander.isCalled,
      expected: true
    });

    assert({
      given: 'a PUT request and a put handler',
      should: 'pass the correct arguments to the handler',
      actual: putHander.args,
      expected: [req, res]
    });

    assert({
      given: 'next callback',
      should: 'call next after completing',
      actual: next.valueOf(),
      expected: true
    });
  }

});

