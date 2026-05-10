"use strict";
(self["webpackChunk_anaconda_core"] = self["webpackChunk_anaconda_core"] || []).push([["lib_core_lib_index_js-_d6580"],{

/***/ "../../lib/core/lib/datadog.js":
/*!*************************************!*\
  !*** ../../lib/core/lib/datadog.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeDatadog: () => (/* binding */ initializeDatadog)
/* harmony export */ });
/* harmony import */ var _datadog_browser_logs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datadog/browser-logs */ "../../node_modules/@datadog/browser-logs/esm/entries/main.js");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/shared */ "webpack/sharing/consume/default/@anaconda/shared/@anaconda/shared");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_anaconda_shared__WEBPACK_IMPORTED_MODULE_1__);


function initializeDatadog(config, monorepoFeatureFlagEnabled) {
    try {
        if (config.environment === _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__.Environment.production &&
            monorepoFeatureFlagEnabled) {
            console.log("Initializing Datadog");
            _datadog_browser_logs__WEBPACK_IMPORTED_MODULE_0__.datadogLogs.init({
                clientToken: config.datadog.clientToken,
                service: config.datadog.service,
                forwardErrorsToLogs: true,
                silentMultipleInit: true,
            });
            return true;
        }
    }
    catch (e) {
        console.log("failed to initialize datadog");
    }
    return false;
}


/***/ }),

/***/ "../../lib/core/lib/feature_flag.js":
/*!******************************************!*\
  !*** ../../lib/core/lib/feature_flag.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCloudFeatureFlag: () => (/* binding */ createCloudFeatureFlag),
/* harmony export */   createLocalFeatureFlag: () => (/* binding */ createLocalFeatureFlag)
/* harmony export */ });
function createCloudFeatureFlag(client, overrides) {
    return {
        getBool(name, fallback) {
            const override = overrides[name];
            return typeof override === 'boolean'
                ? override
                : client.variation(name, fallback);
        },
        getString(name, fallback) {
            const override = overrides[name];
            return typeof override === 'string'
                ? override
                : client.variation(name, fallback);
        },
    };
}
function createLocalFeatureFlag(overrides) {
    return {
        getBool(name, fallback) {
            const override = overrides[name];
            return typeof override === 'boolean'
                ? override : fallback;
        },
        getString(name, fallback) {
            const override = overrides[name];
            return typeof override === 'string'
                ? override : fallback;
        },
    };
}


/***/ }),

/***/ "../../lib/core/lib/google_analytics.js":
/*!**********************************************!*\
  !*** ../../lib/core/lib/google_analytics.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeGoogleAnalytics: () => (/* binding */ initializeGoogleAnalytics)
/* harmony export */ });
/* harmony import */ var react_ga4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-ga4 */ "../../node_modules/react-ga4/dist/index.js");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/shared */ "webpack/sharing/consume/default/@anaconda/shared/@anaconda/shared");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_anaconda_shared__WEBPACK_IMPORTED_MODULE_1__);


function initializeGoogleAnalytics(config) {
    try {
        if (config.environment !== _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__.Environment.local) {
            console.log('initializing google analytics');
            react_ga4__WEBPACK_IMPORTED_MODULE_0__["default"].initialize(config.ga.clientId);
            return react_ga4__WEBPACK_IMPORTED_MODULE_0__["default"];
        }
    }
    catch (e) {
        console.log('failed to initialize google analytics');
    }
    return null;
}


/***/ }),

/***/ "../../lib/core/lib/heap.js":
/*!**********************************!*\
  !*** ../../lib/core/lib/heap.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLaunchDarklyToHeap: () => (/* binding */ addLaunchDarklyToHeap),
/* harmony export */   initializeHeap: () => (/* binding */ initializeHeap)
/* harmony export */ });
/* harmony import */ var reactjs_heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reactjs-heap */ "../../node_modules/reactjs-heap/dist/index.es.js");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/shared */ "webpack/sharing/consume/default/@anaconda/shared/@anaconda/shared");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_anaconda_shared__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _launch_darkly__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./launch_darkly */ "../../lib/core/lib/launch_darkly.js");



async function initializeHeap(config) {
    try {
        if (config.environment !== _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__.Environment.local) {
            console.log('initializing heap');
            reactjs_heap__WEBPACK_IMPORTED_MODULE_0__["default"].initialize(config.heap.clientId);
            const ldClient = await (0,_launch_darkly__WEBPACK_IMPORTED_MODULE_2__.getLaunchDarklyClient)(config);
            addLaunchDarklyToHeap(ldClient);
            return true;
        }
    }
    catch (e) {
        console.log('failed to initialize heap');
    }
    return false;
}
function addLaunchDarklyToHeap(client) {
    // There's no @types for heap's window object unfortunately
    // Also unfortunately, ReactHeap doesn't return the variable, but instead we have to pull it
    // off window instead
    const heap = window.heap;
    if (!heap)
        return false;
    console.log('initializing heap user and event properties');
    let ffUserID = client.getContext().key;
    if (ffUserID !== 'user:unknown-user-id') {
        heap.identify(ffUserID.replace('user:', ''));
    }
    // prepend ff- to the name of all the feature flags to make it easier to find in heap
    const flags = { 'ff-initialized': 'true' };
    for (const [key, value] of Object.entries(client.allFlags())) {
        flags[`ff-${key}`] = value;
    }
    heap.addUserProperties({ ffUserID });
    heap.clearEventProperties();
    heap.addEventProperties({ ldInitialized: 'true', ...flags });
    return true;
}


