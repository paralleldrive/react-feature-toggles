import { describe } from 'riteway';
import { getReqQueryFeatures } from '../get-req-query-features';
import deepFreeze from 'deep-freeze';

describe('getReqQueryFeatures()', async should => {
  const { assert } = should('');
  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: getReqQueryFeatures(),
    expected: []
  });
  {
    const req = {
      query: null
    };
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatures(deepFreeze(req)),
      expected: []
    });
  }
  {
    const req = {
      query: {
        ft: null
      }
    };
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatures(deepFreeze(req)),
      expected: []
    });
  }
  {
    const req = {
      something: {
        wrong: 'undefined'
      }
    };
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatures(deepFreeze(req)),
      expected: []
    });
  }
  {
    const req = {
      query: {
        ft: 'foo,bar,help'
      }
    };
    assert({
      given: 'req object with features',
      should: 'return the correct features',
      actual: getReqQueryFeatures(deepFreeze(req)),
      expected: ['foo', 'bar', 'help']
    });
  }
});
