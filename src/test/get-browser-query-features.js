import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';
import { getBrowserQueryFeatures } from '../get-browser-query-features';

describe('getBrowserQueryFeatures()', async should => {
  const { assert } = should('return false');
  {
    const url = 'https://domain.com/foo?ft=';
    assert({
      given: 'no url arguments',
      actual: getBrowserQueryFeatures(deepFreeze(url)),
      expected: []
    });
  }
  {
    const url = 'https://domain.com/foo?ft=foo,bar';
    assert({
      given: 'url arguments',
      actual: getBrowserQueryFeatures(deepFreeze(url)),
      expected: ['foo', 'bar']
    });
  }
});
