import parse from 'url-parse';
import { parseQuery } from './parse-query';

export const getBrowserQueryFeatures = url => {
  const { query } = parse(url, true);
  return parseQuery(query);
};
