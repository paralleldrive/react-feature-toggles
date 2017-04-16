import describe from "tape";
import FeatureToggles from "../index";
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
});
