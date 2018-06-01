import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';
import { getCurrentActiveFeatures } from '../get-current-active-features';

describe('deactivateFeatures()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: getCurrentActiveFeatures(),
    expected: []
  });

  assert({
    given: 'an empty object',
    should: 'return an empty array',
    actual: getCurrentActiveFeatures({}),
    expected: []
  });

  assert({
    given: 'an empty initial features',
    should: 'return an empty array',
    actual: getCurrentActiveFeatures({ initialFeatures: [] }),
    expected: []
  });

  assert({
    given: 'initial features',
    should: 'return the correct features',
    actual: getCurrentActiveFeatures({ initialFeatures: ['foo', 'bar'] }),
    expected: ['foo', 'bar']
  });
  {
    const req = deepFreeze({
      query: {
        ft: 'baz,bat,help'
      }
    });
    const search = '?ft=cat,else';
    assert({
      given: 'initial features and req and search',
      should: 'return the correct features',
      actual: getCurrentActiveFeatures({
        initialFeatures: ['foo', 'bar'],
        req,
        search
      }),
      expected: ['foo', 'bar', 'baz', 'bat', 'help', 'cat', 'else']
    });
  }
});
