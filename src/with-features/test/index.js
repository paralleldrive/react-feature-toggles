import describe from "tape";
import withFeatures from "../index";
import dom from "cheerio";
import React from "react";
import ReactDOMServer from "react-dom/server";
import createWrappedComponent from "./create-wrapped-component";

const render = ReactDOMServer.renderToStaticMarkup;

describe("withFeatures", ({ test }) => {
  test("...no config", ({ end, deepEqual }) => {
    let msg, actual, expected;

    const WrappedComponent = createWrappedComponent();
    const Component = withFeatures()(WrappedComponent);
    const $ = dom.load(render(<Component />));

    msg = "the react context features should have no enabled features";
    actual = $(".context-features-string").text();
    expected = "";
    deepEqual(actual, expected, msg);

    msg = "the prop features should have no enabled features";
    actual = $(".props-features-string").text();
    expected = "";

    deepEqual(actual, expected, msg);
    end();
  });

  test("...empty config object", ({ end, deepEqual }) => {
    let msg, actual, expected;

    const WrappedComponent = createWrappedComponent();
    const Component = withFeatures({})(WrappedComponent);
    const $ = dom.load(render(<Component />));

    msg = "the react context features should have no enabled features";
    actual = $(".context-features-string").text();
    expected = "";
    deepEqual(actual, expected, msg);

    msg = "the prop features should have no enabled features";
    actual = $(".props-features-string").text();
    expected = "";

    deepEqual(actual, expected, msg);
    end();
  });

  test("...config with initialFeatures", ({ end, deepEqual }) => {
    let msg, actual, expected;

    const initialFeatures = {
      help: {
        enabled: true,
        dependencies: []
      },
      comments: {
        enabled: true,
        dependencies: []
      },
      sorting: {
        enabled: false,
        dependencies: []
      }
    };

    const WrappedComponent = createWrappedComponent();
    const Component = withFeatures({ initialFeatures })(WrappedComponent);
    const $ = dom.load(render(<Component />));

    msg = "the react context features should have the correct enabled features";
    actual = $(".context-features-string").text();
    expected = "help,comments";
    deepEqual(actual, expected, msg);

    msg = "the prop features should have the correct enabled features";
    actual = $(".props-features-string").text();
    expected = "help,comments";

    deepEqual(actual, expected, msg);
    end();
  });

  test("...url search param overrides", ({ end, deepEqual }) => {
    let msg, actual, expected;

    const initialFeatures = {
      game: {
        enabled: false,
        dependencies: []
      },
      help: {
        enabled: false,
        dependencies: []
      },
      comments: {
        enabled: false,
        dependencies: []
      }
    };

    const WrappedComponent = createWrappedComponent();
    const Component = withFeatures({
      initialFeatures,
      windowLocationSearch: "?ft=game,comments"
    })(WrappedComponent);
    const $ = dom.load(render(<Component />));

    msg = "the react context features should have the correct enabled features";
    actual = $(".context-features-string").text();
    expected = "game,comments";
    deepEqual(actual, expected, msg);

    msg = "the prop features should have the correct enabled features";
    actual = $(".props-features-string").text();
    expected = "game,comments";

    deepEqual(actual, expected, msg);
    end();
  });

  test("...received props", ({ end, deepEqual }) => {
    const msg =
      "it should pass through all received props to the wrapped component";

    const WrappedComponent = createWrappedComponent();
    const name = "Joe Joe";
    const Component = withFeatures()(WrappedComponent);
    const $ = dom.load(render(<Component name={name} />));

    const actual = $(".props-name").text();
    const expected = name;

    deepEqual(actual, expected, msg);
    end();
  });
});
