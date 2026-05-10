"use strict";
(self["webpackChunk_anaconda_assistant"] = self["webpackChunk_anaconda_assistant"] || []).push([["lib_assistant_lib_index_js-webpack_sharing_consume_default_react-dom"],{

/***/ "../../lib/assistant-components/lib/AssistantComponentContext.js":
/*!***********************************************************************!*\
  !*** ../../lib/assistant-components/lib/AssistantComponentContext.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantComponentContext: () => (/* binding */ AssistantComponentContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Context for AssistantComponent
 * - Used to pass parentClassName to children
 * @alpha
 */
const AssistantComponentContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({});


/***/ }),

/***/ "../../lib/assistant-components/lib/base-elements/BaseElement.js":
/*!***********************************************************************!*\
  !*** ../../lib/assistant-components/lib/base-elements/BaseElement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseElement: () => (/* binding */ BaseElement)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AssistantComponentContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AssistantComponentContext */ "../../lib/assistant-components/lib/AssistantComponentContext.js");
/* harmony import */ var _style_styleUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/styleUtils */ "../../lib/assistant-components/lib/style/styleUtils.js");



/**
 * Assistant BaseElement component.
 * - Adds a class name to the div based on the parent component's class name.
 * - Allows for a custom replacement component to be provided by the context.
 * @alpha
 */
function BaseElement(props) {
    const { parentClassName, replaceChildren } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_AssistantComponentContext__WEBPACK_IMPORTED_MODULE_1__.AssistantComponentContext);
    const Tag = props.as || 'div';
    const parentPrefix = parentClassName ? `${parentClassName}-` : '';
    const asChildName = props.asChildName || Tag;
    const newParentClassName = `${parentPrefix}${asChildName}`;
    const childClassName = `${_style_styleUtils__WEBPACK_IMPORTED_MODULE_2__.rootClassName}-${newParentClassName}`;
    const replacement = replaceChildren?.(childClassName);
    if (replacement) {
        return replacement;
    }
    // Remove asChildName and as from props
    const { asChildName: _, as: __, ...cleanProps } = props;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AssistantComponentContext__WEBPACK_IMPORTED_MODULE_1__.AssistantComponentContext.Provider, { value: {
            parentClassName: newParentClassName,
            replaceChildren
        } },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, Object.assign({}, cleanProps, { className: childClassName }))));
}


/***/ }),

/***/ "../../lib/assistant-components/lib/base-elements/Button.js":
/*!******************************************************************!*\
  !*** ../../lib/assistant-components/lib/base-elements/Button.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseElement */ "../../lib/assistant-components/lib/base-elements/BaseElement.js");


/**
 * Assistant Button component.
 * - Adds a class name to the div based on the parent component's class name.
 * - Allows for a custom replacement component to be provided by the context.
 * @alpha
 */
function Button(props) {
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BaseElement__WEBPACK_IMPORTED_MODULE_1__.BaseElement, Object.assign({}, props, { as: "button" }));
}


/***/ }),

/***/ "../../lib/assistant-components/lib/base-elements/Div.js":
/*!***************************************************************!*\
  !*** ../../lib/assistant-components/lib/base-elements/Div.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Div: () => (/* binding */ Div)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseElement */ "../../lib/assistant-components/lib/base-elements/BaseElement.js");


/**
 * Assistant Div component.
 * - Adds a class name to the div based on the parent component's class name.
 * - Allows for a custom replacement component to be provided by the context.
 * @alpha
 */
function Div(props) {
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BaseElement__WEBPACK_IMPORTED_MODULE_1__.BaseElement, Object.assign({}, props, { as: "div" }));
}


/***/ }),

/***/ "../../lib/assistant-components/lib/base-elements/Style.js":
/*!*****************************************************************!*\
  !*** ../../lib/assistant-components/lib/base-elements/Style.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Style: () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseElement */ "../../lib/assistant-components/lib/base-elements/BaseElement.js");


/**
 * Assistant Style component.
 * - Adds a class name to the div based on the parent component's class name.
 * - Allows for a custom replacement component to be provided by the context.
 * @alpha
 */
function Style(props) {
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BaseElement__WEBPACK_IMPORTED_MODULE_1__.BaseElement, Object.assign({}, props, { as: "style" }));
}


/***/ }),

/***/ "../../lib/assistant-components/lib/base-elements/baseElementUtils.js":
/*!****************************************************************************!*\
  !*** ../../lib/assistant-components/lib/base-elements/baseElementUtils.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   matchChildName: () => (/* binding */ matchChildName),
/* harmony export */   matchMultipleChildNames: () => (/* binding */ matchMultipleChildNames)
/* harmony export */ });
/**
 * Utility function to match a child name with a callback
 * @alpha
 */
function matchChildName(name, callback) {
    return childClassName => {
        if (childClassName === name ||
            childClassName.lastIndexOf(`-${name}`) !== -1 ||
            childClassName.match(name)) {
            return callback(childClassName);
        }
        return null;
    };
}
/**
 * Utility function to match multiple child names with callbacks
 * @alpha
 */
function matchMultipleChildNames(...childNamePairs) {
    return childClassName => {
        for (const childNamePair of childNamePairs) {
            const [name, callback] = childNamePair;
            const match = matchChildName(name, callback)(childClassName);
            if (match) {
                return match;
            }
        }
        return null;
    };
}


/***/ }),

/***/ "../../lib/assistant-components/lib/base-elements/index.js":
/*!*****************************************************************!*\
  !*** ../../lib/assistant-components/lib/base-elements/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseElement: () => (/* reexport safe */ _BaseElement__WEBPACK_IMPORTED_MODULE_0__.BaseElement),
/* harmony export */   Button: () => (/* reexport safe */ _Button__WEBPACK_IMPORTED_MODULE_1__.Button),
/* harmony export */   Div: () => (/* reexport safe */ _Div__WEBPACK_IMPORTED_MODULE_2__.Div),
/* harmony export */   matchChildName: () => (/* reexport safe */ _baseElementUtils__WEBPACK_IMPORTED_MODULE_3__.matchChildName),
/* harmony export */   matchMultipleChildNames: () => (/* reexport safe */ _baseElementUtils__WEBPACK_IMPORTED_MODULE_3__.matchMultipleChildNames)
/* harmony export */ });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "../../lib/assistant-components/lib/base-elements/BaseElement.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ "../../lib/assistant-components/lib/base-elements/Button.js");
/* harmony import */ var _Div__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Div */ "../../lib/assistant-components/lib/base-elements/Div.js");
/* harmony import */ var _baseElementUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./baseElementUtils */ "../../lib/assistant-components/lib/base-elements/baseElementUtils.js");






/***/ }),

/***/ "../../lib/assistant-components/lib/contents/TermsAndConditions.js":
/*!*************************************************************************!*\
  !*** ../../lib/assistant-components/lib/contents/TermsAndConditions.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TermsAndConditions: () => (/* binding */ TermsAndConditions),
/* harmony export */   styleOfTermsAndConditions: () => (/* binding */ styleOfTermsAndConditions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_elements_Div__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base-elements/Div */ "../../lib/assistant-components/lib/base-elements/Div.js");
/* harmony import */ var _base_elements_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base-elements/Button */ "../../lib/assistant-components/lib/base-elements/Button.js");
/* harmony import */ var _base_elements_Style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base-elements/Style */ "../../lib/assistant-components/lib/base-elements/Style.js");




/**
 * Style for the TermsAndConditions component.
 * @alpha
 */
const styleOfTermsAndConditions = `
.anaconda-assistant-terms {
  background: white;
  border-radius: 4px;
  color: #212121;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.anaconda-assistant-terms-data-collection,
.anaconda-assistant-terms-accept-terms {
  padding: 0px 20px 0px 20px;
}

.anaconda-assistant-terms-data-collection-header {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: lighter;
  margin-bottom: 10px;
  margin-top: 10px;
}

.anaconda-assistant-terms-data-collection-content {
  font-size: 13px;
  font-weight: normal;
}

.anaconda-assistant-terms-data-collection-content a {
  color: #6c5af6;
  text-decoration: underline;
}

.anaconda-assistant-terms-data-collection-content b {
  color: #080;
  font-family: 'Inter', sans-serif;
}

.anaconda-assistant-terms-data-collection-setting,
.anaconda-assistant-terms-accept-terms-setting {
  align-items: center;
  display: flex;
  font-size: 13px;
  gap: 20px;
  justify-content: end;
  margin: 20px 0;
}

.anaconda-assistant-terms-data-collection-setting-description,
.anaconda-assistant-terms-accept-terms-setting-description {
  width: calc(100% - 40px);
}

.anaconda-assistant-terms-accept-terms-header {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: lighter;
  margin-bottom: 10px;
  margin-top: 10px;
}

.anaconda-assistant-terms-accept-terms-content {
  font-size: 13px;
  font-weight: normal;
}

.anaconda-assistant-terms-accept-terms-content a {
  color: #6c5af6;
  text-decoration: underline;
}

.anaconda-assistant-terms-accept-terms-content b {
  color: #080;
  font-family: 'Inter', sans-serif;
}

.anaconda-assistant-terms-accept-terms-button {
  background: #4fab4f;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: 16px;
  margin-left: auto;
  margin-top: 10px;
  padding: 12px;
}

.anaconda-assistant-terms-accept-terms-button:disabled {
  background: #bdbdbd;
  color: #212121;
  cursor: default;
}

.anaconda-assistant-terms-accept-terms-button:hover:enabled {
  color: black;
  cursor: pointer;
  background: #0cca4a;
}
`;
/**
 * Terms and Conditions component.
 * @alpha
 */
function TermsAndConditions(props) {
    const { accept, enableDataCollection, setEnableDataCollection, olderThan13, setOlderThan13 } = props;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "terms" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Style__WEBPACK_IMPORTED_MODULE_3__.Style, { asChildName: "style" }, styleOfTermsAndConditions),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "data-collection" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "header" }, "Data Collection"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "content" }, "Help us improve the Anaconda Assistant by allowing us to collect and use data from your chat messages. You can opt out of this at any time in the settings menu at the top-right of the Anaconda Assistant."),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "setting" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "switch" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "checkbox", checked: enableDataCollection, onChange: event => setEnableDataCollection(event.target.checked) })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "description" }, "By opting in, you acknowledge and agree that we collect your messages and additional metadata, as well as sensitive information you might share."))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "accept-terms" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "header" }, "Terms and Conditions"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "content" },
                "By continuing, you agree to our",
                ' ',
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://legal.anaconda.com/policies/en/?name=offering-specific-terms#anaconda-assistant-terms-and-conditions", target: "_blank" }, "Terms and Conditions"),
                ' ',
                "and",
                ' ',
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://www.anaconda.com/privacy-policy", target: "_blank" }, "Privacy Policy"),
                "."),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "setting" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "switch" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { "data-testid": "older-than-13-checkbox", type: "checkbox", checked: olderThan13, onChange: event => setOlderThan13(event.target.checked) })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Div__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "description" }, "I hereby confirm that I am older than 13 years of age.")),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Button__WEBPACK_IMPORTED_MODULE_2__.Button, { asChildName: "button", disabled: !olderThan13, onClick: () => {
                    if (!olderThan13) {
                        return;
                    }
                    accept();
                } }, "Continue"))));
}


/***/ }),

/***/ "../../lib/assistant-components/lib/contents/index.js":
/*!************************************************************!*\
  !*** ../../lib/assistant-components/lib/contents/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TermsAndConditions: () => (/* reexport safe */ _TermsAndConditions__WEBPACK_IMPORTED_MODULE_0__.TermsAndConditions),
/* harmony export */   styleOfTermsAndConditions: () => (/* reexport safe */ _TermsAndConditions__WEBPACK_IMPORTED_MODULE_0__.styleOfTermsAndConditions)
/* harmony export */ });
/* harmony import */ var _TermsAndConditions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TermsAndConditions */ "../../lib/assistant-components/lib/contents/TermsAndConditions.js");



/***/ }),

/***/ "../../lib/assistant-components/lib/icons.js":
/*!***************************************************!*\
  !*** ../../lib/assistant-components/lib/icons.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Icons: () => (/* binding */ Icons)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Icons used in Anaconda Assistant.
 * @alpha
 */
var Icons;
(function (Icons) {
    /**
     * Anaconda Assistant logo.
     */
    function ChatBot(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M160 0C124.7 0 96 28.7 96 64V176H59.7c-5.5-9.6-15.9-16-27.7-16c-17.7 0-32 14.3-32 32s14.3 32 32 32c11.8 0 22.2-6.4 27.7-16H96V352c0 35.3 28.7 64 64 64h64v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L373.3 416H480c35.3 0 64-28.7 64-64V208h36.3c5.5 9.6 15.9 16 27.7 16c17.7 0 32-14.3 32-32s-14.3-32-32-32c-11.8 0-22.2 6.4-27.7 16H544V64c0-35.3-28.7-64-64-64H160zm0 128c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V128zm64 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" })));
    }
    Icons.ChatBot = ChatBot;
    /**
     * Anaconda logo.
     */
    function AnacondaLogo(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M3.69338 15.348V15.2893C3.69338 14.6966 3.75197 14.1333 3.84112 13.5713V13.5126L3.78253 13.4832C3.25018 13.2763 2.7484 12.9799 2.24662 12.713L2.18803 12.6836L2.15874 12.7423C1.83398 13.3938 1.56781 14.1052 1.33093 14.8167L1.30164 14.8754L1.36022 14.9048C2.09888 15.1117 2.83755 15.2599 3.60551 15.3199L3.69466 15.3493L3.69338 15.348Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M5.22926 5.18455C5.22926 5.16496 5.22926 5.16496 5.22926 5.18455C4.78606 5.18455 4.37215 5.21393 3.92896 5.24331C3.98754 5.68781 4.0474 6.10293 4.16584 6.54743C4.4613 6.04417 4.81535 5.5703 5.22926 5.18455Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M3.69337 15.8807V15.8219H3.63479C3.01456 15.7632 2.36505 15.6444 1.71426 15.4962L1.53723 15.4669L1.62638 15.615C2.18802 16.4746 2.89612 17.2449 3.72394 17.9257L3.84238 18.0445V17.8375C3.75323 17.1555 3.69464 16.4746 3.69464 15.882L3.69337 15.8807Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M6.79449 0.533936C6.02653 0.800892 5.28787 1.15598 4.60779 1.60048C5.10957 1.68989 5.61263 1.80741 6.11441 1.95557C6.32073 1.48169 6.52832 1.00781 6.79449 0.533936Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M10.0153 0C9.6307 0 9.24736 0.029378 8.89331 0.0587559C9.42566 0.413846 9.92744 0.828969 10.3999 1.27347L10.7845 1.62856L10.3999 2.01431C10.0752 2.31064 9.75042 2.66573 9.45495 3.0221V3.05148C9.45495 3.05148 9.39637 3.11023 9.30722 3.22902C9.5441 3.19964 9.77971 3.19964 10.0166 3.19964C13.7685 3.19964 16.811 6.25112 16.811 10.0141C16.811 13.777 13.7685 16.8285 10.0166 16.8285C8.71628 16.8285 7.50513 16.4734 6.471 15.8207C5.96921 15.8794 5.43686 15.9101 4.93508 15.9101C4.6982 15.9101 4.46259 15.9101 4.22571 15.8807C4.255 16.6509 4.31486 17.4505 4.43202 18.2808C6.0278 19.3767 7.94705 19.9987 10.0153 19.9987C15.54 19.9987 20 15.5243 20 9.98467C20 4.44501 15.5387 0 10.0153 0Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M8.68565 2.37066C8.89197 2.13308 9.09956 1.89678 9.30588 1.68858C8.83339 1.30283 8.3316 0.918363 7.82855 0.592651C7.50379 1.12656 7.23761 1.68858 7.00073 2.25187C7.44393 2.42941 7.88713 2.60696 8.33033 2.81516C8.50736 2.57758 8.65509 2.40003 8.68438 2.37066H8.68565Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M1.92056 8.08915L1.94985 8.1479L2.00843 8.11852C2.48093 7.79281 2.95342 7.4671 3.45647 7.20014L3.51506 7.17077V7.11201C3.36732 6.54872 3.24888 5.95605 3.1903 5.36338V5.30463H3.13171C2.39305 5.45279 1.65438 5.63034 0.975576 5.89729L0.916992 5.92667L0.946284 5.98543C1.1526 6.69689 1.50792 7.40707 1.92056 8.08915Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M1.80213 9.03692L1.74355 9.09568C1.2112 9.54018 0.70942 10.0141 0.236929 10.548L0.178345 10.6067L0.236929 10.6655C0.769277 11.11 1.30035 11.5251 1.89128 11.9096L1.94987 11.939L1.97916 11.8802C2.24533 11.4063 2.5408 10.9618 2.86556 10.5173L2.89485 10.4586L2.86556 10.4292C2.51151 10.0141 2.15619 9.59894 1.83143 9.12506L1.80213 9.03564V9.03692Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M5.73103 15.3774H5.90806L5.76032 15.2586C5.22797 14.8141 4.75548 14.3109 4.40143 13.7182V13.6888L4.28299 13.6301V13.7195C4.22441 14.2227 4.16455 14.7566 4.16455 15.2893V15.348H4.22313C4.46002 15.348 4.69563 15.3774 4.93251 15.3774H5.72976H5.73103Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M5.40623 4.29686C5.52467 3.7936 5.64311 3.31972 5.82014 2.84457C5.19991 2.66702 4.5504 2.51885 3.89961 2.42944C3.84102 3.11152 3.84102 3.73357 3.87031 4.38499C4.3721 4.32624 4.87515 4.29558 5.40623 4.29558V4.29686Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M6.3512 4.26617C6.7944 3.99921 7.26689 3.76291 7.73938 3.58409C7.38533 3.40654 7.03 3.25838 6.67595 3.13959C6.55751 3.49468 6.43907 3.88042 6.3512 4.26489V4.26617Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M1.71294 12.3847H1.65436C1.15258 12.059 0.649521 11.7027 0.17703 11.3182L0.0292969 11.1994L0.0585888 11.3769C0.17703 12.3247 0.443204 13.2737 0.855838 14.1615L0.914422 14.3096L0.973006 14.1615C1.17932 13.5982 1.4162 13.0362 1.68238 12.5023L1.71167 12.3835L1.71294 12.3847Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M2.98391 2.90332C2.39298 3.49598 1.86191 4.17679 1.448 4.88824C1.94978 4.74008 2.48213 4.62129 3.0132 4.5025C2.98391 3.96859 2.98391 3.43595 2.98391 2.90204V2.90332Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M3.27938 9.92594V9.7484C3.30867 9.12635 3.39782 8.53368 3.57484 7.97039L3.63343 7.79285L3.48569 7.88226C3.10108 8.11984 2.71774 8.35614 2.33312 8.62309L2.27454 8.65247L2.36369 8.71123C2.62986 9.06632 2.89603 9.45206 3.1915 9.77778L3.28065 9.92594H3.27938Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M3.36735 10.9631L3.33806 10.7855L3.24891 10.9337C2.98274 11.3194 2.71656 11.7333 2.48095 12.1484L2.45166 12.2072L2.51024 12.2365C2.92415 12.4741 3.36735 12.681 3.81055 12.888L3.95828 12.9467L3.8997 12.7986C3.63353 12.2353 3.4565 11.5838 3.36735 10.9618V10.9631Z", fill: "#3DAE2B" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M1.41747 8.56306L1.47606 8.53369L1.44677 8.47493C1.12201 7.97167 0.855833 7.43776 0.589659 6.90513L0.531075 6.75696L0.472491 6.9345C0.177025 7.85288 0.0292919 8.77126 0 9.74968V9.92722L0.118441 9.80843C0.503057 9.33455 0.946256 8.91943 1.41875 8.56434L1.41747 8.56306Z", fill: "#3DAE2B" }))));
    }
    Icons.AnacondaLogo = AnacondaLogo;
    /**
     * Sparkle icon.
     */
    function Sparkle(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", fill: "none" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M10.125 3.25C10.0312 3.1875 10 3.09375 10 3C10 2.90625 10.0312 2.84375 10.125 2.78125L12 2L12.75 0.15625C12.8125 0.0625 12.9062 0 13 0C13.0938 0 13.1562 0.0625 13.2188 0.15625L14 2L15.8438 2.78125C15.9375 2.84375 16 2.90625 16 3C16 3.09375 15.9375 3.1875 15.8438 3.25L14 4L13.2188 5.875C13.1562 5.96875 13.0938 6 13 6C12.9062 6 12.8125 5.96875 12.75 5.875L12 4L10.125 3.25ZM15.8438 12.7812C15.9375 12.8438 16 12.9062 16 13C16 13.0938 15.9375 13.1875 15.8438 13.25L14 14L13.2188 15.875C13.1562 15.9688 13.0938 16 13 16C12.9062 16 12.8125 15.9688 12.75 15.875L12 14L10.125 13.25C10.0312 13.1875 10 13.0938 10 13C10 12.9062 10.0312 12.8438 10.125 12.7812L12 12L12.75 10.1562C12.8125 10.0625 12.9062 10 13 10C13.0938 10 13.1562 10.0625 13.2188 10.1562L14 12L15.8438 12.7812ZM12 8C12 8.1875 11.875 8.375 11.7188 8.4375L8.1875 10.2188L6.4375 13.75C6.34375 13.9062 6.15625 14 6 14C5.78125 14 5.625 13.9062 5.53125 13.75L3.78125 10.2188L0.25 8.4375C0.09375 8.375 0 8.1875 0 8C0 7.8125 0.09375 7.625 0.25 7.5625L3.78125 5.78125L5.53125 2.28125C5.71875 1.9375 6.25 1.9375 6.4375 2.28125L8.1875 5.78125L11.7188 7.5625C11.875 7.625 12 7.8125 12 8Z", fill: "currentColor" })));
    }
    Icons.Sparkle = Sparkle;
    /**
     * Settings icon.
     */
    function Settings(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M481.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-30.9 28.1c-7.7 7.1-11.4 17.5-10.9 27.9c.1 2.9 .2 5.8 .2 8.8s-.1 5.9-.2 8.8c-.5 10.5 3.1 20.9 10.9 27.9l30.9 28.1c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-39.7-12.6c-10-3.2-20.8-1.1-29.7 4.6c-4.9 3.1-9.9 6.1-15.1 8.7c-9.3 4.8-16.5 13.2-18.8 23.4l-8.9 40.7c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-8.9-40.7c-2.2-10.2-9.5-18.6-18.8-23.4c-5.2-2.7-10.2-5.6-15.1-8.7c-8.8-5.7-19.7-7.8-29.7-4.6L69.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l30.9-28.1c7.7-7.1 11.4-17.5 10.9-27.9c-.1-2.9-.2-5.8-.2-8.8s.1-5.9 .2-8.8c.5-10.5-3.1-20.9-10.9-27.9L8.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l39.7 12.6c10 3.2 20.8 1.1 29.7-4.6c4.9-3.1 9.9-6.1 15.1-8.7c9.3-4.8 16.5-13.2 18.8-23.4l8.9-40.7c2-9.1 9-16.3 18.2-17.8C213.3 1.2 227.5 0 242 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l8.9 40.7c2.2 10.2 9.4 18.6 18.8 23.4c5.2 2.7 10.2 5.6 15.1 8.7c8.8 5.7 19.7 7.7 29.7 4.6l39.7-12.6c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM242 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" })));
    }
    Icons.Settings = Settings;
    /**
     * Magic wand icon.
     */
    function MagicWand(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 576 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M234.7 42.7L192 64l42.7 21.3L256 128l21.3-42.7L320 64 277.3 42.7 256 0 234.7 42.7zM384.4 192.4l-32.8-32.8L432 79.2 464.8 112l-80.4 80.4zM96 32L64 96 0 128l64 32 32 64 32-64 64-32L128 96 96 32zM416 352l-64 32 64 32 32 64 32-64 64-32-64-32-32-64-32 64zM144 512l39.6-39.6L504.4 151.6 544 112 504.4 72.4 471.6 39.6 432 0 392.4 39.6 71.6 360.4 32 400l39.6 39.6 32.8 32.8L144 512z" })));
    }
    Icons.MagicWand = MagicWand;
    /**
     * Copy icon
     */
    function Copy(props) {
        // Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z", stroke: "currentColor", strokeWidth: "2" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { opacity: "0.5", d: "M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5", stroke: "currentColor", strokeWidth: "2", strokeDasharray: "2" })));
    }
    Icons.Copy = Copy;
    /**
     * User icon.
     */
    function User(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" })));
    }
    Icons.User = User;
    /**
     * Send icon.
     */
    function Send(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" })));
    }
    Icons.Send = Send;
    /**
     * Rotate left icon.
     */
    function RotateLeft(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M126.9 142.9L184 200l-24 24H0V64L24 40 81.6 97.6l0 0c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0l45.3-45.3c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0l0 0z" })));
    }
    Icons.RotateLeft = RotateLeft;
    /**
     * Rotate right icon.
     */
    function RotateRight(props) {
        // <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z" })));
    }
    Icons.RotateRight = RotateRight;
    /**
     * Play icon.
     */
    function Play(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" })));
    }
    Icons.Play = Play;
    /**
     * Error icon.
     */
    function Error(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm24-384v24V264v24H232V264 152 128h48zM232 368V320h48v48H232z" })));
    }
    Icons.Error = Error;
    /**
     * Thumbs up icon.
     */
    function ThumbsUp(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" })));
    }
    Icons.ThumbsUp = ThumbsUp;
    /**
     * Thumbs down icon.
     */
    function ThumbsDown(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z", transform: "rotate(180, 256, 256)" })));
    }
    Icons.ThumbsDown = ThumbsDown;
    /**
     * Change icon.
     */
    function Change(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M150.6 73.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L96 173.3V320c0 53 43 96 96 96H304c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32-14.3-32-32V173.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96zM336 96c-17.7 0-32 14.3-32 32s14.3 32 32 32H448c17.7 0 32 14.3 32 32V338.7l-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L544 338.7V192c0-53-43-96-96-96H336z" })));
    }
    Icons.Change = Change;
    /**
     * Arrow right icon.
     */
    function ArrowRight(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" })));
    }
    Icons.ArrowRight = ArrowRight;
    /**
     * Bars icon.
     */
    function Bars(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" })));
    }
    Icons.Bars = Bars;
    /**
     * Plus icon.
     */
    function Plus(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M256 80V48H192V80 224H48 16v64H48 192V432v32h64V432 288H400h32V224H400 256V80z" })));
    }
    Icons.Plus = Plus;
    /**
     * Frame icon.
     */
    function Frame(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M448 128c0-17.7-14.3-32-32-32l-32 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L128 96l0-32c0-17.7-14.3-32-32-32S64 46.3 64 64l0 32L32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l32 0 0 192-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 192 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-192 32 0c17.7 0 32-14.3 32-32zM128 352l0-192 192 0 0 192-192 0z" })));
    }
    Icons.Frame = Frame;
    /**
     * Code icon.
     */
    function Code(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" })));
    }
    Icons.Code = Code;
    /**
     * Chevron right icon.
     */
    function ChevronRight(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" })));
    }
    Icons.ChevronRight = ChevronRight;
    /**
     * Chevron left icon.
     */
    function ChevronLeft(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ width: "8", height: "14", viewBox: "0 0 8 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M7.82582 11.9242L2.9016 6.99996L7.82582 2.0757L6.5 0.75L0.25 6.99996L6.5 13.25L7.82582 11.9242Z", fill: "currentColor" })));
    }
    Icons.ChevronLeft = ChevronLeft;
    /**
     * Message icon.
     */
    function Message(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z" })));
    }
    Icons.Message = Message;
    /**
     * Solid message icon.
     */
    function SolidMessage(props) {
        return (
        // Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" })));
    }
    Icons.SolidMessage = SolidMessage;
    /**
     * Close icon.
     */
    function Close(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })));
    }
    Icons.Close = Close;
    /**
     * Clip icon.
     */
    function Clip(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "1em", viewBox: "0 0 448 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" })));
    }
    Icons.Clip = Clip;
    /**
     * Warning icon.
     */
    function Warning(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" })));
    }
    Icons.Warning = Warning;
    /**
     * Trash icon.
     */
    function Trash(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "1em", viewBox: "0 0 448 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" })));
    }
    Icons.Trash = Trash;
    /**
     * Book icon.
     */
    function Book(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "1em", viewBox: "0 0 448 512" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fill: "currentColor", d: "M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" })));
    }
    Icons.Book = Book;
    function DataCatalog(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: "30", height: "31", viewBox: "0 0 30 31" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M30 4.8125C30 4.82031 30 4.82812 30 4.83594C29.9609 7.48438 23.2578 9.625 15 9.625C6.74219 9.625 0.0390625 7.48438 0 4.83594C0 4.82812 0 4.82031 0 4.8125C0 2.15625 6.71875 0 15 0C23.2812 0 30 2.15625 30 4.8125ZM30 8.4375C30 8.4375 30 8.45312 30 8.46094C29.9609 11.1094 23.2578 13.25 15 13.25C6.74219 13.25 0.0390625 11.1094 0 8.46094V8.4375L0.078125 15.2187C0.078125 15.2187 0.078125 15.25 0.078125 15.2578C0.117188 17.8906 6.78125 20.0234 15 20.0234C23.2188 20.0234 29.8828 17.8906 29.9219 15.2578C29.9219 15.25 29.9219 15.2187 29.9219 15.2187L30 8.4375ZM30 18.4375C30 18.4375 30 18.4531 30 18.4609C29.9609 21.1094 23.2578 23.25 15 23.25C6.74219 23.25 0.0390625 21.1094 0 18.4609V18.4375L0.078125 25.2188C0.078125 25.2188 0.078125 25.25 0.078125 25.2578C0.117188 27.8906 6.78125 30.0234 15 30.0234C23.2188 30.0234 29.8828 27.8906 29.9219 25.2578C29.9219 25.25 29.9219 25.2188 29.9219 25.2188L30 18.4375Z", fill: "currentColor" })));
    }
    Icons.DataCatalog = DataCatalog;
    function Share(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", { clipPath: "url(#clip0_289_5006)" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z", fill: "currentColor" })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", { id: "clip0_289_5006" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", { width: "24", height: "24", fill: "white" })))));
    }
    Icons.Share = Share;
    function Panel(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 18 18" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", { clipPath: "url(#clip0_345_19040)" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M17.9113 0.428824C17.8716 0.1857 17.6841 0.0656821 17.3871 0.0427376C16.5951 -0.018595 15.8057 -0.0247723 15.0168 0.0970103C14.1202 0.23556 13.2544 0.476919 12.4179 0.823735C11.2931 1.28969 10.265 1.91801 9.31549 2.67783C9.26077 2.72151 9.17297 2.76034 9.10899 2.75019C8.68937 2.68313 8.27328 2.5962 7.8541 2.52648C6.92352 2.37161 6.0481 2.53134 5.27328 3.07362C4.92955 3.3141 4.6348 3.62826 4.33211 3.92345C3.58288 4.65415 2.22253 6.00435 2.09678 6.1279L1.17723 7.17364C1.00603 7.37573 1.10266 7.66651 1.40756 7.72078L2.94661 7.89507C3.66363 7.96125 4.38109 8.02215 5.09855 8.08745C5.14576 8.09186 5.19165 8.11348 5.24062 8.12804C5.09281 8.51987 4.95205 8.89183 4.81218 9.26468C4.73187 9.47868 4.7857 9.65783 4.9472 9.81667C5.25033 10.1145 5.54817 10.4172 5.8491 10.7172C6.6398 11.5071 7.43006 12.2969 8.22253 13.0849C8.3527 13.2147 8.51155 13.2584 8.69025 13.197C8.79526 13.1613 8.89984 13.1229 9.00397 13.0836C9.29475 12.9733 9.58509 12.8621 9.89043 12.7456C9.90057 12.8184 9.90984 12.8687 9.91469 12.9195C10.025 14.0861 10.1353 15.2532 10.2447 16.4199C10.2633 16.6166 10.3401 16.7724 10.5333 16.8492C10.7345 16.929 10.9084 16.8726 11.0544 16.727L14.8628 12.8502C14.9647 12.683 15.0741 12.5308 15.1558 12.3648C15.4695 11.7272 15.6041 11.0526 15.5048 10.3453C15.4386 9.87271 15.338 9.40544 15.2656 8.93375C15.2528 8.84991 15.2806 8.74049 15.3292 8.67033C15.6045 8.27277 15.909 7.89507 16.1715 7.49001C16.8409 6.45795 17.3421 5.34558 17.658 4.15599C17.8667 3.37014 17.9974 2.56929 17.9965 1.75211L18.0004 1.34925C17.9726 1.04215 17.9612 0.731957 17.9118 0.428383L17.9113 0.428824ZM16.2567 5.3769C15.5326 7.04171 14.4617 8.44883 13.1 9.64327C12.484 10.1833 11.82 10.6542 11.1197 11.076C11.0527 11.1161 10.9834 11.1523 10.8669 11.2167C10.5761 10.9114 10.2853 10.595 9.98265 10.2901C8.97044 9.27174 7.95646 8.25512 6.93631 7.24468C6.82159 7.13084 6.81056 7.05097 6.89087 6.91595C7.77511 5.43382 8.88484 4.15378 10.2655 3.11201C11.0632 2.5106 11.9268 2.02876 12.8445 1.63783C13.0329 1.55752 13.1499 1.57385 13.3003 1.72696C14.2199 2.66283 15.1496 3.58855 16.0819 4.51163C16.4649 4.8911 16.4707 4.8836 16.2562 5.37646L16.2567 5.3769Z", fill: "currentColor" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M11.9237 4.4438C11.016 4.44159 10.2959 5.16214 10.2959 6.07286C10.2959 6.99594 10.9962 7.70104 11.9135 7.70193C12.8269 7.70325 13.5452 6.99329 13.5523 6.08213C13.5589 5.18773 12.822 4.44601 11.9237 4.44336V4.4438Z", fill: "currentColor" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M0.733782 17.2304C0.573611 17.2304 0.413882 17.1655 0.297394 17.038C0.0776562 16.7971 0.0944234 16.4234 0.335782 16.2036L4.91013 12.0299C5.15105 11.8102 5.52478 11.8274 5.74452 12.0683C5.96426 12.3092 5.94749 12.683 5.70613 12.9027L1.13178 17.0759C1.01838 17.1792 0.875862 17.2304 0.733782 17.2304Z", fill: "currentColor" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M4.13178 17.3977C3.97161 17.3977 3.81188 17.3328 3.6954 17.2053C3.47566 16.9644 3.49243 16.5906 3.73379 16.3709L5.55699 14.7074C5.79791 14.4877 6.17164 14.5049 6.39138 14.7458C6.61112 14.9867 6.59435 15.3604 6.35299 15.5802L4.52978 17.2437C4.41639 17.3469 4.27386 17.3981 4.13178 17.3981V17.3977Z", fill: "currentColor" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { d: "M0.590823 14.3828C0.430652 14.3828 0.270923 14.3179 0.154435 14.1904C-0.0653034 13.9495 -0.0485362 13.5757 0.192823 13.356L2.01603 11.6925C2.25695 11.4728 2.63024 11.49 2.85042 11.7309C3.07016 11.9718 3.05339 12.3455 2.81203 12.5653L0.988822 14.2288C0.875423 14.332 0.732902 14.3832 0.590823 14.3832V14.3828Z", fill: "currentColor" })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", { id: "clip0_345_19040" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", { width: "18", height: "17.3977", fill: "white" })))));
    }
    Icons.Panel = Panel;
    function Question(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20" }, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M18.75 10C18.75 14.832 14.832 18.75 10 18.75C5.16797 18.75 1.25 14.832 1.25 10C1.25 5.16797 5.16797 1.25 10 1.25C14.832 1.25 18.75 5.16797 18.75 10ZM17.5 10C17.5 5.85938 14.1406 2.5 10 2.5C5.85938 2.5 2.5 5.85938 2.5 10C2.5 14.1406 5.85938 17.5 10 17.5C14.1406 17.5 17.5 14.1406 17.5 10ZM13.75 7.5C13.75 9.26562 12.8359 10.0742 12.1641 10.6641C11.5742 11.1836 11.25 11.4727 11.25 12.5H8.75C8.75 10.3438 9.80859 9.40625 10.5117 8.78906C11.0508 8.31641 11.25 8.13672 11.25 7.5C11.25 6.8125 10.6875 6.25 10 6.25C9.3125 6.25 8.75 6.8125 8.75 7.5H6.25C6.25 5.42969 7.92969 3.75 10 3.75C12.0703 3.75 13.75 5.42969 13.75 7.5ZM11.25 16.25V13.75H8.75V16.25H11.25Z", fill: "currentColor" })));
    }
    Icons.Question = Question;
})(Icons || (Icons = {}));


