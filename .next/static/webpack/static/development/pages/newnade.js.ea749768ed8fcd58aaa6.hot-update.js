webpackHotUpdate("static/development/pages/newnade.js",{

/***/ "./node_modules/react-image-crop/dist/ReactCrop.min.js":
false,

/***/ "./src/components/ImageUploader.tsx":
false,

/***/ "./src/components/nadepage/GfycatEditor.tsx":
false,

/***/ "./src/components/nadepage/GfycatPlayer.tsx":
false,

/***/ "./src/components/nadepage/GfycatPlayerContainer.tsx":
false,

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
    primary: true
  }, "Add")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Grid"].Column, null, __jsx(_components_newnade_NewNadeImagePlaceholder__WEBPACK_IMPORTED_MODULE_4__["NewNadeImagePlaceholder"], null))))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    disabled: true,
    color: "green"
  }, "Submit")), __jsx(_components_newnade_NewNadeGfycatModal__WEBPACK_IMPORTED_MODULE_5__["NewNadeGfycatModal"], {
    visible: isGfycatModalVisisble,
    onDismiss: function onDismiss() {
      return setIsGfycatModalVisisble(false);
    }
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3344256073"
  }, ".nade-new-container.jsx-3344256073{margin:18px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL3BhZ2Vjb250YWluZXJzL25ld25hZGVwYWdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpRFMsQUFHeUIsWUFDZCIsImZpbGUiOiIvVXNlcnMvbWVsbGV0L0RldmVsb3BtZW50L0NzR29OYWRlcy9jc2dvbmFkZXMtY2xpZW50L3NyYy9wYWdlY29udGFpbmVycy9uZXduYWRlcGFnZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGQywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExheW91dCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2xheW91dC9sYXlvdXRcIjtcbmltcG9ydCB7XG4gIEJ1dHRvbixcbiAgU2VnbWVudCxcbiAgR3JpZCxcbiAgRGl2aWRlcixcbiAgSGVhZGVyLFxuICBJY29uXG59IGZyb20gXCJzZW1hbnRpYy11aS1yZWFjdFwiO1xuaW1wb3J0IHsgTmV3TmFkZUltYWdlUGxhY2Vob2xkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVJbWFnZVBsYWNlaG9sZGVyXCI7XG5pbXBvcnQgeyBOZXdOYWRlR2Z5Y2F0TW9kYWwgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVHZnljYXRNb2RhbFwiO1xuXG5jb25zdCBOZXdOYWRlUGFnZTogRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtpc0dmeWNhdE1vZGFsVmlzaXNibGUsIHNldElzR2Z5Y2F0TW9kYWxWaXNpc2JsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYWRlLW5ldy1jb250YWluZXJcIj5cbiAgICAgICAgPGgyPkFkZCBuZXcgbmFkZTwvaDI+XG4gICAgICAgIDxTZWdtZW50IHBsYWNlaG9sZGVyPlxuICAgICAgICAgIDxHcmlkIGNvbHVtbnM9ezJ9IHN0YWNrYWJsZSB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxEaXZpZGVyIHZlcnRpY2FsPkFuZDwvRGl2aWRlcj5cblxuICAgICAgICAgICAgPEdyaWQuUm93IHZlcnRpY2FsQWxpZ249XCJtaWRkbGVcIj5cbiAgICAgICAgICAgICAgPEdyaWQuQ29sdW1uPlxuICAgICAgICAgICAgICAgIDxIZWFkZXIgaWNvbj5cbiAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJ2aWRlb1wiIC8+XG4gICAgICAgICAgICAgICAgICBHZnljYXRcbiAgICAgICAgICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIHByaW1hcnk+QWRkPC9CdXR0b24+XG4gICAgICAgICAgICAgIDwvR3JpZC5Db2x1bW4+XG5cbiAgICAgICAgICAgICAgPEdyaWQuQ29sdW1uPlxuICAgICAgICAgICAgICAgIDxOZXdOYWRlSW1hZ2VQbGFjZWhvbGRlciAvPlxuICAgICAgICAgICAgICA8L0dyaWQuQ29sdW1uPlxuICAgICAgICAgICAgPC9HcmlkLlJvdz5cbiAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgIDwvU2VnbWVudD5cbiAgICAgICAgPEJ1dHRvbiBkaXNhYmxlZCBjb2xvcj1cImdyZWVuXCI+XG4gICAgICAgICAgU3VibWl0XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8TmV3TmFkZUdmeWNhdE1vZGFsXG4gICAgICAgIHZpc2libGU9e2lzR2Z5Y2F0TW9kYWxWaXNpc2JsZX1cbiAgICAgICAgb25EaXNtaXNzPXsoKSA9PiBzZXRJc0dmeWNhdE1vZGFsVmlzaXNibGUoZmFsc2UpfVxuICAgICAgLz5cbiAgICAgIDxzdHlsZSBqc3g+XG4gICAgICAgIHtgXG4gICAgICAgICAgLm5hZGUtbmV3LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBtYXJnaW46IDE4cHg7XG4gICAgICAgICAgfVxuICAgICAgICBgfVxuICAgICAgPC9zdHlsZT5cbiAgICA8L0xheW91dD5cbiAgKTtcbn07XG5cbmV4cG9ydCB7IE5ld05hZGVQYWdlIH07XG4iXX0= */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/pagecontainers/newnadepage.tsx */"));
};



/***/ })

})
//# sourceMappingURL=newnade.js.ea749768ed8fcd58aaa6.hot-update.js.map