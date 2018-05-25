export const createFeature = ({
  name = '',
  isActive = false,
  dependencies = []
} = {}) => ({
  name,
  isActive,
  dependencies
});
