"use strict";
(self["webpackChunk_anaconda_assistant"] = self["webpackChunk_anaconda_assistant"] || []).push([["lib_shared_lib_index_js"],{

/***/ "../../lib/shared/lib/backend.js":
/*!***************************************!*\
  !*** ../../lib/shared/lib/backend.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackendError: () => (/* binding */ BackendError),
/* harmony export */   InvalidJSONError: () => (/* binding */ InvalidJSONError),
/* harmony export */   backendFetch: () => (/* binding */ backendFetch),
/* harmony export */   handleProxyResponse: () => (/* binding */ handleProxyResponse)
/* harmony export */ });
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);


async function makeRequest(endpoint, query, options) {
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.makeSettings();
    let url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.join(settings.baseUrl, endpoint);
    const encodedQuery = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.objectToQueryString(query);
    if (encodedQuery) {
        url += encodedQuery;
    }
    return await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.makeRequest(url, options, settings);
}
async function backendFetch(endpoint, query = {}, options = {}, isJSON = true) {
    try {
        const response = await makeRequest(endpoint, query, options);
        return handleResponse(response, isJSON);
    }
    catch (e) {
        throw new BackendError('Network request failed', { underlying: e });
    }
}
function handleProxyResponse(data) {
    let { remote_status_code: code, remote_data: proxyData } = data;
    if (code < 200 || code >= 300) {
        throw new BackendError(`Proxied network request returned a ${code} status`, { code, data });
    }
    return proxyData;
}
class BackendError extends Error {
    constructor(message, { code, data, underlying }) {
        // The old version of typescript needed to support v3 extensions
        // doesn't have ES2022, and therefore errors when calling super() with extra args
        // @ts-ignore
        super(message, { cause: underlying });
        this.statusCode = code;
        this.data = data;
    }
}
class InvalidJSONError extends BackendError {
}
async function handleResponse(response, isJSON) {
    if (!response.ok) {
        return handleError(response);
    }
    const text = await response.text();
    if (!isJSON) {
        return text;
    }
    let data;
    if (text.length > 0) {
        try {
            data = JSON.parse(text);
        }
        catch (e) {
            throw new InvalidJSONError('Received a response that isn\'t JSON', {
                data: { rawText: text },
                underlying: e
            });
        }
    }
    return data;
}
async function handleError(response) {
    const text = await response.text();
    let data;
    if (text.length > 0) {
        try {
            data = JSON.parse(text);
        }
        catch (e) {
            console.warn('Received an error message that isn\'t JSON', text);
        }
    }
    throw new BackendError(`Network request returned a ${response.status} status`, { code: response.status, data });
}


/***/ }),

/***/ "../../lib/shared/lib/index.js":
/*!*************************************!*\
  !*** ../../lib/shared/lib/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Environment: () => (/* reexport safe */ _plugins_core__WEBPACK_IMPORTED_MODULE_2__.Environment),
/* harmony export */   backend: () => (/* reexport module object */ _backend__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   tokens: () => (/* binding */ tokens)
/* harmony export */ });
/* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend */ "../../lib/shared/lib/backend.js");
/* harmony import */ var _tokens_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens/core */ "../../lib/shared/lib/tokens/core.js");
/* harmony import */ var _plugins_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugins/core */ "../../lib/shared/lib/plugins/core.js");


const tokens = { CoreToken: _tokens_core__WEBPACK_IMPORTED_MODULE_1__["default"] };




/***/ }),

/***/ "../../lib/shared/lib/plugin.js":
/*!**************************************!*\
  !*** ../../lib/shared/lib/plugin.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComposablePlugin: () => (/* binding */ ComposablePlugin)
/* harmony export */ });
class ComposablePlugin {
}


/***/ }),

/***/ "../../lib/shared/lib/plugins/core.js":
/*!********************************************!*\
  !*** ../../lib/shared/lib/plugins/core.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Environment: () => (/* binding */ Environment)
/* harmony export */ });
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugin */ "../../lib/shared/lib/plugin.js");

var Environment;
(function (Environment) {
    Environment["development"] = "development";
    Environment["staging"] = "staging";
    Environment["production"] = "production";
    Environment["local"] = "local";
})(Environment || (Environment = {}));


/***/ }),

/***/ "../../lib/shared/lib/tokens/core.js":
/*!*******************************************!*\
  !*** ../../lib/shared/lib/tokens/core.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);

const CoreToken = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@anaconda/core');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoreToken);


/***/ })

}]);
//# sourceMappingURL=lib_shared_lib_index_js.2c1b1780444c98f9a107.js.map