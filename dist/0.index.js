(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/gluesql.js":
/*!*************************!*\
  !*** ../pkg/gluesql.js ***!
  \*************************/
/*! exports provided: Glue, __wbg_log_420b00aab3401144, __wbindgen_string_new, __wbg_getItem_ef4345f3e68f429d, __wbindgen_object_drop_ref, __wbg_setItem_d1f71fd96da3c1a0, __wbg_removeItem_492e533ebb0bcd79, __wbg_getItem_748ebc40e3fc5b2c, __wbg_setItem_ad8a6e94e1806ecd, __wbg_removeItem_159f19afec09eb48, __wbindgen_json_parse, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbg_error_4bb6c2a97407129a, __wbindgen_string_get, __wbindgen_throw, __wbindgen_rethrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gluesql_bg.wasm */ \"../pkg/gluesql_bg.wasm\");\n/* harmony import */ var _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gluesql_bg.js */ \"../pkg/gluesql_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Glue\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Glue\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_log_420b00aab3401144\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_log_420b00aab3401144\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_string_new\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getItem_ef4345f3e68f429d\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_getItem_ef4345f3e68f429d\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_object_drop_ref\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setItem_d1f71fd96da3c1a0\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_setItem_d1f71fd96da3c1a0\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_removeItem_492e533ebb0bcd79\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_removeItem_492e533ebb0bcd79\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getItem_748ebc40e3fc5b2c\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_getItem_748ebc40e3fc5b2c\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setItem_ad8a6e94e1806ecd\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_setItem_ad8a6e94e1806ecd\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_removeItem_159f19afec09eb48\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_removeItem_159f19afec09eb48\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_json_parse\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_json_parse\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_59cb74e423758ede\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_new_59cb74e423758ede\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_558ba5917b466edd\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_stack_558ba5917b466edd\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_4bb6c2a97407129a\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_error_4bb6c2a97407129a\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_get\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_string_get\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_rethrow\", function() { return _gluesql_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_rethrow\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/gluesql.js?");

/***/ }),

/***/ "../pkg/gluesql_bg.js":
/*!****************************!*\
  !*** ../pkg/gluesql_bg.js ***!
  \****************************/
