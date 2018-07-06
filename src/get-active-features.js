import map from 'ramda/src/map';
import compose from 'ramda/src/compose';
import filter from 'ramda/src/filter';
import lensProp from 'ramda/src/lensProp';
import view from 'ramda/src/view';

import { getIsEnabled } from './get-is-enabled';

const nameLens = lensProp('name');
const getName = view(nameLens);

// filterDisabled = [...Feature] => [...Feature];
const filterDisabled = (features = []) =>
  filter(x => getIsEnabled(features, getName(x)), features);

// getActiveFeatures = [...Feature] => [...String]
export const getActiveFeatures = compose(
  map(getName),
  filterDisabled
);
