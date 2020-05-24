define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const context = Object.create(dart.library);
  const CT = Object.create(null);
  dart.trackLibraries("packages/petitparser/context", {
    "package:petitparser/context.dart": context
  }, {
  }, '{"version":3,"sourceRoot":"","sources":[],"names":[],"mappings":"","file":"context.ddc.js"}');
  // Exports:
  return {
    context: context
  };
});

//# sourceMappingURL=context.ddc.js.map
