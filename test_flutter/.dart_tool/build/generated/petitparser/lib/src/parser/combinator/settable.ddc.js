define(['dart_sdk', 'packages/petitparser/src/context/context'], function(dart_sdk, packages__petitparser__src__context__context) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const parser = packages__petitparser__src__context__context.src__core__parser;
  const delegate = packages__petitparser__src__context__context.src__parser__combinator__delegate;
  const result = packages__petitparser__src__context__context.src__context__result;
  const context = packages__petitparser__src__context__context.src__context__context;
  const settable = Object.create(dart.library);
  const failure = Object.create(dart.library);
  const $_get = dartx._get;
  const $toString = dartx.toString;
  const CT = Object.create(null);
  const _is_SettableParser_default = Symbol('_is_SettableParser_default');
  settable.SettableParser$ = dart.generic(T => {
    let ParserOfT = () => (ParserOfT = dart.constFn(parser.Parser$(T)))();
    let SettableParserOfT = () => (SettableParserOfT = dart.constFn(settable.SettableParser$(T)))();
    class SettableParser extends delegate.DelegateParser$(T) {
      set(parser) {
        ParserOfT()._check(parser);
        return this.replace(this.children[$_get](0), parser);
      }
      fastParseOn(buffer, position) {
        return this.delegate.fastParseOn(buffer, position);
      }
      copy() {
        return new (SettableParserOfT()).new(ParserOfT()._check(this.delegate));
      }
    }
    (SettableParser.new = function(delegate) {
      SettableParser.__proto__.new.call(this, delegate);
      ;
    }).prototype = SettableParser.prototype;
    dart.addTypeTests(SettableParser);
    SettableParser.prototype[_is_SettableParser_default] = true;
    dart.setMethodSignature(SettableParser, () => ({
      __proto__: dart.getMethods(SettableParser.__proto__),
      set: dart.fnType(dart.void, [core.Object]),
      copy: dart.fnType(settable.SettableParser$(T), [])
    }));
    dart.setLibraryUri(SettableParser, "package:petitparser/src/parser/combinator/settable.dart");
    return SettableParser;
  });
  settable.SettableParser = settable.SettableParser$();
  dart.addTypeTests(settable.SettableParser, _is_SettableParser_default);
  settable['SettableParserExtension|settable'] = function SettableParserExtension$124settable(T, $this) {
    return new (settable.SettableParser$(T)).new($this);
  };
  settable['SettableParserExtension|get#settable'] = function SettableParserExtension$124get$35settable(T, $this) {
    return dart.fn(() => settable['SettableParserExtension|settable'](T, $this), dart.fnType(settable.SettableParser$(T), []));
  };
  settable.undefined = function undefined(T, message = "undefined parser") {
    return settable['SettableParserExtension|settable'](T, failure.failure(T, message));
  };
  const _is_FailureParser_default = Symbol('_is_FailureParser_default');
  const message$ = dart.privateName(failure, "FailureParser.message");
  failure.FailureParser$ = dart.generic(T => {
    let FailureParserOfT = () => (FailureParserOfT = dart.constFn(failure.FailureParser$(T)))();
    class FailureParser extends parser.Parser$(T) {
      get message() {
        return this[message$];
      }
      set message(value) {
        super.message = value;
      }
      parseOn(context) {
        return context.failure(T, this.message);
      }
      fastParseOn(buffer, position) {
        return -1;
      }
      toString() {
        return dart.str(super[$toString]()) + "[" + dart.str(this.message) + "]";
      }
      copy() {
        return new (FailureParserOfT()).new(this.message);
      }
      hasEqualProperties(other) {
        FailureParserOfT()._check(other);
        return dart.test(super.hasEqualProperties(other)) && this.message == other.message;
      }
    }
    (FailureParser.new = function(message) {
      this[message$] = message;
      if (!(message != null)) dart.assertFailed("message must not be null", "org-dartlang-app:///packages/petitparser/src/parser/misc/failure.dart", 19, 16, "message != null");
      FailureParser.__proto__.new.call(this);
      ;
    }).prototype = FailureParser.prototype;
    dart.addTypeTests(FailureParser);
    FailureParser.prototype[_is_FailureParser_default] = true;
    dart.setMethodSignature(FailureParser, () => ({
      __proto__: dart.getMethods(FailureParser.__proto__),
      parseOn: dart.fnType(result.Result$(T), [context.Context]),
      copy: dart.fnType(failure.FailureParser$(T), [])
    }));
    dart.setLibraryUri(FailureParser, "package:petitparser/src/parser/misc/failure.dart");
    dart.setFieldSignature(FailureParser, () => ({
      __proto__: dart.getFields(FailureParser.__proto__),
      message: dart.finalFieldType(core.String)
    }));
    dart.defineExtensionMethods(FailureParser, ['toString']);
    return FailureParser;
  });
  failure.FailureParser = failure.FailureParser$();
  dart.addTypeTests(failure.FailureParser, _is_FailureParser_default);
  failure.failure = function failure$(T, message = "unable to parse") {
    return new (failure.FailureParser$(T)).new(message);
  };
  dart.trackLibraries("packages/petitparser/src/parser/combinator/settable", {
    "package:petitparser/src/parser/combinator/settable.dart": settable,
    "package:petitparser/src/parser/misc/failure.dart": failure
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["settable.dart","../misc/failure.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;2BAiCqB;AAAW,4BAAQ,AAAQ,qBAAC,IAAI,MAAM;MAAC;kBAGnC,QAAY;AAC/B,cAAA,AAAS,2BAAY,MAAM,EAAE,QAAQ;MAAC;;AAGd,gEAAkB;MAAS;;mCAV9B;AAAY,8CAAM,QAAQ;;IAAC;;;;;;;;;;;;;;AAjBpB;EAAuB;;AAArC;;6CAWmB;AACnC,UAAoB,iDAApB,mBAAW,OAAO;EAAY;;;;;;MCVnB;;;;;;cAMa;AAAY,cAAA,AAAQ,QAAD,YAAS;MAAQ;kBAGvC,QAAY;AAAa,gBAAC;MAAC;;AAG7B,cAA+B,UAAtB,sBAAW,eAAE,gBAAO;MAAE;;AAGzB,4CAAiB;MAAQ;;kCAGX;AACrC,cAAgC,WAA1B,yBAAmB,KAAK,MAAK,AAAQ,gBAAG,AAAM,KAAD;MAAQ;;;MAjB5C;YACN,AAAQ,OAAD,IAAI,yBAAM;AAD9B;;IACyD;;;;;;;;;;;;;;;;;;yCAT9B;AAC3B,UAAO,qCAAc,OAAO;EAC9B","file":"settable.ddc.js"}');
  // Exports:
  return {
    src__parser__combinator__settable: settable,
    src__parser__misc__failure: failure
  };
});

//# sourceMappingURL=settable.ddc.js.map
