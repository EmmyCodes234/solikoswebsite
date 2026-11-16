import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ChevronLeft, Download, CheckCircle2, Shield, AlertTriangle, Info, Zap } from 'lucide-react';

const fT = ChevronLeft;
const BT = Download;
const dT = CheckCircle2;
const TT = Shield;
const HT = AlertTriangle;
const xT = Info;
const c1 = Zap;
const ws = Link;
const _3 = html2canvas;
const ft = jsPDF;

const ec: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <img
    src="/solikos-icon.png"
    alt="Solikos Icon"
    className={`${className} object-contain`}
  />
);

const y = {
  jsx: (type: any, props: any = {}, key?: any) => {
    const { children, ...rest } = props || {};
    if (key !== undefined) rest.key = key;
    if (Array.isArray(children)) {
      return React.createElement(type, rest, ...children);
    }
    return children !== undefined
      ? React.createElement(type, rest, children)
      : React.createElement(type, rest);
  },
  jsxs: (type: any, props: any = {}, key?: any) => {
    const { children, ...rest } = props || {};
    if (key !== undefined) rest.key = key;
    if (Array.isArray(children)) {
      return React.createElement(type, rest, ...children);
    }
    return children !== undefined
      ? React.createElement(type, rest, children)
      : React.createElement(type, rest);
  },
};

const ae = React;

