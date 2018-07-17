import curry from 'ramda/src/curry';
import { parse } from 'url';

import { isActive } from './is-active';
import { mergeFeatures } from './merge-features';
import { getQueryFeatures } from './get-query-features';
const setStatus = (res, isActive) =>
  isActive ? res.status(200) : res.status(404);

// ({ initialFeatures: [...String] }, { requiredFeature: String, ...methods }) => (req, res, next) => void
export const createExpressMiddleware = curry(
  ({ initialFeatures }, { requiredFeature, ...methods }) => (
    req,
    res,
    next
  ) => {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const updatedFeatures = mergeFeatures(
      initialFeatures,
      getQueryFeatures(query)
    );
    setStatus(res, isActive(requiredFeature, updatedFeatures));

    const handler = methods[req.method.toLowerCase()];
    if (handler !== undefined && typeof handler === 'function') {
      return handler(req, res);
    }

    next();
  }
);
