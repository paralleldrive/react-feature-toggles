import { curry } from 'ramda';
import getIsEnabled from '../utils/get-is-enabled';
import updateFeatures from '../utils/updateFeaturesWithParams';
import { parse } from 'url';

const handleResponse = (res, isEnabled) =>
  isEnabled ? res.status(200) : res.status(404);

const createRoute = (features, featureName) => (req, res, next) => {
  const parsedUrl = parse(req.url, true);
  const { search } = parsedUrl;
  const updatedFeatures = updateFeatures(features, search);

  handleResponse(res, getIsEnabled(updatedFeatures, featureName));
  next();
};

export default curry(createRoute);
