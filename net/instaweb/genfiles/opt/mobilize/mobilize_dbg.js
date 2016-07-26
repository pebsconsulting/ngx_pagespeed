(function(){var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
  return void 0 !== a;
};
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c || !c.execScript || c.execScript("var " + a[0]);
  for (var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {};
  }
};
goog.define = function(a, b) {
  var c = b;
  COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
  goog.exportPath_(a, c);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide can not be used within a goog.module.");
  }
  if (!COMPILED && goog.isProvided_(a)) {
    throw Error('Namespace "' + a + '" already declared.');
  }
  goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[a];
    for (var c = a;(c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) {
      goog.implicitNamespaces_[c] = !0;
    }
  }
  goog.exportPath_(a, b);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
  if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInModuleLoader_()) {
    throw Error("Module " + a + " has been loaded incorrectly.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = a;
  if (!COMPILED) {
    if (goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
  }
};
goog.module.get = function(a) {
  return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
  if (!COMPILED) {
    return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null;
  }
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return null != goog.moduleLoaderState_;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInModuleLoader_()) {
    throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(a) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
  }
};
goog.forwardDeclare = function(a) {
};
COMPILED || (goog.isProvided_ = function(a) {
  return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a));
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(a, b) {
  for (var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if (goog.isDefAndNotNull(d[e])) {
      d = d[e];
    } else {
      return null;
    }
  }
  return d;
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for (d in a) {
    c[d] = a[d];
  }
};
goog.addDependency = function(a, b, c, d) {
  if (goog.DEPENDENCIES_ENABLED) {
    var e;
    a = a.replace(/\\/g, "/");
    var f = goog.dependencies_;
    d && "boolean" !== typeof d || (d = d ? {module:"goog"} : {});
    for (var g = 0;e = b[g];g++) {
      f.nameToPath[e] = a, f.loadFlags[a] = d;
    }
    for (d = 0;b = c[d];d++) {
      a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0;
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
  goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
    if (goog.isProvided_(a)) {
      return goog.isInModuleLoader_() ? goog.module.getInternal_(a) : null;
    }
    if (goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if (b) {
        return goog.writeScripts_(b), null;
      }
    }
    a = "goog.require could not find: " + a;
    goog.logToConsole_(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if (a.instance_) {
      return a.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a;
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.TRANSPILER = "transpile.js";
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {loadFlags:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return null != a && "write" in a;
}, goog.findBasePath_ = function() {
  if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1;0 <= b;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if ("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break;
        }
      }
    }
  }
}, goog.importScript_ = function(a, b) {
  (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0);
}, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importProcessedScript_ = function(a, b, c) {
  goog.importScript_("", 'goog.retrieveAndExec_("' + a + '", ' + b + ", " + c + ");");
}, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
  return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n";
}, goog.loadQueuedModules_ = function() {
  var a = goog.queuedModules_.length;
  if (0 < a) {
    var b = goog.queuedModules_;
    goog.queuedModules_ = [];
    for (var c = 0;c < a;c++) {
      goog.maybeProcessDeferredPath_(b[c]);
    }
  }
}, goog.maybeProcessDeferredDep_ = function(a) {
  goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a), goog.maybeProcessDeferredPath_(goog.basePath + a));
}, goog.isDeferredModule_ = function(a) {
  var b = (a = goog.getPathFromDeps_(a)) && goog.dependencies_.loadFlags[a] || {};
  return a && ("goog" == b.module || goog.needsTranspile_(b.lang)) ? goog.basePath + a in goog.dependencies_.deferred : !1;
}, goog.allDepsAreAvailable_ = function(a) {
  if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires) {
    for (var b in goog.dependencies_.requires[a]) {
      if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) {
        return !1;
      }
    }
  }
  return !0;
}, goog.maybeProcessDeferredPath_ = function(a) {
  if (a in goog.dependencies_.deferred) {
    var b = goog.dependencies_.deferred[a];
    delete goog.dependencies_.deferred[a];
    goog.globalEval(b);
  }
}, goog.loadModuleFromUrl = function(a) {
  goog.retrieveAndExec_(a, !0, !1);
}, goog.writeScriptSrcNode_ = function(a) {
  goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>');
}, goog.appendScriptSrcNode_ = function(a) {
  var b = goog.global.document, c = b.createElement("script");
  c.type = "text/javascript";
  c.src = a;
  c.defer = !1;
  c.async = !1;
  b.head.appendChild(c);
}, goog.writeScriptTag_ = function(a, b) {
  if (goog.inHtmlDocument_()) {
    var c = goog.global.document;
    if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
      if (/\bdeps.js$/.test(a)) {
        return !1;
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    if (void 0 === b) {
      if (goog.IS_OLD_IE_) {
        var d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
        c.write('<script type="text/javascript" src="' + a + '"' + d + ">\x3c/script>");
      } else {
        goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a);
      }
    } else {
      c.write('<script type="text/javascript">' + b + "\x3c/script>");
    }
    return !0;
  }
  return !1;
}, goog.needsTranspile_ = function(a) {
  if ("always" == goog.TRANSPILE) {
    return !0;
  }
  if ("never" == goog.TRANSPILE) {
    return !1;
  }
  if (!goog.transpiledLanguages_) {
    goog.transpiledLanguages_ = {es5:!0, es6:!0, "es6-impl":!0};
    try {
      goog.transpiledLanguages_.es5 = eval("[1,].length!=1"), eval('(()=>{"use strict";let a={};const X=class{constructor(){}x(z){return new Map([...arguments]).get(z[0])==3}};return new X().x([a,3])})()') && (goog.transpiledLanguages_["es6-impl"] = !1), eval('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()') && 
      (goog.transpiledLanguages_.es6 = !1);
    } catch (b) {
    }
  }
  return !!goog.transpiledLanguages_[a];
}, goog.transpiledLanguages_ = null, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
  "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
  return !0;
}, goog.writeScripts_ = function(a) {
  function b(a) {
    if (!(a in e.written || a in e.visited)) {
      e.visited[a] = !0;
      if (a in e.requires) {
        for (var f in e.requires[a]) {
          if (!goog.isProvided_(f)) {
            if (f in e.nameToPath) {
              b(e.nameToPath[f]);
            } else {
              throw Error("Undefined nameToPath for " + f);
            }
          }
        }
      }
      a in d || (d[a] = !0, c.push(a));
    }
  }
  var c = [], d = {}, e = goog.dependencies_;
  b(a);
  for (a = 0;a < c.length;a++) {
    var f = c[a];
    goog.dependencies_.written[f] = !0;
  }
  var g = goog.moduleLoaderState_;
  goog.moduleLoaderState_ = null;
  for (a = 0;a < c.length;a++) {
    if (f = c[a]) {
      var h = e.loadFlags[f] || {}, k = goog.needsTranspile_(h.lang);
      "goog" == h.module || k ? goog.importProcessedScript_(goog.basePath + f, "goog" == h.module, k) : goog.importScript_(goog.basePath + f);
    } else {
      throw goog.moduleLoaderState_ = g, Error("Undefined script input");
    }
  }
  goog.moduleLoaderState_ = g;
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.loadModule = function(a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:void 0, declareLegacyNamespace:!1};
    var c;
    if (goog.isFunction(a)) {
      c = a.call(void 0, {});
    } else {
      if (goog.isString(a)) {
        c = goog.loadModuleFromSource_.call(void 0, a);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var d = goog.moduleLoaderState_.moduleName;
    if (!goog.isString(d) || !d) {
      throw Error('Invalid module name "' + d + '"');
    }
    goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(c);
    goog.loadedModules_[d] = c;
  } finally {
    goog.moduleLoaderState_ = b;
  }
};
goog.loadModuleFromSource_ = function(a) {
  eval(a);
  return {};
};
goog.normalizePath_ = function(a) {
  a = a.split("/");
  for (var b = 0;b < a.length;) {
    "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
  }
  return a.join("/");
};
goog.loadFileSync_ = function(a) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
  }
  try {
    var b = new goog.global.XMLHttpRequest;
    b.open("get", a, !1);
    b.send();
    return 0 == b.status || 200 == b.status ? b.responseText : null;
  } catch (c) {
    return null;
  }
};
goog.retrieveAndExec_ = function(a, b, c) {
  if (!COMPILED) {
    var d = a;
    a = goog.normalizePath_(a);
    var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, f = goog.loadFileSync_(a);
    if (null == f) {
      throw Error('Load of "' + a + '" failed');
    }
    c && (f = goog.transpile_.call(goog.global, f, a));
    f = b ? goog.wrapModule_(a, f) : f + ("\n//# sourceURL=" + a);
    goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[d] = f, goog.queuedModules_.push(d)) : e(a, f);
  }
};
goog.transpile_ = function(a, b) {
  var c = goog.global.$jscomp;
  c || (goog.global.$jscomp = c = {});
  var d = c.transpile;
  if (!d) {
    var e = goog.basePath + goog.TRANSPILER, f = goog.loadFileSync_(e);
    f && (eval(f + "\n//# sourceURL=" + e), c = goog.global.$jscomp, d = c.transpile);
  }
  d || (d = c.transpile = function(a, b) {
    goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
    return a;
  });
  return d(a, b);
};
goog.typeOf = function(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
};
goog.isNull = function(a) {
  return null === a;
};
goog.isDefAndNotNull = function(a) {
  return null != a;
};
goog.isArray = function(a) {
  return "array" == goog.typeOf(a);
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isString = function(a) {
  return "string" == typeof a;
};
goog.isBoolean = function(a) {
  return "boolean" == typeof a;
};
goog.isNumber = function(a) {
  return "number" == typeof a;
};
goog.isFunction = function(a) {
  return "function" == goog.typeOf(a);
};
goog.isObject = function(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
  return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
  null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_];
  } catch (b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (a.clone) {
      return a.clone();
    }
    var b = "array" == b ? [] : {}, c;
    for (c in a) {
      b[c] = goog.cloneObject(a[c]);
    }
    return b;
  }
  return a;
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
};
goog.bind = function(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = c.slice();
    b.push.apply(b, arguments);
    return a.apply(this, b);
  };
};
goog.mixin = function(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return +new Date;
};
goog.globalEval = function(a) {
  if (goog.global.execScript) {
    goog.global.execScript(a, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_) {
        if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
          try {
            delete goog.global._evalTest_;
          } catch (d) {
          }
          goog.evalWorksForGlobals_ = !0;
        } else {
          goog.evalWorksForGlobals_ = !1;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(a);
      } else {
        var b = goog.global.document, c = b.createElement("SCRIPT");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a;
  }, d = function(a) {
    a = a.split("-");
    for (var b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]));
    }
    return b.join("-");
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a;
  };
  return b ? a + "-" + d(b) : d(a);
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
    return null != b && d in b ? b[d] : a;
  }));
  return a;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c);
};
goog.exportProperty = function(a, b, c) {
  a[b] = c;
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function(a, c, f) {
    for (var g = Array(arguments.length - 2), h = 2;h < arguments.length;h++) {
      g[h - 2] = arguments[h];
    }
    return b.prototype[c].apply(a, g);
  };
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (d.superClass_) {
    for (var e = Array(arguments.length - 1), f = 1;f < arguments.length;f++) {
      e[f - 1] = arguments[f];
    }
    return d.superClass_.constructor.apply(a, e);
  }
  e = Array(arguments.length - 2);
  for (f = 2;f < arguments.length;f++) {
    e[f - 2] = arguments[f];
  }
  for (var f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if (g.prototype[b] === d) {
      f = !0;
    } else {
      if (f) {
        return g.prototype[b].apply(a, e);
      }
    }
  }
  if (a[b] === d) {
    return a.constructor.prototype[b].apply(a, e);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a goog.module.");
  }
  a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
  var c = b.constructor, d = b.statics;
  c && c != Object.prototype.constructor || (c = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
  if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
    return a;
  }
  var c = !goog.defineClass.isUnsealable_(b), d = function() {
    var b = a.apply(this, arguments) || this;
    b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
    this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
    return b;
  };
  return d;
};
goog.defineClass.isUnsealable_ = function(a) {
  return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
  for (var c in b) {
    Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
  for (var d = 0;d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++) {
    c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
};
goog.tagUnsealableClass = function(a) {
  !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.math = {};
goog.math.Size = function(a, b) {
  this.width = a;
  this.height = b;
};
goog.math.Size.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1;
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height);
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
  return "(" + this.width + " x " + this.height + ")";
});
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height);
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height);
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height;
};
goog.math.Size.prototype.perimeter = function() {
  return 2 * (this.width + this.height);
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height;
};
goog.math.Size.prototype.isEmpty = function() {
  return !this.area();
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Size.prototype.fitsInside = function(a) {
  return this.width <= a.width && this.height <= a.height;
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Size.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.width *= a;
  this.height *= c;
  return this;
};
goog.math.Size.prototype.scaleToCover = function(a) {
  a = this.aspectRatio() <= a.aspectRatio() ? a.width / this.width : a.height / this.height;
  return this.scale(a);
};
goog.math.Size.prototype.scaleToFit = function(a) {
  a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
  return this.scale(a);
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0);
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c;
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length));
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length));
};
goog.string.caseInsensitiveEquals = function(a, b) {
  return a.toLowerCase() == b.toLowerCase();
};
goog.string.subs = function(a, b) {
  for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1);e.length && 1 < c.length;) {
    d += c.shift() + e.shift();
  }
  return d + c.join("%s");
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(a) {
  return /^[\s\xa0]*$/.test(a);
};
goog.string.isEmptyString = function(a) {
  return 0 == a.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
  return !/[^\t\n\r ]/.test(a);
};
goog.string.isAlpha = function(a) {
  return !/[^a-zA-Z]/.test(a);
};
goog.string.isNumeric = function(a) {
  return !/[^0-9]/.test(a);
};
goog.string.isAlphaNumeric = function(a) {
  return !/[^a-zA-Z0-9]/.test(a);
};
goog.string.isSpace = function(a) {
  return " " == a;
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1;
};
goog.string.numberAwareCompare_ = function(a, b, c) {
  if (a == b) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0;g < f;g++) {
    c = d[g];
    var h = e[g];
    if (c != h) {
      return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1;
    }
  }
  return d.length != e.length ? d.length - e.length : a < b ? -1 : 1;
};
goog.string.intAwareCompare = function(a, b) {
  return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(a, b) {
  return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a));
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(a, b) {
  if (b) {
    a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
  } else {
    if (!goog.string.ALL_RE_.test(a)) {
      return a;
    }
    -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
    goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"));
  }
  return a;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a;
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
  return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a;
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
  var c = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, d;
  d = b ? b.createElement("div") : goog.global.document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
    var g = c[a];
    if (g) {
      return g;
    }
    if ("#" == b.charAt(0)) {
      var h = Number("0" + b.substr(1));
      isNaN(h) || (g = String.fromCharCode(h));
    }
    g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
    return c[a] = g;
  });
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        if ("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if (!isNaN(d)) {
            return String.fromCharCode(d);
          }
        }
        return a;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b);
};
goog.string.preserveSpaces = function(a) {
  return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(a, b) {
  for (var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if (a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1);
    }
  }
  return a;
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if (d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d;
    a = a.substring(0, b - d) + "..." + a.substring(e);
  } else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
  }
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"<"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  for (var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
  }
  b.push('"');
  return b.join("");
};
goog.string.escapeString = function(a) {
  for (var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c));
  }
  return b.join("");
};
goog.string.escapeChar = function(a) {
  if (a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a];
  }
  if (a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
  }
  var b = a, c = a.charCodeAt(0);
  if (31 < c && 127 > c) {
    b = a;
  } else {
    if (256 > c) {
      if (b = "\\x", 16 > c || 256 < c) {
        b += "0";
      }
    } else {
      b = "\\u", 4096 > c && (b += "0");
    }
    b += c.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[a] = b;
};
goog.string.contains = function(a, b) {
  return -1 != a.indexOf(b);
};
goog.string.caseInsensitiveContains = function(a, b) {
  return goog.string.contains(a.toLowerCase(), b.toLowerCase());
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0;
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d;
};
goog.string.remove = function(a, b) {
  var c = new RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "");
};
goog.string.removeAll = function(a, b) {
  var c = new RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "");
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
  return a.repeat(b);
} : function(a, b) {
  return Array(b + 1).join(a);
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a;
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a);
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(a, b) {
  for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", k = e[g] || "", l = RegExp("(\\d*)(\\D*)", "g"), p = RegExp("(\\d*)(\\D*)", "g");
    do {
      var m = l.exec(h) || ["", "", ""], n = p.exec(k) || ["", "", ""];
      if (0 == m[0].length && 0 == n[0].length) {
        break;
      }
      var c = 0 == m[1].length ? 0 : parseInt(m[1], 10), q = 0 == n[1].length ? 0 : parseInt(n[1], 10), c = goog.string.compareElements_(c, q) || goog.string.compareElements_(0 == m[2].length, 0 == n[2].length) || goog.string.compareElements_(m[2], n[2]);
    } while (0 == c);
  }
  return c;
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
};
goog.string.hashCode = function(a) {
  for (var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c) >>> 0;
  }
  return b;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b;
};
goog.string.isLowerCamelCase = function(a) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(a);
};
goog.string.isUpperCamelCase = function(a) {
  return /^([A-Z][a-z]*)+$/.test(a);
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase();
  });
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase();
  });
};
goog.string.capitalize = function(a) {
  return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
};
goog.string.splitLimit = function(a, b, c) {
  a = a.split(b);
  for (var d = [];0 < c && a.length;) {
    d.push(a.shift()), c--;
  }
  a.length && d.push(a.join(b));
  return d;
};
goog.string.lastComponent = function(a, b) {
  if (b) {
    "string" == typeof b && (b = [b]);
  } else {
    return a;
  }
  for (var c = -1, d = 0;d < b.length;d++) {
    if ("" != b[d]) {
      var e = a.lastIndexOf(b[d]);
      e > c && (c = e);
    }
  }
  return -1 == c ? a : a.slice(c + 1);
};
goog.string.editDistance = function(a, b) {
  var c = [], d = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var e = 0;e < b.length + 1;e++) {
    c[e] = e;
  }
  for (e = 0;e < a.length;e++) {
    d[0] = e + 1;
    for (var f = 0;f < b.length;f++) {
      d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
    }
    for (f = 0;f < c.length;f++) {
      c[f] = d[f];
    }
  }
  return d[b.length];
};
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.debug = {};
goog.debug.Error = function(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
  this.reportErrorToServer = !0;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
  throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if (c) {
    var e = e + (": " + c), f = d
  } else {
    a && (e += ": " + a, f = b);
  }
  a = new goog.asserts.AssertionError("" + e, f || []);
  goog.asserts.errorHandler_(a);
};
goog.asserts.setErrorHandler = function(a) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.fail = function(a, b) {
  goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertElement = function(a, b, c) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
  return a;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var a in Object.prototype) {
    goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(a) {
  return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
  return a[a.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.indexOf.call(a, b, c);
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if (goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
  }
  for (;c < a.length;c++) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if (goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
  }
  for (;0 <= c;c--) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  Array.prototype.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a);
  }
};
goog.array.forEachRight = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.filter.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if (h in g) {
      var k = g[h];
      b.call(c, k, h, a) && (e[f++] = k);
    }
  }
  return e;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.map.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a));
  }
  return e;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  d && (b = goog.bind(b, d));
  return Array.prototype.reduce.call(a, b, c);
} : function(a, b, c, d) {
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a);
  });
  return e;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  goog.asserts.assert(null != b);
  d && (b = goog.bind(b, d));
  return Array.prototype.reduceRight.call(a, b, c);
} : function(a, b, c, d) {
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a);
  });
  return e;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.some.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return !0;
    }
  }
  return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.every.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && !b.call(c, e[f], f, a)) {
      return !1;
    }
  }
  return !0;
};
goog.array.count = function(a, b, c) {
  var d = 0;
  goog.array.forEach(a, function(a, f, g) {
    b.call(c, a, f, g) && ++d;
  }, c);
  return d;
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndex = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return f;
    }
  }
  return -1;
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndexRight = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if (d in e && b.call(c, e[d], d, a)) {
      return d;
    }
  }
  return -1;
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b);
};
goog.array.isEmpty = function(a) {
  return 0 == a.length;
};
goog.array.clear = function(a) {
  if (!goog.isArray(a)) {
    for (var b = a.length - 1;0 <= b;b--) {
      delete a[b];
    }
  }
  a.length = 0;
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b);
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b);
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b);
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d;
};
goog.array.removeLast = function(a, b) {
  var c = goog.array.lastIndexOf(a, b);
  return 0 <= c ? (goog.array.removeAt(a, c), !0) : !1;
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == Array.prototype.splice.call(a, b, 1).length;
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
};
goog.array.removeAllIf = function(a, b, c) {
  var d = 0;
  goog.array.forEachRight(a, function(e, f) {
    b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
  });
  return d;
};
goog.array.concat = function(a) {
  return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.join = function(a) {
  return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.toArray = function(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d];
    }
    return c;
  }
  return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for (var c = 1;c < arguments.length;c++) {
    var d = arguments[c];
    if (goog.isArrayLike(d)) {
      var e = a.length || 0, f = d.length || 0;
      a.length = e + f;
      for (var g = 0;g < f;g++) {
        a[e + g] = d[g];
      }
    } else {
      a.push(d);
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1));
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
};
goog.array.removeDuplicates = function(a, b, c) {
  b = b || a;
  var d = function(a) {
    return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a;
  };
  c = c || d;
  for (var d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = c(g);
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
  }
  b.length = e;
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c);
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for (var f = 0, g = a.length, h;f < g;) {
    var k = f + g >> 1, l;
    l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
    0 < l ? f = k + 1 : (g = k, h = !l);
  }
  return h ? f : ~f;
};
goog.array.sort = function(a, b) {
  a.sort(b || goog.array.defaultCompare);
};
goog.array.stableSort = function(a, b) {
  for (var c = Array(a.length), d = 0;d < a.length;d++) {
    c[d] = {index:d, value:a[d]};
  }
  var e = b || goog.array.defaultCompare;
  goog.array.sort(c, function(a, b) {
    return e(a.value, b.value) || a.index - b.index;
  });
  for (d = 0;d < a.length;d++) {
    a[d] = c[d].value;
  }
};
goog.array.sortByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(b(a), b(c));
  });
};
goog.array.sortObjectsByKey = function(a, b, c) {
  goog.array.sortByKey(a, function(a) {
    return a[b];
  }, c);
};
goog.array.isSorted = function(a, b, c) {
  b = b || goog.array.defaultCompare;
  for (var d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if (0 < e || 0 == e && c) {
      return !1;
    }
  }
  return !0;
};
goog.array.equals = function(a, b, c) {
  if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return !1;
  }
  var d = a.length;
  c = c || goog.array.defaultCompareEquality;
  for (var e = 0;e < d;e++) {
    if (!c(a[e], b[e])) {
      return !1;
    }
  }
  return !0;
};
goog.array.compare3 = function(a, b, c) {
  c = c || goog.array.defaultCompare;
  for (var d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if (0 != f) {
      return f;
    }
  }
  return goog.array.defaultCompare(a.length, b.length);
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
  return -goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b;
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1;
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1;
};
goog.array.bucket = function(a, b, c) {
  for (var d = {}, e = 0;e < a.length;e++) {
    var f = a[e], g = b.call(c, f, e, a);
    goog.isDef(g) && (d[g] || (d[g] = [])).push(f);
  }
  return d;
};
goog.array.toObject = function(a, b, c) {
  var d = {};
  goog.array.forEach(a, function(e, f) {
    d[b.call(c, e, f, a)] = e;
  });
  return d;
};
goog.array.range = function(a, b, c) {
  var d = [], e = 0, f = a;
  c = c || 1;
  void 0 !== b && (e = a, f = b);
  if (0 > c * (f - e)) {
    return [];
  }
  if (0 < c) {
    for (a = e;a < f;a += c) {
      d.push(a);
    }
  } else {
    for (a = e;a > f;a += c) {
      d.push(a);
    }
  }
  return d;
};
goog.array.repeat = function(a, b) {
  for (var c = [], d = 0;d < b;d++) {
    c[d] = a;
  }
  return c;
};
goog.array.flatten = function(a) {
  for (var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    if (goog.isArray(d)) {
      for (var e = 0;e < d.length;e += 8192) {
        for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0;g < f.length;g++) {
          b.push(f[g]);
        }
      }
    } else {
      b.push(d);
    }
  }
  return b;
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
  return a;
};
goog.array.moveItem = function(a, b, c) {
  goog.asserts.assert(0 <= b && b < a.length);
  goog.asserts.assert(0 <= c && c < a.length);
  b = Array.prototype.splice.call(a, b, 1);
  Array.prototype.splice.call(a, c, 0, b[0]);
};
goog.array.zip = function(a) {
  if (!arguments.length) {
    return [];
  }
  for (var b = [], c = arguments[0].length, d = 1;d < arguments.length;d++) {
    arguments[d].length < c && (c = arguments[d].length);
  }
  for (d = 0;d < c;d++) {
    for (var e = [], f = 0;f < arguments.length;f++) {
      e.push(arguments[f][d]);
    }
    b.push(e);
  }
  return b;
};
goog.array.shuffle = function(a, b) {
  for (var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f;
  }
};
goog.array.copyByIndex = function(a, b) {
  var c = [];
  goog.array.forEach(b, function(b) {
    c.push(a[b]);
  });
  return c;
};
goog.array.concatMap = function(a, b, c) {
  return goog.array.concat.apply([], goog.array.map(a, b, c));
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var a = goog.labs.userAgent.util.getNavigator_();
  return a && (a = a.userAgent) ? a : "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
  goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(a) {
  var b = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(b, a);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
  var b = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(b, a);
};
goog.labs.userAgent.util.extractVersionTuples = function(a) {
  for (var b = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d;d = b.exec(a);) {
    c.push([d[1], d[2], d[3] || void 0]);
  }
  return c;
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
  var a = goog.labs.userAgent.util.getUserAgent();
  if (a) {
    var a = goog.labs.userAgent.util.extractVersionTuples(a), b = goog.labs.userAgent.engine.getEngineTuple_(a);
    if (b) {
      return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
    }
    var a = a[0], c;
    if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) {
      return c[1];
    }
  }
  return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
  if (!goog.labs.userAgent.engine.isEdge()) {
    return a[1];
  }
  for (var b = 0;b < a.length;b++) {
    var c = a[b];
    if ("Edge" == c[0]) {
      return c;
    }
  }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a);
};
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
  var c = goog.array.find(a, function(a) {
    return b == a[0];
  });
  return c && c[1] || "";
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.platform.isIpod = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPod");
};
goog.labs.userAgent.platform.isIphone = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIpad = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIos = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
};
goog.labs.userAgent.platform.isMacintosh = function() {
  return goog.labs.userAgent.util.matchUserAgent("Macintosh");
};
goog.labs.userAgent.platform.isLinux = function() {
  return goog.labs.userAgent.util.matchUserAgent("Linux");
};
goog.labs.userAgent.platform.isWindows = function() {
  return goog.labs.userAgent.util.matchUserAgent("Windows");
};
goog.labs.userAgent.platform.isChromeOS = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrOS");
};
goog.labs.userAgent.platform.getVersion = function() {
  var a = goog.labs.userAgent.util.getUserAgent(), b = "";
  goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && 
  (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
  return b || "";
};
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a);
};
goog.object = {};
goog.object.is = function(a, b) {
  return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
};
goog.object.forEach = function(a, b, c) {
  for (var d in a) {
    b.call(c, a[d], d, a);
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e]);
  }
  return d;
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    d[e] = b.call(c, a[e], e, a);
  }
  return d;
};
goog.object.some = function(a, b, c) {
  for (var d in a) {
    if (b.call(c, a[d], d, a)) {
      return !0;
    }
  }
  return !1;
};
goog.object.every = function(a, b, c) {
  for (var d in a) {
    if (!b.call(c, a[d], d, a)) {
      return !1;
    }
  }
  return !0;
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for (c in a) {
    b++;
  }
  return b;
};
goog.object.getAnyKey = function(a) {
  for (var b in a) {
    return b;
  }
};
goog.object.getAnyValue = function(a) {
  for (var b in a) {
    return a[b];
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b);
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = a[d];
  }
  return b;
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = d;
  }
  return b;
};
goog.object.getValueByKeys = function(a, b) {
  for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && (a = a[d[c]], goog.isDef(a));c++) {
  }
  return a;
};
goog.object.containsKey = function(a, b) {
  return null !== a && b in a;
};
goog.object.containsValue = function(a, b) {
  for (var c in a) {
    if (a[c] == b) {
      return !0;
    }
  }
  return !1;
};
goog.object.findKey = function(a, b, c) {
  for (var d in a) {
    if (b.call(c, a[d], d, a)) {
      return d;
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return (b = goog.object.findKey(a, b, c)) && a[b];
};
goog.object.isEmpty = function(a) {
  for (var b in a) {
    return !1;
  }
  return !0;
};
goog.object.clear = function(a) {
  for (var b in a) {
    delete a[b];
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c;
};
goog.object.add = function(a, b, c) {
  if (null !== a && b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c);
};
goog.object.get = function(a, b, c) {
  return null !== a && b in a ? a[b] : c;
};
goog.object.set = function(a, b, c) {
  a[b] = c;
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c;
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
  if (b in a) {
    return a[b];
  }
  c = c();
  return a[b] = c;
};
goog.object.equals = function(a, b) {
  for (var c in a) {
    if (!(c in b) || a[c] !== b[c]) {
      return !1;
    }
  }
  for (c in b) {
    if (!(c in a)) {
      return !1;
    }
  }
  return !0;
};
goog.object.clone = function(a) {
  var b = {}, c;
  for (c in a) {
    b[c] = a[c];
  }
  return b;
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (goog.isFunction(a.clone)) {
      return a.clone();
    }
    var b = "array" == b ? [] : {}, c;
    for (c in a) {
      b[c] = goog.object.unsafeClone(a[c]);
    }
    return b;
  }
  return a;
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for (c in a) {
    b[a[c]] = c;
  }
  return b;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for (var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for (c in d) {
      a[c] = d[c];
    }
    for (var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if (1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (b % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1];
  }
  return c;
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if (1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0;
  }
  return c;
};
goog.object.createImmutableView = function(a) {
  var b = a;
  Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
  return b;
};
goog.object.isImmutableView = function(a) {
  return !!Object.isFrozen && Object.isFrozen(a);
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchEdge_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  function a(a) {
    a = goog.array.find(a, d);
    return c[a] || "";
  }
  var b = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(b);
  }
  var b = goog.labs.userAgent.util.extractVersionTuples(b), c = {};
  goog.array.forEach(b, function(a) {
    c[a[0]] = a[1];
  });
  var d = goog.partial(goog.object.containsKey, c);
  return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a);
};
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
  var b = /rv: *([\d\.]*)/.exec(a);
  if (b && b[1]) {
    return b[1];
  }
  var b = "", c = /MSIE +([\d\.]+)/.exec(a);
  if (c && c[1]) {
    if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1]) {
      if (a && a[1]) {
        switch(a[1]) {
          case "4.0":
            b = "8.0";
            break;
          case "5.0":
            b = "9.0";
            break;
          case "6.0":
            b = "10.0";
            break;
          case "7.0":
            b = "11.0";
        }
      } else {
        b = "7.0";
      }
    } else {
      b = c[1];
    }
  }
  return b;
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator || null;
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.ASSUME_IPOD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
  var a = goog.userAgent.getNavigator();
  return !!a && goog.string.contains(a.appVersion || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
goog.userAgent.determineVersion_ = function() {
  var a = "", b = goog.userAgent.getVersionRegexResult_();
  b && (a = b ? b[1] : "");
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), null != b && b > parseFloat(a)) ? String(b) : a;
};
goog.userAgent.getVersionRegexResult_ = function() {
  var a = goog.userAgent.getUserAgentString();
  if (goog.userAgent.GECKO) {
    return /rv\:([^\);]+)(\)|;)/.exec(a);
  }
  if (goog.userAgent.EDGE) {
    return /Edge\/([\d\.]+)/.exec(a);
  }
  if (goog.userAgent.IE) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
  }
  if (goog.userAgent.WEBKIT) {
    return /WebKit\/(\S+)/.exec(a);
  }
  if (goog.userAgent.OPERA) {
    return /(?:Version)[ \/]?(\S+)/.exec(a);
  }
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[a] || (goog.userAgent.isVersionOrHigherCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a));
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
  return Number(goog.userAgent.DOCUMENT_MODE) >= a;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
  var a = goog.global.document, b = goog.userAgent.getDocumentMode_();
  return a && goog.userAgent.IE ? b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0;
}();
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT, 
INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE, LEGACY_IE_RANGES:goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(a, b, c) {
  return Math.min(Math.max(a, b), c);
};
goog.math.modulo = function(a, b) {
  var c = a % b;
  return 0 > c * b ? c + b : c;
};
goog.math.lerp = function(a, b, c) {
  return a + c * (b - a);
};
goog.math.nearlyEquals = function(a, b, c) {
  return Math.abs(a - b) <= (c || 1E-6);
};
goog.math.standardAngle = function(a) {
  return goog.math.modulo(a, 360);
};
goog.math.standardAngleInRadians = function(a) {
  return goog.math.modulo(a, 2 * Math.PI);
};
goog.math.toRadians = function(a) {
  return a * Math.PI / 180;
};
goog.math.toDegrees = function(a) {
  return 180 * a / Math.PI;
};
goog.math.angleDx = function(a, b) {
  return b * Math.cos(goog.math.toRadians(a));
};
goog.math.angleDy = function(a, b) {
  return b * Math.sin(goog.math.toRadians(a));
};
goog.math.angle = function(a, b, c, d) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)));
};
goog.math.angleDifference = function(a, b) {
  var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
  180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
  return c;
};
goog.math.sign = Math.sign || function(a) {
  return 0 < a ? 1 : 0 > a ? -1 : a;
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
  c = c || function(a, b) {
    return a == b;
  };
  d = d || function(b, c) {
    return a[b];
  };
  for (var e = a.length, f = b.length, g = [], h = 0;h < e + 1;h++) {
    g[h] = [], g[h][0] = 0;
  }
  for (var k = 0;k < f + 1;k++) {
    g[0][k] = 0;
  }
  for (h = 1;h <= e;h++) {
    for (k = 1;k <= f;k++) {
      c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
    }
  }
  for (var l = [], h = e, k = f;0 < h && 0 < k;) {
    c(a[h - 1], b[k - 1]) ? (l.unshift(d(h - 1, k - 1)), h--, k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
  }
  return l;
};
goog.math.sum = function(a) {
  return goog.array.reduce(arguments, function(a, c) {
    return a + c;
  }, 0);
};
goog.math.average = function(a) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(a) {
  var b = arguments.length;
  if (2 > b) {
    return 0;
  }
  var c = goog.math.average.apply(null, arguments);
  return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
    return Math.pow(a - c, 2);
  })) / (b - 1);
};
goog.math.standardDeviation = function(a) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(a) {
  return isFinite(a) && 0 == a % 1;
};
goog.math.isFiniteNumber = function(a) {
  return isFinite(a) && !isNaN(a);
};
goog.math.isNegativeZero = function(a) {
  return 0 == a && 0 > 1 / a;
};
goog.math.log10Floor = function(a) {
  if (0 < a) {
    var b = Math.round(Math.log(a) * Math.LOG10E);
    return b - (parseFloat("1e" + b) > a ? 1 : 0);
  }
  return 0 == a ? -Infinity : NaN;
};
goog.math.safeFloor = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.floor(a + (b || 2E-15));
};
goog.math.safeCeil = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.ceil(a - (b || 2E-15));
};
goog.math.Coordinate = function(a, b) {
  this.x = goog.isDef(a) ? a : 0;
  this.y = goog.isDef(b) ? b : 0;
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y);
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ")";
});
goog.math.Coordinate.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1;
};
goog.math.Coordinate.distance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return Math.sqrt(c * c + d * d);
};
goog.math.Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};
goog.math.Coordinate.azimuth = function(a) {
  return goog.math.angle(0, 0, a.x, a.y);
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return c * c + d * d;
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y);
};
goog.math.Coordinate.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};
goog.math.Coordinate.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};
goog.math.Coordinate.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};
goog.math.Coordinate.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), goog.isNumber(b) && (this.y += b));
  return this;
};
goog.math.Coordinate.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.x *= a;
  this.y *= c;
  return this;
};
goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
  var c = b || new goog.math.Coordinate(0, 0), d = this.x, e = this.y, f = Math.cos(a), g = Math.sin(a);
  this.x = (d - c.x) * f - (e - c.y) * g + c.x;
  this.y = (d - c.x) * g + (e - c.y) * f + c.y;
};
goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
  this.rotateRadians(goog.math.toRadians(a), b);
};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", ARTICLE:"ARTICLE", ASIDE:"ASIDE", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDI:"BDI", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", COMMAND:"COMMAND", DATA:"DATA", DATALIST:"DATALIST", DD:"DD", DEL:"DEL", DETAILS:"DETAILS", DFN:"DFN", 
DIALOG:"DIALOG", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", EMBED:"EMBED", FIELDSET:"FIELDSET", FIGCAPTION:"FIGCAPTION", FIGURE:"FIGURE", FONT:"FONT", FOOTER:"FOOTER", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HEADER:"HEADER", HGROUP:"HGROUP", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", KEYGEN:"KEYGEN", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", 
MAP:"MAP", MARK:"MARK", MATH:"MATH", MENU:"MENU", META:"META", METER:"METER", NAV:"NAV", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", OUTPUT:"OUTPUT", P:"P", PARAM:"PARAM", PRE:"PRE", PROGRESS:"PROGRESS", Q:"Q", RP:"RP", RT:"RT", RUBY:"RUBY", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SECTION:"SECTION", SELECT:"SELECT", SMALL:"SMALL", SOURCE:"SOURCE", SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUMMARY:"SUMMARY", 
SUP:"SUP", SVG:"SVG", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEMPLATE:"TEMPLATE", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TIME:"TIME", TITLE:"TITLE", TR:"TR", TRACK:"TRACK", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO", WBR:"WBR"};
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 
2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
goog.i18n.bidi.Format = {LRE:"\u202a", RLE:"\u202b", PDF:"\u202c", LRM:"\u200e", RLM:"\u200f"};
goog.i18n.bidi.Dir = {LTR:1, RTL:-1, NEUTRAL:0};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
  return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
  return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a;
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
  return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
  return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
  return goog.i18n.bidi.rtlRe_.test(a);
};
goog.i18n.bidi.isLtrChar = function(a) {
  return goog.i18n.bidi.ltrRe_.test(a);
};
goog.i18n.bidi.isNeutralChar = function(a) {
  return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a);
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
  return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
  return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
  a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
  return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a);
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
  return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
  return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
  return goog.i18n.bidi.rtlLocalesRe_.test(a);
};
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText = function(a, b) {
  var c = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
  return a.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c);
};
goog.i18n.bidi.enforceRtlInHtml = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>";
};
goog.i18n.bidi.enforceRtlInText = function(a) {
  return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF;
};
goog.i18n.bidi.enforceLtrInHtml = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>";
};
goog.i18n.bidi.enforceLtrInText = function(a) {
  return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF;
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
  return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
  return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3");
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
goog.i18n.bidi.rtlDetectionThreshold_ = .4;
goog.i18n.bidi.estimateDirection = function(a, b) {
  for (var c = 0, d = 0, e = !1, f = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_), g = 0;g < f.length;g++) {
    var h = f[g];
    goog.i18n.bidi.startsWithRtl(h) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(h) ? e = !0 : goog.i18n.bidi.hasAnyLtr(h) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(h) && (e = !0);
  }
  return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
};
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
  return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL;
};
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
  a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
};
goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
  switch(goog.i18n.bidi.estimateDirection(b)) {
    case goog.i18n.bidi.Dir.LTR:
      a.dir = "ltr";
      break;
    case goog.i18n.bidi.Dir.RTL:
      a.dir = "rtl";
      break;
    default:
      a.removeAttribute("dir");
  }
};
goog.i18n.bidi.DirectionalString = function() {
};
goog.string.TypedString = function() {
};
goog.string.Const = function() {
  this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
  this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
  return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
};
goog.string.Const.prototype.toString = function() {
  return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}";
};
goog.string.Const.unwrap = function(a) {
  if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) {
    return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  }
  goog.asserts.fail("expected object of type Const, got '" + a + "'");
  return "type_error:Const";
};
goog.string.Const.from = function(a) {
  return goog.string.Const.create__googStringSecurityPrivate_(a);
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
  var b = new goog.string.Const;
  b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
  return b;
};
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function(a) {
  return goog.fs.url.getUrlObject_().createObjectURL(a);
};
goog.fs.url.revokeObjectUrl = function(a) {
  goog.fs.url.getUrlObject_().revokeObjectURL(a);
};
goog.fs.url.getUrlObject_ = function() {
  var a = goog.fs.url.findUrlObject_();
  if (null != a) {
    return a;
  }
  throw Error("This browser doesn't seem to support blob URLs");
};
goog.fs.url.findUrlObject_ = function() {
  return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null;
};
goog.fs.url.browserSupportsObjectUrls = function() {
  return null != goog.fs.url.findUrlObject_();
};
goog.html = {};
goog.html.SafeUrl = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
  this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
  return goog.i18n.bidi.Dir.LTR;
};
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
  return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
});
goog.html.SafeUrl.unwrap = function(a) {
  if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeUrl";
};
goog.html.SafeUrl.fromConstant = function(a) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i;
goog.html.SafeUrl.fromBlob = function(a) {
  a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.fromDataUrl = function(a) {
  var b = a.match(goog.html.DATA_URL_PATTERN_), b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING);
};
goog.html.SafeUrl.fromTelUrl = function(a) {
  goog.string.caseInsensitiveStartsWith(a, "tel:") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.sanitize = function(a) {
  if (a instanceof goog.html.SafeUrl) {
    return a;
  }
  a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
  goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.SafeUrl;
  b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  return b;
};
goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
goog.html.TrustedResourceUrl = function() {
  this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
  this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
  return goog.i18n.bidi.Dir.LTR;
};
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
  return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}";
});
goog.html.TrustedResourceUrl.unwrap = function(a) {
  if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
  }
  goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:TrustedResourceUrl";
};
goog.html.TrustedResourceUrl.fromConstant = function(a) {
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
};
goog.html.TrustedResourceUrl.fromConstants = function(a) {
  for (var b = "", c = 0;c < a.length;c++) {
    b += goog.string.Const.unwrap(a[c]);
  }
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.TrustedResourceUrl;
  b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
  return b;
};
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {area:!0, base:!0, br:!0, col:!0, command:!0, embed:!0, hr:!0, img:!0, input:!0, keygen:!0, link:!0, meta:!0, param:!0, source:!0, track:!0, wbr:!0};
goog.dom.tags.isVoidTag = function(a) {
  return !0 === goog.dom.tags.VOID_TAGS_[a];
};
goog.html.SafeStyleSheet = function() {
  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
  this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyleSheet.concat = function(a) {
  var b = "", c = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a);
  };
  goog.array.forEach(arguments, c);
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.SafeStyleSheet.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  if (0 === a.length) {
    return goog.html.SafeStyleSheet.EMPTY;
  }
  goog.asserts.assert(!goog.string.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
};
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
  return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}";
});
goog.html.SafeStyleSheet.unwrap = function(a) {
  if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeStyleSheet";
};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
  return this;
};
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle = function() {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
  this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  if (0 === a.length) {
    return goog.html.SafeStyle.EMPTY;
  }
  goog.html.SafeStyle.checkStyle_(a);
  goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
  goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeStyle.checkStyle_ = function(a) {
  goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a);
};
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
};
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
  return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}";
});
goog.html.SafeStyle.unwrap = function(a) {
  if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeStyle";
};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
  return this;
};
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
  var b = "", c;
  for (c in a) {
    if (!/^[-_a-zA-Z0-9]+$/.test(c)) {
      throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
    }
    var d = a[c];
    null != d && (d instanceof goog.string.Const ? (d = goog.string.Const.unwrap(d), goog.asserts.assert(!/[{;}]/.test(d), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(d) ? goog.html.SafeStyle.hasBalancedQuotes_(d) || (goog.asserts.fail("String value requires balanced quotes, got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING), 
    b += c + ":" + d + ";");
  }
  if (!b) {
    return goog.html.SafeStyle.EMPTY;
  }
  goog.html.SafeStyle.checkStyle_(b);
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
  for (var b = !0, c = !0, d = 0;d < a.length;d++) {
    var e = a.charAt(d);
    "'" == e && c ? b = !b : '"' == e && b && (c = !c);
  }
  return b && c;
};
goog.html.SafeStyle.VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
goog.html.SafeStyle.concat = function(a) {
  var b = "", c = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a);
  };
  goog.array.forEach(arguments, c);
  return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY;
};
goog.html.SafeHtml = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
  this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
  this.dir_ = null;
};
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
  return this.dir_;
};
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
  return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
});
goog.html.SafeHtml.unwrap = function(a) {
  if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeHtml";
};
goog.html.SafeHtml.htmlEscape = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  var b = null;
  a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
  a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b);
};
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  a = goog.html.SafeHtml.htmlEscape(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection());
};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  a = goog.html.SafeHtml.htmlEscape(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection());
};
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = {action:!0, cite:!0, data:!0, formaction:!0, href:!0, manifest:!0, poster:!0, src:!0};
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = goog.object.createSet(goog.dom.TagName.APPLET, goog.dom.TagName.BASE, goog.dom.TagName.EMBED, goog.dom.TagName.IFRAME, goog.dom.TagName.LINK, goog.dom.TagName.MATH, goog.dom.TagName.META, goog.dom.TagName.OBJECT, goog.dom.TagName.SCRIPT, goog.dom.TagName.STYLE, goog.dom.TagName.SVG, goog.dom.TagName.TEMPLATE);
goog.html.SafeHtml.create = function(a, b, c) {
  goog.html.SafeHtml.verifyTagName(a);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(a, b, c);
};
goog.html.SafeHtml.verifyTagName = function(a) {
  if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) {
    throw Error("Invalid tag name <" + a + ">.");
  }
  if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) {
    throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
  }
};
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
  a && goog.html.TrustedResourceUrl.unwrap(a);
  var e = {};
  e.src = a || null;
  e.srcdoc = b && goog.html.SafeHtml.unwrap(b);
  a = goog.html.SafeHtml.combineAttributes(e, {sandbox:""}, c);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
};
goog.html.SafeHtml.createSandboxIframe = function(a, b, c, d) {
  if (!goog.html.SafeHtml.canUseSandboxIframe()) {
    throw Error("The browser does not support sandboxed iframes.");
  }
  var e = {};
  e.src = a ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)) : null;
  e.srcdoc = b || null;
  e.sandbox = "";
  a = goog.html.SafeHtml.combineAttributes(e, {}, c);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
};
goog.html.SafeHtml.canUseSandboxIframe = function() {
  return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype;
};
goog.html.SafeHtml.createScriptSrc = function(a, b) {
  goog.html.TrustedResourceUrl.unwrap(a);
  var c = goog.html.SafeHtml.combineAttributes({src:a}, {}, b);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", c);
};
goog.html.SafeHtml.createStyle = function(a, b) {
  var c = goog.html.SafeHtml.combineAttributes({type:"text/css"}, {}, b), d = "";
  a = goog.array.concat(a);
  for (var e = 0;e < a.length;e++) {
    d += goog.html.SafeStyleSheet.unwrap(a[e]);
  }
  d = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d, goog.i18n.bidi.Dir.NEUTRAL);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", c, d);
};
goog.html.SafeHtml.createMetaRefresh = function(a, b) {
  var c = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
  (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(c, ";") && (c = "'" + c.replace(/'/g, "%27") + "'");
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {"http-equiv":"refresh", content:(b || 0) + "; url=" + c});
};
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
  if (c instanceof goog.string.Const) {
    c = goog.string.Const.unwrap(c);
  } else {
    if ("style" == b.toLowerCase()) {
      c = goog.html.SafeHtml.getStyleValue_(c);
    } else {
      if (/^on/i.test(b)) {
        throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
      }
      if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_) {
        if (c instanceof goog.html.TrustedResourceUrl) {
          c = goog.html.TrustedResourceUrl.unwrap(c);
        } else {
          if (c instanceof goog.html.SafeUrl) {
            c = goog.html.SafeUrl.unwrap(c);
          } else {
            if (goog.isString(c)) {
              c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
            } else {
              throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.');
            }
          }
        }
      }
    }
  }
  c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
  goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
  return b + '="' + goog.string.htmlEscape(String(c)) + '"';
};
goog.html.SafeHtml.getStyleValue_ = function(a) {
  if (!goog.isObject(a)) {
    throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
  }
  a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
  return goog.html.SafeStyle.unwrap(a);
};
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
  b = goog.html.SafeHtml.create(b, c, d);
  b.dir_ = a;
  return b;
};
goog.html.SafeHtml.concat = function(a) {
  var b = goog.i18n.bidi.Dir.NEUTRAL, c = "", d = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a), c += goog.html.SafeHtml.unwrap(a), a = a.getDirection(), b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null));
  };
  goog.array.forEach(arguments, d);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b);
};
goog.html.SafeHtml.concatWithDir = function(a, b) {
  var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
  c.dir_ = a;
  return c;
};
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
  return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b);
};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  this.dir_ = b;
  return this;
};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
  var d = null, e;
  e = "<" + a + goog.html.SafeHtml.stringifyAttributes(a, b);
  goog.isDefAndNotNull(c) ? goog.isArray(c) || (c = [c]) : c = [];
  goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c), e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
  (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d);
};
goog.html.SafeHtml.stringifyAttributes = function(a, b) {
  var c = "";
  if (b) {
    for (var d in b) {
      if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d)) {
        throw Error('Invalid attribute name "' + d + '".');
      }
      var e = b[d];
      goog.isDefAndNotNull(e) && (c += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, d, e));
    }
  }
  return c;
};
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
  }
  for (e in b) {
    goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
  }
  for (e in c) {
    var f = e.toLowerCase();
    if (f in a) {
      throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
    }
    f in b && delete d[f];
    d[e] = c[e];
  }
  return d;
};
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
goog.dom.safe = {};
goog.dom.safe.InsertAdjacentHtmlPosition = {AFTERBEGIN:"afterbegin", AFTEREND:"afterend", BEFOREBEGIN:"beforebegin", BEFOREEND:"beforeend"};
goog.dom.safe.insertAdjacentHtml = function(a, b, c) {
  a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrap(c));
};
goog.dom.safe.setInnerHtml = function(a, b) {
  a.innerHTML = goog.html.SafeHtml.unwrap(b);
};
goog.dom.safe.setOuterHtml = function(a, b) {
  a.outerHTML = goog.html.SafeHtml.unwrap(b);
};
goog.dom.safe.documentWrite = function(a, b) {
  a.write(goog.html.SafeHtml.unwrap(b));
};
goog.dom.safe.setAnchorHref = function(a, b) {
  var c;
  c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
  a.href = goog.html.SafeUrl.unwrap(c);
};
goog.dom.safe.setImageSrc = function(a, b) {
  var c;
  c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
  a.src = goog.html.SafeUrl.unwrap(c);
};
goog.dom.safe.setEmbedSrc = function(a, b) {
  a.src = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setFrameSrc = function(a, b) {
  a.src = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setIframeSrc = function(a, b) {
  a.src = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setLinkHrefAndRel = function(a, b, c) {
  a.rel = c;
  goog.string.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.sanitize(b).getTypedStringValue();
};
goog.dom.safe.setObjectData = function(a, b) {
  a.data = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setScriptSrc = function(a, b) {
  a.src = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setLocationHref = function(a, b) {
  var c;
  c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
  a.href = goog.html.SafeUrl.unwrap(c);
};
goog.dom.safe.openInWindow = function(a, b, c, d, e) {
  a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitize(a);
  return (b || window).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, e);
};
goog.html.SafeScript = function() {
  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
  this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeScript.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeScript.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeScriptWrappedValue_;
};
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
  return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}";
});
goog.html.SafeScript.unwrap = function(a) {
  if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeScript";
};
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
  return this;
};
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null);
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmpty(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(a) {
  return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper);
};
goog.dom.getDocument = function() {
  return document;
};
goog.dom.getElement = function(a) {
  return goog.dom.getElementHelper_(document, a);
};
goog.dom.getElementHelper_ = function(a, b) {
  return goog.isString(b) ? a.getElementById(b) : b;
};
goog.dom.getRequiredElement = function(a) {
  return goog.dom.getRequiredElementHelper_(document, a);
};
goog.dom.getRequiredElementHelper_ = function(a, b) {
  goog.asserts.assertString(b);
  var c = goog.dom.getElementHelper_(a, b);
  return c = goog.asserts.assertElement(c, "No element found with id: " + b);
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(document, a, b, c);
};
goog.dom.getElementsByClass = function(a, b) {
  var c = b || document;
  return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b);
};
goog.dom.getElementByClass = function(a, b) {
  var c = b || document, d = null;
  return (d = c.getElementsByClassName ? c.getElementsByClassName(a)[0] : goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)[0]) || null;
};
goog.dom.getRequiredElementByClass = function(a, b) {
  var c = goog.dom.getElementByClass(a, b);
  return goog.asserts.assert(c, "No element found with className: " + a);
};
goog.dom.canUseQuerySelector_ = function(a) {
  return !(!a.querySelectorAll || !a.querySelector);
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
  a = d || a;
  b = b && "*" != b ? b.toUpperCase() : "";
  if (goog.dom.canUseQuerySelector_(a) && (b || c)) {
    return a.querySelectorAll(b + (c ? "." + c : ""));
  }
  if (c && a.getElementsByClassName) {
    a = a.getElementsByClassName(c);
    if (b) {
      d = {};
      for (var e = 0, f = 0, g;g = a[f];f++) {
        b == g.nodeName && (d[e++] = g);
      }
      d.length = e;
      return d;
    }
    return a;
  }
  a = a.getElementsByTagName(b || "*");
  if (c) {
    d = {};
    for (f = e = 0;g = a[f];f++) {
      b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
    }
    d.length = e;
    return d;
  }
  return a;
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
  goog.object.forEach(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b;
  });
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", nonce:"nonce", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function(a) {
  return goog.dom.getViewportSize_(a || window);
};
goog.dom.getViewportSize_ = function(a) {
  a = a.document;
  a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
  return new goog.math.Size(a.clientWidth, a.clientHeight);
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window);
};
goog.dom.getDocumentHeightForWindow = function(a) {
  return goog.dom.getDocumentHeight_(a);
};
goog.dom.getDocumentHeight_ = function(a) {
  var b = a.document, c = 0;
  if (b) {
    var c = b.body, d = b.documentElement;
    if (!d || !c) {
      return 0;
    }
    a = goog.dom.getViewportSize_(a).height;
    if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) {
      c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
    } else {
      var b = d.scrollHeight, e = d.offsetHeight;
      d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
      c = b > a ? b > e ? b : e : b < e ? b : e;
    }
  }
  return c;
};
goog.dom.getPageScroll = function(a) {
  return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll();
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document);
};
goog.dom.getDocumentScroll_ = function(a) {
  var b = goog.dom.getDocumentScrollElement_(a);
  a = goog.dom.getWindow_(a);
  return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft, b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document);
};
goog.dom.getDocumentScrollElement_ = function(a) {
  return a.scrollingElement ? a.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement;
};
goog.dom.getWindow = function(a) {
  return a ? goog.dom.getWindow_(a) : window;
};
goog.dom.getWindow_ = function(a) {
  return a.parentWindow || a.defaultView;
};
goog.dom.createDom = function(a, b, c) {
  return goog.dom.createDom_(document, arguments);
};
goog.dom.createUntypedDom = function(a, b, c) {
  return goog.dom.createDom_(document, arguments);
};
goog.dom.createDom_ = function(a, b) {
  var c = String(b[0]), d = b[1];
  if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
    if (d.type) {
      c.push(' type="', goog.string.htmlEscape(d.type), '"');
      var e = {};
      goog.object.extend(e, d);
      delete e.type;
      d = e;
    }
    c.push(">");
    c = c.join("");
  }
  c = a.createElement(c);
  d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
  2 < b.length && goog.dom.append_(a, c, b, 2);
  return c;
};
goog.dom.append_ = function(a, b, c, d) {
  function e(c) {
    c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c);
  }
  for (;d < c.length;d++) {
    var f = c[d];
    goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f);
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
  return document.createElement(String(a));
};
goog.dom.createTextNode = function(a) {
  return document.createTextNode(String(a));
};
goog.dom.createTable = function(a, b, c) {
  return goog.dom.createTable_(document, a, b, !!c);
};
goog.dom.createTable_ = function(a, b, c, d) {
  for (var e = a.createElement(goog.dom.TagName.TABLE), f = e.appendChild(a.createElement(goog.dom.TagName.TBODY)), g = 0;g < b;g++) {
    for (var h = a.createElement(goog.dom.TagName.TR), k = 0;k < c;k++) {
      var l = a.createElement(goog.dom.TagName.TD);
      d && goog.dom.setTextContent(l, goog.string.Unicode.NBSP);
      h.appendChild(l);
    }
    f.appendChild(h);
  }
  return e;
};
goog.dom.constHtmlToNode = function(a) {
  var b = goog.array.map(arguments, goog.string.Const.unwrap), b = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."), b.join(""));
  return goog.dom.safeHtmlToNode(b);
};
goog.dom.safeHtmlToNode = function(a) {
  return goog.dom.safeHtmlToNode_(document, a);
};
goog.dom.safeHtmlToNode_ = function(a, b) {
  var c = a.createElement(goog.dom.TagName.DIV);
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, b)), c.removeChild(c.firstChild)) : goog.dom.safe.setInnerHtml(c, b);
  return goog.dom.childrenToNode_(a, c);
};
goog.dom.childrenToNode_ = function(a, b) {
  if (1 == b.childNodes.length) {
    return b.removeChild(b.firstChild);
  }
  for (var c = a.createDocumentFragment();b.firstChild;) {
    c.appendChild(b.firstChild);
  }
  return c;
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document);
};
goog.dom.isCss1CompatMode_ = function(a) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode;
};
goog.dom.canHaveChildren = function(a) {
  if (a.nodeType != goog.dom.NodeType.ELEMENT) {
    return !1;
  }
  switch(a.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.COMMAND:
    ;
    case goog.dom.TagName.EMBED:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.KEYGEN:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.SOURCE:
    ;
    case goog.dom.TagName.STYLE:
    ;
    case goog.dom.TagName.TRACK:
    ;
    case goog.dom.TagName.WBR:
      return !1;
  }
  return !0;
};
goog.dom.appendChild = function(a, b) {
  a.appendChild(b);
};
goog.dom.append = function(a, b) {
  goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1);
};
goog.dom.removeChildren = function(a) {
  for (var b;b = a.firstChild;) {
    a.removeChild(b);
  }
};
goog.dom.insertSiblingBefore = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b);
};
goog.dom.insertSiblingAfter = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b.nextSibling);
};
goog.dom.insertChildAt = function(a, b, c) {
  a.insertBefore(b, a.childNodes[c] || null);
};
goog.dom.removeNode = function(a) {
  return a && a.parentNode ? a.parentNode.removeChild(a) : null;
};
goog.dom.replaceNode = function(a, b) {
  var c = b.parentNode;
  c && c.replaceChild(a, b);
};
goog.dom.flattenElement = function(a) {
  var b, c = a.parentNode;
  if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if (a.removeNode) {
      return a.removeNode(!1);
    }
    for (;b = a.firstChild;) {
      c.insertBefore(b, a);
    }
    return goog.dom.removeNode(a);
  }
};
goog.dom.getChildren = function(a) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
    return a.nodeType == goog.dom.NodeType.ELEMENT;
  });
};
goog.dom.getFirstElementChild = function(a) {
  return goog.isDef(a.firstElementChild) ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0);
};
goog.dom.getLastElementChild = function(a) {
  return goog.isDef(a.lastElementChild) ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1);
};
goog.dom.getNextElementSibling = function(a) {
  return goog.isDef(a.nextElementSibling) ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0);
};
goog.dom.getPreviousElementSibling = function(a) {
  return goog.isDef(a.previousElementSibling) ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1);
};
goog.dom.getNextElementNode_ = function(a, b) {
  for (;a && a.nodeType != goog.dom.NodeType.ELEMENT;) {
    a = b ? a.nextSibling : a.previousSibling;
  }
  return a;
};
goog.dom.getNextNode = function(a) {
  if (!a) {
    return null;
  }
  if (a.firstChild) {
    return a.firstChild;
  }
  for (;a && !a.nextSibling;) {
    a = a.parentNode;
  }
  return a ? a.nextSibling : null;
};
goog.dom.getPreviousNode = function(a) {
  if (!a) {
    return null;
  }
  if (!a.previousSibling) {
    return a.parentNode;
  }
  for (a = a.previousSibling;a && a.lastChild;) {
    a = a.lastChild;
  }
  return a;
};
goog.dom.isNodeLike = function(a) {
  return goog.isObject(a) && 0 < a.nodeType;
};
goog.dom.isElement = function(a) {
  return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT;
};
goog.dom.isWindow = function(a) {
  return goog.isObject(a) && a.window == a;
};
goog.dom.getParentElement = function(a) {
  var b;
  if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement)) {
    return b;
  }
  b = a.parentNode;
  return goog.dom.isElement(b) ? b : null;
};
goog.dom.contains = function(a, b) {
  if (!a || !b) {
    return !1;
  }
  if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) {
    return a == b || a.contains(b);
  }
  if ("undefined" != typeof a.compareDocumentPosition) {
    return a == b || !!(a.compareDocumentPosition(b) & 16);
  }
  for (;b && a != b;) {
    b = b.parentNode;
  }
  return b == a;
};
goog.dom.compareNodeOrder = function(a, b) {
  if (a == b) {
    return 0;
  }
  if (a.compareDocumentPosition) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    if (a.nodeType == goog.dom.NodeType.DOCUMENT) {
      return -1;
    }
    if (b.nodeType == goog.dom.NodeType.DOCUMENT) {
      return 1;
    }
  }
  if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
    var c = a.nodeType == goog.dom.NodeType.ELEMENT, d = b.nodeType == goog.dom.NodeType.ELEMENT;
    if (c && d) {
      return a.sourceIndex - b.sourceIndex;
    }
    var e = a.parentNode, f = b.parentNode;
    return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex);
  }
  d = goog.dom.getOwnerDocument(a);
  c = d.createRange();
  c.selectNode(a);
  c.collapse(!0);
  d = d.createRange();
  d.selectNode(b);
  d.collapse(!0);
  return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d);
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
  var c = a.parentNode;
  if (c == b) {
    return -1;
  }
  for (var d = b;d.parentNode != c;) {
    d = d.parentNode;
  }
  return goog.dom.compareSiblingOrder_(d, a);
};
goog.dom.compareSiblingOrder_ = function(a, b) {
  for (var c = b;c = c.previousSibling;) {
    if (c == a) {
      return -1;
    }
  }
  return 1;
};
goog.dom.findCommonAncestor = function(a) {
  var b, c = arguments.length;
  if (!c) {
    return null;
  }
  if (1 == c) {
    return arguments[0];
  }
  var d = [], e = Infinity;
  for (b = 0;b < c;b++) {
    for (var f = [], g = arguments[b];g;) {
      f.unshift(g), g = g.parentNode;
    }
    d.push(f);
    e = Math.min(e, f.length);
  }
  f = null;
  for (b = 0;b < e;b++) {
    for (var g = d[0][b], h = 1;h < c;h++) {
      if (g != d[h][b]) {
        return f;
      }
    }
    f = g;
  }
  return f;
};
goog.dom.getOwnerDocument = function(a) {
  goog.asserts.assert(a, "Node cannot be null or undefined.");
  return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document;
};
goog.dom.getFrameContentDocument = function(a) {
  return a.contentDocument || a.contentWindow.document;
};
goog.dom.getFrameContentWindow = function(a) {
  try {
    return a.contentWindow || (a.contentDocument ? goog.dom.getWindow(a.contentDocument) : null);
  } catch (b) {
  }
  return null;
};
goog.dom.setTextContent = function(a, b) {
  goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
  if ("textContent" in a) {
    a.textContent = b;
  } else {
    if (a.nodeType == goog.dom.NodeType.TEXT) {
      a.data = b;
    } else {
      if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (;a.lastChild != a.firstChild;) {
          a.removeChild(a.lastChild);
        }
        a.firstChild.data = b;
      } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(String(b)));
      }
    }
  }
};
goog.dom.getOuterHtml = function(a) {
  goog.asserts.assert(null !== a, "goog.dom.getOuterHtml expects a non-null value for element");
  if ("outerHTML" in a) {
    return a.outerHTML;
  }
  var b = goog.dom.getOwnerDocument(a).createElement(goog.dom.TagName.DIV);
  b.appendChild(a.cloneNode(!0));
  return b.innerHTML;
};
goog.dom.findNode = function(a, b) {
  var c = [];
  return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0;
};
goog.dom.findNodes = function(a, b) {
  var c = [];
  goog.dom.findNodes_(a, b, c, !1);
  return c;
};
goog.dom.findNodes_ = function(a, b, c, d) {
  if (null != a) {
    for (a = a.firstChild;a;) {
      if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) {
        return !0;
      }
      a = a.nextSibling;
    }
  }
  return !1;
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function(a) {
  return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a);
};
goog.dom.setFocusableTabIndex = function(a, b) {
  b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"));
};
goog.dom.isFocusable = function(a) {
  var b;
  return (b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b;
};
goog.dom.hasSpecifiedTabIndex_ = function(a) {
  a = a.getAttributeNode("tabindex");
  return goog.isDefAndNotNull(a) && a.specified;
};
goog.dom.isTabIndexFocusable_ = function(a) {
  a = a.tabIndex;
  return goog.isNumber(a) && 0 <= a && 32768 > a;
};
goog.dom.nativelySupportsFocus_ = function(a) {
  return a.tagName == goog.dom.TagName.A || a.tagName == goog.dom.TagName.INPUT || a.tagName == goog.dom.TagName.TEXTAREA || a.tagName == goog.dom.TagName.SELECT || a.tagName == goog.dom.TagName.BUTTON;
};
goog.dom.hasNonZeroBoundingRect_ = function(a) {
  a = !goog.isFunction(a.getBoundingClientRect) || goog.userAgent.IE && null == a.parentElement ? {height:a.offsetHeight, width:a.offsetWidth} : a.getBoundingClientRect();
  return goog.isDefAndNotNull(a) && 0 < a.height && 0 < a.width;
};
goog.dom.getTextContent = function(a) {
  if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && null !== a && "innerText" in a) {
    a = goog.string.canonicalizeNewlines(a.innerText);
  } else {
    var b = [];
    goog.dom.getTextContent_(a, b, !0);
    a = b.join("");
  }
  a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  a = a.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
  " " != a && (a = a.replace(/^\s*/, ""));
  return a;
};
goog.dom.getRawTextContent = function(a) {
  var b = [];
  goog.dom.getTextContent_(a, b, !1);
  return b.join("");
};
goog.dom.getTextContent_ = function(a, b, c) {
  if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if (a.nodeType == goog.dom.NodeType.TEXT) {
      c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
    } else {
      if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
      } else {
        for (a = a.firstChild;a;) {
          goog.dom.getTextContent_(a, b, c), a = a.nextSibling;
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(a) {
  return goog.dom.getTextContent(a).length;
};
goog.dom.getNodeTextOffset = function(a, b) {
  for (var c = b || goog.dom.getOwnerDocument(a).body, d = [];a && a != c;) {
    for (var e = a;e = e.previousSibling;) {
      d.unshift(goog.dom.getTextContent(e));
    }
    a = a.parentNode;
  }
  return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length;
};
goog.dom.getNodeAtOffset = function(a, b, c) {
  a = [a];
  for (var d = 0, e = null;0 < a.length && d < b;) {
    if (e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if (e.nodeType == goog.dom.NodeType.TEXT) {
        var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), d = d + f.length
      } else {
        if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
        } else {
          for (f = e.childNodes.length - 1;0 <= f;f--) {
            a.push(e.childNodes[f]);
          }
        }
      }
    }
  }
  goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
  return e;
};
goog.dom.isNodeList = function(a) {
  if (a && "number" == typeof a.length) {
    if (goog.isObject(a)) {
      return "function" == typeof a.item || "string" == typeof a.item;
    }
    if (goog.isFunction(a)) {
      return "function" == typeof a.item;
    }
  }
  return !1;
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
  if (!b && !c) {
    return null;
  }
  var e = b ? b.toUpperCase() : null;
  return goog.dom.getAncestor(a, function(a) {
    return (!e || a.nodeName == e) && (!c || goog.isString(a.className) && goog.array.contains(a.className.split(/\s+/), c));
  }, !0, d);
};
goog.dom.getAncestorByClass = function(a, b, c) {
  return goog.dom.getAncestorByTagNameAndClass(a, null, b, c);
};
goog.dom.getAncestor = function(a, b, c, d) {
  c || (a = a.parentNode);
  for (c = 0;a && (null == d || c <= d);) {
    goog.asserts.assert("parentNode" != a.name);
    if (b(a)) {
      return a;
    }
    a = a.parentNode;
    c++;
  }
  return null;
};
goog.dom.getActiveElement = function(a) {
  try {
    return a && a.activeElement;
  } catch (b) {
  }
  return null;
};
goog.dom.getPixelRatio = function() {
  var a = goog.dom.getWindow();
  return goog.isDef(a.devicePixelRatio) ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3) || 1 : 1;
};
goog.dom.matchesPixelRatio_ = function(a) {
  return goog.dom.getWindow().matchMedia("(-webkit-min-device-pixel-ratio: " + a + "),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + a + "dppx)").matches ? a : 0;
};
goog.dom.DomHelper = function(a) {
  this.document_ = a || goog.global.document || document;
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
  this.document_ = a;
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_;
};
goog.dom.DomHelper.prototype.getElement = function(a) {
  return goog.dom.getElementHelper_(this.document_, a);
};
goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
  return goog.dom.getRequiredElementHelper_(this.document_, a);
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c);
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
  return goog.dom.getElementsByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
  return goog.dom.getElementByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
  return goog.dom.getRequiredElementByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
  return goog.dom.getViewportSize(a || this.getWindow());
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow());
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
  return goog.dom.createDom_(this.document_, arguments);
};
goog.dom.DomHelper.prototype.createUntypedDom = function(a, b, c) {
  return goog.dom.createDom_(this.document_, arguments);
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
  return this.document_.createElement(String(a));
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
  return this.document_.createTextNode(String(a));
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
  return goog.dom.createTable_(this.document_, a, b, !!c);
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
  return goog.dom.safeHtmlToNode_(this.document_, a);
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_);
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_);
};
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
  return goog.dom.getActiveElement(a || this.document_);
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.events = {};
goog.events.getVendorPrefixedName_ = function(a) {
  return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase();
};
goog.events.EventType = {CLICK:"click", RIGHTCLICK:"rightclick", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", MOUSEENTER:"mouseenter", MOUSELEAVE:"mouseleave", SELECTSTART:"selectstart", WHEEL:"wheel", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? "focusout" : "DOMFocusOut", 
CHANGE:"change", RESET:"reset", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONSOLEMESSAGE:"consolemessage", CONTEXTMENU:"contextmenu", DOMCONTENTLOADED:"DOMContentLoaded", ERROR:"error", HELP:"help", LOAD:"load", 
LOSECAPTURE:"losecapture", ORIENTATIONCHANGE:"orientationchange", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", CANPLAY:"canplay", CANPLAYTHROUGH:"canplaythrough", DURATIONCHANGE:"durationchange", EMPTIED:"emptied", ENDED:"ended", LOADEDDATA:"loadeddata", LOADEDMETADATA:"loadedmetadata", PAUSE:"pause", PLAY:"play", PLAYING:"playing", RATECHANGE:"ratechange", SEEKED:"seeked", SEEKING:"seeking", STALLED:"stalled", SUSPEND:"suspend", TIMEUPDATE:"timeupdate", 
VOLUMECHANGE:"volumechange", WAITING:"waiting", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", ONLINE:"online", OFFLINE:"offline", MESSAGE:"message", CONNECT:"connect", ANIMATIONSTART:goog.events.getVendorPrefixedName_("AnimationStart"), ANIMATIONEND:goog.events.getVendorPrefixedName_("AnimationEnd"), ANIMATIONITERATION:goog.events.getVendorPrefixedName_("AnimationIteration"), 
TRANSITIONEND:goog.events.getVendorPrefixedName_("TransitionEnd"), POINTERDOWN:"pointerdown", POINTERUP:"pointerup", POINTERCANCEL:"pointercancel", POINTERMOVE:"pointermove", POINTEROVER:"pointerover", POINTEROUT:"pointerout", POINTERENTER:"pointerenter", POINTERLEAVE:"pointerleave", GOTPOINTERCAPTURE:"gotpointercapture", LOSTPOINTERCAPTURE:"lostpointercapture", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", MSGESTURETAP:"MSGestureTap", 
MSGOTPOINTERCAPTURE:"MSGotPointerCapture", MSINERTIASTART:"MSInertiaStart", MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERENTER:"MSPointerEnter", MSPOINTERHOVER:"MSPointerHover", MSPOINTERLEAVE:"MSPointerLeave", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROUT:"MSPointerOut", MSPOINTEROVER:"MSPointerOver", MSPOINTERUP:"MSPointerUp", TEXT:"text", TEXTINPUT:"textInput", COMPOSITIONSTART:"compositionstart", COMPOSITIONUPDATE:"compositionupdate", 
COMPOSITIONEND:"compositionend", EXIT:"exit", LOADABORT:"loadabort", LOADCOMMIT:"loadcommit", LOADREDIRECT:"loadredirect", LOADSTART:"loadstart", LOADSTOP:"loadstop", RESPONSIVE:"responsive", SIZECHANGED:"sizechanged", UNRESPONSIVE:"unresponsive", VISIBILITYCHANGE:"visibilitychange", STORAGE:"storage", DOMSUBTREEMODIFIED:"DOMSubtreeModified", DOMNODEINSERTED:"DOMNodeInserted", DOMNODEREMOVED:"DOMNodeRemoved", DOMNODEREMOVEDFROMDOCUMENT:"DOMNodeRemovedFromDocument", DOMNODEINSERTEDINTODOCUMENT:"DOMNodeInsertedIntoDocument", 
DOMATTRMODIFIED:"DOMAttrModified", DOMCHARACTERDATAMODIFIED:"DOMCharacterDataModified", BEFOREPRINT:"beforeprint", AFTERPRINT:"afterprint"};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
  var h = "";
  a && (h += a + ":");
  c && (h += "//", b && (h += b + "@"), h += c, d && (h += ":" + d));
  e && (h += e);
  f && (h += "?" + f);
  g && (h += "#" + g);
  return h;
};
goog.uri.utils.splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(a) {
  return a.match(goog.uri.utils.splitRe_);
};
goog.uri.utils.decodeIfPossible_ = function(a, b) {
  return a ? b ? decodeURI(a) : decodeURIComponent(a) : a;
};
goog.uri.utils.getComponentByIndex_ = function(a, b) {
  return goog.uri.utils.split(b)[a] || null;
};
goog.uri.utils.getScheme = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a);
};
goog.uri.utils.getEffectiveScheme = function(a) {
  a = goog.uri.utils.getScheme(a);
  !a && goog.global.self && goog.global.self.location && (a = goog.global.self.location.protocol, a = a.substr(0, a.length - 1));
  return a ? a.toLowerCase() : "";
};
goog.uri.utils.getUserInfoEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a);
};
goog.uri.utils.getUserInfo = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a));
};
goog.uri.utils.getDomainEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a);
};
goog.uri.utils.getDomain = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a), !0);
};
goog.uri.utils.getPort = function(a) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null;
};
goog.uri.utils.getPathEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a);
};
goog.uri.utils.getPath = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a), !0);
};
goog.uri.utils.getQueryData = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a);
};
goog.uri.utils.getFragmentEncoded = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? null : a.substr(b + 1);
};
goog.uri.utils.setFragmentEncoded = function(a, b) {
  return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "");
};
goog.uri.utils.getFragment = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a));
};
goog.uri.utils.getHost = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getPathAndAfter = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.removeFragment = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? a : a.substr(0, b);
};
goog.uri.utils.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT];
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
  if (goog.DEBUG && (0 <= a.indexOf("#") || 0 <= a.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
  }
};
goog.uri.utils.parseQueryData = function(a, b) {
  if (a) {
    for (var c = a.split("&"), d = 0;d < c.length;d++) {
      var e = c[d].indexOf("="), f = null, g = null;
      0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
      b(f, g ? goog.string.urlDecode(g) : "");
    }
  }
};
goog.uri.utils.appendQueryData_ = function(a) {
  if (a[1]) {
    var b = a[0], c = b.indexOf("#");
    0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
    c = b.indexOf("?");
    0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0);
  }
  return a.join("");
};
goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
  if (goog.isArray(b)) {
    goog.asserts.assertArray(b);
    for (var d = 0;d < b.length;d++) {
      goog.uri.utils.appendKeyValuePairs_(a, String(b[d]), c);
    }
  } else {
    null != b && c.push("&", a, "" === b ? "" : "=", goog.string.urlEncode(b));
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
  goog.asserts.assert(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for (c = c || 0;c < b.length;c += 2) {
    goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a);
  }
  return a;
};
goog.uri.utils.buildQueryData = function(a, b) {
  var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
  c[0] = "";
  return c.join("");
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
  for (var c in b) {
    goog.uri.utils.appendKeyValuePairs_(c, b[c], a);
  }
  return a;
};
goog.uri.utils.buildQueryDataFromMap = function(a) {
  a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
  a[0] = "";
  return a.join("");
};
goog.uri.utils.appendParams = function(a, b) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1));
};
goog.uri.utils.appendParamsFromMap = function(a, b) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b));
};
goog.uri.utils.appendParam = function(a, b, c) {
  a = [a, "&", b];
  goog.isDefAndNotNull(c) && a.push("=", goog.string.urlEncode(c));
  return goog.uri.utils.appendQueryData_(a);
};
goog.uri.utils.findParam_ = function(a, b, c, d) {
  for (var e = c.length;0 <= (b = a.indexOf(c, b)) && b < d;) {
    var f = a.charCodeAt(b - 1);
    if (f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION) {
      if (f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) {
        return b;
      }
    }
    b += e + 1;
  }
  return -1;
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(a, b) {
  return 0 <= goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_));
};
goog.uri.utils.getParamValue = function(a, b) {
  var c = a.search(goog.uri.utils.hashOrEndRe_), d = goog.uri.utils.findParam_(a, 0, b, c);
  if (0 > d) {
    return null;
  }
  var e = a.indexOf("&", d);
  if (0 > e || e > c) {
    e = c;
  }
  d += b.length + 1;
  return goog.string.urlDecode(a.substr(d, e - d));
};
goog.uri.utils.getParamValues = function(a, b) {
  for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    d = a.indexOf("&", e);
    if (0 > d || d > c) {
      d = c;
    }
    e += b.length + 1;
    f.push(goog.string.urlDecode(a.substr(e, d - e)));
  }
  return f;
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(a, b) {
  for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = [];0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c);
  }
  f.push(a.substr(d));
  return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1");
};
goog.uri.utils.setParam = function(a, b, c) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c);
};
goog.uri.utils.appendPath = function(a, b) {
  goog.uri.utils.assertNoFragmentsOrQueries_(a);
  goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
  goog.string.startsWith(b, "/") && (b = b.substr(1));
  return goog.string.buildString(a, "/", b);
};
goog.uri.utils.setPath = function(a, b) {
  goog.string.startsWith(b, "/") || (b = "/" + b);
  var c = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(c[goog.uri.utils.ComponentIndex.SCHEME], c[goog.uri.utils.ComponentIndex.USER_INFO], c[goog.uri.utils.ComponentIndex.DOMAIN], c[goog.uri.utils.ComponentIndex.PORT], b, c[goog.uri.utils.ComponentIndex.QUERY_DATA], c[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(a) {
  return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString());
};
goog.math.Box = function(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d;
};
goog.math.Box.boundingBox = function(a) {
  for (var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1;c < arguments.length;c++) {
    b.expandToIncludeCoordinate(arguments[c]);
  }
  return b;
};
goog.math.Box.prototype.getWidth = function() {
  return this.right - this.left;
};
goog.math.Box.prototype.getHeight = function() {
  return this.bottom - this.top;
};
goog.math.Box.prototype.clone = function() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left);
};
goog.DEBUG && (goog.math.Box.prototype.toString = function() {
  return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
});
goog.math.Box.prototype.contains = function(a) {
  return goog.math.Box.contains(this, a);
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
  goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
  return this;
};
goog.math.Box.prototype.expandToInclude = function(a) {
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.right = Math.max(this.right, a.right);
  this.bottom = Math.max(this.bottom, a.bottom);
};
goog.math.Box.prototype.expandToIncludeCoordinate = function(a) {
  this.top = Math.min(this.top, a.y);
  this.right = Math.max(this.right, a.x);
  this.bottom = Math.max(this.bottom, a.y);
  this.left = Math.min(this.left, a.x);
};
goog.math.Box.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1;
};
goog.math.Box.contains = function(a, b) {
  return a && b ? b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1;
};
goog.math.Box.relativePositionX = function(a, b) {
  return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0;
};
goog.math.Box.relativePositionY = function(a, b) {
  return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0;
};
goog.math.Box.distance = function(a, b) {
  var c = goog.math.Box.relativePositionX(a, b), d = goog.math.Box.relativePositionY(a, b);
  return Math.sqrt(c * c + d * d);
};
goog.math.Box.intersects = function(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
  return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c;
};
goog.math.Box.prototype.ceil = function() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this;
};
goog.math.Box.prototype.floor = function() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this;
};
goog.math.Box.prototype.round = function() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this;
};
goog.math.Box.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (goog.asserts.assertNumber(a), this.left += a, this.right += a, goog.isNumber(b) && (this.top += b, this.bottom += b));
  return this;
};
goog.math.Box.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.left *= a;
  this.right *= a;
  this.top *= c;
  this.bottom *= c;
  return this;
};
goog.color = {};
goog.color.names = {aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", 
darkgray:"#a9a9a9", darkgreen:"#006400", darkgrey:"#a9a9a9", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", 
forestgreen:"#228b22", fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", green:"#008000", greenyellow:"#adff2f", grey:"#808080", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", 
lightgreen:"#90ee90", lightgrey:"#d3d3d3", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370db", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", 
mediumturquoise:"#48d1cc", mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#db7093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", 
purple:"#800080", red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", 
yellow:"#ffff00", yellowgreen:"#9acd32"};
goog.color.parse = function(a) {
  var b = {};
  a = String(a);
  var c = goog.color.prependHashIfNecessaryHelper(a);
  if (goog.color.isValidHexColor_(c)) {
    return b.hex = goog.color.normalizeHex(c), b.type = "hex", b;
  }
  c = goog.color.isValidRgbColor_(a);
  if (c.length) {
    return b.hex = goog.color.rgbArrayToHex(c), b.type = "rgb", b;
  }
  if (goog.color.names && (c = goog.color.names[a.toLowerCase()])) {
    return b.hex = c, b.type = "named", b;
  }
  throw Error(a + " is not a valid color string");
};
goog.color.isValidColor = function(a) {
  var b = goog.color.prependHashIfNecessaryHelper(a);
  return !!(goog.color.isValidHexColor_(b) || goog.color.isValidRgbColor_(a).length || goog.color.names && goog.color.names[a.toLowerCase()]);
};
goog.color.parseRgb = function(a) {
  var b = goog.color.isValidRgbColor_(a);
  if (!b.length) {
    throw Error(a + " is not a valid RGB color");
  }
  return b;
};
goog.color.hexToRgbStyle = function(a) {
  return goog.color.rgbStyle_(goog.color.hexToRgb(a));
};
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function(a) {
  if (!goog.color.isValidHexColor_(a)) {
    throw Error("'" + a + "' is not a valid hex color");
  }
  4 == a.length && (a = a.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
  return a.toLowerCase();
};
goog.color.hexToRgb = function(a) {
  a = goog.color.normalizeHex(a);
  var b = parseInt(a.substr(1, 2), 16), c = parseInt(a.substr(3, 2), 16);
  a = parseInt(a.substr(5, 2), 16);
  return [b, c, a];
};
goog.color.rgbToHex = function(a, b, c) {
  a = Number(a);
  b = Number(b);
  c = Number(c);
  if (a != (a & 255) || b != (b & 255) || c != (c & 255)) {
    throw Error('"(' + a + "," + b + "," + c + '") is not a valid RGB color');
  }
  a = goog.color.prependZeroIfNecessaryHelper(a.toString(16));
  b = goog.color.prependZeroIfNecessaryHelper(b.toString(16));
  c = goog.color.prependZeroIfNecessaryHelper(c.toString(16));
  return "#" + a + b + c;
};
goog.color.rgbArrayToHex = function(a) {
  return goog.color.rgbToHex(a[0], a[1], a[2]);
};
goog.color.rgbToHsl = function(a, b, c) {
  a /= 255;
  b /= 255;
  c /= 255;
  var d = Math.max(a, b, c), e = Math.min(a, b, c), f = 0, g = 0, h = .5 * (d + e);
  d != e && (d == a ? f = 60 * (b - c) / (d - e) : d == b ? f = 60 * (c - a) / (d - e) + 120 : d == c && (f = 60 * (a - b) / (d - e) + 240), g = 0 < h && .5 >= h ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
  return [Math.round(f + 360) % 360, g, h];
};
goog.color.rgbArrayToHsl = function(a) {
  return goog.color.rgbToHsl(a[0], a[1], a[2]);
};
goog.color.hueToRgb_ = function(a, b, c) {
  0 > c ? c += 1 : 1 < c && --c;
  return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a;
};
goog.color.hslToRgb = function(a, b, c) {
  var d = 0, e = 0, f = 0;
  a /= 360;
  if (0 == b) {
    d = e = f = 255 * c;
  } else {
    var g = f = 0, g = .5 > c ? c * (1 + b) : c + b - b * c, f = 2 * c - g, d = 255 * goog.color.hueToRgb_(f, g, a + 1 / 3), e = 255 * goog.color.hueToRgb_(f, g, a), f = 255 * goog.color.hueToRgb_(f, g, a - 1 / 3)
  }
  return [Math.round(d), Math.round(e), Math.round(f)];
};
goog.color.hslArrayToRgb = function(a) {
  return goog.color.hslToRgb(a[0], a[1], a[2]);
};
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function(a) {
  return goog.color.validHexColorRe_.test(a);
};
goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
goog.color.isNormalizedHexColor_ = function(a) {
  return goog.color.normalizedHexColorRe_.test(a);
};
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function(a) {
  var b = a.match(goog.color.rgbColorRe_);
  if (b) {
    a = Number(b[1]);
    var c = Number(b[2]), b = Number(b[3]);
    if (0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= b && 255 >= b) {
      return [a, c, b];
    }
  }
  return [];
};
goog.color.prependZeroIfNecessaryHelper = function(a) {
  return 1 == a.length ? "0" + a : a;
};
goog.color.prependHashIfNecessaryHelper = function(a) {
  return "#" == a.charAt(0) ? a : "#" + a;
};
goog.color.rgbStyle_ = function(a) {
  return "rgb(" + a.join(",") + ")";
};
goog.color.hsvToRgb = function(a, b, c) {
  var d = 0, e = 0, f = 0;
  if (0 == b) {
    f = e = d = c;
  } else {
    var g = Math.floor(a / 60), h = a / 60 - g;
    a = c * (1 - b);
    var k = c * (1 - b * h);
    b = c * (1 - b * (1 - h));
    switch(g) {
      case 1:
        d = k;
        e = c;
        f = a;
        break;
      case 2:
        d = a;
        e = c;
        f = b;
        break;
      case 3:
        d = a;
        e = k;
        f = c;
        break;
      case 4:
        d = b;
        e = a;
        f = c;
        break;
      case 5:
        d = c;
        e = a;
        f = k;
        break;
      case 6:
      ;
      case 0:
        d = c, e = b, f = a;
    }
  }
  return [Math.floor(d), Math.floor(e), Math.floor(f)];
};
goog.color.rgbToHsv = function(a, b, c) {
  var d = Math.max(Math.max(a, b), c), e = Math.min(Math.min(a, b), c);
  if (e == d) {
    e = a = 0;
  } else {
    var f = d - e, e = f / d;
    a = 60 * (a == d ? (b - c) / f : b == d ? 2 + (c - a) / f : 4 + (a - b) / f);
    0 > a && (a += 360);
    360 < a && (a -= 360);
  }
  return [a, e, d];
};
goog.color.rgbArrayToHsv = function(a) {
  return goog.color.rgbToHsv(a[0], a[1], a[2]);
};
goog.color.hsvArrayToRgb = function(a) {
  return goog.color.hsvToRgb(a[0], a[1], a[2]);
};
goog.color.hexToHsl = function(a) {
  a = goog.color.hexToRgb(a);
  return goog.color.rgbToHsl(a[0], a[1], a[2]);
};
goog.color.hslToHex = function(a, b, c) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb(a, b, c));
};
goog.color.hslArrayToHex = function(a) {
  return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0], a[1], a[2]));
};
goog.color.hexToHsv = function(a) {
  return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a));
};
goog.color.hsvToHex = function(a, b, c) {
  return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a, b, c));
};
goog.color.hsvArrayToHex = function(a) {
  return goog.color.hsvToHex(a[0], a[1], a[2]);
};
goog.color.hslDistance = function(a, b) {
  var c, d;
  c = .5 >= a[2] ? a[1] * a[2] : a[1] * (1 - a[2]);
  d = .5 >= b[2] ? b[1] * b[2] : b[1] * (1 - b[2]);
  return (a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d * Math.cos(2 * (a[0] / 360 - b[0] / 360) * Math.PI);
};
goog.color.blend = function(a, b, c) {
  c = goog.math.clamp(c, 0, 1);
  return [Math.round(c * a[0] + (1 - c) * b[0]), Math.round(c * a[1] + (1 - c) * b[1]), Math.round(c * a[2] + (1 - c) * b[2])];
};
goog.color.darken = function(a, b) {
  return goog.color.blend([0, 0, 0], a, b);
};
goog.color.lighten = function(a, b) {
  return goog.color.blend([255, 255, 255], a, b);
};
goog.color.highContrast = function(a, b) {
  for (var c = [], d = 0;d < b.length;d++) {
    c.push({color:b[d], diff:goog.color.yiqBrightnessDiff_(b[d], a) + goog.color.colorDiff_(b[d], a)});
  }
  c.sort(function(a, b) {
    return b.diff - a.diff;
  });
  return c[0].color;
};
goog.color.yiqBrightness_ = function(a) {
  return Math.round((299 * a[0] + 587 * a[1] + 114 * a[2]) / 1E3);
};
goog.color.yiqBrightnessDiff_ = function(a, b) {
  return Math.abs(goog.color.yiqBrightness_(a) - goog.color.yiqBrightness_(b));
};
goog.color.colorDiff_ = function(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
};
var mob = {util:{}};
mob.util.window_ = "undefined" != typeof extension && extension.hasOwnProperty("target") ? extension.target : window;
mob.util.getWindow = function() {
  return mob.util.window_;
};
mob.util.ElementId = {CLICK_DETECTOR_DIV:"psmob-click-detector-div", DIALER_BUTTON:"psmob-dialer-button", HEADER_BAR:"psmob-header-bar", HELP_PANEL:"psmob-help-panel", IFRAME:"psmob-iframe", IFRAME_CONTAINER:"psmob-iframe-container", MAP_BUTTON:"psmob-map-button", MENU_BUTTON:"psmob-menu-button", SPACER:"psmob-spacer"};
mob.util.ElementClass = {BUTTON:"psmob-button", BUTTON_ICON:"psmob-button-icon", BUTTON_TEXT:"psmob-button-text", HIDE:"psmob-hide", IOS_WEBVIEW:"ios-webview", LEARN_MORE:"learn-more", LEARN_MORE_LINK:"learn-more-link", LEARN_MORE_TEXT:"learn-more-text", NOSCROLL:"psmob-noscroll", OPEN:"psmob-open"};
mob.util.ASCII_0_ = 48;
mob.util.ASCII_9_ = 57;
mob.util.Rect = function() {
  this.height = this.width = this.bottom = this.right = this.left = this.top = 0;
};
mob.util.Dimensions = function(a, b) {
  this.width = a;
  this.height = b;
};
mob.util.isDigit = function(a, b) {
  if (a.length <= b) {
    return !1;
  }
  var c = a.charCodeAt(b);
  return c >= mob.util.ASCII_0_ && c <= mob.util.ASCII_9_;
};
mob.util.pixelValue = function(a) {
  var b = null;
  if (a && "string" == typeof a) {
    var c = a.indexOf("px");
    -1 != c && (a = a.substring(0, c));
    mob.util.isDigit(a, a.length - 1) && (b = parseInt(a, 10), isNaN(b) && (b = null));
  }
  return b;
};
mob.util.addStyles = function(a, b) {
  if (b && 0 != b.length) {
    var c = a.getAttribute("style") || "";
    0 < c.length && ";" != c[c.length - 1] && (c += ";");
    a.setAttribute("style", c + b);
  }
};
mob.util.boundingRect = function(a) {
  a = a.getBoundingClientRect();
  var b = mob.util.getWindow(), c = b.document.body, d = b.document.documentElement || c.parentNode || c, c = "pageXOffset" in b ? b.pageXOffset : d.scrollLeft, b = "pageYOffset" in b ? b.pageYOffset : d.scrollTop;
  return new goog.math.Box(a.top + b, a.right + c, a.bottom + b, a.left + c);
};
mob.util.findBackgroundImage = function(a) {
  var b = null, b = a.nodeName.toUpperCase();
  return b != goog.dom.TagName.SCRIPT && b != goog.dom.TagName.STYLE && a.style && (a = mob.util.getWindow().getComputedStyle(a)) && (b = a.getPropertyValue("background-image"), "none" == b && (b = null), b && 5 < b.length && 0 == b.indexOf("url(") && ")" == b[b.length - 1]) ? b = b.substring(4, b.length - 1) : null;
};
mob.util.inFriendlyIframe = function() {
  var a = mob.util.getWindow();
  if (null != a.parent && a != a.parent) {
    try {
      if (a.parent.document.domain == a.document.domain) {
        return !0;
      }
    } catch (b) {
    }
  }
  return !1;
};
mob.util.countNodes = function(a) {
  if (!a) {
    return 0;
  }
  var b = 1;
  for (a = a.firstChild;a;a = a.nextSibling) {
    b += mob.util.countNodes(a);
  }
  return b;
};
mob.util.ImageSource = {IMG:"IMG", SVG:"SVG", BACKGROUND:"background-image"};
mob.util.ThemeData = function(a, b, c) {
  this.logoUrl = a;
  this.menuFrontColor = b;
  this.menuBackColor = c;
};
mob.util.textBetweenBrackets = function(a) {
  var b = a.indexOf("("), c = a.lastIndexOf(")");
  return 0 <= b && c > b ? a.substring(b + 1, c) : null;
};
mob.util.colorStringToNumbers = function(a) {
  var b = mob.util.textBetweenBrackets(a);
  if (!b) {
    return "transparent" == a ? [0, 0, 0, 0] : null;
  }
  b = b.split(",");
  a = [];
  for (var c = 0, d = b.length;c < d;++c) {
    if (a[c] = 3 != c ? parseInt(b[c], 10) : parseFloat(b[c]), isNaN(a[c])) {
      return null;
    }
  }
  return 3 == a.length || 4 == a.length ? a : null;
};
mob.util.colorNumbersToString = function(a) {
  for (var b = 0, c = a.length;b < c;++b) {
    var d = Math.round(a[b]);
    0 > d ? d = 0 : 255 < d && (d = 255);
    a[b] = d;
  }
  return goog.color.rgbArrayToHex(a);
};
mob.util.stripNonAlphaNumeric = function(a) {
  a = a.toLowerCase();
  for (var b = "", c = 0, d = a.length;c < d;++c) {
    var e = a.charAt(c);
    if ("a" <= e && "z" >= e || "0" <= e && "9" >= e) {
      b += e;
    }
  }
  return b;
};
mob.util.findPattern = function(a, b) {
  a = mob.util.stripNonAlphaNumeric(a);
  b = mob.util.stripNonAlphaNumeric(b);
  return 0 <= a.indexOf(b) ? 1 : 0;
};
mob.util.getSiteOrganization = function() {
  var a = mob.util.getWindow().document.domain.toLowerCase().split("."), b = a.length;
  return 4 < b && 2 == a[b - 3].length ? a[b - 5] : 3 < b ? a[b - 4] : null;
};
mob.util.resourceFileName = function(a) {
  if (!a || 0 <= a.indexOf("data:image/")) {
    return "";
  }
  var b = a.lastIndexOf("/");
  0 > b ? b = 0 : ++b;
  var c = a.indexOf(".", b);
  0 > c && (c = a.length);
  return a.substring(b, c);
};
mob.util.proxyImageUrl = function(a, b) {
  var c = goog.uri.utils.getHost(b || mob.util.getWindow().document.location.href), d = goog.uri.utils.getDomain(c), e = goog.uri.utils.getDomain(a);
  if (null == d || null == e) {
    return a;
  }
  var f = !1;
  if (d == e) {
    return a;
  }
  if (0 <= d.indexOf(e)) {
    var d = d.split("."), g = d.length;
    3 <= g && (e == d.slice(0, g - 2).join(".") || "www" == d[0] && (e == d.slice(1, g - 2).join(".") || e == d.slice(1, g).join("."))) && (f = !0);
  }
  return f ? (e = a.indexOf(e) + e.length, c + a.substring(e)) : a;
};
mob.util.extractImage = function(a, b) {
  var c = null;
  switch(b) {
    case mob.util.ImageSource.IMG:
      a.nodeName == b && (c = a.src);
      break;
    case mob.util.ImageSource.SVG:
      if (a.nodeName == b) {
        var d = (new XMLSerializer).serializeToString(a), c = self.URL || self.webkitURL || self, d = new Blob([d], {type:"image/svg+xml;charset=utf-8"}), c = c.createObjectURL(d)
      }
      break;
    case mob.util.ImageSource.BACKGROUND:
      c = mob.util.findBackgroundImage(a);
  }
  return c ? c : null;
};
mob.util.synthesizeImage = function(a, b) {
  goog.asserts.assert(16 < a.length);
  var c = mob.util.getWindow().atob(a), c = c.substring(0, 13) + String.fromCharCode(b[0], b[1], b[2]) + c.substring(16, c.length);
  return "data:image/gif;base64," + mob.util.getWindow().btoa(c);
};
mob.util.isCrossOrigin = function(a) {
  var b = mob.util.getWindow().document.location.origin + "/";
  return !goog.string.startsWith(a, b) && !goog.string.startsWith(a, "data:image/");
};
mob.util.boundingRectAndSize = function(a) {
  a = mob.util.boundingRect(a);
  var b = new mob.util.Rect;
  b.top = a.top;
  b.bottom = a.bottom;
  b.left = a.left;
  b.right = a.right;
  b.height = a.bottom - a.top;
  b.width = a.right - a.left;
  return b;
};
mob.util.consoleLog = function(a) {
  mob.util.getWindow().psDebugMode && console && console.log && console.log(a);
};
mob.util.BeaconEvents = {CALL_CONVERSION_RESPONSE:"call-conversion-response", CALL_FALLBACK_NUMBER:"call-fallback-number", CALL_GV_NUMBER:"call-gv-number", INITIAL_EVENT:"initial-event", LOAD_EVENT:"load-event", MAP_BUTTON:"psmob-map-button", MENU_BUTTON_CLOSE:"psmob-menu-button-close", MENU_BUTTON_OPEN:"psmob-menu-button-open", SUBMENU_CLOSE:"psmob-submenu-close", SUBMENU_OPEN:"psmob-submenu-open", MENU_NAV_CLICK:"psmob-menu-nav-click", NAV_DONE:"nav-done", PHONE_BUTTON:"psmob-phone-dialer"};
mob.util.sendBeaconEvent = function(a, b, c) {
  var d = mob.util.getWindow();
  !d.psMobBeaconUrl && b ? b() : (a = d.psMobBeaconUrl + "?id=psmob&url=" + encodeURIComponent(d.document.URL) + "&el=" + a, d.psMobBeaconCategory && (a += "&category=" + d.psMobBeaconCategory), c && (a += c), c = d.document.createElement(String(goog.dom.TagName.IMG)), c.src = a, b && (b = mob.util.runCallbackOnce_(b), c.addEventListener(goog.events.EventType.LOAD, b), c.addEventListener(goog.events.EventType.ERROR, b), d.setTimeout(b, 500)));
};
mob.util.runCallbackOnce_ = function(a) {
  var b = !1;
  return function() {
    b || (b = !0, a());
  };
};
mob.util.getZoomLevel = function() {
  var a = mob.util.getWindow(), b = 1;
  "desktop" != a.psDeviceType && (b = 90 == Math.abs(a.orientation) && screen.height > screen.width ? a.innerHeight / screen.width * b : a.innerWidth / screen.width * b);
  goog.labs.userAgent.browser.isAndroidBrowser() && (b *= goog.dom.getPixelRatio());
  return b;
};
goog.dom.classlist = {};
goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = !1;
goog.dom.classlist.get = function(a) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) {
    return a.classList;
  }
  a = a.className;
  return goog.isString(a) && a.match(/\S+/g) || [];
};
goog.dom.classlist.set = function(a, b) {
  a.className = b;
};
goog.dom.classlist.contains = function(a, b) {
  return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.contains(b) : goog.array.contains(goog.dom.classlist.get(a), b);
};
goog.dom.classlist.add = function(a, b) {
  goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.add(b) : goog.dom.classlist.contains(a, b) || (a.className += 0 < a.className.length ? " " + b : b);
};
goog.dom.classlist.addAll = function(a, b) {
  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) {
    goog.array.forEach(b, function(b) {
      goog.dom.classlist.add(a, b);
    });
  } else {
    var c = {};
    goog.array.forEach(goog.dom.classlist.get(a), function(a) {
      c[a] = !0;
    });
    goog.array.forEach(b, function(a) {
      c[a] = !0;
    });
    a.className = "";
    for (var d in c) {
      a.className += 0 < a.className.length ? " " + d : d;
    }
  }
};
goog.dom.classlist.remove = function(a, b) {
  goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.remove(b) : goog.dom.classlist.contains(a, b) && (a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
    return a != b;
  }).join(" "));
};
goog.dom.classlist.removeAll = function(a, b) {
  goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? goog.array.forEach(b, function(b) {
    goog.dom.classlist.remove(a, b);
  }) : a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
    return !goog.array.contains(b, a);
  }).join(" ");
};
goog.dom.classlist.enable = function(a, b, c) {
  c ? goog.dom.classlist.add(a, b) : goog.dom.classlist.remove(a, b);
};
goog.dom.classlist.enableAll = function(a, b, c) {
  (c ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll)(a, b);
};
goog.dom.classlist.swap = function(a, b, c) {
  return goog.dom.classlist.contains(a, b) ? (goog.dom.classlist.remove(a, b), goog.dom.classlist.add(a, c), !0) : !1;
};
goog.dom.classlist.toggle = function(a, b) {
  var c = !goog.dom.classlist.contains(a, b);
  goog.dom.classlist.enable(a, b, c);
  return c;
};
goog.dom.classlist.addRemove = function(a, b, c) {
  goog.dom.classlist.remove(a, b);
  goog.dom.classlist.add(a, c);
};
mob.button = {};
mob.button.AbstractButton = function(a, b, c, d) {
  this.el = goog.dom.createElement(goog.dom.TagName.A);
  this.id_ = a;
  this.iconImage_ = b;
  this.color_ = c;
  this.labelText_ = d;
  this.createButton();
};
mob.button.AbstractButton.prototype.createButton = function() {
  this.el.id = this.id_;
  goog.dom.classlist.add(this.el, mob.util.ElementClass.BUTTON);
  this.el.onclick = goog.bind(this.clickHandler, this);
  var a = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.dom.classlist.add(a, mob.util.ElementClass.BUTTON_ICON);
  a.style.backgroundImage = "url(" + mob.util.synthesizeImage(this.iconImage_, this.color_) + ")";
  this.el.appendChild(a);
  this.labelText_ && (a = goog.dom.createElement(goog.dom.TagName.P), goog.dom.classlist.add(a, mob.util.ElementClass.BUTTON_TEXT), this.el.appendChild(a), a.appendChild(document.createTextNode(this.labelText_)));
};
mob.button.Menu = function(a, b) {
  this.clickHandlerFn_ = b;
  mob.button.AbstractButton.call(this, mob.util.ElementId.MENU_BUTTON, mob.button.Menu.ICON_, a, null);
};
goog.inherits(mob.button.Menu, mob.button.AbstractButton);
mob.button.Menu.ICON_ = "R0lGODlhYABgAPAAAAAAAAAAACH5BAEAAAEAIf8LSW1hZ2VNYWdpY2sHZ2FtbWE9MQAsAAAAAGAAYAAAAsKMj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/reAv7PI/2GwOCHiAQYO8nkctNEPjNR59RSlV4rWeKW2y1+JWHxGFL2nSflNTvsflfjlDkdPLzr9/y+/w8YKDiooUWIYHfYpQg32CaYphQYCZlW+QhIOWl5mUWI2dl0aJA4GmBomqq6ytrq+gqrgzpa6uj52RgaZQvqp5nJCdzb9/tXbJy7uYhbq5unOhsrPU1dbX2Nna29zd3t/T1VAAA7";
mob.button.Menu.prototype.clickHandler = function() {
  this.clickHandlerFn_();
};
goog.json = {};
goog.json.USE_NATIVE_JSON = !1;
goog.json.isValid = function(a) {
  return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""));
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
  a = String(a);
  if (goog.json.isValid(a)) {
    try {
      return eval("(" + a + ")");
    } catch (b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
};
goog.json.unsafeParse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
  return eval("(" + a + ")");
};
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(a, b) {
  return (new goog.json.Serializer(b)).serialize(a);
};
goog.json.Serializer = function(a) {
  this.replacer_ = a;
};
goog.json.Serializer.prototype.serialize = function(a) {
  var b = [];
  this.serializeInternal(a, b);
  return b.join("");
};
goog.json.Serializer.prototype.serializeInternal = function(a, b) {
  if (null == a) {
    b.push("null");
  } else {
    if ("object" == typeof a) {
      if (goog.isArray(a)) {
        this.serializeArray(a, b);
        return;
      }
      if (a instanceof String || a instanceof Number || a instanceof Boolean) {
        a = a.valueOf();
      } else {
        this.serializeObject_(a, b);
        return;
      }
    }
    switch(typeof a) {
      case "string":
        this.serializeString_(a, b);
        break;
      case "number":
        this.serializeNumber_(a, b);
        break;
      case "boolean":
        b.push(String(a));
        break;
      case "function":
        b.push("null");
        break;
      default:
        throw Error("Unknown type: " + typeof a);;
    }
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(a, b) {
  b.push('"', a.replace(goog.json.Serializer.charsToReplace_, function(a) {
    var b = goog.json.Serializer.charToJsonCharCache_[a];
    b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), goog.json.Serializer.charToJsonCharCache_[a] = b);
    return b;
  }), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function(a, b) {
  b.push(isFinite(a) && !isNaN(a) ? String(a) : "null");
};
goog.json.Serializer.prototype.serializeArray = function(a, b) {
  var c = a.length;
  b.push("[");
  for (var d = "", e = 0;e < c;e++) {
    b.push(d), d = a[e], this.serializeInternal(this.replacer_ ? this.replacer_.call(a, String(e), d) : d, b), d = ",";
  }
  b.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function(a, b) {
  b.push("{");
  var c = "", d;
  for (d in a) {
    if (Object.prototype.hasOwnProperty.call(a, d)) {
      var e = a[d];
      "function" != typeof e && (b.push(c), this.serializeString_(d, b), b.push(":"), this.serializeInternal(this.replacer_ ? this.replacer_.call(a, d, e) : e, b), c = ",");
    }
  }
  b.push("}");
};
goog.Thenable = function() {
};
goog.Thenable.prototype.then = function(a, b, c) {
};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(a) {
  goog.exportProperty(a.prototype, "then", a.prototype.then);
  COMPILED ? a.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : a.prototype.$goog_Thenable = !0;
};
goog.Thenable.isImplementedBy = function(a) {
  if (!a) {
    return !1;
  }
  try {
    return COMPILED ? !!a[goog.Thenable.IMPLEMENTED_BY_PROP] : !!a.$goog_Thenable;
  } catch (b) {
    return !1;
  }
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(a) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    for (var b = goog.debug.entryPointRegistry.monitors_, c = 0;c < b.length;c++) {
      a(goog.bind(b[c].wrap, b[c]));
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function(a) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for (var b = goog.bind(a.wrap, a), c = 0;c < goog.debug.entryPointRegistry.refList_.length;c++) {
    goog.debug.entryPointRegistry.refList_[c](b);
  }
  goog.debug.entryPointRegistry.monitors_.push(a);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
  var b = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
  a = goog.bind(a.unwrap, a);
  for (var c = 0;c < goog.debug.entryPointRegistry.refList_.length;c++) {
    goog.debug.entryPointRegistry.refList_[c](a);
  }
  b.length--;
};
goog.functions = {};
goog.functions.constant = function(a) {
  return function() {
    return a;
  };
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(a, b) {
  return a;
};
goog.functions.error = function(a) {
  return function() {
    throw Error(a);
  };
};
goog.functions.fail = function(a) {
  return function() {
    throw a;
  };
};
goog.functions.lock = function(a, b) {
  b = b || 0;
  return function() {
    return a.apply(this, Array.prototype.slice.call(arguments, 0, b));
  };
};
goog.functions.nth = function(a) {
  return function() {
    return arguments[a];
  };
};
goog.functions.partialRight = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.push.apply(b, c);
    return a.apply(this, b);
  };
};
goog.functions.withReturnValue = function(a, b) {
  return goog.functions.sequence(a, goog.functions.constant(b));
};
goog.functions.equalTo = function(a, b) {
  return function(c) {
    return b ? a == c : a === c;
  };
};
goog.functions.compose = function(a, b) {
  var c = arguments, d = c.length;
  return function() {
    var a;
    d && (a = c[d - 1].apply(this, arguments));
    for (var b = d - 2;0 <= b;b--) {
      a = c[b].call(this, a);
    }
    return a;
  };
};
goog.functions.sequence = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a, e = 0;e < c;e++) {
      a = b[e].apply(this, arguments);
    }
    return a;
  };
};
goog.functions.and = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a = 0;a < c;a++) {
      if (!b[a].apply(this, arguments)) {
        return !1;
      }
    }
    return !0;
  };
};
goog.functions.or = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a = 0;a < c;a++) {
      if (b[a].apply(this, arguments)) {
        return !0;
      }
    }
    return !1;
  };
};
goog.functions.not = function(a) {
  return function() {
    return !a.apply(this, arguments);
  };
};
goog.functions.create = function(a, b) {
  var c = function() {
  };
  c.prototype = a.prototype;
  c = new c;
  a.apply(c, Array.prototype.slice.call(arguments, 1));
  return c;
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(a) {
  var b = !1, c;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return a();
    }
    b || (c = a(), b = !0);
    return c;
  };
};
goog.functions.once = function(a) {
  var b = a;
  return function() {
    if (b) {
      var a = b;
      b = null;
      a();
    }
  };
};
goog.functions.debounce = function(a, b, c) {
  c && (a = goog.bind(a, c));
  var d = null;
  return function(c) {
    goog.global.clearTimeout(d);
    var f = arguments;
    d = goog.global.setTimeout(function() {
      a.apply(null, f);
    }, b);
  };
};
goog.functions.throttle = function(a, b, c) {
  c && (a = goog.bind(a, c));
  var d = null, e = !1, f = [], g = function() {
    d = null;
    e && (e = !1, h());
  }, h = function() {
    d = goog.global.setTimeout(g, b);
    a.apply(null, f);
  };
  return function(a) {
    f = arguments;
    d ? e = !0 : h();
  };
};
goog.async = {};
goog.async.throwException = function(a) {
  goog.global.setTimeout(function() {
    throw a;
  }, 0);
};
goog.async.nextTick = function(a, b, c) {
  var d = a;
  b && (d = goog.bind(a, b));
  d = goog.async.nextTick.wrapCallback_(d);
  goog.isFunction(goog.global.setImmediate) && (c || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(d) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(d));
};
goog.async.nextTick.useSetImmediate_ = function() {
  return goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? !1 : !0;
};
goog.async.nextTick.getSetImmediateEmulator_ = function() {
  var a = goog.global.MessageChannel;
  "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (a = function() {
    var a = document.createElement(goog.dom.TagName.IFRAME);
    a.style.display = "none";
    a.src = "";
    document.documentElement.appendChild(a);
    var b = a.contentWindow, a = b.document;
    a.open();
    a.write("");
    a.close();
    var c = "callImmediate" + Math.random(), d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host, a = goog.bind(function(a) {
      if (("*" == d || a.origin == d) && a.data == c) {
        this.port1.onmessage();
      }
    }, this);
    b.addEventListener("message", a, !1);
    this.port1 = {};
    this.port2 = {postMessage:function() {
      b.postMessage(c, d);
    }};
  });
  if ("undefined" !== typeof a && !goog.labs.userAgent.browser.isIE()) {
    var b = new a, c = {}, d = c;
    b.port1.onmessage = function() {
      if (goog.isDef(c.next)) {
        c = c.next;
        var a = c.cb;
        c.cb = null;
        a();
      }
    };
    return function(a) {
      d.next = {cb:a};
      d = d.next;
      b.port2.postMessage(0);
    };
  }
  return "undefined" !== typeof document && "onreadystatechange" in document.createElement(goog.dom.TagName.SCRIPT) ? function(a) {
    var b = document.createElement(goog.dom.TagName.SCRIPT);
    b.onreadystatechange = function() {
      b.onreadystatechange = null;
      b.parentNode.removeChild(b);
      b = null;
      a();
      a = null;
    };
    document.documentElement.appendChild(b);
  } : function(a) {
    goog.global.setTimeout(a, 0);
  };
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(a) {
  goog.async.nextTick.wrapCallback_ = a;
});
goog.async.FreeList = function(a, b, c) {
  this.limit_ = c;
  this.create_ = a;
  this.reset_ = b;
  this.occupants_ = 0;
  this.head_ = null;
};
goog.async.FreeList.prototype.get = function() {
  var a;
  0 < this.occupants_ ? (this.occupants_--, a = this.head_, this.head_ = a.next, a.next = null) : a = this.create_();
  return a;
};
goog.async.FreeList.prototype.put = function(a) {
  this.reset_(a);
  this.occupants_ < this.limit_ && (this.occupants_++, a.next = this.head_, this.head_ = a);
};
goog.async.FreeList.prototype.occupants = function() {
  return this.occupants_;
};
goog.async.WorkQueue = function() {
  this.workTail_ = this.workHead_ = null;
};
goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
  return new goog.async.WorkItem;
}, function(a) {
  a.reset();
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(a, b) {
  var c = this.getUnusedItem_();
  c.set(a, b);
  this.workTail_ ? this.workTail_.next = c : (goog.asserts.assert(!this.workHead_), this.workHead_ = c);
  this.workTail_ = c;
};
goog.async.WorkQueue.prototype.remove = function() {
  var a = null;
  this.workHead_ && (a = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), a.next = null);
  return a;
};
goog.async.WorkQueue.prototype.returnUnused = function(a) {
  goog.async.WorkQueue.freelist_.put(a);
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
  return goog.async.WorkQueue.freelist_.get();
};
goog.async.WorkItem = function() {
  this.next = this.scope = this.fn = null;
};
goog.async.WorkItem.prototype.set = function(a, b) {
  this.fn = a;
  this.scope = b;
  this.next = null;
};
goog.async.WorkItem.prototype.reset = function() {
  this.next = this.scope = this.fn = null;
};
goog.async.run = function(a, b) {
  goog.async.run.schedule_ || goog.async.run.initializeRunner_();
  goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
  goog.async.run.workQueue_.add(a, b);
};
goog.async.run.initializeRunner_ = function() {
  if (goog.global.Promise && goog.global.Promise.resolve) {
    var a = goog.global.Promise.resolve(void 0);
    goog.async.run.schedule_ = function() {
      a.then(goog.async.run.processWorkQueue);
    };
  } else {
    goog.async.run.schedule_ = function() {
      goog.async.nextTick(goog.async.run.processWorkQueue);
    };
  }
};
goog.async.run.forceNextTick = function(a) {
  goog.async.run.schedule_ = function() {
    goog.async.nextTick(goog.async.run.processWorkQueue);
    a && a(goog.async.run.processWorkQueue);
  };
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
goog.DEBUG && (goog.async.run.resetQueue = function() {
  goog.async.run.workQueueScheduled_ = !1;
  goog.async.run.workQueue_ = new goog.async.WorkQueue;
});
goog.async.run.processWorkQueue = function() {
  for (var a = null;a = goog.async.run.workQueue_.remove();) {
    try {
      a.fn.call(a.scope);
    } catch (b) {
      goog.async.throwException(b);
    }
    goog.async.run.workQueue_.returnUnused(a);
  }
  goog.async.run.workQueueScheduled_ = !1;
};
goog.promise = {};
goog.promise.Resolver = function() {
};
goog.Promise = function(a, b) {
  this.state_ = goog.Promise.State_.PENDING;
  this.result_ = void 0;
  this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
  this.executing_ = !1;
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
  goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
  if (a != goog.nullFunction) {
    try {
      var c = this;
      a.call(b, function(a) {
        c.resolve_(goog.Promise.State_.FULFILLED, a);
      }, function(a) {
        if (goog.DEBUG && !(a instanceof goog.Promise.CancellationError)) {
          try {
            if (a instanceof Error) {
              throw a;
            }
            throw Error("Promise rejected.");
          } catch (b) {
          }
        }
        c.resolve_(goog.Promise.State_.REJECTED, a);
      });
    } catch (d) {
      this.resolve_(goog.Promise.State_.REJECTED, d);
    }
  }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {PENDING:0, BLOCKED:1, FULFILLED:2, REJECTED:3};
goog.Promise.CallbackEntry_ = function() {
  this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
  this.always = !1;
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
  this.context = this.onRejected = this.onFulfilled = this.child = null;
  this.always = !1;
};
goog.Promise.DEFAULT_MAX_UNUSED = 100;
goog.Promise.freelist_ = new goog.async.FreeList(function() {
  return new goog.Promise.CallbackEntry_;
}, function(a) {
  a.reset();
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(a, b, c) {
  var d = goog.Promise.freelist_.get();
  d.onFulfilled = a;
  d.onRejected = b;
  d.context = c;
  return d;
};
goog.Promise.returnEntry_ = function(a) {
  goog.Promise.freelist_.put(a);
};
goog.Promise.resolve = function(a) {
  if (a instanceof goog.Promise) {
    return a;
  }
  var b = new goog.Promise(goog.nullFunction);
  b.resolve_(goog.Promise.State_.FULFILLED, a);
  return b;
};
goog.Promise.reject = function(a) {
  return new goog.Promise(function(b, c) {
    c(a);
  });
};
goog.Promise.resolveThen_ = function(a, b, c) {
  goog.Promise.maybeThen_(a, b, c, null) || goog.async.run(goog.partial(b, a));
};
goog.Promise.race = function(a) {
  return new goog.Promise(function(b, c) {
    a.length || b(void 0);
    for (var d = 0, e;d < a.length;d++) {
      e = a[d], goog.Promise.resolveThen_(e, b, c);
    }
  });
};
goog.Promise.all = function(a) {
  return new goog.Promise(function(b, c) {
    var d = a.length, e = [];
    if (d) {
      for (var f = function(a, c) {
        d--;
        e[a] = c;
        0 == d && b(e);
      }, g = function(a) {
        c(a);
      }, h = 0, k;h < a.length;h++) {
        k = a[h], goog.Promise.resolveThen_(k, goog.partial(f, h), g);
      }
    } else {
      b(e);
    }
  });
};
goog.Promise.allSettled = function(a) {
  return new goog.Promise(function(b, c) {
    var d = a.length, e = [];
    if (d) {
      for (var f = function(a, c, f) {
        d--;
        e[a] = c ? {fulfilled:!0, value:f} : {fulfilled:!1, reason:f};
        0 == d && b(e);
      }, g = 0, h;g < a.length;g++) {
        h = a[g], goog.Promise.resolveThen_(h, goog.partial(f, g, !0), goog.partial(f, g, !1));
      }
    } else {
      b(e);
    }
  });
};
goog.Promise.firstFulfilled = function(a) {
  return new goog.Promise(function(b, c) {
    var d = a.length, e = [];
    if (d) {
      for (var f = function(a) {
        b(a);
      }, g = function(a, b) {
        d--;
        e[a] = b;
        0 == d && c(e);
      }, h = 0, k;h < a.length;h++) {
        k = a[h], goog.Promise.resolveThen_(k, f, goog.partial(g, h));
      }
    } else {
      b(void 0);
    }
  });
};
goog.Promise.withResolver = function() {
  var a, b, c = new goog.Promise(function(c, e) {
    a = c;
    b = e;
  });
  return new goog.Promise.Resolver_(c, a, b);
};
goog.Promise.prototype.then = function(a, b, c) {
  null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
  null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  return this.addChildPromise_(goog.isFunction(a) ? a : null, goog.isFunction(b) ? b : null, c);
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(a, b, c) {
  null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
  null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  this.addCallbackEntry_(goog.Promise.getCallbackEntry_(a || goog.nullFunction, b || null, c));
};
goog.Promise.prototype.thenAlways = function(a, b) {
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
  var c = goog.Promise.getCallbackEntry_(a, a, b);
  c.always = !0;
  this.addCallbackEntry_(c);
  return this;
};
goog.Promise.prototype.thenCatch = function(a, b) {
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
  return this.addChildPromise_(null, a, b);
};
goog.Promise.prototype.cancel = function(a) {
  this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
    var b = new goog.Promise.CancellationError(a);
    this.cancelInternal_(b);
  }, this);
};
goog.Promise.prototype.cancelInternal_ = function(a) {
  this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, a), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, a));
};
goog.Promise.prototype.cancelChild_ = function(a, b) {
  if (this.callbackEntries_) {
    for (var c = 0, d = null, e = null, f = this.callbackEntries_;f && (f.always || (c++, f.child == a && (d = f), !(d && 1 < c)));f = f.next) {
      d || (e = f);
    }
    d && (this.state_ == goog.Promise.State_.PENDING && 1 == c ? this.cancelInternal_(b) : (e ? this.removeEntryAfter_(e) : this.popEntry_(), this.executeCallback_(d, goog.Promise.State_.REJECTED, b)));
  }
};
goog.Promise.prototype.addCallbackEntry_ = function(a) {
  this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
  this.queueEntry_(a);
};
goog.Promise.prototype.addChildPromise_ = function(a, b, c) {
  var d = goog.Promise.getCallbackEntry_(null, null, null);
  d.child = new goog.Promise(function(e, f) {
    d.onFulfilled = a ? function(b) {
      try {
        var d = a.call(c, b);
        e(d);
      } catch (k) {
        f(k);
      }
    } : e;
    d.onRejected = b ? function(a) {
      try {
        var d = b.call(c, a);
        !goog.isDef(d) && a instanceof goog.Promise.CancellationError ? f(a) : e(d);
      } catch (k) {
        f(k);
      }
    } : f;
  });
  d.child.parent_ = this;
  this.addCallbackEntry_(d);
  return d.child;
};
goog.Promise.prototype.unblockAndFulfill_ = function(a) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.FULFILLED, a);
};
goog.Promise.prototype.unblockAndReject_ = function(a) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.REJECTED, a);
};
goog.Promise.prototype.resolve_ = function(a, b) {
  this.state_ == goog.Promise.State_.PENDING && (this === b && (a = goog.Promise.State_.REJECTED, b = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(b, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = b, this.state_ = a, this.parent_ = null, this.scheduleCallbacks_(), a != goog.Promise.State_.REJECTED || b instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, b)));
};
goog.Promise.maybeThen_ = function(a, b, c, d) {
  if (a instanceof goog.Promise) {
    return a.thenVoid(b, c, d), !0;
  }
  if (goog.Thenable.isImplementedBy(a)) {
    return a.then(b, c, d), !0;
  }
  if (goog.isObject(a)) {
    try {
      var e = a.then;
      if (goog.isFunction(e)) {
        return goog.Promise.tryThen_(a, e, b, c, d), !0;
      }
    } catch (f) {
      return c.call(d, f), !0;
    }
  }
  return !1;
};
goog.Promise.tryThen_ = function(a, b, c, d, e) {
  var f = !1, g = function(a) {
    f || (f = !0, c.call(e, a));
  }, h = function(a) {
    f || (f = !0, d.call(e, a));
  };
  try {
    b.call(a, g, h);
  } catch (k) {
    h(k);
  }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
  this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this));
};
goog.Promise.prototype.hasEntry_ = function() {
  return !!this.callbackEntries_;
};
goog.Promise.prototype.queueEntry_ = function(a) {
  goog.asserts.assert(null != a.onFulfilled);
  this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = a : this.callbackEntries_ = a;
  this.callbackEntriesTail_ = a;
};
goog.Promise.prototype.popEntry_ = function() {
  var a = null;
  this.callbackEntries_ && (a = this.callbackEntries_, this.callbackEntries_ = a.next, a.next = null);
  this.callbackEntries_ || (this.callbackEntriesTail_ = null);
  null != a && goog.asserts.assert(null != a.onFulfilled);
  return a;
};
goog.Promise.prototype.removeEntryAfter_ = function(a) {
  goog.asserts.assert(this.callbackEntries_);
  goog.asserts.assert(null != a);
  a.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = a);
  a.next = a.next.next;
};
goog.Promise.prototype.executeCallbacks_ = function() {
  for (var a = null;a = this.popEntry_();) {
    goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(a, this.state_, this.result_);
  }
  this.executing_ = !1;
};
goog.Promise.prototype.executeCallback_ = function(a, b, c) {
  b == goog.Promise.State_.REJECTED && a.onRejected && !a.always && this.removeUnhandledRejection_();
  if (a.child) {
    a.child.parent_ = null, goog.Promise.invokeCallback_(a, b, c);
  } else {
    try {
      a.always ? a.onFulfilled.call(a.context) : goog.Promise.invokeCallback_(a, b, c);
    } catch (d) {
      goog.Promise.handleRejection_.call(null, d);
    }
  }
  goog.Promise.returnEntry_(a);
};
goog.Promise.invokeCallback_ = function(a, b, c) {
  b == goog.Promise.State_.FULFILLED ? a.onFulfilled.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c);
};
goog.Promise.prototype.addStackTrace_ = function(a) {
  if (goog.Promise.LONG_STACK_TRACES && goog.isString(a.stack)) {
    var b = a.stack.split("\n", 4)[3];
    a = a.message;
    a += Array(11 - a.length).join(" ");
    this.stack_.push(a + b);
  }
};
goog.Promise.prototype.appendLongStack_ = function(a) {
  if (goog.Promise.LONG_STACK_TRACES && a && goog.isString(a.stack) && this.stack_.length) {
    for (var b = ["Promise trace:"], c = this;c;c = c.parent_) {
      for (var d = this.currentStep_;0 <= d;d--) {
        b.push(c.stack_[d]);
      }
      b.push("Value: [" + (c.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(c.result_) + ">");
    }
    a.stack += "\n\n" + b.join("\n");
  }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
  if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY) {
    for (var a = this;a && a.unhandledRejectionId_;a = a.parent_) {
      goog.global.clearTimeout(a.unhandledRejectionId_), a.unhandledRejectionId_ = 0;
    }
  } else {
    if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY) {
      for (a = this;a && a.hadUnhandledRejection_;a = a.parent_) {
        a.hadUnhandledRejection_ = !1;
      }
    }
  }
};
goog.Promise.addUnhandledRejection_ = function(a, b) {
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? a.unhandledRejectionId_ = goog.global.setTimeout(function() {
    a.appendLongStack_(b);
    goog.Promise.handleRejection_.call(null, b);
  }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (a.hadUnhandledRejection_ = !0, goog.async.run(function() {
    a.hadUnhandledRejection_ && (a.appendLongStack_(b), goog.Promise.handleRejection_.call(null, b));
  }));
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(a) {
  goog.Promise.handleRejection_ = a;
};
goog.Promise.CancellationError = function(a) {
  goog.debug.Error.call(this, a);
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(a, b, c) {
  this.promise = a;
  this.resolve = b;
  this.reject = c;
};
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
goog.async.Deferred = function(a, b) {
  this.sequence_ = [];
  this.onCancelFunction_ = a;
  this.defaultScope_ = b || null;
  this.hadError_ = this.fired_ = !1;
  this.result_ = void 0;
  this.silentlyCanceled_ = this.blocking_ = this.blocked_ = !1;
  this.unhandledErrorId_ = 0;
  this.parent_ = null;
  this.branches_ = 0;
  if (goog.async.Deferred.LONG_STACK_TRACES && (this.constructorStack_ = null, Error.captureStackTrace)) {
    var c = {stack:""};
    Error.captureStackTrace(c, goog.async.Deferred);
    "string" == typeof c.stack && (this.constructorStack_ = c.stack.replace(/^[^\n]*\n/, ""));
  }
};
goog.async.Deferred.STRICT_ERRORS = !1;
goog.async.Deferred.LONG_STACK_TRACES = !1;
goog.async.Deferred.prototype.cancel = function(a) {
  if (this.hasFired()) {
    this.result_ instanceof goog.async.Deferred && this.result_.cancel();
  } else {
    if (this.parent_) {
      var b = this.parent_;
      delete this.parent_;
      a ? b.cancel(a) : b.branchCancel_();
    }
    this.onCancelFunction_ ? this.onCancelFunction_.call(this.defaultScope_, this) : this.silentlyCanceled_ = !0;
    this.hasFired() || this.errback(new goog.async.Deferred.CanceledError(this));
  }
};
goog.async.Deferred.prototype.branchCancel_ = function() {
  this.branches_--;
  0 >= this.branches_ && this.cancel();
};
goog.async.Deferred.prototype.continue_ = function(a, b) {
  this.blocked_ = !1;
  this.updateResult_(a, b);
};
goog.async.Deferred.prototype.updateResult_ = function(a, b) {
  this.fired_ = !0;
  this.result_ = b;
  this.hadError_ = !a;
  this.fire_();
};
goog.async.Deferred.prototype.check_ = function() {
  if (this.hasFired()) {
    if (!this.silentlyCanceled_) {
      throw new goog.async.Deferred.AlreadyCalledError(this);
    }
    this.silentlyCanceled_ = !1;
  }
};
goog.async.Deferred.prototype.callback = function(a) {
  this.check_();
  this.assertNotDeferred_(a);
  this.updateResult_(!0, a);
};
goog.async.Deferred.prototype.errback = function(a) {
  this.check_();
  this.assertNotDeferred_(a);
  this.makeStackTraceLong_(a);
  this.updateResult_(!1, a);
};
goog.async.Deferred.prototype.makeStackTraceLong_ = function(a) {
  goog.async.Deferred.LONG_STACK_TRACES && this.constructorStack_ && goog.isObject(a) && a.stack && /^[^\n]+(\n   [^\n]+)+/.test(a.stack) && (a.stack = a.stack + "\nDEFERRED OPERATION:\n" + this.constructorStack_);
};
goog.async.Deferred.prototype.assertNotDeferred_ = function(a) {
  goog.asserts.assert(!(a instanceof goog.async.Deferred), "An execution sequence may not be initiated with a blocking Deferred.");
};
goog.async.Deferred.prototype.addCallback = function(a, b) {
  return this.addCallbacks(a, null, b);
};
goog.async.Deferred.prototype.addErrback = function(a, b) {
  return this.addCallbacks(null, a, b);
};
goog.async.Deferred.prototype.addBoth = function(a, b) {
  return this.addCallbacks(a, a, b);
};
goog.async.Deferred.prototype.addFinally = function(a, b) {
  var c = this;
  return this.addCallbacks(a, function(b) {
    var e = a.call(c, b);
    if (!goog.isDef(e)) {
      throw b;
    }
    return e;
  }, b);
};
goog.async.Deferred.prototype.addCallbacks = function(a, b, c) {
  goog.asserts.assert(!this.blocking_, "Blocking Deferreds can not be re-used");
  this.sequence_.push([a, b, c]);
  this.hasFired() && this.fire_();
  return this;
};
goog.async.Deferred.prototype.then = function(a, b, c) {
  var d, e, f = new goog.Promise(function(a, b) {
    d = a;
    e = b;
  });
  this.addCallbacks(d, function(a) {
    a instanceof goog.async.Deferred.CanceledError ? f.cancel() : e(a);
  });
  return f.then(a, b, c);
};
goog.Thenable.addImplementation(goog.async.Deferred);
goog.async.Deferred.prototype.chainDeferred = function(a) {
  this.addCallbacks(a.callback, a.errback, a);
  return this;
};
goog.async.Deferred.prototype.awaitDeferred = function(a) {
  return a instanceof goog.async.Deferred ? this.addCallback(goog.bind(a.branch, a)) : this.addCallback(function() {
    return a;
  });
};
goog.async.Deferred.prototype.branch = function(a) {
  var b = new goog.async.Deferred;
  this.chainDeferred(b);
  a && (b.parent_ = this, this.branches_++);
  return b;
};
goog.async.Deferred.prototype.hasFired = function() {
  return this.fired_;
};
goog.async.Deferred.prototype.isError = function(a) {
  return a instanceof Error;
};
goog.async.Deferred.prototype.hasErrback_ = function() {
  return goog.array.some(this.sequence_, function(a) {
    return goog.isFunction(a[1]);
  });
};
goog.async.Deferred.prototype.fire_ = function() {
  this.unhandledErrorId_ && this.hasFired() && this.hasErrback_() && (goog.async.Deferred.unscheduleError_(this.unhandledErrorId_), this.unhandledErrorId_ = 0);
  this.parent_ && (this.parent_.branches_--, delete this.parent_);
  for (var a = this.result_, b = !1, c = !1;this.sequence_.length && !this.blocked_;) {
    var d = this.sequence_.shift(), e = d[0], f = d[1], d = d[2];
    if (e = this.hadError_ ? f : e) {
      try {
        var g = e.call(d || this.defaultScope_, a);
        goog.isDef(g) && (this.hadError_ = this.hadError_ && (g == a || this.isError(g)), this.result_ = a = g);
        if (goog.Thenable.isImplementedBy(a) || "function" === typeof goog.global.Promise && a instanceof goog.global.Promise) {
          this.blocked_ = c = !0;
        }
      } catch (h) {
        a = h, this.hadError_ = !0, this.makeStackTraceLong_(a), this.hasErrback_() || (b = !0);
      }
    }
  }
  this.result_ = a;
  c ? (c = goog.bind(this.continue_, this, !0), g = goog.bind(this.continue_, this, !1), a instanceof goog.async.Deferred ? (a.addCallbacks(c, g), a.blocking_ = !0) : a.then(c, g)) : !goog.async.Deferred.STRICT_ERRORS || !this.isError(a) || a instanceof goog.async.Deferred.CanceledError || (b = this.hadError_ = !0);
  b && (this.unhandledErrorId_ = goog.async.Deferred.scheduleError_(a));
};
goog.async.Deferred.succeed = function(a) {
  var b = new goog.async.Deferred;
  b.callback(a);
  return b;
};
goog.async.Deferred.fromPromise = function(a) {
  var b = new goog.async.Deferred;
  b.callback();
  b.addCallback(function() {
    return a;
  });
  return b;
};
goog.async.Deferred.fail = function(a) {
  var b = new goog.async.Deferred;
  b.errback(a);
  return b;
};
goog.async.Deferred.canceled = function() {
  var a = new goog.async.Deferred;
  a.cancel();
  return a;
};
goog.async.Deferred.when = function(a, b, c) {
  return a instanceof goog.async.Deferred ? a.branch(!0).addCallback(b, c) : goog.async.Deferred.succeed(a).addCallback(b, c);
};
goog.async.Deferred.AlreadyCalledError = function(a) {
  goog.debug.Error.call(this);
  this.deferred = a;
};
goog.inherits(goog.async.Deferred.AlreadyCalledError, goog.debug.Error);
goog.async.Deferred.AlreadyCalledError.prototype.message = "Deferred has already fired";
goog.async.Deferred.AlreadyCalledError.prototype.name = "AlreadyCalledError";
goog.async.Deferred.CanceledError = function(a) {
  goog.debug.Error.call(this);
  this.deferred = a;
};
goog.inherits(goog.async.Deferred.CanceledError, goog.debug.Error);
goog.async.Deferred.CanceledError.prototype.message = "Deferred was canceled";
goog.async.Deferred.CanceledError.prototype.name = "CanceledError";
goog.async.Deferred.Error_ = function(a) {
  this.id_ = goog.global.setTimeout(goog.bind(this.throwError, this), 0);
  this.error_ = a;
};
goog.async.Deferred.Error_.prototype.throwError = function() {
  goog.asserts.assert(goog.async.Deferred.errorMap_[this.id_], "Cannot throw an error that is not scheduled.");
  delete goog.async.Deferred.errorMap_[this.id_];
  throw this.error_;
};
goog.async.Deferred.Error_.prototype.resetTimer = function() {
  goog.global.clearTimeout(this.id_);
};
goog.async.Deferred.errorMap_ = {};
goog.async.Deferred.scheduleError_ = function(a) {
  a = new goog.async.Deferred.Error_(a);
  goog.async.Deferred.errorMap_[a.id_] = a;
  return a.id_;
};
goog.async.Deferred.unscheduleError_ = function(a) {
  var b = goog.async.Deferred.errorMap_[a];
  b && (b.resetTimer(), delete goog.async.Deferred.errorMap_[a]);
};
goog.async.Deferred.assertNoErrors = function() {
  var a = goog.async.Deferred.errorMap_, b;
  for (b in a) {
    var c = a[b];
    c.resetTimer();
    c.throwError();
  }
};
goog.net = {};
goog.net.jsloader = {};
goog.net.jsloader.GLOBAL_VERIFY_OBJS_ = "closure_verification";
goog.net.jsloader.DEFAULT_TIMEOUT = 5E3;
goog.net.jsloader.scriptsToLoad_ = [];
goog.net.jsloader.loadMany = function(a, b) {
  if (!a.length) {
    return goog.async.Deferred.succeed(null);
  }
  var c = goog.net.jsloader.scriptsToLoad_.length;
  goog.array.extend(goog.net.jsloader.scriptsToLoad_, a);
  if (c) {
    return goog.net.jsloader.scriptLoadingDeferred_;
  }
  a = goog.net.jsloader.scriptsToLoad_;
  var d = function() {
    var c = a.shift(), c = goog.net.jsloader.load(c, b);
    a.length && c.addBoth(d);
    return c;
  };
  goog.net.jsloader.scriptLoadingDeferred_ = d();
  return goog.net.jsloader.scriptLoadingDeferred_;
};
goog.net.jsloader.load = function(a, b) {
  var c = b || {}, d = c.document || document, e = goog.dom.createElement(goog.dom.TagName.SCRIPT), f = {script_:e, timeout_:void 0}, g = new goog.async.Deferred(goog.net.jsloader.cancel_, f), h = null, k = goog.isDefAndNotNull(c.timeout) ? c.timeout : goog.net.jsloader.DEFAULT_TIMEOUT;
  0 < k && (h = window.setTimeout(function() {
    goog.net.jsloader.cleanup_(e, !0);
    g.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.TIMEOUT, "Timeout reached for loading script " + a));
  }, k), f.timeout_ = h);
  e.onload = e.onreadystatechange = function() {
    e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (goog.net.jsloader.cleanup_(e, c.cleanupWhenDone || !1, h), g.callback(null));
  };
  e.onerror = function() {
    goog.net.jsloader.cleanup_(e, !0, h);
    g.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.LOAD_ERROR, "Error while loading script " + a));
  };
  f = c.attributes || {};
  goog.object.extend(f, {type:"text/javascript", charset:"UTF-8", src:a});
  goog.dom.setProperties(e, f);
  goog.net.jsloader.getScriptParentElement_(d).appendChild(e);
  return g;
};
goog.net.jsloader.loadAndVerify = function(a, b, c) {
  goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] || (goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_] = {});
  var d = goog.global[goog.net.jsloader.GLOBAL_VERIFY_OBJS_];
  if (goog.isDef(d[b])) {
    return goog.async.Deferred.fail(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_OBJECT_ALREADY_EXISTS, "Verification object " + b + " already defined."));
  }
  c = goog.net.jsloader.load(a, c);
  var e = new goog.async.Deferred(goog.bind(c.cancel, c));
  c.addCallback(function() {
    var c = d[b];
    goog.isDef(c) ? (e.callback(c), delete d[b]) : e.errback(new goog.net.jsloader.Error(goog.net.jsloader.ErrorCode.VERIFY_ERROR, "Script " + a + " loaded, but verification object " + b + " was not defined."));
  });
  c.addErrback(function(a) {
    goog.isDef(d[b]) && delete d[b];
    e.errback(a);
  });
  return e;
};
goog.net.jsloader.getScriptParentElement_ = function(a) {
  var b = a.getElementsByTagName(goog.dom.TagName.HEAD);
  return !b || goog.array.isEmpty(b) ? a.documentElement : b[0];
};
goog.net.jsloader.cancel_ = function() {
  if (this && this.script_) {
    var a = this.script_;
    a && a.tagName == goog.dom.TagName.SCRIPT && goog.net.jsloader.cleanup_(a, !0, this.timeout_);
  }
};
goog.net.jsloader.cleanup_ = function(a, b, c) {
  goog.isDefAndNotNull(c) && goog.global.clearTimeout(c);
  a.onload = goog.nullFunction;
  a.onerror = goog.nullFunction;
  a.onreadystatechange = goog.nullFunction;
  b && window.setTimeout(function() {
    goog.dom.removeNode(a);
  }, 0);
};
goog.net.jsloader.ErrorCode = {LOAD_ERROR:0, TIMEOUT:1, VERIFY_ERROR:2, VERIFY_OBJECT_ALREADY_EXISTS:3};
goog.net.jsloader.Error = function(a, b) {
  var c = "Jsloader error (code #" + a + ")";
  b && (c += ": " + b);
  goog.debug.Error.call(this, c);
  this.code = a;
};
goog.inherits(goog.net.jsloader.Error, goog.debug.Error);
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {message:"StopIteration", stack:""};
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(a) {
  return this;
};
goog.iter.toIterator = function(a) {
  if (a instanceof goog.iter.Iterator) {
    return a;
  }
  if ("function" == typeof a.__iterator__) {
    return a.__iterator__(!1);
  }
  if (goog.isArrayLike(a)) {
    var b = 0, c = new goog.iter.Iterator;
    c.next = function() {
      for (;;) {
        if (b >= a.length) {
          throw goog.iter.StopIteration;
        }
        if (b in a) {
          return a[b++];
        }
        b++;
      }
    };
    return c;
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
  if (goog.isArrayLike(a)) {
    try {
      goog.array.forEach(a, b, c);
    } catch (d) {
      if (d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  } else {
    a = goog.iter.toIterator(a);
    try {
      for (;;) {
        b.call(c, a.next(), void 0, a);
      }
    } catch (d) {
      if (d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  }
};
goog.iter.filter = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    for (;;) {
      var a = d.next();
      if (b.call(c, a, void 0, d)) {
        return a;
      }
    }
  };
  return a;
};
goog.iter.filterFalse = function(a, b, c) {
  return goog.iter.filter(a, goog.functions.not(b), c);
};
goog.iter.range = function(a, b, c) {
  var d = 0, e = a, f = c || 1;
  1 < arguments.length && (d = a, e = b);
  if (0 == f) {
    throw Error("Range step argument must not be zero");
  }
  var g = new goog.iter.Iterator;
  g.next = function() {
    if (0 < f && d >= e || 0 > f && d <= e) {
      throw goog.iter.StopIteration;
    }
    var a = d;
    d += f;
    return a;
  };
  return g;
};
goog.iter.join = function(a, b) {
  return goog.iter.toArray(a).join(b);
};
goog.iter.map = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = d.next();
    return b.call(c, a, void 0, d);
  };
  return a;
};
goog.iter.reduce = function(a, b, c, d) {
  var e = c;
  goog.iter.forEach(a, function(a) {
    e = b.call(d, e, a);
  });
  return e;
};
goog.iter.some = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for (;;) {
      if (b.call(c, a.next(), void 0, a)) {
        return !0;
      }
    }
  } catch (d) {
    if (d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return !1;
};
goog.iter.every = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for (;;) {
      if (!b.call(c, a.next(), void 0, a)) {
        return !1;
      }
    }
  } catch (d) {
    if (d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return !0;
};
goog.iter.chain = function(a) {
  return goog.iter.chainFromIterable(arguments);
};
goog.iter.chainFromIterable = function(a) {
  var b = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  var c = null;
  a.next = function() {
    for (;;) {
      if (null == c) {
        var a = b.next();
        c = goog.iter.toIterator(a);
      }
      try {
        return c.next();
      } catch (e) {
        if (e !== goog.iter.StopIteration) {
          throw e;
        }
        c = null;
      }
    }
  };
  return a;
};
goog.iter.dropWhile = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  var e = !0;
  a.next = function() {
    for (;;) {
      var a = d.next();
      if (!e || !b.call(c, a, void 0, d)) {
        return e = !1, a;
      }
    }
  };
  return a;
};
goog.iter.takeWhile = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = d.next();
    if (b.call(c, a, void 0, d)) {
      return a;
    }
    throw goog.iter.StopIteration;
  };
  return a;
};
goog.iter.toArray = function(a) {
  if (goog.isArrayLike(a)) {
    return goog.array.toArray(a);
  }
  a = goog.iter.toIterator(a);
  var b = [];
  goog.iter.forEach(a, function(a) {
    b.push(a);
  });
  return b;
};
goog.iter.equals = function(a, b, c) {
  a = goog.iter.zipLongest({}, a, b);
  var d = c || goog.array.defaultCompareEquality;
  return goog.iter.every(a, function(a) {
    return d(a[0], a[1]);
  });
};
goog.iter.nextOrValue = function(a, b) {
  try {
    return goog.iter.toIterator(a).next();
  } catch (c) {
    if (c != goog.iter.StopIteration) {
      throw c;
    }
    return b;
  }
};
goog.iter.product = function(a) {
  if (goog.array.some(arguments, function(a) {
    return !a.length;
  }) || !arguments.length) {
    return new goog.iter.Iterator;
  }
  var b = new goog.iter.Iterator, c = arguments, d = goog.array.repeat(0, c.length);
  b.next = function() {
    if (d) {
      for (var a = goog.array.map(d, function(a, b) {
        return c[b][a];
      }), b = d.length - 1;0 <= b;b--) {
        goog.asserts.assert(d);
        if (d[b] < c[b].length - 1) {
          d[b]++;
          break;
        }
        if (0 == b) {
          d = null;
          break;
        }
        d[b] = 0;
      }
      return a;
    }
    throw goog.iter.StopIteration;
  };
  return b;
};
goog.iter.cycle = function(a) {
  var b = goog.iter.toIterator(a), c = [], d = 0;
  a = new goog.iter.Iterator;
  var e = !1;
  a.next = function() {
    var a = null;
    if (!e) {
      try {
        return a = b.next(), c.push(a), a;
      } catch (g) {
        if (g != goog.iter.StopIteration || goog.array.isEmpty(c)) {
          throw g;
        }
        e = !0;
      }
    }
    a = c[d];
    d = (d + 1) % c.length;
    return a;
  };
  return a;
};
goog.iter.count = function(a, b) {
  var c = a || 0, d = goog.isDef(b) ? b : 1, e = new goog.iter.Iterator;
  e.next = function() {
    var a = c;
    c += d;
    return a;
  };
  return e;
};
goog.iter.repeat = function(a) {
  var b = new goog.iter.Iterator;
  b.next = goog.functions.constant(a);
  return b;
};
goog.iter.accumulate = function(a) {
  var b = goog.iter.toIterator(a), c = 0;
  a = new goog.iter.Iterator;
  a.next = function() {
    return c += b.next();
  };
  return a;
};
goog.iter.zip = function(a) {
  var b = arguments, c = new goog.iter.Iterator;
  if (0 < b.length) {
    var d = goog.array.map(b, goog.iter.toIterator);
    c.next = function() {
      return goog.array.map(d, function(a) {
        return a.next();
      });
    };
  }
  return c;
};
goog.iter.zipLongest = function(a, b) {
  var c = goog.array.slice(arguments, 1), d = new goog.iter.Iterator;
  if (0 < c.length) {
    var e = goog.array.map(c, goog.iter.toIterator);
    d.next = function() {
      var b = !1, c = goog.array.map(e, function(c) {
        var d;
        try {
          d = c.next(), b = !0;
        } catch (e) {
          if (e !== goog.iter.StopIteration) {
            throw e;
          }
          d = a;
        }
        return d;
      });
      if (!b) {
        throw goog.iter.StopIteration;
      }
      return c;
    };
  }
  return d;
};
goog.iter.compress = function(a, b) {
  var c = goog.iter.toIterator(b);
  return goog.iter.filter(a, function() {
    return !!c.next();
  });
};
goog.iter.GroupByIterator_ = function(a, b) {
  this.iterator = goog.iter.toIterator(a);
  this.keyFunc = b || goog.functions.identity;
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
  for (;this.currentKey == this.targetKey;) {
    this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
  }
  this.targetKey = this.currentKey;
  return [this.currentKey, this.groupItems_(this.targetKey)];
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(a) {
  for (var b = [];this.currentKey == a;) {
    b.push(this.currentValue);
    try {
      this.currentValue = this.iterator.next();
    } catch (c) {
      if (c !== goog.iter.StopIteration) {
        throw c;
      }
      break;
    }
    this.currentKey = this.keyFunc(this.currentValue);
  }
  return b;
};
goog.iter.groupBy = function(a, b) {
  return new goog.iter.GroupByIterator_(a, b);
};
goog.iter.starMap = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = goog.iter.toArray(d.next());
    return b.apply(c, goog.array.concat(a, void 0, d));
  };
  return a;
};
goog.iter.tee = function(a, b) {
  var c = goog.iter.toIterator(a), d = goog.isNumber(b) ? b : 2, e = goog.array.map(goog.array.range(d), function() {
    return [];
  }), f = function() {
    var a = c.next();
    goog.array.forEach(e, function(b) {
      b.push(a);
    });
  };
  return goog.array.map(e, function(a) {
    var b = new goog.iter.Iterator;
    b.next = function() {
      goog.array.isEmpty(a) && f();
      goog.asserts.assert(!goog.array.isEmpty(a));
      return a.shift();
    };
    return b;
  });
};
goog.iter.enumerate = function(a, b) {
  return goog.iter.zip(goog.iter.count(b), a);
};
goog.iter.limit = function(a, b) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  var c = goog.iter.toIterator(a), d = new goog.iter.Iterator, e = b;
  d.next = function() {
    if (0 < e--) {
      return c.next();
    }
    throw goog.iter.StopIteration;
  };
  return d;
};
goog.iter.consume = function(a, b) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  for (var c = goog.iter.toIterator(a);0 < b--;) {
    goog.iter.nextOrValue(c, null);
  }
  return c;
};
goog.iter.slice = function(a, b, c) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  a = goog.iter.consume(a, b);
  goog.isNumber(c) && (goog.asserts.assert(goog.math.isInt(c) && c >= b), a = goog.iter.limit(a, c - b));
  return a;
};
goog.iter.hasDuplicates_ = function(a) {
  var b = [];
  goog.array.removeDuplicates(a, b);
  return a.length != b.length;
};
goog.iter.permutations = function(a, b) {
  var c = goog.iter.toArray(a), d = goog.isNumber(b) ? b : c.length, c = goog.array.repeat(c, d), c = goog.iter.product.apply(void 0, c);
  return goog.iter.filter(c, function(a) {
    return !goog.iter.hasDuplicates_(a);
  });
};
goog.iter.combinations = function(a, b) {
  function c(a) {
    return d[a];
  }
  var d = goog.iter.toArray(a), e = goog.iter.range(d.length), e = goog.iter.permutations(e, b), f = goog.iter.filter(e, function(a) {
    return goog.array.isSorted(a);
  }), e = new goog.iter.Iterator;
  e.next = function() {
    return goog.array.map(f.next(), c);
  };
  return e;
};
goog.iter.combinationsWithReplacement = function(a, b) {
  function c(a) {
    return d[a];
  }
  var d = goog.iter.toArray(a), e = goog.array.range(d.length), e = goog.array.repeat(e, b), e = goog.iter.product.apply(void 0, e), f = goog.iter.filter(e, function(a) {
    return goog.array.isSorted(a);
  }), e = new goog.iter.Iterator;
  e.next = function() {
    return goog.array.map(f.next(), c);
  };
  return e;
};
goog.structs = {};
goog.structs.Map = function(a, b) {
  this.map_ = {};
  this.keys_ = [];
  this.version_ = this.count_ = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1]);
    }
  } else {
    a && this.addAll(a);
  }
};
goog.structs.Map.prototype.getCount = function() {
  return this.count_;
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  for (var a = [], b = 0;b < this.keys_.length;b++) {
    a.push(this.map_[this.keys_[b]]);
  }
  return a;
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat();
};
goog.structs.Map.prototype.containsKey = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a);
};
goog.structs.Map.prototype.containsValue = function(a) {
  for (var b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    if (goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) {
      return !0;
    }
  }
  return !1;
};
goog.structs.Map.prototype.equals = function(a, b) {
  if (this === a) {
    return !0;
  }
  if (this.count_ != a.getCount()) {
    return !1;
  }
  var c = b || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for (var d, e = 0;d = this.keys_[e];e++) {
    if (!c(this.get(d), a.get(d))) {
      return !1;
    }
  }
  return !0;
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b;
};
goog.structs.Map.prototype.isEmpty = function() {
  return 0 == this.count_;
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0;
};
goog.structs.Map.prototype.remove = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1;
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  if (this.count_ != this.keys_.length) {
    for (var a = 0, b = 0;a < this.keys_.length;) {
      var c = this.keys_[a];
      goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
      a++;
    }
    this.keys_.length = b;
  }
  if (this.count_ != this.keys_.length) {
    for (var d = {}, b = a = 0;a < this.keys_.length;) {
      c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++;
    }
    this.keys_.length = b;
  }
};
goog.structs.Map.prototype.get = function(a, b) {
  return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b;
};
goog.structs.Map.prototype.set = function(a, b) {
  goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
  this.map_[a] = b;
};
goog.structs.Map.prototype.addAll = function(a) {
  var b;
  a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
  for (var c = 0;c < b.length;c++) {
    this.set(b[c], a[c]);
  }
};
goog.structs.Map.prototype.forEach = function(a, b) {
  for (var c = this.getKeys(), d = 0;d < c.length;d++) {
    var e = c[d], f = this.get(e);
    a.call(b, f, e, this);
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this);
};
goog.structs.Map.prototype.transpose = function() {
  for (var a = new goog.structs.Map, b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    a.set(this.map_[c], c);
  }
  return a;
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  for (var a = {}, b = 0;b < this.keys_.length;b++) {
    var c = this.keys_[b];
    a[c] = this.map_[c];
  }
  return a;
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(!0);
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(!1);
};
goog.structs.Map.prototype.__iterator__ = function(a) {
  this.cleanupKeysArray_();
  var b = 0, c = this.version_, d = this, e = new goog.iter.Iterator;
  e.next = function() {
    if (c != d.version_) {
      throw Error("The map has changed since the iterator was created");
    }
    if (b >= d.keys_.length) {
      throw goog.iter.StopIteration;
    }
    var e = d.keys_[b++];
    return a ? e : d.map_[e];
  };
  return e;
};
goog.structs.Map.hasKey_ = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
goog.structs.getCount = function(a) {
  return a.getCount && "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a);
};
goog.structs.getValues = function(a) {
  if (a.getValues && "function" == typeof a.getValues) {
    return a.getValues();
  }
  if (goog.isString(a)) {
    return a.split("");
  }
  if (goog.isArrayLike(a)) {
    for (var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d]);
    }
    return b;
  }
  return goog.object.getValues(a);
};
goog.structs.getKeys = function(a) {
  if (a.getKeys && "function" == typeof a.getKeys) {
    return a.getKeys();
  }
  if (!a.getValues || "function" != typeof a.getValues) {
    if (goog.isArrayLike(a) || goog.isString(a)) {
      var b = [];
      a = a.length;
      for (var c = 0;c < a;c++) {
        b.push(c);
      }
      return b;
    }
    return goog.object.getKeys(a);
  }
};
goog.structs.contains = function(a, b) {
  return a.contains && "function" == typeof a.contains ? a.contains(b) : a.containsValue && "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b);
};
goog.structs.isEmpty = function(a) {
  return a.isEmpty && "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a);
};
goog.structs.clear = function(a) {
  a.clear && "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a);
};
goog.structs.forEach = function(a, b, c) {
  if (a.forEach && "function" == typeof a.forEach) {
    a.forEach(b, c);
  } else {
    if (goog.isArrayLike(a) || goog.isString(a)) {
      goog.array.forEach(a, b, c);
    } else {
      for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
        b.call(c, e[g], d && d[g], a);
      }
    }
  }
};
goog.structs.filter = function(a, b, c) {
  if ("function" == typeof a.filter) {
    return a.filter(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.filter(a, b, c);
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if (e) {
    d = {};
    for (var h = 0;h < g;h++) {
      b.call(c, f[h], e[h], a) && (d[e[h]] = f[h]);
    }
  } else {
    for (d = [], h = 0;h < g;h++) {
      b.call(c, f[h], void 0, a) && d.push(f[h]);
    }
  }
  return d;
};
goog.structs.map = function(a, b, c) {
  if ("function" == typeof a.map) {
    return a.map(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.map(a, b, c);
  }
  var d, e = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if (e) {
    d = {};
    for (var h = 0;h < g;h++) {
      d[e[h]] = b.call(c, f[h], e[h], a);
    }
  } else {
    for (d = [], h = 0;h < g;h++) {
      d[h] = b.call(c, f[h], void 0, a);
    }
  }
  return d;
};
goog.structs.some = function(a, b, c) {
  if ("function" == typeof a.some) {
    return a.some(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.some(a, b, c);
  }
  for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if (b.call(c, e[g], d && d[g], a)) {
      return !0;
    }
  }
  return !1;
};
goog.structs.every = function(a, b, c) {
  if ("function" == typeof a.every) {
    return a.every(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.every(a, b, c);
  }
  for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0;g < f;g++) {
    if (!b.call(c, e[g], d && d[g], a)) {
      return !1;
    }
  }
  return !0;
};
goog.Uri = function(a, b) {
  this.domain_ = this.userInfo_ = this.scheme_ = "";
  this.port_ = null;
  this.fragment_ = this.path_ = "";
  this.ignoreCase_ = this.isReadOnly_ = !1;
  var c;
  a instanceof goog.Uri ? (this.ignoreCase_ = goog.isDef(b) ? b : a.getIgnoreCase(), this.setScheme(a.getScheme()), this.setUserInfo(a.getUserInfo()), this.setDomain(a.getDomain()), this.setPort(a.getPort()), this.setPath(a.getPath()), this.setQueryData(a.getQueryData().clone()), this.setFragment(a.getFragment())) : a && (c = goog.uri.utils.split(String(a))) ? (this.ignoreCase_ = !!b, this.setScheme(c[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo(c[goog.uri.utils.ComponentIndex.USER_INFO] || 
  "", !0), this.setDomain(c[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(c[goog.uri.utils.ComponentIndex.PORT]), this.setPath(c[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData(c[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(c[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.ignoreCase_ = !!b, this.queryData_ = new goog.Uri.QueryData(null, null, this.ignoreCase_));
};
goog.Uri.preserveParameterTypesCompatibilityFlag = !1;
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.toString = function() {
  var a = [], b = this.getScheme();
  b && a.push(goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), ":");
  var c = this.getDomain();
  if (c || "file" == b) {
    a.push("//"), (b = this.getUserInfo()) && a.push(goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), "@"), a.push(goog.Uri.removeDoubleEncoding_(goog.string.urlEncode(c))), c = this.getPort(), null != c && a.push(":", String(c));
  }
  if (c = this.getPath()) {
    this.hasDomain() && "/" != c.charAt(0) && a.push("/"), a.push(goog.Uri.encodeSpecialChars_(c, "/" == c.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, !0));
  }
  (c = this.getEncodedQuery()) && a.push("?", c);
  (c = this.getFragment()) && a.push("#", goog.Uri.encodeSpecialChars_(c, goog.Uri.reDisallowedInFragment_));
  return a.join("");
};
goog.Uri.prototype.resolve = function(a) {
  var b = this.clone(), c = a.hasScheme();
  c ? b.setScheme(a.getScheme()) : c = a.hasUserInfo();
  c ? b.setUserInfo(a.getUserInfo()) : c = a.hasDomain();
  c ? b.setDomain(a.getDomain()) : c = a.hasPort();
  var d = a.getPath();
  if (c) {
    b.setPort(a.getPort());
  } else {
    if (c = a.hasPath()) {
      if ("/" != d.charAt(0)) {
        if (this.hasDomain() && !this.hasPath()) {
          d = "/" + d;
        } else {
          var e = b.getPath().lastIndexOf("/");
          -1 != e && (d = b.getPath().substr(0, e + 1) + d);
        }
      }
      d = goog.Uri.removeDotSegments(d);
    }
  }
  c ? b.setPath(d) : c = a.hasQuery();
  c ? b.setQueryData(a.getDecodedQuery()) : c = a.hasFragment();
  c && b.setFragment(a.getFragment());
  return b;
};
goog.Uri.prototype.clone = function() {
  return new goog.Uri(this);
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_;
};
goog.Uri.prototype.setScheme = function(a, b) {
  this.enforceReadOnly();
  if (this.scheme_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a) {
    this.scheme_ = this.scheme_.replace(/:$/, "");
  }
  return this;
};
goog.Uri.prototype.hasScheme = function() {
  return !!this.scheme_;
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_;
};
goog.Uri.prototype.setUserInfo = function(a, b) {
  this.enforceReadOnly();
  this.userInfo_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this;
};
goog.Uri.prototype.hasUserInfo = function() {
  return !!this.userInfo_;
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_;
};
goog.Uri.prototype.setDomain = function(a, b) {
  this.enforceReadOnly();
  this.domain_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a;
  return this;
};
goog.Uri.prototype.hasDomain = function() {
  return !!this.domain_;
};
goog.Uri.prototype.getPort = function() {
  return this.port_;
};
goog.Uri.prototype.setPort = function(a) {
  this.enforceReadOnly();
  if (a) {
    a = Number(a);
    if (isNaN(a) || 0 > a) {
      throw Error("Bad port number " + a);
    }
    this.port_ = a;
  } else {
    this.port_ = null;
  }
  return this;
};
goog.Uri.prototype.hasPort = function() {
  return null != this.port_;
};
goog.Uri.prototype.getPath = function() {
  return this.path_;
};
goog.Uri.prototype.setPath = function(a, b) {
  this.enforceReadOnly();
  this.path_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a;
  return this;
};
goog.Uri.prototype.hasPath = function() {
  return !!this.path_;
};
goog.Uri.prototype.hasQuery = function() {
  return "" !== this.queryData_.toString();
};
goog.Uri.prototype.setQueryData = function(a, b) {
  this.enforceReadOnly();
  a instanceof goog.Uri.QueryData ? (this.queryData_ = a, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (b || (a = goog.Uri.encodeSpecialChars_(a, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(a, null, this.ignoreCase_));
  return this;
};
goog.Uri.prototype.setQuery = function(a, b) {
  return this.setQueryData(a, b);
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString();
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString();
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_;
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery();
};
goog.Uri.prototype.setParameterValue = function(a, b) {
  this.enforceReadOnly();
  this.queryData_.set(a, b);
  return this;
};
goog.Uri.prototype.setParameterValues = function(a, b) {
  this.enforceReadOnly();
  goog.isArray(b) || (b = [String(b)]);
  this.queryData_.setValues(a, b);
  return this;
};
goog.Uri.prototype.getParameterValues = function(a) {
  return this.queryData_.getValues(a);
};
goog.Uri.prototype.getParameterValue = function(a) {
  return this.queryData_.get(a);
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_;
};
goog.Uri.prototype.setFragment = function(a, b) {
  this.enforceReadOnly();
  this.fragment_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
  return this;
};
goog.Uri.prototype.hasFragment = function() {
  return !!this.fragment_;
};
goog.Uri.prototype.hasSameDomainAs = function(a) {
  return (!this.hasDomain() && !a.hasDomain() || this.getDomain() == a.getDomain()) && (!this.hasPort() && !a.hasPort() || this.getPort() == a.getPort());
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this;
};
goog.Uri.prototype.removeParameter = function(a) {
  this.enforceReadOnly();
  this.queryData_.remove(a);
  return this;
};
goog.Uri.prototype.setReadOnly = function(a) {
  this.isReadOnly_ = a;
  return this;
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_;
};
goog.Uri.prototype.enforceReadOnly = function() {
  if (this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(a) {
  this.ignoreCase_ = a;
  this.queryData_ && this.queryData_.setIgnoreCase(a);
  return this;
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_;
};
goog.Uri.parse = function(a, b) {
  return a instanceof goog.Uri ? a.clone() : new goog.Uri(a, b);
};
goog.Uri.create = function(a, b, c, d, e, f, g, h) {
  h = new goog.Uri(null, h);
  a && h.setScheme(a);
  b && h.setUserInfo(b);
  c && h.setDomain(c);
  d && h.setPort(d);
  e && h.setPath(e);
  f && h.setQueryData(f);
  g && h.setFragment(g);
  return h;
};
goog.Uri.resolve = function(a, b) {
  a instanceof goog.Uri || (a = goog.Uri.parse(a));
  b instanceof goog.Uri || (b = goog.Uri.parse(b));
  return a.resolve(b);
};
goog.Uri.removeDotSegments = function(a) {
  if (".." == a || "." == a) {
    return "";
  }
  if (goog.string.contains(a, "./") || goog.string.contains(a, "/.")) {
    var b = goog.string.startsWith(a, "/");
    a = a.split("/");
    for (var c = [], d = 0;d < a.length;) {
      var e = a[d++];
      "." == e ? b && d == a.length && c.push("") : ".." == e ? ((1 < c.length || 1 == c.length && "" != c[0]) && c.pop(), b && d == a.length && c.push("")) : (c.push(e), b = !0);
    }
    return c.join("/");
  }
  return a;
};
goog.Uri.decodeOrEmpty_ = function(a, b) {
  return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
};
goog.Uri.encodeSpecialChars_ = function(a, b, c) {
  return goog.isString(a) ? (a = encodeURI(a).replace(b, goog.Uri.encodeChar_), c && (a = goog.Uri.removeDoubleEncoding_(a)), a) : null;
};
goog.Uri.encodeChar_ = function(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
};
goog.Uri.removeDoubleEncoding_ = function(a) {
  return a.replace(/%25([0-9a-fA-F]{2})/g, "%$1");
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT];
};
goog.Uri.QueryData = function(a, b, c) {
  this.count_ = this.keyMap_ = null;
  this.encodedQuery_ = a || null;
  this.ignoreCase_ = !!c;
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if (!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
    var a = this;
    goog.uri.utils.parseQueryData(this.encodedQuery_, function(b, c) {
      a.add(goog.string.urlDecode(b), c);
    });
  }
};
goog.Uri.QueryData.createFromMap = function(a, b, c) {
  b = goog.structs.getKeys(a);
  if ("undefined" == typeof b) {
    throw Error("Keys are undefined");
  }
  c = new goog.Uri.QueryData(null, null, c);
  a = goog.structs.getValues(a);
  for (var d = 0;d < b.length;d++) {
    var e = b[d], f = a[d];
    goog.isArray(f) ? c.setValues(e, f) : c.add(e, f);
  }
  return c;
};
goog.Uri.QueryData.createFromKeysValues = function(a, b, c, d) {
  if (a.length != b.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  c = new goog.Uri.QueryData(null, null, d);
  for (d = 0;d < a.length;d++) {
    c.add(a[d], b[d]);
  }
  return c;
};
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_;
};
goog.Uri.QueryData.prototype.add = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  var c = this.keyMap_.get(a);
  c || this.keyMap_.set(a, c = []);
  c.push(b);
  this.count_ = goog.asserts.assertNumber(this.count_) + 1;
  return this;
};
goog.Uri.QueryData.prototype.remove = function(a) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  return this.keyMap_.containsKey(a) ? (this.invalidateCache_(), this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(a).length, this.keyMap_.remove(a)) : !1;
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  this.keyMap_ = null;
  this.count_ = 0;
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return 0 == this.count_;
};
goog.Uri.QueryData.prototype.containsKey = function(a) {
  this.ensureKeyMapInitialized_();
  a = this.getKeyName_(a);
  return this.keyMap_.containsKey(a);
};
goog.Uri.QueryData.prototype.containsValue = function(a) {
  var b = this.getValues();
  return goog.array.contains(b, a);
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  for (var a = this.keyMap_.getValues(), b = this.keyMap_.getKeys(), c = [], d = 0;d < b.length;d++) {
    for (var e = a[d], f = 0;f < e.length;f++) {
      c.push(b[d]);
    }
  }
  return c;
};
goog.Uri.QueryData.prototype.getValues = function(a) {
  this.ensureKeyMapInitialized_();
  var b = [];
  if (goog.isString(a)) {
    this.containsKey(a) && (b = goog.array.concat(b, this.keyMap_.get(this.getKeyName_(a))));
  } else {
    a = this.keyMap_.getValues();
    for (var c = 0;c < a.length;c++) {
      b = goog.array.concat(b, a[c]);
    }
  }
  return b;
};
goog.Uri.QueryData.prototype.set = function(a, b) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  a = this.getKeyName_(a);
  this.containsKey(a) && (this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(a).length);
  this.keyMap_.set(a, [b]);
  this.count_ = goog.asserts.assertNumber(this.count_) + 1;
  return this;
};
goog.Uri.QueryData.prototype.get = function(a, b) {
  var c = a ? this.getValues(a) : [];
  return goog.Uri.preserveParameterTypesCompatibilityFlag ? 0 < c.length ? c[0] : b : 0 < c.length ? String(c[0]) : b;
};
goog.Uri.QueryData.prototype.setValues = function(a, b) {
  this.remove(a);
  0 < b.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_(a), goog.array.clone(b)), this.count_ = goog.asserts.assertNumber(this.count_) + b.length);
};
goog.Uri.QueryData.prototype.toString = function() {
  if (this.encodedQuery_) {
    return this.encodedQuery_;
  }
  if (!this.keyMap_) {
    return "";
  }
  for (var a = [], b = this.keyMap_.getKeys(), c = 0;c < b.length;c++) {
    for (var d = b[c], e = goog.string.urlEncode(d), d = this.getValues(d), f = 0;f < d.length;f++) {
      var g = e;
      "" !== d[f] && (g += "=" + goog.string.urlEncode(d[f]));
      a.push(g);
    }
  }
  return this.encodedQuery_ = a.join("&");
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  return goog.Uri.decodeOrEmpty_(this.toString());
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  this.encodedQuery_ = null;
};
goog.Uri.QueryData.prototype.filterKeys = function(a) {
  this.ensureKeyMapInitialized_();
  this.keyMap_.forEach(function(b, c) {
    goog.array.contains(a, c) || this.remove(c);
  }, this);
  return this;
};
goog.Uri.QueryData.prototype.clone = function() {
  var a = new goog.Uri.QueryData;
  a.encodedQuery_ = this.encodedQuery_;
  this.keyMap_ && (a.keyMap_ = this.keyMap_.clone(), a.count_ = this.count_);
  return a;
};
goog.Uri.QueryData.prototype.getKeyName_ = function(a) {
  a = String(a);
  this.ignoreCase_ && (a = a.toLowerCase());
  return a;
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(a) {
  a && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), this.keyMap_.forEach(function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), this.setValues(d, a));
  }, this));
  this.ignoreCase_ = a;
};
goog.Uri.QueryData.prototype.extend = function(a) {
  for (var b = 0;b < arguments.length;b++) {
    goog.structs.forEach(arguments[b], function(a, b) {
      this.add(b, a);
    }, this);
  }
};
goog.net.Jsonp = function(a, b) {
  this.uri_ = new goog.Uri(a);
  this.callbackParamName_ = b ? b : "callback";
  this.timeout_ = 5E3;
  this.nonce_ = "";
};
goog.net.Jsonp.CALLBACKS = "_callbacks_";
goog.net.Jsonp.scriptCounter_ = 0;
goog.net.Jsonp.getCallbackId_ = function(a) {
  return goog.net.Jsonp.CALLBACKS + "__" + a;
};
goog.net.Jsonp.prototype.setRequestTimeout = function(a) {
  this.timeout_ = a;
};
goog.net.Jsonp.prototype.getRequestTimeout = function() {
  return this.timeout_;
};
goog.net.Jsonp.prototype.setNonce = function(a) {
  this.nonce_ = a;
};
goog.net.Jsonp.prototype.send = function(a, b, c, d) {
  a = a || null;
  d = d || "_" + (goog.net.Jsonp.scriptCounter_++).toString(36) + goog.now().toString(36);
  var e = goog.net.Jsonp.getCallbackId_(d), f = this.uri_.clone();
  a && goog.net.Jsonp.addPayloadToUri_(a, f);
  b && (b = goog.net.Jsonp.newReplyHandler_(d, b), goog.global[e] = b, f.setParameterValues(this.callbackParamName_, e));
  b = {timeout:this.timeout_, cleanupWhenDone:!0};
  this.nonce_ && (b.attributes = {nonce:this.nonce_});
  b = goog.net.jsloader.load(f.toString(), b);
  c = goog.net.Jsonp.newErrorHandler_(d, a, c);
  b.addErrback(c);
  return {id_:d, deferred_:b};
};
goog.net.Jsonp.prototype.cancel = function(a) {
  a && (a.deferred_ && a.deferred_.cancel(), a.id_ && goog.net.Jsonp.cleanup_(a.id_, !1));
};
goog.net.Jsonp.newErrorHandler_ = function(a, b, c) {
  return function() {
    goog.net.Jsonp.cleanup_(a, !1);
    c && c(b);
  };
};
goog.net.Jsonp.newReplyHandler_ = function(a, b) {
  return function(c) {
    goog.net.Jsonp.cleanup_(a, !0);
    b.apply(void 0, arguments);
  };
};
goog.net.Jsonp.cleanup_ = function(a, b) {
  var c = goog.net.Jsonp.getCallbackId_(a);
  if (goog.global[c]) {
    if (b) {
      try {
        delete goog.global[c];
      } catch (d) {
        goog.global[c] = void 0;
      }
    } else {
      goog.global[c] = goog.nullFunction;
    }
  }
};
goog.net.Jsonp.addPayloadToUri_ = function(a, b) {
  for (var c in a) {
    a.hasOwnProperty && !a.hasOwnProperty(c) || b.setParameterValues(c, a[c]);
  }
  return b;
};
goog.net.Cookies = function(a) {
  this.document_ = a || {cookie:""};
};
goog.net.Cookies.MAX_COOKIE_LENGTH = 3950;
goog.net.Cookies.SPLIT_RE_ = /\s*;\s*/;
goog.net.Cookies.prototype.isEnabled = function() {
  return navigator.cookieEnabled;
};
goog.net.Cookies.prototype.isValidName = function(a) {
  return !/[;=\s]/.test(a);
};
goog.net.Cookies.prototype.isValidValue = function(a) {
  return !/[;\r\n]/.test(a);
};
goog.net.Cookies.prototype.set = function(a, b, c, d, e, f) {
  if (!this.isValidName(a)) {
    throw Error('Invalid cookie name "' + a + '"');
  }
  if (!this.isValidValue(b)) {
    throw Error('Invalid cookie value "' + b + '"');
  }
  goog.isDef(c) || (c = -1);
  e = e ? ";domain=" + e : "";
  d = d ? ";path=" + d : "";
  f = f ? ";secure" : "";
  c = 0 > c ? "" : 0 == c ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(goog.now() + 1E3 * c)).toUTCString();
  this.setCookie_(a + "=" + b + e + d + c + f);
};
goog.net.Cookies.prototype.get = function(a, b) {
  for (var c = a + "=", d = this.getParts_(), e = 0, f;f = d[e];e++) {
    if (0 == f.lastIndexOf(c, 0)) {
      return f.substr(c.length);
    }
    if (f == a) {
      return "";
    }
  }
  return b;
};
goog.net.Cookies.prototype.remove = function(a, b, c) {
  var d = this.containsKey(a);
  this.set(a, "", 0, b, c);
  return d;
};
goog.net.Cookies.prototype.getKeys = function() {
  return this.getKeyValues_().keys;
};
goog.net.Cookies.prototype.getValues = function() {
  return this.getKeyValues_().values;
};
goog.net.Cookies.prototype.isEmpty = function() {
  return !this.getCookie_();
};
goog.net.Cookies.prototype.getCount = function() {
  return this.getCookie_() ? this.getParts_().length : 0;
};
goog.net.Cookies.prototype.containsKey = function(a) {
  return goog.isDef(this.get(a));
};
goog.net.Cookies.prototype.containsValue = function(a) {
  for (var b = this.getKeyValues_().values, c = 0;c < b.length;c++) {
    if (b[c] == a) {
      return !0;
    }
  }
  return !1;
};
goog.net.Cookies.prototype.clear = function() {
  for (var a = this.getKeyValues_().keys, b = a.length - 1;0 <= b;b--) {
    this.remove(a[b]);
  }
};
goog.net.Cookies.prototype.setCookie_ = function(a) {
  this.document_.cookie = a;
};
goog.net.Cookies.prototype.getCookie_ = function() {
  return this.document_.cookie;
};
goog.net.Cookies.prototype.getParts_ = function() {
  return (this.getCookie_() || "").split(goog.net.Cookies.SPLIT_RE_);
};
goog.net.Cookies.prototype.getKeyValues_ = function() {
  for (var a = this.getParts_(), b = [], c = [], d, e, f = 0;e = a[f];f++) {
    d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
  }
  return {keys:b, values:c};
};
goog.net.cookies = new goog.net.Cookies("undefined" == typeof document ? null : document);
goog.net.cookies.MAX_COOKIE_LENGTH = goog.net.Cookies.MAX_COOKIE_LENGTH;
mob.button.DialerState_ = {IDLE:0, REQUESTING:1, DIAL_WHEN_REQUEST_COMPLETES:2};
mob.button.Dialer = function(a, b, c, d) {
  this.fallbackPhoneNumber_ = b;
  this.googleVoicePhoneNumber_ = null;
  this.conversionId_ = c;
  this.conversionLabel_ = d;
  this.cookies_ = new goog.net.Cookies(document);
  this.jsonpTime_ = null;
  this.dialState_ = mob.button.DialerState_.IDLE;
  mob.button.AbstractButton.call(this, mob.util.ElementId.DIALER_BUTTON, mob.button.Dialer.ICON_, a, mob.button.Dialer.LABEL_);
};
goog.inherits(mob.button.Dialer, mob.button.AbstractButton);
mob.button.Dialer.ICON_ = "R0lGODlhYABgAPAAAAAAAAAAACH5BAEAAAEAIf8LSW1hZ2VNYWdpY2sHZ2FtbWE9MQAsAAAAAGAAYAAAAv6Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/KsAvaN5zcd6r7P8/yGuSCHiAQYN0niUtMcPjPR3xRTBV4tWd2W28V9K2HxeFI2nyNp21rSVr4h8Tm9bX/E5fnFvt9QB+iHN6ggaIiAmHiQxngY9giZJTkZVUnYhJmJtMmQ5PnpFMrpRSqqdWpZpFqq1tpoBZsgNRsraxtQmzvKu2v7O9sLHAw7bHzc2ulbrLpM3IzGegV6UW10Le0Ik3232KLp/cfdvfoNHm5+7pJ+u7dDc2nwbhpPv81zX/akT8nf324JwGdTBkbDZnDamITw3jDsY9BQP0b3MK171IVZqhBcHDt6/AgypMiRJEuaDFUAADs=";
mob.button.Dialer.LABEL_ = "CALL";
mob.button.Dialer.WCM_COOKIE_ = "psgwcm";
mob.button.Dialer.MAX_WCM_COOKIE_LIFETIME_SEC_ = 7776E3;
mob.button.Dialer.CONVERSION_HANDLER_ = "https://www.googleadservices.com/pagead/conversion/";
mob.button.Dialer.prototype.createButton = function() {
  mob.button.Dialer.superClass_.createButton.call(this);
  (this.googleVoicePhoneNumber_ = this.getPhoneNumberFromCookie_()) || this.requestPhoneNumber_();
};
mob.button.Dialer.prototype.clickHandler = function(a) {
  mob.util.sendBeaconEvent(mob.util.BeaconEvents.PHONE_BUTTON);
  this.dialState_ == mob.button.DialerState_.IDLE ? this.dialPhone_() : this.dialState_ = mob.button.DialerState_.DIAL_WHEN_REQUEST_COMPLETES;
};
mob.button.Dialer.prototype.requestPhoneNumber_ = function() {
  if (this.dialState_ == mob.button.DialerState_.IDLE) {
    var a = this.constructRequestPhoneNumberUrl_();
    a && (this.debugAlert_("requesting dynamic phone number: " + a), a = new goog.net.Jsonp(a), a.setRequestTimeout(2E3), this.jsonpTime_ = goog.now(), this.dialState_ = mob.button.DialerState_.REQUESTING, a.send(null, goog.bind(this.receivePhoneNumber_, this, !0), goog.bind(this.receivePhoneNumber_, this, !1)));
  }
};
mob.button.Dialer.prototype.constructRequestPhoneNumberUrl_ = function() {
  if (this.conversionLabel_ && this.conversionId_) {
    var a = window.encodeURIComponent(this.conversionLabel_);
    return mob.button.Dialer.CONVERSION_HANDLER_ + window.encodeURIComponent(this.conversionId_) + "/wcm?cl=" + a + "&fb=" + window.encodeURIComponent(this.fallbackPhoneNumber_);
  }
  return null;
};
mob.button.Dialer.prototype.dialPhone_ = function() {
  var a, b;
  this.googleVoicePhoneNumber_ ? (a = this.googleVoicePhoneNumber_, b = mob.util.BeaconEvents.CALL_GV_NUMBER) : (a = this.fallbackPhoneNumber_, b = mob.util.BeaconEvents.CALL_FALLBACK_NUMBER);
  this.debugAlert_("Dialing phone: " + a + "(" + b + ")");
  mob.util.sendBeaconEvent(b, function() {
    goog.global.location = "tel:" + a;
  });
};
mob.button.Dialer.prototype.backoffErrorCode_ = function(a) {
  if (a) {
    switch(a) {
      case 300:
        return "temporary-error";
      case 86400:
        return "no-ad-click";
      case 86402:
        return "not-tracked";
    }
    return "error" + a;
  }
  return null;
};
mob.button.Dialer.prototype.receivePhoneNumber_ = function(a, b) {
  var c = goog.now() - this.jsonpTime_, d = b && b.wcm, e = d && d.mobile_number, f = this.backoffErrorCode_(d && d.backoff);
  mob.util.sendBeaconEvent(mob.util.BeaconEvents.CALL_CONVERSION_RESPONSE, null, "&s=" + a.toString() + "&t=" + c + "&gv=" + (!(!e || e == this.fallbackPhoneNumber_)).toString() + (f ? "&err=" + f : ""));
  e && e != this.fallbackPhoneNumber_ && (c = {expires:d.expires, formatted_number:d.formatted_number, mobile_number:e, clabel:this.conversionLabel_, fallback:this.fallbackPhoneNumber_}, c = goog.json.serialize(c), this.debugAlert_("saving phoneNumber in cookie: " + c), (d = parseInt(d.expires, 10)) ? (d -= Math.floor(goog.now() / 1E3), d = Math.min(d, mob.button.Dialer.MAX_WCM_COOKIE_LIFETIME_SEC_)) : d = mob.button.Dialer.MAX_WCM_COOKIE_LIFETIME_SEC_, this.cookies_.set(mob.button.Dialer.WCM_COOKIE_, 
  window.encodeURIComponent(c), d, "/"), this.googleVoicePhoneNumber_ = e);
  f && this.debugAlert_("WCM request: " + f);
  this.dialState_ == mob.button.DialerState_.DIAL_WHEN_REQUEST_COMPLETES && this.dialPhone_();
  this.dialState_ = mob.button.DialerState_.IDLE;
};
mob.button.Dialer.prototype.getPhoneNumberFromCookie_ = function() {
  var a = this.cookies_.get(mob.button.Dialer.WCM_COOKIE_);
  if (a && (a = goog.json.parse(window.decodeURIComponent(a)), a.fallback == this.fallbackPhoneNumber_ && a.clabel == this.conversionLabel_)) {
    return a = a.mobile_number, this.debugAlert_("found phone number in cookie: " + a), a;
  }
  this.debugAlert_("no phone number found in cookie");
  return null;
};
mob.button.Dialer.prototype.debugAlert_ = function(a) {
  window.psDebugMode && window.alert(a);
};
goog.structs.Collection = function() {
};
goog.structs.Set = function(a) {
  this.map_ = new goog.structs.Map;
  a && this.addAll(a);
};
goog.structs.Set.getKey_ = function(a) {
  var b = typeof a;
  return "object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a;
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount();
};
goog.structs.Set.prototype.add = function(a) {
  this.map_.set(goog.structs.Set.getKey_(a), a);
};
goog.structs.Set.prototype.addAll = function(a) {
  a = goog.structs.getValues(a);
  for (var b = a.length, c = 0;c < b;c++) {
    this.add(a[c]);
  }
};
goog.structs.Set.prototype.removeAll = function(a) {
  a = goog.structs.getValues(a);
  for (var b = a.length, c = 0;c < b;c++) {
    this.remove(a[c]);
  }
};
goog.structs.Set.prototype.remove = function(a) {
  return this.map_.remove(goog.structs.Set.getKey_(a));
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear();
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty();
};
goog.structs.Set.prototype.contains = function(a) {
  return this.map_.containsKey(goog.structs.Set.getKey_(a));
};
goog.structs.Set.prototype.containsAll = function(a) {
  return goog.structs.every(a, this.contains, this);
};
goog.structs.Set.prototype.intersection = function(a) {
  var b = new goog.structs.Set;
  a = goog.structs.getValues(a);
  for (var c = 0;c < a.length;c++) {
    var d = a[c];
    this.contains(d) && b.add(d);
  }
  return b;
};
goog.structs.Set.prototype.difference = function(a) {
  var b = this.clone();
  b.removeAll(a);
  return b;
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues();
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this);
};
goog.structs.Set.prototype.equals = function(a) {
  return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a);
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
  var b = goog.structs.getCount(a);
  if (this.getCount() > b) {
    return !1;
  }
  !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
  return goog.structs.every(this, function(b) {
    return goog.structs.contains(a, b);
  });
};
goog.structs.Set.prototype.__iterator__ = function(a) {
  return this.map_.__iterator__(!1);
};
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function() {
  return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null;
};
goog.dom.vendor.getVendorPrefix = function() {
  return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null;
};
goog.dom.vendor.getPrefixedPropertyName = function(a, b) {
  if (b && a in b) {
    return a;
  }
  var c = goog.dom.vendor.getVendorJsPrefix();
  return c ? (c = c.toLowerCase(), c += goog.string.toTitleCase(a), !goog.isDef(b) || c in b ? c : null) : null;
};
goog.dom.vendor.getPrefixedEventType = function(a) {
  return ((goog.dom.vendor.getVendorJsPrefix() || "") + a).toLowerCase();
};
goog.html.legacyconversions = {};
goog.html.legacyconversions.safeHtmlFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(a, null);
};
goog.html.legacyconversions.safeStyleFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.legacyconversions.safeStyleSheetFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.legacyconversions.safeUrlFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.legacyconversions.trustedResourceUrlFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.legacyconversions.reportCallback_ = goog.nullFunction;
goog.html.legacyconversions.setReportCallback = function(a) {
  goog.html.legacyconversions.reportCallback_ = a;
};
goog.reflect = {};
goog.reflect.object = function(a, b) {
  return b;
};
goog.reflect.objectProperty = function(a, b) {
  return a;
};
goog.reflect.sinkValue = function(a) {
  goog.reflect.sinkValue[" "](a);
  return a;
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, b) {
  try {
    return goog.reflect.sinkValue(a[b]), !0;
  } catch (c) {
  }
  return !1;
};
goog.reflect.cache = function(a, b, c, d) {
  d = d ? d(b) : b;
  return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b);
};
goog.math.IRect = function() {
};
goog.math.Rect = function(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d;
};
goog.math.Rect.prototype.clone = function() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height);
};
goog.math.Rect.prototype.toBox = function() {
  return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left);
};
goog.math.Rect.createFromPositionAndSize = function(a, b) {
  return new goog.math.Rect(a.x, a.y, b.width, b.height);
};
goog.math.Rect.createFromBox = function(a) {
  return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top);
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
  return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
});
goog.math.Rect.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1;
};
goog.math.Rect.prototype.intersection = function(a) {
  var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width, a.left + a.width);
  if (b <= c) {
    var d = Math.max(this.top, a.top);
    a = Math.min(this.top + this.height, a.top + a.height);
    if (d <= a) {
      return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0;
    }
  }
  return !1;
};
goog.math.Rect.intersection = function(a, b) {
  var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left + b.width);
  if (c <= d) {
    var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top + b.height);
    if (e <= f) {
      return new goog.math.Rect(c, e, d - c, f - e);
    }
  }
  return null;
};
goog.math.Rect.intersects = function(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
};
goog.math.Rect.prototype.intersects = function(a) {
  return goog.math.Rect.intersects(this, a);
};
goog.math.Rect.difference = function(a, b) {
  var c = goog.math.Rect.intersection(a, b);
  if (!c || !c.height || !c.width) {
    return [a.clone()];
  }
  var c = [], d = a.top, e = a.height, f = a.left + a.width, g = a.top + a.height, h = b.left + b.width, k = b.top + b.height;
  b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top);
  k < g && (c.push(new goog.math.Rect(a.left, k, a.width, g - k)), e = k - d);
  b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
  h < f && c.push(new goog.math.Rect(h, d, f - h, e));
  return c;
};
goog.math.Rect.prototype.difference = function(a) {
  return goog.math.Rect.difference(this, a);
};
goog.math.Rect.prototype.boundingRect = function(a) {
  var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(this.top + this.height, a.top + a.height);
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.width = b - this.left;
  this.height = c - this.top;
};
goog.math.Rect.boundingRect = function(a, b) {
  if (!a || !b) {
    return null;
  }
  var c = new goog.math.Rect(a.left, a.top, a.width, a.height);
  c.boundingRect(b);
  return c;
};
goog.math.Rect.prototype.contains = function(a) {
  return a instanceof goog.math.Coordinate ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height;
};
goog.math.Rect.prototype.squaredDistance = function(a) {
  var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
  a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
  return b * b + a * a;
};
goog.math.Rect.prototype.distance = function(a) {
  return Math.sqrt(this.squaredDistance(a));
};
goog.math.Rect.prototype.getSize = function() {
  return new goog.math.Size(this.width, this.height);
};
goog.math.Rect.prototype.getTopLeft = function() {
  return new goog.math.Coordinate(this.left, this.top);
};
goog.math.Rect.prototype.getCenter = function() {
  return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2);
};
goog.math.Rect.prototype.getBottomRight = function() {
  return new goog.math.Coordinate(this.left + this.width, this.top + this.height);
};
goog.math.Rect.prototype.ceil = function() {
  this.left = Math.ceil(this.left);
  this.top = Math.ceil(this.top);
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Rect.prototype.floor = function() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Rect.prototype.round = function() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Rect.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.left += a.x, this.top += a.y) : (this.left += goog.asserts.assertNumber(a), goog.isNumber(b) && (this.top += b));
  return this;
};
goog.math.Rect.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.left *= a;
  this.width *= a;
  this.top *= c;
  this.height *= c;
  return this;
};
goog.style = {};
goog.style.setStyle = function(a, b, c) {
  if (goog.isString(b)) {
    goog.style.setStyle_(a, c, b);
  } else {
    for (var d in b) {
      goog.style.setStyle_(a, b[d], d);
    }
  }
};
goog.style.setStyle_ = function(a, b, c) {
  (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b);
};
goog.style.styleNameCache_ = {};
goog.style.getVendorJsStyleName_ = function(a, b) {
  var c = goog.style.styleNameCache_[b];
  if (!c) {
    var d = goog.string.toCamelCase(b), c = d;
    void 0 === a.style[d] && (d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(d), void 0 !== a.style[d] && (c = d));
    goog.style.styleNameCache_[b] = c;
  }
  return c;
};
goog.style.getVendorStyleName_ = function(a, b) {
  var c = goog.string.toCamelCase(b);
  return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(c), void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b;
};
goog.style.getStyle = function(a, b) {
  var c = a.style[goog.string.toCamelCase(b)];
  return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || "";
};
goog.style.getComputedStyle = function(a, b) {
  var c = goog.dom.getOwnerDocument(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : "";
};
goog.style.getCascadedStyle = function(a, b) {
  return a.currentStyle ? a.currentStyle[b] : null;
};
goog.style.getStyle_ = function(a, b) {
  return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b];
};
goog.style.getComputedBoxSizing = function(a) {
  return goog.style.getStyle_(a, "boxSizing") || goog.style.getStyle_(a, "MozBoxSizing") || goog.style.getStyle_(a, "WebkitBoxSizing") || null;
};
goog.style.getComputedPosition = function(a) {
  return goog.style.getStyle_(a, "position");
};
goog.style.getBackgroundColor = function(a) {
  return goog.style.getStyle_(a, "backgroundColor");
};
goog.style.getComputedOverflowX = function(a) {
  return goog.style.getStyle_(a, "overflowX");
};
goog.style.getComputedOverflowY = function(a) {
  return goog.style.getStyle_(a, "overflowY");
};
goog.style.getComputedZIndex = function(a) {
  return goog.style.getStyle_(a, "zIndex");
};
goog.style.getComputedTextAlign = function(a) {
  return goog.style.getStyle_(a, "textAlign");
};
goog.style.getComputedCursor = function(a) {
  return goog.style.getStyle_(a, "cursor");
};
goog.style.getComputedTransform = function(a) {
  var b = goog.style.getVendorStyleName_(a, "transform");
  return goog.style.getStyle_(a, b) || goog.style.getStyle_(a, "transform");
};
goog.style.setPosition = function(a, b, c) {
  var d;
  b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
  a.style.left = goog.style.getPixelStyleValue_(d, !1);
  a.style.top = goog.style.getPixelStyleValue_(b, !1);
};
goog.style.getPosition = function(a) {
  return new goog.math.Coordinate(a.offsetLeft, a.offsetTop);
};
goog.style.getClientViewportElement = function(a) {
  a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
  return !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(a).isCss1CompatMode() ? a.documentElement : a.body;
};
goog.style.getViewportPageOffset = function(a) {
  var b = a.body;
  a = a.documentElement;
  return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop);
};
goog.style.getBoundingClientRect_ = function(a) {
  var b;
  try {
    b = a.getBoundingClientRect();
  } catch (c) {
    return {left:0, top:0, right:0, bottom:0};
  }
  goog.userAgent.IE && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b;
};
goog.style.getOffsetParent = function(a) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) {
    return goog.asserts.assert(a && "offsetParent" in a), a.offsetParent;
  }
  var b = goog.dom.getOwnerDocument(a), c = goog.style.getStyle_(a, "position"), d = "fixed" == c || "absolute" == c;
  for (a = a.parentNode;a && a != b;a = a.parentNode) {
    if (a.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && a.host && (a = a.host), c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) {
      return a;
    }
  }
  return null;
};
goog.style.getVisibleRectForElement = function(a) {
  for (var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement();a = goog.style.getOffsetParent(a);) {
    if (!(goog.userAgent.IE && 0 == a.clientWidth || goog.userAgent.WEBKIT && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
      var g = goog.style.getPageOffset(a), h = goog.style.getClientLeftTop(a);
      g.x += h.x;
      g.y += h.y;
      b.top = Math.max(b.top, g.y);
      b.right = Math.min(b.right, g.x + a.clientWidth);
      b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
      b.left = Math.max(b.left, g.x);
    }
  }
  d = f.scrollLeft;
  f = f.scrollTop;
  b.left = Math.max(b.left, d);
  b.top = Math.max(b.top, f);
  c = c.getViewportSize();
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, f + c.height);
  return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null;
};
goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
  var d = b || goog.dom.getDocumentScrollElement(), e = goog.style.getPageOffset(a), f = goog.style.getPageOffset(d), g = goog.style.getBorderBox(d);
  d == goog.dom.getDocumentScrollElement() ? (b = e.x - d.scrollLeft, e = e.y - d.scrollTop, goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (b += g.left, e += g.top)) : (b = e.x - f.x - g.left, e = e.y - f.y - g.top);
  g = goog.style.getSizeWithDisplay_(a);
  a = d.clientWidth - g.width;
  g = d.clientHeight - g.height;
  f = d.scrollLeft;
  d = d.scrollTop;
  c ? (f += b - a / 2, d += e - g / 2) : (f += Math.min(b, Math.max(b - a, 0)), d += Math.min(e, Math.max(e - g, 0)));
  return new goog.math.Coordinate(f, d);
};
goog.style.scrollIntoContainerView = function(a, b, c) {
  b = b || goog.dom.getDocumentScrollElement();
  a = goog.style.getContainerOffsetToScrollInto(a, b, c);
  b.scrollLeft = a.x;
  b.scrollTop = a.y;
};
goog.style.getClientLeftTop = function(a) {
  return new goog.math.Coordinate(a.clientLeft, a.clientTop);
};
goog.style.getPageOffset = function(a) {
  var b = goog.dom.getOwnerDocument(a);
  goog.asserts.assertObject(a, "Parameter is required");
  var c = new goog.math.Coordinate(0, 0), d = goog.style.getClientViewportElement(b);
  if (a == d) {
    return c;
  }
  a = goog.style.getBoundingClientRect_(a);
  b = goog.dom.getDomHelper(b).getDocumentScroll();
  c.x = a.left + b.x;
  c.y = a.top + b.y;
  return c;
};
goog.style.getPageOffsetLeft = function(a) {
  return goog.style.getPageOffset(a).x;
};
goog.style.getPageOffsetTop = function(a) {
  return goog.style.getPageOffset(a).y;
};
goog.style.getFramedPageOffset = function(a, b) {
  var c = new goog.math.Coordinate(0, 0), d = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
  if (!goog.reflect.canAccessProperty(d, "parent")) {
    return c;
  }
  var e = a;
  do {
    var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPositionForElement_(goog.asserts.assert(e));
    c.x += f.x;
    c.y += f.y;
  } while (d && d != b && d != d.parent && (e = d.frameElement) && (d = d.parent));
  return c;
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
  if (b.getDocument() != c.getDocument()) {
    var d = b.getDocument().body;
    c = goog.style.getFramedPageOffset(d, c.getWindow());
    c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
    !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || b.isCss1CompatMode() || (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
    a.left += c.x;
    a.top += c.y;
  }
};
goog.style.getRelativePosition = function(a, b) {
  var c = goog.style.getClientPosition(a), d = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(c.x - d.x, c.y - d.y);
};
goog.style.getClientPositionForElement_ = function(a) {
  a = goog.style.getBoundingClientRect_(a);
  return new goog.math.Coordinate(a.left, a.top);
};
goog.style.getClientPosition = function(a) {
  goog.asserts.assert(a);
  if (a.nodeType == goog.dom.NodeType.ELEMENT) {
    return goog.style.getClientPositionForElement_(a);
  }
  a = a.changedTouches ? a.changedTouches[0] : a;
  return new goog.math.Coordinate(a.clientX, a.clientY);
};
goog.style.setPageOffset = function(a, b, c) {
  var d = goog.style.getPageOffset(a);
  b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
  b = goog.asserts.assertNumber(b) - d.x;
  goog.style.setPosition(a, a.offsetLeft + b, a.offsetTop + (Number(c) - d.y));
};
goog.style.setSize = function(a, b, c) {
  if (b instanceof goog.math.Size) {
    c = b.height, b = b.width;
  } else {
    if (void 0 == c) {
      throw Error("missing height argument");
    }
  }
  goog.style.setWidth(a, b);
  goog.style.setHeight(a, c);
};
goog.style.getPixelStyleValue_ = function(a, b) {
  "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
  return a;
};
goog.style.setHeight = function(a, b) {
  a.style.height = goog.style.getPixelStyleValue_(b, !0);
};
goog.style.setWidth = function(a, b) {
  a.style.width = goog.style.getPixelStyleValue_(b, !0);
};
goog.style.getSize = function(a) {
  return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, a);
};
goog.style.evaluateWithTemporaryDisplay_ = function(a, b) {
  if ("none" != goog.style.getStyle_(b, "display")) {
    return a(b);
  }
  var c = b.style, d = c.display, e = c.visibility, f = c.position;
  c.visibility = "hidden";
  c.position = "absolute";
  c.display = "inline";
  var g = a(b);
  c.display = d;
  c.position = f;
  c.visibility = e;
  return g;
};
goog.style.getSizeWithDisplay_ = function(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = goog.userAgent.WEBKIT && !b && !c;
  return goog.isDef(b) && !d || !a.getBoundingClientRect ? new goog.math.Size(b, c) : (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top));
};
goog.style.getTransformedSize = function(a) {
  if (!a.getBoundingClientRect) {
    return null;
  }
  a = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, a);
  return new goog.math.Size(a.right - a.left, a.bottom - a.top);
};
goog.style.getBounds = function(a) {
  var b = goog.style.getPageOffset(a);
  a = goog.style.getSize(a);
  return new goog.math.Rect(b.x, b.y, a.width, a.height);
};
goog.style.toCamelCase = function(a) {
  return goog.string.toCamelCase(String(a));
};
goog.style.toSelectorCase = function(a) {
  return goog.string.toSelectorCase(a);
};
goog.style.getOpacity = function(a) {
  goog.asserts.assert(a);
  var b = a.style;
  a = "";
  "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
  return "" == a ? a : Number(a);
};
goog.style.setOpacity = function(a, b) {
  goog.asserts.assert(a);
  var c = a.style;
  "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")");
};
goog.style.setTransparentBackgroundImage = function(a, b) {
  var c = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat");
};
goog.style.clearTransparentBackgroundImage = function(a) {
  a = a.style;
  "filter" in a ? a.filter = "" : a.backgroundImage = "none";
};
goog.style.showElement = function(a, b) {
  goog.style.setElementShown(a, b);
};
goog.style.setElementShown = function(a, b) {
  a.style.display = b ? "" : "none";
};
goog.style.isElementShown = function(a) {
  return "none" != a.style.display;
};
goog.style.installStyles = function(a, b) {
  return goog.style.installSafeStyleSheet(goog.html.legacyconversions.safeStyleSheetFromString(a), b);
};
goog.style.installSafeStyleSheet = function(a, b) {
  var c = goog.dom.getDomHelper(b), d = null, e = c.getDocument();
  goog.userAgent.IE && e.createStyleSheet ? (d = e.createStyleSheet(), goog.style.setSafeStyleSheet(d, a)) : (e = c.getElementsByTagNameAndClass(goog.dom.TagName.HEAD)[0], e || (d = c.getElementsByTagNameAndClass(goog.dom.TagName.BODY)[0], e = c.createDom(goog.dom.TagName.HEAD), d.parentNode.insertBefore(e, d)), d = c.createDom(goog.dom.TagName.STYLE), goog.style.setSafeStyleSheet(d, a), c.appendChild(e, d));
  return d;
};
goog.style.uninstallStyles = function(a) {
  goog.dom.removeNode(a.ownerNode || a.owningElement || a);
};
goog.style.setStyles = function(a, b) {
  goog.style.setSafeStyleSheet(a, goog.html.legacyconversions.safeStyleSheetFromString(b));
};
goog.style.setSafeStyleSheet = function(a, b) {
  var c = goog.html.SafeStyleSheet.unwrap(b);
  goog.userAgent.IE && goog.isDef(a.cssText) ? a.cssText = c : a.innerHTML = c;
};
goog.style.setPreWrap = function(a) {
  a = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap";
};
goog.style.setInlineBlock = function(a) {
  a = a.style;
  a.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.zoom = "1", a.display = "inline") : a.display = "inline-block";
};
goog.style.isRightToLeft = function(a) {
  return "rtl" == goog.style.getStyle_(a, "direction");
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
  return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1;
};
goog.style.setUnselectable = function(a, b, c) {
  c = c ? null : a.getElementsByTagName("*");
  var d = goog.style.unselectableStyle_;
  if (d) {
    if (b = b ? "none" : "", a.style && (a.style[d] = b), c) {
      a = 0;
      for (var e;e = c[a];a++) {
        e.style && (e.style[d] = b);
      }
    }
  } else {
    if (goog.userAgent.IE || goog.userAgent.OPERA) {
      if (b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for (a = 0;e = c[a];a++) {
          e.setAttribute("unselectable", b);
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function(a) {
  return new goog.math.Size(a.offsetWidth, a.offsetHeight);
};
goog.style.setBorderBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) {
    goog.style.setBoxSizingSize_(a, b, "border-box");
  } else {
    if (c = a.style, d) {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
      c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom;
    } else {
      c.pixelWidth = b.width, c.pixelHeight = b.height;
    }
  }
};
goog.style.getContentBoxSize = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = goog.userAgent.IE && a.currentStyle;
  if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) {
    return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a);
  }
  c = goog.style.getBorderBoxSize(a);
  b = goog.style.getPaddingBox(a);
  a = goog.style.getBorderBox(a);
  return new goog.math.Size(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom);
};
goog.style.setContentBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) {
    goog.style.setBoxSizingSize_(a, b, "content-box");
  } else {
    if (c = a.style, d) {
      c.pixelWidth = b.width, c.pixelHeight = b.height;
    } else {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
      c.pixelHeight = b.height + e.top + d.top + d.bottom + e.bottom;
    }
  }
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
  a = a.style;
  goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
  a.width = Math.max(b.width, 0) + "px";
  a.height = Math.max(b.height, 0) + "px";
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
  if (/^\d+px?$/.test(b)) {
    return parseInt(b, 10);
  }
  var e = a.style[c], f = a.runtimeStyle[c];
  a.runtimeStyle[c] = a.currentStyle[c];
  a.style[c] = b;
  b = a.style[d];
  a.style[c] = e;
  a.runtimeStyle[c] = f;
  return b;
};
goog.style.getIePixelDistance_ = function(a, b) {
  var c = goog.style.getCascadedStyle(a, b);
  return c ? goog.style.getIePixelValue_(a, c, "left", "pixelLeft") : 0;
};
goog.style.getBox_ = function(a, b) {
  if (goog.userAgent.IE) {
    var c = goog.style.getIePixelDistance_(a, b + "Left"), d = goog.style.getIePixelDistance_(a, b + "Right"), e = goog.style.getIePixelDistance_(a, b + "Top"), f = goog.style.getIePixelDistance_(a, b + "Bottom");
    return new goog.math.Box(e, d, f, c);
  }
  c = goog.style.getComputedStyle(a, b + "Left");
  d = goog.style.getComputedStyle(a, b + "Right");
  e = goog.style.getComputedStyle(a, b + "Top");
  f = goog.style.getComputedStyle(a, b + "Bottom");
  return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f), parseFloat(c));
};
goog.style.getPaddingBox = function(a) {
  return goog.style.getBox_(a, "padding");
};
goog.style.getMarginBox = function(a) {
  return goog.style.getBox_(a, "margin");
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function(a, b) {
  if ("none" == goog.style.getCascadedStyle(a, b + "Style")) {
    return 0;
  }
  var c = goog.style.getCascadedStyle(a, b + "Width");
  return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft");
};
goog.style.getBorderBox = function(a) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    var b = goog.style.getIePixelBorder_(a, "borderLeft"), c = goog.style.getIePixelBorder_(a, "borderRight"), d = goog.style.getIePixelBorder_(a, "borderTop");
    a = goog.style.getIePixelBorder_(a, "borderBottom");
    return new goog.math.Box(d, c, a, b);
  }
  b = goog.style.getComputedStyle(a, "borderLeftWidth");
  c = goog.style.getComputedStyle(a, "borderRightWidth");
  d = goog.style.getComputedStyle(a, "borderTopWidth");
  a = goog.style.getComputedStyle(a, "borderBottomWidth");
  return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
};
goog.style.getFontFamily = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = "";
  if (b.body.createTextRange && goog.dom.contains(b, a)) {
    b = b.body.createTextRange();
    b.moveToElementText(a);
    try {
      c = b.queryCommandValue("FontName");
    } catch (d) {
      c = "";
    }
  }
  c || (c = goog.style.getStyle_(a, "fontFamily"));
  a = c.split(",");
  1 < a.length && (c = a[0]);
  return goog.string.stripQuotes(c, "\"'");
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
  return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null;
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function(a) {
  var b = goog.style.getStyle_(a, "fontSize"), c = goog.style.getLengthUnits(b);
  if (b && "px" == c) {
    return parseInt(b, 10);
  }
  if (goog.userAgent.IE) {
    if (String(c) in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
    }
    if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && String(c) in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft");
    }
  }
  c = goog.dom.createDom(goog.dom.TagName.SPAN, {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(a, c);
  b = c.offsetHeight;
  goog.dom.removeNode(c);
  return b;
};
goog.style.parseStyleAttribute = function(a) {
  var b = {};
  goog.array.forEach(a.split(/\s*;\s*/), function(a) {
    var d = a.match(/\s*([\w-]+)\s*\:(.+)/);
    d && (a = d[1], d = goog.string.trim(d[2]), b[goog.string.toCamelCase(a.toLowerCase())] = d);
  });
  return b;
};
goog.style.toStyleAttribute = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    b.push(goog.string.toSelectorCase(d), ":", a, ";");
  });
  return b.join("");
};
goog.style.setFloat = function(a, b) {
  a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b;
};
goog.style.getFloat = function(a) {
  return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || "";
};
goog.style.getScrollbarWidth = function(a) {
  var b = goog.dom.createElement(goog.dom.TagName.DIV);
  a && (b.className = a);
  b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  a = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.style.setSize(a, "200px", "200px");
  b.appendChild(a);
  goog.dom.appendChild(goog.dom.getDocument().body, b);
  a = b.offsetWidth - b.clientWidth;
  goog.dom.removeNode(b);
  return a;
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function(a) {
  a = goog.style.getComputedTransform(a);
  return a ? (a = a.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2])) : new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(0, 0);
};
mob.HelpPanel = function(a) {
  this.el = goog.dom.createElement(goog.dom.TagName.A);
  this.el.id = mob.util.ElementId.HELP_PANEL;
  this.clickDetectorDiv_ = null;
  this.lastScrollY_ = 0;
  this.originalUrl_ = a;
  this.initialize_();
};
mob.HelpPanel.WIDTH_ = 270;
mob.HelpPanel.VIEW_ORIGINAL_SITE_ICON_ = "R0lGODlhYABgAPAAAHV1dQAAACH5BAEAAAEAIf8LSW1hZ2VNYWdpY2sHZ2FtbWE9MQAsAAAAAGAAYAAAAv6Mj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/LcAvaN5/p+M/wPBHyCRKCviPQgl7kj08h5Sp3SXafKpGJx0W1y4dV1w0FteEz+mb1oLi3w1fDey3Zvlt3MZU+7jd+nZwVT5Sf0UrYnN1gDpZjxqFJmEHlReTJJyQi5iZKpKSYYmvIJ2iR66gmVcFnRGlJ68Doxq7SqUBuRi9rJ2muxy6nmEEz8aztsPCqcCnvbUAx9zLus3IwRLRHbWG14B9i9mAx+LZ5dcr7mRjdNsR2T7jvOHu7+TF9uPw/crt1v/Q9CPATx3rkK+CCdwYP19OVLeI/ZOonf/O0zNxEbQqhTGy0+dJgRYEOKf6iVFBjRkEqUF690VMdyYMyQ/EbCSYnsI61/LYe8BBPwZ02dHmkCrYhOqDyiBE9iUtrUJqsVMjkifWPVqUaphKDK8mqi6k2uiMCOZdqVrEitWM8aBXkVq1ixJOaarWuW7gi7armhhZgmcCGTggvj3Gk48ULEihu/Zeg4ss/IjZ1RNoz3Mpm2nDt7/gw6tOjRpEubPo06terVrFuHKAAAOw==";
mob.HelpPanel.CONTACT_BAR_BY_GOOGLE_ICON_ = "R0lGODlhYABgAPAAAHV1dQAAACH5BAEAAAEAIf8LSW1hZ2VNYWdpY2sHZ2FtbWE9MQAsAAAAAGAAYAAAAv6Mj6nL7Q+jnLTai7PevPsPhuJIluaJpuoqAu4Lu+wa1zY8t/fO5xwPBPouwaJwGDEqj8jF8slsGqDUnTRQzVqH2q7N5w3jZuIygGwOo9PdNTvrflNz6mSR3q708PDMF1zlMcYHBSLDVXj1Mae4+NTouAQZqTTZkWi58Zj5I8mpsfnp5ymKQVpKVIlqqjoqNzgRyvr6YnE6S3um1+qaa8uLS/tr1JmrS3Gbajx8p2l8HAus7LtL7Lxc3Qz6zBxUTI2cnC3cHTVNPm5eLneuTiNtB58iDiH7bt3ufkIfj69iH47fCIAB5ekwKAHTPoEJCYZQGMzfQYQFKfay2JARJVKM0TR+Y5jOYUeIl/KEBJmPJIM6E5+ZbOnS48CYgVDQVEniJseNOv/E6QnrJ9ArQGspKmrppihuq16tSpDmaYOXUut5q4o1q9atXLt6/Qo27KoCADs=";
mob.HelpPanel.VIEW_ORIGINAL_SITE_TEXT_ = "View original site";
mob.HelpPanel.CONTACT_BAR_BY_GOOGLE_TEXT_ = "Contact bar by Google";
mob.HelpPanel.LEARN_MORE_TEXT_ = "Learn more";
mob.HelpPanel.HELP_PAGE_URL_ = "https://support.google.com/ads/answer/7016176";
mob.HelpPanel.prototype.createMenuItem_ = function(a, b, c, d, e, f) {
  var g = goog.dom.createElement(goog.dom.TagName.LI);
  a.appendChild(g);
  g.id = b;
  a = g;
  f || (a = goog.dom.createElement(goog.dom.TagName.A), a.href = e, g.appendChild(a));
  g = goog.dom.createElement(goog.dom.TagName.SPAN);
  g.style.backgroundImage = "url(data:image/gif;base64," + d + ")";
  a.appendChild(g);
  d = goog.dom.createElement(goog.dom.TagName.P);
  a.appendChild(d);
  f ? (goog.dom.classlist.add(d, mob.util.ElementClass.LEARN_MORE), f = goog.dom.createElement(goog.dom.TagName.P), d.appendChild(f), goog.dom.classlist.add(f, mob.util.ElementClass.LEARN_MORE_TEXT), f.appendChild(document.createTextNode(c)), a = goog.dom.createElement(goog.dom.TagName.A), a.href = e, d.appendChild(a), goog.dom.classlist.add(a, mob.util.ElementClass.LEARN_MORE_LINK), a.appendChild(document.createTextNode(mob.HelpPanel.LEARN_MORE_TEXT_))) : d.appendChild(document.createTextNode(c));
};
mob.HelpPanel.prototype.initialize_ = function() {
  document.body.appendChild(this.el);
  var a = goog.dom.createElement(goog.dom.TagName.UL);
  this.el.appendChild(a);
  this.createMenuItem_(a, "psmob-help-panel-0", mob.HelpPanel.VIEW_ORIGINAL_SITE_TEXT_, mob.HelpPanel.VIEW_ORIGINAL_SITE_ICON_, this.originalUrl_, !1);
  this.createMenuItem_(a, "psmob-help-panel-1", mob.HelpPanel.CONTACT_BAR_BY_GOOGLE_TEXT_, mob.HelpPanel.CONTACT_BAR_BY_GOOGLE_ICON_, mob.HelpPanel.HELP_PAGE_URL_, !0);
  this.addClickDetectorDiv_();
  this.addButtonEvents_();
  this.el.addEventListener(goog.events.EventType.TOUCHMOVE, goog.bind(function(a) {
    if (this.isOpen()) {
      var c = a.touches[0].clientY;
      if (1 != a.touches.length) {
        a.preventDefault();
      } else {
        var d = c > this.lastScrollY_, e = 0 == this.el.scrollTop, f = this.el.scrollTop >= this.el.scrollHeight - this.el.offsetHeight - 1;
        a.cancelable && (d && e || !d && f) && a.preventDefault();
        a.stopImmediatePropagation && a.stopImmediatePropagation();
        this.lastScrollY_ = c;
      }
    }
  }, this), !1);
  window.addEventListener(goog.events.EventType.SCROLL, goog.bind(function(a) {
    this.isOpen() && !this.el.contains(a.target) && (a.stopPropagation(), a.preventDefault());
  }, this));
  window.addEventListener(goog.events.EventType.TOUCHSTART, goog.bind(function(a) {
    this.lastScrollY_ = a.touches[0].clientY;
  }, this), !1);
};
mob.HelpPanel.prototype.redraw = function() {
  var a = mob.util.getZoomLevel(), b = mob.util.pixelValue(window.getComputedStyle(document.body).width);
  b && (a = Math.min(a, b / mob.HelpPanel.WIDTH_));
  this.el.style.fontSize = a + "px";
  this.el.style.top = window.scrollY + "px";
  var c = window.innerWidth;
  "hidden" != window.getComputedStyle(document.body).getPropertyValue("overflow-y") && (c -= goog.style.getScrollbarWidth());
  this.el.style.right = b - window.scrollX - c + 10 * a + "px";
};
mob.HelpPanel.prototype.addClickDetectorDiv_ = function() {
  this.clickDetectorDiv_ = goog.dom.createElement(goog.dom.TagName.DIV);
  this.clickDetectorDiv_.id = mob.util.ElementId.CLICK_DETECTOR_DIV;
  document.body.insertBefore(this.clickDetectorDiv_, this.el);
  this.clickDetectorDiv_.addEventListener(goog.events.EventType.CLICK, goog.bind(function(a) {
    this.isOpen() && this.toggle();
  }, this), !1);
};
mob.HelpPanel.prototype.toggle = function() {
  var a = this.isOpen() ? mob.util.BeaconEvents.MENU_BUTTON_CLOSE : mob.util.BeaconEvents.MENU_BUTTON_OPEN, b = this.isOpen() ? goog.dom.classlist.remove : goog.dom.classlist.add;
  mob.util.sendBeaconEvent(a);
  b(this.el, mob.util.ElementClass.OPEN);
  b(this.clickDetectorDiv_, mob.util.ElementClass.OPEN);
  b(document.body, mob.util.ElementClass.NOSCROLL);
  this.redraw();
};
mob.HelpPanel.prototype.addButtonEvents_ = function() {
  for (var a = this.el.querySelectorAll(goog.dom.TagName.LI + " > " + goog.dom.TagName.A), b = 0, c;c = a[b];b++) {
    c.addEventListener(goog.events.EventType.CLICK, goog.bind(function(a, b) {
      mob.util.sendBeaconEvent(mob.util.BeaconEvents.MENU_NAV_CLICK);
      b.preventDefault();
      this.toggle();
      goog.global.location = a;
    }, this, c.href));
  }
};
mob.HelpPanel.prototype.isOpen = function() {
  return goog.dom.classlist.contains(this.el, mob.util.ElementClass.OPEN);
};
mob.button.Map = function(a, b, c, d) {
  this.mapLocation_ = b;
  this.conversionId_ = c;
  this.conversionLabel_ = d;
  mob.button.AbstractButton.call(this, mob.util.ElementId.MAP_BUTTON, mob.button.Map.ICON_, a, mob.button.Map.LABEL_);
};
goog.inherits(mob.button.Map, mob.button.AbstractButton);
mob.button.Map.ICON_ = "R0lGODlhYABgAPAAAAAAAAAAACH5BAEAAAEAIf8LSW1hZ2VNYWdpY2sHZ2FtbWE9MQAsAAAAAGAAYAAAAv6Mj6nL7Q+jnLTai7PevPsPhuJIluaJpuo6Au4Ls3IA1/Y7l/fO5x8P7Pk0weJteDEqj0jJ8llrQqBUnJRRzQKuCq2We/B6wWIxtzyWos3IdbntTufi7zldLmMj9Cx895tX5SQYCEVB2Ed1qJhoWIGYAjnoqMJoYRlJ+aiJgrn41LiE4XlCOim6YhqhSiK5ytoCiyUr4upgW0q7pxuSdQpaiGvgV0nMF3rHW5vs68OsHPuM6iw9TV0dpIadrb3N1O0ddRYeQ0ZuZU4OFna+zu7t/r4dLy9NX/98j3+nv8vc7y8ZwIBxBhJ0Y/BgnYT7ADFs2OwhRE4SaRyrOMwhRjeF1jZOBOJxFrCQf0aSTGDyJEojKm9xa9kAJEyXO2Y+qGnzpricOl3wHPQzqNChRIsaPYo0acUCADs=";
mob.button.Map.LABEL_ = "DIRECTIONS";
mob.button.Map.prototype.clickHandler = function() {
  mob.util.sendBeaconEvent(mob.util.BeaconEvents.MAP_BUTTON, goog.bind(this.openMap_, this));
};
mob.button.Map.prototype.getMapUrl_ = function() {
  return "https://www.google.com/maps/place/" + this.mapLocation_;
};
mob.button.Map.prototype.openMap_ = function() {
  if (this.conversionId_ && this.conversionLabel_) {
    var a = new Image;
    a.onload = goog.bind(function() {
      goog.global.location = this.getMapUrl_();
    }, this);
    a.onerror = a.onload;
    a.src = "//www.googleadservices.com/pagead/conversion/" + this.conversionId_ + "/?label=" + this.conversionLabel_ + "&amp;guid=ON&amp;script=0";
  } else {
    goog.global.location = this.getMapUrl_();
  }
};
mob.Nav = function() {
  this.headerBar_ = goog.dom.getRequiredElement(mob.util.ElementId.HEADER_BAR);
  this.styleTag_ = null;
  this.spacerDiv_ = goog.dom.getRequiredElement(mob.util.ElementId.SPACER);
  this.menuButton_ = this.mapButton_ = this.dialer_ = null;
  this.helpPanel_ = new mob.HelpPanel(goog.dom.getRequiredElement(mob.util.ElementId.IFRAME).src);
  this.scrollTimer_ = null;
  this.currentTouches_ = 0;
  this.headerBarHeight_ = -1;
  this.elementsToOffset_ = new goog.structs.Set;
  this.redrawNavCalled_ = !1;
  this.isAndroidBrowser_ = goog.labs.userAgent.browser.isAndroidBrowser();
  this.isIosWebview_ = -1 < window.navigator.userAgent.indexOf("CriOS") || -1 < window.navigator.userAgent.indexOf("GSA") || goog.labs.userAgent.browser.isIosWebview();
};
mob.Nav.MIN_FONT_SIZE_ = 1;
mob.Nav.prototype.redraw_ = function() {
  if (this.headerBar_) {
    var a = -1 == this.headerBarHeight_ ? Math.round(goog.style.getTransformedSize(this.headerBar_).height) : this.headerBarHeight_, b = mob.util.getZoomLevel();
    this.headerBar_.style.fontSize = b + "px";
    var c = window.innerWidth;
    "hidden" != window.getComputedStyle(document.body).getPropertyValue("overflow-y") && (c -= goog.style.getScrollbarWidth());
    this.headerBar_.style.width = c / b + "em";
    goog.dom.classlist.remove(this.headerBar_, mob.util.ElementClass.HIDE);
    b = Math.round(goog.style.getTransformedSize(this.headerBar_).height);
    this.spacerDiv_.style.height = b + "px";
    this.headerBarHeight_ = b;
    for (var c = this.elementsToOffset_.getValues(), d = 0;d < c.length;d++) {
      var e = c[d], f = window.getComputedStyle(e), g = f.getPropertyValue("position"), f = mob.util.pixelValue(f.getPropertyValue("top"));
      "static" != g && null != f && (this.redrawNavCalled_ ? (g = e.style.top, g = mob.util.pixelValue(e.style.top), null != g && (e.style.top = String(g + (b - a)) + "px")) : (g = mob.util.boundingRect(e).top, e.style.top = String(g + b) + "px"));
    }
    this.redrawNavCalled_ && b != a && window.scrollBy(0, b - a);
    this.isIosWebview_ || (this.headerBar_.style.top = window.scrollY + "px", this.headerBar_.style.left = window.scrollX + "px");
    this.redrawNavCalled_ = !0;
    this.helpPanel_.redraw();
  }
};
mob.Nav.prototype.addHeaderBarResizeEvents_ = function() {
  this.redraw_();
  var a = function() {
    null != this.scrollTimer_ && (window.clearTimeout(this.scrollTimer_), this.scrollTimer_ = null);
    this.scrollTimer_ = window.setTimeout(goog.bind(function() {
      (this.isAndroidBrowser_ || 0 == this.currentTouches_) && this.redraw_();
      this.scrollTimer_ = null;
    }, this), 200);
  };
  window.addEventListener(goog.events.EventType.SCROLL, goog.bind(function(b) {
    a.call(this);
    goog.dom.classlist.add(this.headerBar_, mob.util.ElementClass.HIDE);
  }, this), !1);
  window.addEventListener(goog.events.EventType.TOUCHSTART, goog.bind(function(a) {
    this.currentTouches_ = a.touches.length;
  }, this), !1);
  window.addEventListener(goog.events.EventType.TOUCHMOVE, goog.bind(function(a) {
    this.helpPanel_.isOpen() ? a.preventDefault() : this.isAndroidBrowser_ || goog.dom.classlist.add(this.headerBar_, mob.util.ElementClass.HIDE);
  }, this), !1);
  window.addEventListener(goog.events.EventType.TOUCHEND, goog.bind(function(b) {
    this.currentTouches_ = b.touches.length;
    0 == this.currentTouches_ && a.call(this);
  }, this), !1);
  window.addEventListener(goog.events.EventType.ORIENTATIONCHANGE, goog.bind(function() {
    this.redraw_();
  }, this), !1);
  window.addEventListener(goog.events.EventType.RESIZE, goog.bind(function() {
    this.redraw_();
  }, this), !1);
};
mob.Nav.prototype.addHeaderBar_ = function(a) {
  this.isIosWebview_ && goog.dom.classlist.add(this.headerBar_, mob.util.ElementClass.IOS_WEBVIEW);
  this.headerBar_.style.borderBottomColor = mob.util.colorNumbersToString(a.menuFrontColor);
  this.headerBar_.style.backgroundColor = mob.util.colorNumbersToString(a.menuBackColor);
  window.psPhoneNumber && (this.dialer_ = new mob.button.Dialer(a.menuFrontColor, window.psPhoneNumber, window.psConversionId, window.psPhoneConversionLabel), this.headerBar_.appendChild(this.dialer_.el));
  window.psMapLocation && (this.mapButton_ = new mob.button.Map(a.menuFrontColor, window.psMapLocation, window.psConversionId, window.psMapConversionLabel), this.headerBar_.appendChild(this.mapButton_.el));
  this.menuButton_ = new mob.button.Menu(a.menuFrontColor, goog.bind(this.helpPanel_.toggle, this.helpPanel_));
  this.headerBar_.appendChild(this.menuButton_.el);
  this.addHeaderBarResizeEvents_();
  this.addThemeColor_(a);
};
mob.Nav.prototype.addThemeColor_ = function(a) {
  this.styleTag_ && this.styleTag_.parentNode.removeChild(this.styleTag_);
  var b = mob.util.colorNumbersToString(a.menuBackColor);
  a = mob.util.colorNumbersToString(a.menuFrontColor);
  b = "#" + mob.util.ElementId.HEADER_BAR + " { background-color: " + b + "; }\n#" + mob.util.ElementId.HEADER_BAR + " *  { color: " + a + "; }\n";
  this.styleTag_ = goog.dom.createElement(goog.dom.TagName.STYLE);
  this.styleTag_.type = "text/css";
  this.styleTag_.appendChild(document.createTextNode(b));
  document.head.appendChild(this.styleTag_);
};
mob.Nav.prototype.isMinimumFontSizeSet_ = function() {
  var a = goog.dom.createElement(goog.dom.TagName.DIV);
  document.body.appendChild(a);
  a.style.fontSize = "1px";
  var b = window.getComputedStyle(a).getPropertyValue("font-size"), b = mob.util.pixelValue(b);
  document.body.removeChild(a);
  return !b || b > mob.Nav.MIN_FONT_SIZE_;
};
mob.Nav.prototype.run = function(a) {
  this.isMinimumFontSizeSet_() || mob.util.inFriendlyIframe() || (this.addHeaderBar_(a), mob.util.sendBeaconEvent(mob.util.BeaconEvents.NAV_DONE), window.addEventListener(goog.events.EventType.LOAD, goog.bind(this.redraw_, this)));
};
mob.util.sendBeaconEvent(mob.util.BeaconEvents.INITIAL_EVENT);
window.addEventListener(goog.events.EventType.LOAD, function() {
  mob.util.sendBeaconEvent(mob.util.BeaconEvents.LOAD_EVENT);
});
mob.Mob = function() {
  this.mobNav_ = null;
};
mob.Mob.prototype.initialize = function() {
  var a = new mob.util.ThemeData(window.psMobLogoUrl || "", window.psMobForegroundColor || [255, 255, 255], window.psMobBackgroundColor || [0, 0, 0]);
  this.mobNav_ = new mob.Nav;
  this.mobNav_.run(a);
};
var mobilizer_ = new mob.Mob;
function psSetDebugMode() {
}
goog.exportSymbol("psSetDebugMode", psSetDebugMode);
function psRemoveProgressBar() {
}
goog.exportSymbol("psRemoveProgressBar", psRemoveProgressBar);
var psStartMobilization = function() {
  mobilizer_.initialize();
};
goog.exportSymbol("psStartMobilization", psStartMobilization);
})();
