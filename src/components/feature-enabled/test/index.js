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
    equal($.html(), "", "It should not render anything");
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
      "It should render the children"
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
    equal($.html(), "", "It should not render any children");
    end();
  });

  nest.test("...context, feature no in the features object", ({
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
          <FeatureEnabled name={"reports"}>
            <h1>My Feature Content</h1>
          </FeatureEnabled>
        </FeatureToggles>
      )
    );
    equal($.html(), "", "It should not render any children");
    end();
  });
});
