import React, { useContext } from 'react';

const FeaturesContext = React.createContext([]);

export const { Consumer, Provider } = FeaturesContext;

export function useFeatures() {
  return useContext(FeaturesContext);
}

export function withFeatures(Component) {
  return props => {
    return (
      <FeaturesContext.Consumer>
        {features => (
          <Component {...props} features={features ? features : {}} />
        )}
      </FeaturesContext.Consumer>
    );
  };
}
