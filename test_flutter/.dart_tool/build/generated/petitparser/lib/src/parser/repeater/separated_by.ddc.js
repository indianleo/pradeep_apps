define(['dart_sdk', 'packages/petitparser/src/context/context'], function(dart_sdk, packages__petitparser__src__context__context) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const possesive = packages__petitparser__src__context__context.src__parser__repeater__possesive;
  const sequence = packages__petitparser__src__context__context.src__parser__combinator__sequence;
  const parser = packages__petitparser__src__context__context.src__core__parser;
  const optional = packages__petitparser__src__context__context.src__parser__combinator__optional;
  const map = packages__petitparser__src__context__context.src__parser__action__map;
  const separated_by = Object.create(dart.library);
  const $_get = dartx._get;
  const $add = dartx.add;
  let JSArrayOfParser = () => (JSArrayOfParser = dart.constFn(_interceptors.JSArray$(parser.Parser)))();
  let Parser__ToParserOfListOfR = () => (Parser__ToParserOfListOfR = dart.constFn(dart.gFnType(R => {
    let ListOfR = () => (ListOfR = dart.constFn(core.List$(R)))();
    let ParserOfListOfR = () => (ParserOfListOfR = dart.constFn(parser.Parser$(ListOfR())))();
    return [ParserOfListOfR(), [parser.Parser], {includeSeparators: core.bool, optionalSeparatorAtEnd: core.bool}, {}];
  })))();
  const CT = Object.create(null);
  separated_by['SeparatedBy|separatedBy'] = function SeparatedBy$124separatedBy(T, R, $this, separator, opts) {
    let includeSeparators = opts && 'includeSeparators' in opts ? opts.includeSeparators : true;
    let optionalSeparatorAtEnd = opts && 'optionalSeparatorAtEnd' in opts ? opts.optionalSeparatorAtEnd : false;
    let repeater = possesive['PossessiveRepeatingParserExtension|star'](core.List, new sequence.SequenceParser.new(JSArrayOfParser().of([separator, $this])));
    let parser = new sequence.SequenceParser.new(dart.test(optionalSeparatorAtEnd) ? JSArrayOfParser().of([$this, repeater, optional['OptionalParserExtension|optional'](dart.dynamic, separator)]) : JSArrayOfParser().of([$this, repeater]));
    return map['MapParserExtension|map'](core.List, core.List$(R), parser, dart.fn(list => {
      let result = _interceptors.JSArray$(R).of([]);
      result[$add](R._check(list[$_get](0)));
      for (let tuple of core.Iterable._check(list[$_get](1))) {
        if (dart.test(includeSeparators)) {
          result[$add](R._check(dart.dsend(tuple, '_get', [0])));
        }
        result[$add](R._check(dart.dsend(tuple, '_get', [1])));
      }
      if (dart.test(includeSeparators) && dart.test(optionalSeparatorAtEnd) && list[$_get](2) != null) {
        result[$add](R._check(list[$_get](2)));
      }
      return result;
    }, dart.fnType(core.List$(R), [core.List])));
  };
  separated_by['SeparatedBy|get#separatedBy'] = function SeparatedBy$124get$35separatedBy(T, $this) {
    return dart.fn((R, separator, opts) => {
      let includeSeparators = opts && 'includeSeparators' in opts ? opts.includeSeparators : true;
      let optionalSeparatorAtEnd = opts && 'optionalSeparatorAtEnd' in opts ? opts.optionalSeparatorAtEnd : false;
      return separated_by['SeparatedBy|separatedBy'](T, R, $this, separator, {includeSeparators: includeSeparators, optionalSeparatorAtEnd: optionalSeparatorAtEnd});
    }, Parser__ToParserOfListOfR());
  };
  dart.trackLibraries("packages/petitparser/src/parser/repeater/separated_by", {
    "package:petitparser/src/parser/repeater/separated_by.dart": separated_by
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["separated_by.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;6FAuBwC;QAC5B;QAA+B;AACjC,mBAA6C,gEAAlC,gCAAe,sBAAC,SAAS;AACpC,iBAAS,0CAAe,sBAAsB,IAC9C,6BAAO,QAAQ,EAAY,2DAAV,SAAS,MAC1B,6BAAO,QAAQ;AACrB,UAAc,yDAAP,MAAM,EAAK,QAAC;AACX,mBAAY;AACC,MAAnB,AAAO,MAAD,gBAAK,AAAI,IAAA,QAAC;AAChB,eAAW,8BAAS,AAAI,IAAA,QAAC;AACvB,sBAAI,iBAAiB;AACC,UAApB,AAAO,MAAD,gBAAU,WAAL,KAAK,WAAC;;AAEC,QAApB,AAAO,MAAD,gBAAU,WAAL,KAAK,WAAC;;AAEnB,oBAAI,iBAAiB,eAAI,sBAAsB,KAAI,AAAI,IAAA,QAAC,MAAM;AACzC,QAAnB,AAAO,MAAD,gBAAK,AAAI,IAAA,QAAC;;AAElB,YAAO,OAAM;;EAEjB;;AApBgB,uBAAsB;UAC5B;UAA+B;AADzB,2EAAS,sBAAT,iBAAiB,0BAAjB,sBAAsB","file":"separated_by.ddc.js"}');
  // Exports:
  return {
    src__parser__repeater__separated_by: separated_by
  };
});

//# sourceMappingURL=separated_by.ddc.js.map
