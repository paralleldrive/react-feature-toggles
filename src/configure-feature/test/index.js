import describe from "tape";
import dom from "cheerio";
import React from "react";
import ReactDOMServer from "react-dom/server";
import withContext from "./with-context";
import configureFeature from "../index";

const render = ReactDOMServer.renderToStaticMarkup;

const createTestComponent = componentName => ({ someOtherProp } = {}) => (
  <div>
    <div className={componentName} />
    <div className="some-other-prop">{someOtherProp}</div>
  </div>
);

describe("configureFeature()", ({ test }) => {
  test("...feature not enabled, with FallbackComponent", ({
    end,
    deepEqual
  }) => {
    const NotFound = createTestComponent("not-found");
    const Feature = createTestComponent("feature");
    const Fallback = createTestComponent("fall-back");

    // prettier-ignore
    const ConfiguredFeature = 
      configureFeature(NotFound)("game")(Feature, Fallback);

    const FeatureWithContext = withContext([])(ConfiguredFeature);

    const someOtherProp = "bacon and eggs";

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );
    {
      const msg = "it should not render NotFound component";
      const actual = $(".not-found").length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should not render the Feature component";
      const actual = $(".feature").length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should render the Fallback component";
      const actual = $(".fall-back").length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should pass through received props";
      const actual = $(".some-other-prop").text();
      const expected = someOtherProp;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test("...feature enabled, with FallbackComponent", ({ end, deepEqual }) => {
    const NotFound = createTestComponent("not-found");
    const Feature = createTestComponent("feature");
    const Fallback = createTestComponent("fall-back");

    // prettier-ignore
    const ConfiguredFeature = 
      configureFeature(NotFound)("game")(Feature, Fallback);

    const FeatureWithContext = withContext(["help", "game", "food"])(
      ConfiguredFeature
    );

    const someOtherProp = "bacon and eggs";

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );
    {
      const msg = "it should not render NotFound component";
      const actual = $(".not-found").length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should render the Feature component";
      const actual = $(".feature").length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should not render the Fallback component";
      const actual = $(".fall-back").length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should pass through received props";
      const actual = $(".some-other-prop").text();
      const expected = someOtherProp;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test("...feature not enabled, no FallbackComponent", ({ end, deepEqual }) => {
    const NotFound = createTestComponent("not-found");
    const Feature = createTestComponent("feature");
    const ConfiguredFeature = configureFeature(NotFound)("game")(Feature);
    const FeatureWithContext = withContext([])(ConfiguredFeature);

    const someOtherProp = "bacon and eggs";

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );
    {
      const msg = "it should render NotFound component";
      const actual = $(".not-found").length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should not render the Feature component";
      const actual = $(".feature").length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should not render the Fallback component";
      const actual = $(".fall-back").length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should pass through received props";
      const actual = $(".some-other-prop").text();
      const expected = someOtherProp;
      deepEqual(actual, expected, msg);
    }
    end();
  });

  test("...feature enabled, no FallbackComponent", ({ end, deepEqual }) => {
    const NotFound = createTestComponent("not-found");
    const Feature = createTestComponent("feature");
    const ConfiguredFeature = configureFeature(NotFound)("game")(Feature);
    const FeatureWithContext = withContext(["lessions", "game"])(
      ConfiguredFeature
    );

    const someOtherProp = "bacon and eggs";

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );
    {
      const msg = "it should not render NotFound component";
      const actual = $(".not-found").length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should render the Feature component";
      const actual = $(".feature").length;
      const expected = 1;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should not render the Fallback component";
      const actual = $(".fall-back").length;
      const expected = 0;
      deepEqual(actual, expected, msg);
    }
    {
      const msg = "it should pass through received props";
      const actual = $(".some-other-prop").text();
      const expected = someOtherProp;
      deepEqual(actual, expected, msg);
    }
    end();
  });
});
