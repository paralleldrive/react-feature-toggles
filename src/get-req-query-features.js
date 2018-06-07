import { getQueryFeatures } from './get-query-features';

export const getReqQueryFeatures = ({ query } = {}) =>
  !query ? [] : getQueryFeatures(query);
