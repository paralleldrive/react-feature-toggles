import getIsEnabled from '../get-is-enabled';
import { map, compose, filter, lensProp, view } from 'ramda';

const nameLens = lensProp('name');
const getName = view(nameLens);

// filterDisabled = xs => xs;
const filterDisabled = xs => filter((x) => getIsEnabled(xs, getName(x)), xs);

// getEnabled = [...Feature] => [...String]
const getEnabled = compose(map(getName), filterDisabled);

export default (features = []) => getEnabled(features);
