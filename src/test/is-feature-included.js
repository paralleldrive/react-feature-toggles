import { describe } from 'riteway';
import isFeatureIncluded from '../is-feature-included';
import createClientFeatures from './fixtures/createClientFeatures';

describe('isFeatureIncluded()', async should => {
  const { assert } = should();

  assert({
    given: 'no arguments',
    should: 'return false',
    actual: isFeatureIncluded(),
    expected: false,
  });

  assert({
    given: 'an empty array and id string',
    should: 'return false',
    actual: isFeatureIncluded([], 'posts'),
    expected: false,
  });

  assert({
    given: 'an array of feature names and existing feature id string',
    should: 'return true',
    actual: isFeatureIncluded(createClientFeatures(), 'posts'),
    expected: true,
  });

  assert({
    given: 'an array of feature names and non existant feature id string',
    should: 'return false',
    actual: isFeatureIncluded(createClientFeatures(), 'non-existant-feature-id'),
    expected: false,
  });

  assert({
    given: 'an array of feature names and no string id',
    should: 'return false',
    actual: isFeatureIncluded(createClientFeatures()),
    expected: false,
  });

});
