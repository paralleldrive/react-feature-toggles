import describe from "tape";
import FeatureDisabled from "../index";
import dom from "cheerio";
import React from "react";
import ReactDOMServer from "react-dom/server";
import FeatureToggles from "../../feature-toggles";

const render = ReactDOMServer.renderToStaticMarkup;

describe("FeatureDisabled", nest => {
  nest.test("...children, no context", ({ end, equal }) => {
    const $ = dom.load(
      render(
        <FeatureDisabled name={"name"}>
          <h1>My Feature Content</h1>
        </FeatureDisabled>
      )
    );
    equal(
      $.html(),
      "<h1>My Feature Content</h1>",
      "It should render the children"
    );
    end();
  });

  nest.test("...context, feature enabled", ({ end, equal }) => {
    const $ = dom.load(
      render(
        <FeatureToggles
          features={{
            comments: {
              enabled: true,
              dependencies: []
            }
          }}
        >
          <FeatureDisabled name={"comments"}>
            <h1>My Feature Content</h1>
          </FeatureDisabled>
        </FeatureToggles>
      )
    );
    equal($.html(), "", "It should not render");
    end();
  });

  nest.test("...context, feature disabled", ({ end, equal }) => {
    const $ = dom.load(
      render(
        <FeatureToggles
          features={{
            comments: {
              enabled: false,
              dependencies: []
            }
          }}
        >
          <FeatureDisabled name={"comments"}>
            <h1>My Feature Content</h1>
          </FeatureDisabled>
        </FeatureToggles>
      )
    );
    equal(
      $.html(),
      "<h1>My Feature Content</h1>",
      "It should render the children"
    );
    end();
  });

  nest.test("...context, feature not declared the features object", ({
    end,
    equal
  }) => {
    const $ = dom.load(
      render(
        <FeatureToggles
          features={{
            comments: {
              enabled: false,
              dependencies: []
            }
          }}
        >
          <FeatureDisabled name={"reports"}>
            <h1>My Feature Content</h1>
          </FeatureDisabled>
        </FeatureToggles>
      )
    );
    equal(
      $.html(),
      "<h1>My Feature Content</h1>",
      "It should render the children"
    );
    end();
  });
});
