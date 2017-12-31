const createFeature = ({
  name = '',
  enabled = false,
  dependencies = []
} = {}) => ({
  name,
  enabled,
  dependencies
});

export default createFeature;
