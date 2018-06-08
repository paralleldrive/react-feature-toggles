'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createFeatures = undefined;

var _createFeature = require('./create-feature');

var createFeatures = (exports.createFeatures = function createFeatures() {
  return [
    (0, _createFeature.createFeature)({
      name: 'posts',
      isActive: true
    }),
    (0, _createFeature.createFeature)({
      name: 'post-rating',
      isActive: false,
      dependencies: ['posts']
    }),
    (0, _createFeature.createFeature)({
      name: 'post-rating-graph',
      isActive: true,
      dependencies: ['post-rating']
    }),
    (0, _createFeature.createFeature)({
      name: 'help',
      isActive: false
    }),
    (0, _createFeature.createFeature)({
      name: 'help-rating',
      isActive: true,
      dependencies: ['help']
    }),
    (0, _createFeature.createFeature)({
      name: 'help-rating-graph',
      isActive: true,
      dependencies: ['help-rating']
    }),
    (0, _createFeature.createFeature)({
      name: 'comments',
      isActive: true
    }),
    (0, _createFeature.createFeature)({
      name: 'comment-rating',
      isActive: true,
      dependencies: ['comments']
    }),
    (0, _createFeature.createFeature)({
      name: 'comment-rating-graph',
      isActive: true,
      dependencies: ['comment-rating']
    })
  ];
});
