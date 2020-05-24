define(['dart_sdk', 'packages/flutter_web/animation', 'packages/xml2json/xml2json', 'packages/html/dom', 'packages/flutter_web/material'], function(dart_sdk, packages__flutter_web__animation, packages__xml2json__xml2json, packages__html__dom, packages__flutter_web__material) {
  'use strict';
  const core = dart_sdk.core;
  const convert = dart_sdk.convert;
  const html = dart_sdk.html;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter_web__animation.src__widgets__framework;
  const basic = packages__flutter_web__animation.src__widgets__basic;
  const container = packages__flutter_web__animation.src__widgets__container;
  const text = packages__flutter_web__animation.src__widgets__text;
  const widget_inspector = packages__flutter_web__animation.src__widgets__widget_inspector;
  const xml2json = packages__xml2json__xml2json.xml2json;
  const parser = packages__html__dom.parser;
  const scaffold = packages__flutter_web__material.src__material__scaffold;
  const fill_in_the_blanks = Object.create(dart.library);
  const $console = dartx.console;
  const $length = dartx.length;
  const $add = dartx.add;
  let JSArrayOfWidget = () => (JSArrayOfWidget = dart.constFn(_interceptors.JSArray$(framework.Widget)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 23,
        [_Location_line]: 123,
        [_Location_file]: null
      });
    },
    get C1() {
      return C1 = dart.constList([C2 || CT.C2], widget_inspector._Location);
    },
    get C0() {
      return C0 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C1 || CT.C1,
        [_Location_name]: null,
        [_Location_column]: 18,
        [_Location_line]: 123,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/fill_in_the_blanks.dart"
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 11,
        [_Location_line]: 123,
        [_Location_file]: null
      });
    },
    get C4() {
      return C4 = dart.constList([C5 || CT.C5], widget_inspector._Location);
    },
    get C3() {
      return C3 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C4 || CT.C4,
        [_Location_name]: null,
        [_Location_column]: 9,
        [_Location_line]: 122,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/fill_in_the_blanks.dart"
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 15,
        [_Location_line]: 121,
        [_Location_file]: null
      });
    },
    get C7() {
      return C7 = dart.constList([C8 || CT.C8], widget_inspector._Location);
    },
    get C6() {
      return C6 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C7 || CT.C7,
        [_Location_name]: null,
        [_Location_column]: 11,
        [_Location_line]: 121,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/fill_in_the_blanks.dart"
      });
    },
    get C11() {
      return C11 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "children",
        [_Location_column]: 9,
        [_Location_line]: 134,
        [_Location_file]: null
      });
    },
    get C10() {
      return C10 = dart.constList([C11 || CT.C11], widget_inspector._Location);
    },
    get C9() {
      return C9 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C10 || CT.C10,
        [_Location_name]: null,
        [_Location_column]: 13,
        [_Location_line]: 133,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/fill_in_the_blanks.dart"
      });
    },
    get C14() {
      return C14 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "body",
        [_Location_column]: 7,
        [_Location_line]: 133,
        [_Location_file]: null
      });
    },
    get C13() {
      return C13 = dart.constList([C14 || CT.C14], widget_inspector._Location);
    },
    get C12() {
      return C12 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: C13 || CT.C13,
        [_Location_name]: null,
        [_Location_column]: 16,
        [_Location_line]: 132,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/items/fill_in_the_blanks.dart"
      });
    }
  });
  const itemData$ = dart.privateName(fill_in_the_blanks, "FillintheBlanks.itemData");
  fill_in_the_blanks.FillintheBlanks = class FillintheBlanks extends framework.StatefulWidget {
    get itemData() {
      return this[itemData$];
    }
    set itemData(value) {
      super.itemData = value;
    }
    createState() {
      return new fill_in_the_blanks._FillintheBlanks.new({itemData: this.itemData});
    }
  };
  (fill_in_the_blanks.FillintheBlanks.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let itemData = opts && 'itemData' in opts ? opts.itemData : null;
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    this[itemData$] = itemData;
    fill_in_the_blanks.FillintheBlanks.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = fill_in_the_blanks.FillintheBlanks.prototype;
  dart.addTypeTests(fill_in_the_blanks.FillintheBlanks);
  dart.setMethodSignature(fill_in_the_blanks.FillintheBlanks, () => ({
    __proto__: dart.getMethods(fill_in_the_blanks.FillintheBlanks.__proto__),
    createState: dart.fnType(framework.State$(framework.StatefulWidget), [])
  }));
  dart.setLibraryUri(fill_in_the_blanks.FillintheBlanks, "package:test_flutter/view/items/fill_in_the_blanks.dart");
  dart.setFieldSignature(fill_in_the_blanks.FillintheBlanks, () => ({
    __proto__: dart.getFields(fill_in_the_blanks.FillintheBlanks.__proto__),
    itemData: dart.finalFieldType(dart.dynamic)
  }));
  const _Location_parameterLocations = dart.privateName(widget_inspector, "_Location.parameterLocations");
  const _Location_name = dart.privateName(widget_inspector, "_Location.name");
  const _Location_column = dart.privateName(widget_inspector, "_Location.column");
  const _Location_line = dart.privateName(widget_inspector, "_Location.line");
  const _Location_file = dart.privateName(widget_inspector, "_Location.file");
  let C2;
  let C1;
  let C0;
  let C5;
  let C4;
  let C3;
  let C8;
  let C7;
  let C6;
  let C11;
  let C10;
  let C9;
  let C14;
  let C13;
  let C12;
  fill_in_the_blanks._FillintheBlanks = class _FillintheBlanks extends framework.State$(fill_in_the_blanks.FillintheBlanks) {
    initState() {
      super.initState();
      let htmlElem = "<h1>Hello Pradeep <i class='testing'> this can be true </i> asbdkjasas dbas kjdajk </h1>";
      let documentTemp = parser.parse(htmlElem);
      this.parseXml();
    }
    parseXml() {
      if (!dart.equals(dart.dsend(this.itemData, '_get', ["qxml"]), "null")) {
        this.qxml = dart.dsend(dart.dsend(this.itemData, '_get', ["qxml"]), 'replaceAll', ["--", ""]);
        this.xml2json.parse(core.String._check(this.qxml));
        this.qxml = this.xml2json.toGData();
        this.qxml = convert.json.decode(core.String._check(this.qxml));
        this.createModule();
      }
    }
    createModule() {
      this.cdata = core.String._check(dart.dsend(dart.dsend(dart.dsend(this.qxml, '_get', ["smxml"]), '_get', ["text"]), '_get', ["__cdata"]));
      this.dragData = "";
      this.duplicates = [];
      this.dragID = 0;
      this.matchtype = dart.dsend(dart.dsend(dart.dsend(this.qxml, '_get', ["smxml"]), '_get', ["text"]), '_get', ["_matchtype"]);
      this.ignoretype = dart.dsend(dart.dsend(dart.dsend(this.qxml, '_get', ["smxml"]), '_get', ["text"]), '_get', ["_ignoretype"]);
      this.multiple = dart.equals(dart.dsend(dart.dsend(dart.dsend(this.qxml, '_get', ["smxml"]), '_get', ["text"]), '_get', ["_multiple"]), "multiple") ? "1" : "";
      this.manualGrade = 0;
      let answerReg = core.RegExp.new("%{[sS]*?}%");
      let answerKey = answerReg.allMatches(this.cdata);
      let answerType = "";
      let checkType = [];
      let uaXMLNew = "";
      let totalMarks = 0;
      html.window[$console].log(answerKey[$length]);
      for (let answer of answerKey) {
        core.print(answer);
      }
    }
    getReg(pattern, caseSens) {
      let regExp = core.RegExp.new(pattern, {caseSensitive: caseSens, multiLine: true});
      return regExp;
    }
    parseUxml() {
    }
    loadModule() {
      let i = 1;
      let opt = JSArrayOfWidget().of([]);
      opt[$add](new basic.Row.new({children: JSArrayOfWidget().of([new container.Container.new({child: new text.Text.new("Fib module", {$creationLocationd_0dea112b090073317d4: C0 || CT.C0}), $creationLocationd_0dea112b090073317d4: C3 || CT.C3})]), $creationLocationd_0dea112b090073317d4: C6 || CT.C6}));
      return opt;
    }
    build(context) {
      return new scaffold.Scaffold.new({body: new basic.Column.new({children: this.loadModule(), $creationLocationd_0dea112b090073317d4: C9 || CT.C9}), $creationLocationd_0dea112b090073317d4: C12 || CT.C12});
    }
  };
  (fill_in_the_blanks._FillintheBlanks.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let itemData = opts && 'itemData' in opts ? opts.itemData : null;
    this.qxml = null;
    this.uxml = null;
    this.isReview = 0;
    this.cdata = "";
    this.dragData = "";
    this.duplicates = [];
    this.dragID = 0;
    this.errorCatchFlag = 1;
    this.ajax_eId = "";
    this.fillMath = [];
    this.matchtype = null;
    this.ignoretype = null;
    this.multiple = null;
    this.manualGrade = 0;
    this.xml2json = new xml2json.Xml2Json.new();
    this.itemData = itemData;
    fill_in_the_blanks._FillintheBlanks.__proto__.new.call(this);
    ;
  }).prototype = fill_in_the_blanks._FillintheBlanks.prototype;
  dart.addTypeTests(fill_in_the_blanks._FillintheBlanks);
  dart.setMethodSignature(fill_in_the_blanks._FillintheBlanks, () => ({
    __proto__: dart.getMethods(fill_in_the_blanks._FillintheBlanks.__proto__),
    parseXml: dart.fnType(dart.void, []),
    createModule: dart.fnType(dart.void, []),
    getReg: dart.fnType(core.RegExp, [core.String, core.bool]),
    parseUxml: dart.fnType(dart.void, []),
    loadModule: dart.fnType(core.List$(framework.Widget), []),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setLibraryUri(fill_in_the_blanks._FillintheBlanks, "package:test_flutter/view/items/fill_in_the_blanks.dart");
  dart.setFieldSignature(fill_in_the_blanks._FillintheBlanks, () => ({
    __proto__: dart.getFields(fill_in_the_blanks._FillintheBlanks.__proto__),
    itemData: dart.fieldType(dart.dynamic),
    qxml: dart.fieldType(dart.dynamic),
    uxml: dart.fieldType(dart.dynamic),
    isReview: dart.fieldType(core.int),
    cdata: dart.fieldType(core.String),
    dragData: dart.fieldType(core.String),
    duplicates: dart.fieldType(core.List),
    dragID: dart.fieldType(core.int),
    errorCatchFlag: dart.fieldType(core.int),
    ajax_eId: dart.fieldType(core.String),
    fillMath: dart.fieldType(core.List),
    matchtype: dart.fieldType(dart.dynamic),
    ignoretype: dart.fieldType(dart.dynamic),
    multiple: dart.fieldType(dart.dynamic),
    manualGrade: dart.fieldType(core.int),
    xml2json: dart.fieldType(xml2json.Xml2Json)
  }));
  dart.trackLibraries("packages/test_flutter/view/items/fill_in_the_blanks", {
    "package:test_flutter/view/items/fill_in_the_blanks.dart": fill_in_the_blanks
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["fill_in_the_blanks.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IAOS;;;;;;;AAI+B,oEAA0B;IAAS;;;QAH7C;QAAoB;;;AAAa,sEAAW,GAAG;;EAAC;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA0BzD,MAAX;AAIF,qBAAW;AACX,yBAAe,aAAM,QAAQ;AACvB,MAAV;IACF;;AAGE,uBAAW,WAAR,wBAAS,UAAW;AAEsB,QAA3C,YAAwB,WAAT,WAAR,wBAAS,yBAAmB,MAAK;AACpB,QAApB,AAAS,uCAAM;AACW,QAA1B,YAAQ,AAAS;AACO,QAAxB,YAAO,AAAK,uCAAO;AACL,QAAd;;IAEJ;;AAI0C,mBAAxC,mBAA6B,WAAR,WAAT,WAAJ,oBAAK,oBAAS,mBAAQ;AACjB,MAAb,gBAAW;AACE,MAAf,kBAAa;AACH,MAAV,cAAS;AACsC,MAA/C,iBAAiC,WAAR,WAAT,WAAJ,oBAAK,oBAAS,mBAAQ;AACe,MAAjD,kBAAkC,WAAR,WAAT,WAAJ,oBAAK,oBAAS,mBAAQ;AACmC,MAAtE,gBAA+C,YAAd,WAAR,WAAT,WAAJ,oBAAK,oBAAS,mBAAQ,eAAgB,cAAa,MAAK;AACnD,MAAf,mBAAc;AACV,sBAAgB,gBAAO;AACL,sBAAY,AAAU,SAAD,YAAY;AACrD,uBAAa;AACb,sBAAY;AACZ,qBAAW;AACX,uBAAa;AACqB,MAApC,AAAO,AAAQ,0BAAI,AAAU,SAAD;AAC5B,eAAQ,SAAU,UAAS;AACZ,QAAb,WAAM,MAAM;;IAGhB;WAEqB,SAAc;AAC1B,mBAAa,gBAClB,OAAO,kBACQ,QAAQ,aACZ;AAGb,YAAO,OAAM;IACf;;IAIA;;AAIM,cAAI;AACK,gBAAU;AA+BtB,MAND,AAAI,GAAD,OACG,6BAAsB,sBACxB,oCACS,kBAAK;AAIlB,YAAO,IAAG;IACZ;UAG0B;AACxB,YAAW,kCACH,gCACM;IAGhB;;;QAzGsB;QAAoB;IAftC;IACA;IACA,gBAAW;IACX,aAAQ;IACR,gBAAW;IACX,kBAAa;IACb,cAAS;IACT,sBAAiB;IACjB,gBAAW;IACX,gBAAW;IACX;IACA;IACA;IACA,mBAAc;IACT,gBAAe;IACkB;AAA1C;;EAAoD","file":"fill_in_the_blanks.ddc.js"}');
  // Exports:
  return {
    view__items__fill_in_the_blanks: fill_in_the_blanks
  };
});

//# sourceMappingURL=fill_in_the_blanks.ddc.js.map
