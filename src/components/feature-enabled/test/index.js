import describe from "tape";
import FeatureEnabled from "../index";
import dom from "cheerio";
import React from "react";
import ReactDOMServer from "react-dom/server";
import FeatureToggles from "../../feature-toggles";

const render = ReactDOMServer.renderToStaticMarkup;

describe("FeatureEnabled", nest => {
  nest.test("...children, no context", ({ end, equal }) => {
    const $ = dom.load(
      render(
        <FeatureEnabled name={"name"}>
          <h1>My Feature Content</h1>
        </FeatureEnabled>
      )
    );
    equal(
      $.html(),
      "",
      "It should not render the content when there is no context available"
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
          <FeatureEnabled name={"comments"}>
            <h1>My Feature Content</h1>
          </FeatureEnabled>
        </FeatureToggles>
      )
    );
    equal(
      $.html(),
      "<h1>My Feature Content</h1>",
      "It should render the content when the feature is enabled"
    );
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
          <FeatureEnabled name={"comments"}>
            <h1>My Feature Content</h1>
          </FeatureEnabled>
        </FeatureToggles>
      )
    );
    equal(
      $.html(),
      "",
      "It should not render the content when the feature is disabled"
    );
    end();
  });

  nest.test("...context, feature not declared in the features config", ({
    end,
    equal
  }) => {
    const $ = dom.load(
      render(
        <FeatureToggles features={{}}>
          <FeatureEnabled name={"reports"}>
            <h1>My Feature Content</h1>
          </FeatureEnabled>
        </FeatureToggles>
      )
    );
    equal(
      $.html(),
      "",
      "It should not render the content when the feature is not declared in the feature config"
    );
    end();
  });
});
