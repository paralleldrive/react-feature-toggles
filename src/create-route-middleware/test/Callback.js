const callback = (called = false, args = []) => ({
  callback: (...argsv) => {
    called = true;
    args = argsv;
  },
  get isCalled () { return called; },
  get args() { return args; }
});

export default callback;