import describe from "tape";
import withFeatures from "../index";
import dom from "cheerio";
import React from "react";
import ReactDOMServer from "react-dom/server";
import merge from "lodash/merge";
import PropTypes from "prop-types";

const compose = (...fns) => x => fns.reduce((v, f) => f(v), x);

const defaultInitialFeatures = {
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

const createInitialFeatures = settings =>
  merge(defaultInitialFeatures, settings);

const render = ReactDOMServer.renderToStaticMarkup;

describe("withFeatures", ({ test }) => {
  test("...child features prop", ({ end, deepEqual }) => {
    const msg =
      "it should pass enabled features on to wrapped components props";
    const ChildComponent = ({ features }) => (
      <div className="child-component">{features.toString()}</div>
    );
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
    const Component = withFeatures(initialFeatures)(ChildComponent);
    const $ = dom.load(render(<Component />));

    const actual = $(".child-component").text();
    const expected = "help,comments";

    deepEqual(actual, expected, msg);
    end();
  });

  test("...features in context", ({ end, deepEqual }) => {
    const msg = "it should set the enabled features in context";

    const ChildComponent = (props, context) => (
      <div className="child-component">{context.features.toString()}</div>
    );
    ChildComponent.contextTypes = { features: PropTypes.array };

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

    const Component = withFeatures(initialFeatures)(ChildComponent);
    const $ = dom.load(render(<Component />));

    const actual = $(".child-component").text();
    const expected = "help,comments";

    deepEqual(actual, expected, msg);
    end();
  });
});
