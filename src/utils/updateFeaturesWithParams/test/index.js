import test from 'tape';
import updateFeaturesWithParams from '../index';
import deepFreeze from 'deep-freeze';

const createFeature = ({ name = '', enabled = false, dependencies = [] } = {}) => ({
  name,
  enabled,
  dependencies
});

test('updateFeaturesWithParams()', ({ end, deepEqual }) => {
  const actual = updateFeaturesWithParams();
  const expected = [];
  const msg = 'it should return an empty array';
  deepEqual(actual, expected, msg);
  end();
});

test('updateFeaturesWithParams([])', ({ end, deepEqual }) => {
  const actual = updateFeaturesWithParams([]);
  const expected = [];
  const msg = 'it should return an empty array';
  deepEqual(actual, expected, msg);
  end();
});

test('updateFeaturesWithParams([], String)', ({end, deepEqual}) => {
  const actual = updateFeaturesWithParams([], '?posts');
  const expected = [];
  const msg = 'it should return an empty array';
  deepEqual(actual,expected,msg);
  end();
});

test('updateFeaturesWithParams([...Feature], String)', ({end, deepEqual}) => {
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
    })
  ];
  deepFreeze(features);
  {
    const actual = updateFeaturesWithParams(features, '');
    const expected = features; 
    const msg = 'it should return the unmodified features';
    deepEqual(actual, expected, msg);
  }
  {
    const actual = updateFeaturesWithParams(features, '?');
    const expected = features; 
    const msg = 'it should return the the unmodified features';
    deepEqual(actual, expected, msg);
  }
  {
    const expectedFeatures = [...features];
    expectedFeatures[1] = {...expectedFeatures[1], enabled: true};
    expectedFeatures[3] = {...expectedFeatures[3], enabled: true};
    const actual = updateFeaturesWithParams(features, '?ft=post-rating,reports,login');
    const expected = expectedFeatures; 
    const msg = 'it should return the correct features';
    deepEqual(actual, expected, msg);
  }
  end();
});