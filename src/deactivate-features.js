export const deactivateFeatures = (
  currentFeatures = [],
  removeFeatures = []
) => {
  return currentFeatures.filter(feature => !removeFeatures.includes(feature));
};
