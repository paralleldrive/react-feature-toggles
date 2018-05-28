import { describe } from 'riteway';
import deepFreeze from 'deep-freeze';
// import { JSDOM } from 'jsdom';
import { getBrowserQueryFeatures } from '../get-browser-query-features';

describe('getBrowserQueryFeatures()', async should => {
  const { assert } = should();
  {
    assert({
      given: 'no arguments in node',
      should: 'return empy array',
      actual: getBrowserQueryFeatures(),
      expected: []
    });
  }
  {
    const url = '?ft=';
    assert({
      given: 'search string with no features',
      should: 'return empy array',
      actual: getBrowserQueryFeatures(deepFreeze(url)),
      expected: []
    });
  }
  {
    const url = '?ft=foo,bar';
    assert({
      given: 'search string with features',
      should: 'return the correct features',
      actual: getBrowserQueryFeatures(deepFreeze(url)),
      expected: ['foo', 'bar']
    });
  }
  // {
  //   const dom = new JSDOM(`<script src="../get-browser-query-features">`, {
  //     url: 'https://example.com/?ft=foo,bar',
  //     contentType: 'text/html',
  //     runScripts: 'outside-only',
  //     resources: 'usable'
  //   });
  //   assert({
  //     given: 'no arguments in browser',
  //     should: 'return the correct features',
  //     actual: dom.window.eval('getBrowserQueryFeatures()'),
  //     expected: ['foo', 'bar']
  //   });
  // }
});
