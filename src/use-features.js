import { useContext } from 'react';
import { FeatureTogglesContext } from './context';

export const useFeatures = () => useContext(FeatureTogglesContext);
