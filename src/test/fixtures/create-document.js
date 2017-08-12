import { JSDOM } from "jsdom";

const createDocument = () => {
  const dom = new JSDOM(
    `<!DOCTYPE html><html><head></head><body></body></html>`
  );
  global.document = dom.window.document;
  global.window = dom.window;
  return dom;
};

export default createDocument;