/***/ }),

/***/ "../../lib/assistant-components/lib/index.js":
/*!***************************************************!*\
  !*** ../../lib/assistant-components/lib/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantComponentContext: () => (/* reexport safe */ _AssistantComponentContext__WEBPACK_IMPORTED_MODULE_2__.AssistantComponentContext),
/* harmony export */   BaseElement: () => (/* reexport safe */ _base_elements__WEBPACK_IMPORTED_MODULE_1__.BaseElement),
/* harmony export */   Button: () => (/* reexport safe */ _base_elements__WEBPACK_IMPORTED_MODULE_1__.Button),
/* harmony export */   Div: () => (/* reexport safe */ _base_elements__WEBPACK_IMPORTED_MODULE_1__.Div),
/* harmony export */   Icons: () => (/* reexport safe */ _icons__WEBPACK_IMPORTED_MODULE_0__.Icons),
/* harmony export */   SettingsPage: () => (/* reexport safe */ _pages__WEBPACK_IMPORTED_MODULE_4__.SettingsPage),
/* harmony export */   TermsAndConditions: () => (/* reexport safe */ _contents__WEBPACK_IMPORTED_MODULE_3__.TermsAndConditions),
/* harmony export */   TermsAndConditionsPage: () => (/* reexport safe */ _pages__WEBPACK_IMPORTED_MODULE_4__.TermsAndConditionsPage),
/* harmony export */   matchChildName: () => (/* reexport safe */ _base_elements__WEBPACK_IMPORTED_MODULE_1__.matchChildName),
/* harmony export */   matchMultipleChildNames: () => (/* reexport safe */ _base_elements__WEBPACK_IMPORTED_MODULE_1__.matchMultipleChildNames),
/* harmony export */   settingAddCodeToNotebookTitles: () => (/* reexport safe */ _pages__WEBPACK_IMPORTED_MODULE_4__.settingAddCodeToNotebookTitles),
/* harmony export */   styleOfSettingsPage: () => (/* reexport safe */ _pages__WEBPACK_IMPORTED_MODULE_4__.styleOfSettingsPage),
/* harmony export */   styleOfTermsAndConditions: () => (/* reexport safe */ _contents__WEBPACK_IMPORTED_MODULE_3__.styleOfTermsAndConditions),
/* harmony export */   styleOfTermsAndConditionsPage: () => (/* reexport safe */ _pages__WEBPACK_IMPORTED_MODULE_4__.styleOfTermsAndConditionsPage)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ "../../lib/assistant-components/lib/icons.js");
/* harmony import */ var _base_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-elements */ "../../lib/assistant-components/lib/base-elements/index.js");
/* harmony import */ var _AssistantComponentContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssistantComponentContext */ "../../lib/assistant-components/lib/AssistantComponentContext.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contents */ "../../lib/assistant-components/lib/contents/index.js");
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages */ "../../lib/assistant-components/lib/pages/index.js");







/***/ }),

/***/ "../../lib/assistant-components/lib/pages/SettingsPage.js":
/*!****************************************************************!*\
  !*** ../../lib/assistant-components/lib/pages/SettingsPage.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPage: () => (/* binding */ SettingsPage),
/* harmony export */   settingAddCodeToNotebookTitles: () => (/* binding */ settingAddCodeToNotebookTitles),
/* harmony export */   styleOfSettingsPage: () => (/* binding */ styleOfSettingsPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base-elements */ "../../lib/assistant-components/lib/base-elements/index.js");
/* harmony import */ var _base_elements_Style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base-elements/Style */ "../../lib/assistant-components/lib/base-elements/Style.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons */ "../../lib/assistant-components/lib/icons.js");




/**
 * Style for the settings page.
 * (hierarchy of children styles is fixed automatically)
 * @alpha
 */
const styleOfSettingsPage = `
.anaconda-assistant-settings-page {
  border-bottom: 1px solid rgba(85, 85, 85, 0.05);
  padding: 20px;
  height: -webkit-fill-available;
  overflow-y: scroll;
}

.anaconda-assistant-settings-page-logout-control-title,
.anaconda-assistant-settings-page-data-collection-control-title,
.anaconda-assistant-settings-page-run-code-control-title,
.anaconda-assistant-settings-page-upgrade-control-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}

.anaconda-assistant-settings-page-logout-control-container,
.anaconda-assistant-settings-page-data-collection-control-container,
.anaconda-assistant-settings-page-run-code-control-container,
.anaconda-assistant-settings-page-upgrade-control-container {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
  font-size: 13px;
  margin: 20px 0;
}

.anaconda-assistant-settings-page-logout-control-container-description,
.anaconda-assistant-settings-page-upgrade-control-container-description {
    max-width: 100%;
}

.anaconda-assistant-settings-page-logout-control-container-action-logout-button {
  color: #444;
  align-items: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-style: normal;
  justify-content: center;
  padding: 8px;
}

.anaconda-assistant-settings-page-data-collection-control-container-description,
.anaconda-assistant-settings-page-run-code-control-container-description {
  max-width: 77%;
}

.anaconda-assistant-settings-page-run-code-control-container-description a {
  color: #6c5af6;
  text-decoration: underline;
}

.anaconda-assistant-settings-page-logout-control-container,
.anaconda-assistant-settings-page-data-collection-control-container,
.anaconda-assistant-settings-page-run-code-control-container {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
  font-size: 13px;
  margin: 20px 0;
}

.anaconda-assistant-settings-page-upgrade-control-container-description {
  flex-grow: 1;
}

.anaconda-assistant-settings-page-upgrade-control-container-description svg {
  width: 12px;
  margin-right: 4px;
  display: inline-block;
}

.anaconda-assistant-settings-page-upgrade-control-container-description-upgrade-button {
  align-items: center;
  background: #4fab4f;
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-style: normal;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: 20px;
  padding: 8px;
}

.anaconda-assistant-settings-page-upgrade-control-container-description-upgrade-button:hover {
  background: #0cca4a;
  color: #06262d;
}

.anaconda-assistant-settings-page-upgrade-control-container-description a {
  color: #6c5af6;
  text-decoration: underline;
}
`;
/**
 * Titles of where to add code to the notebook.
 * @alpha
 */
const settingAddCodeToNotebookTitles = {
    'below-active-cell': 'Below active cell',
    'at-end-of-notebook': 'At end of the notebook',
    'in-place': 'In the active cell'
};
/**
 * Settings page
 * @alpha
 */
function SettingsPage(props) {
    const { showLogout, enableDataCollection, setEnableDataCollection, addCodeToNotebook, setAddCodeToNotebook, isProTier, isStarterTier, isCloudNotebooks } = props;
    const logoutProps = showLogout ? showLogout() : null;
    const upgradeURL = 'https://anaconda.cloud/pricing';
    let accountTierTitle = 'Free';
    let clientVersionTypeWording = 'In the local version';
    let messagesAllowedWording = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        "30 responses for free, and will need to",
        ' ',
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { "data-testid": "upgrade-link", href: "https://anaconda.cloud/pricing", target: "_blank" }, "upgrade"),
        ' ',
        "to continue using the Assistant"));
    if (isCloudNotebooks) {
        clientVersionTypeWording = 'In the cloud version';
        messagesAllowedWording =
            '60 responses per day the first week, then 30 responses per day afterwards';
    }
    let maxTokens = 4096;
    if (isProTier) {
        accountTierTitle = 'Pro';
        messagesAllowedWording = '120 responses per day';
        maxTokens = 16384;
    }
    else if (isStarterTier) {
        accountTierTitle = 'Starter';
        messagesAllowedWording = '60 responses per day';
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "settings-page" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Style__WEBPACK_IMPORTED_MODULE_2__.Style, { asChildName: "style" }, styleOfSettingsPage),
        showLogout && logoutProps ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "logout-control" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "title" }, "Logout"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "description" },
                    "You're currently logged in as: ",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("b", null, logoutProps.accountUserEmail),
                    "."),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "action" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Button, { asChildName: "logout-button", onClick: () => logoutProps.logout() }, "Logout"))))) : null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "data-collection-control" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "title" }, "Data collection and usage"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "action" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "checkbox", checked: enableDataCollection, onChange: event => setEnableDataCollection(event.target.checked) })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "description" }, "Enable data and usage collection by Anaconda, including chat messages. This setting only affects the data Anaconda stores. It does not affect the data that is sent to OpenAI."))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "run-code-control" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "title" }, "Run code in Notebook"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "action" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", { "data-testid": "select", value: addCodeToNotebook, onChange: event => {
                            setAddCodeToNotebook(event.target.value);
                        } }, Object.entries(settingAddCodeToNotebookTitles).map(([key, value]) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { "data-testid": "select-option", key: key, value: key }, value))))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "description" }, "When you run code in the Assistant, the code first gets added to your notebook before it is executed. You can choose where the code gets added here."))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "upgrade-control" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "title" }, "Account tier limits"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "description" },
                    "Your account tier is ",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("b", null, accountTierTitle),
                    ".",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { "data-testid": "client-version-type" }, clientVersionTypeWording),
                    " of the Anaconda Assistant, you can receive",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { "data-testid": "messages-allowed" }, messagesAllowedWording),
                    ".",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { "data-testid": "context-limit" },
                        "Your current context limit is ",
                        maxTokens || 4096,
                        " tokens."),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                    "If you reach this limit during one of your chats, press the \"",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_3__.Icons.RotateRight, null),
                    ' ',
                    "Restart\" button at the bottom to restart the conversation and reset the context length.",
                    isProTier ? null : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                        "Visit our",
                        ' ',
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { "data-testid": "pricing-link", href: "https://anaconda.cloud/pricing", target: "_blank", rel: "noopener noreferrer" }, "pricing page"),
                        ' ',
                        "to upgrade to a higher tier to increase the number of daily responses allowed or to use a model with a larger context-window.",
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Button, { "data-testid": "upgrade-button", asChildName: "upgrade-button", onClick: () => {
                                window.open(upgradeURL);
                            } },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "upgrade-icon" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_3__.Icons.Sparkle, null)),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "text" }, "Upgrade")))))))));
}


/***/ }),

/***/ "../../lib/assistant-components/lib/pages/TermsAndConditionsPage.js":
/*!**************************************************************************!*\
  !*** ../../lib/assistant-components/lib/pages/TermsAndConditionsPage.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TermsAndConditionsPage: () => (/* binding */ TermsAndConditionsPage),
/* harmony export */   styleOfTermsAndConditionsPage: () => (/* binding */ styleOfTermsAndConditionsPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base-elements */ "../../lib/assistant-components/lib/base-elements/index.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons */ "../../lib/assistant-components/lib/icons.js");
/* harmony import */ var _contents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contents */ "../../lib/assistant-components/lib/contents/index.js");
/* harmony import */ var _AssistantComponentContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AssistantComponentContext */ "../../lib/assistant-components/lib/AssistantComponentContext.js");
/* harmony import */ var _base_elements_Style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../base-elements/Style */ "../../lib/assistant-components/lib/base-elements/Style.js");
/* harmony import */ var _pageChildFixer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pageChildFixer */ "../../lib/assistant-components/lib/pages/pageChildFixer.js");







/**
 * Style for the page for the terms and conditions.
 * (hierarchy of children styles is fixed automatically)
 * @alpha
 */
const styleOfTermsAndConditionsPage = `
.anaconda-assistant-terms-page {
  background: white;
  border-radius: 4px;
  color: #212121;
  display: flex;
  flex-direction: column;
  font-family: SF Pro, Tahoma, sans-serif;
  height: 100%;
  overflow: auto;
  width: 100%;
}

.anaconda-assistant-terms-page-branding {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 70px;
  padding-left: 20px;
  padding-right: 20px;
}

.anaconda-assistant-terms-page-branding-content {
  font-family: 'Inter', sans-serif;
  margin-bottom: 24px;
}

.anaconda-assistant-terms-page-branding-content h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0;
}

.anaconda-assistant-terms-page-branding-icon {
  color: #31a824;
  width: 80px;
}

.anaconda-assistant-terms-page-branding-content-version {
  color: #bdbdbd;
  font-size: 11px;
  margin-bottom: 10px;
}
`;
/**
 * Page for the terms and conditions.
 * @alpha
 */
function TermsAndConditionsPage(props) {
    const { clientVersion, accept, enableDataCollection, setEnableDataCollection, olderThan13, setOlderThan13 } = props;
    const { replaceChildren } = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(_AssistantComponentContext__WEBPACK_IMPORTED_MODULE_4__.AssistantComponentContext);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "terms-page" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements_Style__WEBPACK_IMPORTED_MODULE_5__.Style, { asChildName: "style" }, styleOfTermsAndConditionsPage),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "branding" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_2__.Icons.ChatBot, null)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "content" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Anaconda Assistant"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_base_elements__WEBPACK_IMPORTED_MODULE_1__.Div, { asChildName: "version" }, clientVersion),
                "The Anaconda Assistant is an AI-powered chat application designed to enhance the productivity of data scientists, developers, and researchers.")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AssistantComponentContext__WEBPACK_IMPORTED_MODULE_4__.AssistantComponentContext.Provider, { value: (0,_pageChildFixer__WEBPACK_IMPORTED_MODULE_6__.pageChildFixer)({
                parentName: 'terms-page',
                childName: 'terms',
                childrenStyle: _contents__WEBPACK_IMPORTED_MODULE_3__.styleOfTermsAndConditions,
                replaceChildren
            }) },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_contents__WEBPACK_IMPORTED_MODULE_3__.TermsAndConditions, { accept: accept, enableDataCollection: enableDataCollection, setEnableDataCollection: setEnableDataCollection, olderThan13: olderThan13, setOlderThan13: setOlderThan13 }))));
}


/***/ }),

/***/ "../../lib/assistant-components/lib/pages/index.js":
/*!*********************************************************!*\
  !*** ../../lib/assistant-components/lib/pages/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPage: () => (/* reexport safe */ _SettingsPage__WEBPACK_IMPORTED_MODULE_1__.SettingsPage),
/* harmony export */   TermsAndConditionsPage: () => (/* reexport safe */ _TermsAndConditionsPage__WEBPACK_IMPORTED_MODULE_0__.TermsAndConditionsPage),
/* harmony export */   settingAddCodeToNotebookTitles: () => (/* reexport safe */ _SettingsPage__WEBPACK_IMPORTED_MODULE_1__.settingAddCodeToNotebookTitles),
/* harmony export */   styleOfSettingsPage: () => (/* reexport safe */ _SettingsPage__WEBPACK_IMPORTED_MODULE_1__.styleOfSettingsPage),
/* harmony export */   styleOfTermsAndConditionsPage: () => (/* reexport safe */ _TermsAndConditionsPage__WEBPACK_IMPORTED_MODULE_0__.styleOfTermsAndConditionsPage)
/* harmony export */ });
/* harmony import */ var _TermsAndConditionsPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TermsAndConditionsPage */ "../../lib/assistant-components/lib/pages/TermsAndConditionsPage.js");
/* harmony import */ var _SettingsPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingsPage */ "../../lib/assistant-components/lib/pages/SettingsPage.js");




/***/ }),

/***/ "../../lib/assistant-components/lib/pages/pageChildFixer.js":
/*!******************************************************************!*\
  !*** ../../lib/assistant-components/lib/pages/pageChildFixer.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pageChildFixer: () => (/* binding */ pageChildFixer)
/* harmony export */ });
/* harmony import */ var _style_styleUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/styleUtils */ "../../lib/assistant-components/lib/style/styleUtils.js");

/**
 * Creates the properties for AssistantComponentContext
 * in a way that fixes the hierarchy of the children and the styles.
 * @alpha
 */
function pageChildFixer(params) {
    const { parentName, childName, childrenStyle, replaceChildren } = params;
    return {
        parentClassName: parentName,
        replaceChildren: (childClassName) => {
            let styleFixer = () => null;
            if (childrenStyle) {
                styleFixer = (0,_style_styleUtils__WEBPACK_IMPORTED_MODULE_0__.fixStyleHierarchy)(parentName, childName, childrenStyle);
            }
            return replaceChildren?.(childClassName) || styleFixer(childClassName) || null;
        }
    };
}


/***/ }),

/***/ "../../lib/assistant-components/lib/style/styleUtils.js":
/*!**************************************************************!*\
  !*** ../../lib/assistant-components/lib/style/styleUtils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixStyleHierarchy: () => (/* binding */ fixStyleHierarchy),
/* harmony export */   rootClassName: () => (/* binding */ rootClassName)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const rootClassName = 'anaconda-assistant';
/**
 * Fix the style hierarchy for a child component.
 * @internal
 */
function fixStyleHierarchy(parentName, childName, childStyle) {
    const expectedChildName = `${rootClassName}-${parentName}-${childName}-style`.replace('style-style', 'style');
    return function innerFixStyleHierarchy(asChildName) {
        // If ends in `-style`, replace style to match parent's hierarchy
        if (asChildName === expectedChildName) {
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", { className: asChildName }, childStyle.replaceAll(`${rootClassName}-${childName}`, `${rootClassName}-${parentName}-${childName}`)));
        }
        return null;
    };
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/accessToken.js":
/*!**************************************************!*\
  !*** ../../lib/assistant-sdk/lib/accessToken.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnacondaAssistantAccessTokenManager: () => (/* binding */ AnacondaAssistantAccessTokenManager)
/* harmony export */ });
/**
 * Access token management
 * @alpha
 */
class AnacondaAssistantAccessTokenManager {
    constructor(opts) {
        this._accessToken = null;
        this._accessTokenExpiresAt = null;
        this._accessToken = opts.accessToken || null;
        this._accessTokenExpiresAt = opts.expiresAt || null;
    }
    setAccessToken(accessToken) {
        this._accessToken = accessToken.accessToken;
        this._accessTokenExpiresAt = accessToken.expiresAt || null;
    }
    ensureValidAccessToken() {
        if (this._accessToken === null) {
            throw new Error('No access token set');
        }
        if (this._accessTokenExpiresAt === null) {
            throw new Error('No access token expiration set');
        }
        if (this._accessTokenExpiresAt < Date.now()) {
            throw new Error('Access token expired');
        }
    }
    getAccessToken() {
        this.ensureValidAccessToken();
        return {
            accessToken: this._accessToken,
            expiresAt: this._accessTokenExpiresAt
        };
    }
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/assistant.js":
/*!************************************************!*\
  !*** ../../lib/assistant-sdk/lib/assistant.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnacondaAssistant: () => (/* binding */ AnacondaAssistant),
/* harmony export */   SDK_VERSION: () => (/* binding */ SDK_VERSION)
/* harmony export */ });
/* harmony import */ var _accessToken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accessToken */ "../../lib/assistant-sdk/lib/accessToken.js");
/* harmony import */ var _environmentTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environmentTypes */ "../../lib/assistant-sdk/lib/environmentTypes.js");
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http */ "../../lib/assistant-sdk/lib/http.js");
/* harmony import */ var _methods_fetchAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/fetchAccess */ "../../lib/assistant-sdk/lib/methods/fetchAccess.js");
/* harmony import */ var _methods_fetchSuggestions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./methods/fetchSuggestions */ "../../lib/assistant-sdk/lib/methods/fetchSuggestions.js");
/* harmony import */ var _methods_fetchTermsAndConditions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./methods/fetchTermsAndConditions */ "../../lib/assistant-sdk/lib/methods/fetchTermsAndConditions.js");
/* harmony import */ var _methods_streamResponse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./methods/streamResponse */ "../../lib/assistant-sdk/lib/methods/streamResponse.js");
/* harmony import */ var _methods_submitCodeExecutionResult__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./methods/submitCodeExecutionResult */ "../../lib/assistant-sdk/lib/methods/submitCodeExecutionResult.js");
/* harmony import */ var _methods_submitFeedback__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./methods/submitFeedback */ "../../lib/assistant-sdk/lib/methods/submitFeedback.js");
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");
/* harmony import */ var _transformations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./transformations */ "../../lib/assistant-sdk/lib/transformations.js");
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./validators */ "../../lib/assistant-sdk/lib/validators.js");












const SDK_VERSION = '0.0.1';
/**
 * Anaconda Assistant SDK
 * @alpha
 */
class AnacondaAssistant {
    constructor(opts) {
        this.sdkVersion = SDK_VERSION;
        this._transformHeaders = headers => headers;
        const apiUrl = opts.apiUrl || _publicTypes__WEBPACK_IMPORTED_MODULE_9__.ANACONDA_ASSISTANT_PRODUCTION_API_URL;
        (0,_validators__WEBPACK_IMPORTED_MODULE_11__.validateAPIUrl)(apiUrl);
        this.apiUrl = apiUrl;
        this.clientVersion = opts.clientVersion;
        this._enableDataCollection = opts.enableDataCollection || false;
        this.accessToken = new _accessToken__WEBPACK_IMPORTED_MODULE_0__.AnacondaAssistantAccessTokenManager({
            accessToken: opts.authorization?.accessToken || '',
            expiresAt: opts.authorization?.expiresAt || 0
        });
        this.environmentTypes = new _environmentTypes__WEBPACK_IMPORTED_MODULE_1__.AssistantEnvironmentTypes(opts.environmentType);
        this._http = new _http__WEBPACK_IMPORTED_MODULE_2__.AnacondaAssistantHTTPClient({
            apiUrl: this.apiUrl,
            getHeaders: this.makeHeaders.bind(this)
        });
    }
    enableDataCollection() {
        this._enableDataCollection = true;
    }
    disableDataCollection() {
        this._enableDataCollection = false;
    }
    setTransformHeaders(transformHeaders) {
        this._transformHeaders = transformHeaders;
    }
    makeHeaders() {
        return this._transformHeaders({
            'X-Client-Version': this.clientVersion,
            'X-SDK-Version': SDK_VERSION,
            'Content-Type': 'application/json',
            'X-Client-Source': this.environmentTypes.getClientSource(),
            Authorization: `Bearer ${this.accessToken.getAccessToken()?.accessToken}`
        });
    }
    async fetchAccess() {
        return (0,_methods_fetchAccess__WEBPACK_IMPORTED_MODULE_3__.fetchAccess)({
            http: this._http
        });
    }
    async fetchTermsAndConditionsVersion() {
        return (0,_methods_fetchTermsAndConditions__WEBPACK_IMPORTED_MODULE_5__.fetchTermsAndConditionsVersion)({
            http: this._http
        });
    }
    async submitFeedback(request, options) {
        return (0,_methods_submitFeedback__WEBPACK_IMPORTED_MODULE_8__.submitFeedback)({
            version: options?.version || 'v2',
            http: this._http,
            request: (0,_transformations__WEBPACK_IMPORTED_MODULE_10__.transformSubmitFeedbackRequest)(request, this._enableDataCollection)
        });
    }
    async *streamResponse(request, options) {
        const stream = (0,_methods_streamResponse__WEBPACK_IMPORTED_MODULE_6__.streamResponse)({
            version: options?.version || 'v3',
            http: this._http,
            request: (0,_transformations__WEBPACK_IMPORTED_MODULE_10__.transformCompletionRequest)(request, this._enableDataCollection),
            abortController: options?.abortController
        });
        for await (const response of stream) {
            yield response;
        }
    }
    async fetchSuggestions(request, options) {
        const suggestions = await (0,_methods_fetchSuggestions__WEBPACK_IMPORTED_MODULE_4__.fetchSuggestions)({
            version: options?.version || 'v2',
            http: this._http,
            request: (0,_transformations__WEBPACK_IMPORTED_MODULE_10__.transformFetchSuggestionsRequest)(request, this._enableDataCollection),
            abortController: options?.abortController
        });
        return suggestions.map(suggestion => suggestion.text);
    }
    async submitCodeExecutionResult(request, options) {
        return (0,_methods_submitCodeExecutionResult__WEBPACK_IMPORTED_MODULE_7__.submitCodeExecutionResult)({
            version: options?.version || 'v2',
            http: this._http,
            request: (0,_transformations__WEBPACK_IMPORTED_MODULE_10__.transformSubmitCodeExecutionRequest)(request, this._enableDataCollection),
            abortController: options?.abortController
        });
    }
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/environmentTypes.js":
/*!*******************************************************!*\
  !*** ../../lib/assistant-sdk/lib/environmentTypes.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantEnvironmentTypes: () => (/* binding */ AssistantEnvironmentTypes)
/* harmony export */ });
/**
 * Anaconda Assistant Environment Types
 * @alpha
 */
class AssistantEnvironmentTypes {
    constructor(_environmentType) {
        this._environmentType = _environmentType;
    }
    isLocalDev() {
        return this._environmentType === 'local-dev';
    }
    isLocalNotebooks() {
        return this._environmentType === 'local-notebooks-prod' || this.isLocalNotebooksDev();
    }
    isLocalNotebooksDev() {
        return this._environmentType === 'local-notebooks-dev';
    }
    isCloudNotebooks() {
        return this._environmentType === 'cloud-notebooks-prod';
    }
    isEnterpriseNotebooksDev() {
        return this._environmentType === 'enterprise-notebooks-dev';
    }
    isEnterpriseNotebooks() {
        return this._environmentType === 'enterprise-notebooks-prod' || this.isEnterpriseNotebooksDev();
    }
    getClientSource() {
        if (this.isLocalDev())
            return 'anaconda-local-dev';
        if (this.isCloudNotebooks())
            return 'anaconda-cloud-notebooks-prod';
        if (this.isLocalNotebooksDev())
            return 'anaconda-local-notebooks-dev';
        if (this.isLocalNotebooks())
            return 'anaconda-local-notebooks-prod';
        if (this.isEnterpriseNotebooksDev())
            return 'anaconda-enterprise-notebooks-dev';
        if (this.isEnterpriseNotebooks())
            return 'anaconda-enterprise-notebooks-prod';
        throw new Error('Unknown environment type');
    }
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/http.js":
/*!*******************************************!*\
  !*** ../../lib/assistant-sdk/lib/http.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnacondaAssistantHTTPClient: () => (/* binding */ AnacondaAssistantHTTPClient),
/* harmony export */   matchesKnownError: () => (/* binding */ matchesKnownError)
/* harmony export */ });
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");

/**
 * Anaconda Assistant HTTP Client
 * @alpha
 */
class AnacondaAssistantHTTPClient {
    constructor(opts) {
        this._apiUrl = opts.apiUrl;
        this._getHeaders = opts.getHeaders;
    }
    async fetchSafely(options) {
        const { path, body, method, abortController } = options;
        const headers = this._getHeaders();
        const request = new Request(`${this._apiUrl}${path}`, {
            method,
            headers,
            body,
            signal: abortController?.signal
        });
        try {
            const response = await fetch(request);
            if (response.status > 299) {
                const text = await response.text();
                if (matchesKnownError(text)) {
                    throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIServerError(text, { request, response });
                }
                throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIServerError('There was an issue connecting to the Assistant server. Please try again.', { request, response });
            }
            return { request, response };
        }
        catch (e) {
            if (e.name === _publicTypes__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_API_SERVER_ERROR_NAME) {
                throw e;
            }
            throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPINetworkError('There was an issue connecting to the Assistant server. Please try again.', { request });
        }
    }
}
function matchesKnownError(text) {
    if (text.includes('Too many requests') || text.includes('maximum context length')) {
        return true;
    }
    return false;
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/index.js":
/*!********************************************!*\
  !*** ../../lib/assistant-sdk/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANACONDA_ASSISTANT_PRODUCTION_API_URL: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ANACONDA_ASSISTANT_PRODUCTION_API_URL),
/* harmony export */   ANACONDA_ASSISTANT_SUPPORTED_API_URLS: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ANACONDA_ASSISTANT_SUPPORTED_API_URLS),
/* harmony export */   ASSISTANT_API_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_API_ERROR_NAME),
/* harmony export */   ASSISTANT_API_INVALID_RESPONSE_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_API_INVALID_RESPONSE_ERROR_NAME),
/* harmony export */   ASSISTANT_API_NETWORK_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_API_NETWORK_ERROR_NAME),
/* harmony export */   ASSISTANT_API_SERVER_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_API_SERVER_ERROR_NAME),
/* harmony export */   ASSISTANT_API_UNKNOWN_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_API_UNKNOWN_ERROR_NAME),
/* harmony export */   ASSISTANT_ENVIRONMENT_TYPES: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_ENVIRONMENT_TYPES),
/* harmony export */   ASSISTANT_SDK_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_SDK_ERROR_NAME),
/* harmony export */   ASSISTANT_SDK_INVALID_API_URL_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_SDK_INVALID_API_URL_ERROR_NAME),
/* harmony export */   ASSISTANT_SDK_INVALID_VERSION_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_SDK_INVALID_VERSION_ERROR_NAME),
/* harmony export */   ASSISTANT_SDK_UNKNOWN_ERROR_NAME: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_SDK_UNKNOWN_ERROR_NAME),
/* harmony export */   ASSISTANT_SUGGESTION_TYPES: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.ASSISTANT_SUGGESTION_TYPES),
/* harmony export */   AnacondaAssistant: () => (/* reexport safe */ _assistant__WEBPACK_IMPORTED_MODULE_3__.AnacondaAssistant),
/* harmony export */   AnacondaAssistantAccessToken: () => (/* reexport safe */ _accessToken__WEBPACK_IMPORTED_MODULE_0__.AnacondaAssistantAccessTokenManager),
/* harmony export */   AnacondaAssistantHTTPClient: () => (/* reexport safe */ _http__WEBPACK_IMPORTED_MODULE_2__.AnacondaAssistantHTTPClient),
/* harmony export */   AssistantAPIErrorBase: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantAPIErrorBase),
/* harmony export */   AssistantAPIInvalidResponseError: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantAPIInvalidResponseError),
/* harmony export */   AssistantAPINetworkError: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantAPINetworkError),
/* harmony export */   AssistantAPIServerError: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantAPIServerError),
/* harmony export */   AssistantAPIUnknownError: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantAPIUnknownError),
/* harmony export */   AssistantContexts: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantContexts),
/* harmony export */   AssistantEnvironmentTypes: () => (/* reexport safe */ _environmentTypes__WEBPACK_IMPORTED_MODULE_1__.AssistantEnvironmentTypes),
/* harmony export */   AssistantSDKErrorBase: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantSDKErrorBase),
/* harmony export */   AssistantSDKInvalidAPIURLError: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantSDKInvalidAPIURLError),
/* harmony export */   AssistantSDKInvalidVersionError: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantSDKInvalidVersionError),
/* harmony export */   AssistantSDKUnknownError: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantSDKUnknownError),
/* harmony export */   AssistantSupportedEndpointVersions: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.AssistantSupportedEndpointVersions),
/* harmony export */   validateVersion: () => (/* reexport safe */ _publicTypes__WEBPACK_IMPORTED_MODULE_4__.validateVersion)
/* harmony export */ });
/* harmony import */ var _accessToken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accessToken */ "../../lib/assistant-sdk/lib/accessToken.js");
/* harmony import */ var _environmentTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environmentTypes */ "../../lib/assistant-sdk/lib/environmentTypes.js");
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http */ "../../lib/assistant-sdk/lib/http.js");
/* harmony import */ var _assistant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assistant */ "../../lib/assistant-sdk/lib/assistant.js");
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");







/***/ }),

/***/ "../../lib/assistant-sdk/lib/methods/fetchAccess.js":
/*!**********************************************************!*\
  !*** ../../lib/assistant-sdk/lib/methods/fetchAccess.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAccess: () => (/* binding */ fetchAccess)
/* harmony export */ });
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");

/**
 * Helps determine whether user has access to Assistant
 * @internal
 */
async function fetchAccess(opts) {
    const { http } = opts;
    const { request, response } = await http.fetchSafely({
        method: 'POST',
        path: '/access'
    });
    // Return false only if access denied due to org being blacklisted
    if (response.status === 403) {
        const data = await response.json();
        const errorCode = data.error.code;
        if (errorCode === 'org_blacklisted')
            return false;
    }
    // Handle other errors. User should not be allowed, if we can't determine
    // if they have access due to their org being blacklisted.
    if (response.status !== 200) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIServerError('Unable to determine if user has access.', {
            request,
            response
        });
    }
    return true;
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/methods/fetchSuggestions.js":
/*!***************************************************************!*\
  !*** ../../lib/assistant-sdk/lib/methods/fetchSuggestions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchSuggestions: () => (/* binding */ fetchSuggestions)
/* harmony export */ });
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");

/**
 * Fetch suggestions
 * @internal
 */
async function fetchSuggestions(opts) {
    const { version, http, request, abortController } = opts;
    (0,_publicTypes__WEBPACK_IMPORTED_MODULE_0__.validateVersion)(version, _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantSupportedEndpointVersions.FETCH_SUGGESTIONS_SUPPORTED_VERSIONS);
    const { request: fetchRequest, response } = await http.fetchSafely({
        method: 'POST',
        path: `/${version}/suggestions`,
        body: JSON.stringify(request),
        abortController
    });
    if (response.status !== 200) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIServerError('Unable to fetch suggestions.', {
            request: fetchRequest,
            response
        });
    }
    let suggestions;
    try {
        suggestions = (await response.json()).suggestions;
    }
    catch (e) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIInvalidResponseError('Unable to parse suggestions response.', {
            request: fetchRequest,
            response
        });
    }
    if (!Array.isArray(suggestions)) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIInvalidResponseError('Received suggestions is not an array.', {
            request: fetchRequest,
            response
        });
    }
    return suggestions;
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/methods/fetchTermsAndConditions.js":
/*!**********************************************************************!*\
  !*** ../../lib/assistant-sdk/lib/methods/fetchTermsAndConditions.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchTermsAndConditionsVersion: () => (/* binding */ fetchTermsAndConditionsVersion)
/* harmony export */ });
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");

/**
 * Reads the last available version of the terms and conditions,
 * which should be used to force the user to accept the new ones if they have changed.
 * @internal
 */
