import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server.browser";
import { ServerRouter, Link, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts, useLocation, useLoaderData } from "react-router";
import { useState, useRef, useEffect } from "react";
import { X, ArrowRight, Menu, MoveRight, ArrowDown, ChevronDown, Upload } from "lucide-react";
import { createClient } from "@sanity/client";
const streamTimeout = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, routerContext) {
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
    {
      onError(error) {
        responseStatusCode = 500;
        if (shellRendered) {
          console.error(error);
        }
      }
    }
  );
  shellRendered = true;
  if (isbot(userAgent)) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function FloatingContactPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const lastScrollY = useRef(0);
  const lastDirection = useRef("up");
  const thresholdY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      if (currentScrollY <= heroHeight - 100) {
        setIsVisible(false);
        lastDirection.current = currentScrollY > lastScrollY.current ? "down" : "up";
        lastScrollY.current = currentScrollY;
        return;
      }
      const isScrollingDown = currentScrollY > lastScrollY.current;
      if (isScrollingDown) {
        if (lastDirection.current === "up") {
          lastDirection.current = "down";
        }
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        if (lastDirection.current === "down") {
          lastDirection.current = "up";
          thresholdY.current = currentScrollY;
        }
        if (thresholdY.current - currentScrollY >= 100) {
          setIsVisible(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsExpanded(true),
        className: `fixed z-50 bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 w-[calc(100%-32px)] md:w-auto bg-[#1A1A1A]/90 backdrop-blur-md border border-white/50 px-[22px] py-[18px] md:py-[16px] flex items-center justify-center transition-all ease-out ${isVisible && !isExpanded ? "opacity-100 pointer-events-auto duration-[250ms] delay-[50ms]" : "opacity-0 pointer-events-none duration-[200ms]"} hover:bg-[#1A1A1A]`,
        "aria-label": "Open expedition desk contact panel",
        "aria-hidden": !isVisible || isExpanded,
        tabIndex: isVisible && !isExpanded ? 0 : -1,
        children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] md:text-[11px] text-white", children: "SPEAK WITH THE EXPEDITION DESK" })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-black/20 z-40 transition-opacity duration-[250ms] ease-in ${isExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
        onClick: () => setIsExpanded(false)
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed z-50 bottom-0 left-0 w-full md:left-auto md:bottom-6 md:right-6 md:w-[420px] md:max-w-[92vw] bg-[#1A1A1A]/96 backdrop-blur-lg border-t md:border border-white/20 p-6 md:p-8 transition-all duration-[300ms] ease-out ${isExpanded ? "opacity-100 pointer-events-auto translate-y-0 md:translate-x-0" : "opacity-0 pointer-events-none translate-y-[120%] md:translate-y-0 md:translate-x-[120%]"}`,
        role: "dialog",
        "aria-modal": isExpanded,
        "aria-hidden": !isExpanded,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "THE EXPEDITION DESK" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsExpanded(false),
                className: "border border-transparent hover:border-white/50 p-0.5 transition-colors",
                "aria-label": "Close contact panel",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-white", strokeWidth: 1 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[24px] md:text-[32px] leading-[1.15] text-white mb-4", children: "Need guidance?" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] md:text-[15px] text-[#C8CDD2] leading-[1.6] mb-7", children: "Not sure which mountain or edition is right for you? Begin with a private message to the expedition desk." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2.5 mb-6", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#whatsapp-pending",
                className: "flex flex-col border border-white/40 hover:border-white/70 px-[18px] py-[14px] transition-colors group text-left",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white", children: "WHATSAPP THE EXPEDITION DESK" }),
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 text-white transition-transform group-hover:translate-x-1", strokeWidth: 1.5 })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mt-1 block", children: "[CLIENT TO CONFIRM] — WHATSAPP NUMBER PENDING." })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/consultation",
                className: "flex justify-between items-center border border-white/40 hover:border-white/70 px-[18px] py-[14px] transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white", children: "SCHEDULE A CONSULTATION" }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 text-white transition-transform group-hover:translate-x-1", strokeWidth: 1.5 })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#email-pending",
                className: "flex flex-col border border-white/40 hover:border-white/70 px-[18px] py-[14px] transition-colors group text-left",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white", children: "EMAIL THE DESK" }),
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 text-white transition-transform group-hover:translate-x-1", strokeWidth: 1.5 })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mt-1 block", children: "[CLIENT TO CONFIRM] — EMAIL ADDRESS PENDING." })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[14px] text-[#C8CDD2]", children: "Handled discreetly by senior expedition staff." })
        ]
      }
    )
  ] });
}
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("title", {
        children: "Thamserku Expedition"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "bg-[#1A1A1A] min-h-screen text-white font-['Lexend'] selection:bg-[#0A3A77] selection:text-white",
      children: [children, /* @__PURE__ */ jsx(FloatingContactPrompt, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function Root() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const svgPaths = {
  p13703280: "M635.788 92.6556C636.132 96.56 637.204 99.5074 639.003 101.498C639.309 102.378 639.902 102.991 640.783 103.335C641.663 103.641 642.869 103.89 644.4 104.082C645.549 104.235 646.41 104.388 646.984 104.541C647.558 104.656 648.056 104.886 648.477 105.23L648.362 108.216H612.591L612.476 105.23L614.256 104.656C616.285 104.005 617.912 103.412 619.136 102.876C620.361 102.302 621.414 101.479 622.294 100.407C623.175 99.2969 623.615 97.8614 623.615 96.1006L620.055 46.8938L598.122 96.4451C596.782 99.4691 595.385 103.393 593.93 108.216H589.394C587.825 104.694 585.203 99.2012 581.528 91.7369C576.705 81.708 572.858 73.5929 569.987 67.3919C567.116 61.1525 564.494 55.0662 562.121 49.1331C561.853 52.3867 561.374 57.0376 560.685 63.0855C559.92 70.1288 559.346 76.0236 558.963 80.7701C558.58 85.5167 558.389 90.2249 558.389 94.8949C558.389 96.9619 558.772 98.6079 559.537 99.8328C560.303 101.019 561.26 101.919 562.408 102.531C563.595 103.144 565.241 103.814 567.346 104.541L569.355 105.23L569.241 108.216H541.451L541.336 105.23C541.642 105.115 542.656 104.752 544.379 104.139C546.216 103.527 547.671 102.952 548.743 102.417C549.814 101.842 550.733 101.019 551.499 99.9476C552.302 98.8758 552.8 97.4212 552.991 95.5839L557.355 52.6355C557.623 49.8795 557.757 47.4297 557.757 45.2861C557.757 43.6784 557.451 42.3961 556.838 41.4391C556.264 40.4822 555.518 39.774 554.599 39.3147C553.68 38.8553 552.456 38.3769 550.924 37.8792C549.317 37.3816 548.054 36.884 547.135 36.3864L547.25 33.4581H569.585C570.312 36.5586 571.059 39.353 571.824 41.841C572.628 44.2909 573.547 46.6258 574.58 48.846L595.251 92.8852L615.749 46.1474C616.744 43.8889 617.452 41.6688 617.873 39.4869C618.294 37.2668 618.505 35.2572 618.505 33.4581H642.276V36.4438L641.242 36.7883C639.099 37.5156 637.395 38.1855 636.132 38.7979C634.907 39.4104 633.855 40.3099 632.974 41.4965C632.094 42.6832 631.654 44.2143 631.654 46.0899L635.788 92.6556Z",
  p14631300: "M871.854 77.0954C870.935 75.7174 870.151 74.703 869.5 74.0523C868.887 73.4016 868.141 72.9039 867.261 72.5594C866.38 72.2149 865.175 72.0044 863.643 71.9278L860.026 71.6982V93.8039C860.026 96.56 860.256 98.5887 860.715 99.8902C861.213 101.192 861.863 102.053 862.667 102.474C863.509 102.895 864.753 103.24 866.399 103.507C867.586 103.699 868.639 103.909 869.557 104.139C870.476 104.369 871.433 104.732 872.428 105.23L872.313 108.216H835.968L835.853 105.23C836.887 104.656 837.844 104.254 838.724 104.024C839.643 103.756 840.695 103.527 841.882 103.335C843.413 103.106 844.542 102.78 845.27 102.359C846.035 101.9 846.629 100.924 847.05 99.4308C847.471 97.938 847.681 95.5647 847.681 92.3111V48.7886C847.681 46.0708 847.452 44.0421 846.992 42.7023C846.533 41.3243 845.863 40.3865 844.983 39.8888C844.141 39.353 842.801 38.7979 840.963 38.2237C839.011 37.6878 837.308 37.0945 835.853 36.4438L835.968 33.4581H862.438C869.596 33.4581 875.854 33.7834 881.213 34.4342C886.572 35.0849 891.357 36.8074 895.568 39.6018C899.816 42.3961 901.941 46.7024 901.941 52.5207C901.941 56.1189 900.926 59.2386 898.898 61.8798C896.907 64.4827 894.323 66.5306 891.146 68.0234C888.008 69.5163 884.639 70.5307 881.041 71.0666C881.5 71.679 883.778 74.8561 887.874 80.5979C890.898 84.8851 893.462 88.4641 895.568 91.335C897.711 94.2058 899.836 96.9045 901.941 99.4308C903.204 100.771 904.333 101.823 905.328 102.589C906.324 103.354 907.568 103.967 909.061 104.426C910.553 104.886 912.429 105.115 914.688 105.115V108.331C910.898 109.249 907.53 109.709 904.582 109.709C900.525 109.709 896.792 108.465 893.386 105.976C890.017 103.488 887.089 100.541 884.601 97.1341C882.151 93.7274 879.338 89.3828 876.16 84.1004C874.285 80.885 872.849 78.55 871.854 77.0954ZM862.897 67.8512C867.797 67.8512 872.026 67.5641 875.586 66.9899C879.146 66.4158 882.189 65.0569 884.716 62.9133C887.28 60.7697 888.563 57.5352 888.563 53.2097C888.563 48.4632 887.185 44.9607 884.429 42.7023C881.711 40.4439 878.515 39.0659 874.84 38.5682C871.165 38.0323 866.648 37.7644 861.289 37.7644H860.026V67.8512H862.897Z",
  p14b8fb00: "M1062 36.4438C1060.43 37.018 1058.4 37.5539 1055.91 38.0515C1053.84 38.4725 1052.35 38.951 1051.43 39.4869C1050.55 39.9845 1049.86 40.9798 1049.37 42.4726C1048.91 43.9272 1048.68 46.2622 1048.68 49.4776V73.9949C1048.68 83.22 1050.53 90.4546 1054.25 95.6987C1058 100.905 1064.35 103.507 1073.31 103.507C1089.73 103.507 1097.94 93.3446 1097.94 73.0188V50.4537C1097.94 47.0469 1097.69 44.5588 1097.2 42.9894C1096.74 41.42 1096.01 40.3482 1095.01 39.774C1094.02 39.1616 1092.35 38.5682 1090.02 37.9941C1087.8 37.4199 1085.98 36.884 1084.56 36.3864V33.4581H1115.51L1115.63 36.4438C1115.05 36.75 1114.42 36.9988 1113.73 37.1902C1113.08 37.3433 1112.2 37.5156 1111.09 37.707C1109.64 37.9749 1108.47 38.2429 1107.59 38.5108C1106.71 38.7405 1105.88 39.1616 1105.12 39.774C1104.39 40.3482 1103.87 41.152 1103.57 42.1856C1102.96 44.2909 1102.65 46.7407 1102.65 49.535C1102.65 51.3724 1102.69 54.2815 1102.76 58.2625C1102.84 62.2434 1102.88 65.2291 1102.88 67.2196C1102.88 75.9471 1102.11 83.3157 1100.58 89.3254C1099.09 95.3351 1095.89 100.235 1090.99 104.024C1086.13 107.814 1078.96 109.709 1069.46 109.709C1063.95 109.709 1058.82 108.847 1054.07 107.125C1049.33 105.364 1045.39 102.646 1042.25 98.9715C1039.15 95.2968 1037.31 90.7034 1036.73 85.1913C1036.27 81.2103 1036.05 76.1767 1036.05 70.0905C1036.05 66.5689 1036.1 63.0855 1036.22 59.6405C1036.29 55.0471 1036.33 51.6403 1036.33 49.4202C1036.33 46.5876 1036.14 44.3866 1035.76 42.8171C1035.38 41.286 1034.42 40.1377 1032.89 39.3721C1031.39 38.6065 1029.37 37.8984 1026.8 37.2476C1025.54 36.9031 1024.54 36.616 1023.82 36.3864L1023.99 33.4581H1061.88L1062 36.4438Z",
  p15730e80: "M272.312 37.707C268.79 37.707 265.996 37.8601 263.929 38.1663C262.589 38.3577 261.364 38.8936 260.254 39.774C259.182 40.6544 258.244 41.6497 257.44 42.7597C256.675 43.8698 255.737 45.3627 254.627 47.2383C253.479 49.267 252.483 50.7982 251.641 51.8317H249L250.435 33.1136C256.751 33.3815 264.905 33.5155 274.895 33.5155L297.288 33.4581H304.81C312.542 33.4581 318.801 33.305 323.585 32.9987L325.423 51.8891H322.667C322.093 51.2001 321.499 50.3388 320.887 49.3053C320.274 48.2335 319.872 47.5445 319.681 47.2383C318.15 44.5205 316.714 42.3961 315.375 40.8649C314.073 39.3338 312.523 38.4343 310.724 38.1663C309.422 37.9749 308.102 37.8601 306.762 37.8218C305.461 37.7453 303.815 37.707 301.824 37.707H293.039V94.3781C293.039 97.3255 293.537 99.5265 294.532 100.981C295.566 102.397 296.905 103.354 298.551 103.852C300.236 104.35 302.724 104.809 306.016 105.23C306.016 106.57 305.977 107.565 305.901 108.216H267.89L267.776 105.23C268.426 105 269.441 104.694 270.819 104.311C273.077 103.622 274.857 102.972 276.159 102.359C277.46 101.747 278.532 100.809 279.374 99.5457C280.254 98.2825 280.694 96.56 280.694 94.3781V37.707H272.312Z",
  p15791500: "M442.516 175.62V150.574H455.933C457.365 150.574 458.677 150.919 459.869 151.611C461.086 152.279 462.052 153.197 462.767 154.366C463.483 155.535 463.841 156.835 463.841 158.266C463.841 159.745 463.447 161.093 462.66 162.309C461.897 163.526 460.883 164.492 459.619 165.208C458.355 165.923 456.947 166.281 455.397 166.281H446.38V175.62H442.516ZM446.38 162.56H455.146C455.981 162.56 456.745 162.369 457.436 161.987C458.152 161.582 458.712 161.057 459.118 160.413C459.547 159.745 459.762 159.03 459.762 158.266C459.762 157.527 459.547 156.859 459.118 156.263C458.712 155.666 458.152 155.189 457.436 154.831C456.745 154.474 455.981 154.295 455.146 154.295H446.38V162.56Z",
  p15b4a280: "M960.553 66.5306L986.735 40.5779C986.888 40.1185 986.965 39.6975 986.965 39.3147C986.965 38.2429 986.505 37.5347 985.587 37.1902C984.668 36.8457 983.271 36.5778 981.395 36.3864C979.902 36.2333 978.792 36.0419 978.065 35.8122C977.376 35.5825 977.032 35.1423 977.032 34.4916C977.032 34.3768 977.127 34.0323 977.319 33.4581H1009.7L1009.93 34.4916C1009.93 34.9892 1009.2 35.4868 1007.75 35.9845C1006.3 36.4821 1004.3 36.9988 1001.78 37.5347C998.104 38.3386 995.386 39.4678 993.625 40.9224L971.347 63.7745L998.219 100.751C998.716 101.287 999.558 101.804 1000.74 102.302C1001.97 102.761 1003.6 103.316 1005.63 103.967C1007.77 104.618 1009.4 105.192 1010.51 105.689C1011.65 106.187 1012.23 106.685 1012.23 107.182C1012.23 107.603 1012.15 107.948 1012 108.216H972.725C972.496 107.718 972.381 107.393 972.381 107.24C972.381 106.665 972.725 106.264 973.414 106.034C974.142 105.766 975.271 105.517 976.802 105.287C978.639 105.019 980.017 104.713 980.936 104.369C981.893 103.986 982.371 103.316 982.371 102.359C982.371 101.976 982.046 101.364 981.395 100.522L960.782 70.3201H955.615V101.096C955.615 102.283 955.998 103.182 956.763 103.795C957.567 104.369 958.524 104.752 959.634 104.943C960.744 105.096 962.16 105.211 963.883 105.287C965.759 105.402 967.117 105.575 967.96 105.804C968.802 105.996 969.223 106.436 969.223 107.125C969.223 107.201 969.127 107.565 968.936 108.216H930.466C930.313 107.756 930.236 107.431 930.236 107.24C930.236 106.589 930.657 106.149 931.499 105.919C932.342 105.651 933.624 105.421 935.346 105.23C937.031 105 938.39 104.771 939.423 104.541C940.457 104.311 941.356 103.89 942.122 103.278C942.887 102.665 943.27 101.823 943.27 100.751V41.2669C943.27 39.774 942.562 38.7214 941.146 38.1089C939.729 37.4965 937.739 36.9988 935.174 36.616C933.413 36.3098 932.131 36.0227 931.327 35.7548C930.562 35.4868 930.179 35.0658 930.179 34.4916C930.179 34.3768 930.274 34.0323 930.466 33.4581H968.706C968.859 33.9557 968.936 34.2811 968.936 34.4342C968.936 35.0849 968.515 35.5443 967.672 35.8122C966.83 36.0802 965.51 36.3481 963.711 36.616C961.988 36.884 960.591 37.1519 959.519 37.4199C958.447 37.6878 957.529 38.128 956.763 38.7405C955.998 39.353 955.615 40.1951 955.615 41.2669V66.5306H960.553Z",
  p16e7c500: "M99.0445 0L98.9555 0.523134V0L0 167.64L7.55189 176.03L98.5502 72.7156L167.496 174.105L98.9259 119.107L21.3806 191.378L36.346 208L98.9951 167.64L161.654 208L198 167.64L99.0445 0Z",
  p18f14400: "M624.285 175.62V150.574H636.164C638.311 150.574 640.219 150.896 641.889 151.54C643.559 152.184 644.966 153.078 646.111 154.223C647.256 155.368 648.115 156.704 648.687 158.23C649.284 159.733 649.582 161.355 649.582 163.097C649.582 164.862 649.284 166.508 648.687 168.034C648.115 169.537 647.256 170.861 646.111 172.006C644.966 173.127 643.559 174.009 641.889 174.653C640.219 175.298 638.311 175.62 636.164 175.62H624.285ZM628.15 172.292L628.042 171.898H635.985C637.631 171.898 639.051 171.684 640.243 171.254C641.436 170.801 642.414 170.181 643.177 169.394C643.964 168.607 644.549 167.676 644.93 166.603C645.312 165.53 645.503 164.361 645.503 163.097C645.503 161.856 645.312 160.711 644.93 159.662C644.549 158.588 643.964 157.658 643.177 156.871C642.414 156.06 641.436 155.428 640.243 154.974C639.051 154.521 637.631 154.295 635.985 154.295H627.935L628.15 153.973V172.292Z",
  p19657480: "M1077.61 175.62V150.574H1081.37L1100.26 171.076L1099.97 171.398C1099.85 170.706 1099.74 169.966 1099.65 169.179C1099.58 168.392 1099.52 167.581 1099.47 166.746C1099.42 165.887 1099.37 165.017 1099.33 164.134C1099.3 163.228 1099.28 162.333 1099.26 161.451C1099.26 160.544 1099.26 159.662 1099.26 158.803V150.574H1103.12V175.62H1099.29L1080.65 155.869L1080.76 155.368C1080.83 156.084 1080.89 156.799 1080.94 157.515C1081.01 158.23 1081.08 158.934 1081.15 159.626C1081.22 160.318 1081.28 160.986 1081.33 161.63C1081.38 162.274 1081.41 162.906 1081.44 163.526C1081.46 164.122 1081.47 164.683 1081.47 165.208V175.62H1077.61Z",
  p1bc74380: "M368.638 175.62L359.299 164.349L347.563 150.574H352.716L361.732 161.486L373.79 175.62H368.638ZM347.385 175.62L358.619 161.987L360.874 164.814L352.286 175.62H347.385ZM362.519 163.991L360.337 161.272L368.495 150.574H373.432L362.519 163.991Z",
  p1e824b00: "M993.392 175.977C991.317 175.977 989.409 175.655 987.667 175.011C985.926 174.343 984.411 173.425 983.123 172.256C981.835 171.087 980.833 169.728 980.118 168.177C979.426 166.603 979.08 164.909 979.08 163.097C979.08 161.284 979.426 159.602 980.118 158.052C980.833 156.477 981.835 155.106 983.123 153.937C984.411 152.768 985.926 151.862 987.667 151.218C989.409 150.55 991.317 150.216 993.392 150.216C995.467 150.216 997.376 150.55 999.117 151.218C1000.86 151.862 1002.37 152.768 1003.66 153.937C1004.95 155.106 1005.95 156.477 1006.67 158.052C1007.38 159.602 1007.74 161.284 1007.74 163.097C1007.74 164.909 1007.38 166.603 1006.67 168.177C1005.95 169.728 1004.95 171.087 1003.66 172.256C1002.37 173.425 1000.86 174.343 999.117 175.011C997.376 175.655 995.467 175.977 993.392 175.977ZM993.392 172.22C994.919 172.22 996.314 171.994 997.578 171.541C998.843 171.064 999.94 170.42 1000.87 169.609C1001.8 168.774 1002.52 167.808 1003.02 166.71C1003.54 165.589 1003.8 164.385 1003.8 163.097C1003.8 161.808 1003.54 160.616 1003.02 159.519C1002.52 158.397 1001.8 157.431 1000.87 156.62C999.94 155.786 998.843 155.141 997.578 154.688C996.314 154.211 994.919 153.973 993.392 153.973C991.865 153.973 990.47 154.211 989.206 154.688C987.942 155.141 986.844 155.774 985.914 156.585C984.984 157.396 984.268 158.362 983.767 159.483C983.266 160.58 983.016 161.785 983.016 163.097C983.016 164.385 983.266 165.589 983.767 166.71C984.268 167.831 984.984 168.798 985.914 169.609C986.844 170.42 987.942 171.064 989.206 171.541C990.47 171.994 991.865 172.22 993.392 172.22Z",
  p206eab00: "M471.413 77.6696L470.322 80.4256C468.599 84.9042 467.24 88.5981 466.245 91.5072C465.25 94.3781 464.752 96.5983 464.752 98.1677C464.752 99.5457 465.25 100.675 466.245 101.555C467.279 102.436 468.446 103.086 469.748 103.507C471.087 103.929 472.714 104.33 474.628 104.713L475.719 104.943V108.216H448.618V105.23C449.154 104.809 449.69 104.464 450.226 104.197C450.8 103.89 451.508 103.565 452.35 103.22C453.69 102.685 454.762 102.129 455.565 101.555C456.408 100.981 457.154 100.082 457.805 98.8567C458.187 98.0911 458.57 97.2298 458.953 96.2729C459.374 95.2776 459.642 94.6269 459.757 94.3207L460.446 92.5407L481.92 37.5347C482.073 37.1137 482.188 36.3864 482.265 35.3529C482.303 34.5873 482.36 33.9748 482.437 33.5155C482.552 33.0179 482.743 32.5777 483.011 32.1949C484.887 32.1949 486.494 32.3863 487.834 32.7691C489.212 33.1519 490.59 33.86 491.968 34.8935L518.323 98.1102C518.82 99.2969 519.395 100.254 520.045 100.981C520.696 101.67 521.366 102.206 522.055 102.589C522.782 102.933 523.758 103.354 524.983 103.852C526.017 104.197 527.108 104.656 528.256 105.23L528.141 108.216H494.724L494.609 105.23C496.408 104.694 497.94 104.158 499.203 103.622C500.504 103.086 501.672 102.34 502.705 101.383C503.739 100.426 504.255 99.2586 504.255 97.8806C504.255 96.3494 502.342 90.6651 498.514 80.8276C498.284 80.2534 498.054 79.6983 497.825 79.1625C497.633 78.6266 497.461 78.1289 497.308 77.6696H471.413ZM483.872 44.3674L473.365 72.6169H495.183L483.872 44.3674Z",
  p21f5fc00: "M673.04 85.1339C673.423 85.7846 673.729 86.4545 673.959 87.1435C674.227 87.8325 674.514 88.732 674.82 89.8421C674.973 90.2249 675.107 90.6651 675.222 91.1627C676.562 95.5647 679.107 98.9524 682.858 101.326C686.61 103.699 690.897 104.886 695.72 104.886C698.246 104.886 700.696 104.445 703.069 103.565C705.481 102.646 707.452 101.287 708.983 99.4883C710.553 97.6509 711.338 95.4308 711.338 92.8278C711.338 90.5694 710.534 88.4641 708.926 86.5119C707.357 84.5597 705.385 82.818 703.012 81.2869C700.677 79.7175 697.443 77.7844 693.308 75.4877C688.447 72.8082 684.504 70.435 681.48 68.368C678.456 66.3009 675.892 63.8511 673.786 61.0185C671.681 58.1476 670.629 54.9131 670.629 51.3149C670.629 46.8747 671.873 43.2191 674.361 40.3482C676.887 37.439 680.102 35.3337 684.007 34.0323C687.95 32.6925 692.103 32.0226 696.466 32.0226C700.218 32.0226 703.95 32.482 707.663 33.4007C711.414 34.3193 714.974 35.6399 718.343 37.3625L719.089 53.7265H715.529C715.07 52.8461 714.534 51.4489 713.921 49.535L713.347 47.8699C712.046 44.1186 709.787 41.286 706.572 39.3721C703.395 37.4199 699.72 36.4438 695.548 36.4438C693.404 36.4438 691.241 36.8074 689.06 37.5347C686.878 38.262 685.04 39.3912 683.547 40.9224C682.093 42.4152 681.366 44.2717 681.366 46.4919C681.366 48.5589 682.131 50.492 683.662 52.291C685.193 54.0901 687.088 55.7361 689.347 57.2289C691.605 58.6835 694.725 60.5209 698.706 62.741C703.797 65.5736 707.912 68.0809 711.051 70.2627C714.228 72.4063 716.926 75.0092 719.146 78.0715C721.405 81.1338 722.534 84.598 722.534 88.4641C722.534 93.2489 721.213 97.249 718.572 100.464C715.931 103.641 712.505 105.976 708.294 107.469C704.122 108.962 699.682 109.709 694.974 109.709C690.763 109.709 686.227 109.192 681.366 108.158C676.543 107.087 672.638 105.632 669.652 103.795V85.2487L673.04 85.1339Z",
  p27834ac0: "M367.384 93.5743C367.384 96.4069 367.632 98.493 368.13 99.8328C368.628 101.173 369.297 102.053 370.14 102.474C371.02 102.895 372.36 103.278 374.159 103.622C376.455 104.005 378.446 104.541 380.13 105.23L380.015 108.216H343.038C343 107.91 342.962 107.508 342.924 107.01C342.885 106.512 342.866 105.919 342.866 105.23C343.938 104.771 344.914 104.426 345.795 104.197C346.713 103.967 347.766 103.718 348.952 103.45C350.675 103.106 351.919 102.704 352.685 102.244C353.45 101.785 354.024 100.885 354.407 99.5457C354.828 98.1677 355.039 95.9858 355.039 93.0001V48.6163C355.039 45.822 354.809 43.755 354.35 42.4152C353.89 41.0372 353.24 40.1185 352.398 39.6592C351.555 39.1616 350.254 38.6831 348.493 38.2237C347.689 38.0323 346.79 37.7835 345.795 37.4773C344.799 37.1711 343.842 36.8074 342.924 36.3864L343.038 33.4581H379.958L380.073 36.4438C378.35 37.2094 376.36 37.8218 374.101 38.2812C372.302 38.6639 370.963 39.1041 370.082 39.6018C369.24 40.0611 368.57 40.9798 368.073 42.3578C367.613 43.7358 367.384 45.8411 367.384 48.6737V67.3344H408.38V48.0996C408.38 45.4966 408.15 43.5636 407.691 42.3004C407.231 41.0372 406.6 40.1759 405.796 39.7166C404.992 39.219 403.748 38.7405 402.064 38.2812C399.997 37.7453 398.217 37.1137 396.724 36.3864L396.839 33.4581H432.84L432.954 36.4438C431.27 37.018 429.643 37.4965 428.074 37.8792C425.969 38.4534 424.457 39.0084 423.538 39.5443C422.619 40.0802 421.911 41.0563 421.413 42.4726C420.954 43.8889 420.724 46.0899 420.724 49.0757V92.8852C420.724 95.9475 420.935 98.1868 421.356 99.6031C421.777 100.981 422.409 101.919 423.251 102.417C424.131 102.876 425.567 103.316 427.557 103.737C429.777 104.235 431.576 104.732 432.954 105.23V108.216H396.839L396.724 105.23C397.681 104.694 398.542 104.311 399.308 104.082C400.112 103.852 401.183 103.603 402.523 103.335C404.054 103.067 405.183 102.723 405.911 102.302C406.676 101.881 407.27 101.039 407.691 99.7754C408.15 98.4739 408.38 96.4643 408.38 93.7465V72.3298H367.384V93.5743Z",
  p3260ac80: "M812.277 175.62V154.295H803.475V150.574H825.194V154.295H816.141V175.62H812.277Z",
  p342adb00: "M718.891 175.62V171.863H724.723V154.33H718.891V150.574H734.455V154.33H728.587V171.863H734.455V175.62H718.891Z",
  p37186700: "M811.979 108.732C811.367 108.847 810.754 108.905 810.142 108.905C809.414 108.905 808.323 108.79 806.869 108.56C805.414 108.331 804.304 108.216 803.539 108.216H744.628L744.513 105.402C745.7 104.752 746.791 104.292 747.786 104.024C748.82 103.718 749.949 103.469 751.174 103.278C752.705 103.01 753.815 102.665 754.504 102.244C755.231 101.823 755.786 100.924 756.169 99.5457C756.552 98.1294 756.743 95.9092 756.743 92.8852V49.4202C756.743 46.4344 756.495 44.2334 755.997 42.8171C755.538 41.4008 754.849 40.4247 753.93 39.8888C753.011 39.3147 751.48 38.7022 749.337 38.0515C748.992 37.9367 748.322 37.7261 747.327 37.4199C746.37 37.1137 745.432 36.7692 744.513 36.3864L744.628 33.4581H803.194C803.73 33.4581 804.304 33.4198 804.917 33.3432C805.567 33.2667 806.027 33.2093 806.295 33.171C807.443 32.9796 808.477 32.8839 809.395 32.8839C810.199 32.8839 810.907 32.9605 811.52 33.1136V50.9704L808.534 51.0853C807.883 50.4345 807.347 49.7072 806.926 48.9034C806.505 48.0996 806.027 47.0469 805.491 45.7454C804.725 43.8315 803.96 42.3387 803.194 41.2669C802.467 40.1951 801.376 39.4104 799.921 38.9127C797.778 38.2237 795.117 37.7835 791.94 37.5921C788.763 37.4008 785.089 37.3051 780.916 37.3051C776.017 37.3051 772.15 37.4773 769.318 37.8218C769.165 39.5443 769.088 41.5157 769.088 43.7358V67.0473H785.624C788.648 67.0473 790.907 66.8177 792.4 66.3583C793.893 65.899 795.041 65.1526 795.845 64.1191C796.687 63.0855 797.835 61.2482 799.29 58.607L800.151 57.0567H803.424V81.6888L800.151 81.8611C798.926 78.5691 797.357 76.0045 795.443 74.1671C793.567 72.3298 791.041 71.4111 787.864 71.4111H769.088V90.7608C769.088 94.78 769.548 97.7466 770.466 99.6605C771.423 101.574 772.782 102.818 774.543 103.393C776.342 103.929 778.887 104.197 782.179 104.197H787.806C792.629 104.197 796.783 103.661 800.266 102.589C803.787 101.479 806.39 99.2395 808.075 95.871L808.879 94.091C809.568 92.5982 810.123 91.4881 810.544 90.7608C810.965 89.9952 811.501 89.2679 812.151 88.5789H815.769L811.979 108.732Z",
  p3bbf5980: "M533.907 175.62V150.574H553.3V154.295H537.772V171.898H553.3V175.62H533.907ZM535.947 164.635V160.914H551.332V164.635H535.947Z",
  p6680a00: "M894.161 175.62V171.863H899.993V154.33H894.161V150.574H909.725V154.33H903.857V171.863H909.725V175.62H894.161Z",
  p9c5e280: "M260.048 175.62V150.574H279.441V154.295H263.912V171.898H279.441V175.62H260.048ZM262.087 164.635V160.914H277.473V164.635H262.087Z"
};
function ThamserkuLogo() {
  return /* @__PURE__ */ jsx("div", { className: "relative size-full", "data-name": "Thamserku logo", children: /* @__PURE__ */ jsx("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1115.63 208", children: /* @__PURE__ */ jsxs("g", { id: "Thamserku logo", children: [
    /* @__PURE__ */ jsx("path", { d: svgPaths.p16e7c500, fill: "var(--fill-0, white)", id: "Vector" }),
    /* @__PURE__ */ jsxs("g", { id: "Group 1321315129", children: [
      /* @__PURE__ */ jsxs("g", { id: "Thamserku", children: [
        /* @__PURE__ */ jsx("path", { d: svgPaths.p15730e80, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p27834ac0, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p206eab00, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p13703280, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p21f5fc00, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p37186700, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p14631300, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p15b4a280, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p14b8fb00, fill: "var(--fill-0, white)" })
      ] }),
      /* @__PURE__ */ jsxs("g", { id: "Expedition", children: [
        /* @__PURE__ */ jsx("path", { d: svgPaths.p9c5e280, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p1bc74380, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p15791500, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p3bbf5980, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p18f14400, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p342adb00, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p3260ac80, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p6680a00, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p1e824b00, fill: "var(--fill-0, white)" }),
        /* @__PURE__ */ jsx("path", { d: svgPaths.p19657480, fill: "var(--fill-0, white)" })
      ] })
    ] })
  ] }) }) });
}
function Nav({ hideOnScrollDown = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const getCtaInfo = () => {
    switch (location.pathname) {
      case "/everest":
        return { label: "Schedule a Everest Consultation", link: "/consultation?peak=everest" };
      case "/7000m":
        return { label: "Plan Your Qualifying Ascent", link: "/consultation?intent=7000m" };
      case "/private":
        return { label: "Schedule a Private Consultation", link: "/consultation?intent=private" };
      case "/field-notes":
        return { label: "Receive Field Notes", link: "#newsletter" };
      case "/consultation":
        return { label: "Select a Consultation Time", link: "#calendar" };
      default:
        return { label: "Schedule a Consultation", link: "/consultation" };
    }
  };
  const { label: ctaLabel, link: ctaLink } = getCtaInfo();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (hideOnScrollDown) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideOnScrollDown]);
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("nav", { className: `fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-8 py-5 md:py-6 text-white ${scrolled || mobileMenuOpen ? "bg-[#1A1A1A]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"} ${hidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "w-auto lg:w-[220px] xl:w-[280px] z-50", children: /* @__PURE__ */ jsx(Link, { to: "/", onClick: () => setMobileMenuOpen(false), className: "block h-7 md:h-8 aspect-[1115.63/208]", children: /* @__PURE__ */ jsx(ThamserkuLogo, {}) }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-8 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px]", children: [
        /* @__PURE__ */ jsx(Link, { to: "/atlas", className: "hover:text-[#C8CDD2] transition-colors", children: "Expedition Atlas" }),
        /* @__PURE__ */ jsx(Link, { to: "/editions", className: "hover:text-[#C8CDD2] transition-colors", children: "Editions" }),
        /* @__PURE__ */ jsx(Link, { to: "/yeti-infrastructure", className: "hover:text-[#C8CDD2] transition-colors", children: "Yeti Infrastructure" }),
        /* @__PURE__ */ jsx(Link, { to: "/legacy", className: "hover:text-[#C8CDD2] transition-colors", children: "Legacy" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex w-auto lg:w-[220px] xl:w-[280px] justify-end", children: /* @__PURE__ */ jsx(Link, { to: ctaLink, className: `border ${scrolled || mobileMenuOpen ? "border-white/50" : "border-white/30"} px-6 xl:px-8 py-3.5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] xl:text-[11px] hover:border-white transition-colors whitespace-nowrap`, children: ctaLabel }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "lg:hidden z-50 p-2 -mr-2 text-white",
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          "aria-label": "Toggle mobile menu",
          children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24, strokeWidth: 1.5 }) : /* @__PURE__ */ jsx(Menu, { size: 24, strokeWidth: 1.5 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed inset-0 bg-[#1A1A1A] z-40 flex flex-col pt-[100px] px-6 pb-8 transition-transform duration-500 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden overflow-y-auto`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col mt-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-white", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-[#C8CDD2] mb-6", children: "EXPEDITIONS" }),
            /* @__PURE__ */ jsx(Link, { to: "/atlas", className: "hover:text-[#C8CDD2] transition-colors pb-4", onClick: () => setMobileMenuOpen(false), children: "Expedition Atlas" }),
            /* @__PURE__ */ jsx(Link, { to: "/everest", className: "hover:text-[#C8CDD2] transition-colors pb-4", onClick: () => setMobileMenuOpen(false), children: "Everest" }),
            /* @__PURE__ */ jsx(Link, { to: "/editions", className: "hover:text-[#C8CDD2] transition-colors pb-4", onClick: () => setMobileMenuOpen(false), children: "Editions" }),
            /* @__PURE__ */ jsx(Link, { to: "/7000m", className: "hover:text-[#C8CDD2] transition-colors pb-4", onClick: () => setMobileMenuOpen(false), children: "7,000m Qualifying Pathway" }),
            /* @__PURE__ */ jsx(Link, { to: "/private", className: "hover:text-[#C8CDD2] transition-colors pb-8 mb-8 border-b border-white/10", onClick: () => setMobileMenuOpen(false), children: "Private Expeditions" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-[#C8CDD2] mb-6", children: "THE HOUSE" }),
            /* @__PURE__ */ jsx(Link, { to: "/legacy", className: "hover:text-[#C8CDD2] transition-colors pb-4", onClick: () => setMobileMenuOpen(false), children: "Legacy" }),
            /* @__PURE__ */ jsx(Link, { to: "/yeti-infrastructure", className: "hover:text-[#C8CDD2] transition-colors pb-4", onClick: () => setMobileMenuOpen(false), children: "Yeti Infrastructure" }),
            /* @__PURE__ */ jsx(Link, { to: "/archive", className: "hover:text-[#C8CDD2] transition-colors pb-8 mb-8 border-b border-white/10", onClick: () => setMobileMenuOpen(false), children: "Expedition Archive" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-[#C8CDD2] mb-6", children: "EDITORIAL & HELP" }),
            /* @__PURE__ */ jsx(Link, { to: "/field-notes", className: "hover:text-[#C8CDD2] transition-colors pb-4", onClick: () => setMobileMenuOpen(false), children: "Field Notes" }),
            /* @__PURE__ */ jsx(Link, { to: "/faq", className: "hover:text-[#C8CDD2] transition-colors pb-8 mb-8 border-b border-white/10", onClick: () => setMobileMenuOpen(false), children: "Main FAQ" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-[#C8CDD2] mb-6", children: "DIRECT" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 pb-8", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: ctaLink,
              className: "w-full border border-white/30 py-4 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors text-white",
              onClick: () => setMobileMenuOpen(false),
              children: ctaLabel
            }
          ) })
        ]
      }
    )
  ] });
}
const ERROR_IMG_SRC = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const handleError = () => {
    setDidError(true);
  };
  const { src, alt, style, className, ...rest } = props;
  return didError ? /* @__PURE__ */ jsx(
    "div",
    {
      className: `inline-block bg-gray-100 text-center align-middle ${className ?? ""}`,
      style,
      children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ jsx("img", { src: ERROR_IMG_SRC, alt: "Error loading image", ...rest, "data-original-url": src }) })
    }
  ) : /* @__PURE__ */ jsx("img", { src, alt, className, style, ...rest, onError: handleError });
}
const heroImage$3 = "/assets/Copy_of_Majgaon_View_(13)-DMTLlyYP.JPG";
const DEFAULT_HEADLINE = "The Himalayas, understood through generations.";
const DEFAULT_SUBHEADING = "Private expeditions shaped by Sherpa wisdom, Himalayan discipline and nearly four decades of legacy.";
function Hero({ data }) {
  const headline = (data == null ? void 0 : data.heroHeadline) ?? DEFAULT_HEADLINE;
  const subheading = (data == null ? void 0 : data.heroSubheading) ?? DEFAULT_SUBHEADING;
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-screen flex flex-col justify-center text-white pb-32 pt-48 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        ImageWithFallback,
        {
          src: heroImage$3,
          alt: "Majgaon View",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/90 mix-blend-multiply" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-6xl md:text-8xl tracking-tight leading-[1.1] mb-6", children: headline }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-xl md:text-2xl max-w-[56ch] leading-relaxed", children: subheading })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/atlas", className: "border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:bg-transparent hover:text-white transition-colors", children: [
          "Explore the Atlas ",
          /* @__PURE__ */ jsx(MoveRight, { className: "w-3 h-3" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/consultation", className: "border border-white/30 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:border-white transition-colors", children: [
          "Schedule a Consultation ",
          /* @__PURE__ */ jsx(MoveRight, { className: "w-3 h-3" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute bottom-0 left-0 w-full border-t border-white/10 bg-[#1A1A1A]/40 backdrop-blur-sm z-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-white/10 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2]", children: [
      /* @__PURE__ */ jsx("div", { className: "p-4 flex-1", children: "REGION · Khumbu — Nepal Himalaya" }),
      /* @__PURE__ */ jsx("div", { className: "p-4 flex-1", children: "SEASON · Spring · Autumn" }),
      /* @__PURE__ */ jsx("div", { className: "p-4 flex-1", children: "INDEX · EVR · MAN · DHA · MAK · HIM" }),
      /* @__PURE__ */ jsx("div", { className: "p-4 flex-1", children: "EDITION · A · B · C · D · E" })
    ] }) })
  ] });
}
const DEFAULT_HEADING_PART1 = "The Himalayas are not entered through ambition alone.";
const DEFAULT_HEADING_PART2 = "They are entered through knowledge.";
const DEFAULT_BODY = "Thamserku is a heritage Himalayan expedition house, refined for a global audience. We guide through trust, safety, Sherpa mastery and transformation — not adrenaline, not volume, not noise.";
function splitAtLastSentence$1(text) {
  const idx = text.lastIndexOf(". ");
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx + 1), text.slice(idx + 2)];
}
function Manifesto({ data }) {
  const [part1, part2] = (data == null ? void 0 : data.manifestoHeading) ? splitAtLastSentence$1(data.manifestoHeading) : [DEFAULT_HEADING_PART1, DEFAULT_HEADING_PART2];
  const body = (data == null ? void 0 : data.manifestoBody) ?? DEFAULT_BODY;
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24", children: [
    /* @__PURE__ */ jsx("div", { className: "md:w-1/4", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "02 — MANIFESTO" }) }),
    /* @__PURE__ */ jsxs("div", { className: "md:w-3/4 flex flex-col gap-10", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-['Radley'] font-light text-4xl md:text-[48px] leading-[1.2] max-w-3xl", children: [
        part1,
        " ",
        /* @__PURE__ */ jsx("em", { className: "text-[#0A3A77] italic", children: part2 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.8] max-w-[56ch]", children: body })
    ] })
  ] }) });
}
const FALLBACK_PILLARS = [
  { eyebrow: "PILLAR I — AIR SUPPORT", title: "Helicopter coordination and aerial logistics.", desc: "Helicopter access, rescue support, and aerial logistics coordinated through the Yeti Group's aviation network — among the most experienced in the Nepal Himalaya." },
  { eyebrow: "PILLAR II — MOUNTAIN LODGES", title: "Rest, recovery, and continuity at altitude.", desc: "Operational lodges and rest points along approach routes, allowing acclimatisation rhythm and recovery without compromising on standards or privacy." },
  { eyebrow: "PILLAR III — REGIONAL ACCESS", title: "Permits, regions, and quiet passage.", desc: "Continuous regional presence across Khumbu, Manaslu, Dhaulagiri, Mahalangur, and Annapurna — backed by decades of permits, partnerships, and quiet field relationships." },
  { eyebrow: "PILLAR IV — FIELD CONTINUITY", title: "Multi-generational, on the ground.", desc: "A multi-generational field team supported by Kathmandu-based operations, allowing the same standards of care from first letter to descent." }
];
function YetiInfrastructurePreview({ data }) {
  const heading = (data == null ? void 0 : data.heading) ?? "An operating foundation behind every expedition.";
  const intro = (data == null ? void 0 : data.intro) ?? "Thamserku draws on the Yeti Infrastructure: air support, mountain lodges, regional access and field continuity that quietly support every expedition we run.";
  const pillars = (data == null ? void 0 : data.pillars) ? data.pillars.map((p) => ({
    eyebrow: `PILLAR ${p.number} — ${p.name.toUpperCase()}`,
    title: p.subtitle,
    desc: p.body
  })) : FALLBACK_PILLARS;
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] overflow-hidden text-white", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-10 pointer-events-none",
        style: {
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto px-8 flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 md:mb-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "SECTION III — YETI INFRASTRUCTURE" }),
          /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-5xl md:text-[56px] lg:text-[72px] leading-[1.05] text-white max-w-[18ch]", children: heading })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-7 flex flex-col md:pt-12", children: /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.65] max-w-[56ch]", children: intro }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-24", children: pillars.map((pillar, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col bg-[#2E353C]/20 border-t border-r last:border-r-0 border-b lg:border-b-0 border-[#C8CDD2]/30 p-8 lg:p-10",
          children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12", children: pillar.eyebrow }),
            /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-2xl lg:text-[28px] leading-[1.15] text-white mb-6", children: pillar.title }),
            /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]", children: pillar.desc })
          ]
        },
        idx
      )) }),
      /* @__PURE__ */ jsx("div", { className: "w-full max-w-[880px] mx-auto flex justify-end", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/yeti-infrastructure",
          className: "group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors",
          children: [
            /* @__PURE__ */ jsx("span", { className: "border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors", children: "READ THE FULL YETI INFRASTRUCTURE PAGE" }),
            /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      ) })
    ] })
  ] });
}
const FALLBACK_IMAGES = {
  EVR: "https://images.unsplash.com/photo-1765207142247-d505b2ffc2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3VudCUyMEV2ZXJlc3QlMjBzdW1taXQlMjBtb29keSUyMGRhcmt8ZW58MXx8fHwxNzc3NDQ2MzA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  MAN: "https://images.unsplash.com/photo-1650221293568-82a9823d938a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYW5hc2x1JTIwbW91bnRhaW4lMjBzbm93JTIwcGVhayUyMGRhcmt8ZW58MXx8fHwxNzc3NDQ2MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  DHA: "https://images.unsplash.com/photo-1755015347269-c3969c4a0ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEaGF1bGFnaXJpJTIwbW91bnRhaW4lMjByYW5nZSUyMGRhcmt8ZW58MXx8fHwxNzc3NDQ2MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  MAK: "https://images.unsplash.com/photo-1745677617575-62b14956f2d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWthbHUlMjBtb3VudGFpbiUyMHBlYWslMjBkcmFtYXRpY3xlbnwxfHx8fDE3Nzc0NDYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  HIM: "https://images.unsplash.com/photo-1764356806887-89cf05d562bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjBtb3VudGFpbiUyMHF1aWV0JTIwZGlzdGFudHxlbnwxfHx8fDE3Nzc0NDYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
};
const FALLBACK_EXPEDITIONS = [
  { code: "EXP / 01 — EVR", name: "Everest", positioning: "The highest mountain on earth asks for more than strength. It asks for patience, judgement, and respect.", altitude: "8,848.86 m", region: "Khumbu, Nepal", season: "Spring", style: "Disciplined passage", editions: "Alpine · Bespoke · Crafted · Definitive", cols: 6, image: FALLBACK_IMAGES.EVR },
  { code: "EXP / 02 — MAN", name: "Manaslu", positioning: "A powerful 8,000m expedition for climbers seeking scale, beauty, and progression.", altitude: "8,163 m", region: "Gorkha, Nepal", season: "Autumn", style: "Progression climb", editions: "Alpine · Bespoke · Crafted", cols: 3, image: FALLBACK_IMAGES.MAN },
  { code: "EXP / 03 — DHA", name: "Dhaulagiri", positioning: "Remote, immense, and uncompromising — a mountain for solitude and strength.", altitude: "8,167 m", region: "Dhaulagiri, Nepal", season: "Spring", style: "Solitude climb", editions: "Bespoke · Crafted · Definitive", cols: 3, image: FALLBACK_IMAGES.DHA },
  { code: "EXP / 04 — MAK", name: "Makalu", positioning: "A striking Himalayan giant for experienced climbers seeking technical elegance and isolation.", altitude: "8,485 m", region: "Mahalangur, Nepal", season: "Spring", style: "Technical climb", editions: "Bespoke · Crafted · Definitive", cols: 3, image: FALLBACK_IMAGES.MAK },
  { code: "EXP / 05 — HIM", name: "Himchuli", positioning: "A quieter Himalayan objective for climbers seeking a less commercial expedition experience.", altitude: "TBC", region: "Annapurna, Nepal", season: "Spring · Autumn", style: "Quiet objective", editions: "Alpine · Bespoke · Explorer", cols: 3, image: FALLBACK_IMAGES.HIM }
];
function toPreviewData(exp, idx) {
  var _a;
  return {
    code: `EXP / ${exp.number} — ${exp.code}`,
    name: exp.name,
    positioning: exp.positioning,
    altitude: exp.altitude,
    region: exp.region,
    season: exp.season,
    style: exp.style,
    editions: ((_a = exp.editions) == null ? void 0 : _a.map((e) => e.name.replace(" Edition", "")).join(" · ")) ?? "",
    cols: idx === 0 ? 6 : 3,
    image: FALLBACK_IMAGES[exp.code] ?? ""
  };
}
function AtlasPreview({ expeditions }) {
  const items = expeditions ? expeditions.map(toPreviewData) : FALLBACK_EXPEDITIONS;
  return /* @__PURE__ */ jsxs("section", { id: "atlas", className: "relative w-full bg-[#1A1A1A] text-white py-32 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 opacity-10 pointer-events-none",
        style: {
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto flex flex-col gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-12 md:gap-24 items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "md:w-1/4", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "03 — EXPEDITION ATLAS" }) }),
        /* @__PURE__ */ jsx("div", { className: "md:w-1/2", children: /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-4xl md:text-5xl leading-[1.1] mb-6", children: "Five mountains. Five different kinds of preparation." }) }),
        /* @__PURE__ */ jsx("div", { className: "md:w-1/4", children: /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.6]", children: "Each Thamserku expedition is read as a passage, not a package." }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-6", children: items.map((exp, idx) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: exp.name === "Everest" ? "/everest" : "#",
          className: `group relative flex flex-col justify-between border border-white/10 bg-[#2E353C]/30 p-8 min-h-[480px] overflow-hidden transition-all duration-500 hover:-translate-y-1 ${idx >= 3 ? "md:col-span-6" : exp.cols === 6 ? "md:col-span-6" : "md:col-span-3"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
              /* @__PURE__ */ jsx(
                ImageWithFallback,
                {
                  src: exp.image,
                  alt: exp.name,
                  className: "w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-40 transition-opacity duration-700"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2] mb-8", children: exp.code }),
              /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[44px] leading-none mb-4", children: exp.name }),
              /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-relaxed max-w-[40ch]", children: exp.positioning })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-12 flex flex-col gap-4 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.1em] text-[#5A6673]", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-y-2 gap-x-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  "ALT: ",
                  exp.altitude
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  "REG: ",
                  exp.region
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  "SEA: ",
                  exp.season
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  "STY: ",
                  exp.style
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-white/10 text-[#C8CDD2] flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "EDITIONS: ",
                  exp.editions
                ] }),
                exp.name === "Everest" && /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
              ] })
            ] })
          ]
        },
        idx
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ jsxs(Link, { to: "/atlas", className: "border border-white/30 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:border-white transition-colors", children: [
        "View the full atlas ",
        /* @__PURE__ */ jsx(MoveRight, { className: "w-3 h-3" })
      ] }) })
    ] })
  ] });
}
const approachImage = "/assets/Copy_of_Nuptse-DPKQ3WlK.jpg";
const campImage = "/assets/Copy_of_EBC_PC-Carol_Sachs_(34)-B1FPHNXV.jpg";
const FALLBACK_NOTES = [
  { code: "FN / 01 — APPROACH", title: "The Khumbu Approach", excerpt: "A walk-in is never only a walk-in. It is the first read of weather, of body, of crew, and of how the mountain is breathing this season.", byline: "EXPEDITION DESK · 8 MIN READ", cols: 6, aspect: "aspect-[4/4]", image: approachImage },
  { code: "FN / 02 — CAMP", title: "Life at Base Camp", excerpt: "What an expedition actually feels like when the noise is removed.", byline: "FIELD TEAM · 6 MIN READ", cols: 3, aspect: "aspect-[4/5]", image: campImage },
  { code: "FN / 03 — JUDGEMENT", title: "Sherpa Route Judgement", excerpt: "The quiet calculations that decide whether a day is a climbing day.", byline: "SIRDAR NOTES · 9 MIN READ", cols: 3, aspect: "aspect-[4/5]", image: "https://images.unsplash.com/photo-1549364472-0972cec89cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDbGltYmVyJTIwbW91bnRhaW4lMjByaWRnZSUyMHNub3d8ZW58MXx8fHwxNzc3NDQ2MzExfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { code: "FN / 04 — WEATHER", title: "Weather Windows", excerpt: "Understanding the brief moments when the atmosphere allows passage to the summit.", byline: "METEOROLOGY · 7 MIN READ", cols: 6, aspect: "aspect-[4/3]", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" }
];
const LAYOUT = [
  { cols: 6, aspect: "aspect-[4/4]", image: approachImage },
  { cols: 3, aspect: "aspect-[4/5]", image: campImage },
  { cols: 3, aspect: "aspect-[4/5]", image: "https://images.unsplash.com/photo-1549364472-0972cec89cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDbGltYmVyJTIwbW91bnRhaW4lMjByaWRnZSUyMHNub3d8ZW58MXx8fHwxNzc3NDQ2MzExfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { cols: 6, aspect: "aspect-[4/3]", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" }
];
function toDisplayNote(note, idx) {
  const layout = LAYOUT[idx] ?? LAYOUT[0];
  return {
    code: note.code,
    title: note.title,
    excerpt: note.excerpt,
    byline: note.readTime ? `${note.byline} · ${note.readTime} MIN READ` : note.byline,
    cols: layout.cols,
    aspect: layout.aspect,
    image: layout.image
  };
}
function FieldNotesPreview({ fieldNotes }) {
  const notes = fieldNotes && fieldNotes.length > 0 ? fieldNotes.slice(0, 4).map(toDisplayNote) : FALLBACK_NOTES;
  return /* @__PURE__ */ jsx("section", { id: "field-notes", className: "w-full bg-white text-[#1A1A1A] py-32 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-12 md:gap-24 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "md:w-1/4", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "04 — FIELD NOTES" }) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-1/2", children: /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-4xl md:text-5xl leading-[1.1] mb-6", children: "Short studies in Himalayan judgement." }) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-1/4", children: /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.6]", children: "Editorial dispatches intended to inform how you arrive at the mountain, not to sell it." }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-8 items-start", children: notes.map((note, idx) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: `flex flex-col gap-6 group cursor-pointer ${note.cols === 6 ? "md:col-span-6" : "md:col-span-3"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `w-full overflow-hidden bg-[#F4F2EC] ${note.aspect}`, children: /* @__PURE__ */ jsx(
            ImageWithFallback,
            {
              src: note.image,
              alt: note.title,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673]", children: note.code }),
            /* @__PURE__ */ jsx("h3", { className: `font-['Radley'] font-light leading-[1.2] ${note.cols === 6 ? "text-3xl md:text-4xl" : "text-2xl md:text-[28px]"}`, children: note.title }),
            /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-relaxed", children: note.excerpt }),
            /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2] mt-4 pt-4 border-t border-[#E5E7EB]", children: note.byline })
          ] })
        ]
      },
      idx
    )) }),
    /* @__PURE__ */ jsx("div", { id: "newsletter", className: "w-full mt-12 pt-[80px] md:pt-[100px] pb-[80px] md:pb-[100px] border-t border-[#E5E7EB]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[720px] mx-auto flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "FIELD NOTES — NEWSLETTER" }),
      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[36px] md:text-[48px] leading-[1.1] text-[#1A1A1A] max-w-[22ch] mb-6", children: "Receive Field Notes from the expedition desk." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.65] max-w-[56ch] mb-12", children: "A quiet quarterly letter of field reports, route judgement and Himalayan readings." }),
      /* @__PURE__ */ jsxs("form", { className: "w-full flex flex-col md:flex-row gap-6 justify-center items-center mb-10", onSubmit: (e) => e.preventDefault(), children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            placeholder: "Your email address",
            required: true,
            className: "w-full md:w-auto flex-1 max-w-[320px] bg-transparent border-0 border-b border-[#1A1A1A]/30 pb-3 px-0 font-['Cormorant_Garamond'] italic text-[20px] text-[#1A1A1A] placeholder:text-[#5A6673]/60 focus:outline-none focus:ring-0 focus:border-[#1A1A1A] transition-colors"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full md:w-auto border border-[#0A3A77]/30 px-8 py-3.5 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:border-[#0A3A77] transition-colors",
            children: "Subscribe →"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: "BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS." })
    ] }) })
  ] }) });
}
const FALLBACK_EDITIONS = [
  { letter: "A", name: "Alpine Edition", sub: "The essential expedition", positioning: "The essential Thamserku expedition experience, run with disciplined professional support.", who: "FOR EXPERIENCED CLIMBERS SEEKING A DISCIPLINED, PROFESSIONALLY MANAGED EXPEDITION." },
  { letter: "B", name: "Bespoke Edition", sub: "A more personal expedition", positioning: "A more personal expedition shaped around individual goals, schedule, and pace.", who: "FOR PRIVATE CLIMBERS, COUPLES, OR SMALL GROUPS SEEKING FLEXIBILITY AND CUSTOMIZATION." },
  { letter: "C", name: "Crafted Edition", sub: "Service, comfort, storytelling", positioning: "An elevated expedition with deeper service, comfort, and documented storytelling.", who: "FOR HNW CLIENTS, EXECUTIVES, AND CLIMBERS WHO WANT TECHNICAL SERIOUSNESS WITH RICHER SERVICE." },
  { letter: "D", name: "Definitive Edition", sub: "The most exclusive private expedition", positioning: "The most exclusive premium luxury Thamserku experience, designed around privacy and rare access.", who: "FOR UHNW INDIVIDUALS, PRIVATE FAMILIES, AND ELITE ADVENTURERS REQUIRING MAXIMUM PRIVACY." },
  { letter: "E", name: "Explorer Edition", sub: "The Himalayas beyond the summit", positioning: "For those seeking the Himalayas beyond the summit — softer, slower, more cultural.", who: "FOR TRAVELLERS, FAMILIES, LEADERS, PHOTOGRAPHERS, AND CULTURAL EXPLORERS." }
];
function toDisplayData(ed) {
  return {
    letter: ed.letter,
    name: ed.name,
    sub: ed.subtitle,
    positioning: ed.positioning,
    who: ed.targetAudience
  };
}
function EditionsPreview({ editions: editions2 }) {
  const items = editions2 ? editions2.map(toDisplayData) : FALLBACK_EDITIONS;
  return /* @__PURE__ */ jsx("section", { id: "editions", className: "w-full bg-[#0A3A77] text-white py-32 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-12", children: [
      /* @__PURE__ */ jsx("div", { className: "md:w-1/4", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "05 — EDITIONS" }) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-1/2", children: /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-4xl md:text-5xl leading-[1.1] mb-6", children: "Five lenses through which to read the same mountain." }) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-1/4", children: /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.6]", children: "From Alpine discipline to the Definitive private expedition, each edition is shaped around intent, privacy, and preparation." }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col border-b border-white/10", children: items.map((ed, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group flex flex-col md:flex-row border-t border-white/10 hover:bg-white/5 transition-colors duration-300 items-start md:items-center py-8 gap-8",
        children: [
          /* @__PURE__ */ jsx("div", { className: "md:w-1/12 font-['Radley'] text-[64px] text-[#C8CDD2] font-light leading-none", children: ed.letter }),
          /* @__PURE__ */ jsxs("div", { className: "md:w-3/12 flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[28px] leading-tight", children: ed.name }),
            /* @__PURE__ */ jsx("span", { className: "font-['Lexend'] font-light text-[13px] text-[#C8CDD2]", children: ed.sub })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:w-3/12", children: /* @__PURE__ */ jsxs("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[14px] leading-relaxed", children: [
            '"',
            ed.positioning,
            '"'
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "md:w-3/12", children: /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.1em] text-[10px] text-[#C8CDD2] leading-relaxed max-w-[40ch]", children: ed.who }) }),
          /* @__PURE__ */ jsx("div", { className: "md:w-2/12 flex md:justify-end", children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors border-b border-transparent hover:border-[#C8CDD2] pb-1", children: [
            "Read Edition ",
            /* @__PURE__ */ jsx(MoveRight, { className: "w-3 h-3" })
          ] }) })
        ]
      },
      idx
    )) })
  ] }) });
}
const chairmanImage$1 = "/assets/Mt-Everest-8848m-no-label-1-XCj15Fwr.jpg";
const FALLBACK_HEADING_PART1 = "Thamserku was not created to follow the Himalayan expedition industry.";
const FALLBACK_HEADING_PART2 = "It helped shape it.";
const FALLBACK_BODY1 = "Founded as one of Nepal's original high-altitude expedition names and continuing under the Yeti Group, Thamserku has been part of Himalayan exploration through nearly four decades of seasons, summits, and Sherpa-led judgement.";
const FALLBACK_BODY2 = "We do not fight the mountain. We learn from it — and we pass that learning on to the people who climb with us.";
const FALLBACK_QUOTE = "— The Chairman";
const FALLBACK_ATTRIBUTION = "THAMSERKU EXPEDITIONS · YETI GROUP";
const FALLBACK_TIMELINE = [
  { decade: "1980s", era: "Founding Era" },
  { decade: "1990s", era: "Sherpa-led Logistics" },
  { decade: "2000s", era: "Expedition Role" },
  { decade: "2020s", era: "Heritage Revival" },
  { decade: "Today", era: "Refined for the World" }
];
function splitAtLastSentence(text) {
  const idx = text.lastIndexOf(". ");
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx + 1), text.slice(idx + 2)];
}
function LegacyPreview({ data }) {
  const [headingPart1, headingPart2] = (data == null ? void 0 : data.heading) ? splitAtLastSentence(data.heading) : [FALLBACK_HEADING_PART1, FALLBACK_HEADING_PART2];
  const body1 = (data == null ? void 0 : data.body1) ?? FALLBACK_BODY1;
  const body2 = (data == null ? void 0 : data.body2) ?? FALLBACK_BODY2;
  const quote = (data == null ? void 0 : data.quote) ?? FALLBACK_QUOTE;
  const attribution = (data == null ? void 0 : data.attribution) ?? FALLBACK_ATTRIBUTION;
  const timeline = (data == null ? void 0 : data.timeline) ?? FALLBACK_TIMELINE;
  return /* @__PURE__ */ jsx("section", { id: "legacy", className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full md:w-5/12", children: /* @__PURE__ */ jsx("div", { className: "aspect-[4/5] bg-[#E5E7EB] overflow-hidden", children: /* @__PURE__ */ jsx(
      ImageWithFallback,
      {
        src: chairmanImage$1,
        alt: "Mt. Everest 8848m",
        className: "w-full h-full object-cover saturate-[0.6] contrast-110 sepia-[0.2]"
      }
    ) }) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-7/12 flex flex-col gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "06 — LEGACY" }),
        /* @__PURE__ */ jsxs("h2", { className: "font-['Radley'] font-light text-4xl md:text-[56px] leading-[1.1] text-[#1A1A1A]", children: [
          headingPart1,
          " ",
          /* @__PURE__ */ jsx("em", { className: "text-[#0A3A77] not-italic italic", children: headingPart2 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.8] max-w-[56ch]", children: [
        /* @__PURE__ */ jsx("p", { children: body1 }),
        /* @__PURE__ */ jsx("p", { children: body2 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 border-l-2 border-[#C8CDD2] pl-6 py-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-['Radley'] italic text-[28px] text-[#1A1A1A] leading-none mb-2", children: quote }),
        /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673]", children: attribution })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-5 gap-6 border-t border-[#C8CDD2]/30 pt-8 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#5A6673]", children: timeline.map((era, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[#0A3A77]", children: era.decade }),
        /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[18px] text-[#1A1A1A] font-light capitalize tracking-normal", children: era.era })
      ] }, idx)) })
    ] })
  ] }) });
}
function Closing({ data }) {
  const heading = (data == null ? void 0 : data.closingHeading) ?? "Begin with knowledge. Move with respect.";
  const body = (data == null ? void 0 : data.closingBody) ?? "Every Thamserku journey begins with a private conversation — with our expedition desk, not a booking page.";
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] text-white py-48 px-8 overflow-hidden flex flex-col items-center justify-center text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        ImageWithFallback,
        {
          src: "https://images.unsplash.com/photo-1761844318449-9090457ba38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjByYW5nZSUyMHR3aWxpZ2h0JTIwc2lsaG91ZXR0ZXxlbnwxfHx8fDE3Nzc0NDYzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          alt: "Himalayan range twilight silhouette",
          className: "w-full h-full object-cover opacity-20 mix-blend-luminosity"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A] opacity-80" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[880px] mx-auto flex flex-col items-center gap-8", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "07 — BEGIN PRIVATELY" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-5xl md:text-[80px] leading-[1.1] mb-2", children: heading }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-[1.8] max-w-[48ch] mb-4", children: body }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 mt-8", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/consultation", className: "border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:bg-transparent hover:text-white transition-colors", children: [
          "Schedule a Consultation ",
          /* @__PURE__ */ jsx(MoveRight, { className: "w-3 h-3" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/atlas", className: "border border-white/30 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:border-white transition-colors", children: [
          "Explore the Atlas ",
          /* @__PURE__ */ jsx(MoveRight, { className: "w-3 h-3" })
        ] })
      ] })
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "w-full bg-[#2E353C] text-[#C8CDD2] pt-24 pb-8 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-16 md:gap-8 justify-between items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-4/12 flex flex-col items-start gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "block h-9 md:h-10 aspect-[1115.63/208]", children: /* @__PURE__ */ jsx(ThamserkuLogo, {}) }),
        /* @__PURE__ */ jsx("p", { className: "font-['Radley'] italic font-light text-2xl text-white max-w-[20ch] leading-[1.3]", children: "The Spirit of the Himalayas, refined for the world." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-2/12 flex flex-col gap-6 font-['Lexend'] font-light text-[14px]", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2", children: "EXPEDITIONS" }),
        /* @__PURE__ */ jsx(Link, { to: "/atlas", className: "hover:text-white transition-colors", children: "Expedition Atlas" }),
        /* @__PURE__ */ jsx(Link, { to: "/everest", className: "hover:text-white transition-colors", children: "Everest" }),
        /* @__PURE__ */ jsx(Link, { to: "/editions", className: "hover:text-white transition-colors", children: "Editions" }),
        /* @__PURE__ */ jsx(Link, { to: "/7000m", className: "hover:text-white transition-colors", children: "7,000m Qualifying Pathway" }),
        /* @__PURE__ */ jsx(Link, { to: "/private", className: "hover:text-white transition-colors", children: "Private Expeditions" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-3/12 flex flex-col gap-6 font-['Lexend'] font-light text-[14px]", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2", children: "THE HOUSE" }),
        /* @__PURE__ */ jsx(Link, { to: "/legacy", className: "hover:text-white transition-colors", children: "Legacy" }),
        /* @__PURE__ */ jsx(Link, { to: "/yeti-infrastructure", className: "hover:text-white transition-colors", children: "Yeti Infrastructure" }),
        /* @__PURE__ */ jsx(Link, { to: "/archive", className: "hover:text-white transition-colors", children: "Expedition Archive" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-2/12 flex flex-col gap-6 font-['Lexend'] font-light text-[14px]", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2", children: "EDITORIAL & HELP" }),
        /* @__PURE__ */ jsx(Link, { to: "/field-notes", className: "hover:text-white transition-colors", children: "Field Notes" }),
        /* @__PURE__ */ jsx(Link, { to: "#newsletter", className: "hover:text-white transition-colors", children: "Newsletter Sign-up" }),
        /* @__PURE__ */ jsx(Link, { to: "/faq", className: "hover:text-white transition-colors", children: "Main FAQ" }),
        /* @__PURE__ */ jsx(Link, { to: "/consultation", className: "hover:text-white transition-colors", children: "Schedule a Consultation" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-[#5A6673]/30 pt-8 flex flex-col md:flex-row items-center justify-between font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: [
      /* @__PURE__ */ jsx("div", { children: "© THAMSERKU EXPEDITIONS · YETI GROUP" }),
      /* @__PURE__ */ jsx("div", { children: "KATHMANDU — NEPAL | DIRECTION 01 · MOCKUP" })
    ] })
  ] }) });
}
const serverClient = createClient({
  projectId: "ugjhuor8",
  dataset: "production",
  apiVersion: "2026-05-21",
  useCdn: false,
  perspective: "published"
});
async function getHomePageData() {
  return serverClient.fetch(`{
    "homePage": *[_type == "homePage"][0] {
      heroHeadline, heroSubheading, manifestoHeading, manifestoBody,
      closingHeading, closingBody,
      featuredFieldNotes[]->{ _id, code, title, excerpt, byline, readTime, slug }
    },
    "expeditions": *[_type == "expedition"] | order(number asc) {
      _id, number, code, name, slug, altitude, region, season, style, positioning,
      editions[]->{ _id, letter, name }
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, subtitle, positioning, targetAudience, slug
    },
    "yetiInfrastructure": *[_type == "yetiInfrastructure"][0] {
      heading, intro, pillars
    },
    "legacy": *[_type == "legacy"][0] {
      heading, body1, body2, quote, attribution, timeline
    }
  }`);
}
async function loader() {
  return getHomePageData();
}
const Home = UNSAFE_withComponentProps(function Home2() {
  var _a;
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsx(Hero, {
        data: data.homePage ?? void 0
      }), /* @__PURE__ */ jsx(Manifesto, {
        data: data.homePage ?? void 0
      }), /* @__PURE__ */ jsx(YetiInfrastructurePreview, {
        data: data.yetiInfrastructure ?? void 0
      }), /* @__PURE__ */ jsx(AtlasPreview, {
        expeditions: data.expeditions.length > 0 ? data.expeditions : void 0
      }), /* @__PURE__ */ jsx(EditionsPreview, {
        editions: data.editions.length > 0 ? data.editions : void 0
      }), /* @__PURE__ */ jsx(LegacyPreview, {
        data: data.legacy ?? void 0
      }), /* @__PURE__ */ jsx(FieldNotesPreview, {
        fieldNotes: ((_a = data.homePage) == null ? void 0 : _a.featuredFieldNotes) ?? []
      }), /* @__PURE__ */ jsx(Closing, {
        data: data.homePage ?? void 0
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function EverestHero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen bg-[#1A1A1A] flex flex-col justify-end text-white overflow-hidden pb-16 md:pb-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1716746022735-d8ed8d6ca81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVyZXN0JTIwc3VucmlzZSUyMG1vdW50YWluJTIwcGVha3xlbnwxfHx8fDE3Nzc0NDg4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          alt: "Everest south face at dawn",
          className: "w-full h-full object-cover object-center"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-transparent to-[#1A1A1A]/90" })
    ] }),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-20", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full border-l border-r border-[#C8CDD2]/30 max-w-[1440px] mx-auto relative grid grid-cols-4 md:grid-cols-12 gap-5 px-8", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-full border-r border-[#C8CDD2]/20 hidden md:block" }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-24", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-5xl md:text-7xl lg:text-[88px] leading-[1.1] mb-6 max-w-[18ch]", children: "Everest Expedition — the highest journey on earth, guided by Himalayan wisdom." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 mb-12", children: [
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch]", children: "A disciplined passage to the summit of the world, shaped by Sherpa leadership, weather judgement and nearly four decades of Thamserku field experience." }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: "[CLIENT TO CONFIRM] — FOUR DECADES FIELD EXPERIENCE CLAIM PENDING." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
        /* @__PURE__ */ jsxs("button", { className: "border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-transparent hover:text-white transition-colors flex items-center justify-center gap-3", children: [
          "Request a Private Everest Consultation ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4", strokeWidth: 1 })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "border border-white/30 text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors flex items-center justify-center gap-3", children: [
          "Read the Dossier ",
          /* @__PURE__ */ jsx(ArrowDown, { className: "w-4 h-4", strokeWidth: 1 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute bottom-0 left-0 w-full z-20 border-y border-white/20 bg-[#1A1A1A]/30 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: [
      /* @__PURE__ */ jsx("div", { className: "px-8 py-5", children: "ALTITUDE · 8,848.86 m" }),
      /* @__PURE__ */ jsx("div", { className: "px-8 py-5", children: "REGION · Khumbu, Nepal" }),
      /* @__PURE__ */ jsx("div", { className: "px-8 py-5", children: "SEASON · Spring (Apr–May)" }),
      /* @__PURE__ */ jsx("div", { className: "px-8 py-5", children: "STYLE · Disciplined passage" })
    ] }) })
  ] });
}
function QuickFacts() {
  return /* @__PURE__ */ jsxs("section", { className: "bg-[#1A1A1A] w-full text-white pt-16 pb-0 md:pt-24 border-b border-white/10", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-[1440px] mx-auto px-8 mb-8", children: /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "02 — DOSSIER FACTS" }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full border-t border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-white/20", children: [
      /* @__PURE__ */ jsx(Fact, { title: "ALTITUDE", value: "8,848.86 m" }),
      /* @__PURE__ */ jsx(Fact, { title: "REGION", value: "Khumbu, Nepal" }),
      /* @__PURE__ */ jsx(Fact, { title: "DURATION", value: "60–65 days" }),
      /* @__PURE__ */ jsx(Fact, { title: "SEASON", value: "Spring, April–May" }),
      /* @__PURE__ */ jsx(Fact, { title: "EXPEDITION STYLE", value: "Sherpa-led, oxygen-supported" }),
      /* @__PURE__ */ jsx(Fact, { title: "PRICING", value: "By private consultation" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1440px] mx-auto px-8 py-4 border-t border-white/10", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: "[CLIENT TO CONFIRM] — EACH DOSSIER FACT VALUE PENDING VERIFICATION." }) })
  ] });
}
function Fact({ title, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "px-6 py-8 md:px-8 md:py-10 flex flex-col justify-between h-full gap-4", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: title }),
    /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-2xl lg:text-[28px] text-white font-light leading-snug", children: value })
  ] });
}
function Overview() {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] w-full text-[#1A1A1A] py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12", children: [
    /* @__PURE__ */ jsx("div", { className: "md:col-span-4 lg:col-span-3", children: /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "03 — OVERVIEW" }) }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-8 lg:col-span-7 flex flex-col gap-12", children: [
      /* @__PURE__ */ jsxs("h3", { className: "font-['Radley'] font-light text-[44px] md:text-[52px] leading-[1.1] max-w-[28ch]", children: [
        "The highest mountain on earth asks for more than strength. ",
        /* @__PURE__ */ jsx("i", { className: "text-[#0A3A77] italic", children: "It asks for patience, judgement and respect." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6", children: /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[16px] leading-[1.8] max-w-[60ch]", children: "At Thamserku, Everest is not framed as conquest. It is framed as a passage — through altitude, weather and inner discipline. We approach the mountain slowly, attentively and led by the people who know it best." }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:col-span-12 lg:col-span-2 flex items-end justify-end hidden lg:flex", children: /* @__PURE__ */ jsx("div", { className: "w-full aspect-[3/4] overflow-hidden", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "https://images.unsplash.com/photo-1579971043200-9bbde2f26006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlJTIwY2FtcCUyMHRlbnQlMjBkYXJrfGVufDF8fHx8MTc3NzQ0ODg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Sherpa kitchen tent at Base Camp",
        className: "w-full h-full object-cover grayscale-[30%] opacity-80"
      }
    ) }) })
  ] }) });
}
function WhoItIsFor() {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#FFFFFF] w-full text-[#1A1A1A] py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-8 flex flex-col gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "04 — WHO IT IS FOR" }),
      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[40px] md:text-[52px] leading-[1.1] max-w-[32ch]", children: "Everest is not for everyone. It is for the prepared." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 border-t border-[#1A1A1A]/10 pt-16", children: [
      /* @__PURE__ */ jsx(
        AudienceTile,
        {
          label: "01 / EXPERIENCED CLIMBERS",
          subline: "With prior 6,000m or 7,000m altitude experience",
          description: "Climbers with prior 6,000m or 7,000m experience and a serious altitude record."
        }
      ),
      /* @__PURE__ */ jsx(
        AudienceTile,
        {
          label: "02 / 8,000m ASPIRANTS",
          subline: "Approaching the death zone systematically",
          description: "Prepared climbers approaching their first 8,000m peak with a structured, professionally-led house."
        }
      ),
      /* @__PURE__ */ jsx(
        AudienceTile,
        {
          label: "03 / PRIVATE CLIENTS & LEADERS",
          subline: "Requiring discretion and tailored itineraries",
          description: "Executives, principals, and private climbers who require discretion, tailoring, and senior-level support."
        }
      ),
      /* @__PURE__ */ jsx(
        AudienceTile,
        {
          label: "04 / PROGRESSION CLIMBERS",
          subline: "Graduating through the Thamserku portfolio",
          description: "Returning Thamserku clients moving from earlier expeditions into their flagship Himalayan objective."
        }
      )
    ] })
  ] }) });
}
function AudienceTile({ label, subline, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: label }),
    /* @__PURE__ */ jsxs("h4", { className: "font-['Radley'] font-light text-[24px] leading-[1.3] text-[#1A1A1A] italic", children: [
      '"',
      subline,
      '"'
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.6]", children: description })
  ] });
}
function EverestEditions() {
  const editions2 = [
    {
      letter: "A",
      name: "Alpine Edition",
      sub: "The disciplined climb",
      positioning: "The essential Thamserku Everest experience, run with disciplined professional support and a clear, well-supported path to the summit.",
      for: "EXPERIENCED CLIMBERS"
    },
    {
      letter: "B",
      name: "Bespoke Edition",
      sub: "The personal expedition",
      positioning: "An Everest expedition shaped to your individual preparation, schedule, and pace, with private elements built around your goals.",
      for: "PRIVATE INDIVIDUALS"
    },
    {
      letter: "C",
      name: "Crafted Edition",
      sub: "Service, comfort, storytelling",
      positioning: "An elevated Everest with deeper service at Base Camp, richer comfort during acclimatisation, and documented expedition storytelling.",
      for: "STORYTELLERS & PRINCIPALS"
    },
    {
      letter: "D",
      name: "Definitive Edition",
      sub: "The most exclusive private Everest",
      positioning: "The most exclusive Thamserku Everest. A private camp, concierge planning, maximum discretion, and rare access.",
      for: "LEADERS & EXECUTIVES"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "bg-[#0A3A77] w-full text-white py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-8 flex flex-col gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "08 — EDITIONS" }),
      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]", children: "Four ways to read this mountain." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col border-t border-white/20", children: editions2.map((ed, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 md:gap-12 py-12 border-b border-white/20 items-start md:items-center hover:bg-white/[0.02] transition-colors cursor-pointer group", children: [
      /* @__PURE__ */ jsx("div", { className: "md:w-1/12 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[80px] lg:text-[100px] leading-none text-[#C8CDD2] group-hover:text-white transition-colors", children: ed.letter }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-3/12 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[28px] text-white", children: ed.name }),
        /* @__PURE__ */ jsx("span", { className: "font-['Lexend'] font-light text-[13px] text-[#C8CDD2]", children: ed.sub })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:w-4/12", children: /* @__PURE__ */ jsxs("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[14px] leading-relaxed pr-8", children: [
        '"',
        ed.positioning,
        '"'
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-2/12 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2]", children: ed.for }) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-2/12 flex justify-end", children: /* @__PURE__ */ jsx("span", { className: "font-['Lexend'] font-light text-[13px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors", children: "Read Edition →" }) })
    ] }, idx)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx("p", { className: "font-['Radley'] font-light italic text-[#C8CDD2] text-[16px]", children: "Note · The Explorer Edition is offered as a separate Everest Base Camp / Everest Experience product, not as a summit climb." }) })
  ] }) });
}
function JourneyStages() {
  const stages = [
    {
      num: "01",
      title: "Before Arrival",
      desc: "Pre-departure preparation, training guidance, medical screening, kit consultation, and a private orientation call with the expedition desk.",
      img: "https://images.unsplash.com/photo-1662563060383-d598d24d5956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRobWFuZHUlMjBwcmF5ZXIlMjBmbGFnc3xlbnwxfHx8fDE3Nzc0NDg4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "02",
      title: "Kathmandu",
      desc: "Arrival, gear check, briefing with the expedition leadership, blessings at Boudhanath, and final logistics.",
      img: "https://images.unsplash.com/photo-1662563060383-d598d24d5956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRobWFuZHUlMjBwcmF5ZXIlMjBmbGFnc3xlbnwxfHx8fDE3Nzc0NDg4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "03",
      title: "Khumbu Approach",
      desc: "The walk-in through Lukla, Namche, Tengboche, Dingboche, and Lobuche — where altitude is earned slowly and attentively.",
      img: "https://images.unsplash.com/photo-1719482969294-4d791f9d51f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYW1jaGUlMjBiYXphYXIlMjBuZXBhbHxlbnwxfHx8fDE3Nzc0NDg4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "04",
      title: "Base Camp",
      desc: "Settling at 5,364 m: the camp system, the rhythm of life, the role of the kitchen team, and the first acclimatisation cycles.",
      img: "https://images.unsplash.com/photo-1664520835396-07ac1fe41782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJhc2UlMjBjYW1wJTIwZm9nfGVufDF8fHx8MTc3NzQ0ODg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "05",
      title: "Rotations",
      desc: "Climbing rotations between Camps I–III, refining the body and the route. The mountain is read carefully, not rushed.",
      img: "https://images.unsplash.com/photo-1692303366066-14e7115341a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VmYWxsJTIwY2xpbWJlcnMlMjBsYWRkZXIlMjBldmVyZXN0fGVufDF8fHx8MTc3NzQ0ODg3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "06",
      title: "Summit Strategy",
      desc: "Weather windows, oxygen plans, Sherpa judgement, and the moment a single quiet decision is made: this is the day, or it is not.",
      img: "https://images.unsplash.com/photo-1759776037670-8290e9bf0524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bW1pdCUyMHJpZGdlJTIwc2lsaG91ZXR0ZXxlbnwxfHx8fDE3Nzc0NDg4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      num: "07",
      title: "Return",
      desc: "Descent, debrief, transit back to Kathmandu, and the long calm that follows a Himalayan expedition.",
      img: "https://images.unsplash.com/photo-1741383382869-334001cb0086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYmVycyUyMGRlc2NlbmRpbmclMjBzbm93JTIwbW91bnRhaW58ZW58MXx8fHwxNzc3NDQ4ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "bg-[#1A1A1A] w-full text-white py-24 md:py-32 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:64px_64px]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1440px] mx-auto px-8 flex flex-col gap-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "05 — THE JOURNEY" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]", children: "Seven stages, read in sequence." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col border-t border-white/10", children: stages.map((stage, idx) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-b border-white/10 items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[56px] lg:text-[80px] text-[#C8CDD2] leading-none block", children: stage.num }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 flex flex-col gap-4 pr-8 lg:pr-16", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-['Radley'] font-light text-[32px] text-white", children: stage.title }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-[1.8] max-w-[50ch]", children: stage.desc })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 mt-8 lg:mt-0", children: /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/3] overflow-hidden bg-[#2E353C]", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: stage.img,
            alt: stage.title,
            className: "w-full h-full object-cover grayscale-[20%] opacity-90"
          }
        ) }) })
      ] }, idx)) })
    ] })
  ] });
}
function RouteMap() {
  const waypoints = [
    { name: "Kathmandu", alt: "1,400 m" },
    { name: "Lukla", alt: "2,860 m" },
    { name: "Namche", alt: "3,440 m" },
    { name: "Tengboche", alt: "3,860 m" },
    { name: "Dingboche", alt: "4,410 m" },
    { name: "Lobuche", alt: "4,940 m" },
    { name: "Base Camp", alt: "5,364 m" },
    { name: "Camp I", alt: "6,065 m" },
    { name: "Camp II", alt: "6,400 m" },
    { name: "Camp III", alt: "7,200 m" },
    { name: "Camp IV", alt: "7,950 m" },
    { name: "Summit", alt: "8,848.86 m" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "bg-[#0A3A77] w-full text-white py-24 md:py-32 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-8 flex flex-col gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "06 — ROUTE" }),
      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]", children: "From Kathmandu to the summit. Eleven points on the line." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative w-full h-[400px] flex items-center mt-8 mb-16 overflow-x-auto hide-scrollbar", children: /* @__PURE__ */ jsxs("div", { className: "min-w-[1200px] w-full h-full relative flex items-end justify-between px-12", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-12 right-12 bottom-[40px] h-[1px] bg-white/30" }),
      waypoints.map((wp, idx) => {
        const isSummit = idx === waypoints.length - 1;
        const heightFactor = idx / (waypoints.length - 1) * 250;
        return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center group", style: { bottom: `${heightFactor + 40}px` }, children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-[8px] w-[1px] bg-white/20", style: { height: `${heightFactor}px` } }),
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white relative z-10" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full mb-6 flex flex-col items-center w-max", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2 text-center", children: wp.name }),
            /* @__PURE__ */ jsx("span", { className: `font-['Radley'] font-light ${isSummit ? "text-[24px]" : "text-[18px]"} text-white`, children: wp.alt })
          ] })
        ] }, idx);
      })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/20 pt-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "ROUTE PHILOSOPHY" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]", children: "We climb the South Col route, the route most decisively understood by our Sherpa team. We do not improvise." }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: "[CLIENT TO CONFIRM] — ROUTE STATEMENT PENDING VERIFICATION." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "ACCLIMATISATION CYCLE" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]", children: "Three rotations between Base Camp and the higher camps before any summit attempt is considered." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "SUMMIT WINDOW" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.8] max-w-[40ch]", children: "Read in hours, not days. Weather is the senior decision-maker on Everest, not ambition." })
      ] })
    ] })
  ] }) });
}
function SafetySupport() {
  const modules = [
    {
      label: "SHERPA LEADERSHIP",
      title: "Sherpa Leadership",
      desc: "Lead climbing Sherpas with documented 8,000m experience. Every expedition is built around their judgement."
    },
    {
      label: "OXYGEN STRATEGY",
      title: "Oxygen Strategy",
      desc: "A planned oxygen flow rate per altitude band. Personal masks, redundant regulators, and contingency cylinders staged across high camps."
    },
    {
      label: "MEDICAL PLANNING",
      title: "Medical Planning",
      desc: "Expedition doctor on call, medical kits at each camp, hyperbaric chamber at Base Camp, evacuation protocols mapped before departure."
    },
    {
      label: "COMMUNICATION",
      title: "Communication",
      desc: "Satellite communication, daily check-ins, weather reporting, and a 24/7 channel between Base Camp and Kathmandu operations."
    },
    {
      label: "WEATHER FORECASTING",
      title: "Weather Forecasting",
      desc: "Specialist Himalayan weather service, multi-source modelling, and a conservative bias toward standing down rather than pushing on."
    },
    {
      label: "ACCLIMATISATION",
      title: "Acclimatisation",
      desc: "Disciplined rotation schedule, no rushed altitude gain, and a willingness to abandon a window if the body is not yet ready."
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "bg-[#FFFFFF] w-full text-[#1A1A1A] py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-8 flex flex-col gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "07 — SAFETY & SUPPORT" }),
      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]", children: "Six quiet systems, working at all times." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 border-t border-[#1A1A1A]/10 pt-16", children: modules.map((mod, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: mod.label }),
      /* @__PURE__ */ jsx("h4", { className: "font-['Radley'] font-light text-[24px] text-[#1A1A1A] leading-[1.3]", children: mod.title }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.6]", children: mod.desc })
    ] }, idx)) })
  ] }) });
}
function YetiInfrastructureSupport() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] overflow-hidden text-white", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-10 pointer-events-none",
        style: {
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-12 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "YETI INFRASTRUCTURE SUPPORT — EVEREST" }),
          /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-white max-w-[18ch]", children: '"The infrastructure behind every Everest expedition."' })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-7 flex flex-col md:pt-16", children: /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.65] max-w-[56ch]", children: "Every Thamserku Everest expedition is supported by the Yeti Group operating foundation — quietly, throughout the season. Air coordination, mountain lodges, regional permits, and field continuity work in the background so the climb in front of you receives our full attention." }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "AIR · EVEREST" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[28px] leading-[1.2] text-white mb-4", children: "Helicopter coordination for the Khumbu." }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]", children: "Helicopter access between Kathmandu, Lukla, and the Khumbu — coordinated through the Yeti Group's aviation network. Rescue and rotational support available when conditions require." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "LODGES · KHUMBU APPROACH" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[28px] leading-[1.2] text-white mb-4", children: "Rest and acclimatisation, considered." }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]", children: "Yeti Group lodges along the Khumbu approach — Lukla, Namche, Tengboche, Dingboche — used for considered acclimatisation rhythm and recovery before Base Camp." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "PERMITS & ACCESS" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[28px] leading-[1.2] text-white mb-4", children: "Decades of regional presence." }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]", children: "Continuous regional presence in the Khumbu and Solukhumbu — backed by decades of permits, partnerships, and quiet field relationships." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "FIELD CONTINUITY" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[28px] leading-[1.2] text-white mb-4", children: "Kathmandu to Base Camp, unbroken." }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]", children: "A multi-generational field team coordinated from Kathmandu, supporting the same standards of care from first letter to descent — across every Everest season we run." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-16", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/yeti-infrastructure",
          className: "group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors",
          children: [
            /* @__PURE__ */ jsx("span", { className: "border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors", children: "READ THE FULL YETI INFRASTRUCTURE PAGE" }),
            /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "[CLIENT TO CONFIRM] — OPERATIONAL CLAIMS AND PARTNERSHIPS TO BE VERIFIED BEFORE PUBLICATION." }) })
    ] })
  ] });
}
function Preparation() {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] w-full text-white py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-8 flex flex-col gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "09 — PREPARATION" }),
      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]", children: "What an Everest year actually asks of you." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16", children: [
      /* @__PURE__ */ jsx(
        PrepColumn,
        {
          title: "Body",
          items: [
            "Aerobic base",
            "Strength endurance",
            "6,000m + 7,000m altitude history",
            "Carrying load practice"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        PrepColumn,
        {
          title: "Time",
          items: [
            "12+ months training runway",
            "60–65 days expedition window",
            "Pre-departure call sequence"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        PrepColumn,
        {
          title: "Mind",
          items: [
            "Acceptance of weather authority",
            "Patience for rotation",
            "Willingness to turn back",
            "Discipline at altitude"
          ]
        }
      )
    ] })
  ] }) });
}
function PrepColumn({ title, items }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ jsx("h4", { className: "font-['Radley'] font-light text-[32px] text-white", children: title }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: items.map((item, idx) => /* @__PURE__ */ jsx("div", { className: "py-4 border-t border-white/10 last:border-b font-['Lexend'] font-light text-[#C8CDD2] text-[15px]", children: item }, idx)) })
  ] });
}
function LeadSherpaPlaceholder() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] py-[140px] md:py-[180px] text-[#1A1A1A]", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[1440px] mx-auto px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/5] border border-[#5A6673] flex items-center justify-center p-8 text-center", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: /* @__PURE__ */ jsx("span", { children: "[IMAGE PLACEHOLDER] — LEAD SHERPA PORTRAIT — NO AI-GENERATED IMAGE PERMITTED. CLIENT TO PROVIDE." }) }) }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: "[CLIENT TO CONFIRM] Lead Sherpa name, portrait, region, years, mountains supported and philosophy line to be provided by the client." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 flex flex-col md:pt-16", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "LEAD SHERPA — EVEREST EXPEDITION" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-[#1A1A1A] max-w-[18ch] mb-8", children: '"Led by the people who know the mountain."' }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] text-[#0A3A77] max-w-[36ch] mb-8", children: "Senior Sirdar. Sherpa-led. Continuity across seasons." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[56ch] mb-16", children: "Every Thamserku Everest expedition is led by a senior Sirdar whose route judgement has been earned across decades of Himalayan seasons. The climbing Sherpas who walk with you are selected for experience, temperament, and continuity with the house." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-[#5A6673]/30 pt-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "NAME" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[22px] text-[#1A1A1A]", children: "[CLIENT TO CONFIRM]" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "REGION" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[22px] text-[#1A1A1A]", children: "Khumbu, Solukhumbu" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "YEARS" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[22px] text-[#1A1A1A]", children: "[CLIENT TO CONFIRM]" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "MOUNTAINS SUPPORTED" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[22px] text-[#1A1A1A]", children: "Everest · [CLIENT TO CONFIRM]" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[20px] text-[#0A3A77] max-w-[40ch]", children: '"[CLIENT TO CONFIRM] — Philosophy line to be provided by the lead Sherpa."' })
    ] })
  ] }) }) });
}
const seasons = [
  { name: "SPRING 2026", dates: "(Apr–May)" },
  { name: "SPRING 2027", dates: "(Apr–May)" },
  { name: "SPRING 2028", dates: "(Apr–May)" }
];
const editions = [
  { name: "A — ALPINE" },
  { name: "B — BESPOKE" },
  { name: "C — CRAFTED" },
  { name: "D — DEFINITIVE" }
];
const getStatus = (seasonIndex, editionIndex) => {
  const sum = seasonIndex + editionIndex;
  if (sum % 3 === 0) return { label: "OPEN", value: "[CLIENT TO CONFIRM] slots", color: "#C8CDD2" };
  if (sum % 3 === 1) return { label: "LIMITED", value: "[CLIENT TO CONFIRM] slots", color: "#C8CDD2" };
  return { label: "BOOKED — CONSULTATION ONLY", value: "[CLIENT TO CONFIRM]", color: "#0A3A77" };
};
function Availability() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#1A1A1A] py-[120px] md:py-[160px] text-white", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1440px] mx-auto px-8 flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[880px] flex flex-col items-center text-center mb-20 md:mb-24", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "AVAILABILITY — EVEREST" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.1] text-white max-w-[22ch] mb-8", children: "Availability — Everest Expedition." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.65] max-w-[56ch] mb-2", children: "[CLIENT TO CONFIRM] Seasonal windows, edition availability and slot numbers pending confirmation." }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: "[CLIENT TO CONFIRM] — SEASONAL WINDOWS, EDITION AVAILABILITY AND SLOT NUMBERS PENDING." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1180px] mb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden md:grid grid-cols-12 border-b border-[#C8CDD2]/30 pb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-4" }),
        editions.map((edition, idx) => /* @__PURE__ */ jsx("div", { className: "col-span-2 px-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: edition.name }, idx))
      ] }),
      seasons.map((season, sIdx) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 border-b border-[#C8CDD2]/30", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-4 py-8 md:py-10 md:pr-8 flex flex-col justify-center", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[15px] text-white mb-2", children: season.name }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] text-[13px] text-[#C8CDD2]", children: season.dates })
        ] }),
        editions.map((_, eIdx) => {
          const status = getStatus(sIdx, eIdx);
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "col-span-1 md:col-span-2 py-6 md:py-10 px-4 border-t md:border-t-0 md:border-l border-[#C8CDD2]/30 flex flex-col justify-center",
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-4",
                    style: { color: status.color === "#0A3A77" ? "#3B82F6" : status.color },
                    children: status.label
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[18px] md:text-[20px] text-white", children: status.value })
              ]
            },
            eIdx
          );
        })
      ] }, sIdx))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[880px] flex flex-col items-center text-center mb-16", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[16px] text-[#C8CDD2] max-w-[60ch] mb-8", children: "Slots are released by consultation only. Please write to the expedition desk to confirm availability for your preferred season." }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/consultation?peak=everest",
          className: "group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors",
          children: [
            /* @__PURE__ */ jsx("span", { className: "border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors", children: "CONFIRM AVAILABILITY VIA CONSULTATION" }),
            /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full text-center", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "[CLIENT TO CONFIRM] — SEASONAL WINDOWS AND SLOT NUMBERS PENDING CONFIRMATION." }) })
  ] }) });
}
const inclusionsData = [
  {
    category: "EXPEDITION LEADERSHIP",
    prefix: "L",
    items: [
      "Senior Sirdar and lead climbing Sherpas",
      "Expedition director (Kathmandu coordination)",
      "Senior medical advisor on call",
      "Client experience lead, single point of contact"
    ]
  },
  {
    category: "LOGISTICS & SUPPORT",
    prefix: "S",
    items: [
      "Permits, transport, and supply chain",
      "Base Camp setup and operational support",
      "Oxygen strategy and high-camp staging",
      "Communications (satellite, daily check-ins)",
      "Helicopter coordination via Yeti aviation network"
    ]
  },
  {
    category: "HOSPITALITY & CARE",
    prefix: "H",
    items: [
      "Kathmandu arrival and briefing",
      "Khumbu approach hospitality (lodges via Yeti)",
      "Base Camp catering and rest facilities",
      "Post-expedition debrief and continuity"
    ]
  }
];
function Inclusions() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] py-[140px] md:py-[180px] text-[#1A1A1A]", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1440px] mx-auto px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-12 mb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "WHAT IS INCLUDED — EVEREST" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.05] text-[#1A1A1A] max-w-[14ch]", children: '"Everything considered, in one expedition."' })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-7 flex flex-col justify-end md:pb-4", children: /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "Every Thamserku Everest expedition is supported from the first private conversation through descent. Exact inclusions vary by edition and are confirmed in a tailored proposal." }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20", children: inclusionsData.map((col, cIdx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: col.category }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col border-t border-[#5A6673]/30", children: col.items.map((item, iIdx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-start gap-6 py-6 border-b border-[#5A6673]/30",
          children: [
            /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] pt-1 min-w-[32px]", children: [
              col.prefix,
              ".0",
              iIdx + 1
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.6]", children: item })
          ]
        },
        iIdx
      )) })
    ] }, cIdx)) }),
    /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[60ch] mb-24", children: "Editions vary. Definitive expeditions add private camp configuration, concierge planning, and maximum discretion. Your tailored proposal will specify exact inclusions." }),
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "[CLIENT TO CONFIRM] — INCLUSIONS LIST INDICATIVE; FINAL INCLUSIONS PER EDITION CONFIRMED IN TAILORED PROPOSAL." }) })
  ] }) });
}
const faqs$1 = [
  {
    qPrefix: "Q.01",
    question: "How long is a Thamserku Everest expedition, and what is the season?",
    aPrefix: "A.01",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be confirmed by the expedition desk before publication."
  },
  {
    qPrefix: "Q.02",
    question: "What experience do I need before attempting Everest with Thamserku?",
    aPrefix: "A.02",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be confirmed by the expedition desk before publication."
  },
  {
    qPrefix: "Q.03",
    question: "Which editions are available on Everest, and how do I choose?",
    aPrefix: "A.03",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be confirmed by the expedition desk before publication."
  },
  {
    qPrefix: "Q.04",
    question: "How does Thamserku manage safety and acclimatisation on Everest?",
    aPrefix: "A.04",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be confirmed by the expedition desk before publication."
  },
  {
    qPrefix: "Q.05",
    question: "How does an Everest consultation work, and what happens next?",
    aPrefix: "A.05",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be confirmed by the expedition desk before publication."
  }
];
function ExpeditionFAQ() {
  const [openStates, setOpenStates] = useState({});
  const toggleFaq = (idx) => {
    setOpenStates((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-10 pointer-events-none",
        style: {
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[880px] mx-auto px-8 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-24 md:mb-32", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "FREQUENTLY ASKED — EVEREST" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.1] text-white max-w-[22ch] mb-8", children: '"Five quiet answers, before you write to us."' }),
        /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] text-[#C8CDD2] max-w-[56ch]", children: "The most common questions we receive about an Everest expedition." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col mb-24 border-b border-[#C8CDD2]/30", children: faqs$1.map((faq, idx) => {
        const isOpen = !!openStates[idx];
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex flex-col border-t border-[#C8CDD2]/30",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => toggleFaq(idx),
                  className: "flex flex-row items-center justify-between w-full py-8 md:py-10 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8CDD2]",
                  "aria-expanded": isOpen,
                  "aria-controls": `faq-answer-everest-${idx}`,
                  id: `faq-question-everest-${idx}`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-start gap-4 md:gap-8 flex-1 pr-8", children: [
                      /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-2", children: [
                        faq.qPrefix,
                        " —"
                      ] }),
                      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[24px] leading-[1.3] text-white group-hover:text-white max-w-[60ch] transition-colors", children: faq.question })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `font-['JetBrains_Mono'] text-[14px] text-[#C8CDD2] group-hover:text-white transition-all duration-[250ms] ease-out transform ${isOpen ? "rotate-180" : "rotate-0"}`,
                        children: "▾"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  id: `faq-answer-everest-${idx}`,
                  role: "region",
                  "aria-labelledby": `faq-question-everest-${idx}`,
                  className: "grid transition-all duration-[250ms] ease-out",
                  style: { gridTemplateRows: isOpen ? "1fr" : "0fr" },
                  children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-8 md:pb-10", children: [
                    /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-1", children: [
                      faq.aPrefix,
                      " —"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] max-w-[60ch]", children: faq.answer })
                  ] }) })
                }
              )
            ]
          },
          idx
        );
      }) }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/faq",
          className: "group flex items-center justify-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors",
          children: [
            /* @__PURE__ */ jsx("span", { className: "border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors", children: "READ ALL FAQS ON THE MAIN FAQ PAGE" }),
            /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] })
  ] });
}
function EverestClosing() {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-[#1A1A1A] w-full min-h-[80vh] flex items-center justify-center text-center px-8 py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1700556581902-6aa21e96507c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXN0YW50JTIwZXZlcmVzdCUyMHNpbGhvdWV0dGUlMjB0d2lsaWdodHxlbnwxfHx8fDE3Nzc0NDg4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          alt: "Everest silhouette at twilight",
          className: "w-full h-full object-cover object-bottom opacity-20"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-[#1A1A1A]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center gap-8 max-w-[800px] w-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "10 — BEGIN PRIVATELY" }),
      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[60px] md:text-[80px] leading-[1.1] text-white mb-4", children: "Speak with the expedition desk." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-[1.8] max-w-[56ch] mb-8", children: "Every Thamserku Everest expedition begins with a private conversation, not a booking page. Share your background, timing and intention — we will respond personally." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/consultation?peak=everest", className: "border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-transparent hover:text-white transition-colors flex items-center justify-center gap-3", children: [
          "Schedule an Everest Consultation ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4", strokeWidth: 1 })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/editions", className: "border border-white/30 text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors flex items-center justify-center gap-3", children: [
          "Explore Available Editions ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4", strokeWidth: 1 })
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-8", children: "RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF" })
    ] })
  ] });
}
const Everest = UNSAFE_withComponentProps(function Everest2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-[#1A1A1A] min-h-screen text-white font-['Lexend'] selection:bg-[#0A3A77] selection:text-white",
    children: [/* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsx(EverestHero, {}), /* @__PURE__ */ jsx(QuickFacts, {}), /* @__PURE__ */ jsx(Overview, {}), /* @__PURE__ */ jsx(WhoItIsFor, {}), /* @__PURE__ */ jsx(EverestEditions, {}), /* @__PURE__ */ jsx(JourneyStages, {}), /* @__PURE__ */ jsx(RouteMap, {}), /* @__PURE__ */ jsx(SafetySupport, {}), /* @__PURE__ */ jsx(YetiInfrastructureSupport, {}), /* @__PURE__ */ jsx(Preparation, {}), /* @__PURE__ */ jsx(LeadSherpaPlaceholder, {}), /* @__PURE__ */ jsx(Availability, {}), /* @__PURE__ */ jsx(Inclusions, {}), /* @__PURE__ */ jsx(ExpeditionFAQ, {}), /* @__PURE__ */ jsx(EverestClosing, {})]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Everest
}, Symbol.toStringTag, { value: "Module" }));
const heroImage$2 = "/assets/Copy_of_Lukla_(14)-Dac-2x9_.jpg";
function AtlasListingHero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-screen bg-[#1A1A1A] flex flex-col justify-end text-white overflow-hidden pb-16 md:pb-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70",
          style: {
            backgroundImage: `url('${heroImage$2}')`
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-10",
          style: {
            backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
            backgroundSize: "64px 64px"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-32 md:mt-48", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-5xl md:text-[88px] lg:text-[104px] leading-[1.05] mb-8 max-w-[18ch] text-white tracking-tight", children: "Five mountains. Five different kinds of preparation." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-20", children: "Thamserku reads each Himalayan summit as a passage of its own. Choose by altitude, region, season or character — then begin a private conversation with the expedition desk." }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block w-full pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap md:flex-nowrap gap-y-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: [
        /* @__PURE__ */ jsx("div", { className: "pr-8 py-2 md:py-0 whitespace-nowrap", children: "5 EXPEDITIONS" }),
        /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-nowrap", children: "ALTITUDE 8,000m+ · TBC" }),
        /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-normal", children: "REGION KHUMBU · GORKHA · DHAULAGIRI · MAHALANGUR · ANNAPURNA" }),
        /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-nowrap", children: "SEASON SPRING · AUTUMN" })
      ] }) })
    ] })
  ] });
}
function AtlasControls() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] sticky top-0 z-30 border-b border-[#1A1A1A]/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-6", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "02 — ATLAS CONTROLS" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] hidden md:block", children: "5 EXPEDITIONS · INDEXED BY THE THAMSERKU DESK" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10 border-t border-[#1A1A1A]/10", children: [
      { label: "MOUNTAIN", value: "All" },
      { label: "ALTITUDE", value: "All" },
      { label: "REGION", value: "All" },
      { label: "SEASON", value: "All" },
      { label: "TECHNICAL LEVEL", value: "All" },
      { label: "EDITION", value: "All" }
    ].map((filter, i) => /* @__PURE__ */ jsxs("div", { className: `py-4 ${i === 0 ? "md:pr-6" : "md:px-6"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-1", children: filter.label }),
      /* @__PURE__ */ jsxs("button", { className: "font-['Lexend'] font-light text-[14px] flex items-center gap-2 border-b border-[#1A1A1A]/30 pb-0.5 hover:border-[#1A1A1A] transition-colors group", children: [
        filter.value,
        " ",
        /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3 text-[#5A6673] group-hover:text-[#1A1A1A]" })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsx("div", { className: "py-4 border-t border-[#1A1A1A]/10 flex justify-end", children: /* @__PURE__ */ jsxs("button", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors flex items-center gap-2", children: [
      "Reset Atlas ",
      /* @__PURE__ */ jsx(MoveRight, { className: "w-3 h-3" })
    ] }) })
  ] }) });
}
const everestImage = "/assets/Everest_for_Breakfast_(8)-CO5MxvcL.jpg";
const entries = [
  {
    code: "EXP / 01 — EVR",
    season: "SEASON · SPRING",
    name: "Everest",
    positioning: "The highest mountain on earth asks for more than strength. It asks for patience, judgement, and respect.",
    altitude: "8,848.86 m",
    region: "Khumbu, Nepal",
    seasonDetail: "Spring",
    style: "Disciplined passage",
    editions: "A · B · C · D",
    image: everestImage,
    isDark: true,
    link: "/everest"
  },
  {
    code: "EXP / 02 — MAN",
    season: "SEASON · AUTUMN",
    name: "Manaslu",
    positioning: "A powerful 8,000m expedition for climbers seeking scale, beauty, and progression.",
    altitude: "8,163 m",
    region: "Gorkha, Nepal",
    seasonDetail: "Autumn",
    style: "Progression climb",
    editions: "A · B · C",
    image: "https://images.unsplash.com/photo-1650221293568-82a9823d938a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYW5hc2x1JTIwV2lkZSUyMHJpZGdlJTIwc2lsaG91ZXR0ZSUyMHVuZGVyJTIwYXV0dW1uJTIwbGlnaHR8ZW58MXx8fHwxNzc3NDUyMTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isDark: false,
    link: "#"
  },
  {
    code: "EXP / 03 — DHA",
    season: "SEASON · SPRING",
    name: "Dhaulagiri",
    positioning: "Remote, immense, and uncompromising — a mountain for solitude and strength.",
    altitude: "8,167 m",
    region: "Dhaulagiri, Nepal",
    seasonDetail: "Spring",
    style: "Solitude climb",
    editions: "B · C · D",
    image: "https://images.unsplash.com/photo-1768876833110-3254591724ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEaGF1bGFnaXJpJTIwaXNvbGF0ZWQlMjBtb3VudGFpbnxlbnwxfHx8fDE3Nzc0NTIxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isDark: true,
    link: "#"
  },
  {
    code: "EXP / 04 — MAK",
    season: "SEASON · SPRING",
    name: "Makalu",
    positioning: "A striking Himalayan giant for experienced climbers seeking technical elegance and isolation.",
    altitude: "8,485 m",
    region: "Mahalangur, Nepal",
    seasonDetail: "Spring",
    style: "Technical climb",
    editions: "B · C · D",
    image: "https://images.unsplash.com/photo-1657376921110-8fb3ff3c2cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWthbHUlMjBtb3VudGFpbnxlbnwxfHx8fDE3Nzc0NTIxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isDark: false,
    link: "#"
  },
  {
    code: "EXP / 05 — HIM",
    season: "SEASON · SPRING · AUTUMN",
    name: "Himchuli",
    positioning: "A quieter Himalayan objective for climbers seeking a less commercial expedition experience.",
    altitude: "TBC",
    region: "Annapurna, Nepal",
    seasonDetail: "Spring · Autumn",
    style: "Quiet objective",
    editions: "A · B · E",
    image: "https://images.unsplash.com/photo-1581447547509-711eb65cd5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YSUyMG1vdW50YWluJTIwcXVpZXRlciUyMHBhcnRpYWwlMjBjbG91ZCUyMGxlc3MlMjBoZXJvaWN8ZW58MXx8fHwxNzc3NDUyMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isDark: true,
    link: "#"
  }
];
function AtlasIndex() {
  return /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col", children: entries.map((entry2, idx) => /* @__PURE__ */ jsx(
    "section",
    {
      className: `w-full py-24 md:py-48 px-8 ${entry2.isDark ? "bg-[#1A1A1A] text-white" : "bg-[#F4F2EC] text-[#1A1A1A]"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 relative aspect-[4/3] w-full overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            ImageWithFallback,
            {
              src: entry2.image,
              alt: entry2.name,
              className: "w-full h-full object-cover grayscale-[30%] opacity-90 transition-opacity duration-700 hover:opacity-100"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 p-6 text-white", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] bg-white/10 backdrop-blur-sm px-4 py-2 text-white", children: [
            "ALT · ",
            entry2.altitude.toUpperCase()
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 flex flex-col justify-center", children: [
          /* @__PURE__ */ jsxs("div", { className: `w-full border-t ${entry2.isDark ? "border-white/20 text-[#C8CDD2]" : "border-[#1A1A1A]/20 text-[#5A6673]"} pt-4 mb-16 flex justify-between items-start`, children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px]", children: entry2.code }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px]", children: entry2.season })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-6xl md:text-[72px] leading-[1] mb-8 tracking-tight", children: entry2.name }),
          /* @__PURE__ */ jsxs("p", { className: `font-['Radley'] text-[18px] italic leading-relaxed max-w-[38ch] mb-16 ${entry2.isDark ? "text-[#C8CDD2]" : "text-[#5A6673]"}`, children: [
            '"',
            entry2.positioning,
            '"'
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-2 gap-8 mb-12 ${entry2.isDark ? "text-white" : "text-[#1A1A1A]"}`, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 ${entry2.isDark ? "text-[#5A6673]" : "text-[#5A6673]"}`, children: "Altitude" }),
              /* @__PURE__ */ jsx("div", { className: "font-['Radley'] text-2xl", children: entry2.altitude })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 ${entry2.isDark ? "text-[#5A6673]" : "text-[#5A6673]"}`, children: "Region" }),
              /* @__PURE__ */ jsx("div", { className: "font-['Radley'] text-2xl", children: entry2.region })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 ${entry2.isDark ? "text-[#5A6673]" : "text-[#5A6673]"}`, children: "Season" }),
              /* @__PURE__ */ jsx("div", { className: "font-['Radley'] text-2xl", children: entry2.seasonDetail })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 ${entry2.isDark ? "text-[#5A6673]" : "text-[#5A6673]"}`, children: "Style" }),
              /* @__PURE__ */ jsx("div", { className: "font-['Radley'] text-2xl", children: entry2.style })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-16 pb-6 border-b ${entry2.isDark ? "border-white/10 text-[#C8CDD2]" : "border-[#1A1A1A]/10 text-[#5A6673]"}`, children: [
            "EDITIONS AVAILABLE ",
            /* @__PURE__ */ jsx("span", { className: "mx-4 font-light", children: "·" }),
            " ",
            entry2.editions
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
            /* @__PURE__ */ jsxs(Link, { to: entry2.link, className: `border px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors flex items-center justify-center gap-3 ${entry2.isDark ? "border-white bg-white text-[#0A3A77] hover:bg-transparent hover:text-white" : "border-[#0A3A77] bg-[#0A3A77] text-white hover:bg-transparent hover:text-[#0A3A77]"}`, children: [
              "Read the Dossier ",
              /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4", strokeWidth: 1 })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/consultation", className: `border px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors flex items-center justify-center gap-3 ${entry2.isDark ? "border-white/30 text-white hover:border-white" : "border-[#0A3A77]/30 text-[#0A3A77] hover:border-[#0A3A77]"}`, children: [
              "Schedule a Consultation ",
              /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4", strokeWidth: 1 })
            ] })
          ] })
        ] })
      ] })
    },
    idx
  )) });
}
function AtlasComparison() {
  const data = [
    {
      name: "Everest",
      altitude: "8,848.86 m",
      region: "Khumbu",
      season: "Spring",
      style: "Disciplined passage",
      editions: "A · B · C · D",
      bestFor: "Disciplined 8,000m aspirants"
    },
    {
      name: "Manaslu",
      altitude: "8,163 m",
      region: "Gorkha",
      season: "Autumn",
      style: "Progression climb",
      editions: "A · B · C",
      bestFor: "Progression climbers seeking scale"
    },
    {
      name: "Dhaulagiri",
      altitude: "8,167 m",
      region: "Dhaulagiri",
      season: "Spring",
      style: "Solitude climb",
      editions: "B · C · D",
      bestFor: "Solitude-led private climbers"
    },
    {
      name: "Makalu",
      altitude: "8,485 m",
      region: "Mahalangur",
      season: "Spring",
      style: "Technical climb",
      editions: "B · C · D",
      bestFor: "Technically experienced climbers"
    },
    {
      name: "Himchuli",
      altitude: "TBC",
      region: "Annapurna",
      season: "Spring · Autumn",
      style: "Quiet objective",
      editions: "A · B · E",
      bestFor: "Quiet, less commercial objectives"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#0A3A77] text-white py-32 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col gap-16", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row gap-12 justify-between items-start mb-12", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-6", children: "04 — AT A GLANCE" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-5xl md:text-[56px] leading-[1.1] max-w-[16ch]", children: "Five mountains, read side by side." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[1000px] text-left border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/20", children: [
        /* @__PURE__ */ jsx("th", { className: "py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[18%]", children: "MOUNTAIN" }),
        /* @__PURE__ */ jsx("th", { className: "py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[12%]", children: "ALTITUDE" }),
        /* @__PURE__ */ jsx("th", { className: "py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[15%]", children: "REGION" }),
        /* @__PURE__ */ jsx("th", { className: "py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[15%]", children: "SEASON" }),
        /* @__PURE__ */ jsx("th", { className: "py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[15%]", children: "STYLE" }),
        /* @__PURE__ */ jsx("th", { className: "py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[10%]", children: "EDITIONS" }),
        /* @__PURE__ */ jsx("th", { className: "py-6 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] font-normal w-[15%]", children: "BEST FOR" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-white/10", children: data.map((row, idx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors duration-300 group", children: [
        /* @__PURE__ */ jsx("td", { className: "py-8 pr-4 font-['Radley'] text-2xl text-white", children: row.name }),
        /* @__PURE__ */ jsx("td", { className: "py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors", children: row.altitude }),
        /* @__PURE__ */ jsx("td", { className: "py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors", children: row.region }),
        /* @__PURE__ */ jsx("td", { className: "py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors", children: row.season }),
        /* @__PURE__ */ jsx("td", { className: "py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors", children: row.style }),
        /* @__PURE__ */ jsx("td", { className: "py-8 pr-4 font-['JetBrains_Mono'] tracking-[0.22em] text-[10px] text-[#C8CDD2] group-hover:text-white transition-colors", children: row.editions }),
        /* @__PURE__ */ jsx("td", { className: "py-8 pr-4 font-['Lexend'] font-light text-[14px] text-[#C8CDD2] group-hover:text-white transition-colors", children: row.bestFor })
      ] }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pt-8 border-t border-white/20", children: /* @__PURE__ */ jsx("p", { className: "font-['Radley'] text-[16px] italic text-[#C8CDD2] max-w-[80ch]", children: "Note · Altitude is one variable among many. Speak with the expedition desk to understand which mountain is right for your background and intent." }) })
  ] }) });
}
function SevenThousandMeterPathwayInsert() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] py-[140px] md:py-[180px] text-[#1A1A1A]", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[1440px] mx-auto px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "BEFORE THE 8,000M PEAKS — A QUALIFYING PATHWAY" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-[#1A1A1A] max-w-[18ch] mb-8", children: '"Read the 7,000m peaks first."' }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] text-[#0A3A77] max-w-[28ch]", children: "Preparation is the most honest part of an 8,000m expedition." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 flex flex-col md:pt-16", children: [
      /* @__PURE__ */ jsx("div", { className: "font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[60ch] mb-12", children: /* @__PURE__ */ jsx("p", { children: "A 7,000m qualifying ascent can become the ground where altitude, judgement and discipline are properly earned." }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 mb-16", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/consultation?intent=7000m",
            className: "group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#5A6673] transition-colors w-fit",
            children: [
              /* @__PURE__ */ jsx("span", { className: "border-b border-[#1A1A1A]/30 group-hover:border-[#5A6673] pb-1 transition-colors", children: "PLAN YOUR QUALIFYING ASCENT" }),
              /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/7000m",
            className: "group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#5A6673] transition-colors w-fit",
            children: [
              /* @__PURE__ */ jsx("span", { className: "border-b border-[#1A1A1A]/30 group-hover:border-[#5A6673] pb-1 transition-colors", children: "READ THE 7,000M QUALIFYING PATHWAY" }),
              /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "[ROUTE TBC] — FIVE 7,000M ROUTE OPTIONS PENDING CLIENT CONFIRMATION." })
    ] })
  ] }) }) });
}
function AtlasSeasonalGuide() {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white text-[#1A1A1A] py-32 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col gap-24", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mb-6", children: "05 — SEASONAL GUIDE" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-5xl md:text-[56px] leading-[1.1] max-w-[24ch]", children: "When the Himalaya is read, and when it is rested." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full border-t border-[#1A1A1A]/10 pt-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 mb-8 md:mb-16 gap-x-2", children: months.map((month, i) => /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673] border-l border-[#1A1A1A]/10 pl-2 h-[480px] md:h-[240px]", children: month }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-16 md:top-24 left-0 w-full h-full pointer-events-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-[25%] w-[16.666%] pr-4 border-l border-transparent pl-2 hidden md:block", children: [
          /* @__PURE__ */ jsx("div", { className: "h-[4px] bg-[#0A3A77] w-full mb-3" }),
          /* @__PURE__ */ jsxs("div", { className: "font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#0A3A77] leading-[1.8]", children: [
            "EVEREST",
            /* @__PURE__ */ jsx("br", {}),
            "DHAULAGIRI",
            /* @__PURE__ */ jsx("br", {}),
            "MAKALU",
            /* @__PURE__ */ jsx("br", {}),
            "HIMCHULI"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-[66.666%] w-[25%] pr-4 border-l border-transparent pl-2 hidden md:block", children: [
          /* @__PURE__ */ jsx("div", { className: "h-[4px] bg-[#5A6673] w-full mb-3" }),
          /* @__PURE__ */ jsxs("div", { className: "font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673] leading-[1.8]", children: [
            "MANASLU",
            /* @__PURE__ */ jsx("br", {}),
            "HIMCHULI"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden absolute top-0 left-[25%] w-[16.666%] pl-1", children: /* @__PURE__ */ jsx("div", { className: "h-[120px] bg-[#0A3A77] w-[4px]" }) }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden absolute top-0 left-[66.666%] w-[25%] pl-1", children: /* @__PURE__ */ jsx("div", { className: "h-[120px] bg-[#5A6673] w-[4px]" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-12 border-t border-[#1A1A1A]/10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A] mb-4", children: "SPRING WINDOW" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-relaxed", children: '"The most established Himalayan summit window. Long days, stable weather patterns, and the season most 8,000m expeditions are run."' })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A] mb-4", children: "AUTUMN WINDOW" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-relaxed", children: '"A drier, clearer season favoured by Manaslu and quieter objectives. Cold sets in early; the window is shorter."' })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A] mb-4", children: "OFF-SEASON" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-relaxed", children: '"Monsoon and deep winter are not climbing seasons at Thamserku. The mountain is at rest, and so are we."' })
      ] })
    ] })
  ] }) });
}
function AtlasWhy() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col md:flex-row gap-16 md:gap-32", children: [
    /* @__PURE__ */ jsx("div", { className: "md:w-1/3", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "06 — THE THAMSERKU READING" }) }),
    /* @__PURE__ */ jsxs("div", { className: "md:w-2/3", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-['Radley'] font-light text-4xl md:text-[44px] leading-[1.2] max-w-[28ch] text-[#1A1A1A] mb-12", children: [
        "Thamserku does not maintain a long catalogue. We read ",
        /* @__PURE__ */ jsx("span", { className: "italic text-[#0A3A77]", children: "selected mountains carefully" }),
        " — and lead the climbers who choose to read them with us."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[16px] leading-relaxed max-w-[60ch]", children: "Each expedition in this atlas is shaped around Sherpa leadership, conservative weather judgement, and nearly four decades of Himalayan logistics. We do not add mountains to grow. We deepen the mountains we already understand." })
    ] })
  ] }) });
}
const faqs = [
  {
    qPrefix: "Q.01",
    question: "How do I choose the right expedition for my background and intention?",
    aPrefix: "A.01",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  },
  {
    qPrefix: "Q.02",
    question: "What is the difference between a private expedition and a small group expedition?",
    aPrefix: "A.02",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  },
  {
    qPrefix: "Q.03",
    question: "What experience do I need before attempting Everest?",
    aPrefix: "A.03",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  },
  {
    qPrefix: "Q.04",
    question: "What is the difference between an 8,000m expedition and a 7,000m qualifying ascent?",
    aPrefix: "A.04",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  },
  {
    qPrefix: "Q.05",
    question: "How are private expeditions planned, and how does the consultation begin?",
    aPrefix: "A.05",
    answer: "[DUMMY FAQ] Placeholder answer. Final response to be drafted by the expedition desk after peak data, edition availability and route guidance are confirmed."
  }
];
function AtlasFAQ() {
  const [openStates, setOpenStates] = useState({});
  const toggleFaq = (idx) => {
    setOpenStates((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-10 pointer-events-none",
        style: {
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[880px] mx-auto px-8 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-24 md:mb-32", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "FREQUENTLY ASKED — ATLAS" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.1] text-white max-w-[22ch] mb-8", children: '"Five quiet answers, before you write to us."' }),
        /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] text-[#C8CDD2] max-w-[56ch]", children: "Most readers arrive at the Atlas with the same questions. These are the most common." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col mb-24 border-b border-[#C8CDD2]/30", children: faqs.map((faq, idx) => {
        const isOpen = !!openStates[idx];
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex flex-col border-t border-[#C8CDD2]/30",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => toggleFaq(idx),
                  className: "flex flex-row items-center justify-between w-full py-8 md:py-10 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8CDD2]",
                  "aria-expanded": isOpen,
                  "aria-controls": `faq-answer-atlas-${idx}`,
                  id: `faq-question-atlas-${idx}`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-start gap-4 md:gap-8 flex-1 pr-8", children: [
                      /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-2", children: [
                        faq.qPrefix,
                        " —"
                      ] }),
                      /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[24px] leading-[1.3] text-white group-hover:text-white max-w-[60ch] transition-colors", children: faq.question })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: `font-['JetBrains_Mono'] text-[14px] text-[#C8CDD2] group-hover:text-white transition-all duration-[250ms] ease-out transform ${isOpen ? "rotate-180" : "rotate-0"}`,
                        children: "▾"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  id: `faq-answer-atlas-${idx}`,
                  role: "region",
                  "aria-labelledby": `faq-question-atlas-${idx}`,
                  className: "grid transition-all duration-[250ms] ease-out",
                  style: { gridTemplateRows: isOpen ? "1fr" : "0fr" },
                  children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-8 md:pb-10", children: [
                    /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] md:min-w-[80px] md:pt-1", children: [
                      faq.aPrefix,
                      " —"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] max-w-[60ch]", children: faq.answer })
                  ] }) })
                }
              )
            ]
          },
          idx
        );
      }) }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/faq",
          className: "group flex items-center justify-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors",
          children: [
            /* @__PURE__ */ jsx("span", { className: "border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors", children: "READ ALL FAQS ON THE MAIN FAQ PAGE" }),
            /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] })
  ] });
}
function AtlasClosing() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] text-white py-32 md:py-48 px-8 overflow-hidden min-h-[800px] flex flex-col justify-center items-center text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 opacity-40 mix-blend-luminosity", children: [
      /* @__PURE__ */ jsx(
        ImageWithFallback,
        {
          src: "https://images.unsplash.com/photo-1745252288608-ed7c56a8d15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjByaWRnZWxpbmUlMjBzaWxob3VldHRlfGVufDF8fHx8MTc3NzQ1MjE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          alt: "Himalayan Silhouette",
          className: "w-full h-full object-cover object-bottom"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[800px] mx-auto flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-12", children: "07 — BEGIN PRIVATELY" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-5xl md:text-[80px] leading-[1.05] text-white tracking-tight mb-8", children: "Not sure which mountain is yours? That is exactly why we begin with a conversation." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-16", children: "Share your background, your timing, and your intention. Our expedition desk will respond with the mountain — and the edition — that fits." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 mb-12", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/consultation", className: "border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-transparent hover:text-white transition-colors flex items-center justify-center gap-3", children: [
          "Schedule a Consultation ",
          /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4", strokeWidth: 1 })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/everest", className: "border border-white/30 text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors flex items-center justify-center gap-3", children: [
          "View Everest ",
          /* @__PURE__ */ jsx(MoveRight, { className: "w-4 h-4", strokeWidth: 1 })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF" })
    ] })
  ] });
}
const AtlasPage = UNSAFE_withComponentProps(function AtlasPage2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "w-full min-h-screen bg-[#1A1A1A] text-white",
    children: [/* @__PURE__ */ jsx(Nav, {
      hideOnScrollDown: true
    }), /* @__PURE__ */ jsx(AtlasListingHero, {}), /* @__PURE__ */ jsx(AtlasControls, {}), /* @__PURE__ */ jsx(AtlasIndex, {}), /* @__PURE__ */ jsx(AtlasComparison, {}), /* @__PURE__ */ jsx(SevenThousandMeterPathwayInsert, {}), /* @__PURE__ */ jsx(AtlasSeasonalGuide, {}), /* @__PURE__ */ jsx(AtlasWhy, {}), /* @__PURE__ */ jsx(AtlasFAQ, {}), /* @__PURE__ */ jsx(AtlasClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AtlasPage
}, Symbol.toStringTag, { value: "Module" }));
const heroImage$1 = "/assets/Copy_of_DSCF0876-BLPC4TMC.jpg";
function EditionsHero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-end pb-24 md:pb-32 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70",
          style: {
            backgroundImage: `url('${heroImage$1}')`
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-10",
          style: {
            backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
            backgroundSize: "64px 64px"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end mt-48", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-5xl md:text-[88px] lg:text-[104px] leading-[1.05] mb-8 max-w-[18ch] text-white tracking-tight", children: "Five lenses through which to read the same mountain." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[64ch] mb-24 md:mb-32", children: "Every Thamserku expedition is shaped by an edition. The mountain remains the mountain — but the way it is read, supported, and lived through changes with intent, privacy, and preparation." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-0 w-full border-l border-white/10", children: [
        { letter: "A", name: "ALPINE" },
        { letter: "B", name: "BESPOKE" },
        { letter: "C", name: "CRAFTED" },
        { letter: "D", name: "DEFINITIVE" },
        { letter: "E", name: "EXPLORER" }
      ].map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-r border-b md:border-b-0 border-white/10 px-6 py-8", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-7xl md:text-[140px] lg:text-[180px] leading-none text-[#C8CDD2] mb-4 md:mb-8", children: item.letter }),
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white", children: [
          item.letter,
          " — ",
          item.name
        ] })
      ] }, idx)) })
    ] })
  ] });
}
function EditionsManifesto() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-48 px-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-4 lg:col-span-5", children: /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "02 — THE READING" }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-8 lg:col-span-7 flex flex-col gap-12", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-['Radley'] font-light text-4xl md:text-[52px] leading-[1.1] max-w-[30ch] tracking-tight text-[#1A1A1A]", children: [
        "A Thamserku edition is not an upgrade. ",
        /* @__PURE__ */ jsx("span", { className: "italic text-[#0A3A77]", children: "It is a way of reading the mountain." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#5A6673] text-[16px] leading-relaxed max-w-[60ch]", children: "From Alpine discipline to the Definitive private expedition, each edition is shaped around intent, privacy, and preparation. The mountain remains constant. What changes is how you arrive at it, who walks beside you, and what is taken care of quietly behind the line." })
    ] })
  ] }) });
}
const bandsData = [
  {
    id: "03A",
    letter: "A",
    tag: "THE DISCIPLINED CLIMB",
    name: "Alpine Edition",
    signature: "The essential expedition.",
    copy: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: "The Alpine Edition is the foundation of how Thamserku climbs. It is the most direct reading of the mountain — disciplined, professionally led, and built around the climber's own preparation rather than external comfort." }),
      /* @__PURE__ */ jsx("p", { children: "Every Alpine expedition is run with full Sherpa leadership, conservative weather judgement, and the same field standards as our most private editions. What changes is restraint: less surface, more substance." })
    ] }),
    audience: "Experienced climbers seeking a disciplined, professionally managed expedition. Suited to those who measure a Himalayan season by judgement and patience, not by service.",
    mountains: "EVEREST · MANASLU · HIMCHULI",
    bgColor: "bg-[#1A1A1A]",
    image: "https://images.unsplash.com/photo-1629976791862-5749e12b2f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBtb3VudGFpbiUyMHBlYWslMjBzbm93fGVufDF8fHx8MTc3NzU2MTc5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "03B",
    letter: "B",
    tag: "A MORE PERSONAL EXPEDITION",
    name: "Bespoke Edition",
    signature: "Shaped around your intent.",
    copy: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: "The Bespoke Edition is the first edition in which the expedition is reshaped around the individual. Schedule, pace, support, and small private elements are tuned to the climber's goals, body, and life — without compromising the rigor of how Thamserku reads the mountain." }),
      /* @__PURE__ */ jsx("p", { children: "It remains a serious Himalayan expedition, but the rhythm is yours." })
    ] }),
    audience: "Private climbers, couples, or small groups seeking flexibility and customization within a fully Sherpa-led expedition framework.",
    mountains: "EVEREST · MANASLU · DHAULAGIRI · MAKALU · HIMCHULI",
    bgColor: "bg-[#F4F2EC]",
    image: "https://images.unsplash.com/photo-1692452376160-14194abefba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJhc2UlMjBjYW1wJTIwdGVudCUyMGV2ZW5pbmd8ZW58MXx8fHwxNzc3NTYxNzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "03C",
    letter: "C",
    tag: "SERVICE · COMFORT · STORYTELLING",
    name: "Crafted Edition",
    signature: "An elevated reading.",
    copy: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: "The Crafted Edition deepens the human side of an expedition. The technical seriousness remains, but Base Camp life, acclimatisation rest, and the rhythm of the journey are richer. There is more attention to comfort, to food, to recovery, and to the documentation of the climb itself." }),
      /* @__PURE__ */ jsx("p", { children: "It is the edition for climbers who want their season to be remembered as well as completed." })
    ] }),
    audience: "HNW clients, executives, and climbers who want technical seriousness paired with richer service, attentive comfort, and considered expedition storytelling.",
    mountains: "EVEREST · MANASLU · DHAULAGIRI · MAKALU",
    bgColor: "bg-[#1A1A1A]",
    image: "https://images.unsplash.com/photo-1733528346006-a47bc1648c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJhc2UlMjBjYW1wJTIwdGVudCUyMGV2ZW5pbmd8ZW58MXx8fHwxNzc3NTYxNzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "03D",
    letter: "D",
    tag: "RARE · PRIVATE · UNCOMMON",
    name: "Definitive Edition",
    signature: "The most exclusive private expedition.",
    copy: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: "The Definitive Edition is the most exclusive Thamserku experience. A private camp, concierge planning, maximum discretion, and rare access — all built quietly around a single climber, family, or principal." }),
      /* @__PURE__ */ jsx("p", { children: "Nothing is templated. Logistics, route preparation, communication, hospitality, and aftercare are designed in private and handled by senior expedition staff from first contact to descent." })
    ] }),
    audience: "UHNW individuals, private families, elite adventurers, and clients requiring maximum privacy, discretion, and tailoring.",
    mountains: "EVEREST · DHAULAGIRI · MAKALU",
    bgColor: "bg-[#0A3A77]",
    isFlagship: true,
    image: "https://images.unsplash.com/photo-1767511513723-bc5ec26142c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBtYWplc3RpYyUyMHBlYWslMjBkcmFtYXRpY3xlbnwxfHx8fDE3Nzc1NjE4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "03E",
    letter: "E",
    tag: "BEYOND THE SUMMIT",
    name: "Explorer Edition",
    signature: "The Himalayas, read softly.",
    copy: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: "The Explorer Edition exists for the Himalayas beyond the summit. Cultural journeys, base-camp experiences, photographic expeditions, and slower, non-climbing readings of the same mountains we summit on other editions." }),
      /* @__PURE__ */ jsx("p", { children: "It is the edition for those who want to be in the Himalayas without setting out to stand on top of them." })
    ] }),
    audience: "Travellers, families, leaders, photographers, and cultural explorers seeking softer Himalayan journeys.",
    mountains: "HIMCHULI · EVEREST (BASE CAMP / EXPERIENCE)",
    bgColor: "bg-[#F4F2EC]",
    image: "https://images.unsplash.com/photo-1763738173775-5f2f5c6fd782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMGhpbWFsYXlhcyUyMHZhbGxleSUyMGN1bHR1cmV8ZW58MXx8fHwxNzc3NTYxODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];
