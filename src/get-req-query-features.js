import { parseQuery } from './parse-query';

export const getReqQueryFeatures = req => {
  return !req ? [] : !req.query ? [] : parseQuery(req.query);
};
