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
        return "63%";
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
  }, ".gfycat-container.__jsx-style-dynamic-selector{position:relative;left:0;width:100%;height:0;padding-bottom:".concat(aspectToPadding(aspect), ";overflow:hidden;border-radius:3px;}.gfycat-frame.__jsx-style-dynamic-selector{position:absolute;border:0;top:0;left:0;right:0;width:100%;height:100%;}.hider.__jsx-style-dynamic-selector{border:1px solid white;position:absolute;bottom:0;left:0;right:0;height:44px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL2NvbXBvbmVudHMvbmFkZXBhZ2UvR2Z5Y2F0UGxheWVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQmtCLEFBRzZCLEFBVUEsQUFTSyxrQkFsQmhCLEFBVUUsS0FTUyxFQWxCUCxFQVVMLE1BQ0MsR0FWRSxJQVdELENBT0MsSUFqQm1DLEdBV2pDLEVBT0osT0FDQyxFQVBJLE1BUUEsTUFQZCxNQVFBLFlBcEJrQixnQkFDRSxrQkFDcEIiLCJmaWxlIjoiL1VzZXJzL21lbGxldC9EZXZlbG9wbWVudC9Dc0dvTmFkZXMvY3Nnb25hZGVzLWNsaWVudC9zcmMvY29tcG9uZW50cy9uYWRlcGFnZS9HZnljYXRQbGF5ZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFzcGVjdCB9IGZyb20gXCIuL0dmeWNhdFBsYXllckNvbnRhaW5lclwiO1xuXG50eXBlIFByb3BzID0ge1xuICBnZnljYXRJRD86IHN0cmluZztcbiAgYXNwZWN0PzogQXNwZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IEdmeUNhdFBsYXllcjogRkM8UHJvcHM+ID0gKHsgZ2Z5Y2F0SUQsIGFzcGVjdCB9KSA9PiB7XG4gIGZ1bmN0aW9uIGFzcGVjdFRvUGFkZGluZyhhc3BlY3Q/OiBBc3BlY3QpIHtcbiAgICBzd2l0Y2ggKGFzcGVjdCkge1xuICAgICAgY2FzZSBcIjE2OjEwXCI6XG4gICAgICAgIHJldHVybiBcIjY1JVwiO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiNjMlXCI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdmeWNhdC1jb250YWluZXJcIj5cbiAgICAgIDxpZnJhbWVcbiAgICAgICAgY2xhc3NOYW1lPVwiZ2Z5Y2F0LWZyYW1lXCJcbiAgICAgICAgc3JjPXtcbiAgICAgICAgICBgaHR0cHM6Ly9nZnljYXQuY29tL2lmci8ke2dmeWNhdElEfWAgfHxcbiAgICAgICAgICBcImh0dHBzOi8vZ2Z5Y2F0LmNvbS9pZnIvc2VsZmlzaGJsYXJpbmdibGFja2J1Y2tcIlxuICAgICAgICB9XG4gICAgICAgIGFsbG93RnVsbFNjcmVlblxuICAgICAgICBzY3JvbGxpbmc9XCJub1wiXG4gICAgICAgIGFsbG93PVwiZW5jcnlwdGVkLW1lZGlhXCJcbiAgICAgID48L2lmcmFtZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZXJcIiAvPlxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAuZ2Z5Y2F0LWNvbnRhaW5lciB7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAke2FzcGVjdFRvUGFkZGluZyhhc3BlY3QpfTtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5nZnljYXQtZnJhbWUge1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC5oaWRlciB7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgIGhlaWdodDogNDRweDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ== */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/components/nadepage/GfycatPlayer.tsx */")));
};

/***/ })

})
//# sourceMappingURL=newnade.js.d92f4286f0df318fd6ac.hot-update.js.map