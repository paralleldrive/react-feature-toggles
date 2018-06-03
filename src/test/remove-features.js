import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { removeFeatures } from '../remove-features';

describe('removeFeatures()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: removeFeatures(),
    expected: []
  });

  assert({
    given: 'two empty arrays',
    should: 'return an empty array',
    actual: removeFeatures([], []),
    expected: []
  });

  assert({
    given: 'empty array of Current Features and an array of Features to Remove',
    should: 'return an empty array',
    actual: removeFeatures([], ['foo', 'bar']),
    expected: []
  });
  {
    const currentFeatures = deepFreeze(['foo', 'bar']);
    assert({
      given:
        'array of Current Features and an empty array of Features to Remove',
      should: 'equivalent array of Current Features',
      actual: removeFeatures(currentFeatures, []),
      expected: ['foo', 'bar']
    });
  }
  {
    const currentFeatures = deepFreeze(['foo', 'bar', 'baz', 'cat']);
    const removedFeatures = deepFreeze(['fish', 'bar', 'cat']);
    assert({
      given: 'array of Current Features and an array of Features to Remove',
      should: 'the correct new array',
      actual: removeFeatures(currentFeatures, removedFeatures),
      expected: ['foo', 'baz']
    });
  }
  {
    const currentFeatures = deepFreeze(['foo', 'bar', 'baz']);
    assert({
      given: 'an array with items',
      should: 'return equivalent array',
      actual: removeFeatures(currentFeatures),
      expected: currentFeatures
    });
  }
});
