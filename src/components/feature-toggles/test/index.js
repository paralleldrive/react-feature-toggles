import describe from "tape";
import FeatureToggles, { getIsEnabled } from "../index";
import dom from "cheerio";
import React from "react";
import ReactDOMServer from "react-dom/server";

const render = ReactDOMServer.renderToStaticMarkup;

const createProps = ({} = {}) => ({});

describe("FeatureToggles", nest => {
  nest.test("...children", ({ end, equal }) => {
    const $ = dom.load(
      render(<FeatureToggles features={{}}><h1>I am here</h1></FeatureToggles>)
    );
    equal(
      $.html(),
      "<h1>I am here</h1>",
      "It should render the child without any wrapping elements"
    );
    end();
  });

  nest.test("...getIsEnabled(), empty context", ({ end, equal }) => {
    equal(getIsEnabled(undefined, "comments"), false, "It should return false");
    equal(getIsEnabled({}, "comments"), false, "It should return false");
    end();
  });

  nest.test("...getIsEnabled()", ({ end, equal }) => {
    const context = {
      features: {
        enabled: ["posts"]
      }
    };
    equal(getIsEnabled(context, "posts"), true, "It should return true");

    equal(getIsEnabled(context, "comments"), false, "It should return false");
    end();
  });
});
