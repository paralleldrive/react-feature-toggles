import parse from 'url-parse';
import { parseQuery } from './parse-query';

export const getBrowserQueryFeatures = (
  search = typeof window === 'undefined' ? '' : window.location.search
) => {
  const { query } = parse(search, true);
  return parseQuery(query);
};