function EditionsBands() {
  return /* @__PURE__ */ jsx("section", { className: "w-full flex flex-col", children: bandsData.map((band, idx) => {
    const isDark = band.bgColor === "bg-[#1A1A1A]" || band.bgColor === "bg-[#0A3A77]";
    const letterColor = band.bgColor === "bg-[#F4F2EC]" ? "text-[#0A3A77]/20" : band.bgColor === "bg-[#0A3A77]" ? "text-white/20" : "text-[#C8CDD2]/20";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `w-full relative overflow-hidden ${band.bgColor} ${band.isFlagship ? "py-40 md:py-64 pb-16" : "py-32 md:py-48"} px-8`,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute inset-0 z-0 pointer-events-none mix-blend-luminosity ${isDark ? "opacity-30" : "opacity-[0.08]"}`,
              style: {
                backgroundImage: `url(${band.image})`,
                backgroundPosition: "left center",
                backgroundSize: "cover",
                WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)",
                maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)"
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-5 relative flex flex-col pt-8", children: [
              /* @__PURE__ */ jsxs("p", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-8 ${isDark ? "text-[#C8CDD2]" : "text-[#0A3A77]"}`, children: [
                "EDITION ",
                band.letter
              ] }),
              /* @__PURE__ */ jsx("div", { className: `font-['Radley'] font-light leading-none ${band.isFlagship ? "text-[240px] md:text-[380px]" : "text-[200px] md:text-[320px]"} -ml-4 ${letterColor}`, children: band.letter }),
              /* @__PURE__ */ jsx("p", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mt-8 max-w-[20ch] leading-relaxed ${isDark ? "text-[#5A6673]" : "text-[#5A6673]"}`, children: band.tag })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-7 flex flex-col", children: [
              /* @__PURE__ */ jsxs("p", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-12 ${isDark ? "text-[#5A6673]" : "text-[#5A6673]"}`, children: [
                band.id,
                " — EDITION ",
                band.letter
              ] }),
              /* @__PURE__ */ jsx("h3", { className: `font-['Radley'] font-light ${band.isFlagship ? "text-5xl md:text-[80px]" : "text-5xl md:text-[64px]"} mb-6 ${isDark ? "text-white" : "text-[#1A1A1A]"}`, children: band.name }),
              /* @__PURE__ */ jsx("p", { className: `font-['Radley'] italic text-[24px] md:text-[28px] mb-12 ${band.bgColor === "bg-[#1A1A1A]" ? "text-[#C8CDD2]" : band.bgColor === "bg-[#0A3A77]" ? "text-[#C8CDD2]" : "text-[#0A3A77]"}`, children: band.signature }),
              /* @__PURE__ */ jsx("div", { className: `font-['Lexend'] font-light text-[16px] leading-relaxed max-w-[56ch] mb-16 ${band.bgColor === "bg-[#1A1A1A]" ? "text-[#C8CDD2]" : band.bgColor === "bg-[#0A3A77]" ? "text-[#C8CDD2]" : "text-[#5A6673]"}`, children: band.copy }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-10 max-w-[56ch]", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-4 ${isDark ? "text-white" : "text-[#1A1A1A]"}`, children: "WHO IT IS FOR" }),
                  /* @__PURE__ */ jsx("p", { className: `font-['Lexend'] font-light italic text-[15px] leading-relaxed ${band.bgColor === "bg-[#1A1A1A]" ? "text-[#C8CDD2]" : band.bgColor === "bg-[#0A3A77]" ? "text-[#C8CDD2]" : "text-[#5A6673]"}`, children: band.audience })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-4 ${isDark ? "text-white" : "text-[#1A1A1A]"}`, children: "BEST READ ON" }),
                  /* @__PURE__ */ jsx("p", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.1em] text-[13px] ${band.bgColor === "bg-[#1A1A1A]" ? "text-[#C8CDD2]" : band.bgColor === "bg-[#0A3A77]" ? "text-white" : "text-[#5A6673]"}`, children: band.mountains })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-6 mt-20", children: band.isFlagship ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/consultation?intent=definitive",
                    className: `inline-flex items-center justify-center px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border ${isDark ? "border-white text-white hover:bg-white hover:text-[#0A3A77]" : "border-[#0A3A77] text-[#0A3A77] hover:bg-[#0A3A77] hover:text-white"}`,
                    children: "SCHEDULE A DEFINITIVE CONSULTATION →"
                  }
                ),
                /* @__PURE__ */ jsx("button", { className: `px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-transparent ${isDark ? "text-[#C8CDD2] hover:text-white hover:border-white/30" : "text-[#5A6673] hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30"}`, children: "READ MORE ABOUT THE DEFINITIVE →" })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("button", { className: `px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border ${isDark ? "border-white text-white hover:bg-white hover:text-[#0A3A77]" : "border-[#0A3A77] text-[#0A3A77] hover:bg-[#0A3A77] hover:text-white"}`, children: "READ THE COLLECTION →" }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/consultation",
                    className: `inline-flex items-center justify-center px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-transparent ${isDark ? "text-[#C8CDD2] hover:text-white hover:border-white/30" : "text-[#5A6673] hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30"}`,
                    children: "SCHEDULE A CONSULTATION →"
                  }
                )
              ] }) })
            ] })
          ] }),
          band.isFlagship && /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-8 right-8 z-10 w-full max-w-[1440px] mx-auto text-center md:text-left", children: /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "[IMAGE PLACEHOLDER] — DEFINITIVE EDITION CINEMATIC SPREAD. FINAL IMAGE TO BE PROVIDED BY CLIENT." }) })
        ]
      },
      idx
    );
  }) });
}
function EditionsComparison() {
  const tableData = [
    { label: "CHARACTER", a: "Disciplined", b: "Personal", c: "Crafted", d: "Definitive", e: "Cultural" },
    { label: "PRIVACY LEVEL", a: "Standard", b: "Tailored", c: "High", d: "Maximum", e: "Tailored" },
    { label: "COMFORT LEVEL", a: "Essential", b: "Considered", c: "Elevated", d: "Definitive", e: "Considered" },
    { label: "STYLE", a: "Disciplined climb", b: "Personal climb", c: "Service-rich climb", d: "Private flagship", e: "Non-summit reading" },
    { label: "BEST FOR", a: "Experienced climbers", b: "Private groups", c: "Elevated service", d: "UHNW individuals", e: "Cultural explorers" },
    { label: "AVAILABLE ON", a: "EVEREST · MANASLU · HIMCHULI", b: "ALL", c: "EVEREST · MANASLU · DHAULAGIRI · MAKALU", d: "EVEREST · DHAULAGIRI · MAKALU", e: "HIMCHULI · EVEREST B.C." }
  ];
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white text-[#1A1A1A] py-32 px-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1440px] mx-auto", children: [
    /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: "04 — AT A GLANCE" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-4xl md:text-[56px] leading-[1.1] mb-24 max-w-[20ch]", children: "Five editions, read side by side." }),
    /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[1024px] text-left border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-[#1A1A1A]/10", children: [
        /* @__PURE__ */ jsx("th", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] font-normal text-[#5A6673] py-8 w-1/6", children: "EDITION" }),
        ["A", "B", "C", "D", "E"].map((letter) => /* @__PURE__ */ jsxs("th", { className: "font-['Radley'] font-light text-2xl md:text-3xl text-[#1A1A1A] py-8 w-[16.66%]", children: [
          letter === "A" && "Alpine",
          letter === "B" && "Bespoke",
          letter === "C" && "Crafted",
          letter === "D" && "Definitive",
          letter === "E" && "Explorer"
        ] }, letter))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: tableData.map((row, idx) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-[#1A1A1A]/10 transition-colors hover:bg-[#F4F2EC]/50", children: [
        /* @__PURE__ */ jsx("td", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] py-8", children: row.label }),
        /* @__PURE__ */ jsx("td", { className: "font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4", children: row.a }),
        /* @__PURE__ */ jsx("td", { className: "font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4", children: row.b }),
        /* @__PURE__ */ jsx("td", { className: "font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4", children: row.c }),
        /* @__PURE__ */ jsx("td", { className: "font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4", children: row.d }),
        /* @__PURE__ */ jsx("td", { className: "font-['Lexend'] font-light text-[15px] text-[#1A1A1A] py-8 pr-4", children: row.e })
      ] }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "font-['Radley'] italic text-[#5A6673] text-[16px] mt-16 max-w-[80ch]", children: "Note · Editions are not ranked. They are different ways of reading the same mountain. Speak with the expedition desk to find which edition fits your background and intent." })
  ] }) });
}
function EditionsAvailability() {
  const mountains = [
    { name: "EVEREST", alt: "8,848M" },
    { name: "MANASLU", alt: "8,163M" },
    { name: "DHAULAGIRI", alt: "8,167M" },
    { name: "MAKALU", alt: "8,485M" },
    { name: "HIMCHULI", alt: "6,441M" }
  ];
  const editions2 = [
    { letter: "A", availability: [true, true, false, false, true] },
    { letter: "B", availability: [true, true, true, true, true] },
    { letter: "C", availability: [true, true, true, true, false] },
    { letter: "D", availability: [true, false, true, true, false] },
    { letter: "E", availability: [false, false, false, false, true] }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] text-white py-32 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 opacity-0 pointer-events-none",
        style: {
          backgroundImage: `none`,
          backgroundSize: "0px 0px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "05 — AVAILABILITY ATLAS" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-4xl md:text-[56px] leading-[1.1] mb-24 max-w-[20ch]", children: "Which editions are offered on which mountains." }),
      /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[800px] text-center border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "w-1/6" }),
          mountains.map((mountain, idx) => /* @__PURE__ */ jsx("th", { className: "pb-12 border-b border-white/10 w-[16.66%]", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] font-normal text-white", children: mountain.name }) }, idx))
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: editions2.map((edition, rowIdx) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "py-8 border-b border-white/10 text-left", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-4xl text-[#C8CDD2]", children: edition.letter }) }),
          edition.availability.map((isAvailable, colIdx) => /* @__PURE__ */ jsx("td", { className: "py-8 border-b border-white/10 text-center", children: isAvailable ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-[#C8CDD2]" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] tracking-[0.22em] text-[10px] text-[#5A6673]", children: mountains[colIdx].alt })
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-[#5A6673]", children: "—" }) }, colIdx))
        ] }, rowIdx)) })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "font-['Radley'] italic text-[#C8CDD2] text-[16px] mt-16 max-w-[80ch]", children: "Note · Explorer Edition is offered as a separate Everest Base Camp / Everest Experience product, not as a summit climb." })
    ] })
  ] });
}
function EditionsClosing() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#0A3A77] text-white py-32 md:py-48 px-8 flex flex-col items-center justify-center text-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[800px] flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12", children: "06 — BEGIN PRIVATELY" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-5xl md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tight mb-8", children: "Not sure which edition is yours? That is exactly why we begin with a conversation." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-16", children: "Share your background, your timing, and your intention. Our expedition desk will recommend the mountain — and the edition — that fits." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-6 mb-16 w-full justify-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation",
          className: "w-full sm:w-auto px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-white text-white hover:bg-white hover:text-[#0A3A77]",
          children: "SCHEDULE A CONSULTATION →"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation",
          className: "w-full sm:w-auto px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-transparent text-[#C8CDD2] hover:text-white hover:border-white/30",
          children: "SPEAK WITH THE EXPEDITION DESK →"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] opacity-80", children: "RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF" })
  ] }) });
}
const EditionsPage = UNSAFE_withComponentProps(function EditionsPage2() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "w-full min-h-screen bg-[#1A1A1A] text-white",
    children: [/* @__PURE__ */ jsx(EditionsHero, {}), /* @__PURE__ */ jsx(EditionsManifesto, {}), /* @__PURE__ */ jsx(EditionsBands, {}), /* @__PURE__ */ jsx(EditionsComparison, {}), /* @__PURE__ */ jsx(EditionsAvailability, {}), /* @__PURE__ */ jsx(EditionsClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditionsPage
}, Symbol.toStringTag, { value: "Module" }));
const heroImage = "/assets/Copy_of_Everest_for_Breakfast_(3)-IpSsSLRk.jpg";
function LegacyHero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen min-h-[800px] bg-[#1A1A1A] text-white flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity sepia-[.2]",
          style: {
            backgroundImage: `url('${heroImage}')`
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-transparent to-[#1A1A1A]/90" })
    ] }),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-32 md:mt-48 flex-grow pb-24 md:pb-32", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-['Cormorant_Garamond'] font-light text-5xl md:text-[88px] lg:text-[104px] leading-[1.05] mb-8 max-w-[24ch] text-white tracking-tight", children: [
        "Thamserku was not created to ",
        /* @__PURE__ */ jsx("span", { className: "italic text-[#C8CDD2]", children: "follow" }),
        " the Himalayan expedition industry. It helped ",
        /* @__PURE__ */ jsx("span", { className: "italic text-[#C8CDD2]", children: "shape" }),
        " it."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-['Inter'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch]", children: "A long-form reading of the house, its origins, its Sherpa leadership, its place in the Yeti Group, and its revival for a global audience." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block relative z-20 w-full border-t border-white/20 mt-auto bg-[#1A1A1A]/30 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1440px] mx-auto px-8 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap md:flex-nowrap gap-y-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "md:pr-8 py-2 md:py-0 whitespace-nowrap", children: "FEATURE · LEGACY" }),
      /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-nowrap", children: "THE HIMALAYAN ATLAS" }),
      /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-nowrap", children: "READ TIME · 12 MIN" }),
      /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-nowrap", children: "NEPAL · 1987 — TODAY" })
    ] }) }) })
  ] });
}
function LegacyOrigin() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-40 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-2 flex flex-col gap-8 md:sticky md:top-32 h-fit", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mb-2", children: "02 — ORIGIN" }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block", children: "1987 — 1995" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-[#1A1A1A]/10 pt-4 mt-8 hidden md:block", children: /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] leading-relaxed max-w-[16ch]", children: "PRINCIPALS · A SHERPA-LED HOUSE FROM THE BEGINNING." }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-7 font-['Cormorant_Garamond'] text-[18px] leading-[1.7] text-[#2E353C] flex flex-col gap-8", children: [
      /* @__PURE__ */ jsx("p", { className: "first-letter:font-['Cormorant_Garamond'] first-letter:text-[#0A3A77] first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:-mt-2", children: "Thamserku was named after a Himalayan peak, but it was built around a quieter principle: that a Himalayan expedition is only as serious as the Sherpa knowledge that runs it. Founded in the late 1980s as one of Nepal's original high-altitude expedition names, the house grew not by chasing the largest summits, but by deepening the practices that made each expedition possible — route preparation, weather judgement, and a Sherpa-first leadership culture that has remained at the centre of the house for nearly four decades." }),
      /* @__PURE__ */ jsx("p", { children: "It is part of the Yeti Group, the wider Nepali hospitality and Himalayan group through which Thamserku continues to operate, and to which it is connected by lineage rather than by branding." }),
      /* @__PURE__ */ jsx("div", { className: "border-y border-[#0A3A77]/20 py-12 md:py-16 mt-12 mb-8", children: /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] italic text-3xl md:text-[44px] leading-tight text-[#0A3A77] font-light", children: '"A Himalayan expedition is only as serious as the Sherpa knowledge that runs it."' }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-3 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/5] bg-gray-200 overflow-hidden relative grayscale-[0.8] sepia-[0.3]", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1678501265684-9b76ea299692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjB2aW50YWdlJTIwa2h1bWJ1JTIwYXBwcm9hY2h8ZW58MXx8fHwxNzc3NDU2NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          alt: "Archival khumbu approach",
          className: "w-full h-full object-cover mix-blend-multiply opacity-80"
        }
      ) }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mt-2", children: "KHUMBU APPROACH · ARCHIVAL" })
    ] })
  ] }) });
}
const chairmanImage = "/assets/Mt-Everest-8848m-no-label-1-XCj15Fwr.jpg";
function LegacyChairman() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] text-white py-24 md:py-40 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 opacity-5 pointer-events-none",
        style: {
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-5 flex flex-col gap-6 md:sticky md:top-32 h-fit", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[4/5] bg-gray-800 overflow-hidden relative grayscale-[0.8] sepia-[0.2]", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: chairmanImage,
              alt: "Mt. Everest 8848m",
              className: "w-full h-full object-cover mix-blend-screen opacity-90"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#1A1A1A]/30 mix-blend-multiply" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mt-2", children: "MT. EVEREST · 8848M · MAHALANGUR HIMAL" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-7 font-['Cormorant_Garamond'] text-[18px] leading-[1.75] text-[#C8CDD2] flex flex-col gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-8", children: "03 — THE CHAIRMAN'S LETTER" }),
          /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[52px] leading-tight text-white max-w-[22ch]", children: "A short letter, written quietly." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 max-w-[60ch]", children: [
          /* @__PURE__ */ jsx("p", { children: "To those reading this page —" }),
          /* @__PURE__ */ jsx("p", { children: "The Himalayas have given our family, our team, and our company more than we will ever be able to give back. We have been part of seasons, summits, and quiet days that asked everything of us. We have been part of decisions that were made carefully, by people whose judgement was earned over decades, not bought with equipment." }),
          /* @__PURE__ */ jsx("p", { children: "Thamserku, today, is a refinement of that long inheritance. It is run by a smaller, more disciplined house, supported by the Yeti Group, and led — as it has always been — by Sherpa expertise. The mountain has not changed. Our way of reading it has only deepened." }),
          /* @__PURE__ */ jsx("p", { children: "We do not conquer the mountain. We learn from it. And we pass that learning on to the people who climb with us." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col items-start", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['Cormorant_Garamond'] italic text-2xl md:text-[24px] text-white border-b border-white/20 pb-2 mb-4", children: "— The Chairman" }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "THAMSERKU EXPEDITIONS · YETI GROUP" })
        ] })
      ] })
    ] })
  ] });
}
function LegacyTimeline() {
  const chapters = [
    {
      roman: "I",
      years: "1987 — 1995",
      title: "Founding Era",
      desc: "Thamserku is established as one of Nepal's original high-altitude expedition names. Early seasons are run on Manaslu, Dhaulagiri, and the Khumbu approach to Everest. The Sherpa-first culture is set in place from the start.",
      img: "https://images.unsplash.com/photo-1727209093337-4e9ba71e3f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwxOTgwcyUyMG1vdW50YWluJTIwZXhwZWRpdGlvbiUyMHZpbnRhZ2V8ZW58MXx8fHwxNzc3NDU2NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      roman: "II",
      years: "1995 — 2005",
      title: "Sherpa-led Logistics",
      desc: "The house deepens its logistics practice — route preparation, fixed lines, oxygen staging, and Base Camp operations are run end-to-end by senior Sherpas trained over years, not seasons.",
      img: "https://images.unsplash.com/photo-1606585890880-a20adcf38a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJhc2UlMjBjYW1wJTIwdGVudCUyMHNub3d8ZW58MXx8fHwxNzc3NDU2NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      roman: "III",
      years: "2005 — 2020",
      title: "Expedition Role",
      desc: "Thamserku grows quietly into a recognised name in the Himalayan expedition industry, supporting both private climbers and visiting teams across the 8,000m peaks of Nepal.",
      img: "https://images.unsplash.com/photo-1734445558792-885402602f7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBjbGltYiUyMGVhcmx5JTIwMjAwMHN8ZW58MXx8fHwxNzc3NDU2NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      roman: "IV",
      years: "2020 — 2024",
      title: "Heritage Revival",
      desc: "A deliberate revival begins under the Yeti Group: the house is sharpened back to its original principles — fewer mountains, deeper practice, and a refined editorial identity for a global audience.",
      img: "https://images.unsplash.com/photo-1547127678-a8619053611c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjBsZWFkaW5nJTIwbW91bnRhaW4lMjB0cmVrfGVufDF8fHx8MTc3NzQ1NjYyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      roman: "V",
      years: "Today",
      title: "Refined for the World",
      desc: "Thamserku now reads five Himalayan mountains carefully — Everest, Manaslu, Dhaulagiri, Makalu, and Himchuli — across five editions: Alpine, Bespoke, Crafted, Definitive, and Explorer.",
      img: "https://images.unsplash.com/photo-1606928359897-d3dc5dd872df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBoaW1hbGF5YW4lMjBsYW5kc2NhcGUlMjBtb3VudGFpbnxlbnwxfHx8fDE3Nzc0NTY2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-40 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-[1440px] mx-auto px-8 flex flex-col gap-12 md:gap-24", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 mb-16", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block", children: "04 — TIMELINE" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-[#1A1A1A] max-w-[22ch]", children: "Five chapters in the life of a Himalayan house." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full mt-8 md:mt-24 pb-32", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[80px] md:top-[120px] left-0 w-full h-[1px] bg-[#0A3A77] z-10" }),
      /* @__PURE__ */ jsxs("div", { className: "flex overflow-x-auto gap-8 px-8 snap-x snap-mandatory scrollbar-hide pb-16 relative z-20", children: [
        chapters.map((chapter, idx) => /* @__PURE__ */ jsxs("div", { className: "min-w-[280px] md:min-w-[340px] max-w-[340px] flex-shrink-0 snap-start flex flex-col relative pt-[80px] md:pt-[120px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-[76px] md:top-[116px] left-1/2 -translate-x-1/2 flex flex-col items-center z-30", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-[#0A3A77]" }),
            /* @__PURE__ */ jsx("div", { className: "w-[1px] h-12 bg-[#0A3A77]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 mt-16 bg-[#F4F2EC]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/3] bg-gray-200 overflow-hidden grayscale-[0.5] sepia-[0.1]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: chapter.img,
                alt: chapter.title,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 px-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block", children: [
                "CHAPTER ",
                chapter.roman,
                " · ",
                chapter.years
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[24px] md:text-[28px] leading-tight text-[#1A1A1A]", children: chapter.title }),
              /* @__PURE__ */ jsx("p", { className: "font-['Inter'] font-light text-[#5A6673] text-[15px] leading-relaxed", children: chapter.desc })
            ] })
          ] })
        ] }, idx)),
        /* @__PURE__ */ jsx("div", { className: "min-w-[24px] md:min-w-[64px] flex-shrink-0" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1440px] mx-auto px-8 mt-16", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[56ch]", children: "Note · This is not a corporate milestone chart. It is the rhythm of a house that has measured time in seasons, not quarters." }) })
  ] });
}
function LegacyLineage() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white text-[#1A1A1A] py-24 md:py-40 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col gap-16 md:gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block", children: "05 — LINEAGE" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-[#1A1A1A] max-w-[22ch]", children: "A house within a wider Himalayan group." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-7 flex flex-col gap-8 font-['Cormorant_Garamond'] text-[18px] leading-[1.7] text-[#5A6673] max-w-[60ch]", children: [
        /* @__PURE__ */ jsx("p", { children: "Thamserku Expeditions operates under the Yeti Group, the Nepali hospitality and Himalayan group through which the house has been continuously connected to the country's mountaineering, hospitality, and aviation lineage." }),
        /* @__PURE__ */ jsx("p", { children: "The relationship is one of stewardship rather than ownership. The Yeti Group provides the wider organisational support that allows Thamserku to remain disciplined in scope: a small, focused expedition house that does not need to chase volume to remain relevant." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-5 relative flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-[#1A1A1A]/10 w-full max-w-[400px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-[#1A1A1A]/10 gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "HOUSE" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A]", children: "THAMSERKU EXPEDITIONS" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-[#1A1A1A]/10 gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "GROUP" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A]", children: "YETI GROUP" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-[#1A1A1A]/10 gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "LOCATION" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A]", children: "KATHMANDU · NEPAL HIMALAYA" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply",
            style: {
              backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
              backgroundSize: "32px 32px"
            }
          }
        )
      ] })
    ] })
  ] }) });
}
function LegacyRevival() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#0A3A77] text-white py-24 md:py-40 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col gap-16 md:gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 border-b border-white/20 pb-16", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block", children: "06 — THE REVIVAL" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-white max-w-[24ch]", children: "The same house, read again — for a quieter, more global audience." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-5 flex flex-col gap-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] italic text-[26px] text-[#C8CDD2] mb-4", children: '"Refined, not reinvented."' }),
        /* @__PURE__ */ jsxs("div", { className: "font-['Cormorant_Garamond'] text-[17px] leading-[1.75] text-[#C8CDD2] flex flex-col gap-8", children: [
          /* @__PURE__ */ jsx("p", { children: "The revival of Thamserku is not a relaunch. The team that runs the house, the Sherpas who lead the climbs, and the principles that shape the editions are the same as they have been for decades." }),
          /* @__PURE__ */ jsx("p", { children: "What has changed is the way the house presents itself. Fewer mountains. Clearer editions. A quieter editorial voice. A way of speaking to a global audience without losing the Sherpa lineage that defines us." }),
          /* @__PURE__ */ jsx("p", { children: "It is the same expedition house, read again." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-7 flex flex-col gap-8 md:gap-12 mt-8 md:mt-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 border-t border-white/20 pt-6", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "FOCUS" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] md:text-[28px] text-white", children: '"Five mountains, read carefully — instead of a long catalogue."' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 border-t border-white/20 pt-6", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "EDITIONS" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] md:text-[28px] text-white", children: '"Five editions — Alpine, Bespoke, Crafted, Definitive, Explorer — clearly defined."' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 border-t border-white/20 pt-6", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "LEADERSHIP" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] md:text-[28px] text-white", children: '"Sherpa-led at every layer of the expedition, from sirdar to summit decision."' })
        ] })
      ] })
    ] })
  ] }) });
}
function LegacyPhilosophy() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 md:py-48 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center text-center gap-16 md:gap-24", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block", children: "07 — PHILOSOPHY" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 md:gap-12 w-full max-w-[800px]", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-['Cormorant_Garamond'] font-light text-5xl md:text-[64px] lg:text-[80px] leading-[1.1] text-[#1A1A1A] tracking-tight", children: [
        "We do not conquer the mountain. ",
        /* @__PURE__ */ jsx("span", { className: "italic text-[#0A3A77] block mt-4", children: "We learn from it." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-['Inter'] font-light text-[#5A6673] text-[17px] leading-relaxed max-w-[56ch] mx-auto mt-4", children: "And we pass that learning on to the people who climb with us." })
    ] })
  ] }) });
}
function LegacyNewsletterBanner() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] py-[120px] md:py-[160px] px-8 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[880px] flex flex-col items-center text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "FIELD NOTES — NEWSLETTER FROM THE EXPEDITION DESK" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[44px] md:text-[56px] text-[#1A1A1A] leading-tight max-w-[26ch] mb-6", children: '"A quiet letter, four times a year."' }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] text-[#5A6673] text-[16px] leading-[1.7] max-w-[60ch] mb-12", children: "Field reports, route judgements, and Himalayan readings from our expedition desk. No marketing. No frequency beyond what is honest. Unsubscribe anytime." }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        className: "w-full max-w-[600px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 mb-8",
        onSubmit: (e) => e.preventDefault(),
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              placeholder: "Your email address",
              className: "w-full md:flex-1 bg-transparent border-b border-[#5A6673]/30 py-4 px-2 focus:outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-[#5A6673]/50 placeholder:font-['Cormorant_Garamond'] placeholder:italic placeholder:text-[18px] text-[16px] text-[#1A1A1A] font-['Lexend']",
              required: true
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block w-[1px] h-[30px] bg-[#5A6673]/30 mx-6" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full md:w-auto shrink-0 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] border border-[#0A3A77] hover:bg-[#0A3A77] hover:text-white transition-colors",
              children: "SUBSCRIBE TO FIELD NOTES →"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: "BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS." })
  ] }) });
}
function LegacyClosing() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] text-white py-24 md:py-40 overflow-hidden min-h-[600px] flex flex-col justify-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none flex items-end", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-full h-[60%] bg-cover bg-bottom bg-no-repeat opacity-[0.15] mix-blend-screen",
          style: {
            backgroundImage: `url('https://images.unsplash.com/photo-1656086358330-723c94f30ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbiUyMHJpZGdlbGluZSUyMHNpbGhvdWV0dGUlMjBkYXJrfGVufDF8fHx8MTc3NzQ1NjYxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1440px] mx-auto w-full px-8 flex flex-col gap-16 md:gap-24 mt-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block", children: "08 — CONTINUE READING" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-5xl md:text-[72px] leading-tight text-white max-w-[24ch]", children: "Read the rest of the house." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4 md:mt-12", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/atlas", className: "flex flex-col gap-6 border border-white/20 p-8 hover:border-white/60 transition-colors group bg-[#1A1A1A]/50 backdrop-blur-sm min-h-[280px]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block", children: "§ NEXT — EXPEDITIONS" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[24px] md:text-[28px] leading-tight text-white", children: "The Expedition Atlas" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-relaxed mb-12", children: '"Read the five mountains carefully."' }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors", children: "READ THE EXPEDITION ATLAS →" }) })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/yeti-infrastructure", className: "flex flex-col gap-6 border border-white/20 p-8 hover:border-white/60 transition-colors group bg-[#1A1A1A]/50 backdrop-blur-sm min-h-[280px]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block", children: "§ NEXT — INFRASTRUCTURE" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[24px] md:text-[28px] leading-tight text-white", children: "Yeti Infrastructure" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-relaxed mb-12", children: '"The operating ecosystem behind every expedition."' }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors", children: "READ YETI INFRASTRUCTURE →" }) })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/consultation", className: "flex flex-col gap-6 border border-white/20 p-8 hover:border-white/60 transition-colors group bg-[#1A1A1A]/50 backdrop-blur-sm min-h-[280px]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block", children: "§ NEXT — CONSULTATION" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[24px] md:text-[28px] leading-tight text-white", children: "Begin Privately" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-relaxed mb-12", children: '"Speak with the expedition desk."' }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors", children: "SCHEDULE A CONSULTATION →" }) })
        ] })
      ] })
    ] })
  ] });
}
const LegacyPage = UNSAFE_withComponentProps(function LegacyPage2() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "w-full min-h-screen bg-[#F4F2EC] text-[#1A1A1A]",
    children: [/* @__PURE__ */ jsx(LegacyHero, {}), /* @__PURE__ */ jsx(LegacyOrigin, {}), /* @__PURE__ */ jsx(LegacyChairman, {}), /* @__PURE__ */ jsx(LegacyTimeline, {}), /* @__PURE__ */ jsx(LegacyLineage, {}), /* @__PURE__ */ jsx(LegacyRevival, {}), /* @__PURE__ */ jsx(LegacyPhilosophy, {}), /* @__PURE__ */ jsx(LegacyNewsletterBanner, {}), /* @__PURE__ */ jsx(LegacyClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LegacyPage
}, Symbol.toStringTag, { value: "Module" }));
function TeamHero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full h-screen min-h-[800px] bg-[#1A1A1A] text-white flex flex-col justify-end pb-16 md:pb-32 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 grayscale-[0.5] sepia-[0.2]",
          style: {
            backgroundImage: `url('https://images.unsplash.com/photo-1658288098101-84f074c292a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBzaGVycGElMjBwb3J0cmFpdCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzc3NDU5OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A]" })
    ] }),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end mt-48 h-full", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-['Cormorant_Garamond'] font-light text-5xl md:text-[88px] lg:text-[104px] leading-[1.05] mb-8 max-w-[22ch] text-white tracking-tight", children: "The people who know the mountain." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Inter'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-24 md:mb-32", children: "Every Thamserku expedition is led by people whose judgement was earned over decades of Himalayan seasons — not over training programmes. Read the team that will guide your journey." }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block w-full pt-6 border-t border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap md:flex-nowrap gap-y-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white", children: [
        /* @__PURE__ */ jsx("div", { className: "pr-8 py-2 md:py-0 whitespace-nowrap", children: "LEADERSHIP · SHERPA-LED" }),
        /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-nowrap", children: "FIELD TEAM · MULTI-GENERATIONAL" }),
        /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-nowrap", children: "BASED · NEPAL HIMALAYA" }),
        /* @__PURE__ */ jsx("div", { className: "md:px-8 py-2 md:py-0 whitespace-nowrap", children: "LANGUAGES · NEPALI · ENGLISH · SHERPA" })
      ] }) })
    ] })
  ] });
}
function TeamManifesto() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-40 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16", children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-3 lg:col-span-4", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mt-2", children: "02 — THE READING" }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-9 lg:col-span-8 flex flex-col gap-12", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[52px] leading-tight text-[#1A1A1A] max-w-[32ch]", children: [
        "Sherpa knowledge is not a feature of a Thamserku expedition. ",
        /* @__PURE__ */ jsx("span", { className: "italic text-[#0A3A77]", children: "It is the knowledge base on which the house is built." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-['Inter'] font-light text-[#5A6673] text-[16px] leading-relaxed max-w-[60ch]", children: "The team you read on this page is the team that climbs with you. Senior sirdars whose decades of route judgement decide what is and is not a climbing day. Climbing Sherpas who carry, fix, and lead. A base camp team that holds the rhythm of the season. And a quiet leadership group, in Kathmandu, that protects all of it." })
    ] })
  ] }) });
}
function TeamSherpaLeadership() {
  const sherpaProfiles = [
    {
      name: "[Sherpa Leader 01]",
      role: "Senior Sirdar · Khumbu Region",
      image: "https://images.unsplash.com/photo-1752732673663-e1da5e4677db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBndWlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Khumbu, Solukhumbu",
      years: "28",
      mountains: "Everest · Manaslu · Makalu",
      expertise: "Route preparation · Summit decisioning · Weather judgement",
      languages: "Sherpa · Nepali · English",
      philosophy: "The mountain decides the day. We only decide whether we are ready to listen."
    },
    {
      name: "[Sherpa Leader 02]",
      role: "Lead Climbing Sherpa · Mahalangur Region",
      image: "https://images.unsplash.com/photo-1542800951-9613782be1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGklMjBtb3VudGFpbiUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Mahalangur, Solukhumbu",
      years: "22",
      mountains: "Everest · Makalu · Cho Oyu",
      expertise: "Fixed-line technical leadership · High-camp logistics",
      languages: "Sherpa · Nepali · English",
      philosophy: "A summit is the easiest part of an expedition to talk about, and the smallest part of why we climb."
    },
    {
      name: "[Sherpa Leader 03]",
      role: "Sirdar · Manaslu Region",
      image: "https://images.unsplash.com/photo-1763479168262-509a40bd0479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBtYW4lMjBuZXBhbGklMjB0cmFkaXRpb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Gorkha, Manaslu Conservation Area",
      years: "24",
      mountains: "Manaslu · Annapurna · Himchuli",
      expertise: "Autumn season operations · Acclimatisation pacing",
      languages: "Sherpa · Nepali · English",
      philosophy: "You earn altitude slowly. Anyone who tells you otherwise has not been to one yet."
    },
    {
      name: "[Sherpa Leader 04]",
      role: "Senior Climbing Sherpa · Dhaulagiri Region",
      image: "https://images.unsplash.com/photo-1545918204-393c233d5a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjBjbGltYmluZyUyMG1vdW50YWluJTIwZ2VhcnxlbnwxfHx8fDE3Nzc0NTk5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Dhaulagiri, Myagdi",
      years: "19",
      mountains: "Dhaulagiri · Manaslu · Makalu",
      expertise: "Remote-mountain logistics · Solitude expedition leadership",
      languages: "Sherpa · Nepali · English",
      philosophy: "The mountains that are quietest are not the easiest. They simply ask different questions."
    },
    {
      name: "[Sherpa Leader 05]",
      role: "Lead Climbing Sherpa · Everest South Col Specialist",
      image: "https://images.unsplash.com/photo-1613713569254-7fee3cbb1afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iZXIlMjByZXN0aW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc3NDU5OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Khumbu, Solukhumbu",
      years: "17",
      mountains: "Everest · Lhotse · Cho Oyu",
      expertise: "South Col route · Oxygen-system leadership · Summit-day pacing",
      languages: "Sherpa · Nepali · English",
      philosophy: "The summit window is read in hours, not days. Patience is the most undervalued piece of equipment we carry."
    },
    {
      name: "[Sherpa Leader 06]",
      role: "Sirdar · Annapurna · Himchuli Region",
      image: "https://images.unsplash.com/photo-1658288098101-84f074c292a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBzaGVycGElMjBwb3J0cmFpdCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzc3NDU5OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      region: "Annapurna Conservation Area",
      years: "21",
      mountains: "Himchuli · Annapurna · Manaslu",
      expertise: "Quieter-objective expeditions · Cultural and base-camp leadership",
      languages: "Sherpa · Nepali · English",
      philosophy: "There are mountains that ask to be summited, and mountains that ask to be visited. Both are worth the journey."
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] text-white py-24 md:py-40 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 opacity-[0.03] pointer-events-none",
        style: {
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto px-8 flex flex-col gap-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 border-b border-white/10 pb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block", children: "03 — SHERPA LEADERSHIP" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-5xl md:text-[72px] leading-tight text-white max-w-[22ch]", children: "Read by the people who lead it." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] text-[#C8CDD2] max-w-[60ch] mt-4", children: '"Senior Sherpas whose judgement has been earned, season by season, across the 8,000m peaks of Nepal."' })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-24 md:gap-40", children: sherpaProfiles.map((profile, idx) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-5 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/5] bg-gray-800 overflow-hidden grayscale-[0.6] sepia-[0.2] contrast-[0.95]", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: profile.image,
              alt: `Sherpa Leader ${idx + 1}`,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: [
              "REGION · ",
              profile.region
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: [
              "YEARS · ",
              profile.years
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-7 flex flex-col pt-4 md:pt-12", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mb-8", children: [
            "SHERPA LEADERSHIP / 0",
            idx + 1
          ] }),
          /* @__PURE__ */ jsxs("h3", { className: "font-['Cormorant_Garamond'] font-light text-5xl md:text-[56px] leading-tight text-white mb-4", children: [
            profile.name,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[14px] text-[#5A6673] tracking-widest uppercase font-['JetBrains_Mono'] ml-4 inline-block align-middle border border-[#5A6673] px-2 py-1", children: "PLACEHOLDER NAME" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] mb-16 text-[#b2b2b2]", children: profile.role }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white mb-16", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 py-6 md:pr-8 border-t md:border-b-0 border-b border-white/20 md:border-r", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#5A6673]", children: "EXPERIENCE" }),
              /* @__PURE__ */ jsxs("span", { children: [
                profile.years,
                " YEARS"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 py-6 md:pl-8 md:border-t md:border-b-0 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#5A6673]", children: "MOUNTAINS SUPPORTED" }),
              /* @__PURE__ */ jsx("span", { className: "leading-relaxed", children: profile.mountains })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 py-6 md:pr-8 border-y md:border-r border-white/20", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#5A6673]", children: "EXPERTISE" }),
              /* @__PURE__ */ jsx("span", { className: "leading-relaxed", children: profile.expertise })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 py-6 md:pl-8 border-b md:border-t md:border-b border-white/20", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#5A6673]", children: "LANGUAGES" }),
              /* @__PURE__ */ jsx("span", { className: "leading-relaxed", children: profile.languages })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 pt-8 border-t border-white/20 md:border-t-0", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "THE READING" }),
            /* @__PURE__ */ jsxs("p", { className: "font-['Cormorant_Garamond'] italic text-[22px] text-[#C8CDD2] max-w-[40ch] leading-relaxed", children: [
              '"',
              profile.philosophy,
              '"'
            ] })
          ] })
        ] })
      ] }, idx)) })
    ] })
  ] });
}
function TeamField() {
  const fieldTeam = [
    {
      role: "CLIMBING SHERPA",
      name: "[Placeholder Name]",
      region: "Khumbu",
      years: "14",
      mountains: "11",
      philosophy: "A camp runs on rhythm, not hurry.",
      image: "https://images.unsplash.com/photo-1545918204-393c233d5a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjBjbGltYmluZyUyMG1vdW50YWluJTIwZ2VhcnxlbnwxfHx8fDE3Nzc0NTk5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "BASE CAMP MANAGER",
      name: "[Placeholder Name]",
      region: "Khumbu",
      years: "20",
      mountains: "8",
      philosophy: "Logistics is invisible when it is done well.",
      image: "https://images.unsplash.com/photo-1576078377230-683fde25f876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjBiYXNlJTIwY2FtcCUyMHRlbnR8ZW58MXx8fHwxNzc3NDU5OTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "KITCHEN TEAM",
      name: "[Placeholder Name]",
      region: "Solukhumbu",
      years: "22",
      mountains: "18",
      philosophy: "The food on a long expedition is half of the route.",
      image: "https://images.unsplash.com/photo-1763479168468-239bebd823cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGVzZSUyMGNvb2slMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3Nzc0NTk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "CLIMBING SHERPA",
      name: "[Placeholder Name]",
      region: "Mahalangur",
      years: "18",
      mountains: "14",
      philosophy: "We climb with the mountain, not against it.",
      image: "https://images.unsplash.com/photo-1752732673663-e1da5e4677db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBndWlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "LOGISTICS COORDINATOR",
      name: "[Placeholder Name]",
      region: "Kathmandu",
      years: "15",
      mountains: "0",
      philosophy: "A summit begins in the warehouse.",
      image: "https://images.unsplash.com/photo-1622694610506-99fb955aad24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRobWFuZHUlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Nzc0NTk5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "SUPPORT TEAM",
      name: "[Placeholder Name]",
      region: "Solukhumbu",
      years: "10",
      mountains: "5",
      philosophy: "You carry less when the team carries together.",
      image: "https://images.unsplash.com/photo-1554629197-a4a7be97e3ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGVzZSUyMHBvcnRyYWl0JTIwbW91bnRhaW58ZW58MXx8fHwxNzc3NDU5OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "CLIMBING SHERPA",
      name: "[Placeholder Name]",
      region: "Manaslu",
      years: "8",
      mountains: "6",
      philosophy: "Silence at high camps means everyone knows their job.",
      image: "https://images.unsplash.com/photo-1542800951-9613782be1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGklMjBtb3VudGFpbiUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "KITCHEN TEAM",
      name: "[Placeholder Name]",
      region: "Kathmandu",
      years: "10",
      mountains: "12",
      philosophy: "Warm tea is the first medicine of the morning.",
      image: "https://images.unsplash.com/photo-1763479168468-239bebd823cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGVzZSUyMGNvb2slMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3Nzc0NTk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "BASE CAMP MANAGER",
      name: "[Placeholder Name]",
      region: "Manaslu",
      years: "12",
      mountains: "9",
      philosophy: "A quiet camp is a well-run camp.",
      image: "https://images.unsplash.com/photo-1576078377230-683fde25f876?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjBiYXNlJTIwY2FtcCUyMHRlbnR8ZW58MXx8fHwxNzc3NDU5OTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "CLIMBING SHERPA",
      name: "[Placeholder Name]",
      region: "Dhaulagiri",
      years: "16",
      mountains: "12",
      philosophy: "The fixed line is only as strong as the one who sets it.",
      image: "https://images.unsplash.com/photo-1613713569254-7fee3cbb1afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iZXIlMjByZXN0aW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc3NDU5OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "SUPPORT TEAM",
      name: "[Placeholder Name]",
      region: "Khumbu",
      years: "7",
      mountains: "4",
      philosophy: "Speed comes from knowing the path, not from rushing.",
      image: "https://images.unsplash.com/photo-1554629197-a4a7be97e3ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGVzZSUyMHBvcnRlciUyMG1vdW50YWlufGVufDF8fHx8MTc3NzQ1OTk5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "LOGISTICS COORDINATOR",
      name: "[Placeholder Name]",
      region: "Kathmandu",
      years: "9",
      mountains: "0",
      philosophy: "Anticipate the weather, don't just react to it.",
      image: "https://images.unsplash.com/photo-1622694610506-99fb955aad24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRobWFuZHUlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Nzc0NTk5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-40 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col gap-16 md:gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block", children: "04 — THE FIELD TEAM" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-[#1A1A1A] max-w-[22ch]", children: "The wider team that holds the season." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[20px] text-[#5A6673] max-w-[56ch] mt-4", children: "*Climbing Sherpas, base camp managers, kitchen team, logistics coordinators, and support staff — multi-generational, Nepal-based, and trained over years rather than seasons.*" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16", children: fieldTeam.map((member, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full aspect-square bg-gray-200 overflow-hidden grayscale-[0.6] sepia-[0.2]", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: member.image,
          alt: member.role,
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: member.role }),
        /* @__PURE__ */ jsxs("h3", { className: "font-['Cormorant_Garamond'] text-[22px] text-[#1A1A1A] mb-6 flex items-center gap-3", children: [
          member.name,
          /* @__PURE__ */ jsx("span", { className: "text-[9px] text-[#5A6673] tracking-widest uppercase font-['JetBrains_Mono'] border border-[#5A6673]/30 px-1.5 py-[2px] inline-block", children: "PLACEHOLDER" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-y border-[#1A1A1A]/10 divide-y divide-[#1A1A1A]/10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: [
          /* @__PURE__ */ jsxs("div", { className: "py-3", children: [
            "REGION · ",
            member.region
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-3", children: [
            "YEARS · ",
            member.years,
            " ",
            /* @__PURE__ */ jsx("span", { className: "mx-2 font-light", children: "·" }),
            " MOUNTAINS · ",
            member.mountains
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[28ch] mt-6", children: [
          '"',
          member.philosophy,
          '"'
        ] })
      ] })
    ] }, idx)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 border-t border-[#1A1A1A]/10 pt-8", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[60ch]", children: "Note · This grid shows a representative sample of our field team. The full team for your expedition is selected and named in your private proposal." }) })
  ] }) });
}
function TeamLeadership() {
  const leadershipTeam = [
    {
      role: "CHAIRMAN",
      name: "[Placeholder Name]",
      desc: "The principal of the house.",
      based: "Kathmandu",
      years: "35+",
      expertise: "Stewardship, lineage, philosophy",
      languages: "Nepali · English · Sherpa",
      philosophy: "We do not conquer the mountain. We learn from it.",
      image: "https://images.unsplash.com/photo-1610862784762-330117108fec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGRlciUyMG5lcGFsaSUyMHNoZXJwYSUyMG1hbiUyMHBvcnRyYWl0JTIwdmludGFnZXxlbnwxfHx8fDE3Nzc0NTY2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "MANAGING DIRECTOR",
      name: "[Placeholder Name]",
      desc: "The day-to-day stewardship of the house.",
      based: "Kathmandu",
      years: "18",
      expertise: "Operations, partnerships, group strategy",
      languages: "Nepali · English · Hindi",
      philosophy: "The house is here to outlast us. That changes how we run it.",
      image: "https://images.unsplash.com/photo-1708364171715-16eaf0b2d8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGVzZSUyMGJ1c2luZXNzbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc3NDYwMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "EXPEDITION DIRECTOR",
      name: "[Placeholder Name]",
      desc: "The link between Kathmandu and the field.",
      based: "Kathmandu / On Expedition",
      years: "22",
      expertise: "Expedition design, Sherpa leadership coordination",
      languages: "Nepali · English · Sherpa",
      philosophy: "Every expedition is a conversation between the desk and the mountain.",
      image: "https://images.unsplash.com/photo-1622694610506-99fb955aad24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRobWFuZHUlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Nzc0NTk5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "HEAD OF OPERATIONS",
      name: "[Placeholder Name]",
      desc: "Logistics, permits, and field continuity.",
      based: "Kathmandu",
      years: "15",
      expertise: "Permitting, transport, supplier networks",
      languages: "Nepali · English",
      philosophy: "Operations is invisible when it is done well — and that is the point.",
      image: "https://images.unsplash.com/photo-1542800951-9613782be1fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbGklMjBtb3VudGFpbiUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "SAFETY & MEDICAL ADVISOR",
      name: "[Placeholder Name]",
      desc: "Medical planning and safety standards.",
      based: "Kathmandu / Base Camp",
      years: "14",
      expertise: "High-altitude medicine, evacuation protocols",
      languages: "English · Nepali",
      philosophy: "Safety is not a feature. It is the floor we build the expedition on.",
      image: "https://images.unsplash.com/photo-1763479168262-509a40bd0479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBtYW4lMjBuZXBhbGklMjB0cmFkaXRpb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      role: "CLIENT EXPERIENCE LEAD",
      name: "[Placeholder Name]",
      desc: "The first private conversation, and the last.",
      based: "Kathmandu",
      years: "11",
      expertise: "Private enquiries, expedition desk",
      languages: "English · Nepali · French",
      philosophy: "Every expedition begins and ends with a quiet conversation.",
      image: "https://images.unsplash.com/photo-1752732673663-e1da5e4677db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBndWlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NzQ1OTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white text-[#1A1A1A] py-24 md:py-40 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col gap-16 md:gap-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block", children: "05 — LEADERSHIP" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-[#1A1A1A] max-w-[22ch]", children: "The house behind the field." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24", children: leadershipTeam.map((member, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/5] bg-gray-200 overflow-hidden grayscale-[0.6] sepia-[0.1] contrast-[0.95]", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: member.image,
          alt: member.role,
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: member.role }),
          /* @__PURE__ */ jsxs("h3", { className: "font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A] mb-2 flex items-center gap-3", children: [
            member.name,
            /* @__PURE__ */ jsx("span", { className: "text-[9px] text-[#5A6673] tracking-widest uppercase font-['JetBrains_Mono'] border border-[#5A6673]/30 px-1.5 py-[2px] inline-block", children: "PLACEHOLDER" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[18px] text-[#5A6673]", children: member.desc })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-y border-[#1A1A1A]/10 divide-y divide-[#1A1A1A]/10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-2 mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
            "BASED IN · ",
            member.based
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
            "YEARS WITH HOUSE · ",
            member.years
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
            "EXPERTISE · ",
            member.expertise
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
            "LANGUAGES · ",
            member.languages
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[32ch] mt-2", children: [
          '"',
          member.philosophy,
          '"'
        ] })
      ] })
    ] }, idx)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 border-t border-[#1A1A1A]/10 pt-8", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[60ch]", children: "Note · Profile names are placeholders. The full leadership names and biographies will be set by Thamserku at content stage." }) })
  ] }) });
}
function TeamClosing() {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#0A3A77] text-white py-32 md:py-48 px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col items-center text-center gap-12 md:gap-16", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block", children: "06 — BEGIN PRIVATELY" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8 w-full max-w-[800px]", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-5xl md:text-[60px] lg:text-[80px] leading-[1.05] text-white tracking-tight", children: "Schedule a consultation. Meet the team that will guide your journey." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Inter'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mx-auto mt-4", children: "Every Thamserku expedition begins with a private conversation. We will introduce the team — the leadership, the sirdar, and the climbing Sherpas — who will walk with you through the season." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 w-full items-center mt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full md:w-auto", children: [
        /* @__PURE__ */ jsx(Link, { to: "/consultation", className: "border border-white text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#0A3A77] transition-colors w-full md:w-auto text-center", children: "Schedule a Consultation →" }),
        /* @__PURE__ */ jsx(Link, { to: "/consultation", className: "border border-white/20 text-[#C8CDD2] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors w-full md:w-auto text-center", children: "Speak with the Expedition Desk →" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mt-4 opacity-60", children: "RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF" })
    ] })
  ] }) });
}
const TeamPage = UNSAFE_withComponentProps(function TeamPage2() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "w-full min-h-screen bg-[#1A1A1A] text-white",
    children: [/* @__PURE__ */ jsx(TeamHero, {}), /* @__PURE__ */ jsx(TeamManifesto, {}), /* @__PURE__ */ jsx(TeamSherpaLeadership, {}), /* @__PURE__ */ jsx(TeamField, {}), /* @__PURE__ */ jsx(TeamLeadership, {}), /* @__PURE__ */ jsx(TeamClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TeamPage
}, Symbol.toStringTag, { value: "Module" }));
const heroBgImage = "/assets/Deboche_Trail_View_(22)-YjjbiAm0.jpg";
const EnquiryHero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen bg-[#1A1A1A] flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx(
        ImageWithFallback,
        {
          src: heroBgImage,
          alt: "Deboche Trail View",
          className: "w-full h-full object-cover opacity-30 mix-blend-overlay saturate-[0.8] contrast-110"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" })
    ] }),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-32 md:mt-48 flex-grow pb-32", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-6", children: "THE EXPEDITION DESK — SCHEDULE A CONSULTATION" }),
      /* @__PURE__ */ jsx("h1", { className: "font-['Cormorant_Garamond'] font-light text-5xl md:text-[72px] lg:text-[104px] leading-[1.05] mb-8 max-w-[22ch] text-white tracking-tight", children: "Every Thamserku journey begins with a private conversation." }),
      /* @__PURE__ */ jsx("p", { className: "text-[#C8CDD2] font-light text-base md:text-[17px] leading-relaxed max-w-[60ch]", children: "Choose a time on our calendar, or write to us in your own words. A senior advisor will respond personally — quietly, and within 48 hours." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-20 w-full border-t border-[#2E353C] mt-auto", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1440px] mx-auto px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#2E353C]", children: [
      /* @__PURE__ */ jsxs("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] md:pr-6 py-2 md:py-0", children: [
        "RESPONSE ",
        /* @__PURE__ */ jsx("span", { className: "mx-2 text-[#5A6673]", children: "·" }),
        " WITHIN 48 HOURS"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] md:px-6 py-2 md:py-0", children: [
        "HANDLED BY ",
        /* @__PURE__ */ jsx("span", { className: "mx-2 text-[#5A6673]", children: "·" }),
        " SENIOR EXPEDITION STAFF"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] md:px-6 py-2 md:py-0", children: [
        "LANGUAGES ",
        /* @__PURE__ */ jsx("span", { className: "mx-2 text-[#5A6673]", children: "·" }),
        " ENGLISH ",
        /* @__PURE__ */ jsx("span", { className: "mx-2 text-[#5A6673]", children: "·" }),
        " NEPALI"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] md:pl-6 py-2 md:py-0", children: [
        "CONFIDENTIALITY ",
        /* @__PURE__ */ jsx("span", { className: "mx-2 text-[#5A6673]", children: "·" }),
        " ASSURED"
      ] })
    ] }) }) })
  ] });
};
const EnquiryInvitation = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-24 md:py-48", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1440px] mx-auto px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "md:col-span-4 lg:col-span-3", children: /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "02 — THE INVITATION" }) }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-8 lg:col-span-7", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[40px] lg:text-[48px] leading-[1.2] mb-12 max-w-[32ch] text-[#1A1A1A]", children: [
        "Every Thamserku journey begins with a private conversation. ",
        /* @__PURE__ */ jsx("span", { className: "italic text-[#0A3A77]", children: "Not a booking page." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#5A6673] text-base md:text-[16px] leading-relaxed max-w-[60ch] font-light", children: "The form below is short by design. We would rather understand a few things well — your background, the mountain you have in mind, and the rhythm you are hoping to climb in — than collect details we do not yet need. Anything missing, we will ask in a follow-up letter." })
    ] })
  ] }) }) });
};
const TrustStatement = () => {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#1A1A1A] py-[100px] md:py-[120px] px-8 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[880px] flex flex-col items-center text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "HANDLED PERSONALLY — BY THE SENIOR EXPEDITION TEAM" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[40px] md:text-[52px] text-white leading-[1.15] max-w-[28ch] mb-6", children: '"Every consultation is read, written, and shaped by senior expedition staff. Nothing is automated."' }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] text-[#C8CDD2] text-[16px] leading-[1.65] max-w-[60ch]", children: "A senior advisor in Kathmandu reviews every consultation personally, usually within 48 hours. Your conversation is private from first letter to descent — no shared inboxes, no junior gatekeepers." })
  ] }) });
};
const ScheduleCalendar = () => {
  return /* @__PURE__ */ jsx("section", { id: "calendar", className: "w-full bg-[#F4F2EC] py-[140px] md:py-[180px] px-8 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1080px] flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-16 md:mb-24", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "SELECT A CONSULTATION TIME — PATH I" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[56px] md:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[22ch] mb-6", children: '"Choose a time. We will write back personally."' }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[56ch]", children: "Consultations run 45 minutes. By video, by phone, or by WhatsApp." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[880px] flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between items-center border-b border-[#5A6673]/30 pb-4 mb-8", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A]", children: "MAY 2026" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors", children: "← PREV" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors", children: "NEXT →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-2 md:gap-4 mb-4", children: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => /* @__PURE__ */ jsxs("div", { className: "text-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: [
          day,
          " ",
          /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "·" })
        ] }, day)) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-y-6 md:gap-y-8 gap-x-2 md:gap-x-4 text-center", children: Array.from({ length: 35 }).map((_, i) => {
          const dateNum = i - 3 > 0 && i - 3 <= 31 ? i - 3 : null;
          const isAvailable = [7, 8, 12, 13, 14, 19, 21, 25].includes(dateNum);
          const isLimited = [15, 28, 29].includes(dateNum);
          const isSelected = dateNum === 14;
          if (!dateNum) {
            return /* @__PURE__ */ jsx("div", { className: "h-16" }, i);
          }
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center h-16", children: [
            /* @__PURE__ */ jsx("span", { className: `font-['Radley'] text-[20px] ${isAvailable || isLimited ? "text-[#1A1A1A]" : "text-[#5A6673]/50"}`, children: dateNum }),
            isAvailable && !isLimited && /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#5A6673] mt-2", children: "OPEN" }),
            isLimited && /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#0A3A77] mt-2", children: "LIMITED" }),
            isSelected && /* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-[#1A1A1A] rounded-full mt-2" })
          ] }, i);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center border-t border-[#5A6673]/30 pt-10 mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 mb-6", children: ["09:00 KTM", "11:00 KTM", "13:00 KTM", "15:00 KTM", "17:00 KTM", "19:00 KTM"].map((time) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "px-4 py-2 border border-[#5A6673]/30 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors bg-transparent",
            children: time
          },
          time
        )) }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "TIMES SHOWN IN NEPAL STANDARD TIME (NPT). CONFIRMATION IN YOUR LOCAL TIME ZONE." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] text-[#5A6673] text-[15px] leading-[1.65] max-w-[56ch] mb-8", children: "Once you select a time, we will send you a confirmation and the conversation begins. The senior advisor who responds will be your single point of contact through your expedition." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-[#0A3A77] border border-[#0A3A77] px-8 py-4 hover:bg-[#0A3A77] hover:text-white transition-colors mb-6",
            children: "CONFIRM CONSULTATION TIME →"
          }
        ),
        /* @__PURE__ */ jsx("a", { href: "#letter-path", className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors border-b border-[#5A6673]/30 hover:border-[#1A1A1A] pb-1", children: "PREFER TO WRITE A LETTER INSTEAD? → SKIP TO LETTER PATH" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mt-24", children: "[CLIENT TO CONFIRM] — REAL CALENDAR AVAILABILITY AND BOOKING INTEGRATION PENDING. WIDGET SHOWN IS PLACEHOLDER ONLY." })
    ] })
  ] }) });
};
const EnquiryForm = () => {
  const [activeInterest, setActiveInterest] = useState([]);
  const [activeEdition, setActiveEdition] = useState("");
  const [trekkingExp, setTrekkingExp] = useState("");
  const [altitudeExp, setAltitudeExp] = useState([]);
  const [preferredSeason, setPreferredSeason] = useState("");
  const [privateGroup, setPrivateGroup] = useState("");
  const [privacyLevel, setPrivacyLevel] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const toggleInterest = (interest) => {
    if (activeInterest.includes(interest)) {
      setActiveInterest(activeInterest.filter((i) => i !== interest));
    } else {
      setActiveInterest([...activeInterest, interest]);
    }
  };
  const toggleAltitude = (alt) => {
    if (altitudeExp.includes(alt)) {
      setAltitudeExp(altitudeExp.filter((a) => a !== alt));
    } else {
      setAltitudeExp([...altitudeExp, alt]);
    }
  };
  return /* @__PURE__ */ jsx("section", { id: "letter-path", className: "bg-white py-24 md:py-48", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-24 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "OR WRITE TO US — PATH II" }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px] max-w-[56ch]", children: "Prefer to write to us in your own words? The letter path is below — read carefully by the senior expedition desk." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: "03 — THE REQUEST" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-[1.1] mb-6 text-[#1A1A1A] max-w-[22ch]", children: "A short, considered letter to our expedition desk." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[20px] max-w-[56ch]", children: "Six chapters. Fewer questions, asked carefully." }),
      /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full bg-[#E5E7EB] mt-12" })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "space-y-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "CHAPTER A" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]", children: "Who you are." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
              "A.1 — FULL NAME ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "How would you like us to address you?",
                className: "w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
              "A.2 — EMAIL ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "name@domain.com",
                className: "w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "A.3 — PHONE / WHATSAPP" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                placeholder: "Your number with country code",
                className: "w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mt-3", children: "OPTIONAL · USED ONLY IF YOU PREFER VOICE OR WHATSAPP CONTACT." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col relative", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
              "A.4 — COUNTRY OF RESIDENCE ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative border-b border-[#5A6673] pb-3 cursor-pointer group", children: [
              /* @__PURE__ */ jsxs("select", { defaultValue: "", className: "w-full bg-transparent text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl appearance-none focus:outline-none cursor-pointer group-hover:text-[#0A3A77] transition-colors text-[#5A6673]/50", children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select country" }),
                /* @__PURE__ */ jsx("option", { value: "us", className: "not-italic font-sans text-base", children: "United States" }),
                /* @__PURE__ */ jsx("option", { value: "uk", className: "not-italic font-sans text-base", children: "United Kingdom" }),
                /* @__PURE__ */ jsx("option", { value: "other", className: "not-italic font-sans text-base", children: "Other" })
              ] }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-0 top-1 w-5 h-5 text-[#5A6673] group-hover:text-[#0A3A77] pointer-events-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
              "A.5 — PREFERRED METHOD OF CONTACT ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["EMAIL", "PHONE", "WHATSAPP"].map((method) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setContactMethod(method),
                className: `px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${contactMethod === method ? "bg-[#0A3A77] text-white border-[#0A3A77]" : "bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]"}`,
                children: method
              },
              method
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "CHAPTER B" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]", children: "The mountain you have in mind." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: [
              "B.1 — EXPEDITION INTEREST ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["EVEREST", "MANASLU", "DHAULAGIRI", "MAKALU", "HIMCHULI", "OTHER · NOT SURE"].map((interest) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleInterest(interest),
                className: `px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${activeInterest.includes(interest) ? "bg-[#0A3A77] text-white border-[#0A3A77]" : "bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]"}`,
                children: interest
              },
              interest
            )) }),
            /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mt-4", children: "SELECT ONE OR MORE. IF UNSURE, LEAVE THE FINAL OPTION CHECKED." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: 'B.2 — IF "OTHER · NOT SURE", A FEW WORDS ON WHAT YOU ARE LOOKING FOR' }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "e.g. a first 8,000m peak, a quieter Himalayan objective, a non-summit Himalayan journey...",
                className: "w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "CHAPTER C" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]", children: "The edition you have in mind." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: [
            "C.1 — PREFERRED EDITION ",
            /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["A — ALPINE", "B — BESPOKE", "C — CRAFTED", "D — DEFINITIVE", "E — EXPLORER", "NOT SURE YET"].map((edition) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveEdition(edition),
              className: `px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${activeEdition === edition ? "bg-[#0A3A77] text-white border-[#0A3A77]" : "bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]"}`,
              children: edition
            },
            edition
          )) }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[15px] mt-4 max-w-[52ch]", children: "If you are unsure, leave it open. Editions are best chosen in conversation with our desk." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "CHAPTER D" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A] mb-4", children: "Your background in altitude." }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[56ch]", children: "We ask this carefully — not to filter you, but to recommend the right edition and the right rhythm of preparation." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: [
              "D.1 — TREKKING EXPERIENCE ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["LIMITED", "INTERMEDIATE", "EXTENSIVE"].map((level) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setTrekkingExp(level),
                className: `px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${trekkingExp === level ? "bg-[#0A3A77] text-white border-[#0A3A77]" : "bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]"}`,
                children: level
              },
              level
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: "D.2 — ALTITUDE EXPERIENCE" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["BELOW 4,000 M", "4,000 — 6,000 M", "6,000 — 7,000 M", "7,000 — 8,000 M", "ABOVE 8,000 M"].map((alt) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleAltitude(alt),
                className: `px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${altitudeExp.includes(alt) ? "bg-[#0A3A77] text-white border-[#0A3A77]" : "bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]"}`,
                children: alt
              },
              alt
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
              "D.3 — FITNESS & TRAINING BACKGROUND ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 4,
                placeholder: "A short paragraph about your training rhythm — running, hiking, strength, altitude exposure, anything relevant.",
                className: "w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50 resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "D.4 — UPLOAD CLIMBING CV OR PRIOR EXPEDITION DETAILS" }),
            /* @__PURE__ */ jsxs("div", { className: "w-full border border-[#C8CDD2] hover:border-[#1A1A1A] transition-colors p-8 flex flex-col items-center justify-center cursor-pointer group", children: [
              /* @__PURE__ */ jsx(Upload, { className: "w-5 h-5 text-[#5A6673] group-hover:text-[#1A1A1A] mb-4 transition-colors" }),
              /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] mb-2", children: "OPTIONAL · PDF · DOC · IMAGES · MAX 10 MB" }),
              /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[48ch]", children: "If you have a climbing CV, prior expedition reports, or photographs, attach them here. They help our desk write a more accurate first response." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "CHAPTER E" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]", children: "Travel preferences." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: "E.1 — PREFERRED SEASON" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["SPRING", "AUTUMN", "OPEN"].map((season) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setPreferredSeason(season),
                className: `px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${preferredSeason === season ? "bg-[#0A3A77] text-white border-[#0A3A77]" : "bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]"}`,
                children: season
              },
              season
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
              "E.2 — NUMBER OF GUESTS ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                min: "1",
                max: "10",
                placeholder: "1",
                className: "w-full max-w-[120px] bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: [
              "E.3 — PRIVATE OR GROUP PREFERENCE ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["PRIVATE", "SMALL GROUP", "OPEN"].map((pref) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setPrivateGroup(pref),
                className: `px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${privateGroup === pref ? "bg-[#0A3A77] text-white border-[#0A3A77]" : "bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]"}`,
                children: pref
              },
              pref
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: "E.4 — PRIVACY LEVEL" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: ["STANDARD", "HIGH", "MAXIMUM"].map((level) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setPrivacyLevel(level),
                className: `px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${privacyLevel === level ? "bg-[#0A3A77] text-white border-[#0A3A77]" : "bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]"}`,
                children: level
              },
              level
            )) }),
            /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[15px] mt-4", children: "Optional. If you require maximum discretion, please indicate it here." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
              "E.5 — MEDICAL CONSIDERATIONS ",
              /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" }),
              " OPTIONAL"
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                placeholder: "Any medical history, medications, or considerations our team should be aware of when planning.",
                className: "w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50 resize-none"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mt-3", children: "HANDLED CONFIDENTIALLY · BY OUR SAFETY & MEDICAL ADVISOR ONLY." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "CHAPTER F" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]", children: "Anything you would like us to know." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("label", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
            "F.1 — A MESSAGE TO THE DESK ",
            /* @__PURE__ */ jsx("span", { className: "ml-1", children: "·" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 6,
              placeholder: "Write to us in your own words — your timing, your intention, anything that matters to you about this journey.",
              className: "w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50 resize-none"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-16 border-t border-[#E5E7EB] mt-32", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-8", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: [
          "BY SUBMITTING, YOU AGREE TO OUR PRIVACY TERMS ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " WE WILL NEVER SHARE YOUR DETAILS."
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] border border-[#0A3A77] px-8 py-4 hover:bg-[#0A3A77] hover:text-white transition-colors",
            children: "SEND THE LETTER →"
          }
        )
      ] }) })
    ] })
  ] }) });
};
const WhatTheCallCovers = () => {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1180px] flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-24", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "WHAT THE CONVERSATION COVERS" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[56px] md:text-[72px] text-white leading-[1.1] max-w-[22ch] mb-6", children: '"Forty-five minutes, read carefully."' }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[56ch]", children: "Every consultation is shaped to your background, your timing, and your intention." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "MOMENT I — UNDERSTANDING" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4", children: "We listen first." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]", children: "You share your background, your timing, and what brings you to a Himalayan expedition. The advisor listens before recommending anything." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "MOMENT II — THE MOUNTAIN" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4", children: "We discuss the right peak." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]", children: "Based on your readiness, we discuss which of our five mountains is the right reading for your journey — Everest, Manaslu, Dhaulagiri, Makalu, or Himchuli." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "MOMENT III — THE EDITION" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4", children: "We shape the edition." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]", children: "We walk you through how each edition (Alpine, Bespoke, Crafted, Definitive, Explorer) would shape your expedition — and recommend what fits." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: "MOMENT IV — NEXT STEPS" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4", children: "We confirm direction." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]", children: "By the end of the conversation, you have a clear sense of the mountain, edition, season, and what a tailored proposal would look like." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] max-w-[60ch] text-center", children: "Consultations are exploratory. Nothing is sold during the call. A tailored proposal follows only if direction is set." })
  ] }) });
};
const EnquiryProcess = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-[#1A1A1A] py-24 md:py-48 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1440px] mx-auto px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
        /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: "04 — WHAT HAPPENS NEXT" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[44px] lg:text-[56px] leading-[1.1] text-white max-w-[22ch]", children: "Four quiet steps, after you write to us." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8", children: /* @__PURE__ */ jsx("span", { className: "font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl", children: "01" }) }),
          /* @__PURE__ */ jsxs("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
            "STEP 01 ",
            /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
            " REVIEW"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[24px] text-white mb-4", children: "We read your letter." }),
          /* @__PURE__ */ jsx("p", { className: "text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3", children: "Your letter is reviewed by senior expedition staff at our Kathmandu desk, usually within 48 hours. Nothing is automated." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8", children: /* @__PURE__ */ jsx("span", { className: "font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl", children: "02" }) }),
          /* @__PURE__ */ jsxs("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
            "STEP 02 ",
            /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
            " ADVISOR CONTACT"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[24px] text-white mb-4", children: "An advisor writes back." }),
          /* @__PURE__ */ jsx("p", { className: "text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3", children: "A dedicated advisor responds personally — by email, phone, or WhatsApp, depending on your preference. The conversation begins." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8", children: /* @__PURE__ */ jsx("span", { className: "font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl", children: "03" }) }),
          /* @__PURE__ */ jsxs("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
            "STEP 03 ",
            /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
            " RECOMMENDATION"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[24px] text-white mb-4", children: "A mountain and an edition are recommended." }),
          /* @__PURE__ */ jsx("p", { className: "text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3", children: "Based on your background, your timing, and your intention, we recommend the mountain and edition that fit. We may ask a few more questions before recommending." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-8", children: /* @__PURE__ */ jsx("span", { className: "font-['Cormorant_Garamond'] font-light text-[#C8CDD2] text-xl", children: "04" }) }),
          /* @__PURE__ */ jsxs("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
            "STEP 04 ",
            /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
            " TAILORED PROPOSAL"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[24px] text-white mb-4", children: "A private proposal is shaped." }),
          /* @__PURE__ */ jsx("p", { className: "text-[#C8CDD2] font-light text-base leading-relaxed line-clamp-3", children: "Once the direction is set, a tailored proposal is prepared — itinerary, leadership, logistics, and pricing — written specifically for your expedition." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center pt-12 border-t border-[#2E353C]", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] max-w-[60ch] mx-auto", children: "Note · No part of this process is automated. Every step is read, written, and shaped by people." }) })
    ] })
  ] });
};
const EnquiryAlternative = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-24 md:py-48", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: "05 — IF A FORM IS NOT YOUR WAY" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Cormorant_Garamond'] font-light text-4xl md:text-[36px] lg:text-[48px] leading-[1.1] text-[#1A1A1A] max-w-[28ch]", children: "Some readers prefer to write directly. We welcome that." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12 mb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col group cursor-pointer", children: [
        /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "EXPEDITION DESK" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[24px] text-[#1A1A1A] mb-8", children: "Write directly to our desk." }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] border-b border-[#C8CDD2] pb-1 group-hover:border-[#1A1A1A] transition-colors", children: [
          "desk@thamserkuexpeditions.com ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 ml-2" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col group cursor-pointer", children: [
        /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: "BY PHONE OR WHATSAPP" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[24px] text-[#1A1A1A] mb-8", children: "Speak with a senior advisor." }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] border-b border-[#C8CDD2] pb-1 group-hover:border-[#1A1A1A] transition-colors", children: [
          "+977 [PLACEHOLDER NUMBER] ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 ml-2" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col group cursor-pointer", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
          "IN PERSON ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " KATHMANDU"
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Cormorant_Garamond'] text-[24px] text-[#1A1A1A] mb-8", children: "Visit us when you arrive in Nepal." }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] border-b border-[#C8CDD2] pb-1 group-hover:border-[#1A1A1A] transition-colors", children: [
          "BY APPOINTMENT ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " YETI GROUP ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " KATHMANDU ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 ml-2" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-12 border-t border-[#C8CDD2]/50", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[60ch]", children: "We answer in the same way, regardless of the channel — quietly, personally, and within 48 hours." }) })
  ] }) });
};
const EnquiryClosing = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#0A3A77] py-32 md:py-48 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto px-8 text-center flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12", children: "06 — A QUIET CLOSING" }),
    /* @__PURE__ */ jsxs("h2", { className: "font-['Radley'] font-light text-5xl md:text-[56px] lg:text-[80px] leading-[1.1] text-white max-w-[24ch] mb-12", children: [
      '"Speak with the expedition desk." ',
      /* @__PURE__ */ jsx("span", { className: "italic text-[#C8CDD2] block mt-4", children: "We will read your letter carefully." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-[#C8CDD2] font-light text-base md:text-[17px] leading-relaxed max-w-[56ch] mb-16", children: "Whether your journey begins this season or in three years, the conversation is the same. Quiet, considered, and handled by people who have spent decades reading the Himalayas." }),
    /* @__PURE__ */ jsxs("p", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: [
      "THAMSERKU EXPEDITIONS ",
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
      " YETI GROUP ",
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
      " KATHMANDU ",
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
      " NEPAL HIMALAYA"
    ] })
  ] }) });
};
const EnquiryPage = UNSAFE_withComponentProps(function EnquiryPage2() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-[#1A1A1A]",
    children: [/* @__PURE__ */ jsx(EnquiryHero, {}), /* @__PURE__ */ jsx(EnquiryInvitation, {}), /* @__PURE__ */ jsx(TrustStatement, {}), /* @__PURE__ */ jsx(ScheduleCalendar, {}), /* @__PURE__ */ jsx(EnquiryForm, {}), /* @__PURE__ */ jsx(WhatTheCallCovers, {}), /* @__PURE__ */ jsx(EnquiryProcess, {}), /* @__PURE__ */ jsx(EnquiryAlternative, {}), /* @__PURE__ */ jsx(EnquiryClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EnquiryPage
}, Symbol.toStringTag, { value: "Module" }));
const ArchiveHero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end pb-32 md:pb-48 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex items-center justify-center mb-16 md:mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[200px] bg-white/20 mr-6 hidden md:block" }),
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap", children: [
          "EXPEDITION ARCHIVE ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " § VI — A HISTORY WRITTEN IN ALTITUDE ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " NEPAL HIMALAYA"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[200px] bg-white/20 ml-6 hidden md:block" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-[64px] md:text-[80px] lg:text-[112px] text-white leading-[1.05] text-center max-w-[18ch] mb-8", children: "A history written in altitude." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-24", children: "A structured record of the Himalayan expeditions our house has been part of — across nearly four decades of seasons, summits, and quiet days on the mountain." }),
      /* @__PURE__ */ jsx("div", { className: "w-full border-t border-white/20", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20 border-b border-white/20", children: [
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "RECORDS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " [CLIENT TO CONFIRM]"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "EARLIEST ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " 1987 [CLIENT TO CONFIRM]"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "LATEST ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " 2024 [CLIENT TO CONFIRM]"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "VERIFIED ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " ONGOING AUDIT"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center block", children: "[CLIENT TO CONFIRM] — ARCHIVE AUDIT AND CLIENT PERMISSION REVIEW IN PROGRESS." }) })
    ] })
  ] });
};
const ArchiveIntro = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col items-start", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "THE READING — § I" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6", children: "An archive, read carefully." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]", children: "Stewardship, not celebration." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "The Thamserku archive records the expeditions our house has supported across the Nepal Himalaya since the late 1980s. Each entry is treated as a fact of continuity — not a trophy. We do not summarise our years by counting summits; we summarise them by what we learned, who we walked with, and how we returned." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "Names, photographs, and identifying details remain private by default. Records are published only when client permission has been confirmed in writing. Where permission is pending or refused, the record is preserved internally but does not appear in the public archive." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "This page is part of an ongoing audit. Records, dates, routes, and details are being verified before publication. Where verification is incomplete, you will see a [CLIENT TO CONFIRM] marker." })
    ] })
  ] }) });
};
const ArchiveFilters = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[60px] md:py-[80px] px-8 border-b border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col lg:flex-row border-y border-white/20 divide-y lg:divide-y-0 lg:divide-x divide-white/20 mb-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 px-4 py-4 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2", children: "FILTER BY PEAK" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#5A6673] pb-1 w-fit", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors", children: "ALL PEAKS" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#5A6673] text-[12px] group-hover:text-[#C8CDD2] transition-colors", children: "▾" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 px-4 py-4 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2", children: "FILTER BY YEAR" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#5A6673] pb-1 w-fit", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors", children: "ALL YEARS" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#5A6673] text-[12px] group-hover:text-[#C8CDD2] transition-colors", children: "▾" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 px-4 py-4 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2", children: "FILTER BY TYPE" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#5A6673] pb-1 w-fit", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors", children: "ALL TYPES" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#5A6673] text-[12px] group-hover:text-[#C8CDD2] transition-colors", children: "▾" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 px-4 py-4 flex flex-col justify-center relative", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2", children: "SORT BY" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#5A6673] pb-1 w-fit", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors", children: "MOST RECENT" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#5A6673] text-[12px] group-hover:text-[#C8CDD2] transition-colors", children: "▾" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center absolute right-0 -top-10", children: /* @__PURE__ */ jsx("button", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] hover:text-white transition-colors", children: "RESET FILTERS →" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full flex lg:hidden justify-end mb-8 -mt-4", children: /* @__PURE__ */ jsx("button", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] hover:text-white transition-colors", children: "RESET FILTERS →" }) }),
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center", children: "SHOWING [CLIENT TO CONFIRM] RECORDS OF [CLIENT TO CONFIRM] TOTAL — VERIFIED RECORDS ONLY." })
  ] }) });
};
const DUMMY_RECORDS = [
  {
    id: 1,
    year: "2024",
    peak: "Everest",
    route: "South Col Route",
    region: "Khumbu",
    type: "Summit Expedition",
    detail: "A spring season expedition supported by a private Definitive configuration; full Sherpa leadership across rotations and summit window.",
    edition: "D — DEFINITIVE [CLIENT TO CONFIRM]",
    relatedLabel: "EVR · 2017 RECCE",
    relatedLink: "#",
    status: "[PERMISSION REQUIRED]"
  },
  {
    id: 2,
    year: "2023",
    peak: "Manaslu",
    route: "Northeast Face",
    region: "Gorkha",
    type: "Summit Expedition",
    detail: "An autumn expedition with a small private group; conservative weather judgement informed a phased summit window.",
    edition: "B — BESPOKE [CLIENT TO CONFIRM]",
    relatedLabel: "MAN · 2015",
    relatedLink: "#",
    status: "[CLIENT TO CONFIRM]"
  },
  {
    id: 3,
    year: "2022",
    peak: "Makalu",
    route: "West Pillar",
    region: "Mahalangur",
    type: "Summit Expedition",
    detail: "A technical spring expedition for an experienced private climber; full senior Sirdar leadership.",
    edition: "D — DEFINITIVE [CLIENT TO CONFIRM]",
    relatedLabel: "MAK · 2019 RECCE",
    relatedLink: "#",
    status: "[PERMISSION REQUIRED]"
  },
  {
    id: 4,
    year: "2021",
    peak: "Dhaulagiri",
    route: "Northeast Ridge",
    region: "Myagdi",
    type: "Summit Expedition",
    detail: "A remote spring expedition emphasising solitude and disciplined logistics.",
    edition: "E — EXPLORER [CLIENT TO CONFIRM]",
    relatedLabel: "DHA · 2008 ATTEMPT",
    relatedLink: "#",
    status: "VERIFIED"
  },
  {
    id: 5,
    year: "2019",
    peak: "Everest",
    route: "South Col Route",
    region: "Khumbu",
    type: "Summit Expedition",
    detail: "A Bespoke edition spring expedition shaped around an individual climber's preparation rhythm.",
    edition: "B — BESPOKE [CLIENT TO CONFIRM]",
    relatedLabel: "EVR · 2017 RECCE",
    relatedLink: "#",
    status: "VERIFIED"
  },
  {
    id: 6,
    year: "2017",
    peak: "Everest",
    route: "Base Camp",
    region: "Khumbu",
    type: "Reconnaissance",
    detail: "A pre-season route preparation expedition by senior Sirdar team.",
    edition: "SUPPORT [CLIENT TO CONFIRM]",
    relatedLabel: "EVR · 2019",
    relatedLink: "#",
    status: "VERIFIED"
  },
  {
    id: 7,
    year: "2015",
    peak: "Manaslu",
    route: "Standard Route",
    region: "Gorkha",
    type: "Summit Expedition",
    detail: "An autumn expedition; the season for which we now consider Manaslu the autumn flagship of the house.",
    edition: "D — DEFINITIVE [CLIENT TO CONFIRM]",
    relatedLabel: "MAN · 2023",
    relatedLink: "#",
    status: "[CLIENT TO CONFIRM]"
  },
  {
    id: 8,
    year: "2008",
    peak: "Dhaulagiri",
    route: "Northeast Ridge",
    region: "Myagdi",
    type: "Attempt",
    detail: "A spring attempt halted by sustained high winds in the summit window; descent executed without incident.",
    edition: "SUPPORT [CLIENT TO CONFIRM]",
    relatedLabel: "DHA · 2021",
    relatedLink: "#",
    status: "VERIFIED"
  },
  {
    id: 9,
    year: "1998",
    peak: "Everest",
    route: "North Col Route",
    region: "Tibet",
    type: "Support Expedition",
    detail: "A support expedition for a visiting international team; logistics and Sherpa leadership provided by Thamserku.",
    edition: "SUPPORT [CLIENT TO CONFIRM]",
    relatedLabel: "EVR · 2017 RECCE",
    relatedLink: "#",
    status: "[CLIENT TO CONFIRM]"
  },
  {
    id: 10,
    year: "1988",
    peak: "Manaslu",
    route: "Northeast Face",
    region: "Gorkha",
    type: "Summit Expedition",
    detail: "One of the house's earliest 8,000m expeditions; archival record under audit.",
    edition: "HISTORIC [CLIENT TO CONFIRM]",
    relatedLabel: "MAN · 2015",
    relatedLink: "#",
    status: "[PERMISSION REQUIRED]"
  }
];
const ArchiveGrid = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[100px] md:py-[140px] px-4 md:px-8", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1440px] mx-auto flex flex-col", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col border-t border-white/20", children: DUMMY_RECORDS.map((record) => {
        const peakCode = record.peak.substring(0, 3).toUpperCase();
        return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-[80px] lg:py-[100px] border-b border-white/20 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 w-full aspect-[4/3] border border-[#5A6673] flex flex-col items-center justify-center p-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center", children: "[IMAGE PLACEHOLDER]" }),
            /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mt-2", children: [
              "ARCHIVE SCAN /",
              /* @__PURE__ */ jsx("br", {}),
              "ROUTE PHOTO"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-1 hidden md:flex", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[36px] text-[#0A3A77] leading-none", children: record.year }) }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "md:hidden mb-1", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[36px] text-[#0A3A77] leading-none", children: record.year }) }),
            /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: [
              peakCode,
              " ",
              /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
              " ",
              record.type.toUpperCase()
            ] }),
            /* @__PURE__ */ jsxs("h3", { className: "font-['Radley'] font-light text-[24px] md:text-[28px] text-white leading-tight", children: [
              record.peak,
              " — ",
              record.route
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] line-clamp-2 mt-2", children: record.detail })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: [
                "REGION — ",
                record.region.toUpperCase(),
                ", NEPAL"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: record.region })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "EDITION" }),
              /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: record.edition })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "RELATED" }),
              /* @__PURE__ */ jsxs(Link, { to: record.relatedLink, className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:text-white transition-colors", children: [
                "→ ",
                record.relatedLabel
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-1 flex md:justify-end mt-4 md:mt-0", children: /* @__PURE__ */ jsx("span", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] whitespace-nowrap md:text-right ${record.status === "VERIFIED" ? "text-[#5A6673]" : "text-[#0A3A77]"}`, children: record.status }) })
        ] }, record.id);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 md:mt-24 flex flex-col items-center gap-8", children: [
        /* @__PURE__ */ jsx("button", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] hover:text-white transition-colors text-center cursor-pointer", children: "LOAD OLDER RECORDS →" }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center max-w-[60ch]", children: "[CLIENT TO CONFIRM] — FULL ARCHIVE AUDIT PENDING. EARLIEST RECORDS UNDER REVIEW." })
      ] })
    ] })
  ] });
};
const FEATURED_RECORDS = [
  {
    year: "2021",
    peakCode: "DHA",
    peak: "Dhaulagiri",
    route: "Northeast Ridge",
    detail: "A remote spring expedition emphasising solitude and disciplined logistics. Across thirty-eight days in the field, the team worked through the considered rhythm Dhaulagiri asks of every climber — slow acclimatisation, conservative weather judgement, and a quiet summit window achieved without incident.",
    status: "VERIFIED"
  },
  {
    year: "2017",
    peakCode: "EVR",
    peak: "Everest",
    route: "Khumbu Reconnaissance",
    detail: "A pre-season route preparation expedition by the senior Sirdar team. Documentation, fixed-line scouting, and route-condition assessment ahead of the spring summit window. Recces such as this are the quiet foundation of every Thamserku Everest season.",
    status: "VERIFIED"
  },
  {
    year: "1988",
    peakCode: "MAN",
    peak: "Manaslu",
    route: "Northeast Face",
    detail: "One of the house's earliest 8,000m expeditions. Archival photographs, route fragments, and field notes are being audited; the record will be expanded once verification and permission are complete.",
    status: "[PERMISSION REQUIRED]"
  }
];
const ArchiveFeaturedRecords = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8", children: "FEATURED — § III" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6", children: "Three records, read with more time." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]", children: "Expeditions where the story is worth more than a single row." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full", children: FEATURED_RECORDS.map((record, index) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[4/5] border border-[#5A6673] flex flex-col items-center justify-center p-6 mb-8 relative", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "[IMAGE PLACEHOLDER]" }),
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center", children: [
          "FEATURED ARCHIVE — ",
          record.peakCode
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: [
          "FEATURED ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " ",
          record.peak.toUpperCase(),
          " ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " ",
          record.year
        ] }),
        /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[56px] text-[#0A3A77] leading-[1] mb-6", children: record.year }),
        /* @__PURE__ */ jsxs("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] max-w-[18ch] mb-6", children: [
          record.peak,
          " — ",
          record.route
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15.5px] text-[#5A6673] leading-[1.7] line-clamp-5 mb-8", children: record.detail }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx("button", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#0A3A77] transition-colors pb-1 border-b border-transparent hover:border-[#0A3A77]", children: "READ THE RECORD →" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-[#C8CDD2]", children: /* @__PURE__ */ jsx("span", { className: `font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] ${record.status === "VERIFIED" ? "text-[#5A6673]" : "text-[#0A3A77]"}`, children: record.status }) })
    ] }, index)) })
  ] }) });
};
const ArchiveRecordDetail = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] px-8", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1440px] mx-auto flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8", children: "RECORD DETAIL — § IV — REPRESENTATIVE TEMPLATE" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] text-center max-w-[26ch] mb-6", children: "A single record, read in full." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]", children: "Below: the structure used for every detailed archive record." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 w-full aspect-[4/5] border border-white/20 flex flex-col items-center justify-center p-8", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4", children: "[IMAGE PLACEHOLDER]" }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-2", children: "RECORD DETAIL IMAGE — DHAULAGIRI 2021" }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center opacity-60", children: "[PERMISSION REQUIRED]" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 flex flex-col pt-4", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: [
            "EXPEDITION RECORD ",
            /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
            " DHA ",
            /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
            " 2021"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[56px] md:text-[72px] text-white leading-[1.05] max-w-[14ch] mb-6", children: "2021 — Dhaulagiri" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[30ch] mb-12 md:mb-16", children: "Northeast Ridge — a quiet spring expedition." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-white/20", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "YEAR" }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "2021" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "PEAK" }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "Dhaulagiri (8,167 m)" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "ROUTE / REGION" }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "Northeast Ridge, Myagdi, Nepal" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "EXPEDITION TYPE" }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-2 flex flex-wrap gap-2", children: /* @__PURE__ */ jsxs("span", { className: "font-['Radley'] text-[16px] text-white", children: [
                "Summit Expedition ",
                /* @__PURE__ */ jsx("span", { className: "mx-1 font-['JetBrains_Mono'] text-[#5A6673] text-[10px]", children: "·" }),
                " Definitive Edition"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "NOTABLE DETAIL" }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxs("span", { className: "font-['Radley'] text-[16px] text-white leading-[1.6]", children: [
                "A remote spring expedition emphasising solitude and disciplined logistics. The team achieved the summit window without incident across thirty-eight field days. ",
                /* @__PURE__ */ jsx("span", { className: "opacity-60", children: "[CLIENT TO CONFIRM]" }),
                " for the principal's tailored narrative excerpt."
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "SOURCE" }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "Internal expedition log — verified" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "PERMISSION STATUS" }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-[#C8CDD2]", children: "VERIFIED (status published)" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-1 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: "RELATED EXPEDITION" }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx(Link, { to: "#", className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:text-white transition-colors", children: "→ DHA · 2018 Reconnaissance" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-24 md:mt-32 w-full flex justify-center", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] text-center max-w-[60ch]", children: "Every published record follows this structure. Records without verified permission remain in the internal archive and are not displayed here." }) })
    ] })
  ] });
};
const ArchiveVerification = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[120px] md:py-[160px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start md:items-center w-full max-w-[1180px] mb-20 md:mb-24", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6", children: "VERIFICATION & PERMISSION — § V" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[44px] md:text-[56px] text-[#1A1A1A] leading-[1.1] max-w-[22ch] md:text-center", children: "How this archive is verified." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-[#C8CDD2] border-t border-[#C8CDD2] pt-12 md:pt-16 mb-20 md:mb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:pr-12 lg:pr-16", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6 md:mb-8 min-h-[28px]", children: [
          "VERIFICATION ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " Records are audited."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] line-clamp-4", children: "Every record is reviewed against internal expedition logs, field notes, and seasonal documentation before publication. Where dates, routes, or details are uncertain, the record is marked [CLIENT TO CONFIRM] until verification is complete." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:px-12 lg:px-16 pt-8 md:pt-0 border-t md:border-t-0 border-[#C8CDD2]", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6 md:mb-8 min-h-[28px]", children: [
          "PERMISSION ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " Privacy by default."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] line-clamp-4", children: "Client names, photographs, and identifying details are not published without written permission. Records marked [PERMISSION REQUIRED] exist internally but are not visible in this public archive. Many of our expeditions remain entirely private." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:pl-12 lg:pl-16 pt-8 md:pt-0 border-t md:border-t-0 border-[#C8CDD2]", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6 md:mb-8 min-h-[28px]", children: [
          "ATTRIBUTION ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " Quietly noted, never claimed."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] line-clamp-4", children: "Where credit belongs to a Sherpa team, a partner, or a visiting expedition, the record names them. The Thamserku archive credits the people who climbed, not the company that supported them." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center pt-8 border-t border-[#C8CDD2] md:border-none md:pt-0", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[60ch]", children: "Inviting a record to be published — or asking for one to remain private — can be done at any time. Write to the expedition desk." }) })
  ] }) });
};
const ArchiveClosing = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[160px] md:py-[200px] px-8 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10", children: "CONTINUE READING — § VI" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.05] text-center max-w-[24ch] mb-8", children: "Read the mountains the house climbs today." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[56ch] mb-16", children: "The archive records where we have been. The Expedition Atlas describes where we climb now. Begin a private consultation when you are ready." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation",
          className: "w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap",
          children: "SCHEDULE A CONSULTATION →"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/atlas",
          className: "w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap",
          children: "EXPLORE THE ATLAS →"
        }
      )
    ] })
  ] }) });
};
const ExpeditionArchive = UNSAFE_withComponentProps(function ExpeditionArchive2() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-[#1A1A1A]",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsx(ArchiveHero, {}), /* @__PURE__ */ jsx(ArchiveIntro, {}), /* @__PURE__ */ jsx(ArchiveFilters, {}), /* @__PURE__ */ jsx(ArchiveGrid, {}), /* @__PURE__ */ jsx(ArchiveFeaturedRecords, {}), /* @__PURE__ */ jsx(ArchiveRecordDetail, {}), /* @__PURE__ */ jsx(ArchiveVerification, {}), /* @__PURE__ */ jsx(ArchiveClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ExpeditionArchive
}, Symbol.toStringTag, { value: "Module" }));
const YetiHero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end pb-32 md:pb-48 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-32 md:pt-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center justify-center mb-16 md:mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mb-4" }),
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap", children: [
          "YETI INFRASTRUCTURE ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " § VII — AN OPERATING ECOSYSTEM ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " NEPAL HIMALAYA"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mt-4" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-[64px] md:text-[80px] lg:text-[112px] text-white leading-[1.05] text-center max-w-[22ch] mb-8", children: "The operating ecosystem behind every expedition." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-24", children: "Air support, mountain lodges, regional access, and field continuity — quietly maintained by the Yeti Group, so the climb in front of you receives our full attention." }),
      /* @__PURE__ */ jsx("div", { className: "w-full border-t border-[#C8CDD2]/30", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#C8CDD2]/30 border-b border-[#C8CDD2]/30", children: [
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "OPERATIONS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " KATHMANDU"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "REGIONS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " 5 HIMALAYAN"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "CONTINUITY ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " MULTI-GENERATIONAL"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "STATUS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " UHNI-LEVEL ASSURANCE"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center block", children: "[CLIENT TO CONFIRM] — OPERATIONAL CLAIMS AND PARTNERSHIPS UNDER REVIEW BEFORE PUBLICATION." }) })
    ] })
  ] });
};
const YetiDefinition = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col items-start", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "THE DEFINITION — § I" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6", children: "Infrastructure is what you do not see." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[30ch]", children: "Quietly held, behind every season." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "Yeti Infrastructure is the operating ecosystem Thamserku draws on across every Himalayan season. It is not a marketing partnership or a co-branded service. It is the operational fabric — aviation, hospitality, regional presence, and field continuity — that the Yeti Group has maintained in Nepal for decades." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "For the climber, it means an expedition is supported by infrastructure that exists year-round, not only during a season. For our senior expedition staff, it means continuity: the same crews, the same lodges, the same regional partners, season after season." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "This page describes the four operational pillars that matter most to a Himalayan expedition. None of them are positioning claims. All are working operations." })
    ] })
  ] }) });
};
const YetiAirSupport = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 w-full aspect-[16/10] border border-[#5A6673] flex flex-col items-center justify-center p-6 relative", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "[IMAGE PLACEHOLDER]" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "HELICOPTER IN A HIMALAYAN VALLEY — OPERATIONAL FRAME" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60", children: "[CLIENT TO CONFIRM]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block md:col-span-1" }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col items-start", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "PILLAR I — AIR SUPPORT" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] max-w-[16ch] mb-6", children: "Aerial coordination, when it matters." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[30ch] mb-8", children: "Helicopter access. Aerial logistics. Rescue support." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch] mb-12", children: "Helicopter access between Kathmandu, Lukla, and base camps across the Khumbu, Gorkha, and Annapurna regions — coordinated through the Yeti Group's aviation network. Aerial logistics for high-camp staging where conditions allow. Medical evacuation and rescue support coordinated through the same operational channel." }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col border-t border-white/20", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "CHANNELS" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "KATHMANDU · LUKLA · HIMALAYAN VALLEYS" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "USE CASES" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "ACCESS · STAGING · RESCUE" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "AVAILABILITY" }),
          /* @__PURE__ */ jsxs("span", { className: "font-['Radley'] text-[16px] text-white", children: [
            "SEASONAL · ",
            /* @__PURE__ */ jsx("span", { className: "opacity-60", children: "[CLIENT TO CONFIRM]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "COORDINATION" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "YETI GROUP AVIATION" })
        ] })
      ] })
    ] })
  ] }) });
};
const YetiMountainLodges = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8 border-t border-[#C8CDD2]/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col items-start order-2 md:order-1", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "PILLAR II — MOUNTAIN LODGES" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6", children: "Rest, before the route." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[30ch] mb-8", children: "Acclimatisation rhythm. Recovery. Quiet continuity." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[50ch] mb-12", children: "Operational lodges along approach routes — Lukla, Namche, Tengboche, Dingboche, and beyond — used for considered acclimatisation rhythm and recovery. These are not destination hotels. They are operational rest points maintained year-round, with the same teams, the same standards, and the discretion expected of every Thamserku expedition." }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col border-t border-[#C8CDD2]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-[#C8CDD2]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "REGIONS" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-[#1A1A1A]", children: "KHUMBU · GORKHA · ANNAPURNA" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-[#C8CDD2]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "USE CASES" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-[#1A1A1A]", children: "APPROACH · ACCLIMATISATION · RECOVERY" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-[#C8CDD2]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "STANDARD" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-[#1A1A1A]", children: "OPERATIONAL · DISCREET" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-[#C8CDD2]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "STAFFING" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-[#1A1A1A]", children: "YEAR-ROUND TEAMS" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block md:col-span-1 order-2" }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 w-full aspect-[16/10] border border-[#5A6673] flex flex-col items-center justify-center p-6 relative order-1 md:order-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "[IMAGE PLACEHOLDER]" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "MOUNTAIN LODGE — KHUMBU APPROACH — OPERATIONAL FRAME" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60", children: "[CLIENT TO CONFIRM]" })
    ] })
  ] }) });
};
const YetiRegionalAccess = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 w-full aspect-[16/10] border border-[#5A6673] flex flex-col items-center justify-center p-6 relative", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "[IMAGE PLACEHOLDER]" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "LOGISTICS DESK · KATHMANDU OPERATIONS — OPERATIONAL FRAME" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60", children: "[CLIENT TO CONFIRM]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block md:col-span-1" }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col items-start", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "PILLAR III — REGIONAL ACCESS" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] max-w-[16ch] mb-6", children: "Permits, regions, and quiet passage." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[30ch] mb-8", children: "Decades of regional presence." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch] mb-12", children: "Continuous regional presence across the five Himalayan regions where Thamserku operates — Khumbu, Gorkha, Dhaulagiri, Mahalangur, and Annapurna. Backed by decades of permits, partnerships, and quiet field relationships. This is the layer of an expedition no client should have to think about; it is also the layer that fails most often elsewhere." }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col border-t border-white/20", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "REGIONS" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "KHUMBU · GORKHA · DHAULAGIRI · MAHALANGUR · ANNAPURNA" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "USE CASES" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "PERMITS · PARTNERSHIPS · ACCESS" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "CONTINUITY" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "NEARLY FOUR DECADES" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 py-5 border-b border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "HANDLING" }),
          /* @__PURE__ */ jsx("span", { className: "font-['Radley'] text-[16px] text-white", children: "KATHMANDU OPERATIONS" })
        ] })
      ] })
    ] })
  ] }) });
};
const YetiFieldContinuity = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#0A3A77] py-[160px] md:py-[200px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col items-start", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "PILLAR IV — FIELD CONTINUITY" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] max-w-[18ch] mb-6", children: "The same hands, season after season." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[24px] max-w-[30ch] mb-8", children: "Multi-generational. Nepal-based. On the ground." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch]", children: "Yeti Infrastructure is operated by a multi-generational field team supported from Kathmandu. The same senior Sherpas, the same base camp managers, the same logistics coordinators — across seasons, across peaks, across the years. This continuity is what allows the same standards of care from first letter to descent." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch]", children: "It is also the reason our judgement on the mountain extends as far as it does. Field knowledge is earned slowly. We do not rotate teams. We grow them." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block md:col-span-1" }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 w-full aspect-[16/10] border border-white flex flex-col items-center justify-center p-6 relative", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-center mb-2", children: "[IMAGE PLACEHOLDER]" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-center mb-2", children: "FIELD TEAM AT WORK — ROUTE PREPARATION — OPERATIONAL FRAME" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-center opacity-60", children: "[CLIENT TO CONFIRM]" })
    ] })
  ] }) });
};
const PEAK_DATA = [
  {
    code: "EVR",
    name: "Everest",
    altitude: "8,848.86 m · Khumbu, Nepal",
    notes: [
      { label: "AIR", desc: "Kathmandu / Lukla / Khumbu helicopter network" },
      { label: "LODGES", desc: "Lukla, Namche, Tengboche, Dingboche, Lobuche approach lodges" },
      { label: "ACCESS", desc: "Khumbu / Solukhumbu regional partnerships" },
      { label: "CONTINUITY", desc: "Senior Sherpa team continuous across Everest seasons" }
    ]
  },
  {
    code: "MAN",
    name: "Manaslu",
    altitude: "8,163 m · Gorkha, Nepal",
    notes: [
      { label: "AIR", desc: "Kathmandu / Gorkha helicopter coordination" },
      { label: "LODGES", desc: "Approach lodges along the Manaslu Conservation Area" },
      { label: "ACCESS", desc: "Gorkha district permits and regional access" },
      { label: "CONTINUITY", desc: "Autumn-season specialist team, Sherpas from Solukhumbu" }
    ]
  },
  {
    code: "DHA",
    name: "Dhaulagiri",
    altitude: "8,167 m · Myagdi, Nepal",
    notes: [
      { label: "AIR", desc: "Kathmandu / Pokhara / Myagdi helicopter coordination" },
      { label: "LODGES", desc: "Approach lodges along the Dhaulagiri circuit" },
      { label: "ACCESS", desc: "Myagdi district permits, remote-mountain logistics" },
      { label: "CONTINUITY", desc: "Solitude-specialist Sherpa team across seasons" }
    ]
  },
  {
    code: "MAK",
    name: "Makalu",
    altitude: "8,485 m · Mahalangur, Nepal",
    notes: [
      { label: "AIR", desc: "Kathmandu / Tumlingtar / Mahalangur helicopter coordination" },
      { label: "LODGES", desc: "Approach lodges along the Makalu Barun corridor" },
      { label: "ACCESS", desc: "Mahalangur regional partnerships and permit handling" },
      { label: "CONTINUITY", desc: "Technical-climb specialist Sherpa team" }
    ]
  },
  {
    code: "HIM",
    name: "Himchuli",
    altitude: "6,441 m · Annapurna, Nepal",
    notes: [
      { label: "AIR", desc: "Kathmandu / Pokhara helicopter coordination" },
      { label: "LODGES", desc: "Approach lodges along the Annapurna Conservation Area" },
      { label: "ACCESS", desc: "Annapurna regional permits and cultural-route partnerships" },
      { label: "CONTINUITY", desc: "Quieter-objective and Explorer Edition support team" }
    ]
  }
];
const YetiPeakSpecificApplication = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8", children: "PEAK-SPECIFIC APPLICATION — § II" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6", children: "How the infrastructure applies, peak by peak." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]", children: "Five mountains. Same operational foundation. Different operational shapes." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col border-t border-white/20", children: PEAK_DATA.map((peak, idx) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-8 py-[60px] md:py-[80px] border-b border-white/20", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-1 hidden md:block", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: peak.code }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "md:hidden mb-2", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: peak.code }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[28px] md:text-[32px] text-white leading-none", children: peak.name }),
        /* @__PURE__ */ jsx("span", { className: "font-['Lexend'] text-[14px] text-[#C8CDD2]", children: peak.altitude })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6", children: peak.notes.map((note, nIdx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: note.label }),
        /* @__PURE__ */ jsx("span", { className: "font-['Lexend'] text-[14px] text-[#C8CDD2]", children: note.desc })
      ] }, nIdx)) })
    ] }, idx)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 w-full flex justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center max-w-[60ch]", children: "[CLIENT TO CONFIRM] — PEAK-SPECIFIC OPERATIONAL DETAILS PENDING CONFIRMATION." }) })
  ] }) });
};
const FAQS = [
  {
    q: "What is Yeti Infrastructure, and how does it relate to Thamserku?",
    a: "[DUMMY FAQ] — Placeholder answer. Yeti Infrastructure is the operating ecosystem Thamserku draws on across every Himalayan expedition — air support, mountain lodges, regional access, and field continuity. Thamserku operates as part of the Yeti Group, the wider Nepali Himalayan group through which this infrastructure is continuously maintained."
  },
  {
    q: "How does the Yeti Group support a Thamserku expedition specifically?",
    a: "[DUMMY FAQ] — Placeholder answer. Practical operational support: helicopter access and rescue coordination, mountain lodges along approach routes, regional permits and partnerships, and a multi-generational field team. None of this is visible during a successful expedition — which is the point."
  },
  {
    q: "How does the helicopter and air coordination work?",
    a: "[DUMMY FAQ] — Placeholder answer. Helicopter access between Kathmandu, Lukla, and Himalayan valleys, coordinated through the Yeti Group's aviation network. Used for client transfer to and from base camps, high-camp staging where conditions allow, and medical evacuation or rescue support if required."
  },
  {
    q: "How are lodges, regional access, and logistics handled?",
    a: "[DUMMY FAQ] — Placeholder answer. Operational lodges along approach routes are maintained year-round with continuous staffing. Regional permits are handled by Kathmandu operations across all five Himalayan regions where we climb. Logistics — transport, supply chains, and field movement — are coordinated end-to-end by senior staff."
  },
  {
    q: "How does Yeti Infrastructure improve safety and coordination during an expedition?",
    a: "[DUMMY FAQ] — Placeholder answer. Field continuity matters most for safety: the same senior Sherpa team, the same medical advisor, and the same regional partners across seasons. Decisions made at altitude are made by people whose judgement has been earned year after year. This is the deepest layer of expedition safety, and it is the layer we do not improvise on."
  }
];
const YetiFAQ = () => {
  const [openStates, setOpenStates] = useState({});
  const toggleFaq = (idx) => {
    setOpenStates((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-20 md:mb-24 w-full", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8", children: "FREQUENTLY ASKED — INFRASTRUCTURE" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6", children: "Five quiet answers, before you write to us." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]", children: "The most common questions about the Yeti operating ecosystem." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col border-b border-[#5A6673]/30", children: FAQS.map((faq, idx) => {
      const num = (idx + 1).toString().padStart(2, "0");
      const isOpen = !!openStates[idx];
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-[#5A6673]/30", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => toggleFaq(idx),
            className: "flex flex-row items-center justify-between w-full py-8 md:py-10 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]",
            "aria-expanded": isOpen,
            "aria-controls": `faq-answer-yeti-${idx}`,
            id: `faq-question-yeti-${idx}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 md:gap-8 flex-1 pr-8", children: [
                /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-2 whitespace-nowrap", children: [
                  "Q.",
                  num,
                  " —"
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[24px] text-[#1A1A1A] leading-[1.3] group-hover:text-[#1A1A1A] transition-colors max-w-[60ch]", children: faq.q })
              ] }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `font-['JetBrains_Mono'] text-[14px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-all duration-[250ms] ease-out transform ${isOpen ? "rotate-180" : "rotate-0"}`,
                  children: "▾"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            id: `faq-answer-yeti-${idx}`,
            role: "region",
            "aria-labelledby": `faq-question-yeti-${idx}`,
            className: "grid transition-all duration-[250ms] ease-out",
            style: { gridTemplateRows: isOpen ? "1fr" : "0fr" },
            children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 md:gap-8 pb-8 md:pb-10", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-1 whitespace-nowrap", children: [
                "A.",
                num,
                " —"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] max-w-[60ch]", children: faq.a })
            ] }) })
          }
        )
      ] }, idx);
    }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 flex justify-center w-full", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/faq",
        className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] hover:text-[#0A3A77] transition-colors pb-1 border-b border-transparent hover:border-[#0A3A77]",
        children: "READ ALL FAQS ON THE MAIN FAQ PAGE →"
      }
    ) })
  ] }) });
};
const YetiClosing = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[160px] md:py-[200px] px-8 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10", children: "CONTINUE PRIVATELY — § VIII" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.05] text-center max-w-[24ch] mb-8", children: "The infrastructure is here. The conversation is private." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-16", children: "Share your background, your timing, and your intention. A senior advisor will walk you through how the infrastructure applies to your specific expedition — quietly, and within 48 hours." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation",
          className: "w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap",
          children: "SCHEDULE A CONSULTATION →"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/atlas",
          className: "w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap",
          children: "EXPLORE EXPEDITIONS →"
        }
      )
    ] })
  ] }) });
};
const YetiInfrastructure = UNSAFE_withComponentProps(function YetiInfrastructure2() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-[#1A1A1A]",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsx(YetiHero, {}), /* @__PURE__ */ jsx(YetiDefinition, {}), /* @__PURE__ */ jsx(YetiAirSupport, {}), /* @__PURE__ */ jsx(YetiMountainLodges, {}), /* @__PURE__ */ jsx(YetiRegionalAccess, {}), /* @__PURE__ */ jsx(YetiFieldContinuity, {}), /* @__PURE__ */ jsx(YetiPeakSpecificApplication, {}), /* @__PURE__ */ jsx(YetiFAQ, {}), /* @__PURE__ */ jsx(YetiClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: YetiInfrastructure
}, Symbol.toStringTag, { value: "Module" }));
const PathwayHero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end pb-32 md:pb-48 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-32 md:pt-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center justify-center mb-16 md:mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mb-4" }),
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap", children: [
          "7,000M QUALIFYING PATHWAY ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " § VIII — PREPARATION CONTEXT ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " NEPAL HIMALAYA"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mt-4" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-[64px] md:text-[80px] lg:text-[112px] text-white leading-[1.05] text-center max-w-[22ch] mb-8", children: "Earn altitude. Then climb above 8,000m." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-24", children: "A considered planning context for climbers preparing for Everest, Manaslu, Dhaulagiri, or Makalu. Five 7,000m route placeholders, a two-expedition pathway, and a private consultation channel." }),
      /* @__PURE__ */ jsx("div", { className: "w-full border-t border-[#C8CDD2]/30 mb-20", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#C8CDD2]/30 border-b border-[#C8CDD2]/30", children: [
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "ALTITUDE BAND ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " 7,000 — 7,500 M"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "ROUTES ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " 5 PLACEHOLDER"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "PATHWAY ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " 2 EXPEDITIONS"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "MODE ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " PRIVATE CONSULTATION"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation?intent=7000m",
          className: "border border-white/50 text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap mb-12",
          children: "PLAN YOUR QUALIFYING ASCENT →"
        }
      ),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center block", children: "[ROUTE TBC] — FIVE 7,000M ROUTE OPTIONS PENDING CLIENT CONFIRMATION." }) })
    ] })
  ] });
};
const PathwayPlanningContext = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col items-start", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "THE PLANNING CONTEXT — § I" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6", children: "Preparation is not a hurdle." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]", children: "It is the most honest part of an 8,000m expedition." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "Before an 8,000m expedition with Thamserku, we generally recommend a 7,000m qualifying ascent. Not as a filter or a hurdle, but as the considered ground where altitude, judgement, and field discipline are properly earned." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "A 7,000m peak teaches what no training programme can replicate: how your body responds to multi-day altitude, how you make decisions in thin air, and how you walk through a difficult day without losing rhythm. These are the conditions that will define your 8,000m expedition. Better to meet them first on a peak that asks less." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "This page describes the pathway. Specific routes, dates, and your personal preparation plan are best worked out in a private consultation with our expedition desk." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[56ch] mt-4", children: "We do not require a 7,000m ascent in every case. The right pathway depends on your background, your timing, and the mountain you are preparing for. The consultation is where this is decided." })
    ] })
  ] }) });
};
const REASONS = [
  {
    eyebrow: "REASON I — ALTITUDE",
    title: "Earned, not assumed.",
    desc: "Above 7,000m, the body does not respond to training the way it responds to sea-level conditioning. A 7,000m ascent is the only way to know how your body actually behaves at altitude — and how it recovers between rotations."
  },
  {
    eyebrow: "REASON II — JUDGEMENT",
    title: "Decisions in thin air.",
    desc: "At altitude, decision-making slows and the cost of every choice rises. A 7,000m peak is where climbers learn what their judgement looks like when oxygen is half of what they are used to. This is the most undertrained skill in expedition climbing."
  },
  {
    eyebrow: "REASON III — FIELD DISCIPLINE",
    title: "Multi-day rhythm.",
    desc: "An 8,000m expedition is run over weeks, not days. A 7,000m peak teaches how to keep your rhythm — eating, sleeping, recovering, communicating — across long field sequences. The habits you build here are the habits you will need above 7,500m."
  },
  {
    eyebrow: "REASON IV — TEAM CONTINUITY",
    title: "Climbing with Thamserku, twice.",
    desc: "A 7,000m ascent with Thamserku introduces you to your Sherpa team, our standards, and our way of reading the mountain — before the larger objective. By the time you arrive at Everest Base Camp, you have already climbed with the people who will lead you to the summit."
  }
];
const PathwayWhyItMatters = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 border-t border-[#C8CDD2]/10 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1440px] mx-auto flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8", children: "WHY IT MATTERS — § II" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch]", children: "Four reasons a 7,000m peak is read first." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: REASONS.map((reason, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col bg-[#2E353C]/30 border-t border-[#C8CDD2]/30 px-6 py-10",
          children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: reason.eyebrow }),
            /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-[1.2] mb-6", children: reason.title }),
            /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]", children: reason.desc })
          ]
        },
        idx
      )) })
    ] })
  ] });
};
const ROUTES = [
  { id: "I", title: "Route I" },
  { id: "II", title: "Route II" },
  { id: "III", title: "Route III" },
  { id: "IV", title: "Route IV" },
  { id: "V", title: "Route V" }
];
const PathwayFiveRoutes = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8", children: "THE FIVE ROUTES — § III" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6", children: "Five routes, read carefully." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]", children: "Each route is selected for what it teaches a climber preparing for an 8,000m objective. Specific peaks confirmed in consultation." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6", children: ROUTES.map((route, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col border-y border-[#5A6673]/30 px-6 py-8",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[4/3] border border-[#5A6673] flex flex-col items-center justify-center p-4 mb-8", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#5A6673] text-center mb-1", children: "[IMAGE PLACEHOLDER]" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#5A6673] text-center mb-1", children: "7,000M RIDGE — CONTOUR FRAME" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#5A6673] text-center opacity-60", children: "[ROUTE TBC]" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4", children: [
            "ROUTE ",
            route.id,
            " — [PEAK NAME TBC]"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[24px] md:text-[28px] text-[#1A1A1A] leading-[1.1] mb-8", children: route.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-t border-[#5A6673]/30 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-[#5A6673]/30", children: [
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "ALTITUDE" }),
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A]", children: "[ROUTE TBC] m" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-[#5A6673]/30", children: [
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "REGION" }),
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A]", children: "[ROUTE TBC]" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-[#5A6673]/30", children: [
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]", children: "CHARACTER" }),
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#1A1A1A]", children: "[ROUTE TBC]" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] mb-10 flex-grow", children: "Route character description pending client confirmation. To be filled with the route's preparation context for an 8,000m objective." }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/consultation?intent=7000m",
              className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] mt-auto whitespace-nowrap",
              children: "READ THE ROUTE → [CONSULTATION ONLY]"
            }
          )
        ]
      },
      idx
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 w-full flex justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center max-w-[60ch]", children: "[ROUTE TBC] — FIVE SPECIFIC 7,000M PEAK ROUTES UNDER CLIENT REVIEW. THIS PAGE WILL UPDATE WHEN ROUTES ARE CONFIRMED." }) })
  ] }) });
};
const PathwayExplorerRoutes = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[120px] md:py-[160px] px-8 border-t border-[#C8CDD2]/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 w-full aspect-[16/10] border border-[#5A6673] flex flex-col items-center justify-center p-6 relative", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "[IMAGE PLACEHOLDER]" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "REMOTE HIMALAYAN RIDGE — EXPLORER CONTEXT" }),
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60", children: "[ROUTE TBC]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block md:col-span-1" }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 flex flex-col items-start", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8", children: "EXPLORER ROUTES — § IV — CONSULTATION ONLY" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] max-w-[18ch] mb-6", children: "Less commercial routes. By private consultation." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[36ch] mb-8", children: "Routes selected for solitude, quieter regions, or specific preparation needs." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch] mb-12", children: "Some 7,000m routes are not commercially run. They are quieter peaks, less-trodden regions, or routes selected to match a specific climber's preparation goals. These are not listed publicly. They are designed in private consultation with our expedition desk and led by Sherpa teams familiar with the region." }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#C8CDD2]/30 mb-12 border-y border-[#C8CDD2]/30", children: [
        /* @__PURE__ */ jsx("div", { className: "py-4 sm:pr-6 flex justify-start sm:justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-left sm:text-center", children: [
          "AVAILABILITY ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " BY CONSULTATION"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 sm:px-6 flex justify-start sm:justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-left sm:text-center", children: [
          "EDITIONS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " BESPOKE ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " CRAFTED ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " DEFINITIVE"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 sm:pl-6 flex justify-start sm:justify-center", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-left sm:text-center", children: [
          "REGIONS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " KHUMBU ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " DOLPO ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " MUSTANG ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " [ROUTE TBC]"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation?intent=7000m-explorer",
          className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:text-white transition-colors",
          children: "REQUEST AN EXPLORER ROUTE CONSULTATION →"
        }
      )
    ] })
  ] }) });
};
const PathwayTwoExpeditionDiagram = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#0A3A77] py-[160px] md:py-[200px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8", children: "THE TWO-EXPEDITION PATHWAY — § V" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6", children: "Two expeditions. One considered path." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]", children: "A typical preparation path moves from a 7,000m qualifying ascent to an 8,000m flagship objective — separated by recovery, reflection, and consultation." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex w-full relative mb-32 pt-12 pb-12", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[48px] left-[16.66%] right-[16.66%] h-[1px] bg-white z-0 flex justify-between px-8" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center relative z-10 px-4", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute -top-10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white bg-[#0A3A77] px-2", children: "7,000 M" }),
        /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full border border-white bg-[#0A3A77] mb-8" }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4", children: "STEP I — QUALIFYING ASCENT" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[28px] text-white leading-[1.2] mb-4", children: "7,000m Peak" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65] text-center max-w-[28ch]", children: "Earned altitude. Earned judgement. Earned discipline. Climbed with our Sherpa team for the first time." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center relative z-10 px-4", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute -top-10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white bg-[#0A3A77] px-2", children: "RECOVERY · KATHMANDU" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full border border-white bg-[#0A3A77] mb-[34px]" }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4", children: "STEP II — RECOVERY & REVIEW" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[24px] text-[#C8CDD2] leading-[1.2] mb-4", children: "Recovery · Consultation" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65] text-center max-w-[28ch]", children: "Body recovers. The expedition is reviewed. A private consultation with the desk decides whether and when to proceed to the 8,000m objective." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center relative z-10 px-4", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute -top-10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white bg-[#0A3A77] px-2", children: "8,000 M+" }),
        /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full border border-white bg-[#0A3A77] mb-8" }),
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4", children: "STEP III — FLAGSHIP OBJECTIVE" }),
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[28px] text-white leading-[1.2] mb-4", children: "8,000m Peak" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65] text-center max-w-[28ch]", children: "Everest, Manaslu, Dhaulagiri, or Makalu. Climbed with the same Sherpa team. The mountain meets a climber who is ready." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex flex-col gap-16 mb-24 w-full px-4 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 left-[23px] w-[1px] bg-white z-0" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-8 relative z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center pt-2", children: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full border border-white bg-[#0A3A77]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white mb-2", children: "7,000 M" }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2", children: "STEP I — QUALIFYING ASCENT" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[28px] text-white leading-[1.2] mb-4", children: "7,000m Peak" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]", children: "Earned altitude. Earned judgement. Earned discipline. Climbed with our Sherpa team for the first time." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-8 relative z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center pt-2 w-[16px] pl-[2px]", children: /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full border border-white bg-[#0A3A77]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white mb-2", children: "RECOVERY · KATHMANDU" }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2", children: "STEP II — RECOVERY & REVIEW" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[24px] text-[#C8CDD2] leading-[1.2] mb-4", children: "Recovery · Consultation" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]", children: "Body recovers. The expedition is reviewed. A private consultation with the desk decides whether and when to proceed to the 8,000m objective." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-8 relative z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center pt-2", children: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full border border-white bg-[#0A3A77]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white mb-2", children: "8,000 M+" }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2", children: "STEP III — FLAGSHIP OBJECTIVE" }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[28px] text-white leading-[1.2] mb-4", children: "8,000m Peak" }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]", children: "Everest, Manaslu, Dhaulagiri, or Makalu. Climbed with the same Sherpa team. The mountain meets a climber who is ready." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-start text-center md:text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] mb-4", children: "TIMING I · 6 — 12 months apart" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]", children: "Most climbers complete the qualifying ascent and the 8,000m objective in different seasons within the same year, or in consecutive years." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-start text-center md:text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] mb-4", children: "TIMING II · Recovery is a stage" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]", children: "Between expeditions, recovery is treated as a stage of preparation — not as a gap. We use this window for consultation, training, and planning." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-start text-center md:text-left", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] mb-4", children: "TIMING III · Continuity is the gift" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]", children: "By the time you arrive at the 8,000m base camp, you have already climbed with us. This is the deepest layer of safety we offer." })
      ] })
    ] })
  ] }) });
};
const PathwayRegulatoryCaution = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[100px] md:py-[120px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1080px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-6", children: "A NOTE ON REGULATION — § VI" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[36px] md:text-[48px] text-[#1A1A1A] leading-[1.1] text-center max-w-[26ch] mb-8", children: "Permits, regulations, and what to expect." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] text-center max-w-[60ch] mb-6", children: "Climbing 7,000m peaks in Nepal requires permits, registration, and adherence to Department of Tourism guidelines. Some regions have additional restrictions or fees. Specific regulations vary by peak, season, and route." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[60ch] mb-12", children: "Permit handling, regulatory compliance, and field logistics are managed end-to-end by our Kathmandu operations team. Your consultation will outline what is required for your specific route." }),
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center", children: "[CLIENT TO CONFIRM] — REGULATORY DETAILS FINALISED IN YOUR TAILORED PROPOSAL." })
  ] }) });
};
const PathwayClosing = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[160px] md:py-[200px] px-8 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10", children: "BEGIN THE PATHWAY — § VII" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.05] text-center max-w-[24ch] mb-8", children: "Plan your qualifying ascent." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-16", children: "Share your background, your 8,000m objective, and your timing. A senior advisor will walk you through which 7,000m route fits your preparation — and how the pathway shapes around your readiness." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation?intent=7000m",
          className: "w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap",
          children: "PLAN YOUR QUALIFYING ASCENT →"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/everest",
          className: "w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap",
          children: "EXPLORE EVEREST →"
        }
      )
    ] })
  ] }) });
};
const SevenThousandMeterPathway = UNSAFE_withComponentProps(function SevenThousandMeterPathway2() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-[#1A1A1A]",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsx(PathwayHero, {}), /* @__PURE__ */ jsx(PathwayPlanningContext, {}), /* @__PURE__ */ jsx(PathwayWhyItMatters, {}), /* @__PURE__ */ jsx(PathwayFiveRoutes, {}), /* @__PURE__ */ jsx(PathwayExplorerRoutes, {}), /* @__PURE__ */ jsx(PathwayTwoExpeditionDiagram, {}), /* @__PURE__ */ jsx(PathwayRegulatoryCaution, {}), /* @__PURE__ */ jsx(PathwayClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SevenThousandMeterPathway
}, Symbol.toStringTag, { value: "Module" }));
const PrivateHero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end pb-32 md:pb-48 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-32 md:pt-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center justify-center mb-16 md:mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mb-4" }),
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap", children: [
          "PRIVATE EXPEDITIONS ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " § IX — UHNI ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " FAMILY OFFICE ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " PRINCIPALS"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mt-4" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-[64px] md:text-[80px] lg:text-[112px] text-white leading-[1.05] text-center max-w-[22ch] mb-8", children: "Quietly designed. Privately led." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-24", children: "Himalayan expeditions for principals, families, and executives who require maximum discretion, dedicated support, and bespoke private planning — from first letter to descent." }),
      /* @__PURE__ */ jsx("div", { className: "w-full border-t border-[#C8CDD2]/30 mb-20", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#C8CDD2]/30 border-b border-[#C8CDD2]/30", children: [
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "AUDIENCE ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " UHNI ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          " FAMILY OFFICE"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "EDITIONS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " CRAFTED ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          " DEFINITIVE ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          " EXPLORER"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "DISCRETION ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " STANDARD, NOT FEATURE"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "RESPONSE ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " WITHIN 48 HOURS"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation?intent=private",
          className: "border border-white/50 text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap",
          children: "SCHEDULE A PRIVATE CONSULTATION →"
        }
      )
    ] })
  ] });
};
const PrivatePhilosophy = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col items-start", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "THE PHILOSOPHY — § I" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[18ch] mb-6", children: "Discretion is the standard." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]", children: "Not a feature. Not an upgrade. The default." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "Every Thamserku expedition can be made private. For some clients — principals, families, executives — privacy is not a preference. It is a requirement of how they live, work, and travel. This page describes the support, the editions, and the consultation pathway designed for those expeditions." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "Privacy with Thamserku is not a marketing layer. It is operational: protected communications, contracted staff discretion, by-default opt-out from public attribution, and the kind of presence that does not photograph itself. Every detail of a private expedition — schedule, route, camp, hospitality, communications, aftercare — is shaped around the climber." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]", children: "These expeditions are not faster than our other editions. They are slower, more considered, and more carefully held. Speed is not a luxury at altitude. Care is." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[56ch] mt-4", children: "We do not publish examples of private expeditions. Every record on our Expedition Archive that is not marked verified remains internal by default." })
    ] })
  ] }) });
};
const AUDIENCES = [
  {
    eyebrow: "READER I — UHNI PRINCIPALS",
    title: "Individuals climbing privately.",
    desc: "Senior individuals — entrepreneurs, executives, public figures — whose presence is recognisable, whose schedules are protected, and who require an expedition that is unobtrusive from first conversation to descent."
  },
  {
    eyebrow: "READER II — FAMILY OFFICES",
    title: "Planning on behalf of principals.",
    desc: "Family office advisors and chief-of-staff figures coordinating expeditions on behalf of principals. We work directly with your office, with the same discretion that defines the rest of your engagements."
  },
  {
    eyebrow: "READER III — PRIVATE FAMILY GROUPS",
    title: "Two to six climbers, related or trusted.",
    desc: "Families and small private groups climbing together — sometimes generationally, sometimes ceremonially. The expedition is built around the group's rhythm and pace, not standardised."
  },
  {
    eyebrow: "READER IV — EXECUTIVE & CORPORATE PARTIES",
    title: "Senior leadership teams or principals.",
    desc: "Boards, senior executive teams, and private partnerships using a Himalayan expedition as the setting for a decision, a milestone, or a transition. Privacy and dedicated support are non-negotiable."
  }
];
const PrivateWhoItIsFor = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8", children: "WHO IT IS FOR — § II" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6", children: "Four readers. One quiet door." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]", children: "Private expeditions are read by a small set of clients, each with their own reasons for arriving here." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8", children: AUDIENCES.map((audience, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col bg-[#2E353C]/30 border-t border-[#C8CDD2]/30 px-6 py-10",
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6 block min-h-[3em]", children: audience.eyebrow }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-[1.2] mb-6", children: audience.title }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]", children: audience.desc })
        ]
      },
      idx
    )) })
  ] }) });
};
const PrivateAvailableEditions = () => {
  return /* @__PURE__ */ jsxs("section", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-[#F4F2EC] pt-[140px] md:pt-[180px] px-8 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8", children: "AVAILABLE EDITIONS — § III" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6", children: "Three editions, shaped privately." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]", children: "Strategy doc reference: Crafted, Definitive, and Explorer editions are the editions most often commissioned privately." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-[#F4F2EC] py-24 md:py-32 px-8 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-5/12 flex flex-col items-start md:sticky md:top-32 pt-8", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[240px] md:text-[320px] text-[#0A3A77] leading-[0.8] tracking-tighter ml-[-20px] md:ml-[-40px]", children: "C" }),
        /* @__PURE__ */ jsx("span", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px] mt-6 ml-2 max-w-[20ch]", children: '"An elevated reading, held privately."' })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-7/12 flex flex-col items-start pt-16 md:pt-32", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[40px] md:text-[56px] text-[#1A1A1A] leading-[1.1] mb-8", children: "Crafted Edition — Private" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[52ch] mb-12", children: "A Crafted expedition run privately for a principal, family, or small group. The technical seriousness of a Crafted expedition is preserved; what changes is the privacy of the camp, the rhythm of the days, and the level of attention given to comfort, food, recovery, and documentation. Public attribution is opt-in." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 w-full max-w-[52ch] mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-t border-[#5A6673]/30 pt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] block mb-2", children: "WHO IT IS FOR" }),
            /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#1A1A1A]", children: "HNW and UHNI clients who want a serious Himalayan climb with deeper service and the privacy of a non-shared expedition." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-[#5A6673]/30 pt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] block mb-2", children: "BEST READ ON" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-[#1A1A1A]", children: "EVEREST · MANASLU · DHAULAGIRI · MAKALU" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
          /* @__PURE__ */ jsx(Link, { to: "/editions", className: "border border-[#0A3A77] text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:bg-[#0A3A77] hover:text-white transition-colors text-center", children: "READ THE CRAFTED EDITION →" }),
          /* @__PURE__ */ jsx(Link, { to: "/consultation?intent=private", className: "border border-[#1A1A1A]/30 text-[#5A6673] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors text-center", children: "SCHEDULE A PRIVATE CONSULTATION →" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-[#0A3A77] py-[220px] md:py-[260px] px-8 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col md:flex-row-reverse items-center md:items-start gap-12 md:gap-24 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-5/12 flex flex-col items-start md:sticky md:top-32 pt-8", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[280px] md:text-[360px] text-white leading-[0.8] tracking-tighter", children: "D" }),
        /* @__PURE__ */ jsx("span", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] mt-6 max-w-[20ch]", children: '"The most exclusive private expedition."' })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-7/12 flex flex-col items-start pt-16 md:pt-32", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[40px] md:text-[56px] text-white leading-[1.1] mb-8", children: "Definitive Edition — Private Flagship" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.75] max-w-[52ch] mb-6", children: "The Definitive Edition is the flagship private expedition of the house. A private camp configuration, concierge planning, maximum discretion, and the senior leadership of the house — all built quietly around a single climber, family, or principal. Nothing is templated. Every detail is shaped in private and handled by senior expedition staff from first contact to descent." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.75] max-w-[52ch] mb-12", children: "Public attribution is by your written invitation only. Many Definitive expeditions remain entirely private." }),
        /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[52ch] grid grid-cols-2 md:grid-cols-4 divide-x divide-white/30 border-y border-white/30 mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "py-4 px-2 flex flex-col items-start justify-center", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#C8CDD2] mb-2", children: "CAMP" }),
            /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[16px] text-white leading-[1.2]", children: "Private Base Camp Configuration" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-4 px-4 flex flex-col items-start justify-center", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#C8CDD2] mb-2", children: "CONCIERGE" }),
            /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[16px] text-white leading-[1.2]", children: "Single Senior Advisor" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-4 px-4 flex flex-col items-start justify-center", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#C8CDD2] mb-2", children: "DISCRETION" }),
            /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[16px] text-white leading-[1.2]", children: "Maximum · Contracted" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "py-4 px-4 flex flex-col items-start justify-center", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#C8CDD2] mb-2", children: "LEADERSHIP" }),
            /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[16px] text-white leading-[1.2]", children: "Senior House Team" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 w-full max-w-[52ch] mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-t border-white/30 pt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] block mb-2", children: "WHO IT IS FOR" }),
            /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-white", children: "UHNI individuals, principal families, elite adventurers, and clients requiring maximum privacy, discretion, and tailoring." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-white/30 pt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] block mb-2", children: "BEST READ ON" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-white", children: "EVEREST · DHAULAGIRI · MAKALU" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
          /* @__PURE__ */ jsx(Link, { to: "/editions", className: "border border-white text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:bg-white hover:text-[#0A3A77] transition-colors text-center", children: "READ THE DEFINITIVE EDITION →" }),
          /* @__PURE__ */ jsx(Link, { to: "/consultation?intent=definitive", className: "border border-white/50 text-[#C8CDD2] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:border-white hover:text-white transition-colors text-center", children: "SCHEDULE A DEFINITIVE CONSULTATION →" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-[#F4F2EC] py-24 md:py-32 px-8 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-5/12 flex flex-col items-start md:sticky md:top-32 pt-8", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[240px] md:text-[320px] text-[#0A3A77] leading-[0.8] tracking-tighter ml-[-20px] md:ml-[-40px]", children: "E" }),
        /* @__PURE__ */ jsx("span", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px] mt-6 ml-2 max-w-[20ch]", children: '"The Himalayas, read softly."' })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-7/12 flex flex-col items-start pt-16 md:pt-32", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[40px] md:text-[56px] text-[#1A1A1A] leading-[1.1] mb-8", children: "Explorer Edition — Private" }),
        /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[52ch] mb-12", children: "A private Explorer expedition for principals or families seeking the Himalayas beyond the summit — cultural journeys, base-camp experiences, photographic expeditions, or non-climbing readings of the same mountains we summit on other editions. Same discretion, gentler pace." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 w-full max-w-[52ch] mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-t border-[#5A6673]/30 pt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] block mb-2", children: "WHO IT IS FOR" }),
            /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#1A1A1A]", children: "Principals, families, and private groups who want time in the Himalayas without the commitment of a summit objective." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-[#5A6673]/30 pt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] block mb-2", children: "BEST READ ON" }),
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-[#1A1A1A]", children: "HIMCHULI · EVEREST (BASE CAMP / EXPERIENCE)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
          /* @__PURE__ */ jsx(Link, { to: "/editions", className: "border border-[#0A3A77] text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:bg-[#0A3A77] hover:text-white transition-colors text-center", children: "READ THE EXPLORER EDITION →" }),
          /* @__PURE__ */ jsx(Link, { to: "/consultation?intent=private", className: "border border-[#1A1A1A]/30 text-[#5A6673] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors text-center", children: "SCHEDULE A PRIVATE CONSULTATION →" })
        ] })
      ] })
    ] }) })
  ] });
};
const MODULES = [
  {
    numeral: "I.",
    eyebrow: "MODULE I — DISCRETION",
    title: "Privacy as a standard, not a feature.",
    body: "Names, photographs, expedition details, and field communications are protected by default. Public attribution is by your written invitation only. Many of our private expeditions remain entirely private — across years, seasons, and the public archive.",
    practice: "In practice: no expedition is published without written permission. No images are shared without written permission. Staff discretion is contracted, not implied."
  },
  {
    numeral: "II.",
    eyebrow: "MODULE II — DEDICATED SUPPORT",
    title: "A senior advisor, from first letter to descent.",
    body: "Every private expedition is assigned a senior advisor as the single point of contact for the duration of the engagement. From the first private conversation, through planning, expedition, and aftercare — the advisor remains constant.",
    practice: "In practice: no shared inboxes. No junior gatekeepers. Direct line to senior expedition staff at every stage."
  },
  {
    numeral: "III.",
    eyebrow: "MODULE III — PRIVATE PLANNING",
    title: "Designed quietly, end-to-end.",
    body: "Logistics, route preparation, communications, hospitality, and aftercare are all designed in private for your expedition. Permits, transport, supply chains, and field movement are shaped specifically — nothing is templated, nothing is shared.",
    practice: "In practice: a tailored proposal, written for your expedition only. A planning document that does not live in any shared system."
  },
  {
    numeral: "IV.",
    eyebrow: "MODULE IV — CONTINUITY",
    title: "The same hands, season after season.",
    body: "Sherpa leadership, medical advisor, expedition director, and senior operations staff remain involved across private expeditions. If you climb with us a second time, you climb with the same team. Continuity is the deepest layer of safety we offer.",
    practice: "In practice: by the second expedition, our senior staff know your rhythm, your preferences, your medical considerations, and your way of climbing."
  },
  {
    numeral: "V.",
    eyebrow: "MODULE V — AFTERCARE",
    title: "The expedition does not end at the summit.",
    body: "Descent, debrief, transit, and post-expedition continuity are part of every private expedition by default. Documentation of the climb — written, photographic, archival — is prepared only with your consent. Recovery and quiet follow-up are part of how the engagement closes.",
    practice: "In practice: we follow up. We hold the documentation privately until you tell us otherwise. We are available when you are ready to plan the next one."
  }
];
const PrivateSupportModules = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1320px] mx-auto flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8", children: "PRIVATE SUPPORT — § IV" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6", children: "Five quiet systems, working at all times." }),
        /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]", children: "Built around the climber. Held by senior staff." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col border-t border-[#C8CDD2]/30", children: MODULES.map((mod, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 py-[60px] md:py-[80px] border-b border-[#C8CDD2]/30",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 flex flex-col items-start pr-8", children: [
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] font-light text-[32px] text-[#C8CDD2] mb-4", children: mod.numeral }),
              /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: mod.eyebrow })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 flex flex-col items-start pr-0 md:pr-12", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[32px] md:text-[40px] text-white leading-[1.1] max-w-[18ch] mb-6", children: mod.title }),
              /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15.5px] text-[#C8CDD2] leading-[1.7] max-w-[56ch]", children: mod.body })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "md:col-span-3 flex flex-col items-start pt-2 md:pt-4", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[18px] leading-[1.45] max-w-[28ch]", children: mod.practice }) })
          ]
        },
        idx
      )) })
    ] })
  ] });
};
const STEPS = [
  {
    marker: "STEP I",
    title: "Discreet Enquiry",
    desc: "You write to us directly, or via a trusted introduction. Your enquiry is reviewed by a senior advisor within 48 hours. Nothing is logged in shared systems."
  },
  {
    marker: "STEP II",
    title: "Private Conversation",
    desc: "A private video, phone, or in-person consultation. We listen first. We discuss your background, your timing, and the level of discretion you require — before we recommend anything."
  },
  {
    marker: "STEP III",
    title: "Tailored Proposal",
    desc: "A tailored proposal is shaped specifically for your expedition — itinerary, leadership, logistics, hospitality, discretion protocols, and pricing — written only for you, delivered through your preferred channel."
  },
  {
    marker: "STEP IV",
    title: "Ongoing Engagement",
    desc: "Once direction is set, your senior advisor becomes your single point of contact for the duration of the engagement — and remains the natural point of contact for any future expedition you plan with us."
  }
];
const PrivateConsultationPathway = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8", children: "THE CONSULTATION PATHWAY — § V" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6", children: "How a private consultation begins." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]", children: "Different from the standard consultation. Quieter. More carefully held." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16", children: STEPS.map((step, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col border-t border-[#5A6673]/30 px-6 py-8 md:py-10",
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] mb-6 block", children: step.marker }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] mb-6", children: step.title }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65]", children: step.desc })
        ]
      },
      idx
    )) }),
    /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[60ch]", children: "Your senior advisor's name and contact details are shared after the first consultation. We do not list staff names on this page." })
  ] }) });
};
const PrivateClosing = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[160px] md:py-[200px] px-8 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10", children: "BEGIN PRIVATELY — § VI" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.05] text-center max-w-[24ch] mb-8", children: "Every serious journey begins privately." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-16", children: "Share your background, your timing, and your level of discretion. A senior advisor will respond personally — within 48 hours, through your preferred channel — and the private conversation begins." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center mb-16", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation?intent=private",
          className: "w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap",
          children: "SCHEDULE A PRIVATE CONSULTATION →"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation",
          className: "w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap",
          children: "SPEAK WITH THE EXPEDITION DESK →"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: "ALL ENQUIRIES ARE HANDLED DISCREETLY BY SENIOR EXPEDITION STAFF." })
  ] }) });
};
const PrivateExpeditions = UNSAFE_withComponentProps(function PrivateExpeditions2() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-[#1A1A1A]",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsx(PrivateHero, {}), /* @__PURE__ */ jsx(PrivatePhilosophy, {}), /* @__PURE__ */ jsx(PrivateWhoItIsFor, {}), /* @__PURE__ */ jsx(PrivateAvailableEditions, {}), /* @__PURE__ */ jsx(PrivateSupportModules, {}), /* @__PURE__ */ jsx(PrivateConsultationPathway, {}), /* @__PURE__ */ jsx(PrivateClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PrivateExpeditions
}, Symbol.toStringTag, { value: "Module" }));
const FieldNotesHero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end pb-32 md:pb-48 px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-32 md:pt-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center justify-center mb-16 md:mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mb-4" }),
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap", children: [
          "FIELD NOTES ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " § X — EDITORIAL FROM THE EXPEDITION DESK ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " NEPAL HIMALAYA"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mt-4" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-[64px] md:text-[80px] lg:text-[112px] text-white leading-[1.05] text-center max-w-[22ch] mb-8", children: "Quiet dispatches from the mountain." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-24", children: "Field reports, route judgements, Sherpa notes, and Himalayan readings — written by the people who lead our expeditions, four times a year." }),
      /* @__PURE__ */ jsx("div", { className: "w-full border-t border-[#C8CDD2]/30 mb-20", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#C8CDD2]/30 border-b border-[#C8CDD2]/30", children: [
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "CADENCE ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " QUARTERLY"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "AUTHORS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " EXPEDITION DESK + FIELD TEAM"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "LANGUAGE ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " ENGLISH"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "READING TIME ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden lg:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "lg:hidden" }),
          " 6 — 12 MINUTES PER PIECE"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#newsletter",
          className: "border border-white/50 text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap",
          children: "RECEIVE FIELD NOTES →"
        }
      )
    ] })
  ] });
};
const CATEGORIES$1 = [
  {
    eyebrow: "CATEGORY I — THE APPROACH",
    title: "The Approach",
    desc: "Preparation, gear, training, and approach reading."
  },
  {
    eyebrow: "CATEGORY II — FIELD REPORTS",
    title: "Field Reports",
    desc: "Dispatches from Base Camp, route stages, and expedition rhythm."
  },
  {
    eyebrow: "CATEGORY III — SHERPA NOTES",
    title: "Sherpa Notes",
    desc: "Writings from senior Sirdars and climbing Sherpas, in their own words."
  },
  {
    eyebrow: "CATEGORY IV — ROUTE JUDGEMENT",
    title: "Route Judgement",
    desc: "Weather windows, summit decisions, and quiet calculations at altitude."
  },
  {
    eyebrow: "CATEGORY V — CULTURAL READINGS",
    title: "Cultural Readings",
    desc: "Himalayan regions, peoples, and the cultural ground of every expedition."
  },
  {
    eyebrow: "CATEGORY VI — LEGACY & ARCHIVE",
    title: "Legacy & Archive",
    desc: "Heritage pieces, archival notes, and house history."
  }
];
const FieldNotesCategories = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[100px] md:py-[120px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-16 md:mb-20 w-full", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8", children: "CATEGORIES — § I" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[40px] md:text-[52px] text-[#1A1A1A] leading-[1.1] text-center max-w-[28ch]", children: "Six readings of the Himalaya." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 border-t border-[#5A6673]/30", children: CATEGORIES$1.map((category, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex flex-col px-6 py-8 border-[#5A6673]/30 ${idx !== 0 ? "border-t md:border-t-0 md:border-l" : ""}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mb-6 min-h-[3em] lg:min-h-[4.5em]", children: category.eyebrow }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] mb-4", children: category.title }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#5A6673] leading-[1.5] flex-grow mb-8", children: category.desc }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] mt-auto", children: "[CLIENT TO CONFIRM] PIECES" })
        ]
      },
      idx
    )) })
  ] }) });
};
const STORIES = [
  {
    imageType: "TRAIL APPROACH — KHUMBU",
    eyebrow: "THE APPROACH · 8 MIN READ",
    title: "The Khumbu Approach",
    excerpt: "A walk-in is never only a walk-in. It is the first read of weather, of body, of crew, and of how the mountain is breathing this season. Notes from our spring approach to Everest Base Camp.",
    byline: "EXPEDITION DESK · KATHMANDU"
  },
  {
    imageType: "SHERPA AT WORK — ROUTE PREP",
    eyebrow: "SHERPA NOTES · 9 MIN READ",
    title: "Sherpa Route Judgement",
    excerpt: "The quiet calculations that decide whether a day is a climbing day. From senior Sirdars whose judgement has been earned across decades of seasons. A field reading on how decisions are made at altitude.",
    byline: "SIRDAR NOTES · FIELD TEAM"
  },
  {
    imageType: "WEATHERED MAP — FORECAST DESK",
    eyebrow: "ROUTE JUDGEMENT · 6 MIN READ",
    title: "Weather Windows",
    excerpt: "Reading the Himalaya in hours, not days. Why patience is the most undervalued piece of equipment we carry. From our forecast desk and senior expedition staff.",
    byline: "FORECAST DESK · KATHMANDU"
  }
];
const FieldNotesFeaturedStories = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-24 md:mb-32", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8", children: "FEATURED — § II" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6", children: "Three stories, read first." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]", children: "Recent dispatches from the expedition desk and field team." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full grid grid-cols-1 lg:grid-cols-3 gap-8", children: STORIES.map((story, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col border-y border-[#5A6673]/30 px-6 py-8",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[4/5] border border-[#5A6673] flex flex-col items-center justify-center p-4 mb-8", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2", children: "[IMAGE PLACEHOLDER]" }),
            /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60", children: [
              "[",
              story.imageType,
              "]"
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-4 block", children: story.eyebrow }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[24px] md:text-[28px] text-white leading-[1.2] mb-6", children: story.title }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] flex-grow mb-10", children: story.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-t border-[#5A6673]/30 pt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]", children: story.byline }),
            /* @__PURE__ */ jsx(Link, { to: "#", className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] hover:text-white transition-colors", children: "READ THE PIECE →" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full flex justify-end mt-4", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] opacity-40", children: "[DUMMY CONTENT]" }) })
        ]
      },
      idx
    )) })
  ] }) });
};
const DUMMY_STORIES = [
  { ref: "FN.01", cat: "THE APPROACH", date: "Spring 2025", title: "The Khumbu Approach", excerpt: "A walk-in is never only a walk-in. It is the first read of weather...", byline: "Expedition Desk · Kathmandu", time: "8 MIN" },
  { ref: "FN.02", cat: "SHERPA NOTES", date: "Spring 2025", title: "Sherpa Route Judgement", excerpt: "The quiet calculations that decide whether a day is a climbing day.", byline: "Sirdar Notes · Field Team", time: "9 MIN" },
  { ref: "FN.03", cat: "ROUTE JUDGEMENT", date: "Spring 2025", title: "Weather Windows", excerpt: "Reading the Himalaya in hours, not days. Why patience is the most undervalued...", byline: "Forecast Desk · Kathmandu", time: "6 MIN" },
  { ref: "FN.04", cat: "FIELD REPORTS", date: "Autumn 2024", title: "A Manaslu Autumn", excerpt: "Dispatch from Camp II on the mountain's quietest season in a decade.", byline: "Field Team · Manaslu", time: "11 MIN" },
  { ref: "FN.05", cat: "THE APPROACH", date: "Autumn 2024", title: "On Pace and Acclimatisation", excerpt: "Why speed is a liability in the early weeks of an 8,000m expedition.", byline: "Expedition Desk · Kathmandu", time: "7 MIN" },
  { ref: "FN.06", cat: "CULTURAL READINGS", date: "Spring 2024", title: "Notes from a Tengboche Morning", excerpt: "The monastery is more than a waypoint. It is the cultural ground we walk on.", byline: "Cultural Notes · Khumbu", time: "5 MIN" },
  { ref: "FN.07", cat: "LEGACY & ARCHIVE", date: "Spring 2024", title: "On Continuity — Forty Years in the Khumbu", excerpt: "How relationships built in the 1980s still define our logistics today.", byline: "The Chairman", time: "12 MIN" },
  { ref: "FN.08", cat: "ROUTE JUDGEMENT", date: "Autumn 2023", title: "The Cost of Pushing On", excerpt: "When the summit window closes, the hardest decision is the only right one.", byline: "Senior Sirdar · Field Notes", time: "9 MIN" }
];
const FieldNotesAllStories = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[140px] md:py-[180px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 mb-16 md:mb-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8", children: "ALL STORIES — § III" }),
        /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch]", children: "The archive." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-7 flex flex-col justify-end", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[56ch] md:pb-4", children: "Every Field Notes piece, from the expedition desk and the field. Filtered by category, sorted by most recent." }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col md:flex-row justify-between border-y border-[#5A6673]/30 py-4 mb-16 gap-4 md:gap-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#5A6673]/30 flex-grow max-w-[800px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "py-2 md:py-0 md:pr-8 flex items-center cursor-pointer group", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-colors", children: [
            "FILTER BY CATEGORY ",
            /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
            " ALL CATEGORIES"
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 ml-2 text-[#5A6673]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", d: "M19 9l-7 7-7-7" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-2 md:py-0 md:px-8 flex items-center cursor-pointer group", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-colors", children: [
            "SORT BY ",
            /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
            " MOST RECENT"
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 ml-2 text-[#5A6673]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", d: "M19 9l-7 7-7-7" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-2 md:py-0 md:px-8 flex items-center cursor-pointer group", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-colors", children: [
            "READING TIME ",
            /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
            " ANY LENGTH"
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 ml-2 text-[#5A6673]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "square", strokeLinejoin: "miter", strokeWidth: "1", d: "M19 9l-7 7-7-7" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center pt-2 md:pt-0 border-t md:border-t-0 border-[#5A6673]/30 md:border-transparent cursor-pointer hover:opacity-70 transition-opacity", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77]", children: "RESET →" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col border-t border-[#5A6673]/30 mb-20", children: DUMMY_STORIES.map((story, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 py-[50px] md:py-[70px] border-b border-[#5A6673]/30 relative",
        children: [
          /* @__PURE__ */ jsx("div", { className: "md:col-span-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77]", children: story.ref }) }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-2", children: story.cat }),
            /* @__PURE__ */ jsx("span", { className: "font-['Radley'] font-light text-[15px] text-[#1A1A1A]", children: story.date })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 flex flex-col md:px-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] max-w-[56ch] mb-4", children: story.title }),
            /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.5] max-w-[60ch] truncate", children: story.excerpt })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-2 flex items-start md:pt-1", children: /* @__PURE__ */ jsx("span", { className: "font-['Lexend'] font-light text-[14px] text-[#5A6673]", children: story.byline }) }),
          /* @__PURE__ */ jsx("div", { className: "md:col-span-1 flex justify-start md:justify-end md:pt-1", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]", children: story.time }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-4", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[8px] text-[#5A6673] opacity-30", children: "[DUMMY CONTENT]" }) })
        ]
      },
      idx
    )) }),
    /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] cursor-pointer hover:text-[#1A1A1A] transition-colors", children: "LOAD OLDER PIECES →" }) })
  ] }) });
};
const FieldNotesNewsletterSignUp = () => {
  return /* @__PURE__ */ jsx("section", { id: "newsletter", className: "bg-[#0A3A77] py-[160px] md:py-[200px] px-8 scroll-mt-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10", children: "RECEIVE FIELD NOTES — § IV — A QUARTERLY LETTER" }),
    /* @__PURE__ */ jsxs("h2", { className: "font-['Radley'] font-light text-[56px] md:text-[80px] text-white leading-[1.1] text-center max-w-[26ch] mb-8", children: [
      '"Receive Field Notes."',
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-[#C8CDD2]", children: "Four letters a year, quietly written." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-16", children: [
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch]", children: "A quiet quarterly letter from our expedition desk. Field reports, route judgements, Sherpa notes, and Himalayan readings — written by the people who lead our expeditions." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch]", children: "No marketing. No frequency beyond what is honest. Unsubscribe anytime." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[560px] flex flex-col md:flex-row mb-12", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-grow flex flex-col md:border-b md:border-white/30 md:mr-6 mb-6 md:mb-0", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          placeholder: "Your email address",
          className: "w-full bg-transparent border-b border-white/30 md:border-none py-4 text-white font-['Lexend'] text-[16px] placeholder:font-['Cormorant_Garamond'] placeholder:italic placeholder:text-[#C8CDD2]/50 focus:outline-none focus:border-white/60 transition-colors"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "md:border-l md:border-white/30 md:pl-6 flex items-center justify-center", children: /* @__PURE__ */ jsx("button", { className: "w-full md:w-auto border border-white/50 text-white px-8 py-4 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#0A3A77] transition-colors whitespace-nowrap", children: "SUBSCRIBE TO FIELD NOTES →" }) })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#C8CDD2] text-center mb-6", children: "BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2]/80 text-[16px] text-center max-w-[60ch]", children: "Our previous letters are not posted publicly. Subscribers receive the full archive on signup." })
  ] }) });
};
const FieldNotesClosing = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[160px] md:py-[200px] px-8 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10", children: "READ THE HOUSE — § V" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.05] text-center max-w-[24ch] mb-8", children: "When you are ready, the conversation is private." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-16", children: "Field Notes is read by the curious. The expedition desk is read by the prepared. When you are ready to begin a private conversation, a senior advisor will respond within 48 hours." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation",
          className: "w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap",
          children: "SCHEDULE A CONSULTATION →"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/atlas",
          className: "w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap",
          children: "EXPLORE THE ATLAS →"
        }
      )
    ] })
  ] }) });
};
const FieldNotes = UNSAFE_withComponentProps(function FieldNotes2() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-[#1A1A1A]",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsx(FieldNotesHero, {}), /* @__PURE__ */ jsx(FieldNotesCategories, {}), /* @__PURE__ */ jsx(FieldNotesFeaturedStories, {}), /* @__PURE__ */ jsx(FieldNotesAllStories, {}), /* @__PURE__ */ jsx(FieldNotesNewsletterSignUp, {}), /* @__PURE__ */ jsx(FieldNotesClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FieldNotes
}, Symbol.toStringTag, { value: "Module" }));
const FAQHero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[100px] md:py-[140px] px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-24 md:pt-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col items-center justify-center mb-16 md:mb-20", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mb-4" }),
        /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap", children: [
          "MAIN FAQ ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " § XI — 15 PRIORITY QUESTIONS ",
          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "·" }),
          " NEPAL HIMALAYA"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mt-4" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-['Radley'] font-light text-[64px] md:text-[88px] text-white leading-[1.05] text-center max-w-[22ch] mb-8", children: "Fifteen quiet answers." }),
      /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-20", children: "The questions our expedition desk is asked most often. Short, considered placeholders at this stage — full answers will be drafted with our senior staff." }),
      /* @__PURE__ */ jsx("div", { className: "w-full border-t border-[#C8CDD2]/30", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C8CDD2]/30 border-b border-[#C8CDD2]/30", children: [
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "QUESTIONS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden md:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
          " 15"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "CATEGORIES ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden md:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
          " 7"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-4 md:py-6 flex justify-center px-4", children: /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: [
          "STATUS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1 hidden md:inline", children: "·" }),
          /* @__PURE__ */ jsx("br", { className: "md:hidden" }),
          " PLACEHOLDER ANSWERS ",
          /* @__PURE__ */ jsx("span", { className: "mx-1", children: "·" }),
          " [DUMMY FAQ]"
        ] }) })
      ] }) })
    ] })
  ] });
};
const CATEGORIES = [
  { id: "#about", num: "CATEGORY I", label: "ABOUT", title: "About Thamserku", count: "3 QUESTIONS" },
  { id: "#planning", num: "CATEGORY II", label: "EXPEDITION PLANNING", title: "Choosing & Planning an Expedition", count: "1 QUESTION" },
  { id: "#everest", num: "CATEGORY III", label: "EVEREST & 8,000M", title: "Everest and 8,000m Preparation", count: "1 QUESTION" },
  { id: "#pathway", num: "CATEGORY IV", label: "7,000M PATHWAY", title: "Qualifying Ascents & Preparation", count: "2 QUESTIONS" },
  { id: "#editions", num: "CATEGORY V", label: "EDITIONS", title: "The Thamserku Editions", count: "4 QUESTIONS" },
  { id: "#yeti", num: "CATEGORY VI", label: "YETI INFRASTRUCTURE", title: "Operating Ecosystem & Support", count: "2 QUESTIONS" },
  { id: "#consultation", num: "CATEGORY VII", label: "CONSULTATION", title: "Booking & Consultation Process", count: "2 QUESTIONS" }
];
const FAQCategoryNavigation = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[80px] md:py-[100px] px-8 border-b border-[#5A6673]/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-16 md:mb-20", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-6", children: "JUMP TO A CATEGORY — § I" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[36px] md:text-[44px] text-[#1A1A1A] leading-[1.1] text-center max-w-[24ch]", children: "Seven categories of question." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 border-t border-[#5A6673]/30", children: CATEGORIES.map((cat, idx) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: cat.id,
        className: `flex flex-col px-5 py-6 border-[#5A6673]/30 hover:bg-black/5 transition-colors cursor-pointer ${idx !== 0 ? "border-t md:border-t-0 md:border-l" : ""}`,
        children: [
          /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mb-4 min-h-[3em]", children: [
            cat.num,
            " —",
            /* @__PURE__ */ jsx("br", {}),
            cat.label
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[18px] md:text-[22px] text-[#1A1A1A] leading-[1.2] mb-6 flex-grow", children: cat.title }),
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] mt-auto", children: cat.count })
        ]
      },
      idx
    )) })
  ] }) });
};
const FAQ_DATA = [
  {
    id: "about",
    numLabel: "CATEGORY I",
    label: "ABOUT",
    title: "About Thamserku.",
    subtitle: "Who we are, who leads us, and where we sit in the Yeti Group.",
    items: [
      {
        qNum: "Q.01",
        question: "What is Thamserku Expedition?",
        aNum: "A.01",
        answer: "Thamserku is a heritage Himalayan expedition house, founded in the late 1980s and continuing today under the Yeti Group. We climb five Himalayan mountains carefully — Everest, Manaslu, Dhaulagiri, Makalu, and Himchuli — across five editions: Alpine, Bespoke, Crafted, Definitive, and Explorer. [Placeholder answer — full text to be drafted with senior expedition staff.]",
        linkText: "READ THE LEGACY PAGE →",
        linkTo: "/legacy"
      },
      {
        qNum: "Q.02",
        question: "Is Thamserku Sherpa-led?",
        aNum: "A.02",
        answer: "Yes. Sherpa leadership is the knowledge base of our house, not a feature we add. Senior Sirdars and climbing Sherpas lead every expedition, and our senior team has been part of our house multi-generationally. [Placeholder answer — full text to be drafted with senior expedition staff.]",
        linkText: "READ THE LEGACY PAGE →",
        linkTo: "/legacy"
      },
      {
        qNum: "Q.03",
        question: "How is Thamserku connected to Yeti Group?",
        aNum: "A.03",
        answer: "Thamserku operates as part of the Yeti Group — the wider Nepali Himalayan group whose operating ecosystem (air support, mountain lodges, regional access, field continuity) supports every expedition we run. The relationship is one of stewardship rather than ownership. [Placeholder answer.]",
        linkText: "READ THE YETI INFRASTRUCTURE PAGE →",
        linkTo: "/yeti-infrastructure"
      }
    ]
  },
  {
    id: "planning",
    numLabel: "CATEGORY II",
    label: "EXPEDITION PLANNING",
    title: "Choosing & Planning an Expedition.",
    subtitle: "How to choose the right Himalayan expedition for your background.",
    items: [
      {
        qNum: "Q.04",
        question: "How do I choose the right Himalayan expedition?",
        aNum: "A.04",
        answer: "We recommend beginning with a private consultation. Our senior advisors listen to your background, your timing, and your intention — then recommend the mountain and edition that fit. The consultation is exploratory; nothing is sold during the call. [Placeholder answer.]",
        linkText: "EXPLORE THE EXPEDITION ATLAS →",
        linkTo: "/atlas"
      }
    ]
  },
  {
    id: "everest",
    numLabel: "CATEGORY III",
    label: "EVEREST & 8,000M",
    title: "Everest and 8,000m Preparation.",
    subtitle: "Preparation context for Everest and 8,000m climbs.",
    items: [
      {
        qNum: "Q.05",
        question: "What experience do I need before Everest?",
        aNum: "A.05",
        answer: "We typically recommend prior altitude experience above 6,000m or 7,000m before an Everest expedition. The 7,000m Qualifying Pathway page describes the considered preparation context. Specific recommendations depend on your background and are discussed in private consultation. [Placeholder answer.]",
        linkText: "READ THE EVEREST PAGE →",
        linkTo: "/everest"
      }
    ]
  },
  {
    id: "pathway",
    numLabel: "CATEGORY IV",
    label: "7,000M PATHWAY",
    title: "Qualifying Ascents & Preparation.",
    subtitle: "7,000m peaks as qualifying preparation ground.",
    items: [
      {
        qNum: "Q.06",
        question: "Do I need a 7,000m ascent before Everest?",
        aNum: "A.06",
        answer: "Not in every case. The right pathway depends on your background and the mountain you are preparing for. For many climbers, a 7,000m qualifying ascent is the most honest preparation. For climbers with strong existing altitude experience, a different path may be appropriate. [Placeholder answer.]",
        linkText: "READ THE 7,000M QUALIFYING PATHWAY →",
        linkTo: "/7000m"
      },
      {
        qNum: "Q.07",
        question: "What is the difference between an 8,000m expedition and a 7,000m qualifying ascent?",
        aNum: "A.07",
        answer: "An 8,000m expedition (Everest, Manaslu, Dhaulagiri, Makalu) is a flagship objective. A 7,000m qualifying ascent is the considered preparation peak — where altitude, judgement, and field discipline are properly earned before the larger objective. [Placeholder answer.]",
        linkText: "READ THE 7,000M QUALIFYING PATHWAY →",
        linkTo: "/7000m"
      }
    ]
  },
  {
    id: "editions",
    numLabel: "CATEGORY V",
    label: "EDITIONS",
    title: "The Thamserku Editions.",
    subtitle: "The five editions — Alpine, Bespoke, Crafted, Definitive, Explorer.",
    items: [
      {
        qNum: "Q.08",
        question: "What are the Thamserku Editions?",
        aNum: "A.08",
        answer: "The Thamserku Editions are five ways of reading the same mountain — not pricing tiers. From Alpine discipline to the Definitive private expedition, each edition is shaped around intent, privacy, and preparation. Specific recommendations come from a private consultation. [Placeholder answer.]",
        linkText: "READ THE EDITIONS PAGE →",
        linkTo: "/editions"
      },
      {
        qNum: "Q.09",
        question: "Which edition is best for a private expedition?",
        aNum: "A.09",
        answer: "The Crafted, Definitive, and Explorer editions are most often commissioned privately. The Definitive Edition is our most exclusive private expedition — with a private camp configuration, concierge planning, and maximum discretion. [Placeholder answer.]",
        linkText: "READ THE PRIVATE EXPEDITIONS PAGE →",
        linkTo: "/private"
      },
      {
        qNum: "Q.10",
        question: "What is the Definitive Edition?",
        aNum: "A.10",
        answer: "The most exclusive private Thamserku expedition. Built around a single climber, family, or principal. Private base camp, concierge planning, maximum contracted discretion, and the senior leadership of the house. Public attribution is by your written invitation only. [Placeholder answer.]",
        linkText: "READ THE EDITIONS PAGE →",
        linkTo: "/editions"
      },
      {
        qNum: "Q.11",
        question: "What is the Explorer Edition?",
        aNum: "A.11",
        answer: "The Explorer Edition is for the Himalayas beyond the summit — cultural journeys, base-camp experiences, photographic expeditions, and non-climbing readings of the mountains we climb on other editions. Available privately or as part of curated journeys. [Placeholder answer.]",
        linkText: "READ THE EDITIONS PAGE →",
        linkTo: "/editions"
      }
    ]
  },
  {
    id: "yeti",
    numLabel: "CATEGORY VI",
    label: "YETI INFRASTRUCTURE",
    title: "Operating Ecosystem & Support.",
    subtitle: "The Yeti operating ecosystem behind every expedition.",
    items: [
      {
        qNum: "Q.12",
        question: "What is the Yeti Infrastructure?",
        aNum: "A.12",
        answer: "The operating ecosystem of the Yeti Group that supports every Thamserku expedition — air support, mountain lodges, regional access, and field continuity. It is not a marketing partnership; it is the operational fabric the group has maintained in Nepal for decades. [Placeholder answer.]",
        linkText: "READ THE YETI INFRASTRUCTURE PAGE →",
        linkTo: "/yeti-infrastructure"
      },
      {
        qNum: "Q.13",
        question: "How does Yeti Infrastructure support expedition safety and coordination?",
        aNum: "A.13",
        answer: "Helicopter access and rescue coordination, operational lodges along approach routes, regional permits and partnerships, and a multi-generational field team — all working continuously, not only during a season. Field continuity is the deepest layer of expedition safety. [Placeholder answer.]",
        linkText: "READ THE YETI INFRASTRUCTURE PAGE →",
        linkTo: "/yeti-infrastructure"
      }
    ]
  },
  {
    id: "consultation",
    numLabel: "CATEGORY VII",
    label: "CONSULTATION",
    title: "Booking & Consultation Process.",
    subtitle: "How a private consultation begins and runs.",
    items: [
      {
        qNum: "Q.14",
        question: "Can assistants or family offices schedule consultations?",
        aNum: "A.14",
        answer: "Yes. We regularly work with family offices, chiefs-of-staff, and executive assistants planning expeditions on behalf of principals. The consultation is handled with the same discretion that defines the rest of your engagements. [Placeholder answer.]",
        linkText: "READ THE PRIVATE EXPEDITIONS PAGE →",
        linkTo: "/private"
      },
      {
        qNum: "Q.15",
        question: "What happens during a Thamserku consultation?",
        aNum: "A.15",
        answer: "A 45-minute private conversation by video, phone, or WhatsApp. A senior advisor listens to your background, timing, and intention before recommending a mountain and edition. The consultation is exploratory — nothing is sold during the call. A tailored proposal follows only if direction is set. [Placeholder answer.]",
        linkText: "SCHEDULE A CONSULTATION →",
        linkTo: "/consultation"
      }
    ]
  }
];
const FAQList = () => {
  const [openStates, setOpenStates] = useState({});
  const toggleFaq = (key) => {
    setOpenStates((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0 pointer-events-none opacity-[0.03]",
        style: {
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[880px] mx-auto flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center mb-16 md:mb-24", children: /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]", children: "FIFTEEN QUIET ANSWERS" }) }),
      FAQ_DATA.map((category, catIdx) => /* @__PURE__ */ jsxs("div", { id: category.id, className: "w-full flex flex-col scroll-mt-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col mb-[80px] md:mb-[100px]", children: [
          /* @__PURE__ */ jsx("div", { className: "h-[1px] w-full bg-[#C8CDD2]/30 mb-8" }),
          /* @__PURE__ */ jsxs("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6", children: [
            category.numLabel,
            " — ",
            category.label
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[32px] md:text-[40px] text-white leading-[1.1] max-w-[24ch] mb-4", children: category.title }),
          /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[18px] max-w-[56ch]", children: category.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex flex-col mb-16 md:mb-24", children: category.items.map((item, itemIdx) => {
          const key = `${catIdx}-${itemIdx}`;
          const isOpen = !!openStates[key];
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex flex-col border-b border-[#5A6673]/30 last:border-b-0",
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => toggleFaq(key),
                    className: "flex flex-row items-center justify-between w-full py-[32px] md:py-[40px] text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8CDD2]",
                    "aria-expanded": isOpen,
                    "aria-controls": `faq-answer-main-${key}`,
                    id: `faq-question-main-${key}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 flex-1 pr-8", children: [
                        /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] shrink-0 mt-2", children: item.qNum }),
                        /* @__PURE__ */ jsx("h4", { className: "font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-[1.3] group-hover:text-white transition-colors max-w-[60ch]", children: item.question })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: `font-['JetBrains_Mono'] text-[14px] text-[#C8CDD2] group-hover:text-white transition-all duration-[250ms] ease-out transform ${isOpen ? "rotate-180" : "rotate-0"}`,
                          children: "▾"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    id: `faq-answer-main-${key}`,
                    role: "region",
                    "aria-labelledby": `faq-question-main-${key}`,
                    className: "grid transition-all duration-[250ms] ease-out",
                    style: { gridTemplateRows: isOpen ? "1fr" : "0fr" },
                    children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 pb-[32px] md:pb-[40px]", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] shrink-0 mt-1 hidden md:block", children: item.aNum }),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col max-w-[60ch]", children: [
                        /* @__PURE__ */ jsxs("p", { className: "font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] mb-8", children: [
                          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mr-2", children: "[DUMMY FAQ]" }),
                          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mr-4 md:hidden", children: item.aNum }),
                          item.answer
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(Link, { to: item.linkTo, className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] hover:text-white transition-colors", children: item.linkText }) })
                      ] })
                    ] }) })
                  }
                )
              ]
            },
            itemIdx
          );
        }) })
      ] }, catIdx)),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center pt-8 border-t border-[#C8CDD2]/30", children: /* @__PURE__ */ jsx("p", { className: "font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] text-center max-w-[60ch]", children: "Placeholder answers at this stage. Full Q&A content will be drafted by our senior expedition desk before publication." }) })
    ] })
  ] });
};
const RELATED_PAGES = [
  {
    eyebrow: "RELATED PAGE — ABOUT",
    title: "Legacy & History",
    desc: "The story of the house, in continuity since 1987.",
    linkText: "READ THE LEGACY PAGE →",
    linkTo: "/legacy"
  },
  {
    eyebrow: "RELATED PAGE — EXPEDITIONS",
    title: "Expedition Atlas",
    desc: "The five mountains we climb.",
    linkText: "EXPLORE THE ATLAS →",
    linkTo: "/atlas"
  },
  {
    eyebrow: "RELATED PAGE — EDITIONS",
    title: "Editions",
    desc: "Five ways of reading the same mountain.",
    linkText: "READ THE EDITIONS PAGE →",
    linkTo: "/editions"
  },
  {
    eyebrow: "RELATED PAGE — INFRASTRUCTURE",
    title: "Yeti Infrastructure",
    desc: "The operating ecosystem behind every expedition.",
    linkText: "READ THE YETI INFRASTRUCTURE PAGE →",
    linkTo: "/yeti-infrastructure"
  },
  {
    eyebrow: "RELATED PAGE — PATHWAY",
    title: "7,000m Qualifying Pathway",
    desc: "Considered preparation for 8,000m objectives.",
    linkText: "READ THE PATHWAY →",
    linkTo: "/7000m"
  },
  {
    eyebrow: "RELATED PAGE — PRIVATE",
    title: "Private Expeditions",
    desc: "UHNI, family office, and principal expeditions.",
    linkText: "READ THE PRIVATE EXPEDITIONS PAGE →",
    linkTo: "/private"
  },
  {
    eyebrow: "RELATED PAGE — CONSULTATION",
    title: "Schedule a Consultation",
    desc: "Begin a private conversation with the expedition desk.",
    linkText: "SCHEDULE A CONSULTATION →",
    linkTo: "/consultation"
  }
];
const FAQRelatedPages = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#F4F2EC] py-[100px] md:py-[120px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1320px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-16 md:mb-20", children: [
      /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-6", children: "READ THE PAGES — § II" }),
      /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[36px] md:text-[48px] text-[#1A1A1A] leading-[1.1] text-center max-w-[28ch]", children: "Each question links to a page." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#5A6673]/30", children: RELATED_PAGES.map((page, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex flex-col px-6 py-8 border-[#5A6673]/30 ${idx !== 0 ? "border-t md:border-t-0 md:border-l" : ""} ${idx >= 4 ? "lg:border-t" : ""} ${idx === 4 ? "lg:border-l-0" : ""}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mb-6 min-h-[3em]", children: page.eyebrow }),
          /* @__PURE__ */ jsx("h3", { className: "font-['Radley'] font-light text-[20px] md:text-[24px] text-[#1A1A1A] leading-[1.2] mb-4", children: page.title }),
          /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[14px] text-[#5A6673] leading-[1.5] mb-8 flex-grow", children: page.desc }),
          /* @__PURE__ */ jsx(Link, { to: page.linkTo, className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] mt-auto hover:text-[#1A1A1A] transition-colors", children: page.linkText })
        ]
      },
      idx
    )) })
  ] }) });
};
const FAQNewsletterBanner = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#1A1A1A] py-[120px] md:py-[160px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8", children: "FIELD NOTES — NEWSLETTER" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[40px] md:text-[52px] text-white leading-[1.1] text-center max-w-[26ch] mb-6", children: "Receive Field Notes from the expedition desk." }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.7] text-center max-w-[60ch] mb-12", children: "A quiet quarterly letter — field reports, route judgements, Sherpa notes, and Himalayan readings. No marketing. Unsubscribe anytime." }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[560px] flex flex-col md:flex-row mb-10", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-grow flex flex-col md:border-b md:border-[#C8CDD2]/30 md:mr-6 mb-6 md:mb-0", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          placeholder: "Your email address",
          className: "w-full bg-transparent border-b border-[#C8CDD2]/30 md:border-none py-4 text-white font-['Lexend'] text-[16px] placeholder:font-['Cormorant_Garamond'] placeholder:italic placeholder:text-[#C8CDD2]/50 focus:outline-none focus:border-white/60 transition-colors"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "md:border-l md:border-[#C8CDD2]/30 md:pl-6 flex items-center justify-center", children: /* @__PURE__ */ jsx("button", { className: "w-full md:w-auto border border-[#C8CDD2]/50 text-white px-8 py-4 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap", children: "SUBSCRIBE →" }) })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#C8CDD2] text-center mb-6", children: "BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS." }),
    /* @__PURE__ */ jsxs("p", { className: "font-['Cormorant_Garamond'] italic text-[#5A6673] text-[14px] text-center max-w-[60ch]", children: [
      "Or read all our editorial pieces in the Field Notes section —",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/field-notes", className: "hover:text-[#C8CDD2] transition-colors whitespace-nowrap", children: "→ READ FIELD NOTES" })
    ] })
  ] }) });
};
const FAQClosing = () => {
  return /* @__PURE__ */ jsx("section", { className: "bg-[#0A3A77] py-[160px] md:py-[200px] px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[880px] mx-auto flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10", children: "BEGIN PRIVATELY — § III" }),
    /* @__PURE__ */ jsx("h2", { className: "font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.1] text-center max-w-[26ch] mb-8", children: "Your question is not on this page?" }),
    /* @__PURE__ */ jsx("p", { className: "font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-16", children: "Write to the expedition desk. A senior advisor will respond personally — quietly, and within 48 hours — and the conversation begins." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center mb-16", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/consultation",
          className: "w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#0A3A77] transition-colors whitespace-nowrap",
          children: "SCHEDULE A CONSULTATION →"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/atlas",
          className: "w-full sm:w-auto border border-white/50 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap",
          children: "EXPLORE THE ATLAS →"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("span", { className: "font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center", children: "ALL ENQUIRIES ARE HANDLED DISCREETLY BY SENIOR EXPEDITION STAFF." })
  ] }) });
};
const MainFAQ = UNSAFE_withComponentProps(function MainFAQ2() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-[#1A1A1A]",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsx(FAQHero, {}), /* @__PURE__ */ jsx(FAQCategoryNavigation, {}), /* @__PURE__ */ jsx(FAQList, {}), /* @__PURE__ */ jsx(FAQRelatedPages, {}), /* @__PURE__ */ jsx(FAQNewsletterBanner, {}), /* @__PURE__ */ jsx(FAQClosing, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MainFAQ
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-aR5omASP.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-DlOtFGHp.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/x-D5S7rJ5i.js", "/assets/arrow-right-CELJmarN.js"], "css": ["/assets/root-CaQE96AK.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/Home": { "id": "app/pages/Home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/Home-J-FAFGN5.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/ImageWithFallback-vyu9qACq.js", "/assets/move-right-CZvfNjiM.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/Everest": { "id": "app/pages/Everest", "parentId": "root", "path": "everest", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/Everest-D_7_7vl1.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/arrow-right-CELJmarN.js", "/assets/x-D5S7rJ5i.js", "/assets/move-right-CZvfNjiM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/AtlasPage": { "id": "app/pages/AtlasPage", "parentId": "root", "path": "atlas", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/AtlasPage-B9GTjBl9.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/chevron-down-C_ySuRmZ.js", "/assets/move-right-CZvfNjiM.js", "/assets/ImageWithFallback-vyu9qACq.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/EditionsPage": { "id": "app/pages/EditionsPage", "parentId": "root", "path": "editions", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/EditionsPage-CdBKdxzM.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/LegacyPage": { "id": "app/pages/LegacyPage", "parentId": "root", "path": "legacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/LegacyPage-Bf5pWslO.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/TeamPage": { "id": "app/pages/TeamPage", "parentId": "root", "path": "team", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/TeamPage-BQn9DFnA.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/EnquiryPage": { "id": "app/pages/EnquiryPage", "parentId": "root", "path": "consultation", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/EnquiryPage-NlNSNfQa.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/ImageWithFallback-vyu9qACq.js", "/assets/chevron-down-C_ySuRmZ.js", "/assets/x-D5S7rJ5i.js", "/assets/arrow-right-CELJmarN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/ExpeditionArchive": { "id": "app/pages/ExpeditionArchive", "parentId": "root", "path": "archive", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/ExpeditionArchive-BCtW48Q4.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/YetiInfrastructure": { "id": "app/pages/YetiInfrastructure", "parentId": "root", "path": "yeti-infrastructure", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/YetiInfrastructure-CwvdcoZO.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/SevenThousandMeterPathway": { "id": "app/pages/SevenThousandMeterPathway", "parentId": "root", "path": "7000m", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/SevenThousandMeterPathway-DeLL5gM0.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/PrivateExpeditions": { "id": "app/pages/PrivateExpeditions", "parentId": "root", "path": "private", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/PrivateExpeditions-D_FtMts0.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/FieldNotes": { "id": "app/pages/FieldNotes", "parentId": "root", "path": "field-notes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/FieldNotes-u6-mTbYS.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "app/pages/MainFAQ": { "id": "app/pages/MainFAQ", "parentId": "root", "path": "faq", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/MainFAQ-CYWn081K.js", "imports": ["/assets/chunk-4N6VE7H7-BsUNPCpb.js", "/assets/Footer-CCMXc-zB.js", "/assets/x-D5S7rJ5i.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-c413fc44.js", "version": "c413fc44", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "v8_passThroughRequests": false, "unstable_trailingSlashAwareDataRequests": false, "unstable_previewServerPrerendering": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "app/pages/Home": {
    id: "app/pages/Home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "app/pages/Everest": {
    id: "app/pages/Everest",
    parentId: "root",
    path: "everest",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "app/pages/AtlasPage": {
    id: "app/pages/AtlasPage",
    parentId: "root",
    path: "atlas",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "app/pages/EditionsPage": {
    id: "app/pages/EditionsPage",
    parentId: "root",
    path: "editions",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "app/pages/LegacyPage": {
    id: "app/pages/LegacyPage",
    parentId: "root",
    path: "legacy",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "app/pages/TeamPage": {
    id: "app/pages/TeamPage",
    parentId: "root",
    path: "team",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "app/pages/EnquiryPage": {
    id: "app/pages/EnquiryPage",
    parentId: "root",
    path: "consultation",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "app/pages/ExpeditionArchive": {
    id: "app/pages/ExpeditionArchive",
    parentId: "root",
    path: "archive",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "app/pages/YetiInfrastructure": {
    id: "app/pages/YetiInfrastructure",
    parentId: "root",
    path: "yeti-infrastructure",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "app/pages/SevenThousandMeterPathway": {
    id: "app/pages/SevenThousandMeterPathway",
    parentId: "root",
    path: "7000m",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "app/pages/PrivateExpeditions": {
    id: "app/pages/PrivateExpeditions",
    parentId: "root",
    path: "private",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "app/pages/FieldNotes": {
    id: "app/pages/FieldNotes",
    parentId: "root",
    path: "field-notes",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "app/pages/MainFAQ": {
    id: "app/pages/MainFAQ",
    parentId: "root",
    path: "faq",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