async function fetchTermsAndConditionsVersion(opts) {
    const { http } = opts;
    const { request, response } = await http.fetchSafely({
        path: '/terms-and-conditions-version',
        method: 'GET'
    });
    if (response.status !== 200) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIServerError('Unable to fetch terms and conditions version.', {
            request,
            response
        });
    }
    try {
        const data = await response.json();
        return data.version;
    }
    catch (e) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIInvalidResponseError('Unable to parse terms and conditions version.', {
            request,
            response
        });
    }
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/methods/streamResponse.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant-sdk/lib/methods/streamResponse.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   streamResponse: () => (/* binding */ streamResponse)
/* harmony export */ });
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");
/* harmony import */ var _responseTokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../responseTokens */ "../../lib/assistant-sdk/lib/responseTokens.js");


/**
 * Stream response
 * @internal
 */
async function* streamResponse(opts) {
    const { version, http, request, abortController } = opts;
    (0,_publicTypes__WEBPACK_IMPORTED_MODULE_0__.validateVersion)(version, _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantSupportedEndpointVersions.STREAM_RESPONSE_SUPPORTED_VERSIONS);
    // Similar streamed call as to OpenAI but to https://assistant.anaconda.cloud/v2/completions
    const { request: fetchRequest, response } = await http.fetchSafely({
        method: 'POST',
        path: `/${version}/completions`,
        body: JSON.stringify(request),
        abortController
    });
    if (!response.body) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIInvalidResponseError('Empty stream when parsing response', {
            request: fetchRequest,
            response
        });
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let chunk = '';
    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        chunk = chunk + chunkValue;
        if (!(0,_responseTokens__WEBPACK_IMPORTED_MODULE_1__.containsTokenCount)(chunk)) {
            yield {
                content: chunk
            };
        }
        else {
            const tokens = (0,_responseTokens__WEBPACK_IMPORTED_MODULE_1__.parseTokenCount)(chunk);
            const maxTokens = (0,_responseTokens__WEBPACK_IMPORTED_MODULE_1__.parseMaxTokenCount)(chunk);
            yield {
                content: (0,_responseTokens__WEBPACK_IMPORTED_MODULE_1__.removeTokenCount)(chunk),
                tokens,
                maxTokens
            };
        }
    }
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/methods/submitCodeExecutionResult.js":
/*!************************************************************************!*\
  !*** ../../lib/assistant-sdk/lib/methods/submitCodeExecutionResult.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   submitCodeExecutionResult: () => (/* binding */ submitCodeExecutionResult)
/* harmony export */ });
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");

/**
 * Submit code executed, used to study effectiveness of generated code
 * @internal
 */
async function submitCodeExecutionResult(opts) {
    const { version, http, request, abortController } = opts;
    (0,_publicTypes__WEBPACK_IMPORTED_MODULE_0__.validateVersion)(version, _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantSupportedEndpointVersions.SUBMIT_CODE_EXECUTION_SUPPORTED_VERSIONS);
    const { request: fetchRequest, response } = await http.fetchSafely({
        method: 'POST',
        path: `/v2/execution_result`,
        body: JSON.stringify(request),
        abortController
    });
    if (response.status !== 201) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIServerError('Unable to fetch suggestions.', {
            request: fetchRequest,
            response
        });
    }
    return true;
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/methods/submitFeedback.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant-sdk/lib/methods/submitFeedback.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   submitFeedback: () => (/* binding */ submitFeedback)
/* harmony export */ });
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");

/**
 * Post feedback
 * @internal
 */
async function submitFeedback(opts) {
    const { version, http, request } = opts;
    (0,_publicTypes__WEBPACK_IMPORTED_MODULE_0__.validateVersion)(version, _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantSupportedEndpointVersions.SUBMIT_FEEDBACK_SUPPORTED_VERSIONS);
    const { request: fetchRequest, response } = await http.fetchSafely({
        method: 'POST',
        path: `/${version}/feedback`,
        body: JSON.stringify(request)
    });
    if (response.status !== 201) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantAPIServerError('Unable to post feedback', {
            request: fetchRequest,
            response
        });
    }
    return true;
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/publicTypes.js":
/*!**************************************************!*\
  !*** ../../lib/assistant-sdk/lib/publicTypes.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANACONDA_ASSISTANT_PRODUCTION_API_URL: () => (/* binding */ ANACONDA_ASSISTANT_PRODUCTION_API_URL),
/* harmony export */   ANACONDA_ASSISTANT_SUPPORTED_API_URLS: () => (/* binding */ ANACONDA_ASSISTANT_SUPPORTED_API_URLS),
/* harmony export */   ASSISTANT_API_ERROR_NAME: () => (/* binding */ ASSISTANT_API_ERROR_NAME),
/* harmony export */   ASSISTANT_API_INVALID_RESPONSE_ERROR_NAME: () => (/* binding */ ASSISTANT_API_INVALID_RESPONSE_ERROR_NAME),
/* harmony export */   ASSISTANT_API_NETWORK_ERROR_NAME: () => (/* binding */ ASSISTANT_API_NETWORK_ERROR_NAME),
/* harmony export */   ASSISTANT_API_SERVER_ERROR_NAME: () => (/* binding */ ASSISTANT_API_SERVER_ERROR_NAME),
/* harmony export */   ASSISTANT_API_UNKNOWN_ERROR_NAME: () => (/* binding */ ASSISTANT_API_UNKNOWN_ERROR_NAME),
/* harmony export */   ASSISTANT_ENVIRONMENT_TYPES: () => (/* binding */ ASSISTANT_ENVIRONMENT_TYPES),
/* harmony export */   ASSISTANT_SDK_ERROR_NAME: () => (/* binding */ ASSISTANT_SDK_ERROR_NAME),
/* harmony export */   ASSISTANT_SDK_INVALID_API_URL_ERROR_NAME: () => (/* binding */ ASSISTANT_SDK_INVALID_API_URL_ERROR_NAME),
/* harmony export */   ASSISTANT_SDK_INVALID_VERSION_ERROR_NAME: () => (/* binding */ ASSISTANT_SDK_INVALID_VERSION_ERROR_NAME),
/* harmony export */   ASSISTANT_SDK_UNKNOWN_ERROR_NAME: () => (/* binding */ ASSISTANT_SDK_UNKNOWN_ERROR_NAME),
/* harmony export */   ASSISTANT_SUGGESTION_TYPES: () => (/* binding */ ASSISTANT_SUGGESTION_TYPES),
/* harmony export */   AssistantAPIErrorBase: () => (/* binding */ AssistantAPIErrorBase),
/* harmony export */   AssistantAPIInvalidResponseError: () => (/* binding */ AssistantAPIInvalidResponseError),
/* harmony export */   AssistantAPINetworkError: () => (/* binding */ AssistantAPINetworkError),
/* harmony export */   AssistantAPIServerError: () => (/* binding */ AssistantAPIServerError),
/* harmony export */   AssistantAPIUnknownError: () => (/* binding */ AssistantAPIUnknownError),
/* harmony export */   AssistantContexts: () => (/* binding */ AssistantContexts),
/* harmony export */   AssistantSDKErrorBase: () => (/* binding */ AssistantSDKErrorBase),
/* harmony export */   AssistantSDKInvalidAPIURLError: () => (/* binding */ AssistantSDKInvalidAPIURLError),
/* harmony export */   AssistantSDKInvalidVersionError: () => (/* binding */ AssistantSDKInvalidVersionError),
/* harmony export */   AssistantSDKUnknownError: () => (/* binding */ AssistantSDKUnknownError),
/* harmony export */   AssistantSupportedEndpointVersions: () => (/* binding */ AssistantSupportedEndpointVersions),
/* harmony export */   validateVersion: () => (/* binding */ validateVersion)
/* harmony export */ });
/**
 * Anaconda Assistant SDK supported API URLs
 * @alpha
 */
const ANACONDA_ASSISTANT_SUPPORTED_API_URLS = [
    'https://jupyterassistant.anacondaconnect.com',
    'https://assistant.anaconda.cloud',
    'http://localhost:8000'
];
/**
 * Anaconda Assistant SDK production API URL
 * @alpha
 */
const ANACONDA_ASSISTANT_PRODUCTION_API_URL = 'https://assistant.anaconda.cloud';
/**
 * Anaconda Assistant SDK supported API endpoint versions
 * @alpha
 */
var AssistantSupportedEndpointVersions;
(function (AssistantSupportedEndpointVersions) {
    AssistantSupportedEndpointVersions.STREAM_RESPONSE_SUPPORTED_VERSIONS = ['v3'];
    AssistantSupportedEndpointVersions.FETCH_SUGGESTIONS_SUPPORTED_VERSIONS = ['v2'];
    AssistantSupportedEndpointVersions.SUBMIT_FEEDBACK_SUPPORTED_VERSIONS = ['v2'];
    AssistantSupportedEndpointVersions.SUBMIT_CODE_EXECUTION_SUPPORTED_VERSIONS = ['v2'];
})(AssistantSupportedEndpointVersions || (AssistantSupportedEndpointVersions = {}));
/**
 * Environment types for the Assistant SDK
 * @alpha
 */
const ASSISTANT_ENVIRONMENT_TYPES = [
    'local-notebooks-dev',
    'local-notebooks-prod',
    'local-dev',
    'cloud-notebooks-prod',
    'enterprise-notebooks-dev',
    'enterprise-notebooks-prod'
];
/**
 * Assistant contexts
 * @alpha
 */
var AssistantContexts;
(function (AssistantContexts) {
    /**
     * Chat context types
     * @alpha
     */
    AssistantContexts.CHAT_CONTEXT_TYPES = [
        'graph-dataframe',
        'describe-dataframe',
        'explain-code',
        'comment-code',
        'improve-code',
        'debug-error',
        'default-python',
        'suggestions-chat'
    ];
})(AssistantContexts || (AssistantContexts = {}));
/**
 * Assistant suggestions can be of any of these types
 * @alpha
 */
const ASSISTANT_SUGGESTION_TYPES = [
    'dataframe-suggestions',
    'data-cleaning-suggestions'
];
/**
 * Assistant API base error name
 * @alpha
 */
const ASSISTANT_API_ERROR_NAME = 'ASSISTANT_API_ERROR';
/**
 * Assistant API error
 * @alpha
 */
class AssistantAPIErrorBase extends Error {
    constructor(message, options) {
        super(message);
        this.name = ASSISTANT_API_ERROR_NAME;
        this.request = options.request;
        this.response = options.response;
    }
    toString() {
        let statusText = `failed to fetch ${this.request.url}`;
        if (this.response) {
            statusText = `(status: ${this.response.status})`;
        }
        return `[${this.name}] ${this.message} ${statusText}`;
    }
}
/**
 * AssistantAPINetworkError name
 * @alpha
 */
const ASSISTANT_API_NETWORK_ERROR_NAME = 'ASSISTANT_API_NETWORK_ERROR';
/**
 * Assistant API network error
 * @alpha
 */
class AssistantAPINetworkError extends AssistantAPIErrorBase {
    constructor() {
        super(...arguments);
        this.name = ASSISTANT_API_NETWORK_ERROR_NAME;
    }
}
/**
 * AssistantAPIServerError name
 * @alpha
 */
const ASSISTANT_API_SERVER_ERROR_NAME = 'ASSISTANT_API_SERVER_ERROR';
/**
 * Assistant API server error
 * @alpha
 */
class AssistantAPIServerError extends AssistantAPIErrorBase {
    constructor() {
        super(...arguments);
        this.name = ASSISTANT_API_SERVER_ERROR_NAME;
    }
}
/**
 * Assistant API invalid response error name
 * @alpha
 */
const ASSISTANT_API_INVALID_RESPONSE_ERROR_NAME = 'ASSISTANT_API_INVALID_RESPONSE_ERROR';
/**
 * Assistant API invalid response error
 * @alpha
 */
class AssistantAPIInvalidResponseError extends AssistantAPIErrorBase {
    constructor() {
        super(...arguments);
        this.name = ASSISTANT_API_INVALID_RESPONSE_ERROR_NAME;
    }
}
/**
 * Assistant API unknown error name
 * @alpha
 */
const ASSISTANT_API_UNKNOWN_ERROR_NAME = 'ASSISTANT_API_UNKNOWN_ERROR';
/**
 * Assistant API unknown error
 * @alpha
 */
class AssistantAPIUnknownError extends AssistantAPIErrorBase {
    constructor() {
        super(...arguments);
        this.name = ASSISTANT_API_UNKNOWN_ERROR_NAME;
    }
}
/**
 * Assistant SDK error name
 * @alpha
 */
const ASSISTANT_SDK_ERROR_NAME = 'ASSISTANT_SDK_ERROR';
/**
 * Assistant SDK error
 * @alpha
 */
class AssistantSDKErrorBase extends Error {
    constructor(message) {
        super(message);
        this.name = ASSISTANT_SDK_ERROR_NAME;
    }
    toString() {
        return `[${this.name}] ${this.message}`;
    }
}
/**
 * Assistant SDK error for invalid version name
 * @alpha
 */
const ASSISTANT_SDK_INVALID_VERSION_ERROR_NAME = 'ASSISTANT_SDK_INVALID_VERSION_ERROR';
/**
 * Assistant SDK error for invalid version
 * @alpha
 */
class AssistantSDKInvalidVersionError extends AssistantSDKErrorBase {
    constructor() {
        super(...arguments);
        this.name = ASSISTANT_SDK_INVALID_VERSION_ERROR_NAME;
    }
}
/**
 * Validate version
 * @alpha
 */
function validateVersion(version, supportedVersions) {
    if (!supportedVersions.includes(version)) {
        throw new AssistantSDKInvalidVersionError(`Invalid version: ${version}. Supported versions: ${supportedVersions.join(', ')}`);
    }
}
/**
 * Assistant SDK error for invalid API URL name
 * @alpha
 */
const ASSISTANT_SDK_INVALID_API_URL_ERROR_NAME = 'ASSISTANT_SDK_INVALID_API_URL_ERROR';
/**
 * Assistant SDK error for invalid API URL
 * @alpha
 */
class AssistantSDKInvalidAPIURLError extends AssistantSDKErrorBase {
    constructor() {
        super(...arguments);
        this.name = ASSISTANT_SDK_INVALID_API_URL_ERROR_NAME;
    }
}
/**
 * Assistant SDK error for unknown error name
 * @alpha
 */
const ASSISTANT_SDK_UNKNOWN_ERROR_NAME = 'ASSISTANT_SDK_UNKNOWN_ERROR';
/**
 * Assistant SDK error for unknown error
 * @alpha
 */
class AssistantSDKUnknownError extends AssistantSDKErrorBase {
    constructor() {
        super(...arguments);
        this.name = ASSISTANT_SDK_UNKNOWN_ERROR_NAME;
    }
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/responseTokens.js":
/*!*****************************************************!*\
  !*** ../../lib/assistant-sdk/lib/responseTokens.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containsTokenCount: () => (/* binding */ containsTokenCount),
/* harmony export */   parseMaxTokenCount: () => (/* binding */ parseMaxTokenCount),
/* harmony export */   parseTokenCount: () => (/* binding */ parseTokenCount),
/* harmony export */   removeTokenCount: () => (/* binding */ removeTokenCount)
/* harmony export */ });
const tokenCountIndicator = '__TOKENS_';
// Token count is added by the assistant server at the end of its response
const tokenCountRegex = /__TOKENS_([0-9]+)\/([0-9]+)__/ms;
function containsTokenCount(message) {
    return message.includes(tokenCountIndicator);
}
function parseTokenCount(message) {
    const matches = message.match(tokenCountRegex);
    return matches && matches[1] && !isNaN(+matches[1]) ? parseInt(matches[1]) : 0;
}
function parseMaxTokenCount(message) {
    const matches = message.match(tokenCountRegex);
    return matches && matches[2] && !isNaN(+matches[2]) ? parseInt(matches[2]) : 0;
}
function removeTokenCount(message) {
    const index = message.indexOf(tokenCountIndicator);
    return message.slice(0, index === -1 ? message.length : index);
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/transformations.js":
/*!******************************************************!*\
  !*** ../../lib/assistant-sdk/lib/transformations.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformCompletionRequest: () => (/* binding */ transformCompletionRequest),
/* harmony export */   transformContext: () => (/* binding */ transformContext),
/* harmony export */   transformFetchSuggestionsRequest: () => (/* binding */ transformFetchSuggestionsRequest),
/* harmony export */   transformSession: () => (/* binding */ transformSession),
/* harmony export */   transformSubmitCodeExecutionRequest: () => (/* binding */ transformSubmitCodeExecutionRequest),
/* harmony export */   transformSubmitFeedbackRequest: () => (/* binding */ transformSubmitFeedbackRequest),
/* harmony export */   transformVariables: () => (/* binding */ transformVariables)
/* harmony export */ });
/**
 * IMPORTANT: DO NOT ADD SPREAD OPERATORS IN ANY OF THE TRANSFORMERS
 * Spread operators hide properties that are not explicitly defined in the types.
 */
function transformSession(session) {
    return {
        user_id: session.userId,
        session_id: session.sessionId,
        iteration_id: 0
    };
}
/**
 * Extracts the last 2000 characters of each variable value.
 */
function transformContext(context) {
    return {
        type: context.type,
        variables: transformVariables(context.variables)
    };
}
/**
 * Extracts the last 2000 characters of each variable value.
 */
function transformVariables(variables) {
    const transformedVariables = {};
    for (const key in variables) {
        if (variables.hasOwnProperty(key)) {
            const value = variables[key];
            transformedVariables[key] = value.slice(-2000);
        }
    }
    return transformedVariables;
}
function transformSubmitFeedbackRequest(publicRequest, enableDataCollection) {
    return {
        feedback: {
            text: publicRequest.feedback.text,
            sentiment: publicRequest.feedback.sentiment,
            message_id: publicRequest.feedback.messageId
        },
        skip_logging: !enableDataCollection,
        session: transformSession(publicRequest.session)
    };
}
function transformCompletionRequest(publicRequest, enableDataCollection) {
    return {
        skip_logging: !enableDataCollection,
        session: transformSession(publicRequest.session),
        chat_context: transformContext(publicRequest.chatContext),
        response_message_id: publicRequest.responseMessageId,
        messages: publicRequest.messages.map(message => ({
            role: message.role,
            content: message.content,
            message_id: message.messageId
        }))
    };
}
function transformFetchSuggestionsRequest(publicRequest, enableDataCollection) {
    return {
        skip_logging: !enableDataCollection,
        session: transformSession(publicRequest.session),
        type: publicRequest.type,
        variables: transformVariables(publicRequest.variables)
    };
}
function transformSubmitCodeExecutionRequest(publicRequest, enableDataCollection) {
    return {
        skip_logging: !enableDataCollection,
        session: transformSession(publicRequest.session),
        execution_result: {
            code: publicRequest.executionResult.code,
            error: publicRequest.executionResult.error,
            success: publicRequest.executionResult.success,
            message_id: publicRequest.executionResult.messageId
        }
    };
}


/***/ }),

/***/ "../../lib/assistant-sdk/lib/validators.js":
/*!*************************************************!*\
  !*** ../../lib/assistant-sdk/lib/validators.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateAPIUrl: () => (/* binding */ validateAPIUrl)
/* harmony export */ });
/* harmony import */ var _publicTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./publicTypes */ "../../lib/assistant-sdk/lib/publicTypes.js");

function validateAPIUrl(url) {
    const _url = url;
    if (!_url || _publicTypes__WEBPACK_IMPORTED_MODULE_0__.ANACONDA_ASSISTANT_SUPPORTED_API_URLS.indexOf(_url) === -1) {
        throw new _publicTypes__WEBPACK_IMPORTED_MODULE_0__.AssistantSDKInvalidAPIURLError(`Invalid API URL: ${url}`);
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/api/access.js":
/*!*********************************************!*\
  !*** ../../lib/assistant/lib/api/access.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasAccess: () => (/* binding */ hasAccess)
/* harmony export */ });
/* harmony import */ var _utils_nucleus_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/nucleus/auth */ "../../lib/assistant/lib/utils/nucleus/auth.js");
/* harmony import */ var _assistant_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assistant-sdk */ "../../lib/assistant/lib/assistant-sdk.js");


async function hasAccess() {
    try {
        const accessToken = await (0,_utils_nucleus_auth__WEBPACK_IMPORTED_MODULE_0__.getAccessToken)();
        if (!accessToken) {
            throw new Error('No access token');
        }
        const sdk = (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_1__.getAssistantSdk)();
        sdk.accessToken.setAccessToken(accessToken);
        await sdk.fetchAccess();
        return true;
    }
    catch (e) {
        console.log('Error fetching access: ', e);
    }
    return false;
}


/***/ }),

/***/ "../../lib/assistant/lib/api/assistant-request-generator.js":
/*!******************************************************************!*\
  !*** ../../lib/assistant/lib/api/assistant-request-generator.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanSpecialPrefixes: () => (/* binding */ cleanSpecialPrefixes),
/* harmony export */   generateRequest: () => (/* binding */ generateRequest),
/* harmony export */   hasActiveCodeResponse: () => (/* binding */ hasActiveCodeResponse)
/* harmony export */ });
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/specialPrefixes */ "../../lib/assistant/lib/utils/specialPrefixes.js");


function generateRequest(state) {
    const activeChat = (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_0__.getActiveChat)(state);
    const activeNotebook = (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_0__.getActiveNotebook)(state);
    if (!activeNotebook?.activeChatKey ||
        !activeChat ||
        !hasActiveCodeResponse(activeChat.inProgress)) {
        throw new Error('No active request');
    }
    return {
        session: activeChat.session,
        messages: cleanSpecialPrefixes(activeChat.messages),
        chatContext: convertToSDKContext(activeChat.context),
        responseMessageId: activeChat.inProgress.message_id
    };
}
function cleanSpecialPrefixes(messages) {
    const prefixes = [_utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_1__.attachmentMessagePrefix];
    return messages.map(message => {
        const content = prefixes.reduce((acc, prefix) => acc.replace(prefix, ''), message.content);
        return { ...message, content };
    });
}
function hasActiveCodeResponse(active) {
    return active?.type === 'active';
}
function convertToSDKContext(context) {
    const variables = convertVariables(context);
    return { type: context.type, variables };
}
function convertVariables(context) {
    switch (context.type) {
        case 'graph-dataframe':
            return {
                name: context.variables.dataframe.name,
                dtypes_str: context.variables.dataframe.dtypesStr
            };
        case 'describe-dataframe':
            return {
                name: context.variables.dataframe.name,
                dtypes_str: context.variables.dataframe.dtypesStr
            };
        case 'explain-code':
            return {
                active_code_cell: context.variables.active_cell_code,
                selected_code: context.variables.selected_code
            };
        case 'comment-code':
            return {
                active_code_cell: context.variables.active_cell_code,
                selected_code: context.variables.selected_code
            };
        case 'improve-code':
            return {
                active_code_cell: context.variables.active_cell_code,
                selected_code: context.variables.selected_code
            };
        case 'debug-error':
            return context.variables;
        case 'suggestions-chat':
            return context.variables;
        case 'default-python':
            return {};
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/api/feedback.js":
/*!***********************************************!*\
  !*** ../../lib/assistant/lib/api/feedback.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postExecutionResult: () => (/* binding */ postExecutionResult),
/* harmony export */   postFeedback: () => (/* binding */ postFeedback)
/* harmony export */ });
/* harmony import */ var _assistant_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assistant-sdk */ "../../lib/assistant/lib/assistant-sdk.js");

async function postFeedback(request) {
    try {
        return await (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.getAssistantSdk)().submitFeedback(request);
    }
    catch (e) {
        console.error('Error posting feedback: ', e);
    }
}
async function postExecutionResult(executingCode, success, error) {
    try {
        return await (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.getAssistantSdk)().submitCodeExecutionResult(createExecutionResult(executingCode, success, error));
    }
    catch (e) {
        console.error('Error posting feedback: ', e);
    }
}
function createExecutionResult(executingCode, success, error) {
    return {
        session: executingCode.session,
        executionResult: {
            code: executingCode.code,
            success,
            messageId: executingCode.activeMessageId,
            error: error ? { message: error.message, stack: error.stack, name: error.name } : null
        }
    };
}


/***/ }),

/***/ "../../lib/assistant/lib/api/terms-and-conditions-version.js":
/*!*******************************************************************!*\
  !*** ../../lib/assistant/lib/api/terms-and-conditions-version.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchTermsAndConditionsVersion: () => (/* binding */ fetchTermsAndConditionsVersion)
/* harmony export */ });
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/errors */ "../../lib/assistant/lib/utils/errors.js");
/* harmony import */ var _assistant_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assistant-sdk */ "../../lib/assistant/lib/assistant-sdk.js");


async function fetchTermsAndConditionsVersion() {
    try {
        return await (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_1__.getAssistantSdk)().fetchTermsAndConditionsVersion();
    }
    catch (e) {
        throw new _utils_errors__WEBPACK_IMPORTED_MODULE_0__.AssistantError('network_error', 'There was an issue connecting to the Assistant server. Please try again.', 0);
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/assistant-sdk.js":
/*!************************************************!*\
  !*** ../../lib/assistant/lib/assistant-sdk.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAssistantSdk: () => (/* binding */ getAssistantSdk),
/* harmony export */   initAssistantSdk: () => (/* binding */ initAssistantSdk)
/* harmony export */ });
/* harmony import */ var _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @anaconda/assistant-sdk */ "../../lib/assistant-sdk/lib/index.js");
/* harmony import */ var _utils_nucleus_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/nucleus/auth */ "../../lib/assistant/lib/utils/nucleus/auth.js");


let assistantSdk;
function getAssistantSdk() {
    if (!assistantSdk) {
        throw new Error('Assistant not initialized');
    }
    return assistantSdk;
}
async function initAssistantSdk(options) {
    assistantSdk = new _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.AnacondaAssistant(options);
    try {
        const accessToken = await (0,_utils_nucleus_auth__WEBPACK_IMPORTED_MODULE_1__.getAccessToken)();
        if (!accessToken) {
            throw new Error('No access token');
        }
        assistantSdk.accessToken.setAccessToken(accessToken);
    }
    catch (e) {
        console.log('Error fetching access: ', e);
    }
    return assistantSdk;
}


/***/ }),

/***/ "../../lib/assistant/lib/assistant_plugin.js":
/*!***************************************************!*\
  !*** ../../lib/assistant/lib/assistant_plugin.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assistantCellCommand: () => (/* binding */ assistantCellCommand),
/* harmony export */   assistantToggleCommand: () => (/* binding */ assistantToggleCommand),
/* harmony export */   "default": () => (/* binding */ AssistantPlugin)
/* harmony export */ });
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/icon */ "../../lib/assistant/lib/components/icon.js");
/* harmony import */ var _components_assistant_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/assistant-button */ "../../lib/assistant/lib/components/assistant-button.js");
/* harmony import */ var _jupyter_assistantSidebarWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jupyter/assistantSidebarWidget */ "../../lib/assistant/lib/jupyter/assistantSidebarWidget.js");
/* harmony import */ var _jupyter_activateAssistantWithCodeSelection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jupyter/activateAssistantWithCodeSelection */ "../../lib/assistant/lib/jupyter/activateAssistantWithCodeSelection.js");
/* harmony import */ var _jupyter_initializeAssistant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jupyter/initializeAssistant */ "../../lib/assistant/lib/jupyter/initializeAssistant.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./jupyter/extension-load-utils */ "../../lib/assistant/lib/jupyter/extension-load-utils.js");
/* harmony import */ var _assistant_sdk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assistant-sdk */ "../../lib/assistant/lib/assistant-sdk.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./config */ "../../lib/assistant/lib/config.js");
/* harmony import */ var _jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./jupyter/syncStateDebounced */ "../../lib/assistant/lib/jupyter/syncStateDebounced.js");
/* harmony import */ var _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/nucleus/accountUtils */ "../../lib/assistant/lib/utils/nucleus/accountUtils.js");











const assistantToggleCommand = 'assistant:toggle';
const assistantCellCommand = 'assistant:cell';
class AssistantPlugin {
    async activate(app, opts) {
        const { corePlugin, notebookTracker, palette } = opts;
        await _jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_6__.sharedCore.setCore(corePlugin);
        if (!_jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_6__.sharedCore.getFeatureFlagBool('monorepo-assistant')) {
            return;
        }
        // Allowing login to create new notebooks
        (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_10__.shareJupyterFrontEndWithLogin)(app);
        const config = _jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_6__.sharedCore.getCoreReady().config;
        await (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_7__.initAssistantSdk)({
            clientVersion: _config__WEBPACK_IMPORTED_MODULE_8__.CLIENT_VERSION,
            // The API URL might come as null from the shared core
            apiUrl: config.assistant.apiUrl || undefined,
            environmentType: config.assistant.environmentType,
            enableDataCollection: _store_store__WEBPACK_IMPORTED_MODULE_5__.useStore.getState().settings.enableDataCollection
        });
        console.log('Assistant extension activated!');
        // Sync state across different ports / windows
        await (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_9__.syncDiskStateChained)();
        (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_9__.bindSyncDiskStateChained)();
        const assistantSidebarWidget = new _jupyter_assistantSidebarWidget__WEBPACK_IMPORTED_MODULE_2__.AssistantSidebarWidget({
            notebookTracker,
            jupyterFrontEnd: app
        });
        const assistantButton = new _components_assistant_button__WEBPACK_IMPORTED_MODULE_1__.AssistantButton(app.commands);
        (0,_jupyter_initializeAssistant__WEBPACK_IMPORTED_MODULE_4__.initializeAssistant)({ assistant: assistantSidebarWidget, jupyterFrontEnd: app });
        app.commands.addCommand(assistantToggleCommand, {
            label: 'Open Anaconda Assistant',
            execute: () => assistantSidebarWidget.toggleWidget()
        });
        app.contextMenu.addItem({
            command: assistantToggleCommand,
            selector: '.jp-Notebook'
        });
        palette.addItem({ command: assistantToggleCommand, category: 'Assistant' });
        app.docRegistry.addWidgetExtension('Notebook', assistantButton);
        app.commands.addCommand(assistantCellCommand, {
            icon: _components_icon__WEBPACK_IMPORTED_MODULE_0__.AssistantIcon,
            execute: (0,_jupyter_activateAssistantWithCodeSelection__WEBPACK_IMPORTED_MODULE_3__.getActivateAssistantWithCodeSelection)({
                assistant: assistantSidebarWidget,
                notebookTracker
            })
        });
        const accountInterval = setInterval(async () => {
            const state = _store_store__WEBPACK_IMPORTED_MODULE_5__.useStore.getState();
            if (state.account) {
                clearInterval(accountInterval);
                const context = app.shell.currentWidget?.context;
                const factoryName = context?.factoryName;
                const isNotebook = factoryName && factoryName.toLowerCase() === 'notebook';
                if (!isNotebook &&
                    !Boolean(window.localStorage.getItem('anaconda-assistant-opened-once'))) {
                    await app.commands.execute('notebook:create-new');
                    window.localStorage.setItem('anaconda-assistant-opened-once', 'true');
                }
                await state.updateAccount();
            }
        }, 100);
        // Detecting logouts from other tabs
        window.addEventListener('storage', async (e) => {
            try {
                if (e.key === 'anaconda-assistant' && e.oldValue && e.newValue) {
                    const previousStorage = JSON.parse(e.oldValue);
                    const newStorage = JSON.parse(e.newValue);
                    const previousStorageState = previousStorage.state;
                    const newStorageState = newStorage.state;
                    const previousTermsVersion = previousStorage.terms.version;
                    const newTermsVersion = newStorage.terms.version;
                    if (!previousStorageState || !newStorageState) {
                        return;
                    }
                    if (previousTermsVersion !== null && newTermsVersion === null) {
                        await (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_10__.logout)([
                            'An Assistant in another browser tab logged out.',
                            'You will need to log in again to use the Assistant.'
                        ].join(' '));
                    }
                }
            }
            catch (e) {
                console.error('Error detecting logouts from other tabs', e);
            }
        });
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/components/RemoveAfterHide.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant/lib/components/RemoveAfterHide.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoveAfter: () => (/* binding */ RemoveAfter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function doClearTimeout(timeout) {
    if (timeout) {
        clearTimeout(timeout);
    }
}
function RemoveAfter(params) {
    const { delay, show, children } = params;
    // Used to remove elements from the DOM after an animation is done,
    // otherwise they might be visible in certain screens or after resizing the window.
    const [remove, setRemove] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(true);
    // Debounce the removal of the popup, to allow the animation to finish
    const timeoutRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        doClearTimeout(timeoutRef.current);
        if (show) {
            setRemove(false);
        }
        else {
            timeoutRef.current = setTimeout(() => {
                setRemove(true);
            }, delay);
        }
        return () => {
            doClearTimeout(timeoutRef.current);
        };
    }, [show, delay]);
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, remove ? null : children);
}


/***/ }),

/***/ "../../lib/assistant/lib/components/access-screen.js":
/*!***********************************************************!*\
  !*** ../../lib/assistant/lib/components/access-screen.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessScreen: () => (/* binding */ AccessScreen)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "../../lib/assistant/lib/config.js");
/* harmony import */ var _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/nucleus/accountUtils */ "../../lib/assistant/lib/utils/nucleus/accountUtils.js");




function AccessScreen() {
    const contact_url = 'https://www.anaconda.com/contact';
    const learn_url = 'https://www.anaconda.com/blog/anaconda-assistant-launches-to-bring-instant-data-analysis-code-generation-and-insights-to-users';
    function redirectToPage(url) {
        window.location.href = url;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { marginTop: 70 } }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-title-text" },
                "Anaconda Assistant",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-version-text" }, _config__WEBPACK_IMPORTED_MODULE_2__.CLIENT_VERSION)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-access-body-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-access-inner-container" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-access-header" }, "Welcome!"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-access-text" },
                        "Unfortunately, you do not seem to have access to the Anaconda Assistant. This could either occur for an issue with your credentials, or because your organization has not requested for access to the Anaconda Assistant for their users. To gain access, please reach out to your organization administrator or our support team. In the meantime, enjoy exploring the many other features and tools available to you. Thank you for being part of the Anaconda community!",
                        ' ',
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: learn_url, target: "_blank" }, 'Learn About Anaconda Assistant'),
                        '.')),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-access-inner-container-buttons" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "as-access-button", onClick: () => redirectToPage(contact_url) }, "Contact Us"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "as-logout-button", onClick: () => (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_3__.logout)() }, "Logout"))))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/add-context-popup.js":
/*!***************************************************************!*\
  !*** ../../lib/assistant/lib/components/add-context-popup.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddContextPopup: () => (/* binding */ AddContextPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_spring_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-spring/web */ "../../node_modules/@react-spring/web/dist/react-spring_web.modern.mjs");
/* harmony import */ var _home_screen_dataframe_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home-screen/dataframe-options */ "../../lib/assistant/lib/components/home-screen/dataframe-options.js");
/* harmony import */ var _utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/specialPrefixes */ "../../lib/assistant/lib/utils/specialPrefixes.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _RemoveAfterHide__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RemoveAfterHide */ "../../lib/assistant/lib/components/RemoveAfterHide.js");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");








