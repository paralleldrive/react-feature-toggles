import getIsEnabled from '../utils/get-is-enabled';

const handleResponse = (res, isEnabled) => isEnabled ? res.status(200) : res.status(404);

const createRoute = ({
  featureName,
  path,
} = {}, features, render) => (req, res, ...rest) => {
  // const isEnabled = getIsEnabled(features, featureName);
  return render(
    req,
    handleResponse(res, getIsEnabled(features, featureName)),
    path,
    ...rest
  );
};

export default createRoute;