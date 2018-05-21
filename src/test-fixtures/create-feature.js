const createFeature = ({
  name = '',
  isActive = false,
  dependencies = []
} = {}) => ({
  name,
  isActive,
  dependencies
});

export default createFeature;
