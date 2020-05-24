define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const parser = Object.create(dart.library);
  const CT = Object.create(null);
  dart.trackLibraries("packages/petitparser/parser", {
    "package:petitparser/parser.dart": parser
  }, {
  }, '{"version":3,"sourceRoot":"","sources":[],"names":[],"mappings":"","file":"parser.ddc.js"}');
  // Exports:
  return {
    parser: parser
  };
});

//# sourceMappingURL=parser.ddc.js.map
