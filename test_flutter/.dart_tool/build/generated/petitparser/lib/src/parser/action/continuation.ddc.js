define(['dart_sdk', 'packages/petitparser/src/context/context'], function(dart_sdk, packages__petitparser__src__context__context) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const parser = packages__petitparser__src__context__context.src__core__parser;
  const result = packages__petitparser__src__context__context.src__context__result;
  const context = packages__petitparser__src__context__context.src__context__context;
  const delegate = packages__petitparser__src__context__context.src__parser__combinator__delegate;
  const continuation = Object.create(dart.library);
  const CT = Object.create(null);
  const _is_ContinuationParser_default = Symbol('_is_ContinuationParser_default');
  const handler$ = dart.privateName(continuation, "ContinuationParser.handler");
  continuation.ContinuationParser$ = dart.generic(T => {
    let ContinuationParserOfT = () => (ContinuationParserOfT = dart.constFn(continuation.ContinuationParser$(T)))();
    let ParserOfT = () => (ParserOfT = dart.constFn(parser.Parser$(T)))();
    let ResultOfT = () => (ResultOfT = dart.constFn(result.Result$(T)))();
    let ContextToResultOfT = () => (ContextToResultOfT = dart.constFn(dart.fnType(ResultOfT(), [context.Context])))();
    let FnAndContextToResultOfT = () => (FnAndContextToResultOfT = dart.constFn(dart.fnType(ResultOfT(), [ContextToResultOfT(), context.Context])))();
    class ContinuationParser extends delegate.DelegateParser$(T) {
      get handler() {
        return this[handler$];
      }
      set handler(value) {
        super.handler = value;
      }
      parseOn(context) {
        return this.handler(dart.bind(this, 'parseOn', super.parseOn), context);
      }
      copy() {
        return new (ContinuationParserOfT()).new(ParserOfT()._check(this.delegate), this.handler);
      }
      hasEqualProperties(other) {
        ContinuationParserOfT()._check(other);
        return dart.test(super.hasEqualProperties(other)) && dart.equals(this.handler, FnAndContextToResultOfT()._check(other.handler));
      }
    }
    (ContinuationParser.new = function(delegate, handler) {
      this[handler$] = handler;
      if (!(handler != null)) dart.assertFailed("handler must not be null", "org-dartlang-app:///packages/petitparser/src/parser/action/continuation.dart", 43, 16, "handler != null");
      ContinuationParser.__proto__.new.call(this, delegate);
      ;
    }).prototype = ContinuationParser.prototype;
    dart.addTypeTests(ContinuationParser);
    ContinuationParser.prototype[_is_ContinuationParser_default] = true;
    dart.setMethodSignature(ContinuationParser, () => ({
      __proto__: dart.getMethods(ContinuationParser.__proto__),
      copy: dart.fnType(continuation.ContinuationParser$(T), [])
    }));
    dart.setLibraryUri(ContinuationParser, "package:petitparser/src/parser/action/continuation.dart");
    dart.setFieldSignature(ContinuationParser, () => ({
      __proto__: dart.getFields(ContinuationParser.__proto__),
      handler: dart.finalFieldType(dart.fnType(result.Result$(T), [dart.fnType(result.Result$(T), [context.Context]), context.Context]))
    }));
    return ContinuationParser;
  });
  continuation.ContinuationParser = continuation.ContinuationParser$();
  dart.addTypeTests(continuation.ContinuationParser, _is_ContinuationParser_default);
  continuation['ContinuationParserExtension|callCC'] = function ContinuationParserExtension$124callCC(T, $this, handler) {
    return new (continuation.ContinuationParser$(T)).new($this, handler);
  };
  continuation['ContinuationParserExtension|get#callCC'] = function ContinuationParserExtension$124get$35callCC(T, $this) {
    return dart.fn(handler => continuation['ContinuationParserExtension|callCC'](T, $this, handler), dart.fnType(parser.Parser$(T), [dart.fnType(result.Result$(T), [dart.fnType(result.Result$(T), [context.Context]), context.Context])]));
  };
  dart.trackLibraries("packages/petitparser/src/parser/action/continuation", {
    "package:petitparser/src/parser/action/continuation.dart": continuation
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["continuation.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;MAuC+B;;;;;;cAOH;AAAY,4BAAc,2CAAS,OAAO;MAAC;;AAGrC,oEAAsB,gBAAU;MAAQ;;uCAG1B;AAC1C,cAAgC,WAA1B,yBAAmB,KAAK,MAAa,YAAR,+CAAW,AAAM,KAAD;MAAQ;;uCAZlC;MAAe;YAC/B,AAAQ,OAAD,IAAI,yBAAM;AACxB,kDAAM,QAAQ;;IAAC;;;;;;;;;;;;;;;;gHAXmB;AACpC,gEAA4B,OAAO;EAAC;;AAD9B,mBAA8B,wEAA9B,OAAO","file":"continuation.ddc.js"}');
  // Exports:
  return {
    src__parser__action__continuation: continuation
  };
});

//# sourceMappingURL=continuation.ddc.js.map
