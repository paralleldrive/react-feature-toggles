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
    let msg, actual, expected;

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

    msg = "it should not render NotFound component";
    actual = $(".not-found").length;
    expected = 0;
    deepEqual(actual, expected, msg);

    msg = "it should not render the Feature component";
    actual = $(".feature").length;
    expected = 0;
    deepEqual(actual, expected, msg);

    msg = "it should render the Fallback component";
    actual = $(".fall-back").length;
    expected = 1;
    deepEqual(actual, expected, msg);

    msg = "it should pass through received props";
    actual = $(".some-other-prop").text();
    expected = someOtherProp;
    deepEqual(actual, expected, msg);

    end();
  });

  test("...feature enabled, with FallbackComponent", ({ end, deepEqual }) => {
    let msg, actual, expected;

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

    msg = "it should not render NotFound component";
    actual = $(".not-found").length;
    expected = 0;
    deepEqual(actual, expected, msg);

    msg = "it should render the Feature component";
    actual = $(".feature").length;
    expected = 1;
    deepEqual(actual, expected, msg);

    msg = "it should not render the Fallback component";
    actual = $(".fall-back").length;
    expected = 0;
    deepEqual(actual, expected, msg);

    msg = "it should pass through received props";
    actual = $(".some-other-prop").text();
    expected = someOtherProp;
    deepEqual(actual, expected, msg);

    end();
  });

  test("...feature not enabled, no FallbackComponent", ({ end, deepEqual }) => {
    let msg, actual, expected;

    const NotFound = createTestComponent("not-found");
    const Feature = createTestComponent("feature");
    const ConfiguredFeature = configureFeature(NotFound)("game")(Feature);
    const FeatureWithContext = withContext([])(ConfiguredFeature);

    const someOtherProp = "bacon and eggs";

    const $ = dom.load(
      render(<FeatureWithContext someOtherProp={someOtherProp} />)
    );

    msg = "it should render NotFound component";
    actual = $(".not-found").length;
    expected = 1;
    deepEqual(actual, expected, msg);

    msg = "it should not render the Feature component";
    actual = $(".feature").length;
    expected = 0;
    deepEqual(actual, expected, msg);

    msg = "it should not render the Fallback component";
    actual = $(".fall-back").length;
    expected = 0;
    deepEqual(actual, expected, msg);

    msg = "it should pass through received props";
    actual = $(".some-other-prop").text();
    expected = someOtherProp;
    deepEqual(actual, expected, msg);

    end();
  });

  test("...feature enabled, no FallbackComponent", ({ end, deepEqual }) => {
    let msg, actual, expected;

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

    msg = "it should not render NotFound component";
    actual = $(".not-found").length;
    expected = 0;
    deepEqual(actual, expected, msg);

    msg = "it should render the Feature component";
    actual = $(".feature").length;
    expected = 1;
    deepEqual(actual, expected, msg);

    msg = "it should not render the Fallback component";
    actual = $(".fall-back").length;
    expected = 0;
    deepEqual(actual, expected, msg);

    msg = "it should pass through received props";
    actual = $(".some-other-prop").text();
    expected = someOtherProp;
    deepEqual(actual, expected, msg);

    end();
  });
});
