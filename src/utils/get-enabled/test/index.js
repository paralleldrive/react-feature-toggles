import test from 'tape';
import getEnabled from '../index';
import deepFreeze from 'deep-freeze';
import createFeature from '../../../test/fixtures/createFeature';



test('getEnabled()', ({ end, deepEqual }) => {
  const actual = getEnabled();
  const expected = [];
  const msg = 'It should return an empty array';
  deepEqual(actual, expected, msg);
  end();
});

test('getEnabled([])', ({ end, deepEqual }) => {
  const actual = getEnabled([]);
  const expected = [];
  const msg = 'it should return an empty array';
  deepEqual(actual, expected, msg, []);
  end();
});

test('getEnabled([...Feature])', ({ end, deepEqual }) => {
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

  const actual = getEnabled(features);
  const expected = ['posts', 'comments', 'comment-rating', 'comment-rating-graph'];
  const msg = 'it should return the correct enabled features';
  deepEqual(actual, expected, msg);
  end();
});

