"use strict";
(self["webpackChunk_anaconda_assistant"] = self["webpackChunk_anaconda_assistant"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @anaconda/shared */ "webpack/sharing/consume/default/@anaconda/shared/@anaconda/shared");
/* harmony import */ var _anaconda_shared__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_anaconda_shared__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _anaconda_assistant_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @anaconda/assistant_lib */ "webpack/sharing/consume/default/@anaconda/assistant_lib/@anaconda/assistant_lib");
/* harmony import */ var _anaconda_assistant_lib__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_anaconda_assistant_lib__WEBPACK_IMPORTED_MODULE_3__);




const assistantPlugin = new _anaconda_assistant_lib__WEBPACK_IMPORTED_MODULE_3__.AssistantPlugin();
/**
 * Initialization data for the @anaconda/assistant extension.
 */
const plugin = {
    id: '@anaconda/assistant:plugin',
    description: 'A JupyterLab extension.',
    autoStart: true,
    requires: [_anaconda_shared__WEBPACK_IMPORTED_MODULE_2__.tokens.CoreToken, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.INotebookTracker, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette],
    activate: (app, coreExtension, notebookTracker, palette) => {
        const { corePlugin } = coreExtension;
        assistantPlugin.activate(app, { corePlugin, notebookTracker, palette });
        console.log('JupyterLab extension @anaconda/assistant is activated!');
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=lib_index_js.0cb256b7e303560db8f9.js.map