function AddContextPopup({ onAddContext }) {
    const [activeNotebook, activeChat, attachContextOpen, setAttachContextOpen] = (0,_store_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(state => [
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveNotebook)(state),
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveChat)(state),
        state.attachContextOpen,
        state.setAttachContextOpen
    ]);
    const dataFrames = activeNotebook?.notebookState.dataframes;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!dataFrames?.length) {
            setAttachContextOpen(false);
        }
    }, [dataFrames, setAttachContextOpen]);
    const props = (0,_react_spring_web__WEBPACK_IMPORTED_MODULE_1__.useSpring)({
        right: 10,
        bottom: attachContextOpen ? 70 : -150,
        width: 422
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_RemoveAfterHide__WEBPACK_IMPORTED_MODULE_6__.RemoveAfter, { delay: 500, show: attachContextOpen },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-outer-container", style: { zIndex: 2 } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_spring_web__WEBPACK_IMPORTED_MODULE_1__.animated.div, { className: "as-explain-popup", style: props },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-container" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_home_screen_dataframe_options__WEBPACK_IMPORTED_MODULE_2__.SelectDataFrame, { buttonLabel: activeChat ? 'Attach dataframe to current chat' : 'Attach dataframe to new chat', onSubmit: dataframe => {
                            setAttachContextOpen(false);
                            const instruction = (0,_utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_3__.attachmentMessageInstruction)(dataframe.name, dataframe.cols);
                            onAddContext(instruction);
                        }, closeElement: react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-close-icon", style: {
                                marginLeft: 'auto'
                            }, onClick: () => {
                                setAttachContextOpen(false);
                            } },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_7__.Icons.Close, null)) }))))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/assistant-button.js":
/*!**************************************************************!*\
  !*** ../../lib/assistant/lib/components/assistant-button.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantButton: () => (/* binding */ AssistantButton)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon */ "../../lib/assistant/lib/components/icon.js");
/* harmony import */ var _assistant_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assistant_plugin */ "../../lib/assistant/lib/assistant_plugin.js");



class AssistantButton {
    /**
     * Instantiate a new Jupyter Assistant.
     * @param commands The command registry.
     */
    constructor(commands) {
        this._commands = commands;
    }
    /**
     * Create a new extension object.
     */
    createNew(panel) {
        const button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            tooltip: 'Anaconda Assistant',
            icon: _icon__WEBPACK_IMPORTED_MODULE_1__.AssistantIcon,
            onClick: () => {
                this._commands.execute(_assistant_plugin__WEBPACK_IMPORTED_MODULE_2__.assistantToggleCommand);
            }
        });
        // TODO:
        // This seems to be needed for v4.
        // On window reload, some extensions might not have loaded, therefore the Assistant can't be placed where it goes on Cloud Notebooks
        panel.toolbar.insertAfter('cellType', 'assistant', button);
        // Putting the assistant button before the spacer also means putting it after the Panel menu buttons
        panel.toolbar.insertBefore('spacer', 'assistant', button);
        return button;
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/components/assistant-login.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant/lib/components/assistant-login.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantLogin: () => (/* binding */ AssistantLogin)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/nucleus/accountUtils */ "../../lib/assistant/lib/utils/nucleus/accountUtils.js");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "../../lib/assistant/lib/config.js");




function AssistantLogin() {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-login-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-login-header" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-login-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.AnacondaLogo, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-title-text" },
                    "Anaconda Assistant",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-subtitle-text" }, "AI-powered coding, insights and debugging in your notebooks."))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-login-body" },
                "To enable the following extensions, create an account or sign in.",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Sparkle, null),
                        " Anaconda Assistant",
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-version-text" }, _config__WEBPACK_IMPORTED_MODULE_3__.CLIENT_VERSION)),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "coming-soon" }, "Coming soon!"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "disabled" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.DataCatalog, null),
                        " Data Catalogs"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "disabled" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Panel, null),
                        " Panel Deployments"),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { className: "disabled" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Share, null),
                        " Sharing")),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "as-create-account-button", onClick: _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_1__.login }, "Create Account"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-login-sign-in-text" },
                    "Already have an account? ",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { onClick: _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_1__.login }, "Sign In"))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-login-footer" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-login-help" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Question, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-login-footer-text" },
                    "For more information, read our ",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://docs.anaconda.com/free/anaconda-notebooks/anaconda-assistant/", target: "_blank" }, "Anaconda Assistant documentation"),
                    ".")))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/assistant-panel-container.js":
/*!***********************************************************************!*\
  !*** ../../lib/assistant/lib/components/assistant-panel-container.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantPanelContainer: () => (/* binding */ AssistantPanelContainer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_dataframe_checker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dataframe-checker */ "../../lib/assistant/lib/utils/dataframe-checker.js");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_feedback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/feedback */ "../../lib/assistant/lib/api/feedback.js");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _assistant_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assistant-panel */ "../../lib/assistant/lib/components/assistant-panel.js");
/* harmony import */ var _notebook_error_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./notebook-error-helper */ "../../lib/assistant/lib/components/notebook-error-helper.js");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! usehooks-ts */ "../../node_modules/usehooks-ts/dist/esm/index.js");
/* harmony import */ var _utils_text_selection_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/text-selection-utils */ "../../lib/assistant/lib/utils/text-selection-utils.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _assistant_login__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assistant-login */ "../../lib/assistant/lib/components/assistant-login.js");
/* harmony import */ var _utils_environmentType__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/environmentType */ "../../lib/assistant/lib/utils/environmentType.js");
/* harmony import */ var _jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../jupyter/syncStateDebounced */ "../../lib/assistant/lib/jupyter/syncStateDebounced.js");















function AssistantPanelContainer({ tracker }) {
    const [account, path, setPath, setCellError] = (0,_store_store__WEBPACK_IMPORTED_MODULE_5__.useStore)(state => [state.account, state.path, state.setPath, state.setCellError], zustand_shallow__WEBPACK_IMPORTED_MODULE_13__.shallow);
    const restarted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const executingCode = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const jupyterSelection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,usehooks_ts__WEBPACK_IMPORTED_MODULE_8__.useInterval)(() => {
        // Every 800ms we check the current text selection
        checkTextSelection(tracker);
    }, 800);
    const checkNotebookVariables = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        const requestExecute = getKernel(tracker)?.requestExecute({ code: _utils_dataframe_checker__WEBPACK_IMPORTED_MODULE_1__.dataFrameCheckerPython }, false);
        if (requestExecute) {
            requestExecute.onIOPub = (msg) => {
                if (_jupyterlab_services__WEBPACK_IMPORTED_MODULE_4__.KernelMessage.isExecuteResultMsg(msg)) {
                    if (msg.content.data && msg.content.data['text/plain']) {
                        const nbState = (0,_utils_dataframe_checker__WEBPACK_IMPORTED_MODULE_1__.parsePythonResult)(msg.content.data['text/plain']);
                        if (nbState) {
                            const path = tracker.currentWidget?.context.path || '';
                            setPath(path, nbState);
                        }
                    }
                }
            };
        }
    }, [setPath, tracker]);
    const cellExecuted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((_, context) => {
        const { cell, notebook, success, error } = context;
        checkNotebookVariables();
        if (!success && error) {
            setCellError((0,_notebook_error_helper__WEBPACK_IMPORTED_MODULE_7__.extractErrorContext)(cell, notebook, error.message));
        }
        if (executingCode.current?.cellId && executingCode.current?.cellId === cell.model.id) {
            (0,_api_feedback__WEBPACK_IMPORTED_MODULE_3__.postExecutionResult)({ ...executingCode.current }, success, error);
            executingCode.current = null;
        }
    }, [checkNotebookVariables, setCellError]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        function notebookChanged(_, context) {
            // We want to set the path to the new notebook as soon as we switch, even if we don't
            // have the notebook state yet.
            setPath(context?.sessionContext.path || '', { user: '', dataframes: [] });
            // When the notebook changes, we sync the disk state to the store
            (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_12__.syncDiskStateChained)();
            if (!context?.sessionContext.session) {
                // When opening a new notebook, the session may not be available yet, so we need to
                // wait a bit before checking the notebook variables.
                setTimeout(checkNotebookVariables, 1000);
            }
            else {
                checkNotebookVariables();
            }
        }
        function kernelStatusChanged(_, status) {
            if (status === 'restarting' || status === 'autorestarting') {
                restarted.current = true;
            }
            else if (status === 'idle' && restarted.current) {
                restarted.current = false;
                checkNotebookVariables();
            }
        }
        checkNotebookVariables();
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2__.NotebookActions.executed.connect(cellExecuted);
        tracker.currentChanged.connect(notebookChanged);
        getKernel(tracker)?.statusChanged.connect(kernelStatusChanged);
        return () => {
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2__.NotebookActions.executed.disconnect(cellExecuted);
            tracker.currentChanged.disconnect(notebookChanged);
            getKernel(tracker)?.statusChanged.disconnect(kernelStatusChanged);
        };
    }, [checkNotebookVariables, cellExecuted, setPath, tracker]);
    function checkTextSelection(tracker) {
        const editor = tracker.currentWidget?.content?.activeCell?.editor;
        const isMarkdown = editor?.model.mimeType === 'text/x-ipythongfm';
        if (editor && !isMarkdown) {
            const selection = editor.getSelection();
            // We use the jupyterSelection ref as a first check to see if any selection has
            // changed. If it has, we update the selected text on the global store
            const selectionEqual = (0,_utils_text_selection_utils__WEBPACK_IMPORTED_MODULE_9__.isSelectionEqual)(jupyterSelection.current, selection);
            if (!selectionEqual) {
                const selectedText = (0,_utils_text_selection_utils__WEBPACK_IMPORTED_MODULE_9__.getSelectionFromEditor)(editor, selection);
                _store_store__WEBPACK_IMPORTED_MODULE_5__.useStore.getState().setTextSelection(selectedText);
                jupyterSelection.current = (0,_utils_text_selection_utils__WEBPACK_IMPORTED_MODULE_9__.convertSelection)(selection);
            }
        }
    }
    async function addCodeToNotebook(code, activeMessageId, session, inPlace = false) {
        const notebook = tracker.currentWidget;
        const _addCodeToNotebook = _store_store__WEBPACK_IMPORTED_MODULE_5__.useStore.getState().settings.addCodeToNotebook || 'below-active-cell';
        if (notebook) {
            if (!inPlace) {
                switch (_addCodeToNotebook) {
                    case 'below-active-cell':
                        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2__.NotebookActions.insertBelow(notebook.content);
                        break;
                    case 'at-end-of-notebook':
                        notebook.content.activeCellIndex = notebook.content.widgets.length - 1;
                        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2__.NotebookActions.insertBelow(notebook.content);
                        break;
                    case 'in-place':
                        break;
                }
            }
            await notebook.content?.activeCell?.ready;
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2__.NotebookActions.replaceSelection(notebook.content, code);
            const cellId = notebook.content.activeCell?.model.id;
            executingCode.current = { code, cellId, activeMessageId, session };
            await _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_2__.NotebookActions.run(notebook.content, notebook.sessionContext);
        }
    }
    function getActiveCodeCell() {
        // TODO: This seems only needed in v3 in the monorepo, not in the jupyterassistant repo
        return tracker.currentWidget?.content.activeCell?.model.sharedModel.source || '';
    }
    if (!account && (0,_utils_environmentType__WEBPACK_IMPORTED_MODULE_11__.isLocalNotebooks)()) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_assistant_login__WEBPACK_IMPORTED_MODULE_10__.AssistantLogin, null);
    }
    return path ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_assistant_panel__WEBPACK_IMPORTED_MODULE_6__.AssistantPanel, { tracker: tracker, addCodeToNotebook: addCodeToNotebook, getActiveCodeCell: getActiveCodeCell })) : null;
}
function getKernel(tracker) {
    return tracker.currentWidget?.sessionContext.session?.kernel;
}


/***/ }),

/***/ "../../lib/assistant/lib/components/assistant-panel-widget.js":
/*!********************************************************************!*\
  !*** ../../lib/assistant/lib/components/assistant-panel-widget.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantPanelWidget: () => (/* binding */ AssistantPanelWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assistant_panel_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assistant-panel-container */ "../../lib/assistant/lib/components/assistant-panel-container.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/styles/createTheme.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/styles/ThemeProvider.js");




class AssistantPanelWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ReactWidget {
    constructor(notebookTracker) {
        super();
        this._notebookTracker = notebookTracker;
    }
    render() {
        const theme = (0,_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"])({
            palette: {
                primary: {
                    main: '#43B049'
                }
            }
        });
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], { theme: theme },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_assistant_panel_container__WEBPACK_IMPORTED_MODULE_2__.AssistantPanelContainer, { tracker: this._notebookTracker })));
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/components/assistant-panel.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant/lib/components/assistant-panel.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantPanel: () => (/* binding */ AssistantPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/Switch/Switch.js");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _chat_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat-panel */ "../../lib/assistant/lib/components/chat-panel.js");
/* harmony import */ var react_error_boundary__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-error-boundary */ "../../node_modules/react-error-boundary/dist/react-error-boundary.development.esm.js");
/* harmony import */ var _error_screen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error-screen */ "../../lib/assistant/lib/components/error-screen.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings */ "../../lib/assistant/lib/components/settings.js");
/* harmony import */ var _chat_header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat-header */ "../../lib/assistant/lib/components/chat-header.js");
/* harmony import */ var _access_screen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./access-screen */ "../../lib/assistant/lib/components/access-screen.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../config */ "../../lib/assistant/lib/config.js");
/* harmony import */ var _api_terms_and_conditions_version__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../api/terms-and-conditions-version */ "../../lib/assistant/lib/api/terms-and-conditions-version.js");













function AssistantPanel(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_error_boundary__WEBPACK_IMPORTED_MODULE_10__.ErrorBoundary, { FallbackComponent: _error_screen__WEBPACK_IMPORTED_MODULE_3__.ErrorScreen },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(InnerPanel, Object.assign({}, props))));
}
function InnerPanel(props) {
    const [olderThan13, setOlderThan13] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
    const [access, accepted, acceptTerms, settingsOpen, enableDataCollection, setEnableDataCollection] = (0,_store_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(state => [
        state.access,
        state.terms.accepted,
        state.acceptTerms,
        state.settings.open,
        state.settings.enableDataCollection,
        state.setEnableDataCollection
    ], zustand_shallow__WEBPACK_IMPORTED_MODULE_11__.shallow);
    if (!access) {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_access_screen__WEBPACK_IMPORTED_MODULE_7__.AccessScreen, null);
    }
    if (!accepted) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.AssistantComponentContext.Provider, { value: {
                replaceChildren: (0,_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.matchMultipleChildNames)([
                    'data-collection-setting-switch',
                    (childClassName) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: childClassName },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], { checked: enableDataCollection, onChange: (_, checked) => setEnableDataCollection(checked) })))
                ], [
                    'accept-terms-setting-switch',
                    (childClassName) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: childClassName },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], { checked: olderThan13, onChange: (_, checked) => setOlderThan13(checked) })))
                ])
            } },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.TermsAndConditionsPage, { clientVersion: _config__WEBPACK_IMPORTED_MODULE_8__.CLIENT_VERSION, accept: async () => {
                    let version = _store_store__WEBPACK_IMPORTED_MODULE_4__.useStore.getState().terms.version;
                    if (!version) {
                        try {
                            version = await (0,_api_terms_and_conditions_version__WEBPACK_IMPORTED_MODULE_9__.fetchTermsAndConditionsVersion)();
                        }
                        catch (e) {
                            console.error('Failed to fetch terms version');
                            _store_store__WEBPACK_IMPORTED_MODULE_4__.useStore.getState().logout();
                            return;
                        }
                    }
                    acceptTerms(version, true);
                }, enableDataCollection: enableDataCollection, setEnableDataCollection: setEnableDataCollection, olderThan13: olderThan13, setOlderThan13: setOlderThan13 })));
    }
    if (settingsOpen)
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chat_header__WEBPACK_IMPORTED_MODULE_6__.ChatHeader, null),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_settings__WEBPACK_IMPORTED_MODULE_5__.SettingsWrapper, null)));
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "as-container" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_chat_panel__WEBPACK_IMPORTED_MODULE_2__.ChatPanel, Object.assign({}, props))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/back-button.js":
/*!*********************************************************!*\
  !*** ../../lib/assistant/lib/components/back-button.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackButton: () => (/* binding */ BackButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/Tooltip/Tooltip.js");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");






function BackButton() {
    const [shouldShowBackButton, previousChatName, gotoPreviousChat] = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => [(0,_store_state_fns__WEBPACK_IMPORTED_MODULE_2__.showBackButton)(state), (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_2__.getPreviousChatName)(state), state.gotoPreviousChat], zustand_shallow__WEBPACK_IMPORTED_MODULE_4__.shallow);
    // Don't show the back button unless necessary (see showBackButton in state-fns.ts)
    if (!shouldShowBackButton) {
        return null;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-back-button-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], { title: "Resume previous chat" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-back-button-icon", onClick: gotoPreviousChat },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_3__.Icons.ChevronLeft, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-back-button-title-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-back-button-title" },
                    "Resume previous chat: ",
                    previousChatName)))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/chat-header.js":
/*!*********************************************************!*\
  !*** ../../lib/assistant/lib/components/chat-header.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatHeader: () => (/* binding */ ChatHeader)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "../../lib/assistant/lib/config.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");





function ChatHeader() {
    const [settingsOpen, toggleSettings] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => [state.settings.open, state.toggleSettings], zustand_shallow__WEBPACK_IMPORTED_MODULE_4__.shallow);
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "as-chat-header-container" },
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "as-chat-header-title-container" },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "as-chat-header-text-icon" },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "as-chat-header-main-icon" },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_3__.Icons.AnacondaLogo, null)),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "as-chat-header-main-text" }, "Anaconda Assistant")),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "as-chat-header-version-text" }, _config__WEBPACK_IMPORTED_MODULE_0__.CLIENT_VERSION)),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "as-chat-header-settings-container", style: settingsOpen
                ? { borderLeft: '1px solid rgba(85,85,85, 0.075)' }
                : { borderBottom: '1px solid rgba(85,85,85, 0.075)' } }, _config__WEBPACK_IMPORTED_MODULE_0__.SHOW_SETTINGS && (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "as-header-settings-icon", onClick: toggleSettings },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_3__.Icons.Settings, null))))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/chat-messages.js":
/*!***********************************************************!*\
  !*** ../../lib/assistant/lib/components/chat-messages.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatMessages: () => (/* binding */ ChatMessages)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var use_resize_observer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! use-resize-observer */ "../../node_modules/use-resize-observer/dist/bundle.esm.js");
/* harmony import */ var _messageButtons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./messageButtons */ "../../lib/assistant/lib/components/messageButtons.js");
/* harmony import */ var _utils_code_cleaner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/code-cleaner */ "../../lib/assistant/lib/utils/code-cleaner.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var prism_react_renderer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prism-react-renderer */ "../../node_modules/prism-react-renderer/dist/index.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _utils_contextMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/contextMessage */ "../../lib/assistant/lib/utils/contextMessage.js");
/* harmony import */ var _back_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./back-button */ "../../lib/assistant/lib/components/back-button.js");
/* harmony import */ var _errorMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./errorMessage */ "../../lib/assistant/lib/components/errorMessage.js");
/* harmony import */ var _utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/specialPrefixes */ "../../lib/assistant/lib/utils/specialPrefixes.js");














function ChatMessages({ tracker, addCodeToNotebook, scrollFn }) {
    const [messages, chatContext, inProgressType] = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => {
        const activeChat = (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_6__.getActiveChat)(state);
        return [activeChat?.messages, activeChat?.context, activeChat?.inProgress?.type];
    }, zustand_shallow__WEBPACK_IMPORTED_MODULE_11__.shallow);
    if (!messages || !chatContext)
        return null;
    async function exportChatToNotebook() {
        const notebook = tracker.currentWidget;
        if (!(notebook && messages))
            return;
        for (const message of messages) {
            const messageBlocks = (0,_utils_code_cleaner__WEBPACK_IMPORTED_MODULE_5__.extractMessageBlocks)(message.content);
            let hasPrintedRole = false;
            for (const block of messageBlocks) {
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.insertBelow(notebook.content);
                if (block.type === 'python') {
                    _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.changeCellType(notebook.content, 'code');
                }
                else {
                    _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.changeCellType(notebook.content, 'markdown');
                }
                const role = message.role === 'user' ? 'User' : 'Assistant';
                const parts = [`# ${role}`, block.content];
                if (hasPrintedRole) {
                    parts.shift();
                }
                else {
                    hasPrintedRole = true;
                }
                const content = parts.join('\n');
                await notebook.content?.activeCell?.ready;
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.replaceSelection(notebook.content, content);
                await _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.run(notebook.content, notebook.sessionContext);
            }
        }
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_back_button__WEBPACK_IMPORTED_MODULE_8__.BackButton, null),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InitialMessage, { tracker: tracker, initialMessage: messages[0], chatContext: chatContext }),
        messages.slice(1).map((message, idx) => {
            switch (message.role) {
                case 'user':
                    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(UserMessageComponent, { key: idx, tracker: tracker, message: {
                            ...message,
                            content: (0,_utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_10__.cleanMessageWithAttachmentPrefix)(message.content)
                        } }));
                case 'assistant':
                    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CompletedAssistantMessage, { key: idx, tracker: tracker, runCode: addCodeToNotebook, message: message }));
            }
        }),
        inProgressType === 'active' && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ActiveCodeMessage, { scrollFn: scrollFn }),
        inProgressType === 'error' && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ErrorCodeMessage, null),
        inProgressType ? null : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-export-chat-container", onClick: exportChatToNotebook },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ChevronLeft, null),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Export and run this chat in your Notebook")))));
}
function InitialMessage({ tracker, initialMessage, chatContext }) {
    if (initialMessage?.role !== 'user')
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(UserMessageComponent, { isInitialMessage: true, tracker: tracker, message: {
            ...initialMessage,
            content: determineFirstMessageText(chatContext, initialMessage.content)
        } }));
}
function UserMessageComponent({ isInitialMessage, tracker, message }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-user-chat-message-buttons-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-user-chat-message-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-user-chat-message-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-user-chat-message-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.User, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-user-chat-message-text" }, message.content)),
        !isInitialMessage && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_messageButtons__WEBPACK_IMPORTED_MODULE_4__.MessageButtons, { canDelete: true, canExport: true, tracker: tracker, message: message }))));
}
function ActiveCodeMessage({ scrollFn }) {
    const response = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_6__.getInProgressResponse)(state));
    // If the code response is changing (streaming back from the server), scroll to the bottom
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        scrollFn();
    }, [response, scrollFn]);
    if (!response)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ChatBot, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-text as-code-loading" })),
        response.content !== '' && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResponseBlocks, { message: response })));
}
function CompletedAssistantMessage({ tracker, message, runCode }) {
    const submitFeedback = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => state.submitFeedback);
    const { ref, width = 1 } = (0,use_resize_observer__WEBPACK_IMPORTED_MODULE_12__["default"])();
    function handleFeedback(sentiment, text) {
        submitFeedback({ messageId: message.messageId, sentiment, text });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-container", ref: ref },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ChatBot, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-text" })),
        message.content !== '' && react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResponseBlocks, { message: message, runCode: runCode }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_messageButtons__WEBPACK_IMPORTED_MODULE_4__.MessageButtons, { canSubmitFeedback: true, canExport: true, tracker: tracker, message: message, handleFeedback: handleFeedback, width: width })));
}
function ResponseBlocks({ message, runCode }) {
    const messageBlocks = (0,_utils_code_cleaner__WEBPACK_IMPORTED_MODULE_5__.extractMessageBlocks)(message.content);
    const messageId = message.messageId || message.message_id;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, messageBlocks.map((block, idx) => block.type === 'text' ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TextBlock, { key: idx, content: block.content })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CodeBlock, { key: idx, block: block, runCode: runCode, responseContainsPythonBlocks: messageBlocks.some(block => block.type === 'python'), messageId: messageId })))));
}
function TextBlock({ content }) {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-text-block" }, content);
}
function CodeBlock({ block, messageId, runCode, responseContainsPythonBlocks }) {
    const [runCodeClicked, setRunCodeClicked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [replaceClicked, setReplaceClicked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [copyClicked, setCopyClicked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const activeNotebook = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_6__.getActiveNotebook)(state));
    function handleOnRun(code) {
        setRunCodeClicked(true);
        setTimeout(() => setRunCodeClicked(false), 750);
        const session = (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_6__.getActiveChat)(_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore.getState())?.session;
        if (session && runCode) {
            runCode(code, messageId, session);
        }
    }
    function handleOnReplace(code) {
        setReplaceClicked(true);
        setTimeout(() => setReplaceClicked(false), 750);
        const session = (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_6__.getActiveChat)(_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore.getState())?.session;
        if (session && runCode) {
            runCode(code, messageId, session, true);
        }
    }
    function handleOnCopy(code) {
        setCopyClicked(true);
        setTimeout(() => setCopyClicked(false), 750);
        navigator.clipboard.writeText(code);
    }
    // If response did not mark any blocks in the response as python, we assume all code blocks are
    // python and show the run code button
    const showRunCodeButton = runCode && (!responseContainsPythonBlocks || block.type === 'python');
    // If a code block is selected in the notebook, we want to allow replacing the selection
    const selectedText = activeNotebook?.notebookState.selectedText?.text;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-block" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(prism_react_renderer__WEBPACK_IMPORTED_MODULE_13__["default"], Object.assign({}, prism_react_renderer__WEBPACK_IMPORTED_MODULE_13__.defaultProps, { code: block.content, language: "python" }), ({ className, style, tokens, getLineProps, getTokenProps }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("pre", { className: className, style: {
                    ...style,
                    padding: '12px 10px 12px',
                    marginBottom: 8,
                    overflowX: 'scroll',
                    borderRadius: 4
                } }, tokens.map((line, i) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", Object.assign({}, getLineProps({ line, key: i })), line.map((token, key) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", Object.assign({}, getTokenProps({ token, key })))))))))))),
        showRunCodeButton && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-run-code-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: `as-code-run-button ${runCodeClicked ? 'clicked' : ''}`, onClick: () => handleOnRun(block.content) },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Play, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-text" }, "Run code in Notebook")),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { disabled: !selectedText, className: `as-code-replace-button ${replaceClicked ? 'clicked' : ''} ${selectedText ? '' : 'disabled'}`, onClick: () => handleOnReplace(block.content) },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.MagicWand, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-text" }, "Replace selection")),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: `as-code-copy-button ${copyClicked ? 'clicked' : ''}`, onClick: () => handleOnCopy(block.content) },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-copy-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Copy, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-text" }, copyClicked ? 'Copied!' : 'Copy'))))));
}
function ErrorCodeMessage() {
    const [activeChat, retryError] = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => [(0,_store_state_fns__WEBPACK_IMPORTED_MODULE_6__.getActiveChat)(state)?.inProgress, state.retryError], zustand_shallow__WEBPACK_IMPORTED_MODULE_11__.shallow);
    if (!activeChat || activeChat.type !== 'error') {
        return null;
    }
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_errorMessage__WEBPACK_IMPORTED_MODULE_9__.ErrorMessage, { message: activeChat.message, retryError: retryError });
}
function determineFirstMessageText(context, content) {
    const suffix = (0,_utils_contextMessage__WEBPACK_IMPORTED_MODULE_7__.formatContextVariables)(context, content);
    switch (context.type) {
        case 'graph-dataframe':
            return `Generate graph for ${suffix}`;
        case 'describe-dataframe':
            return `Explain data in ${suffix}`;
        case 'explain-code':
            return `Explain ${suffix}`;
        case 'comment-code':
            return `Comment ${suffix}`;
        case 'improve-code':
            return `Refactor ${suffix}`;
        case 'debug-error':
            return `Debug error using ${suffix}`;
        case 'suggestions-chat':
        case 'default-python':
            if (content.startsWith(_utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_10__.attachmentMessagePrefix)) {
                return (0,_utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_10__.cleanMessageWithAttachmentPrefix)(content);
            }
            else {
                return `${content} (using ${suffix})`;
            }
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/components/chat-panel-footer.js":
/*!***************************************************************!*\
  !*** ../../lib/assistant/lib/components/chat-panel-footer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatPanelFooter: () => (/* binding */ ChatPanelFooter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/Tooltip/Tooltip.js");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "../../lib/assistant/lib/config.js");
/* harmony import */ var _utils_token_counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/token-counter */ "../../lib/assistant/lib/utils/token-counter.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common */ "../../lib/assistant/lib/components/common.js");
/* harmony import */ var _error_popup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./error-popup */ "../../lib/assistant/lib/components/error-popup.js");
/* harmony import */ var use_resize_observer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! use-resize-observer */ "../../node_modules/use-resize-observer/dist/bundle.esm.js");
/* harmony import */ var _explain_popup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./explain-popup */ "../../lib/assistant/lib/components/explain-popup.js");
/* harmony import */ var _add_context_popup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./add-context-popup */ "../../lib/assistant/lib/components/add-context-popup.js");
/* harmony import */ var _github_paste_markdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @github/paste-markdown */ "../../node_modules/@github/paste-markdown/dist/index.esm.js");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! usehooks-ts */ "../../node_modules/usehooks-ts/dist/esm/index.js");















function ChatPanelFooter({ scrollFn }) {
    const [activeChatKey, messagesLength, inProgressMessage, activeChatTokens, activeChatMaxTokens, activeChatType, addInstruction] = (0,_store_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(state => [
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveChat)(state)?.key,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveChat)(state)?.messages.length,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveChat)(state)?.inProgress,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveChat)(state)?.tokens,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveChat)(state)?.maxTokens,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveChat)(state)?.inProgress?.type,
        state.addInstruction
    ], zustand_shallow__WEBPACK_IMPORTED_MODULE_12__.shallow);
    const [instructionTokens, setInstructionTokens] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    const { ref, width } = (0,use_resize_observer__WEBPACK_IMPORTED_MODULE_13__["default"])();
    function addNewInstruction(instruction) {
        addInstruction({ instruction });
        setTimeout(scrollFn, 100);
    }
    const maxTokens = activeChatMaxTokens != null ? activeChatMaxTokens : _config__WEBPACK_IMPORTED_MODULE_2__.TOKEN_LIMIT;
    const [totalTokens, setTotalTokens] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(activeChatTokens != null ? activeChatTokens + instructionTokens : 0);
    const [msg, setMsg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const timeoutRef = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(undefined);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            clearTimeout(timeoutRef.current);
            let _instructionTokens = instructionTokens;
            if (!msg && inProgressMessage == null) {
                _instructionTokens = 0;
                setInstructionTokens(0);
            }
            setTotalTokens(activeChatTokens != null ? activeChatTokens + _instructionTokens : 0);
        }, 250);
        return () => clearTimeout(timeoutRef.current);
    }, [messagesLength, activeChatTokens, instructionTokens, inProgressMessage, msg]);
    function updateTokenCount(instruction) {
        setInstructionTokens((0,_utils_token_counter__WEBPACK_IMPORTED_MODULE_3__.countTokens)(instruction));
    }
    function sendMessage(instruction) {
        addNewInstruction(instruction);
        setMsg('');
    }
    const placeholder = activeChatKey != null
        ? 'Reply to this chat...'
        : 'Or start a new chat without notebook context here...';
    const is_active = activeChatType === 'active';
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_error_popup__WEBPACK_IMPORTED_MODULE_7__.ErrorPopup, { width: width }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_explain_popup__WEBPACK_IMPORTED_MODULE_8__.ExplainPopup, { width: width }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_add_context_popup__WEBPACK_IMPORTED_MODULE_9__.AddContextPopup, { onAddContext: sendMessage }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-footer-container", ref: ref },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatInput, { msg: msg, setMsg: setMsg, sendMessage: sendMessage, loading: is_active, onInstructionUpdate: updateTokenCount, placeholder: placeholder, maxTokens: maxTokens }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Footer, { sendMessage: sendMessage, loading: activeChatType != null, activeChatKey: activeChatKey, activeChatType: activeChatType, tokens: totalTokens, maxTokens: maxTokens }))));
}
function ChatInput({ msg, setMsg, sendMessage, loading, onInstructionUpdate, placeholder, maxTokens }) {
    const [setHidePopups] = (0,_store_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(state => [state.setHidePopups]);
    function handleSubmit(e) {
        if (msg.trim() !== '') {
            sendMessage(msg.trim());
        }
        e.preventDefault();
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey)
            handleSubmit(e);
        setHidePopups(true);
    }
    // Tokens are generally 3 characters long, so we limit the input to 1/3 of the total limit
    const maxTextareaInputLength = maxTokens;
    function handleOnChange(e) {
        const nextMsg = e.target.value.slice(0, maxTextareaInputLength + 1);
        onInstructionUpdate(nextMsg);
        setMsg(nextMsg);
    }
    const textAreaID = 'as-instruction-input-textarea';
    (0,usehooks_ts__WEBPACK_IMPORTED_MODULE_11__.useEffectOnce)(() => {
        const element = window.document.getElementById(textAreaID);
        if (element) {
            (0,_github_paste_markdown__WEBPACK_IMPORTED_MODULE_10__.subscribe)(element);
        }
    });
    // The following lines make the textarea grow with the text
    let textareaScrollHeight = 0;
    let formHeight = 0;
    let formMarginTop = 0;
    let textareaHeight = 0;
    if (!msg) {
        textareaScrollHeight = 0;
        formHeight = 35;
        formMarginTop = 0;
        textareaHeight = 16;
    }
    else {
        textareaScrollHeight = window.document.getElementById(textAreaID)?.scrollHeight || 0;
        formHeight = textareaScrollHeight + 6;
        formMarginTop = formHeight >= 35 ? 36 - formHeight : 0;
        if (formMarginTop < -178) {
            formMarginTop = -178;
        }
        textareaHeight = textareaScrollHeight ? textareaScrollHeight - 4 : 16;
    }
    // Focus the textarea when the chat stops loading
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!loading) {
            const element = window.document.getElementById(textAreaID);
            if (element) {
                element.focus();
            }
        }
    }, [loading, textAreaID]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-instruction-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", { style: {
                height: formHeight,
                marginTop: formMarginTop
            }, onSubmit: handleSubmit, className: "as-instruction-input-form" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", { id: textAreaID, maxLength: maxTextareaInputLength, style: {
                    height: textareaHeight
                }, disabled: loading, value: msg, onKeyDown: handleKeyDown, onChange: handleOnChange, rows: 1, className: "as-instruction-input-textarea", placeholder: placeholder }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { type: "submit", disabled: loading, className: "as-instruction-submit-button" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-instruction-send-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Send, null))))));
}
function Footer({ loading, activeChatKey, activeChatType, tokens, maxTokens }) {
    const [resetActiveChat, activeNotebook, setAttachContextOpen] = (0,_store_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(state => [
        state.resetActiveChat,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_5__.getActiveNotebook)(state),
        state.setAttachContextOpen
    ]);
    const completePercent = Math.ceil((tokens / maxTokens) * 100);
    const resetDisabled = !activeChatKey || activeChatType === 'active';
    function handleReset() {
        if (!resetDisabled)
            resetActiveChat();
    }
    const rawPercentage = Math.round((tokens / maxTokens) * 100);
    const percentage = rawPercentage > 100 ? 100 : rawPercentage;
    const dataFrames = activeNotebook?.notebookState.dataframes;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-footer" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                display: 'flex'
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-token-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-token-bar-container" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-token-filled", style: { width: `${percentage >= 100 ? 100 : completePercent}%` } })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-token-text", style: tokens >= maxTokens ? { color: 'red' } : {} },
                    "Chat ",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-token-count" },
                        percentage,
                        "%"),
                    "full")),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `as-chat-reset-container ${resetDisabled ? 'as-chat-reset-container-disabled' : ''}`, onClick: handleReset },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-reset-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.RotateRight, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], { title: "Restart this conversation" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-reset-text" }, "Restart")))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_common__WEBPACK_IMPORTED_MODULE_6__.Spacer, { flex: 1 }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { disabled: loading || !dataFrames?.length, className: "as-instruction-attach-context-button", onClick: () => setAttachContextOpen(true) },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-instruction-attach-context-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Clip, null)),
            "Attach to chat")));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/chat-panel.js":
