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
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _nadepage_GfycatPlayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../nadepage/GfycatPlayer */ "./src/components/nadepage/GfycatPlayer.tsx");
/* harmony import */ var _NewNadeGfycatModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NewNadeGfycatModal */ "./src/components/newnade/NewNadeGfycatModal.tsx");


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




var NewNadeGfycat = function NewNadeGfycat() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      gfycatID = _useState[0],
      setGfycatID = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      isGfycatModalVisisble = _useState2[0],
      setIsGfycatModalVisisble = _useState2[1];

  function applyGfycatID(gfycatID) {
    setGfycatID(gfycatID);
  }

  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("div", {
    className: "jsx-1084271485" + " " + "gfycat-container"
  }, gfycatID && __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(_nadepage_GfycatPlayer__WEBPACK_IMPORTED_MODULE_3__["GfyCatPlayer"], {
    gfycatID: gfycatID
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    primary: true,
    onClick: function onClick() {
      return setIsGfycatModalVisisble(true);
    }
  }, "Edit")), !gfycatID && __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Header"], {
    icon: true
  }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
    name: "video"
  }), "Gfycat"), __jsx("br", {
    className: "jsx-1084271485"
  }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    primary: true,
    onClick: function onClick() {
      return setIsGfycatModalVisisble(true);
    }
  }, "Add")), __jsx(_NewNadeGfycatModal__WEBPACK_IMPORTED_MODULE_4__["NewNadeGfycatModal"], {
    setGfycat: applyGfycatID,
    visible: isGfycatModalVisisble,
    onDismiss: function onDismiss() {
      return setIsGfycatModalVisisble(false);
    }
  })), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1084271485"
  }, ".gfycat-container.jsx-1084271485{padding:12px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL2NvbXBvbmVudHMvbmV3bmFkZS9OZXdOYWRlR2Z5Y2F0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQ2tCLEFBR3dCLGFBQ2YiLCJmaWxlIjoiL1VzZXJzL21lbGxldC9EZXZlbG9wbWVudC9Dc0dvTmFkZXMvY3Nnb25hZGVzLWNsaWVudC9zcmMvY29tcG9uZW50cy9uZXduYWRlL05ld05hZGVHZnljYXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGVhZGVyLCBJY29uLCBCdXR0b24gfSBmcm9tIFwic2VtYW50aWMtdWktcmVhY3RcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBHZnlDYXRQbGF5ZXIgfSBmcm9tIFwiLi4vbmFkZXBhZ2UvR2Z5Y2F0UGxheWVyXCI7XG5pbXBvcnQgeyBOZXdOYWRlR2Z5Y2F0TW9kYWwgfSBmcm9tIFwiLi9OZXdOYWRlR2Z5Y2F0TW9kYWxcIjtcblxuZXhwb3J0IGNvbnN0IE5ld05hZGVHZnljYXQgPSAoKSA9PiB7XG4gIGNvbnN0IFtnZnljYXRJRCwgc2V0R2Z5Y2F0SURdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0dmeWNhdE1vZGFsVmlzaXNibGUsIHNldElzR2Z5Y2F0TW9kYWxWaXNpc2JsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgZnVuY3Rpb24gYXBwbHlHZnljYXRJRChnZnljYXRJRDogc3RyaW5nKSB7XG4gICAgc2V0R2Z5Y2F0SUQoZ2Z5Y2F0SUQpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnZnljYXQtY29udGFpbmVyXCI+XG4gICAgICAgIHtnZnljYXRJRCAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxHZnlDYXRQbGF5ZXIgZ2Z5Y2F0SUQ9e2dmeWNhdElEfSAvPlxuICAgICAgICAgICAgPEJ1dHRvbiBwcmltYXJ5IG9uQ2xpY2s9eygpID0+IHNldElzR2Z5Y2F0TW9kYWxWaXNpc2JsZSh0cnVlKX0+XG4gICAgICAgICAgICAgIEVkaXRcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgICB7IWdmeWNhdElEICYmIChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPEhlYWRlciBpY29uPlxuICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwidmlkZW9cIiAvPlxuICAgICAgICAgICAgICBHZnljYXRcbiAgICAgICAgICAgIDwvSGVhZGVyPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8QnV0dG9uIHByaW1hcnkgb25DbGljaz17KCkgPT4gc2V0SXNHZnljYXRNb2RhbFZpc2lzYmxlKHRydWUpfT5cbiAgICAgICAgICAgICAgQWRkXG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgICAgPE5ld05hZGVHZnljYXRNb2RhbFxuICAgICAgICAgIHNldEdmeWNhdD17YXBwbHlHZnljYXRJRH1cbiAgICAgICAgICB2aXNpYmxlPXtpc0dmeWNhdE1vZGFsVmlzaXNibGV9XG4gICAgICAgICAgb25EaXNtaXNzPXsoKSA9PiBzZXRJc0dmeWNhdE1vZGFsVmlzaXNibGUoZmFsc2UpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5nZnljYXQtY29udGFpbmVyIHtcbiAgICAgICAgICBwYWRkaW5nOiAxMnB4O1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/components/newnade/NewNadeGfycat.tsx */"));
};

/***/ })

})
//# sourceMappingURL=newnade.js.7c7d48b5bdb14a73d2a2.hot-update.js.map