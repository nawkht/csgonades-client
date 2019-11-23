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
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Grid"].Column, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Header"], {
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
  }, "Add"), gfycatID && __jsx("p", {
    className: "jsx-3344256073"
  }, gfycatID)), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Grid"].Column, null, __jsx(_components_newnade_NewNadeImagePlaceholder__WEBPACK_IMPORTED_MODULE_4__["NewNadeImagePlaceholder"], null))))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Button"], {
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
  }, ".nade-new-container.jsx-3344256073{margin:18px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL3BhZ2Vjb250YWluZXJzL25ld25hZGVwYWdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1RFMsQUFHeUIsWUFDZCIsImZpbGUiOiIvVXNlcnMvbWVsbGV0L0RldmVsb3BtZW50L0NzR29OYWRlcy9jc2dvbmFkZXMtY2xpZW50L3NyYy9wYWdlY29udGFpbmVycy9uZXduYWRlcGFnZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGQywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExheW91dCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2xheW91dC9sYXlvdXRcIjtcbmltcG9ydCB7XG4gIEJ1dHRvbixcbiAgU2VnbWVudCxcbiAgR3JpZCxcbiAgRGl2aWRlcixcbiAgSGVhZGVyLFxuICBJY29uXG59IGZyb20gXCJzZW1hbnRpYy11aS1yZWFjdFwiO1xuaW1wb3J0IHsgTmV3TmFkZUltYWdlUGxhY2Vob2xkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVJbWFnZVBsYWNlaG9sZGVyXCI7XG5pbXBvcnQgeyBOZXdOYWRlR2Z5Y2F0TW9kYWwgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVHZnljYXRNb2RhbFwiO1xuXG5jb25zdCBOZXdOYWRlUGFnZTogRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtpc0dmeWNhdE1vZGFsVmlzaXNibGUsIHNldElzR2Z5Y2F0TW9kYWxWaXNpc2JsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtnZnljYXRJRCwgc2V0R2Z5Y2F0SURdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYWRlLW5ldy1jb250YWluZXJcIj5cbiAgICAgICAgPGgyPkFkZCBuZXcgbmFkZTwvaDI+XG4gICAgICAgIDxTZWdtZW50IHBsYWNlaG9sZGVyPlxuICAgICAgICAgIDxHcmlkIGNvbHVtbnM9ezJ9IHN0YWNrYWJsZSB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxEaXZpZGVyIHZlcnRpY2FsPkFuZDwvRGl2aWRlcj5cblxuICAgICAgICAgICAgPEdyaWQuUm93IHZlcnRpY2FsQWxpZ249XCJtaWRkbGVcIj5cbiAgICAgICAgICAgICAgPEdyaWQuQ29sdW1uPlxuICAgICAgICAgICAgICAgIDxIZWFkZXIgaWNvbj5cbiAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJ2aWRlb1wiIC8+XG4gICAgICAgICAgICAgICAgICBHZnljYXRcbiAgICAgICAgICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIHByaW1hcnkgb25DbGljaz17KCkgPT4gc2V0SXNHZnljYXRNb2RhbFZpc2lzYmxlKHRydWUpfT5cbiAgICAgICAgICAgICAgICAgIEFkZFxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIHtnZnljYXRJRCAmJiA8cD57Z2Z5Y2F0SUR9PC9wPn1cbiAgICAgICAgICAgICAgPC9HcmlkLkNvbHVtbj5cblxuICAgICAgICAgICAgICA8R3JpZC5Db2x1bW4+XG4gICAgICAgICAgICAgICAgPE5ld05hZGVJbWFnZVBsYWNlaG9sZGVyIC8+XG4gICAgICAgICAgICAgIDwvR3JpZC5Db2x1bW4+XG4gICAgICAgICAgICA8L0dyaWQuUm93PlxuICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgPC9TZWdtZW50PlxuICAgICAgICA8QnV0dG9uIGRpc2FibGVkIGNvbG9yPVwiZ3JlZW5cIj5cbiAgICAgICAgICBTdWJtaXRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxOZXdOYWRlR2Z5Y2F0TW9kYWxcbiAgICAgICAgc2V0R2Z5Y2F0PXtzZXRHZnljYXRJRH1cbiAgICAgICAgdmlzaWJsZT17aXNHZnljYXRNb2RhbFZpc2lzYmxlfVxuICAgICAgICBvbkRpc21pc3M9eygpID0+IHNldElzR2Z5Y2F0TW9kYWxWaXNpc2JsZShmYWxzZSl9XG4gICAgICAvPlxuXG4gICAgICA8c3R5bGUganN4PlxuICAgICAgICB7YFxuICAgICAgICAgIC5uYWRlLW5ldy1jb250YWluZXIge1xuICAgICAgICAgICAgbWFyZ2luOiAxOHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAgIDwvc3R5bGU+XG4gICAgPC9MYXlvdXQ+XG4gICk7XG59O1xuXG5leHBvcnQgeyBOZXdOYWRlUGFnZSB9O1xuIl19 */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/pagecontainers/newnadepage.tsx */"));
};



/***/ })

})
//# sourceMappingURL=newnade.js.63e20f3b70d0e9df8963.hot-update.js.map