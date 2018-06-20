import { mergeFeatures } from './merge-features';
import { getReqQueryFeatures } from './get-req-query-features';
import { getBrowserQueryFeatures } from './get-browser-query-features';

export const getCurrentActiveFeatures = ({
  initialFeatures = [],
  req,
  search
} = {}) =>
  mergeFeatures(
    initialFeatures,
    getReqQueryFeatures(req),
    getBrowserQueryFeatures(search)
  );