/*!********************************************************!*\
  !*** ../../lib/assistant/lib/components/chat-panel.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatPanel: () => (/* binding */ ChatPanel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "../../lib/assistant/lib/components/common.js");
/* harmony import */ var _chat_panel_footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat-panel-footer */ "../../lib/assistant/lib/components/chat-panel-footer.js");
/* harmony import */ var _home_screen_home_screen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home-screen/home-screen */ "../../lib/assistant/lib/components/home-screen/home-screen.js");
/* harmony import */ var _sub_header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sub-header */ "../../lib/assistant/lib/components/sub-header.js");
/* harmony import */ var _chat_header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./chat-header */ "../../lib/assistant/lib/components/chat-header.js");
/* harmony import */ var _chat_messages__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./chat-messages */ "../../lib/assistant/lib/components/chat-messages.js");










function ChatPanel({ tracker, addCodeToNotebook, getActiveCodeCell }) {
    const activeChatKey = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_2__.getActiveNotebook)(state)?.activeChatKey);
    const messageEndRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const throttledScroll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((0,lodash__WEBPACK_IMPORTED_MODULE_3__.throttle)(scrollToBottom, 500), []);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chat_header__WEBPACK_IMPORTED_MODULE_8__.ChatHeader, null),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_sub_header__WEBPACK_IMPORTED_MODULE_7__.SubHeader, null),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-chat-main-section" },
            !activeChatKey ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_home_screen_home_screen__WEBPACK_IMPORTED_MODULE_6__.HomeScreen, { getActiveCodeCell: getActiveCodeCell })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chat_messages__WEBPACK_IMPORTED_MODULE_9__.ChatMessages, { tracker: tracker, addCodeToNotebook: addCodeToNotebook, scrollFn: throttledScroll })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { float: 'left', clear: 'both' }, ref: messageEndRef })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_common__WEBPACK_IMPORTED_MODULE_4__.Spacer, { flex: 1 }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chat_panel_footer__WEBPACK_IMPORTED_MODULE_5__.ChatPanelFooter, { scrollFn: throttledScroll })));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/common.js":
/*!****************************************************!*\
  !*** ../../lib/assistant/lib/components/common.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Spacer: () => (/* binding */ Spacer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Spacer({ flex }) {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { flex: flex } });
}


/***/ }),

/***/ "../../lib/assistant/lib/components/error-popup.js":
/*!*********************************************************!*\
  !*** ../../lib/assistant/lib/components/error-popup.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorPopup: () => (/* binding */ ErrorPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_spring_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-spring/web */ "../../node_modules/@react-spring/web/dist/react-spring_web.modern.mjs");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _RemoveAfterHide__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RemoveAfterHide */ "../../lib/assistant/lib/components/RemoveAfterHide.js");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");







function ErrorPopup({ width }) {
    const error = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_3__.getActiveNotebook)(state)?.notebookState.error);
    return error ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InnerPopup, { width: width, error: error }) : null;
}
function InnerPopup({ width, error }) {
    const [showError, setShowError] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false);
    const [makeChatRequest, resetToHomeScreen, setCellError, hidePopups] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => [state.makeChatRequest, state.resetToHomeScreen, state.setCellError, state.hidePopups], zustand_shallow__WEBPACK_IMPORTED_MODULE_6__.shallow);
    const enableDataCollection = _store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState().settings.enableDataCollection;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        // Hide the popup if there's a response in progress
        if (hidePopups) {
            setShowError(false);
            return;
        }
        // Show the popup if there's an error
        if (error) {
            setShowError(true);
        }
        else {
            setShowError(false);
        }
    }, [error, hidePopups]);
    function closeErrorDialog() {
        setCellError(null);
    }
    function handleDebugCode(error) {
        if (error) {
            resetToHomeScreen();
            makeChatRequest({
                context: {
                    type: 'debug-error',
                    variables: {
                        error_cell_code: error.cell.source,
                        error_output: error.errorText
                    }
                },
                instruction: ''
            });
            setCellError(null);
        }
    }
    const props = (0,_react_spring_web__WEBPACK_IMPORTED_MODULE_1__.useSpring)({
        right: 10,
        bottom: showError ? 70 : -180,
        width: width ? width - 80 : 360
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_RemoveAfterHide__WEBPACK_IMPORTED_MODULE_4__.RemoveAfter, { delay: 500, show: showError },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-outer-container", style: showError ? { zIndex: 2 } : {} },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_spring_web__WEBPACK_IMPORTED_MODULE_1__.animated.div, { className: "as-error-popup", style: props },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-container" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-header" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-logo" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-icon-container" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-icon" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_5__.Icons.ChatBot, null))),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Anaconda Assistant")),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-close-icon", onClick: closeErrorDialog },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_5__.Icons.Close, null))),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-share-warning-message" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-warning-icon-wrapper" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-warning-icon" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_5__.Icons.Warning, null))),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                            "By debugging the active code cell, the error tied to the active code cell, and the code of the active code cell will be sent to",
                            ' ',
                            enableDataCollection ? 'the Anaconda Servers and to ' : '',
                            "OpenAI.")),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-buttons" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-buttons-section" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-code-icon-container" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-code-icon" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_5__.Icons.Code, null))),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Start a new conversation")),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-button", onClick: () => handleDebugCode(error) },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Debug the active code cell"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-starter-icon" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_5__.Icons.ChevronRight, null)))))))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/error-screen.js":
/*!**********************************************************!*\
  !*** ../../lib/assistant/lib/components/error-screen.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorScreen: () => (/* binding */ ErrorScreen)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "../../lib/assistant/lib/config.js");
/* harmony import */ var _utils_environmentType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/environmentType */ "../../lib/assistant/lib/utils/environmentType.js");
/* harmony import */ var _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/nucleus/accountUtils */ "../../lib/assistant/lib/utils/nucleus/accountUtils.js");





function ErrorScreen({ error, resetErrorBoundary }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { marginTop: 70 } }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-title-text" },
                "Anaconda Assistant",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-version-text" }, _config__WEBPACK_IMPORTED_MODULE_2__.CLIENT_VERSION))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-panel" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Error, null)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-panel-text" }, error.message)),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-footer" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "as-code-retry-button", onClick: resetErrorBoundary },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.RotateLeft, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-text" }, "Retry")),
            (0,_utils_environmentType__WEBPACK_IMPORTED_MODULE_3__.isLocalNotebooks)() ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "as-code-retry-button", onClick: () => (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_4__.logout)() },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-text" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Logout")))) : null)));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/errorMessage.js":
/*!**********************************************************!*\
  !*** ../../lib/assistant/lib/components/errorMessage.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorMessage: () => (/* binding */ ErrorMessage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/nucleus/accountUtils */ "../../lib/assistant/lib/utils/nucleus/accountUtils.js");
/* harmony import */ var _utils_environmentType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/environmentType */ "../../lib/assistant/lib/utils/environmentType.js");






function ErrorMessage({ message, retryError }) {
    const [account, activeChat, resetActiveChat] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => [
        state.account,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_3__.getActiveChat)(state),
        state.resetActiveChat
    ]);
    let maxTokens = activeChat?.maxTokens;
    // Check if the message contains the maxTokens by matching "maximum context length is 16385 tokens"
    const detectedMaxTokens = parseInt(message.match(/maximum context length is (\d+) tokens/)?.[1] || '');
    if (detectedMaxTokens && detectedMaxTokens !== maxTokens) {
        maxTokens = detectedMaxTokens;
    }
    const isProTier = (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_4__.getIsProTier)(account);
    const errors = [
        {
            match: /Too many requests/,
            className: 'as-code-error-upgrade',
            hideChatTitle: true,
            message: isProTier
                ? 'You have reached the maximum number of requests for today.'
                : 'You have reached the maximum number of requests for today. Upgrade to increase the number of daily requests.',
            messageIcon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null),
            buttonIcon: isProTier ? null : react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Sparkle, null),
            buttonText: 'Upgrade',
            onClick: () => {
                window.open('https://anaconda.cloud/pricing');
            }
        },
        {
            match: /maximum context length/,
            className: 'as-code-error-token-limit',
            hideChatTitle: true,
            message: (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null,
                "You\u2019ve exceeded the maximum context length. You can always press the \"",
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { className: "as-code-error-token-limit-restart-button", onClick: e => {
                        e.preventDefault();
                        resetActiveChat();
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.RotateRight, null),
                    "Restart"),
                "\" button at the bottom to restart the conversation and reset the context-length.",
                isProTier ? null : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                    "Visit our",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://anaconda.cloud/pricing", target: "_blank", rel: "noopener noreferrer" }, "pricing page"),
                    ' ',
                    "to upgrade to either Starter or Pro, to use a model with a larger context-window.")))),
            messageIcon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null),
            buttonIcon: isProTier ? null : react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Sparkle, null),
            buttonText: 'Upgrade',
            onClick: () => {
                window.open('https://anaconda.cloud/pricing');
            }
        }
    ];
    const defaultError = {
        className: '',
        chatTitle: 'Something went wrong...',
        message: message,
        messageIcon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Error, null),
        buttonIcon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.RotateLeft, null),
        buttonText: 'Retry Request',
        onClick: retryError
    };
    const error = errors.find(e => e.match && message.match(e.match)) || defaultError;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `as-code-container ${error.className}` },
        error.hideChatTitle ? null : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-text" }, error.chatTitle))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-panel" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-icon" }, error.messageIcon),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-panel-text" }, error.message)),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-error-footer" },
            error.buttonIcon ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "as-code-retry-button", onClick: () => error.onClick() },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-icon" }, error.buttonIcon),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-text" }, error.buttonText))) : null,
            (0,_utils_environmentType__WEBPACK_IMPORTED_MODULE_5__.isLocalNotebooks)() ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "as-code-retry-button", onClick: () => (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_4__.logout)() },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-retry-text" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Logout")))) : null)));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/explain-popup.js":
/*!***********************************************************!*\
  !*** ../../lib/assistant/lib/components/explain-popup.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExplainPopup: () => (/* binding */ ExplainPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_spring_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-spring/web */ "../../node_modules/@react-spring/web/dist/react-spring_web.modern.mjs");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _RemoveAfterHide__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RemoveAfterHide */ "../../lib/assistant/lib/components/RemoveAfterHide.js");







function ExplainPopup({ width }) {
    const [selectedText, error] = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => [
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getActiveNotebook)(state)?.notebookState.selectedText,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getActiveNotebook)(state)?.notebookState.error
    ], zustand_shallow__WEBPACK_IMPORTED_MODULE_6__.shallow);
    return selectedText ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InnerPopup, { width: width, selectedText: selectedText, error: error })) : null;
}
function InnerPopup({ width, selectedText, error }) {
    const [makeChatRequest, resetToHomeScreen, hidePopups] = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => [state.makeChatRequest, state.resetToHomeScreen, state.hidePopups], zustand_shallow__WEBPACK_IMPORTED_MODULE_6__.shallow);
    // We want to read this property without subscribing to it
    const enableDataCollection = _store_store__WEBPACK_IMPORTED_MODULE_3__.useStore.getState().settings.enableDataCollection;
    // Used to show/hide the popup, which is animated
    const [showPopup, setShowPopup] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false);
    // Show the popup if the user has selected text and is not hovering the assistant panel (under the popup).
    // We also hide the popup if the state says so.
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const doShowPopup = Boolean(selectedText?.text && error === null);
        setShowPopup(!hidePopups && doShowPopup);
    }, [selectedText, error, hidePopups]);
    function closeErrorDialog() {
        setShowPopup(false);
    }
    function handleSelection(selectedText, type) {
        if (selectedText) {
            resetToHomeScreen();
            makeChatRequest({
                context: {
                    type,
                    variables: {
                        active_cell_code: selectedText.cell.source,
                        selected_code: selectedText.text
                    }
                },
                instruction: ''
            });
            setShowPopup(false);
        }
    }
    const props = (0,_react_spring_web__WEBPACK_IMPORTED_MODULE_1__.useSpring)({
        right: 10,
        bottom: showPopup ? 70 : -270,
        width: width ? width - 60 : 360
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_RemoveAfterHide__WEBPACK_IMPORTED_MODULE_5__.RemoveAfter, { delay: 500, show: showPopup },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-outer-container", style: showPopup ? { zIndex: 2 } : {} },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_react_spring_web__WEBPACK_IMPORTED_MODULE_1__.animated.div, { className: "as-explain-popup", style: props },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-container" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-header" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-logo" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-icon-container" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-icon" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ChatBot, null))),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Anaconda Assistant")),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-close-icon", onClick: closeErrorDialog },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Close, null))),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-share-warning-message" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-warning-icon-wrapper" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-warning-icon" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Warning, null))),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                            "By adding code to a conversation, the selected code cell will be sent to",
                            ' ',
                            enableDataCollection ? 'the Anaconda Servers and to ' : '',
                            "OpenAI.")),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-buttons" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-buttons-section" },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-code-icon-container" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-code-icon" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Code, null))),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Start a new conversation")),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-button", onClick: () => handleSelection(selectedText, 'explain-code') },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Explain the selected code"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-starter-icon" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ChevronRight, null))),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-button", onClick: () => handleSelection(selectedText, 'comment-code') },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Add comments to the selected code"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-starter-icon" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ChevronRight, null))),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-popup-button", onClick: () => handleSelection(selectedText, 'improve-code') },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Refactor the selected code"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-starter-icon" },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ChevronRight, null)))))))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/history-menu.js":
/*!**********************************************************!*\
  !*** ../../lib/assistant/lib/components/history-menu.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HistoryMenu: () => (/* binding */ HistoryMenu)
/* harmony export */ });
/* harmony import */ var _react_spring_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @react-spring/web */ "../../node_modules/@react-spring/web/dist/react-spring_web.modern.mjs");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/Tooltip/Tooltip.js");








function HistoryMenu({ open, width, setClosed }) {
    const [opacity, setOpacity] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(0);
    const [unmounted, unmount] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false);
    const [activeChatKey, chats, activeChat, setActiveChat] = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => [
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getActiveNotebook)(state)?.activeChatKey,
        getActiveNotebookChats(state),
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getActiveChat)(state),
        state.setActiveChat
    ], zustand_shallow__WEBPACK_IMPORTED_MODULE_6__.shallow);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
        if (open) {
            unmount(false);
            setTimeout(() => setOpacity(0.9), 100);
        }
        else {
            // This makes sure the component is completely removed from the window if the panel is closed, after the animation runs.
            setOpacity(0);
            setTimeout(() => unmount(true), 500);
        }
    }, [open]);
    const props = (0,_react_spring_web__WEBPACK_IMPORTED_MODULE_0__.useSpring)({
        left: open ? 0 : -351,
        top: 90,
        backgroundColor: 'white',
        width: 350
    });
    if (!width)
        return null;
    if (unmounted)
        return null;
    function selectChat(chatKey) {
        // If the chat is already active, just close the menu
        if (!activeChat || activeChat.key !== chatKey) {
            const chat = chats.find(c => c.key === chatKey);
            // If a chat of the same name is already active, moving back and forward
            // might feel as if there was no change at all, so let's clear the active chat
            // while we come up with a better solution.
            if (activeChat?.name === chat?.name) {
                setActiveChat(null);
            }
            setActiveChat(chatKey);
        }
        setClosed();
    }
    return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-menu-drawer-container" },
        react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-menu-background", style: { opacity, width }, onClick: setClosed }),
        react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_react_spring_web__WEBPACK_IMPORTED_MODULE_0__.animated.div, { className: `as-menu-drawer ${open ? 'open' : ''}`, style: props },
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-history-menu" },
                react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-history-menu-header" }, "Recent Chats"),
                chats.length === 0 && react__WEBPACK_IMPORTED_MODULE_2___default().createElement(NoChatsMessage, null),
                react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-history-menu-container" }, chats.map(chat => (react__WEBPACK_IMPORTED_MODULE_2___default().createElement(ChatThread, { key: chat.key, chat: chat, isActive: chat.key === activeChatKey, selectChat: selectChat }))))))));
}
function NoChatsMessage() {
    return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-history-no-chats" },
        react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", null, "No Previous Chats")));
}
function ChatThread({ chat, isActive, selectChat }) {
    const _deleteChat = (0,_store_store__WEBPACK_IMPORTED_MODULE_3__.useStore)(state => state.deleteChat);
    return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { key: chat.key, className: `as-history-menu-item ${isActive ? 'as-history-menu-item-active' : ''}`, title: chat.name, onClick: () => selectChat(chat.key) },
        react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-history-menu-item-icon" },
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.SolidMessage, null)),
        react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-history-menu-item-text" }, chat.name),
        isActive ? null : (react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { title: "Delete chat" },
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { className: "as-history-menu-item-close-icon", onClick: e => {
                    e.stopPropagation();
                    _deleteChat(chat.key);
                } },
                react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Close, null))))));
}
function getActiveNotebookChats(state) {
    const activeNotebook = (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getActiveNotebook)(state);
    return activeNotebook
        ? (0,lodash__WEBPACK_IMPORTED_MODULE_5__.orderBy)((0,lodash__WEBPACK_IMPORTED_MODULE_5__.values)(activeNotebook.chats).map(chat => ({
            name: chat.name,
            key: chat.key,
            lastUpdated: chat.lastUpdated
        })), [chat => chat.lastUpdated.getTime()], ['desc'])
        : [];
}


/***/ }),

/***/ "../../lib/assistant/lib/components/home-screen/dataframe-options.js":
/*!***************************************************************************!*\
  !*** ../../lib/assistant/lib/components/home-screen/dataframe-options.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DescribeDataframe: () => (/* binding */ DescribeDataframe),
/* harmony export */   GraphDataframe: () => (/* binding */ GraphDataframe),
/* harmony export */   SelectDataFrame: () => (/* binding */ SelectDataFrame)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");





function GraphDataframe() {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SelectDataFrame, { contextType: "graph-dataframe", buttonLabel: "Get Code" });
}
function DescribeDataframe() {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SelectDataFrame, { contextType: "describe-dataframe", buttonLabel: "Describe Dataframe" });
}
function SelectDataFrame({ buttonLabel, contextType, onSubmit, closeElement }) {
    const [makeChatRequest, activeNotebook] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => [state.makeChatRequest, (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_3__.getActiveNotebook)(state)], zustand_shallow__WEBPACK_IMPORTED_MODULE_4__.shallow);
    if (contextType === 'assistant-suggestions' && !onSubmit) {
        throw new Error('onSubmit is required for assistant-suggestions');
    }
    let submit = () => void 0;
    if (contextType && contextType !== 'assistant-suggestions') {
        submit = (dataframe) => {
            makeChatRequest({
                context: { type: contextType, variables: { dataframe } },
                instruction: ''
            });
        };
    }
    const dataFrames = activeNotebook?.notebookState.dataframes;
    if (!dataFrames)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DataframeSelector, { dataframes: dataFrames, submit: onSubmit || submit, buttonLabel: buttonLabel, closeElement: closeElement }));
}
function DataframeSelector({ dataframes, submit, buttonLabel, closeElement }) {
    const [selectedDf, setSelectedDataframe] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    function onChange(value) {
        const dataframe = dataframes.find(v => v.name === value);
        if (dataframe)
            setSelectedDataframe(dataframe);
    }
    const enableDataCollection = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => state.settings.enableDataCollection);
    function handleClick() {
        if (selectedDf)
            submit(selectedDf);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-graph-selector-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-graph-selector-message-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-text" }, "Select Dataframe"),
            closeElement),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-dataframe-select-warning-message" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-warning-icon-wrapper" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-warning-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Warning, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                "By attaching a dataframe to the conversation, the dataframe column names and types will be sent to ",
                enableDataCollection ? 'the Anaconda Servers and to' : '',
                "OpenAI.")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", { required: true, className: "as-dataframe-select", value: selectedDf?.name || '', onChange: e => onChange(e.target.value) },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { value: "", disabled: true, selected: true, hidden: true }, "Select"),
            dataframes.map(df => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", { key: df.hash, value: df.name }, df.name)))),
        selectedDf && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "as-get-code-button", onClick: handleClick },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-get-code-button-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.MagicWand, null)),
            buttonLabel))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/home-screen/generate-code.js":
/*!***********************************************************************!*\
  !*** ../../lib/assistant/lib/components/home-screen/generate-code.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadADataframe: () => (/* binding */ LoadADataframe)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/store */ "../../lib/assistant/lib/store/store.js");



const loadDataFrameOptions = [
    {
        label: 'Generate a DataFrame with random data',
        instruction: 'Generate code that creates a DataFrame with random data'
    },
    {
        label: 'Load 2023 NCAA Basketball Results',
        instruction: "Generate a DataFrame from this url - 'https://raw.githubusercontent.com/bbwieland/ncaa-projections/main/data/KenPomGamesCleaned.csv' and show the first 10 rows"
    },
    {
        label: 'Load 2023 NCAA Basketball Team Ratings',
        instruction: "Generate a DataFrame from this url - 'https://raw.githubusercontent.com/bbwieland/ncaa-projections/main/data/TeamRatings.csv' and show the first 10 rows"
    },
    {
        label: '(FiveThirtyEight) Which US state has the worst drivers?',
        instruction: "Generate a DataFrame from this url - 'https://raw.githubusercontent.com/fivethirtyeight/data/master/bad-drivers/bad-drivers.csv' and show the first 10 rows."
    },
    {
        label: '(FiveThirtyEight) Where do people go to check the weather?',
        instruction: "Generate a DataFrame from this url - 'https://raw.githubusercontent.com/fivethirtyeight/data/master/weather-check/weather-check.csv' and show the first 10 rows."
    },
    {
        label: '(FiveThirtyEight) District Urbanization Index 2022',
        instruction: "Generate a DataFrame from this url - 'https://raw.githubusercontent.com/fivethirtyeight/data/master/district-urbanization-index-2022/urbanization-index-2022.csv' and show the first 10 rows."
    },
    {
        label: 'Load the Palmer penguins dataset',
        instruction: "Generate a DataFrame from this url - 'https://raw.githubusercontent.com/holoviz-topics/examples/main/penguin_crossfilter/penguins.csv' and show the first 10 rows."
    },
    {
        label: 'Load the US Wind Turbine Database from usgs.gov',
        instruction: "Generate a DataFrame from this url - 'https://gist.githubusercontent.com/mattkram/5078f1cb198694274cb708253b0dc210/raw/f90167d071abe328f7f437f3d68dbd5deb6012c8/uswtdb_v5_3_20230113.csv"
    },
    {
        label: 'Load volcano data from the Smithsonian Institute',
        instruction: "Generate a DataFrame from this url - 'https://gist.githubusercontent.com/mattkram/9684863843254402942dfede27af2cb7/raw/2590dd8185b833aacf247c0595edbb07a025a6d7/Smithsonian_VOTW_Holocene_Volcanoes.csv' and show the first 10 rows."
    },
    {
        label: 'Load US population estimates (2010-2019) from census.gov',
        instruction: "Generate a DataFrame from this url - 'https://gist.githubusercontent.com/mattkram/d3880a3a23ca36ccf10f22c1f49adb29/raw/e3dbe9bde709604252f291e1df92ffa7b3bd098f/nst-est2020.csv' and show the first 10 rows."
    },
    {
        label: 'Load US population estimates (2020-2022) from census.gov',
        instruction: "Generate a DataFrame from this url - 'https://gist.githubusercontent.com/mattkram/d3880a3a23ca36ccf10f22c1f49adb29/raw/f4602d2b9a17eb0d17355897264f4bad80c5528f/NST-EST2022-POPCHG2020_2022.csv' and show the first 10 rows."
    },
    {
        label: 'Load Pittsburgh bike-share rides data',
        instruction: "Generate a DataFrame from this url - 'https://gist.github.com/mattkram/16ff06942c100c00466ea5022567bdaa/raw/386da24f5ede4e70496cde1dc9e98c9d02bb177e/bikeshare.csv' and show the first 10 rows."
    }
];
function LoadADataframe() {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CodeOptions, { options: loadDataFrameOptions });
}
function CodeOptions({ options }) {
    const makeChatRequest = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => state.makeChatRequest);
    function submit(instruction) {
        makeChatRequest({ context: { type: 'default-python', variables: {} }, instruction });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-graph-selector-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-graph-selector-message-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-text" }, "What would you like to do?")),
        options.map((option, idx) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(GenerateCodeOption, { key: idx, label: option.label, instruction: option.instruction, submit: submit })))));
}
function GenerateCodeOption({ label, instruction, submit }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-generate-code-option-container", onClick: () => submit(instruction) },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, label),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-starter-icon" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChevronRight, null))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/home-screen/generate-suggestions.js":
/*!******************************************************************************!*\
  !*** ../../lib/assistant/lib/components/home-screen/generate-suggestions.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GenerateSuggestions: () => (/* binding */ GenerateSuggestions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _dataframe_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dataframe-options */ "../../lib/assistant/lib/components/home-screen/dataframe-options.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _errorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../errorMessage */ "../../lib/assistant/lib/components/errorMessage.js");







function GenerateSuggestions({ getActiveCodeCell, chatStarterName }) {
    const activeNotebook = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_3__.getActiveNotebook)(state));
    const suggestionDataFrame = activeNotebook?.suggestionState.dataframe;
    const dataFrames = activeNotebook?.notebookState.dataframes;
    const isCleaning = chatStarterName === 'data-cleaning-suggestions';
    // If there is no DataFrame selected, and there are multiple dataframes, ask the user to select one
    if (!suggestionDataFrame && dataFrames) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_dataframe_options__WEBPACK_IMPORTED_MODULE_4__.SelectDataFrame, { contextType: "assistant-suggestions", buttonLabel: isCleaning ? 'Generate cleaning suggestions' : 'Generate suggestions', onSubmit: dataframe => {
                _store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState().setSuggestionsDataframe(dataframe);
            } }));
    }
    return activeNotebook ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CodeOptions, { suggestionState: activeNotebook.suggestionState, defaultDataFrame: null, chatStarterName: chatStarterName, getActiveCodeCell: getActiveCodeCell })) : null;
}
function CodeOptions({ suggestionState, defaultDataFrame, chatStarterName, getActiveCodeCell }) {
    const [makeChatRequest, updateSuggestions, setSuggestionsDataframe] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => [state.makeChatRequest, state.updateSuggestions, state.setSuggestionsDataframe], zustand_shallow__WEBPACK_IMPORTED_MODULE_6__.shallow);
    const { loading, suggestions, dataframe, error } = suggestionState;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        // If suggestions are null, kick off a request to get suggestions
        if (suggestions === null && !loading && !error) {
            updateSuggestions(getActiveCodeCell(), chatStarterName, dataframe || defaultDataFrame);
        }
    }, [
        chatStarterName,
        dataframe,
        defaultDataFrame,
        getActiveCodeCell,
        loading,
        error,
        suggestions,
        updateSuggestions
    ]);
    const activeDataFrame = defaultDataFrame || dataframe;
    function submit(instruction) {
        makeChatRequest({
            context: {
                type: 'suggestions-chat',
                variables: {
                    code_cell: getActiveCodeCell(),
                    name: activeDataFrame?.name || '',
                    dtypes_str: activeDataFrame?.dtypesStr || ''
                }
            },
            instruction
        });
    }
    function refreshSuggestions() {
        if (!loading)
            setSuggestionsDataframe(null);
    }
    const isCleaning = chatStarterName === 'data-cleaning-suggestions';
    return error ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_errorMessage__WEBPACK_IMPORTED_MODULE_5__.ErrorMessage, { message: error, retryError: refreshSuggestions })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-graph-selector-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-graph-selector-message-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-generate-container" },
                loading ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-text as-code-loading" },
                    "Fetching suggestions for ",
                    isCleaning ? 'data cleaning' : 'this notebook')) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-message-text" }, activeDataFrame
                    ? `Some ideas to ${isCleaning ? 'clean' : 'make use of'} dataframe ${activeDataFrame.name}`
                    : 'What would you like to do?')),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { onClick: refreshSuggestions, className: `as-code-generate-refresh ${loading ? 'as-code-generate-refresh-disabled' : ''} ` }, "Refresh Suggestions"))),
        !loading &&
            suggestions &&
            suggestions.map((suggestion, idx) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(GenerateCodeOption, { key: idx, label: suggestion, instruction: suggestion, submit: submit })))));
}
function GenerateCodeOption({ label, instruction, submit }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-generate-code-option-container", onClick: () => submit(instruction) },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, label),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-starter-icon" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChevronRight, null))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/home-screen/home-screen.js":
/*!*********************************************************************!*\
  !*** ../../lib/assistant/lib/components/home-screen/home-screen.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeScreen: () => (/* binding */ HomeScreen)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _dataframe_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dataframe-options */ "../../lib/assistant/lib/components/home-screen/dataframe-options.js");
/* harmony import */ var _generate_code__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./generate-code */ "../../lib/assistant/lib/components/home-screen/generate-code.js");
/* harmony import */ var _generate_suggestions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./generate-suggestions */ "../../lib/assistant/lib/components/home-screen/generate-suggestions.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");








function HomeScreen({ getActiveCodeCell }) {
    const [activeNotebook, selectChatStarter, makeChatRequest] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => [(0,_store_state_fns__WEBPACK_IMPORTED_MODULE_3__.getActiveNotebook)(state), state.selectChatStarter, state.makeChatRequest], zustand_shallow__WEBPACK_IMPORTED_MODULE_7__.shallow);
    if (!activeNotebook)
        return null;
    const { homeScreen } = activeNotebook;
    const { chatStarters, selectedChatStarter } = homeScreen;
    function setSelectedChatStarter(chatStarter) {
        if (shouldKickOffChatRequest(chatStarter)) {
            kickOffRequest(chatStarter);
        }
        else {
            selectChatStarter(chatStarter);
        }
    }
    // There are a couple of cases where there is no secondary options screen
    // e.g. when there is only one DataFrame in the notebook and a DataFrame option is selected
    // In these cases we kick off the request immediately
    function kickOffRequest(chatStarter) {
        if (chatStarter.name === 'load-volcano-data') {
            makeChatRequest({
                context: { type: 'default-python', variables: {} },
                // From https://anaconda.cloud/api/catalogs/examples
                instruction: `Generate a DataFrame from this url - 'https://gist.githubusercontent.com/mattkram/9684863843254402942dfede27af2cb7/raw/2590dd8185b833aacf247c0595edbb07a025a6d7/Smithsonian_VOTW_Holocene_Volcanoes.csv' and show the first 10 rows`
            });
        }
        else if (chatStarter.name === 'plot-fibonacci') {
            makeChatRequest({
                context: { type: 'default-python', variables: {} },
                instruction: `Plot the first 100 fibonacci numbers`
            });
        }
        else if (chatStarter.name === 'mask-emails') {
            makeChatRequest({
                context: { type: 'default-python', variables: {} },
                instruction: `Create a function to mask email addresses, show examples`
            });
        }
    }
    if (selectedChatStarter === null) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SelectChatStarter, { chatStarters: chatStarters, setChatStarter: setSelectedChatStarter }));
    }
    if (selectedChatStarter.name === 'load-a-dataframe') {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_generate_code__WEBPACK_IMPORTED_MODULE_5__.LoadADataframe, null);
    }
    else if (selectedChatStarter.name === 'graph-dataframe') {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_dataframe_options__WEBPACK_IMPORTED_MODULE_4__.GraphDataframe, null);
    }
    else if (selectedChatStarter.name === 'describe-dataframe') {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_dataframe_options__WEBPACK_IMPORTED_MODULE_4__.DescribeDataframe, null);
    }
    else if (selectedChatStarter.name === 'dataframe-suggestions' ||
        selectedChatStarter.name === 'data-cleaning-suggestions') {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_generate_suggestions__WEBPACK_IMPORTED_MODULE_6__.GenerateSuggestions, { chatStarterName: selectedChatStarter.name, getActiveCodeCell: getActiveCodeCell }));
    }
    else {
        return null;
    }
}
function SelectChatStarter({ chatStarters, setChatStarter }) {
    const tutorialStarters = chatStarters.filter(cs => cs.category === 'tutorial');
    const dataframeStarters = chatStarters.filter(cs => cs.category === 'dataframes');
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-container" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HomeScreenHeader, null),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-section" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-code-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-code-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Code, null))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Get started")),
        tutorialStarters.map((chatStarter, idx) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatStarterCmp, { key: idx, chatStarter: chatStarter, setChatStarter: () => setChatStarter(chatStarter) }))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-body" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-section" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-df-icon-container" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-df-icon" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Frame, null))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Working with DataFrames")),
            dataframeStarters.map((chatStarter, idx) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatStarterCmp, { key: idx, chatStarter: chatStarter, setChatStarter: () => setChatStarter(chatStarter) }))))));
}
function ChatStarterCmp({ chatStarter, setChatStarter }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-chat-starter", onClick: () => setChatStarter() },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, chatStarter.label),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-starter-icon" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChevronRight, null))));
}
function HomeScreenHeader() {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-header" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-title-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-home-screen-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.ChatBot, null)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-title-text" }, "Start with one of the following suggested tasks, or ask me anything using the text box below:"))));
}
function shouldKickOffChatRequest(chatStarter) {
    return (chatStarter.name === 'load-volcano-data' ||
        chatStarter.name === 'plot-fibonacci' ||
        chatStarter.name === 'mask-emails');
}


/***/ }),

/***/ "../../lib/assistant/lib/components/icon.js":
/*!**************************************************!*\
  !*** ../../lib/assistant/lib/components/icon.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantIcon: () => (/* binding */ AssistantIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);

const AssistantIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'assistant:wizard',
    svgstr: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
  <path
    d="M10.125 3.25C10.0312 3.1875 10 3.09375 10 3C10 2.90625 10.0312 2.84375 10.125 2.78125L12 2L12.75 0.15625C12.8125 0.0625 12.9062 0 13 0C13.0938 0 13.1562 0.0625 13.2188 0.15625L14 2L15.8438 2.78125C15.9375 2.84375 16 2.90625 16 3C16 3.09375 15.9375 3.1875 15.8438 3.25L14 4L13.2188 5.875C13.1562 5.96875 13.0938 6 13 6C12.9062 6 12.8125 5.96875 12.75 5.875L12 4L10.125 3.25ZM15.8438 12.7812C15.9375 12.8438 16 12.9062 16 13C16 13.0938 15.9375 13.1875 15.8438 13.25L14 14L13.2188 15.875C13.1562 15.9688 13.0938 16 13 16C12.9062 16 12.8125 15.9688 12.75 15.875L12 14L10.125 13.25C10.0312 13.1875 10 13.0938 10 13C10 12.9062 10.0312 12.8438 10.125 12.7812L12 12L12.75 10.1562C12.8125 10.0625 12.9062 10 13 10C13.0938 10 13.1562 10.0625 13.2188 10.1562L14 12L15.8438 12.7812ZM12 8C12 8.1875 11.875 8.375 11.7188 8.4375L8.1875 10.2188L6.4375 13.75C6.34375 13.9062 6.15625 14 6 14C5.78125 14 5.625 13.9062 5.53125 13.75L3.78125 10.2188L0.25 8.4375C0.09375 8.375 0 8.1875 0 8C0 7.8125 0.09375 7.625 0.25 7.5625L3.78125 5.78125L5.53125 2.28125C5.71875 1.9375 6.25 1.9375 6.4375 2.28125L8.1875 5.78125L11.7188 7.5625C11.875 7.625 12 7.8125 12 8Z"
    fill="#31a824"
  />
