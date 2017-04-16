import describe from "tape";
import getIsEnabled from "../index";
import deepFreeze from "deep-freeze";

const createFeature = (
  {
    enabled = false,
    allow_url_params_override = false,
    dependencies = []
  } = {}
) => ({
  enabled,
  allow_url_params_override,
  dependencies
});

describe("getIsEnabled()", nest => {
  nest.test("...getIsEnabled() no arguments", ({ end, equal }) => {
    equal(getIsEnabled(), false, "It should return false");
    end();
  });
  nest.test("...getIsEnabled() with feature object", ({
    end,
    equal
  }) => {
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
      }),
      "report-rating": createFeature({
        enabled: true,
        dependencies: ["reports"]
      }),
      "report-rating-graph": createFeature({
        enabled: true,
        dependencies: ["report-rating"]
      }),
      comments: createFeature({
        enabled: true
      }),
      "comment-rating": createFeature({
        enabled: true,
        dependencies: ["comments"]
      }),
      "comment-rating-graph": createFeature({
        enabled: true,
        dependencies: ["comment-rating"]
      })
    };
    deepFreeze(features);

    equal(getIsEnabled("posts", features), true, "posts -> should return true");

    equal(
      getIsEnabled("post-rating", features),
      false,
      "post-rating -> should return false"
    );

    equal(
      getIsEnabled("post-rating-graph", features),
      false,
      "post-rating-graph -> It should return false"
    );

    equal(
      getIsEnabled("report-rating-graph", features),
      false,
      "report-rating-graph -> should return false"
    );

    equal(
      getIsEnabled("comment-rating-graph", features),
      true,
      "comment-rating-graph -> should return true"
    );
    end();
  });
});
