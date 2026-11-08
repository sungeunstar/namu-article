"use client";

// Recovered from the original production reader (October 14, 2026).
// The deployed reader was missing from Git; preserve its interaction logic here.
import * as r from "react/jsx-runtime";
import * as a from "react";
import * as i from "react-dom";
import { Copy, X, List } from "lucide-react";
import ShareBar from "./ShareBar";
import { useParagraphSelection } from "./ParagraphSelection";
const s = { A: Copy },
  o = { A: X },
  l = { A: List },
  m = { s: useParagraphSelection };
export default function ArticleReader(e) {
  let { items: t, title: n } = e,
    c = (0, m.s)(),
    [d, h] = (0, a.useState)(0),
    [p, g] = (0, a.useState)(null),
    [f, v] = (0, a.useState)(""),
    y = (0, a.useRef)(null),
    b = (0, a.useRef)(null),
    x = (0, a.useRef)(null),
    [w, j] = (0, a.useState)(!1),
    [E, N] = (0, a.useState)(!1),
    [C, R] = (0, a.useState)(!1);
  function S() {
    return t.map((e) => {
      let { id: t, label: n, number: a } = e;
      return (0, r.jsxs)(
        "a",
        {
          href: "#".concat(t),
          "aria-current": f === t ? "location" : void 0,
          onClick: (e) =>
            (function (e, t) {
              e.preventDefault();
              let n = document.getElementById(t);
              n &&
                (y.current && (y.current.open = !1),
                n.focus({ preventScroll: !0 }),
                n.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                }),
                window.history.replaceState(null, "", "#".concat(t)));
            })(e, t),
          children: [
            (0, r.jsx)("span", { className: "tocNumber", children: a }),
            (0, r.jsx)("span", { children: n }),
          ],
        },
        t,
      );
    });
  }
  return (
    (0, a.useEffect)(() => {
      let e,
        t = window.matchMedia("(max-width: 900px)");
      function n() {
        (N(t.matches), R(!1), clearTimeout(e));
      }
      function r() {
        t.matches &&
          (R(!0), clearTimeout(e), (e = setTimeout(() => R(!1), 650)));
      }
      return (
        n(),
        t.addEventListener("change", n),
        window.addEventListener("scroll", r, { passive: !0 }),
        () => {
          (clearTimeout(e),
            t.removeEventListener("change", n),
            window.removeEventListener("scroll", r));
        }
      );
    }, []),
    (0, a.useEffect)(() => {
      let e = document.getElementById("readingBody"),
        n = document.querySelector(".masthead"),
        r = t
          .map((e) => {
            let { id: t } = e;
            return document.getElementById(t);
          })
          .filter(Boolean),
        a = 0;
      function i() {
        var t, i, s;
        if (((a = 0), !e)) return;
        let o = e.getBoundingClientRect(),
          l = window.innerWidth <= 900 ? 8 : 24,
          c = Math.max(
            0,
            null != (i = null == n ? void 0 : n.getBoundingClientRect().bottom)
              ? i
              : 0,
          );
        g((e) => {
          let t = o.right + l;
          return (null == e ? void 0 : e.left) === t &&
            (null == e ? void 0 : e.top) === c
            ? e
            : { left: t, top: c };
        });
        let d = Math.max(1, o.height - window.innerHeight + 64),
          u = Math.max(0, Math.min(1, (64 - o.top) / d));
        h(Math.round(100 * u));
        let m = "";
        for (let e of r) e.getBoundingClientRect().top <= 100 && (m = e.id);
        (u >= 1 &&
          (m = null != (s = null == (t = r.at(-1)) ? void 0 : t.id) ? s : ""),
          v(m));
      }
      function s() {
        a || (a = requestAnimationFrame(i));
      }
      let o = new ResizeObserver(s);
      return (
        e && o.observe(e),
        n && o.observe(n),
        window.addEventListener("scroll", s, { passive: !0 }),
        window.addEventListener("resize", s),
        i(),
        () => {
          (cancelAnimationFrame(a),
            o.disconnect(),
            window.removeEventListener("scroll", s),
            window.removeEventListener("resize", s));
        }
      );
    }, [t]),
    (0, a.useEffect)(() => {
      let e = x.current,
        t = null == e ? void 0 : e.querySelector("a[aria-current]");
      if (!e || !t || 0 === e.clientHeight) return;
      let n = e.getBoundingClientRect(),
        r = t.getBoundingClientRect();
      (r.top < n.top + 40 || r.bottom > n.bottom) &&
        (e.scrollTop += r.top - n.top - 44);
    }, [f]),
    (0, r.jsxs)(r.Fragment, {
      children: [
        E &&
          (0, i.createPortal)(
            (0, r.jsx)("div", {
              className: "mobileReadingStatus",
              children: (0, r.jsx)("div", {
                className: "mobileReadingProgress",
                role: "progressbar",
                "aria-label": "본문 스크롤 진행률",
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": d,
                "aria-orientation": "horizontal",
                children: (0, r.jsx)("div", {
                  style: { transform: "scaleX(".concat(d / 100, ")") },
                }),
              }),
            }),
            document.body,
          ),
        p &&
          (0, i.createPortal)(
            (0, r.jsxs)("aside", {
              className: "readingRail".concat(
                E && C && !w ? " readingRailHidden" : "",
              ),
              "aria-label": "읽기 도구",
              inert: E && C && !w,
              style: E ? void 0 : p,
              children: [
                !E &&
                  (0, r.jsx)("div", {
                    className: "readingProgress",
                    role: "progressbar",
                    "aria-label": "본문 스크롤 진행률",
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    "aria-valuenow": d,
                    "aria-orientation": "vertical",
                    children: (0, r.jsx)("div", {
                      style: {
                        transform: "scaleY(".concat(d / 100, ")"),
                      },
                    }),
                  }),
                (0, r.jsxs)("div", {
                  className: "readingRailTools",
                  children: [
                    (0, r.jsx)(ShareBar, { title: n, variant: "rail" }),
                    (0, r.jsx)("button", {
                      className: "railCopyButton",
                      type: "button",
                      "aria-label": "단락 선택 복사",
                      title: "단락 선택 복사",
                      "aria-pressed": c.selecting,
                      onClick: () => {
                        (y.current && (y.current.open = !1), c.toggleMode());
                      },
                      children: (0, r.jsx)(s.A, {
                        size: 20,
                        "aria-hidden": "true",
                      }),
                    }),
                    (0, r.jsxs)("details", {
                      className: "readerToc",
                      ref: y,
                      onToggle: (e) => j(e.currentTarget.open),
                      onKeyDown: (e) => {
                        "Escape" === e.key &&
                          (e.stopPropagation(),
                          (y.current.open = !1),
                          b.current.focus());
                      },
                      children: [
                        (0, r.jsxs)("summary", {
                          ref: b,
                          "aria-label": "목차",
                          children: [
                            w
                              ? (0, r.jsx)(o.A, {
                                  size: 20,
                                  "aria-hidden": "true",
                                })
                              : (0, r.jsx)(l.A, {
                                  size: 20,
                                  "aria-hidden": "true",
                                }),
                            (0, r.jsx)("span", {
                              className: "srOnly",
                              children: "목차",
                            }),
                          ],
                        }),
                        (0, r.jsxs)("nav", {
                          "aria-label": "펼친 아티클 목차",
                          children: [
                            (0, r.jsxs)("div", {
                              className: "tocHeading",
                              children: [
                                "목차 ",
                                (0, r.jsxs)("span", {
                                  children: [d, "%"],
                                }),
                              ],
                            }),
                            S(),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)("span", {
                  className: "readingRailValue",
                  "aria-hidden": "true",
                  children: [d, "%"],
                }),
              ],
            }),
            document.body,
          ),
        (0, r.jsxs)("nav", {
          className: "desktopToc",
          "aria-label": "아티클 목차",
          ref: x,
          children: [
            (0, r.jsxs)("div", {
              className: "tocHeading",
              children: ["목차 ", (0, r.jsxs)("span", { children: [d, "%"] })],
            }),
            S(),
          ],
        }),
      ],
    })
  );
}
