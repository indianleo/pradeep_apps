define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const expression = Object.create(dart.library);
  const CT = Object.create(null);
  dart.trackLibraries("packages/petitparser/expression", {
    "package:petitparser/expression.dart": expression
  }, {
  }, '{"version":3,"sourceRoot":"","sources":[],"names":[],"mappings":"","file":"expression.ddc.js"}');
  // Exports:
  return {
    expression: expression
  };
});

//# sourceMappingURL=expression.ddc.js.map