export const BrandGuidelines = () => {
  const e = ae.useRef(null),
    t = async () => {
      if (!e.current) return;
      const A = new ft("l", "mm", "a4"),
        n = e.current.querySelectorAll(".brand-page");
      for (let a = 0; a < n.length; a++) {
        const s = n[a],
          l = await _3(s, {
            scale: 3,
            useCORS: !0,
            backgroundColor: "#0A0A0A",
            logging: !1,
          }),
          c = l.toDataURL("image/png"),
          f = 297,
          h = (l.height * f) / l.width;
        a > 0 && A.addPage();
        const p = (210 - h) / 2;
        A.addImage(c, "PNG", 0, p > 0 ? p : 0, f, h);
      }
      A.save("Solikos_Brand_Guidelines_2026.pdf");
    };
  return y.jsxs("div", {
    className:
      "min-h-screen bg-[#050505] text-[#F4F4F4] pt-32 pb-24 px-4 md:px-0",
    children: [
      y.jsxs("div", {
        className:
          "fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center bg-gradient-to-b from-[rgba(0,0,0,0.8)] to-transparent backdrop-blur-sm",
        children: [
          y.jsx("div", {
            className: "pointer-events-auto",
            children: y.jsxs(ws, {
              to: "/",
              className:
                "flex items-center gap-2 text-[#B5B0A1] hover:text-[#FFFFFF] transition-colors group",
              children: [
                y.jsx(fT, {
                  className:
                    "w-5 h-5 group-hover:-translate-x-1 transition-transform",
                }),
                y.jsx("span", {
                  className: "text-xs font-bold uppercase tracking-[0.3em]",
                  children: "Institutional Hub",
                }),
              ],
            }),
          }),
          y.jsx("div", {
            className: "pointer-events-auto",
            children: y.jsxs("button", {
              onClick: t,
              className:
                "flex items-center gap-3 bg-[#B5B0A1] text-[#0A0A0A] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#FFFFFF] transition-all shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] active:scale-95 group",
              children: [
                y.jsx(BT, {
                  className:
                    "w-4 h-4 group-hover:translate-y-0.5 transition-transform",
                }),
                "Download Brand Book",
              ],
            }),
          }),
        ],
      }),
      y.jsxs("div", {
        ref: e,
        className: "max-w-[1400px] mx-auto flex flex-col gap-24",
        children: [
          y.jsxs("section", {
            className:
              "brand-page aspect-[1.414/1] w-full bg-[#0A0A0A] p-24 border border-[rgba(255,255,255,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[40px] flex flex-col",
            children: [
              y.jsx("div", {
                className:
                  "absolute top-0 right-0 w-[800px] h-[800px] bg-[rgba(181,176,161,0.05)] rounded-full blur-[160px] -mr-[400px] -mt-[400px]",
              }),
              y.jsx("div", {
                className:
                  "absolute bottom-0 left-0 w-[600px] h-[600px] bg-[rgba(181,176,161,0.05)] rounded-full blur-[140px] -ml-[300px] -mb-[300px]",
              }),
              y.jsx(ec, {
                className:
                  "w-64 h-64 mb-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]",
              }),
              y.jsxs("div", {
                className: "text-center relative z-10",
                children: [
                  y.jsx("h1", {
                    className:
                      "text-[100px] font-bold tracking-tighter leading-none mb-6",
                    style: { fontFamily: "'Outfit', sans-serif" },
                    children: "Solikos Energy Ltd.",
                  }),
                  y.jsx("div", {
                    className: "h-0.5 w-32 bg-[#B5B0A1] mx-auto mb-8",
                  }),
                  y.jsx("p", {
                    className:
                      "text-[#B5B0A1] text-3xl font-light tracking-[0.5em] uppercase",
                    children: "Brand Guidelines 2026",
                  }),
                ],
              }),
              y.jsxs("div", {
                className:
                  "absolute bottom-24 flex gap-24 opacity-20 text-xs uppercase tracking-[0.4em] font-bold",
                children: [
                  y.jsx("span", { children: "Asset Identification Dossier" }),
                  y.jsx("span", {
                    className: "w-1 h-1 bg-[#B5B0A1] rounded-full self-center",
                  }),
                  y.jsx("span", { children: "Class: Confidential" }),
                  y.jsx("span", {
                    className: "w-1 h-1 bg-[#B5B0A1] rounded-full self-center",
                  }),
                  y.jsx("span", { children: "Version 1.5.0" }),
                ],
              }),
            ],
          }),
          y.jsxs("section", {
            className:
              "brand-page aspect-[1.414/1] w-full bg-[#0A0A0A] p-24 border border-[rgba(255,255,255,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[40px] flex flex-col",
            children: [
              y.jsxs("div", {
                className:
                  "flex justify-between items-baseline mb-16 border-b border-[rgba(255,255,255,0.05)] pb-8",
                children: [
                  y.jsx("span", {
                    className:
                      "text-[#B5B0A1] text-xs font-bold uppercase tracking-[0.4em]",
                    children: "02 / Logo System",
                  }),
                  y.jsx("span", {
                    className:
                      "text-[rgba(255,255,255,0.2)] text-[10px] font-bold uppercase tracking-[0.2em]",
                    children: "Solikos Energy Ltd / Guidelines 2026",
                  }),
                ],
              }),
              y.jsxs("div", {
                className: "grid grid-cols-2 gap-16 flex-1",
                children: [
                  y.jsxs("div", {
                    className: "flex flex-col justify-between",
                    children: [
                      y.jsxs("div", {
                        children: [
                          y.jsxs("h2", {
                            className:
                              "text-6xl font-bold tracking-tighter mb-8",
                            style: { fontFamily: "'Outfit', sans-serif" },
                            children: ["The S-Link ", y.jsx("br", {}), "Mark."],
                          }),
                          y.jsxs("div", {
                            className: "grid grid-cols-2 gap-8 mb-12",
                            children: [
                              y.jsxs("div", {
                                className:
                                  "p-10 bg-[rgba(255,255,255,0.05)] rounded-3xl flex flex-col items-center border border-[rgba(255,255,255,0.05)]",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase tracking-widest text-[#B5B0A1] mb-6",
                                    children: "Primary Light",
                                  }),
                                  y.jsx(ec, {
                                    className: "w-32 h-32 brightness-0 invert",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className:
                                  "p-10 bg-[#FFFFFF] rounded-3xl flex flex-col items-center shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase tracking-widest text-[rgba(0,0,0,0.4)] mb-6",
                                    children: "Primary Dark",
                                  }),
                                  y.jsx(ec, {
                                    className: "w-32 h-32 brightness-0",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      y.jsxs("div", {
                        className: "space-y-4",
                        children: [
                          y.jsxs("h4", {
                            className:
                              "flex items-center gap-2 text-[#B5B0A1] text-sm uppercase font-bold tracking-widest",
                            children: [
                              y.jsx(xT, { className: "w-4 h-4" }),
                              "Usage Rules",
                            ],
                          }),
                          y.jsx("p", {
                            className:
                              "text-xs text-[#666] leading-relaxed max-w-md",
                            children:
                              "The mark must never be smaller than 40px in digital or 15mm in print. The clear space (exclusion zone) is strictly defined as the height of the capital 'S'.",
                          }),
                        ],
                      }),
                    ],
                  }),
                  y.jsxs("div", {
                    className:
                      "bg-[#050505] rounded-3xl p-12 border border-[rgba(255,255,255,0.05)] flex flex-col",
                    children: [
                      y.jsxs("h4", {
                        className:
                          "text-xs font-bold uppercase tracking-widest text-[#EF4444] mb-8 flex items-center gap-2",
                        children: [
                          y.jsx(HT, { className: "w-4 h-4" }),
                          "The Hall of Shame (Misuse)",
                        ],
                      }),
                      y.jsx("div", {
                        className: "grid grid-cols-2 gap-6 flex-1",
                        children: [
                          {
                            label: "Do not stretch",
                            effect: "scale-x-150 opacity-40",
                          },
                          {
                            label: "Do not rotate",
                            effect: "rotate-45 opacity-40",
                          },
                          {
                            label: "Do not shadow",
                            effect:
                              "drop-shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] opacity-40",
                          },
                          {
                            label: "Do not recolor",
                            effect: "grayscale invert sepia opacity-40",
                          },
                        ].map((A, n) =>
                          y.jsxs(
                            "div",
                            {
                              className:
                                "flex flex-col items-center justify-center border border-[rgba(239,68,68,0.1)] rounded-2xl bg-[rgba(239,68,68,0.05)] relative group p-6",
                              children: [
                                y.jsx("div", {
                                  className: A.effect,
                                  children: y.jsx(ec, {
                                    className: "w-16 h-16",
                                  }),
                                }),
                                y.jsx("span", {
                                  className:
                                    "mt-4 text-[9px] uppercase tracking-widest text-[#F87171] font-bold",
                                  children: A.label,
                                }),
                                y.jsx("div", {
                                  className:
                                    "absolute inset-0 bg-[rgba(239,68,68,0.1)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl",
                                  children: y.jsx(c1, {
                                    className:
                                      "w-8 h-8 text-[#EF4444] rotate-12",
                                  }),
                                }),
                              ],
                            },
                            n,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          y.jsxs("section", {
            className:
              "brand-page aspect-[1.414/1] w-full bg-[#0A0A0A] p-24 border border-[rgba(255,255,255,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[40px] flex flex-col",
            children: [
              y.jsxs("div", {
                className:
                  "flex justify-between items-baseline mb-16 border-b border-[rgba(255,255,255,0.05)] pb-8",
                children: [
                  y.jsx("span", {
                    className:
                      "text-[#B5B0A1] text-xs font-bold uppercase tracking-[0.4em]",
                    children: "03 / Color Spectrum",
                  }),
                  y.jsx("span", {
                    className:
                      "text-[rgba(255,255,255,0.2)] text-[10px] font-bold uppercase tracking-[0.2em]",
                    children: "Solikos Energy Ltd / Guidelines 2026",
                  }),
                ],
              }),
              y.jsxs("h2", {
                className: "text-6xl font-bold tracking-tighter mb-16",
                style: { fontFamily: "'Outfit', sans-serif" },
                children: [
                  "Achromatic & ",
                  y.jsx("br", {}),
                  "Precision Beige.",
                ],
              }),
              y.jsxs("div", {
                className: "grid grid-cols-3 gap-12 flex-1 items-end",
                children: [
                  y.jsxs("div", {
                    className: "space-y-6",
                    children: [
                      y.jsxs("div", {
                        className:
                          "aspect-[4/5] bg-[#050505] rounded-[32px] border border-[rgba(255,255,255,0.1)] p-10 flex flex-col justify-between",
                        children: [
                          y.jsxs("div", {
                            children: [
                              y.jsx("h3", {
                                className:
                                  "text-3xl font-bold tracking-tighter mb-2",
                                children: "Charcoal Depth",
                              }),
                              y.jsx("p", {
                                className: "text-[#666] text-xs",
                                children:
                                  "Primary foundation. Signifies structural power.",
                              }),
                            ],
                          }),
                          y.jsxs("div", {
                            className: "space-y-4",
                            children: [
                              y.jsxs("div", {
                                className:
                                  "flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-2",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[#444] font-bold",
                                    children: "HEX",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "#050505",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className:
                                  "flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-2",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[#444] font-bold",
                                    children: "RGB",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "5, 5, 5",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className: "flex justify-between",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[#444] font-bold",
                                    children: "PMS",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "Black C",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      y.jsxs("div", {
                        className: "flex items-center gap-2 px-4 opacity-50",
                        children: [
                          y.jsx("div", {
                            className: "w-full h-1 bg-[#050505] rounded-full",
                          }),
                          y.jsx("span", {
                            className:
                              "text-[9px] font-bold uppercase tracking-widest",
                            children: "70%",
                          }),
                        ],
                      }),
                    ],
                  }),
                  y.jsxs("div", {
                    className: "space-y-6 lg:scale-110 lg:-translate-y-8",
                    children: [
                      y.jsxs("div", {
                        className:
                          "aspect-[4/5] bg-[#B5B0A1] text-[#0A0A0A] rounded-[32px] p-10 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
                        children: [
                          y.jsxs("div", {
                            children: [
                              y.jsx("h3", {
                                className:
                                  "text-3xl font-bold tracking-tighter mb-2",
                                children: "Precision Beige",
                              }),
                              y.jsx("p", {
                                className: "text-[rgba(10,10,10,0.6)] text-xs",
                                children:
                                  "Institutional accent. Connects energy to earth.",
                              }),
                            ],
                          }),
                          y.jsxs("div", {
                            className: "space-y-4",
                            children: [
                              y.jsxs("div", {
                                className:
                                  "flex justify-between border-b border-[rgba(0,0,0,0.05)] pb-2",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[rgba(0,0,0,0.3)] font-bold",
                                    children: "HEX",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "#B5B0A1",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className:
                                  "flex justify-between border-b border-[rgba(0,0,0,0.05)] pb-2",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[rgba(0,0,0,0.3)] font-bold",
                                    children: "RGB",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "181, 176, 161",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className: "flex justify-between",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[rgba(0,0,0,0.3)] font-bold",
                                    children: "PMS",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "7528 C",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      y.jsxs("div", {
                        className: "flex items-center gap-2 px-4",
                        children: [
                          y.jsx("div", {
                            className:
                              "w-full h-2 bg-[#B5B0A1] rounded-full shadow-[0_0_20px_rgba(181,176,161,0.3)]",
                          }),
                          y.jsx("span", {
                            className:
                              "text-[9px] font-bold uppercase tracking-widest",
                            children: "20%",
                          }),
                        ],
                      }),
                    ],
                  }),
                  y.jsxs("div", {
                    className: "space-y-6",
                    children: [
                      y.jsxs("div", {
                        className:
                          "aspect-[4/5] bg-[#F4F4F4] text-[#0A0A0A] rounded-[32px] p-10 flex flex-col justify-between shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)]",
                        children: [
                          y.jsxs("div", {
                            children: [
                              y.jsx("h3", {
                                className:
                                  "text-3xl font-bold tracking-tighter mb-2",
                                children: "Paper White",
                              }),
                              y.jsx("p", {
                                className: "text-[rgba(10,10,10,0.4)] text-xs",
                                children:
                                  "Clarity & Space. Defines the focus area.",
                              }),
                            ],
                          }),
                          y.jsxs("div", {
                            className: "space-y-4",
                            children: [
                              y.jsxs("div", {
                                className:
                                  "flex justify-between border-b border-[rgba(0,0,0,0.05)] pb-2",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[rgba(0,0,0,0.2)] font-bold",
                                    children: "HEX",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "#F4F4F4",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className:
                                  "flex justify-between border-b border-[rgba(0,0,0,0.05)] pb-2",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[rgba(0,0,0,0.2)] font-bold",
                                    children: "RGB",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "244, 244, 244",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className: "flex justify-between",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] uppercase text-[rgba(0,0,0,0.2)] font-bold",
                                    children: "PMS",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-mono font-bold",
                                    children: "White C",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      y.jsxs("div", {
                        className: "flex items-center gap-2 px-4 opacity-70",
                        children: [
                          y.jsx("div", {
                            className: "w-full h-1 bg-[#FFFFFF] rounded-full",
                          }),
                          y.jsx("span", {
                            className:
                              "text-[9px] font-bold uppercase tracking-widest",
                            children: "10%",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          y.jsxs("section", {
            className:
              "brand-page aspect-[1.414/1] w-full bg-[#0A0A0A] p-24 border border-[rgba(255,255,255,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[40px] flex flex-col",
            children: [
              y.jsxs("div", {
                className:
                  "flex justify-between items-baseline mb-16 border-b border-[rgba(255,255,255,0.05)] pb-8",
                children: [
                  y.jsx("span", {
                    className:
                      "text-[#B5B0A1] text-xs font-bold uppercase tracking-[0.4em]",
                    children: "04 / Typography",
                  }),
                  y.jsx("span", {
                    className:
                      "text-[rgba(255,255,255,0.2)] text-[10px] font-bold uppercase tracking-[0.2em]",
                    children: "Solikos Energy Ltd / Guidelines 2026",
                  }),
                ],
              }),
              y.jsxs("div", {
                className: "grid grid-cols-2 gap-20 flex-1",
                children: [
                  y.jsxs("div", {
                    className: "flex flex-col justify-between",
                    children: [
                      y.jsxs("div", {
                        children: [
                          y.jsxs("h2", {
                            className:
                              "text-6xl font-bold tracking-tighter mb-8",
                            style: { fontFamily: "'Outfit', sans-serif" },
                            children: [
                              "The Visual ",
                              y.jsx("br", {}),
                              "Voice.",
                            ],
                          }),
                          y.jsxs("div", {
                            className:
                              "p-10 bg-[rgba(255,255,255,0.05)] rounded-3xl border border-[rgba(255,255,255,0.05)]",
                            children: [
                              y.jsx("span", {
                                className:
                                  "text-[80px] font-bold tracking-tighter leading-none",
                                style: { fontFamily: "'Outfit', sans-serif" },
                                children: "Aa Bb Cc",
                              }),
                              y.jsx("div", {
                                className:
                                  "h-px w-full bg-[rgba(255,255,255,0.1)] my-8",
                              }),
                              y.jsx("p", {
                                className:
                                  "text-xl text-[#888] tracking-widest uppercase",
                                children: "Outfit Bold",
                              }),
                            ],
                          }),
                        ],
                      }),
                      y.jsxs("div", {
                        className:
                          "p-8 bg-[rgba(255,255,255,0.05)] rounded-3xl border border-[rgba(255,255,255,0.05)] flex gap-8",
                        children: [
                          y.jsxs("div", {
                            className: "flex-1",
                            children: [
                              y.jsx("h4", {
                                className:
                                  "text-[10px] uppercase font-bold tracking-widest text-[#B5B0A1] mb-2",
                                children: "Usage",
                              }),
                              y.jsx("p", {
                                className:
                                  "text-[11px] text-[#666] leading-relaxed",
                                children:
                                  "Headlines, brand slogans, and institutional data markers.",
                              }),
                            ],
                          }),
                          y.jsxs("div", {
                            className: "flex-1",
                            children: [
                              y.jsx("h4", {
                                className:
                                  "text-[10px] uppercase font-bold tracking-widest text-[#B5B0A1] mb-2",
                                children: "Attributes",
                              }),
                              y.jsx("p", {
                                className:
                                  "text-[11px] text-[#666] leading-relaxed",
                                children:
                                  "Tight tracking (-0.05em), bold weights only.",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  y.jsxs("div", {
                    className: "space-y-12",
                    children: [
                      y.jsxs("div", {
                        children: [
                          y.jsx("span", {
                            className:
                              "text-[10px] font-bold uppercase tracking-widest text-[#444] block mb-4",
                            children: "TYPOGRAPHIC HIERARCHY",
                          }),
                          y.jsxs("div", {
                            className: "space-y-8",
                            children: [
                              y.jsxs("div", {
                                className:
                                  "flex items-baseline justify-between border-b border-[rgba(255,255,255,0.05)] pb-4",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-4xl font-bold tracking-tighter",
                                    style: {
                                      fontFamily: "'Outfit', sans-serif",
                                    },
                                    children: "Headline H1",
                                  }),
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] font-bold opacity-30",
                                    children: "OUTFIT BOLD / 80PX / -0.05EM",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className:
                                  "flex items-baseline justify-between border-b border-[rgba(255,255,255,0.05)] pb-4",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-2xl font-bold tracking-tight",
                                    style: {
                                      fontFamily: "'Outfit', sans-serif",
                                    },
                                    children: "Section Header H2",
                                  }),
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] font-bold opacity-30",
                                    children: "OUTFIT BOLD / 40PX / -0.02EM",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className:
                                  "flex items-baseline justify-between border-b border-[rgba(255,255,255,0.05)] pb-4",
                                children: [
                                  y.jsx("span", {
                                    className: "text-lg font-medium opacity-80",
                                    children: "Body Copy Regular",
                                  }),
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] font-bold opacity-30",
                                    children: "JAKARTA / 18PX / NORMAL",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className:
                                  "flex items-baseline justify-between border-b border-[rgba(255,255,255,0.05)] pb-4",
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-xs uppercase font-bold tracking-widest text-[#B5B0A1]",
                                    children: "Functional Label ",
                                  }),
                                  y.jsx("span", {
                                    className:
                                      "text-[10px] font-bold opacity-30",
                                    children: "OUTFIT / 12PX / 0.5EM",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      y.jsxs("div", {
                        className:
                          "p-8 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)]",
                        children: [
                          y.jsx("h4", {
                            className:
                              "text-[10px] uppercase font-bold tracking-[0.3em] text-[#B5B0A1] mb-6",
                            children: "Web Safety & Fallbacks",
                          }),
                          y.jsxs("div", {
                            className: "grid grid-cols-2 gap-6",
                            children: [
                              y.jsxs("div", {
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[9px] font-bold opacity-30 block mb-1",
                                    children: "Display Fallback",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-medium",
                                    children: "Arial Bold",
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                children: [
                                  y.jsx("span", {
                                    className:
                                      "text-[9px] font-bold opacity-30 block mb-1",
                                    children: "Body Fallback",
                                  }),
                                  y.jsx("span", {
                                    className: "text-xs font-medium",
                                    children: "Helvetica Narrow",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          y.jsxs("section", {
            className:
              "brand-page aspect-[1.414/1] w-full bg-[#0A0A0A] p-24 border border-[rgba(255,255,255,0.05)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[40px] flex flex-col justify-between",
            children: [
              y.jsxs("div", {
                children: [
                  y.jsxs("div", {
                    className:
                      "flex justify-between items-baseline mb-16 border-b border-[rgba(255,255,255,0.05)] pb-8",
                    children: [
                      y.jsx("span", {
                        className:
                          "text-[#B5B0A1] text-xs font-bold uppercase tracking-[0.4em]",
                        children: "05 / Digital Identity",
                      }),
                      y.jsx("span", {
                        className:
                          "text-[rgba(255,255,255,0.2)] text-[10px] font-bold uppercase tracking-[0.2em]",
                        children: "Solikos Energy Ltd / Guidelines 2026",
                      }),
                    ],
                  }),
                  y.jsxs("div", {
                    className: "grid grid-cols-2 gap-20",
                    children: [
                      y.jsxs("div", {
                        children: [
                          y.jsxs("h2", {
                            className:
                              "text-6xl font-bold tracking-tighter mb-8",
                            style: { fontFamily: "'Outfit', sans-serif" },
                            children: [
                              "Interaction ",
                              y.jsx("br", {}),
                              "Infrastructure.",
                            ],
                          }),
                          y.jsxs("div", {
                            className: "space-y-6",
                            children: [
                              y.jsxs("div", {
                                className:
                                  "p-8 bg-[rgba(255,255,255,0.05)] rounded-3xl border border-[rgba(255,255,255,0.05)] relative group cursor-pointer",
                                children: [
                                  y.jsxs("div", {
                                    className:
                                      "flex items-center justify-between mb-4",
                                    children: [
                                      y.jsx("span", {
                                        className:
                                          "text-[10px] font-bold uppercase tracking-widest text-[#444]",
                                        children: "Button State (Main)",
                                      }),
                                      y.jsx(dT, {
                                        className: "w-4 h-4 text-[#B5B0A1]",
                                      }),
                                    ],
                                  }),
                                  y.jsxs("div", {
                                    className: "flex gap-4",
                                    children: [
                                      y.jsx("div", {
                                        className:
                                          "px-6 py-3 bg-[#B5B0A1] text-[#0A0A0A] rounded-full text-[10px] uppercase font-bold tracking-widest",
                                        children: "Default",
                                      }),
                                      y.jsx("div", {
                                        className:
                                          "px-6 py-3 bg-[#FFFFFF] text-[#0A0A0A] rounded-full text-[10px] uppercase font-bold tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)]",
                                        children: "Hover",
                                      }),
                                      y.jsx("div", {
                                        className:
                                          "px-6 py-3 border border-[rgba(255,255,255,0.2)] text-[#FFFFFF] rounded-full text-[10px] uppercase font-bold tracking-widest",
                                        children: "Ghost",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              y.jsxs("div", {
                                className:
                                  "p-8 bg-[rgba(255,255,255,0.05)] rounded-3xl border border-[rgba(255,255,255,0.05)]",
                                children: [
                                  y.jsxs("div", {
                                    className:
                                      "flex items-center justify-between mb-6",
                                    children: [
                                      y.jsx("span", {
                                        className:
                                          "text-[10px] font-bold uppercase tracking-widest text-[#444]",
                                        children: "Grid System",
                                      }),
                                      y.jsx(TT, {
                                        className: "w-4 h-4 text-[#B5B0A1]",
                                      }),
                                    ],
                                  }),
                                  y.jsx("div", {
                                    className: "grid grid-cols-12 gap-2 h-12",
                                    children: [...Array(12)].map((A, n) =>
                                      y.jsx(
                                        "div",
                                        {
                                          className: `h-full rounded-sm ${n % 2 === 0 ? "bg-[rgba(181,176,161,0.2)]" : "bg-[rgba(255,255,255,0.05)]"}`,
                                        },
                                        n,
                                      ),
                                    ),
                                  }),
                                  y.jsx("p", {
                                    className:
                                      "mt-4 text-[10px] text-[#666] uppercase tracking-[0.2em] font-bold",
                                    children:
                                      "12-Column Institutional Grid / 32px Gutter",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      y.jsx("div", {
                        className: "flex flex-col justify-center",
                        children: y.jsxs("div", {
                          className:
                            "p-10 bg-[rgba(181,176,161,0.05)] border border-[rgba(181,176,161,0.1)] rounded-[40px] relative overflow-hidden group",
                          children: [
                            y.jsx("div", {
                              className: "absolute top-0 right-0 p-8",
                              children: y.jsx(c1, {
                                className:
                                  "w-12 h-12 text-[rgba(181,176,161,0.2)]",
                              }),
                            }),
                            y.jsx("h3", {
                              className:
                                "text-4xl font-bold tracking-tighter mb-6 text-[#B5B0A1]",
                              style: { fontFamily: "'Outfit', sans-serif" },
                              children: "The CAREs Ethos.",
                            }),
                            y.jsxs("div", {
                              className: "space-y-6",
                              children: [
                                y.jsxs("div", {
                                  className: "flex gap-4",
                                  children: [
                                    y.jsx("span", {
                                      className:
                                        "text-xl font-bold text-[#B5B0A1]",
                                      children: "C",
                                    }),
                                    y.jsxs("p", {
                                      className:
                                        "text-xs text-[#888] leading-relaxed",
                                      children: [
                                        y.jsx("strong", {
                                          className: "text-[#FFFFFF]",
                                          children: "Creative.",
                                        }),
                                        " Bespoke engineering for universal energy access.",
                                      ],
                                    }),
                                  ],
                                }),
                                y.jsxs("div", {
                                  className: "flex gap-4",
                                  children: [
                                    y.jsx("span", {
                                      className:
                                        "text-xl font-bold text-[#B5B0A1]",
                                      children: "A",
                                    }),
                                    y.jsxs("p", {
                                      className:
                                        "text-xs text-[#888] leading-relaxed",
                                      children: [
                                        y.jsx("strong", {
                                          className: "text-[#FFFFFF]",
                                          children: "Audacious.",
                                        }),
                                        " Targeting transformative impact across emerging industrial communities.",
                                      ],
                                    }),
                                  ],
                                }),
                                y.jsxs("div", {
                                  className: "flex gap-4",
                                  children: [
                                    y.jsx("span", {
                                      className:
                                        "text-xl font-bold text-[#B5B0A1]",
                                      children: "R",
                                    }),
                                    y.jsxs("p", {
                                      className:
                                        "text-xs text-[#888] leading-relaxed",
                                      children: [
                                        y.jsx("strong", {
                                          className: "text-[#FFFFFF]",
                                          children: "Respectful.",
                                        }),
                                        " Unwavering commitment to regulatory compliance.",
                                      ],
                                    }),
                                  ],
                                }),
                                y.jsxs("div", {
                                  className: "flex gap-4",
                                  children: [
                                    y.jsx("span", {
                                      className:
                                        "text-xl font-bold text-[#B5B0A1]",
                                      children: "E",
                                    }),
                                    y.jsxs("p", {
                                      className:
                                        "text-xs text-[#888] leading-relaxed",
                                      children: [
                                        y.jsx("strong", {
                                          className: "text-[#FFFFFF]",
                                          children: "Empathetic.",
                                        }),
                                        " Centering energy as a human right for prosperity.",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              y.jsxs("div", {
                className:
                  "flex justify-between items-center text-[10px] font-bold opacity-10 uppercase tracking-[0.5em] pt-8",
                children: [
                  y.jsx("span", { children: "Engineering Prosperity" }),
                  y.jsx("span", { children: "© 2026 Solikos Energy Ltd" }),
                  y.jsx("span", { children: "All Rights Reserved" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default BrandGuidelines;
