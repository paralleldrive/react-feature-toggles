import { describe } from 'riteway';
import { isActive } from '../is-active';

describe('isActive()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return false',
    actual: isActive(),
    expected: false
  });

  assert({
    given: 'an empty array and id string',
    should: 'return false',
    actual: isActive('posts', []),
    expected: false
  });

  assert({
    given: 'an array of feature names and existing feature id string',
    should: 'return true',
    actual: isActive('bar', ['foo', 'bar', 'baz']),
    expected: true
  });

  assert({
    given: 'an array of feature names and non existant feature id string',
    should: 'return false',
    actual: isActive('non-existant-feature-id', ['foo', 'bar', 'baz']),
    expected: false
  });
});
