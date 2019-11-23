webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/components/layout/layout.tsx":
/*!******************************************!*\
  !*** ./src/components/layout/layout.tsx ***!
  \******************************************/
/*! exports provided: Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header */ "./src/components/layout/header.tsx");
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navigation */ "./src/components/layout/navigation.tsx");
/* harmony import */ var _constants_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants/ui */ "./constants/ui.ts");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1__["createElement"];





var Layout = function Layout(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? "CSGONades" : _ref$title,
      children = _ref.children;
  return __jsx("div", {
    id: "page",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["830024454", [_constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].HEADER_HEIGHT, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH]]])
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, null, __jsx("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["830024454", [_constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].HEADER_HEIGHT, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH]]])
  }, title)), __jsx(_header__WEBPACK_IMPORTED_MODULE_3__["Header"], null), __jsx(_navigation__WEBPACK_IMPORTED_MODULE_4__["MapNavigation"], null), __jsx("div", {
    id: "content",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["830024454", [_constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].HEADER_HEIGHT, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH]]])
  }, __jsx("main", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["830024454", [_constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].HEADER_HEIGHT, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH]]])
  }, children)), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "830024454",
    dynamic: [_constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].HEADER_HEIGHT, _constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH]
  }, "#sidebar.__jsx-style-dynamic-selector{position:fixed;left:0;top:0;bottom:0;width:70px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background-color:#fff;}#content.__jsx-style-dynamic-selector{min-height:100vh;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}main.__jsx-style-dynamic-selector{margin-left:".concat(_constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH, "px;margin-top:").concat(_constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].HEADER_HEIGHT, "px;background-color:#f2f2f2;-webkit-flex:1;-ms-flex:1;flex:1;}footer.__jsx-style-dynamic-selector{margin-left:").concat(_constants_ui__WEBPACK_IMPORTED_MODULE_5__["UiConstants"].SIDEBAR_WIDTH, "px;padding:16px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL2NvbXBvbmVudHMvbGF5b3V0L2xheW91dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJrQixBQUcwQixBQVdFLEFBTTBCLEFBT0EsZUF2QnBDLEVBV00sS0FWUCxNQUNHLFNBQ0UsTUFjK0IsQUFPN0IsS0FwQkEsUUFxQmYsNkJBUDJCLE1BTkgsbUJBT2YsWUFkZSxxQkFleEIsMEJBUEEsK0JBUHdCLHNCQUN4QiIsImZpbGUiOiIvVXNlcnMvbWVsbGV0L0RldmVsb3BtZW50L0NzR29OYWRlcy9jc2dvbmFkZXMtY2xpZW50L3NyYy9jb21wb25lbnRzL2xheW91dC9sYXlvdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tIFwiLi9oZWFkZXJcIjtcbmltcG9ydCB7IE1hcE5hdmlnYXRpb24gfSBmcm9tIFwiLi9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgeyBVaUNvbnN0YW50cyB9IGZyb20gXCIuLi8uLi8uLi9jb25zdGFudHMvdWlcIjtcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBMYXlvdXQ6IFJlYWN0LkZDPFByb3BzPiA9ICh7IHRpdGxlID0gXCJDU0dPTmFkZXNcIiwgY2hpbGRyZW4gfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgaWQ9XCJwYWdlXCI+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPnt0aXRsZX08L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8SGVhZGVyIC8+XG5cbiAgICAgIDxNYXBOYXZpZ2F0aW9uIC8+XG5cbiAgICAgIDxkaXYgaWQ9XCJjb250ZW50XCI+XG4gICAgICAgIDxtYWluPntjaGlsZHJlbn08L21haW4+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAjc2lkZWJhciB7XG4gICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICB3aWR0aDogNzBweDtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgfVxuXG4gICAgICAgICNjb250ZW50IHtcbiAgICAgICAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIH1cblxuICAgICAgICBtYWluIHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogJHtVaUNvbnN0YW50cy5TSURFQkFSX1dJRFRIfXB4O1xuICAgICAgICAgIG1hcmdpbi10b3A6ICR7VWlDb25zdGFudHMuSEVBREVSX0hFSUdIVH1weDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAke1VpQ29uc3RhbnRzLlNJREVCQVJfV0lEVEh9cHg7XG4gICAgICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ== */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/components/layout/layout.tsx */")));
};

/***/ })

})
//# sourceMappingURL=index.js.e539ea9f748b27d0db09.hot-update.js.map