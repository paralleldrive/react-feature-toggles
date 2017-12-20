import { describe } from 'riteway';
import getEnabled from '../get-enabled';
import deepFreeze from 'deep-freeze';
import createFeature from '../test-fixtures/create-feature';

describe('getEnabled()', async should => {
  const { assert } = should('return an empty array');
  assert({
    given: 'no arguments',
    actual: getEnabled(),
    expected: []
  });
});

describe('getEnabled([])', async should => {
  const { assert } = should('return an empty array');
  assert({
    given: 'an empty array',
    actual: getEnabled(),
    expected: []
  });
});

describe('getEnabled([...Feature])', async should => {
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
    given: 'an array of features',
    should: 'return the correct enabled features',
    actual: getEnabled(features),
    expected: ['posts', 'comments', 'comment-rating', 'comment-rating-graph']
  });

});
