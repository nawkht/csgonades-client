webpackHotUpdate("static/development/pages/newnade.js",{

/***/ "./src/components/CSGNModal.tsx":
/*!**************************************!*\
  !*** ./src/components/CSGNModal.tsx ***!
  \**************************************/
/*! exports provided: CSGNModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSGNModal", function() { return CSGNModal; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;
var CSGNModal = function CSGNModal(_ref) {
  var children = _ref.children,
      title = _ref.title,
      visible = _ref.visible,
      onDismiss = _ref.onDismiss;

  if (!visible) {
    return null;
  }

  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("div", {
    onClick: onDismiss,
    className: "jsx-3048783433" + " " + "modal-bg"
  }, __jsx("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    className: "jsx-3048783433" + " " + "modal"
  }, __jsx("div", {
    className: "jsx-3048783433" + " " + "modal-title"
  }, __jsx("h3", {
    className: "jsx-3048783433"
  }, title)), __jsx("div", {
    className: "jsx-3048783433" + " " + "modal-content"
  }, children))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3048783433"
  }, ".modal-bg.jsx-3048783433{position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background:rgba(0,0,0,0.8);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.modal.jsx-3048783433{background:red;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;background:#fff;border-radius:3px;min-width:50%;}.modal-title.jsx-3048783433{padding:18px;border-bottom:1px solid #e6e6e6;}.modal-content.jsx-3048783433{padding:18px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL2NvbXBvbmVudHMvQ1NHTk1vZGFsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0QmtCLEFBRzBCLEFBV0EsQUFPRixBQUtBLGFBSm1CLEFBS2xDLEVBdkJRLEFBV1ksTUFWWCxPQUNDLFFBQ0MsU0FDRyxBQWVkLFlBZGdDLDJCQUNqQixFQU1HLGdCQUNFLGtCQUNKLGNBQ2hCLHdCQVJ5QixtR0FDekIiLCJmaWxlIjoiL1VzZXJzL21lbGxldC9EZXZlbG9wbWVudC9Dc0dvTmFkZXMvY3Nnb25hZGVzLWNsaWVudC9zcmMvY29tcG9uZW50cy9DU0dOTW9kYWwudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgdmlzaWJsZTogYm9vbGVhbjtcbiAgb25EaXNtaXNzOiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IENTR05Nb2RhbDogRkM8UHJvcHM+ID0gKHtcbiAgY2hpbGRyZW4sXG4gIHRpdGxlLFxuICB2aXNpYmxlLFxuICBvbkRpc21pc3Ncbn0pID0+IHtcbiAgaWYgKCF2aXNpYmxlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJnXCIgb25DbGljaz17b25EaXNtaXNzfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIG9uQ2xpY2s9e2UgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPlxuICAgICAgICAgICAgPGgzPnt0aXRsZX08L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLm1vZGFsLWJnIHtcbiAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgIHotaW5kZXg6IDk5OTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuOCk7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgICAubW9kYWwge1xuICAgICAgICAgIGJhY2tncm91bmQ6IHJlZDtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgbWluLXdpZHRoOiA1MCU7XG4gICAgICAgIH1cbiAgICAgICAgLm1vZGFsLXRpdGxlIHtcbiAgICAgICAgICBwYWRkaW5nOiAxOHB4O1xuICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTZlNmU2O1xuICAgICAgICB9XG5cbiAgICAgICAgLm1vZGFsLWNvbnRlbnQge1xuICAgICAgICAgIHBhZGRpbmc6IDE4cHg7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/components/CSGNModal.tsx */"));
};

/***/ })

})
//# sourceMappingURL=newnade.js.4b8c3e41a6bc4c055a54.hot-update.js.map