import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';
import { getBrowserQueryFeatures } from '../get-browser-query-features';

describe('getBrowserQueryFeatures()', async should => {
  const { assert } = should();
  {
    assert({
      given: 'no arguments in node',
      should: 'return empy array',
      actual: getBrowserQueryFeatures(),
      expected: []
    });
  }
  {
    const url = '?ft=';
    assert({
      given: 'search string with no features',
      should: 'return empy array',
      actual: getBrowserQueryFeatures(deepFreeze(url)),
      expected: []
    });
  }
  {
    const url = '?ft=foo,bar';
    assert({
      given: 'search string with features',
      should: 'return the correct features',
      actual: getBrowserQueryFeatures(deepFreeze(url)),
      expected: ['foo', 'bar']
    });
  }
});
