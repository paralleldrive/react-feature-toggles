import describe from 'tape';
import getEnabled from '../index';
import deepFreeze from 'deep-freeze';

const createFeature = ({ enabled = false, dependencies = [] } = {}) => ({
  enabled,
  dependencies
});

describe('getEnabled()', nest => {
  nest.test('...getEnabled() no arguments', ({ end, deepEqual }) => {
    deepEqual(getEnabled(), [], 'It should return an empty array');
    end();
  });

  nest.test('...getEnabled() with empty object', ({ end, deepEqual }) => {
    const features = {};
    deepFreeze(features);

    deepEqual(getEnabled(features), [], 'posts -> should return true');
    end();
  });

  nest.test(
    '...getEnabled() features that have no dependencies',
    ({ end, deepEqual }) => {
      const features = {
        posts: createFeature({
          enabled: true
        }),
        reports: createFeature({
          enabled: false
        })
      };
      deepFreeze(features);

      deepEqual(
        getEnabled(features),
        ['posts'],
        'should return the only active feature'
      );
      end();
    }
  );

  nest.test(
    '...getEnabled() with feature dependencies',
    ({ end, deepEqual }) => {
      const features = {
        posts: createFeature({
          enabled: true
        }),
        'post-rating': createFeature({
          enabled: false,
          dependencies: ['posts']
        }),
        'post-rating-graph': createFeature({
          enabled: true,
          dependencies: ['post-rating']
        }),
        reports: createFeature({
          enabled: false
        }),
        'report-rating': createFeature({
          enabled: true,
          dependencies: ['reports']
        }),
        'report-rating-graph': createFeature({
          enabled: true,
          dependencies: ['report-rating']
        }),
        comments: createFeature({
          enabled: true
        }),
        'comment-rating': createFeature({
          enabled: true,
          dependencies: ['comments']
        }),
        'comment-rating-graph': createFeature({
          enabled: true,
          dependencies: ['comment-rating']
        })
      };
      deepFreeze(features);

      deepEqual(
        getEnabled(features),
        ['posts', 'comments', 'comment-rating', 'comment-rating-graph'],
        'should return the correct enabled features'
      );
      end();
    }
  );
});