</svg>`
});


/***/ }),

/***/ "../../lib/assistant/lib/components/messageButtons.js":
/*!************************************************************!*\
  !*** ../../lib/assistant/lib/components/messageButtons.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageButtons: () => (/* binding */ MessageButtons)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_popper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-popper */ "../../node_modules/react-popper/lib/esm/usePopper.js");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var usehooks_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! usehooks-ts */ "../../node_modules/usehooks-ts/dist/esm/index.js");
/* harmony import */ var _use_should_animate_feedback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-should-animate-feedback */ "../../lib/assistant/lib/components/use-should-animate-feedback.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/Tooltip/Tooltip.js");
/* harmony import */ var _utils_code_cleaner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/code-cleaner */ "../../lib/assistant/lib/utils/code-cleaner.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");









function MessageButtons({ canExport, canDelete, canSubmitFeedback, tracker, message, handleFeedback, width }) {
    const assistantMessage = message;
    if (canSubmitFeedback && !handleFeedback) {
        throw new Error('handleFeedback must be provided if canSubmitFeedback is true');
    }
    async function exportMessageToNotebook() {
        const notebook = tracker.currentWidget;
        if (!notebook)
            return;
        const messageBlocks = (0,_utils_code_cleaner__WEBPACK_IMPORTED_MODULE_5__.extractMessageBlocks)(message.content);
        let hasPrintedRole = false;
        for (const block of messageBlocks) {
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.insertBelow(notebook.content);
            if (block.type === 'python') {
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.changeCellType(notebook.content, 'code');
            }
            else {
                _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.changeCellType(notebook.content, 'markdown');
            }
            const role = message.role === 'user' ? 'User' : 'Assistant';
            const parts = [`# ${role}`, block.content];
            if (hasPrintedRole) {
                parts.shift();
            }
            else {
                hasPrintedRole = true;
            }
            const content = parts.join('\n');
            await notebook.content?.activeCell?.ready;
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.replaceSelection(notebook.content, content);
            await _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.run(notebook.content, notebook.sessionContext);
        }
    }
    const deleteMessagesStartingWith = (0,_store_store__WEBPACK_IMPORTED_MODULE_6__.useStore)(state => state.deleteMessagesStartingWith);
    let feedbackComponents = null;
    if (canSubmitFeedback && handleFeedback) {
        if (assistantMessage.feedback) {
            feedbackComponents = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-thumbs-icons" },
                canSubmitFeedback && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { title: "I liked this response", placement: "bottom" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CompletedThumbsUp, { selected: assistantMessage.feedback.sentiment === 'positive' })))),
                canSubmitFeedback && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { title: "I didn't like this response", placement: "bottom" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CompletedThumbsDown, { selected: assistantMessage.feedback.sentiment === 'negative' }))))));
        }
        else {
            // Feedback buttons use css animation to beat, but if the sidebar menu is open, this will
            // cause them to appear in front of the menu, so we hide them when the menu is open.
            // See - https://stackoverflow.com/questions/61243945/checkboxes-behind-a-div-turned-visible-when-their-opacity-is-changed
            feedbackComponents = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-thumbs-icons" },
                canSubmitFeedback && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { title: "I liked this response", placement: "bottom" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FeedbackButton, { icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ThumbsUp, null), FeedbackElement: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PositiveFeedback, { width: width || 200, onSubmitFeedback: handleFeedback }) })))),
                canSubmitFeedback && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { title: "I didn't like this response", placement: "bottom" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FeedbackButton, { icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ThumbsDown, null), FeedbackElement: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NegativeFeedback, { width: width || 200, onSubmitFeedback: handleFeedback }) }))))));
        }
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-message-buttons-container" },
        canExport && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { title: "Export and run this message in the Notebook", placement: "bottom", className: "as-message-export-icon-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { onClick: exportMessageToNotebook },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Book, null)))),
        canDelete && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], { title: "Delete this and all messages below", placement: "bottom" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { onClick: () => deleteMessagesStartingWith(message.messageId), className: "as-message-button-trash-icon-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.Trash, null)))),
        feedbackComponents));
}
function CompletedThumbsUp({ selected }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `as-code-feedback-thumbs-icon-completed ${selected ? 'as-code-feedback-thumbs-completed-beat as-code-feedback-thumbs-up' : ''}` },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ThumbsUp, null)));
}
function CompletedThumbsDown({ selected }) {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `as-code-feedback-thumbs-icon-completed ${selected ? 'as-code-feedback-thumbs-completed-beat as-code-feedback-thumbs-down' : ''}` },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ThumbsDown, null)));
}
function FeedbackButton({ icon, FeedbackElement }) {
    const [referenceElement, setReferenceElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [popperElement, setPopperElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [arrowElement, setArrowElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { styles, attributes } = (0,react_popper__WEBPACK_IMPORTED_MODULE_8__.usePopper)(referenceElement, popperElement, {
        placement: 'top',
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }]
    });
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const animate = (0,_use_should_animate_feedback__WEBPACK_IMPORTED_MODULE_4__.useShouldAnimate)();
    function toggleOpen() {
        setOpen(prevState => !prevState);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `as-code-feedback-thumbs-icon ${animate ? 'as-code-thumbs-initial-beat' : ''}`, ref: setReferenceElement, onClick: toggleOpen }, icon),
        open && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", Object.assign({ ref: setPopperElement, style: {
                ...styles.popper,
                ...{ paddingLeft: 20, paddingRight: 20, marginBottom: 6 }
            } }, attributes.popper),
            FeedbackElement,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { id: "as-arrow", ref: setArrowElement, style: styles.arrow })))));
}
function PositiveFeedback({ width, onSubmitFeedback }) {
    const [text, setText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,usehooks_ts__WEBPACK_IMPORTED_MODULE_3__.useOnClickOutside)(ref, () => handleSubmit());
    function handleSubmit(e) {
        onSubmitFeedback('positive', text);
        e?.preventDefault();
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey)
            handleSubmit(e);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-modal", ref: ref, style: { width: width - 40 } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-modal-header" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-header-positive-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ThumbsUp, null)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-modal-title" }, "Provide additional feedback")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", { onSubmit: handleSubmit, className: "as-code-feedback-form" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-text-area" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", { autoFocus: true, disabled: false, maxLength: 200, value: text, onKeyDown: handleKeyDown, onChange: e => setText(e.target.value), rows: 3, className: "as-instruction-input-textarea", placeholder: 'What did you like about the generated code?' })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-button-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { type: "submit", className: "as-code-feedback-submit-button" }, "Submit")))));
}
function NegativeFeedback({ width, onSubmitFeedback }) {
    const [text, setText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,usehooks_ts__WEBPACK_IMPORTED_MODULE_3__.useOnClickOutside)(ref, () => handleSubmit());
    function handleSubmit(e) {
        onSubmitFeedback('negative', text);
        e?.preventDefault();
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey)
            handleSubmit(e);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-modal", ref: ref, style: { width: width - 40 } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-modal-header" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-header-negative-icon" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_2__.Icons.ThumbsUp, null)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-modal-title" }, "Provide additional feedback")),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", { onSubmit: handleSubmit, className: "as-code-feedback-form" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-text-area" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("textarea", { autoFocus: true, disabled: false, maxLength: 200, value: text, onKeyDown: handleKeyDown, onChange: e => setText(e.target.value), rows: 3, className: "as-instruction-input-textarea", placeholder: 'What was the issue with the generated code? How could it improve?' })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-code-feedback-button-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { type: "submit", className: "as-code-feedback-submit-button" }, "Submit")))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/notebook-error-helper.js":
/*!*******************************************************************!*\
  !*** ../../lib/assistant/lib/components/notebook-error-helper.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractErrorContext: () => (/* binding */ extractErrorContext),
/* harmony export */   trimPrecedingCells: () => (/* binding */ trimPrecedingCells)
/* harmony export */ });
const MAX_LENGTH = 2500;
function extractErrorContext(errorCell, notebook, error) {
    const errorCellId = errorCell.model.sharedModel.getId();
    const idx = notebook.widgets.findIndex(cell => cell.model.sharedModel.getId() === errorCellId);
    if (idx === -1)
        return null; // Cell not found (shouldn't happen)
    // Get the source for the cells preceding the error cell
    const precedingCells = trimPrecedingCells(notebook.widgets
        .slice(0, idx)
        .filter(cell => cell.model.type === 'code')
        .map(cell => ({
        id: cell.model.sharedModel.getId(),
        source: cell.model.sharedModel.getSource()
    })));
    return {
        precedingCells,
        cell: {
            id: errorCellId,
            source: errorCell.model.sharedModel.getSource()
        },
        errorText: error
    };
}
/**
 * Trims the preceding cells to a maximum length of 1250 characters
 * Tries to keep cells closest to the error (last in the array) intact
 * @param precedingCells
 */
function trimPrecedingCells(precedingCells) {
    let totalLength = 0;
    return precedingCells
        .reverse() // Start with cells closest to the error
        .map(cell => {
        totalLength += cell.source.length;
        return { id: cell.id, source: truncateIfTooLong(totalLength, cell) };
    })
        .reverse();
}
function truncateIfTooLong(totalLength, cell) {
    if (totalLength > MAX_LENGTH && totalLength - cell.source.length < MAX_LENGTH) {
        // This cell has pushed length over the limit, so truncate the cell to fit the max length
        return cell.source.slice(0, MAX_LENGTH - (totalLength - cell.source.length) - 3) + '...';
    }
    else if (totalLength > MAX_LENGTH) {
        // Over the limit, so truncate entirely
        return '...';
    }
    else {
        // Under the limit, so return the full cell
        return cell.source;
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/components/settings.js":
/*!******************************************************!*\
  !*** ../../lib/assistant/lib/components/settings.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsWrapper: () => (/* binding */ SettingsWrapper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./switch */ "../../lib/assistant/lib/components/switch.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/styles/createTheme.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/styles/ThemeProvider.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/FormControl/FormControl.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/Select/Select.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/nucleus/accountUtils */ "../../lib/assistant/lib/utils/nucleus/accountUtils.js");
/* harmony import */ var _utils_environmentType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/environmentType */ "../../lib/assistant/lib/utils/environmentType.js");









function SettingsWrapper() {
    const [account, enableDataCollection, setEnableDataCollection, _addCodeToNotebook, setAddCodeToNotebook] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => [
        state.account,
        state.settings.enableDataCollection,
        state.setEnableDataCollection,
        state.settings.addCodeToNotebook,
        state.setAddCodeToNotebook,
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getActiveChat)(state)
    ], zustand_shallow__WEBPACK_IMPORTED_MODULE_7__.shallow);
    const isStarterTier = (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_5__.getIsStarterTier)(account);
    const isProTier = (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_5__.getIsProTier)(account);
    const addCodeToNotebook = _addCodeToNotebook || 'below-active-cell';
    const theme = (0,_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"])({
        palette: {
            primary: {
                main: '#43B049'
            }
        },
        typography: {
            fontSize: 11
        }
    });
    const showLogout = () => {
        if (account && (0,_utils_environmentType__WEBPACK_IMPORTED_MODULE_6__.isLocalNotebooks)()) {
            return {
                logout: _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_5__.logout,
                accountUserEmail: account?.user.email || ''
            };
        }
        return null;
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], { theme: theme },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.AssistantComponentContext.Provider, { value: {
                replaceChildren: (0,_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.matchMultipleChildNames)([
                    /data-collection.*action/,
                    (childClassName) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], { className: childClassName },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_switch__WEBPACK_IMPORTED_MODULE_3__.Switch, { checked: enableDataCollection, onChange: (_, checked) => setEnableDataCollection(checked) })))
                ], [
                    /run-code.*action/,
                    (childClassName) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], { className: childClassName, variant: "standard", sx: { maxWidth: 200 } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], { value: addCodeToNotebook, displayEmpty: true, inputProps: { 'aria-label': 'Without label' }, onChange: e => {
                                setAddCodeToNotebook(e.target.value);
                            } }, Object.entries(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.settingAddCodeToNotebookTitles).map(([key, value]) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], { key: key, value: key }, value))))))
                ])
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.SettingsPage, { showLogout: showLogout, enableDataCollection: enableDataCollection, setEnableDataCollection: setEnableDataCollection, addCodeToNotebook: addCodeToNotebook, setAddCodeToNotebook: setAddCodeToNotebook, isProTier: isProTier, isStarterTier: isStarterTier, isCloudNotebooks: (0,_utils_environmentType__WEBPACK_IMPORTED_MODULE_6__.isCloudNotebooks)() }))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/sub-header.js":
/*!********************************************************!*\
  !*** ../../lib/assistant/lib/components/sub-header.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubHeader: () => (/* binding */ SubHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anaconda/assistant-components */ "../../lib/assistant-components/lib/index.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var use_resize_observer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! use-resize-observer */ "../../node_modules/use-resize-observer/dist/bundle.esm.js");
/* harmony import */ var _history_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./history-menu */ "../../lib/assistant/lib/components/history-menu.js");
/* harmony import */ var zustand_shallow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.mjs");
/* harmony import */ var _store_state_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/state-fns */ "../../lib/assistant/lib/store/state-fns.js");







function SubHeader() {
    const [chatTitle, isNewChat, isOnChatStarter, menuOpen, setMenuOpen, toggleMenuOpen, resetToHomeScreen] = (0,_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(state => [
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getChatTitle)(state),
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getIsNewChat)(state),
        (0,_store_state_fns__WEBPACK_IMPORTED_MODULE_4__.getIsOnChatStarter)(state),
        state.menuOpen,
        state.setMenuOpen,
        state.toggleMenuOpen,
        state.resetToHomeScreen
    ], zustand_shallow__WEBPACK_IMPORTED_MODULE_5__.shallow);
    const { ref, width } = (0,use_resize_observer__WEBPACK_IMPORTED_MODULE_6__["default"])();
    const showNewChatTooltip = !isNewChat || isOnChatStarter;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_history_menu__WEBPACK_IMPORTED_MODULE_3__.HistoryMenu, { open: menuOpen, width: width, setClosed: () => setMenuOpen(false) }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-header-container", ref: ref },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-header-menu-icon-wrapper", onClick: toggleMenuOpen },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-header-menu-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Bars, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "History")),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-header-title-container" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-header-title" }, isNewChat ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-header-link-text" },
                    "Read our",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://docs.anaconda.com/free/anaconda-notebooks/anaconda-assistant/", target: "_blank" }, "docs"))) : (chatTitle))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `as-sub-header-new-chat-icon-wrapper ${showNewChatTooltip ? '' : 'disabled'}`, onClick: resetToHomeScreen },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "as-sub-header-new-chat-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_anaconda_assistant_components__WEBPACK_IMPORTED_MODULE_1__.Icons.Plus, null)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "New Chat")))));
}


/***/ }),

/***/ "../../lib/assistant/lib/components/switch.js":
/*!****************************************************!*\
  !*** ../../lib/assistant/lib/components/switch.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Switch: () => (/* binding */ Switch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/styles */ "../../node_modules/@mui/material/styles/styled.js");
/* harmony import */ var _mui_material_Switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Switch */ "../../node_modules/@mui/material/Switch/Switch.js");



const Switch = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__["default"])((props) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_2__["default"], Object.assign({ focusVisibleClassName: ".Mui-focusVisible", disableRipple: true }, props))))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff'
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
        }
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        })
    }
}));


/***/ }),

/***/ "../../lib/assistant/lib/components/use-should-animate-feedback.js":
/*!*************************************************************************!*\
  !*** ../../lib/assistant/lib/components/use-should-animate-feedback.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useShouldAnimate: () => (/* binding */ useShouldAnimate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");


/**
 * We only want to animate the feedback buttons if the menu is closed. This is because
 * the feedback buttons use css animation to beat, but if the sidebar menu is open, this will
 * cause them to appear in front of the menu, so we hide them when the menu is open.
 * This logic is encapsulated in this hook.
 */
function useShouldAnimate() {
    const menuOpen = (0,_store_store__WEBPACK_IMPORTED_MODULE_1__.useStore)(state => state.menuOpen);
    const [animate, setAnimate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!menuOpen)
            setAnimate(true);
        setTimeout(() => setAnimate(false), 2000);
    }, [menuOpen]);
    return animate && !menuOpen;
}


/***/ }),

/***/ "../../lib/assistant/lib/config.js":
/*!*****************************************!*\
  !*** ../../lib/assistant/lib/config.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT_VERSION: () => (/* binding */ CLIENT_VERSION),
/* harmony export */   SHOW_SETTINGS: () => (/* binding */ SHOW_SETTINGS),
/* harmony export */   TOKEN_LIMIT: () => (/* binding */ TOKEN_LIMIT),
/* harmony export */   getServerUrl: () => (/* binding */ getServerUrl)
/* harmony export */ });
/* harmony import */ var _jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jupyter/extension-load-utils */ "../../lib/assistant/lib/jupyter/extension-load-utils.js");
/* harmony import */ var _utils_environmentType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/environmentType */ "../../lib/assistant/lib/utils/environmentType.js");


const LD_KEY_ASSISTANT_USE_DEV_API_ENDPOINT = 'assistant-use-dev-api-endpoint';
// We specify the server URL based on the account we are logged into.
// We fetch the account only once and cache the response.
let serverUrlPromise = null;
function getServerUrl() {
    if (!serverUrlPromise) {
        serverUrlPromise = (async () => {
            if ((0,_utils_environmentType__WEBPACK_IMPORTED_MODULE_1__.isLocalDev)()) {
                return 'http://localhost:8000';
            }
            const useDevServer = _jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_0__.sharedCore.getFeatureFlagBool(LD_KEY_ASSISTANT_USE_DEV_API_ENDPOINT);
            console.log('[Assistant] Using dev server because of LD feature flag:', useDevServer);
            if (useDevServer) {
                return 'https://jupyterassistant.anacondaconnect.com';
            }
            else {
                return _jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_0__.sharedCore.getCoreReady().config.assistant.apiUrl || 'https://assistant.anaconda.cloud';
            }
        })();
    }
    return serverUrlPromise;
}
// TODO:
// Make this dynamic by reading it from the backend
const CLIENT_VERSION = '0.4.0';
// The maximum amount of input tokens to allow sending up. The current model, gpt-3.5-turbo-0613, supports 4096
// and so it looks like we will want to adjust this based on the model in the future. We're limiting to 3/4 in the
// input in order to allow tokens in the response.
const TOKEN_LIMIT = 4096;
// We can use this to show/hide the settings button
// which will open the settings page when we have configurable settings in the future
const SHOW_SETTINGS = true;


/***/ }),

/***/ "../../lib/assistant/lib/index.js":
/*!****************************************!*\
  !*** ../../lib/assistant/lib/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantPlugin: () => (/* reexport safe */ _assistant_plugin__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _assistant_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assistant_plugin */ "../../lib/assistant/lib/assistant_plugin.js");




/***/ }),

/***/ "../../lib/assistant/lib/jupyter/activateAssistantWithCodeSelection.js":
/*!*****************************************************************************!*\
  !*** ../../lib/assistant/lib/jupyter/activateAssistantWithCodeSelection.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getActivateAssistantWithCodeSelection: () => (/* binding */ getActivateAssistantWithCodeSelection)
/* harmony export */ });
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _utils_text_selection_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/text-selection-utils */ "../../lib/assistant/lib/utils/text-selection-utils.js");



function getActivateAssistantWithCodeSelection(opts) {
    return async function () {
        const { assistant, notebookTracker } = opts;
        assistant.activateWidget();
        const activeCell = notebookTracker.activeCell;
        const editor = activeCell?.editor;
        if (!editor) {
            return;
        }
        // If there is a selection, use it
        const currentSelection = editor?.getSelection();
        const selectedText = (0,_utils_text_selection_utils__WEBPACK_IMPORTED_MODULE_2__.getSelectionFromEditor)(editor, currentSelection);
        if (selectedText.text) {
            _store_store__WEBPACK_IMPORTED_MODULE_1__.useStore.getState().setTextSelection(selectedText);
            return;
        }
        // Only select text in code cells
        if (activeCell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CodeCell) {
            const lastLine = editor.getLine(editor.lineCount - 1) || '';
            const totalLines = editor.lineCount - 1;
            editor.setSelection({
                start: { line: 0, column: 0 },
                end: { line: totalLines, column: lastLine.length }
            });
            const selection = editor.getSelection();
            const selectedText = (0,_utils_text_selection_utils__WEBPACK_IMPORTED_MODULE_2__.getSelectionFromEditor)(editor, selection);
            _store_store__WEBPACK_IMPORTED_MODULE_1__.useStore.getState().setTextSelection(selectedText);
        }
    };
}


/***/ }),

/***/ "../../lib/assistant/lib/jupyter/assistantSidebarWidget.js":
/*!*****************************************************************!*\
  !*** ../../lib/assistant/lib/jupyter/assistantSidebarWidget.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssistantSidebarWidget: () => (/* binding */ AssistantSidebarWidget)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/icon */ "../../lib/assistant/lib/components/icon.js");
/* harmony import */ var _extension_load_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extension-load-utils */ "../../lib/assistant/lib/jupyter/extension-load-utils.js");
/* harmony import */ var _components_assistant_panel_widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/assistant-panel-widget */ "../../lib/assistant/lib/components/assistant-panel-widget.js");




class AssistantSidebarWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(opts) {
        super();
        this.content = null;
        this.manuallyClosed = false;
        /**
         * A function that allows subscribing to messages sent to this this.
         */
        this._onMessageFn = null;
        this.opts = opts;
        this.initialize();
        // save a copy of this.processMessage, then overwrite it
        const oldProcessMessage = this.processMessage.bind(this);
        this.processMessage = (msg) => {
            if (this._onMessageFn) {
                this._onMessageFn(msg);
            }
            oldProcessMessage(msg);
        };
        // If the user closes the widget, it shouldn't be opened automatically
        // However, if the system closes the widget, it should be opened automatically.
        // We detect this by checking if the widget was hidden and detached in the last second.
        // Also, if the widget is shown, we clear the manuallyClosed flag.
        const onMessage = (message) => {
            (0,_extension_load_utils__WEBPACK_IMPORTED_MODULE_2__.onMessageAccumulator)(message, (messages) => {
                const recentlyHidden = messages.find(m => m.type === 'after-hide');
                const recentlyDetached = messages.find(m => m.type === 'after-detach');
                const recentlyShown = messages.find(m => m.type === 'after-show');
                if (recentlyHidden && !recentlyDetached) {
                    this.manuallyClosed = true;
                    // Hack to only track actual close from user interaction
                    if (messages.length === 2) {
                        this.hideFirstTimeLoginPage();
                    }
                }
                if (recentlyShown) {
                    this.manuallyClosed = false;
                }
            });
        };
        this.onMessage(onMessage);
    }
    /**
     * Initializes the widget
     */
    initialize() {
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.PanelLayout());
        this.addClass('jp-SidePanel');
        this.content = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Panel();
        const assistantPanelWidget = new _components_assistant_panel_widget__WEBPACK_IMPORTED_MODULE_3__.AssistantPanelWidget(this.opts.notebookTracker);
        assistantPanelWidget.addClass('as-widget-content');
        this.content.addWidget(assistantPanelWidget);
        this.content.node.setAttribute('role', 'region');
        this.content.node.setAttribute('aria-label', 'Assistant content');
        this.content.addClass('as-widget-content');
        this.addClass('as-widget-container');
        layout.addWidget(this.content);
        this.id = 'anaconda-assistant';
        this.title.icon = _components_icon__WEBPACK_IMPORTED_MODULE_1__.AssistantIcon;
        this.title.closable = true;
    }
    onMessage(fn) {
        this._onMessageFn = fn;
    }
    // Shows the widget
    // If the widget is visible, we don't do anything.
    // If the widget is disposed, we regenerate it.
    // If the widget is not attached, we add it to the main area.
    // If the main area is not visible, we show it, unless keepHidden is true.
    // Finally, we activate the widget, if keepHidden is false.
    activateWidget(keepHidden = false) {
        const app = this.opts.jupyterFrontEnd;
        // If the widget is visible, don't do anything
        if (this.isAttached && this.parent?.isVisible) {
            return;
        }
        // Regenerate the widget if disposed
        if (this.isDisposed) {
            this.initialize();
        }
        // Add the widget to the main work area if it's not there
        if (!this.isAttached) {
            app.shell.add(this, 'right');
        }
        // If the main area is not visible, and the widget is hidden, show the widget and the main area
        if (!this.parent?.isVisible && !keepHidden) {
            this.show();
            this.parent?.show();
        }
        // Activate the widget if keepHidden is false
        if (!keepHidden) {
            app.shell.activateById(this.id);
        }
    }
    // Hides the widget and the parent widget
    hideWidget() {
        this.hide();
        this.parent?.hide();
        this.hideFirstTimeLoginPage();
    }
    hideFirstTimeLoginPage() {
        window.localStorage.setItem('anaconda-assistant-opened-once', 'true');
    }
    // Toggles the widget
    // If the widget is attached and the parent is visible, we close the parent.
    // We indicate that this was done manually.
    // Otherwise, we clear the manuallyClosed flag and activate the widget
    toggleWidget() {
        // If the widget is attached and the parent is visible, we close the parent.
        if (this.isAttached && this.parent?.isVisible) {
            // Once changed manually, it shouldn't be changed automatically
            this.manuallyClosed = true;
            this.hideWidget();
            return;
        }
        this.manuallyClosed = false;
        return this.activateWidget();
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/jupyter/extension-load-utils.js":
/*!***************************************************************!*\
  !*** ../../lib/assistant/lib/jupyter/extension-load-utils.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedCorePlugin: () => (/* binding */ SharedCorePlugin),
/* harmony export */   onMessageAccumulator: () => (/* binding */ onMessageAccumulator),
/* harmony export */   sharedCore: () => (/* binding */ sharedCore)
/* harmony export */ });
/**
 * This function is used to detect if the user manually closed the widget.
 * It works by accumulating all messages from the widget that happened
 * within the time specified by the timeout parameter.
 * After the timeout, the accumulated messages are passed to the callback.
 */
let messagesInTheLastSecond = [];
let messageAccumulatorTimeout;
const onMessageAccumulator = (message, callback, timeout = 100) => {
    messagesInTheLastSecond.push(message);
    clearTimeout(messageAccumulatorTimeout);
    messageAccumulatorTimeout = setTimeout(() => {
        if (messagesInTheLastSecond.length > 0 && callback) {
            callback(messagesInTheLastSecond);
        }
        messagesInTheLastSecond = [];
    }, timeout);
};
/**
 * Helper to load the core plugin
 */
class SharedCorePlugin {
    constructor() {
        this.corePlugin = null;
        this.coreReady = null;
    }
    async setCore(corePlugin) {
        this.corePlugin = corePlugin;
        this.coreReady = await corePlugin.ready();
    }
    getCore() {
        if (!this.corePlugin) {
            throw new Error('Core not set');
        }
        return this.corePlugin;
    }
    getCoreReady() {
        this.getCore();
        if (!this.coreReady) {
            throw new Error('Core not ready');
        }
        return this.coreReady;
    }
    getFeatureFlagBool(name) {
        return this.getCoreReady().featureFlag.getBool(name, false);
    }
}
const sharedCore = new SharedCorePlugin();


/***/ }),

/***/ "../../lib/assistant/lib/jupyter/fetchDiskState.js":
/*!*********************************************************!*\
  !*** ../../lib/assistant/lib/jupyter/fetchDiskState.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAndNormalizeDiskState: () => (/* binding */ fetchAndNormalizeDiskState),
/* harmony export */   fetchDiskState: () => (/* binding */ fetchDiskState),
/* harmony export */   normalizeDiskState: () => (/* binding */ normalizeDiskState)
/* harmony export */ });
/* harmony import */ var _api_terms_and_conditions_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/terms-and-conditions-version */ "../../lib/assistant/lib/api/terms-and-conditions-version.js");
/* harmony import */ var _store_home_screen_state_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/home-screen-state-fns */ "../../lib/assistant/lib/store/home-screen-state-fns.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "../../lib/assistant/lib/types.js");
/* harmony import */ var _utils_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/launchdarkly/handler */ "../../lib/assistant/lib/utils/launchdarkly/handler.js");
/* harmony import */ var _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/nucleus/accountUtils */ "../../lib/assistant/lib/utils/nucleus/accountUtils.js");






function normalizeDiskState(diskState, currentAppState) {
    // Extract as minimal state as possible
    let addCodeToNotebook = diskState.settings?.addCodeToNotebook;
    if (!addCodeToNotebook || !_types__WEBPACK_IMPORTED_MODULE_3__.ADD_CODE_TO_NOTEBOOK_TYPES.includes(addCodeToNotebook)) {
        addCodeToNotebook = currentAppState.settings?.addCodeToNotebook;
    }
    let notebooks = [];
    if (diskState.notebooks) {
        for (const notebook of diskState.notebooks) {
            if (typeof notebook.path !== 'string')
                continue;
            if (!notebook.path)
                continue;
            if (!notebook.chats)
                continue;
            const chats = {};
            for (const chat of Object.values(notebook.chats)) {
                if (typeof chat.key !== 'string')
                    continue;
                if (typeof chat.name !== 'string')
                    continue;
                chats[chat.key] = {
                    // Being permissive here since the corruption would have to be surgical to break here,
                    // and chats are of too many types to be able to validate them all
                    // in this iteration.
                    ...chat,
                    lastUpdated: new Date(chat.lastUpdated || 0)
                };
            }
            notebooks.push({
                path: notebook.path,
                notebookState: {
                    dataframes: [],
                    selectedCell: null,
                    selectedText: null,
                    error: null
                },
                homeScreen: {
                    chatStarters: _store_home_screen_state_fns__WEBPACK_IMPORTED_MODULE_1__.noDataframeStarters,
                    selectedChatStarter: null
                },
                suggestionState: {
                    loading: false,
                    suggestions: null,
                    dataframe: null,
                    error: null
                },
                chats,
                activeChatKey: null,
                previousChatKey: null
            });
        }
    }
    return {
        terms: {
            accepted: Boolean(diskState.terms?.accepted || currentAppState.terms?.accepted),
            version: diskState.terms?.version || currentAppState.terms?.version || null
        },
        notebooks,
        settings: {
            open: Boolean(diskState.settings?.open),
            enableDataCollection: Boolean(diskState.settings?.enableDataCollection),
            addCodeToNotebook
        }
    };
}
/**
 * Fetches the state from disk.
 * Ignores the state if the received state is not an object (meaning JSON parsing failed).
 * Ignores the state if the version does not match.
 * @returns The state from disk or null if there is no state.
 */
async function fetchAndNormalizeDiskState(currentAppState) {
    const diskStateResponse = await (0,_utils_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_4__.requestAPI)('get_disk_state');
    const isObject = Boolean(diskStateResponse && typeof diskStateResponse === 'object');
    const hasState = Boolean(isObject && diskStateResponse.state && typeof diskStateResponse.state === 'object');
    const hasVersion = Boolean(isObject && diskStateResponse.version && typeof diskStateResponse.version === 'number');
    const versionIsUpToDate = Boolean(isObject && diskStateResponse.version && diskStateResponse.version === _store_store__WEBPACK_IMPORTED_MODULE_2__.STATE_VERSION);
    if (isObject && hasState && hasVersion && versionIsUpToDate) {
        return normalizeDiskState(diskStateResponse.state, currentAppState);
    }
    return null;
}
/**
 * Fetches the state from disk and merges it with the app state.
 */
function fetchDiskState() {
    return new Promise(async (resolve, reject) => {
        try {
            // Fetching state from disk
            const diskState = await fetchAndNormalizeDiskState(_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState());
            if (!diskState) {
                // If we didn't receive a valid state and we are logged in, try to log out
                if (_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState()?.terms?.accepted) {
                    console.log('No state found on disk and locally the Assistant is already loaded. Logging out.');
                    await (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_5__.logout)([
                        'An Assistant in another Jupyter Lab session or browser tab logged out.',
                        'Do you want to log out as well?',
                        'Logging out will remove all your Anaconda Assistant data,',
                        'but if you decide to stay some features will not be available.'
                    ].join(' '));
                    resolve(void 0);
                    return;
                }
                console.log('No state found on disk. Skipping state update.');
                resolve(void 0);
                return;
            }
            // If we can't fetch the terms version, the user doesn't have access to our API.
            let fetchedVersion = null;
            try {
                fetchedVersion = await (0,_api_terms_and_conditions_version__WEBPACK_IMPORTED_MODULE_0__.fetchTermsAndConditionsVersion)();
            }
            catch (e) {
                console.error('Error fetching terms and conditions version', e);
            }
            if (!fetchedVersion) {
                console.log('No terms and conditions version found. The user is not allowed to use our API.');
                _store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState()?.setAccess(false);
            }
            // Accepting terms locally if they are accepted on disk
            const version = diskState.terms?.version || _store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState()?.terms?.version || fetchedVersion;
            if (!_store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState()?.terms?.accepted && diskState.terms?.accepted && version) {
                console.log('Terms and conditions accepted on disk. Accepting them locally.');
                _store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState()?.acceptTerms(version, true);
            }
            // Syncing chats
            for (const notebook of diskState.notebooks || []) {
                const chats = Object.values(notebook.chats);
                console.log(`Syncing ${chats.length} chats to ${notebook.path}`);
                _store_store__WEBPACK_IMPORTED_MODULE_2__.useStore.getState()?.addSyncedChats(notebook, chats);
            }
            resolve(void 0);
        }
        catch (e) {
            console.error('Error updating state from disk', e);
            reject(e);
        }
    });
}


/***/ }),

/***/ "../../lib/assistant/lib/jupyter/initializeAssistant.js":
/*!**************************************************************!*\
  !*** ../../lib/assistant/lib/jupyter/initializeAssistant.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeAssistant: () => (/* binding */ initializeAssistant)
/* harmony export */ });
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Initializes the assistant by hiding it if there's no active notebook.
 * Also, if the current widget is a notebook and has a path,
 * sets the path in the store if it's not set.
 */
function initializeAssistant(opts) {
    const { assistant, jupyterFrontEnd: app } = opts;
    const onCurrentWidgetChanged = typeof app.shell?._currentChanged?.connect === 'function';
    if (!onCurrentWidgetChanged) {
        return;
    }
    let hadUrlParam = false;
    async function onConnect() {
        const context = app.shell.currentWidget?.context;
        const factoryName = context?.factoryName;
        const isNotebook = factoryName && factoryName.toLowerCase() === 'notebook';
        // Get ?open_assistant=true from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const openAssistant = urlParams.get('open_assistant');
        // Remove the query param from the URL
        urlParams.delete('open_assistant');
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
        if (openAssistant === 'true') {
            hadUrlParam = true;
            if (!isNotebook && _store_store__WEBPACK_IMPORTED_MODULE_0__.useStore.getState().account) {
                // If the user already logged in, but the current widget is not a notebook,
                // we must create a notebook.
                // The only view that works without a notebook is the login view.
                await app.commands.execute('notebook:create-new');
            }
            assistant.activateWidget();
            return;
        }
        if ((!hadUrlParam || _store_store__WEBPACK_IMPORTED_MODULE_0__.useStore.getState().account) &&
            !isNotebook &&
            Boolean(window.localStorage.getItem('anaconda-assistant-opened-once'))) {
            assistant.hideWidget();
            assistant.close();
            return;
        }
        // TODO:
        // `!assistant.parent` seems to be necessary for JupyterLab v4
        if (!assistant.parent || !(assistant.isAttached && assistant.parent?.isVisible)) {
            assistant.activateWidget(assistant.manuallyClosed);
        }
        const state = _store_store__WEBPACK_IMPORTED_MODULE_0__.useStore.getState();
        if (context?.path && (!state.path || state.path !== context.path)) {
            _store_store__WEBPACK_IMPORTED_MODULE_0__.useStore.getState().setPath(context?.path || '', { user: state.user || '', dataframes: [] });
        }
    }
    // TODO:
    // This code seems to be necessary for JupyterLab v4
    const debouncedOnConnect = lodash__WEBPACK_IMPORTED_MODULE_1___default().debounce(onConnect, 100);
    app.shell._currentChanged.connect(debouncedOnConnect);
    // TODO:
    // This code seems to be necessary for JupyterLab v4
    debouncedOnConnect();
}


