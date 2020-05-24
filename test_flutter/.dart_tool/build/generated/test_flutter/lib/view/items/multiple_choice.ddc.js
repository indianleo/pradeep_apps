define(['dart_sdk', 'packages/flutter_web/animation', 'packages/flutter_web/material'], function(dart_sdk, packages__flutter_web__animation, packages__flutter_web__material) {
  'use strict';
  const core = dart_sdk.core;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter_web__animation.src__widgets__framework;
  const basic = packages__flutter_web__animation.src__widgets__basic;
  const container = packages__flutter_web__animation.src__widgets__container;
  const edge_insets = packages__flutter_web__animation.src__painting__edge_insets;
  const widget_inspector = packages__flutter_web__animation.src__widgets__widget_inspector;
  const text = packages__flutter_web__animation.src__widgets__text;
  const colors = packages__flutter_web__material.src__material__colors;
  const radio = packages__flutter_web__material.src__material__radio;
  const scaffold = packages__flutter_web__material.src__material__scaffold;
  const multiple_choice = Object.create(dart.library);
  const $add = dartx.add;
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  let RadioOfint = () => (RadioOfint = dart.constFn(radio.Radio$(core.int)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "value",
        [_Location_column]: 19,
        [_Location_line]: 54,
        [_Location_file]: null
      });
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "groupValue",
        [_Location_column]: 19,
        [_Location_line]: 55,
        [_Location_file]: null
      });
    },
    get C4() {
      return C4 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "onChanged",
        [_Location_column]: 19,
        [_Location_line]: 56,
        [_Location_file]: null
      });
    },
    get C1() {
      return C1 = dart.constList([C2 || CT.C2, C3 || CT.C3, C4 || CT.C4], widget_inspector._Location);
    },
    get C0() {
      return C0 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C1 || CT.C1,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 53,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/multiple_choice.dart"
      });
    },
    get C7() {
      return C7 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 17,
        [_Location_line]: 51,
        [_Location_file]: null
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "margin",
        [_Location_column]: 17,
        [_Location_line]: 52,
        [_Location_file]: null
      });
    },
    get C9() {
      return C9 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 53,
        [_Location_file]: null
      });
    },
    get C6() {
      return C6 = dart.constList([C7 || CT.C7, C8 || CT.C8, C9 || CT.C9], widget_inspector._Location);
    },
    get C5() {
      return C5 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C6 || CT.C6,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 50,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/multiple_choice.dart"
      });
    },
    get C12() {
      return C12 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 37,
        [_Location_line]: 62,
        [_Location_file]: null
      });
    },
    get C11() {
      return C11 = dart.constList([C12 || CT.C12], widget_inspector._Location);
    },
    get C10() {
      return C10 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C11 || CT.C11,
        [_Location_name]: null,
        [_Location_column]: 28,
        [_Location_line]: 62,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/multiple_choice.dart"
      });
    },
    get C15() {
      return C15 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "color",
        [_Location_column]: 17,
        [_Location_line]: 60,
        [_Location_file]: null
      });
    },
    get C16() {
      return C16 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "margin",
        [_Location_column]: 17,
        [_Location_line]: 61,
        [_Location_file]: null
      });
    },
    get C17() {
      return C17 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 17,
        [_Location_line]: 62,
        [_Location_file]: null
      });
    },
    get C14() {
      return C14 = dart.constList([C15 || CT.C15, C16 || CT.C16, C17 || CT.C17], widget_inspector._Location);
    },
    get C13() {
      return C13 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C14 || CT.C14,
        [_Location_name]: null,
        [_Location_column]: 15,
        [_Location_line]: 59,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/multiple_choice.dart"
      });
    },
    get C20() {
      return C20 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 13,
        [_Location_line]: 49,
        [_Location_file]: null
      });
    },
    get C19() {
      return C19 = dart.constList([C20 || CT.C20], widget_inspector._Location);
    },
    get C18() {
      return C18 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C19 || CT.C19,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 48,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/multiple_choice.dart"
      });
    },
    get C23() {
      return C23 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 9,
        [_Location_line]: 77,
        [_Location_file]: null
      });
    },
    get C22() {
      return C22 = dart.constList([C23 || CT.C23], widget_inspector._Location);
    },
    get C21() {
      return C21 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C22 || CT.C22,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 76,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/multiple_choice.dart"
      });
    },
    get C26() {
      return C26 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 7,
        [_Location_line]: 76,
        [_Location_file]: null
      });
    },
    get C25() {
      return C25 = dart.constList([C26 || CT.C26], widget_inspector._Location);
    },
    get C24() {
      return C24 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C25 || CT.C25,
        [_Location_name]: null,
        [_Location_column]: 16,
        [_Location_line]: 75,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/multiple_choice.dart"
      });
    }
  });
  const itemData$ = dart.privateName(multiple_choice, "MulitpleChoice.itemData");
  multiple_choice.MulitpleChoice = class MulitpleChoice extends framework.StatefulWidget {
    get itemData() {
      return this[itemData$];
    }
    set itemData(value) {
      super.itemData = value;
    }
    createState() {
      return new multiple_choice._MultipleChoiceState.new({itemData: this.itemData});
    }
  };
  (multiple_choice.MulitpleChoice.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let itemData = opts && 'itemData' in opts ? opts.itemData : null;
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[itemData$] = itemData;
    multiple_choice.MulitpleChoice.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = multiple_choice.MulitpleChoice.prototype;
  dart.addTypeTests(multiple_choice.MulitpleChoice);
  dart.setMethodSignature(multiple_choice.MulitpleChoice, () => ({
    __proto__: dart.getMethods(multiple_choice.MulitpleChoice.__proto__),
    createState: dart.fnType(framework.State$(framework.StatefulWidget), [])
  }));
  dart.setLibraryUri(multiple_choice.MulitpleChoice, "package:test_flutter/view/items/multiple_choice.dart");
  dart.setFieldSignature(multiple_choice.MulitpleChoice, () => ({
    __proto__: dart.getFields(multiple_choice.MulitpleChoice.__proto__),
    itemData: dart.finalFieldType(dart.dynamic)
  }));
  const _radioValue = dart.privateName(multiple_choice, "_radioValue");
  const _radioModule = dart.privateName(multiple_choice, "_radioModule");
  const _handleRadioChange = dart.privateName(multiple_choice, "_handleRadioChange");
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C3;
  let C4;
  let C1;
  let C0;
  let C7;
  let C8;
  let C9;
  let C6;
  let C5;
  let C12;
  let C11;
  let C10;
  let C15;
  let C16;
  let C17;
  let C14;
  let C13;
  let C20;
  let C19;
  let C18;
  let C23;
  let C22;
  let C21;
  let C26;
  let C25;
  let C24;
  multiple_choice._MultipleChoiceState = class _MultipleChoiceState extends framework.State$(multiple_choice.MulitpleChoice) {
    initState() {
      super.initState();
      this.loadModule();
    }
    [_handleRadioChange](value) {
      this.setState(dart.fn(() => {
        this[_radioValue] = value;
      }, VoidToNull()));
    }
    parseXml() {
    }
    parseUxml() {
    }
    loadModule() {
      let i = 1;
      let opt = JSArrayOfWidget().of([]);
      for (let item of core.Iterable._check(dart.dsend(this.itemData, '_get', ["options"]))) {
        opt[$add](new basic.Row.new({children: JSArrayOfWidget().of([new container.Container.new({color: colors.Colors.white70, margin: new edge_insets.EdgeInsets.all(0.25), child: new (RadioOfint()).new({value: i, groupValue: this[_radioValue], onChanged: dart.bind(this, _handleRadioChange), $creationLocationd_0dea112b090073317d4: C0 || CT.C0}), $creationLocationd_0dea112b090073317d4: C5 || CT.C5}), new container.Container.new({color: colors.Colors.white38, margin: new edge_insets.EdgeInsets.all(0.08), child: new text.Text.new(core.String._check(dart.dsend(item, '_get', ["answer"])), {$creationLocationd_0dea112b090073317d4: C10 || CT.C10}), $creationLocationd_0dea112b090073317d4: C13 || CT.C13})]), $creationLocationd_0dea112b090073317d4: C18 || CT.C18}));
        i = i + 1;
      }
      return opt;
    }
    build(context) {
      return new scaffold.Scaffold.new({body: new basic.Column.new({children: this.loadModule(), $creationLocationd_0dea112b090073317d4: C21 || CT.C21}), $creationLocationd_0dea112b090073317d4: C24 || CT.C24});
    }
  };
  (multiple_choice._MultipleChoiceState.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let itemData = opts && 'itemData' in opts ? opts.itemData : null;
    this[_radioValue] = -1;
    this[_radioModule] = [];
    this.itemData = itemData;
    multiple_choice._MultipleChoiceState.__proto__.new.call(this);
    ;
  }).prototype = multiple_choice._MultipleChoiceState.prototype;
  dart.addTypeTests(multiple_choice._MultipleChoiceState);
  dart.setMethodSignature(multiple_choice._MultipleChoiceState, () => ({
    __proto__: dart.getMethods(multiple_choice._MultipleChoiceState.__proto__),
    [_handleRadioChange]: dart.fnType(dart.void, [core.int]),
    parseXml: dart.fnType(dart.void, []),
    parseUxml: dart.fnType(dart.void, []),
    loadModule: dart.fnType(core.List$(framework.Widget), []),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setLibraryUri(multiple_choice._MultipleChoiceState, "package:test_flutter/view/items/multiple_choice.dart");
  dart.setFieldSignature(multiple_choice._MultipleChoiceState, () => ({
    __proto__: dart.getFields(multiple_choice._MultipleChoiceState.__proto__),
    itemData: dart.fieldType(dart.dynamic),
    [_radioValue]: dart.fieldType(core.int),
    [_radioModule]: dart.fieldType(core.List)
  }));
  dart.trackLibraries("packages/test_flutter/view/items/multiple_choice", {
    "package:test_flutter/view/items/multiple_choice.dart": multiple_choice
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["multiple_choice.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAIQ;;;;;;;AAQgC,qEAA8B;IAAS;;;QALvE;QACW;;;AACZ,kEAAW,GAAG;;EAAC;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAcD,MAAX;AACM,MAAZ;IACF;yBAE4B;AAGvB,MAFF,cAAS;AACW,QAAnB,oBAAc,KAAK;;IAEvB;;IAIA;;IAIA;;AAIM,cAAI;AACK,gBAAU;AACvB,eAAQ,6BAAgB,WAAR,wBAAS;AAoBtB,QAnBD,AAAI,GAAD,OACG,6BACkB,sBAChB,oCACe,+BACM,+BAAI,cACZ,+BACF,CAAC,cACI,wCACD,yIAGf,oCACe,+BACM,+BAAI,cACZ,qCAAS,WAAJ,IAAI,WAAC;AAK5B,QAAH,IAAA,AAAC,CAAA;;AAGH,YAAO,IAAG;IACZ;UAG0B;AACxB,YAAW,kCACH,gCACM;IAGhB;;;QA7D0B;QAAoB;IAC1C,oBAAc,CAAC;IACf,qBAAe;IAF2B;AAA9C;;EAAwD","file":"multiple_choice.ddc.js"}');
  // Exports:
  return {
    view__items__multiple_choice: multiple_choice
  };
});

//# sourceMappingURL=multiple_choice.ddc.js.map
