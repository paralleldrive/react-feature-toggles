import test from 'tape';
import isFeatureIncluded from '../index';
import deepFreeze from 'deep-freeze';
import createClientFeatures from '../../../test/fixtures/createClientFeatures';

test('isFeatureIncluded([], String)', ({ end, deepEqual }) => {
  const actual = isFeatureIncluded([], 'posts');
  const expected = false;
  const msg = 'it should return false when the feature does not exist';
  deepEqual(actual, expected, msg);
  end();
});

test('isFeatureIncluded([...Features], String)', ({ end, deepEqual }) => {
  const features = createClientFeatures();
  deepFreeze(features);

  {
    const actual = isFeatureIncluded(features, 'posts');
    const expected = true;
    const msg = 'it should return true when the feature is enabled';
    deepEqual(actual, expected, msg);
  }
  {
    const actual = isFeatureIncluded(features, 'non-existant-feature-id');
    const expected = false;
    const msg = 'it should return false when the feature is disabled';
    deepEqual(actual, expected, msg);
  }

  end();
});

test('isFeatureIncluded()', ({ end, deepEqual }) => {
  const actual = isFeatureIncluded();
  const expected = false;
  const msg = 'it should return false when called without arguments';
  deepEqual(actual, expected, msg);
  end();
});

test('isFeatureIncluded([...Features])', ({ end, deepEqual }) => {
  const features = createClientFeatures();
  const actual = isFeatureIncluded(features);
  const expected = false;
  const msg = 'it should return false when called without a feature id';
  deepEqual(actual, expected, msg);
  end();
});
