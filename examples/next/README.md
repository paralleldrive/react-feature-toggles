# Next Example

## Run example

- `git clone git@github.com:paralleldrive/react-feature-toggles.git`
- `cd react-feature-toggles/examples/next`
- `npm install`
- `npm run dev`
- goto http://localhost:3000 in your browser

## Description

This is an example app that shows you how to use feature toggles for both full pages and individual components of pages.

Most of the time you will probabaly want to keep your features scoped to an entire route/page. When the feature is disabled you will likely just want to render a 404 page. Because next is server render it requires a bit more work, but you can do that with next by setting the [res.statusCode to 404](https://nextjs.org/docs/#custom-error-handling) in `getIntialProps`. __Note:__ Its important to use `getInitialProps` to set the statusCode so that the server responds with the correct http status. We have provided a higher order component that should give you an idea of this.
