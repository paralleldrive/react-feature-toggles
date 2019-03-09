# Next Example

## Run example

- `git clone git@github.com:paralleldrive/react-feature-toggles.git`
- `cd react-feature-toggles/examples/next`
- `npm install`
- `npm run dev`
- goto http://localhost:3000 in your browser

## Description

Most of the time you will probabaly want to keep your features scoped to an entire route/page. When the feature is disabled you will likely just want to render a 404 page. You can do that with next by setting the [res.statusCode to 404](https://nextjs.org/docs/#custom-error-handling) in `getIntialProps`. __Note:__ Its important to use `getInitialProps` to set the statusCode so that the server responds with the correct http status.

Occassionly you will want to hide a certain component within a page. You can do that a few different ways, this example shows you one of the possible ways with the menu link to the feature.

