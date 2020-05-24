define(['dart_sdk', 'packages/xml/src/xml/builder', 'packages/petitparser/src/context/context'], function(dart_sdk, packages__xml__src__xml__builder, packages__petitparser__src__context__context) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const default_mapping = packages__xml__src__xml__builder.src__xml__entities__default_mapping;
  const exceptions = packages__xml__src__xml__builder.src__xml__utils__exceptions;
  const document = packages__xml__src__xml__builder.src__xml__nodes__document;
  const cache = packages__xml__src__xml__builder.src__xml__utils__cache;
  const entity_mapping = packages__xml__src__xml__builder.src__xml__entities__entity_mapping;
  const parser = packages__xml__src__xml__builder.src__xml__parser;
  const token = packages__petitparser__src__context__context.src__core__token;
  const parser$ = packages__petitparser__src__context__context.src__core__parser;
  const xml = Object.create(dart.library);
  const $_get = dartx._get;
  let XmlCacheOfXmlEntityMapping$Parser = () => (XmlCacheOfXmlEntityMapping$Parser = dart.constFn(cache.XmlCache$(entity_mapping.XmlEntityMapping, parser$.Parser)))();
  let dynamicToParser = () => (dynamicToParser = dart.constFn(dart.fnType(parser$.Parser, [dart.dynamic])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C1() {
      return C1 = dart.constMap(core.String, core.String, ["amp", "&", "apos", "'", "gt", ">", "lt", "<", "quot", "\""]);
    },
    get C0() {
      return C0 = dart.const({
        __proto__: default_mapping.XmlDefaultEntityMapping.prototype,
        [XmlDefaultEntityMapping_entities]: C1 || CT.C1
      });
    }
  });
  let C1;
  const XmlDefaultEntityMapping_entities = dart.privateName(default_mapping, "XmlDefaultEntityMapping.entities");
  let C0;
  xml.parse = function parse(input, opts) {
    let entityMapping = opts && 'entityMapping' in opts ? opts.entityMapping : C0 || CT.C0;
    let result = xml._parserCache._get(entityMapping).parse(input);
    if (dart.test(result.isFailure)) {
      let lineAndColumn = token.Token.lineAndColumnOf(result.buffer, result.position);
      dart.throw(new exceptions.XmlParserException.new(result.message, {buffer: result.buffer, position: result.position, line: lineAndColumn[$_get](0), column: lineAndColumn[$_get](1)}));
    }
    return document.XmlDocument._check(result.value);
  };
  dart.defineLazy(xml, {
    /*xml._parserCache*/get _parserCache() {
      return new (XmlCacheOfXmlEntityMapping$Parser()).new(dart.fn(entityMapping => new parser.XmlParserDefinition.new(entity_mapping.XmlEntityMapping._check(entityMapping)).build(), dynamicToParser()), 5);
    }
  });
  dart.trackLibraries("packages/xml/xml", {
    "package:xml/xml.dart": xml
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["xml.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6BA0EyB;QACH;AACd,iBAAS,AAAY,AAAgB,sBAAf,aAAa,QAAQ,KAAK;AACtD,kBAAI,AAAO,MAAD;AACF,0BAAsB,4BAAgB,AAAO,MAAD,SAAS,AAAO,MAAD;AAKpC,MAJ7B,WAAM,sCAAmB,AAAO,MAAD,mBACnB,AAAO,MAAD,mBACJ,AAAO,MAAD,iBACV,AAAa,aAAA,QAAC,YACZ,AAAa,aAAA,QAAC;;AAE5B,uCAAO,AAAO,MAAD;EACf;;MAzByC,gBAAY;YACjD,+CAAS,QAAC,iBAAkB,AAAmC,0EAAf,aAAa,gCAAW","file":"xml.ddc.js"}');
  // Exports:
  return {
    xml: xml
  };
});

//# sourceMappingURL=xml.ddc.js.map
