webpackHotUpdate("static/development/pages/newnade.js",{

/***/ "./src/pagecontainers/newnadepage.tsx":
/*!********************************************!*\
  !*** ./src/pagecontainers/newnadepage.tsx ***!
  \********************************************/
/*! exports provided: NewNadePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewNadePage", function() { return NewNadePage; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_layout_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout/layout */ "./src/components/layout/layout.tsx");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _components_newnade_NewNadeImagePlaceholder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/newnade/NewNadeImagePlaceholder */ "./src/components/newnade/NewNadeImagePlaceholder.tsx");
/* harmony import */ var _components_newnade_NewNadeGfycatModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/newnade/NewNadeGfycatModal */ "./src/components/newnade/NewNadeGfycatModal.tsx");
/* harmony import */ var _components_nadepage_GfycatPlayer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/nadepage/GfycatPlayer */ "./src/components/nadepage/GfycatPlayer.tsx");


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;







var NewNadePage = function NewNadePage() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      isGfycatModalVisisble = _useState[0],
      setIsGfycatModalVisisble = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      gfycatID = _useState2[0],
      setGfycatID = _useState2[1];

  return __jsx(_components_layout_layout__WEBPACK_IMPORTED_MODULE_2__["Layout"], null, __jsx("div", {
    className: "jsx-3344256073" + " " + "nade-new-container"
  }, __jsx("h2", {
    className: "jsx-3344256073"
  }, "Add new nade"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Segment"], {
    placeholder: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Grid"], {
    columns: 2,
    stackable: true,
    textAlign: "center"
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Divider"], {
    vertical: true
  }, "And"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Grid"].Row, {
    verticalAlign: "middle"
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Grid"].Column, null, !gfycatID && __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Header"], {
    icon: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
    name: "video"
  }), "Gfycat"), __jsx("br", {
    className: "jsx-3344256073"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    primary: true,
    onClick: function onClick() {
      return setIsGfycatModalVisisble(true);
    }
  }, "Add")), gfycatID && __jsx("p", {
    className: "jsx-3344256073"
  }, __jsx(_components_nadepage_GfycatPlayer__WEBPACK_IMPORTED_MODULE_6__["GfyCatPlayer"], {
    gfycatID: gfycatID
  }))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Grid"].Column, null, __jsx(_components_newnade_NewNadeImagePlaceholder__WEBPACK_IMPORTED_MODULE_4__["NewNadeImagePlaceholder"], null))))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    disabled: true,
    color: "green"
  }, "Submit")), __jsx(_components_newnade_NewNadeGfycatModal__WEBPACK_IMPORTED_MODULE_5__["NewNadeGfycatModal"], {
    setGfycat: setGfycatID,
    visible: isGfycatModalVisisble,
    onDismiss: function onDismiss() {
      return setIsGfycatModalVisisble(false);
    }
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3344256073"
  }, ".nade-new-container.jsx-3344256073{margin:18px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL3BhZ2Vjb250YWluZXJzL25ld25hZGVwYWdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnRVMsQUFHeUIsWUFDZCIsImZpbGUiOiIvVXNlcnMvbWVsbGV0L0RldmVsb3BtZW50L0NzR29OYWRlcy9jc2dvbmFkZXMtY2xpZW50L3NyYy9wYWdlY29udGFpbmVycy9uZXduYWRlcGFnZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGQywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExheW91dCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2xheW91dC9sYXlvdXRcIjtcbmltcG9ydCB7XG4gIEJ1dHRvbixcbiAgU2VnbWVudCxcbiAgR3JpZCxcbiAgRGl2aWRlcixcbiAgSGVhZGVyLFxuICBJY29uXG59IGZyb20gXCJzZW1hbnRpYy11aS1yZWFjdFwiO1xuaW1wb3J0IHsgTmV3TmFkZUltYWdlUGxhY2Vob2xkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVJbWFnZVBsYWNlaG9sZGVyXCI7XG5pbXBvcnQgeyBOZXdOYWRlR2Z5Y2F0TW9kYWwgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVHZnljYXRNb2RhbFwiO1xuaW1wb3J0IHsgR2Z5Q2F0UGxheWVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbmFkZXBhZ2UvR2Z5Y2F0UGxheWVyXCI7XG5cbmNvbnN0IE5ld05hZGVQYWdlOiBGQyA9ICgpID0+IHtcbiAgY29uc3QgW2lzR2Z5Y2F0TW9kYWxWaXNpc2JsZSwgc2V0SXNHZnljYXRNb2RhbFZpc2lzYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dmeWNhdElELCBzZXRHZnljYXRJRF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQ+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hZGUtbmV3LWNvbnRhaW5lclwiPlxuICAgICAgICA8aDI+QWRkIG5ldyBuYWRlPC9oMj5cbiAgICAgICAgPFNlZ21lbnQgcGxhY2Vob2xkZXI+XG4gICAgICAgICAgPEdyaWQgY29sdW1ucz17Mn0gc3RhY2thYmxlIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgPERpdmlkZXIgdmVydGljYWw+QW5kPC9EaXZpZGVyPlxuXG4gICAgICAgICAgICA8R3JpZC5Sb3cgdmVydGljYWxBbGlnbj1cIm1pZGRsZVwiPlxuICAgICAgICAgICAgICA8R3JpZC5Db2x1bW4+XG4gICAgICAgICAgICAgICAgeyFnZnljYXRJRCAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8SGVhZGVyIGljb24+XG4gICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cInZpZGVvXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBHZnljYXRcbiAgICAgICAgICAgICAgICAgICAgPC9IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzR2Z5Y2F0TW9kYWxWaXNpc2JsZSh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIEFkZFxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7Z2Z5Y2F0SUQgJiYgPHA+ezxHZnlDYXRQbGF5ZXIgZ2Z5Y2F0SUQ9e2dmeWNhdElEfSAvPn08L3A+fVxuICAgICAgICAgICAgICA8L0dyaWQuQ29sdW1uPlxuXG4gICAgICAgICAgICAgIDxHcmlkLkNvbHVtbj5cbiAgICAgICAgICAgICAgICA8TmV3TmFkZUltYWdlUGxhY2Vob2xkZXIgLz5cbiAgICAgICAgICAgICAgPC9HcmlkLkNvbHVtbj5cbiAgICAgICAgICAgIDwvR3JpZC5Sb3c+XG4gICAgICAgICAgPC9HcmlkPlxuICAgICAgICA8L1NlZ21lbnQ+XG4gICAgICAgIDxCdXR0b24gZGlzYWJsZWQgY29sb3I9XCJncmVlblwiPlxuICAgICAgICAgIFN1Ym1pdFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPE5ld05hZGVHZnljYXRNb2RhbFxuICAgICAgICBzZXRHZnljYXQ9e3NldEdmeWNhdElEfVxuICAgICAgICB2aXNpYmxlPXtpc0dmeWNhdE1vZGFsVmlzaXNibGV9XG4gICAgICAgIG9uRGlzbWlzcz17KCkgPT4gc2V0SXNHZnljYXRNb2RhbFZpc2lzYmxlKGZhbHNlKX1cbiAgICAgIC8+XG5cbiAgICAgIDxzdHlsZSBqc3g+XG4gICAgICAgIHtgXG4gICAgICAgICAgLm5hZGUtbmV3LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBtYXJnaW46IDE4cHg7XG4gICAgICAgICAgfVxuICAgICAgICBgfVxuICAgICAgPC9zdHlsZT5cbiAgICA8L0xheW91dD5cbiAgKTtcbn07XG5cbmV4cG9ydCB7IE5ld05hZGVQYWdlIH07XG4iXX0= */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/pagecontainers/newnadepage.tsx */"));
};



/***/ })

})
//# sourceMappingURL=newnade.js.caad2e436c2e82e5995f.hot-update.js.map