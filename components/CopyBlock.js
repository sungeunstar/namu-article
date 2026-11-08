"use client";

// Recovered from the original production reader (October 14, 2026).
// The deployed reader was missing from Git; preserve its interaction logic here.
import * as r from "react/jsx-runtime";
import * as a from "react";
import { Check, Copy } from "lucide-react";
import { useParagraphSelection } from "./ParagraphSelection";
const i = { A: Check },
  s = { A: Copy },
  o = { s: useParagraphSelection };
export default function CopyBlock(e) {
  let { text: t, children: n, className: l = "", kind: c = "단락" } = e,
    d = (0, a.useId)(),
    u = (0, o.s)(),
    m = null == u ? void 0 : u.selecting,
    h = null == u ? void 0 : u.selected.has(d),
    [p, g] = (0, a.useState)("idle"),
    f = (0, a.useRef)(null);
  async function v() {
    clearTimeout(f.current);
    try {
      (await navigator.clipboard.writeText(t), g("copied"));
    } catch (e) {
      g("error");
    }
    f.current = setTimeout(() => g("idle"), 2400);
  }
  (0, a.useEffect)(() => () => clearTimeout(f.current), []);
  let y =
    "copied" === p
      ? "복사됨"
      : "error" === p
        ? "복사하지 못했습니다. 글을 선택해 복사해 주세요."
        : "".concat(c, " 복사");
  return (0, r.jsxs)("div", {
    className: "copyBlock "
      .concat(l)
      .concat(m ? " selectableParagraph" : "")
      .concat(h ? " selectedParagraph" : ""),
    "data-copy-id": d,
    onClick: m
      ? (e) => {
          e.target.closest("button, input, a") || u.toggleParagraph(d, t);
        }
      : void 0,
    children: [
      n,
      m
        ? (0, r.jsx)("input", {
            className: "paragraphCheckbox srOnly",
            type: "checkbox",
            checked: !!h,
            "aria-label": "".concat(c, " 선택: ").concat(t.slice(0, 45)),
            onChange: () => u.toggleParagraph(d, t),
          })
        : (0, r.jsxs)("button", {
            className: "copyButton",
            type: "button",
            onClick: v,
            "aria-label": y,
            children: [
              "copied" === p
                ? (0, r.jsx)(i.A, { size: 16, "aria-hidden": "true" })
                : (0, r.jsx)(s.A, { size: 16, "aria-hidden": "true" }),
              (0, r.jsx)("span", {
                className: "copyTooltip",
                "aria-hidden": "true",
                children: y,
              }),
            ],
          }),
      (0, r.jsx)("span", {
        className: "srOnly",
        role: "status",
        children: "idle" === p ? "" : y,
      }),
    ],
  });
}
