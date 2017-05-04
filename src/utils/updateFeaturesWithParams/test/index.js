import describe from "tape";
import updateFeaturesWithParams from "../index";
import deepFreeze from "deep-freeze";

const createFeature = ({ enabled = false, dependencies = [] } = {}) => ({
  enabled,
  dependencies
});

describe("updateFeaturesWithParams()", nest => {
  nest.test(
    "...updateFeaturesWithParams() no arguments",
    ({ end, deepEqual }) => {
      deepEqual(
        updateFeaturesWithParams(),
        {},
        "It should return an empty object"
      );
      end();
    }
  );

  nest.test(
    "...updateFeaturesWithParams(search: String)",
    ({ end, deepEqual }) => {
      const features = {
        posts: createFeature({
          enabled: true
        }),
        "post-rating": createFeature({
          enabled: false,
          dependencies: ["posts"]
        }),
        "post-rating-graph": createFeature({
          enabled: true,
          dependencies: ["post-rating"]
        }),
        reports: createFeature({
          enabled: false
        })
      };
      deepFreeze(features);

      deepEqual(
        updateFeaturesWithParams(features, ""),
        features,
        "if an empty string is passed it then it should return the original object"
      );

      deepEqual(
        updateFeaturesWithParams(features, "?"),
        features,
        "if an empty search string is passed it then it should return the original object"
      );

      deepEqual(
        updateFeaturesWithParams(features, "?ft=post-rating,reports,login"),
        Object.assign({}, features, {
          "post-rating": Object.assign({}, features["post-rating"], {
            enabled: true
          }),
          reports: Object.assign({}, features["reports"], {
            enabled: true
          }),
          login: createFeature({
            enabled: true,
            dependencies: []
          })
        }),
        "it should enable the correct features and add additional features that are not in the original feature object"
      );
      end();
    }
  );
});
