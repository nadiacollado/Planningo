(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    /***/ "./node_modules/web-vitals/dist/web-vitals.js":
      /*!****************************************************!*\
  !*** ./node_modules/web-vitals/dist/web-vitals.js ***!
  \****************************************************/
      /*! exports provided: getCLS, getFCP, getFID, getLCP, getTTFB */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getCLS",
          function () {
            return m;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getFCP",
          function () {
            return S;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getFID",
          function () {
            return E;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getLCP",
          function () {
            return b;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getTTFB",
          function () {
            return F;
          }
        );
        var t,
          e,
          n,
          i,
          a = function (t, e) {
            return {
              name: t,
              value: void 0 === e ? -1 : 0,
              delta: 0,
              entries: [],
              id: "v1-"
                .concat(Date.now(), "-")
                .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
            };
          },
          r = function (t, e) {
            try {
              if (PerformanceObserver.supportedEntryTypes.includes(t)) {
                var n = new PerformanceObserver(function (t) {
                  return t.getEntries().map(e);
                });
                return n.observe({ type: t, buffered: !0 }), n;
              }
            } catch (t) {}
          },
          o = !1,
          u = function (t, e) {
            o ||
              "undefined" != typeof InstallTrigger ||
              (addEventListener("beforeunload", function () {}), (o = !0));
            addEventListener(
              "visibilitychange",
              function n(i) {
                "hidden" === document.visibilityState &&
                  (t(i), e && removeEventListener("visibilitychange", n, !0));
              },
              !0
            );
          },
          c = function (t) {
            addEventListener(
              "pageshow",
              function (e) {
                e.persisted && t(e);
              },
              !0
            );
          },
          s = new WeakSet(),
          f = function (t, e, n) {
            var i;
            return function () {
              e.value >= 0 &&
                (n || s.has(e) || "hidden" === document.visibilityState) &&
                ((e.delta = e.value - (i || 0)),
                (e.delta || void 0 === i) && ((i = e.value), t(e)));
            };
          },
          m = function (t, e) {
            var n,
              i = a("CLS", 0),
              o = function (t) {
                t.hadRecentInput ||
                  ((i.value += t.value), i.entries.push(t), n());
              },
              s = r("layout-shift", o);
            s &&
              ((n = f(t, i, e)),
              u(function () {
                s.takeRecords().map(o), n();
              }),
              c(function () {
                (i = a("CLS", 0)), (n = f(t, i, e));
              }));
          },
          d = -1,
          p = function () {
            return "hidden" === document.visibilityState ? 0 : 1 / 0;
          },
          v = function () {
            u(function (t) {
              var e = t.timeStamp;
              d = e;
            }, !0);
          },
          l = function () {
            return (
              d < 0 &&
                ((d = p()),
                v(),
                c(function () {
                  setTimeout(function () {
                    (d = p()), v();
                  }, 0);
                })),
              {
                get timeStamp() {
                  return d;
                },
              }
            );
          },
          S = function (t, e) {
            var n,
              i = l(),
              o = a("FCP"),
              u = r("paint", function (t) {
                "first-contentful-paint" === t.name &&
                  (u && u.disconnect(),
                  t.startTime < i.timeStamp &&
                    ((o.value = t.startTime),
                    o.entries.push(t),
                    s.add(o),
                    n()));
              });
            u &&
              ((n = f(t, o, e)),
              c(function (i) {
                (o = a("FCP")),
                  (n = f(t, o, e)),
                  requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                      (o.value = performance.now() - i.timeStamp),
                        s.add(o),
                        n();
                    });
                  });
              }));
          },
          y = { passive: !0, capture: !0 },
          h = new Date(),
          g = function (i, a) {
            t ||
              ((t = a), (e = i), (n = new Date()), T(removeEventListener), w());
          },
          w = function () {
            if (e >= 0 && e < n - h) {
              var a = {
                entryType: "first-input",
                name: t.type,
                target: t.target,
                cancelable: t.cancelable,
                startTime: t.timeStamp,
                processingStart: t.timeStamp + e,
              };
              i.map(function (t) {
                t(a);
              }),
                (i = []);
            }
          },
          L = function (t) {
            if (t.cancelable) {
              var e =
                (t.timeStamp > 1e12 ? new Date() : performance.now()) -
                t.timeStamp;
              "pointerdown" == t.type
                ? (function (t, e) {
                    var n = function () {
                        g(t, e), a();
                      },
                      i = function () {
                        a();
                      },
                      a = function () {
                        removeEventListener("pointerup", n, y),
                          removeEventListener("pointercancel", i, y);
                      };
                    addEventListener("pointerup", n, y),
                      addEventListener("pointercancel", i, y);
                  })(e, t)
                : g(e, t);
            }
          },
          T = function (t) {
            ["mousedown", "keydown", "touchstart", "pointerdown"].map(function (
              e
            ) {
              return t(e, L, y);
            });
          },
          E = function (n, o) {
            var m,
              d = l(),
              p = a("FID"),
              v = function (t) {
                t.startTime < d.timeStamp &&
                  ((p.value = t.processingStart - t.startTime),
                  p.entries.push(t),
                  s.add(p),
                  m());
              },
              S = r("first-input", v);
            (m = f(n, p, o)),
              S &&
                u(function () {
                  S.takeRecords().map(v), S.disconnect();
                }, !0),
              S &&
                c(function () {
                  var r;
                  (p = a("FID")),
                    (m = f(n, p, o)),
                    (i = []),
                    (e = -1),
                    (t = null),
                    T(addEventListener),
                    (r = v),
                    i.push(r),
                    w();
                });
          },
          b = function (t, e) {
            var n,
              i = l(),
              o = a("LCP"),
              m = function (t) {
                var e = t.startTime;
                e < i.timeStamp && ((o.value = e), o.entries.push(t)), n();
              },
              d = r("largest-contentful-paint", m);
            if (d) {
              n = f(t, o, e);
              var p = function () {
                s.has(o) ||
                  (d.takeRecords().map(m), d.disconnect(), s.add(o), n());
              };
              ["keydown", "click"].map(function (t) {
                addEventListener(t, p, { once: !0, capture: !0 });
              }),
                u(p, !0),
                c(function (i) {
                  (o = a("LCP")),
                    (n = f(t, o, e)),
                    requestAnimationFrame(function () {
                      requestAnimationFrame(function () {
                        (o.value = performance.now() - i.timeStamp),
                          s.add(o),
                          n();
                      });
                    });
                });
            }
          },
          F = function (t) {
            var e,
              n = a("TTFB");
            (e = function () {
              try {
                var e =
                  performance.getEntriesByType("navigation")[0] ||
                  (function () {
                    var t = performance.timing,
                      e = { entryType: "navigation", startTime: 0 };
                    for (var n in t)
                      "navigationStart" !== n &&
                        "toJSON" !== n &&
                        (e[n] = Math.max(t[n] - t.navigationStart, 0));
                    return e;
                  })();
                (n.value = n.delta = e.responseStart), (n.entries = [e]), t(n);
              } catch (t) {}
            }),
              "complete" === document.readyState
                ? setTimeout(e, 0)
                : addEventListener("pageshow", e);
          };

        /***/
      },
  },
]);
//# sourceMappingURL=0.bundle.js.map
