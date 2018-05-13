import { describe } from 'riteway';
import { mergeFeatures } from '../merge-features';

describe('mergeFeatures()', async should => {
  const { assert } = should();

  assert({
    given: 'two or more empty arrays',
    should: 'return an empty array',
    actual: mergeFeatures([], [], []),
    expected: []
  });

  assert({
    given: 'two or more arrays of strings with duplicate values',
    should: 'return a new array with all the unique values',
    actual: mergeFeatures(
      ['foo', 'bar', 'baz'],
      ['bar', 'cat', 'bat'],
      ['baz', 'rat', 'dog']
    ),
    expected: ['foo', 'bar', 'baz', 'cat', 'bat', 'rat', 'dog']
  });
});
