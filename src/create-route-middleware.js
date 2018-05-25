import curry from 'ramda/src/curry';
import { getIsEnabled } from './get-is-enabled';
import { updateFeaturesWithQuery } from './update-features-with-query';
import { parse } from 'url';

const setStatus = (res, isEnabled) =>
  isEnabled ? res.status(200) : res.status(404);

export const createRouteMiddleware = curry(
  (features, { requiredFeature, ...methods }) => (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const updatedFeatures = updateFeaturesWithQuery(features, query);
    setStatus(res, getIsEnabled(updatedFeatures, requiredFeature));

    const handler = methods[req.method.toLowerCase()];
    if (handler !== undefined && typeof handler === 'function') {
      return handler(req, res);
    }

    next();
  }
);
