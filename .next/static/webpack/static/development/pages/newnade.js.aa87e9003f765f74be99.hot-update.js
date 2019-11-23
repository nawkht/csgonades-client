webpackHotUpdate("static/development/pages/newnade.js",{

/***/ "./src/components/newnade/NewNadeGfycatModal.tsx":
/*!*******************************************************!*\
  !*** ./src/components/newnade/NewNadeGfycatModal.tsx ***!
  \*******************************************************/
/*! exports provided: NewNadeGfycatModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewNadeGfycatModal", function() { return NewNadeGfycatModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CSGNModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CSGNModal */ "./src/components/CSGNModal.tsx");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var NewNadeGfycatModal = function NewNadeGfycatModal(_ref) {
  var onDismiss = _ref.onDismiss,
      visible = _ref.visible,
      setGfycat = _ref.setGfycat;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      isLoading = _useState[0];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
      gfycatValue = _useState2[0],
      setGfycatValue = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      error = _useState3[0],
      setError = _useState3[1];

  function validateGfycat() {
    // api call to validate
    setGfycat(gfycatValue);
    onDismiss();
  }

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_CSGNModal__WEBPACK_IMPORTED_MODULE_1__["CSGNModal"], {
    visible: visible,
    onDismiss: onDismiss,
    title: "Add gfycat video"
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    loading: isLoading,
    placeholder: "Gfycat url or id",
    value: gfycatValue,
    onChange: function onChange(e) {
      setGfycatValue(e.target.value);
    }
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: validateGfycat
  }, "Add"), error && __jsx("p", null, "error")));
};

/***/ })

})
//# sourceMappingURL=newnade.js.aa87e9003f765f74be99.hot-update.js.map