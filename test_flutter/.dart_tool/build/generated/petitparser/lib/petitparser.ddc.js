define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const petitparser = Object.create(dart.library);
  const CT = Object.create(null);
  dart.trackLibraries("packages/petitparser/petitparser", {
    "package:petitparser/petitparser.dart": petitparser
  }, {
  }, '{"version":3,"sourceRoot":"","sources":[],"names":[],"mappings":"","file":"petitparser.ddc.js"}');
  // Exports:
  return {
    petitparser: petitparser
  };
});

//# sourceMappingURL=petitparser.ddc.js.map
