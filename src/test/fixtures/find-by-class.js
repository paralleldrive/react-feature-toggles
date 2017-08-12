import TestUtils from "react-dom/test-utils";

const findByClass = (dom, selector) => {
  const subject = selector.slice(1);

  return TestUtils.findRenderedDOMComponentWithClass(dom, subject);
};

export default findByClass;