/*! exports provided: Glue, __wbg_log_420b00aab3401144, __wbindgen_string_new, __wbg_getItem_ef4345f3e68f429d, __wbindgen_object_drop_ref, __wbg_setItem_d1f71fd96da3c1a0, __wbg_removeItem_492e533ebb0bcd79, __wbg_getItem_748ebc40e3fc5b2c, __wbg_setItem_ad8a6e94e1806ecd, __wbg_removeItem_159f19afec09eb48, __wbindgen_json_parse, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbg_error_4bb6c2a97407129a, __wbindgen_string_get, __wbindgen_throw, __wbindgen_rethrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Glue\", function() { return Glue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_log_420b00aab3401144\", function() { return __wbg_log_420b00aab3401144; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return __wbindgen_string_new; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getItem_ef4345f3e68f429d\", function() { return __wbg_getItem_ef4345f3e68f429d; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setItem_d1f71fd96da3c1a0\", function() { return __wbg_setItem_d1f71fd96da3c1a0; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_removeItem_492e533ebb0bcd79\", function() { return __wbg_removeItem_492e533ebb0bcd79; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getItem_748ebc40e3fc5b2c\", function() { return __wbg_getItem_748ebc40e3fc5b2c; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_setItem_ad8a6e94e1806ecd\", function() { return __wbg_setItem_ad8a6e94e1806ecd; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_removeItem_159f19afec09eb48\", function() { return __wbg_removeItem_159f19afec09eb48; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_json_parse\", function() { return __wbindgen_json_parse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_59cb74e423758ede\", function() { return __wbg_new_59cb74e423758ede; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_558ba5917b466edd\", function() { return __wbg_stack_558ba5917b466edd; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_4bb6c2a97407129a\", function() { return __wbg_error_4bb6c2a97407129a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_get\", function() { return __wbindgen_string_get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_rethrow\", function() { return __wbindgen_rethrow; });\n/* harmony import */ var _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gluesql_bg.wasm */ \"../pkg/gluesql_bg.wasm\");\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nlet heap_next = heap.length;\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nfunction getObject(idx) { return heap[idx]; }\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nfunction isLikeNone(x) {\n    return x === undefined || x === null;\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nlet stack_pointer = 32;\n\nfunction addBorrowedObject(obj) {\n    if (stack_pointer == 1) throw new Error('out of js stack');\n    heap[--stack_pointer] = obj;\n    return stack_pointer;\n}\n/**\n*/\nclass Glue {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Glue.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_glue_free\"](ptr);\n    }\n    /**\n    * @param {string} storage_type\n    * @param {any} namespace\n    */\n    constructor(storage_type, namespace) {\n        try {\n            var ptr0 = passStringToWasm0(storage_type, _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n            var len0 = WASM_VECTOR_LEN;\n            var ret = _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"glue_new\"](ptr0, len0, addBorrowedObject(namespace));\n            return Glue.__wrap(ret);\n        } finally {\n            heap[stack_pointer++] = undefined;\n        }\n    }\n    /**\n    * @param {string} sql\n    * @returns {any}\n    */\n    execute(sql) {\n        var ptr0 = passStringToWasm0(sql, _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n        var len0 = WASM_VECTOR_LEN;\n        var ret = _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"glue_execute\"](this.ptr, ptr0, len0);\n        return takeObject(ret);\n    }\n}\n\nconst __wbg_log_420b00aab3401144 = function(arg0, arg1) {\n    console.log(getStringFromWasm0(arg0, arg1));\n};\n\nconst __wbindgen_string_new = function(arg0, arg1) {\n    var ret = getStringFromWasm0(arg0, arg1);\n    return addHeapObject(ret);\n};\n\nconst __wbg_getItem_ef4345f3e68f429d = function(arg0, arg1) {\n    var ret = localStorage.getItem(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n};\n\nconst __wbindgen_object_drop_ref = function(arg0) {\n    takeObject(arg0);\n};\n\nconst __wbg_setItem_d1f71fd96da3c1a0 = function(arg0, arg1, arg2, arg3) {\n    localStorage.setItem(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));\n};\n\nconst __wbg_removeItem_492e533ebb0bcd79 = function(arg0, arg1) {\n    localStorage.removeItem(getStringFromWasm0(arg0, arg1));\n};\n\nconst __wbg_getItem_748ebc40e3fc5b2c = function(arg0, arg1) {\n    var ret = sessionStorage.getItem(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n};\n\nconst __wbg_setItem_ad8a6e94e1806ecd = function(arg0, arg1, arg2, arg3) {\n    sessionStorage.setItem(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));\n};\n\nconst __wbg_removeItem_159f19afec09eb48 = function(arg0, arg1) {\n    sessionStorage.removeItem(getStringFromWasm0(arg0, arg1));\n};\n\nconst __wbindgen_json_parse = function(arg0, arg1) {\n    var ret = JSON.parse(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n};\n\nconst __wbg_new_59cb74e423758ede = function() {\n    var ret = new Error();\n    return addHeapObject(ret);\n};\n\nconst __wbg_stack_558ba5917b466edd = function(arg0, arg1) {\n    var ret = getObject(arg1).stack;\n    var ptr0 = passStringToWasm0(ret, _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nconst __wbg_error_4bb6c2a97407129a = function(arg0, arg1) {\n    try {\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](arg0, arg1);\n    }\n};\n\nconst __wbindgen_string_get = function(arg0, arg1) {\n    const obj = getObject(arg1);\n    var ret = typeof(obj) === 'string' ? obj : undefined;\n    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _gluesql_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nconst __wbindgen_throw = function(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\nconst __wbindgen_rethrow = function(arg0) {\n    throw takeObject(arg0);\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../demo/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/gluesql_bg.js?");

/***/ }),

/***/ "../pkg/gluesql_bg.wasm":
/*!******************************!*\
  !*** ../pkg/gluesql_bg.wasm ***!
  \******************************/
/*! exports provided: memory, __wbg_glue_free, glue_new, glue_execute, __wbindgen_malloc, __wbindgen_realloc, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./gluesql_bg.js */ \"../pkg/gluesql_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/gluesql_bg.wasm?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ })

}]);