define(['dart_sdk', 'packages/petitparser/src/context/context', 'packages/petitparser/src/parser/repeater/separated_by', 'packages/petitparser/src/parser/combinator/settable'], function(dart_sdk, packages__petitparser__src__context__context, packages__petitparser__src__parser__repeater__separated_by, packages__petitparser__src__parser__combinator__settable) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const parser$ = packages__petitparser__src__context__context.src__core__parser;
  const map = packages__petitparser__src__context__context.src__parser__action__map;
  const sequence = packages__petitparser__src__context__context.src__parser__combinator__sequence;
  const possesive = packages__petitparser__src__context__context.src__parser__repeater__possesive;
  const choice = packages__petitparser__src__context__context.src__parser__combinator__choice;
  const separated_by = packages__petitparser__src__parser__repeater__separated_by.src__parser__repeater__separated_by;
  const settable = packages__petitparser__src__parser__combinator__settable.src__parser__combinator__settable;
  const failure = packages__petitparser__src__parser__combinator__settable.src__parser__misc__failure;
  const group$ = Object.create(dart.library);
  const result$ = Object.create(dart.library);
  const builder = Object.create(dart.library);
  const $add = dartx.add;
  const $_get = dartx._get;
  const $isEmpty = dartx.isEmpty;
  const $first = dartx.first;
  const $last = dartx.last;
  const $length = dartx.length;
  const $fold = dartx.fold;
  let JSArrayOfParser = () => (JSArrayOfParser = dart.constFn(_interceptors.JSArray$(parser$.Parser)))();
  let JSArrayOfObject = () => (JSArrayOfObject = dart.constFn(_interceptors.JSArray$(core.Object)))();
  let ListOfObject = () => (ListOfObject = dart.constFn(core.List$(core.Object)))();
  let ListToObject = () => (ListToObject = dart.constFn(dart.fnType(core.Object, [core.List])))();
  let dynamicAnddynamicTodynamic = () => (dynamicAnddynamicTodynamic = dart.constFn(dart.fnType(dart.dynamic, [dart.dynamic, dart.dynamic])))();
  let ListTodynamic = () => (ListTodynamic = dart.constFn(dart.fnType(dart.dynamic, [core.List])))();
  let JSArrayOfExpressionGroup = () => (JSArrayOfExpressionGroup = dart.constFn(_interceptors.JSArray$(group$.ExpressionGroup)))();
  let dynamicAndExpressionGroupToParser = () => (dynamicAndExpressionGroupToParser = dart.constFn(dart.fnType(parser$.Parser, [dart.dynamic, group$.ExpressionGroup])))();
  const CT = Object.create(null);
  const _primitives = dart.privateName(group$, "_primitives");
  const _wrappers = dart.privateName(group$, "_wrappers");
  const _prefix = dart.privateName(group$, "_prefix");
  const _postfix = dart.privateName(group$, "_postfix");
  const _right = dart.privateName(group$, "_right");
  const _left = dart.privateName(group$, "_left");
  const _loopback$ = dart.privateName(group$, "_loopback");
  const _buildChoice = dart.privateName(group$, "_buildChoice");
  const _buildPrimitive = dart.privateName(group$, "_buildPrimitive");
  const _buildWrapper = dart.privateName(group$, "_buildWrapper");
  const _buildPrefix = dart.privateName(group$, "_buildPrefix");
  const _buildPostfix = dart.privateName(group$, "_buildPostfix");
  const _buildRight = dart.privateName(group$, "_buildRight");
  const _buildLeft = dart.privateName(group$, "_buildLeft");
  group$.ExpressionGroup = class ExpressionGroup extends core.Object {
    primitive(V, parser, action = null) {
      this[_primitives][$add](action != null ? map['MapParserExtension|map'](V, dart.dynamic, parser, action) : parser);
    }
    [_buildPrimitive](inner) {
      return this[_buildChoice](this[_primitives], inner);
    }
    wrapper(O, V, left, right, action = null) {
      action == null ? action = dart.fn((left, value, right) => JSArrayOfObject().of([left, value, right]), dart.fnType(ListOfObject(), [O, V, O])) : null;
      this[_wrappers][$add](map['MapParserExtension|map'](core.List, dart.dynamic, new sequence.SequenceParser.new(JSArrayOfParser().of([left, this[_loopback$], right])), dart.fn(value => action(O._check(value[$_get](0)), V._check(value[$_get](1)), O._check(value[$_get](2))), ListToObject())));
    }
    [_buildWrapper](inner) {
      return this[_buildChoice]((() => {
        let t0 = JSArrayOfParser().of([]);
        for (let t1 of this[_wrappers])
          t0[$add](t1);
        t0[$add](inner);
        return t0;
      })(), inner);
    }
    prefix(O, V, parser, action = null) {
      action == null ? action = dart.fn((operator, value) => JSArrayOfObject().of([operator, value]), dart.fnType(ListOfObject(), [O, V])) : null;
      this[_prefix][$add](map['MapParserExtension|map'](O, dart.dynamic, parser, dart.fn(operator => new result$.ExpressionResult.new(operator, action), dart.fnType(result$.ExpressionResult, [O]))));
    }
    [_buildPrefix](inner) {
      if (dart.test(this[_prefix][$isEmpty])) {
        return inner;
      } else {
        return map['MapParserExtension|map'](core.List, dart.dynamic, new sequence.SequenceParser.new(JSArrayOfParser().of([possesive['PossessiveRepeatingParserExtension|star'](dart.dynamic, this[_buildChoice](this[_prefix])), inner])), dart.fn(tuple => dart.dsend(dart.dload(tuple[$first], 'reversed'), 'fold', [tuple[$last], dart.fn((value, result) => {
            let expressionResult = result$.ExpressionResult._check(result);
            return dart.dsend(expressionResult, 'action', [expressionResult.operator, value]);
          }, dynamicAnddynamicTodynamic())]), ListTodynamic()));
      }
    }
    postfix(O, V, parser, action = null) {
      action == null ? action = dart.fn((value, operator) => JSArrayOfObject().of([value, operator]), dart.fnType(ListOfObject(), [V, O])) : null;
      this[_postfix][$add](map['MapParserExtension|map'](O, dart.dynamic, parser, dart.fn(operator => new result$.ExpressionResult.new(operator, action), dart.fnType(result$.ExpressionResult, [O]))));
    }
    [_buildPostfix](inner) {
      if (dart.test(this[_postfix][$isEmpty])) {
        return inner;
      } else {
        return map['MapParserExtension|map'](core.List, dart.dynamic, new sequence.SequenceParser.new(JSArrayOfParser().of([inner, possesive['PossessiveRepeatingParserExtension|star'](dart.dynamic, this[_buildChoice](this[_postfix]))])), dart.fn(tuple => dart.dsend(tuple[$last], 'fold', [tuple[$first], dart.fn((value, result) => {
            let expressionResult = result$.ExpressionResult._check(result);
            return dart.dsend(expressionResult, 'action', [value, expressionResult.operator]);
          }, dynamicAnddynamicTodynamic())]), ListTodynamic()));
      }
    }
    right(O, V, parser, action = null) {
      action == null ? action = dart.fn((left, operator, right) => JSArrayOfObject().of([left, operator, right]), dart.fnType(ListOfObject(), [V, O, V])) : null;
      this[_right][$add](map['MapParserExtension|map'](O, dart.dynamic, parser, dart.fn(operator => new result$.ExpressionResult.new(operator, action), dart.fnType(result$.ExpressionResult, [O]))));
    }
    [_buildRight](inner) {
      if (dart.test(this[_right][$isEmpty])) {
        return inner;
      } else {
        return map['MapParserExtension|map'](core.List, dart.dynamic, separated_by['SeparatedBy|separatedBy'](dart.dynamic, dart.dynamic, inner, this[_buildChoice](this[_right])), dart.fn(sequence => {
          let result = sequence[$last];
          for (let i = dart.notNull(sequence[$length]) - 2; i > 0; i = i - 2) {
            let expressionResult = result$.ExpressionResult._check(sequence[$_get](i));
            result = dart.dsend(expressionResult, 'action', [sequence[$_get](i - 1), expressionResult.operator, result]);
          }
          return result;
        }, ListTodynamic()));
      }
    }
    left(O, V, parser, action = null) {
      action == null ? action = dart.fn((left, operator, right) => JSArrayOfObject().of([left, operator, right]), dart.fnType(ListOfObject(), [V, O, V])) : null;
      this[_left][$add](map['MapParserExtension|map'](O, dart.dynamic, parser, dart.fn(operator => new result$.ExpressionResult.new(operator, action), dart.fnType(result$.ExpressionResult, [O]))));
    }
    [_buildLeft](inner) {
      if (dart.test(this[_left][$isEmpty])) {
        return inner;
      } else {
        return map['MapParserExtension|map'](core.List, dart.dynamic, separated_by['SeparatedBy|separatedBy'](dart.dynamic, dart.dynamic, inner, this[_buildChoice](this[_left])), dart.fn(sequence => {
          let result = sequence[$first];
          for (let i = 1; i < dart.notNull(sequence[$length]); i = i + 2) {
            let expressionResult = result$.ExpressionResult._check(sequence[$_get](i));
            result = dart.dsend(expressionResult, 'action', [result, expressionResult.operator, sequence[$_get](i + 1)]);
          }
          return result;
        }, ListTodynamic()));
      }
    }
    [_buildChoice](parsers, otherwise = null) {
      if (dart.test(parsers[$isEmpty])) {
        return otherwise;
      } else if (parsers[$length] === 1) {
        return parsers[$first];
      } else {
        return new choice.ChoiceParser.new(parsers);
      }
    }
    build(inner) {
      return this[_buildLeft](this[_buildRight](this[_buildPostfix](this[_buildPrefix](this[_buildWrapper](this[_buildPrimitive](inner))))));
    }
  };
  (group$.ExpressionGroup.new = function(_loopback) {
    this[_primitives] = JSArrayOfParser().of([]);
    this[_wrappers] = JSArrayOfParser().of([]);
    this[_prefix] = JSArrayOfParser().of([]);
    this[_postfix] = JSArrayOfParser().of([]);
    this[_right] = JSArrayOfParser().of([]);
    this[_left] = JSArrayOfParser().of([]);
    this[_loopback$] = _loopback;
    ;
  }).prototype = group$.ExpressionGroup.prototype;
  dart.addTypeTests(group$.ExpressionGroup);
  dart.setMethodSignature(group$.ExpressionGroup, () => ({
    __proto__: dart.getMethods(group$.ExpressionGroup.__proto__),
    primitive: dart.gFnType(V => [dart.void, [parser$.Parser$(V)], [dart.fnType(core.Object, [V])]]),
    [_buildPrimitive]: dart.fnType(parser$.Parser, [parser$.Parser]),
    wrapper: dart.gFnType((O, V) => [dart.void, [parser$.Parser$(O), parser$.Parser$(O)], [dart.fnType(core.Object, [O, V, O])]]),
    [_buildWrapper]: dart.fnType(parser$.Parser, [parser$.Parser]),
    prefix: dart.gFnType((O, V) => [dart.void, [parser$.Parser$(O)], [dart.fnType(core.Object, [O, V])]]),
    [_buildPrefix]: dart.fnType(parser$.Parser, [parser$.Parser]),
    postfix: dart.gFnType((O, V) => [dart.void, [parser$.Parser$(O)], [dart.fnType(core.Object, [V, O])]]),
    [_buildPostfix]: dart.fnType(parser$.Parser, [parser$.Parser]),
    right: dart.gFnType((O, V) => [dart.void, [parser$.Parser$(O)], [dart.fnType(core.Object, [V, O, V])]]),
    [_buildRight]: dart.fnType(parser$.Parser, [parser$.Parser]),
    left: dart.gFnType((O, V) => [dart.void, [parser$.Parser$(O)], [dart.fnType(core.Object, [V, O, V])]]),
    [_buildLeft]: dart.fnType(parser$.Parser, [parser$.Parser]),
    [_buildChoice]: dart.fnType(parser$.Parser, [core.List$(parser$.Parser)], [parser$.Parser]),
    build: dart.fnType(parser$.Parser, [parser$.Parser])
  }));
  dart.setLibraryUri(group$.ExpressionGroup, "package:petitparser/src/expression/group.dart");
  dart.setFieldSignature(group$.ExpressionGroup, () => ({
    __proto__: dart.getFields(group$.ExpressionGroup.__proto__),
    [_loopback$]: dart.finalFieldType(parser$.Parser),
    [_primitives]: dart.finalFieldType(core.List$(parser$.Parser)),
    [_wrappers]: dart.finalFieldType(core.List$(parser$.Parser)),
    [_prefix]: dart.finalFieldType(core.List$(parser$.Parser)),
    [_postfix]: dart.finalFieldType(core.List$(parser$.Parser)),
    [_right]: dart.finalFieldType(core.List$(parser$.Parser)),
    [_left]: dart.finalFieldType(core.List$(parser$.Parser))
  }));
  const operator$ = dart.privateName(result$, "ExpressionResult.operator");
  const action$ = dart.privateName(result$, "ExpressionResult.action");
  result$.ExpressionResult = class ExpressionResult extends core.Object {
    get operator() {
      return this[operator$];
    }
    set operator(value) {
      super.operator = value;
    }
    get action() {
      return this[action$];
    }
    set action(value) {
      super.action = value;
    }
  };
  (result$.ExpressionResult.new = function(operator, action) {
    this[operator$] = operator;
    this[action$] = action;
    ;
  }).prototype = result$.ExpressionResult.prototype;
  dart.addTypeTests(result$.ExpressionResult);
  dart.setLibraryUri(result$.ExpressionResult, "package:petitparser/src/expression/result.dart");
  dart.setFieldSignature(result$.ExpressionResult, () => ({
    __proto__: dart.getFields(result$.ExpressionResult.__proto__),
    operator: dart.finalFieldType(core.Object),
    action: dart.finalFieldType(core.Function)
  }));
  const _groups = dart.privateName(builder, "_groups");
  const _loopback = dart.privateName(builder, "_loopback");
  builder.ExpressionBuilder = class ExpressionBuilder extends core.Object {
    group() {
      let group = new group$.ExpressionGroup.new(this[_loopback]);
      this[_groups][$add](group);
      return group;
    }
    build() {
      let parser = this[_groups][$fold](parser$.Parser, failure.failure(dart.dynamic, "Highest priority group should define a primitive parser."), dart.fn((a, b) => b.build(parser$.Parser._check(a)), dynamicAndExpressionGroupToParser()));
      this[_loopback].set(parser);
      return parser;
    }
  };
  (builder.ExpressionBuilder.new = function() {
    this[_groups] = JSArrayOfExpressionGroup().of([]);
    this[_loopback] = settable.undefined(dart.dynamic);
    ;
  }).prototype = builder.ExpressionBuilder.prototype;
  dart.addTypeTests(builder.ExpressionBuilder);
  dart.setMethodSignature(builder.ExpressionBuilder, () => ({
    __proto__: dart.getMethods(builder.ExpressionBuilder.__proto__),
    group: dart.fnType(group$.ExpressionGroup, []),
    build: dart.fnType(parser$.Parser, [])
  }));
  dart.setLibraryUri(builder.ExpressionBuilder, "package:petitparser/src/expression/builder.dart");
  dart.setFieldSignature(builder.ExpressionBuilder, () => ({
    __proto__: dart.getFields(builder.ExpressionBuilder.__proto__),
    [_groups]: dart.finalFieldType(core.List$(group$.ExpressionGroup)),
    [_loopback]: dart.finalFieldType(settable.SettableParser)
  }));
  dart.trackLibraries("packages/petitparser/src/expression/builder", {
    "package:petitparser/src/expression/group.dart": group$,
    "package:petitparser/src/expression/result.dart": result$,
    "package:petitparser/src/expression/builder.dart": builder
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["group.dart","result.dart","builder.dart"],"names":[],"mappings":"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","file":"builder.ddc.js"}');
  // Exports:
  return {
    src__expression__group: group$,
    src__expression__result: result$,
    src__expression__builder: builder
  };
});

//# sourceMappingURL=builder.ddc.js.map
