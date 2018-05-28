import parse from 'url-parse';
import { parseQuery } from './parse-query';

export const getBrowserQueryFeatures = url => {
  if (typeof window === 'undefined') {
    const { query } = parse(url, true);
    return parseQuery(query);
  } else {
    const query = url ? parse(url, true) : parse(window.location.search, true);
    return parseQuery(query);
  }
};
