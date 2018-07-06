import { createFeature } from './create-feature';

export const createFeatures = () => [
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
    name: 'help',
    isActive: false
  }),
  createFeature({
    name: 'help-rating',
    isActive: true,
    dependencies: ['help']
  }),
  createFeature({
    name: 'help-rating-graph',
    isActive: true,
    dependencies: ['help-rating']
  }),
  createFeature({
    name: 'comments',
    isActive: true
  }),
  createFeature({
    name: 'comment-rating',
    isActive: true,
    dependencies: ['comments']
  }),
  createFeature({
    name: 'comment-rating-graph',
    isActive: true,
    dependencies: ['comment-rating']
  })
];

export const createFeaturesStringArray = () =>
  createFeatures().map(x => {
    if (x.isActive) return x.name;
  });
