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
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["238855463", [aspectToPadding(aspect)]]]) + " " + "gfycat-container"
  }, __jsx("iframe", {
    src: "https://gfycat.com/ifr/".concat(gfycatID) || false,
    allowFullScreen: true,
    scrolling: "no",
    allow: "encrypted-media",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["238855463", [aspectToPadding(aspect)]]]) + " " + "gfycat-frame"
  }), __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a.dynamic([["238855463", [aspectToPadding(aspect)]]]) + " " + "hider"
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "238855463",
    dynamic: [aspectToPadding(aspect)]
  }, ".gfycat-container.__jsx-style-dynamic-selector{position:relative;left:0;width:100%;height:0;padding-bottom:".concat(aspectToPadding(aspect), ";overflow:hidden;border-radius:3px;padding-top:38px;}.gfycat-frame.__jsx-style-dynamic-selector{position:absolute;border:0;top:0;left:0;right:0;width:100%;height:100%;}.hider.__jsx-style-dynamic-selector{border:1px solid white;position:absolute;bottom:0;left:0;right:0;height:44px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9tZWxsZXQvRGV2ZWxvcG1lbnQvQ3NHb05hZGVzL2NzZ29uYWRlcy1jbGllbnQvc3JjL2NvbXBvbmVudHMvbmFkZXBhZ2UvR2Z5Y2F0UGxheWVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQmtCLEFBRzZCLEFBV0EsQUFTSyxrQkFuQmhCLEFBV0UsS0FTUyxFQW5CUCxFQVdMLE1BQ0MsR0FYRSxJQVlELENBT0MsSUFsQm1DLEdBWWpDLEVBT0osT0FDQyxFQVBJLE1BUUEsTUFQZCxNQVFBLFlBckJrQixnQkFDRSxrQkFDRCxpQkFDbkIiLCJmaWxlIjoiL1VzZXJzL21lbGxldC9EZXZlbG9wbWVudC9Dc0dvTmFkZXMvY3Nnb25hZGVzLWNsaWVudC9zcmMvY29tcG9uZW50cy9uYWRlcGFnZS9HZnljYXRQbGF5ZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFzcGVjdCB9IGZyb20gXCIuL0dmeWNhdFBsYXllckNvbnRhaW5lclwiO1xuXG50eXBlIFByb3BzID0ge1xuICBnZnljYXRJRD86IHN0cmluZztcbiAgYXNwZWN0PzogQXNwZWN0O1xufTtcblxuZXhwb3J0IGNvbnN0IEdmeUNhdFBsYXllcjogRkM8UHJvcHM+ID0gKHsgZ2Z5Y2F0SUQsIGFzcGVjdCB9KSA9PiB7XG4gIGZ1bmN0aW9uIGFzcGVjdFRvUGFkZGluZyhhc3BlY3Q/OiBBc3BlY3QpIHtcbiAgICBzd2l0Y2ggKGFzcGVjdCkge1xuICAgICAgY2FzZSBcIjE2OjEwXCI6XG4gICAgICAgIHJldHVybiBcIjY1JVwiO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiNTcuNSVcIjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2Z5Y2F0LWNvbnRhaW5lclwiPlxuICAgICAgPGlmcmFtZVxuICAgICAgICBjbGFzc05hbWU9XCJnZnljYXQtZnJhbWVcIlxuICAgICAgICBzcmM9e1xuICAgICAgICAgIGBodHRwczovL2dmeWNhdC5jb20vaWZyLyR7Z2Z5Y2F0SUR9YCB8fFxuICAgICAgICAgIFwiaHR0cHM6Ly9nZnljYXQuY29tL2lmci9zZWxmaXNoYmxhcmluZ2JsYWNrYnVja1wiXG4gICAgICAgIH1cbiAgICAgICAgYWxsb3dGdWxsU2NyZWVuXG4gICAgICAgIHNjcm9sbGluZz1cIm5vXCJcbiAgICAgICAgYWxsb3c9XCJlbmNyeXB0ZWQtbWVkaWFcIlxuICAgICAgPjwvaWZyYW1lPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRlclwiIC8+XG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5nZnljYXQtY29udGFpbmVyIHtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgICAgcGFkZGluZy1ib3R0b206ICR7YXNwZWN0VG9QYWRkaW5nKGFzcGVjdCl9O1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgIHBhZGRpbmctdG9wOiAzOHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmdmeWNhdC1mcmFtZSB7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLmhpZGVyIHtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgaGVpZ2h0OiA0NHB4O1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19 */\n/*@ sourceURL=/Users/mellet/Development/CsGoNades/csgonades-client/src/components/nadepage/GfycatPlayer.tsx */")));
};

/***/ })

})
//# sourceMappingURL=newnade.js.b79cdd328e8c10cc904e.hot-update.js.map