import test from 'tape';
import getIsEnabled from '../get-is-enabled';
import deepFreeze from 'deep-freeze';
import createFeature from './fixtures/createFeature';

test('getIsEnabled([], String)', ({ end, deepEqual }) => {
  const actual = getIsEnabled([], 'posts');
  const expected = false;
  const msg = 'it should return false when the feature does not exist';
  deepEqual(actual, expected, msg);
  end();
});

test('getIsEnabled([...Features], String)', ({ end, deepEqual }) => {
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

  {
    const actual = getIsEnabled(features, 'posts');
    const expected = true;
    const msg = 'it should return true when the feature is enabled';
    deepEqual(actual, expected, msg);
  }
  {
    const actual = getIsEnabled(features, 'post-rating');
    const expected = false;
    const msg = 'it should return false when the feature is disabled';
    deepEqual(actual, expected, msg);
  }
  {
    const actual = getIsEnabled(features, 'post-rating-graph');
    const expected = false;
    const msg = 'it should return false when the feature depends on a disabled feature';
    deepEqual(actual, expected, msg);
  }
  {
    const actual = getIsEnabled(features, 'report-rating-graph');
    const expected = false;
    const msg = 'it should return false when there is a disabled feature in the dependency chain';
    deepEqual(actual, expected, msg);
  }
  {
    const actual = getIsEnabled(features, 'comment-rating-graph');
    const expected = true;
    const msg = 'it should return true when all the features in the dependency chain are enabled';
    deepEqual(actual, expected, msg);
  }

  end();
});

test('getIsEnabled()', ({ end, deepEqual }) => {
  const actual = getIsEnabled();
  const expected = false;
  const msg = 'it should return false';
  deepEqual(actual, expected, msg);
  end();
});

test('getIsEnabled([])', ({ end, deepEqual }) => {
  const actual = getIsEnabled([]);
  const expected = false;
  const msg = 'it should return false';
  deepEqual(actual, expected, msg);
  end();
});


