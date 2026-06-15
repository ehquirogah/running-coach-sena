
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.0.2";globalThis.nextVersion = "16.2.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0a9gg_0.js
var require_node_modules_next_dist_esm_build_templates_edge_wrapper_0a9gg_0 = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0a9gg_0.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0a9gg_0.js", 38022, (e, t, l) => {
      self._ENTRIES ||= {};
      let n = Promise.resolve().then(() => e.i(42738));
      n.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(n, { get(e2, t2) {
        if ("then" === t2) return (t3, l3) => e2.then(t3, l3);
        let l2 = (...l3) => e2.then((e3) => (0, e3[t2])(...l3));
        return l2.then = (l3, n2) => e2.then((e3) => e3[t2]).then(l3, n2), l2;
      } });
    }]);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__0_lzsr-._.js
var require_root_of_the_server_0_lzsr = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__0_lzsr-._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0_lzsr-._.js", 74398, (e, t, r) => {
    }, 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, i = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => d, parseSetCookie: () => p, stringifyCookie: () => u };
      for (var c in l) n(s, c, { get: l[c], enumerable: true });
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function p(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = d(e2), { domain: i2, expires: a2, httponly: o2, maxage: s2, path: l2, samesite: c2, secure: u2, partitioned: p2, priority: g2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, y, v = { name: t2, value: decodeURIComponent(r2), domain: i2, ...a2 && { expires: new Date(a2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...c2 && { sameSite: h.includes(m2 = (m2 = c2).toLowerCase()) ? m2 : void 0 }, ...u2 && { secure: true }, ...g2 && { priority: f.includes(y = (y = g2).toLowerCase()) ? y : void 0 }, ...p2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in v) v[t3] && (e3[t3] = v[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of a(t2)) o.call(e2, l2) || l2 === r2 || n(e2, l2, { get: () => t2[l2], enumerable: !(s2 = i(t2, l2)) || s2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var h = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, m = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, a2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (a2 = true, s2 = i3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!a2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(i2)) {
            const t3 = p(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, i, a, o;
        var s, l, c, u, d, p, h, f, g, m, y, v, b, w, _, E, x = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(223), i2 = r3(172), a2 = r3(930), o2 = "context", s2 = new n2.NoopContextManager();
          class l2 {
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...n3) {
              return this._getContextManager().with(e3, t3, r4, ...n3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(56), i2 = r3(912), a2 = r3(957), o2 = r3(172);
          class s2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, s3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e5.stack) ? n3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, o2.getGlobal)("diag"), u2 = (0, i2.createLogLevelDiagLogger)(null != (s3 = r4.logLevel) ? s3 : a2.DiagLogLevel.INFO, e4);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e5}`), u2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
          }
          t2.DiagAPI = s2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(660), i2 = r3(172), a2 = r3(930), o2 = "metrics";
          class s2 {
            static getInstance() {
              return this._instance || (this._instance = new s2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(o2, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(o2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = s2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(172), i2 = r3(874), a2 = r3(194), o2 = r3(277), s2 = r3(369), l2 = r3(930), c2 = "propagation", u2 = new i2.NoopTextMapPropagator();
          class d2 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(c2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c2) || u2;
            }
          }
          t2.PropagationAPI = d2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(172), i2 = r3(846), a2 = r3(139), o2 = r3(607), s2 = r3(930), l2 = "trace";
          class c2 {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new c2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, n2.registerGlobal)(l2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, s2.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = c2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(491), i2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t2.getBaggage = a2, t2.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(i2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let n2 = new r3(this._entries);
              return n2._entries.set(e3, t3), n2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(930), i2 = r3(993), a2 = r3(830), o2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, n2) => {
                let i2 = new r3(t3._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t3.deleteValue = (e4) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(172);
          function i2(e3, t3, r4) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r4.unshift(t3), i3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let i2 = t3[r5];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(200), i2 = r3(521), a2 = r3(130), o2 = i2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${o2}`), l2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var a3;
            let o3 = l2[s2] = null != (a3 = l2[s2]) ? a3 : { version: i2.VERSION };
            if (!n3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== i2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (n3 && (0, a2.isCompatible)(n3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return o2(e4);
              let s2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s2.prerelease || a3.major !== s2.major) return o2(e4);
              if (0 === a3.major) return a3.minor === s2.minor && a3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return a3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = a2, t2.isCompatible = a2(n2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = a2;
          class o2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class l2 extends s2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class u2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new i2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(102);
          class i2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = i2, t2.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(491), i2 = r3(607), a2 = r3(403), o2 = r3(139), s2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new a2.NonRecordingSpan();
              let l2 = r4 && (0, i2.getSpanContext)(r4);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o2.isSpanContextValid)(l2) ? new a2.NonRecordingSpan(l2) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a3, o3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (a3 = t3, l2 = r4) : (a3 = t3, o3 = r4, l2 = n3);
              let c2 = null != o3 ? o3 : s2.active(), u2 = this.startSpan(e3, a3, c2), d2 = (0, i2.setSpan)(c2, u2);
              return s2.with(d2, l2, void 0, u2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i2 = this._getTracer();
              return Reflect.apply(i2.startActiveSpan, i2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(125), i2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var i3;
              return null != (i3 = this.getDelegateTracer(e3, t3, r4)) ? i3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(780), i2 = r3(403), a2 = r3(491), o2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(a2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new i2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), i3 = r4.indexOf("=");
                if (-1 !== i3) {
                  let a2 = r4.slice(0, i3), o2 = r4.slice(i3 + 1, t3.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(o2) && e4.set(a2, o2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = i2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, i2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return a2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(325);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(476), i2 = r3(403), a2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l2(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, S = {};
        function C(e2) {
          var t2 = S[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = S[e2] = { exports: {} }, n2 = true;
          try {
            x[e2].call(r3.exports, r3, r3.exports, C), n2 = false;
          } finally {
            n2 && delete S[e2];
          }
          return r3.exports;
        }
        C.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var T = {};
        Object.defineProperty(T, "__esModule", { value: true }), T.trace = T.propagation = T.metrics = T.diag = T.context = T.INVALID_SPAN_CONTEXT = T.INVALID_TRACEID = T.INVALID_SPANID = T.isValidSpanId = T.isValidTraceId = T.isSpanContextValid = T.createTraceState = T.TraceFlags = T.SpanStatusCode = T.SpanKind = T.SamplingDecision = T.ProxyTracerProvider = T.ProxyTracer = T.defaultTextMapSetter = T.defaultTextMapGetter = T.ValueType = T.createNoopMeter = T.DiagLogLevel = T.DiagConsoleLogger = T.ROOT_CONTEXT = T.createContextKey = T.baggageEntryMetadataFromString = void 0, s = C(369), Object.defineProperty(T, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = C(780), Object.defineProperty(T, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(T, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = C(972), Object.defineProperty(T, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = C(957), Object.defineProperty(T, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = C(102), Object.defineProperty(T, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), p = C(901), Object.defineProperty(T, "ValueType", { enumerable: true, get: function() {
          return p.ValueType;
        } }), h = C(194), Object.defineProperty(T, "defaultTextMapGetter", { enumerable: true, get: function() {
          return h.defaultTextMapGetter;
        } }), Object.defineProperty(T, "defaultTextMapSetter", { enumerable: true, get: function() {
          return h.defaultTextMapSetter;
        } }), f = C(125), Object.defineProperty(T, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = C(846), Object.defineProperty(T, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = C(996), Object.defineProperty(T, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), y = C(357), Object.defineProperty(T, "SpanKind", { enumerable: true, get: function() {
          return y.SpanKind;
        } }), v = C(847), Object.defineProperty(T, "SpanStatusCode", { enumerable: true, get: function() {
          return v.SpanStatusCode;
        } }), b = C(475), Object.defineProperty(T, "TraceFlags", { enumerable: true, get: function() {
          return b.TraceFlags;
        } }), w = C(98), Object.defineProperty(T, "createTraceState", { enumerable: true, get: function() {
          return w.createTraceState;
        } }), _ = C(139), Object.defineProperty(T, "isSpanContextValid", { enumerable: true, get: function() {
          return _.isSpanContextValid;
        } }), Object.defineProperty(T, "isValidTraceId", { enumerable: true, get: function() {
          return _.isValidTraceId;
        } }), Object.defineProperty(T, "isValidSpanId", { enumerable: true, get: function() {
          return _.isValidSpanId;
        } }), E = C(476), Object.defineProperty(T, "INVALID_SPANID", { enumerable: true, get: function() {
          return E.INVALID_SPANID;
        } }), Object.defineProperty(T, "INVALID_TRACEID", { enumerable: true, get: function() {
          return E.INVALID_TRACEID;
        } }), Object.defineProperty(T, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return E.INVALID_SPAN_CONTEXT;
        } }), r2 = C(67), Object.defineProperty(T, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = C(506), Object.defineProperty(T, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), i = C(886), Object.defineProperty(T, "metrics", { enumerable: true, get: function() {
          return i.metrics;
        } }), a = C(939), Object.defineProperty(T, "propagation", { enumerable: true, get: function() {
          return a.propagation;
        } }), o = C(845), Object.defineProperty(T, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), T.default = { context: r2.context, diag: n.diag, metrics: i.metrics, propagation: a.propagation, trace: o.trace }, t.exports = T;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, i, a = {};
        a.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var i2 = {}, a2 = t2.split(n), o = (r3 || {}).decode || e2, s = 0; s < a2.length; s++) {
            var l = a2[s], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[u] && (i2[u] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(d, o));
            }
          }
          return i2;
        }, a.serialize = function(e3, t2, n2) {
          var a2 = n2 || {}, o = a2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!i.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !i.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != a2.maxAge) {
            var c = a2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (a2.domain) {
            if (!i.test(a2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + a2.domain;
          }
          if (a2.path) {
            if (!i.test(a2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + a2.path;
          }
          if (a2.expires) {
            if ("function" != typeof a2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + a2.expires.toUTCString();
          }
          if (a2.httpOnly && (l += "; HttpOnly"), a2.secure && (l += "; Secure"), a2.sameSite) switch ("string" == typeof a2.sameSite ? a2.sameSite.toLowerCase() : a2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = a;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, i, a;
        var o = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function i2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function a2(e4, t3, n3, a3, o3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s3 = new i2(n3, a3 || e4, o3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && i3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e4)) : i3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, a3 = n3.length, o3 = Array(a3); i3 < a3; i3++) o3[i3] = n3[i3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, i3, a3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var l2, c2, u = this._events[s3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, i3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, i3, a3), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, i3, a3, o3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var p, h = u.length;
              for (c2 = 0; c2 < h; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
                case 1:
                  u[c2].fn.call(u[c2].context);
                  break;
                case 2:
                  u[c2].fn.call(u[c2].context, t3);
                  break;
                case 3:
                  u[c2].fn.call(u[c2].context, t3, n3);
                  break;
                case 4:
                  u[c2].fn.call(u[c2].context, t3, n3, i3);
                  break;
                default:
                  if (!l2) for (p = 1, l2 = Array(d - 1); p < d; p++) l2[p - 1] = arguments[p];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, i3) {
            var a3 = r3 ? r3 + e4 : e4;
            if (!this._events[a3]) return this;
            if (!t3) return o2(this, a3), this;
            var s3 = this._events[a3];
            if (s3.fn) s3.fn !== t3 || i3 && !s3.once || n3 && s3.context !== n3 || o2(this, a3);
            else {
              for (var l2 = 0, c2 = [], u = s3.length; l2 < u; l2++) (s3[l2].fn !== t3 || i3 && !s3[l2].once || n3 && s3[l2].context !== n3) && c2.push(s3[l2]);
              c2.length ? this._events[a3] = 1 === c2.length ? c2[0] : c2 : o2(this, a3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, i2 = e4.length;
            for (; i2 > 0; ) {
              let a2 = i2 / 2 | 0, o2 = n2 + a2;
              0 >= r3(e4[o2], t3) ? (n2 = ++o2, i2 -= a2 + 1) : i2 = a2;
            }
            return n2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let i2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(i2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let n2 = r3(213);
          class i2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let a2 = (e4, t3, r4) => new Promise((a3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void a3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  a3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new i2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            n2(e4.then(a3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = a2, e3.exports.default = a2, e3.exports.TimeoutError = i2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, n2 = true;
          try {
            o[e3](r3, r3.exports, l), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(993), r2 = l(816), n = l(821), i = () => {
        }, a = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, a2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (a2 = e3.interval) ? void 0 : a2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, i2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && i2(a);
                  });
                  n2(await o3);
                } catch (e4) {
                  i2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }, 51615, (e, t, r) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return s;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let n2 = o(e2, t2);
        return n2 ? a.run(n2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = a.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { handleFetch: function() {
        return c;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return s;
      } };
      for (var a in i) Object.defineProperty(r, a, { enumerable: true, get: i[a] });
      let o = e.r(25085), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: o2, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: p, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d, referrer: p, referrerPolicy: h } };
      }
      async function c(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: i2, proxyPort: a2 } = r2, c2 = await l(i2, t2), u2 = await e2(`http://localhost:${a2}`, { method: "POST", body: JSON.stringify(c2), next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let d = await u2.json(), { api: p } = d;
        switch (p) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: i3 } = e3.response;
              return new Response(i3 ? n.Buffer.from(i3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(d);
          default:
            return p;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : c(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = e.r(25085), o = e.r(28325);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, a.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 54846, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 114: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, n3 = "", i = 0, a = -1, o = 0, s = 0; s <= e4.length; ++s) {
              if (s < e4.length) r4 = e4.charCodeAt(s);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (a === s - 1 || 1 === o) ;
                else if (a !== s - 1 && 2 === o) {
                  if (n3.length < 2 || 2 !== i || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
                    if (n3.length > 2) {
                      var l = n3.lastIndexOf("/");
                      if (l !== n3.length - 1) {
                        -1 === l ? (n3 = "", i = 0) : i = (n3 = n3.slice(0, l)).length - 1 - n3.lastIndexOf("/"), a = s, o = 0;
                        continue;
                      }
                    } else if (2 === n3.length || 1 === n3.length) {
                      n3 = "", i = 0, a = s, o = 0;
                      continue;
                    }
                  }
                  t3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", i = 2);
                } else n3.length > 0 ? n3 += "/" + e4.slice(a + 1, s) : n3 = e4.slice(a + 1, s), i = s - a - 1;
                a = s, o = 0;
              } else 46 === r4 && -1 !== o ? ++o : o = -1;
            }
            return n3;
          }
          var n2 = { resolve: function() {
            for (var e4, n3, i = "", a = false, o = arguments.length - 1; o >= -1 && !a; o--) o >= 0 ? n3 = arguments[o] : (void 0 === e4 && (e4 = ""), n3 = e4), t2(n3), 0 !== n3.length && (i = n3 + "/" + i, a = 47 === n3.charCodeAt(0));
            if (i = r3(i, !a), a) if (i.length > 0) return "/" + i;
            else return "/";
            return i.length > 0 ? i : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var n3 = 47 === e4.charCodeAt(0), i = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !n3)).length || n3 || (e4 = "."), e4.length > 0 && i && (e4 += "/"), n3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var i = arguments[r4];
              t2(i), i.length > 0 && (void 0 === e4 ? e4 = i : e4 += "/" + i);
            }
            return void 0 === e4 ? "." : n2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = n2.resolve(e4)) === (r4 = n2.resolve(r4))) return "";
            for (var i = 1; i < e4.length && 47 === e4.charCodeAt(i); ++i) ;
            for (var a = e4.length, o = a - i, s = 1; s < r4.length && 47 === r4.charCodeAt(s); ++s) ;
            for (var l = r4.length - s, c = o < l ? o : l, u = -1, d = 0; d <= c; ++d) {
              if (d === c) {
                if (l > c) {
                  if (47 === r4.charCodeAt(s + d)) return r4.slice(s + d + 1);
                  else if (0 === d) return r4.slice(s + d);
                } else o > c && (47 === e4.charCodeAt(i + d) ? u = d : 0 === d && (u = 0));
                break;
              }
              var p = e4.charCodeAt(i + d);
              if (p !== r4.charCodeAt(s + d)) break;
              47 === p && (u = d);
            }
            var h = "";
            for (d = i + u + 1; d <= a; ++d) (d === a || 47 === e4.charCodeAt(d)) && (0 === h.length ? h += ".." : h += "/..");
            return h.length > 0 ? h + r4.slice(s + u) : (s += u, 47 === r4.charCodeAt(s) && ++s, r4.slice(s));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), n3 = 47 === r4, i = -1, a = true, o = e4.length - 1; o >= 1; --o) if (47 === (r4 = e4.charCodeAt(o))) {
              if (!a) {
                i = o;
                break;
              }
            } else a = false;
            return -1 === i ? n3 ? "/" : "." : n3 && 1 === i ? "//" : e4.slice(0, i);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var n3, i = 0, a = -1, o = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var s = r4.length - 1, l = -1;
              for (n3 = e4.length - 1; n3 >= 0; --n3) {
                var c = e4.charCodeAt(n3);
                if (47 === c) {
                  if (!o) {
                    i = n3 + 1;
                    break;
                  }
                } else -1 === l && (o = false, l = n3 + 1), s >= 0 && (c === r4.charCodeAt(s) ? -1 == --s && (a = n3) : (s = -1, a = l));
              }
              return i === a ? a = l : -1 === a && (a = e4.length), e4.slice(i, a);
            }
            for (n3 = e4.length - 1; n3 >= 0; --n3) if (47 === e4.charCodeAt(n3)) {
              if (!o) {
                i = n3 + 1;
                break;
              }
            } else -1 === a && (o = false, a = n3 + 1);
            return -1 === a ? "" : e4.slice(i, a);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, n3 = 0, i = -1, a = true, o = 0, s = e4.length - 1; s >= 0; --s) {
              var l = e4.charCodeAt(s);
              if (47 === l) {
                if (!a) {
                  n3 = s + 1;
                  break;
                }
                continue;
              }
              -1 === i && (a = false, i = s + 1), 46 === l ? -1 === r4 ? r4 = s : 1 !== o && (o = 1) : -1 !== r4 && (o = -1);
            }
            return -1 === r4 || -1 === i || 0 === o || 1 === o && r4 === i - 1 && r4 === n3 + 1 ? "" : e4.slice(r4, i);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, n3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return n3;
            var i = e4.charCodeAt(0), a = 47 === i;
            a ? (n3.root = "/", r4 = 1) : r4 = 0;
            for (var o = -1, s = 0, l = -1, c = true, u = e4.length - 1, d = 0; u >= r4; --u) {
              if (47 === (i = e4.charCodeAt(u))) {
                if (!c) {
                  s = u + 1;
                  break;
                }
                continue;
              }
              -1 === l && (c = false, l = u + 1), 46 === i ? -1 === o ? o = u : 1 !== d && (d = 1) : -1 !== o && (d = -1);
            }
            return -1 === o || -1 === l || 0 === d || 1 === d && o === l - 1 && o === s + 1 ? -1 !== l && (0 === s && a ? n3.base = n3.name = e4.slice(1, l) : n3.base = n3.name = e4.slice(s, l)) : (0 === s && a ? (n3.name = e4.slice(1, o), n3.base = e4.slice(1, l)) : (n3.name = e4.slice(s, o), n3.base = e4.slice(s, l)), n3.ext = e4.slice(o, l)), s > 0 ? n3.dir = e4.slice(0, s - 1) : a && (n3.dir = "/"), n3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          n2.posix = n2, e3.exports = n2;
        } }, r2 = {};
        function n(t2) {
          var i = r2[t2];
          if (void 0 !== i) return i.exports;
          var a = r2[t2] = { exports: {} }, o = true;
          try {
            e2[t2](a, a.exports, n), o = false;
          } finally {
            o && delete r2[t2];
          }
          return a.exports;
        }
        n.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = n(114);
      }();
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var n3 = e4[r4];
                if ("*" === n3 || "+" === n3 || "?" === n3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === n3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === n3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === n3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === n3) {
                  for (var i2 = "", a3 = r4 + 1; a3 < e4.length; ) {
                    var o3 = e4.charCodeAt(a3);
                    if (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 90 || o3 >= 97 && o3 <= 122 || 95 === o3) {
                      i2 += e4[a3++];
                      continue;
                    }
                    break;
                  }
                  if (!i2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: i2 }), r4 = a3;
                  continue;
                }
                if ("(" === n3) {
                  var s3 = 1, l2 = "", a3 = r4 + 1;
                  if ("?" === e4[a3]) throw TypeError('Pattern cannot start with "?" at '.concat(a3));
                  for (; a3 < e4.length; ) {
                    if ("\\" === e4[a3]) {
                      l2 += e4[a3++] + e4[a3++];
                      continue;
                    }
                    if (")" === e4[a3]) {
                      if (0 == --s3) {
                        a3++;
                        break;
                      }
                    } else if ("(" === e4[a3] && (s3++, "?" !== e4[a3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(a3));
                    l2 += e4[a3++];
                  }
                  if (s3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = a3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), n2 = t3.prefixes, a2 = void 0 === n2 ? "./" : n2, o2 = t3.delimiter, s2 = void 0 === o2 ? "/#?" : o2, l = [], c = 0, u = 0, d = "", p = function(e4) {
              if (u < r3.length && r3[u].type === e4) return r3[u++].value;
            }, h = function(e4) {
              var t4 = p(e4);
              if (void 0 !== t4) return t4;
              var n3 = r3[u], i2 = n3.type, a3 = n3.index;
              throw TypeError("Unexpected ".concat(i2, " at ").concat(a3, ", expected ").concat(e4));
            }, f = function() {
              for (var e4, t4 = ""; e4 = p("CHAR") || p("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, g = function(e4) {
              for (var t4 = 0; t4 < s2.length; t4++) {
                var r4 = s2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, m = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || g(r4) ? "[^".concat(i(s2), "]+?") : "(?:(?!".concat(i(r4), ")[^").concat(i(s2), "])+?");
            }; u < r3.length; ) {
              var y = p("CHAR"), v = p("NAME"), b = p("PATTERN");
              if (v || b) {
                var w = y || "";
                -1 === a2.indexOf(w) && (d += w, w = ""), d && (l.push(d), d = ""), l.push({ name: v || c++, prefix: w, suffix: "", pattern: b || m(w), modifier: p("MODIFIER") || "" });
                continue;
              }
              var _ = y || p("ESCAPED_CHAR");
              if (_) {
                d += _;
                continue;
              }
              if (d && (l.push(d), d = ""), p("OPEN")) {
                var w = f(), E = p("NAME") || "", x = p("PATTERN") || "", S = f();
                h("CLOSE"), l.push({ name: E || (x ? c++ : ""), pattern: E && !x ? m(w) : x, prefix: w, suffix: S, modifier: p("MODIFIER") || "" });
                continue;
              }
              h("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = a(t3), n2 = t3.encode, i2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2, o2 = t3.validate, s2 = void 0 === o2 || o2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", n3 = 0; n3 < e3.length; n3++) {
                var a2 = e3[n3];
                if ("string" == typeof a2) {
                  r4 += a2;
                  continue;
                }
                var o3 = t4 ? t4[a2.name] : void 0, c = "?" === a2.modifier || "*" === a2.modifier, u = "*" === a2.modifier || "+" === a2.modifier;
                if (Array.isArray(o3)) {
                  if (!u) throw TypeError('Expected "'.concat(a2.name, '" to not repeat, but got an array'));
                  if (0 === o3.length) {
                    if (c) continue;
                    throw TypeError('Expected "'.concat(a2.name, '" to not be empty'));
                  }
                  for (var d = 0; d < o3.length; d++) {
                    var p = i2(o3[d], a2);
                    if (s2 && !l[n3].test(p)) throw TypeError('Expected all "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(p, '"'));
                    r4 += a2.prefix + p + a2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof o3 || "number" == typeof o3) {
                  var p = i2(String(o3), a2);
                  if (s2 && !l[n3].test(p)) throw TypeError('Expected "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(p, '"'));
                  r4 += a2.prefix + p + a2.suffix;
                  continue;
                }
                if (!c) {
                  var h = u ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(a2.name, '" to be ').concat(h));
                }
              }
              return r4;
            };
          }
          function n(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var n2 = r3.decode, i2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2;
            return function(r4) {
              var n3 = e3.exec(r4);
              if (!n3) return false;
              for (var a2 = n3[0], o2 = n3.index, s2 = /* @__PURE__ */ Object.create(null), l = 1; l < n3.length; l++) !function(e4) {
                if (void 0 !== n3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? s2[r5.name] = n3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return i2(e5, r5);
                  }) : s2[r5.name] = i2(n3[e4], r5);
                }
              }(l);
              return { path: a2, index: o2, params: s2 };
            };
          }
          function i(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function a(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function o(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var n2 = r3.strict, o2 = void 0 !== n2 && n2, s2 = r3.start, l = r3.end, c = r3.encode, u = void 0 === c ? function(e4) {
              return e4;
            } : c, d = r3.delimiter, p = r3.endsWith, h = "[".concat(i(void 0 === p ? "" : p), "]|$"), f = "[".concat(i(void 0 === d ? "/#?" : d), "]"), g = void 0 === s2 || s2 ? "^" : "", m = 0; m < e3.length; m++) {
              var y = e3[m];
              if ("string" == typeof y) g += i(u(y));
              else {
                var v = i(u(y.prefix)), b = i(u(y.suffix));
                if (y.pattern) if (t3 && t3.push(y), v || b) if ("+" === y.modifier || "*" === y.modifier) {
                  var w = "*" === y.modifier ? "?" : "";
                  g += "(?:".concat(v, "((?:").concat(y.pattern, ")(?:").concat(b).concat(v, "(?:").concat(y.pattern, "))*)").concat(b, ")").concat(w);
                } else g += "(?:".concat(v, "(").concat(y.pattern, ")").concat(b, ")").concat(y.modifier);
                else {
                  if ("+" === y.modifier || "*" === y.modifier) throw TypeError('Can not repeat "'.concat(y.name, '" without a prefix and suffix'));
                  g += "(".concat(y.pattern, ")").concat(y.modifier);
                }
                else g += "(?:".concat(v).concat(b, ")").concat(y.modifier);
              }
            }
            if (void 0 === l || l) o2 || (g += "".concat(f, "?")), g += r3.endsWith ? "(?=".concat(h, ")") : "$";
            else {
              var _ = e3[e3.length - 1], E = "string" == typeof _ ? f.indexOf(_[_.length - 1]) > -1 : void 0 === _;
              o2 || (g += "(?:".concat(f, "(?=").concat(h, "))?")), E || (g += "(?=".concat(f, "|").concat(h, ")"));
            }
            return new RegExp(g, a(r3));
          }
          function s(e3, r3, n2) {
            if (e3 instanceof RegExp) {
              var i2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, c = 0, u = l.exec(e3.source); u; ) r3.push({ name: u[1] || c++, prefix: "", suffix: "", modifier: "", pattern: "" }), u = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (i2 = e3.map(function(e4) {
              return s(e4, r3, n2).source;
            }), new RegExp("(?:".concat(i2.join("|"), ")"), a(n2))) : o(t2(e3, n2), r3, n2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, n2) {
            return r2(t2(e3, n2), n2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return n(s(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = n, e2.tokensToRegexp = o, e2.pathToRegexp = s;
        })(), t.exports = e2;
      })();
    }, 64445, (e, t, r) => {
      var n = { 226: function(t2, r2) {
        !function(n2) {
          "use strict";
          var i2 = "function", a2 = "undefined", o = "object", s = "string", l = "major", c = "model", u = "name", d = "type", p = "vendor", h = "version", f = "architecture", g = "console", m = "mobile", y = "tablet", v = "smarttv", b = "wearable", w = "embedded", _ = "Amazon", E = "Apple", x = "ASUS", S = "BlackBerry", C = "Browser", T = "Chrome", P = "Firefox", A = "Google", O = "Huawei", R = "Microsoft", k = "Motorola", N = "Opera", I = "Samsung", M = "Sharp", D = "Sony", j = "Xiaomi", L = "Zebra", H = "Facebook", U = "Chromium OS", $ = "Mac OS", W = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, K = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, B = function(e2, t3) {
            return typeof e2 === s && -1 !== q(t3).indexOf(q(e2));
          }, q = function(e2) {
            return e2.toLowerCase();
          }, V = function(e2, t3) {
            if (typeof e2 === s) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a2 ? e2 : e2.substring(0, 350);
          }, G = function(e2, t3) {
            for (var r3, n3, a3, s2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], p2 = t3[u2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (a3 = 0; a3 < p2.length; a3++) c2 = l2[++n3], typeof (s2 = p2[a3]) === o && s2.length > 0 ? 2 === s2.length ? typeof s2[1] == i2 ? this[s2[0]] = s2[1].call(this, c2) : this[s2[0]] = s2[1] : 3 === s2.length ? typeof s2[1] !== i2 || s2[1].exec && s2[1].test ? this[s2[0]] = c2 ? c2.replace(s2[1], s2[2]) : void 0 : this[s2[0]] = c2 ? s2[1].call(this, c2, s2[2]) : void 0 : 4 === s2.length && (this[s2[0]] = c2 ? s2[3].call(this, c2.replace(s2[1], s2[2])) : void 0) : this[s2] = c2 || void 0;
              u2 += 2;
            }
          }, F = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (B(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (B(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, z = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, J = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [h, [u, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [h, [u, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [u, h], [/opios[\/ ]+([\w\.]+)/i], [h, [u, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [h, [u, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [u, h], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [h, [u, "UC" + C]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [h, [u, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [h, [u, "WeChat"]], [/konqueror\/([\w\.]+)/i], [h, [u, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [h, [u, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [h, [u, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[u, /(.+)/, "$1 Secure " + C], h], [/\bfocus\/([\w\.]+)/i], [h, [u, P + " Focus"]], [/\bopt\/([\w\.]+)/i], [h, [u, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [h, [u, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [h, [u, "Dolphin"]], [/coast\/([\w\.]+)/i], [h, [u, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [h, [u, "MIUI " + C]], [/fxios\/([-\w\.]+)/i], [h, [u, P]], [/\bqihu|(qi?ho?o?|360)browser/i], [[u, "360 " + C]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[u, /(.+)/, "$1 " + C], h], [/(comodo_dragon)\/([\w\.]+)/i], [[u, /_/g, " "], h], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [u, h], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [u], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[u, H], h], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [u, h], [/\bgsa\/([\w\.]+) .*safari\//i], [h, [u, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [h, [u, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [h, [u, T + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[u, T + " WebView"], h], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [h, [u, "Android " + C]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [u, h], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [h, [u, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [h, u], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [u, [h, F, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [u, h], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[u, "Netscape"], h], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [h, [u, P + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [u, h], [/(cobalt)\/([\w\.]+)/i], [u, [h, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, q]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", q]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, q]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [p, I], [d, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [p, I], [d, m]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [c, [p, E], [d, m]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [p, E], [d, y]], [/(macintosh);/i], [c, [p, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [p, M], [d, m]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [p, O], [d, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [c, [p, O], [d, m]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [p, j], [d, m]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [p, j], [d, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [c, [p, "OPPO"], [d, m]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [p, "Vivo"], [d, m]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [p, "Realme"], [d, m]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [p, k], [d, m]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [p, k], [d, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [p, "LG"], [d, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [p, "LG"], [d, m]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [p, "Lenovo"], [d, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [p, "Nokia"], [d, m]], [/(pixel c)\b/i], [c, [p, A], [d, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [p, A], [d, m]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [p, D], [d, m]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [p, D], [d, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [p, "OnePlus"], [d, m]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [p, _], [d, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [p, _], [d, m]], [/(playbook);[-\w\),; ]+(rim)/i], [c, p, [d, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [p, S], [d, m]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [p, x], [d, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [p, x], [d, m]], [/(nexus 9)/i], [c, [p, "HTC"], [d, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [c, /_/g, " "], [d, m]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [p, "Acer"], [d, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [p, "Meizu"], [d, m]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [p, c, [d, m]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, c, [d, y]], [/(surface duo)/i], [c, [p, R], [d, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [p, "Fairphone"], [d, m]], [/(u304aa)/i], [c, [p, "AT&T"], [d, m]], [/\bsie-(\w*)/i], [c, [p, "Siemens"], [d, m]], [/\b(rct\w+) b/i], [c, [p, "RCA"], [d, y]], [/\b(venue[\d ]{2,7}) b/i], [c, [p, "Dell"], [d, y]], [/\b(q(?:mv|ta)\w+) b/i], [c, [p, "Verizon"], [d, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [p, "Barnes & Noble"], [d, y]], [/\b(tm\d{3}\w+) b/i], [c, [p, "NuVision"], [d, y]], [/\b(k88) b/i], [c, [p, "ZTE"], [d, y]], [/\b(nx\d{3}j) b/i], [c, [p, "ZTE"], [d, m]], [/\b(gen\d{3}) b.+49h/i], [c, [p, "Swiss"], [d, m]], [/\b(zur\d{3}) b/i], [c, [p, "Swiss"], [d, y]], [/\b((zeki)?tb.*\b) b/i], [c, [p, "Zeki"], [d, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], c, [d, y]], [/\b(ns-?\w{0,9}) b/i], [c, [p, "Insignia"], [d, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [p, "NextBook"], [d, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], c, [d, m]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], c, [d, m]], [/\b(ph-1) /i], [c, [p, "Essential"], [d, m]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [p, "Envizen"], [d, y]], [/\b(trio[-\w\. ]+) b/i], [c, [p, "MachSpeed"], [d, y]], [/\btu_(1491) b/i], [c, [p, "Rotor"], [d, y]], [/(shield[\w ]+) b/i], [c, [p, "Nvidia"], [d, y]], [/(sprint) (\w+)/i], [p, c, [d, m]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [p, R], [d, m]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [p, L], [d, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [p, L], [d, m]], [/smart-tv.+(samsung)/i], [p, [d, v]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [p, I], [d, v]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, "LG"], [d, v]], [/(apple) ?tv/i], [p, [c, E + " TV"], [d, v]], [/crkey/i], [[c, T + "cast"], [p, A], [d, v]], [/droid.+aft(\w)( bui|\))/i], [c, [p, _], [d, v]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [c, [p, M], [d, v]], [/(bravia[\w ]+)( bui|\))/i], [c, [p, D], [d, v]], [/(mitv-\w{5}) bui/i], [c, [p, j], [d, v]], [/Hbbtv.*(technisat) (.*);/i], [p, c, [d, v]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[p, V], [c, V], [d, v]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, v]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, c, [d, g]], [/droid.+; (shield) bui/i], [c, [p, "Nvidia"], [d, g]], [/(playstation [345portablevi]+)/i], [c, [p, D], [d, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [p, R], [d, g]], [/((pebble))app/i], [p, c, [d, b]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [c, [p, E], [d, b]], [/droid.+; (glass) \d/i], [c, [p, A], [d, b]], [/droid.+; (wt63?0{2,3})\)/i], [c, [p, L], [d, b]], [/(quest( 2| pro)?)/i], [c, [p, H], [d, b]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [d, w]], [/(aeobc)\b/i], [c, [p, _], [d, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [d, m]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [d, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, m]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [p, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [h, [u, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [h, [u, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [u, h], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [h, u]], os: [[/microsoft (windows) (vista|xp)/i], [u, h], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [u, [h, F, z]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[u, "Windows"], [h, F, z]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[h, /_/g, "."], [u, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[u, $], [h, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [h, u], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [u, h], [/\(bb(10);/i], [h, [u, S]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [h, [u, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [h, [u, P + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [h, [u, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [h, [u, "watchOS"]], [/crkey\/([\d\.]+)/i], [h, [u, T + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[u, U], h], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [u, h], [/(sunos) ?([\w\.\d]*)/i], [[u, "Solaris"], h], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [u, h]] }, X = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof X)) return new X(e2, t3).getResult();
            var r3 = typeof n2 !== a2 && n2.navigator ? n2.navigator : void 0, g2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), v2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, b2 = t3 ? W(J, t3) : J, w2 = r3 && r3.userAgent == g2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[u] = void 0, t4[h] = void 0, G.call(t4, g2, b2.browser), t4[l] = typeof (e3 = t4[h]) === s ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, w2 && r3 && r3.brave && typeof r3.brave.isBrave == i2 && (t4[u] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[f] = void 0, G.call(e3, g2, b2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[p] = void 0, e3[c] = void 0, e3[d] = void 0, G.call(e3, g2, b2.device), w2 && !e3[d] && v2 && v2.mobile && (e3[d] = m), w2 && "Macintosh" == e3[c] && r3 && typeof r3.standalone !== a2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[c] = "iPad", e3[d] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[u] = void 0, e3[h] = void 0, G.call(e3, g2, b2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[u] = void 0, e3[h] = void 0, G.call(e3, g2, b2.os), w2 && !e3[u] && v2 && "Unknown" != v2.platform && (e3[u] = v2.platform.replace(/chrome os/i, U).replace(/macos/i, $)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return g2;
            }, this.setUA = function(e3) {
              return g2 = typeof e3 === s && e3.length > 350 ? V(e3, 350) : e3, this;
            }, this.setUA(g2), this;
          };
          if (X.VERSION = "1.0.35", X.BROWSER = K([u, h, l]), X.CPU = K([f]), X.DEVICE = K([c, p, d, g, m, v, y, b, w]), X.ENGINE = X.OS = K([u, h]), typeof r2 !== a2) t2.exports && (r2 = t2.exports = X), r2.UAParser = X;
          else if (typeof define === i2 && define.amd) e.r, void 0 !== X && e.v(X);
          else typeof n2 !== a2 && (n2.UAParser = X);
          var Y = typeof n2 !== a2 && (n2.jQuery || n2.Zepto);
          if (Y && !Y.ua) {
            var Q = new X();
            Y.ua = Q.getResult(), Y.ua.get = function() {
              return Q.getUA();
            }, Y.ua.set = function(e2) {
              Q.setUA(e2);
              var t3 = Q.getResult();
              for (var r3 in t3) Y.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, i = {};
      function a(e2) {
        var t2 = i[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = i[e2] = { exports: {} }, o = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, a), o = false;
        } finally {
          o && delete i[e2];
        }
        return r2.exports;
      }
      a.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = a(226);
    }, 8946, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function i(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var a = Array.isArray;
      function o() {
      }
      var s = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), p = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), y = Symbol.for("react.view_transition"), v = Symbol.iterator, b = Object.prototype.hasOwnProperty, w = Object.assign;
      function _(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function E(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var x = /\/+/g;
      function S(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function C(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], c2 = 0;
        return !function e3(t3, r3, n3, c3, u2) {
          var d2, p2, h2, f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case l:
                  m2 = true;
                  break;
                case g:
                  return e3((m2 = t3._init)(t3._payload), r3, n3, c3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === c3 ? "." + S(t3, 0) : c3, a(u2) ? (n3 = "", null != m2 && (n3 = m2.replace(x, "$&/") + "/"), e3(u2, r3, n3, "", function(e4) {
            return e4;
          })) : null != u2 && (E(u2) && (d2 = u2, p2 = n3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(x, "$&/") + "/") + m2, u2 = _(d2.type, p2, d2.props)), r3.push(u2)), 1;
          m2 = 0;
          var y2 = "" === c3 ? "." : c3 + ":";
          if (a(t3)) for (var b2 = 0; b2 < t3.length; b2++) f2 = y2 + S(c3 = t3[b2], b2), m2 += e3(c3, r3, n3, f2, u2);
          else if ("function" == typeof (b2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = v && h2[v] || h2["@@iterator"]) ? h2 : null)) for (t3 = b2.call(t3), b2 = 0; !(c3 = t3.next()).done; ) f2 = y2 + S(c3 = c3.value, b2++), m2 += e3(c3, r3, n3, f2, u2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, c3, u2);
            throw Error(i(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), n2;
      }
      function T(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function P() {
        return /* @__PURE__ */ new WeakMap();
      }
      function A() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = m, r.Children = { map: C, forEach: function(e2, t2, r2) {
        C(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return C(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return C(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!E(e2)) throw Error(i(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = d, r.StrictMode = u, r.Suspense = h, r.ViewTransition = y, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(P);
          void 0 === (t2 = r2.get(e2)) && (t2 = A(), r2.set(e2, t2)), r2 = 0;
          for (var i2 = arguments.length; r2 < i2; r2++) {
            var a2 = arguments[r2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = A(), o2.set(a2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = A(), o2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(i(267, e2));
        var n2 = w({}, e2.props), a2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) b.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (n2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        return _(e2.type, a2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, a2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) b.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          i2.children = s2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = o2[n2]);
        return _(e2, a2, i2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: p, render: e2 };
      }, r.isValidElement = E, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: T };
      }, r.memo = function(e2, t2) {
        return { $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-3f0b9e61-20260317";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 42738, (e) => {
      "use strict";
      let t, r, n, i, a;
      async function o() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let s = null;
      async function l() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        s || (s = o());
        let e10 = await s;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function c(...e10) {
        let t10 = await o();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let u = null;
      function d() {
        return u || (u = l()), u;
      }
      function p(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(p(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(p(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, n2, i2) {
            if ("function" == typeof i2[0]) return i2[0](t10);
            throw Object.defineProperty(Error(p(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      d();
      class h extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class f extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class g extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let m = "x-prerender-revalidate", y = ".meta", v = "x-next-cache-tags", b = "x-next-revalidated-tags", w = "_N_T_", _ = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function E(e10) {
        var t10, r10, n2, i2, a2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t10 = s2, a2 = false; l2(); ) if ("," === (r10 = e10.charAt(s2))) {
            for (n2 = s2, s2 += 1, l2(), i2 = s2; s2 < e10.length && "=" !== (r10 = e10.charAt(s2)) && ";" !== r10 && "," !== r10; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (a2 = true, s2 = i2, o2.push(e10.substring(t10, n2)), t10 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!a2 || s2 >= e10.length) && o2.push(e10.substring(t10, e10.length));
        }
        return o2;
      }
      function x(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n2, i2] of e10.entries()) "set-cookie" === n2.toLowerCase() ? (r10.push(...E(i2)), t10[n2] = 1 === r10.length ? r10[0] : r10) : t10[n2] = i2;
        return t10;
      }
      function S(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ..._, GROUP: { builtinReact: [_.reactServerComponents, _.actionBrowser], serverOnly: [_.reactServerComponents, _.actionBrowser, _.instrument, _.middleware], neutralTarget: [_.apiNode, _.apiEdge], clientOnly: [_.serverSideRendering, _.appPagesBrowser], bundled: [_.reactServerComponents, _.actionBrowser, _.serverSideRendering, _.appPagesBrowser, _.shared, _.instrument, _.middleware], appPages: [_.reactServerComponents, _.serverSideRendering, _.appPagesBrowser, _.actionBrowser] } });
      let C = Symbol("response"), T = Symbol("passThrough"), P = Symbol("waitUntil");
      class A {
        constructor(e10, t10) {
          this[T] = false, this[P] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[C] || (this[C] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[T] = true;
        }
        waitUntil(e10) {
          if ("external" === this[P].kind) return (0, this[P].function)(e10);
          this[P].promises.push(e10);
        }
      }
      class O extends A {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function R(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function k(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n2 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n2 || t10 > -1 ? { pathname: e10.substring(0, n2 ? r10 : t10), query: n2 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function N(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n2, hash: i2 } = k(e10);
        return `${t10}${r10}${n2}${i2}`;
      }
      function I(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n2, hash: i2 } = k(e10);
        return `${r10}${t10}${n2}${i2}`;
      }
      function M(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = k(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let D = /* @__PURE__ */ new WeakMap();
      function j(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n2 = D.get(t10);
        n2 || (n2 = t10.map((e11) => e11.toLowerCase()), D.set(t10, n2));
        let i2 = e10.split("/", 2);
        if (!i2[1]) return { pathname: e10 };
        let a2 = i2[1].toLowerCase(), o2 = n2.indexOf(a2);
        return o2 < 0 ? { pathname: e10 } : (r10 = t10[o2], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let L = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function H(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return L.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let U = Symbol("NextURLInternal");
      class $ {
        constructor(e10, t10, r10) {
          let n2, i2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n2 = t10, i2 = r10 || {}) : i2 = r10 || t10 || {}, this[U] = { url: H(e10, n2 ?? i2.base), options: i2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n2, i2;
          let a2 = function(e11, t11) {
            let { basePath: r11, i18n: n3, trailingSlash: i3 } = t11.nextConfig ?? {}, a3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : i3 };
            r11 && M(a3.pathname, r11) && (a3.pathname = function(e12, t12) {
              if (!M(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(a3.pathname, r11), a3.basePath = r11);
            let o3 = a3.pathname;
            if (a3.pathname.startsWith("/_next/data/") && a3.pathname.endsWith(".json")) {
              let e12 = a3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              a3.buildId = e12[0], o3 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (a3.pathname = o3);
            }
            if (n3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a3.pathname) : j(a3.pathname, n3.locales);
              a3.locale = e12.detectedLocale, a3.pathname = e12.pathname ?? a3.pathname, !e12.detectedLocale && a3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3) : j(o3, n3.locales)).detectedLocale && (a3.locale = e12.detectedLocale);
            }
            return a3;
          }(this[U].url.pathname, { nextConfig: this[U].options.nextConfig, parseData: true, i18nProvider: this[U].options.i18nProvider }), o2 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[U].url, this[U].options.headers);
          this[U].domainLocale = this[U].options.i18nProvider ? this[U].options.i18nProvider.detectDomainLocale(o2) : function(e11, t11, r11) {
            if (e11) {
              for (let n3 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n3.domain?.split(":", 1)[0].toLowerCase() || r11 === n3.defaultLocale.toLowerCase() || n3.locales?.some((e12) => e12.toLowerCase() === r11)) return n3;
            }
          }(null == (t10 = this[U].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r10 = this[U].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i2 = this[U].options.nextConfig) || null == (n2 = i2.i18n) ? void 0 : n2.defaultLocale);
          this[U].url.pathname = a2.pathname, this[U].defaultLocale = s2, this[U].basePath = a2.basePath ?? "", this[U].buildId = a2.buildId, this[U].locale = a2.locale ?? s2, this[U].trailingSlash = a2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n2) {
            if (!t11 || t11 === r10) return e11;
            let i2 = e11.toLowerCase();
            return !n2 && (M(i2, "/api") || M(i2, `/${t11.toLowerCase()}`)) ? e11 : N(e11, `/${t11}`);
          }((e10 = { basePath: this[U].basePath, buildId: this[U].buildId, defaultLocale: this[U].options.forceLocale ? void 0 : this[U].defaultLocale, locale: this[U].locale, pathname: this[U].url.pathname, trailingSlash: this[U].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = R(t10)), e10.buildId && (t10 = I(N(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = N(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : I(t10, "/") : R(t10);
        }
        formatSearch() {
          return this[U].url.search;
        }
        get buildId() {
          return this[U].buildId;
        }
        set buildId(e10) {
          this[U].buildId = e10;
        }
        get locale() {
          return this[U].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[U].locale || !(null == (r10 = this[U].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[U].locale = e10;
        }
        get defaultLocale() {
          return this[U].defaultLocale;
        }
        get domainLocale() {
          return this[U].domainLocale;
        }
        get searchParams() {
          return this[U].url.searchParams;
        }
        get host() {
          return this[U].url.host;
        }
        set host(e10) {
          this[U].url.host = e10;
        }
        get hostname() {
          return this[U].url.hostname;
        }
        set hostname(e10) {
          this[U].url.hostname = e10;
        }
        get port() {
          return this[U].url.port;
        }
        set port(e10) {
          this[U].url.port = e10;
        }
        get protocol() {
          return this[U].url.protocol;
        }
        set protocol(e10) {
          this[U].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[U].url = H(e10), this.analyze();
        }
        get origin() {
          return this[U].url.origin;
        }
        get pathname() {
          return this[U].url.pathname;
        }
        set pathname(e10) {
          this[U].url.pathname = e10;
        }
        get hash() {
          return this[U].url.hash;
        }
        set hash(e10) {
          this[U].url.hash = e10;
        }
        get search() {
          return this[U].url.search;
        }
        set search(e10) {
          this[U].url.search = e10;
        }
        get password() {
          return this[U].url.password;
        }
        set password(e10) {
          this[U].url.password = e10;
        }
        get username() {
          return this[U].url.username;
        }
        set username(e10) {
          this[U].url.username = e10;
        }
        get basePath() {
          return this[U].basePath;
        }
        set basePath(e10) {
          this[U].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new $(String(this), this[U].options);
        }
      }
      var W, K, B, q, V, G, F, z, J, X, Y, Q, Z, ee, et, er, en, ei, ea, eo, es, el = e.i(28042);
      let ec = Symbol("internal request");
      class eu extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          S(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const n2 = new $(r10, { headers: x(this.headers), nextConfig: t10.nextConfig });
          this[ec] = { cookies: new el.RequestCookies(this.headers), nextUrl: n2, url: n2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[ec].cookies;
        }
        get nextUrl() {
          return this[ec].nextUrl;
        }
        get page() {
          throw new f();
        }
        get ua() {
          throw new g();
        }
        get url() {
          return this[ec].url;
        }
      }
      class ed {
        static get(e10, t10, r10) {
          let n2 = Reflect.get(e10, t10, r10);
          return "function" == typeof n2 ? n2.bind(e10) : n2;
        }
        static set(e10, t10, r10, n2) {
          return Reflect.set(e10, t10, r10, n2);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let ep = Symbol("internal response"), eh = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ef(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [n2, i2] of e10.request.headers) t10.set("x-middleware-request-" + n2, i2), r11.push(n2);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class eg extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, n2 = new Proxy(new el.ResponseCookies(r10), { get(e11, n3, i2) {
            switch (n3) {
              case "delete":
              case "set":
                return (...i3) => {
                  let a2 = Reflect.apply(e11[n3], e11, i3), o2 = new Headers(r10);
                  return a2 instanceof el.ResponseCookies && r10.set("x-middleware-set-cookie", a2.getAll().map((e12) => (0, el.stringifyCookie)(e12)).join(",")), ef(t10, o2), a2;
                };
              default:
                return ed.get(e11, n3, i2);
            }
          } });
          this[ep] = { cookies: n2, url: t10.url ? new $(t10.url, { headers: x(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[ep].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new eg(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!eh.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n2 = "object" == typeof t10 ? t10 : {}, i2 = new Headers(null == n2 ? void 0 : n2.headers);
          return i2.set("Location", S(e10)), new eg(null, { ...n2, headers: i2, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", S(e10)), ef(t10, r10), new eg(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), ef(e10, t10), new eg(null, { ...e10, headers: t10 });
        }
      }
      function em(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n2 = new URL(e10, t10), i2 = n2.origin === r10.origin;
        return { url: i2 ? n2.toString().slice(r10.origin.length) : n2.toString(), isRelative: i2 };
      }
      let ey = "next-router-prefetch", ev = ["rsc", "next-router-state-tree", ey, "next-hmr-refresh", "next-router-segment-prefetch"], eb = "_rsc";
      function ew(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function e_(e10) {
        return ew(e10.split("/").reduce((e11, t10, r10, n2) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === n2.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eE extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eE();
        }
      }
      class ex extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n2) {
            if ("symbol" == typeof r10) return ed.get(t10, r10, n2);
            let i2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            if (void 0 !== a2) return ed.get(t10, a2, n2);
          }, set(t10, r10, n2, i2) {
            if ("symbol" == typeof r10) return ed.set(t10, r10, n2, i2);
            let a2 = r10.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return ed.set(t10, o2 ?? r10, n2, i2);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return ed.has(t10, r10);
            let n2 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 !== i2 && ed.has(t10, i2);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return ed.deleteProperty(t10, r10);
            let n2 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 === i2 || ed.deleteProperty(t10, i2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return eE.callable;
              default:
                return ed.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new ex(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n2] of this.entries()) e10.call(t10, n2, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let eS = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class eC {
        disable() {
          throw eS;
        }
        getStore() {
        }
        run() {
          throw eS;
        }
        exit() {
          throw eS;
        }
        enterWith() {
          throw eS;
        }
        static bind(e10) {
          return e10;
        }
      }
      let eT = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function eP() {
        return eT ? new eT() : new eC();
      }
      let eA = eP();
      class eO extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new eO();
        }
      }
      class eR {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eO.callable;
              default:
                return ed.get(e11, t10, r10);
            }
          } });
        }
      }
      let ek = Symbol.for("next.mutated.cookies");
      class eN {
        static wrap(e10, t10) {
          let r10 = new el.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n2 = [], i2 = /* @__PURE__ */ new Set(), a2 = () => {
            let e11 = eA.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), n2 = r10.getAll().filter((e12) => i2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n2) {
                let r11 = new el.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o2 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case ek:
                return n2;
              case "delete":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o2;
                  } finally {
                    a2();
                  }
                };
              case "set":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o2;
                  } finally {
                    a2();
                  }
                };
              default:
                return ed.get(e11, t11, r11);
            }
          } });
          return o2;
        }
      }
      function eI(e10, t10) {
        if ("action" !== e10.phase) throw new eO();
      }
      var eM = ((W = eM || {}).handleRequest = "BaseServer.handleRequest", W.run = "BaseServer.run", W.pipe = "BaseServer.pipe", W.getStaticHTML = "BaseServer.getStaticHTML", W.render = "BaseServer.render", W.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", W.renderToResponse = "BaseServer.renderToResponse", W.renderToHTML = "BaseServer.renderToHTML", W.renderError = "BaseServer.renderError", W.renderErrorToResponse = "BaseServer.renderErrorToResponse", W.renderErrorToHTML = "BaseServer.renderErrorToHTML", W.render404 = "BaseServer.render404", W), eD = ((K = eD || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", K.loadComponents = "LoadComponents.loadComponents", K), ej = ((B = ej || {}).getRequestHandler = "NextServer.getRequestHandler", B.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", B.getServer = "NextServer.getServer", B.getServerRequestHandler = "NextServer.getServerRequestHandler", B.createServer = "createServer.createServer", B), eL = ((q = eL || {}).compression = "NextNodeServer.compression", q.getBuildId = "NextNodeServer.getBuildId", q.createComponentTree = "NextNodeServer.createComponentTree", q.clientComponentLoading = "NextNodeServer.clientComponentLoading", q.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", q.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", q.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", q.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", q.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", q.sendRenderResult = "NextNodeServer.sendRenderResult", q.proxyRequest = "NextNodeServer.proxyRequest", q.runApi = "NextNodeServer.runApi", q.render = "NextNodeServer.render", q.renderHTML = "NextNodeServer.renderHTML", q.imageOptimizer = "NextNodeServer.imageOptimizer", q.getPagePath = "NextNodeServer.getPagePath", q.getRoutesManifest = "NextNodeServer.getRoutesManifest", q.findPageComponents = "NextNodeServer.findPageComponents", q.getFontManifest = "NextNodeServer.getFontManifest", q.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", q.getRequestHandler = "NextNodeServer.getRequestHandler", q.renderToHTML = "NextNodeServer.renderToHTML", q.renderError = "NextNodeServer.renderError", q.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", q.render404 = "NextNodeServer.render404", q.startResponse = "NextNodeServer.startResponse", q.route = "route", q.onProxyReq = "onProxyReq", q.apiResolver = "apiResolver", q.internalFetch = "internalFetch", q), eH = ((V = eH || {}).startServer = "startServer.startServer", V), eU = ((G = eU || {}).getServerSideProps = "Render.getServerSideProps", G.getStaticProps = "Render.getStaticProps", G.renderToString = "Render.renderToString", G.renderDocument = "Render.renderDocument", G.createBodyResult = "Render.createBodyResult", G), e$ = ((F = e$ || {}).renderToString = "AppRender.renderToString", F.renderToReadableStream = "AppRender.renderToReadableStream", F.getBodyResult = "AppRender.getBodyResult", F.fetch = "AppRender.fetch", F), eW = ((z = eW || {}).executeRoute = "Router.executeRoute", z), eK = ((J = eK || {}).runHandler = "Node.runHandler", J), eB = ((X = eB || {}).runHandler = "AppRouteRouteHandlers.runHandler", X), eq = ((Y = eq || {}).generateMetadata = "ResolveMetadata.generateMetadata", Y.generateViewport = "ResolveMetadata.generateViewport", Y), eV = ((Q = eV || {}).execute = "Middleware.execute", Q);
      let eG = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eF = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function ez(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eJ = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: eX, propagation: eY, trace: eQ, SpanStatusCode: eZ, SpanKind: e0, ROOT_CONTEXT: e1 } = t = e.r(59110);
      class e2 extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let e4 = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof e2 && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eZ.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, e3 = /* @__PURE__ */ new Map(), e6 = t.createContextKey("next.rootSpanId"), e5 = 0, e8 = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, e9 = (i = new class e {
        getTracerInstance() {
          return eQ.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return eX;
        }
        getTracePropagationData() {
          let e10 = eX.active(), t10 = [];
          return eY.inject(e10, t10, e8), t10;
        }
        getActiveScopeSpan() {
          return eQ.getSpan(null == eX ? void 0 : eX.active());
        }
        withPropagatedContext(e10, t10, r10, n2 = false) {
          let i2 = eX.active();
          if (n2) {
            let n3 = eY.extract(e1, e10, r10);
            if (eQ.getSpanContext(n3)) return eX.with(n3, t10);
            let a3 = eY.extract(i2, e10, r10);
            return eX.with(a3, t10);
          }
          if (eQ.getSpanContext(i2)) return t10();
          let a2 = eY.extract(i2, e10, r10);
          return eX.with(a2, t10);
        }
        trace(...e10) {
          let [t10, r10, n2] = e10, { fn: i2, options: a2 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n2, options: { ...r10 } }, o2 = a2.spanName ?? t10;
          if (!eG.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a2.hideSpan) return i2();
          let s2 = this.getSpanContext((null == a2 ? void 0 : a2.parentSpan) ?? this.getActiveScopeSpan());
          s2 || (s2 = (null == eX ? void 0 : eX.active()) ?? e1);
          let l2 = s2.getValue(e6), c2 = "number" != typeof l2 || !e3.has(l2), u2 = e5++;
          return a2.attributes = { "next.span_name": o2, "next.span_type": t10, ...a2.attributes }, eX.with(s2.setValue(e6, u2), () => this.getTracerInstance().startActiveSpan(o2, a2, (e11) => {
            let r11;
            eJ && t10 && eF.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n3 = false, o3 = () => {
              !n3 && (n3 = true, e3.delete(u2), r11 && performance.measure(`${eJ}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (c2 && e3.set(u2, new Map(Object.entries(a2.attributes ?? {}))), i2.length > 1) try {
              return i2(e11, (t11) => e4(e11, t11));
            } catch (t11) {
              throw e4(e11, t11), t11;
            } finally {
              o3();
            }
            try {
              let t11 = i2(e11);
              if (ez(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw e4(e11, t12), t12;
              }).finally(o3);
              return e11.end(), o3(), t11;
            } catch (t11) {
              throw e4(e11, t11), o3(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, n2, i2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eG.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n2;
            "function" == typeof e11 && "function" == typeof i2 && (e11 = e11.apply(this, arguments));
            let a2 = arguments.length - 1, o2 = arguments[a2];
            if ("function" != typeof o2) return t10.trace(r10, e11, () => i2.apply(this, arguments));
            {
              let n3 = t10.getContext().bind(eX.active(), o2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a2] = function(e13) {
                return null == t11 || t11(e13), n3.apply(this, arguments);
              }, i2.apply(this, arguments)));
            }
          } : i2;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n2 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, n2);
        }
        getSpanContext(e10) {
          return e10 ? eQ.setSpan(eX.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eX.active().getValue(e6);
          return e3.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eX.active().getValue(e6), n2 = e3.get(r10);
          n2 && !n2.has(e10) && n2.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = eQ.setSpan(eX.active(), e10);
          return eX.with(r10, t10);
        }
      }(), () => i), e7 = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(e7);
      class te {
        constructor(e10, t10, r10, n2) {
          var i2;
          const a2 = e10 && function(e11, t11) {
            let r11 = ex.from(e11.headers);
            return { isOnDemandRevalidate: r11.get(m) === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, o2 = null == (i2 = r10.get(e7)) ? void 0 : i2.value;
          this._isEnabled = !!(!a2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: e7, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: e7, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function tt(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], n2 = new Headers();
          for (let e11 of E(r10)) n2.append("set-cookie", e11);
          for (let e11 of new el.ResponseCookies(n2).getAll()) t10.set(e11);
        }
      }
      let tr = eP();
      function tn(e10) {
        switch (e10.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
          case "prerender-client":
          case "validation-client":
            return e10.prerenderResumeDataCache;
          case "request":
            if (e10.prerenderResumeDataCache) return e10.prerenderResumeDataCache;
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return e10;
        }
      }
      var ti = e.i(99734);
      class ta extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), this.name = "InvariantError";
        }
      }
      var to = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let ts = Symbol.for("@next/cache-handlers-map"), tl = Symbol.for("@next/cache-handlers-set"), tc = globalThis;
      function tu() {
        if (tc[ts]) return tc[ts].entries();
      }
      async function td(e10, t10) {
        if (!e10) return t10();
        let r10 = tp(e10);
        try {
          return await t10();
        } finally {
          var n2, i2, a2, o2;
          let t11, s2, l2, c2, u2 = (n2 = r10, i2 = tp(e10), t11 = new Set(n2.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), s2 = new Set(n2.pendingRevalidateWrites), { pendingRevalidatedTags: i2.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(i2.pendingRevalidates).filter(([e11]) => !(e11 in n2.pendingRevalidates))), pendingRevalidateWrites: i2.pendingRevalidateWrites.filter((e11) => !s2.has(e11)) });
          await (a2 = e10, l2 = [], (c2 = (null == (o2 = u2) ? void 0 : o2.pendingRevalidatedTags) ?? a2.pendingRevalidatedTags ?? []).length > 0 && l2.push(th(c2, a2.incrementalCache, a2)), l2.push(...Object.values((null == o2 ? void 0 : o2.pendingRevalidates) ?? a2.pendingRevalidates ?? {})), l2.push(...(null == o2 ? void 0 : o2.pendingRevalidateWrites) ?? a2.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function tp(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function th(e10, t10, r10) {
        if (0 === e10.length) return;
        let n2 = function() {
          if (tc[tl]) return tc[tl].values();
        }(), i2 = [], a2 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of a2) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n3 = e11 || r11;
          a2.has(n3) || a2.set(n3, []), a2.get(n3).push(t11.tag);
        }
        for (let [e11, s2] of a2) {
          let a3;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var o2;
              if (!(t11 = null == r10 || null == (o2 = r10.cacheLifeProfiles) ? void 0 : o2[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (a3 = { expire: t11.expire });
          }
          for (let t11 of n2 || []) e11 ? i2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2, a3)) : i2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, s2));
          t10 && i2.push(t10.revalidateTag(s2, a3));
        }
        await Promise.all(i2);
      }
      let tf = eP();
      class tg {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new ti.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (ez(e10)) this.waitUntil || tm(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          var t10;
          this.waitUntil || tm();
          let r10 = tr.getStore();
          r10 && this.workUnitStores.add(r10);
          let n2 = tf.getStore(), i2 = n2 ? n2.rootTaskSpawnPhase : null == r10 ? void 0 : r10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let a2 = (t10 = async () => {
            try {
              await tf.run({ rootTaskSpawnPhase: i2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, eT ? eT.bind(t10) : eC.bind(t10));
          this.callbackQueue.add(a2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eA.getStore();
          if (!e10) throw Object.defineProperty(new ta("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return td(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new ta("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function tm() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function ty(e10) {
        let t10, r10 = { then: (n2, i2) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n2, i2)) };
        return r10;
      }
      class tv {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function tb() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tw = Symbol.for("@next/request-context");
      async function t_(e10, t10, r10) {
        let n2 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.split("/");
            for (let e12 = 1; e12 < r11.length + 1; e12++) {
              let n3 = r11.slice(0, e12).join("/");
              n3 && (n3.endsWith("/page") || n3.endsWith("/route") || (n3 = `${n3}${!n3.endsWith("/") ? "/" : ""}layout`), t12.push(n3));
            }
          }
          return t12;
        })(e10)) t11 = `${w}${t11}`, n2.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = `${w}${t10}`;
          n2.add(e11);
        }
        n2.has(`${w}/`) && n2.add(`${w}/index`), n2.has(`${w}/index`) && n2.add(`${w}/`);
        let i2 = Array.from(n2);
        return { tags: i2, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = tu();
          if (r11) for (let [n3, i3] of r11) "getExpiration" in i3 && t11.set(n3, ty(async () => i3.getExpiration(e11)));
          return t11;
        }(i2) };
      }
      let tE = Symbol.for("NextInternalRequestMeta");
      class tx extends eu {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tS = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tC = (e10, t10) => e9().withPropagatedContext(e10.headers, t10, tS), tT = false;
      async function tP(t10) {
        var r10, n2, i2, a2, o2;
        let s2, l2, c2, u2, p2;
        !function() {
          if (!tT && (tT = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), tC = r11(tC);
          }
        }(), await d();
        let h2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let f2 = t10.bypassNextUrl ? new URL(t10.request.url) : new $(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...f2.searchParams.keys()]) {
          let t11 = f2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (f2.searchParams.delete(r11), t11)) f2.searchParams.append(r11, e11);
            f2.searchParams.delete(e10);
          }
        }
        let g2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in f2 && (g2 = f2.buildId || "", f2.buildId = "");
        let m2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, n3] of Object.entries(e10)) for (let e11 of Array.isArray(n3) ? n3 : [n3]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), y2 = m2.has("x-nextjs-data"), v2 = "1" === m2.get("rsc");
        y2 && "/index" === f2.pathname && (f2.pathname = "/");
        let b2 = /* @__PURE__ */ new Map();
        if (!h2) for (let e10 of ev) {
          let t11 = m2.get(e10);
          null !== t11 && (b2.set(e10, t11), m2.delete(e10));
        }
        let w2 = f2.searchParams.get(eb), _2 = new tx({ page: t10.page, input: ((u2 = (c2 = "string" == typeof f2) ? new URL(f2) : f2).searchParams.delete(eb), c2 ? u2.toString() : u2).toString(), init: { body: t10.request.body, headers: m2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (o2 = t10.request.requestMeta, _2[tE] = o2), y2 && Object.defineProperty(_2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tb() }) }));
        let E2 = t10.request.waitUntil ?? (null == (r10 = null == (p2 = globalThis[tw]) ? void 0 : p2.get()) ? void 0 : r10.waitUntil), x2 = new O({ request: _2, page: t10.page, context: E2 ? { waitUntil: E2 } : void 0 });
        if ((s2 = await tC(_2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = x2.waitUntil.bind(x2), r11 = new tv();
            return e9().trace(eV.execute, { spanName: `middleware ${_2.method}`, attributes: { "http.target": _2.nextUrl.pathname, "http.method": _2.method } }, async () => {
              try {
                var n3, i3, a3, o3, s3, c3;
                let u3 = tb(), d2 = await t_("/", _2.nextUrl.pathname, null), p3 = (s3 = _2.nextUrl, c3 = (e11) => {
                  l2 = e11;
                }, function(e11, t11, r12, n4, i4, a4, o4, s4, l3, c4) {
                  function u4(e12) {
                    r12 && r12.setHeader("Set-Cookie", e12);
                  }
                  let d3 = {};
                  return { type: "request", phase: e11, implicitTags: a4, url: { pathname: n4.pathname, search: n4.search ?? "" }, rootParams: i4, get headers() {
                    return d3.headers || (d3.headers = function(e12) {
                      let t12 = ex.from(e12);
                      for (let e13 of ev) t12.delete(e13);
                      return ex.seal(t12);
                    }(t11.headers)), d3.headers;
                  }, get cookies() {
                    if (!d3.cookies) {
                      let e12 = new el.RequestCookies(ex.from(t11.headers));
                      tt(t11, e12), d3.cookies = eR.seal(e12);
                    }
                    return d3.cookies;
                  }, set cookies(value) {
                    d3.cookies = value;
                  }, get mutableCookies() {
                    if (!d3.mutableCookies) {
                      var p4, h4;
                      let e12, n5 = (p4 = t11.headers, h4 = o4 || (r12 ? u4 : void 0), e12 = new el.RequestCookies(ex.from(p4)), eN.wrap(e12, h4));
                      tt(t11, n5), d3.mutableCookies = n5;
                    }
                    return d3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!d3.userspaceMutableCookies) {
                      var f3;
                      let e12;
                      f3 = this, d3.userspaceMutableCookies = e12 = new Proxy(f3.mutableCookies, { get(t12, r13, n5) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return eI(f3, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return eI(f3, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return ed.get(t12, r13, n5);
                        }
                      } });
                    }
                    return d3.userspaceMutableCookies;
                  }, get draftMode() {
                    return d3.draftMode || (d3.draftMode = new te(s4, t11, this.cookies, this.mutableCookies)), d3.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: l3, serverComponentsHmrCache: c4 || globalThis.__serverComponentsHmrCache, fallbackParams: null };
                }("action", _2, void 0, s3, {}, d2, c3, u3, false, void 0)), h3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n4, deploymentId: i4, previouslyRevalidatedTags: a4, nonce: o4 }) {
                  let s4 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l3 = s4 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c4 = { isStaticGeneration: s4, page: e11, route: e_(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n4, deploymentId: i4, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o4, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: n5 } = e12;
                    return new tg({ waitUntil: t12, onClose: r13, onTaskError: n5 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, previouslyRevalidatedTags: a4, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = tu();
                    if (t12) for (let [r13, n5] of t12) "refreshTags" in n5 && e12.set(r13, ty(async () => n5.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: eT ? eT.snapshot() : function(e12, ...t12) {
                    return e12(...t12);
                  }, shouldTrackFetchMetrics: l3, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = c4, c4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (i3 = t10.request.nextConfig) || null == (n3 = i3.experimental) ? void 0 : n3.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (o3 = t10.request.nextConfig) || null == (a3 = o3.experimental) ? void 0 : a3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === _2.headers.get(ey), buildId: g2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] });
                return await eA.run(h3, () => tr.run(p3, t10.handler, _2, x2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(_2, x2);
        })) && !(s2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        s2 && l2 && s2.headers.set("set-cookie", l2);
        let S2 = null == s2 ? void 0 : s2.headers.get("x-middleware-rewrite");
        if (s2 && S2 && (v2 || !h2)) {
          let e10 = new $(S2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          h2 || e10.host !== _2.nextUrl.host || (e10.buildId = g2 || e10.buildId, s2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: o3 } = em(e10.toString(), f2.toString());
          !h2 && y2 && s2.headers.set("x-nextjs-rewrite", r11);
          let l3 = !o3 && (null == (a2 = t10.request.nextConfig) || null == (i2 = a2.experimental) || null == (n2 = i2.clientParamParsingOrigins) ? void 0 : n2.some((t11) => new RegExp(t11).test(e10.origin)));
          v2 && (o3 || l3) && (f2.pathname !== e10.pathname && s2.headers.set("x-nextjs-rewritten-path", e10.pathname), f2.search !== e10.search && s2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (s2 && S2 && v2 && w2) {
          let e10 = new URL(S2);
          e10.searchParams.has(eb) || (e10.searchParams.set(eb, w2), s2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let C2 = null == s2 ? void 0 : s2.headers.get("Location");
        if (s2 && C2 && !h2) {
          let e10 = new $(C2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          s2 = new Response(s2.body, s2), e10.host === f2.host && (e10.buildId = g2 || e10.buildId, s2.headers.set("Location", em(e10, f2).url)), y2 && (s2.headers.delete("Location"), s2.headers.set("x-nextjs-redirect", em(e10.toString(), f2.toString()).url));
        }
        let T2 = s2 || eg.next(), A2 = T2.headers.get("x-middleware-override-headers"), R2 = [];
        if (A2) {
          for (let [e10, t11] of b2) T2.headers.set(`x-middleware-request-${e10}`, t11), R2.push(e10);
          R2.length > 0 && T2.headers.set("x-middleware-override-headers", A2 + "," + R2.join(","));
        }
        return { response: T2, waitUntil: ("internal" === x2[P].kind ? Promise.all(x2[P].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: _2.fetchMetrics };
      }
      class tA {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r10, n2) => {
            e10 = r10, t10 = n2;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class tO {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class tR {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class tk {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new tR(), this.tail = new tR(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10)) ?? 1;
          if (r10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let n2 = this.cache.get(e10);
          if (n2) n2.data = t10, this.totalSize = this.totalSize - n2.size + r10, n2.size = r10, this.moveToHead(n2);
          else {
            let n3 = new tO(e10, t10, r10);
            this.cache.set(e10, n3), this.addToHead(n3), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: tN, stdout: tI } = (null == (et = globalThis) ? void 0 : et.process) ?? {}, tM = tN && !tN.NO_COLOR && (tN.FORCE_COLOR || (null == tI ? void 0 : tI.isTTY) && !tN.CI && "dumb" !== tN.TERM), tD = (e10, t10, r10, n2) => {
        let i2 = e10.substring(0, n2) + r10, a2 = e10.substring(n2 + t10.length), o2 = a2.indexOf(t10);
        return ~o2 ? i2 + tD(a2, t10, r10, o2) : i2 + a2;
      }, tj = (e10, t10, r10 = e10) => tM ? (n2) => {
        let i2 = "" + n2, a2 = i2.indexOf(t10, e10.length);
        return ~a2 ? e10 + tD(i2, t10, r10, a2) + t10 : e10 + i2 + t10;
      } : String, tL = tj("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      tj("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), tj("\x1B[3m", "\x1B[23m"), tj("\x1B[4m", "\x1B[24m"), tj("\x1B[7m", "\x1B[27m"), tj("\x1B[8m", "\x1B[28m"), tj("\x1B[9m", "\x1B[29m"), tj("\x1B[30m", "\x1B[39m");
      let tH = tj("\x1B[31m", "\x1B[39m"), tU = tj("\x1B[32m", "\x1B[39m"), t$ = tj("\x1B[33m", "\x1B[39m");
      tj("\x1B[34m", "\x1B[39m");
      let tW = tj("\x1B[35m", "\x1B[39m");
      tj("\x1B[38;2;173;127;168m", "\x1B[39m"), tj("\x1B[36m", "\x1B[39m");
      let tK = tj("\x1B[37m", "\x1B[39m");
      tj("\x1B[90m", "\x1B[39m"), tj("\x1B[40m", "\x1B[49m"), tj("\x1B[41m", "\x1B[49m"), tj("\x1B[42m", "\x1B[49m"), tj("\x1B[43m", "\x1B[49m"), tj("\x1B[44m", "\x1B[49m"), tj("\x1B[45m", "\x1B[49m"), tj("\x1B[46m", "\x1B[49m"), tj("\x1B[47m", "\x1B[49m"), tK(tL("\u25CB")), tH(tL("\u2A2F")), t$(tL("\u26A0")), tK(tL(" ")), tU(tL("\u2713")), tW(tL("\xBB")), new tk(1e4, (e10) => e10.length), new tk(1e4, (e10) => e10.length);
      var tB = ((Z = {}).APP_PAGE = "APP_PAGE", Z.APP_ROUTE = "APP_ROUTE", Z.PAGES = "PAGES", Z.FETCH = "FETCH", Z.REDIRECT = "REDIRECT", Z.IMAGE = "IMAGE", Z), tq = ((ee = {}).APP_PAGE = "APP_PAGE", ee.APP_ROUTE = "APP_ROUTE", ee.PAGES = "PAGES", ee.FETCH = "FETCH", ee.IMAGE = "IMAGE", ee);
      function tV() {
      }
      new TextEncoder();
      let tG = new TextEncoder();
      function tF(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tG.encode(e10)), t10.close();
        } });
      }
      function tz(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tJ(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), n2 = "";
        for await (let i2 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return n2;
          n2 += r10.decode(i2, { stream: true });
        }
        return n2 + r10.decode();
      }
      let tX = "ResponseAborted";
      class tY extends Error {
        constructor(...e10) {
          super(...e10), this.name = tX;
        }
      }
      let tQ = 0, tZ = 0, t0 = 0;
      function t1(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === tX;
      }
      async function t2(e10, t10, r10) {
        try {
          let n2, { errored: i2, destroyed: a2 } = t10;
          if (i2 || a2) return;
          let o2 = (n2 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || n2.abort(new tY());
          }), n2), s2 = function(e11, t11) {
            let r11 = false, n3 = new tA();
            function i3() {
              n3.resolve();
            }
            e11.on("drain", i3), e11.once("close", () => {
              e11.off("drain", i3), n3.resolve();
            });
            let a3 = new tA();
            return e11.once("finish", () => {
              a3.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r11) {
                if (r11 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                  let e12 = function(e13 = {}) {
                    let t13 = 0 === tQ ? void 0 : { clientComponentLoadStart: tQ, clientComponentLoadTimes: tZ, clientComponentLoadCount: t0 };
                    return e13.reset && (tQ = 0, tZ = 0, t0 = 0), t13;
                  }();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), e9().trace(eL.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await n3.promise, n3 = new tA());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), a3.promise;
            } });
          }(t10, r10);
          await e10.pipeTo(s2, { signal: o2.signal });
        } catch (e11) {
          if (t1(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      class t4 {
        static #e = this.EMPTY = new t4(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new t4(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: n2 }) {
          this.response = e10, this.contentType = t10, this.metadata = n2, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new ta("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return tJ(this.readable);
          }
          return this.response;
        }
        get readable() {
          return null === this.response ? new ReadableStream({ start(e10) {
            e10.close();
          } }) : "string" == typeof this.response ? tF(this.response) : to.Buffer.isBuffer(this.response) ? tz(this.response) : Array.isArray(this.response) ? function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), n2 = e10[0].pipeTo(r10, { preventClose: true }), i2 = 1;
            for (; i2 < e10.length - 1; i2++) {
              let t11 = e10[i2];
              n2 = n2.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let a2 = e10[i2];
            return (n2 = n2.then(() => a2.pipeTo(r10))).catch(tV), t10;
          }(...this.response) : this.response;
        }
        coerce() {
          return null === this.response ? [] : "string" == typeof this.response ? [tF(this.response)] : Array.isArray(this.response) ? this.response : to.Buffer.isBuffer(this.response) ? [tz(this.response)] : [this.response];
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (t1(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          await t2(this.readable, e10, this.waitUntil);
        }
      }
      function t3(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      t3(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), t3(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var t6 = e.i(68886);
      let t5 = /* @__PURE__ */ new Map(), t8 = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = t5.get(r10), n2 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof n2 && n2 <= Date.now() && n2 > t10) return true;
        }
        return false;
      }, t9 = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = t5.get(r10), n2 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof n2 && n2 > t10) return true;
        }
        return false;
      };
      class t7 {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(t6.default.dirname(e10)), n2 = r10[1].then(() => this.fs.writeFile(e10, t10));
          n2.catch(() => {
          }), r10[2].push(n2);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function re(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class rt {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? rt.memoryCache ? rt.debug && console.log("FileSystemCache: memory store already initialized") : (rt.debug && console.log("FileSystemCache: using memory store for fetch cache"), rt.memoryCache = function(e11) {
            return r || (r = new tk(e11, function({ value: e12 }) {
              var t10, r10;
              if (!e12) return 25;
              if (e12.kind === tB.REDIRECT) return JSON.stringify(e12.props).length;
              if (e12.kind === tB.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              if (e12.kind === tB.FETCH) return JSON.stringify(e12.data || "").length;
              if (e12.kind === tB.APP_ROUTE) return e12.body.length;
              return e12.kind === tB.APP_PAGE ? Math.max(1, e12.html.length + re(e12.rscData) + ((null == (r10 = e12.postponed) ? void 0 : r10.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r11, n2] of e13) t11 += r11.length + re(n2);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (t10 = JSON.stringify(e12.pageData)) ? void 0 : t10.length) || 0);
            })), r;
          }(e10.maxMemoryCacheSize)) : rt.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, rt.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let n2 of e10) {
            let e11 = t5.get(n2) || {};
            if (t10) {
              let i2 = { ...e11 };
              i2.stale = r10, void 0 !== t10.expire && (i2.expired = r10 + 1e3 * t10.expire), t5.set(n2, i2);
            } else t5.set(n2, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, n2, i2, a2, o2;
          let [s2, l2] = e10, { kind: c2 } = l2, u2 = null == (t10 = rt.memoryCache) ? void 0 : t10.get(s2);
          if (rt.debug && (c2 === tq.FETCH ? console.log("FileSystemCache: get", s2, l2.tags, c2, !!u2) : console.log("FileSystemCache: get", s2, c2, !!u2)), (null == u2 || null == (r10 = u2.value) ? void 0 : r10.kind) === tB.APP_PAGE || (null == u2 || null == (n2 = u2.value) ? void 0 : n2.kind) === tB.APP_ROUTE || (null == u2 || null == (i2 = u2.value) ? void 0 : i2.kind) === tB.PAGES) {
            let e11 = null == (o2 = u2.value.headers) ? void 0 : o2[v];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && t8(t11, u2.lastModified)) return rt.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == u2 || null == (a2 = u2.value) ? void 0 : a2.kind) === tB.FETCH) {
            let e11 = l2.kind === tq.FETCH ? [...l2.tags || [], ...l2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return rt.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (t8(e11, u2.lastModified)) return rt.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return u2 ?? null;
        }
        async set(e10, t10, r10) {
          var n2;
          if (null == (n2 = rt.memoryCache) || n2.set(e10, { value: t10, lastModified: Date.now() }), rt.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let i2 = new t7(this.fs);
          if (t10.kind === tB.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, tq.APP_ROUTE);
            i2.append(r11, t10.body);
            let n3 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            i2.append(r11.replace(/\.body$/, y), JSON.stringify(n3, null, 2));
          } else if (t10.kind === tB.PAGES || t10.kind === tB.APP_PAGE) {
            let n3 = t10.kind === tB.APP_PAGE, a2 = this.getFilePath(`${e10}.html`, n3 ? tq.APP_PAGE : tq.PAGES);
            if (i2.append(a2, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || i2.append(this.getFilePath(`${e10}${n3 ? ".rsc" : ".json"}`, n3 ? tq.APP_PAGE : tq.PAGES), n3 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === tB.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = a2.replace(/\.html$/, ".segments");
                for (let [n4, a3] of t10.segmentData) {
                  e11.push(n4);
                  let t11 = r12 + n4 + ".segment.rsc";
                  i2.append(t11, a3);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              i2.append(a2.replace(/\.html$/, y), JSON.stringify(r11));
            }
          } else if (t10.kind === tB.FETCH) {
            let n3 = this.getFilePath(e10, tq.FETCH);
            i2.append(n3, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await i2.wait();
        }
        getFilePath(e10, t10) {
          switch (t10) {
            case tq.FETCH:
              return t6.default.join(this.serverDistDir, "..", "cache", "fetch-cache", e10);
            case tq.PAGES:
              return t6.default.join(this.serverDistDir, "pages", e10);
            case tq.IMAGE:
            case tq.APP_PAGE:
            case tq.APP_ROUTE:
              return t6.default.join(this.serverDistDir, "app", e10);
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
        }
      }
      let rr = ["(..)(..)", "(.)", "(..)", "(...)"], rn = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, ri = /\/\[[^/]+\](?=\/|$)/;
      function ra(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class ro {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = ro.cacheControls.get(e10);
          if (t10) return t10;
          let r10 = this.prerenderManifest.routes[e10];
          if (r10) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let n2 = this.prerenderManifest.dynamicRoutes[e10];
          if (n2) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = n2;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          ro.cacheControls.set(e10, t10);
        }
        clear() {
          ro.cacheControls.clear();
        }
      }
      e.i(67914);
      class rs {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: n2, serverDistDir: i2, requestHeaders: a2, maxMemoryCacheSize: o2, getPrerenderManifest: s2, fetchCacheKeyPrefix: l2, CurCacheHandler: c2, allowedRevalidateHeaderKeys: u2 }) {
          var d2, p2, h2, f2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!c2;
          const g2 = Symbol.for("@next/cache-handlers"), y2 = globalThis;
          if (c2) rs.debug && console.log("IncrementalCache: using custom cache handler", c2.name);
          else {
            const t11 = y2[g2];
            (null == t11 ? void 0 : t11.FetchCache) ? (c2 = t11.FetchCache, rs.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && i2 && (rs.debug && console.log("IncrementalCache: using filesystem cache handler"), c2 = rt);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (o2 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = n2, this.requestHeaders = a2, this.allowedRevalidateHeaderKeys = u2, this.prerenderManifest = s2(), this.cacheControls = new ro(this.prerenderManifest), this.fetchCacheKeyPrefix = l2;
          let v2 = [];
          a2[m] === (null == (p2 = this.prerenderManifest) || null == (d2 = p2.preview) ? void 0 : d2.previewModeId) && (this.isOnDemandRevalidate = true), n2 && (v2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[b] && e11["x-next-revalidate-tag-token"] === t11 ? e11[b].split(",") : [];
          }(a2, null == (f2 = this.prerenderManifest) || null == (h2 = f2.preview) ? void 0 : h2.previewModeId)), c2 && (this.cacheHandler = new c2({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: i2, revalidatedTags: v2, maxMemoryCacheSize: o2, _requestHeaders: a2, fetchCacheKeyPrefix: l2 }));
        }
        calculateRevalidate(e10, t10, r10, n2) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let i2 = this.cacheControls.get(ra(e10)), a2 = i2 ? i2.revalidate : !n2 && 1;
          return "number" == typeof a2 ? 1e3 * a2 + t10 : a2;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => rr.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r10, n2;
              for (let i2 of e12.split("/")) if (r10 = rr.find((e13) => i2.startsWith(e13))) {
                [t12, n2] = e12.split(r10, 2);
                break;
              }
              if (!t12 || !r10 || !n2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = e_(t12), r10) {
                case "(.)":
                  n2 = "/" === t12 ? `/${n2}` : t12 + "/" + n2;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  n2 = t12.split("/").slice(0, -1).concat(n2).join("/");
                  break;
                case "(...)":
                  n2 = "/" + n2;
                  break;
                case "(..)(..)":
                  let i2 = t12.split("/");
                  if (i2.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  n2 = i2.slice(0, -2).concat(n2).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: n2 };
            }(e11).interceptedRoute), t11) ? ri.test(e11) : rn.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : ew(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (rs.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = new tA();
          return rs.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], n2 = new TextEncoder(), i2 = new TextDecoder();
          if (t10.body) if (t10.body instanceof Uint8Array) r10.push(i2.decode(t10.body)), t10._ogBody = t10.body;
          else if ("function" == typeof t10.body.getReader) {
            let e11 = t10.body, a3 = [];
            try {
              await e11.pipeTo(new WritableStream({ write(e12) {
                "string" == typeof e12 ? (a3.push(n2.encode(e12)), r10.push(e12)) : (a3.push(e12), r10.push(i2.decode(e12, { stream: true })));
              } })), r10.push(i2.decode());
              let o3 = a3.reduce((e12, t11) => e12 + t11.length, 0), s3 = new Uint8Array(o3), l2 = 0;
              for (let e12 of a3) s3.set(e12, l2), l2 += e12.length;
              t10._ogBody = s3;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof t10.body.keys) {
            let e11 = t10.body;
            for (let n3 of (t10._ogBody = t10.body, /* @__PURE__ */ new Set([...e11.keys()]))) {
              let t11 = e11.getAll(n3);
              r10.push(`${n3}=${(await Promise.all(t11.map(async (e12) => "string" == typeof e12 ? e12 : await e12.text()))).join(",")}`);
            }
          } else if ("function" == typeof t10.body.arrayBuffer) {
            let e11 = t10.body, n3 = await e11.arrayBuffer();
            r10.push(await e11.text()), t10._ogBody = new Blob([n3], { type: e11.type });
          } else "string" == typeof t10.body && (r10.push(t10.body), t10._ogBody = t10.body);
          let a2 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          "traceparent" in a2 && delete a2.traceparent, "tracestate" in a2 && delete a2.tracestate;
          let o2 = JSON.stringify(["v3", this.fetchCacheKeyPrefix || "", e10, t10.method, a2, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]);
          {
            var s2;
            let e11 = n2.encode(o2);
            return s2 = await crypto.subtle.digest("SHA-256", e11), Array.prototype.map.call(new Uint8Array(s2), (e12) => e12.toString(16).padStart(2, "0")).join("");
          }
        }
        async get(e10, t10) {
          var r10, n2, i2, a2, o2, s2, l2;
          let c2, u2;
          if (t10.kind === tq.FETCH) {
            let r11 = tr.getStore(), n3 = r11 ? function(e11) {
              switch (e11.type) {
                case "request":
                case "prerender":
                case "prerender-runtime":
                case "prerender-client":
                case "validation-client":
                  if (e11.renderResumeDataCache) return e11.renderResumeDataCache;
                case "prerender-ppr":
                  return e11.prerenderResumeDataCache ?? null;
                case "cache":
                case "private-cache":
                case "unstable-cache":
                case "prerender-legacy":
                case "generate-static-params":
                  return null;
                default:
                  return e11;
              }
            }(r11) : null;
            if (n3) {
              let r12 = n3.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === tB.FETCH) {
                let n4 = eA.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == n4 || null == (r13 = n4.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return rs.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                rs.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else rs.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else rs.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== tq.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === tq.FETCH);
          let d2 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(e10, t10));
          if (t10.kind === tq.FETCH) {
            if (!d2) return null;
            if ((null == (i2 = d2.value) ? void 0 : i2.kind) !== tB.FETCH) throw Object.defineProperty(new ta(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (a2 = d2.value) ? void 0 : a2.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r11 = eA.getStore(), n3 = [...t10.tags || [], ...t10.softTags || []];
            if (n3.some((e11) => {
              var t11, n4;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (n4 = r11.pendingRevalidatedTags) ? void 0 : n4.some((t12) => t12.tag === e11));
            })) return rs.debug && console.log("IncrementalCache: expired tag", e10), null;
            let o3 = tr.getStore();
            if (o3) {
              let t11 = tn(o3);
              t11 && (rs.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, d2.value));
            }
            let s3 = t10.revalidate || d2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (d2.lastModified || 0)) / 1e3 > s3, c3 = d2.value.data;
            return t8(n3, d2.lastModified) ? null : (t9(n3, d2.lastModified) && (l3 = true), { isStale: l3, value: { kind: tB.FETCH, data: c3, revalidate: s3 } });
          }
          if ((null == d2 || null == (n2 = d2.value) ? void 0 : n2.kind) === tB.FETCH) throw Object.defineProperty(new ta(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let p2 = null, { isFallback: h2 } = t10, f2 = this.cacheControls.get(ra(e10));
          if ((null == d2 ? void 0 : d2.lastModified) === -1) c2 = -1, u2 = -31536e6;
          else {
            let r11 = performance.timeOrigin + performance.now(), n3 = (null == d2 ? void 0 : d2.lastModified) || r11;
            if (void 0 === (c2 = false !== (u2 = this.calculateRevalidate(e10, n3, this.dev ?? false, t10.isFallback)) && u2 < r11 || void 0) && ((null == d2 || null == (o2 = d2.value) ? void 0 : o2.kind) === tB.APP_PAGE || (null == d2 || null == (s2 = d2.value) ? void 0 : s2.kind) === tB.APP_ROUTE)) {
              let e11 = null == (l2 = d2.value.headers) ? void 0 : l2[v];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (t8(t11, n3) ? c2 = -1 : t9(t11, n3) && (c2 = true));
              }
            }
          }
          return d2 && (p2 = { isStale: c2, cacheControl: f2, revalidateAfter: u2, value: d2.value, isFallback: h2 }), !d2 && this.prerenderManifest.notFoundRoutes.includes(e10) && (p2 = { isStale: c2, value: null, cacheControl: f2, revalidateAfter: u2, isFallback: h2 }, this.set(e10, p2.value, { ...t10, cacheControl: f2 })), p2;
        }
        async set(e10, t10, r10) {
          if ((null == t10 ? void 0 : t10.kind) === tB.FETCH) {
            let r11 = tr.getStore(), n3 = r11 ? tn(r11) : null;
            n3 && (rs.debug && console.log("IncrementalCache: rdc:set", e10), n3.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          e10 = this._getPathname(e10, r10.fetchCache);
          let n2 = JSON.stringify(t10).length;
          if (r10.fetchCache && n2 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${n2} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var i2;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(ra(e10), r10.cacheControl), await (null == (i2 = this.cacheHandler) ? void 0 : i2.set(e10, t10, r10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      if (e.i(64445), e.i(40049).default.unstable_postpone, false === ("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("needs to bail out of prerendering at this point because it used") && "Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]");
      let rl = async (e10, t10, r10, n2, i2) => {
        let { crypto: { subtle: a2 } } = (() => {
          if ("u" > typeof globalThis) return globalThis;
          if ("u" > typeof self) return self;
          throw Error("unable to locate global object");
        })();
        return new Uint8Array(await a2.deriveBits({ name: "HKDF", hash: `SHA-${e10.substr(3)}`, salt: r10, info: n2 }, await a2.importKey("raw", t10, "HKDF", false, ["deriveBits"]), i2 << 3));
      };
      function rc(e10, t10) {
        if ("string" == typeof e10) return new TextEncoder().encode(e10);
        if (!(e10 instanceof Uint8Array)) throw TypeError(`"${t10}"" must be an instance of Uint8Array or a string`);
        return e10;
      }
      async function ru(e10, t10, r10, n2, i2) {
        return rl(function(e11) {
          switch (e11) {
            case "sha256":
            case "sha384":
            case "sha512":
            case "sha1":
              return e11;
            default:
              throw TypeError('unsupported "digest" value');
          }
        }(e10), function(e11) {
          let t11 = rc(e11, "ikm");
          if (!t11.byteLength) throw TypeError('"ikm" must be at least one byte in length');
          return t11;
        }(t10), rc(r10, "salt"), function(e11) {
          let t11 = rc(e11, "info");
          if (t11.byteLength > 1024) throw TypeError('"info" must not contain more than 1024 bytes');
          return t11;
        }(n2), function(e11, t11) {
          if ("number" != typeof e11 || !Number.isInteger(e11) || e11 < 1) throw TypeError('"keylen" must be a positive integer');
          if (e11 > 255 * (parseInt(t11.substr(3), 10) >> 3 || 20)) throw TypeError('"keylen" too large');
          return e11;
        }(i2, e10));
      }
      let rd = new TextEncoder(), rp = new TextDecoder();
      function rh(...e10) {
        let t10 = new Uint8Array(e10.reduce((e11, { length: t11 }) => e11 + t11, 0)), r10 = 0;
        for (let n2 of e10) t10.set(n2, r10), r10 += n2.length;
        return t10;
      }
      function rf(e10, t10, r10) {
        if (t10 < 0 || t10 >= 4294967296) throw RangeError(`value must be >= 0 and <= ${4294967296 - 1}. Received ${t10}`);
        e10.set([t10 >>> 24, t10 >>> 16, t10 >>> 8, 255 & t10], r10);
      }
      function rg(e10) {
        let t10 = new Uint8Array(4);
        return rf(t10, e10), t10;
      }
      function rm(e10) {
        let t10 = new Uint8Array(e10.length);
        for (let r10 = 0; r10 < e10.length; r10++) {
          let n2 = e10.charCodeAt(r10);
          if (n2 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t10[r10] = n2;
        }
        return t10;
      }
      function ry(e10) {
        if (Uint8Array.fromBase64) return Uint8Array.fromBase64("string" == typeof e10 ? e10 : rp.decode(e10), { alphabet: "base64url" });
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = rp.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/");
        try {
          var r10 = t10;
          if (Uint8Array.fromBase64) return Uint8Array.fromBase64(r10);
          let e11 = atob(r10), n2 = new Uint8Array(e11.length);
          for (let t11 = 0; t11 < e11.length; t11++) n2[t11] = e11.charCodeAt(t11);
          return n2;
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }
      function rv(e10) {
        let t10 = e10;
        return ("string" == typeof t10 && (t10 = rd.encode(t10)), Uint8Array.prototype.toBase64) ? t10.toBase64({ alphabet: "base64url", omitPadding: true }) : function(e11) {
          if (Uint8Array.prototype.toBase64) return e11.toBase64();
          let t11 = [];
          for (let r10 = 0; r10 < e11.length; r10 += 32768) t11.push(String.fromCharCode.apply(null, e11.subarray(r10, r10 + 32768)));
          return btoa(t11.join(""));
        }(t10).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      e.s(["decode", 0, ry, "encode", 0, rv], 22423);
      var rb = e.i(22423), rb = rb;
      function rw(e10, t10, r10) {
        try {
          return ry(e10);
        } catch {
          throw new r10(`Failed to base64url decode the ${t10}`);
        }
      }
      async function r_(e10, t10) {
        let r10 = `SHA-${e10.slice(-3)}`;
        return new Uint8Array(await crypto.subtle.digest(r10, t10));
      }
      Symbol();
      class rE extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class rx extends rE {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n2 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n2, payload: t10 } }), this.claim = r10, this.reason = n2, this.payload = t10;
        }
      }
      class rS extends rE {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n2 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n2, payload: t10 } }), this.claim = r10, this.reason = n2, this.payload = t10;
        }
      }
      class rC extends rE {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class rT extends rE {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class rP extends rE {
        static code = "ERR_JWE_DECRYPTION_FAILED";
        code = "ERR_JWE_DECRYPTION_FAILED";
        constructor(e10 = "decryption operation failed", t10) {
          super(e10, t10);
        }
      }
      class rA extends rE {
        static code = "ERR_JWE_INVALID";
        code = "ERR_JWE_INVALID";
      }
      class rO extends rE {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class rR extends rE {
        static code = "ERR_JWK_INVALID";
        code = "ERR_JWK_INVALID";
      }
      class rk extends rE {
        [Symbol.asyncIterator];
        static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        constructor(e10 = "multiple matching keys found in the JSON Web Key Set", t10) {
          super(e10, t10);
        }
      }
      function rN(e10) {
        if (!rI(e10)) throw Error("CryptoKey instance expected");
      }
      let rI = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, rM = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", rD = (e10) => rI(e10) || rM(e10);
      function rj(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        for (; null !== Object.getPrototypeOf(t10); ) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      let rL = (e10) => rj(e10) && "string" == typeof e10.kty;
      function rH(e10, t10, ...r10) {
        if ((r10 = r10.filter(Boolean)).length > 2) {
          let t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let rU = (e10, ...t10) => rH("Key must be ", e10, ...t10), r$ = (e10, t10, ...r10) => rH(`Key for the ${e10} algorithm must be `, t10, ...r10);
      async function rW(e10) {
        if (rM(e10)) if ("secret" !== e10.type) return e10.export({ format: "jwk" });
        else e10 = e10.export();
        if (e10 instanceof Uint8Array) return { kty: "oct", k: rv(e10) };
        if (!rI(e10)) throw TypeError(rU(e10, "CryptoKey", "KeyObject", "Uint8Array"));
        if (!e10.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
        let { ext: t10, key_ops: r10, alg: n2, use: i2, ...a2 } = await crypto.subtle.exportKey("jwk", e10);
        return "AKP" === a2.kty && (a2.alg = n2), a2;
      }
      async function rK(e10) {
        return rW(e10);
      }
      let rB = (e10, t10) => {
        if ("string" != typeof e10 || !e10) throw new rR(`${t10} missing or invalid`);
      };
      async function rq(e10, t10) {
        let r10, n2;
        if (rL(e10)) r10 = e10;
        else if (rD(e10)) r10 = await rK(e10);
        else throw TypeError(rU(e10, "CryptoKey", "KeyObject", "JSON Web Key"));
        if ("sha256" !== (t10 ??= "sha256") && "sha384" !== t10 && "sha512" !== t10) throw TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        switch (r10.kty) {
          case "AKP":
            rB(r10.alg, '"alg" (Algorithm) Parameter'), rB(r10.pub, '"pub" (Public key) Parameter'), n2 = { alg: r10.alg, kty: r10.kty, pub: r10.pub };
            break;
          case "EC":
            rB(r10.crv, '"crv" (Curve) Parameter'), rB(r10.x, '"x" (X Coordinate) Parameter'), rB(r10.y, '"y" (Y Coordinate) Parameter'), n2 = { crv: r10.crv, kty: r10.kty, x: r10.x, y: r10.y };
            break;
          case "OKP":
            rB(r10.crv, '"crv" (Subtype of Key Pair) Parameter'), rB(r10.x, '"x" (Public Key) Parameter'), n2 = { crv: r10.crv, kty: r10.kty, x: r10.x };
            break;
          case "RSA":
            rB(r10.e, '"e" (Exponent) Parameter'), rB(r10.n, '"n" (Modulus) Parameter'), n2 = { e: r10.e, kty: r10.kty, n: r10.n };
            break;
          case "oct":
            rB(r10.k, '"k" (Key Value) Parameter'), n2 = { k: r10.k, kty: r10.kty };
            break;
          default:
            throw new rT('"kty" (Key Type) Parameter missing or unsupported');
        }
        let i2 = rm(JSON.stringify(n2));
        return rv(await r_(t10, i2));
      }
      let rV = (e10, t10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      function rG(e10, t10, r10) {
        switch (t10) {
          case "A128GCM":
          case "A192GCM":
          case "A256GCM": {
            if ("AES-GCM" !== e10.algorithm.name) throw rV("AES-GCM");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw rV(r11, "algorithm.length");
            break;
          }
          case "A128KW":
          case "A192KW":
          case "A256KW": {
            if ("AES-KW" !== e10.algorithm.name) throw rV("AES-KW");
            let r11 = parseInt(t10.slice(1, 4), 10);
            if (e10.algorithm.length !== r11) throw rV(r11, "algorithm.length");
            break;
          }
          case "ECDH":
            switch (e10.algorithm.name) {
              case "ECDH":
              case "X25519":
                break;
              default:
                throw rV("ECDH or X25519");
            }
            break;
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW":
            if ("PBKDF2" !== e10.algorithm.name) throw rV("PBKDF2");
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            if ("RSA-OAEP" !== e10.algorithm.name) throw rV("RSA-OAEP");
            var n2 = e10.algorithm, i2 = parseInt(t10.slice(9), 10) || 1;
            if (parseInt(n2.hash.name.slice(4), 10) !== i2) throw rV(`SHA-${i2}`, "algorithm.hash");
            break;
          default:
            throw TypeError("CryptoKey does not support this operation");
        }
        if (r10 && !e10.usages.includes(r10)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${r10}.`);
      }
      function rF(e10) {
        switch (e10) {
          case "A128GCM":
            return 128;
          case "A192GCM":
            return 192;
          case "A256GCM":
          case "A128CBC-HS256":
            return 256;
          case "A192CBC-HS384":
            return 384;
          case "A256CBC-HS512":
            return 512;
          default:
            throw new rT(`Unsupported JWE Algorithm: ${e10}`);
        }
      }
      function rz(e10, t10) {
        let r10 = e10.byteLength << 3;
        if (r10 !== t10) throw new rA(`Invalid Content Encryption Key length. Expected ${t10} bits, got ${r10} bits`);
      }
      async function rJ(e10, t10, r10) {
        if (!(t10 instanceof Uint8Array)) throw TypeError(rU(t10, "Uint8Array"));
        let n2 = parseInt(e10.slice(1, 4), 10);
        return { encKey: await crypto.subtle.importKey("raw", t10.subarray(n2 >> 3), "AES-CBC", false, [r10]), macKey: await crypto.subtle.importKey("raw", t10.subarray(0, n2 >> 3), { hash: `SHA-${n2 << 1}`, name: "HMAC" }, false, ["sign"]), keySize: n2 };
      }
      async function rX(e10, t10, r10) {
        return new Uint8Array((await crypto.subtle.sign("HMAC", e10, t10)).slice(0, r10 >> 3));
      }
      async function rY(e10, t10) {
        if (!(e10 instanceof Uint8Array)) throw TypeError("First argument must be a buffer");
        if (!(t10 instanceof Uint8Array)) throw TypeError("Second argument must be a buffer");
        let r10 = { name: "HMAC", hash: "SHA-256" }, n2 = await crypto.subtle.generateKey(r10, false, ["sign"]), i2 = new Uint8Array(await crypto.subtle.sign(r10, n2, e10)), a2 = new Uint8Array(await crypto.subtle.sign(r10, n2, t10)), o2 = 0, s2 = -1;
        for (; ++s2 < 32; ) o2 |= i2[s2] ^ a2[s2];
        return 0 === o2;
      }
      async function rQ(e10, t10, r10, n2, i2, a2) {
        var o2;
        let s2, l2, c2, u2, { encKey: d2, macKey: p2, keySize: h2 } = await rJ(e10, t10, "decrypt"), f2 = rh(a2, n2, r10, (c2 = Math.floor((o2 = a2.length << 3) / 4294967296), rf(u2 = new Uint8Array(8), c2, 0), rf(u2, o2 % 4294967296, 4), u2)), g2 = await rX(p2, f2, h2);
        try {
          s2 = await rY(i2, g2);
        } catch {
        }
        if (!s2) throw new rP();
        try {
          l2 = new Uint8Array(await crypto.subtle.decrypt({ iv: n2, name: "AES-CBC" }, d2, r10));
        } catch {
        }
        if (!l2) throw new rP();
        return l2;
      }
      async function rZ(e10, t10, r10, n2, i2, a2) {
        let o2;
        t10 instanceof Uint8Array ? o2 = await crypto.subtle.importKey("raw", t10, "AES-GCM", false, ["decrypt"]) : (rG(t10, e10, "decrypt"), o2 = t10);
        try {
          return new Uint8Array(await crypto.subtle.decrypt({ additionalData: a2, iv: n2, name: "AES-GCM", tagLength: 128 }, o2, rh(r10, i2)));
        } catch {
          throw new rP();
        }
      }
      async function r0(e10, t10, r10, n2, i2, a2) {
        if (!rI(t10) && !(t10 instanceof Uint8Array)) throw TypeError(rU(t10, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
        if (!n2) throw new rA("JWE Initialization Vector missing");
        if (!i2) throw new rA("JWE Authentication Tag missing");
        if (n2.length << 3 !== function(e11) {
          switch (e11) {
            case "A128GCM":
            case "A128GCMKW":
            case "A192GCM":
            case "A192GCMKW":
            case "A256GCM":
            case "A256GCMKW":
              return 96;
            case "A128CBC-HS256":
            case "A192CBC-HS384":
            case "A256CBC-HS512":
              return 128;
            default:
              throw new rT(`Unsupported JWE Algorithm: ${e11}`);
          }
        }(e10)) throw new rA("Invalid Initialization Vector length");
        switch (e10) {
          case "A128CBC-HS256":
          case "A192CBC-HS384":
          case "A256CBC-HS512":
            return t10 instanceof Uint8Array && rz(t10, parseInt(e10.slice(-3), 10)), rQ(e10, t10, r10, n2, i2, a2);
          case "A128GCM":
          case "A192GCM":
          case "A256GCM":
            return t10 instanceof Uint8Array && rz(t10, parseInt(e10.slice(1, 4), 10)), rZ(e10, t10, r10, n2, i2, a2);
          default:
            throw new rT("Unsupported JWE Content Encryption Algorithm");
        }
      }
      async function r1(e10, t10, r10) {
        var n2;
        let i2 = await (n2 = "unwrapKey", t10 instanceof Uint8Array ? crypto.subtle.importKey("raw", t10, "AES-KW", true, [n2]) : (rG(t10, e10, n2), t10));
        if (i2.algorithm.length !== parseInt(e10.slice(1, 4), 10)) throw TypeError(`Invalid key size for alg: ${e10}`);
        let a2 = await crypto.subtle.unwrapKey("raw", r10, i2, "AES-KW", { hash: "SHA-256", name: "HMAC" }, true, ["sign"]);
        return new Uint8Array(await crypto.subtle.exportKey("raw", a2));
      }
      function r2(e10) {
        return rh(rg(e10.length), e10);
      }
      async function r4(e10, t10, r10) {
        let n2 = t10 >> 3, i2 = Math.ceil(n2 / 32), a2 = new Uint8Array(32 * i2);
        for (let t11 = 1; t11 <= i2; t11++) {
          let n3 = new Uint8Array(4 + e10.length + r10.length);
          n3.set(rg(t11), 0), n3.set(e10, 4), n3.set(r10, 4 + e10.length);
          let i3 = await r_("sha256", n3);
          a2.set(i3, (t11 - 1) * 32);
        }
        return a2.slice(0, n2);
      }
      async function r3(e10, t10, r10, n2, i2 = new Uint8Array(), a2 = new Uint8Array()) {
        var o2;
        rG(e10, "ECDH"), rG(t10, "ECDH", "deriveBits");
        let s2 = rh(r2(rm(r10)), r2(i2), r2(a2), rg(n2), new Uint8Array());
        return r4(new Uint8Array(await crypto.subtle.deriveBits({ name: e10.algorithm.name, public: e10 }, t10, "X25519" === (o2 = e10).algorithm.name ? 256 : Math.ceil(parseInt(o2.algorithm.namedCurve.slice(-3), 10) / 8) << 3)), n2, s2);
      }
      async function r6(e10, t10, r10, n2) {
        if (!(e10 instanceof Uint8Array) || e10.length < 8) throw new rA("PBES2 Salt Input must be 8 or more octets");
        let i2 = rh(rm(t10), Uint8Array.of(0), e10), a2 = parseInt(t10.slice(13, 16), 10), o2 = { hash: `SHA-${t10.slice(8, 11)}`, iterations: r10, name: "PBKDF2", salt: i2 }, s2 = await (n2 instanceof Uint8Array ? crypto.subtle.importKey("raw", n2, "PBKDF2", false, ["deriveBits"]) : (rG(n2, t10, "deriveBits"), n2));
        return new Uint8Array(await crypto.subtle.deriveBits(o2, s2, a2));
      }
      async function r5(e10, t10, r10, n2, i2) {
        let a2 = await r6(i2, e10, n2, t10);
        return r1(e10.slice(-6), a2, r10);
      }
      async function r8(e10, t10, r10) {
        return rG(t10, e10, "decrypt"), !function(e11, t11) {
          if (e11.startsWith("RS") || e11.startsWith("PS")) {
            let { modulusLength: r11 } = t11.algorithm;
            if ("number" != typeof r11 || r11 < 2048) throw TypeError(`${e11} requires key modulusLength to be 2048 bits or larger`);
          }
        }(e10, t10), new Uint8Array(await crypto.subtle.decrypt(((e11) => {
          switch (e11) {
            case "RSA-OAEP":
            case "RSA-OAEP-256":
            case "RSA-OAEP-384":
            case "RSA-OAEP-512":
              return "RSA-OAEP";
            default:
              throw new rT(`alg ${e11} is not supported either by JOSE or your javascript runtime`);
          }
        })(e10), t10, r10));
      }
      let r9 = 'Invalid or unsupported JWK "alg" (Algorithm) Parameter value';
      async function r7(e10) {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t10, keyUsages: r10 } = function(e11) {
          let t11, r11;
          switch (e11.kty) {
            case "AKP":
              switch (e11.alg) {
                case "ML-DSA-44":
                case "ML-DSA-65":
                case "ML-DSA-87":
                  t11 = { name: e11.alg }, r11 = e11.priv ? ["sign"] : ["verify"];
                  break;
                default:
                  throw new rT(r9);
              }
              break;
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r11 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new rT(r9);
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                case "ES384":
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: { ES256: "P-256", ES384: "P-384", ES512: "P-521" }[e11.alg] }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new rT(r9);
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                case "EdDSA":
                  t11 = { name: "Ed25519" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new rT(r9);
              }
              break;
            default:
              throw new rT('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r11 };
        }(e10), n2 = { ...e10 };
        return "AKP" !== n2.kty && delete n2.alg, delete n2.use, crypto.subtle.importKey("jwk", n2, t10, e10.ext ?? (!e10.d && !e10.priv), e10.key_ops ?? r10);
      }
      async function ne(e10, t10, r10) {
        let n2;
        if (!rj(e10)) throw TypeError("JWK must be an object");
        switch (t10 ??= e10.alg, n2 ??= r10?.extractable ?? e10.ext, e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return ry(e10.k);
          case "RSA":
            if ("oth" in e10 && void 0 !== e10.oth) throw new rT('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            return r7({ ...e10, alg: t10, ext: n2 });
          case "AKP":
            if ("string" != typeof e10.alg || !e10.alg) throw TypeError('missing "alg" (Algorithm) Parameter value');
            if (void 0 !== t10 && t10 !== e10.alg) throw TypeError("JWK alg and alg option value mismatch");
            return r7({ ...e10, ext: n2 });
          case "EC":
          case "OKP":
            return r7({ ...e10, alg: t10, ext: n2 });
          default:
            throw new rT('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      async function nt(e10, t10, r10, n2, i2) {
        return r0(e10.slice(0, 7), t10, r10, n2, i2, new Uint8Array());
      }
      function nr(e10) {
        if (void 0 === e10) throw new rA("JWE Encrypted Key missing");
      }
      async function nn(e10, t10, r10, n2, i2) {
        switch (e10) {
          case "dir":
            if (void 0 !== r10) throw new rA("Encountered unexpected JWE Encrypted Key");
            return t10;
          case "ECDH-ES":
            if (void 0 !== r10) throw new rA("Encountered unexpected JWE Encrypted Key");
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW": {
            let i3, a2;
            if (!rj(n2.epk)) throw new rA('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
            if (rN(t10), !function(e11) {
              switch (e11.algorithm.namedCurve) {
                case "P-256":
                case "P-384":
                case "P-521":
                  return true;
                default:
                  return "X25519" === e11.algorithm.name;
              }
            }(t10)) throw new rT("ECDH with the provided key is not allowed or not supported by your javascript runtime");
            let o2 = await ne(n2.epk, e10);
            if (rN(o2), void 0 !== n2.apu) {
              if ("string" != typeof n2.apu) throw new rA('JOSE Header "apu" (Agreement PartyUInfo) invalid');
              i3 = rw(n2.apu, "apu", rA);
            }
            if (void 0 !== n2.apv) {
              if ("string" != typeof n2.apv) throw new rA('JOSE Header "apv" (Agreement PartyVInfo) invalid');
              a2 = rw(n2.apv, "apv", rA);
            }
            let s2 = await r3(o2, t10, "ECDH-ES" === e10 ? n2.enc : e10, "ECDH-ES" === e10 ? rF(n2.enc) : parseInt(e10.slice(-5, -2), 10), i3, a2);
            if ("ECDH-ES" === e10) return s2;
            return nr(r10), r1(e10.slice(-6), s2, r10);
          }
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            return nr(r10), rN(t10), r8(e10, t10, r10);
          case "PBES2-HS256+A128KW":
          case "PBES2-HS384+A192KW":
          case "PBES2-HS512+A256KW": {
            let a2;
            if (nr(r10), "number" != typeof n2.p2c) throw new rA('JOSE Header "p2c" (PBES2 Count) missing or invalid');
            let o2 = i2?.maxPBES2Count || 1e4;
            if (n2.p2c > o2) throw new rA('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
            if ("string" != typeof n2.p2s) throw new rA('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
            return a2 = rw(n2.p2s, "p2s", rA), r5(e10, t10, r10, n2.p2c, a2);
          }
          case "A128KW":
          case "A192KW":
          case "A256KW":
            return nr(r10), r1(e10, t10, r10);
          case "A128GCMKW":
          case "A192GCMKW":
          case "A256GCMKW":
            if (nr(r10), "string" != typeof n2.iv) throw new rA('JOSE Header "iv" (Initialization Vector) missing or invalid');
            if ("string" != typeof n2.tag) throw new rA('JOSE Header "tag" (Authentication Tag) missing or invalid');
            return nt(e10, t10, r10, rw(n2.iv, "iv", rA), rw(n2.tag, "tag", rA));
          default:
            throw new rT('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
      function ni(e10, t10) {
        if (void 0 !== t10 && (!Array.isArray(t10) || t10.some((e11) => "string" != typeof e11))) throw TypeError(`"${e10}" option must be an array of strings`);
        if (t10) return new Set(t10);
      }
      let na = "given KeyObject instance cannot be used for this algorithm", no = async (e10, t10, r10, i2 = false) => {
        let a2 = (n ||= /* @__PURE__ */ new WeakMap()).get(e10);
        if (a2?.[r10]) return a2[r10];
        let o2 = await r7({ ...t10, alg: r10 });
        return i2 && Object.freeze(e10), a2 ? a2[r10] = o2 : n.set(e10, { [r10]: o2 }), o2;
      };
      async function ns(e10, t10) {
        if (e10 instanceof Uint8Array || rI(e10)) return e10;
        if (rM(e10)) {
          if ("secret" === e10.type) return e10.export();
          if ("toCryptoKey" in e10 && "function" == typeof e10.toCryptoKey) try {
            return ((e11, t11) => {
              let r11, i2 = (n ||= /* @__PURE__ */ new WeakMap()).get(e11);
              if (i2?.[t11]) return i2[t11];
              let a2 = "public" === e11.type, o2 = !!a2;
              if ("x25519" === e11.asymmetricKeyType) {
                switch (t11) {
                  case "ECDH-ES":
                  case "ECDH-ES+A128KW":
                  case "ECDH-ES+A192KW":
                  case "ECDH-ES+A256KW":
                    break;
                  default:
                    throw TypeError(na);
                }
                r11 = e11.toCryptoKey(e11.asymmetricKeyType, o2, a2 ? [] : ["deriveBits"]);
              }
              if ("ed25519" === e11.asymmetricKeyType) {
                if ("EdDSA" !== t11 && "Ed25519" !== t11) throw TypeError(na);
                r11 = e11.toCryptoKey(e11.asymmetricKeyType, o2, [a2 ? "verify" : "sign"]);
              }
              switch (e11.asymmetricKeyType) {
                case "ml-dsa-44":
                case "ml-dsa-65":
                case "ml-dsa-87":
                  if (t11 !== e11.asymmetricKeyType.toUpperCase()) throw TypeError(na);
                  r11 = e11.toCryptoKey(e11.asymmetricKeyType, o2, [a2 ? "verify" : "sign"]);
              }
              if ("rsa" === e11.asymmetricKeyType) {
                let n2;
                switch (t11) {
                  case "RSA-OAEP":
                    n2 = "SHA-1";
                    break;
                  case "RS256":
                  case "PS256":
                  case "RSA-OAEP-256":
                    n2 = "SHA-256";
                    break;
                  case "RS384":
                  case "PS384":
                  case "RSA-OAEP-384":
                    n2 = "SHA-384";
                    break;
                  case "RS512":
                  case "PS512":
                  case "RSA-OAEP-512":
                    n2 = "SHA-512";
                    break;
                  default:
                    throw TypeError(na);
                }
                if (t11.startsWith("RSA-OAEP")) return e11.toCryptoKey({ name: "RSA-OAEP", hash: n2 }, o2, a2 ? ["encrypt"] : ["decrypt"]);
                r11 = e11.toCryptoKey({ name: t11.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: n2 }, o2, [a2 ? "verify" : "sign"]);
              }
              if ("ec" === e11.asymmetricKeyType) {
                let n2 = (/* @__PURE__ */ new Map([["prime256v1", "P-256"], ["secp384r1", "P-384"], ["secp521r1", "P-521"]])).get(e11.asymmetricKeyDetails?.namedCurve);
                if (!n2) throw TypeError(na);
                let i3 = { ES256: "P-256", ES384: "P-384", ES512: "P-521" };
                i3[t11] && n2 === i3[t11] && (r11 = e11.toCryptoKey({ name: "ECDSA", namedCurve: n2 }, o2, [a2 ? "verify" : "sign"])), t11.startsWith("ECDH-ES") && (r11 = e11.toCryptoKey({ name: "ECDH", namedCurve: n2 }, o2, a2 ? [] : ["deriveBits"]));
              }
              if (!r11) throw TypeError(na);
              return i2 ? i2[t11] = r11 : n.set(e11, { [t11]: r11 }), r11;
            })(e10, t10);
          } catch (e11) {
            if (e11 instanceof TypeError) throw e11;
          }
          let r10 = e10.export({ format: "jwk" });
          return no(e10, r10, t10);
        }
        if (rL(e10)) return e10.k ? ry(e10.k) : no(e10, e10, t10, true);
        throw Error("unreachable");
      }
      let nl = (e10) => e10?.[Symbol.toStringTag], nc = (e10, t10, r10) => {
        if (void 0 !== t10.use) {
          let e11;
          switch (r10) {
            case "sign":
            case "verify":
              e11 = "sig";
              break;
            case "encrypt":
            case "decrypt":
              e11 = "enc";
          }
          if (t10.use !== e11) throw TypeError(`Invalid key for this operation, its "use" must be "${e11}" when present`);
        }
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, its "alg" must be "${e10}" when present`);
        if (Array.isArray(t10.key_ops)) {
          let n2;
          switch (true) {
            case ("sign" === r10 || "verify" === r10):
            case "dir" === e10:
            case e10.includes("CBC-HS"):
              n2 = r10;
              break;
            case e10.startsWith("PBES2"):
              n2 = "deriveBits";
              break;
            case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e10):
              n2 = !e10.includes("GCM") && e10.endsWith("KW") ? "encrypt" === r10 ? "wrapKey" : "unwrapKey" : r10;
              break;
            case ("encrypt" === r10 && e10.startsWith("RSA")):
              n2 = "wrapKey";
              break;
            case "decrypt" === r10:
              n2 = e10.startsWith("RSA") ? "unwrapKey" : "deriveBits";
          }
          if (n2 && t10.key_ops?.includes?.(n2) === false) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${n2}" when present`);
        }
        return true;
      };
      async function nu(e10, t10) {
        var r10 = "DecompressionStream";
        if (void 0 === globalThis[r10]) throw new rT(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${r10} API.`);
        let n2 = new DecompressionStream("deflate-raw"), i2 = n2.writable.getWriter();
        i2.write(e10).catch(() => {
        }), i2.close().catch(() => {
        });
        let a2 = [], o2 = 0, s2 = n2.readable.getReader();
        for (; ; ) {
          let { value: e11, done: r11 } = await s2.read();
          if (r11) break;
          if (a2.push(e11), o2 += e11.byteLength, t10 !== 1 / 0 && o2 > t10) throw new rA("Decompressed plaintext exceeded the configured limit");
        }
        return rh(...a2);
      }
      async function nd(e10, t10, r10) {
        let n2, i2, a2, o2, s2, l2;
        if (!rj(e10)) throw new rA("Flattened JWE must be an object");
        if (void 0 === e10.protected && void 0 === e10.header && void 0 === e10.unprotected) throw new rA("JOSE Header missing");
        if (void 0 !== e10.iv && "string" != typeof e10.iv) throw new rA("JWE Initialization Vector incorrect type");
        if ("string" != typeof e10.ciphertext) throw new rA("JWE Ciphertext missing or incorrect type");
        if (void 0 !== e10.tag && "string" != typeof e10.tag) throw new rA("JWE Authentication Tag incorrect type");
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new rA("JWE Protected Header incorrect type");
        if (void 0 !== e10.encrypted_key && "string" != typeof e10.encrypted_key) throw new rA("JWE Encrypted Key incorrect type");
        if (void 0 !== e10.aad && "string" != typeof e10.aad) throw new rA("JWE AAD incorrect type");
        if (void 0 !== e10.header && !rj(e10.header)) throw new rA("JWE Shared Unprotected Header incorrect type");
        if (void 0 !== e10.unprotected && !rj(e10.unprotected)) throw new rA("JWE Per-Recipient Unprotected Header incorrect type");
        if (e10.protected) try {
          let t11 = ry(e10.protected);
          n2 = JSON.parse(rp.decode(t11));
        } catch {
          throw new rA("JWE Protected Header is invalid");
        }
        if (!function(...e11) {
          let t11, r11 = e11.filter(Boolean);
          if (0 === r11.length || 1 === r11.length) return true;
          for (let e12 of r11) {
            let r12 = Object.keys(e12);
            if (!t11 || 0 === t11.size) {
              t11 = new Set(r12);
              continue;
            }
            for (let e13 of r12) {
              if (t11.has(e13)) return false;
              t11.add(e13);
            }
          }
          return true;
        }(n2, e10.header, e10.unprotected)) throw new rA("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
        let c2 = { ...n2, ...e10.header, ...e10.unprotected };
        if (!function(e11, t11, r11, n3, i3) {
          let a3;
          if (void 0 !== i3.crit && n3?.crit === void 0) throw new e11('"crit" (Critical) Header Parameter MUST be integrity protected');
          if (n3 && void 0 !== n3.crit) {
            if (!Array.isArray(n3.crit) || 0 === n3.crit.length || n3.crit.some((e12) => "string" != typeof e12 || 0 === e12.length)) throw new e11('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
            for (let o3 of (a3 = void 0 !== r11 ? new Map([...Object.entries(r11), ...t11.entries()]) : t11, n3.crit)) {
              if (!a3.has(o3)) throw new rT(`Extension Header Parameter "${o3}" is not recognized`);
              if (void 0 === i3[o3]) throw new e11(`Extension Header Parameter "${o3}" is missing`);
              if (a3.get(o3) && void 0 === n3[o3]) throw new e11(`Extension Header Parameter "${o3}" MUST be integrity protected`);
            }
            n3.crit;
          }
        }(rA, /* @__PURE__ */ new Map(), r10?.crit, n2, c2), void 0 !== c2.zip && "DEF" !== c2.zip) throw new rT('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
        if (void 0 !== c2.zip && !n2?.zip) throw new rA('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
        let { alg: u2, enc: d2 } = c2;
        if ("string" != typeof u2 || !u2) throw new rA("missing JWE Algorithm (alg) in JWE Header");
        if ("string" != typeof d2 || !d2) throw new rA("missing JWE Encryption Algorithm (enc) in JWE Header");
        let p2 = r10 && ni("keyManagementAlgorithms", r10.keyManagementAlgorithms), h2 = r10 && ni("contentEncryptionAlgorithms", r10.contentEncryptionAlgorithms);
        if (p2 && !p2.has(u2) || !p2 && u2.startsWith("PBES2")) throw new rC('"alg" (Algorithm) Header Parameter value not allowed');
        if (h2 && !h2.has(d2)) throw new rC('"enc" (Encryption Algorithm) Header Parameter value not allowed');
        void 0 !== e10.encrypted_key && (i2 = rw(e10.encrypted_key, "encrypted_key", rA));
        let f2 = false;
        "function" == typeof t10 && (t10 = await t10(n2, e10), f2 = true);
        var g2 = "dir" === u2 ? d2 : u2, m2 = t10, y2 = "decrypt";
        switch (g2.substring(0, 2)) {
          case "A1":
          case "A2":
          case "di":
          case "HS":
          case "PB":
            ((e11, t11, r11) => {
              if (!(t11 instanceof Uint8Array)) {
                if (rL(t11)) {
                  if ("oct" === t11.kty && "string" == typeof t11.k && nc(e11, t11, r11)) return;
                  throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
                }
                if (!rD(t11)) throw TypeError(r$(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
                if ("secret" !== t11.type) throw TypeError(`${nl(t11)} instances for symmetric algorithms must be of type "secret"`);
              }
            })(g2, m2, y2);
            break;
          default:
            ((e11, t11, r11) => {
              if (rL(t11)) switch (r11) {
                case "decrypt":
                case "sign":
                  if ("oct" !== t11.kty && ("AKP" === t11.kty && "string" == typeof t11.priv || "string" == typeof t11.d) && nc(e11, t11, r11)) return;
                  throw TypeError("JSON Web Key for this operation must be a private JWK");
                case "encrypt":
                case "verify":
                  if ("oct" !== t11.kty && void 0 === t11.d && void 0 === t11.priv && nc(e11, t11, r11)) return;
                  throw TypeError("JSON Web Key for this operation must be a public JWK");
              }
              if (!rD(t11)) throw TypeError(r$(e11, t11, "CryptoKey", "KeyObject", "JSON Web Key"));
              if ("secret" === t11.type) throw TypeError(`${nl(t11)} instances for asymmetric algorithms must not be of type "secret"`);
              if ("public" === t11.type) switch (r11) {
                case "sign":
                  throw TypeError(`${nl(t11)} instances for asymmetric algorithm signing must be of type "private"`);
                case "decrypt":
                  throw TypeError(`${nl(t11)} instances for asymmetric algorithm decryption must be of type "private"`);
              }
              if ("private" === t11.type) switch (r11) {
                case "verify":
                  throw TypeError(`${nl(t11)} instances for asymmetric algorithm verifying must be of type "public"`);
                case "encrypt":
                  throw TypeError(`${nl(t11)} instances for asymmetric algorithm encryption must be of type "public"`);
              }
            })(g2, m2, y2);
        }
        let v2 = await ns(t10, u2);
        try {
          a2 = await nn(u2, v2, i2, c2, r10);
        } catch (e11) {
          if (e11 instanceof TypeError || e11 instanceof rA || e11 instanceof rT) throw e11;
          a2 = crypto.getRandomValues(new Uint8Array(rF(d2) >> 3));
        }
        void 0 !== e10.iv && (o2 = rw(e10.iv, "iv", rA)), void 0 !== e10.tag && (s2 = rw(e10.tag, "tag", rA));
        let b2 = void 0 !== e10.protected ? rm(e10.protected) : new Uint8Array();
        l2 = void 0 !== e10.aad ? rh(b2, rm("."), rm(e10.aad)) : b2;
        let w2 = rw(e10.ciphertext, "ciphertext", rA), _2 = await r0(d2, a2, w2, o2, s2, l2), E2 = { plaintext: _2 };
        if ("DEF" === c2.zip) {
          let e11 = r10?.maxDecompressedLength ?? 25e4;
          if (0 === e11) throw new rT('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
          if (e11 !== 1 / 0 && (!Number.isSafeInteger(e11) || e11 < 1)) throw TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
          E2.plaintext = await nu(_2, e11).catch((e12) => {
            if (e12 instanceof rA) throw e12;
            throw new rA("Failed to decompress plaintext", { cause: e12 });
          });
        }
        return (void 0 !== e10.protected && (E2.protectedHeader = n2), void 0 !== e10.aad && (E2.additionalAuthenticatedData = rw(e10.aad, "aad", rA)), void 0 !== e10.unprotected && (E2.sharedUnprotectedHeader = e10.unprotected), void 0 !== e10.header && (E2.unprotectedHeader = e10.header), f2) ? { ...E2, key: v2 } : E2;
      }
      async function np(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = rp.decode(e10)), "string" != typeof e10) throw new rA("Compact JWE must be a string or Uint8Array");
        let { 0: n2, 1: i2, 2: a2, 3: o2, 4: s2, length: l2 } = e10.split(".");
        if (5 !== l2) throw new rA("Invalid Compact JWE");
        let c2 = await nd({ ciphertext: o2, iv: a2 || void 0, protected: n2, tag: s2 || void 0, encrypted_key: i2 || void 0 }, t10, r10), u2 = { plaintext: c2.plaintext, protectedHeader: c2.protectedHeader };
        return "function" == typeof t10 ? { ...u2, key: c2.key } : u2;
      }
      let nh = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
      function nf(e10) {
        let t10, r10 = nh.exec(e10);
        if (!r10 || r10[4] && r10[1]) throw TypeError("Invalid time period format");
        let n2 = parseFloat(r10[2]);
        switch (r10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(n2);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * n2);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * n2);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * n2);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * n2);
            break;
          default:
            t10 = Math.round(31557600 * n2);
        }
        return "-" === r10[1] || "ago" === r10[4] ? -t10 : t10;
      }
      let ng = (e10) => e10.includes("/") ? e10.toLowerCase() : `application/${e10.toLowerCase()}`;
      async function nm(e10, t10, r10) {
        let n2 = await np(e10, t10, r10), i2 = function(e11, t11, r11 = {}) {
          var n3, i3;
          let a3, o3;
          try {
            a3 = JSON.parse(rp.decode(t11));
          } catch {
          }
          if (!rj(a3)) throw new rO("JWT Claims Set must be a top-level JSON object");
          let { typ: s2 } = r11;
          if (s2 && ("string" != typeof e11.typ || ng(e11.typ) !== ng(s2))) throw new rx('unexpected "typ" JWT header value', a3, "typ", "check_failed");
          let { requiredClaims: l2 = [], issuer: c2, subject: u2, audience: d2, maxTokenAge: p2 } = r11, h2 = [...l2];
          for (let e12 of (void 0 !== p2 && h2.push("iat"), void 0 !== d2 && h2.push("aud"), void 0 !== u2 && h2.push("sub"), void 0 !== c2 && h2.push("iss"), new Set(h2.reverse()))) if (!(e12 in a3)) throw new rx(`missing required "${e12}" claim`, a3, e12, "missing");
          if (c2 && !(Array.isArray(c2) ? c2 : [c2]).includes(a3.iss)) throw new rx('unexpected "iss" claim value', a3, "iss", "check_failed");
          if (u2 && a3.sub !== u2) throw new rx('unexpected "sub" claim value', a3, "sub", "check_failed");
          if (d2 && (n3 = a3.aud, i3 = "string" == typeof d2 ? [d2] : d2, "string" == typeof n3 ? !i3.includes(n3) : !(Array.isArray(n3) && i3.some(Set.prototype.has.bind(new Set(n3)))))) throw new rx('unexpected "aud" claim value', a3, "aud", "check_failed");
          switch (typeof r11.clockTolerance) {
            case "string":
              o3 = nf(r11.clockTolerance);
              break;
            case "number":
              o3 = r11.clockTolerance;
              break;
            case "undefined":
              o3 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: f2 } = r11, g2 = Math.floor((f2 || /* @__PURE__ */ new Date()).getTime() / 1e3);
          if ((void 0 !== a3.iat || p2) && "number" != typeof a3.iat) throw new rx('"iat" claim must be a number', a3, "iat", "invalid");
          if (void 0 !== a3.nbf) {
            if ("number" != typeof a3.nbf) throw new rx('"nbf" claim must be a number', a3, "nbf", "invalid");
            if (a3.nbf > g2 + o3) throw new rx('"nbf" claim timestamp check failed', a3, "nbf", "check_failed");
          }
          if (void 0 !== a3.exp) {
            if ("number" != typeof a3.exp) throw new rx('"exp" claim must be a number', a3, "exp", "invalid");
            if (a3.exp <= g2 - o3) throw new rS('"exp" claim timestamp check failed', a3, "exp", "check_failed");
          }
          if (p2) {
            let e12 = g2 - a3.iat;
            if (e12 - o3 > ("number" == typeof p2 ? p2 : nf(p2))) throw new rS('"iat" claim timestamp check failed (too far in the past)', a3, "iat", "check_failed");
            if (e12 < 0 - o3) throw new rx('"iat" claim timestamp check failed (it should be in the past)', a3, "iat", "check_failed");
          }
          return a3;
        }(n2.protectedHeader, n2.plaintext, r10), { protectedHeader: a2 } = n2;
        if (void 0 !== a2.iss && a2.iss !== i2.iss) throw new rx('replicated "iss" claim header parameter mismatch', i2, "iss", "mismatch");
        if (void 0 !== a2.sub && a2.sub !== i2.sub) throw new rx('replicated "sub" claim header parameter mismatch', i2, "sub", "mismatch");
        if (void 0 !== a2.aud && JSON.stringify(a2.aud) !== JSON.stringify(i2.aud)) throw new rx('replicated "aud" claim header parameter mismatch', i2, "aud", "mismatch");
        let o2 = { payload: i2, protectedHeader: a2 };
        return "function" == typeof t10 ? { ...o2, key: n2.key } : o2;
      }
      var ny = function(e10, t10, r10, n2, i2) {
        if ("m" === n2) throw TypeError("Private method is not writable");
        if ("a" === n2 && !i2) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t10 ? e10 !== t10 || !i2 : !t10.has(e10)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === n2 ? i2.call(e10, r10) : i2 ? i2.value = r10 : t10.set(e10, r10), r10;
      }, nv = function(e10, t10, r10, n2) {
        if ("a" === r10 && !n2) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t10 ? e10 !== t10 || !n2 : !t10.has(e10)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r10 ? n2 : "a" === r10 ? n2.call(e10) : n2 ? n2.value : t10.get(e10);
      };
      class nb {
        constructor(e10, t10, r10) {
          if (er.add(this), en.set(this, {}), ei.set(this, void 0), ea.set(this, void 0), ny(this, ea, r10, "f"), ny(this, ei, e10, "f"), !t10) return;
          const { name: n2 } = e10;
          for (const [e11, r11] of Object.entries(t10)) e11.startsWith(n2) && r11 && (nv(this, en, "f")[e11] = r11);
        }
        get value() {
          return Object.keys(nv(this, en, "f")).sort((e10, t10) => parseInt(e10.split(".").pop() || "0") - parseInt(t10.split(".").pop() || "0")).map((e10) => nv(this, en, "f")[e10]).join("");
        }
        chunk(e10, t10) {
          let r10 = nv(this, er, "m", es).call(this);
          for (let n2 of nv(this, er, "m", eo).call(this, { name: nv(this, ei, "f").name, value: e10, options: { ...nv(this, ei, "f").options, ...t10 } })) r10[n2.name] = n2;
          return Object.values(r10);
        }
        clean() {
          return Object.values(nv(this, er, "m", es).call(this));
        }
      }
      en = /* @__PURE__ */ new WeakMap(), ei = /* @__PURE__ */ new WeakMap(), ea = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakSet(), eo = function(e10) {
        let t10 = Math.ceil(e10.value.length / 3936);
        if (1 === t10) return nv(this, en, "f")[e10.name] = e10.value, [e10];
        let r10 = [];
        for (let n2 = 0; n2 < t10; n2++) {
          let t11 = `${e10.name}.${n2}`, i2 = e10.value.substr(3936 * n2, 3936);
          r10.push({ ...e10, name: t11, value: i2 }), nv(this, en, "f")[t11] = i2;
        }
        return nv(this, ea, "f").debug("CHUNKING_SESSION_COOKIE", { message: "Session cookie exceeds allowed 4096 bytes.", emptyCookieSize: 160, valueSize: e10.value.length, chunks: r10.map((e11) => e11.value.length + 160) }), r10;
      }, es = function() {
        let e10 = {};
        for (let t10 in nv(this, en, "f")) delete nv(this, en, "f")?.[t10], e10[t10] = { name: t10, value: "", options: { ...nv(this, ei, "f").options, maxAge: 0 } };
        return e10;
      };
      class nw extends Error {
        constructor(e10, t10) {
          e10 instanceof Error ? super(void 0, { cause: { err: e10, ...e10.cause, ...t10 } }) : "string" == typeof e10 ? (t10 instanceof Error && (t10 = { err: t10, ...t10.cause }), super(e10, t10)) : super(void 0, e10), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
          const r10 = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
          this.message += `${this.message ? ". " : ""}Read more at ${r10}`;
        }
      }
      class n_ extends nw {
      }
      n_.type = "MissingSecret";
      let nE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, nx = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, nS = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, nC = /^[\u0020-\u003A\u003D-\u007E]*$/, nT = Object.prototype.toString, nP = ((a = function() {
      }).prototype = /* @__PURE__ */ Object.create(null), a);
      function nA(e10, t10, r10) {
        do {
          let r11 = e10.charCodeAt(t10);
          if (32 !== r11 && 9 !== r11) return t10;
        } while (++t10 < r10);
        return r10;
      }
      function nO(e10, t10, r10) {
        for (; t10 > r10; ) {
          let r11 = e10.charCodeAt(--t10);
          if (32 !== r11 && 9 !== r11) return t10 + 1;
        }
        return r10;
      }
      function nR(e10) {
        if (-1 === e10.indexOf("%")) return e10;
        try {
          return decodeURIComponent(e10);
        } catch (t10) {
          return e10;
        }
      }
      e.s(["parse", 0, function(e10, t10) {
        let r10 = new nP(), n2 = e10.length;
        if (n2 < 2) return r10;
        let i2 = t10?.decode || nR, a2 = 0;
        do {
          let t11 = e10.indexOf("=", a2);
          if (-1 === t11) break;
          let o2 = e10.indexOf(";", a2), s2 = -1 === o2 ? n2 : o2;
          if (t11 > s2) {
            a2 = e10.lastIndexOf(";", t11 - 1) + 1;
            continue;
          }
          let l2 = nA(e10, a2, t11), c2 = nO(e10, t11, l2), u2 = e10.slice(l2, c2);
          if (void 0 === r10[u2]) {
            let n3 = nA(e10, t11 + 1, s2), a3 = nO(e10, s2, n3), o3 = i2(e10.slice(n3, a3));
            r10[u2] = o3;
          }
          a2 = s2 + 1;
        } while (a2 < n2);
        return r10;
      }, "serialize", 0, function(e10, t10, r10) {
        let n2 = r10?.encode || encodeURIComponent;
        if (!nE.test(e10)) throw TypeError(`argument name is invalid: ${e10}`);
        let i2 = n2(t10);
        if (!nx.test(i2)) throw TypeError(`argument val is invalid: ${t10}`);
        let a2 = e10 + "=" + i2;
        if (!r10) return a2;
        if (void 0 !== r10.maxAge) {
          if (!Number.isInteger(r10.maxAge)) throw TypeError(`option maxAge is invalid: ${r10.maxAge}`);
          a2 += "; Max-Age=" + r10.maxAge;
        }
        if (r10.domain) {
          if (!nS.test(r10.domain)) throw TypeError(`option domain is invalid: ${r10.domain}`);
          a2 += "; Domain=" + r10.domain;
        }
        if (r10.path) {
          if (!nC.test(r10.path)) throw TypeError(`option path is invalid: ${r10.path}`);
          a2 += "; Path=" + r10.path;
        }
        if (r10.expires) {
          var o2;
          if (o2 = r10.expires, "[object Date]" !== nT.call(o2) || !Number.isFinite(r10.expires.valueOf())) throw TypeError(`option expires is invalid: ${r10.expires}`);
          a2 += "; Expires=" + r10.expires.toUTCString();
        }
        if (r10.httpOnly && (a2 += "; HttpOnly"), r10.secure && (a2 += "; Secure"), r10.partitioned && (a2 += "; Partitioned"), r10.priority) switch ("string" == typeof r10.priority ? r10.priority.toLowerCase() : void 0) {
          case "low":
            a2 += "; Priority=Low";
            break;
          case "medium":
            a2 += "; Priority=Medium";
            break;
          case "high":
            a2 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${r10.priority}`);
        }
        if (r10.sameSite) switch ("string" == typeof r10.sameSite ? r10.sameSite.toLowerCase() : r10.sameSite) {
          case true:
          case "strict":
            a2 += "; SameSite=Strict";
            break;
          case "lax":
            a2 += "; SameSite=Lax";
            break;
          case "none":
            a2 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${r10.sameSite}`);
        }
        return a2;
      }], 52411);
      let { parse: nk } = e.i(52411);
      async function nN(e10) {
        let { token: t10, secret: r10, salt: n2 } = e10, i2 = Array.isArray(r10) ? r10 : [r10];
        if (!t10) return null;
        let { payload: a2 } = await nm(t10, async ({ kid: e11, enc: t11 }) => {
          for (let r11 of i2) {
            let i3 = await nM(t11, r11, n2);
            if (void 0 === e11 || e11 === await rq({ kty: "oct", k: rb.encode(i3) }, `sha${i3.byteLength << 3}`)) return i3;
          }
          throw Error("no matching decryption secret");
        }, { clockTolerance: 15, keyManagementAlgorithms: ["dir"], contentEncryptionAlgorithms: ["A256CBC-HS512", "A256GCM"] });
        return a2;
      }
      async function nI(e10) {
        var t10;
        let r10, { secureCookie: n2, cookieName: i2 = (r10 = (t10 = n2 ?? false) ? "__Secure-" : "", { sessionToken: { name: `${r10}authjs.session-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: t10 } }, callbackUrl: { name: `${r10}authjs.callback-url`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: t10 } }, csrfToken: { name: `${t10 ? "__Host-" : ""}authjs.csrf-token`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: t10 } }, pkceCodeVerifier: { name: `${r10}authjs.pkce.code_verifier`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: t10, maxAge: 900 } }, state: { name: `${r10}authjs.state`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: t10, maxAge: 900 } }, nonce: { name: `${r10}authjs.nonce`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: t10 } }, webauthnChallenge: { name: `${r10}authjs.challenge`, options: { httpOnly: true, sameSite: "lax", path: "/", secure: t10, maxAge: 900 } } }).sessionToken.name, decode: a2 = nN, salt: o2 = i2, secret: s2, logger: l2 = console, raw: c2, req: u2 } = e10;
        if (!u2) throw Error("Must pass `req` to JWT getToken()");
        let d2 = u2.headers instanceof Headers ? u2.headers : new Headers(u2.headers), p2 = new nb({ name: i2, options: { secure: n2 } }, nk(d2.get("cookie") ?? ""), l2).value, h2 = d2.get("authorization");
        if (p2 || h2?.split(" ")[0] !== "Bearer" || (p2 = decodeURIComponent(h2.split(" ")[1])), !p2) return null;
        if (c2) return p2;
        if (!s2) throw new n_("Must pass `secret` if not set to JWT getToken()");
        try {
          return await a2({ token: p2, secret: s2, salt: o2 });
        } catch {
          return null;
        }
      }
      async function nM(e10, t10, r10) {
        let n2;
        switch (e10) {
          case "A256CBC-HS512":
            n2 = 64;
            break;
          case "A256GCM":
            n2 = 32;
            break;
          default:
            throw Error("Unsupported JWT Content Encryption Algorithm");
        }
        return await ru("sha256", t10, r10, `Auth.js Generated Encryption Key (${r10})`, n2);
      }
      let nD = { ATLETA: ["/dashboard/atleta", "/sesiones", "/mi-plan"], ENTRENADOR: ["/dashboard/entrenador", "/planes", "/atletas"], ADMIN: ["/admin"], SHARED: ["/reportes"] };
      async function nj(e10) {
        let t10 = await nI({ req: e10, secret: process.env.AUTH_SECRET }), { pathname: r10 } = e10.nextUrl;
        if (!Object.values(nD).flat().some((e11) => r10.startsWith(e11))) return eg.next();
        if (!t10) {
          let t11 = new URL("/login", e10.url);
          return t11.searchParams.set("callbackUrl", r10), eg.redirect(t11);
        }
        let n2 = t10.rol;
        return r10.startsWith("/admin") && "ADMIN" !== n2 || (r10.startsWith("/dashboard/entrenador") || r10.startsWith("/planes") || r10.startsWith("/atletas")) && "ENTRENADOR" !== n2 || (r10.startsWith("/dashboard/atleta") || r10.startsWith("/sesiones") || r10.startsWith("/mi-plan")) && "ATLETA" !== n2 || r10.startsWith("/reportes") && !["ATLETA", "ENTRENADOR"].includes(n2) ? eg.redirect(new URL("/no-autorizado", e10.url)) : eg.next();
      }
      e.s(["config", 0, { matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login|registro).*)"] }, "middleware", 0, nj], 99446);
      let nL = { ...e.i(99446) }, nH = "/middleware", nU = nL.middleware || nL.default;
      if ("function" != typeof nU) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${nH}" must export a function named \`middleware\` or a default function.`);
      let n$ = (e10) => tP({ ...e10, IncrementalCache: rs, incrementalCacheHandler: null, page: nH, handler: async (...e11) => {
        try {
          return await nU(...e11);
        } catch (i2) {
          let t10 = e11[0], r10 = new URL(t10.url), n2 = r10.pathname + r10.search;
          throw await c(i2, { path: n2, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), i2;
        }
      } });
      async function nW(e10, t10) {
        let r10 = await n$({ request: { url: e10.url, method: e10.method, headers: x(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: nH }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, n$, "handler", 0, nW], 42738);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_09_s2fq.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_09_s2fq = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_09_s2fq.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_09_s2fq.js", { otherChunks: ["chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0a9gg_0.js", "chunks/[root-of-the-server]__0_lzsr-._.js"], runtimeModuleIds: [38022] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = ["NEXT_DEPLOYMENT_ID", "NEXT_CLIENT_ASSET_SUFFIX"];
      var r, n = ((r = n || {})[r.Runtime = 0] = "Runtime", r[r.Parent = 1] = "Parent", r[r.Update = 2] = "Update", r);
      let o = /* @__PURE__ */ new WeakMap();
      function u(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let l = u.prototype, i = Object.prototype.hasOwnProperty, a = "u" > typeof Symbol && Symbol.toStringTag;
      function s(e2, t2, r2) {
        i.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function c(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = f(t2), e2[t2] = r2), r2;
      }
      function f(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function d(e2, t2) {
        s(e2, "__esModule", { value: true }), a && s(e2, a, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) s(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? s(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : s(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      function h(e2, t2) {
        (null != t2 ? c(this.c, t2) : this.m).exports = e2;
      }
      l.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = c(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, d(n2, e2);
      }, l.j = function(e2, t2) {
        var r2, n2;
        let u2, l2, a2;
        null != t2 ? l2 = (u2 = c(this.c, t2)).exports : (u2 = this.m, l2 = this.e);
        let s2 = (r2 = u2, n2 = l2, (a2 = o.get(r2)) || (o.set(r2, a2 = []), r2.exports = r2.namespaceObject = new Proxy(n2, { get(e3, t3) {
          if (i.call(e3, t3) || "default" === t3 || "__esModule" === t3) return Reflect.get(e3, t3);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t3);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t3 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t3.includes(r3) || t3.push(r3);
          return t3;
        } })), a2);
        "object" == typeof e2 && null !== e2 && s2.push(e2);
      }, l.v = h, l.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? c(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, m = [null, p({}), p([]), p(p)];
      function b(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !m.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), d(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function g(e2) {
        let t2 = K(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = b(r2, y(r2), r2 && r2.__esModule);
      }
      function w(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function _(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function O() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      l.i = g, l.A = function(e2) {
        return this.r(e2)(g.bind(this));
      }, l.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, l.r = function(e2) {
        return K(e2, this.m).exports;
      }, l.f = function(e2) {
        function t2(t3) {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = w(t3), i.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let k = Symbol("turbopack queues"), j = Symbol("turbopack exports"), C = Symbol("turbopack error");
      function P(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      l.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = O(), a2 = Object.assign(i2, { [j]: r2.exports, [k]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), a2.catch(() => {
          });
        } }), s2 = { get: () => a2, set(e3) {
          e3 !== a2 && (a2[j] = e3);
        } };
        Object.defineProperty(r2, "exports", s2), Object.defineProperty(r2, "namespaceObject", s2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (k in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [j]: {}, [k]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[j] = e5, P(t4);
                }, (e5) => {
                  r4[C] = e5, P(t4);
                }), r4;
              }
            }
            return { [j]: e4, [k]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[C]) throw e4[C];
            return e4[j];
          }), { promise: u3, resolve: l3 } = O(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function a3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[k](a3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(a2[C] = e3) : u2(a2[j]), P(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let v = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function E(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      v.prototype = URL.prototype, l.U = v, l.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, l.g = globalThis;
      let U = u.prototype, R = /* @__PURE__ */ new Map();
      l.M = R;
      let x = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return q(e2, t2, A(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!R.has(e3) || x.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => M.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) M.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = q(e2, t2, A(n3));
            M.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = q(e2, t2, A(r2.path)), l2)) M.has(o3) || M.set(o3, n2);
        }
        for (let e3 of o2) x.has(e3) || x.set(e3, n2);
        await n2;
      }
      U.l = function(e2) {
        return $(n.Parent, this.m.id, e2);
      };
      let T = Promise.resolve(void 0), S = /* @__PURE__ */ new WeakMap();
      function q(t2, r2, o2) {
        let u2 = e.loadChunkCached(t2, o2), l2 = S.get(u2);
        if (void 0 === l2) {
          let e2 = S.set.bind(S, u2, T);
          l2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case n.Runtime:
                u3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                u3 = `from module ${r2}`;
                break;
              case n.Update:
                u3 = "from an HMR update";
                break;
              default:
                E(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let l3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw l3.name = "ChunkLoadError", l3;
          }), S.set(u2, l2);
        }
        return l2;
      }
      function A(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      U.L = function(e2) {
        return q(n.Parent, this.m.id, e2);
      }, U.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, U.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, U.q = function(e2, t2) {
        h.call(this, `${e2}`, t2);
      }, U.b = function(e2, r2, n2, o2) {
        let u2 = "SharedWorker" === e2.name, l2 = [n2.map((e3) => A(e3)).reverse(), ""];
        for (let e3 of t) l2.push(globalThis[e3]);
        let i2 = new URL(A(r2), location.origin), a2 = JSON.stringify(l2);
        return u2 ? i2.searchParams.set("params", a2) : i2.hash = "#params=" + encodeURIComponent(a2), new e2(i2, o2 ? { ...o2, type: void 0 } : void 0);
      };
      let N = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      l.w = function(t2, r2, o2) {
        return e.loadWebAssembly(n.Parent, this.m.id, t2, r2, o2);
      }, l.u = function(t2, r2) {
        return e.loadWebAssemblyModule(n.Parent, this.m.id, t2, r2);
      };
      let I = {};
      l.c = I;
      let K = (e2, t2) => {
        let r2 = I[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return L(e2, n.Parent, t2.id);
      };
      function L(e2, t2, r2) {
        let n2 = R.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              E(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let o2 = f(e2), l2 = o2.exports;
        I[e2] = o2;
        let i2 = new u(o2, l2);
        try {
          n2(i2, o2, l2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && b(o2.exports, o2.namespaceObject), o2;
      }
      function W(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let l2 = n3 ?? u2, i2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (i2 || (l2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), i2 = true), t3.set(r4, l2));
            }
            r3 = o2 + 1;
          }
        }(t2, R)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : b(n2, y(n2), true);
      }
      l.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? b(t2.default, y(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), l.x = B, e = { registerChunk(e2, t2) {
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(e2);
        F.add(r2), function(e3) {
          let t3 = D.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && X(r3.runtimeModuleIds, r3.chunkPath);
            D.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? X(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = _(e4);
            if (F.has(t4)) continue;
            n2.add(t4);
            let r4 = D.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), D.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && X(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = _(e3), N.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await z(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => z(r2, n2) };
      let F = /* @__PURE__ */ new Set(), D = /* @__PURE__ */ new Map();
      function X(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = I[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          L(t3, n.Runtime, e3);
        }(t2, r2);
      }
      async function z(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let H = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: W }, H.forEach(W);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api\\/auth|_next\\/static|_next\\/image|favicon.ico|login|registro).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_node_modules_next_dist_esm_build_templates_edge_wrapper_0a9gg_0();
    require_root_of_the_server_0_lzsr();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_09_s2fq();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "images.unsplash.com" }, { "protocol": "https", "hostname": "avatars.githubusercontent.com" }], "qualities": [75], "unoptimized": false, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/home/hp_pavilion/running-coach", "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": false, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "partialFallbacks": false, "dynamicOnHover": false, "varyParams": false, "prefetchInlining": { "maxSize": 2048, "maxBundleSize": 10240 }, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 3, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "viewTransition": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": false, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "/home/hp_pavilion/running-coach" }, "distDirRoot": ".next" };
var BuildId = "8E-yGVLUTcIWuk265IGSu";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/api/planes", "regex": "^/api/planes(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/planes(?:/)?$" }, { "page": "/api/sesiones", "regex": "^/api/sesiones(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/sesiones(?:/)?$" }, { "page": "/api/usuarios", "regex": "^/api/usuarios(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/usuarios(?:/)?$" }, { "page": "/atletas", "regex": "^/atletas(?:/)?$", "routeKeys": {}, "namedRegex": "^/atletas(?:/)?$" }, { "page": "/dashboard/atleta", "regex": "^/dashboard/atleta(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/atleta(?:/)?$" }, { "page": "/dashboard/entrenador", "regex": "^/dashboard/entrenador(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard/entrenador(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/historial", "regex": "^/historial(?:/)?$", "routeKeys": {}, "namedRegex": "^/historial(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/mi-plan", "regex": "^/mi\\-plan(?:/)?$", "routeKeys": {}, "namedRegex": "^/mi\\-plan(?:/)?$" }, { "page": "/no-autorizado", "regex": "^/no\\-autorizado(?:/)?$", "routeKeys": {}, "namedRegex": "^/no\\-autorizado(?:/)?$" }, { "page": "/planes", "regex": "^/planes(?:/)?$", "routeKeys": {}, "namedRegex": "^/planes(?:/)?$" }, { "page": "/planes/nuevo", "regex": "^/planes/nuevo(?:/)?$", "routeKeys": {}, "namedRegex": "^/planes/nuevo(?:/)?$" }, { "page": "/proyeccion", "regex": "^/proyeccion(?:/)?$", "routeKeys": {}, "namedRegex": "^/proyeccion(?:/)?$" }, { "page": "/registro", "regex": "^/registro(?:/)?$", "routeKeys": {}, "namedRegex": "^/registro(?:/)?$" }, { "page": "/sesiones/historial", "regex": "^/sesiones/historial(?:/)?$", "routeKeys": {}, "namedRegex": "^/sesiones/historial(?:/)?$" }, { "page": "/sesiones/nueva", "regex": "^/sesiones/nueva(?:/)?$", "routeKeys": {}, "namedRegex": "^/sesiones/nueva(?:/)?$" }, { "page": "/usuarios", "regex": "^/usuarios(?:/)?$", "routeKeys": {}, "namedRegex": "^/usuarios(?:/)?$" }], "dynamic": [{ "page": "/api/auth/[...nextauth]", "regex": "^/api/auth/(.+?)(?:/)?$", "routeKeys": { "nxtPnextauth": "nxtPnextauth" }, "namedRegex": "^/api/auth/(?<nxtPnextauth>.+?)(?:/)?$" }, { "page": "/api/reportes/[atletaId]", "regex": "^/api/reportes/([^/]+?)(?:/)?$", "routeKeys": { "nxtPatletaId": "nxtPatletaId" }, "namedRegex": "^/api/reportes/(?<nxtPatletaId>[^/]+?)(?:/)?$" }, { "page": "/api/sesiones/atleta/[id]", "regex": "^/api/sesiones/atleta/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/sesiones/atleta/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/atletas/[id]", "regex": "^/atletas/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/atletas/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/reportes/[atletaId]", "regex": "^/reportes/([^/]+?)(?:/)?$", "routeKeys": { "nxtPatletaId": "nxtPatletaId" }, "namedRegex": "^/reportes/(?<nxtPatletaId>[^/]+?)(?:/)?$" }, { "page": "/rutinas/[id]/resultado", "regex": "^/rutinas/([^/]+?)/resultado(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/rutinas/(?<nxtPid>[^/]+?)/resultado(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/login": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login", "dataRoute": "/login.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/planes/nuevo": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/planes/nuevo", "dataRoute": "/planes/nuevo.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/registro": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/registro", "dataRoute": "/registro.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sesiones/nueva": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sesiones/nueva", "dataRoute": "/sesiones/nueva.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "a76d670690e9b94badf9ae0386875508", "previewModeSigningKey": "67829fa48b9c6ae7d24c1176feb27f3409ab93f06abd1651bf6d4b772ff9634b", "previewModeEncryptionKey": "8553f1bded0d12e6bf9274828b1b11e2c1e93b7b27eb985da9c3f6d1f15ce48b" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_0a9gg_0.js", "server/edge/chunks/[root-of-the-server]__0_lzsr-._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_09_s2fq.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_09_s2fq.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api\\/auth|_next\\/static|_next\\/image|favicon.ico|login|registro).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/((?!api/auth|_next/static|_next/image|favicon.ico|login|registro).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "8E-yGVLUTcIWuk265IGSu", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "rfmNsNzA0P4byBmyUfbG9wA4jbCiQiRmjhEnmEF+U6s=", "__NEXT_PREVIEW_MODE_ID": "a76d670690e9b94badf9ae0386875508", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "8553f1bded0d12e6bf9274828b1b11e2c1e93b7b27eb985da9c3f6d1f15ce48b", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "67829fa48b9c6ae7d24c1176feb27f3409ab93f06abd1651bf6d4b772ff9634b" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathRoutesManifest = { "/(admin)/usuarios/page": "/usuarios", "/(atleta)/mi-plan/page": "/mi-plan", "/(atleta)/rutinas/[id]/resultado/page": "/rutinas/[id]/resultado", "/(atleta)/sesiones/historial/page": "/sesiones/historial", "/(atleta)/sesiones/nueva/page": "/sesiones/nueva", "/(auth)/login/page": "/login", "/(auth)/registro/page": "/registro", "/(entrenador)/atletas/[id]/page": "/atletas/[id]", "/(entrenador)/atletas/page": "/atletas", "/(entrenador)/historial/page": "/historial", "/(entrenador)/planes/nuevo/page": "/planes/nuevo", "/(entrenador)/planes/page": "/planes", "/(entrenador)/proyeccion/page": "/proyeccion", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/api/auth/[...nextauth]/route": "/api/auth/[...nextauth]", "/api/planes/route": "/api/planes", "/api/reportes/[atletaId]/route": "/api/reportes/[atletaId]", "/api/sesiones/atleta/[id]/route": "/api/sesiones/atleta/[id]", "/api/sesiones/route": "/api/sesiones", "/api/usuarios/route": "/api/usuarios", "/dashboard/atleta/page": "/dashboard/atleta", "/dashboard/entrenador/page": "/dashboard/entrenador", "/favicon.ico/route": "/favicon.ico", "/no-autorizado/page": "/no-autorizado", "/page": "/", "/reportes/[atletaId]/page": "/reportes/[atletaId]" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(localizedPath, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
