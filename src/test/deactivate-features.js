import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { deactivateFeatures } from '../deactivate-features';

describe('deactivateFeatures()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: deactivateFeatures(),
    expected: []
  });

  assert({
    given: 'two empty arrays',
    should: 'return an empty array',
    actual: deactivateFeatures([], []),
    expected: []
  });

  assert({
    given: 'empty array of Current Features and an array of Features to Remove',
    should: 'return an empty array',
    actual: deactivateFeatures([], ['foo', 'bar']),
    expected: []
  });
  {
    const currentFeatures = deepFreeze(['foo', 'bar']);
    assert({
      given:
        'array of Current Features and an empty array of Features to Remove',
      should: 'equivalent array of Current Features',
      actual: deactivateFeatures(currentFeatures, []),
      expected: ['foo', 'bar']
    });
  }
  {
    const currentFeatures = deepFreeze(['foo', 'bar', 'baz', 'cat']);
    const removeFeatures = deepFreeze(['fish', 'bar', 'cat']);
    assert({
      given: 'array of Current Features and an array of Features to Remove',
      should: 'the correct new array',
      actual: deactivateFeatures(currentFeatures, removeFeatures),
      expected: ['foo', 'baz']
    });
  }
  {
    const currentFeatures = deepFreeze(['foo', 'bar', 'baz']);
    assert({
      given: 'an array with items',
      should: 'return equivalent array',
      actual: deactivateFeatures(currentFeatures),
      expected: currentFeatures
    });
  }
});
