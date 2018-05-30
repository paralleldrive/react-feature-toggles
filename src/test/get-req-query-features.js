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
    const req = deepFreeze({
      query: null
    });
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatures(req),
      expected: []
    });
  }
  {
    const req = deepFreeze({
      query: {
        ft: null
      }
    });
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatures(req),
      expected: []
    });
  }
  {
    const req = deepFreeze({
      something: {
        wrong: 'undefined'
      }
    });
    assert({
      given: 'incorrectly formed req object',
      should: 'return an empty array',
      actual: getReqQueryFeatures(req),
      expected: []
    });
  }
  {
    const req = deepFreeze({
      query: {
        ft: 'foo,bar,help'
      }
    });
    assert({
      given: 'req object with features',
      should: 'return the correct features',
      actual: getReqQueryFeatures(req),
      expected: ['foo', 'bar', 'help']
    });
  }
});
