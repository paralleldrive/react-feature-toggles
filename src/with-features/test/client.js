import describe from "tape";
import withFeatures from "../index";

import ChildComponent from "./child-component";

import $find from "../../test/fixtures/find-by-class";
import createDocument from "../../test/fixtures/create-document";
import ReactTestUtils from "react-dom/test-utils";
import React from "react";
const renderDOM = ReactTestUtils.renderIntoDocument;
const dom = createDocument();

describe("withFeatures", ({ test }) => {
  test("...overrides", ({ end, deepEqual }) => {
    const msg = "it should render without crashing";

    dom.reconfigure({ url: "https://example.com/?ft=game" });

    const Component = withFeatures()(ChildComponent);

    const output = renderDOM(<Component />, document.body);

    const el = $find(output, ".child-component");

    const actual = el;
    const expected = "";

    deepEqual(actual, expected, msg);
    end();
  });
});
