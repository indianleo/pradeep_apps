define(['dart_sdk', 'packages/petitparser/src/context/context'], function(dart_sdk, packages__petitparser__src__context__context) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const _js_helper = dart_sdk._js_helper;
  const collection = dart_sdk.collection;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const parser = packages__petitparser__src__context__context.src__core__parser;
  const result = packages__petitparser__src__context__context.src__context__result;
  const context = packages__petitparser__src__context__context.src__context__context;
  const delegate = packages__petitparser__src__context__context.src__parser__combinator__delegate;
  const reference$ = Object.create(dart.library);
  const parser$ = Object.create(dart.library);
  const grammar = Object.create(dart.library);
  const $length = dartx.length;
  const $_get = dartx._get;
  const $_equals = dartx._equals;
  const $takeWhile = dartx.takeWhile;
  const $toList = dartx.toList;
  const $contains = dartx.contains;
  const $add = dartx.add;
  const $_set = dartx._set;
  const $isNotEmpty = dartx.isNotEmpty;
  const $removeLast = dartx.removeLast;
  let JSArrayOfObject = () => (JSArrayOfObject = dart.constFn(_interceptors.JSArray$(core.Object)))();
  let ObjectTobool = () => (ObjectTobool = dart.constFn(dart.fnType(core.bool, [core.Object])))();
  let LinkedMapOfReference$Parser = () => (LinkedMapOfReference$Parser = dart.constFn(_js_helper.LinkedMap$(reference$.Reference, parser.Parser)))();
  let JSArrayOfReference = () => (JSArrayOfReference = dart.constFn(_interceptors.JSArray$(reference$.Reference)))();
  let ReferenceToParser = () => (ReferenceToParser = dart.constFn(dart.fnType(parser.Parser, [reference$.Reference])))();
  let JSArrayOfParser = () => (JSArrayOfParser = dart.constFn(_interceptors.JSArray$(parser.Parser)))();
  let LinkedHashSetOfParser = () => (LinkedHashSetOfParser = dart.constFn(collection.LinkedHashSet$(parser.Parser)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.constList([], dart.dynamic);
    }
  });
  const func = dart.privateName(reference$, "Reference.function");
  const arguments$ = dart.privateName(reference$, "Reference.arguments");
  reference$.Reference = class Reference extends parser.Parser {
    get function() {
      return this[func];
    }
    set function(value) {
      super.function = value;
    }
    get arguments() {
      return this[arguments$];
    }
    set arguments(value) {
      super.arguments = value;
    }
    resolve() {
      return parser.Parser._check(core.Function.apply(this.function, this.arguments));
    }
    _equals(other) {
      if (other == null) return false;
      if (reference$.Reference.is(other)) {
        if (!dart.equals(other.function, this.function) || other.arguments[$length] != this.arguments[$length]) {
          return false;
        }
        for (let i = 0; i < dart.notNull(this.arguments[$length]); i = i + 1) {
          let a = this.arguments[$_get](i);
          let b = other.arguments[$_get](i);
          if (parser.Parser.is(a) && !reference$.Reference.is(a) && parser.Parser.is(b) && !reference$.Reference.is(b)) {
            if (!dart.test(a.isEqualTo(b))) {
              return false;
            }
          } else {
            if (!dart.equals(a, b)) {
              return false;
            }
          }
        }
        return true;
      }
      return false;
    }
    get hashCode() {
      return dart.hashCode(this.function);
    }
    copy() {
      return dart.throw(new core.UnsupportedError.new("References cannot be copied."));
    }
    parseOn(context) {
      return dart.throw(new core.UnsupportedError.new("References cannot be parsed."));
    }
  };
  (reference$.Reference.new = function($function, $arguments) {
    this[func] = $function;
    this[arguments$] = $arguments;
    if (!($function != null)) dart.assertFailed("function must not be null", "org-dartlang-app:///packages/petitparser/src/definition/reference.dart", 15, 16, "function != null");
    if (!($arguments != null)) dart.assertFailed("arguments must not be null", "org-dartlang-app:///packages/petitparser/src/definition/reference.dart", 16, 16, "arguments != null");
    reference$.Reference.__proto__.new.call(this);
    ;
  }).prototype = reference$.Reference.prototype;
  dart.addTypeTests(reference$.Reference);
  dart.setMethodSignature(reference$.Reference, () => ({
    __proto__: dart.getMethods(reference$.Reference.__proto__),
    resolve: dart.fnType(parser.Parser, []),
    _equals: dart.fnType(core.bool, [core.Object]),
    [$_equals]: dart.fnType(core.bool, [core.Object]),
    copy: dart.fnType(reference$.Reference, []),
    parseOn: dart.fnType(result.Result, [context.Context])
  }));
  dart.setLibraryUri(reference$.Reference, "package:petitparser/src/definition/reference.dart");
  dart.setFieldSignature(reference$.Reference, () => ({
    __proto__: dart.getFields(reference$.Reference.__proto__),
    function: dart.finalFieldType(core.Function),
    arguments: dart.finalFieldType(core.List$(core.Object))
  }));
  dart.defineExtensionMethods(reference$.Reference, ['_equals']);
  dart.defineExtensionAccessors(reference$.Reference, ['hashCode']);
  parser$.GrammarParser = class GrammarParser extends delegate.DelegateParser {
    fastParseOn(buffer, position) {
      return this.delegate.fastParseOn(buffer, position);
    }
  };
  (parser$.GrammarParser.new = function(definition) {
    parser$.GrammarParser.__proto__.new.call(this, definition.build());
    ;
  }).prototype = parser$.GrammarParser.prototype;
  dart.addTypeTests(parser$.GrammarParser);
  dart.setLibraryUri(parser$.GrammarParser, "package:petitparser/src/definition/parser.dart");
  let C0;
  const _resolve = dart.privateName(grammar, "_resolve");
  grammar.GrammarDefinition = class GrammarDefinition extends core.Object {
    ref($function, arg1 = null, arg2 = null, arg3 = null, arg4 = null, arg5 = null, arg6 = null) {
      let $arguments = JSArrayOfObject().of([arg1, arg2, arg3, arg4, arg5, arg6])[$takeWhile](dart.fn(each => each != null, ObjectTobool()))[$toList]({growable: false});
      return new reference$.Reference.new($function, $arguments);
    }
    build(opts) {
      let t0;
      let start = opts && 'start' in opts ? opts.start : null;
      let $arguments = opts && 'arguments' in opts ? opts.arguments : C0 || CT.C0;
      return this[_resolve](new reference$.Reference.new((t0 = start, t0 == null ? dart.bind(this, 'start') : t0), $arguments));
    }
    [_resolve](reference) {
      let mapping = new (LinkedMapOfReference$Parser()).new();
      function _dereference(reference) {
        let parser = mapping[$_get](reference);
        if (parser == null) {
          let references = JSArrayOfReference().of([reference]);
          parser = reference.resolve();
          while (reference$.Reference.is(parser)) {
            let otherReference = reference$.Reference._check(parser);
            if (dart.test(references[$contains](otherReference))) {
              dart.throw(new core.StateError.new("Recursive references detected: " + dart.str(references)));
            }
            references[$add](otherReference);
            parser = otherReference.resolve();
          }
          for (let otherReference of references) {
            mapping[$_set](otherReference, parser);
          }
        }
        return parser;
      }
      dart.fn(_dereference, ReferenceToParser());
      let todo = JSArrayOfParser().of([_dereference(reference)]);
      let seen = LinkedHashSetOfParser().of(todo);
      while (dart.test(todo[$isNotEmpty])) {
        let parent = todo[$removeLast]();
        for (let child of parent.children) {
          if (reference$.Reference.is(child)) {
            let referenced = _dereference(reference$.Reference._check(child));
            parent.replace(child, referenced);
            child = referenced;
          }
          if (!dart.test(seen.contains(child))) {
            seen.add(child);
            todo[$add](child);
          }
        }
      }
      return mapping[$_get](reference);
    }
  };
  (grammar.GrammarDefinition.new = function() {
    ;
  }).prototype = grammar.GrammarDefinition.prototype;
  dart.addTypeTests(grammar.GrammarDefinition);
  dart.setMethodSignature(grammar.GrammarDefinition, () => ({
    __proto__: dart.getMethods(grammar.GrammarDefinition.__proto__),
    ref: dart.fnType(parser.Parser, [core.Function], [core.Object, core.Object, core.Object, core.Object, core.Object, core.Object]),
    build: dart.fnType(parser.Parser, [], {arguments: core.List, start: core.Function}, {}),
    [_resolve]: dart.fnType(parser.Parser, [reference$.Reference])
  }));
  dart.setLibraryUri(grammar.GrammarDefinition, "package:petitparser/src/definition/grammar.dart");
  dart.trackLibraries("packages/petitparser/src/definition/grammar", {
    "package:petitparser/src/definition/reference.dart": reference$,
    "package:petitparser/src/definition/parser.dart": parser$,
    "package:petitparser/src/definition/grammar.dart": grammar
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["reference.dart","parser.dart","grammar.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAUiB;;;;;;IACI;;;;;;;AAMC,kCAAS,oBAAM,eAAU;IAAU;;UAG/B;AACtB,UAAU,wBAAN,KAAK;AACP,yBAAI,AAAM,KAAD,WAAa,kBAClB,AAAM,AAAU,KAAX,uBAAqB,AAAU;AACtC,gBAAO;;AAET,iBAAS,IAAI,GAAG,AAAE,CAAD,gBAAG,AAAU,0BAAQ,IAAA,AAAC,CAAA;AAC/B,kBAAI,AAAS,sBAAC,CAAC;AAAG,kBAAI,AAAM,AAAS,KAAV,kBAAW,CAAC;AAC7C,cAAM,iBAAF,CAAC,MAAgB,wBAAF,CAAC,KAAoB,iBAAF,CAAC,MAAgB,wBAAF,CAAC;AAEpD,2BAAK,AAAE,CAAD,WAAW,CAAC;AAChB,oBAAO;;;AAIT,6BAAI,CAAC,EAAI,CAAC;AACR,oBAAO;;;;AAIb,cAAO;;AAET,YAAO;IACT;;AAGoB,YAAS,eAAT;IAAiB;;AAGjB,wBAAM,8BAAiB;IAA+B;YAGnD;AACnB,wBAAM,8BAAiB;IAA+B;;uCAxCrC,WAAe;IAAf;IAAe;UACvB,AAAS,aAAG,yBAAM;UAClB,AAAU,cAAG,yBAAM;AAF1B;;EAEuD;;;;;;;;;;;;;;;;;;;gBCLtC,QAAY;AAC/B,YAAA,AAAS,2BAAY,MAAM,EAAE,QAAQ;IAAC;;wCAJV;AAAc,mDAAM,AAAW,UAAD;;EAAS;;;;;;QCiEnD,WACR,aACD,aACA,aACA,aACA,aACA;AACH,uBAAY,AACb,AACA,sBAFc,IAAI,EAAE,IAAI,EAAE,IAAI,EAAE,IAAI,EAAE,IAAI,EAAE,IAAI,eACtC,QAAC,QAAS,AAAK,IAAD,IAAI,2CACX;AACtB,YAAO,8BAAU,WAAU;IAC7B;;;UAOuB;UAAY;AACjC,YAAO,gBAAS,8BAAgB,KAAN,KAAK,QAAL,iBAAc,sBAAO;IACjD;eAG0B;AAClB,oBAA6B;AAEnC,eAAO,aAAuB;AACxB,qBAAS,AAAO,OAAA,QAAC,SAAS;AAC9B,YAAI,AAAO,MAAD,IAAI;AACN,2BAAa,yBAAC,SAAS;AACD,UAA5B,SAAS,AAAU,SAAD;AAClB,iBAAc,wBAAP,MAAM;AACK,6DAAiB,MAAM;AACvC,0BAAI,AAAW,UAAD,YAAU,cAAc;AAC0B,cAA9D,WAAM,wBAAW,AAA4C,6CAAX,UAAU;;AAEhC,YAA9B,AAAW,UAAD,OAAK,cAAc;AACI,YAAjC,SAAS,AAAe,cAAD;;AAEzB,mBAAW,iBAAkB,WAAU;AACL,YAAhC,AAAO,OAAA,QAAC,cAAc,EAAI,MAAM;;;AAGpC,cAAO,OAAM;;;AAGT,iBAAO,sBAAC,AAAY,YAAA,CAAC,SAAS;AAC9B,iBAAW,2BAAG,IAAI;AAExB,uBAAO,AAAK,IAAD;AACH,qBAAS,AAAK,IAAD;AACnB,iBAAS,QAAS,AAAO,OAAD;AACtB,cAAU,wBAAN,KAAK;AACD,6BAAa,AAAY,YAAA,6BAAC,KAAK;AACJ,YAAjC,AAAO,MAAD,SAAS,KAAK,EAAE,UAAU;AACd,YAAlB,QAAQ,UAAU;;AAEpB,yBAAK,AAAK,IAAD,UAAU,KAAK;AACP,YAAf,AAAK,IAAD,KAAK,KAAK;AACC,YAAf,AAAK,IAAD,OAAK,KAAK;;;;AAKpB,YAAO,AAAO,QAAA,QAAC,SAAS;IAC1B;;;;EAzEyB","file":"grammar.ddc.js"}');
  // Exports:
  return {
    src__definition__reference: reference$,
    src__definition__parser: parser$,
    src__definition__grammar: grammar
  };
});

//# sourceMappingURL=grammar.ddc.js.map
