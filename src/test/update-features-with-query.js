import { describe } from 'riteway';
import { updateFeaturesWithQuery } from '../update-features-with-query';
import deepFreeze from 'deep-freeze';
import createFeature from '../test-fixtures/create-feature';

describe('updateFeaturesWithQuery()', async should => {
  const { assert } = should();
  assert({
    given: 'no arguments',
    should: 'return an empty array',
    actual: updateFeaturesWithQuery(),
    expected: []
  });
});

describe('updateFeaturesWithQuery([])', async should => {
  const { assert } = should();
  assert({
    given: 'empty array of features',
    should: 'return an empty array',
    actual: updateFeaturesWithQuery([]),
    expected: []
  });
});

describe('updateFeaturesWithQuery([], Query)', async should => {
  const { assert } = should();
  assert({
    given: 'empty array of features and a Query',
    should: 'return an empty array',
    actual: updateFeaturesWithQuery([], { q: 'js' }),
    expected: []
  });
});

describe('updateFeaturesWithQuery([...Feature], Query)', async should => {
  const { assert } = should();

  const features = [
    createFeature({
      name: 'posts',
      isActive: true
    }),
    createFeature({
      name: 'post-rating',
      isActive: false,
      dependencies: ['posts']
    }),
    createFeature({
      name: 'post-rating-graph',
      isActive: true,
      dependencies: ['post-rating']
    }),
    createFeature({
      name: 'reports',
      isActive: false
    })
  ];
  deepFreeze(features);

  assert({
    given: 'an array of features and no Query',
    should: 'return an equivalent array of features',
    actual: updateFeaturesWithQuery(features),
    expected: features
  });

  assert({
    given: 'an array of features and a empty Query object',
    should: 'return an equivalent array of features',
    actual: updateFeaturesWithQuery(features, {}),
    expected: features
  });

  assert({
    given:
      'an array of features and a Query object that does not match any features',
    should: 'return an equivalent array of features',
    actual: updateFeaturesWithQuery(features, { q: 'js' }),
    expected: features
  });

  {
    const expectedFeatures = [...features];
    expectedFeatures[1] = { ...expectedFeatures[1], isActive: true };
    expectedFeatures[3] = { ...expectedFeatures[3], isActive: true };
    assert({
      given:
        'an array of features and a Query object that does not match any features',
      should: 'return an equivalent array of features',
      actual: updateFeaturesWithQuery(features, {
        ft: 'post-rating,reports,login'
      }),
      expected: expectedFeatures
    });
  }
});