/***/ }),

/***/ "../../lib/assistant/lib/jupyter/syncDiskState.js":
/*!********************************************************!*\
  !*** ../../lib/assistant/lib/jupyter/syncDiskState.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearDiskState: () => (/* binding */ clearDiskState),
/* harmony export */   syncDiskState: () => (/* binding */ syncDiskState)
/* harmony export */ });
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _utils_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/launchdarkly/handler */ "../../lib/assistant/lib/utils/launchdarkly/handler.js");
/* harmony import */ var _utils_nucleus_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/nucleus/auth */ "../../lib/assistant/lib/utils/nucleus/auth.js");



/**
 * Synchronizes the state of the store with the server.
 * Does so by sending the state to the server,
 * except for the terms and conditions, which
 * are only sent if they have been accepted.
 */
async function syncDiskState(termsAccepted) {
    const accessToken = await (0,_utils_nucleus_auth__WEBPACK_IMPORTED_MODULE_2__.getAccessToken)();
    if (!accessToken) {
        console.log('Could not sync state, no access token');
        return;
    }
    const appState = _store_store__WEBPACK_IMPORTED_MODULE_0__.useStore.getState();
    const state = {
        ...appState,
        terms: {
            accepted: false,
            version: appState.terms?.version || null
        }
    };
    // Special case for terms and conditions
    if (appState.terms?.accepted === true || termsAccepted) {
        state.terms.accepted = true;
    }
    (0,_utils_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_1__.requestAPI)('sync_disk_state', {
        headers: { 'X-Nucleus-Token': accessToken.accessToken },
        method: 'POST',
        body: JSON.stringify({
            state,
            version: _store_store__WEBPACK_IMPORTED_MODULE_0__.STATE_VERSION
        })
    });
}
async function clearDiskState() {
    const accessToken = await (0,_utils_nucleus_auth__WEBPACK_IMPORTED_MODULE_2__.getAccessToken)();
    if (!accessToken) {
        console.log('Could not sync state, no access token');
        return;
    }
    (0,_utils_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_1__.requestAPI)('sync_disk_state', {
        headers: { 'X-Nucleus-Token': accessToken.accessToken },
        method: 'POST',
        body: JSON.stringify({})
    });
}


/***/ }),

/***/ "../../lib/assistant/lib/jupyter/syncStateDebounced.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant/lib/jupyter/syncStateDebounced.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindSyncDiskStateChained: () => (/* binding */ bindSyncDiskStateChained),
/* harmony export */   syncDiskStateChained: () => (/* binding */ syncDiskStateChained),
/* harmony export */   syncDiskStateChainedEventFunction: () => (/* binding */ syncDiskStateChainedEventFunction),
/* harmony export */   unbindSyncDiskStateChained: () => (/* binding */ unbindSyncDiskStateChained)
/* harmony export */ });
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _fetchDiskState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchDiskState */ "../../lib/assistant/lib/jupyter/fetchDiskState.js");
/* harmony import */ var _syncDiskState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./syncDiskState */ "../../lib/assistant/lib/jupyter/syncDiskState.js");
/* harmony import */ var _api_access__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/access */ "../../lib/assistant/lib/api/access.js");




let chainedPromise = null;
/**
 * Synchronizes the state of the store with the server.
 * First, it checks if there is a promise running.
 * If there is, it waits for it to finish.
 * Then, it checks if the user has access to our API.
 * If not, it sets the access to false in the store.
 * If the user has access, it updates the account in the store.
 * Then, it fetches the state from disk and merges it with the app state.
 * Finally, it synchronizes the state with the server.
 */
function syncDiskStateChained(termsAccepted) {
    chainedPromise = (async () => {
        if (chainedPromise) {
            await chainedPromise;
        }
        if (!(await (0,_api_access__WEBPACK_IMPORTED_MODULE_3__.hasAccess)())) {
            console.log('The user is not allowed to use our API.');
            _store_store__WEBPACK_IMPORTED_MODULE_0__.useStore.getState().setAccess(false);
            return;
        }
        try {
            await _store_store__WEBPACK_IMPORTED_MODULE_0__.useStore.getState().updateAccount();
        }
        catch (e) {
            console.log('Unable to pre-load account. The user is not logged in');
        }
        await (0,_fetchDiskState__WEBPACK_IMPORTED_MODULE_1__.fetchDiskState)();
        await (0,_syncDiskState__WEBPACK_IMPORTED_MODULE_2__.syncDiskState)(termsAccepted);
        chainedPromise = null;
    })();
    return chainedPromise;
}
function syncDiskStateChainedEventFunction() {
    syncDiskStateChained();
}
function bindSyncDiskStateChained() {
    window.addEventListener('blur', syncDiskStateChainedEventFunction);
    window.addEventListener('focus', syncDiskStateChainedEventFunction);
}
function unbindSyncDiskStateChained() {
    try {
        window.removeEventListener('blur', syncDiskStateChainedEventFunction);
        window.removeEventListener('focus', syncDiskStateChainedEventFunction);
    }
    catch (e) {
        console.log('Error unbinding syncDiskStateChained', e);
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/store/home-screen-state-fns.js":
/*!**************************************************************!*\
  !*** ../../lib/assistant/lib/store/home-screen-state-fns.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialHomeScreenState: () => (/* binding */ initialHomeScreenState),
/* harmony export */   noDataframeStarters: () => (/* binding */ noDataframeStarters),
/* harmony export */   resetToHomeScreen: () => (/* binding */ resetToHomeScreen),
/* harmony export */   selectChatStarter: () => (/* binding */ selectChatStarter),
/* harmony export */   updateHomeScreenState: () => (/* binding */ updateHomeScreenState)
/* harmony export */ });
/* harmony import */ var _state_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state-fns */ "../../lib/assistant/lib/store/state-fns.js");

const loadVolcanoData = {
    name: 'load-volcano-data',
    category: 'tutorial',
    label: 'Load volcano data from the Smithsonian Institute'
};
const plotFibonacci = {
    name: 'plot-fibonacci',
    category: 'tutorial',
    label: 'Plot the first 100 Fibonacci numbers'
};
const maskEmails = {
    name: 'mask-emails',
    category: 'tutorial',
    label: 'Create a function to mask emails'
};
const loadADataFrame = {
    name: 'load-a-dataframe',
    category: 'dataframes',
    label: 'Load a DataFrame'
};
const explainDataframe = {
    name: 'describe-dataframe',
    category: 'dataframes',
    label: 'Describe the data in a DataFrame'
};
const graphDataframe = {
    name: 'graph-dataframe',
    category: 'dataframes',
    label: 'Generate a graph for data in a DataFrame'
};
const dataCleaningSuggestions = {
    name: 'data-cleaning-suggestions',
    category: 'dataframes',
    label: 'Suggestions for cleaning data'
};
const dataframeSuggestions = {
    name: 'dataframe-suggestions',
    category: 'dataframes',
    label: 'More suggestions...'
};
const dataframePresentStarters = [
    loadVolcanoData,
    plotFibonacci,
    maskEmails,
    loadADataFrame,
    graphDataframe,
    explainDataframe,
    dataCleaningSuggestions,
    dataframeSuggestions
];
const noDataframeStarters = [loadVolcanoData, plotFibonacci, maskEmails, loadADataFrame];
function initialHomeScreenState(dataframes) {
    return {
        chatStarters: dataframes.length > 0 ? dataframePresentStarters : noDataframeStarters,
        selectedChatStarter: null
    };
}
function updateHomeScreenState(homeScreen, dataframes) {
    if (selectedStarterNeedsDataframe(homeScreen) && dataframes.length === 0) {
        homeScreen.chatStarters = noDataframeStarters;
        homeScreen.selectedChatStarter = null;
        return;
    }
    homeScreen.chatStarters = dataframes.length > 0 ? dataframePresentStarters : noDataframeStarters;
}
function selectChatStarter(state, chatStarter) {
    const activeNotebook = (0,_state_fns__WEBPACK_IMPORTED_MODULE_0__.getActiveNotebook)(state);
    if (!activeNotebook)
        return;
    activeNotebook.homeScreen.selectedChatStarter = chatStarter;
}
function resetToHomeScreen(state) {
    const activeNotebook = (0,_state_fns__WEBPACK_IMPORTED_MODULE_0__.getActiveNotebook)(state);
    if (!activeNotebook)
        return;
    activeNotebook.homeScreen.selectedChatStarter = null;
    activeNotebook.previousChatKey = activeNotebook.activeChatKey;
    activeNotebook.activeChatKey = null;
}
function selectedStarterNeedsDataframe(homeScreen) {
    const { selectedChatStarter } = homeScreen;
    return (selectedChatStarter?.name === 'graph-dataframe' ||
        selectedChatStarter?.name === 'describe-dataframe' ||
        selectedChatStarter?.name === 'data-cleaning-suggestions' ||
        selectedChatStarter?.name === 'dataframe-suggestions');
}


/***/ }),

/***/ "../../lib/assistant/lib/store/rehydration-utils.js":
/*!**********************************************************!*\
  !*** ../../lib/assistant/lib/store/rehydration-utils.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _overrideMaxChatsForTesting: () => (/* binding */ _overrideMaxChatsForTesting),
/* harmony export */   updateStoreState: () => (/* binding */ updateStoreState)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state-fns */ "../../lib/assistant/lib/store/state-fns.js");


let MAX_STORED_CHATS = 50;
function updateStoreState(state, error) {
    if (state) {
        const notebooks = state.notebooks;
        notebooks.forEach(nb => {
            (0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(nb.chats).forEach(chat => {
                // Need to ensure chat timestamps strings are converted to Date objects
                chat.lastUpdated = new Date(chat.lastUpdated);
            });
        });
        state.menuOpen = false;
        const notebook = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveNotebook)(state);
        const activeChat = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveChat)(state);
        if (notebook && activeChat) {
            if (activeChat.inProgress) {
                // If there is an in progress chat request, we want to remove it
                activeChat.inProgress = null;
                notebook.activeChatKey = null;
                if (activeChat.messages.length === 1) {
                    // If there is only one message in the chat, we want to remove the chat altogether
                    delete notebook.chats[activeChat.key];
                }
                else {
                    // Otherwise, we want to remove the last message from the chat
                    activeChat.messages.pop();
                }
            }
        }
        if (notebook) {
            // Don't want to rehydrate cell execution errors
            notebook.notebookState.error = null;
            // Don't want to rehydrate selected text
            notebook.notebookState.selectedText = null;
        }
        // Want to cap the total number of chats in case we fill up local storage
        // Get all chat lastUpdated dates, and remove any chats that are older than the
        // 50th most recent chat across all notebooks
        const allDates = getLastUpdatedOfAllChats(state);
        if (allDates.length > MAX_STORED_CHATS) {
            const sortedDates = allDates.sort((a, b) => b.getTime() - a.getTime());
            const cutoffDate = sortedDates[MAX_STORED_CHATS];
            notebooks.forEach(nb => {
                const chats = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.entries)(nb.chats);
                const chatKeysToDelete = chats
                    .filter(([_, chat]) => chat.lastUpdated <= cutoffDate)
                    .map(([key, _]) => key);
                chatKeysToDelete.forEach(key => delete nb.chats[key]);
            });
        }
        let i = notebooks.length;
        while (i--) {
            // If there are no chats in a notebook, and this is not the active notebook, remove it
            if (Object.values(notebooks[i].chats).length === 0 && notebooks[i].path !== state.path) {
                notebooks.splice(i, 1);
            }
        }
    }
}
function getLastUpdatedOfAllChats(state) {
    return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.flatten)(state.notebooks.map(nb => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.values)(nb.chats).map(chat => chat.lastUpdated)));
}
// Only use for testing
function _overrideMaxChatsForTesting(maxChats) {
    MAX_STORED_CHATS = maxChats;
}


/***/ }),

/***/ "../../lib/assistant/lib/store/state-fns.js":
/*!**************************************************!*\
  !*** ../../lib/assistant/lib/store/state-fns.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanupError: () => (/* binding */ cleanupError),
/* harmony export */   completeRequest: () => (/* binding */ completeRequest),
/* harmony export */   getActiveChat: () => (/* binding */ getActiveChat),
/* harmony export */   getActiveNotebook: () => (/* binding */ getActiveNotebook),
/* harmony export */   getChatTitle: () => (/* binding */ getChatTitle),
/* harmony export */   getInProgressResponse: () => (/* binding */ getInProgressResponse),
/* harmony export */   getIsNewChat: () => (/* binding */ getIsNewChat),
/* harmony export */   getIsOnChatStarter: () => (/* binding */ getIsOnChatStarter),
/* harmony export */   getPreviousChat: () => (/* binding */ getPreviousChat),
/* harmony export */   getPreviousChatName: () => (/* binding */ getPreviousChatName),
/* harmony export */   gotoPreviousChat: () => (/* binding */ gotoPreviousChat),
/* harmony export */   removeFailedMessages: () => (/* binding */ removeFailedMessages),
/* harmony export */   resetActiveChat: () => (/* binding */ resetActiveChat),
/* harmony export */   resetSuggestions: () => (/* binding */ resetSuggestions),
/* harmony export */   setActiveChat: () => (/* binding */ setActiveChat),
/* harmony export */   setCellError: () => (/* binding */ setCellError),
/* harmony export */   setNotebook: () => (/* binding */ setNotebook),
/* harmony export */   setSuggestionsDataframe: () => (/* binding */ setSuggestionsDataframe),
/* harmony export */   setSuggestionsError: () => (/* binding */ setSuggestionsError),
/* harmony export */   setSuggestionsLoading: () => (/* binding */ setSuggestionsLoading),
/* harmony export */   setTextSelection: () => (/* binding */ setTextSelection),
/* harmony export */   setupInitialRequestState: () => (/* binding */ setupInitialRequestState),
/* harmony export */   showBackButton: () => (/* binding */ showBackButton),
/* harmony export */   submitFeedback: () => (/* binding */ submitFeedback),
/* harmony export */   updateCode: () => (/* binding */ updateCode),
/* harmony export */   updateSuggestions: () => (/* binding */ updateSuggestions)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "../../lib/assistant/node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _api_assistant_request_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/assistant-request-generator */ "../../lib/assistant/lib/api/assistant-request-generator.js");
/* harmony import */ var _utils_code_cleaner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/code-cleaner */ "../../lib/assistant/lib/utils/code-cleaner.js");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! immer */ "../../node_modules/immer/dist/immer.mjs");
/* harmony import */ var _home_screen_state_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home-screen-state-fns */ "../../lib/assistant/lib/store/home-screen-state-fns.js");
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/errors */ "../../lib/assistant/lib/utils/errors.js");
/* harmony import */ var _utils_contextMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/contextMessage */ "../../lib/assistant/lib/utils/contextMessage.js");
/* harmony import */ var _utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/specialPrefixes */ "../../lib/assistant/lib/utils/specialPrefixes.js");









function setNotebook(state, path, nbState) {
    state.path = path;
    state.user = nbState.user;
    const notebook = state.notebooks.find(notebook => notebook.path === path);
    if (notebook) {
        notebook.notebookState.dataframes = nbState.dataframes;
        (0,_home_screen_state_fns__WEBPACK_IMPORTED_MODULE_3__.updateHomeScreenState)(notebook.homeScreen, nbState.dataframes);
    }
    else {
        state.notebooks.push({
            path,
            activeChatKey: null,
            previousChatKey: null,
            chats: {},
            notebookState: {
                dataframes: nbState.dataframes,
                selectedCell: null,
                selectedText: null,
                error: null
            },
            homeScreen: (0,_home_screen_state_fns__WEBPACK_IMPORTED_MODULE_3__.initialHomeScreenState)(nbState.dataframes),
            suggestionState: { loading: false, suggestions: null, dataframe: null, error: null }
        });
    }
    return state;
}
function setActiveChat(state, chatKey) {
    const notebook = getActiveNotebook(state);
    if (notebook) {
        notebook.previousChatKey = notebook.activeChatKey;
        if (chatKey === null) {
            notebook.activeChatKey = null;
        }
        else if (chatKey && notebook.chats[chatKey] != null) {
            notebook.activeChatKey = chatKey;
        }
    }
}
function showBackButton(state) {
    const activeNotebook = getActiveNotebook(state);
    const previousChat = getPreviousChat(state);
    const activeChat = getActiveChat(state);
    const chatStarter = activeNotebook?.homeScreen.selectedChatStarter;
    const isNotSuggestions = chatStarter &&
        chatStarter.name !== 'data-cleaning-suggestions' &&
        chatStarter.name !== 'dataframe-suggestions';
    return Boolean(previousChat && (activeChat || isNotSuggestions));
}
function setupInitialRequestState(state, context, instruction) {
    const chatState = getActiveChat(state);
    state.attachContextOpen = false;
    state.hidePopups = true;
    if (chatState) {
        addNewInstruction(chatState, instruction);
    }
    else {
        setInitialChatState(state, context, instruction);
    }
}
function updateCode(state, response) {
    const { chatState } = (0,_store__WEBPACK_IMPORTED_MODULE_0__.requireChatState)(state);
    if ((0,_api_assistant_request_generator__WEBPACK_IMPORTED_MODULE_1__.hasActiveCodeResponse)(chatState.inProgress)) {
        chatState.inProgress.content = response.content;
        if (response.tokens)
            chatState.tokens = response.tokens;
        if (response.maxTokens)
            chatState.maxTokens = response.maxTokens;
    }
}
function completeRequest(state, onComplete) {
    const { chatState } = (0,_store__WEBPACK_IMPORTED_MODULE_0__.requireChatState)(state);
    const code = (0,_api_assistant_request_generator__WEBPACK_IMPORTED_MODULE_1__.hasActiveCodeResponse)(chatState.inProgress) ? chatState.inProgress.content : '';
    const message_id = (0,_store__WEBPACK_IMPORTED_MODULE_0__.messageId)(chatState.session, chatState.messages.length + 1);
    const content = chatState.inProgress.content;
    if (!content) {
        throw new _utils_errors__WEBPACK_IMPORTED_MODULE_4__.AssistantError('error', 'Missing content', 200);
    }
    chatState.messages.push({
        role: 'assistant',
        content,
        messageId: message_id,
        feedback: null,
        tokens: chatState.tokens ?? 0,
        maxTokens: chatState.maxTokens
    });
    chatState.inProgress = null;
    chatState.lastUpdated = new Date();
    // chatState.session is a wrapped immer proxy at this point, need to unwrap it
    const session = (0,immer__WEBPACK_IMPORTED_MODULE_7__.original)(chatState.session);
    if (onComplete && session) {
        const blocks = (0,_utils_code_cleaner__WEBPACK_IMPORTED_MODULE_2__.extractMessageBlocks)(code);
        const firstCodeBlock = blocks.find(block => block.type === 'python' && block.content !== '');
        if (firstCodeBlock)
            onComplete(firstCodeBlock.content, message_id, session);
    }
}
function cleanupError(state, path, selectedChat, error) {
    const notebook = state.notebooks.find(nb => nb.path === path);
    const chatState = notebook?.chats[selectedChat];
    if (!notebook || !chatState)
        return;
    if (error) {
        chatState.inProgress = error;
    }
    else if (chatState.messages.length === 1) {
        delete notebook.chats[selectedChat];
    }
    else {
        chatState.messages.pop(); // Remove the last instruction
        chatState.inProgress = null;
    }
}
function removeFailedMessages(state) {
    const notebook = getActiveNotebook(state);
    const chatState = getActiveChat(state);
    if (!notebook?.activeChatKey || !chatState || chatState?.inProgress?.type !== 'error')
        return;
    if (chatState.messages.length === 0) {
        delete notebook.chats[notebook.activeChatKey];
    }
    else {
        chatState.messages.pop(); // Remove the last instruction
        chatState.inProgress = null;
    }
}
function resetActiveChat(state) {
    const { notebook, activeChatKey } = (0,_store__WEBPACK_IMPORTED_MODULE_0__.requireChatState)(state);
    delete notebook.chats[activeChatKey];
}
function submitFeedback(state, feedback) {
    const { chatState } = (0,_store__WEBPACK_IMPORTED_MODULE_0__.requireChatState)(state);
    const message = chatState.messages.find(msg => msg.messageId === feedback.messageId);
    if (message?.role === 'assistant')
        message.feedback = feedback;
}
function setCellError(state, outputError) {
    const activeNotebook = getActiveNotebook(state);
    state.hidePopups = false;
    if (activeNotebook)
        activeNotebook.notebookState.error = outputError;
}
function setTextSelection(state, selection) {
    const activeNotebook = getActiveNotebook(state);
    state.hidePopups = false;
    if (activeNotebook)
        activeNotebook.notebookState.selectedText = selection;
}
function setSuggestionsLoading(state, loading) {
    const activeNotebook = getActiveNotebook(state);
    if (activeNotebook) {
        activeNotebook.suggestionState = { ...activeNotebook.suggestionState, loading };
    }
}
function setSuggestionsError(state, error) {
    const activeNotebook = getActiveNotebook(state);
    if (activeNotebook) {
        activeNotebook.suggestionState = { ...activeNotebook.suggestionState, loading: false, error };
    }
}
function setSuggestionsDataframe(state, dataframe) {
    const activeNotebook = getActiveNotebook(state);
    if (activeNotebook) {
        activeNotebook.suggestionState = {
            ...activeNotebook.suggestionState,
            suggestions: null,
            error: null,
            loading: false,
            dataframe
        };
    }
}
function updateSuggestions(state, suggestions) {
    const activeNotebook = getActiveNotebook(state);
    if (activeNotebook) {
        activeNotebook.suggestionState = {
            ...activeNotebook.suggestionState,
            error: null,
            loading: false,
            suggestions: suggestions?.length ? suggestions : activeNotebook.suggestionState.suggestions
        };
    }
}
function resetSuggestions(state) {
    const activeNotebook = getActiveNotebook(state);
    if (activeNotebook) {
        activeNotebook.suggestionState = {
            dataframe: null,
            error: null,
            loading: false,
            suggestions: null
        };
    }
}
function addNewInstruction(chatState, instruction) {
    const { session, messages } = chatState;
    const message_id = (0,_store__WEBPACK_IMPORTED_MODULE_0__.messageId)(session, messages.length + 1);
    const responseMessageId = (0,_store__WEBPACK_IMPORTED_MODULE_0__.messageId)(session, messages.length + 2);
    chatState.messages.push({
        role: 'user',
        content: instruction,
        messageId: message_id,
    });
    chatState.inProgress = { type: 'active', content: '', message_id: responseMessageId };
}
function setInitialChatState(state, context, instruction) {
    const notebook = getActiveNotebook(state);
    const chatKey = (0,uuid__WEBPACK_IMPORTED_MODULE_8__["default"])();
    if (notebook) {
        notebook.chats[chatKey] = initialChatState(state.user || '', chatKey, context, instruction);
        notebook.activeChatKey = chatKey;
    }
}
function initialChatState(user_id, chatKey, context, instruction) {
    const session = { sessionId: (0,uuid__WEBPACK_IMPORTED_MODULE_8__["default"])(), userId: user_id };
    const name = determineChatName(context, instruction);
    return {
        key: chatKey,
        name,
        context,
        messages: [
            {
                role: 'user',
                content: instruction,
                messageId: (0,_store__WEBPACK_IMPORTED_MODULE_0__.messageId)(session, 1),
                tokens: 0
            }
        ],
        inProgress: { type: 'active', content: '', message_id: (0,_store__WEBPACK_IMPORTED_MODULE_0__.messageId)(session, 2) },
        session,
        tokens: 0,
        lastUpdated: new Date(),
        maxTokens: 4096
    };
}
function getActiveChat(state) {
    const notebook = state.notebooks.find(notebook => notebook.path === state.path);
    return notebook?.activeChatKey ? notebook.chats[notebook.activeChatKey] || null : null;
}
function getInProgressResponse(state) {
    const activeChat = getActiveChat(state);
    return activeChat?.inProgress?.type === 'active' ? activeChat.inProgress : null;
}
function getPreviousChat(state) {
    const notebook = state.notebooks.find(notebook => notebook.path === state.path);
    return notebook?.previousChatKey ? notebook.chats[notebook.previousChatKey] || null : null;
}
function getActiveNotebook(state) {
    const notebook = state.notebooks.find(notebook => notebook.path === state.path);
    return notebook || null;
}
function getChatTitle(state) {
    const activeNotebook = getActiveNotebook(state);
    return !activeNotebook ? '' : titleFromChat(getActiveChat(state), activeNotebook);
}
function getIsNewChat(state) {
    const activeNotebook = getActiveNotebook(state);
    return !activeNotebook ? false : !activeNotebook.activeChatKey;
}
function getIsOnChatStarter(state) {
    const activeNotebook = getActiveNotebook(state);
    return !activeNotebook ? false : activeNotebook.homeScreen.selectedChatStarter !== null;
}
function getPreviousChatName(state) {
    const activeNotebook = getActiveNotebook(state);
    if (!activeNotebook)
        return '';
    const chat = getPreviousChat(state);
    return chat ? determineChatName(chat.context, chat.messages[0].content) : '';
}
function gotoPreviousChat(state) {
    const previousChat = getPreviousChat(state);
    setActiveChat(state, previousChat?.key || null);
}
function determineChatName(context, instruction) {
    const suffix = (0,_utils_contextMessage__WEBPACK_IMPORTED_MODULE_5__.formatContextVariables)(context, instruction);
    switch (context.type) {
        case 'graph-dataframe':
            return `Graph ${suffix}`;
        case 'describe-dataframe':
            return `Describe data in ${suffix}`;
        case 'explain-code':
            return `Explain ${suffix}`;
        case 'comment-code':
            return `Comment ${suffix}`;
        case 'improve-code':
            return `Refactor ${suffix}`;
        case 'debug-error':
            return `Debugging ${suffix}`;
        case 'suggestions-chat':
        case 'default-python':
            if (instruction.startsWith(_utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_6__.attachmentMessagePrefix)) {
                return (0,_utils_specialPrefixes__WEBPACK_IMPORTED_MODULE_6__.cleanMessageWithAttachmentPrefix)(instruction);
            }
            else {
                return `${instruction} (using ${suffix})`;
            }
    }
}
function titleFromChat(activeChat, activeNotebook) {
    if (activeChat) {
        return chatTitleFromContext(activeChat.context);
    }
    else if (activeNotebook.homeScreen.selectedChatStarter) {
        return chatTitleFromStarterName(activeNotebook.homeScreen.selectedChatStarter.name);
    }
    else {
        return 'New Chat';
    }
}
function chatTitleFromContext(context) {
    switch (context.type) {
        case 'graph-dataframe':
            return 'Generate graph from a Dataframe';
        case 'describe-dataframe':
            return 'Describe dataframe';
        case 'explain-code':
            return 'Explain code';
        case 'comment-code':
            return 'Comment code';
        case 'improve-code':
            return 'Format code';
        case 'debug-error':
            return 'Debug error';
        case 'suggestions-chat':
            return 'Assistant Suggestions';
        case 'default-python':
            return 'Generate Python code';
    }
}
function chatTitleFromStarterName(name) {
    switch (name) {
        case 'load-volcano-data':
            return 'Volcano data from the Smithsonian Institute';
        case 'plot-fibonacci':
            return 'Plot Fibonacci numbers';
        case 'mask-emails':
            return 'Mask emails';
        case 'load-a-dataframe':
            return 'Load a DataFrame';
        case 'describe-dataframe':
            return 'Describe DataFrame';
        case 'graph-dataframe':
            return 'Generate graph from a DataFrame';
        case 'data-cleaning-suggestions':
            return 'Suggestions for cleaning data';
        case 'dataframe-suggestions':
            return 'Suggestions for working with DataFrames';
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/store/store.js":
/*!**********************************************!*\
  !*** ../../lib/assistant/lib/store/store.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STATE_VERSION: () => (/* binding */ STATE_VERSION),
/* harmony export */   messageId: () => (/* binding */ messageId),
/* harmony export */   requireChatState: () => (/* binding */ requireChatState),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! zustand */ "../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! zustand/middleware */ "../../node_modules/zustand/esm/middleware.mjs");
/* harmony import */ var zustand_middleware_immer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! zustand/middleware/immer */ "../../node_modules/zustand/esm/middleware/immer.mjs");
/* harmony import */ var _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @anaconda/assistant-sdk */ "../../lib/assistant-sdk/lib/index.js");
/* harmony import */ var _state_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/errors */ "../../lib/assistant/lib/utils/errors.js");
/* harmony import */ var _api_feedback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/feedback */ "../../lib/assistant/lib/api/feedback.js");
/* harmony import */ var _api_assistant_request_generator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/assistant-request-generator */ "../../lib/assistant/lib/api/assistant-request-generator.js");
/* harmony import */ var _home_screen_state_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home-screen-state-fns */ "../../lib/assistant/lib/store/home-screen-state-fns.js");
/* harmony import */ var _rehydration_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rehydration-utils */ "../../lib/assistant/lib/store/rehydration-utils.js");
/* harmony import */ var _test_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./test-storage */ "../../lib/assistant/lib/store/test-storage.js");
/* harmony import */ var _suggestions_fns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./suggestions-fns */ "../../lib/assistant/lib/store/suggestions-fns.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../config */ "../../lib/assistant/lib/config.js");
/* harmony import */ var _utils_nucleus_account__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/nucleus/account */ "../../lib/assistant/lib/utils/nucleus/account.js");
/* harmony import */ var _utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/nucleus/accountUtils */ "../../lib/assistant/lib/utils/nucleus/accountUtils.js");
/* harmony import */ var _utils_environmentType__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/environmentType */ "../../lib/assistant/lib/utils/environmentType.js");
/* harmony import */ var _assistant_sdk__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../assistant-sdk */ "../../lib/assistant/lib/assistant-sdk.js");
/* harmony import */ var _jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../jupyter/syncStateDebounced */ "../../lib/assistant/lib/jupyter/syncStateDebounced.js");


















const STATE_VERSION = 9;
// The abortController is used to ensure we only have one in-flight request at a time
let abortController = null;
/**
 * This is where we define our global Zustand store. All actions that modify the store are also
 * defined here. We use the immer middleware to allow us to use immutable state in a more ergonomic way
 *
 * The store describes all the state of the application and the actions that can be taken to modify that state.
 * As such you should try and ensure to keep the store as clean as possible and extract any logic to external functions
 * such as the state-fns.ts file.
 *
 * In practice these external functions will be pure functions, since we are passing an immer 'draft' state to them
 * In the function, you can mutate the state as if it were mutable, and immer will take care of creating a new state
 *
 */
