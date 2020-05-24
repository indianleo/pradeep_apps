define(['dart_sdk', 'packages/xml/xml', 'packages/xml/src/xml/builder'], function(dart_sdk, packages__xml__xml, packages__xml__src__xml__builder) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const _interceptors = dart_sdk._interceptors;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const xml = packages__xml__xml.xml;
  const document = packages__xml__src__xml__builder.src__xml__nodes__document;
  const text = packages__xml__src__xml__builder.src__xml__nodes__text;
  const element = packages__xml__src__xml__builder.src__xml__nodes__element;
  const cdata = packages__xml__src__xml__builder.src__xml__nodes__cdata;
  const processing = packages__xml__src__xml__builder.src__xml__nodes__processing;
  const xml2json = Object.create(dart.library);
  const $toString = dartx.toString;
  const $_get = dartx._get;
  const $_set = dartx._set;
  const $containsKey = dartx.containsKey;
  const $isEmpty = dartx.isEmpty;
  const $replaceAll = dartx.replaceAll;
  const $indexOf = dartx.indexOf;
  const $keys = dartx.keys;
  const $trim = dartx.trim;
  const $split = dartx.split;
  const $length = dartx.length;
  let JSArrayOfMap = () => (JSArrayOfMap = dart.constFn(_interceptors.JSArray$(core.Map)))();
  let IdentityMapOfString$String = () => (IdentityMapOfString$String = dart.constFn(_js_helper.IdentityMap$(core.String, core.String)))();
  let dynamicAndMapAnddynamicTovoid = () => (dynamicAndMapAnddynamicTovoid = dart.constFn(dart.fnType(dart.void, [dart.dynamic, core.Map, dart.dynamic])))();
  let dynamicAnddynamicAnddynamicTovoid = () => (dynamicAnddynamicAnddynamicTovoid = dart.constFn(dart.fnType(dart.void, [dart.dynamic, dart.dynamic, dart.dynamic])))();
  let ListOfString = () => (ListOfString = dart.constFn(core.List$(core.String)))();
  const CT = Object.create(null);
  const _result = dart.privateName(xml2json, "_result");
  xml2json.Xml2Json = class Xml2Json extends core.Object {
    get xmlParserResult() {
      return this[_result];
    }
    parse(xmlString) {
      this[_result] = null;
      let xmlStringPrep = xml2json._Xml2JsonUtils.prepareXmlString(xmlString);
      try {
        this[_result] = xml.parse(xmlStringPrep);
      } catch (e) {
        let ex = dart.getThrown(e);
        dart.throw(new xml2json.Xml2JsonException.new("parse error - invalid XML"));
      }
    }
    toBadgerfish() {
      if (this[_result] == null) {
        dart.throw(new xml2json.Xml2JsonException.new("toBadgerfish - no parse result"));
      }
      let json = null;
      let badgerfishTransformer = new xml2json._Xml2JsonBadgerfish.new();
      try {
        json = badgerfishTransformer.transform(this[_result]);
      } catch (e$) {
        let e = dart.getThrown(e$);
        if (core.Exception.is(e)) {
          dart.throw(new xml2json.Xml2JsonException.new("toBadgerfish error => " + dart.str(dart.toString(e))));
        } else
          throw e$;
      }
      return json;
    }
    toParker() {
      if (this[_result] == null) {
        dart.throw(new xml2json.Xml2JsonException.new("toParker - no parse result"));
      }
      let json = null;
      let parkerTransformer = new xml2json._Xml2JsonParker.new();
      try {
        json = parkerTransformer.transform(this[_result]);
      } catch (e$) {
        let e = dart.getThrown(e$);
        if (core.Exception.is(e)) {
          dart.throw(new xml2json.Xml2JsonException.new("toParker error => " + dart.str(dart.toString(e))));
        } else
          throw e$;
      }
      return json;
    }
    toGData() {
      if (this[_result] == null) {
        dart.throw(new xml2json.Xml2JsonException.new("toGData - no parse result"));
      }
      let json = null;
      let gDataTransformer = new xml2json._Xml2JsonGData.new();
      try {
        json = gDataTransformer.transform(this[_result]);
      } catch (e$) {
        let e = dart.getThrown(e$);
        if (core.Exception.is(e)) {
          dart.throw(new xml2json.Xml2JsonException.new("toGData error => " + dart.str(dart.toString(e))));
        } else
          throw e$;
      }
      return json;
    }
  };
  (xml2json.Xml2Json.new = function() {
    this[_result] = null;
    ;
  }).prototype = xml2json.Xml2Json.prototype;
  dart.addTypeTests(xml2json.Xml2Json);
  dart.setMethodSignature(xml2json.Xml2Json, () => ({
    __proto__: dart.getMethods(xml2json.Xml2Json.__proto__),
    parse: dart.fnType(dart.void, [core.String]),
    toBadgerfish: dart.fnType(core.String, []),
    toParker: dart.fnType(core.String, []),
    toGData: dart.fnType(core.String, [])
  }));
  dart.setGetterSignature(xml2json.Xml2Json, () => ({
    __proto__: dart.getGetters(xml2json.Xml2Json.__proto__),
    xmlParserResult: document.XmlDocument
  }));
  dart.setLibraryUri(xml2json.Xml2Json, "package:xml2json/xml2json.dart");
  dart.setFieldSignature(xml2json.Xml2Json, () => ({
    __proto__: dart.getFields(xml2json.Xml2Json.__proto__),
    [_result]: dart.fieldType(document.XmlDocument)
  }));
  const _message$ = dart.privateName(xml2json, "_message");
  xml2json.Xml2JsonException = class Xml2JsonException extends core.Object {
    toString() {
      return "Xml2JsonException: message = " + dart.str(this[_message$]);
    }
  };
  (xml2json.Xml2JsonException.new = function(_message = "No Message Supplied") {
    this[_message$] = _message;
    ;
  }).prototype = xml2json.Xml2JsonException.prototype;
  dart.addTypeTests(xml2json.Xml2JsonException);
  xml2json.Xml2JsonException[dart.implements] = () => [core.Exception];
  dart.setLibraryUri(xml2json.Xml2JsonException, "package:xml2json/xml2json.dart");
  dart.setFieldSignature(xml2json.Xml2JsonException, () => ({
    __proto__: dart.getFields(xml2json.Xml2JsonException.__proto__),
    [_message$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(xml2json.Xml2JsonException, ['toString']);
  const _marker = dart.privateName(xml2json, "_marker");
  const _xmlnsPrefix = dart.privateName(xml2json, "_xmlnsPrefix");
  const _cdata = dart.privateName(xml2json, "_cdata");
  const _transform = dart.privateName(xml2json, "_transform");
  xml2json._Xml2JsonBadgerfish = class _Xml2JsonBadgerfish extends core.Object {
    [_transform](node) {
      let json = new _js_helper.LinkedMap.new();
      const _process = (node, obj, ns) => {
        if (text.XmlText.is(node)) {
          let sanitisedNodeData = xml2json._Xml2JsonUtils.escapeTextForJson(node.text);
          let nodeData = "\"" + dart.str(sanitisedNodeData) + "\"";
          if (core.List.is(obj[$_get](dart.str(this[_marker])))) {
            dart.dsend(obj[$_get](dart.str(this[_marker])), 'add', [nodeData]);
          } else if (core.Map.is(obj[$_get](dart.str(this[_marker])))) {
            obj[$_set](dart.str(this[_marker]), [obj[$_get](dart.str(this[_marker])), nodeData]);
          } else {
            obj[$_set](dart.str(this[_marker]), nodeData);
          }
        } else if (element.XmlElement.is(node)) {
          let p = new _js_helper.LinkedMap.new();
          let nodeName = "\"" + dart.str(node.name) + "\"";
          for (let i = 0; i < dart.notNull(node.attributes.length); i = i + 1) {
            let attr = node.attributes._get(i);
            let name = dart.dload(dart.dload(attr, 'name'), 'qualified');
            let value = dart.dload(attr, 'value');
            if (dart.equals(name, "xmlns")) {
              dart.dsend(ns, '_set', [dart.str(this[_marker]), "\"" + dart.str(value) + "\""]);
            } else if (dart.equals(dart.dsend(name, 'indexOf', ["xmlns:"]), 0)) {
              let namePrefix = core.String._check(dart.dsend(name, 'substring', [dart.dsend(dart.dsend(name, 'indexOf', [":"]), '+', [1])]));
              namePrefix = "\"" + dart.str(namePrefix) + "\"";
              dart.dsend(ns, '_set', [namePrefix, "\"" + dart.str(value) + "\""]);
            } else {
              let indexName = "\"@" + dart.str(name) + "\"";
              p[$_set](indexName, "\"" + dart.str(value) + "\"");
            }
          }
          if (dart.dtest(dart.dload(ns, 'isNotEmpty'))) {
            for (let t5 of core.Iterable._check(dart.dload(ns, 'keys'))) {
              let prefix = core.String._check(t5);
              if (!dart.test(p[$containsKey](this[_xmlnsPrefix]))) {
                let pList = JSArrayOfMap().of([]);
                p[$_set](this[_xmlnsPrefix], pList);
              }
              let nameMap = new (IdentityMapOfString$String()).new();
              nameMap[$_set](prefix, core.String._check(dart.dsend(ns, '_get', [prefix])));
              dart.dsend(p[$_get](this[_xmlnsPrefix]), 'add', [nameMap]);
            }
          }
          if (core.List.is(obj[$_get](nodeName))) {
            dart.dsend(obj[$_get](nodeName), 'add', [p]);
          } else if (core.Map.is(obj[$_get](nodeName))) {
            obj[$_set](nodeName, [obj[$_get](nodeName), p]);
          } else {
            obj[$_set](nodeName, p);
          }
          for (let j = 0; j < dart.notNull(node.children.length); j = j + 1) {
            _process(node.children._get(j), p, new _js_helper.LinkedMap.new());
          }
        } else if (cdata.XmlCDATA.is(node)) {
          let sanitisedNodeData = xml2json._Xml2JsonUtils.escapeTextForJson(node.text);
          let nodeData = "\"" + dart.str(sanitisedNodeData) + "\"";
          obj[$_set](dart.str(this[_cdata]), nodeData);
        } else if (document.XmlDocument.is(node)) {
          for (let k = 0; k < dart.notNull(node.children.length); k = k + 1) {
            _process(node.children._get(k), obj, new _js_helper.LinkedMap.new());
          }
        }
      };
      dart.fn(_process, dynamicAndMapAnddynamicTovoid());
      _process(node, json, new _js_helper.LinkedMap.new());
      return json;
    }
    transform(xmlNode) {
      let json = null;
      try {
        json = this[_transform](xmlNode);
      } catch (e$) {
        let e = dart.getThrown(e$);
        if (core.Exception.is(e)) {
          dart.throw(new xml2json.Xml2JsonException.new("Badgerfish internal transform error => " + dart.str(dart.toString(e))));
        } else
          throw e$;
      }
      return dart.toString(json);
    }
  };
  (xml2json._Xml2JsonBadgerfish.new = function() {
    this[_marker] = "\"$\"";
    this[_xmlnsPrefix] = "\"@xmlns\"";
    this[_cdata] = "\"__cdata\"";
    ;
  }).prototype = xml2json._Xml2JsonBadgerfish.prototype;
  dart.addTypeTests(xml2json._Xml2JsonBadgerfish);
  dart.setMethodSignature(xml2json._Xml2JsonBadgerfish, () => ({
    __proto__: dart.getMethods(xml2json._Xml2JsonBadgerfish.__proto__),
    [_transform]: dart.fnType(core.Map, [document.XmlDocument]),
    transform: dart.fnType(core.String, [document.XmlDocument])
  }));
  dart.setLibraryUri(xml2json._Xml2JsonBadgerfish, "package:xml2json/xml2json.dart");
  dart.setFieldSignature(xml2json._Xml2JsonBadgerfish, () => ({
    __proto__: dart.getFields(xml2json._Xml2JsonBadgerfish.__proto__),
    [_marker]: dart.finalFieldType(core.String),
    [_xmlnsPrefix]: dart.finalFieldType(core.String),
    [_cdata]: dart.finalFieldType(core.String)
  }));
  xml2json._Xml2JsonParker = class _Xml2JsonParker extends core.Object {
    [_transform](node, objin) {
      let obj = core.Map._check(objin);
      if (element.XmlElement.is(node)) {
        let nodeName = "\"" + dart.str(node.name.qualified) + "\"";
        if (core.List.is(obj[$_get](nodeName))) {
          dart.dsend(obj[$_get](nodeName), 'add', [new _js_helper.LinkedMap.new()]);
          obj = core.Map._check(dart.dload(obj[$_get](nodeName), 'last'));
        } else if (core.Map.is(obj[$_get](nodeName))) {
          obj[$_set](nodeName, [obj[$_get](nodeName), new _js_helper.LinkedMap.new()]);
          obj = core.Map._check(dart.dload(obj[$_get](nodeName), 'last'));
        } else {
          if (dart.test(node.children.isNotEmpty)) {
            if (text.XmlText.is(node.children._get(0))) {
              let sanitisedNodeData = xml2json._Xml2JsonUtils.escapeTextForJson(node.children._get(0).text);
              let nodeData = "\"" + dart.str(sanitisedNodeData) + "\"";
              if (nodeData[$isEmpty]) {
                nodeData = null;
              }
              obj[$_set](nodeName, nodeData);
            } else if (cdata.XmlCDATA.is(node.children._get(0))) {
              let sanitisedNodeData = xml2json._Xml2JsonUtils.escapeTextForJson(node.children._get(0).text);
              let nodeData = "\"" + dart.str(sanitisedNodeData) + "\"";
              if (nodeData[$isEmpty]) {
                nodeData = null;
              }
              obj[$_set](nodeName, nodeData);
            } else {
              obj[$_set](nodeName, new _js_helper.LinkedMap.new());
              obj = core.Map._check(obj[$_get](nodeName));
            }
          } else {
            obj[$_set](nodeName, null);
          }
        }
        for (let j = 0; j < dart.notNull(node.children.length); j = j + 1) {
          this[_transform](node.children._get(j), obj);
        }
      } else if (document.XmlDocument.is(node)) {
        for (let j = 0; j < dart.notNull(node.children.length); j = j + 1) {
          this[_transform](node.children._get(j), obj);
        }
      }
      return obj;
    }
    transform(xmlNode) {
      let json = null;
      try {
        json = this[_transform](xmlNode, new _js_helper.LinkedMap.new());
      } catch (e$) {
        let e = dart.getThrown(e$);
        if (core.Exception.is(e)) {
          dart.throw(new xml2json.Xml2JsonException.new("Parker internal transform error => " + dart.str(dart.toString(e))));
        } else
          throw e$;
      }
      return dart.toString(json);
    }
  };
  (xml2json._Xml2JsonParker.new = function() {
    ;
  }).prototype = xml2json._Xml2JsonParker.prototype;
  dart.addTypeTests(xml2json._Xml2JsonParker);
  dart.setMethodSignature(xml2json._Xml2JsonParker, () => ({
    __proto__: dart.getMethods(xml2json._Xml2JsonParker.__proto__),
    [_transform]: dart.fnType(core.Map, [dart.dynamic, dart.dynamic]),
    transform: dart.fnType(core.String, [document.XmlDocument])
  }));
  dart.setLibraryUri(xml2json._Xml2JsonParker, "package:xml2json/xml2json.dart");
  xml2json._Xml2JsonGData = class _Xml2JsonGData extends core.Object {
    [_transform](node) {
      let json = new _js_helper.LinkedMap.new();
      const _process = (node, obj, ns) => {
        if (text.XmlText.is(node)) {
          let sanitisedNodeData = xml2json._Xml2JsonUtils.escapeTextForJson(node.text);
          let nodeData = "\"" + dart.str(sanitisedNodeData) + "\"";
          if (core.List.is(dart.dsend(obj, '_get', [dart.str(this[_marker])]))) {
            dart.dsend(dart.dsend(obj, '_get', [dart.str(this[_marker])]), 'add', [nodeData]);
          } else if (core.Map.is(dart.dsend(obj, '_get', [dart.str(this[_marker])]))) {
            dart.dsend(obj, '_set', [dart.str(this[_marker]), [dart.dsend(obj, '_get', [dart.str(this[_marker])]), nodeData]]);
          } else {
            dart.dsend(obj, '_set', [dart.str(this[_marker]), nodeData]);
          }
        } else if (element.XmlElement.is(node)) {
          let p = new _js_helper.LinkedMap.new();
          let nodeName = "\"" + dart.str(node.name) + "\"";
          nodeName = nodeName[$replaceAll](":", "$");
          for (let i = 0; i < dart.notNull(node.attributes.length); i = i + 1) {
            let attr = node.attributes._get(i);
            let name = attr.name.qualified;
            let value = attr.value;
            if (name === "xmlns") {
              dart.dsend(ns, '_set', ["\"" + dart.str(name) + "\"", "\"" + dart.str(value) + "\""]);
            } else if (name[$indexOf]("xmlns:") === 0) {
              let namePrefix = name[$replaceAll](":", "$");
              namePrefix = "\"" + namePrefix + "\"";
              dart.dsend(ns, '_set', [namePrefix, "\"" + dart.str(value) + "\""]);
            } else {
              let indexName = "\"" + dart.str(name) + "\"";
              p[$_set](indexName, "\"" + dart.str(value) + "\"");
            }
          }
          if (dart.dtest(dart.dload(ns, 'isNotEmpty'))) {
            for (let t8 of core.Iterable._check(dart.dload(ns, 'keys'))) {
              let prefix = core.String._check(t8);
              if (!dart.test(p[$containsKey](this[_xmlnsPrefix]))) {
                let pList = [new _js_helper.LinkedMap.new()];
                p[$_set](this[_xmlnsPrefix], pList);
              }
              p[$_set](prefix, dart.dsend(ns, '_get', [prefix]));
            }
          }
          if (core.List.is(dart.dsend(obj, '_get', [nodeName]))) {
            dart.dsend(dart.dsend(obj, '_get', [nodeName]), 'add', [p]);
          } else if (core.Map.is(dart.dsend(obj, '_get', [nodeName]))) {
            dart.dsend(obj, '_set', [nodeName, [dart.dsend(obj, '_get', [nodeName]), p]]);
          } else {
            dart.dsend(obj, '_set', [nodeName, p]);
          }
          for (let j = 0; j < dart.notNull(node.children.length); j = j + 1) {
            _process(node.children._get(j), p, new _js_helper.LinkedMap.new());
          }
        } else if (document.XmlDocument.is(node)) {
          for (let k = 0; k < dart.notNull(node.children.length); k = k + 1) {
            _process(node.children._get(k), obj, new _js_helper.LinkedMap.new());
          }
        } else if (cdata.XmlCDATA.is(node)) {
          let sanitisedNodeData = xml2json._Xml2JsonUtils.escapeTextForJson(node.text);
          let nodeData = "\"" + dart.str(sanitisedNodeData) + "\"";
          dart.dsend(obj, '_set', [dart.str(this[_cdata]), nodeData]);
        } else if (processing.XmlProcessing.is(node)) {
          let processingString = node.text;
          let nodeMap = xml2json._Xml2JsonUtils.mapProcessingNode(processingString);
          for (let i of nodeMap[$keys]) {
            let index = "\"" + dart.str(i) + "\"";
            let sanitisedNodeData = xml2json._Xml2JsonUtils.escapeTextForJson(nodeMap[$_get](i));
            let nodeData = "\"" + dart.str(sanitisedNodeData) + "\"";
            dart.dsend(obj, '_set', [index, nodeData]);
          }
        }
      };
      dart.fn(_process, dynamicAnddynamicAnddynamicTovoid());
      _process(node, json, new _js_helper.LinkedMap.new());
      return json;
    }
    transform(xmlNode) {
      let json = null;
      try {
        json = this[_transform](xmlNode);
      } catch (e$) {
        let e = dart.getThrown(e$);
        if (core.Exception.is(e)) {
          dart.throw(new xml2json.Xml2JsonException.new("GData internal transform error => " + dart.str(dart.toString(e))));
        } else
          throw e$;
      }
      return dart.toString(json);
    }
  };
  (xml2json._Xml2JsonGData.new = function() {
    this[_marker] = "\"$t\"";
    this[_xmlnsPrefix] = "\"xmlns\"";
    this[_cdata] = "\"__cdata\"";
    ;
  }).prototype = xml2json._Xml2JsonGData.prototype;
  dart.addTypeTests(xml2json._Xml2JsonGData);
  dart.setMethodSignature(xml2json._Xml2JsonGData, () => ({
    __proto__: dart.getMethods(xml2json._Xml2JsonGData.__proto__),
    [_transform]: dart.fnType(core.Map, [document.XmlDocument]),
    transform: dart.fnType(core.String, [document.XmlDocument])
  }));
  dart.setLibraryUri(xml2json._Xml2JsonGData, "package:xml2json/xml2json.dart");
  dart.setFieldSignature(xml2json._Xml2JsonGData, () => ({
    __proto__: dart.getFields(xml2json._Xml2JsonGData.__proto__),
    [_marker]: dart.finalFieldType(core.String),
    [_xmlnsPrefix]: dart.finalFieldType(core.String),
    [_cdata]: dart.finalFieldType(core.String)
  }));
  xml2json._Xml2JsonUtils = class _Xml2JsonUtils extends core.Object {
    static escapeTextForJson(text) {
      let text1 = text[$replaceAll]("\n", "\\\\n");
      text1 = text1[$replaceAll]("'", "\\\\'");
      text1 = text1[$replaceAll]("\"", "\\\"");
      text1 = text1[$replaceAll]("&", "\\\\&");
      text1 = text1[$replaceAll]("\r", "\\\\r");
      text1 = text1[$replaceAll]("\t", "\\\\t");
      text1 = text1[$replaceAll]("\b", "\\\\f");
      return text1;
    }
    static mapProcessingNode(text) {
      let nodeMap = new (IdentityMapOfString$String()).new();
      let text1 = text[$trim]();
      text1 = text1[$replaceAll]("\"", "");
      let properties = text1[$split](" ");
      for (let element of properties) {
        let elementList = ListOfString()._check(dart.dsend(element, 'split', ["="]));
        if (elementList[$length] === 2) {
          nodeMap[$_set](elementList[$_get](0), elementList[$_get](1));
        }
      }
      return nodeMap;
    }
    static prepareXmlString(xmlString) {
      let xmlString1 = xmlString[$trim]();
      xmlString1 = xmlString1[$replaceAll](">\n", ">");
      let regex = core.RegExp.new(">\\s*<");
      return xmlString1 = xmlString1[$replaceAll](regex, "><");
    }
  };
  (xml2json._Xml2JsonUtils.new = function() {
    ;
  }).prototype = xml2json._Xml2JsonUtils.prototype;
  dart.addTypeTests(xml2json._Xml2JsonUtils);
  dart.setLibraryUri(xml2json._Xml2JsonUtils, "package:xml2json/xml2json.dart");
  dart.trackLibraries("packages/xml2json/xml2json", {
    "package:xml2json/xml2json.dart": xml2json
  }, {
    "package:xml2json/xml2json.dart": ["src/xml2json.dart", "src/xml2json_exception.dart", "src/xml2json_badgerfish.dart", "src/xml2json_parker.dart", "src/xml2json_gdata.dart", "src/xml2json_utils.dart"]
  }, '{"version":3,"sourceRoot":"","sources":["src/xml2json.dart","src/xml2json_exception.dart","src/xml2json_badgerfish.dart","src/xml2json_parker.dart","src/xml2json_gdata.dart","src/xml2json_utils.dart"],"names":[],"mappings":"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","file":"xml2json.ddc.js"}');
  // Exports:
  return {
    xml2json: xml2json
  };
});

//# sourceMappingURL=xml2json.ddc.js.map
