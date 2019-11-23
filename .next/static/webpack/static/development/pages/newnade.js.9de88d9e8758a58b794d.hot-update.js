webpackHotUpdate("static/development/pages/newnade.js",{

/***/ "./src/components/newnade/NewNadeGfycat.tsx":
/*!**************************************************!*\
  !*** ./src/components/newnade/NewNadeGfycat.tsx ***!
  \**************************************************/
/*! exports provided: NewNadeGfycat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewNadeGfycat", function() { return NewNadeGfycat; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _nadepage_GfycatPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nadepage/GfycatPlayer */ "./src/components/nadepage/GfycatPlayer.tsx");
/* harmony import */ var _NewNadeGfycatModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NewNadeGfycatModal */ "./src/components/newnade/NewNadeGfycatModal.tsx");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var NewNadeGfycat = function NewNadeGfycat() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      gfycatID = _useState[0],
      setGfycatID = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      isGfycatModalVisisble = _useState2[0],
      setIsGfycatModalVisisble = _useState2[1];

  function applyGfycatID(gfycatID) {
    setGfycatID(gfycatID);
  }

  return __jsx("div", null, gfycatID && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_nadepage_GfycatPlayer__WEBPACK_IMPORTED_MODULE_2__["GfyCatPlayer"], {
    gfycatID: gfycatID
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    primary: true,
    onClick: function onClick() {
      return setIsGfycatModalVisisble(true);
    }
  }, "Edit")), !gfycatID && __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
    icon: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    name: "video"
  }), "Gfycat"), __jsx("br", null), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    primary: true,
    onClick: function onClick() {
      return setIsGfycatModalVisisble(true);
    }
  }, "Add")), __jsx(_NewNadeGfycatModal__WEBPACK_IMPORTED_MODULE_3__["NewNadeGfycatModal"], {
    setGfycat: applyGfycatID,
    visible: isGfycatModalVisisble,
    onDismiss: function onDismiss() {
      return setIsGfycatModalVisisble(false);
    }
  }));
};

/***/ })

})
//# sourceMappingURL=newnade.js.9de88d9e8758a58b794d.hot-update.js.map