const useStore = (0,zustand__WEBPACK_IMPORTED_MODULE_15__.create)((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_16__.persist)((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_16__.devtools)((0,zustand_middleware_immer__WEBPACK_IMPORTED_MODULE_17__.immer)((set, get) => ({
    access: true,
    terms: {
        accepted: false,
        version: null
    },
    serverUrl: null,
    notebooks: [],
    path: null,
    settings: {
        enableDataCollection: false,
        open: false,
        addCodeToNotebook: null
    },
    user: null,
    account: null,
    menuOpen: false,
    attachContextOpen: false,
    setServerUrl: async () => {
        let _serverUrl = null;
        try {
            _serverUrl = await (0,_config__WEBPACK_IMPORTED_MODULE_9__.getServerUrl)();
        }
        catch (e) {
            console.error('Error getting server url', e);
        }
        if (!_serverUrl) {
            set(state => void (state.serverUrl = _serverUrl));
        }
    },
    setPath: (path, nbState) => {
        if (path !== get().path && abortController) {
            abortController.abort();
            get().resetToHomeScreen();
        }
        set(state => (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setNotebook)(state, path, nbState));
    },
    setAccess: (access) => {
        set(state => {
            if (!access) {
                state.logout();
            }
            else {
                state.access = true;
            }
        }, true);
    },
    setTermsVersion: (version) => {
        set(state => void (state.terms.version = version));
    },
    acceptTerms: (version, accepted) => {
        set(state => {
            state.terms.accepted = accepted;
            // Ensure that other copies of the app also accept terms and conditions.
            // We'll leave rejecting T&C to the API call that checks for the version on load.
            if (accepted) {
                (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_14__.syncDiskStateChained)(accepted);
            }
        });
    },
    updateAccount: async () => {
        if ((0,_utils_environmentType__WEBPACK_IMPORTED_MODULE_12__.isLocalDev)())
            return;
        const account = await (0,_utils_nucleus_account__WEBPACK_IMPORTED_MODULE_10__.getNucleusAccount)();
        const maxTokens = await (0,_utils_nucleus_accountUtils__WEBPACK_IMPORTED_MODULE_11__.getAccountMaxTokens)(account);
        set(state => {
            state.account = account;
            const activeChat = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveChat)(state);
            if (!activeChat)
                return;
            activeChat.maxTokens = maxTokens;
        }, true);
    },
    selectChatStarter: (chatStarter) => {
        set(state => (0,_home_screen_state_fns__WEBPACK_IMPORTED_MODULE_5__.selectChatStarter)(state, chatStarter));
    },
    resetToHomeScreen: () => {
        abortController?.abort();
        get().setAttachContextOpen(false);
        get().setHidePopups(true);
        set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.resetSuggestions)(state));
        set(state => (0,_home_screen_state_fns__WEBPACK_IMPORTED_MODULE_5__.resetToHomeScreen)(state));
    },
    setActiveChat: (chatKey) => {
        abortController?.abort();
        set(state => (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setActiveChat)(state, chatKey));
    },
    setMenuOpen: (menuOpen) => {
        set(state => void (state.menuOpen = menuOpen));
    },
    setCellError: (error) => {
        set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setCellError)(state, error));
    },
    setTextSelection: (selection) => {
        set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setTextSelection)(state, selection));
    },
    updateSuggestions: async (activeCell, type, dataframe) => {
        set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setSuggestionsLoading)(state, true));
        try {
            const suggestions = await (0,_suggestions_fns__WEBPACK_IMPORTED_MODULE_8__.getSuggestions)(get(), activeCell, type, dataframe);
            set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.updateSuggestions)(state, suggestions));
        }
        catch (e) {
            set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setSuggestionsLoading)(state, false));
            set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setSuggestionsError)(state, e.message));
        }
    },
    setSuggestionsDataframe: (dataframe) => {
        set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setSuggestionsDataframe)(state, dataframe));
    },
    toggleMenuOpen: () => {
        set(state => void (state.menuOpen = !state.menuOpen));
    },
    setAttachContextOpen: (attachContextOpen) => {
        set(state => {
            state.hidePopups = false;
            state.attachContextOpen = attachContextOpen;
        });
    },
    addInstruction: async ({ instruction }) => {
        const chat = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveChat)(get());
        const context = chat ? chat.context : { type: 'default-python', variables: {} };
        await get().makeChatRequest({ context, instruction });
    },
    makeChatRequest: async ({ context, instruction }) => {
        abortController = new AbortController();
        set(state => (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.setupInitialRequestState)(state, context, instruction));
        const { path, activeChatKey } = requireChatState(get());
        const sdk = (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_13__.getAssistantSdk)();
        const request = (0,_api_assistant_request_generator__WEBPACK_IMPORTED_MODULE_4__.generateRequest)(get());
        try {
            for await (const code of sdk.streamResponse(request, { abortController })) {
                set(state => (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.updateCode)(state, code));
            }
            set(state => (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.completeRequest)(state, () => {
                // Sync the latest messages from the active chat up to the disk state
                (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_14__.syncDiskStateChained)();
            }));
        }
        catch (e) {
            console.error('Error making chat request', e);
            const error = refineError(e, instruction);
            set(state => (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.cleanupError)(state, path, activeChatKey, error));
        }
        finally {
            abortController = null;
        }
    },
    addSyncedChats: (notebook, chats) => {
        if (!(notebook && notebook.path))
            return;
        let findNotebook = (state) => state.notebooks.find(nb => nb.path === notebook.path);
        for (const chat of chats) {
            set(state => {
                let _foundNotebook = findNotebook(state);
                if (!_foundNotebook) {
                    console.log(`Adding notebook ${notebook.path} to state after sync`);
                    state.notebooks.push(notebook);
                    _foundNotebook = notebook;
                }
                // Only add the chat if it doesn't already exist
                if (!_foundNotebook.chats[chat.key]) {
                    _foundNotebook.chats[chat.key] = chat;
                }
            });
        }
    },
    resetActiveChat: () => {
        abortController?.abort();
        const chat = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveChat)(get());
        set(state => (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.resetActiveChat)(state));
        if (chat && chat.messages.length > 0)
            get().makeChatRequest({ context: chat.context, instruction: chat.messages[0].content });
    },
    deleteMessagesStartingWith: (message_id) => {
        set(state => {
            const activeChat = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveChat)(state);
            if (!activeChat)
                return;
            const index = activeChat.messages.findIndex(msg => msg.messageId === message_id);
            activeChat.messages = activeChat.messages.slice(0, index);
            activeChat.tokens = activeChat.messages[activeChat.messages.length - 1].tokens || 0;
        });
    },
    submitFeedback: async (feedback) => {
        set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.submitFeedback)(state, feedback));
        const session = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveChat)(get())?.session;
        if (session)
            await (0,_api_feedback__WEBPACK_IMPORTED_MODULE_3__.postFeedback)({ session, feedback });
    },
    retryError: () => {
        const chatState = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveChat)(get());
        if (chatState?.inProgress?.type === 'error') {
            const instruction = chatState.inProgress.failingInstruction;
            const context = chatState.context;
            set(state => (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.removeFailedMessages)(state));
            get().makeChatRequest({ context, instruction });
        }
    },
    gotoPreviousChat: () => {
        set(state => void (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.gotoPreviousChat)(state));
    },
    toggleSettings: () => {
        set(state => void (state.settings.open = !state.settings.open));
    },
    setEnableDataCollection: (enableDataCollection) => {
        const sdk = (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_13__.getAssistantSdk)();
        if (enableDataCollection) {
            sdk.enableDataCollection();
        }
        else {
            sdk.disableDataCollection();
        }
        set(state => void (state.settings.enableDataCollection = enableDataCollection));
    },
    setAddCodeToNotebook: (addCodeToNotebook) => {
        set(state => void (state.settings.addCodeToNotebook = addCodeToNotebook));
    },
    deleteChat: (chatKey) => {
        set(state => {
            const notebook = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveNotebook)(state);
            if (notebook && notebook.activeChatKey !== chatKey) {
                delete notebook.chats[chatKey];
                return state;
            }
        });
    },
    setHidePopups: (hidePopups) => {
        set(state => {
            state.hidePopups = hidePopups;
            state.attachContextOpen = false;
        });
    },
    logout: () => {
        set(state => {
            (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_14__.unbindSyncDiskStateChained)();
            state.account = null;
            state.user = null;
            state.terms.accepted = false;
            state.terms.version = null;
            state.settings.open = false;
            state.settings.enableDataCollection = false;
            const notebook = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveNotebook)(state);
            state.notebooks = [
                {
                    ...notebook,
                    path: notebook?.path,
                    activeChatKey: null,
                    previousChatKey: null,
                    chats: {},
                    notebookState: {
                        dataframes: [],
                        selectedCell: null,
                        selectedText: null,
                        error: null
                    },
                    suggestionState: {
                        loading: false,
                        suggestions: null,
                        dataframe: null,
                        error: null
                    },
                    homeScreen: {
                        chatStarters: notebook?.homeScreen.chatStarters,
                        selectedChatStarter: null
                    }
                }
            ];
            return state;
        }, true);
    }
})), { enabled: "development" === 'development' } // Only enable devtools in development
), {
    name: 'anaconda-assistant',
    version: STATE_VERSION,
    storage: (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_16__.createJSONStorage)(() => ((0,_test_storage__WEBPACK_IMPORTED_MODULE_7__.isTestMode)() ? (0,_test_storage__WEBPACK_IMPORTED_MODULE_7__.createTestStorage)() : localStorage)),
    onRehydrateStorage: () => _rehydration_utils__WEBPACK_IMPORTED_MODULE_6__.updateStoreState
}));
function requireChatState(state) {
    const notebook = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveNotebook)(state);
    const chatState = (0,_state_fns__WEBPACK_IMPORTED_MODULE_1__.getActiveChat)(state);
    const { path, settings } = state;
    if (!notebook?.activeChatKey || !chatState || !path)
        throw new Error('No active chat');
    const { activeChatKey } = notebook;
    return { notebook, chatState, activeChatKey: activeChatKey, path, settings };
}
function messageId(session, messageIdx) {
    return `${session.sessionId}-${messageIdx}`;
}
function refineError(e, instruction) {
    if (abortController?.signal.aborted) {
        return null; // In this case we don't want to show an error
    }
    const name = e.name;
    const isKnownError = [
        _utils_errors__WEBPACK_IMPORTED_MODULE_2__.ASSISTANT_ERROR,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_API_ERROR_NAME,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_API_NETWORK_ERROR_NAME,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_API_SERVER_ERROR_NAME,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_API_INVALID_RESPONSE_ERROR_NAME,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_API_UNKNOWN_ERROR_NAME,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_SDK_ERROR_NAME,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_SDK_INVALID_VERSION_ERROR_NAME,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_SDK_INVALID_API_URL_ERROR_NAME,
        _anaconda_assistant_sdk__WEBPACK_IMPORTED_MODULE_0__.ASSISTANT_SDK_UNKNOWN_ERROR_NAME
    ].includes(name);
    return {
        type: 'error',
        errorType: isKnownError ? e.type : 'unknown',
        status: isKnownError ? e.status : 0,
        message: isKnownError ? e.message : 'An unknown error occurred',
        failingInstruction: instruction || ''
    };
}


/***/ }),

/***/ "../../lib/assistant/lib/store/suggestions-fns.js":
/*!********************************************************!*\
  !*** ../../lib/assistant/lib/store/suggestions-fns.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSuggestions: () => (/* binding */ getSuggestions)
/* harmony export */ });
/* harmony import */ var _state_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state-fns */ "../../lib/assistant/lib/store/state-fns.js");
/* harmony import */ var _assistant_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assistant-sdk */ "../../lib/assistant/lib/assistant-sdk.js");


// Store an abort controller per path
const abortControllers = {};
async function getSuggestions(state, activeCell, type, dataframe) {
    const activeNotebook = (0,_state_fns__WEBPACK_IMPORTED_MODULE_0__.getActiveNotebook)(state);
    const activeChat = (0,_state_fns__WEBPACK_IMPORTED_MODULE_0__.getActiveChat)(state);
    return activeNotebook && (!activeChat || !abortControllers[activeNotebook.path])
        ? _getSuggestions({
            state,
            activeNotebook,
            activeChat,
            activeCell,
            type,
            dataframe
        })
        : null;
}
async function _getSuggestions(params) {
    const { state, activeNotebook, activeChat, activeCell, type, dataframe } = params;
    if (!state.user) {
        throw new Error('User is not logged in');
    }
    try {
        const abortController = new AbortController();
        abortControllers[activeNotebook.path] = abortController;
        const sdk = (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_1__.getAssistantSdk)();
        return await sdk.fetchSuggestions({
            session: activeChat?.session || {
                userId: state.user,
                // TODO: This is a legacy session ID that we should remove
                // once we make suggestions create a new chat before fetching.
                // Attempting to do so today causes an error which says that the list of chats cannot be modified.
                // This is due to where I was trying to modify the chats.
                // I will deal with this after the release.
                sessionId: 'LEGACY_SUGGESTIONS'
            },
            type,
            variables: {
                code_cell: activeCell,
                name: dataframe?.name || '',
                dtypes_str: dataframe?.dtypesStr || ''
            }
        }, { abortController });
    }
    catch (e) {
        console.error('Error fetching suggestions', e);
        throw e;
    }
    finally {
        // Remove the abort controller
        abortControllers[activeNotebook.path] = null;
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/store/test-storage.js":
/*!*****************************************************!*\
  !*** ../../lib/assistant/lib/store/test-storage.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTestStorage: () => (/* binding */ createTestStorage),
/* harmony export */   isTestMode: () => (/* binding */ isTestMode)
/* harmony export */ });
const items = {};
function isTestMode() {
    return typeof localStorage === 'undefined';
}
function createTestStorage() {
    return {
        getItem: (name) => {
            return items[name] ? JSON.parse(items[name]) : null;
        },
        setItem: (name, value) => {
            items[name] = JSON.stringify(value);
        },
        removeItem: (name) => {
            delete items[name];
        }
    };
}


/***/ }),

/***/ "../../lib/assistant/lib/types.js":
/*!****************************************!*\
  !*** ../../lib/assistant/lib/types.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ADD_CODE_TO_NOTEBOOK_TYPES: () => (/* binding */ ADD_CODE_TO_NOTEBOOK_TYPES)
/* harmony export */ });
const ADD_CODE_TO_NOTEBOOK_TYPES = [
    'below-active-cell',
    'at-end-of-notebook',
    'in-place'
];


/***/ }),

/***/ "../../lib/assistant/lib/utils/code-cleaner.js":
/*!*****************************************************!*\
  !*** ../../lib/assistant/lib/utils/code-cleaner.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractMessageBlocks: () => (/* binding */ extractMessageBlocks)
/* harmony export */ });
const extractPartsRegex = /\n?``` ?(python)?\n?/gms;
function extractMessageBlocks(message) {
    const matches = message.matchAll(extractPartsRegex);
    const blocks = [];
    let currentIdx = 0;
    let currentType = 'text';
    for (const match of matches) {
        if (match.index !== undefined && match.index !== -1) {
            const part = message.substring(currentIdx, match.index);
            blocks.push({ type: currentType, content: part });
            currentIdx = match.index + match[0].length;
            currentType = currentType === 'text' ? (match[1] === 'python' ? 'python' : 'output') : 'text';
        }
    }
    if (currentIdx < message.length)
        blocks.push({ type: currentType, content: message.substring(currentIdx) });
    return blocks.filter(block => block.content !== '');
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/contextMessage.js":
/*!*******************************************************!*\
  !*** ../../lib/assistant/lib/utils/contextMessage.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatContextVariables: () => (/* binding */ formatContextVariables)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _specialPrefixes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./specialPrefixes */ "../../lib/assistant/lib/utils/specialPrefixes.js");


function formatContextVariables(context, content) {
    const contextMessages = [];
    switch (context.type) {
        case 'graph-dataframe':
        case 'describe-dataframe':
            contextMessages.push(`dataframe ${context.variables.dataframe.name}`);
            break;
        case 'explain-code':
        case 'comment-code':
        case 'improve-code':
            if (context.variables.selected_code) {
                contextMessages.push('selected code');
            }
            break;
        case 'debug-error':
            if (context.variables.error_cell_code) {
                contextMessages.push('error cell');
            }
            if (context.variables.error_output) {
                contextMessages.push(`error output: ${(0,lodash__WEBPACK_IMPORTED_MODULE_0__.truncate)(context.variables.error_output, { length: 100 })}`);
            }
            break;
        case 'suggestions-chat':
            if (context.variables.code_cell) {
                contextMessages.push('active code cell');
            }
            if (context.variables.name) {
                contextMessages.push(`dataframe ${context.variables.name}`);
            }
            break;
        case 'default-python':
        default:
            if (content.startsWith(_specialPrefixes__WEBPACK_IMPORTED_MODULE_1__.attachmentMessagePrefix)) {
                return '';
            }
            else {
                contextMessages.push('no context from Notebook');
            }
            break;
    }
    if (contextMessages.length === 0) {
        return '';
    }
    if (contextMessages.length === 1) {
        return contextMessages[0];
    }
    return `${contextMessages.slice(0, -1).join(', ')} and ${contextMessages.slice(-1)}`;
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/dataframe-checker.js":
/*!**********************************************************!*\
  !*** ../../lib/assistant/lib/utils/dataframe-checker.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dataFrameCheckerPython: () => (/* binding */ dataFrameCheckerPython),
/* harmony export */   parsePythonResult: () => (/* binding */ parsePythonResult)
/* harmony export */ });
function parsePythonResult(result) {
    try {
        if (typeof result !== 'string')
            return null;
        const stripped = result.replace(/^'/, '').replace(/'$/, '');
        return JSON.parse(stripped);
    }
    catch (e) {
        console.error('Could not parse variables', e);
        return null;
    }
}
const dataFrameCheckerPython = `
import json
import getpass
import hashlib

def import_pandas_safely():
    try:
        return __import__('pandas')
    except ImportError:
        return False


__pandas = import_pandas_safely()


def is_data_frame(v: str):
    obj = eval(v)
    if  isinstance(obj, __pandas.core.frame.DataFrame) or isinstance(obj, __pandas.core.series.Series):
        return True


def dataframe_columns(var):
    df = eval(var)
    if isinstance(df, __pandas.core.series.Series):
        return [[df.name, str(df.dtype)]]
    return list(map(lambda col: [col, str(df[col].dtype)], df.columns))


def dtypes_str(frame):
    return str(eval(frame).dtypes)

def dataframe_hash(var):
    # Return a hash including the column names and number of rows 
    df = eval(var)
    if isinstance(df, __pandas.core.series.Series):
        return hashlib.sha256(f"{var}-{df.name},{len(df)}".encode('utf-8')).hexdigest()
    return hashlib.sha256(f"{var}-{','.join(df.columns)},{len(df)}".encode('utf-8')).hexdigest()

def get_dataframes():
    if __pandas is None:
        return []
    user = getpass.getuser()
    values = %who_ls
    dataframes = [
        {
            "name": var,
            "type": type(eval(var)).__name__,
            "hash": dataframe_hash(var),
            "cols": dataframe_columns(var),
            "dtypesStr": dtypes_str(var),
        }
        for var in values if is_data_frame(var)
    ]
    result = {"dataframes": dataframes, "user": user}
    return json.dumps(result, ensure_ascii=False)


get_dataframes()
`;


/***/ }),

/***/ "../../lib/assistant/lib/utils/environmentType.js":
/*!********************************************************!*\
  !*** ../../lib/assistant/lib/utils/environmentType.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClientSource: () => (/* binding */ getClientSource),
/* harmony export */   isCloudNotebooks: () => (/* binding */ isCloudNotebooks),
/* harmony export */   isEnterpriseNotebooks: () => (/* binding */ isEnterpriseNotebooks),
/* harmony export */   isEnterpriseNotebooksDev: () => (/* binding */ isEnterpriseNotebooksDev),
/* harmony export */   isLocalDev: () => (/* binding */ isLocalDev),
/* harmony export */   isLocalNotebooks: () => (/* binding */ isLocalNotebooks),
/* harmony export */   isLocalNotebooksDev: () => (/* binding */ isLocalNotebooksDev)
/* harmony export */ });
/* harmony import */ var _jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jupyter/extension-load-utils */ "../../lib/assistant/lib/jupyter/extension-load-utils.js");

function getEnvironmentType() {
    const environmentType = _jupyter_extension_load_utils__WEBPACK_IMPORTED_MODULE_0__.sharedCore.getCoreReady().config.assistant.environmentType;
    return environmentType;
}
function isLocalDev() {
    return getEnvironmentType() === 'local-dev';
}
function isLocalNotebooks() {
    return getEnvironmentType() === 'local-notebooks-prod' || isLocalNotebooksDev();
}
function isLocalNotebooksDev() {
    return getEnvironmentType() === 'local-notebooks-dev';
}
function isCloudNotebooks() {
    return getEnvironmentType() === 'cloud-notebooks-prod';
}
function isEnterpriseNotebooksDev() {
    return getEnvironmentType() === 'enterprise-notebooks-dev';
}
function isEnterpriseNotebooks() {
    return getEnvironmentType() === 'enterprise-notebooks-prod' || isEnterpriseNotebooksDev();
}
function getClientSource() {
    if (isLocalDev())
        return 'anaconda-local-dev';
    if (isCloudNotebooks())
        return 'anaconda-cloud-notebooks-prod';
    if (isLocalNotebooksDev())
        return 'anaconda-local-notebooks-dev';
    if (isLocalNotebooks())
        return 'anaconda-local-notebooks-prod';
    if (isEnterpriseNotebooksDev())
        return 'anaconda-enterprise-notebooks-dev';
    if (isEnterpriseNotebooks())
        return 'anaconda-enterprise-notebooks-prod';
    return 'unknown';
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/errors.js":
/*!***********************************************!*\
  !*** ../../lib/assistant/lib/utils/errors.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ASSISTANT_ERROR: () => (/* binding */ ASSISTANT_ERROR),
/* harmony export */   AssistantError: () => (/* binding */ AssistantError)
/* harmony export */ });
const ASSISTANT_ERROR = 'ASSISTANT_ERROR';
class AssistantError extends Error {
    constructor(type, message, status) {
        super(message);
        this.name = ASSISTANT_ERROR;
        this.status = status;
        this.type = type;
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/getCookies.js":
/*!***************************************************!*\
  !*** ../../lib/assistant/lib/utils/getCookies.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCookies: () => (/* binding */ getCookies)
/* harmony export */ });
let cachedCookies = null;
function getCookies() {
    if (cachedCookies) {
        return cachedCookies;
    }
    if (typeof document === 'undefined') {
        return {};
    }
    const pairs = document.cookie.split(';');
    const cookies = {};
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
    }
    cachedCookies = cookies;
    return cookies;
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/launchdarkly/constants.js":
/*!***************************************************************!*\
  !*** ../../lib/assistant/lib/utils/launchdarkly/constants.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ENV: () => (/* binding */ ENV)
/* harmony export */ });
function getHostName() {
    if (typeof window === 'undefined') {
        return 'anaconda.cloud';
    }
    return window.location.host.replace(/^nb\./, '');
}
const ENV = {
    PROD: {
        LEGACY_CLOUD_API_BASE_URL: 'https://anaconda.cloud/api',
        CLOUD_API_BASE_URL: `https://${getHostName()}/api`,
        LD_CLIENT_SIDE_ID: '6408b2b7e550011343183538',
        DATADOG_CLIENT_TOKEN: 'pub2b6467ca1f0ee597585d8a8bf43d523f'
    }
};


/***/ }),

/***/ "../../lib/assistant/lib/utils/launchdarkly/handler.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant/lib/utils/launchdarkly/handler.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getJson: () => (/* binding */ getJson),
/* harmony export */   getJsonFromExtension: () => (/* binding */ getJsonFromExtension),
/* harmony export */   requestAPI: () => (/* binding */ requestAPI)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
async function requestAPI(endPoint = '', init = {}) {
    // Make request to Jupyter API
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
    const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, 
    // TODO: Move this to a configuration outside of the shared code
    'aext_assistant_server', // API Namespace
    endPoint);
    let response;
    try {
        response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.NetworkError(error);
    }
    let data = await response.text();
    if (data.length > 0) {
        try {
            data = JSON.parse(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    if (!response.ok) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, data.message || data);
    }
    return data;
}
async function getJson(response) {
    if (!response.ok) {
        try {
            const text = await response.text();
            return Promise.reject(`Failed with status ${response.status} and body ${text}`);
        }
        catch (e) {
            return Promise.reject(`Failed with status ${response.status}`);
        }
    }
    return response.json();
}
async function getJsonFromExtension(response) {
    if (response.remote_status_code < 200 || response.remote_status_code >= 300) {
        throw new Error(`Failed with status ${response.remote_status_code} and body ${response.remote_data}`);
    }
    return response.remote_data;
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/nucleus/account.js":
/*!********************************************************!*\
  !*** ../../lib/assistant/lib/utils/nucleus/account.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearNucleusAccountPromise: () => (/* binding */ clearNucleusAccountPromise),
/* harmony export */   getNucleusAccount: () => (/* binding */ getNucleusAccount)
/* harmony export */ });
/* harmony import */ var _launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../launchdarkly/handler */ "../../lib/assistant/lib/utils/launchdarkly/handler.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ "../../lib/assistant/lib/utils/nucleus/auth.js");


/**
 * Returns the Nucleus account of the current user.
 * This function is memoized, so it will only make one request to the server
 * until the page is reloaded.
 */
let nucleusAccountPromise = null;
function getNucleusAccount() {
    if (nucleusAccountPromise) {
        return nucleusAccountPromise;
    }
    nucleusAccountPromise = (async () => {
        const accessToken = await (0,_auth__WEBPACK_IMPORTED_MODULE_1__.getAccessToken)();
        if (!accessToken) {
            throw new Error('No access token');
        }
        const accountResponse = await (0,_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__.requestAPI)('nucleus_user', {
            headers: { 'X-Nucleus-Token': accessToken.accessToken }
        });
        return await (0,_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__.getJsonFromExtension)(accountResponse);
    })();
    return nucleusAccountPromise;
}
/**
 * Clears the memoized Nucleus account.
 */
function clearNucleusAccountPromise() {
    nucleusAccountPromise = null;
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/nucleus/accountUtils.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant/lib/utils/nucleus/accountUtils.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PRO_TIER_SUBSCRIPTIONS: () => (/* binding */ PRO_TIER_SUBSCRIPTIONS),
/* harmony export */   STARTER_TIER_SUBSCRIPTION: () => (/* binding */ STARTER_TIER_SUBSCRIPTION),
/* harmony export */   getAccountMaxTokens: () => (/* binding */ getAccountMaxTokens),
/* harmony export */   getIsProTier: () => (/* binding */ getIsProTier),
/* harmony export */   getIsStarterTier: () => (/* binding */ getIsStarterTier),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   shareJupyterFrontEndWithLogin: () => (/* binding */ shareJupyterFrontEndWithLogin)
/* harmony export */ });
/* harmony import */ var _launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../launchdarkly/handler */ "../../lib/assistant/lib/utils/launchdarkly/handler.js");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/store */ "../../lib/assistant/lib/store/store.js");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./account */ "../../lib/assistant/lib/utils/nucleus/account.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth */ "../../lib/assistant/lib/utils/nucleus/auth.js");
/* harmony import */ var _assistant_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assistant-sdk */ "../../lib/assistant/lib/assistant-sdk.js");
/* harmony import */ var _api_terms_and_conditions_version__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api/terms-and-conditions-version */ "../../lib/assistant/lib/api/terms-and-conditions-version.js");
/* harmony import */ var _jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../jupyter/syncStateDebounced */ "../../lib/assistant/lib/jupyter/syncStateDebounced.js");
/* harmony import */ var _jupyter_syncDiskState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../jupyter/syncDiskState */ "../../lib/assistant/lib/jupyter/syncDiskState.js");








const PRO_TIER_SUBSCRIPTIONS = [
    'commercial_subscription',
    'security_subscription',
    'enterprise_subscription'
];
const STARTER_TIER_SUBSCRIPTION = 'starter_subscription';
const defaultMaxTokens = 4096;
async function getAccountMaxTokens(account) {
    if (getIsProTier(account)) {
        return 16384;
    }
    return defaultMaxTokens;
}
function getIsProTier(account) {
    if (!account) {
        return false;
    }
    const subscription = account.subscriptions;
    if (!subscription.length) {
        return false;
    }
    const productCodes = subscription.map(sub => sub.product_code);
    return productCodes.some(code => PRO_TIER_SUBSCRIPTIONS.includes(code));
}
function getIsStarterTier(account) {
    if (!account) {
        return false;
    }
    const subscription = account.subscriptions;
    if (!subscription.length) {
        return false;
    }
    const productCodes = subscription.map(sub => sub.product_code);
    return productCodes.some(code => code === STARTER_TIER_SUBSCRIPTION);
}
/**
 * Logs out the current user.
 */
async function logout(message) {
    if (window.confirm(message ||
        'Are you sure you want to log out? Logging out will remove all your Anaconda Assistant data.')) {
        try {
            await (0,_jupyter_syncDiskState__WEBPACK_IMPORTED_MODULE_7__.clearDiskState)();
        }
        catch (e) {
            console.error('Error clearing disk state', e);
        }
        (0,_account__WEBPACK_IMPORTED_MODULE_2__.clearNucleusAccountPromise)();
        (0,_auth__WEBPACK_IMPORTED_MODULE_3__.clearTokenPromise)();
        try {
            await (0,_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__.requestAPI)('logout');
        }
        catch (e) {
            console.error('Error logging out', e);
        }
        _store_store__WEBPACK_IMPORTED_MODULE_1__.useStore.getState().logout();
    }
}
/**
 * Logs in the current user.
 */
async function login() {
    (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_6__.unbindSyncDiskStateChained)();
    (0,_account__WEBPACK_IMPORTED_MODULE_2__.clearNucleusAccountPromise)();
    (0,_auth__WEBPACK_IMPORTED_MODULE_3__.clearTokenPromise)();
    await (0,_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__.requestAPI)('login');
    const accessToken = await (0,_auth__WEBPACK_IMPORTED_MODULE_3__.getAccessToken)();
    if (!accessToken) {
        return logout();
    }
    const sdk = (0,_assistant_sdk__WEBPACK_IMPORTED_MODULE_4__.getAssistantSdk)();
    sdk.accessToken.setAccessToken(accessToken);
    const version = await (0,_api_terms_and_conditions_version__WEBPACK_IMPORTED_MODULE_5__.fetchTermsAndConditionsVersion)();
    const state = _store_store__WEBPACK_IMPORTED_MODULE_1__.useStore.getState();
    state.setAccess(Boolean(version));
    await state.updateAccount();
    const app = _jupyterFrontEnd;
    if (!app) {
        console.error('Could not find Jupyter Front End');
        return;
    }
    const context = app.shell.currentWidget?.context;
    const factoryName = context?.factoryName;
    const isNotebook = factoryName && factoryName.toLowerCase() === 'notebook';
    if (!isNotebook && _store_store__WEBPACK_IMPORTED_MODULE_1__.useStore.getState().account) {
        // If the user already logged in, but the current widget is not a notebook,
        // we must create a notebook.
        // The only view that works without a notebook is the login view.
        await app.commands.execute('notebook:create-new');
    }
    await (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_6__.syncDiskStateChained)();
    state.resetToHomeScreen();
    (0,_jupyter_syncStateDebounced__WEBPACK_IMPORTED_MODULE_6__.bindSyncDiskStateChained)();
}
let _jupyterFrontEnd = null;
function shareJupyterFrontEndWithLogin(jupyterFrontEnd) {
    _jupyterFrontEnd = jupyterFrontEnd;
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/nucleus/auth.js":
/*!*****************************************************!*\
  !*** ../../lib/assistant/lib/utils/nucleus/auth.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearTokenPromise: () => (/* binding */ clearTokenPromise),
/* harmony export */   getAccessToken: () => (/* binding */ getAccessToken),
/* harmony export */   getNucleusAccessToken: () => (/* binding */ getNucleusAccessToken)
/* harmony export */ });
/* harmony import */ var _launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../launchdarkly/handler */ "../../lib/assistant/lib/utils/launchdarkly/handler.js");
/* harmony import */ var _launchdarkly_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../launchdarkly/constants */ "../../lib/assistant/lib/utils/launchdarkly/constants.js");
/* harmony import */ var _getCookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getCookies */ "../../lib/assistant/lib/utils/getCookies.js");
/* harmony import */ var _environmentType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environmentType */ "../../lib/assistant/lib/utils/environmentType.js");




let statePromise = null;
const authenticationMethod = [
    {
        unavailable: false,
        getUrl: () => `${_launchdarkly_constants__WEBPACK_IMPORTED_MODULE_1__.ENV.PROD.LEGACY_CLOUD_API_BASE_URL}/iam/token`,
        getOptions: () => ({
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ grant_type: 'refresh_token' })
        })
    },
    {
        unavailable: false,
        getUrl: () => `${_launchdarkly_constants__WEBPACK_IMPORTED_MODULE_1__.ENV.PROD.CLOUD_API_BASE_URL}/iam/token`,
        getOptions: () => ({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token: (0,_getCookies__WEBPACK_IMPORTED_MODULE_2__.getCookies)().refresh_token
            })
        })
    }
];
async function initState() {
    let tokenResponse = null;
    for (const method of authenticationMethod) {
        if (method.unavailable) {
            continue;
        }
        console.log('[Assistant] Trying to get access token from', method.getUrl());
        try {
            tokenResponse = await fetch(method.getUrl(), method.getOptions());
            if (tokenResponse.status === 200) {
                break;
            }
        }
        catch (e) {
            console.error(e);
            method.unavailable = true;
        }
    }
    if (!tokenResponse || tokenResponse.status !== 200) {
        throw new Error('Unable to get access token');
    }
    const { access_token, expires_in } = await (0,_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__.getJson)(tokenResponse);
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expires_in);
    return { token: access_token, expires };
}
let tokenPromise = null;
function getNucleusAccessToken(path) {
    if (tokenPromise) {
        return tokenPromise;
    }
    tokenPromise = (async () => {
        const response = await (0,_launchdarkly_handler__WEBPACK_IMPORTED_MODULE_0__.requestAPI)(path);
        if (response.access_token === null) {
            return null;
        }
        return {
            accessToken: response.access_token,
            expiresAt: response.expires_at
        };
    })();
    return tokenPromise;
}
function clearTokenPromise() {
    tokenPromise = null;
}
async function getAccessToken(loopCount = 0) {
    // If localhost, don't try to get an access token
    if ((0,_environmentType__WEBPACK_IMPORTED_MODULE_3__.isLocalDev)()) {
        return null;
    }
    // If local notebooks
    if ((0,_environmentType__WEBPACK_IMPORTED_MODULE_3__.isLocalNotebooks)()) {
        return getNucleusAccessToken('nucleus_token');
    }
    // If enterprise notebooks
    if ((0,_environmentType__WEBPACK_IMPORTED_MODULE_3__.isEnterpriseNotebooks)()) {
        return getNucleusAccessToken('ae5_nucleus_token');
    }
    // Otherwise, get the access token
    if (loopCount > 2) {
        throw new Error('The access token expires_at is causing a loop');
    }
    if (!statePromise) {
        statePromise = initState();
    }
    const state = await statePromise;
    const now = new Date();
    // Invalidate the token when it gets within 30 seconds of expiration
    // to avoid clock drift etc.
    if (now >= state.expires) {
        statePromise = null;
        return getAccessToken(loopCount++);
    }
    return {
        accessToken: state.token,
        expiresAt: state.expires.getTime()
    };
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/specialPrefixes.js":
/*!********************************************************!*\
  !*** ../../lib/assistant/lib/utils/specialPrefixes.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attachmentMessageInstruction: () => (/* binding */ attachmentMessageInstruction),
/* harmony export */   attachmentMessagePrefix: () => (/* binding */ attachmentMessagePrefix),
/* harmony export */   cleanMessageWithAttachmentPrefix: () => (/* binding */ cleanMessageWithAttachmentPrefix)
/* harmony export */ });
/**
 * We will inject this prefix to all messages that contain attachments.
 * Before sending messages to our API, we will remove this prefix.
 */
const attachmentMessagePrefix = 'attachment://';
function attachmentMessageInstruction(name, cols) {
    return (`${attachmentMessagePrefix}` +
        `In a brief sentence, acknowledge you have received the following dataframe information: ` +
        `\`>>> ${name}.dtypes\` outputs:\n\`\`\`\n${cols
            .map(col => `${col[0]} ${col[1]}`)
            .join('\n')}\n\`\`\``);
}
function cleanMessageWithAttachmentPrefix(message) {
    // Extracting df.dtypes from the message.
    const match = message.match(/`>>> (.*)`/);
    if (match) {
        const name = match[1].split('.')[0];
        return `Attached the column names and types of dataframe ${name}: \`${match[1]}\`.`;
    }
    else {
        return message;
    }
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/text-selection-utils.js":
/*!*************************************************************!*\
  !*** ../../lib/assistant/lib/utils/text-selection-utils.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertSelection: () => (/* binding */ convertSelection),
/* harmony export */   getSelectionFromEditor: () => (/* binding */ getSelectionFromEditor),
/* harmony export */   isSelectionEqual: () => (/* binding */ isSelectionEqual)
/* harmony export */ });
function isSelectionEqual(current, selection) {
    return (current !== null &&
        current.uuid === selection.uuid &&
        current.startColumn === selection.start.column &&
        current.endColumn === selection.end.column &&
        current.startRow === selection.start.line &&
        current.endRow === selection.end.line);
}
function getSelectionFromEditor(editor, selection) {
    const startPos = editor.getOffsetAt(selection.start);
    const endPos = editor.getOffsetAt(selection.end);
    const source = editor.model.sharedModel.getSource();
    const text = source.substring(startPos, endPos);
    const cell = { id: selection.uuid?.toString() || '', source };
    return { text, cell };
}
function convertSelection(selection) {
    return {
        uuid: selection.uuid?.toString() || '',
        startColumn: selection.start.column,
        startRow: selection.start.line,
        endColumn: selection.end.column,
        endRow: selection.end.line
    };
}


/***/ }),

/***/ "../../lib/assistant/lib/utils/token-counter.js":
/*!******************************************************!*\
  !*** ../../lib/assistant/lib/utils/token-counter.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   countTokens: () => (/* binding */ countTokens)
/* harmony export */ });
/* harmony import */ var _nem035_gpt_3_encoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nem035/gpt-3-encoder */ "../../node_modules/@nem035/gpt-3-encoder/index.js");
/* harmony import */ var _nem035_gpt_3_encoder__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nem035_gpt_3_encoder__WEBPACK_IMPORTED_MODULE_0__);
// We use https://github.com/nem035/GPT-3-Encoder, which is a fork of https://github.com/latitudegames/GPT-3-Encoder
// since the original uses node apis which cannot be bundled in the library
// Should look at either vendoring it, or creating our own fork

function countTokens(message) {
    return (0,_nem035_gpt_3_encoder__WEBPACK_IMPORTED_MODULE_0__.encode)(message).length;
}


/***/ })

}]);
//# sourceMappingURL=lib_assistant_lib_index_js-webpack_sharing_consume_default_react-dom.0de20fd127d1b19de383.js.map