# Next Example

## Run example

- `git clone git@github.com:paralleldrive/react-feature-toggles.git`
- `cd react-feature-toggles/examples/next`
- `npm install`
- `npm run dev`
- goto http://localhost:3000 in your browser

## Description

This is an example app that shows you how to use feature toggles for both full pages and individual components of pages.

Most of the time you will probabaly want to keep your features scoped to an entire route/page. When the feature is disabled you will likely just want to render a 404 page. Because next is server rendered it requires a bit more work. In order to render a 404 page and send the correct http status next requires that you set [res.statusCode to 404](https://nextjs.org/docs/#custom-error-handling) in `getIntialProps` . __Note:__ Its important to use `getInitialProps` to set the statusCode so that the server responds with the correct http status.
