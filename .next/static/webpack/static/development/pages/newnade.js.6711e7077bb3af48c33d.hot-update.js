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

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var NewNadeGfycatModal = function NewNadeGfycatModal() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      isModalVisisble = _useState[0],
      setIsModalVisible = _useState[1];

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_CSGNModal__WEBPACK_IMPORTED_MODULE_1__["CSGNModal"], {
    visible: isModalVisisble,
    onDismiss: function onDismiss() {
      return setIsModalVisible(false);
    },
    title: "Add gfycat video"
  }, "Hello"));
};

/***/ })

})
//# sourceMappingURL=newnade.js.6711e7077bb3af48c33d.hot-update.js.map