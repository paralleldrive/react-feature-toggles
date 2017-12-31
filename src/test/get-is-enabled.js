import { describe } from 'riteway';
import getIsEnabled from '../get-is-enabled';
import deepFreeze from 'deep-freeze';
import createFeature from '../test-fixtures/create-feature';

describe('getIsEnabled()', async should => {
  const { assert } = should('return false');

  assert({
    given: 'no arguments',
    actual: getIsEnabled(),
    expected: false
  });
});

describe('getIsEnabled([])', async should => {
  const { assert } = should('return false');

  assert({
    given: 'an empty array',
    actual: getIsEnabled([]),
    expected: false
  });
});

describe('getIsEnabled([], String)', async should => {
  const { assert } = should('return false');

  assert({
    given: 'an empty array and a feature name',
    actual: getIsEnabled([], 'posts'),
    expected: false
  });
});

describe('getIsEnabled([...Features], String)', async should => {
  const { assert } = should();

  const features = [
    createFeature({
      name: 'posts',
      enabled: true
    }),
    createFeature({
      name: 'post-rating',
      enabled: false,
      dependencies: ['posts']
    }),
    createFeature({
      name: 'post-rating-graph',
      enabled: true,
      dependencies: ['post-rating']
    }),
    createFeature({
      name: 'reports',
      enabled: false
    }),
    createFeature({
      name: 'report-rating',
      enabled: true,
      dependencies: ['reports']
    }),
    createFeature({
      name: 'report-rating-graph',
      enabled: true,
      dependencies: ['report-rating']
    }),
    createFeature({
      name: 'comments',
      enabled: true
    }),
    createFeature({
      name: 'comment-rating',
      enabled: true,
      dependencies: ['comments']
    }),
    createFeature({
      name: 'comment-rating-graph',
      enabled: true,
      dependencies: ['comment-rating']
    })
  ];
  deepFreeze(features);

  assert({
    given: 'features and a enabled feature name',
    should: 'return true',
    actual: getIsEnabled(features, 'posts'),
    expected: true
  });

  assert({
    given: 'features and a disabled feature name',
    should: 'return false',
    actual: getIsEnabled(features, 'post-rating'),
    expected: false
  });

  assert({
    given:
      'features and a enabled feature name that depends on a disabled feature',
    should: 'return false',
    actual: getIsEnabled(features, 'post-rating-graph'),
    expected: false
  });

  assert({
    given:
      'features and a enabled feature name that depends has a disabled feature in its dependency chain',
    should: 'return false',
    actual: getIsEnabled(features, 'report-rating-graph'),
    expected: false
  });

  assert({
    given:
      'features and a enabled feature name that has all enabled features in its dependency chain',
    should: 'return true',
    actual: getIsEnabled(features, 'comment-rating-graph'),
    expected: true
  });
});
