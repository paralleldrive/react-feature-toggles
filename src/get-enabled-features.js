import getIsEnabled from './get-is-enabled';
import map from 'ramda/src/map';
import compose from 'ramda/src/compose';
import filter from 'ramda/src/filter';
import lensProp from 'ramda/src/lensProp';
import view from 'ramda/src/view';

const nameLens = lensProp('name');
const getName = view(nameLens);

// filterDisabled = [...Feature] => [...Feature];
const filterDisabled = (features = []) =>
  filter(x => getIsEnabled(features, getName(x)), features);

// getEnabledFeatures = [...Feature] => [...String]
const getEnabledFeatures = compose(map(getName), filterDisabled);

export default getEnabledFeatures;
