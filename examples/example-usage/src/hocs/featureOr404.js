import { configureFeature } from '../dist/index';
import { NFPage } from '../features/NFPage';

export const featureOr404 = configureFeature(NFPage);
