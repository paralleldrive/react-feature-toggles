import getIsEnabled from './get-is-enabled';
import { map, compose, filter, lensProp, view } from 'ramda';

const nameLens = lensProp('name');
const getName = view(nameLens);

// filterDisabled = [...Feature] => [...Feature];
const filterDisabled = (features = []) => filter((x) => getIsEnabled(features, getName(x)), features);

// getEnabled = [...Feature] => [...String]
const getEnabled = compose(map(getName), filterDisabled);

export default getEnabled;
