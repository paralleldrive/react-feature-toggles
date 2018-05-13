import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';

import { mergeFeatures } from '../merge-features';

describe('mergeFeatures()', async should => {
  const { assert } = should();
  
  assert({
    given: 'one array',
    should: 'return an empty array',
    actual: mergeFeatures(
      deepFreeze([]),
    ),
    expected: []
  });

  assert({
    given: 'two or more empty arrays',
    should: 'return an empty array',
    actual: mergeFeatures(
      deepFreeze([]),
      deepFreeze([]),
      deepFreeze([])
    ),
    expected: []
  });

  assert({
    given: 'two or more arrays of strings with duplicate values',
    should: 'return a new array with all the unique values',
    actual: mergeFeatures(
      deepFreeze(['foo', 'bar', 'baz']),
      deepFreeze(['bar', 'cat', 'bat']),
      deepFreeze(['baz', 'rat', 'dog'])
    ),
    expected: ['foo', 'bar', 'baz', 'cat', 'bat', 'rat', 'dog']
  });
});
