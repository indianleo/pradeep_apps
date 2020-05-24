define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const collection = dart_sdk.collection;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const delegate = Object.create(dart.library);
  const parser = Object.create(dart.library);
  const success = Object.create(dart.library);
  const result = Object.create(dart.library);
  const context = Object.create(dart.library);
  const failure = Object.create(dart.library);
  const exception = Object.create(dart.library);
  const token$ = Object.create(dart.library);
  const sequence = Object.create(dart.library);
  const list = Object.create(dart.library);
  const optional = Object.create(dart.library);
  const choice = Object.create(dart.library);
  const char$ = Object.create(dart.library);
  const predicate = Object.create(dart.library);
  const parser$ = Object.create(dart.library);
  const code$ = Object.create(dart.library);
  const token$0 = Object.create(dart.library);
  const matches_skipping = Object.create(dart.library);
  const matches = Object.create(dart.library);
  const possesive = Object.create(dart.library);
  const unbounded = Object.create(dart.library);
  const repeating = Object.create(dart.library);
  const any = Object.create(dart.library);
  const and = Object.create(dart.library);
  const map = Object.create(dart.library);
  const $_equals = dartx._equals;
  const $runtimeType = dartx.runtimeType;
  const $length = dartx.length;
  const $_get = dartx._get;
  const $substring = dartx.substring;
  const $hashCode = dartx.hashCode;
  const $_set = dartx._set;
  const $add = dartx.add;
  const $isEmpty = dartx.isEmpty;
  const $codeUnitAt = dartx.codeUnitAt;
  const $toString = dartx.toString;
  const $round = dartx.round;
  const $toRadixString = dartx.toRadixString;
  const $padLeft = dartx.padLeft;
  let JSArrayOfParser = () => (JSArrayOfParser = dart.constFn(_interceptors.JSArray$(parser.Parser)))();
  let LinkedHashSetOfParser = () => (LinkedHashSetOfParser = dart.constFn(collection.LinkedHashSet$(parser.Parser)))();
  let JSArrayOfint = () => (JSArrayOfint = dart.constFn(_interceptors.JSArray$(core.int)))();
  let ListOfParser = () => (ListOfParser = dart.constFn(core.List$(parser.Parser)))();
  let ParserOfList = () => (ParserOfList = dart.constFn(parser.Parser$(core.List)))();
  let ParserToParserOfList = () => (ParserToParserOfList = dart.constFn(dart.fnType(ParserOfList(), [parser.Parser])))();
  let VoidToParserOfList = () => (VoidToParserOfList = dart.constFn(dart.fnType(ParserOfList(), [])))();
  let ParserToParser = () => (ParserToParser = dart.constFn(dart.fnType(parser.Parser, [parser.Parser])))();
  let VoidToParser = () => (VoidToParser = dart.constFn(dart.fnType(parser.Parser, [])))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.constList([], parser.Parser);
    }
  });
  let C0;
  const _is_Parser_default = Symbol('_is_Parser_default');
  parser.Parser$ = dart.generic(T => {
    let ParserOfT = () => (ParserOfT = dart.constFn(parser.Parser$(T)))();
    class Parser extends core.Object {
      fastParseOn(buffer, position) {
        let result = this.parseOn(new context.Context.new(buffer, position));
        return dart.test(result.isSuccess) ? result.position : -1;
      }
      parse(input) {
        return this.parseOn(new context.Context.new(input, 0));
      }
      isEqualTo(other, seen = null) {
        seen == null ? seen = LinkedHashSetOfParser().new() : null;
        if (this[$_equals](other) || dart.test(seen.contains(this))) {
          return true;
        }
        seen.add(this);
        return dart.equals(this[$runtimeType], dart.runtimeType(other)) && dart.test(this.hasEqualProperties(ParserOfT()._check(other))) && dart.test(this.hasEqualChildren(other, seen));
      }
      hasEqualProperties(other) {
        ParserOfT()._check(other);
        return true;
      }
      hasEqualChildren(other, seen) {
        let thisChildren = this.children;
        let otherChildren = other.children;
        if (thisChildren[$length] != otherChildren[$length]) {
          return false;
        }
        for (let i = 0; i < dart.notNull(thisChildren[$length]); i = i + 1) {
          if (!dart.test(thisChildren[$_get](i).isEqualTo(otherChildren[$_get](i), seen))) {
            return false;
          }
        }
        return true;
      }
      get children() {
        return C0 || CT.C0;
      }
      replace(source, target) {
      }
    }
    (Parser.new = function() {
      ;
    }).prototype = Parser.prototype;
    dart.addTypeTests(Parser);
    Parser.prototype[_is_Parser_default] = true;
    dart.setMethodSignature(Parser, () => ({
      __proto__: dart.getMethods(Parser.__proto__),
      fastParseOn: dart.fnType(core.int, [core.String, core.int]),
      parse: dart.fnType(result.Result$(T), [core.String]),
      isEqualTo: dart.fnType(core.bool, [parser.Parser], [core.Set$(parser.Parser)]),
      hasEqualProperties: dart.fnType(core.bool, [core.Object]),
      hasEqualChildren: dart.fnType(core.bool, [parser.Parser, core.Set$(parser.Parser)]),
      replace: dart.fnType(dart.void, [parser.Parser, parser.Parser])
    }));
    dart.setGetterSignature(Parser, () => ({
      __proto__: dart.getGetters(Parser.__proto__),
      children: core.List$(parser.Parser)
    }));
    dart.setLibraryUri(Parser, "package:petitparser/src/core/parser.dart");
    return Parser;
  });
  parser.Parser = parser.Parser$();
  dart.addTypeTests(parser.Parser, _is_Parser_default);
  const _is_DelegateParser_default = Symbol('_is_DelegateParser_default');
  const delegate$ = dart.privateName(delegate, "DelegateParser.delegate");
  delegate.DelegateParser$ = dart.generic(T => {
    let ResultOfT = () => (ResultOfT = dart.constFn(result.Result$(T)))();
    let DelegateParserOfT = () => (DelegateParserOfT = dart.constFn(delegate.DelegateParser$(T)))();
    class DelegateParser extends parser.Parser$(T) {
      get delegate() {
        return this[delegate$];
      }
      set delegate(value) {
        this[delegate$] = value;
      }
      parseOn(context) {
        return ResultOfT()._check(this.delegate.parseOn(context));
      }
      get children() {
        return JSArrayOfParser().of([this.delegate]);
      }
      replace(source, target) {
        super.replace(source, target);
        if (dart.equals(this.delegate, source)) {
          this.delegate = target;
        }
      }
      copy() {
        return new (DelegateParserOfT()).new(this.delegate);
      }
    }
    (DelegateParser.new = function(delegate) {
      this[delegate$] = delegate;
      if (!(delegate != null)) dart.assertFailed("delegate must not be null", "org-dartlang-app:///packages/petitparser/src/parser/combinator/delegate.dart", 22, 16, "delegate != null");
      DelegateParser.__proto__.new.call(this);
      ;
    }).prototype = DelegateParser.prototype;
    dart.addTypeTests(DelegateParser);
    DelegateParser.prototype[_is_DelegateParser_default] = true;
    dart.setMethodSignature(DelegateParser, () => ({
      __proto__: dart.getMethods(DelegateParser.__proto__),
      parseOn: dart.fnType(result.Result$(T), [context.Context]),
      copy: dart.fnType(delegate.DelegateParser$(T), [])
    }));
    dart.setLibraryUri(DelegateParser, "package:petitparser/src/parser/combinator/delegate.dart");
    dart.setFieldSignature(DelegateParser, () => ({
      __proto__: dart.getFields(DelegateParser.__proto__),
      delegate: dart.fieldType(parser.Parser)
    }));
    return DelegateParser;
  });
  delegate.DelegateParser = delegate.DelegateParser$();
  dart.addTypeTests(delegate.DelegateParser, _is_DelegateParser_default);
  delegate['DelegateParserExtension|delegate'] = function DelegateParserExtension$124delegate(T, $this) {
    return new (delegate.DelegateParser$(T)).new($this);
  };
  delegate['DelegateParserExtension|get#delegate'] = function DelegateParserExtension$124get$35delegate(T, $this) {
    return dart.fn(() => delegate['DelegateParserExtension|delegate'](T, $this), dart.fnType(parser.Parser$(T), []));
  };
  const buffer$ = dart.privateName(context, "Context.buffer");
  const position$ = dart.privateName(context, "Context.position");
  context.Context = class Context extends core.Object {
    get buffer() {
      return this[buffer$];
    }
    set buffer(value) {
      super.buffer = value;
    }
    get position() {
      return this[position$];
    }
    set position(value) {
      super.position = value;
    }
    success(R, result, position = null) {
      let t2;
      return new (success.Success$(R)).new(this.buffer, (t2 = position, t2 == null ? this.position : t2), result);
    }
    failure(R, message, position = null) {
      let t2;
      return new (failure.Failure$(R)).new(this.buffer, (t2 = position, t2 == null ? this.position : t2), message);
    }
    toString() {
      return "Context[" + dart.str(this.toPositionString()) + "]";
    }
    toPositionString() {
      return token$.Token.positionString(this.buffer, this.position);
    }
  };
  (context.Context.new = function(buffer, position) {
    this[buffer$] = buffer;
    this[position$] = position;
    ;
  }).prototype = context.Context.prototype;
  dart.addTypeTests(context.Context);
  dart.setMethodSignature(context.Context, () => ({
    __proto__: dart.getMethods(context.Context.__proto__),
    success: dart.gFnType(R => [result.Result$(R), [R], [core.int]]),
    failure: dart.gFnType(R => [result.Result$(R), [core.String], [core.int]]),
    toPositionString: dart.fnType(core.String, [])
  }));
  dart.setLibraryUri(context.Context, "package:petitparser/src/context/context.dart");
  dart.setFieldSignature(context.Context, () => ({
    __proto__: dart.getFields(context.Context.__proto__),
    buffer: dart.finalFieldType(core.String),
    position: dart.finalFieldType(core.int)
  }));
  dart.defineExtensionMethods(context.Context, ['toString']);
  const _is_Result_default = Symbol('_is_Result_default');
  result.Result$ = dart.generic(R => {
    class Result extends context.Context {
      get isSuccess() {
        return false;
      }
      get isFailure() {
        return false;
      }
    }
    (Result.new = function(buffer, position) {
      Result.__proto__.new.call(this, buffer, position);
      ;
    }).prototype = Result.prototype;
    dart.addTypeTests(Result);
    Result.prototype[_is_Result_default] = true;
    dart.setGetterSignature(Result, () => ({
      __proto__: dart.getGetters(Result.__proto__),
      isSuccess: core.bool,
      isFailure: core.bool
    }));
    dart.setLibraryUri(Result, "package:petitparser/src/context/result.dart");
    return Result;
  });
  result.Result = result.Result$();
  dart.addTypeTests(result.Result, _is_Result_default);
  const _is_Success_default = Symbol('_is_Success_default');
  const value$ = dart.privateName(success, "Success.value");
  success.Success$ = dart.generic(R => {
    class Success extends result.Result$(R) {
      get value() {
        return this[value$];
      }
      set value(value) {
        super.value = value;
      }
      get isSuccess() {
        return true;
      }
      get message() {
        return null;
      }
      map(T, callback) {
        return this.success(T, callback(this.value));
      }
      toString() {
        return "Success[" + dart.str(this.toPositionString()) + "]: " + dart.str(this.value);
      }
    }
    (Success.new = function(buffer, position, value) {
      this[value$] = value;
      Success.__proto__.new.call(this, buffer, position);
      ;
    }).prototype = Success.prototype;
    dart.addTypeTests(Success);
    Success.prototype[_is_Success_default] = true;
    dart.setMethodSignature(Success, () => ({
      __proto__: dart.getMethods(Success.__proto__),
      map: dart.gFnType(T => [result.Result$(T), [dart.fnType(T, [R])]])
    }));
    dart.setGetterSignature(Success, () => ({
      __proto__: dart.getGetters(Success.__proto__),
      message: core.String
    }));
    dart.setLibraryUri(Success, "package:petitparser/src/context/success.dart");
    dart.setFieldSignature(Success, () => ({
      __proto__: dart.getFields(Success.__proto__),
      value: dart.finalFieldType(R)
    }));
    dart.defineExtensionMethods(Success, ['toString']);
    return Success;
  });
  success.Success = success.Success$();
  dart.addTypeTests(success.Success, _is_Success_default);
  const _is_Failure_default = Symbol('_is_Failure_default');
  const message$ = dart.privateName(failure, "Failure.message");
  failure.Failure$ = dart.generic(R => {
    class Failure extends result.Result$(R) {
      get message() {
        return this[message$];
      }
      set message(value) {
        super.message = value;
      }
      get isFailure() {
        return true;
      }
      get value() {
        return dart.throw(new exception.ParserException.new(this));
      }
      map(T, callback) {
        return this.failure(T, this.message);
      }
      toString() {
        return "Failure[" + dart.str(this.toPositionString()) + "]: " + dart.str(this.message);
      }
    }
    (Failure.new = function(buffer, position, message) {
      this[message$] = message;
      Failure.__proto__.new.call(this, buffer, position);
      ;
    }).prototype = Failure.prototype;
    dart.addTypeTests(Failure);
    Failure.prototype[_is_Failure_default] = true;
    dart.setMethodSignature(Failure, () => ({
      __proto__: dart.getMethods(Failure.__proto__),
      map: dart.gFnType(T => [result.Result$(T), [dart.fnType(T, [R])]])
    }));
    dart.setGetterSignature(Failure, () => ({
      __proto__: dart.getGetters(Failure.__proto__),
      value: R
    }));
    dart.setLibraryUri(Failure, "package:petitparser/src/context/failure.dart");
    dart.setFieldSignature(Failure, () => ({
      __proto__: dart.getFields(Failure.__proto__),
      message: dart.finalFieldType(core.String)
    }));
    dart.defineExtensionMethods(Failure, ['toString']);
    return Failure;
  });
  failure.Failure = failure.Failure$();
  dart.addTypeTests(failure.Failure, _is_Failure_default);
  const failure$ = dart.privateName(exception, "ParserException.failure");
  exception.ParserException = class ParserException extends core.Object {
    get failure() {
      return this[failure$];
    }
    set failure(value) {
      super.failure = value;
    }
    get message() {
      return this.failure.message;
    }
    get offset() {
      return this.failure.position;
    }
    get source() {
      return this.failure.buffer;
    }
    toString() {
      return dart.str(this.failure.message) + " at " + dart.str(this.failure.toPositionString());
    }
  };
  (exception.ParserException.new = function(failure) {
    this[failure$] = failure;
    ;
  }).prototype = exception.ParserException.prototype;
  dart.addTypeTests(exception.ParserException);
  exception.ParserException[dart.implements] = () => [core.FormatException];
  dart.setGetterSignature(exception.ParserException, () => ({
    __proto__: dart.getGetters(exception.ParserException.__proto__),
    message: core.String,
    offset: core.int,
    source: core.String
  }));
  dart.setLibraryUri(exception.ParserException, "package:petitparser/src/core/exception.dart");
  dart.setFieldSignature(exception.ParserException, () => ({
    __proto__: dart.getFields(exception.ParserException.__proto__),
    failure: dart.finalFieldType(failure.Failure)
  }));
  dart.defineExtensionMethods(exception.ParserException, ['toString']);
  const _is_Token_default = Symbol('_is_Token_default');
  const value$0 = dart.privateName(token$, "Token.value");
  const buffer$0 = dart.privateName(token$, "Token.buffer");
  const start$ = dart.privateName(token$, "Token.start");
  const stop$ = dart.privateName(token$, "Token.stop");
  token$.Token$ = dart.generic(T => {
    class Token extends core.Object {
      get value() {
        return this[value$0];
      }
      set value(value) {
        super.value = value;
      }
      get buffer() {
        return this[buffer$0];
      }
      set buffer(value) {
        super.buffer = value;
      }
      get start() {
        return this[start$];
      }
      set start(value) {
        super.start = value;
      }
      get stop() {
        return this[stop$];
      }
      set stop(value) {
        super.stop = value;
      }
      get input() {
        return this.buffer[$substring](this.start, this.stop);
      }
      get length() {
        return dart.notNull(this.stop) - dart.notNull(this.start);
      }
      get line() {
        return token$.Token.lineAndColumnOf(this.buffer, this.start)[$_get](0);
      }
      get column() {
        return token$.Token.lineAndColumnOf(this.buffer, this.start)[$_get](1);
      }
      toString() {
        return "Token[" + dart.str(token$.Token.positionString(this.buffer, this.start)) + "]: " + dart.str(this.value);
      }
      _equals(other) {
        if (other == null) return false;
        return token$.Token.is(other) && dart.equals(this.value, other.value) && this.start == other.start && this.stop == other.stop;
      }
      get hashCode() {
        return dart.notNull(dart.hashCode(this.value)) + dart.hashCode(this.start) + dart.hashCode(this.stop);
      }
      static newlineParser() {
        return token$.Token._newlineParser;
      }
      static lineAndColumnOf(buffer, position) {
        let line = 1;
        let offset = 0;
        let iter = matches_skipping['MatchesSkippingParser|matchesSkipping'](token$.Token, token$0['TokenParserExtension|token'](dart.dynamic, token$.Token.newlineParser()), buffer);
        for (let token of iter) {
          if (dart.notNull(position) < dart.notNull(token.stop)) {
            return JSArrayOfint().of([line, dart.notNull(position) - dart.notNull(offset) + 1]);
          }
          line = line + 1;
          offset = token.stop;
        }
        return JSArrayOfint().of([line, dart.notNull(position) - dart.notNull(offset) + 1]);
      }
      static positionString(buffer, position) {
        let lineAndColumn = token$.Token.lineAndColumnOf(buffer, position);
        return dart.str(lineAndColumn[$_get](0)) + ":" + dart.str(lineAndColumn[$_get](1));
      }
    }
    (Token.new = function(value, buffer, start, stop) {
      this[value$0] = value;
      this[buffer$0] = buffer;
      this[start$] = start;
      this[stop$] = stop;
      ;
    }).prototype = Token.prototype;
    dart.addTypeTests(Token);
    Token.prototype[_is_Token_default] = true;
    dart.setMethodSignature(Token, () => ({
      __proto__: dart.getMethods(Token.__proto__),
      _equals: dart.fnType(core.bool, [core.Object]),
      [$_equals]: dart.fnType(core.bool, [core.Object])
    }));
    dart.setGetterSignature(Token, () => ({
      __proto__: dart.getGetters(Token.__proto__),
      input: core.String,
      length: core.int,
      line: core.int,
      column: core.int
    }));
    dart.setLibraryUri(Token, "package:petitparser/src/core/token.dart");
    dart.setFieldSignature(Token, () => ({
      __proto__: dart.getFields(Token.__proto__),
      value: dart.finalFieldType(T),
      buffer: dart.finalFieldType(core.String),
      start: dart.finalFieldType(core.int),
      stop: dart.finalFieldType(core.int)
    }));
    dart.defineExtensionMethods(Token, ['toString', '_equals']);
    dart.defineExtensionAccessors(Token, ['hashCode']);
    return Token;
  });
  token$.Token = token$.Token$();
  dart.defineLazy(token$.Token, {
    /*token$.Token._newlineParser*/get _newlineParser() {
      return choice['ChoiceParserExtension||'](core.String, char$.char("\n"), sequence['SequenceParserExtension|&'](core.String, char$.char("\r"), optional['OptionalParserExtension|optional'](core.String, char$.char("\n"))));
    }
  });
  dart.addTypeTests(token$.Token, _is_Token_default);
  const _is_ListParser_default = Symbol('_is_ListParser_default');
  const children$ = dart.privateName(list, "ListParser.children");
  list.ListParser$ = dart.generic(T => {
    class ListParser extends parser.Parser$(T) {
      get children() {
        return this[children$];
      }
      set children(value) {
        super.children = value;
      }
      replace(source, target) {
        super.replace(source, target);
        for (let i = 0; i < dart.notNull(this.children[$length]); i = i + 1) {
          if (dart.equals(this.children[$_get](i), source)) {
            this.children[$_set](i, target);
          }
        }
      }
    }
    (ListParser.new = function(children) {
      this[children$] = ListOfParser().of(children, {growable: false});
      ListParser.__proto__.new.call(this);
      ;
    }).prototype = ListParser.prototype;
    dart.addTypeTests(ListParser);
    ListParser.prototype[_is_ListParser_default] = true;
    dart.setLibraryUri(ListParser, "package:petitparser/src/parser/combinator/list.dart");
    dart.setFieldSignature(ListParser, () => ({
      __proto__: dart.getFields(ListParser.__proto__),
      children: dart.finalFieldType(core.List$(parser.Parser))
    }));
    return ListParser;
  });
  list.ListParser = list.ListParser$();
  dart.addTypeTests(list.ListParser, _is_ListParser_default);
  sequence.SequenceParser = class SequenceParser extends list.ListParser$(core.List) {
    parseOn(context) {
      let current = context;
      let elements = core.List.new(this.children[$length]);
      for (let i = 0; i < dart.notNull(this.children[$length]); i = i + 1) {
        let result = this.children[$_get](i).parseOn(current);
        if (dart.test(result.isFailure)) {
          return result.failure(core.List, result.message);
        }
        elements[$_set](i, result.value);
        current = result;
      }
      return current.success(core.List, elements);
    }
    fastParseOn(buffer, position) {
      for (let parser of this.children) {
        position = parser.fastParseOn(buffer, position);
        if (dart.notNull(position) < 0) {
          return position;
        }
      }
      return position;
    }
    copy() {
      return new sequence.SequenceParser.new(this.children);
    }
  };
  (sequence.SequenceParser.new = function(children) {
    sequence.SequenceParser.__proto__.new.call(this, children);
    ;
  }).prototype = sequence.SequenceParser.prototype;
  dart.addTypeTests(sequence.SequenceParser);
  dart.setMethodSignature(sequence.SequenceParser, () => ({
    __proto__: dart.getMethods(sequence.SequenceParser.__proto__),
    parseOn: dart.fnType(result.Result$(core.List), [context.Context]),
    copy: dart.fnType(sequence.SequenceParser, [])
  }));
  dart.setLibraryUri(sequence.SequenceParser, "package:petitparser/src/parser/combinator/sequence.dart");
  sequence['SequenceParserExtension|seq'] = function SequenceParserExtension$124seq(T, $this, other) {
    return sequence.SequenceParser.is($this) ? new sequence.SequenceParser.new((() => {
      let t3 = JSArrayOfParser().of([]);
      for (let t4 of $this.children)
        t3[$add](t4);
      t3[$add](other);
      return t3;
    })()) : new sequence.SequenceParser.new(JSArrayOfParser().of([$this, other]));
  };
  sequence['SequenceParserExtension|get#seq'] = function SequenceParserExtension$124get$35seq(T, $this) {
    return dart.fn(other => sequence['SequenceParserExtension|seq'](T, $this, other), ParserToParserOfList());
  };
  sequence['SequenceParserExtension|&'] = function SequenceParserExtension$124$38(T, $this, other) {
    return sequence['SequenceParserExtension|seq'](T, $this, other);
  };
  sequence['SequenceIterableExtension|toSequenceParser'] = function SequenceIterableExtension$124toSequenceParser(T, $this) {
    return new sequence.SequenceParser.new($this);
  };
  sequence['SequenceIterableExtension|get#toSequenceParser'] = function SequenceIterableExtension$124get$35toSequenceParser(T, $this) {
    return dart.fn(() => sequence['SequenceIterableExtension|toSequenceParser'](T, $this), VoidToParserOfList());
  };
  const _is_OptionalParser_default = Symbol('_is_OptionalParser_default');
  const otherwise$ = dart.privateName(optional, "OptionalParser.otherwise");
  optional.OptionalParser$ = dart.generic(T => {
    let ResultOfT = () => (ResultOfT = dart.constFn(result.Result$(T)))();
    let OptionalParserOfT = () => (OptionalParserOfT = dart.constFn(optional.OptionalParser$(T)))();
    let ParserOfT = () => (ParserOfT = dart.constFn(parser.Parser$(T)))();
    class OptionalParser extends delegate.DelegateParser$(T) {
      get otherwise() {
        return this[otherwise$];
      }
      set otherwise(value) {
        super.otherwise = value;
      }
      parseOn(context) {
        let result = this.delegate.parseOn(context);
        if (dart.test(result.isSuccess)) {
          return ResultOfT()._check(result);
        } else {
          return context.success(T, this.otherwise);
        }
      }
      fastParseOn(buffer, position) {
        let result = this.delegate.fastParseOn(buffer, position);
        return dart.notNull(result) < 0 ? position : result;
      }
      copy() {
        return new (OptionalParserOfT()).new(ParserOfT()._check(this.delegate), this.otherwise);
      }
      hasEqualProperties(other) {
        OptionalParserOfT()._check(other);
        return dart.test(super.hasEqualProperties(other)) && dart.equals(this.otherwise, other.otherwise);
      }
    }
    (OptionalParser.new = function(delegate, otherwise) {
      this[otherwise$] = otherwise;
      OptionalParser.__proto__.new.call(this, delegate);
      ;
    }).prototype = OptionalParser.prototype;
    dart.addTypeTests(OptionalParser);
    OptionalParser.prototype[_is_OptionalParser_default] = true;
    dart.setMethodSignature(OptionalParser, () => ({
      __proto__: dart.getMethods(OptionalParser.__proto__),
      copy: dart.fnType(optional.OptionalParser$(T), [])
    }));
    dart.setLibraryUri(OptionalParser, "package:petitparser/src/parser/combinator/optional.dart");
    dart.setFieldSignature(OptionalParser, () => ({
      __proto__: dart.getFields(OptionalParser.__proto__),
      otherwise: dart.finalFieldType(T)
    }));
    return OptionalParser;
  });
  optional.OptionalParser = optional.OptionalParser$();
  dart.addTypeTests(optional.OptionalParser, _is_OptionalParser_default);
  optional['OptionalParserExtension|optional'] = function OptionalParserExtension$124optional(T, $this, otherwise = null) {
    return new (optional.OptionalParser$(T)).new($this, otherwise);
  };
  optional['OptionalParserExtension|get#optional'] = function OptionalParserExtension$124get$35optional(T, $this) {
    return dart.fn((otherwise = null) => optional['OptionalParserExtension|optional'](T, $this, otherwise), dart.fnType(parser.Parser$(T), [], [T]));
  };
  choice.ChoiceParser = class ChoiceParser extends list.ListParser {
    parseOn(context) {
      let result = null;
      for (let i = 0; i < dart.notNull(this.children[$length]); i = i + 1) {
        result = this.children[$_get](i).parseOn(context);
        if (dart.test(result.isSuccess)) {
          return result;
        }
      }
      return result;
    }
    fastParseOn(buffer, position) {
      let result = -1;
      for (let parser of this.children) {
        result = parser.fastParseOn(buffer, position);
        if (dart.notNull(result) >= 0) {
          return result;
        }
      }
      return result;
    }
    copy() {
      return new choice.ChoiceParser.new(this.children);
    }
  };
  (choice.ChoiceParser.new = function(children) {
    choice.ChoiceParser.__proto__.new.call(this, children);
    if (dart.test(children[$isEmpty])) {
      dart.throw(new core.ArgumentError.new("Choice parser cannot be empty."));
    }
  }).prototype = choice.ChoiceParser.prototype;
  dart.addTypeTests(choice.ChoiceParser);
  dart.setMethodSignature(choice.ChoiceParser, () => ({
    __proto__: dart.getMethods(choice.ChoiceParser.__proto__),
    parseOn: dart.fnType(result.Result, [context.Context]),
    copy: dart.fnType(choice.ChoiceParser, [])
  }));
  dart.setLibraryUri(choice.ChoiceParser, "package:petitparser/src/parser/combinator/choice.dart");
  choice['ChoiceParserExtension|or'] = function ChoiceParserExtension$124or(T, $this, other) {
    return choice.ChoiceParser.is($this) ? new choice.ChoiceParser.new((() => {
      let t12 = JSArrayOfParser().of([]);
      for (let t13 of $this.children)
        t12[$add](t13);
      t12[$add](other);
      return t12;
    })()) : new choice.ChoiceParser.new(JSArrayOfParser().of([$this, other]));
  };
  choice['ChoiceParserExtension|get#or'] = function ChoiceParserExtension$124get$35or(T, $this) {
    return dart.fn(other => choice['ChoiceParserExtension|or'](T, $this, other), ParserToParser());
  };
  choice['ChoiceParserExtension||'] = function ChoiceParserExtension$124$124(T, $this, other) {
    return choice['ChoiceParserExtension|or'](T, $this, other);
  };
  choice['ChoiceIterableExtension|toChoiceParser'] = function ChoiceIterableExtension$124toChoiceParser(T, $this) {
    return new choice.ChoiceParser.new($this);
  };
  choice['ChoiceIterableExtension|get#toChoiceParser'] = function ChoiceIterableExtension$124get$35toChoiceParser(T, $this) {
    return dart.fn(() => choice['ChoiceIterableExtension|toChoiceParser'](T, $this), VoidToParser());
  };
  predicate.CharacterPredicate = class CharacterPredicate extends core.Object {};
  (predicate.CharacterPredicate.new = function() {
    ;
  }).prototype = predicate.CharacterPredicate.prototype;
  dart.addTypeTests(predicate.CharacterPredicate);
  dart.setLibraryUri(predicate.CharacterPredicate, "package:petitparser/src/parser/character/predicate.dart");
  const value$1 = dart.privateName(char$, "SingleCharPredicate.value");
  char$.SingleCharPredicate = class SingleCharPredicate extends predicate.CharacterPredicate {
    get value() {
      return this[value$1];
    }
    set value(value) {
      super.value = value;
    }
    test(value) {
      return this.value == value;
    }
    isEqualTo(other) {
      return char$.SingleCharPredicate.is(other) && other.value == this.value;
    }
  };
  (char$.SingleCharPredicate.new = function(value) {
    this[value$1] = value;
    if (!(value != null)) dart.assertFailed("value must not be null", "org-dartlang-app:///packages/petitparser/src/parser/character/char.dart", 18, 16, "value != null");
    char$.SingleCharPredicate.__proto__.new.call(this);
    ;
  }).prototype = char$.SingleCharPredicate.prototype;
  dart.addTypeTests(char$.SingleCharPredicate);
  dart.setMethodSignature(char$.SingleCharPredicate, () => ({
    __proto__: dart.getMethods(char$.SingleCharPredicate.__proto__),
    test: dart.fnType(core.bool, [core.int]),
    isEqualTo: dart.fnType(core.bool, [predicate.CharacterPredicate])
  }));
  dart.setLibraryUri(char$.SingleCharPredicate, "package:petitparser/src/parser/character/char.dart");
  dart.setFieldSignature(char$.SingleCharPredicate, () => ({
    __proto__: dart.getFields(char$.SingleCharPredicate.__proto__),
    value: dart.finalFieldType(core.int)
  }));
  char$.char = function char(char, message = null) {
    let t18;
    return new parser$.CharacterParser.new(new char$.SingleCharPredicate.new(code$.toCharCode(char)), (t18 = message, t18 == null ? "\"" + dart.str(code$.toReadableString(char)) + "\" expected" : t18));
  };
  const predicate$ = dart.privateName(parser$, "CharacterParser.predicate");
  const message$0 = dart.privateName(parser$, "CharacterParser.message");
  parser$.CharacterParser = class CharacterParser extends parser.Parser$(core.String) {
    get predicate() {
      return this[predicate$];
    }
    set predicate(value) {
      super.predicate = value;
    }
    get message() {
      return this[message$0];
    }
    set message(value) {
      super.message = value;
    }
    parseOn(context) {
      let buffer = context.buffer;
      let position = context.position;
      if (dart.notNull(position) < buffer.length && dart.test(this.predicate.test(buffer[$codeUnitAt](position)))) {
        return context.success(core.String, buffer[$_get](position), dart.notNull(position) + 1);
      }
      return context.failure(core.String, this.message);
    }
    fastParseOn(buffer, position) {
      return dart.notNull(position) < buffer.length && dart.test(this.predicate.test(buffer[$codeUnitAt](position))) ? dart.notNull(position) + 1 : -1;
    }
    toString() {
      return dart.str(super[$toString]()) + "[" + dart.str(this.message) + "]";
    }
    copy() {
      return new parser$.CharacterParser.new(this.predicate, this.message);
    }
    hasEqualProperties(other) {
      parser$.CharacterParser._check(other);
      return dart.test(super.hasEqualProperties(other)) && dart.test(this.predicate.isEqualTo(other.predicate)) && this.message == other.message;
    }
  };
  (parser$.CharacterParser.new = function(predicate, message) {
    this[predicate$] = predicate;
    this[message$0] = message;
    if (!(predicate != null)) dart.assertFailed("predicate must not be null", "org-dartlang-app:///packages/petitparser/src/parser/character/parser.dart", 15, 16, "predicate != null");
    if (!(message != null)) dart.assertFailed("message must not be null", "org-dartlang-app:///packages/petitparser/src/parser/character/parser.dart", 16, 16, "message != null");
    parser$.CharacterParser.__proto__.new.call(this);
    ;
  }).prototype = parser$.CharacterParser.prototype;
  dart.addTypeTests(parser$.CharacterParser);
  dart.setMethodSignature(parser$.CharacterParser, () => ({
    __proto__: dart.getMethods(parser$.CharacterParser.__proto__),
    parseOn: dart.fnType(result.Result$(core.String), [context.Context]),
    copy: dart.fnType(parser$.CharacterParser, [])
  }));
  dart.setLibraryUri(parser$.CharacterParser, "package:petitparser/src/parser/character/parser.dart");
  dart.setFieldSignature(parser$.CharacterParser, () => ({
    __proto__: dart.getFields(parser$.CharacterParser.__proto__),
    predicate: dart.finalFieldType(predicate.CharacterPredicate),
    message: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(parser$.CharacterParser, ['toString']);
  code$.toCharCode = function toCharCode(element) {
    if (typeof element == 'number') {
      return element[$round]();
    }
    let value = dart.toString(element);
    if (value.length !== 1) {
      dart.throw(new core.ArgumentError.new("\"" + dart.str(value) + "\" is not a character"));
    }
    return value[$codeUnitAt](0);
  };
  code$.toReadableString = function toReadableString(element) {
    if (typeof element == 'string' && element.length > 1) {
      let buffer = new core.StringBuffer.new();
      for (let i = 0; i < element.length; i = i + 1) {
        buffer.write(code$.toReadableString(element[$_get](i)));
      }
      return buffer.toString();
    }
    let code = code$.toCharCode(element);
    switch (code) {
      case 8:
      {
        return "\\b";
      }
      case 9:
      {
        return "\\t";
      }
      case 10:
      {
        return "\\n";
      }
      case 11:
      {
        return "\\v";
      }
      case 12:
      {
        return "\\f";
      }
      case 13:
      {
        return "\\r";
      }
      case 34:
      {
        return "\\\"";
      }
      case 39:
      {
        return "\\'";
      }
      case 92:
      {
        return "\\\\";
      }
    }
    if (dart.notNull(code) < 32) {
      return "\\x" + code[$toRadixString](16)[$padLeft](2, "0");
    }
    return core.String.fromCharCode(code);
  };
  const _is_TokenParser_default = Symbol('_is_TokenParser_default');
  token$0.TokenParser$ = dart.generic(T => {
    let TokenOfT = () => (TokenOfT = dart.constFn(token$.Token$(T)))();
    let TokenParserOfT = () => (TokenParserOfT = dart.constFn(token$0.TokenParser$(T)))();
    class TokenParser extends delegate.DelegateParser$(token$.Token$(T)) {
      parseOn(context) {
        let result = this.delegate.parseOn(context);
        if (dart.test(result.isSuccess)) {
          let token = new (TokenOfT()).new(T._check(result.value), context.buffer, context.position, result.position);
          return result.success(TokenOfT(), token);
        } else {
          return result.failure(TokenOfT(), result.message);
        }
      }
      fastParseOn(buffer, position) {
        return this.delegate.fastParseOn(buffer, position);
      }
      copy() {
        return new (TokenParserOfT()).new(this.delegate);
      }
    }
    (TokenParser.new = function(delegate) {
      TokenParser.__proto__.new.call(this, delegate);
      ;
    }).prototype = TokenParser.prototype;
    dart.addTypeTests(TokenParser);
    TokenParser.prototype[_is_TokenParser_default] = true;
    dart.setMethodSignature(TokenParser, () => ({
      __proto__: dart.getMethods(TokenParser.__proto__),
      copy: dart.fnType(token$0.TokenParser$(T), [])
    }));
    dart.setLibraryUri(TokenParser, "package:petitparser/src/parser/action/token.dart");
    return TokenParser;
  });
  token$0.TokenParser = token$0.TokenParser$();
  dart.addTypeTests(token$0.TokenParser, _is_TokenParser_default);
  token$0['TokenParserExtension|token'] = function TokenParserExtension$124token(T, $this) {
    return new (token$0.TokenParser$(T)).new($this);
  };
  token$0['TokenParserExtension|get#token'] = function TokenParserExtension$124get$35token(T, $this) {
    return dart.fn(() => token$0['TokenParserExtension|token'](T, $this), dart.fnType(parser.Parser$(token$.Token$(T)), []));
  };
  matches_skipping['MatchesSkippingParser|matchesSkipping'] = function MatchesSkippingParser$124matchesSkipping(T, $this, input) {
    let list = _interceptors.JSArray$(T).of([]);
    possesive['PossessiveRepeatingParserExtension|star'](dart.dynamic, choice['ChoiceParserExtension|or'](dart.void, map['MapParserExtension|map'](T, dart.void, $this, dart.bind(list, $add), {hasSideEffects: true}), any.any())).fastParseOn(input, 0);
    return list;
  };
  matches_skipping['MatchesSkippingParser|get#matchesSkipping'] = function MatchesSkippingParser$124get$35matchesSkipping(T, $this) {
    return dart.fn(input => matches_skipping['MatchesSkippingParser|matchesSkipping'](T, $this, input), dart.fnType(core.List$(T), [core.String]));
  };
  matches['MatchesParser|matches'] = function MatchesParser$124matches(T, $this, input) {
    let list = _interceptors.JSArray$(T).of([]);
    possesive['PossessiveRepeatingParserExtension|star'](dart.dynamic, choice['ChoiceParserExtension|or'](core.List, sequence['SequenceParserExtension|seq'](dart.void, map['MapParserExtension|map'](T, dart.void, and['AndParserExtension|and'](T, $this), dart.bind(list, $add), {hasSideEffects: true}), any.any()), any.any())).fastParseOn(input, 0);
    return list;
  };
  matches['MatchesParser|get#matches'] = function MatchesParser$124get$35matches(T, $this) {
    return dart.fn(input => matches['MatchesParser|matches'](T, $this, input), dart.fnType(core.List$(T), [core.String]));
  };
  const _is_RepeatingParser_default = Symbol('_is_RepeatingParser_default');
  const min$ = dart.privateName(repeating, "RepeatingParser.min");
  const max$ = dart.privateName(repeating, "RepeatingParser.max");
  repeating.RepeatingParser$ = dart.generic(T => {
    let RepeatingParserOfT = () => (RepeatingParserOfT = dart.constFn(repeating.RepeatingParser$(T)))();
    class RepeatingParser extends delegate.DelegateParser$(core.List$(T)) {
      get min() {
        return this[min$];
      }
      set min(value) {
        super.min = value;
      }
      get max() {
        return this[max$];
      }
      set max(value) {
        super.max = value;
      }
      toString() {
        return dart.str(super[$toString]()) + "[" + dart.str(this.min) + ".." + dart.str(this.max === -1 ? "*" : this.max) + "]";
      }
      hasEqualProperties(other) {
        RepeatingParserOfT()._check(other);
        return dart.test(super.hasEqualProperties(other)) && this.min == other.min && this.max == other.max;
      }
    }
    (RepeatingParser.new = function(parser, min, max) {
      this[min$] = min;
      this[max$] = max;
      if (!(min != null)) dart.assertFailed("min must not be null", "org-dartlang-app:///packages/petitparser/src/parser/repeater/repeating.dart", 14, 16, "min != null");
      if (!(max != null)) dart.assertFailed("max must not be null", "org-dartlang-app:///packages/petitparser/src/parser/repeater/repeating.dart", 15, 16, "max != null");
      RepeatingParser.__proto__.new.call(this, parser);
      if (dart.notNull(this.min) < 0) {
        dart.throw(new core.ArgumentError.new("Minimum repetitions must be positive, but got " + dart.str(this.min) + "."));
      }
      if (this.max !== -1 && dart.notNull(this.max) < dart.notNull(this.min)) {
        dart.throw(new core.ArgumentError.new("Maximum repetitions must be larger than " + dart.str(this.min) + ", but got " + dart.str(this.max) + "."));
      }
    }).prototype = RepeatingParser.prototype;
    dart.addTypeTests(RepeatingParser);
    RepeatingParser.prototype[_is_RepeatingParser_default] = true;
    dart.setLibraryUri(RepeatingParser, "package:petitparser/src/parser/repeater/repeating.dart");
    dart.setFieldSignature(RepeatingParser, () => ({
      __proto__: dart.getFields(RepeatingParser.__proto__),
      min: dart.finalFieldType(core.int),
      max: dart.finalFieldType(core.int)
    }));
    dart.defineExtensionMethods(RepeatingParser, ['toString']);
    return RepeatingParser;
  });
  repeating.RepeatingParser = repeating.RepeatingParser$();
  dart.addTypeTests(repeating.RepeatingParser, _is_RepeatingParser_default);
  const _is_PossessiveRepeatingParser_default = Symbol('_is_PossessiveRepeatingParser_default');
  possesive.PossessiveRepeatingParser$ = dart.generic(T => {
    let JSArrayOfT = () => (JSArrayOfT = dart.constFn(_interceptors.JSArray$(T)))();
    let ListOfT = () => (ListOfT = dart.constFn(core.List$(T)))();
    let PossessiveRepeatingParserOfT = () => (PossessiveRepeatingParserOfT = dart.constFn(possesive.PossessiveRepeatingParser$(T)))();
    let ParserOfT = () => (ParserOfT = dart.constFn(parser.Parser$(T)))();
    class PossessiveRepeatingParser extends repeating.RepeatingParser$(T) {
      parseOn(context) {
        let elements = JSArrayOfT().of([]);
        let current = context;
        while (dart.notNull(elements[$length]) < dart.notNull(this.min)) {
          let result = this.delegate.parseOn(current);
          if (dart.test(result.isFailure)) {
            return result.failure(ListOfT(), result.message);
          }
          elements[$add](T._check(result.value));
          current = result;
        }
        while (this.max === -1 || dart.notNull(elements[$length]) < dart.notNull(this.max)) {
          let result = this.delegate.parseOn(current);
          if (dart.test(result.isFailure)) {
            return current.success(ListOfT(), elements);
          }
          elements[$add](T._check(result.value));
          current = result;
        }
        return current.success(ListOfT(), elements);
      }
      fastParseOn(buffer, position) {
        let count = 0;
        let current = position;
        while (count < dart.notNull(this.min)) {
          let result = this.delegate.fastParseOn(buffer, current);
          if (dart.notNull(result) < 0) {
            return -1;
          }
          current = result;
          count = count + 1;
        }
        while (this.max === -1 || count < dart.notNull(this.max)) {
          let result = this.delegate.fastParseOn(buffer, current);
          if (dart.notNull(result) < 0) {
            return current;
          }
          current = result;
          count = count + 1;
        }
        return current;
      }
      copy() {
        return new (PossessiveRepeatingParserOfT()).new(ParserOfT()._check(this.delegate), this.min, this.max);
      }
    }
    (PossessiveRepeatingParser.new = function(parser, min, max) {
      PossessiveRepeatingParser.__proto__.new.call(this, parser, min, max);
      ;
    }).prototype = PossessiveRepeatingParser.prototype;
    dart.addTypeTests(PossessiveRepeatingParser);
    PossessiveRepeatingParser.prototype[_is_PossessiveRepeatingParser_default] = true;
    dart.setMethodSignature(PossessiveRepeatingParser, () => ({
      __proto__: dart.getMethods(PossessiveRepeatingParser.__proto__),
      copy: dart.fnType(possesive.PossessiveRepeatingParser$(T), [])
    }));
    dart.setLibraryUri(PossessiveRepeatingParser, "package:petitparser/src/parser/repeater/possesive.dart");
    return PossessiveRepeatingParser;
  });
  possesive.PossessiveRepeatingParser = possesive.PossessiveRepeatingParser$();
  dart.addTypeTests(possesive.PossessiveRepeatingParser, _is_PossessiveRepeatingParser_default);
  possesive['PossessiveRepeatingParserExtension|star'] = function PossessiveRepeatingParserExtension$124star(T, $this) {
    return possesive['PossessiveRepeatingParserExtension|repeat'](T, $this, 0, -1);
  };
  possesive['PossessiveRepeatingParserExtension|get#star'] = function PossessiveRepeatingParserExtension$124get$35star(T, $this) {
    return dart.fn(() => possesive['PossessiveRepeatingParserExtension|star'](T, $this), dart.fnType(parser.Parser$(core.List$(T)), []));
  };
  possesive['PossessiveRepeatingParserExtension|plus'] = function PossessiveRepeatingParserExtension$124plus(T, $this) {
    return possesive['PossessiveRepeatingParserExtension|repeat'](T, $this, 1, -1);
  };
  possesive['PossessiveRepeatingParserExtension|get#plus'] = function PossessiveRepeatingParserExtension$124get$35plus(T, $this) {
    return dart.fn(() => possesive['PossessiveRepeatingParserExtension|plus'](T, $this), dart.fnType(parser.Parser$(core.List$(T)), []));
  };
  possesive['PossessiveRepeatingParserExtension|times'] = function PossessiveRepeatingParserExtension$124times(T, $this, count) {
    return possesive['PossessiveRepeatingParserExtension|repeat'](T, $this, count, count);
  };
  possesive['PossessiveRepeatingParserExtension|get#times'] = function PossessiveRepeatingParserExtension$124get$35times(T, $this) {
    return dart.fn(count => possesive['PossessiveRepeatingParserExtension|times'](T, $this, count), dart.fnType(parser.Parser$(core.List$(T)), [core.int]));
  };
  possesive['PossessiveRepeatingParserExtension|repeat'] = function PossessiveRepeatingParserExtension$124repeat(T, $this, min, max = null) {
    let t31;
    return new (possesive.PossessiveRepeatingParser$(T)).new($this, min, (t31 = max, t31 == null ? min : t31));
  };
  possesive['PossessiveRepeatingParserExtension|get#repeat'] = function PossessiveRepeatingParserExtension$124get$35repeat(T, $this) {
    return dart.fn((min, max = null) => possesive['PossessiveRepeatingParserExtension|repeat'](T, $this, min, max), dart.fnType(parser.Parser$(core.List$(T)), [core.int], [core.int]));
  };
  dart.defineLazy(unbounded, {
    /*unbounded.unbounded*/get unbounded() {
      return -1;
    }
  });
  const message$1 = dart.privateName(any, "AnyParser.message");
  any.AnyParser = class AnyParser extends parser.Parser$(core.String) {
    get message() {
      return this[message$1];
    }
    set message(value) {
      super.message = value;
    }
    parseOn(context) {
      let position = context.position;
      let buffer = context.buffer;
      return dart.notNull(position) < buffer.length ? context.success(core.String, buffer[$_get](position), dart.notNull(position) + 1) : context.failure(core.String, this.message);
    }
    fastParseOn(buffer, position) {
      return dart.notNull(position) < buffer.length ? dart.notNull(position) + 1 : -1;
    }
    copy() {
      return new any.AnyParser.new(this.message);
    }
    hasEqualProperties(other) {
      any.AnyParser._check(other);
      return dart.test(super.hasEqualProperties(other)) && this.message == other.message;
    }
  };
  (any.AnyParser.new = function(message) {
    this[message$1] = message;
    if (!(message != null)) dart.assertFailed("message must not be null", "org-dartlang-app:///packages/petitparser/src/parser/predicate/any.dart", 19, 36, "message != null");
    any.AnyParser.__proto__.new.call(this);
    ;
  }).prototype = any.AnyParser.prototype;
  dart.addTypeTests(any.AnyParser);
  dart.setMethodSignature(any.AnyParser, () => ({
    __proto__: dart.getMethods(any.AnyParser.__proto__),
    parseOn: dart.fnType(result.Result$(core.String), [context.Context]),
    copy: dart.fnType(any.AnyParser, [])
  }));
  dart.setLibraryUri(any.AnyParser, "package:petitparser/src/parser/predicate/any.dart");
  dart.setFieldSignature(any.AnyParser, () => ({
    __proto__: dart.getFields(any.AnyParser.__proto__),
    message: dart.finalFieldType(core.String)
  }));
  any.any = function any$(message = "input expected") {
    return new any.AnyParser.new(message);
  };
  const _is_AndParser_default = Symbol('_is_AndParser_default');
  and.AndParser$ = dart.generic(T => {
    let ResultOfT = () => (ResultOfT = dart.constFn(result.Result$(T)))();
    let AndParserOfT = () => (AndParserOfT = dart.constFn(and.AndParser$(T)))();
    class AndParser extends delegate.DelegateParser$(T) {
      parseOn(context) {
        let result = this.delegate.parseOn(context);
        if (dart.test(result.isSuccess)) {
          return context.success(T, T._check(result.value));
        } else {
          return ResultOfT()._check(result);
        }
      }
      fastParseOn(buffer, position) {
        let result = this.delegate.fastParseOn(buffer, position);
        return dart.notNull(result) < 0 ? -1 : position;
      }
      copy() {
        return new (AndParserOfT()).new(this.delegate);
      }
    }
    (AndParser.new = function(delegate) {
      AndParser.__proto__.new.call(this, delegate);
      ;
    }).prototype = AndParser.prototype;
    dart.addTypeTests(AndParser);
    AndParser.prototype[_is_AndParser_default] = true;
    dart.setMethodSignature(AndParser, () => ({
      __proto__: dart.getMethods(AndParser.__proto__),
      copy: dart.fnType(and.AndParser$(T), [])
    }));
    dart.setLibraryUri(AndParser, "package:petitparser/src/parser/combinator/and.dart");
    return AndParser;
  });
  and.AndParser = and.AndParser$();
  dart.addTypeTests(and.AndParser, _is_AndParser_default);
  and['AndParserExtension|and'] = function AndParserExtension$124and(T, $this) {
    return new (and.AndParser$(T)).new($this);
  };
  and['AndParserExtension|get#and'] = function AndParserExtension$124get$35and(T, $this) {
    return dart.fn(() => and['AndParserExtension|and'](T, $this), dart.fnType(parser.Parser$(T), []));
  };
  const _is_MapParser_default = Symbol('_is_MapParser_default');
  const callback$ = dart.privateName(map, "MapParser.callback");
  const hasSideEffects$ = dart.privateName(map, "MapParser.hasSideEffects");
  map.MapParser$ = dart.generic((T, R) => {
    let MapParserOfT$R = () => (MapParserOfT$R = dart.constFn(map.MapParser$(T, R)))();
    let ParserOfT = () => (ParserOfT = dart.constFn(parser.Parser$(T)))();
    let TToR = () => (TToR = dart.constFn(dart.fnType(R, [T])))();
    class MapParser extends delegate.DelegateParser$(R) {
      get callback() {
        return this[callback$];
      }
      set callback(value) {
        super.callback = value;
      }
      get hasSideEffects() {
        return this[hasSideEffects$];
      }
      set hasSideEffects(value) {
        super.hasSideEffects = value;
      }
      parseOn(context) {
        let result = this.delegate.parseOn(context);
        if (dart.test(result.isSuccess)) {
          return result.success(R, this.callback(T._check(result.value)));
        } else {
          return result.failure(R, result.message);
        }
      }
      fastParseOn(buffer, position) {
        return dart.test(this.hasSideEffects) ? super.fastParseOn(buffer, position) : this.delegate.fastParseOn(buffer, position);
      }
      copy() {
        return new (MapParserOfT$R()).new(ParserOfT()._check(this.delegate), this.callback, this.hasSideEffects);
      }
      hasEqualProperties(other) {
        MapParserOfT$R()._check(other);
        return dart.test(super.hasEqualProperties(other)) && dart.equals(this.callback, TToR()._check(other.callback)) && dart.equals(this.hasSideEffects, other.hasSideEffects);
      }
    }
    (MapParser.new = function(delegate, callback, hasSideEffects = false) {
      this[callback$] = callback;
      this[hasSideEffects$] = hasSideEffects;
      if (!(callback != null)) dart.assertFailed("callback must not be null", "org-dartlang-app:///packages/petitparser/src/parser/action/map.dart", 33, 16, "callback != null");
      if (!(hasSideEffects != null)) dart.assertFailed("hasSideEffects must not be null", "org-dartlang-app:///packages/petitparser/src/parser/action/map.dart", 34, 16, "hasSideEffects != null");
      MapParser.__proto__.new.call(this, delegate);
      ;
    }).prototype = MapParser.prototype;
    dart.addTypeTests(MapParser);
    MapParser.prototype[_is_MapParser_default] = true;
    dart.setMethodSignature(MapParser, () => ({
      __proto__: dart.getMethods(MapParser.__proto__),
      copy: dart.fnType(map.MapParser$(T, R), [])
    }));
    dart.setLibraryUri(MapParser, "package:petitparser/src/parser/action/map.dart");
    dart.setFieldSignature(MapParser, () => ({
      __proto__: dart.getFields(MapParser.__proto__),
      callback: dart.finalFieldType(dart.fnType(R, [T])),
      hasSideEffects: dart.finalFieldType(core.bool)
    }));
    return MapParser;
  });
  map.MapParser = map.MapParser$();
  dart.addTypeTests(map.MapParser, _is_MapParser_default);
  map['MapParserExtension|map'] = function MapParserExtension$124map(T, R, $this, callback, opts) {
    let hasSideEffects = opts && 'hasSideEffects' in opts ? opts.hasSideEffects : false;
    return new (map.MapParser$(T, R)).new($this, callback, hasSideEffects);
  };
  map['MapParserExtension|get#map'] = function MapParserExtension$124get$35map(T, $this) {
    return dart.fn((R, callback, opts) => {
      let hasSideEffects = opts && 'hasSideEffects' in opts ? opts.hasSideEffects : false;
      return map['MapParserExtension|map'](T, R, $this, callback, {hasSideEffects: hasSideEffects});
    }, dart.gFnType(R => {
      let ParserOfR = () => (ParserOfR = dart.constFn(parser.Parser$(R)))();
      return [ParserOfR(), [dart.fnType(R, [T])], {hasSideEffects: core.bool}, {}];
    }));
  };
  dart.trackLibraries("packages/petitparser/src/context/context", {
    "package:petitparser/src/parser/combinator/delegate.dart": delegate,
    "package:petitparser/src/core/parser.dart": parser,
    "package:petitparser/src/context/success.dart": success,
    "package:petitparser/src/context/result.dart": result,
    "package:petitparser/src/context/context.dart": context,
    "package:petitparser/src/context/failure.dart": failure,
    "package:petitparser/src/core/exception.dart": exception,
    "package:petitparser/src/core/token.dart": token$,
    "package:petitparser/src/parser/combinator/sequence.dart": sequence,
    "package:petitparser/src/parser/combinator/list.dart": list,
    "package:petitparser/src/parser/combinator/optional.dart": optional,
    "package:petitparser/src/parser/combinator/choice.dart": choice,
    "package:petitparser/src/parser/character/char.dart": char$,
    "package:petitparser/src/parser/character/predicate.dart": predicate,
    "package:petitparser/src/parser/character/parser.dart": parser$,
    "package:petitparser/src/parser/character/code.dart": code$,
    "package:petitparser/src/parser/action/token.dart": token$0,
    "package:petitparser/src/matcher/matches_skipping.dart": matches_skipping,
    "package:petitparser/src/matcher/matches.dart": matches,
    "package:petitparser/src/parser/repeater/possesive.dart": possesive,
    "package:petitparser/src/parser/repeater/unbounded.dart": unbounded,
    "package:petitparser/src/parser/repeater/repeating.dart": repeating,
    "package:petitparser/src/parser/predicate/any.dart": any,
    "package:petitparser/src/parser/combinator/and.dart": and,
    "package:petitparser/src/parser/action/map.dart": map
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["../core/parser.dart","../parser/combinator/delegate.dart","context.dart","result.dart","success.dart","failure.dart","../core/exception.dart","../core/token.dart","../parser/combinator/list.dart","../parser/combinator/sequence.dart","../parser/combinator/optional.dart","../parser/combinator/choice.dart","../parser/character/predicate.dart","../parser/character/char.dart","../parser/character/parser.dart","../parser/character/code.dart","../parser/action/token.dart","../matcher/matches_skipping.dart","../matcher/matches.dart","../parser/repeater/repeating.dart","../parser/repeater/possesive.dart","../parser/repeater/unbounded.dart","../parser/predicate/any.dart","../parser/combinator/and.dart","../parser/action/map.dart"],"names":[],"mappings":"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","file":"context.ddc.js"}');
  // Exports:
  return {
    src__parser__combinator__delegate: delegate,
    src__core__parser: parser,
    src__context__success: success,
    src__context__result: result,
    src__context__context: context,
    src__context__failure: failure,
    src__core__exception: exception,
    src__core__token: token$,
    src__parser__combinator__sequence: sequence,
    src__parser__combinator__list: list,
    src__parser__combinator__optional: optional,
    src__parser__combinator__choice: choice,
    src__parser__character__char: char$,
    src__parser__character__predicate: predicate,
    src__parser__character__parser: parser$,
    src__parser__character__code: code$,
    src__parser__action__token: token$0,
    src__matcher__matches_skipping: matches_skipping,
    src__matcher__matches: matches,
    src__parser__repeater__possesive: possesive,
    src__parser__repeater__unbounded: unbounded,
    src__parser__repeater__repeating: repeating,
    src__parser__predicate__any: any,
    src__parser__combinator__and: and,
    src__parser__action__map: map
  };
});

//# sourceMappingURL=context.ddc.js.map
