# Next Example

## Run example

- `git clone git@github.com:paralleldrive/react-feature-toggles.git`
- `cd react-feature-toggles/examples/next`
- `npm install`
- `npm run dev`

## View Example

#### A component within a page

Occassionly you will want to hide a certain component within a page. You can do that a few different ways, this example shows you one of the possible ways on the home page. Go to http://localhost:3000/ in your browser and you can toggle the home page example on/off with the links or by manually manipulating the url query.

#### Entire page example

Most of the time you will probabaly want to keep your features scoped to an entire route/page. When the feature is disabled you will likely just want to render a 404 page. You can do that with next by setting the [res.statusCode to 404](https://nextjs.org/docs/#custom-error-handling) in `getIntialProps`. __Note:__ Its important to use `getInitialProps` to set the statusCode so that the server responds with the correct http status.

Go to http://localhost:3000/recently-active-users in your browser to see the default next 404 page. Now enable the feature by adding the query `ft=recently-active-users-page` or go to: http://localhost:3000/recently-active-users?ft=recently-active-users