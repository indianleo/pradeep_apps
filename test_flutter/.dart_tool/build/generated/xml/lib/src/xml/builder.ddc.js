define(['dart_sdk', 'packages/collection/src/canonicalized_map', 'packages/petitparser/src/context/context', 'packages/petitparser/src/parser/action/cast', 'packages/petitparser/src/parser/repeater/separated_by', 'packages/petitparser/src/definition/grammar'], function(dart_sdk, packages__collection__src__canonicalized_map, packages__petitparser__src__context__context, packages__petitparser__src__parser__action__cast, packages__petitparser__src__parser__repeater__separated_by, packages__petitparser__src__definition__grammar) {
  'use strict';
  const core = dart_sdk.core;
  const _js_helper = dart_sdk._js_helper;
  const _interceptors = dart_sdk._interceptors;
  const collection = dart_sdk.collection;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const wrappers = packages__collection__src__canonicalized_map.src__wrappers;
  const map = packages__petitparser__src__context__context.src__parser__action__map;
  const token$ = packages__petitparser__src__context__context.src__core__token;
  const sequence = packages__petitparser__src__context__context.src__parser__combinator__sequence;
  const choice = packages__petitparser__src__context__context.src__parser__combinator__choice;
  const possesive = packages__petitparser__src__context__context.src__parser__repeater__possesive;
  const any = packages__petitparser__src__context__context.src__parser__predicate__any;
  const optional = packages__petitparser__src__context__context.src__parser__combinator__optional;
  const token = packages__petitparser__src__context__context.src__parser__action__token;
  const parser = packages__petitparser__src__context__context.src__core__parser;
  const result = packages__petitparser__src__context__context.src__context__result;
  const context = packages__petitparser__src__context__context.src__context__context;
  const cast = packages__petitparser__src__parser__action__cast.src__parser__action__cast;
  const eof = packages__petitparser__src__parser__action__cast.src__parser__misc__eof;
  const string = packages__petitparser__src__parser__action__cast.src__parser__predicate__string;
  const pick = packages__petitparser__src__parser__action__cast.src__parser__action__pick;
  const flatten = packages__petitparser__src__parser__action__cast.src__parser__action__flatten;
  const lazy = packages__petitparser__src__parser__action__cast.src__parser__repeater__lazy;
  const whitespace = packages__petitparser__src__parser__action__cast.src__parser__character__whitespace;
  const pattern = packages__petitparser__src__parser__action__cast.src__parser__character__pattern;
  const separated_by = packages__petitparser__src__parser__repeater__separated_by.src__parser__repeater__separated_by;
  const grammar = packages__petitparser__src__definition__grammar.src__definition__grammar;
  const builder = Object.create(dart.library);
  const transformer = Object.create(dart.library);
  const visitor = Object.create(dart.library);
  const visitable = Object.create(dart.library);
  const name$ = Object.create(dart.library);
  const writable = Object.create(dart.library);
  const writer = Object.create(dart.library);
  const token$0 = Object.create(dart.library);
  const text$ = Object.create(dart.library);
  const data = Object.create(dart.library);
  const parent = Object.create(dart.library);
  const node$ = Object.create(dart.library);
  const cdata = Object.create(dart.library);
  const node_type = Object.create(dart.library);
  const attribute$ = Object.create(dart.library);
  const element = Object.create(dart.library);
  const node_list = Object.create(dart.library);
  const owned = Object.create(dart.library);
  const exceptions = Object.create(dart.library);
  const document = Object.create(dart.library);
  const doctype = Object.create(dart.library);
  const named = Object.create(dart.library);
  const name_matcher = Object.create(dart.library);
  const attribute_type = Object.create(dart.library);
  const normalizer = Object.create(dart.library);
  const document_fragment = Object.create(dart.library);
  const preceding = Object.create(dart.library);
  const following = Object.create(dart.library);
  const descendants = Object.create(dart.library);
  const ancestors = Object.create(dart.library);
  const processing = Object.create(dart.library);
  const comment = Object.create(dart.library);
  const entity_mapping = Object.create(dart.library);
  const pretty_writer = Object.create(dart.library);
  const default_mapping = Object.create(dart.library);
  const named_entities = Object.create(dart.library);
  const simple_name = Object.create(dart.library);
  const prefix_name = Object.create(dart.library);
  const entities = Object.create(dart.library);
  const grammar$ = Object.create(dart.library);
  const production = Object.create(dart.library);
  const character_data_parser = Object.create(dart.library);
  const null_mapping = Object.create(dart.library);
  const parser$ = Object.create(dart.library);
  const cache = Object.create(dart.library);
  const $last = dartx.last;
  const $isNotEmpty = dartx.isNotEmpty;
  const $removeLast = dartx.removeLast;
  const $toString = dartx.toString;
  const $add = dartx.add;
  const $forEach = dartx.forEach;
  const $firstWhere = dartx.firstWhere;
  const $remove = dartx.remove;
  const $containsKey = dartx.containsKey;
  const $_get = dartx._get;
  const $any = dartx.any;
  const $values = dartx.values;
  const $_set = dartx._set;
  const $lastWhere = dartx.lastWhere;
  const $isEmpty = dartx.isEmpty;
  const $indexOf = dartx.indexOf;
  const $substring = dartx.substring;
  const $hashCode = dartx.hashCode;
  const $first = dartx.first;
  const $where = dartx.where;
  const $map = dartx.map;
  const $join = dartx.join;
  const $length = dartx.length;
  const $_equals = dartx._equals;
  const $whereType = dartx.whereType;
  const $addAll = dartx.addAll;
  const $contains = dartx.contains;
  const $removeAt = dartx.removeAt;
  const $iterator = dartx.iterator;
  const $clear = dartx.clear;
  const $reversed = dartx.reversed;
  const $sublist = dartx.sublist;
  const $codeUnitAt = dartx.codeUnitAt;
  const $trim = dartx.trim;
  const $replaceAllMapped = dartx.replaceAllMapped;
  const $keys = dartx.keys;
  let ListOfXmlNodeBuilder = () => (ListOfXmlNodeBuilder = dart.constFn(core.List$(builder.XmlNodeBuilder)))();
  let XmlAttributeTobool = () => (XmlAttributeTobool = dart.constFn(dart.fnType(core.bool, [attribute$.XmlAttribute])))();
  let StringAndNamespaceDataToNull = () => (StringAndNamespaceDataToNull = dart.constFn(dart.fnType(core.Null, [core.String, builder.NamespaceData])))();
  let XmlNodeBuilderTobool = () => (XmlNodeBuilderTobool = dart.constFn(dart.fnType(core.bool, [builder.XmlNodeBuilder])))();
  let NamespaceDataTobool = () => (NamespaceDataTobool = dart.constFn(dart.fnType(core.bool, [builder.NamespaceData])))();
  let VoidTobottom = () => (VoidTobottom = dart.constFn(dart.fnType(dart.bottom, [])))();
  let IdentityMapOfString$NamespaceData = () => (IdentityMapOfString$NamespaceData = dart.constFn(_js_helper.IdentityMap$(core.String, builder.NamespaceData)))();
  let JSArrayOfXmlNode = () => (JSArrayOfXmlNode = dart.constFn(_interceptors.JSArray$(node$.XmlNode)))();
  let JSArrayOfXmlAttribute = () => (JSArrayOfXmlAttribute = dart.constFn(_interceptors.JSArray$(attribute$.XmlAttribute)))();
  let XmlNodeTobool = () => (XmlNodeTobool = dart.constFn(dart.fnType(core.bool, [node$.XmlNode])))();
  let XmlNodeToString = () => (XmlNodeToString = dart.constFn(dart.fnType(core.String, [node$.XmlNode])))();
  let XmlNodeListOfXmlNode = () => (XmlNodeListOfXmlNode = dart.constFn(node_list.XmlNodeList$(node$.XmlNode)))();
  let XmlNodeListOfXmlAttribute = () => (XmlNodeListOfXmlAttribute = dart.constFn(node_list.XmlNodeList$(attribute$.XmlAttribute)))();
  let VoidToNull = () => (VoidToNull = dart.constFn(dart.fnType(core.Null, [])))();
  let XmlNamedTobool = () => (XmlNamedTobool = dart.constFn(dart.fnType(core.bool, [named.XmlNamed])))();
  let MatchToString = () => (MatchToString = dart.constFn(dart.fnType(core.String, [core.Match])))();
  let dynamicToList = () => (dynamicToList = dart.constFn(dart.fnType(core.List, [dart.dynamic])))();
  let ListOfString = () => (ListOfString = dart.constFn(core.List$(core.String)))();
  let IterableOfXmlNode = () => (IterableOfXmlNode = dart.constFn(core.Iterable$(node$.XmlNode)))();
  let ListOfXmlAttribute = () => (ListOfXmlAttribute = dart.constFn(core.List$(attribute$.XmlAttribute)))();
  const CT = Object.create(null);
  dart.defineLazy(CT, {
    get C0() {
      return C0 = dart.constMap(core.String, core.String, []);
    },
    get C2() {
      return C2 = dart.constMap(core.String, core.String, ["amp", "&", "apos", "'", "gt", ">", "lt", "<", "quot", "\""]);
    },
    get C1() {
      return C1 = dart.const({
        __proto__: default_mapping.XmlDefaultEntityMapping.prototype,
        [XmlDefaultEntityMapping_entities]: C2 || CT.C2
      });
    },
    get C3() {
      return C3 = dart.constList([], node$.XmlNode);
    },
    get C4() {
      return C4 = dart.constList([], attribute$.XmlAttribute);
    },
    get C5() {
      return C5 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.ELEMENT",
        index: 0
      });
    },
    get C6() {
      return C6 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.ATTRIBUTE",
        index: 1
      });
    },
    get C7() {
      return C7 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.TEXT",
        index: 2
      });
    },
    get C8() {
      return C8 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.CDATA",
        index: 3
      });
    },
    get C9() {
      return C9 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.PROCESSING",
        index: 4
      });
    },
    get C10() {
      return C10 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.COMMENT",
        index: 5
      });
    },
    get C11() {
      return C11 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.DOCUMENT",
        index: 6
      });
    },
    get C12() {
      return C12 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.DOCUMENT_FRAGMENT",
        index: 7
      });
    },
    get C13() {
      return C13 = dart.const({
        __proto__: node_type.XmlNodeType.prototype,
        [_name$]: "XmlNodeType.DOCUMENT_TYPE",
        index: 8
      });
    },
    get C14() {
      return C14 = dart.constList([C5 || CT.C5, C6 || CT.C6, C7 || CT.C7, C8 || CT.C8, C9 || CT.C9, C10 || CT.C10, C11 || CT.C11, C12 || CT.C12, C13 || CT.C13], node_type.XmlNodeType);
    },
    get C15() {
      return C15 = dart.const({
        __proto__: attribute_type.XmlAttributeType.prototype,
        [_name$0]: "XmlAttributeType.DOUBLE_QUOTE",
        index: 1
      });
    },
    get C16() {
      return C16 = dart.constSet(node_type.XmlNodeType, [C8 || CT.C8, C10 || CT.C10, C5 || CT.C5, C9 || CT.C9, C7 || CT.C7]);
    },
    get C17() {
      return C17 = dart.constSet(node_type.XmlNodeType, [C6 || CT.C6]);
    },
    get C18() {
      return C18 = dart.constSet(node_type.XmlNodeType, [C8 || CT.C8, C10 || CT.C10, C13 || CT.C13, C5 || CT.C5, C9 || CT.C9, C7 || CT.C7]);
    },
    get C19() {
      return C19 = dart.const({
        __proto__: attribute_type.XmlAttributeType.prototype,
        [_name$0]: "XmlAttributeType.SINGLE_QUOTE",
        index: 0
      });
    },
    get C20() {
      return C20 = dart.constList([C19 || CT.C19, C15 || CT.C15], attribute_type.XmlAttributeType);
    },
    get C21() {
      return C21 = dart.constMap(attribute_type.XmlAttributeType, core.String, [C19 || CT.C19, "'", C15 || CT.C15, "\""]);
    },
    get C22() {
      return C22 = dart.fn(default_mapping._textReplace, MatchToString());
    },
    get C23() {
      return C23 = dart.fn(default_mapping._singeQuoteAttributeReplace, MatchToString());
    },
    get C24() {
      return C24 = dart.fn(default_mapping._doubleQuoteAttributeReplace, MatchToString());
    },
    get C25() {
      return C25 = dart.constMap(core.String, core.String, ["Aacute", "Á", "aacute", "á", "Acirc", "Â", "acirc", "â", "acute", "´", "AElig", "Æ", "aelig", "æ", "Agrave", "À", "agrave", "à", "alefsym", "ℵ", "Alpha", "Α", "alpha", "α", "amp", "&", "and", "∧", "ang", "∠", "apos", "'", "Aring", "Å", "aring", "å", "asymp", "≈", "Atilde", "Ã", "atilde", "ã", "Auml", "Ä", "auml", "ä", "bdquo", "„", "Beta", "Β", "beta", "β", "brvbar", "¦", "bull", "•", "cap", "∩", "Ccedil", "Ç", "ccedil", "ç", "cedil", "¸", "cent", "¢", "Chi", "Χ", "chi", "χ", "circ", "ˆ", "clubs", "♣", "cong", "≅", "copy", "©", "crarr", "↵", "cup", "∪", "curren", "¤", "dagger", "†", "Dagger", "‡", "darr", "↓", "dArr", "⇓", "deg", "°", "Delta", "Δ", "delta", "δ", "diams", "♦", "divide", "÷", "Eacute", "É", "eacute", "é", "Ecirc", "Ê", "ecirc", "ê", "Egrave", "È", "egrave", "è", "empty", "∅", "emsp", " ", "ensp", " ", "Epsilon", "Ε", "epsilon", "ε", "equiv", "≡", "Eta", "Η", "eta", "η", "ETH", "Ð", "eth", "ð", "Euml", "Ë", "euml", "ë", "euro", "€", "exist", "∃", "fnof", "ƒ", "forall", "∀", "frac12", "½", "frac14", "¼", "frac34", "¾", "frasl", "⁄", "Gamma", "Γ", "gamma", "γ", "ge", "≥", "gt", ">", "harr", "↔", "hArr", "⇔", "hearts", "♥", "hellip", "…", "Iacute", "Í", "iacute", "í", "Icirc", "Î", "icirc", "î", "iexcl", "¡", "Igrave", "Ì", "igrave", "ì", "image", "ℑ", "infin", "∞", "int", "∫", "Iota", "Ι", "iota", "ι", "iquest", "¿", "isin", "∈", "Iuml", "Ï", "iuml", "ï", "Kappa", "Κ", "kappa", "κ", "Lambda", "Λ", "lambda", "λ", "lang", "〈", "laquo", "«", "larr", "←", "lArr", "⇐", "lceil", "⌈", "ldquo", "“", "le", "≤", "lfloor", "⌊", "lowast", "∗", "loz", "◊", "lrm", "‎", "lsaquo", "‹", "lsquo", "‘", "lt", "<", "macr", "¯", "mdash", "—", "micro", "µ", "middot", "·", "minus", "−", "Mu", "Μ", "mu", "μ", "nabla", "∇", "nbsp", " ", "ndash", "–", "ne", "≠", "ni", "∋", "not", "¬", "notin", "∉", "nsub", "⊄", "Ntilde", "Ñ", "ntilde", "ñ", "Nu", "Ν", "nu", "ν", "Oacute", "Ó", "oacute", "ó", "Ocirc", "Ô", "ocirc", "ô", "OElig", "Œ", "oelig", "œ", "Ograve", "Ò", "ograve", "ò", "oline", "‾", "Omega", "Ω", "omega", "ω", "Omicron", "Ο", "omicron", "ο", "oplus", "⊕", "or", "∨", "ordf", "ª", "ordm", "º", "Oslash", "Ø", "oslash", "ø", "Otilde", "Õ", "otilde", "õ", "otimes", "⊗", "Ouml", "Ö", "ouml", "ö", "para", "¶", "part", "∂", "permil", "‰", "perp", "⊥", "Phi", "Φ", "phi", "φ", "Pi", "Π", "pi", "π", "piv", "ϖ", "plusmn", "±", "pound", "£", "prime", "′", "Prime", "″", "prod", "∏", "prop", "∝", "Psi", "Ψ", "psi", "ψ", "quot", "\"", "radic", "√", "rang", "〉", "raquo", "»", "rarr", "→", "rArr", "⇒", "rceil", "⌉", "rdquo", "”", "real", "ℜ", "reg", "®", "rfloor", "⌋", "Rho", "Ρ", "rho", "ρ", "rlm", "‏", "rsaquo", "›", "rsquo", "’", "sbquo", "‚", "Scaron", "Š", "scaron", "š", "sdot", "⋅", "sect", "§", "shy", "­", "Sigma", "Σ", "sigma", "σ", "sigmaf", "ς", "sim", "∼", "spades", "♠", "sub", "⊂", "sube", "⊆", "sum", "∑", "sup", "⊃", "sup1", "¹", "sup2", "²", "sup3", "³", "supe", "⊇", "szlig", "ß", "Tau", "Τ", "tau", "τ", "there4", "∴", "Theta", "Θ", "theta", "θ", "thetasym", "ϑ", "thinsp", " ", "THORN", "Þ", "thorn", "þ", "tilde", "˜", "times", "×", "trade", "™", "Uacute", "Ú", "uacute", "ú", "uarr", "↑", "uArr", "⇑", "Ucirc", "Û", "ucirc", "û", "Ugrave", "Ù", "ugrave", "ù", "uml", "¨", "upsih", "ϒ", "Upsilon", "Υ", "upsilon", "υ", "Uuml", "Ü", "uuml", "ü", "weierp", "℘", "Xi", "Ξ", "xi", "ξ", "Yacute", "Ý", "yacute", "ý", "yen", "¥", "yuml", "ÿ", "Yuml", "Ÿ", "Zeta", "Ζ", "zeta", "ζ", "zwj", "‍", "zwnj", "‌"]);
    },
    get C26() {
      return C26 = dart.constMap(core.String, core.String, ["Aacute", "Á", "aacute", "á", "Abreve", "Ă", "abreve", "ă", "ac", "∾", "acd", "∿", "acE", "∾̳", "Acirc", "Â", "acirc", "â", "acute", "´", "Acy", "А", "acy", "а", "AElig", "Æ", "aelig", "æ", "af", "⁡", "Afr", "𝔄", "afr", "𝔞", "Agrave", "À", "agrave", "à", "alefsym", "ℵ", "aleph", "ℵ", "Alpha", "Α", "alpha", "α", "Amacr", "Ā", "amacr", "ā", "amalg", "⨿", "AMP", "&", "amp", "&", "and", "∧", "And", "⩓", "andand", "⩕", "andd", "⩜", "andslope", "⩘", "andv", "⩚", "ang", "∠", "ange", "⦤", "angle", "∠", "angmsd", "∡", "angmsdaa", "⦨", "angmsdab", "⦩", "angmsdac", "⦪", "angmsdad", "⦫", "angmsdae", "⦬", "angmsdaf", "⦭", "angmsdag", "⦮", "angmsdah", "⦯", "angrt", "∟", "angrtvb", "⊾", "angrtvbd", "⦝", "angsph", "∢", "angst", "Å", "angzarr", "⍼", "Aogon", "Ą", "aogon", "ą", "Aopf", "𝔸", "aopf", "𝕒", "ap", "≈", "apacir", "⩯", "ape", "≊", "apE", "⩰", "apid", "≋", "apos", "'", "ApplyFunction", "⁡", "approx", "≈", "approxeq", "≊", "Aring", "Å", "aring", "å", "Ascr", "𝒜", "ascr", "𝒶", "Assign", "≔", "ast", "*", "asymp", "≈", "asympeq", "≍", "Atilde", "Ã", "atilde", "ã", "Auml", "Ä", "auml", "ä", "awconint", "∳", "awint", "⨑", "backcong", "≌", "backepsilon", "϶", "backprime", "‵", "backsim", "∽", "backsimeq", "⋍", "Backslash", "∖", "Barv", "⫧", "barvee", "⊽", "barwed", "⌅", "Barwed", "⌆", "barwedge", "⌅", "bbrk", "⎵", "bbrktbrk", "⎶", "bcong", "≌", "Bcy", "Б", "bcy", "б", "bdquo", "„", "becaus", "∵", "Because", "∵", "because", "∵", "bemptyv", "⦰", "bepsi", "϶", "bernou", "ℬ", "Bernoullis", "ℬ", "Beta", "Β", "beta", "β", "beth", "ℶ", "between", "≬", "Bfr", "𝔅", "bfr", "𝔟", "bigcap", "⋂", "bigcirc", "◯", "bigcup", "⋃", "bigodot", "⨀", "bigoplus", "⨁", "bigotimes", "⨂", "bigsqcup", "⨆", "bigstar", "★", "bigtriangledown", "▽", "bigtriangleup", "△", "biguplus", "⨄", "bigvee", "⋁", "bigwedge", "⋀", "bkarow", "⤍", "blacklozenge", "⧫", "blacksquare", "▪", "blacktriangle", "▴", "blacktriangledown", "▾", "blacktriangleleft", "◂", "blacktriangleright", "▸", "blank", "␣", "blk12", "▒", "blk14", "░", "blk34", "▓", "block", "█", "bne", "=⃥", "bnequiv", "≡⃥", "bnot", "⌐", "bNot", "⫭", "Bopf", "𝔹", "bopf", "𝕓", "bot", "⊥", "bottom", "⊥", "bowtie", "⋈", "boxbox", "⧉", "boxdl", "┐", "boxdL", "╕", "boxDl", "╖", "boxDL", "╗", "boxdr", "┌", "boxdR", "╒", "boxDr", "╓", "boxDR", "╔", "boxh", "─", "boxH", "═", "boxhd", "┬", "boxHd", "╤", "boxhD", "╥", "boxHD", "╦", "boxhu", "┴", "boxHu", "╧", "boxhU", "╨", "boxHU", "╩", "boxminus", "⊟", "boxplus", "⊞", "boxtimes", "⊠", "boxul", "┘", "boxuL", "╛", "boxUl", "╜", "boxUL", "╝", "boxur", "└", "boxuR", "╘", "boxUr", "╙", "boxUR", "╚", "boxv", "│", "boxV", "║", "boxvh", "┼", "boxvH", "╪", "boxVh", "╫", "boxVH", "╬", "boxvl", "┤", "boxvL", "╡", "boxVl", "╢", "boxVL", "╣", "boxvr", "├", "boxvR", "╞", "boxVr", "╟", "boxVR", "╠", "bprime", "‵", "Breve", "˘", "breve", "˘", "brvbar", "¦", "Bscr", "ℬ", "bscr", "𝒷", "bsemi", "⁏", "bsim", "∽", "bsime", "⋍", "bsol", "\\", "bsolb", "⧅", "bsolhsub", "⟈", "bull", "•", "bullet", "•", "bump", "≎", "bumpe", "≏", "bumpE", "⪮", "Bumpeq", "≎", "bumpeq", "≏", "Cacute", "Ć", "cacute", "ć", "cap", "∩", "Cap", "⋒", "capand", "⩄", "capbrcup", "⩉", "capcap", "⩋", "capcup", "⩇", "capdot", "⩀", "CapitalDifferentialD", "ⅅ", "caps", "∩︀", "caret", "⁁", "caron", "ˇ", "Cayleys", "ℭ", "ccaps", "⩍", "Ccaron", "Č", "ccaron", "č", "Ccedil", "Ç", "ccedil", "ç", "Ccirc", "Ĉ", "ccirc", "ĉ", "Cconint", "∰", "ccups", "⩌", "ccupssm", "⩐", "Cdot", "Ċ", "cdot", "ċ", "cedil", "¸", "Cedilla", "¸", "cemptyv", "⦲", "cent", "¢", "CenterDot", "·", "centerdot", "·", "Cfr", "ℭ", "cfr", "𝔠", "CHcy", "Ч", "chcy", "ч", "check", "✓", "checkmark", "✓", "Chi", "Χ", "chi", "χ", "cir", "○", "circ", "ˆ", "circeq", "≗", "circlearrowleft", "↺", "circlearrowright", "↻", "circledast", "⊛", "circledcirc", "⊚", "circleddash", "⊝", "CircleDot", "⊙", "circledR", "®", "circledS", "Ⓢ", "CircleMinus", "⊖", "CirclePlus", "⊕", "CircleTimes", "⊗", "cire", "≗", "cirE", "⧃", "cirfnint", "⨐", "cirmid", "⫯", "cirscir", "⧂", "ClockwiseContourIntegral", "∲", "CloseCurlyDoubleQuote", "”", "CloseCurlyQuote", "’", "clubs", "♣", "clubsuit", "♣", "colon", ":", "Colon", "∷", "colone", "≔", "Colone", "⩴", "coloneq", "≔", "comma", ",", "commat", "@", "comp", "∁", "compfn", "∘", "complement", "∁", "complexes", "ℂ", "cong", "≅", "congdot", "⩭", "Congruent", "≡", "conint", "∮", "Conint", "∯", "ContourIntegral", "∮", "Copf", "ℂ", "copf", "𝕔", "coprod", "∐", "Coproduct", "∐", "COPY", "©", "copy", "©", "copysr", "℗", "CounterClockwiseContourIntegral", "∳", "crarr", "↵", "cross", "✗", "Cross", "⨯", "Cscr", "𝒞", "cscr", "𝒸", "csub", "⫏", "csube", "⫑", "csup", "⫐", "csupe", "⫒", "ctdot", "⋯", "cudarrl", "⤸", "cudarrr", "⤵", "cuepr", "⋞", "cuesc", "⋟", "cularr", "↶", "cularrp", "⤽", "cup", "∪", "Cup", "⋓", "cupbrcap", "⩈", "CupCap", "≍", "cupcap", "⩆", "cupcup", "⩊", "cupdot", "⊍", "cupor", "⩅", "cups", "∪︀", "curarr", "↷", "curarrm", "⤼", "curlyeqprec", "⋞", "curlyeqsucc", "⋟", "curlyvee", "⋎", "curlywedge", "⋏", "curren", "¤", "curvearrowleft", "↶", "curvearrowright", "↷", "cuvee", "⋎", "cuwed", "⋏", "cwconint", "∲", "cwint", "∱", "cylcty", "⌭", "dagger", "†", "Dagger", "‡", "daleth", "ℸ", "darr", "↓", "Darr", "↡", "dArr", "⇓", "dash", "‐", "dashv", "⊣", "Dashv", "⫤", "dbkarow", "⤏", "dblac", "˝", "Dcaron", "Ď", "dcaron", "ď", "Dcy", "Д", "dcy", "д", "DD", "ⅅ", "dd", "ⅆ", "ddagger", "‡", "ddarr", "⇊", "DDotrahd", "⤑", "ddotseq", "⩷", "deg", "°", "Del", "∇", "Delta", "Δ", "delta", "δ", "demptyv", "⦱", "dfisht", "⥿", "Dfr", "𝔇", "dfr", "𝔡", "dHar", "⥥", "dharl", "⇃", "dharr", "⇂", "DiacriticalAcute", "´", "DiacriticalDot", "˙", "DiacriticalDoubleAcute", "˝", "DiacriticalGrave", "`", "DiacriticalTilde", "˜", "diam", "⋄", "Diamond", "⋄", "diamond", "⋄", "diamondsuit", "♦", "diams", "♦", "die", "¨", "DifferentialD", "ⅆ", "digamma", "ϝ", "disin", "⋲", "div", "÷", "divide", "÷", "divideontimes", "⋇", "divonx", "⋇", "DJcy", "Ђ", "djcy", "ђ", "dlcorn", "⌞", "dlcrop", "⌍", "dollar", "$", "Dopf", "𝔻", "dopf", "𝕕", "Dot", "¨", "dot", "˙", "DotDot", "⃜", "doteq", "≐", "doteqdot", "≑", "DotEqual", "≐", "dotminus", "∸", "dotplus", "∔", "dotsquare", "⊡", "doublebarwedge", "⌆", "DoubleContourIntegral", "∯", "DoubleDot", "¨", "DoubleDownArrow", "⇓", "DoubleLeftArrow", "⇐", "DoubleLeftRightArrow", "⇔", "DoubleLeftTee", "⫤", "DoubleLongLeftArrow", "⟸", "DoubleLongLeftRightArrow", "⟺", "DoubleLongRightArrow", "⟹", "DoubleRightArrow", "⇒", "DoubleRightTee", "⊨", "DoubleUpArrow", "⇑", "DoubleUpDownArrow", "⇕", "DoubleVerticalBar", "∥", "DownArrow", "↓", "downarrow", "↓", "Downarrow", "⇓", "DownArrowBar", "⤓", "DownArrowUpArrow", "⇵", "DownBreve", "̑", "downdownarrows", "⇊", "downharpoonleft", "⇃", "downharpoonright", "⇂", "DownLeftRightVector", "⥐", "DownLeftTeeVector", "⥞", "DownLeftVector", "↽", "DownLeftVectorBar", "⥖", "DownRightTeeVector", "⥟", "DownRightVector", "⇁", "DownRightVectorBar", "⥗", "DownTee", "⊤", "DownTeeArrow", "↧", "drbkarow", "⤐", "drcorn", "⌟", "drcrop", "⌌", "Dscr", "𝒟", "dscr", "𝒹", "DScy", "Ѕ", "dscy", "ѕ", "dsol", "⧶", "Dstrok", "Đ", "dstrok", "đ", "dtdot", "⋱", "dtri", "▿", "dtrif", "▾", "duarr", "⇵", "duhar", "⥯", "dwangle", "⦦", "DZcy", "Џ", "dzcy", "џ", "dzigrarr", "⟿", "Eacute", "É", "eacute", "é", "easter", "⩮", "Ecaron", "Ě", "ecaron", "ě", "ecir", "≖", "Ecirc", "Ê", "ecirc", "ê", "ecolon", "≕", "Ecy", "Э", "ecy", "э", "eDDot", "⩷", "Edot", "Ė", "edot", "ė", "eDot", "≑", "ee", "ⅇ", "efDot", "≒", "Efr", "𝔈", "efr", "𝔢", "eg", "⪚", "Egrave", "È", "egrave", "è", "egs", "⪖", "egsdot", "⪘", "el", "⪙", "Element", "∈", "elinters", "⏧", "ell", "ℓ", "els", "⪕", "elsdot", "⪗", "Emacr", "Ē", "emacr", "ē", "empty", "∅", "emptyset", "∅", "EmptySmallSquare", "◻", "emptyv", "∅", "EmptyVerySmallSquare", "▫", "emsp", " ", "emsp13", " ", "emsp14", " ", "ENG", "Ŋ", "eng", "ŋ", "ensp", " ", "Eogon", "Ę", "eogon", "ę", "Eopf", "𝔼", "eopf", "𝕖", "epar", "⋕", "eparsl", "⧣", "eplus", "⩱", "epsi", "ε", "Epsilon", "Ε", "epsilon", "ε", "epsiv", "ϵ", "eqcirc", "≖", "eqcolon", "≕", "eqsim", "≂", "eqslantgtr", "⪖", "eqslantless", "⪕", "Equal", "⩵", "equals", "=", "EqualTilde", "≂", "equest", "≟", "Equilibrium", "⇌", "equiv", "≡", "equivDD", "⩸", "eqvparsl", "⧥", "erarr", "⥱", "erDot", "≓", "escr", "ℯ", "Escr", "ℰ", "esdot", "≐", "esim", "≂", "Esim", "⩳", "Eta", "Η", "eta", "η", "ETH", "Ð", "eth", "ð", "Euml", "Ë", "euml", "ë", "euro", "€", "excl", "!", "exist", "∃", "Exists", "∃", "expectation", "ℰ", "ExponentialE", "ⅇ", "exponentiale", "ⅇ", "fallingdotseq", "≒", "Fcy", "Ф", "fcy", "ф", "female", "♀", "ffilig", "ﬃ", "fflig", "ﬀ", "ffllig", "ﬄ", "Ffr", "𝔉", "ffr", "𝔣", "filig", "ﬁ", "FilledSmallSquare", "◼", "FilledVerySmallSquare", "▪", "fjlig", "fj", "flat", "♭", "fllig", "ﬂ", "fltns", "▱", "fnof", "ƒ", "Fopf", "𝔽", "fopf", "𝕗", "ForAll", "∀", "forall", "∀", "fork", "⋔", "forkv", "⫙", "Fouriertrf", "ℱ", "fpartint", "⨍", "frac12", "½", "frac13", "⅓", "frac14", "¼", "frac15", "⅕", "frac16", "⅙", "frac18", "⅛", "frac23", "⅔", "frac25", "⅖", "frac34", "¾", "frac35", "⅗", "frac38", "⅜", "frac45", "⅘", "frac56", "⅚", "frac58", "⅝", "frac78", "⅞", "frasl", "⁄", "frown", "⌢", "Fscr", "ℱ", "fscr", "𝒻", "gacute", "ǵ", "Gamma", "Γ", "gamma", "γ", "Gammad", "Ϝ", "gammad", "ϝ", "gap", "⪆", "Gbreve", "Ğ", "gbreve", "ğ", "Gcedil", "Ģ", "Gcirc", "Ĝ", "gcirc", "ĝ", "Gcy", "Г", "gcy", "г", "Gdot", "Ġ", "gdot", "ġ", "ge", "≥", "gE", "≧", "gel", "⋛", "gEl", "⪌", "geq", "≥", "geqq", "≧", "geqslant", "⩾", "ges", "⩾", "gescc", "⪩", "gesdot", "⪀", "gesdoto", "⪂", "gesdotol", "⪄", "gesl", "⋛︀", "gesles", "⪔", "Gfr", "𝔊", "gfr", "𝔤", "gg", "≫", "Gg", "⋙", "ggg", "⋙", "gimel", "ℷ", "GJcy", "Ѓ", "gjcy", "ѓ", "gl", "≷", "gla", "⪥", "glE", "⪒", "glj", "⪤", "gnap", "⪊", "gnapprox", "⪊", "gnE", "≩", "gne", "⪈", "gneq", "⪈", "gneqq", "≩", "gnsim", "⋧", "Gopf", "𝔾", "gopf", "𝕘", "grave", "`", "GreaterEqual", "≥", "GreaterEqualLess", "⋛", "GreaterFullEqual", "≧", "GreaterGreater", "⪢", "GreaterLess", "≷", "GreaterSlantEqual", "⩾", "GreaterTilde", "≳", "gscr", "ℊ", "Gscr", "𝒢", "gsim", "≳", "gsime", "⪎", "gsiml", "⪐", "GT", ">", "gt", ">", "Gt", "≫", "gtcc", "⪧", "gtcir", "⩺", "gtdot", "⋗", "gtlPar", "⦕", "gtquest", "⩼", "gtrapprox", "⪆", "gtrarr", "⥸", "gtrdot", "⋗", "gtreqless", "⋛", "gtreqqless", "⪌", "gtrless", "≷", "gtrsim", "≳", "gvertneqq", "≩︀", "gvnE", "≩︀", "Hacek", "ˇ", "hairsp", " ", "half", "½", "hamilt", "ℋ", "HARDcy", "Ъ", "hardcy", "ъ", "harr", "↔", "hArr", "⇔", "harrcir", "⥈", "harrw", "↭", "Hat", "^", "hbar", "ℏ", "Hcirc", "Ĥ", "hcirc", "ĥ", "hearts", "♥", "heartsuit", "♥", "hellip", "…", "hercon", "⊹", "Hfr", "ℌ", "hfr", "𝔥", "HilbertSpace", "ℋ", "hksearow", "⤥", "hkswarow", "⤦", "hoarr", "⇿", "homtht", "∻", "hookleftarrow", "↩", "hookrightarrow", "↪", "Hopf", "ℍ", "hopf", "𝕙", "horbar", "―", "HorizontalLine", "─", "Hscr", "ℋ", "hscr", "𝒽", "hslash", "ℏ", "Hstrok", "Ħ", "hstrok", "ħ", "HumpDownHump", "≎", "HumpEqual", "≏", "hybull", "⁃", "hyphen", "‐", "Iacute", "Í", "iacute", "í", "ic", "⁣", "Icirc", "Î", "icirc", "î", "Icy", "И", "icy", "и", "Idot", "İ", "IEcy", "Е", "iecy", "е", "iexcl", "¡", "iff", "⇔", "Ifr", "ℑ", "ifr", "𝔦", "Igrave", "Ì", "igrave", "ì", "ii", "ⅈ", "iiiint", "⨌", "iiint", "∭", "iinfin", "⧜", "iiota", "℩", "IJlig", "Ĳ", "ijlig", "ĳ", "Im", "ℑ", "Imacr", "Ī", "imacr", "ī", "image", "ℑ", "ImaginaryI", "ⅈ", "imagline", "ℐ", "imagpart", "ℑ", "imath", "ı", "imof", "⊷", "imped", "Ƶ", "Implies", "⇒", "in", "∈", "incare", "℅", "infin", "∞", "infintie", "⧝", "inodot", "ı", "int", "∫", "Int", "∬", "intcal", "⊺", "integers", "ℤ", "Integral", "∫", "intercal", "⊺", "Intersection", "⋂", "intlarhk", "⨗", "intprod", "⨼", "InvisibleComma", "⁣", "InvisibleTimes", "⁢", "IOcy", "Ё", "iocy", "ё", "Iogon", "Į", "iogon", "į", "Iopf", "𝕀", "iopf", "𝕚", "Iota", "Ι", "iota", "ι", "iprod", "⨼", "iquest", "¿", "Iscr", "ℐ", "iscr", "𝒾", "isin", "∈", "isindot", "⋵", "isinE", "⋹", "isins", "⋴", "isinsv", "⋳", "isinv", "∈", "it", "⁢", "Itilde", "Ĩ", "itilde", "ĩ", "Iukcy", "І", "iukcy", "і", "Iuml", "Ï", "iuml", "ï", "Jcirc", "Ĵ", "jcirc", "ĵ", "Jcy", "Й", "jcy", "й", "Jfr", "𝔍", "jfr", "𝔧", "jmath", "ȷ", "Jopf", "𝕁", "jopf", "𝕛", "Jscr", "𝒥", "jscr", "𝒿", "Jsercy", "Ј", "jsercy", "ј", "Jukcy", "Є", "jukcy", "є", "Kappa", "Κ", "kappa", "κ", "kappav", "ϰ", "Kcedil", "Ķ", "kcedil", "ķ", "Kcy", "К", "kcy", "к", "Kfr", "𝔎", "kfr", "𝔨", "kgreen", "ĸ", "KHcy", "Х", "khcy", "х", "KJcy", "Ќ", "kjcy", "ќ", "Kopf", "𝕂", "kopf", "𝕜", "Kscr", "𝒦", "kscr", "𝓀", "lAarr", "⇚", "Lacute", "Ĺ", "lacute", "ĺ", "laemptyv", "⦴", "lagran", "ℒ", "Lambda", "Λ", "lambda", "λ", "lang", "⟨", "Lang", "⟪", "langd", "⦑", "langle", "⟨", "lap", "⪅", "Laplacetrf", "ℒ", "laquo", "«", "larr", "←", "Larr", "↞", "lArr", "⇐", "larrb", "⇤", "larrbfs", "⤟", "larrfs", "⤝", "larrhk", "↩", "larrlp", "↫", "larrpl", "⤹", "larrsim", "⥳", "larrtl", "↢", "lat", "⪫", "latail", "⤙", "lAtail", "⤛", "late", "⪭", "lates", "⪭︀", "lbarr", "⤌", "lBarr", "⤎", "lbbrk", "❲", "lbrace", "{", "lbrack", "[", "lbrke", "⦋", "lbrksld", "⦏", "lbrkslu", "⦍", "Lcaron", "Ľ", "lcaron", "ľ", "Lcedil", "Ļ", "lcedil", "ļ", "lceil", "⌈", "lcub", "{", "Lcy", "Л", "lcy", "л", "ldca", "⤶", "ldquo", "“", "ldquor", "„", "ldrdhar", "⥧", "ldrushar", "⥋", "ldsh", "↲", "le", "≤", "lE", "≦", "LeftAngleBracket", "⟨", "LeftArrow", "←", "leftarrow", "←", "Leftarrow", "⇐", "LeftArrowBar", "⇤", "LeftArrowRightArrow", "⇆", "leftarrowtail", "↢", "LeftCeiling", "⌈", "LeftDoubleBracket", "⟦", "LeftDownTeeVector", "⥡", "LeftDownVector", "⇃", "LeftDownVectorBar", "⥙", "LeftFloor", "⌊", "leftharpoondown", "↽", "leftharpoonup", "↼", "leftleftarrows", "⇇", "LeftRightArrow", "↔", "leftrightarrow", "↔", "Leftrightarrow", "⇔", "leftrightarrows", "⇆", "leftrightharpoons", "⇋", "leftrightsquigarrow", "↭", "LeftRightVector", "⥎", "LeftTee", "⊣", "LeftTeeArrow", "↤", "LeftTeeVector", "⥚", "leftthreetimes", "⋋", "LeftTriangle", "⊲", "LeftTriangleBar", "⧏", "LeftTriangleEqual", "⊴", "LeftUpDownVector", "⥑", "LeftUpTeeVector", "⥠", "LeftUpVector", "↿", "LeftUpVectorBar", "⥘", "LeftVector", "↼", "LeftVectorBar", "⥒", "leg", "⋚", "lEg", "⪋", "leq", "≤", "leqq", "≦", "leqslant", "⩽", "les", "⩽", "lescc", "⪨", "lesdot", "⩿", "lesdoto", "⪁", "lesdotor", "⪃", "lesg", "⋚︀", "lesges", "⪓", "lessapprox", "⪅", "lessdot", "⋖", "lesseqgtr", "⋚", "lesseqqgtr", "⪋", "LessEqualGreater", "⋚", "LessFullEqual", "≦", "LessGreater", "≶", "lessgtr", "≶", "LessLess", "⪡", "lesssim", "≲", "LessSlantEqual", "⩽", "LessTilde", "≲", "lfisht", "⥼", "lfloor", "⌊", "Lfr", "𝔏", "lfr", "𝔩", "lg", "≶", "lgE", "⪑", "lHar", "⥢", "lhard", "↽", "lharu", "↼", "lharul", "⥪", "lhblk", "▄", "LJcy", "Љ", "ljcy", "љ", "ll", "≪", "Ll", "⋘", "llarr", "⇇", "llcorner", "⌞", "Lleftarrow", "⇚", "llhard", "⥫", "lltri", "◺", "Lmidot", "Ŀ", "lmidot", "ŀ", "lmoust", "⎰", "lmoustache", "⎰", "lnap", "⪉", "lnapprox", "⪉", "lnE", "≨", "lne", "⪇", "lneq", "⪇", "lneqq", "≨", "lnsim", "⋦", "loang", "⟬", "loarr", "⇽", "lobrk", "⟦", "LongLeftArrow", "⟵", "longleftarrow", "⟵", "Longleftarrow", "⟸", "LongLeftRightArrow", "⟷", "longleftrightarrow", "⟷", "Longleftrightarrow", "⟺", "longmapsto", "⟼", "LongRightArrow", "⟶", "longrightarrow", "⟶", "Longrightarrow", "⟹", "looparrowleft", "↫", "looparrowright", "↬", "lopar", "⦅", "Lopf", "𝕃", "lopf", "𝕝", "loplus", "⨭", "lotimes", "⨴", "lowast", "∗", "lowbar", "_", "LowerLeftArrow", "↙", "LowerRightArrow", "↘", "loz", "◊", "lozenge", "◊", "lozf", "⧫", "lpar", "(", "lparlt", "⦓", "lrarr", "⇆", "lrcorner", "⌟", "lrhar", "⇋", "lrhard", "⥭", "lrm", "‎", "lrtri", "⊿", "lsaquo", "‹", "Lscr", "ℒ", "lscr", "𝓁", "Lsh", "↰", "lsh", "↰", "lsim", "≲", "lsime", "⪍", "lsimg", "⪏", "lsqb", "[", "lsquo", "‘", "lsquor", "‚", "Lstrok", "Ł", "lstrok", "ł", "LT", "<", "lt", "<", "Lt", "≪", "ltcc", "⪦", "ltcir", "⩹", "ltdot", "⋖", "lthree", "⋋", "ltimes", "⋉", "ltlarr", "⥶", "ltquest", "⩻", "ltri", "◃", "ltrie", "⊴", "ltrif", "◂", "ltrPar", "⦖", "lurdshar", "⥊", "luruhar", "⥦", "lvertneqq", "≨︀", "lvnE", "≨︀", "macr", "¯", "male", "♂", "malt", "✠", "maltese", "✠", "map", "↦", "Map", "⤅", "mapsto", "↦", "mapstodown", "↧", "mapstoleft", "↤", "mapstoup", "↥", "marker", "▮", "mcomma", "⨩", "Mcy", "М", "mcy", "м", "mdash", "—", "mDDot", "∺", "measuredangle", "∡", "MediumSpace", " ", "Mellintrf", "ℳ", "Mfr", "𝔐", "mfr", "𝔪", "mho", "℧", "micro", "µ", "mid", "∣", "midast", "*", "midcir", "⫰", "middot", "·", "minus", "−", "minusb", "⊟", "minusd", "∸", "minusdu", "⨪", "MinusPlus", "∓", "mlcp", "⫛", "mldr", "…", "mnplus", "∓", "models", "⊧", "Mopf", "𝕄", "mopf", "𝕞", "mp", "∓", "Mscr", "ℳ", "mscr", "𝓂", "mstpos", "∾", "Mu", "Μ", "mu", "μ", "multimap", "⊸", "mumap", "⊸", "nabla", "∇", "Nacute", "Ń", "nacute", "ń", "nang", "∠⃒", "nap", "≉", "napE", "⩰̸", "napid", "≋̸", "napos", "ŉ", "napprox", "≉", "natur", "♮", "natural", "♮", "naturals", "ℕ", "nbsp", " ", "nbump", "≎̸", "nbumpe", "≏̸", "ncap", "⩃", "Ncaron", "Ň", "ncaron", "ň", "Ncedil", "Ņ", "ncedil", "ņ", "ncong", "≇", "ncongdot", "⩭̸", "ncup", "⩂", "Ncy", "Н", "ncy", "н", "ndash", "–", "ne", "≠", "nearhk", "⤤", "nearr", "↗", "neArr", "⇗", "nearrow", "↗", "nedot", "≐̸", "NegativeMediumSpace", "​", "NegativeThickSpace", "​", "NegativeThinSpace", "​", "NegativeVeryThinSpace", "​", "nequiv", "≢", "nesear", "⤨", "nesim", "≂̸", "NestedGreaterGreater", "≫", "NestedLessLess", "≪", "NewLine", "\n", "nexist", "∄", "nexists", "∄", "Nfr", "𝔑", "nfr", "𝔫", "ngE", "≧̸", "nge", "≱", "ngeq", "≱", "ngeqq", "≧̸", "ngeqslant", "⩾̸", "nges", "⩾̸", "nGg", "⋙̸", "ngsim", "≵", "nGt", "≫⃒", "ngt", "≯", "ngtr", "≯", "nGtv", "≫̸", "nharr", "↮", "nhArr", "⇎", "nhpar", "⫲", "ni", "∋", "nis", "⋼", "nisd", "⋺", "niv", "∋", "NJcy", "Њ", "njcy", "њ", "nlarr", "↚", "nlArr", "⇍", "nldr", "‥", "nlE", "≦̸", "nle", "≰", "nleftarrow", "↚", "nLeftarrow", "⇍", "nleftrightarrow", "↮", "nLeftrightarrow", "⇎", "nleq", "≰", "nleqq", "≦̸", "nleqslant", "⩽̸", "nles", "⩽̸", "nless", "≮", "nLl", "⋘̸", "nlsim", "≴", "nLt", "≪⃒", "nlt", "≮", "nltri", "⋪", "nltrie", "⋬", "nLtv", "≪̸", "nmid", "∤", "NoBreak", "⁠", "NonBreakingSpace", " ", "Nopf", "ℕ", "nopf", "𝕟", "not", "¬", "Not", "⫬", "NotCongruent", "≢", "NotCupCap", "≭", "NotDoubleVerticalBar", "∦", "NotElement", "∉", "NotEqual", "≠", "NotEqualTilde", "≂̸", "NotExists", "∄", "NotGreater", "≯", "NotGreaterEqual", "≱", "NotGreaterFullEqual", "≧̸", "NotGreaterGreater", "≫̸", "NotGreaterLess", "≹", "NotGreaterSlantEqual", "⩾̸", "NotGreaterTilde", "≵", "NotHumpDownHump", "≎̸", "NotHumpEqual", "≏̸", "notin", "∉", "notindot", "⋵̸", "notinE", "⋹̸", "notinva", "∉", "notinvb", "⋷", "notinvc", "⋶", "NotLeftTriangle", "⋪", "NotLeftTriangleBar", "⧏̸", "NotLeftTriangleEqual", "⋬", "NotLess", "≮", "NotLessEqual", "≰", "NotLessGreater", "≸", "NotLessLess", "≪̸", "NotLessSlantEqual", "⩽̸", "NotLessTilde", "≴", "NotNestedGreaterGreater", "⪢̸", "NotNestedLessLess", "⪡̸", "notni", "∌", "notniva", "∌", "notnivb", "⋾", "notnivc", "⋽", "NotPrecedes", "⊀", "NotPrecedesEqual", "⪯̸", "NotPrecedesSlantEqual", "⋠", "NotReverseElement", "∌", "NotRightTriangle", "⋫", "NotRightTriangleBar", "⧐̸", "NotRightTriangleEqual", "⋭", "NotSquareSubset", "⊏̸", "NotSquareSubsetEqual", "⋢", "NotSquareSuperset", "⊐̸", "NotSquareSupersetEqual", "⋣", "NotSubset", "⊂⃒", "NotSubsetEqual", "⊈", "NotSucceeds", "⊁", "NotSucceedsEqual", "⪰̸", "NotSucceedsSlantEqual", "⋡", "NotSucceedsTilde", "≿̸", "NotSuperset", "⊃⃒", "NotSupersetEqual", "⊉", "NotTilde", "≁", "NotTildeEqual", "≄", "NotTildeFullEqual", "≇", "NotTildeTilde", "≉", "NotVerticalBar", "∤", "npar", "∦", "nparallel", "∦", "nparsl", "⫽⃥", "npart", "∂̸", "npolint", "⨔", "npr", "⊀", "nprcue", "⋠", "npre", "⪯̸", "nprec", "⊀", "npreceq", "⪯̸", "nrarr", "↛", "nrArr", "⇏", "nrarrc", "⤳̸", "nrarrw", "↝̸", "nrightarrow", "↛", "nRightarrow", "⇏", "nrtri", "⋫", "nrtrie", "⋭", "nsc", "⊁", "nsccue", "⋡", "nsce", "⪰̸", "Nscr", "𝒩", "nscr", "𝓃", "nshortmid", "∤", "nshortparallel", "∦", "nsim", "≁", "nsime", "≄", "nsimeq", "≄", "nsmid", "∤", "nspar", "∦", "nsqsube", "⋢", "nsqsupe", "⋣", "nsub", "⊄", "nsube", "⊈", "nsubE", "⫅̸", "nsubset", "⊂⃒", "nsubseteq", "⊈", "nsubseteqq", "⫅̸", "nsucc", "⊁", "nsucceq", "⪰̸", "nsup", "⊅", "nsupe", "⊉", "nsupE", "⫆̸", "nsupset", "⊃⃒", "nsupseteq", "⊉", "nsupseteqq", "⫆̸", "ntgl", "≹", "Ntilde", "Ñ", "ntilde", "ñ", "ntlg", "≸", "ntriangleleft", "⋪", "ntrianglelefteq", "⋬", "ntriangleright", "⋫", "ntrianglerighteq", "⋭", "Nu", "Ν", "nu", "ν", "num", "#", "numero", "№", "numsp", " ", "nvap", "≍⃒", "nvdash", "⊬", "nvDash", "⊭", "nVdash", "⊮", "nVDash", "⊯", "nvge", "≥⃒", "nvgt", ">⃒", "nvHarr", "⤄", "nvinfin", "⧞", "nvlArr", "⤂", "nvle", "≤⃒", "nvlt", "<⃒", "nvltrie", "⊴⃒", "nvrArr", "⤃", "nvrtrie", "⊵⃒", "nvsim", "∼⃒", "nwarhk", "⤣", "nwarr", "↖", "nwArr", "⇖", "nwarrow", "↖", "nwnear", "⤧", "Oacute", "Ó", "oacute", "ó", "oast", "⊛", "ocir", "⊚", "Ocirc", "Ô", "ocirc", "ô", "Ocy", "О", "ocy", "о", "odash", "⊝", "Odblac", "Ő", "odblac", "ő", "odiv", "⨸", "odot", "⊙", "odsold", "⦼", "OElig", "Œ", "oelig", "œ", "ofcir", "⦿", "Ofr", "𝔒", "ofr", "𝔬", "ogon", "˛", "Ograve", "Ò", "ograve", "ò", "ogt", "⧁", "ohbar", "⦵", "ohm", "Ω", "oint", "∮", "olarr", "↺", "olcir", "⦾", "olcross", "⦻", "oline", "‾", "olt", "⧀", "Omacr", "Ō", "omacr", "ō", "Omega", "Ω", "omega", "ω", "Omicron", "Ο", "omicron", "ο", "omid", "⦶", "ominus", "⊖", "Oopf", "𝕆", "oopf", "𝕠", "opar", "⦷", "OpenCurlyDoubleQuote", "“", "OpenCurlyQuote", "‘", "operp", "⦹", "oplus", "⊕", "or", "∨", "Or", "⩔", "orarr", "↻", "ord", "⩝", "order", "ℴ", "orderof", "ℴ", "ordf", "ª", "ordm", "º", "origof", "⊶", "oror", "⩖", "orslope", "⩗", "orv", "⩛", "oS", "Ⓢ", "oscr", "ℴ", "Oscr", "𝒪", "Oslash", "Ø", "oslash", "ø", "osol", "⊘", "Otilde", "Õ", "otilde", "õ", "otimes", "⊗", "Otimes", "⨷", "otimesas", "⨶", "Ouml", "Ö", "ouml", "ö", "ovbar", "⌽", "OverBar", "‾", "OverBrace", "⏞", "OverBracket", "⎴", "OverParenthesis", "⏜", "par", "∥", "para", "¶", "parallel", "∥", "parsim", "⫳", "parsl", "⫽", "part", "∂", "PartialD", "∂", "Pcy", "П", "pcy", "п", "percnt", "%", "period", ".", "permil", "‰", "perp", "⊥", "pertenk", "‱", "Pfr", "𝔓", "pfr", "𝔭", "Phi", "Φ", "phi", "φ", "phiv", "ϕ", "phmmat", "ℳ", "phone", "☎", "Pi", "Π", "pi", "π", "pitchfork", "⋔", "piv", "ϖ", "planck", "ℏ", "planckh", "ℎ", "plankv", "ℏ", "plus", "+", "plusacir", "⨣", "plusb", "⊞", "pluscir", "⨢", "plusdo", "∔", "plusdu", "⨥", "pluse", "⩲", "PlusMinus", "±", "plusmn", "±", "plussim", "⨦", "plustwo", "⨧", "pm", "±", "Poincareplane", "ℌ", "pointint", "⨕", "Popf", "ℙ", "popf", "𝕡", "pound", "£", "pr", "≺", "Pr", "⪻", "prap", "⪷", "prcue", "≼", "pre", "⪯", "prE", "⪳", "prec", "≺", "precapprox", "⪷", "preccurlyeq", "≼", "Precedes", "≺", "PrecedesEqual", "⪯", "PrecedesSlantEqual", "≼", "PrecedesTilde", "≾", "preceq", "⪯", "precnapprox", "⪹", "precneqq", "⪵", "precnsim", "⋨", "precsim", "≾", "prime", "′", "Prime", "″", "primes", "ℙ", "prnap", "⪹", "prnE", "⪵", "prnsim", "⋨", "prod", "∏", "Product", "∏", "profalar", "⌮", "profline", "⌒", "profsurf", "⌓", "prop", "∝", "Proportion", "∷", "Proportional", "∝", "propto", "∝", "prsim", "≾", "prurel", "⊰", "Pscr", "𝒫", "pscr", "𝓅", "Psi", "Ψ", "psi", "ψ", "puncsp", " ", "Qfr", "𝔔", "qfr", "𝔮", "qint", "⨌", "Qopf", "ℚ", "qopf", "𝕢", "qprime", "⁗", "Qscr", "𝒬", "qscr", "𝓆", "quaternions", "ℍ", "quatint", "⨖", "quest", "?", "questeq", "≟", "QUOT", "\"", "quot", "\"", "rAarr", "⇛", "race", "∽̱", "Racute", "Ŕ", "racute", "ŕ", "radic", "√", "raemptyv", "⦳", "rang", "⟩", "Rang", "⟫", "rangd", "⦒", "range", "⦥", "rangle", "⟩", "raquo", "»", "rarr", "→", "Rarr", "↠", "rArr", "⇒", "rarrap", "⥵", "rarrb", "⇥", "rarrbfs", "⤠", "rarrc", "⤳", "rarrfs", "⤞", "rarrhk", "↪", "rarrlp", "↬", "rarrpl", "⥅", "rarrsim", "⥴", "rarrtl", "↣", "Rarrtl", "⤖", "rarrw", "↝", "ratail", "⤚", "rAtail", "⤜", "ratio", "∶", "rationals", "ℚ", "rbarr", "⤍", "rBarr", "⤏", "RBarr", "⤐", "rbbrk", "❳", "rbrace", "}", "rbrack", "]", "rbrke", "⦌", "rbrksld", "⦎", "rbrkslu", "⦐", "Rcaron", "Ř", "rcaron", "ř", "Rcedil", "Ŗ", "rcedil", "ŗ", "rceil", "⌉", "rcub", "}", "Rcy", "Р", "rcy", "р", "rdca", "⤷", "rdldhar", "⥩", "rdquo", "”", "rdquor", "”", "rdsh", "↳", "Re", "ℜ", "real", "ℜ", "realine", "ℛ", "realpart", "ℜ", "reals", "ℝ", "rect", "▭", "REG", "®", "reg", "®", "ReverseElement", "∋", "ReverseEquilibrium", "⇋", "ReverseUpEquilibrium", "⥯", "rfisht", "⥽", "rfloor", "⌋", "Rfr", "ℜ", "rfr", "𝔯", "rHar", "⥤", "rhard", "⇁", "rharu", "⇀", "rharul", "⥬", "Rho", "Ρ", "rho", "ρ", "rhov", "ϱ", "RightAngleBracket", "⟩", "RightArrow", "→", "rightarrow", "→", "Rightarrow", "⇒", "RightArrowBar", "⇥", "RightArrowLeftArrow", "⇄", "rightarrowtail", "↣", "RightCeiling", "⌉", "RightDoubleBracket", "⟧", "RightDownTeeVector", "⥝", "RightDownVector", "⇂", "RightDownVectorBar", "⥕", "RightFloor", "⌋", "rightharpoondown", "⇁", "rightharpoonup", "⇀", "rightleftarrows", "⇄", "rightleftharpoons", "⇌", "rightrightarrows", "⇉", "rightsquigarrow", "↝", "RightTee", "⊢", "RightTeeArrow", "↦", "RightTeeVector", "⥛", "rightthreetimes", "⋌", "RightTriangle", "⊳", "RightTriangleBar", "⧐", "RightTriangleEqual", "⊵", "RightUpDownVector", "⥏", "RightUpTeeVector", "⥜", "RightUpVector", "↾", "RightUpVectorBar", "⥔", "RightVector", "⇀", "RightVectorBar", "⥓", "ring", "˚", "risingdotseq", "≓", "rlarr", "⇄", "rlhar", "⇌", "rlm", "‏", "rmoust", "⎱", "rmoustache", "⎱", "rnmid", "⫮", "roang", "⟭", "roarr", "⇾", "robrk", "⟧", "ropar", "⦆", "Ropf", "ℝ", "ropf", "𝕣", "roplus", "⨮", "rotimes", "⨵", "RoundImplies", "⥰", "rpar", ")", "rpargt", "⦔", "rppolint", "⨒", "rrarr", "⇉", "Rrightarrow", "⇛", "rsaquo", "›", "Rscr", "ℛ", "rscr", "𝓇", "Rsh", "↱", "rsh", "↱", "rsqb", "]", "rsquo", "’", "rsquor", "’", "rthree", "⋌", "rtimes", "⋊", "rtri", "▹", "rtrie", "⊵", "rtrif", "▸", "rtriltri", "⧎", "RuleDelayed", "⧴", "ruluhar", "⥨", "rx", "℞", "Sacute", "Ś", "sacute", "ś", "sbquo", "‚", "sc", "≻", "Sc", "⪼", "scap", "⪸", "Scaron", "Š", "scaron", "š", "sccue", "≽", "sce", "⪰", "scE", "⪴", "Scedil", "Ş", "scedil", "ş", "Scirc", "Ŝ", "scirc", "ŝ", "scnap", "⪺", "scnE", "⪶", "scnsim", "⋩", "scpolint", "⨓", "scsim", "≿", "Scy", "С", "scy", "с", "sdot", "⋅", "sdotb", "⊡", "sdote", "⩦", "searhk", "⤥", "searr", "↘", "seArr", "⇘", "searrow", "↘", "sect", "§", "semi", ";", "seswar", "⤩", "setminus", "∖", "setmn", "∖", "sext", "✶", "Sfr", "𝔖", "sfr", "𝔰", "sfrown", "⌢", "sharp", "♯", "SHCHcy", "Щ", "shchcy", "щ", "SHcy", "Ш", "shcy", "ш", "ShortDownArrow", "↓", "ShortLeftArrow", "←", "shortmid", "∣", "shortparallel", "∥", "ShortRightArrow", "→", "ShortUpArrow", "↑", "shy", "­", "Sigma", "Σ", "sigma", "σ", "sigmaf", "ς", "sigmav", "ς", "sim", "∼", "simdot", "⩪", "sime", "≃", "simeq", "≃", "simg", "⪞", "simgE", "⪠", "siml", "⪝", "simlE", "⪟", "simne", "≆", "simplus", "⨤", "simrarr", "⥲", "slarr", "←", "SmallCircle", "∘", "smallsetminus", "∖", "smashp", "⨳", "smeparsl", "⧤", "smid", "∣", "smile", "⌣", "smt", "⪪", "smte", "⪬", "smtes", "⪬︀", "SOFTcy", "Ь", "softcy", "ь", "sol", "/", "solb", "⧄", "solbar", "⌿", "Sopf", "𝕊", "sopf", "𝕤", "spades", "♠", "spadesuit", "♠", "spar", "∥", "sqcap", "⊓", "sqcaps", "⊓︀", "sqcup", "⊔", "sqcups", "⊔︀", "Sqrt", "√", "sqsub", "⊏", "sqsube", "⊑", "sqsubset", "⊏", "sqsubseteq", "⊑", "sqsup", "⊐", "sqsupe", "⊒", "sqsupset", "⊐", "sqsupseteq", "⊒", "squ", "□", "Square", "□", "square", "□", "SquareIntersection", "⊓", "SquareSubset", "⊏", "SquareSubsetEqual", "⊑", "SquareSuperset", "⊐", "SquareSupersetEqual", "⊒", "SquareUnion", "⊔", "squarf", "▪", "squf", "▪", "srarr", "→", "Sscr", "𝒮", "sscr", "𝓈", "ssetmn", "∖", "ssmile", "⌣", "sstarf", "⋆", "Star", "⋆", "star", "☆", "starf", "★", "straightepsilon", "ϵ", "straightphi", "ϕ", "strns", "¯", "sub", "⊂", "Sub", "⋐", "subdot", "⪽", "sube", "⊆", "subE", "⫅", "subedot", "⫃", "submult", "⫁", "subne", "⊊", "subnE", "⫋", "subplus", "⪿", "subrarr", "⥹", "subset", "⊂", "Subset", "⋐", "subseteq", "⊆", "subseteqq", "⫅", "SubsetEqual", "⊆", "subsetneq", "⊊", "subsetneqq", "⫋", "subsim", "⫇", "subsub", "⫕", "subsup", "⫓", "succ", "≻", "succapprox", "⪸", "succcurlyeq", "≽", "Succeeds", "≻", "SucceedsEqual", "⪰", "SucceedsSlantEqual", "≽", "SucceedsTilde", "≿", "succeq", "⪰", "succnapprox", "⪺", "succneqq", "⪶", "succnsim", "⋩", "succsim", "≿", "SuchThat", "∋", "Sum", "∑", "sum", "∑", "sung", "♪", "sup", "⊃", "Sup", "⋑", "sup1", "¹", "sup2", "²", "sup3", "³", "supdot", "⪾", "supdsub", "⫘", "supe", "⊇", "supE", "⫆", "supedot", "⫄", "Superset", "⊃", "SupersetEqual", "⊇", "suphsol", "⟉", "suphsub", "⫗", "suplarr", "⥻", "supmult", "⫂", "supne", "⊋", "supnE", "⫌", "supplus", "⫀", "supset", "⊃", "Supset", "⋑", "supseteq", "⊇", "supseteqq", "⫆", "supsetneq", "⊋", "supsetneqq", "⫌", "supsim", "⫈", "supsub", "⫔", "supsup", "⫖", "swarhk", "⤦", "swarr", "↙", "swArr", "⇙", "swarrow", "↙", "swnwar", "⤪", "szlig", "ß", "Tab", "\t", "target", "⌖", "Tau", "Τ", "tau", "τ", "tbrk", "⎴", "Tcaron", "Ť", "tcaron", "ť", "Tcedil", "Ţ", "tcedil", "ţ", "Tcy", "Т", "tcy", "т", "tdot", "⃛", "telrec", "⌕", "Tfr", "𝔗", "tfr", "𝔱", "there4", "∴", "Therefore", "∴", "therefore", "∴", "Theta", "Θ", "theta", "θ", "thetasym", "ϑ", "thetav", "ϑ", "thickapprox", "≈", "thicksim", "∼", "ThickSpace", "  ", "thinsp", " ", "ThinSpace", " ", "thkap", "≈", "thksim", "∼", "THORN", "Þ", "thorn", "þ", "tilde", "˜", "Tilde", "∼", "TildeEqual", "≃", "TildeFullEqual", "≅", "TildeTilde", "≈", "times", "×", "timesb", "⊠", "timesbar", "⨱", "timesd", "⨰", "tint", "∭", "toea", "⤨", "top", "⊤", "topbot", "⌶", "topcir", "⫱", "Topf", "𝕋", "topf", "𝕥", "topfork", "⫚", "tosa", "⤩", "tprime", "‴", "TRADE", "™", "trade", "™", "triangle", "▵", "triangledown", "▿", "triangleleft", "◃", "trianglelefteq", "⊴", "triangleq", "≜", "triangleright", "▹", "trianglerighteq", "⊵", "tridot", "◬", "trie", "≜", "triminus", "⨺", "TripleDot", "⃛", "triplus", "⨹", "trisb", "⧍", "tritime", "⨻", "trpezium", "⏢", "Tscr", "𝒯", "tscr", "𝓉", "TScy", "Ц", "tscy", "ц", "TSHcy", "Ћ", "tshcy", "ћ", "Tstrok", "Ŧ", "tstrok", "ŧ", "twixt", "≬", "twoheadleftarrow", "↞", "twoheadrightarrow", "↠", "Uacute", "Ú", "uacute", "ú", "uarr", "↑", "Uarr", "↟", "uArr", "⇑", "Uarrocir", "⥉", "Ubrcy", "Ў", "ubrcy", "ў", "Ubreve", "Ŭ", "ubreve", "ŭ", "Ucirc", "Û", "ucirc", "û", "Ucy", "У", "ucy", "у", "udarr", "⇅", "Udblac", "Ű", "udblac", "ű", "udhar", "⥮", "ufisht", "⥾", "Ufr", "𝔘", "ufr", "𝔲", "Ugrave", "Ù", "ugrave", "ù", "uHar", "⥣", "uharl", "↿", "uharr", "↾", "uhblk", "▀", "ulcorn", "⌜", "ulcorner", "⌜", "ulcrop", "⌏", "ultri", "◸", "Umacr", "Ū", "umacr", "ū", "uml", "¨", "UnderBar", "_", "UnderBrace", "⏟", "UnderBracket", "⎵", "UnderParenthesis", "⏝", "Union", "⋃", "UnionPlus", "⊎", "Uogon", "Ų", "uogon", "ų", "Uopf", "𝕌", "uopf", "𝕦", "UpArrow", "↑", "uparrow", "↑", "Uparrow", "⇑", "UpArrowBar", "⤒", "UpArrowDownArrow", "⇅", "UpDownArrow", "↕", "updownarrow", "↕", "Updownarrow", "⇕", "UpEquilibrium", "⥮", "upharpoonleft", "↿", "upharpoonright", "↾", "uplus", "⊎", "UpperLeftArrow", "↖", "UpperRightArrow", "↗", "upsi", "υ", "Upsi", "ϒ", "upsih", "ϒ", "Upsilon", "Υ", "upsilon", "υ", "UpTee", "⊥", "UpTeeArrow", "↥", "upuparrows", "⇈", "urcorn", "⌝", "urcorner", "⌝", "urcrop", "⌎", "Uring", "Ů", "uring", "ů", "urtri", "◹", "Uscr", "𝒰", "uscr", "𝓊", "utdot", "⋰", "Utilde", "Ũ", "utilde", "ũ", "utri", "▵", "utrif", "▴", "uuarr", "⇈", "Uuml", "Ü", "uuml", "ü", "uwangle", "⦧", "vangrt", "⦜", "varepsilon", "ϵ", "varkappa", "ϰ", "varnothing", "∅", "varphi", "ϕ", "varpi", "ϖ", "varpropto", "∝", "varr", "↕", "vArr", "⇕", "varrho", "ϱ", "varsigma", "ς", "varsubsetneq", "⊊︀", "varsubsetneqq", "⫋︀", "varsupsetneq", "⊋︀", "varsupsetneqq", "⫌︀", "vartheta", "ϑ", "vartriangleleft", "⊲", "vartriangleright", "⊳", "vBar", "⫨", "Vbar", "⫫", "vBarv", "⫩", "Vcy", "В", "vcy", "в", "vdash", "⊢", "vDash", "⊨", "Vdash", "⊩", "VDash", "⊫", "Vdashl", "⫦", "vee", "∨", "Vee", "⋁", "veebar", "⊻", "veeeq", "≚", "vellip", "⋮", "verbar", "|", "Verbar", "‖", "vert", "|", "Vert", "‖", "VerticalBar", "∣", "VerticalLine", "|", "VerticalSeparator", "❘", "VerticalTilde", "≀", "VeryThinSpace", " ", "Vfr", "𝔙", "vfr", "𝔳", "vltri", "⊲", "vnsub", "⊂⃒", "vnsup", "⊃⃒", "Vopf", "𝕍", "vopf", "𝕧", "vprop", "∝", "vrtri", "⊳", "Vscr", "𝒱", "vscr", "𝓋", "vsubne", "⊊︀", "vsubnE", "⫋︀", "vsupne", "⊋︀", "vsupnE", "⫌︀", "Vvdash", "⊪", "vzigzag", "⦚", "Wcirc", "Ŵ", "wcirc", "ŵ", "wedbar", "⩟", "wedge", "∧", "Wedge", "⋀", "wedgeq", "≙", "weierp", "℘", "Wfr", "𝔚", "wfr", "𝔴", "Wopf", "𝕎", "wopf", "𝕨", "wp", "℘", "wr", "≀", "wreath", "≀", "Wscr", "𝒲", "wscr", "𝓌", "xcap", "⋂", "xcirc", "◯", "xcup", "⋃", "xdtri", "▽", "Xfr", "𝔛", "xfr", "𝔵", "xharr", "⟷", "xhArr", "⟺", "Xi", "Ξ", "xi", "ξ", "xlarr", "⟵", "xlArr", "⟸", "xmap", "⟼", "xnis", "⋻", "xodot", "⨀", "Xopf", "𝕏", "xopf", "𝕩", "xoplus", "⨁", "xotime", "⨂", "xrarr", "⟶", "xrArr", "⟹", "Xscr", "𝒳", "xscr", "𝓍", "xsqcup", "⨆", "xuplus", "⨄", "xutri", "△", "xvee", "⋁", "xwedge", "⋀", "Yacute", "Ý", "yacute", "ý", "YAcy", "Я", "yacy", "я", "Ycirc", "Ŷ", "ycirc", "ŷ", "Ycy", "Ы", "ycy", "ы", "yen", "¥", "Yfr", "𝔜", "yfr", "𝔶", "YIcy", "Ї", "yicy", "ї", "Yopf", "𝕐", "yopf", "𝕪", "Yscr", "𝒴", "yscr", "𝓎", "YUcy", "Ю", "yucy", "ю", "yuml", "ÿ", "Yuml", "Ÿ", "Zacute", "Ź", "zacute", "ź", "Zcaron", "Ž", "zcaron", "ž", "Zcy", "З", "zcy", "з", "Zdot", "Ż", "zdot", "ż", "zeetrf", "ℨ", "ZeroWidthSpace", "​", "Zeta", "Ζ", "zeta", "ζ", "Zfr", "ℨ", "zfr", "𝔷", "ZHcy", "Ж", "zhcy", "ж", "zigrarr", "⇝", "Zopf", "ℤ", "zopf", "𝕫", "Zscr", "𝒵", "zscr", "𝓏", "zwj", "‍", "zwnj", "‌"]);
    }
  });
  const _stack = dart.privateName(builder, "_stack");
  let C0;
  const _insert = dart.privateName(builder, "_insert");
  const _buildName = dart.privateName(builder, "_buildName");
  const _lookup = dart.privateName(builder, "_lookup");
  const optimizeNamespaces$ = dart.privateName(builder, "XmlBuilder.optimizeNamespaces");
  builder.XmlBuilder = class XmlBuilder extends core.Object {
    get optimizeNamespaces() {
      return this[optimizeNamespaces$];
    }
    set optimizeNamespaces(value) {
      super.optimizeNamespaces = value;
    }
    text(text) {
      let children = this[_stack][$last].children;
      if (dart.test(children[$isNotEmpty]) && text$.XmlText.is(children[$last])) {
        let previous = children[$removeLast]();
        children[$add](new text$.XmlText.new(dart.str(previous.text) + dart.str(dart.toString(text))));
      } else {
        children[$add](new text$.XmlText.new(dart.toString(text)));
      }
    }
    cdata(text) {
      this[_stack][$last].children[$add](new cdata.XmlCDATA.new(dart.toString(text)));
    }
    processing(target, text) {
      this[_stack][$last].children[$add](new processing.XmlProcessing.new(target, dart.toString(text)));
    }
    comment(text) {
      this[_stack][$last].children[$add](new comment.XmlComment.new(dart.toString(text)));
    }
    element(name, opts) {
      let namespace = opts && 'namespace' in opts ? opts.namespace : null;
      let namespaces = opts && 'namespaces' in opts ? opts.namespaces : C0 || CT.C0;
      let attributes = opts && 'attributes' in opts ? opts.attributes : C0 || CT.C0;
      let isSelfClosing = opts && 'isSelfClosing' in opts ? opts.isSelfClosing : true;
      let nest = opts && 'nest' in opts ? opts.nest : null;
      let element = new builder.XmlElementBuilder.new();
      this[_stack][$add](element);
      namespaces[$forEach](dart.bind(this, 'namespace'));
      attributes[$forEach](dart.bind(this, 'attribute'));
      if (nest != null) {
        this[_insert](nest);
      }
      element.name = this[_buildName](name, namespace);
      element.isSelfClosing = isSelfClosing;
      if (dart.test(this.optimizeNamespaces)) {
        element.namespaces[$forEach](dart.fn((uri, meta) => {
          if (!dart.test(meta.used)) {
            let name = meta.name;
            let attribute = element.attributes[$firstWhere](dart.fn(attribute => dart.equals(attribute.name, name), XmlAttributeTobool()));
            element.attributes[$remove](attribute);
          }
        }, StringAndNamespaceDataToNull()));
      }
      this[_stack][$removeLast]();
      this[_stack][$last].children[$add](element.build());
    }
    attribute(name, value, opts) {
      let t0;
      let namespace = opts && 'namespace' in opts ? opts.namespace : null;
      let attributeType = opts && 'attributeType' in opts ? opts.attributeType : null;
      let attribute = new attribute$.XmlAttribute.new(this[_buildName](name, namespace), dart.toString(value), (t0 = attributeType, t0 == null ? attribute_type.XmlAttributeType.DOUBLE_QUOTE : t0));
      this[_stack][$last].attributes[$add](attribute);
    }
    namespace(uri, prefix = null) {
      if (prefix === "xmlns" || prefix === "xml") {
        dart.throw(new core.ArgumentError.new("The \"" + dart.str(prefix) + "\" prefix cannot be bound."));
      }
      if (dart.test(this.optimizeNamespaces) && dart.test(this[_stack][$any](dart.fn(builder => dart.test(builder.namespaces[$containsKey](uri)) && builder.namespaces[$_get](uri).prefix == prefix, XmlNodeBuilderTobool())))) {
        return;
      }
      if (dart.test(this[_stack][$last].namespaces[$values][$any](dart.fn(meta => meta.prefix == prefix, NamespaceDataTobool())))) {
        dart.throw(new core.ArgumentError.new("The \"" + dart.str(prefix) + "\" prefix conflicts with existing binding."));
      }
      let meta = new builder.NamespaceData.new(prefix, false);
      this[_stack][$last].attributes[$add](new attribute$.XmlAttribute.new(meta.name, uri, attribute_type.XmlAttributeType.DOUBLE_QUOTE));
      this[_stack][$last].namespaces[$_set](uri, meta);
    }
    build() {
      return this[_stack][$last].build();
    }
    [_buildName](name, uri) {
      if (uri != null && uri[$isNotEmpty]) {
        let meta = this[_lookup](uri);
        meta.used = true;
        return name$.XmlName.new(name, meta.prefix);
      } else {
        return name$.XmlName.fromString(name);
      }
    }
    [_lookup](uri) {
      let builder = this[_stack][$lastWhere](dart.fn(builder => builder.namespaces[$containsKey](uri), XmlNodeBuilderTobool()), {orElse: dart.fn(() => dart.throw(new core.ArgumentError.new("Undefined namespace: " + dart.str(uri))), VoidTobottom())});
      return builder.namespaces[$_get](uri);
    }
    [_insert](value) {
      if (core.Function.is(value)) {
        dart.dcall(value, []);
      } else if (core.Iterable.is(value)) {
        value[$forEach](dart.bind(this, _insert));
      } else if (node$.XmlNode.is(value)) {
        if (text$.XmlText.is(value)) {
          this.text(value.text);
        } else if (attribute$.XmlAttribute.is(value)) {
          this[_stack][$last].attributes[$add](transformer.XmlTransformer.defaultInstance.visit(attribute$.XmlAttribute, value));
        } else if (document_fragment.XmlDocumentFragment.is(value)) {
          value.children.forEach(dart.bind(this, _insert));
        } else if (element.XmlElement.is(value) || data.XmlData.is(value)) {
          this[_stack][$last].children[$add](transformer.XmlTransformer.defaultInstance.visit(node$.XmlNode, value));
        } else {
          dart.throw(new core.ArgumentError.new("Unable to add element of type " + dart.str(value.nodeType)));
        }
      } else {
        this.text(dart.toString(value));
      }
    }
  };
  (builder.XmlBuilder.new = function(opts) {
    let optimizeNamespaces = opts && 'optimizeNamespaces' in opts ? opts.optimizeNamespaces : false;
    this[_stack] = ListOfXmlNodeBuilder().from([new builder.XmlDocumentBuilder.new()]);
    this[optimizeNamespaces$] = optimizeNamespaces;
    ;
  }).prototype = builder.XmlBuilder.prototype;
  dart.addTypeTests(builder.XmlBuilder);
  dart.setMethodSignature(builder.XmlBuilder, () => ({
    __proto__: dart.getMethods(builder.XmlBuilder.__proto__),
    text: dart.fnType(dart.void, [core.Object]),
    cdata: dart.fnType(dart.void, [core.Object]),
    processing: dart.fnType(dart.void, [core.String, core.Object]),
    comment: dart.fnType(dart.void, [core.Object]),
    element: dart.fnType(dart.void, [core.String], {attributes: core.Map$(core.String, core.String), isSelfClosing: core.bool, namespace: core.String, namespaces: core.Map$(core.String, core.String), nest: core.Object}, {}),
    attribute: dart.fnType(dart.void, [core.String, core.Object], {attributeType: attribute_type.XmlAttributeType, namespace: core.String}, {}),
    namespace: dart.fnType(dart.void, [core.String], [core.String]),
    build: dart.fnType(node$.XmlNode, []),
    [_buildName]: dart.fnType(name$.XmlName, [core.String, core.String]),
    [_lookup]: dart.fnType(builder.NamespaceData, [core.String]),
    [_insert]: dart.fnType(dart.void, [core.Object])
  }));
  dart.setLibraryUri(builder.XmlBuilder, "package:xml/src/xml/builder.dart");
  dart.setFieldSignature(builder.XmlBuilder, () => ({
    __proto__: dart.getFields(builder.XmlBuilder.__proto__),
    optimizeNamespaces: dart.finalFieldType(core.bool),
    [_stack]: dart.finalFieldType(core.List$(builder.XmlNodeBuilder))
  }));
  const prefix$ = dart.privateName(builder, "NamespaceData.prefix");
  const used$ = dart.privateName(builder, "NamespaceData.used");
  builder.NamespaceData = class NamespaceData extends core.Object {
    get prefix() {
      return this[prefix$];
    }
    set prefix(value) {
      super.prefix = value;
    }
    get used() {
      return this[used$];
    }
    set used(value) {
      this[used$] = value;
    }
    get name() {
      return this.prefix == null || this.prefix[$isEmpty] ? name$.XmlName.new("xmlns") : name$.XmlName.new(this.prefix, "xmlns");
    }
  };
  (builder.NamespaceData.new = function(prefix, used = false) {
    this[prefix$] = prefix;
    this[used$] = used;
    ;
  }).prototype = builder.NamespaceData.prototype;
  dart.addTypeTests(builder.NamespaceData);
  dart.setGetterSignature(builder.NamespaceData, () => ({
    __proto__: dart.getGetters(builder.NamespaceData.__proto__),
    name: name$.XmlName
  }));
  dart.setLibraryUri(builder.NamespaceData, "package:xml/src/xml/builder.dart");
  dart.setFieldSignature(builder.NamespaceData, () => ({
    __proto__: dart.getFields(builder.NamespaceData.__proto__),
    prefix: dart.finalFieldType(core.String),
    used: dart.fieldType(core.bool)
  }));
  builder.XmlNodeBuilder = class XmlNodeBuilder extends core.Object {};
  (builder.XmlNodeBuilder.new = function() {
    ;
  }).prototype = builder.XmlNodeBuilder.prototype;
  dart.addTypeTests(builder.XmlNodeBuilder);
  dart.setLibraryUri(builder.XmlNodeBuilder, "package:xml/src/xml/builder.dart");
  const namespaces = dart.privateName(builder, "XmlDocumentBuilder.namespaces");
  const children = dart.privateName(builder, "XmlDocumentBuilder.children");
  builder.XmlDocumentBuilder = class XmlDocumentBuilder extends builder.XmlNodeBuilder {
    get namespaces() {
      return this[namespaces];
    }
    set namespaces(value) {
      super.namespaces = value;
    }
    get children() {
      return this[children];
    }
    set children(value) {
      super.children = value;
    }
    get attributes() {
      dart.throw(new core.ArgumentError.new("Unable to define attributes at the document level."));
    }
    build() {
      return new document.XmlDocument.new(this.children);
    }
  };
  (builder.XmlDocumentBuilder.new = function() {
    this[namespaces] = new (IdentityMapOfString$NamespaceData()).from([name$.xmlUri, name$.xmlData]);
    this[children] = JSArrayOfXmlNode().of([]);
    ;
  }).prototype = builder.XmlDocumentBuilder.prototype;
  dart.addTypeTests(builder.XmlDocumentBuilder);
  dart.setMethodSignature(builder.XmlDocumentBuilder, () => ({
    __proto__: dart.getMethods(builder.XmlDocumentBuilder.__proto__),
    build: dart.fnType(node$.XmlNode, [])
  }));
  dart.setGetterSignature(builder.XmlDocumentBuilder, () => ({
    __proto__: dart.getGetters(builder.XmlDocumentBuilder.__proto__),
    attributes: core.List$(attribute$.XmlAttribute)
  }));
  dart.setLibraryUri(builder.XmlDocumentBuilder, "package:xml/src/xml/builder.dart");
  dart.setFieldSignature(builder.XmlDocumentBuilder, () => ({
    __proto__: dart.getFields(builder.XmlDocumentBuilder.__proto__),
    namespaces: dart.finalFieldType(core.Map$(core.String, builder.NamespaceData)),
    children: dart.finalFieldType(core.List$(node$.XmlNode))
  }));
  const namespaces$ = dart.privateName(builder, "XmlElementBuilder.namespaces");
  const attributes = dart.privateName(builder, "XmlElementBuilder.attributes");
  const children$ = dart.privateName(builder, "XmlElementBuilder.children");
  const isSelfClosing = dart.privateName(builder, "XmlElementBuilder.isSelfClosing");
  const name = dart.privateName(builder, "XmlElementBuilder.name");
  builder.XmlElementBuilder = class XmlElementBuilder extends builder.XmlNodeBuilder {
    get namespaces() {
      return this[namespaces$];
    }
    set namespaces(value) {
      super.namespaces = value;
    }
    get attributes() {
      return this[attributes];
    }
    set attributes(value) {
      super.attributes = value;
    }
    get children() {
      return this[children$];
    }
    set children(value) {
      super.children = value;
    }
    get isSelfClosing() {
      return this[isSelfClosing];
    }
    set isSelfClosing(value) {
      this[isSelfClosing] = value;
    }
    get name() {
      return this[name];
    }
    set name(value) {
      this[name] = value;
    }
    build() {
      return new element.XmlElement.new(this.name, this.attributes, this.children, this.isSelfClosing);
    }
  };
  (builder.XmlElementBuilder.new = function() {
    this[namespaces$] = new (IdentityMapOfString$NamespaceData()).new();
    this[attributes] = JSArrayOfXmlAttribute().of([]);
    this[children$] = JSArrayOfXmlNode().of([]);
    this[isSelfClosing] = true;
    this[name] = null;
    ;
  }).prototype = builder.XmlElementBuilder.prototype;
  dart.addTypeTests(builder.XmlElementBuilder);
  dart.setMethodSignature(builder.XmlElementBuilder, () => ({
    __proto__: dart.getMethods(builder.XmlElementBuilder.__proto__),
    build: dart.fnType(node$.XmlNode, [])
  }));
  dart.setLibraryUri(builder.XmlElementBuilder, "package:xml/src/xml/builder.dart");
  dart.setFieldSignature(builder.XmlElementBuilder, () => ({
    __proto__: dart.getFields(builder.XmlElementBuilder.__proto__),
    namespaces: dart.finalFieldType(core.Map$(core.String, builder.NamespaceData)),
    attributes: dart.finalFieldType(core.List$(attribute$.XmlAttribute)),
    children: dart.finalFieldType(core.List$(node$.XmlNode)),
    isSelfClosing: dart.fieldType(core.bool),
    name: dart.fieldType(name$.XmlName)
  }));
  visitor.XmlVisitor = class XmlVisitor extends core.Object {};
  visitor.XmlVisitor[dart.mixinOn] = Object => class XmlVisitor extends Object {
    visit(T, visitable) {
      return T._check(visitable.accept(this));
    }
    visitName(name) {
      return null;
    }
    visitAttribute(node) {
      return null;
    }
    visitDocument(node) {
      return null;
    }
    visitDocumentFragment(node) {
      return null;
    }
    visitElement(node) {
      return null;
    }
    visitCDATA(node) {
      return null;
    }
    visitComment(node) {
      return null;
    }
    visitDoctype(node) {
      return null;
    }
    visitProcessing(node) {
      return null;
    }
    visitText(node) {
      return null;
    }
  };
  (visitor.XmlVisitor[dart.mixinNew] = function() {
  }).prototype = visitor.XmlVisitor.prototype;
  dart.addTypeTests(visitor.XmlVisitor);
  visitor.XmlVisitor[dart.implements] = () => [core.Object];
  dart.setMethodSignature(visitor.XmlVisitor, () => ({
    __proto__: dart.getMethods(visitor.XmlVisitor.__proto__),
    visit: dart.gFnType(T => [T, [visitable.XmlVisitable]]),
    visitName: dart.fnType(dart.dynamic, [name$.XmlName]),
    visitAttribute: dart.fnType(dart.dynamic, [attribute$.XmlAttribute]),
    visitDocument: dart.fnType(dart.dynamic, [document.XmlDocument]),
    visitDocumentFragment: dart.fnType(dart.dynamic, [document_fragment.XmlDocumentFragment]),
    visitElement: dart.fnType(dart.dynamic, [element.XmlElement]),
    visitCDATA: dart.fnType(dart.dynamic, [cdata.XmlCDATA]),
    visitComment: dart.fnType(dart.dynamic, [comment.XmlComment]),
    visitDoctype: dart.fnType(dart.dynamic, [doctype.XmlDoctype]),
    visitProcessing: dart.fnType(dart.dynamic, [processing.XmlProcessing]),
    visitText: dart.fnType(dart.dynamic, [text$.XmlText])
  }));
  dart.setLibraryUri(visitor.XmlVisitor, "package:xml/src/xml/visitors/visitor.dart");
  const Object_XmlVisitor$36 = class Object_XmlVisitor extends core.Object {};
  (Object_XmlVisitor$36.new = function() {
  }).prototype = Object_XmlVisitor$36.prototype;
  dart.applyMixin(Object_XmlVisitor$36, visitor.XmlVisitor);
  transformer.XmlTransformer = class XmlTransformer extends Object_XmlVisitor$36 {
    visitAttribute(node) {
      return new attribute$.XmlAttribute.new(this.visit(name$.XmlName, node.name), node.value, node.attributeType);
    }
    visitCDATA(node) {
      return new cdata.XmlCDATA.new(node.text);
    }
    visitComment(node) {
      return new comment.XmlComment.new(node.text);
    }
    visitDoctype(node) {
      return new doctype.XmlDoctype.new(node.text);
    }
    visitDocument(node) {
      return new document.XmlDocument.new(node.children.map(node$.XmlNode, dart.gbind(dart.bind(this, 'visit'), node$.XmlNode)));
    }
    visitDocumentFragment(node) {
      return new document_fragment.XmlDocumentFragment.new(node.children.map(node$.XmlNode, dart.gbind(dart.bind(this, 'visit'), node$.XmlNode)));
    }
    visitElement(node) {
      return new element.XmlElement.new(this.visit(name$.XmlName, node.name), node.attributes.map(attribute$.XmlAttribute, dart.gbind(dart.bind(this, 'visit'), attribute$.XmlAttribute)), node.children.map(node$.XmlNode, dart.gbind(dart.bind(this, 'visit'), node$.XmlNode)), node.isSelfClosing);
    }
    visitName(name) {
      return name$.XmlName.fromString(name.qualified);
    }
    visitProcessing(node) {
      return new processing.XmlProcessing.new(node.target, node.text);
    }
    visitText(node) {
      return new text$.XmlText.new(node.text);
    }
  };
  (transformer.XmlTransformer.new = function() {
    ;
  }).prototype = transformer.XmlTransformer.prototype;
  dart.addTypeTests(transformer.XmlTransformer);
  dart.setMethodSignature(transformer.XmlTransformer, () => ({
    __proto__: dart.getMethods(transformer.XmlTransformer.__proto__),
    visitAttribute: dart.fnType(attribute$.XmlAttribute, [attribute$.XmlAttribute]),
    visitCDATA: dart.fnType(cdata.XmlCDATA, [cdata.XmlCDATA]),
    visitComment: dart.fnType(comment.XmlComment, [comment.XmlComment]),
    visitDoctype: dart.fnType(doctype.XmlDoctype, [doctype.XmlDoctype]),
    visitDocument: dart.fnType(document.XmlDocument, [document.XmlDocument]),
    visitDocumentFragment: dart.fnType(document_fragment.XmlDocumentFragment, [document_fragment.XmlDocumentFragment]),
    visitElement: dart.fnType(element.XmlElement, [element.XmlElement]),
    visitName: dart.fnType(name$.XmlName, [name$.XmlName]),
    visitProcessing: dart.fnType(processing.XmlProcessing, [processing.XmlProcessing]),
    visitText: dart.fnType(text$.XmlText, [text$.XmlText])
  }));
  dart.setLibraryUri(transformer.XmlTransformer, "package:xml/src/xml/visitors/transformer.dart");
  dart.defineLazy(transformer.XmlTransformer, {
    /*transformer.XmlTransformer.defaultInstance*/get defaultInstance() {
      return new transformer.XmlTransformer.new();
    }
  });
  visitable.XmlVisitable = class XmlVisitable extends core.Object {};
  visitable.XmlVisitable[dart.mixinOn] = Object => class XmlVisitable extends Object {};
  (visitable.XmlVisitable[dart.mixinNew] = function() {
  }).prototype = visitable.XmlVisitable.prototype;
  dart.addTypeTests(visitable.XmlVisitable);
  visitable.XmlVisitable[dart.implements] = () => [core.Object];
  dart.setLibraryUri(visitable.XmlVisitable, "package:xml/src/xml/visitors/visitable.dart");
  let C2;
  const XmlDefaultEntityMapping_entities = dart.privateName(default_mapping, "XmlDefaultEntityMapping.entities");
  let C1;
  writable.XmlWritable = class XmlWritable extends core.Object {};
  writable.XmlWritable[dart.mixinOn] = Object => {
    class XmlWritable extends Object {
      toString() {
        return this.toXmlString();
      }
      toXmlString(opts) {
        let pretty = opts && 'pretty' in opts ? opts.pretty : false;
        let indent = opts && 'indent' in opts ? opts.indent : "  ";
        let entityMapping = opts && 'entityMapping' in opts ? opts.entityMapping : C1 || CT.C1;
        let buffer = new core.StringBuffer.new();
        if (dart.test(pretty)) {
          new pretty_writer.XmlPrettyWriter.new(buffer, entityMapping, 0, indent).visit(dart.dynamic, this);
        } else {
          new writer.XmlWriter.new(buffer, entityMapping).visit(dart.dynamic, this);
        }
        return buffer.toString();
      }
    }
    dart.defineExtensionMethods(XmlWritable, ['toString']);
    return XmlWritable;
  };
  (writable.XmlWritable[dart.mixinNew] = function() {
  }).prototype = writable.XmlWritable.prototype;
  dart.addTypeTests(writable.XmlWritable);
  writable.XmlWritable[dart.implements] = () => [visitable.XmlVisitable, core.Object];
  dart.setMethodSignature(writable.XmlWritable, () => ({
    __proto__: dart.getMethods(writable.XmlWritable.__proto__),
    toXmlString: dart.fnType(core.String, [], {entityMapping: entity_mapping.XmlEntityMapping, indent: core.String, pretty: core.bool}, {})
  }));
  dart.setLibraryUri(writable.XmlWritable, "package:xml/src/xml/utils/writable.dart");
  const _parent = dart.privateName(owned, "_parent");
  const _is_XmlOwnedMixin_default = Symbol('_is_XmlOwnedMixin_default');
  owned.XmlOwnedMixin$ = dart.generic(T => {
    class XmlOwnedMixin extends core.Object {}
    XmlOwnedMixin[dart.mixinOn] = Object => class XmlOwnedMixin extends Object {
      get parent() {
        return this[_parent];
      }
      get root() {
        return node$.XmlNode._check(dart.test(this.hasParent) ? this[_parent].root : this);
      }
      get hasParent() {
        return this[_parent] != null;
      }
      get document() {
        let t0;
        t0 = this[_parent];
        return t0 == null ? null : t0.document;
      }
      get depth() {
        return this[_parent] == null ? 0 : dart.notNull(this[_parent].depth) + 1;
      }
      attachParent(parent) {
        T._check(parent);
        exceptions.XmlParentException.checkNoParent(this);
        this[_parent] = parent;
      }
      detachParent(parent) {
        T._check(parent);
        this[_parent] = null;
      }
    };
    (XmlOwnedMixin[dart.mixinNew] = function() {
      this[_parent] = null;
    }).prototype = XmlOwnedMixin.prototype;
    dart.addTypeTests(XmlOwnedMixin);
    XmlOwnedMixin.prototype[_is_XmlOwnedMixin_default] = true;
    XmlOwnedMixin[dart.implements] = () => [owned.XmlOwned, core.Object];
    dart.setMethodSignature(XmlOwnedMixin, () => ({
      __proto__: dart.getMethods(XmlOwnedMixin.__proto__),
      attachParent: dart.fnType(dart.void, [core.Object]),
      detachParent: dart.fnType(dart.void, [core.Object])
    }));
    dart.setGetterSignature(XmlOwnedMixin, () => ({
      __proto__: dart.getGetters(XmlOwnedMixin.__proto__),
      parent: T,
      root: node$.XmlNode,
      hasParent: core.bool,
      document: document.XmlDocument,
      depth: core.int
    }));
    dart.setLibraryUri(XmlOwnedMixin, "package:xml/src/xml/utils/owned.dart");
    dart.setFieldSignature(XmlOwnedMixin, () => ({
      __proto__: dart.getFields(XmlOwnedMixin.__proto__),
      [_parent]: dart.fieldType(T)
    }));
    return XmlOwnedMixin;
  });
  owned.XmlOwnedMixin = owned.XmlOwnedMixin$();
  dart.addTypeTests(owned.XmlOwnedMixin, _is_XmlOwnedMixin_default);
  let C3;
  let C4;
  const Object_XmlVisitable$36 = class Object_XmlVisitable extends core.Object {};
  (Object_XmlVisitable$36.new = function() {
  }).prototype = Object_XmlVisitable$36.prototype;
  dart.applyMixin(Object_XmlVisitable$36, visitable.XmlVisitable);
  const Object_XmlWritable$36 = class Object_XmlWritable extends Object_XmlVisitable$36 {};
  (Object_XmlWritable$36.new = function() {
  }).prototype = Object_XmlWritable$36.prototype;
  dart.applyMixin(Object_XmlWritable$36, writable.XmlWritable);
  node$.XmlNode = class XmlNode extends Object_XmlWritable$36 {
    get children() {
      return C3 || CT.C3;
    }
    get attributes() {
      return C4 || CT.C4;
    }
    get preceding() {
      return new preceding.XmlPrecedingIterable.new(this);
    }
    get descendants() {
      return new descendants.XmlDescendantsIterable.new(this);
    }
    get following() {
      return new following.XmlFollowingIterable.new(this);
    }
    get ancestors() {
      return new ancestors.XmlAncestorsIterable.new(this);
    }
    get firstChild() {
      return dart.test(this.children[$isEmpty]) ? null : this.children[$first];
    }
    get lastChild() {
      return dart.test(this.children[$isEmpty]) ? null : this.children[$last];
    }
    get text() {
      return this.descendants[$where](dart.fn(node => text$.XmlText.is(node) || cdata.XmlCDATA.is(node), XmlNodeTobool()))[$map](core.String, dart.fn(node => node.text, XmlNodeToString()))[$join]();
    }
    get nextSibling() {
      if (this.parent != null) {
        let siblings = this.parent.children;
        for (let i = 0; i < dart.notNull(siblings[$length]) - 1; i = i + 1) {
          if (dart.equals(siblings[$_get](i), this)) {
            return siblings[$_get](i + 1);
          }
        }
      }
      return null;
    }
    get previousSibling() {
      if (this.parent != null) {
        let siblings = this.parent.children;
        for (let i = dart.notNull(siblings[$length]) - 1; i > 0; i = i - 1) {
          if (dart.equals(siblings[$_get](i), this)) {
            return siblings[$_get](i - 1);
          }
        }
      }
      return null;
    }
    copy() {
      return transformer.XmlTransformer.defaultInstance.visit(node$.XmlNode, this);
    }
    normalize() {
      return normalizer.XmlNormalizer.defaultInstance.visit(dart.void, this);
    }
  };
  (node$.XmlNode.new = function() {
    ;
  }).prototype = node$.XmlNode.prototype;
  dart.addTypeTests(node$.XmlNode);
  node$.XmlNode[dart.implements] = () => [owned.XmlOwned];
  dart.setMethodSignature(node$.XmlNode, () => ({
    __proto__: dart.getMethods(node$.XmlNode.__proto__),
    copy: dart.fnType(node$.XmlNode, []),
    normalize: dart.fnType(dart.void, [])
  }));
  dart.setGetterSignature(node$.XmlNode, () => ({
    __proto__: dart.getGetters(node$.XmlNode.__proto__),
    children: core.List$(node$.XmlNode),
    attributes: core.List$(attribute$.XmlAttribute),
    preceding: core.Iterable$(node$.XmlNode),
    descendants: core.Iterable$(node$.XmlNode),
    following: core.Iterable$(node$.XmlNode),
    ancestors: core.Iterable$(node$.XmlNode),
    firstChild: node$.XmlNode,
    lastChild: node$.XmlNode,
    text: core.String,
    nextSibling: node$.XmlNode,
    previousSibling: node$.XmlNode
  }));
  dart.setLibraryUri(node$.XmlNode, "package:xml/src/xml/nodes/node.dart");
  const Object_XmlVisitable$36$ = class Object_XmlVisitable extends core.Object {};
  (Object_XmlVisitable$36$.new = function() {
  }).prototype = Object_XmlVisitable$36$.prototype;
  dart.applyMixin(Object_XmlVisitable$36$, visitable.XmlVisitable);
  const Object_XmlWritable$36$ = class Object_XmlWritable extends Object_XmlVisitable$36$ {};
  (Object_XmlWritable$36$.new = function() {
  }).prototype = Object_XmlWritable$36$.prototype;
  dart.applyMixin(Object_XmlWritable$36$, writable.XmlWritable);
  const Object_XmlOwnedMixin$36 = class Object_XmlOwnedMixin extends Object_XmlWritable$36$ {};
  (Object_XmlOwnedMixin$36.new = function() {
    owned.XmlOwnedMixin$(node$.XmlNode)[dart.mixinNew].call(this);
  }).prototype = Object_XmlOwnedMixin$36.prototype;
  dart.applyMixin(Object_XmlOwnedMixin$36, owned.XmlOwnedMixin$(node$.XmlNode));
  name$.XmlName = class XmlName extends Object_XmlOwnedMixin$36 {
    static new(local, prefix = null) {
      return prefix == null || prefix[$isEmpty] ? new simple_name.XmlSimpleName.new(local) : new prefix_name.XmlPrefixName.new(prefix, local, dart.str(prefix) + ":" + dart.str(local));
    }
    static fromString(qualified) {
      let index = qualified[$indexOf](":");
      if (index > 0) {
        let prefix = qualified[$substring](0, index);
        let local = qualified[$substring](index + 1);
        return new prefix_name.XmlPrefixName.new(prefix, local, qualified);
      } else {
        return new simple_name.XmlSimpleName.new(qualified);
      }
    }
    accept(visitor) {
      return visitor.visitName(this);
    }
    _equals(other) {
      if (other == null) return false;
      return name$.XmlName.is(other) && other.local == this.local && other.namespaceUri == this.namespaceUri;
    }
    get hashCode() {
      return dart.hashCode(this.qualified);
    }
  };
  (name$.XmlName.internal = function() {
    name$.XmlName.__proto__.new.call(this);
    ;
  }).prototype = name$.XmlName.prototype;
  dart.addTypeTests(name$.XmlName);
  dart.setMethodSignature(name$.XmlName, () => ({
    __proto__: dart.getMethods(name$.XmlName.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor]),
    _equals: dart.fnType(core.bool, [core.Object]),
    [$_equals]: dart.fnType(core.bool, [core.Object])
  }));
  dart.setLibraryUri(name$.XmlName, "package:xml/src/xml/utils/name.dart");
  dart.defineExtensionMethods(name$.XmlName, ['_equals']);
  dart.defineExtensionAccessors(name$.XmlName, ['hashCode']);
  dart.defineLazy(name$, {
    /*name$.xml*/get xml() {
      return "xml";
    },
    /*name$.xmlUri*/get xmlUri() {
      return "http://www.w3.org/XML/1998/namespace";
    },
    /*name$.xmlns*/get xmlns() {
      return "xmlns";
    },
    /*name$.xmlData*/get xmlData() {
      return new builder.NamespaceData.new("xml", true);
    }
  });
  const buffer$ = dart.privateName(writer, "XmlWriter.buffer");
  const entityMapping$ = dart.privateName(writer, "XmlWriter.entityMapping");
  const Object_XmlVisitor$36$ = class Object_XmlVisitor extends core.Object {};
  (Object_XmlVisitor$36$.new = function() {
  }).prototype = Object_XmlVisitor$36$.prototype;
  dart.applyMixin(Object_XmlVisitor$36$, visitor.XmlVisitor);
  writer.XmlWriter = class XmlWriter extends Object_XmlVisitor$36$ {
    get buffer() {
      return this[buffer$];
    }
    set buffer(value) {
      super.buffer = value;
    }
    get entityMapping() {
      return this[entityMapping$];
    }
    set entityMapping(value) {
      super.entityMapping = value;
    }
    visitAttribute(node) {
      this.visit(dart.dynamic, node.name);
      this.buffer.write("=");
      this.buffer.write(this.entityMapping.encodeAttributeValueWithQuotes(node.value, node.attributeType));
    }
    visitCDATA(node) {
      this.buffer.write("<![CDATA[");
      this.buffer.write(node.text);
      this.buffer.write("]]>");
    }
    visitComment(node) {
      this.buffer.write("<!--");
      this.buffer.write(node.text);
      this.buffer.write("-->");
    }
    visitDoctype(node) {
      this.buffer.write("<!DOCTYPE");
      this.buffer.write(" ");
      this.buffer.write(node.text);
      this.buffer.write(">");
    }
    visitDocument(node) {
      this.writeChildren(node);
    }
    visitDocumentFragment(node) {
      this.buffer.write("#document-fragment");
    }
    visitElement(node) {
      this.buffer.write("<");
      this.visit(dart.dynamic, node.name);
      this.writeAttributes(node);
      if (dart.test(node.children.isEmpty) && dart.test(node.isSelfClosing)) {
        this.buffer.write("/>");
      } else {
        this.buffer.write(">");
        this.writeChildren(node);
        this.buffer.write("</");
        this.visit(dart.dynamic, node.name);
        this.buffer.write(">");
      }
    }
    visitName(name) {
      this.buffer.write(name.qualified);
    }
    visitProcessing(node) {
      this.buffer.write("<?");
      this.buffer.write(node.target);
      if (node.text[$isNotEmpty]) {
        this.buffer.write(" ");
        this.buffer.write(node.text);
      }
      this.buffer.write("?>");
    }
    visitText(node) {
      this.buffer.write(this.entityMapping.encodeText(node.text));
    }
    writeAttributes(node) {
      for (let attribute of node.attributes) {
        this.buffer.write(" ");
        this.visit(dart.dynamic, attribute);
      }
    }
    writeChildren(node) {
      node.children[$forEach](dart.gbind(dart.bind(this, 'visit'), dart.dynamic));
    }
  };
  (writer.XmlWriter.new = function(buffer, entityMapping) {
    this[buffer$] = buffer;
    this[entityMapping$] = entityMapping;
    ;
  }).prototype = writer.XmlWriter.prototype;
  dart.addTypeTests(writer.XmlWriter);
  dart.setMethodSignature(writer.XmlWriter, () => ({
    __proto__: dart.getMethods(writer.XmlWriter.__proto__),
    visitAttribute: dart.fnType(dart.void, [attribute$.XmlAttribute]),
    visitCDATA: dart.fnType(dart.void, [cdata.XmlCDATA]),
    visitComment: dart.fnType(dart.void, [comment.XmlComment]),
    visitDoctype: dart.fnType(dart.void, [doctype.XmlDoctype]),
    visitDocument: dart.fnType(dart.void, [document.XmlDocument]),
    visitDocumentFragment: dart.fnType(dart.void, [document_fragment.XmlDocumentFragment]),
    visitElement: dart.fnType(dart.void, [element.XmlElement]),
    visitName: dart.fnType(dart.void, [name$.XmlName]),
    visitProcessing: dart.fnType(dart.void, [processing.XmlProcessing]),
    visitText: dart.fnType(dart.void, [text$.XmlText]),
    writeAttributes: dart.fnType(dart.void, [node$.XmlNode]),
    writeChildren: dart.fnType(dart.void, [node$.XmlNode])
  }));
  dart.setLibraryUri(writer.XmlWriter, "package:xml/src/xml/visitors/writer.dart");
  dart.setFieldSignature(writer.XmlWriter, () => ({
    __proto__: dart.getFields(writer.XmlWriter.__proto__),
    buffer: dart.finalFieldType(core.StringBuffer),
    entityMapping: dart.finalFieldType(entity_mapping.XmlEntityMapping)
  }));
  token$0.XmlToken = class XmlToken extends core.Object {};
  (token$0.XmlToken.new = function() {
    ;
  }).prototype = token$0.XmlToken.prototype;
  dart.addTypeTests(token$0.XmlToken);
  dart.setLibraryUri(token$0.XmlToken, "package:xml/src/xml/utils/token.dart");
  dart.defineLazy(token$0.XmlToken, {
    /*token$0.XmlToken.doubleQuote*/get doubleQuote() {
      return "\"";
    },
    /*token$0.XmlToken.singleQuote*/get singleQuote() {
      return "'";
    },
    /*token$0.XmlToken.equals*/get equals() {
      return "=";
    },
    /*token$0.XmlToken.namespace*/get namespace() {
      return ":";
    },
    /*token$0.XmlToken.whitespace*/get whitespace() {
      return " ";
    },
    /*token$0.XmlToken.openComment*/get openComment() {
      return "<!--";
    },
    /*token$0.XmlToken.closeComment*/get closeComment() {
      return "-->";
    },
    /*token$0.XmlToken.openCDATA*/get openCDATA() {
      return "<![CDATA[";
    },
    /*token$0.XmlToken.closeCDATA*/get closeCDATA() {
      return "]]>";
    },
    /*token$0.XmlToken.openElement*/get openElement() {
      return "<";
    },
    /*token$0.XmlToken.closeElement*/get closeElement() {
      return ">";
    },
    /*token$0.XmlToken.openEndElement*/get openEndElement() {
      return "</";
    },
    /*token$0.XmlToken.closeEndElement*/get closeEndElement() {
      return "/>";
    },
    /*token$0.XmlToken.openDoctype*/get openDoctype() {
      return "<!DOCTYPE";
    },
    /*token$0.XmlToken.closeDoctype*/get closeDoctype() {
      return ">";
    },
    /*token$0.XmlToken.openDoctypeBlock*/get openDoctypeBlock() {
      return "[";
    },
    /*token$0.XmlToken.closeDoctypeBlock*/get closeDoctypeBlock() {
      return "]";
    },
    /*token$0.XmlToken.openProcessing*/get openProcessing() {
      return "<?";
    },
    /*token$0.XmlToken.closeProcessing*/get closeProcessing() {
      return "?>";
    }
  });
  const _text = dart.privateName(data, "_text");
  const _filterElements = dart.privateName(parent, "_filterElements");
  const children$0 = dart.privateName(parent, "XmlParent.children");
  const XmlNode_XmlOwnedMixin$36 = class XmlNode_XmlOwnedMixin extends node$.XmlNode {};
  (XmlNode_XmlOwnedMixin$36.new = function() {
    owned.XmlOwnedMixin$(parent.XmlParent)[dart.mixinNew].call(this);
  }).prototype = XmlNode_XmlOwnedMixin$36.prototype;
  parent.XmlParent = class XmlParent extends XmlNode_XmlOwnedMixin$36 {
    get children() {
      return this[children$0];
    }
    set children(value) {
      super.children = value;
    }
    findElements(name, opts) {
      let namespace = opts && 'namespace' in opts ? opts.namespace : null;
      return this[_filterElements](this.children, name, namespace);
    }
    findAllElements(name, opts) {
      let namespace = opts && 'namespace' in opts ? opts.namespace : null;
      return this[_filterElements](this.descendants, name, namespace);
    }
    [_filterElements](iterable, name, namespace) {
      let matcher = name_matcher.createNameMatcher(name, namespace);
      return iterable[$whereType](element.XmlElement)[$where](matcher);
    }
  };
  (parent.XmlParent.new = function(supportedChildrenTypes, childrenIterable) {
    this[children$0] = new (XmlNodeListOfXmlNode()).new(supportedChildrenTypes);
    parent.XmlParent.__proto__.new.call(this);
    this.children.attachParent(this);
    this.children.addAll(childrenIterable);
  }).prototype = parent.XmlParent.prototype;
  dart.addTypeTests(parent.XmlParent);
  dart.setMethodSignature(parent.XmlParent, () => ({
    __proto__: dart.getMethods(parent.XmlParent.__proto__),
    findElements: dart.fnType(core.Iterable$(element.XmlElement), [core.String], {namespace: core.String}, {}),
    findAllElements: dart.fnType(core.Iterable$(element.XmlElement), [core.String], {namespace: core.String}, {}),
    [_filterElements]: dart.fnType(core.Iterable$(element.XmlElement), [core.Iterable$(node$.XmlNode), core.String, core.String])
  }));
  dart.setLibraryUri(parent.XmlParent, "package:xml/src/xml/nodes/parent.dart");
  dart.setFieldSignature(parent.XmlParent, () => ({
    __proto__: dart.getFields(parent.XmlParent.__proto__),
    children: dart.finalFieldType(node_list.XmlNodeList$(node$.XmlNode))
  }));
  const XmlNode_XmlOwnedMixin$36$ = class XmlNode_XmlOwnedMixin extends node$.XmlNode {};
  (XmlNode_XmlOwnedMixin$36$.new = function() {
    owned.XmlOwnedMixin$(parent.XmlParent)[dart.mixinNew].call(this);
  }).prototype = XmlNode_XmlOwnedMixin$36$.prototype;
  dart.applyMixin(XmlNode_XmlOwnedMixin$36$, owned.XmlOwnedMixin$(parent.XmlParent));
  data.XmlData = class XmlData extends XmlNode_XmlOwnedMixin$36$ {
    get text() {
      return this[_text];
    }
    set text(text) {
      core.ArgumentError.checkNotNull(text, "text");
      this[_text] = text;
    }
  };
  (data.XmlData.new = function(text) {
    this[_text] = null;
    data.XmlData.__proto__.new.call(this);
    this.text = text;
  }).prototype = data.XmlData.prototype;
  dart.addTypeTests(data.XmlData);
  dart.setSetterSignature(data.XmlData, () => ({
    __proto__: dart.getSetters(data.XmlData.__proto__),
    text: core.String
  }));
  dart.setLibraryUri(data.XmlData, "package:xml/src/xml/nodes/data.dart");
  dart.setFieldSignature(data.XmlData, () => ({
    __proto__: dart.getFields(data.XmlData.__proto__),
    [_text]: dart.fieldType(core.String)
  }));
  text$.XmlText = class XmlText extends data.XmlData {
    get nodeType() {
      return node_type.XmlNodeType.TEXT;
    }
    accept(visitor) {
      return visitor.visitText(this);
    }
  };
  (text$.XmlText.new = function(text) {
    text$.XmlText.__proto__.new.call(this, text);
    ;
  }).prototype = text$.XmlText.prototype;
  dart.addTypeTests(text$.XmlText);
  dart.setMethodSignature(text$.XmlText, () => ({
    __proto__: dart.getMethods(text$.XmlText.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(text$.XmlText, () => ({
    __proto__: dart.getGetters(text$.XmlText.__proto__),
    nodeType: node_type.XmlNodeType
  }));
  dart.setLibraryUri(text$.XmlText, "package:xml/src/xml/nodes/text.dart");
  cdata.XmlCDATA = class XmlCDATA extends data.XmlData {
    get nodeType() {
      return node_type.XmlNodeType.CDATA;
    }
    accept(visitor) {
      return visitor.visitCDATA(this);
    }
  };
  (cdata.XmlCDATA.new = function(text) {
    cdata.XmlCDATA.__proto__.new.call(this, text);
    ;
  }).prototype = cdata.XmlCDATA.prototype;
  dart.addTypeTests(cdata.XmlCDATA);
  dart.setMethodSignature(cdata.XmlCDATA, () => ({
    __proto__: dart.getMethods(cdata.XmlCDATA.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(cdata.XmlCDATA, () => ({
    __proto__: dart.getGetters(cdata.XmlCDATA.__proto__),
    nodeType: node_type.XmlNodeType
  }));
  dart.setLibraryUri(cdata.XmlCDATA, "package:xml/src/xml/nodes/cdata.dart");
  const _name$ = dart.privateName(node_type, "_name");
  let C5;
  let C6;
  let C7;
  let C8;
  let C9;
  let C10;
  let C11;
  let C12;
  let C13;
  let C14;
  node_type.XmlNodeType = class XmlNodeType extends core.Object {
    toString() {
      return this[_name$];
    }
  };
  (node_type.XmlNodeType.new = function(index, _name) {
    this.index = index;
    this[_name$] = _name;
    ;
  }).prototype = node_type.XmlNodeType.prototype;
  dart.addTypeTests(node_type.XmlNodeType);
  dart.setLibraryUri(node_type.XmlNodeType, "package:xml/src/xml/utils/node_type.dart");
  dart.setFieldSignature(node_type.XmlNodeType, () => ({
    __proto__: dart.getFields(node_type.XmlNodeType.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(node_type.XmlNodeType, ['toString']);
  node_type.XmlNodeType.ELEMENT = C5 || CT.C5;
  node_type.XmlNodeType.ATTRIBUTE = C6 || CT.C6;
  node_type.XmlNodeType.TEXT = C7 || CT.C7;
  node_type.XmlNodeType.CDATA = C8 || CT.C8;
  node_type.XmlNodeType.PROCESSING = C9 || CT.C9;
  node_type.XmlNodeType.COMMENT = C10 || CT.C10;
  node_type.XmlNodeType.DOCUMENT = C11 || CT.C11;
  node_type.XmlNodeType.DOCUMENT_FRAGMENT = C12 || CT.C12;
  node_type.XmlNodeType.DOCUMENT_TYPE = C13 || CT.C13;
  node_type.XmlNodeType.values = C14 || CT.C14;
  const _name$0 = dart.privateName(attribute_type, "_name");
  let C15;
  const _value = dart.privateName(attribute$, "_value");
  const name$0 = dart.privateName(element, "XmlElement.name");
  const attributes$ = dart.privateName(element, "XmlElement.attributes");
  const isSelfClosing$ = dart.privateName(element, "XmlElement.isSelfClosing");
  element.XmlElement = class XmlElement extends parent.XmlParent {
    get name() {
      return this[name$0];
    }
    set name(value) {
      super.name = value;
    }
    get attributes() {
      return this[attributes$];
    }
    set attributes(value) {
      super.attributes = value;
    }
    get isSelfClosing() {
      return this[isSelfClosing$];
    }
    set isSelfClosing(value) {
      this[isSelfClosing$] = value;
    }
    getAttribute(name, opts) {
      let t0;
      let namespace = opts && 'namespace' in opts ? opts.namespace : null;
      t0 = this.getAttributeNode(name, {namespace: namespace});
      return t0 == null ? null : t0.value;
    }
    getAttributeNode(name, opts) {
      let namespace = opts && 'namespace' in opts ? opts.namespace : null;
      return this.attributes.firstWhere(name_matcher.createNameMatcher(name, namespace), {orElse: dart.fn(() => null, VoidToNull())});
    }
    get nodeType() {
      return node_type.XmlNodeType.ELEMENT;
    }
    accept(visitor) {
      return visitor.visitElement(this);
    }
  };
  (element.XmlElement.new = function(name, attributesIterable = C4 || CT.C4, children = C3 || CT.C3, isSelfClosing = true) {
    this[name$0] = name;
    this[isSelfClosing$] = isSelfClosing;
    this[attributes$] = new (XmlNodeListOfXmlAttribute()).new(element.attributeNodeTypes);
    element.XmlElement.__proto__.new.call(this, element.childrenNodeTypes, children);
    this.name.attachParent(this);
    this.attributes.attachParent(this);
    this.attributes.addAll(attributesIterable);
  }).prototype = element.XmlElement.prototype;
  dart.addTypeTests(element.XmlElement);
  element.XmlElement[dart.implements] = () => [named.XmlNamed];
  dart.setMethodSignature(element.XmlElement, () => ({
    __proto__: dart.getMethods(element.XmlElement.__proto__),
    getAttribute: dart.fnType(core.String, [core.String], {namespace: core.String}, {}),
    getAttributeNode: dart.fnType(attribute$.XmlAttribute, [core.String], {namespace: core.String}, {}),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(element.XmlElement, () => ({
    __proto__: dart.getGetters(element.XmlElement.__proto__),
    nodeType: node_type.XmlNodeType
  }));
  dart.setLibraryUri(element.XmlElement, "package:xml/src/xml/nodes/element.dart");
  dart.setFieldSignature(element.XmlElement, () => ({
    __proto__: dart.getFields(element.XmlElement.__proto__),
    name: dart.finalFieldType(name$.XmlName),
    attributes: dart.finalFieldType(node_list.XmlNodeList$(attribute$.XmlAttribute)),
    isSelfClosing: dart.fieldType(core.bool)
  }));
  const name$1 = dart.privateName(attribute$, "XmlAttribute.name");
  const attributeType$ = dart.privateName(attribute$, "XmlAttribute.attributeType");
  const XmlNode_XmlOwnedMixin$36$0 = class XmlNode_XmlOwnedMixin extends node$.XmlNode {};
  (XmlNode_XmlOwnedMixin$36$0.new = function() {
    owned.XmlOwnedMixin$(element.XmlElement)[dart.mixinNew].call(this);
  }).prototype = XmlNode_XmlOwnedMixin$36$0.prototype;
  dart.applyMixin(XmlNode_XmlOwnedMixin$36$0, owned.XmlOwnedMixin$(element.XmlElement));
  attribute$.XmlAttribute = class XmlAttribute extends XmlNode_XmlOwnedMixin$36$0 {
    get name() {
      return this[name$1];
    }
    set name(value) {
      super.name = value;
    }
    get attributeType() {
      return this[attributeType$];
    }
    set attributeType(value) {
      super.attributeType = value;
    }
    get value() {
      return this[_value];
    }
    set value(value) {
      core.ArgumentError.checkNotNull(value, "value");
      this[_value] = value;
    }
    get nodeType() {
      return node_type.XmlNodeType.ATTRIBUTE;
    }
    accept(visitor) {
      return visitor.visitAttribute(this);
    }
  };
  (attribute$.XmlAttribute.new = function(name, value, attributeType = C15 || CT.C15) {
    this[_value] = null;
    this[name$1] = name;
    this[attributeType$] = attributeType;
    attribute$.XmlAttribute.__proto__.new.call(this);
    this.name.attachParent(this);
    this.value = value;
  }).prototype = attribute$.XmlAttribute.prototype;
  dart.addTypeTests(attribute$.XmlAttribute);
  attribute$.XmlAttribute[dart.implements] = () => [named.XmlNamed];
  dart.setMethodSignature(attribute$.XmlAttribute, () => ({
    __proto__: dart.getMethods(attribute$.XmlAttribute.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(attribute$.XmlAttribute, () => ({
    __proto__: dart.getGetters(attribute$.XmlAttribute.__proto__),
    value: core.String,
    nodeType: node_type.XmlNodeType
  }));
  dart.setSetterSignature(attribute$.XmlAttribute, () => ({
    __proto__: dart.getSetters(attribute$.XmlAttribute.__proto__),
    value: core.String
  }));
  dart.setLibraryUri(attribute$.XmlAttribute, "package:xml/src/xml/nodes/attribute.dart");
  dart.setFieldSignature(attribute$.XmlAttribute, () => ({
    __proto__: dart.getFields(attribute$.XmlAttribute.__proto__),
    name: dart.finalFieldType(name$.XmlName),
    [_value]: dart.fieldType(core.String),
    attributeType: dart.finalFieldType(attribute_type.XmlAttributeType)
  }));
  let C16;
  let C17;
  dart.defineLazy(element, {
    /*element.childrenNodeTypes*/get childrenNodeTypes() {
      return C16 || CT.C16;
    },
    /*element.attributeNodeTypes*/get attributeNodeTypes() {
      return C17 || CT.C17;
    }
  });
  const _expandFragment = dart.privateName(node_list, "_expandFragment");
  const _expandNodes = dart.privateName(node_list, "_expandNodes");
  const _is_XmlNodeList_default = Symbol('_is_XmlNodeList_default');
  const validNodeTypes$ = dart.privateName(node_list, "XmlNodeList.validNodeTypes");
  node_list.XmlNodeList$ = dart.generic(E => {
    let JSArrayOfE = () => (JSArrayOfE = dart.constFn(_interceptors.JSArray$(E)))();
    let IterableOfE = () => (IterableOfE = dart.constFn(core.Iterable$(E)))();
    let ETobool = () => (ETobool = dart.constFn(dart.fnType(core.bool, [E])))();
    let XmlNodeToE = () => (XmlNodeToE = dart.constFn(dart.fnType(E, [node$.XmlNode])))();
    const DelegatingList_XmlOwnedMixin$36 = class DelegatingList_XmlOwnedMixin extends wrappers.DelegatingList$(E) {};
    (DelegatingList_XmlOwnedMixin$36.new = function(base) {
      owned.XmlOwnedMixin$(node$.XmlNode)[dart.mixinNew].call(this);
      DelegatingList_XmlOwnedMixin$36.__proto__.new.call(this, base);
    }).prototype = DelegatingList_XmlOwnedMixin$36.prototype;
    dart.applyMixin(DelegatingList_XmlOwnedMixin$36, owned.XmlOwnedMixin$(node$.XmlNode));
    class XmlNodeList extends DelegatingList_XmlOwnedMixin$36 {
      get validNodeTypes() {
        return this[validNodeTypes$];
      }
      set validNodeTypes(value) {
        super.validNodeTypes = value;
      }
      _set(index, value$) {
        let value = value$;
        E._check(value);
        exceptions.XmlNodeTypeException.checkNotNull(value);
        core.RangeError.checkValidIndex(index, this);
        exceptions.XmlNodeTypeException.checkValidType(value, this.validNodeTypes);
        exceptions.XmlParentException.checkNoParent(value);
        this._get(index).detachParent(this.parent);
        super._set(index, value);
        value.attachParent(this.parent);
        return value$;
      }
      set length(length) {
        return dart.throw(new core.UnsupportedError.new("Unsupported length change of node list."));
      }
      get length() {
        return super.length;
      }
      add(value) {
        E._check(value);
        exceptions.XmlNodeTypeException.checkNotNull(value);
        if (dart.equals(value.nodeType, node_type.XmlNodeType.DOCUMENT_FRAGMENT)) {
          this.addAll(this[_expandFragment](value));
        } else {
          exceptions.XmlNodeTypeException.checkValidType(value, this.validNodeTypes);
          exceptions.XmlParentException.checkNoParent(value);
          super.add(value);
          value.attachParent(this.parent);
        }
      }
      addAll(iterable) {
        IterableOfE()._check(iterable);
        let expanded = this[_expandNodes](iterable);
        super.addAll(expanded);
        for (let node of expanded) {
          node.attachParent(this.parent);
        }
      }
      remove(value) {
        let removed = super.remove(value);
        if (dart.test(removed)) {
          let node = E._check(value);
          node.detachParent(this.parent);
        }
        return removed;
      }
      removeWhere(test) {
        super.removeWhere(dart.fn(node => {
          let remove = test(node);
          if (dart.test(remove)) {
            node.detachParent(this.parent);
          }
          return remove;
        }, ETobool()));
      }
      retainWhere(test) {
        super.retainWhere(dart.fn(node => {
          let retain = test(node);
          if (!dart.test(retain)) {
            node.detachParent(this.parent);
          }
          return retain;
        }, ETobool()));
      }
      clear() {
        for (let node of this) {
          node.detachParent(this.parent);
        }
        super.clear();
      }
      removeLast() {
        let node = super.removeLast();
        node.detachParent(this.parent);
        return node;
      }
      removeRange(start, end) {
        core.RangeError.checkValidRange(start, end, this.length);
        for (let i = start; dart.notNull(i) < dart.notNull(end); i = dart.notNull(i) + 1) {
          this._get(i).detachParent(this.parent);
        }
        super.removeRange(start, end);
      }
      fillRange(start, end, fillValue = null) {
        E._check(fillValue);
        return dart.throw(new core.UnsupportedError.new("Unsupported range filling of node list."));
      }
      setRange(start, end, iterable, skipCount = 0) {
        IterableOfE()._check(iterable);
        core.RangeError.checkValidRange(start, end, this.length);
        let expanded = this[_expandNodes](iterable);
        for (let i = start; dart.notNull(i) < dart.notNull(end); i = dart.notNull(i) + 1) {
          this._get(i).detachParent(this.parent);
        }
        super.setRange(start, end, expanded, skipCount);
        for (let i = start; dart.notNull(i) < dart.notNull(end); i = dart.notNull(i) + 1) {
          this._get(i).attachParent(this.parent);
        }
      }
      replaceRange(start, end, iterable) {
        IterableOfE()._check(iterable);
        core.RangeError.checkValidRange(start, end, this.length);
        let expanded = this[_expandNodes](iterable);
        for (let i = start; dart.notNull(i) < dart.notNull(end); i = dart.notNull(i) + 1) {
          this._get(i).detachParent(this.parent);
        }
        super.replaceRange(start, end, expanded);
        for (let node of expanded) {
          node.attachParent(this.parent);
        }
      }
      setAll(index, iterable) {
        IterableOfE()._check(iterable);
        return dart.throw(new core.UnimplementedError.new());
      }
      insert(index, element) {
        E._check(element);
        exceptions.XmlNodeTypeException.checkNotNull(element);
        if (dart.equals(element.nodeType, node_type.XmlNodeType.DOCUMENT_FRAGMENT)) {
          this.insertAll(index, this[_expandFragment](element));
        } else {
          exceptions.XmlNodeTypeException.checkValidType(element, this.validNodeTypes);
          exceptions.XmlParentException.checkNoParent(element);
          super.insert(index, element);
          element.attachParent(this.parent);
        }
      }
      insertAll(index, iterable) {
        IterableOfE()._check(iterable);
        let expanded = this[_expandNodes](iterable);
        super.insertAll(index, expanded);
        for (let node of expanded) {
          node.attachParent(this.parent);
        }
      }
      removeAt(index) {
        core.RangeError.checkValidIndex(index, this);
        this._get(index).detachParent(this.parent);
        return super.removeAt(index);
      }
      [_expandFragment](fragment) {
        return fragment.children[$map](E, dart.fn(node => {
          exceptions.XmlNodeTypeException.checkValidType(node, this.validNodeTypes);
          return E._check(node.copy());
        }, XmlNodeToE()));
      }
      [_expandNodes](iterable) {
        let expanded = JSArrayOfE().of([]);
        for (let node of iterable) {
          exceptions.XmlNodeTypeException.checkNotNull(node);
          if (dart.equals(node.nodeType, node_type.XmlNodeType.DOCUMENT_FRAGMENT)) {
            expanded[$addAll](this[_expandFragment](node));
          } else {
            exceptions.XmlNodeTypeException.checkValidType(node, this.validNodeTypes);
            exceptions.XmlParentException.checkNoParent(node);
            expanded[$add](node);
          }
        }
        return expanded;
      }
    }
    (XmlNodeList.new = function(validNodeTypes) {
      this[validNodeTypes$] = validNodeTypes;
      XmlNodeList.__proto__.new.call(this, JSArrayOfE().of([]));
      ;
    }).prototype = XmlNodeList.prototype;
    dart.addTypeTests(XmlNodeList);
    XmlNodeList.prototype[_is_XmlNodeList_default] = true;
    dart.setMethodSignature(XmlNodeList, () => ({
      __proto__: dart.getMethods(XmlNodeList.__proto__),
      [_expandFragment]: dart.fnType(core.Iterable$(E), [E]),
      [_expandNodes]: dart.fnType(core.Iterable$(E), [core.Iterable$(E)])
    }));
    dart.setLibraryUri(XmlNodeList, "package:xml/src/xml/utils/node_list.dart");
    dart.setFieldSignature(XmlNodeList, () => ({
      __proto__: dart.getFields(XmlNodeList.__proto__),
      validNodeTypes: dart.finalFieldType(core.Set$(node_type.XmlNodeType))
    }));
    dart.defineExtensionMethods(XmlNodeList, [
      '_set',
      'add',
      'addAll',
      'remove',
      'removeWhere',
      'retainWhere',
      'clear',
      'removeLast',
      'removeRange',
      'fillRange',
      'setRange',
      'replaceRange',
      'setAll',
      'insert',
      'insertAll',
      'removeAt'
    ]);
    dart.defineExtensionAccessors(XmlNodeList, ['length']);
    return XmlNodeList;
  });
  node_list.XmlNodeList = node_list.XmlNodeList$();
  dart.addTypeTests(node_list.XmlNodeList, _is_XmlNodeList_default);
  owned.XmlOwned = class XmlOwned extends core.Object {};
  (owned.XmlOwned.new = function() {
    ;
  }).prototype = owned.XmlOwned.prototype;
  dart.addTypeTests(owned.XmlOwned);
  dart.setLibraryUri(owned.XmlOwned, "package:xml/src/xml/utils/owned.dart");
  const message$ = dart.privateName(exceptions, "XmlException.message");
  exceptions.XmlException = class XmlException extends core.Object {
    get message() {
      return this[message$];
    }
    set message(value) {
      super.message = value;
    }
    toString() {
      let t0;
      t0 = this.message;
      return t0 == null ? super[$toString]() : t0;
    }
  };
  (exceptions.XmlException.new = function(message = null) {
    this[message$] = message;
    ;
  }).prototype = exceptions.XmlException.prototype;
  dart.addTypeTests(exceptions.XmlException);
  exceptions.XmlException[dart.implements] = () => [core.Exception];
  dart.setLibraryUri(exceptions.XmlException, "package:xml/src/xml/utils/exceptions.dart");
  dart.setFieldSignature(exceptions.XmlException, () => ({
    __proto__: dart.getFields(exceptions.XmlException.__proto__),
    message: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(exceptions.XmlException, ['toString']);
  const buffer$0 = dart.privateName(exceptions, "XmlParserException.buffer");
  const position$ = dart.privateName(exceptions, "XmlParserException.position");
  const line$ = dart.privateName(exceptions, "XmlParserException.line");
  const column$ = dart.privateName(exceptions, "XmlParserException.column");
  exceptions.XmlParserException = class XmlParserException extends exceptions.XmlException {
    get buffer() {
      return this[buffer$0];
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
    get line() {
      return this[line$];
    }
    set line(value) {
      super.line = value;
    }
    get column() {
      return this[column$];
    }
    set column(value) {
      super.column = value;
    }
    get source() {
      return this.buffer;
    }
    get offset() {
      return this.position;
    }
    toString() {
      return dart.str(super.toString()) + " at " + dart.str(this.line) + ":" + dart.str(this.column);
    }
  };
  (exceptions.XmlParserException.new = function(message, opts) {
    let buffer = opts && 'buffer' in opts ? opts.buffer : null;
    let position = opts && 'position' in opts ? opts.position : 0;
    let line = opts && 'line' in opts ? opts.line : 0;
    let column = opts && 'column' in opts ? opts.column : 0;
    this[buffer$0] = buffer;
    this[position$] = position;
    this[line$] = line;
    this[column$] = column;
    exceptions.XmlParserException.__proto__.new.call(this, message);
    ;
  }).prototype = exceptions.XmlParserException.prototype;
  dart.addTypeTests(exceptions.XmlParserException);
  exceptions.XmlParserException[dart.implements] = () => [core.FormatException];
  dart.setGetterSignature(exceptions.XmlParserException, () => ({
    __proto__: dart.getGetters(exceptions.XmlParserException.__proto__),
    source: core.String,
    offset: core.int
  }));
  dart.setLibraryUri(exceptions.XmlParserException, "package:xml/src/xml/utils/exceptions.dart");
  dart.setFieldSignature(exceptions.XmlParserException, () => ({
    __proto__: dart.getFields(exceptions.XmlParserException.__proto__),
    buffer: dart.finalFieldType(core.String),
    position: dart.finalFieldType(core.int),
    line: dart.finalFieldType(core.int),
    column: dart.finalFieldType(core.int)
  }));
  dart.defineExtensionMethods(exceptions.XmlParserException, ['toString']);
  exceptions.XmlNodeTypeException = class XmlNodeTypeException extends exceptions.XmlException {
    static checkNotNull(node) {
      if (node == null) {
        dart.throw(new exceptions.XmlNodeTypeException.new("Node must not be null."));
      }
    }
    static checkValidType(node, types) {
      if (!dart.test(types[$contains](node.nodeType))) {
        dart.throw(new exceptions.XmlNodeTypeException.new("Expected node of type: " + dart.str(types)));
      }
    }
  };
  (exceptions.XmlNodeTypeException.new = function(message) {
    exceptions.XmlNodeTypeException.__proto__.new.call(this, message);
    ;
  }).prototype = exceptions.XmlNodeTypeException.prototype;
  dart.addTypeTests(exceptions.XmlNodeTypeException);
  dart.setLibraryUri(exceptions.XmlNodeTypeException, "package:xml/src/xml/utils/exceptions.dart");
  exceptions.XmlParentException = class XmlParentException extends exceptions.XmlException {
    static checkNoParent(owned) {
      if (dart.test(owned.hasParent)) {
        dart.throw(new exceptions.XmlParentException.new("Node already has a parent, copy or remove it first: " + dart.str(owned)));
      }
    }
  };
  (exceptions.XmlParentException.new = function(message) {
    exceptions.XmlParentException.__proto__.new.call(this, message);
    ;
  }).prototype = exceptions.XmlParentException.prototype;
  dart.addTypeTests(exceptions.XmlParentException);
  dart.setLibraryUri(exceptions.XmlParentException, "package:xml/src/xml/utils/exceptions.dart");
  exceptions.XmlTagException = class XmlTagException extends exceptions.XmlException {};
  (exceptions.XmlTagException.new = function(message) {
    exceptions.XmlTagException.__proto__.new.call(this, message);
    ;
  }).prototype = exceptions.XmlTagException.prototype;
  dart.addTypeTests(exceptions.XmlTagException);
  dart.setLibraryUri(exceptions.XmlTagException, "package:xml/src/xml/utils/exceptions.dart");
  document.XmlDocument = class XmlDocument extends parent.XmlParent {
    get doctypeElement() {
      return doctype.XmlDoctype._check(this.children.firstWhere(dart.fn(node => doctype.XmlDoctype.is(node), XmlNodeTobool()), {orElse: dart.fn(() => null, VoidToNull())}));
    }
    get rootElement() {
      return element.XmlElement._check(this.children.firstWhere(dart.fn(node => element.XmlElement.is(node), XmlNodeTobool()), {orElse: dart.fn(() => dart.throw(new core.StateError.new("Empty XML document")), VoidTobottom())}));
    }
    get document() {
      return this;
    }
    get text() {
      return null;
    }
    get nodeType() {
      return node_type.XmlNodeType.DOCUMENT;
    }
    accept(visitor) {
      return visitor.visitDocument(this);
    }
  };
  (document.XmlDocument.new = function(children = C3 || CT.C3) {
    document.XmlDocument.__proto__.new.call(this, document.childrenNodeTypes, children);
    ;
  }).prototype = document.XmlDocument.prototype;
  dart.addTypeTests(document.XmlDocument);
  dart.setMethodSignature(document.XmlDocument, () => ({
    __proto__: dart.getMethods(document.XmlDocument.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(document.XmlDocument, () => ({
    __proto__: dart.getGetters(document.XmlDocument.__proto__),
    doctypeElement: doctype.XmlDoctype,
    rootElement: element.XmlElement,
    nodeType: node_type.XmlNodeType
  }));
  dart.setLibraryUri(document.XmlDocument, "package:xml/src/xml/nodes/document.dart");
  let C18;
  dart.defineLazy(document, {
    /*document.childrenNodeTypes*/get childrenNodeTypes() {
      return C18 || CT.C18;
    }
  });
  doctype.XmlDoctype = class XmlDoctype extends data.XmlData {
    get nodeType() {
      return node_type.XmlNodeType.DOCUMENT_TYPE;
    }
    accept(visitor) {
      return visitor.visitDoctype(this);
    }
  };
  (doctype.XmlDoctype.new = function(text) {
    doctype.XmlDoctype.__proto__.new.call(this, text);
    ;
  }).prototype = doctype.XmlDoctype.prototype;
  dart.addTypeTests(doctype.XmlDoctype);
  dart.setMethodSignature(doctype.XmlDoctype, () => ({
    __proto__: dart.getMethods(doctype.XmlDoctype.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(doctype.XmlDoctype, () => ({
    __proto__: dart.getGetters(doctype.XmlDoctype.__proto__),
    nodeType: node_type.XmlNodeType
  }));
  dart.setLibraryUri(doctype.XmlDoctype, "package:xml/src/xml/nodes/doctype.dart");
  named.XmlNamed = class XmlNamed extends core.Object {};
  (named.XmlNamed.new = function() {
    ;
  }).prototype = named.XmlNamed.prototype;
  dart.addTypeTests(named.XmlNamed);
  dart.setLibraryUri(named.XmlNamed, "package:xml/src/xml/utils/named.dart");
  name_matcher.createNameMatcher = function createNameMatcher(name, namespace) {
    if (name == null) {
      dart.throw(new core.ArgumentError.new("Illegal name matcher."));
    } else if (name === "*") {
      if (namespace == null || namespace === "*") {
        return dart.fn(named => true, XmlNamedTobool());
      } else {
        return dart.fn(named => named.name.namespaceUri == namespace, XmlNamedTobool());
      }
    } else {
      if (namespace == null) {
        return dart.fn(named => named.name.qualified == name, XmlNamedTobool());
      } else if (namespace === "*") {
        return dart.fn(named => named.name.local == name, XmlNamedTobool());
      } else {
        return dart.fn(named => named.name.local == name && named.name.namespaceUri == namespace, XmlNamedTobool());
      }
    }
  };
  let C19;
  let C20;
  attribute_type.XmlAttributeType = class XmlAttributeType extends core.Object {
    toString() {
      return this[_name$0];
    }
  };
  (attribute_type.XmlAttributeType.new = function(index, _name) {
    this.index = index;
    this[_name$0] = _name;
    ;
  }).prototype = attribute_type.XmlAttributeType.prototype;
  dart.addTypeTests(attribute_type.XmlAttributeType);
  dart.setLibraryUri(attribute_type.XmlAttributeType, "package:xml/src/xml/utils/attribute_type.dart");
  dart.setFieldSignature(attribute_type.XmlAttributeType, () => ({
    __proto__: dart.getFields(attribute_type.XmlAttributeType.__proto__),
    index: dart.finalFieldType(core.int),
    [_name$0]: dart.finalFieldType(core.String)
  }));
  dart.defineExtensionMethods(attribute_type.XmlAttributeType, ['toString']);
  attribute_type.XmlAttributeType.SINGLE_QUOTE = C19 || CT.C19;
  attribute_type.XmlAttributeType.DOUBLE_QUOTE = C15 || CT.C15;
  attribute_type.XmlAttributeType.values = C20 || CT.C20;
  const _normalize = dart.privateName(normalizer, "_normalize");
  const _removeEmpty = dart.privateName(normalizer, "_removeEmpty");
  const _mergeAdjacent = dart.privateName(normalizer, "_mergeAdjacent");
  const Object_XmlVisitor$36$0 = class Object_XmlVisitor extends core.Object {};
  (Object_XmlVisitor$36$0.new = function() {
  }).prototype = Object_XmlVisitor$36$0.prototype;
  dart.applyMixin(Object_XmlVisitor$36$0, visitor.XmlVisitor);
  normalizer.XmlNormalizer = class XmlNormalizer extends Object_XmlVisitor$36$0 {
    visitDocument(node) {
      return this[_normalize](node.children);
    }
    visitDocumentFragment(node) {
      return this[_normalize](node.children);
    }
    visitElement(node) {
      return this[_normalize](node.children);
    }
    [_normalize](children) {
      this[_removeEmpty](children);
      this[_mergeAdjacent](children);
      children[$forEach](dart.gbind(dart.bind(this, 'visit'), dart.dynamic));
    }
    [_removeEmpty](children) {
      for (let i = 0; i < dart.notNull(children[$length]);) {
        let node = children[$_get](i);
        if (dart.equals(node.nodeType, node_type.XmlNodeType.TEXT) && node.text[$isEmpty]) {
          children[$removeAt](i);
        } else {
          i = i + 1;
        }
      }
    }
    [_mergeAdjacent](children) {
      let t0;
      let previousText = null;
      for (let i = 0; i < dart.notNull(children[$length]);) {
        let node = children[$_get](i);
        if (dart.equals(node.nodeType, node_type.XmlNodeType.TEXT)) {
          if (previousText == null) {
            previousText = text$.XmlText._check(node);
            i = i + 1;
          } else {
            t0 = previousText;
            t0.text = dart.notNull(t0.text) + dart.notNull(node.text);
            children[$removeAt](i);
          }
        } else {
          previousText = null;
          i = i + 1;
        }
      }
    }
  };
  (normalizer.XmlNormalizer.new = function() {
    ;
  }).prototype = normalizer.XmlNormalizer.prototype;
  dart.addTypeTests(normalizer.XmlNormalizer);
  dart.setMethodSignature(normalizer.XmlNormalizer, () => ({
    __proto__: dart.getMethods(normalizer.XmlNormalizer.__proto__),
    visitDocument: dart.fnType(dart.void, [document.XmlDocument]),
    visitDocumentFragment: dart.fnType(dart.void, [document_fragment.XmlDocumentFragment]),
    visitElement: dart.fnType(dart.void, [element.XmlElement]),
    [_normalize]: dart.fnType(dart.void, [core.List$(node$.XmlNode)]),
    [_removeEmpty]: dart.fnType(dart.void, [core.List$(node$.XmlNode)]),
    [_mergeAdjacent]: dart.fnType(dart.void, [core.List$(node$.XmlNode)])
  }));
  dart.setLibraryUri(normalizer.XmlNormalizer, "package:xml/src/xml/visitors/normalizer.dart");
  dart.defineLazy(normalizer.XmlNormalizer, {
    /*normalizer.XmlNormalizer.defaultInstance*/get defaultInstance() {
      return new normalizer.XmlNormalizer.new();
    }
  });
  document_fragment.XmlDocumentFragment = class XmlDocumentFragment extends parent.XmlParent {
    get document() {
      return null;
    }
    get text() {
      return null;
    }
    get nodeType() {
      return node_type.XmlNodeType.DOCUMENT_FRAGMENT;
    }
    accept(visitor) {
      return visitor.visitDocumentFragment(this);
    }
  };
  (document_fragment.XmlDocumentFragment.new = function(children = C3 || CT.C3) {
    document_fragment.XmlDocumentFragment.__proto__.new.call(this, document_fragment.childrenNodeTypes, children);
    ;
  }).prototype = document_fragment.XmlDocumentFragment.prototype;
  dart.addTypeTests(document_fragment.XmlDocumentFragment);
  dart.setMethodSignature(document_fragment.XmlDocumentFragment, () => ({
    __proto__: dart.getMethods(document_fragment.XmlDocumentFragment.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(document_fragment.XmlDocumentFragment, () => ({
    __proto__: dart.getGetters(document_fragment.XmlDocumentFragment.__proto__),
    nodeType: node_type.XmlNodeType
  }));
  dart.setLibraryUri(document_fragment.XmlDocumentFragment, "package:xml/src/xml/nodes/document_fragment.dart");
  dart.defineLazy(document_fragment, {
    /*document_fragment.childrenNodeTypes*/get childrenNodeTypes() {
      return C18 || CT.C18;
    }
  });
  const start$ = dart.privateName(preceding, "XmlPrecedingIterable.start");
  preceding.XmlPrecedingIterable = class XmlPrecedingIterable extends collection.IterableBase$(node$.XmlNode) {
    get start() {
      return this[start$];
    }
    set start(value) {
      super.start = value;
    }
    get iterator() {
      return new preceding.XmlPrecedingIterator.new(this.start);
    }
  };
  (preceding.XmlPrecedingIterable.new = function(start) {
    this[start$] = start;
    preceding.XmlPrecedingIterable.__proto__.new.call(this);
    ;
  }).prototype = preceding.XmlPrecedingIterable.prototype;
  dart.addTypeTests(preceding.XmlPrecedingIterable);
  dart.setGetterSignature(preceding.XmlPrecedingIterable, () => ({
    __proto__: dart.getGetters(preceding.XmlPrecedingIterable.__proto__),
    iterator: core.Iterator$(node$.XmlNode),
    [$iterator]: core.Iterator$(node$.XmlNode)
  }));
  dart.setLibraryUri(preceding.XmlPrecedingIterable, "package:xml/src/xml/iterators/preceding.dart");
  dart.setFieldSignature(preceding.XmlPrecedingIterable, () => ({
    __proto__: dart.getFields(preceding.XmlPrecedingIterable.__proto__),
    start: dart.finalFieldType(node$.XmlNode)
  }));
  dart.defineExtensionAccessors(preceding.XmlPrecedingIterable, ['iterator']);
  const start$0 = dart.privateName(preceding, "XmlPrecedingIterator.start");
  const todo = dart.privateName(preceding, "XmlPrecedingIterator.todo");
  const current = dart.privateName(preceding, "XmlPrecedingIterator.current");
  preceding.XmlPrecedingIterator = class XmlPrecedingIterator extends core.Iterator$(node$.XmlNode) {
    get start() {
      return this[start$0];
    }
    set start(value) {
      super.start = value;
    }
    get todo() {
      return this[todo];
    }
    set todo(value) {
      super.todo = value;
    }
    get current() {
      return this[current];
    }
    set current(value) {
      this[current] = value;
    }
    moveNext() {
      if (dart.test(this.todo[$isEmpty])) {
        this.current = null;
        return false;
      } else {
        this.current = this.todo[$removeLast]();
        if (this.current == this.start) {
          this.current = null;
          this.todo[$clear]();
          return false;
        }
        this.todo[$addAll](this.current.children[$reversed]);
        this.todo[$addAll](this.current.attributes[$reversed]);
        return true;
      }
    }
  };
  (preceding.XmlPrecedingIterator.new = function(start) {
    this[todo] = JSArrayOfXmlNode().of([]);
    this[current] = null;
    this[start$0] = start;
    this.todo[$add](this.start.root);
  }).prototype = preceding.XmlPrecedingIterator.prototype;
  dart.addTypeTests(preceding.XmlPrecedingIterator);
  dart.setMethodSignature(preceding.XmlPrecedingIterator, () => ({
    __proto__: dart.getMethods(preceding.XmlPrecedingIterator.__proto__),
    moveNext: dart.fnType(core.bool, [])
  }));
  dart.setLibraryUri(preceding.XmlPrecedingIterator, "package:xml/src/xml/iterators/preceding.dart");
  dart.setFieldSignature(preceding.XmlPrecedingIterator, () => ({
    __proto__: dart.getFields(preceding.XmlPrecedingIterator.__proto__),
    start: dart.finalFieldType(node$.XmlNode),
    todo: dart.finalFieldType(core.List$(node$.XmlNode)),
    current: dart.fieldType(node$.XmlNode)
  }));
  const start$1 = dart.privateName(following, "XmlFollowingIterable.start");
  following.XmlFollowingIterable = class XmlFollowingIterable extends collection.IterableBase$(node$.XmlNode) {
    get start() {
      return this[start$1];
    }
    set start(value) {
      super.start = value;
    }
    get iterator() {
      return new following.XmlFollowingIterator.new(this.start);
    }
  };
  (following.XmlFollowingIterable.new = function(start) {
    this[start$1] = start;
    following.XmlFollowingIterable.__proto__.new.call(this);
    ;
  }).prototype = following.XmlFollowingIterable.prototype;
  dart.addTypeTests(following.XmlFollowingIterable);
  dart.setGetterSignature(following.XmlFollowingIterable, () => ({
    __proto__: dart.getGetters(following.XmlFollowingIterable.__proto__),
    iterator: core.Iterator$(node$.XmlNode),
    [$iterator]: core.Iterator$(node$.XmlNode)
  }));
  dart.setLibraryUri(following.XmlFollowingIterable, "package:xml/src/xml/iterators/following.dart");
  dart.setFieldSignature(following.XmlFollowingIterable, () => ({
    __proto__: dart.getFields(following.XmlFollowingIterable.__proto__),
    start: dart.finalFieldType(node$.XmlNode)
  }));
  dart.defineExtensionAccessors(following.XmlFollowingIterable, ['iterator']);
  const todo$ = dart.privateName(following, "XmlFollowingIterator.todo");
  const current$ = dart.privateName(following, "XmlFollowingIterator.current");
  following.XmlFollowingIterator = class XmlFollowingIterator extends core.Iterator$(node$.XmlNode) {
    get todo() {
      return this[todo$];
    }
    set todo(value) {
      super.todo = value;
    }
    get current() {
      return this[current$];
    }
    set current(value) {
      this[current$] = value;
    }
    moveNext() {
      if (dart.test(this.todo[$isEmpty])) {
        this.current = null;
        return false;
      } else {
        this.current = this.todo[$removeLast]();
        this.todo[$addAll](this.current.children[$reversed]);
        this.todo[$addAll](this.current.attributes[$reversed]);
        return true;
      }
    }
  };
  (following.XmlFollowingIterator.new = function(start) {
    this[todo$] = JSArrayOfXmlNode().of([]);
    this[current$] = null;
    let following = JSArrayOfXmlNode().of([]);
    for (let parent = start.parent, child = start; parent != null; parent = parent.parent, child = child.parent) {
      if (attribute$.XmlAttribute.is(child)) {
        let attributesIndex = parent.attributes[$indexOf](child);
        following[$addAll](parent.attributes[$sublist](dart.notNull(attributesIndex) + 1));
        following[$addAll](parent.children);
      } else {
        let childrenIndex = parent.children[$indexOf](child);
        following[$addAll](parent.children[$sublist](dart.notNull(childrenIndex) + 1));
      }
    }
    this.todo[$addAll](following[$reversed]);
  }).prototype = following.XmlFollowingIterator.prototype;
  dart.addTypeTests(following.XmlFollowingIterator);
  dart.setMethodSignature(following.XmlFollowingIterator, () => ({
    __proto__: dart.getMethods(following.XmlFollowingIterator.__proto__),
    moveNext: dart.fnType(core.bool, [])
  }));
  dart.setLibraryUri(following.XmlFollowingIterator, "package:xml/src/xml/iterators/following.dart");
  dart.setFieldSignature(following.XmlFollowingIterator, () => ({
    __proto__: dart.getFields(following.XmlFollowingIterator.__proto__),
    todo: dart.finalFieldType(core.List$(node$.XmlNode)),
    current: dart.fieldType(node$.XmlNode)
  }));
  const start$2 = dart.privateName(descendants, "XmlDescendantsIterable.start");
  descendants.XmlDescendantsIterable = class XmlDescendantsIterable extends collection.IterableBase$(node$.XmlNode) {
    get start() {
      return this[start$2];
    }
    set start(value) {
      super.start = value;
    }
    get iterator() {
      return new descendants.XmlDescendantsIterator.new(this.start);
    }
  };
  (descendants.XmlDescendantsIterable.new = function(start) {
    this[start$2] = start;
    descendants.XmlDescendantsIterable.__proto__.new.call(this);
    ;
  }).prototype = descendants.XmlDescendantsIterable.prototype;
  dart.addTypeTests(descendants.XmlDescendantsIterable);
  dart.setGetterSignature(descendants.XmlDescendantsIterable, () => ({
    __proto__: dart.getGetters(descendants.XmlDescendantsIterable.__proto__),
    iterator: core.Iterator$(node$.XmlNode),
    [$iterator]: core.Iterator$(node$.XmlNode)
  }));
  dart.setLibraryUri(descendants.XmlDescendantsIterable, "package:xml/src/xml/iterators/descendants.dart");
  dart.setFieldSignature(descendants.XmlDescendantsIterable, () => ({
    __proto__: dart.getFields(descendants.XmlDescendantsIterable.__proto__),
    start: dart.finalFieldType(node$.XmlNode)
  }));
  dart.defineExtensionAccessors(descendants.XmlDescendantsIterable, ['iterator']);
  const todo$0 = dart.privateName(descendants, "XmlDescendantsIterator.todo");
  const current$0 = dart.privateName(descendants, "XmlDescendantsIterator.current");
  descendants.XmlDescendantsIterator = class XmlDescendantsIterator extends core.Iterator$(node$.XmlNode) {
    get todo() {
      return this[todo$0];
    }
    set todo(value) {
      super.todo = value;
    }
    get current() {
      return this[current$0];
    }
    set current(value) {
      this[current$0] = value;
    }
    push(node) {
      this.todo[$addAll](node.children[$reversed]);
      this.todo[$addAll](node.attributes[$reversed]);
    }
    moveNext() {
      if (dart.test(this.todo[$isEmpty])) {
        this.current = null;
        return false;
      } else {
        this.current = this.todo[$removeLast]();
        this.push(this.current);
        return true;
      }
    }
  };
  (descendants.XmlDescendantsIterator.new = function(start) {
    this[todo$0] = JSArrayOfXmlNode().of([]);
    this[current$0] = null;
    this.push(start);
  }).prototype = descendants.XmlDescendantsIterator.prototype;
  dart.addTypeTests(descendants.XmlDescendantsIterator);
  dart.setMethodSignature(descendants.XmlDescendantsIterator, () => ({
    __proto__: dart.getMethods(descendants.XmlDescendantsIterator.__proto__),
    push: dart.fnType(dart.void, [node$.XmlNode]),
    moveNext: dart.fnType(core.bool, [])
  }));
  dart.setLibraryUri(descendants.XmlDescendantsIterator, "package:xml/src/xml/iterators/descendants.dart");
  dart.setFieldSignature(descendants.XmlDescendantsIterator, () => ({
    __proto__: dart.getFields(descendants.XmlDescendantsIterator.__proto__),
    todo: dart.finalFieldType(core.List$(node$.XmlNode)),
    current: dart.fieldType(node$.XmlNode)
  }));
  const start$3 = dart.privateName(ancestors, "XmlAncestorsIterable.start");
  ancestors.XmlAncestorsIterable = class XmlAncestorsIterable extends collection.IterableBase$(node$.XmlNode) {
    get start() {
      return this[start$3];
    }
    set start(value) {
      super.start = value;
    }
    get iterator() {
      return new ancestors.XmlAncestorsIterator.new(this.start);
    }
  };
  (ancestors.XmlAncestorsIterable.new = function(start) {
    this[start$3] = start;
    ancestors.XmlAncestorsIterable.__proto__.new.call(this);
    ;
  }).prototype = ancestors.XmlAncestorsIterable.prototype;
  dart.addTypeTests(ancestors.XmlAncestorsIterable);
  dart.setGetterSignature(ancestors.XmlAncestorsIterable, () => ({
    __proto__: dart.getGetters(ancestors.XmlAncestorsIterable.__proto__),
    iterator: core.Iterator$(node$.XmlNode),
    [$iterator]: core.Iterator$(node$.XmlNode)
  }));
  dart.setLibraryUri(ancestors.XmlAncestorsIterable, "package:xml/src/xml/iterators/ancestors.dart");
  dart.setFieldSignature(ancestors.XmlAncestorsIterable, () => ({
    __proto__: dart.getFields(ancestors.XmlAncestorsIterable.__proto__),
    start: dart.finalFieldType(node$.XmlNode)
  }));
  dart.defineExtensionAccessors(ancestors.XmlAncestorsIterable, ['iterator']);
  const current$1 = dart.privateName(ancestors, "XmlAncestorsIterator.current");
  ancestors.XmlAncestorsIterator = class XmlAncestorsIterator extends core.Iterator$(node$.XmlNode) {
    get current() {
      return this[current$1];
    }
    set current(value) {
      this[current$1] = value;
    }
    moveNext() {
      if (this.current != null) {
        this.current = this.current.parent;
      }
      return this.current != null;
    }
  };
  (ancestors.XmlAncestorsIterator.new = function(current) {
    this[current$1] = current;
    ;
  }).prototype = ancestors.XmlAncestorsIterator.prototype;
  dart.addTypeTests(ancestors.XmlAncestorsIterator);
  dart.setMethodSignature(ancestors.XmlAncestorsIterator, () => ({
    __proto__: dart.getMethods(ancestors.XmlAncestorsIterator.__proto__),
    moveNext: dart.fnType(core.bool, [])
  }));
  dart.setLibraryUri(ancestors.XmlAncestorsIterator, "package:xml/src/xml/iterators/ancestors.dart");
  dart.setFieldSignature(ancestors.XmlAncestorsIterator, () => ({
    __proto__: dart.getFields(ancestors.XmlAncestorsIterator.__proto__),
    current: dart.fieldType(node$.XmlNode)
  }));
  const target$ = dart.privateName(processing, "XmlProcessing.target");
  processing.XmlProcessing = class XmlProcessing extends data.XmlData {
    get target() {
      return this[target$];
    }
    set target(value) {
      super.target = value;
    }
    get nodeType() {
      return node_type.XmlNodeType.PROCESSING;
    }
    accept(visitor) {
      return visitor.visitProcessing(this);
    }
  };
  (processing.XmlProcessing.new = function(target, text) {
    this[target$] = target;
    processing.XmlProcessing.__proto__.new.call(this, text);
    ;
  }).prototype = processing.XmlProcessing.prototype;
  dart.addTypeTests(processing.XmlProcessing);
  dart.setMethodSignature(processing.XmlProcessing, () => ({
    __proto__: dart.getMethods(processing.XmlProcessing.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(processing.XmlProcessing, () => ({
    __proto__: dart.getGetters(processing.XmlProcessing.__proto__),
    nodeType: node_type.XmlNodeType
  }));
  dart.setLibraryUri(processing.XmlProcessing, "package:xml/src/xml/nodes/processing.dart");
  dart.setFieldSignature(processing.XmlProcessing, () => ({
    __proto__: dart.getFields(processing.XmlProcessing.__proto__),
    target: dart.finalFieldType(core.String)
  }));
  comment.XmlComment = class XmlComment extends data.XmlData {
    get nodeType() {
      return node_type.XmlNodeType.COMMENT;
    }
    accept(visitor) {
      return visitor.visitComment(this);
    }
  };
  (comment.XmlComment.new = function(text) {
    comment.XmlComment.__proto__.new.call(this, text);
    ;
  }).prototype = comment.XmlComment.prototype;
  dart.addTypeTests(comment.XmlComment);
  dart.setMethodSignature(comment.XmlComment, () => ({
    __proto__: dart.getMethods(comment.XmlComment.__proto__),
    accept: dart.fnType(dart.dynamic, [visitor.XmlVisitor])
  }));
  dart.setGetterSignature(comment.XmlComment, () => ({
    __proto__: dart.getGetters(comment.XmlComment.__proto__),
    nodeType: node_type.XmlNodeType
  }));
  dart.setLibraryUri(comment.XmlComment, "package:xml/src/xml/nodes/comment.dart");
  entity_mapping.XmlEntityMapping = class XmlEntityMapping extends core.Object {
    decode(input) {
      let output = new core.StringBuffer.new();
      let length = input.length;
      let position = 0;
      let start = position;
      while (position < length) {
        let value = input[$codeUnitAt](position);
        if (value === 38) {
          let index = input[$indexOf](";", position + 1);
          if (position + 1 < index) {
            let entity = input[$substring](position + 1, index);
            let value = this.decodeEntity(entity);
            if (value != null) {
              output.write(input[$substring](start, position));
              output.write(value);
              position = index + 1;
              start = position;
            } else {
              position = position + 1;
            }
          } else {
            position = position + 1;
          }
        } else {
          position = position + 1;
        }
      }
      output.write(input[$substring](start, position));
      return output.toString();
    }
    encodeAttributeValueWithQuotes(input, type) {
      let quote = entity_mapping._attributeQuote[$_get](type);
      let buffer = new core.StringBuffer.new();
      buffer.write(quote);
      buffer.write(this.encodeAttributeValue(input, type));
      buffer.write(quote);
      return buffer.toString();
    }
  };
  (entity_mapping.XmlEntityMapping.new = function() {
    ;
  }).prototype = entity_mapping.XmlEntityMapping.prototype;
  dart.addTypeTests(entity_mapping.XmlEntityMapping);
  dart.setMethodSignature(entity_mapping.XmlEntityMapping, () => ({
    __proto__: dart.getMethods(entity_mapping.XmlEntityMapping.__proto__),
    decode: dart.fnType(core.String, [core.String]),
    encodeAttributeValueWithQuotes: dart.fnType(core.String, [core.String, attribute_type.XmlAttributeType])
  }));
  dart.setLibraryUri(entity_mapping.XmlEntityMapping, "package:xml/src/xml/entities/entity_mapping.dart");
  let C21;
  dart.defineLazy(entity_mapping, {
    /*entity_mapping._attributeQuote*/get _attributeQuote() {
      return C21 || CT.C21;
    }
  });
  const level$ = dart.privateName(pretty_writer, "XmlPrettyWriter.level");
  const indent$ = dart.privateName(pretty_writer, "XmlPrettyWriter.indent");
  pretty_writer.XmlPrettyWriter = class XmlPrettyWriter extends writer.XmlWriter {
    get level() {
      return this[level$];
    }
    set level(value) {
      this[level$] = value;
    }
    get indent() {
      return this[indent$];
    }
    set indent(value) {
      super.indent = value;
    }
    visitCDATA(node) {
      this.newLine();
      super.visitCDATA(node);
    }
    visitComment(node) {
      this.newLine();
      super.visitComment(node);
    }
    visitDoctype(node) {
      this.newLine();
      super.visitDoctype(node);
    }
    visitElement(node) {
      this.newLine();
      this.buffer.write("<");
      this.visit(dart.dynamic, node.name);
      this.writeAttributes(node);
      if (dart.test(node.children.isEmpty) && dart.test(node.isSelfClosing)) {
        this.buffer.write("/>");
      } else {
        this.buffer.write(">");
        this.level = dart.notNull(this.level) + 1;
        this.writeChildren(node);
        this.level = dart.notNull(this.level) - 1;
        if (!dart.test(node.children.every(dart.fn(each => text$.XmlText.is(each), XmlNodeTobool())))) {
          this.newLine();
        }
        this.buffer.write("</");
        this.visit(dart.dynamic, node.name);
        this.buffer.write(">");
      }
    }
    visitProcessing(node) {
      this.newLine();
      super.visitProcessing(node);
    }
    visitText(node) {
      if (node.text[$trim]()[$isNotEmpty]) {
        super.visitText(node);
      }
    }
    newLine() {
      if (dart.test(this.buffer.isNotEmpty)) {
        this.buffer.writeln();
      }
      for (let i = 0; i < dart.notNull(this.level); i = i + 1) {
        this.buffer.write(this.indent);
      }
    }
  };
  (pretty_writer.XmlPrettyWriter.new = function(buffer, entityMapping, level, indent) {
    this[level$] = 0;
    this[level$] = level;
    this[indent$] = indent;
    pretty_writer.XmlPrettyWriter.__proto__.new.call(this, core.StringBuffer._check(buffer), entityMapping);
    ;
  }).prototype = pretty_writer.XmlPrettyWriter.prototype;
  dart.addTypeTests(pretty_writer.XmlPrettyWriter);
  dart.setMethodSignature(pretty_writer.XmlPrettyWriter, () => ({
    __proto__: dart.getMethods(pretty_writer.XmlPrettyWriter.__proto__),
    newLine: dart.fnType(dart.void, [])
  }));
  dart.setLibraryUri(pretty_writer.XmlPrettyWriter, "package:xml/src/xml/visitors/pretty_writer.dart");
  dart.setFieldSignature(pretty_writer.XmlPrettyWriter, () => ({
    __proto__: dart.getFields(pretty_writer.XmlPrettyWriter.__proto__),
    level: dart.fieldType(core.int),
    indent: dart.finalFieldType(core.String)
  }));
  let C22;
  let C23;
  let C24;
  default_mapping.XmlDefaultEntityMapping = class XmlDefaultEntityMapping extends entity_mapping.XmlEntityMapping {
    get entities() {
      return this[entities$];
    }
    set entities(value) {
      super.entities = value;
    }
    decodeEntity(input) {
      if (input.length > 1 && input[$_get](0) === "#") {
        if (input.length > 2 && (input[$_get](1) === "x" || input[$_get](1) === "X")) {
          return core.String.fromCharCode(core.int.parse(input[$substring](2), {radix: 16}));
        } else {
          return core.String.fromCharCode(core.int.parse(input[$substring](1)));
        }
      } else {
        return this.entities[$_get](input);
      }
    }
    encodeText(input) {
      return input[$replaceAllMapped](default_mapping._textPattern, C22 || CT.C22);
    }
    encodeAttributeValue(input, type) {
      switch (type) {
        case C19 || CT.C19:
        {
          return input[$replaceAllMapped](default_mapping._singeQuoteAttributePattern, C23 || CT.C23);
        }
        case C15 || CT.C15:
        {
          return input[$replaceAllMapped](default_mapping._doubleQuoteAttributePattern, C24 || CT.C24);
        }
      }
      dart.throw(new core.ArgumentError.value(type, "type"));
    }
  };
  (default_mapping.XmlDefaultEntityMapping.xml = function() {
    default_mapping.XmlDefaultEntityMapping.new.call(this, named_entities.xmlEntities);
  }).prototype = default_mapping.XmlDefaultEntityMapping.prototype;
  (default_mapping.XmlDefaultEntityMapping.html = function() {
    default_mapping.XmlDefaultEntityMapping.new.call(this, named_entities.htmlEntities);
  }).prototype = default_mapping.XmlDefaultEntityMapping.prototype;
  (default_mapping.XmlDefaultEntityMapping.html5 = function() {
    default_mapping.XmlDefaultEntityMapping.new.call(this, named_entities.html5Entities);
  }).prototype = default_mapping.XmlDefaultEntityMapping.prototype;
  (default_mapping.XmlDefaultEntityMapping.new = function(entities) {
    this[entities$] = entities;
    default_mapping.XmlDefaultEntityMapping.__proto__.new.call(this);
    ;
  }).prototype = default_mapping.XmlDefaultEntityMapping.prototype;
  dart.addTypeTests(default_mapping.XmlDefaultEntityMapping);
  const entities$ = XmlDefaultEntityMapping_entities;
  dart.setMethodSignature(default_mapping.XmlDefaultEntityMapping, () => ({
    __proto__: dart.getMethods(default_mapping.XmlDefaultEntityMapping.__proto__),
    decodeEntity: dart.fnType(core.String, [core.String]),
    encodeText: dart.fnType(core.String, [core.String]),
    encodeAttributeValue: dart.fnType(core.String, [core.String, attribute_type.XmlAttributeType])
  }));
  dart.setLibraryUri(default_mapping.XmlDefaultEntityMapping, "package:xml/src/xml/entities/default_mapping.dart");
  dart.setFieldSignature(default_mapping.XmlDefaultEntityMapping, () => ({
    __proto__: dart.getFields(default_mapping.XmlDefaultEntityMapping.__proto__),
    entities: dart.finalFieldType(core.Map$(core.String, core.String))
  }));
  default_mapping._textReplace = function _textReplace(match) {
    switch (match.group(0)) {
      case "<":
      {
        return "&lt;";
      }
      case "&":
      {
        return "&amp;";
      }
      case "]]>":
      {
        return "]]&gt;";
      }
    }
    dart.throw(new core.ArgumentError.value(match, "match"));
  };
  default_mapping._singeQuoteAttributeReplace = function _singeQuoteAttributeReplace(match) {
    switch (match.group(0)) {
      case "'":
      {
        return "&apos;";
      }
      case "&":
      {
        return "&amp;";
      }
      case "<":
      {
        return "&lt;";
      }
      case "\n":
      {
        return "&#xA;";
      }
      case "\r":
      {
        return "&#xD;";
      }
      case "\t":
      {
        return "&#x9;";
      }
    }
    dart.throw(new core.ArgumentError.value(match, "match"));
  };
  default_mapping._doubleQuoteAttributeReplace = function _doubleQuoteAttributeReplace(match) {
    switch (match.group(0)) {
      case "\"":
      {
        return "&quot;";
      }
      case "&":
      {
        return "&amp;";
      }
      case "<":
      {
        return "&lt;";
      }
      case "\n":
      {
        return "&#xA;";
      }
      case "\r":
      {
        return "&#xD;";
      }
      case "\t":
      {
        return "&#x9;";
      }
    }
    dart.throw(new core.ArgumentError.value(match, "match"));
  };
  dart.defineLazy(default_mapping, {
    /*default_mapping._textPattern*/get _textPattern() {
      return core.RegExp.new("[&<]|]]>");
    },
    /*default_mapping._singeQuoteAttributePattern*/get _singeQuoteAttributePattern() {
      return core.RegExp.new("['&<\\n\\r\\t]");
    },
    /*default_mapping._doubleQuoteAttributePattern*/get _doubleQuoteAttributePattern() {
      return core.RegExp.new("[\"&<\\n\\r\\t]");
    }
  });
  let C25;
  let C26;
  dart.defineLazy(named_entities, {
    /*named_entities.xmlEntities*/get xmlEntities() {
      return C2 || CT.C2;
    },
    /*named_entities.htmlEntities*/get htmlEntities() {
      return C25 || CT.C25;
    },
    /*named_entities.html5Entities*/get html5Entities() {
      return C26 || CT.C26;
    }
  });
  const local$ = dart.privateName(simple_name, "XmlSimpleName.local");
  simple_name.XmlSimpleName = class XmlSimpleName extends name$.XmlName {
    get local() {
      return this[local$];
    }
    set local(value) {
      super.local = value;
    }
    get prefix() {
      return null;
    }
    get qualified() {
      return this.local;
    }
    get namespaceUri() {
      for (let node = this.parent; node != null; node = node.parent) {
        for (let attribute of node.attributes) {
          if (attribute.name.prefix == null && attribute.name.local === "xmlns") {
            return attribute.value;
          }
        }
      }
      return null;
    }
  };
  (simple_name.XmlSimpleName.new = function(local) {
    this[local$] = local;
    simple_name.XmlSimpleName.__proto__.internal.call(this);
    ;
  }).prototype = simple_name.XmlSimpleName.prototype;
  dart.addTypeTests(simple_name.XmlSimpleName);
  dart.setGetterSignature(simple_name.XmlSimpleName, () => ({
    __proto__: dart.getGetters(simple_name.XmlSimpleName.__proto__),
    prefix: core.String,
    qualified: core.String,
    namespaceUri: core.String
  }));
  dart.setLibraryUri(simple_name.XmlSimpleName, "package:xml/src/xml/utils/simple_name.dart");
  dart.setFieldSignature(simple_name.XmlSimpleName, () => ({
    __proto__: dart.getFields(simple_name.XmlSimpleName.__proto__),
    local: dart.finalFieldType(core.String)
  }));
  const prefix$0 = dart.privateName(prefix_name, "XmlPrefixName.prefix");
  const local$0 = dart.privateName(prefix_name, "XmlPrefixName.local");
  const qualified$ = dart.privateName(prefix_name, "XmlPrefixName.qualified");
  prefix_name.XmlPrefixName = class XmlPrefixName extends name$.XmlName {
    get prefix() {
      return this[prefix$0];
    }
    set prefix(value) {
      super.prefix = value;
    }
    get local() {
      return this[local$0];
    }
    set local(value) {
      super.local = value;
    }
    get qualified() {
      return this[qualified$];
    }
    set qualified(value) {
      super.qualified = value;
    }
    get namespaceUri() {
      for (let node = this.parent; node != null; node = node.parent) {
        for (let attribute of node.attributes) {
          if (attribute.name.prefix === "xmlns" && attribute.name.local == this.prefix) {
            return attribute.value;
          }
        }
      }
      return null;
    }
  };
  (prefix_name.XmlPrefixName.new = function(prefix, local, qualified) {
    this[prefix$0] = prefix;
    this[local$0] = local;
    this[qualified$] = qualified;
    prefix_name.XmlPrefixName.__proto__.internal.call(this);
    ;
  }).prototype = prefix_name.XmlPrefixName.prototype;
  dart.addTypeTests(prefix_name.XmlPrefixName);
  dart.setGetterSignature(prefix_name.XmlPrefixName, () => ({
    __proto__: dart.getGetters(prefix_name.XmlPrefixName.__proto__),
    namespaceUri: core.String
  }));
  dart.setLibraryUri(prefix_name.XmlPrefixName, "package:xml/src/xml/utils/prefix_name.dart");
  dart.setFieldSignature(prefix_name.XmlPrefixName, () => ({
    __proto__: dart.getFields(prefix_name.XmlPrefixName.__proto__),
    prefix: dart.finalFieldType(core.String),
    local: dart.finalFieldType(core.String),
    qualified: dart.finalFieldType(core.String)
  }));
  entities.encodeXmlText = function encodeXmlText(input) {
    return entities.defaultEntityMapping.encodeText(input);
  };
  entities.encodeXmlAttributeValue = function encodeXmlAttributeValue(input, type) {
    return entities.defaultEntityMapping.encodeAttributeValue(input, type);
  };
  entities.encodeXmlAttributeValueWithQuotes = function encodeXmlAttributeValueWithQuotes(input, type) {
    return entities.defaultEntityMapping.encodeAttributeValueWithQuotes(input, type);
  };
  dart.defineLazy(entities, {
    /*entities.defaultEntityMapping*/get defaultEntityMapping() {
      return C1 || CT.C1;
    }
  });
  const entityMapping$0 = dart.privateName(production, "XmlProductionDefinition.entityMapping");
  production.XmlProductionDefinition = class XmlProductionDefinition extends grammar.GrammarDefinition {
    get entityMapping() {
      return this[entityMapping$0];
    }
    set entityMapping(value) {
      super.entityMapping = value;
    }
    start() {
      return eof['EndOfInputParserExtension|end'](dart.dynamic, this.ref(dart.bind(this, 'document')));
    }
    attribute() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](dart.dynamic, this.ref(dart.bind(this, 'qualified')), this.ref(dart.bind(this, 'spaceOptional'))), string['PredicateStringExtension|toParser']("=")), this.ref(dart.bind(this, 'spaceOptional'))), this.ref(dart.bind(this, 'attributeValue')));
    }
    attributeValue() {
      return choice['ChoiceParserExtension|or'](dart.dynamic, this.ref(dart.bind(this, 'attributeValueDouble')), this.ref(dart.bind(this, 'attributeValueSingle')));
    }
    attributeValueDouble() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.String, string['PredicateStringExtension|toParser']("\""), new character_data_parser.XmlCharacterDataParser.new(this.entityMapping, "\"", 0)), string['PredicateStringExtension|toParser']("\""));
    }
    attributeValueSingle() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.String, string['PredicateStringExtension|toParser']("'"), new character_data_parser.XmlCharacterDataParser.new(this.entityMapping, "'", 0)), string['PredicateStringExtension|toParser']("'"));
    }
    attributes() {
      return possesive['PossessiveRepeatingParserExtension|star'](dart.dynamic, pick['PickParserExtension|pick'](dart.dynamic, sequence['SequenceParserExtension|seq'](dart.dynamic, this.ref(dart.bind(this, 'space')), this.ref(dart.bind(this, 'attribute'))), 1));
    }
    comment() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.String, string['PredicateStringExtension|toParser']("<!--"), flatten['FlattenParserExtension|flatten'](ListOfString(), lazy['LazyRepeatingParserExtension|starLazy'](core.String, any.any(), string['PredicateStringExtension|toParser']("-->")), "Expected comment content")), string['PredicateStringExtension|toParser']("-->"));
    }
    cdata() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.String, string['PredicateStringExtension|toParser']("<![CDATA["), flatten['FlattenParserExtension|flatten'](ListOfString(), lazy['LazyRepeatingParserExtension|starLazy'](core.String, any.any(), string['PredicateStringExtension|toParser']("]]>")), "Expected CDATA content")), string['PredicateStringExtension|toParser']("]]>"));
    }
    content() {
      return possesive['PossessiveRepeatingParserExtension|star'](dart.dynamic, choice['ChoiceParserExtension|or'](dart.dynamic, choice['ChoiceParserExtension|or'](dart.dynamic, choice['ChoiceParserExtension|or'](dart.dynamic, choice['ChoiceParserExtension|or'](dart.dynamic, this.ref(dart.bind(this, 'characterData')), this.ref(dart.bind(this, 'element'))), this.ref(dart.bind(this, 'processing'))), this.ref(dart.bind(this, 'comment'))), this.ref(dart.bind(this, 'cdata'))));
    }
    doctype() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.String, string['PredicateStringExtension|toParser']("<!DOCTYPE"), this.ref(dart.bind(this, 'space'))), flatten['FlattenParserExtension|flatten'](core.List, separated_by['SeparatedBy|separatedBy'](dart.dynamic, dart.dynamic, choice['ChoiceParserExtension|or'](dart.dynamic, choice['ChoiceParserExtension|or'](dart.dynamic, this.ref(dart.bind(this, 'nameToken')), this.ref(dart.bind(this, 'attributeValue'))), sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](ListOfString(), lazy['LazyRepeatingParserExtension|starLazy'](core.String, any.any(), string['PredicateStringExtension|toParser']("[")), string['PredicateStringExtension|toParser']("[")), lazy['LazyRepeatingParserExtension|starLazy'](core.String, any.any(), string['PredicateStringExtension|toParser']("]"))), string['PredicateStringExtension|toParser']("]"))), this.ref(dart.bind(this, 'space'))), "Expected doctype content")), this.ref(dart.bind(this, 'spaceOptional'))), string['PredicateStringExtension|toParser'](">"));
    }
    document() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](dart.dynamic, this.ref(dart.bind(this, 'misc')), optional['OptionalParserExtension|optional'](dart.dynamic, this.ref(dart.bind(this, 'doctype')))), this.ref(dart.bind(this, 'misc'))), this.ref(dart.bind(this, 'element'))), this.ref(dart.bind(this, 'misc')));
    }
    element() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.String, string['PredicateStringExtension|toParser']("<"), this.ref(dart.bind(this, 'qualified'))), this.ref(dart.bind(this, 'attributes'))), this.ref(dart.bind(this, 'spaceOptional'))), choice['ChoiceParserExtension|or'](core.String, string['PredicateStringExtension|toParser']("/>"), sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.String, string['PredicateStringExtension|toParser'](">"), this.ref(dart.bind(this, 'content'))), token['TokenParserExtension|token'](core.String, string['PredicateStringExtension|toParser']("</"))), this.ref(dart.bind(this, 'qualified'))), this.ref(dart.bind(this, 'spaceOptional'))), string['PredicateStringExtension|toParser'](">"))));
    }
    processing() {
      return sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.List, sequence['SequenceParserExtension|seq'](core.String, string['PredicateStringExtension|toParser']("<?"), this.ref(dart.bind(this, 'nameToken'))), optional['OptionalParserExtension|optional'](dart.dynamic, pick['PickParserExtension|pick'](dart.dynamic, sequence['SequenceParserExtension|seq'](dart.dynamic, this.ref(dart.bind(this, 'space')), flatten['FlattenParserExtension|flatten'](ListOfString(), lazy['LazyRepeatingParserExtension|starLazy'](core.String, any.any(), string['PredicateStringExtension|toParser']("?>")), "Expected processing instruction content")), 1), "")), string['PredicateStringExtension|toParser']("?>"));
    }
    qualified() {
      return this.ref(dart.bind(this, 'nameToken'));
    }
    characterData() {
      return new character_data_parser.XmlCharacterDataParser.new(this.entityMapping, "<", 1);
    }
    misc() {
      return possesive['PossessiveRepeatingParserExtension|star'](dart.dynamic, choice['ChoiceParserExtension|or'](dart.dynamic, choice['ChoiceParserExtension|or'](dart.dynamic, this.ref(dart.bind(this, 'spaceText')), this.ref(dart.bind(this, 'comment'))), this.ref(dart.bind(this, 'processing'))));
    }
    space() {
      return possesive['PossessiveRepeatingParserExtension|plus'](core.String, whitespace.whitespace());
    }
    spaceText() {
      return flatten['FlattenParserExtension|flatten'](dart.dynamic, this.ref(dart.bind(this, 'space')), "Expected whitespace");
    }
    spaceOptional() {
      return possesive['PossessiveRepeatingParserExtension|star'](core.String, whitespace.whitespace());
    }
    nameToken() {
      return flatten['FlattenParserExtension|flatten'](core.List, sequence['SequenceParserExtension|seq'](dart.dynamic, this.ref(dart.bind(this, 'nameStartChar')), possesive['PossessiveRepeatingParserExtension|star'](dart.dynamic, this.ref(dart.bind(this, 'nameChar')))), "Expected name");
    }
    nameStartChar() {
      return pattern.pattern(production.XmlProductionDefinition._nameStartChars);
    }
    nameChar() {
      return pattern.pattern(production.XmlProductionDefinition._nameChars);
    }
  };
  (production.XmlProductionDefinition.new = function(entityMapping) {
    this[entityMapping$0] = entityMapping;
    production.XmlProductionDefinition.__proto__.new.call(this);
    ;
  }).prototype = production.XmlProductionDefinition.prototype;
  dart.addTypeTests(production.XmlProductionDefinition);
  dart.setMethodSignature(production.XmlProductionDefinition, () => ({
    __proto__: dart.getMethods(production.XmlProductionDefinition.__proto__),
    start: dart.fnType(parser.Parser, []),
    attribute: dart.fnType(parser.Parser, []),
    attributeValue: dart.fnType(parser.Parser, []),
    attributeValueDouble: dart.fnType(parser.Parser, []),
    attributeValueSingle: dart.fnType(parser.Parser, []),
    attributes: dart.fnType(parser.Parser, []),
    comment: dart.fnType(parser.Parser, []),
    cdata: dart.fnType(parser.Parser, []),
    content: dart.fnType(parser.Parser, []),
    doctype: dart.fnType(parser.Parser, []),
    document: dart.fnType(parser.Parser, []),
    element: dart.fnType(parser.Parser, []),
    processing: dart.fnType(parser.Parser, []),
    qualified: dart.fnType(parser.Parser, []),
    characterData: dart.fnType(parser.Parser, []),
    misc: dart.fnType(parser.Parser, []),
    space: dart.fnType(parser.Parser, []),
    spaceText: dart.fnType(parser.Parser, []),
    spaceOptional: dart.fnType(parser.Parser, []),
    nameToken: dart.fnType(parser.Parser, []),
    nameStartChar: dart.fnType(parser.Parser, []),
    nameChar: dart.fnType(parser.Parser, [])
  }));
  dart.setLibraryUri(production.XmlProductionDefinition, "package:xml/src/xml/production.dart");
  dart.setFieldSignature(production.XmlProductionDefinition, () => ({
    __proto__: dart.getFields(production.XmlProductionDefinition.__proto__),
    entityMapping: dart.finalFieldType(entity_mapping.XmlEntityMapping)
  }));
  dart.defineLazy(production.XmlProductionDefinition, {
    /*production.XmlProductionDefinition._nameStartChars*/get _nameStartChars() {
      return ":A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、퟿豈-﷏ﷰ-�";
    },
    /*production.XmlProductionDefinition._nameChars*/get _nameChars() {
      return "-.0-9·̀-ͯ‿-⁀:A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、퟿豈-﷏ﷰ-�";
    }
  });
  const _is_XmlGrammarDefinition_default = Symbol('_is_XmlGrammarDefinition_default');
  grammar$.XmlGrammarDefinition$ = dart.generic((TNode, TName) => {
    let dynamicToTNode = () => (dynamicToTNode = dart.constFn(dart.fnType(TNode, [dart.dynamic])))();
    let JSArrayOfTNode = () => (JSArrayOfTNode = dart.constFn(_interceptors.JSArray$(TNode)))();
    class XmlGrammarDefinition extends production.XmlProductionDefinition {
      attribute() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.attribute(), dart.fn(each => this.createAttribute(TName._check(dart.dsend(each, '_get', [0])), core.String._check(dart.dsend(dart.dsend(each, '_get', [4]), '_get', [0])), attribute_type.XmlAttributeType._check(dart.dsend(dart.dsend(each, '_get', [4]), '_get', [1]))), dynamicToTNode()));
      }
      attributeValueDouble() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.attributeValueDouble(), dart.fn(each => [dart.dsend(each, '_get', [1]), attribute_type.XmlAttributeType.DOUBLE_QUOTE], dynamicToList()));
      }
      attributeValueSingle() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.attributeValueSingle(), dart.fn(each => [dart.dsend(each, '_get', [1]), attribute_type.XmlAttributeType.SINGLE_QUOTE], dynamicToList()));
      }
      comment() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.comment(), dart.fn(each => this.createComment(core.String._check(dart.dsend(each, '_get', [1]))), dynamicToTNode()));
      }
      cdata() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.cdata(), dart.fn(each => this.createCDATA(core.String._check(dart.dsend(each, '_get', [1]))), dynamicToTNode()));
      }
      doctype() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.doctype(), dart.fn(each => this.createDoctype(core.String._check(dart.dsend(each, '_get', [2]))), dynamicToTNode()));
      }
      document() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.document(), dart.fn(each => {
          let nodes = [];
          nodes[$addAll](core.Iterable._check(dart.dsend(each, '_get', [0])));
          if (dart.dsend(each, '_get', [1]) != null) {
            nodes[$add](dart.dsend(each, '_get', [1]));
          }
          nodes[$addAll](core.Iterable._check(dart.dsend(each, '_get', [2])));
          nodes[$add](dart.dsend(each, '_get', [3]));
          nodes[$addAll](core.Iterable._check(dart.dsend(each, '_get', [4])));
          return this.createDocument(core.List.castFrom(dart.dynamic, TNode, nodes));
        }, dynamicToTNode()));
      }
      element() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.element(), dart.fn(list => {
          let name = TName._check(dart.dsend(list, '_get', [1]));
          let attributes = core.List.castFrom(dart.dynamic, TNode, core.List._check(dart.dsend(list, '_get', [2])));
          if (dart.equals(dart.dsend(list, '_get', [4]), "/>")) {
            return this.createElement(name, attributes, JSArrayOfTNode().of([]), true);
          } else {
            if (dart.equals(dart.dsend(list, '_get', [1]), dart.dsend(dart.dsend(list, '_get', [4]), '_get', [3]))) {
              let children = core.List.castFrom(dart.dynamic, TNode, core.List._check(dart.dsend(dart.dsend(list, '_get', [4]), '_get', [1])));
              return this.createElement(name, attributes, children, children[$isNotEmpty]);
            } else {
              let token = token$.Token._check(dart.dsend(dart.dsend(list, '_get', [4]), '_get', [2]));
              let lineAndColumn = token$.Token.lineAndColumnOf(token.buffer, token.start);
              dart.throw(new exceptions.XmlParserException.new("Expected </" + dart.str(dart.dsend(list, '_get', [1])) + ">, but found </" + dart.str(dart.dsend(dart.dsend(list, '_get', [4]), '_get', [3])) + ">", {buffer: token.buffer, position: token.start, line: lineAndColumn[$_get](0), column: lineAndColumn[$_get](1)}));
            }
          }
        }, dynamicToTNode()));
      }
      processing() {
        return map['MapParserExtension|map'](dart.dynamic, dart.dynamic, super.processing(), dart.fn(each => this.createProcessing(core.String._check(dart.dsend(each, '_get', [1])), core.String._check(dart.dsend(each, '_get', [2]))), dynamicToTNode()));
      }
      qualified() {
        return map['MapParserExtension|map'](core.String, dart.dynamic, cast['CastParserExtension|cast'](dart.dynamic, core.String, super.qualified()), dart.bind(this, 'createQualified'));
      }
      characterData() {
        return map['MapParserExtension|map'](core.String, dart.dynamic, cast['CastParserExtension|cast'](dart.dynamic, core.String, super.characterData()), dart.bind(this, 'createText'));
      }
      spaceText() {
        return map['MapParserExtension|map'](core.String, dart.dynamic, cast['CastParserExtension|cast'](dart.dynamic, core.String, super.spaceText()), dart.bind(this, 'createText'));
      }
    }
    (XmlGrammarDefinition.new = function(entityMapping) {
      XmlGrammarDefinition.__proto__.new.call(this, entityMapping);
      ;
    }).prototype = XmlGrammarDefinition.prototype;
    dart.addTypeTests(XmlGrammarDefinition);
    XmlGrammarDefinition.prototype[_is_XmlGrammarDefinition_default] = true;
    dart.setLibraryUri(XmlGrammarDefinition, "package:xml/src/xml/grammar.dart");
    return XmlGrammarDefinition;
  });
  grammar$.XmlGrammarDefinition = grammar$.XmlGrammarDefinition$();
  dart.addTypeTests(grammar$.XmlGrammarDefinition, _is_XmlGrammarDefinition_default);
  const _entityMapping$ = dart.privateName(character_data_parser, "_entityMapping");
  const _stopper$ = dart.privateName(character_data_parser, "_stopper");
  const _minLength$ = dart.privateName(character_data_parser, "_minLength");
  const _stopperCode = dart.privateName(character_data_parser, "_stopperCode");
  character_data_parser.XmlCharacterDataParser = class XmlCharacterDataParser extends parser.Parser$(core.String) {
    parseOn(context) {
      let input = context.buffer;
      let length = input.length;
      let output = new core.StringBuffer.new();
      let position = context.position;
      let start = position;
      while (dart.notNull(position) < length) {
        let value = input[$codeUnitAt](position);
        if (value === this[_stopperCode]) {
          break;
        } else if (value === 38) {
          let index = input[$indexOf](";", dart.notNull(position) + 1);
          if (dart.notNull(position) + 1 < index) {
            let entity = input[$substring](dart.notNull(position) + 1, index);
            let value = this[_entityMapping$].decodeEntity(entity);
            if (value != null) {
              output.write(input[$substring](start, position));
              output.write(value);
              position = index + 1;
              start = position;
            } else {
              position = dart.notNull(position) + 1;
            }
          } else {
            position = dart.notNull(position) + 1;
          }
        } else {
          position = dart.notNull(position) + 1;
        }
      }
      output.write(input[$substring](start, position));
      return dart.notNull(output.length) < dart.notNull(this[_minLength$]) ? context.failure(core.String, "Unable to parse chracter data.") : context.success(core.String, output.toString(), position);
    }
    fastParseOn(buffer, position) {
      let start = position;
      let length = buffer.length;
      while (dart.notNull(position) < length) {
        let value = buffer[$codeUnitAt](position);
        if (value === this[_stopperCode]) {
          break;
        } else {
          position = dart.notNull(position) + 1;
        }
      }
      return dart.notNull(position) - dart.notNull(start) < dart.notNull(this[_minLength$]) ? -1 : position;
    }
    copy() {
      return new character_data_parser.XmlCharacterDataParser.new(this[_entityMapping$], this[_stopper$], this[_minLength$]);
    }
    hasEqualProperties(other) {
      character_data_parser.XmlCharacterDataParser._check(other);
      return dart.test(super.hasEqualProperties(other)) && dart.equals(this[_entityMapping$], other[_entityMapping$]) && this[_stopper$] == other[_stopper$] && this[_minLength$] == other[_minLength$];
    }
  };
  (character_data_parser.XmlCharacterDataParser.new = function(_entityMapping, _stopper, _minLength) {
    this[_entityMapping$] = _entityMapping;
    this[_stopper$] = _stopper;
    this[_minLength$] = _minLength;
    this[_stopperCode] = _stopper[$codeUnitAt](0);
    character_data_parser.XmlCharacterDataParser.__proto__.new.call(this);
    ;
  }).prototype = character_data_parser.XmlCharacterDataParser.prototype;
  dart.addTypeTests(character_data_parser.XmlCharacterDataParser);
  dart.setMethodSignature(character_data_parser.XmlCharacterDataParser, () => ({
    __proto__: dart.getMethods(character_data_parser.XmlCharacterDataParser.__proto__),
    parseOn: dart.fnType(result.Result$(core.String), [context.Context]),
    copy: dart.fnType(character_data_parser.XmlCharacterDataParser, [])
  }));
  dart.setLibraryUri(character_data_parser.XmlCharacterDataParser, "package:xml/src/xml/utils/character_data_parser.dart");
  dart.setFieldSignature(character_data_parser.XmlCharacterDataParser, () => ({
    __proto__: dart.getFields(character_data_parser.XmlCharacterDataParser.__proto__),
    [_entityMapping$]: dart.finalFieldType(entity_mapping.XmlEntityMapping),
    [_stopper$]: dart.finalFieldType(core.String),
    [_stopperCode]: dart.finalFieldType(core.int),
    [_minLength$]: dart.finalFieldType(core.int)
  }));
  null_mapping.XmlNullEntityMapping = class XmlNullEntityMapping extends entity_mapping.XmlEntityMapping {
    decode(input) {
      return input;
    }
    decodeEntity(input) {
      return null;
    }
    encodeText(input) {
      return input;
    }
    encodeAttributeValue(input, type) {
      return input;
    }
  };
  (null_mapping.XmlNullEntityMapping.new = function() {
    null_mapping.XmlNullEntityMapping.__proto__.new.call(this);
    ;
  }).prototype = null_mapping.XmlNullEntityMapping.prototype;
  dart.addTypeTests(null_mapping.XmlNullEntityMapping);
  dart.setMethodSignature(null_mapping.XmlNullEntityMapping, () => ({
    __proto__: dart.getMethods(null_mapping.XmlNullEntityMapping.__proto__),
    decodeEntity: dart.fnType(core.String, [core.String]),
    encodeText: dart.fnType(core.String, [core.String]),
    encodeAttributeValue: dart.fnType(core.String, [core.String, attribute_type.XmlAttributeType])
  }));
  dart.setLibraryUri(null_mapping.XmlNullEntityMapping, "package:xml/src/xml/entities/null_mapping.dart");
  parser$.XmlParserDefinition = class XmlParserDefinition extends grammar$.XmlGrammarDefinition$(node$.XmlNode, name$.XmlName) {
    createAttribute(name, text, type) {
      name$.XmlName._check(name);
      return new attribute$.XmlAttribute.new(name, text, type);
    }
    createComment(text) {
      return new comment.XmlComment.new(text);
    }
    createCDATA(text) {
      return new cdata.XmlCDATA.new(text);
    }
    createDoctype(text) {
      return new doctype.XmlDoctype.new(text);
    }
    createDocument(children) {
      IterableOfXmlNode()._check(children);
      return new document.XmlDocument.new(children);
    }
    createElement(name, attributes, children, isSelfClosing = true) {
      name$.XmlName._check(name);
      IterableOfXmlNode()._check(attributes);
      IterableOfXmlNode()._check(children);
      return new element.XmlElement.new(name, ListOfXmlAttribute().from(attributes), children, isSelfClosing);
    }
    createProcessing(target, text) {
      return new processing.XmlProcessing.new(target, text);
    }
    createQualified(name) {
      return name$.XmlName.fromString(name);
    }
    createText(text) {
      return new text$.XmlText.new(text);
    }
  };
  (parser$.XmlParserDefinition.new = function(entityMapping) {
    parser$.XmlParserDefinition.__proto__.new.call(this, entityMapping);
    ;
  }).prototype = parser$.XmlParserDefinition.prototype;
  dart.addTypeTests(parser$.XmlParserDefinition);
  dart.setMethodSignature(parser$.XmlParserDefinition, () => ({
    __proto__: dart.getMethods(parser$.XmlParserDefinition.__proto__),
    createAttribute: dart.fnType(attribute$.XmlAttribute, [core.Object, core.String, attribute_type.XmlAttributeType]),
    createComment: dart.fnType(comment.XmlComment, [core.String]),
    createCDATA: dart.fnType(cdata.XmlCDATA, [core.String]),
    createDoctype: dart.fnType(doctype.XmlDoctype, [core.String]),
    createDocument: dart.fnType(document.XmlDocument, [core.Object]),
    createElement: dart.fnType(element.XmlElement, [core.Object, core.Object, core.Object], [core.bool]),
    createProcessing: dart.fnType(processing.XmlProcessing, [core.String, core.String]),
    createQualified: dart.fnType(name$.XmlName, [core.String]),
    createText: dart.fnType(text$.XmlText, [core.String])
  }));
  dart.setLibraryUri(parser$.XmlParserDefinition, "package:xml/src/xml/parser.dart");
  const _values = dart.privateName(cache, "_values");
  const _loader$ = dart.privateName(cache, "_loader");
  const _maxSize$ = dart.privateName(cache, "_maxSize");
  const _is_XmlCache_default = Symbol('_is_XmlCache_default');
  cache.XmlCache$ = dart.generic((K, V) => {
    let LinkedMapOfK$V = () => (LinkedMapOfK$V = dart.constFn(_js_helper.LinkedMap$(K, V)))();
    class XmlCache extends core.Object {
      _get(key) {
        K._check(key);
        let value = this[_values][$_get](key);
        if (value == null) {
          value = V._check(this[_loader$](key));
          this[_values][$_set](key, value);
        }
        while (dart.notNull(this[_values][$length]) > dart.notNull(this[_maxSize$])) {
          this[_values][$remove](this[_values][$keys][$first]);
        }
        return value;
      }
    }
    (XmlCache.new = function(_loader, _maxSize) {
      this[_values] = new (LinkedMapOfK$V()).new();
      this[_loader$] = _loader;
      this[_maxSize$] = _maxSize;
      ;
    }).prototype = XmlCache.prototype;
    dart.addTypeTests(XmlCache);
    XmlCache.prototype[_is_XmlCache_default] = true;
    dart.setMethodSignature(XmlCache, () => ({
      __proto__: dart.getMethods(XmlCache.__proto__),
      _get: dart.fnType(V, [core.Object])
    }));
    dart.setLibraryUri(XmlCache, "package:xml/src/xml/utils/cache.dart");
    dart.setFieldSignature(XmlCache, () => ({
      __proto__: dart.getFields(XmlCache.__proto__),
      [_loader$]: dart.finalFieldType(dart.fnType(dart.dynamic, [dart.dynamic])),
      [_maxSize$]: dart.finalFieldType(core.int),
      [_values]: dart.finalFieldType(core.Map$(K, V))
    }));
    return XmlCache;
  });
  cache.XmlCache = cache.XmlCache$();
  dart.addTypeTests(cache.XmlCache, _is_XmlCache_default);
  dart.applyMixin(parent.XmlParent.__proto__, owned.XmlOwnedMixin$(parent.XmlParent));
  dart.trackLibraries("packages/xml/src/xml/builder", {
    "package:xml/src/xml/builder.dart": builder,
    "package:xml/src/xml/visitors/transformer.dart": transformer,
    "package:xml/src/xml/visitors/visitor.dart": visitor,
    "package:xml/src/xml/visitors/visitable.dart": visitable,
    "package:xml/src/xml/utils/name.dart": name$,
    "package:xml/src/xml/utils/writable.dart": writable,
    "package:xml/src/xml/visitors/writer.dart": writer,
    "package:xml/src/xml/utils/token.dart": token$0,
    "package:xml/src/xml/nodes/text.dart": text$,
    "package:xml/src/xml/nodes/data.dart": data,
    "package:xml/src/xml/nodes/parent.dart": parent,
    "package:xml/src/xml/nodes/node.dart": node$,
    "package:xml/src/xml/nodes/cdata.dart": cdata,
    "package:xml/src/xml/utils/node_type.dart": node_type,
    "package:xml/src/xml/nodes/attribute.dart": attribute$,
    "package:xml/src/xml/nodes/element.dart": element,
    "package:xml/src/xml/utils/node_list.dart": node_list,
    "package:xml/src/xml/utils/owned.dart": owned,
    "package:xml/src/xml/utils/exceptions.dart": exceptions,
    "package:xml/src/xml/nodes/document.dart": document,
    "package:xml/src/xml/nodes/doctype.dart": doctype,
    "package:xml/src/xml/utils/named.dart": named,
    "package:xml/src/xml/utils/name_matcher.dart": name_matcher,
    "package:xml/src/xml/utils/attribute_type.dart": attribute_type,
    "package:xml/src/xml/visitors/normalizer.dart": normalizer,
    "package:xml/src/xml/nodes/document_fragment.dart": document_fragment,
    "package:xml/src/xml/iterators/preceding.dart": preceding,
    "package:xml/src/xml/iterators/following.dart": following,
    "package:xml/src/xml/iterators/descendants.dart": descendants,
    "package:xml/src/xml/iterators/ancestors.dart": ancestors,
    "package:xml/src/xml/nodes/processing.dart": processing,
    "package:xml/src/xml/nodes/comment.dart": comment,
    "package:xml/src/xml/entities/entity_mapping.dart": entity_mapping,
    "package:xml/src/xml/visitors/pretty_writer.dart": pretty_writer,
    "package:xml/src/xml/entities/default_mapping.dart": default_mapping,
    "package:xml/src/xml/entities/named_entities.dart": named_entities,
    "package:xml/src/xml/utils/simple_name.dart": simple_name,
    "package:xml/src/xml/utils/prefix_name.dart": prefix_name,
    "package:xml/src/xml/utils/entities.dart": entities,
    "package:xml/src/xml/grammar.dart": grammar$,
    "package:xml/src/xml/production.dart": production,
    "package:xml/src/xml/utils/character_data_parser.dart": character_data_parser,
    "package:xml/src/xml/entities/null_mapping.dart": null_mapping,
    "package:xml/src/xml/parser.dart": parser$,
    "package:xml/src/xml/utils/cache.dart": cache
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["builder.dart","visitors/visitor.dart","visitors/transformer.dart","utils/writable.dart","utils/owned.dart","nodes/node.dart","utils/name.dart","visitors/writer.dart","utils/token.dart","nodes/parent.dart","nodes/data.dart","nodes/text.dart","nodes/cdata.dart","utils/node_type.dart","nodes/element.dart","nodes/attribute.dart","utils/node_list.dart","utils/exceptions.dart","nodes/document.dart","nodes/doctype.dart","utils/named.dart","utils/name_matcher.dart","utils/attribute_type.dart","visitors/normalizer.dart","nodes/document_fragment.dart","iterators/preceding.dart","iterators/following.dart","iterators/descendants.dart","iterators/ancestors.dart","nodes/processing.dart","nodes/comment.dart","entities/entity_mapping.dart","visitors/pretty_writer.dart","entities/default_mapping.dart","entities/named_entities.dart","utils/simple_name.dart","utils/prefix_name.dart","utils/entities.dart","production.dart","grammar.dart","utils/character_data_parser.dart","entities/null_mapping.dart","parser.dart","utils/cache.dart"],"names":[],"mappings":"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","file":"builder.ddc.js"}');
  // Exports:
  return {
    src__xml__builder: builder,
    src__xml__visitors__transformer: transformer,
    src__xml__visitors__visitor: visitor,
    src__xml__visitors__visitable: visitable,
    src__xml__utils__name: name$,
    src__xml__utils__writable: writable,
    src__xml__visitors__writer: writer,
    src__xml__utils__token: token$0,
    src__xml__nodes__text: text$,
    src__xml__nodes__data: data,
    src__xml__nodes__parent: parent,
    src__xml__nodes__node: node$,
    src__xml__nodes__cdata: cdata,
    src__xml__utils__node_type: node_type,
    src__xml__nodes__attribute: attribute$,
    src__xml__nodes__element: element,
    src__xml__utils__node_list: node_list,
    src__xml__utils__owned: owned,
    src__xml__utils__exceptions: exceptions,
    src__xml__nodes__document: document,
    src__xml__nodes__doctype: doctype,
    src__xml__utils__named: named,
    src__xml__utils__name_matcher: name_matcher,
    src__xml__utils__attribute_type: attribute_type,
    src__xml__visitors__normalizer: normalizer,
    src__xml__nodes__document_fragment: document_fragment,
    src__xml__iterators__preceding: preceding,
    src__xml__iterators__following: following,
    src__xml__iterators__descendants: descendants,
    src__xml__iterators__ancestors: ancestors,
    src__xml__nodes__processing: processing,
    src__xml__nodes__comment: comment,
    src__xml__entities__entity_mapping: entity_mapping,
    src__xml__visitors__pretty_writer: pretty_writer,
    src__xml__entities__default_mapping: default_mapping,
    src__xml__entities__named_entities: named_entities,
    src__xml__utils__simple_name: simple_name,
    src__xml__utils__prefix_name: prefix_name,
    src__xml__utils__entities: entities,
    src__xml__grammar: grammar$,
    src__xml__production: production,
    src__xml__utils__character_data_parser: character_data_parser,
    src__xml__entities__null_mapping: null_mapping,
    src__xml__parser: parser$,
    src__xml__utils__cache: cache
  };
});

//# sourceMappingURL=builder.ddc.js.map
