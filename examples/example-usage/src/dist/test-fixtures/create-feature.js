'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var createFeature = (exports.createFeature = function createFeature() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$name = _ref.name,
    name = _ref$name === undefined ? '' : _ref$name,
    _ref$isActive = _ref.isActive,
    isActive = _ref$isActive === undefined ? false : _ref$isActive,
    _ref$dependencies = _ref.dependencies,
    dependencies = _ref$dependencies === undefined ? [] : _ref$dependencies;

  return {
    name: name,
    isActive: isActive,
    dependencies: dependencies
  };
});