/***/ }),

/***/ "../../lib/core/lib/index.js":
/*!***********************************!*\
  !*** ../../lib/core/lib/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CorePlugin: () => (/* reexport safe */ _plugin__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugin */ "../../lib/core/lib/plugin.js");




/***/ }),

/***/ "../../lib/core/lib/launch_darkly.js":
/*!*******************************************!*\
  !*** ../../lib/core/lib/launch_darkly.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLaunchDarklyClient: () => (/* binding */ getLaunchDarklyClient)
/* harmony export */ });
/* harmony import */ var launchdarkly_js_client_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! launchdarkly-js-client-sdk */ "../../node_modules/launchdarkly-js-client-sdk/dist/ldclient.es.js");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/shared */ "webpack/sharing/consume/default/@anaconda/shared/@anaconda/shared");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_anaconda_shared__WEBPACK_IMPORTED_MODULE_1__);


async function getLaunchDarklyClient(config) {
    let context;
    try {
        context = await getCloudContext();
    }
    catch (e) {
        context = {
            kind: 'user',
            key: `user:${getUserId()}`,
        };
    }
    console.log('initializing launch darkly', context);
    const client = launchdarkly_js_client_sdk__WEBPACK_IMPORTED_MODULE_0__.initialize(config.featureFlag.clientId, context);
    await client.waitUntilReady();
    return client;
}
async function getCloudContext() {
    return await _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__.backend
        .backendFetch('aext_core_server/feature_flag/init', {}, {})
        .then((data) => _anaconda_shared__WEBPACK_IMPORTED_MODULE_1__.backend.handleProxyResponse(data));
}
function getUserId() {
    let userId = 'unknown-user-id';
    const urlPathName = window.location.pathname;
    const regExpMatch = urlPathName.match(/\/user\/([^/]*)\//i);
    if (regExpMatch && regExpMatch.length > 0) {
        userId = regExpMatch[1];
    }
    return userId;
}


/***/ }),

/***/ "../../lib/core/lib/plugin.js":
/*!************************************!*\
  !*** ../../lib/core/lib/plugin.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Plugin)
/* harmony export */ });
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @anaconda/shared */ "webpack/sharing/consume/default/@anaconda/shared/@anaconda/shared");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_anaconda_shared__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _launch_darkly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./launch_darkly */ "../../lib/core/lib/launch_darkly.js");
/* harmony import */ var _feature_flag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feature_flag */ "../../lib/core/lib/feature_flag.js");
/* harmony import */ var _heap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./heap */ "../../lib/core/lib/heap.js");
/* harmony import */ var _google_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./google_analytics */ "../../lib/core/lib/google_analytics.js");
/* harmony import */ var _datadog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datadog */ "../../lib/core/lib/datadog.js");






class Plugin {
    constructor() {
        this.#ready = this._getReady();
    }
    #ready;
    activate(app, opts) { }
    ready() {
        return this.#ready;
    }
    async getConfig() {
        return await _anaconda_shared__WEBPACK_IMPORTED_MODULE_0__.backend.backendFetch("aext_core_server/config");
    }
    async _getReady() {
        const config = await this.getConfig();
        if (config.environment == _anaconda_shared__WEBPACK_IMPORTED_MODULE_0__.Environment.local) {
            console.log("[Config] local config");
            const featureFlag = (0,_feature_flag__WEBPACK_IMPORTED_MODULE_2__.createLocalFeatureFlag)(config.featureFlag.overrides);
            const analytics = {
                heap: false,
                ga: null,
                datadog: false,
            };
            return {
                featureFlag,
                analytics,
                config,
            };
        }
        ;
        console.log("[Config] cloud config");
        const launchDarklyClient = await (0,_launch_darkly__WEBPACK_IMPORTED_MODULE_1__.getLaunchDarklyClient)(config);
        const featureFlag = (0,_feature_flag__WEBPACK_IMPORTED_MODULE_2__.createCloudFeatureFlag)(launchDarklyClient, config.featureFlag.overrides);
        const analytics = {
            heap: await (0,_heap__WEBPACK_IMPORTED_MODULE_3__.initializeHeap)(config),
            ga: (0,_google_analytics__WEBPACK_IMPORTED_MODULE_4__.initializeGoogleAnalytics)(config),
            datadog: (0,_datadog__WEBPACK_IMPORTED_MODULE_5__.initializeDatadog)(config, featureFlag.getBool("monorepo-datadog", false)),
        };
        return {
            featureFlag,
            analytics,
            config,
        };
    }
}


/***/ })

}]);
//# sourceMappingURL=lib_core_lib_index_js-_d6580.912361966417894df525.js.map