import createFeature from './create-feature';

export default () => [
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
    name: 'help',
    enabled: false
  }),
  createFeature({
    name: 'help-rating',
    enabled: true,
    dependencies: ['help']
  }),
  createFeature({
    name: 'help-rating-graph',
    enabled: true,
    dependencies: ['help-rating']
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