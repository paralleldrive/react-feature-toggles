import { parseQuery } from './parse-query';

export const getReqQueryFeatures = ({ query } = {}) =>
  !query ? [] : parseQuery(query);
