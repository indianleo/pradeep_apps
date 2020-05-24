define(['dart_sdk', 'packages/flutter_web/animation', 'packages/xml2json/xml2json', 'packages/test_flutter/view/items/fill_in_the_blanks', 'packages/test_flutter/view/items/multiple_choice', 'packages/test_flutter/view/items/item_test'], function(dart_sdk, packages__flutter_web__animation, packages__xml2json__xml2json, packages__test_flutter__view__items__fill_in_the_blanks, packages__test_flutter__view__items__multiple_choice, packages__test_flutter__view__items__item_test) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const html = dart_sdk.html;
  const convert = dart_sdk.convert;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const framework = packages__flutter_web__animation.src__widgets__framework;
  const widget_inspector = packages__flutter_web__animation.src__widgets__widget_inspector;
  const text = packages__flutter_web__animation.src__widgets__text;
  const container = packages__flutter_web__animation.src__widgets__container;
  const xml2json = packages__xml2json__xml2json.xml2json;
  const fill_in_the_blanks = packages__test_flutter__view__items__fill_in_the_blanks.view__items__fill_in_the_blanks;
  const multiple_choice = packages__test_flutter__view__items__multiple_choice.view__items__multiple_choice;
  const item_test = packages__test_flutter__view__items__item_test.view__items__item_test;
  const plugin_interface = Object.create(dart.library);
  const $_set = dartx._set;
  const $_get = dartx._get;
  let IdentityMapOfString$Object = () => (IdentityMapOfString$Object = dart.constFn(_js_helper.IdentityMap$(core.String, core.Object)))();
  let MapOfString$Object = () => (MapOfString$Object = dart.constFn(core.Map$(core.String, core.Object)))();
  let JSArrayOfMapOfString$Object = () => (JSArrayOfMapOfString$Object = dart.constFn(_interceptors.JSArray$(MapOfString$Object())))();
  let MapOfString$dynamic = () => (MapOfString$dynamic = dart.constFn(core.Map$(core.String, dart.dynamic)))();
  let JSArrayOfMapOfString$dynamic = () => (JSArrayOfMapOfString$dynamic = dart.constFn(_interceptors.JSArray$(MapOfString$dynamic())))();
  let IdentityMapOfString$dynamic = () => (IdentityMapOfString$dynamic = dart.constFn(_js_helper.IdentityMap$(core.String, dart.dynamic)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C2() {
      return C2 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemData",
        [_Location_column]: 13,
        [_Location_line]: 81,
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
        [_Location_column]: 23,
        [_Location_line]: 80,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/plugin_interface.dart"
      });
    },
    get C5() {
      return C5 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "itemData",
        [_Location_column]: 13,
        [_Location_line]: 86,
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
        [_Location_column]: 24,
        [_Location_line]: 85,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/plugin_interface.dart"
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "data",
        [_Location_column]: 51,
        [_Location_line]: 89,
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
        [_Location_column]: 46,
        [_Location_line]: 89,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/plugin_interface.dart"
      });
    },
    get C11() {
      return C11 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "title",
        [_Location_column]: 35,
        [_Location_line]: 89,
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
        [_Location_column]: 26,
        [_Location_line]: 89,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/plugin_interface.dart"
      });
    },
    get C14() {
      return C14 = dart.const({
        __proto__: widget_inspector._Location.prototype,
        [_Location_parameterLocations]: null,
        [_Location_name]: "child",
        [_Location_column]: 9,
        [_Location_line]: 115,
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
        [_Location_line]: 114,
        [_Location_file]: "org-dartlang-app:///packages/test_flutter/view/plugin_interface.dart"
      });
    }
  });
  plugin_interface.PluginInterface = class PluginInterface extends framework.StatefulWidget {
    createState() {
      return new plugin_interface._PluginInterfaceState.new();
    }
  };
  (plugin_interface.PluginInterface.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    let $36creationLocationd_0dea112b090073317d4 = opts && '$creationLocationd_0dea112b090073317d4' in opts ? opts.$creationLocationd_0dea112b090073317d4 : null;
    plugin_interface.PluginInterface.__proto__.new.call(this, {key: key, $creationLocationd_0dea112b090073317d4: $36creationLocationd_0dea112b090073317d4});
    ;
  }).prototype = plugin_interface.PluginInterface.prototype;
  dart.addTypeTests(plugin_interface.PluginInterface);
  dart.setMethodSignature(plugin_interface.PluginInterface, () => ({
    __proto__: dart.getMethods(plugin_interface.PluginInterface.__proto__),
    createState: dart.fnType(framework.State$(framework.StatefulWidget), [])
  }));
  dart.setLibraryUri(plugin_interface.PluginInterface, "package:test_flutter/view/plugin_interface.dart");
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
  plugin_interface._PluginInterfaceState = class _PluginInterfaceState extends framework.State$(plugin_interface.PluginInterface) {
    initState() {
      super.initState();
      let node = html.document.querySelector("#output");
      this.moduleData[$_set]("content_subtype", "0");
      switch (this.moduleData[$_get]("content_subtype")) {
        case "9":
        {
          if (html.window.localStorage[$_get]("content_guid") !== "null") {
            this.moduleData[$_set]("qxml", html.window.localStorage[$_get]("qxml"));
            this.moduleData[$_set]("uxml", html.window.localStorage[$_get]("uxml"));
            this.moduleData[$_set]("is_review", html.window.localStorage[$_get]("is_review"));
            this.moduleData[$_set]("content_guid", html.window.localStorage[$_get]("content_guid"));
          } else {
            this.moduleData[$_set]("qxml", "<smxml xmlns=\"http://www.w3.org/1999/xhtml\" type=\"9\" name=\"FillInTheBlank\"><text matchtype=\"1\" ignoretype=\"0\"><!--[CDATA[The %{auto,acl,*automount|s}% command is used to manage mount points for autofs, the %{inlined|d}% Linux automounter. It works by reading the auto.master map and sets up %{mount|d}% points for each entry in the %{master|d}% map, allowing them to be automatically %{mounted|d}% when accessed.]]--></text></smxml>");
            this.moduleData[$_set]("uxml", "null");
          }
          break;
        }
        case "0":
        {
          if (html.window.localStorage[$_get]("content_guid") !== "null") {
            this.moduleData[$_set]("total_answer", html.window.localStorage[$_get]("total_answer"));
            this.moduleData[$_set]("options", convert.json.decode(html.window.localStorage[$_get]("options")));
            this.moduleData[$_set]("question", html.window.localStorage[$_get]("question"));
          } else {
            this.moduleData[$_set]("total_answer", 4);
            this.moduleData[$_set]("options", JSArrayOfMapOfString$Object().of([new (IdentityMapOfString$Object()).from(["answer", "option 1", "is_correct", 0, "id", 1]), new (IdentityMapOfString$Object()).from(["answer", "option 2", "is_correct", 1, "id", 2]), new (IdentityMapOfString$Object()).from(["answer", "option 3", "is_correct", 0, "id", 3]), new (IdentityMapOfString$Object()).from(["answer", "option 4", "is_correct", 0, "id", 4])]));
          }
          break;
        }
        default:
        {
          core.print("Not Module Found");
        }
      }
      this.loadModule();
    }
    loadModule() {
      if (!dart.equals(this.moduleData, "null")) {
        switch (this.moduleData[$_get]("content_subtype")) {
          case "9":
          {
            this.scene = new fill_in_the_blanks.FillintheBlanks.new({itemData: this.moduleData, $creationLocationd_0dea112b090073317d4: C0 || CT.C0});
            break;
          }
          case "0":
          {
            this.scene = new multiple_choice.MulitpleChoice.new({itemData: this.moduleData, $creationLocationd_0dea112b090073317d4: C3 || CT.C3});
            break;
          }
          default:
          {
            this.scene = new item_test.ItemTest.new({title: new text.Text.new("Subtype not Found", {$creationLocationd_0dea112b090073317d4: C6 || CT.C6}), $creationLocationd_0dea112b090073317d4: C9 || CT.C9});
          }
        }
      } else {
        core.print(this.moduleData);
      }
    }
    createAnswers() {
      let answers = JSArrayOfMapOfString$dynamic().of([]);
      answers = JSArrayOfMapOfString$dynamic().of([new (IdentityMapOfString$dynamic()).from(["answer", "option 1", "is_correct", 0]), new (IdentityMapOfString$dynamic()).from(["answer", "option 2", "is_correct", 1])]);
      return answers;
    }
    build(context) {
      return new container.Container.new({child: this.scene, $creationLocationd_0dea112b090073317d4: C12 || CT.C12});
    }
  };
  (plugin_interface._PluginInterfaceState.new = function(opts) {
    let key = opts && 'key' in opts ? opts.key : null;
    this.moduleData = new _js_helper.LinkedMap.new();
    this.scene = null;
    this.xml2json = new xml2json.Xml2Json.new();
    plugin_interface._PluginInterfaceState.__proto__.new.call(this);
    ;
  }).prototype = plugin_interface._PluginInterfaceState.prototype;
  dart.addTypeTests(plugin_interface._PluginInterfaceState);
  dart.setMethodSignature(plugin_interface._PluginInterfaceState, () => ({
    __proto__: dart.getMethods(plugin_interface._PluginInterfaceState.__proto__),
    loadModule: dart.fnType(dart.void, []),
    createAnswers: dart.fnType(dart.dynamic, []),
    build: dart.fnType(framework.Widget, [framework.BuildContext])
  }));
  dart.setLibraryUri(plugin_interface._PluginInterfaceState, "package:test_flutter/view/plugin_interface.dart");
  dart.setFieldSignature(plugin_interface._PluginInterfaceState, () => ({
    __proto__: dart.getFields(plugin_interface._PluginInterfaceState.__proto__),
    moduleData: dart.fieldType(core.Map),
    scene: dart.fieldType(framework.Widget),
    xml2json: dart.fieldType(xml2json.Xml2Json)
  }));
  dart.trackLibraries("packages/test_flutter/view/plugin_interface", {
    "package:test_flutter/view/plugin_interface.dart": plugin_interface
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["plugin_interface.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAayC;IAAuB;;;QAHnC;;AAAQ,oEAAW,GAAG;;EAAC;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAa/B,MAAX;AACF,iBAAO,AAAS,4BAAc;AAEC,MAAnC,AAAU,uBAAC,mBAAqB;AAChC,cAAO,AAAU,uBAAC;;;AAEd,cAAI,AAAO,AAAY,gCAAC,oBAAmB;AACO,YAAhD,AAAU,uBAAC,QAAU,AAAO,AAAY,gCAAC;AACO,YAAhD,AAAU,uBAAC,QAAU,AAAO,AAAY,gCAAC;AACiB,YAA1D,AAAU,uBAAC,aAAe,AAAO,AAAY,gCAAC;AACkB,YAAhE,AAAU,uBAAC,gBAAkB,AAAO,AAAY,gCAAC;;AAEsZ,YAAvc,AAAU,uBAAC,QAAU;AACM,YAA3B,AAAU,uBAAC,QAAU;;AAEzB;;;;AAEE,cAAI,AAAO,AAAY,gCAAC,oBAAmB;AACuB,YAAhE,AAAU,uBAAC,gBAAkB,AAAO,AAAY,gCAAC;AACkB,YAAnE,AAAU,uBAAC,WAAa,AAAK,oBAAO,AAAO,AAAY,gCAAC;AACA,YAAxD,AAAU,uBAAC,YAAc,AAAO,AAAY,gCAAC;;AAEf,YAA9B,AAAU,uBAAC,gBAAkB;AAsB5B,YArBD,AAAU,uBAAC,WAAa,kCACtB,yCACI,UAAS,YACT,cAAe,GACf,MAAM,KAEV,yCACI,UAAS,YACT,cAAe,GACf,MAAK,KAET,yCACI,UAAS,YACT,cAAe,GACf,MAAK,KAET,yCACI,UAAS,YACT,cAAe,GACf,MAAK;;AAIf;;;;AACkC,UAAzB,WAAM;;;AAEL,MAAZ;IACF;;AAGE,uBAAG,iBAAc;AACf,gBAAO,AAAU,uBAAC;;;AAIb,YAFD,aAAY,sDACA;AAEd;;;;AAIG,YAFD,aAAa,kDACD;AAEd;;;;AACgE,YAAvD,aAAQ,mCAAoB,kBAAK;;;;AAG3B,QAAjB,WAAM;;IAEV;;AAE6B,oBAAQ;AAWlC,MATD,UAAU,mCACR,0CACI,UAAS,YACT,cAAe,KAEnB,0CACI,UAAS,YACT,cAAe;AAGrB,YAAO,QAAO;IAChB;UAG0B;AAExB,YAAW,qCACA;IAEb;;;QAhG2B;IAHvB,kBAAa;IACV;IACE,gBAAe;AACxB;;EAAgC","file":"plugin_interface.ddc.js"}');
  // Exports:
  return {
    view__plugin_interface: plugin_interface
  };
});

//# sourceMappingURL=plugin_interface.ddc.js.map
