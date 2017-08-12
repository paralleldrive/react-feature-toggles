import describe from "tape";
import withFeatures from "../index";
import dom from "cheerio";
import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

const render = ReactDOMServer.renderToStaticMarkup;

import $find from "../../test/fixtures/find-by-class";
import createDocument from "../../test/fixtures/create-document";
import ReactTestUtils from "react-dom/test-utils";
const renderDOM = ReactTestUtils.renderIntoDocument;

describe("withFeatures", ({ test }) => {
  test("...features prop", ({ end, deepEqual }) => {
    const msg =
      "it should add the features list to the wrapped components props";
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

  test("...recieved props", ({ end, deepEqual }) => {
    const msg =
      "it should pass through all recieved props to the wrapped component";

    const ChildComponent = ({ name }) => (
      <div className="child-component">{name}</div>
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

    const name = "Joe Joe";
    const Component = withFeatures(initialFeatures)(ChildComponent);
    const $ = dom.load(render(<Component name={name} />));

    const actual = $(".child-component").text();
    const expected = name;

    deepEqual(actual, expected, msg);
    end();
  });

  test("...context", ({ end, deepEqual }) => {
    const msg = "it should add enabled features to the react context";

    const ChildComponent = (props, context) => (
      <div className="child-component">{context.features.toString()}</div>
    );
    ChildComponent.contextTypes = { features: PropTypes.array };

    const initialFeatures = {
      game: {
        enabled: true,
        dependencies: []
      },
      "enhanced-game": {
        enabled: false,
        dependencies: []
      },
      "game-comments": {
        enabled: true,
        dependencies: []
      }
    };

    const Component = withFeatures(initialFeatures)(ChildComponent);
    const $ = dom.load(render(<Component />));

    const actual = $(".child-component").text();
    const expected = "game,game-comments";

    deepEqual(actual, expected, msg);
    end();
  });

  test("...no initialFeatures", ({ end, deepEqual }) => {
    const msg = "it should have no enabled features";

    const ChildComponent = (props, context) => (
      <div className="child-component">{context.features.toString()}</div>
    );
    ChildComponent.contextTypes = { features: PropTypes.array };

    const Component = withFeatures()(ChildComponent);
    const $ = dom.load(render(<Component />));

    const actual = $(".child-component").text();
    const expected = "";

    deepEqual(actual, expected, msg);
    end();
  });

  test("...url param overrides", ({ end, deepEqual }) => {
    const msg = "it should override the correct features";
    const dom = createDocument();
    dom.reconfigure({ url: "https://example.com/?ft=game" });

    const ChildComponent = (props, context) => (
      <div className="child-component">{context.features.toString()}</div>
    );
    ChildComponent.contextTypes = { features: PropTypes.array };

    const Component = withFeatures({
      game: {
        enabled: false,
        dependencies: []
      },
      help: {
        enabled: false,
        dependencies: []
      }
    })(ChildComponent);

    const output = renderDOM(<Component />, document.body);

    const el = $find(output, ".child-component");

    const actual = el.innerHTML;
    const expected = "game";

    deepEqual(actual, expected, msg);
    end();
  });
});
