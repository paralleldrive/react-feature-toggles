import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { getQueryFeatures } from '../get-query-features';

describe('getQueryFeatures()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: getQueryFeatures(),
    expected: []
  });

  {
    const query = deepFreeze({});
    assert({
      given: 'empty object',
      should: 'return an empty array',
      actual: getQueryFeatures(query),
      expected: []
    });
  }

  {
    const query = deepFreeze({ foo: 'foo,bar,help' });
    assert({
      given: 'query object with no ft key',
      should: 'return an empty array',
      actual: getQueryFeatures(query),
      expected: []
    });
  }

  {
    const query = deepFreeze({ foo: 'something', ft: 'foo,bar,help' });
    assert({
      given: 'query object with key of ft and a value of a string of features',
      should: 'return an array of the features',
      actual: getQueryFeatures(query),
      expected: ['foo', 'bar', 'help']
    });
  }
});
