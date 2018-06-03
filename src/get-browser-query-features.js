import parse from 'url-parse';
import { getQueryFeatures } from './get-query-features';

export const getBrowserQueryFeatures = (
  search = typeof window === 'undefined' ? '' : window.location.search
) => {
  const { query } = parse(search, true);
  return getQueryFeatures(query);
};
