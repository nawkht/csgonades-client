webpackHotUpdate("static/development/pages/newnade.js",{

/***/ "./src/components/nadepage/GfycatPlayer.tsx":
/*!**************************************************!*\
  !*** ./src/components/nadepage/GfycatPlayer.tsx ***!
  \**************************************************/
/*! exports provided: GfyCatPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GfyCatPlayer", function() { return GfyCatPlayer; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;
var GfyCatPlayer = function GfyCatPlayer(_ref) {
  var gfycatID = _ref.gfycatID,
      aspect = _ref.aspect;

  function aspectToPadding(aspect) {
    switch (aspect) {
      case "16:10":
        return "65%";

      default:
        return "57.5%";
    }
  }

  return __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["469715271", [aspectToPadding(aspect)]]]) + " " + "gfycat-container"
  }, __jsx("iframe", {
    src: "https://gfycat.com/ifr/".concat(gfycatID) || false,
    allowFullScreen: true,
    scrolling: "no",
    allow: "encrypted-media",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["469715271", [aspectToPadding(aspect)]]]) + " " + "gfycat-frame"
  }), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["469715271", [aspectToPadding(aspect)]]]) + " " + "hider"
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "469715271",
    dynamic: [aspectToPadding(aspect)]
  }, ".gfycat-container.__jsx-style-dynamic-selector{position:relative;left:0;width:100%;height:0;padding-bottom:".concat(aspectToPadding(aspect), ";overflow:hidden;border-radius:3px;}.gfycat-frame.__jsx-style-dynamic-selector{position:absolute;border:0;top:0;left:0;right:0;width:100%;height:100%;}.hider.__jsx-style-dynamic-selector{border:1px solid white;position:absolute;bottom:0;left:0;right:0;height:44px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL2NvbXBvbmVudHMvbmFkZXBhZ2UvR2Z5Y2F0UGxheWVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQmtCLEFBRzZCLEFBVUEsQUFTSyxrQkFsQmhCLEFBVUUsS0FTUyxFQWxCUCxFQVVMLE1BQ0MsR0FWRSxJQVdELENBT0MsSUFqQm1DLEdBV2pDLEVBT0osT0FDQyxFQVBJLE1BUUEsTUFQZCxNQVFBLFlBcEJrQixnQkFDRSxrQkFDcEIiLCJmaWxlIjoiL1VzZXJzL21lbGxldC9EZXZlbG9wbWVudC9Dc0dvTmFkZXMvY3Nnb25hZGVzLWNsaWVudC9zcmMvY29tcG9uZW50cy9uYWRlcGFnZS9HZnljYXRQbGF5ZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFzcGVjdCB9IGZyb20gXCIuL0dmeWNhdFBsYXllckNvbnRhaW5lclwiO1xuXG50eXBlIFByb3BzID0ge1xuICBnZnljYXRJRD86IHN0cmluZztcbiAgYXNwZWN0PzogQXNwZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IEdmeUNhdFBsYXllcjogRkM8UHJvcHM+ID0gKHsgZ2Z5Y2F0SUQsIGFzcGVjdCB9KSA9PiB7XG4gIGZ1bmN0aW9uIGFzcGVjdFRvUGFkZGluZyhhc3BlY3Q/OiBBc3BlY3QpIHtcbiAgICBzd2l0Y2ggKGFzcGVjdCkge1xuICAgICAgY2FzZSBcIjE2OjEwXCI6XG4gICAgICAgIHJldHVybiBcIjY1JVwiO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiNTcuNSVcIjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2Z5Y2F0LWNvbnRhaW5lclwiPlxuICAgICAgPGlmcmFtZVxuICAgICAgICBjbGFzc05hbWU9XCJnZnljYXQtZnJhbWVcIlxuICAgICAgICBzcmM9e1xuICAgICAgICAgIGBodHRwczovL2dmeWNhdC5jb20vaWZyLyR7Z2Z5Y2F0SUR9YCB8fFxuICAgICAgICAgIFwiaHR0cHM6Ly9nZnljYXQuY29tL2lmci9zZWxmaXNoYmxhcmluZ2JsYWNrYnVja1wiXG4gICAgICAgIH1cbiAgICAgICAgYWxsb3dGdWxsU2NyZWVuXG4gICAgICAgIHNjcm9sbGluZz1cIm5vXCJcbiAgICAgICAgYWxsb3c9XCJlbmNyeXB0ZWQtbWVkaWFcIlxuICAgICAgPjwvaWZyYW1lPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRlclwiIC8+XG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5nZnljYXQtY29udGFpbmVyIHtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgICAgcGFkZGluZy1ib3R0b206ICR7YXNwZWN0VG9QYWRkaW5nKGFzcGVjdCl9O1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmdmeWNhdC1mcmFtZSB7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLmhpZGVyIHtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgaGVpZ2h0OiA0NHB4O1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19 */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/components/nadepage/GfycatPlayer.tsx */")));
};

/***/ }),

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
  }, ".nade-new-container.jsx-3344256073{margin:18px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL3BhZ2Vjb250YWluZXJzL25ld25hZGVwYWdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3RFMsQUFHeUIsWUFDZCIsImZpbGUiOiIvVXNlcnMvbWVsbGV0L0RldmVsb3BtZW50L0NzR29OYWRlcy9jc2dvbmFkZXMtY2xpZW50L3NyYy9wYWdlY29udGFpbmVycy9uZXduYWRlcGFnZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGQywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExheW91dCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2xheW91dC9sYXlvdXRcIjtcbmltcG9ydCB7XG4gIEJ1dHRvbixcbiAgU2VnbWVudCxcbiAgR3JpZCxcbiAgRGl2aWRlcixcbiAgSGVhZGVyLFxuICBJY29uXG59IGZyb20gXCJzZW1hbnRpYy11aS1yZWFjdFwiO1xuaW1wb3J0IHsgTmV3TmFkZUltYWdlUGxhY2Vob2xkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVJbWFnZVBsYWNlaG9sZGVyXCI7XG5pbXBvcnQgeyBOZXdOYWRlR2Z5Y2F0TW9kYWwgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVHZnljYXRNb2RhbFwiO1xuaW1wb3J0IHsgR2Z5Q2F0UGxheWVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbmFkZXBhZ2UvR2Z5Y2F0UGxheWVyXCI7XG5cbmNvbnN0IE5ld05hZGVQYWdlOiBGQyA9ICgpID0+IHtcbiAgY29uc3QgW2lzR2Z5Y2F0TW9kYWxWaXNpc2JsZSwgc2V0SXNHZnljYXRNb2RhbFZpc2lzYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dmeWNhdElELCBzZXRHZnljYXRJRF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICByZXR1cm4gKFxuICAgIDxMYXlvdXQ+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hZGUtbmV3LWNvbnRhaW5lclwiPlxuICAgICAgICA8aDI+QWRkIG5ldyBuYWRlPC9oMj5cbiAgICAgICAgPFNlZ21lbnQgcGxhY2Vob2xkZXI+XG4gICAgICAgICAgPEdyaWQgY29sdW1ucz17Mn0gc3RhY2thYmxlIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgPERpdmlkZXIgdmVydGljYWw+QW5kPC9EaXZpZGVyPlxuXG4gICAgICAgICAgICA8R3JpZC5Sb3cgdmVydGljYWxBbGlnbj1cIm1pZGRsZVwiPlxuICAgICAgICAgICAgICA8R3JpZC5Db2x1bW4+XG4gICAgICAgICAgICAgICAgPEhlYWRlciBpY29uPlxuICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cInZpZGVvXCIgLz5cbiAgICAgICAgICAgICAgICAgIEdmeWNhdFxuICAgICAgICAgICAgICAgIDwvSGVhZGVyPlxuICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gcHJpbWFyeSBvbkNsaWNrPXsoKSA9PiBzZXRJc0dmeWNhdE1vZGFsVmlzaXNibGUodHJ1ZSl9PlxuICAgICAgICAgICAgICAgICAgQWRkXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAge2dmeWNhdElEICYmIDxwPns8R2Z5Q2F0UGxheWVyIGdmeWNhdElEPXtnZnljYXRJRH0gLz59PC9wPn1cbiAgICAgICAgICAgICAgPC9HcmlkLkNvbHVtbj5cblxuICAgICAgICAgICAgICA8R3JpZC5Db2x1bW4+XG4gICAgICAgICAgICAgICAgPE5ld05hZGVJbWFnZVBsYWNlaG9sZGVyIC8+XG4gICAgICAgICAgICAgIDwvR3JpZC5Db2x1bW4+XG4gICAgICAgICAgICA8L0dyaWQuUm93PlxuICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgPC9TZWdtZW50PlxuICAgICAgICA8QnV0dG9uIGRpc2FibGVkIGNvbG9yPVwiZ3JlZW5cIj5cbiAgICAgICAgICBTdWJtaXRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxOZXdOYWRlR2Z5Y2F0TW9kYWxcbiAgICAgICAgc2V0R2Z5Y2F0PXtzZXRHZnljYXRJRH1cbiAgICAgICAgdmlzaWJsZT17aXNHZnljYXRNb2RhbFZpc2lzYmxlfVxuICAgICAgICBvbkRpc21pc3M9eygpID0+IHNldElzR2Z5Y2F0TW9kYWxWaXNpc2JsZShmYWxzZSl9XG4gICAgICAvPlxuXG4gICAgICA8c3R5bGUganN4PlxuICAgICAgICB7YFxuICAgICAgICAgIC5uYWRlLW5ldy1jb250YWluZXIge1xuICAgICAgICAgICAgbWFyZ2luOiAxOHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgYH1cbiAgICAgIDwvc3R5bGU+XG4gICAgPC9MYXlvdXQ+XG4gICk7XG59O1xuXG5leHBvcnQgeyBOZXdOYWRlUGFnZSB9O1xuIl19 */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/pagecontainers/newnadepage.tsx */"));
};



/***/ })

})
//# sourceMappingURL=newnade.js.49a25201d1ce8cda0eaa.hot-update.js.map