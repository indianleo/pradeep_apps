define(['dart_sdk', 'packages/petitparser/src/context/context'], function(dart_sdk, packages__petitparser__src__context__context) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const parser = packages__petitparser__src__context__context.src__core__parser;
  const match = Object.create(dart.library);
  const pattern = Object.create(dart.library);
  const accept = Object.create(dart.library);
  const $substring = dartx.substring;
  const $map = dartx.map;
  const $toList = dartx.toList;
  const $allMatches = dartx.allMatches;
  const $matchAsPrefix = dartx.matchAsPrefix;
  let SyncIterableOfMatch = () => (SyncIterableOfMatch = dart.constFn(_js_helper.SyncIterable$(core.Match)))();
  let VoidToPattern = () => (VoidToPattern = dart.constFn(dart.fnType(core.Pattern, [])))();
  let StringTobool = () => (StringTobool = dart.constFn(dart.fnType(core.bool, [core.String])))();
  const CT = Object.create(null);
  const pattern$ = dart.privateName(match, "ParserMatch.pattern");
  const input$ = dart.privateName(match, "ParserMatch.input");
  const start$ = dart.privateName(match, "ParserMatch.start");
  const end$ = dart.privateName(match, "ParserMatch.end");
  match.ParserMatch = class ParserMatch extends core.Object {
    get pattern() {
      return this[pattern$];
    }
    set pattern(value) {
      super.pattern = value;
    }
    get input() {
      return this[input$];
    }
    set input(value) {
      super.input = value;
    }
    get start() {
      return this[start$];
    }
    set start(value) {
      super.start = value;
    }
    get end() {
      return this[end$];
    }
    set end(value) {
      super.end = value;
    }
    group(group) {
      return this._get(group);
    }
    _get(group) {
      return group === 0 ? this.input[$substring](this.start, this.end) : null;
    }
    groups(groupIndices) {
      return groupIndices[$map](core.String, dart.bind(this, 'group'))[$toList]({growable: false});
    }
    get groupCount() {
      return 1;
    }
  };
  (match.ParserMatch.new = function(pattern, input, start, end) {
    this[pattern$] = pattern;
    this[input$] = input;
    this[start$] = start;
    this[end$] = end;
    ;
  }).prototype = match.ParserMatch.prototype;
  dart.addTypeTests(match.ParserMatch);
  match.ParserMatch[dart.implements] = () => [core.Match];
  dart.setMethodSignature(match.ParserMatch, () => ({
    __proto__: dart.getMethods(match.ParserMatch.__proto__),
    group: dart.fnType(core.String, [core.int]),
    _get: dart.fnType(core.String, [core.int]),
    groups: dart.fnType(core.List$(core.String), [core.List$(core.int)])
  }));
  dart.setGetterSignature(match.ParserMatch, () => ({
    __proto__: dart.getGetters(match.ParserMatch.__proto__),
    groupCount: core.int
  }));
  dart.setLibraryUri(match.ParserMatch, "package:petitparser/src/matcher/match.dart");
  dart.setFieldSignature(match.ParserMatch, () => ({
    __proto__: dart.getFields(match.ParserMatch.__proto__),
    pattern: dart.finalFieldType(core.Pattern),
    input: dart.finalFieldType(core.String),
    start: dart.finalFieldType(core.int),
    end: dart.finalFieldType(core.int)
  }));
  const parser$ = dart.privateName(pattern, "ParserPattern.parser");
  pattern.ParserPattern = class ParserPattern extends core.Object {
    get parser() {
      return this[parser$];
    }
    set parser(value) {
      super.parser = value;
    }
    allMatches(string, start = 0) {
      return new (SyncIterableOfMatch()).new(() => (function* allMatches(start) {
        while (dart.notNull(start) <= string.length) {
          let match = this.matchAsPrefix(string, start);
          if (match == null) {
            start = dart.notNull(start) + 1;
          } else {
            yield match;
            if (start == match.end) {
              start = dart.notNull(start) + 1;
            } else {
              start = match.end;
            }
          }
        }
      }).bind(this)(start));
    }
    matchAsPrefix(string, start = 0) {
      let end = this.parser.fastParseOn(string, start);
      return dart.notNull(end) < 0 ? null : new match.ParserMatch.new(this, string, start, end);
    }
  };
  (pattern.ParserPattern.new = function(parser) {
    this[parser$] = parser;
    ;
  }).prototype = pattern.ParserPattern.prototype;
  dart.addTypeTests(pattern.ParserPattern);
  pattern.ParserPattern[dart.implements] = () => [core.Pattern];
  dart.setMethodSignature(pattern.ParserPattern, () => ({
    __proto__: dart.getMethods(pattern.ParserPattern.__proto__),
    allMatches: dart.fnType(core.Iterable$(core.Match), [core.String], [core.int]),
    [$allMatches]: dart.fnType(core.Iterable$(core.Match), [core.String], [core.int]),
    matchAsPrefix: dart.fnType(core.Match, [core.String], [core.int]),
    [$matchAsPrefix]: dart.fnType(core.Match, [core.String], [core.int])
  }));
  dart.setLibraryUri(pattern.ParserPattern, "package:petitparser/src/matcher/pattern.dart");
  dart.setFieldSignature(pattern.ParserPattern, () => ({
    __proto__: dart.getFields(pattern.ParserPattern.__proto__),
    parser: dart.finalFieldType(parser.Parser)
  }));
  dart.defineExtensionMethods(pattern.ParserPattern, ['allMatches', 'matchAsPrefix']);
  pattern['PatternParser|toPattern'] = function PatternParser$124toPattern(T, $this) {
    return new pattern.ParserPattern.new($this);
  };
  pattern['PatternParser|get#toPattern'] = function PatternParser$124get$35toPattern(T, $this) {
    return dart.fn(() => pattern['PatternParser|toPattern'](T, $this), VoidToPattern());
  };
  accept['AcceptParser|accept'] = function AcceptParser$124accept(T, $this, input) {
    return dart.notNull($this.fastParseOn(input, 0)) >= 0;
  };
  accept['AcceptParser|get#accept'] = function AcceptParser$124get$35accept(T, $this) {
    return dart.fn(input => accept['AcceptParser|accept'](T, $this, input), StringTobool());
  };
  dart.trackLibraries("packages/petitparser/src/matcher/accept", {
    "package:petitparser/src/matcher/match.dart": match,
    "package:petitparser/src/matcher/pattern.dart": pattern,
    "package:petitparser/src/matcher/accept.dart": accept
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["match.dart","pattern.dart","accept.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;IAOgB;;;;;;IAGD;;;;;;IAGH;;;;;;IAGA;;;;;;UAKO;AAAU,YAAI,WAAC,KAAK;IAAC;SAGf;AACnB,YAAA,AAAM,MAAD,KAAI,IAAI,AAAM,uBAAU,YAAO,YAAO;IAAI;WAGrB;AAC1B,YAAA,AAAa,AAAW,aAAZ,8BAAK,oCAAwB;IAAM;;AAG7B;IAAC;;oCAdA,SAAc,OAAY,OAAY;IAAtC;IAAc;IAAY;IAAY;;EAAI;;;;;;;;;;;;;;;;;;;;;;;ICJpD;;;;;;eAaqB,QAAa;AAArB,yEAAqB;AAC7C,eAAa,aAAN,KAAK,KAAI,AAAO,MAAD;AACd,sBAAQ,mBAAc,MAAM,EAAE,KAAK;AACzC,cAAI,AAAM,KAAD,IAAI;AACJ,YAAP,QAAK,aAAL,KAAK;;AAEL,kBAAM,KAAK;AACX,gBAAI,AAAM,KAAD,IAAI,AAAM,KAAD;AACT,cAAP,QAAK,aAAL,KAAK;;AAEY,cAAjB,QAAQ,AAAM,KAAD;;;;MAIrB,cAd+C;IAc/C;kBAU2B,QAAa;AAChC,gBAAM,AAAO,wBAAY,MAAM,EAAE,KAAK;AAC5C,YAAW,cAAJ,GAAG,IAAG,IAAI,OAAO,0BAAY,MAAM,MAAM,EAAE,KAAK,EAAE,GAAG;IAC9D;;;IAtCyB;;EAAO;;;;;;;;;;;;;;;;;AAPT;EAAmB;;AAAlC;;4ECAW;AAAU,UAAsB,cAAtB,kBAAY,KAAK,EAAE,OAAM;EAAC;;AAAlD,mBAAc,iDAAd,KAAK","file":"accept.ddc.js"}');
  // Exports:
  return {
    src__matcher__match: match,
    src__matcher__pattern: pattern,
    src__matcher__accept: accept
  };
});

//# sourceMappingURL=accept.ddc.js.map
