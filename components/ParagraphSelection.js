"use client";

// Recovered from the original production reader (October 14, 2026).
// The deployed reader was missing from Git; preserve its interaction logic here.
import * as r from "react/jsx-runtime";
import * as a from "react";
import * as i from "react-dom";
import { RotateCcw, Check, Copy, X } from "lucide-react";
const s = { A: RotateCcw },
  o = { A: Check },
  l = { A: Copy },
  c = { A: X };
let d = (0, a.createContext)(null);
export function useParagraphSelection() {
  return (0, a.useContext)(d);
}
export default function ParagraphSelection(e) {
  let { children: t } = e,
    [n, u] = (0, a.useState)(!1),
    [m, h] = (0, a.useState)(new Map()),
    [p, g] = (0, a.useState)(""),
    [f, v] = (0, a.useState)(!1),
    y = (0, a.useRef)(null),
    b = (0, a.useRef)(!1);
  function x() {
    (u(!1), h(new Map()), g(""));
  }
  async function w() {
    if (!m.size || f) return;
    let e = [
        ...document.querySelectorAll("#readingBody .copyBlock[data-copy-id]"),
      ]
        .filter((e) => m.has(e.dataset.copyId))
        .map((e) => m.get(e.dataset.copyId))
        .join("\n\n"),
      t = m.size;
    v(!0);
    try {
      (await navigator.clipboard.writeText(e),
        g("".concat(t, "개 항목 복사됨")));
    } catch (e) {
      g("복사하지 못했어요. 글을 직접 선택해 복사해 주세요.");
    } finally {
      v(!1);
    }
  }
  return (
    (0, a.useEffect)(() => {
      let e;
      if (n) {
        b.current = !0;
        return;
      }
      if (!b.current) return;
      b.current = !1;
      let t = performance.now() + 2e3;
      return (
        (e = requestAnimationFrame(function n() {
          let r = document.querySelector(".railCopyButton");
          (null == r ? void 0 : r.getClientRects().length) &&
          !r.closest("[inert]")
            ? r.focus({ preventScroll: !0 })
            : performance.now() < t && (e = requestAnimationFrame(n));
        })),
        () => cancelAnimationFrame(e)
      );
    }, [n]),
    (0, a.useEffect)(() => {
      if (n)
        return (
          window.addEventListener("keydown", e),
          () => window.removeEventListener("keydown", e)
        );
      function e(e) {
        "Escape" === e.key && x();
      }
    }, [n]),
    (0, a.useEffect)(() => {
      if (!n || !y.current) return;
      let e = document.documentElement,
        t = new ResizeObserver((t) => {
          let [n] = t;
          e.style.setProperty(
            "--selection-toolbar-height",
            "".concat(n.target.getBoundingClientRect().height, "px"),
          );
        });
      return (
        t.observe(y.current),
        () => {
          (t.disconnect(),
            e.style.removeProperty("--selection-toolbar-height"));
        }
      );
    }, [n]),
    (0, a.useEffect)(() => {
      let e,
        t = document.getElementById("readingBody");
      if (!t) return;
      let n = [
        ...t.querySelectorAll(".copyBlock[data-copy-id], .innerDivider"),
      ];
      function r() {
        for (let r = 0; r < n.length; r++) {
          var e;
          let a = n[r],
            i = m.has(a.dataset.copyId),
            s = null != (e = a.closest("section")) ? e : t,
            o = (e) => {
              var n;
              return (
                e &&
                m.has(e.dataset.copyId) &&
                (null != (n = e.closest("section")) ? n : t) === s
              );
            },
            l = i && !o(n[r - 1]),
            c = i && !o(n[r + 1]);
          if (
            (a.classList.toggle("selectionGroupStart", !!l),
            a.classList.toggle("selectionGroupEnd", !!c),
            !i)
          )
            continue;
          let d = a.getBoundingClientRect(),
            u = a.firstElementChild.getBoundingClientRect();
          (a.style.setProperty(
            "--selection-top",
            "".concat(l ? u.top - d.top - 12 : 0, "px"),
          ),
            a.style.setProperty(
              "--selection-bottom",
              "".concat(c ? d.bottom - u.bottom - 12 : 0, "px"),
            ));
        }
      }
      let a = new ResizeObserver(function () {
        (cancelAnimationFrame(e), (e = requestAnimationFrame(r)));
      });
      return (
        a.observe(t),
        r(),
        () => {
          for (let t of (cancelAnimationFrame(e), a.disconnect(), n))
            (t.classList.remove("selectionGroupStart", "selectionGroupEnd"),
              t.style.removeProperty("--selection-top"),
              t.style.removeProperty("--selection-bottom"));
        }
      );
    }, [m]),
    (0, r.jsxs)(d.Provider, {
      value: {
        selecting: n,
        selected: m,
        toggleMode: function () {
          n ? x() : (g(""), u(!0));
        },
        toggleParagraph: function (e, t) {
          (g(""),
            h((n) => {
              let r = new Map(n);
              return (r.has(e) ? r.delete(e) : r.set(e, t), r);
            }));
        },
      },
      children: [
        t,
        n &&
          (0, i.createPortal)(
            (0, r.jsxs)("div", {
              className: "selectionToolbar",
              ref: y,
              role: "region",
              "aria-label": "선택한 제목과 본문 복사",
              children: [
                (0, r.jsx)("div", {
                  className: "selectionToolbarHeading",
                  children: (0, r.jsx)("strong", {
                    children: m.size
                      ? "".concat(m.size, "개 선택")
                      : "눌러서 선택",
                  }),
                }),
                (0, r.jsx)("p", {
                  role: "status",
                  className:
                    p && !p.endsWith("복사됨") ? "selectionStatus" : "srOnly",
                  children:
                    p ||
                    "".concat(
                      m.size,
                      "개 항목 선택됨. 제목과 본문을 눌러 선택하세요.",
                    ),
                }),
                (0, r.jsxs)("div", {
                  className: "selectionToolbarActions",
                  children: [
                    (0, r.jsx)("button", {
                      className: "selectionClear",
                      type: "button",
                      "aria-label": "선택 해제",
                      title: "선택 해제",
                      onClick: function () {
                        (h(new Map()), g(""));
                      },
                      disabled: !m.size || f,
                      children: (0, r.jsx)(s.A, {
                        size: 18,
                        "aria-hidden": "true",
                      }),
                    }),
                    (0, r.jsxs)("button", {
                      className: "selectionCopy",
                      type: "button",
                      onClick: w,
                      disabled: !m.size || f,
                      children: [
                        p.endsWith("복사됨")
                          ? (0, r.jsx)(o.A, {
                              size: 17,
                              "aria-hidden": "true",
                            })
                          : (0, r.jsx)(l.A, {
                              size: 17,
                              "aria-hidden": "true",
                            }),
                        f
                          ? "복사 중"
                          : p.endsWith("복사됨")
                            ? "복사됨"
                            : "복사",
                      ],
                    }),
                  ],
                }),
                (0, r.jsx)("button", {
                  className: "selectionClose",
                  type: "button",
                  "aria-label": "단락 선택 모드 닫기",
                  onClick: x,
                  children: (0, r.jsx)(c.A, {
                    size: 18,
                    "aria-hidden": "true",
                  }),
                }),
              ],
            }),
            document.body,
          ),
      ],
    })
  );
}
