import words from 'lodash/words';
export const parseQuery = ({ ft } = {}) => words(ft, /[^,]+/g);
