#!/usr/bin/env node
(() => {
  "use strict";
  var __webpack_modules__ = {
    4277: module => {
      module.exports = ({onlyFirst = !1} = {}) => {
        const pattern = [ "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))" ].join("|");
        return new RegExp(pattern, onlyFirst ? void 0 : "g");
      };
    },
    6434: (module, __unused_webpack_exports, __webpack_require__) => {
      const wrapAnsi16 = (fn, offset) => (...args) => `[${fn(...args) + offset}m`, wrapAnsi256 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `[${38 + offset};5;${code}m`;
      }, wrapAnsi16m = (fn, offset) => (...args) => {
        const rgb = fn(...args);
        return `[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
      }, ansi2ansi = n => n, rgb2rgb = (r, g, b) => [ r, g, b ], setLazyProperty = (object, property, get) => {
        Object.defineProperty(object, property, {
          get: () => {
            const value = get();
            return Object.defineProperty(object, property, {
              value,
              enumerable: !0,
              configurable: !0
            }), value;
          },
          enumerable: !0,
          configurable: !0
        });
      };
      let colorConvert;
      const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
        void 0 === colorConvert && (colorConvert = __webpack_require__(9843));
        const offset = isBackground ? 10 : 0, styles = {};
        for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
          const name = "ansi16" === sourceSpace ? "ansi" : sourceSpace;
          sourceSpace === targetSpace ? styles[name] = wrap(identity, offset) : "object" == typeof suite && (styles[name] = wrap(suite[targetSpace], offset));
        }
        return styles;
      };
      module.exports = function() {
        const codes = new Map, styles = {
          modifier: {
            reset: [ 0, 0 ],
            bold: [ 1, 22 ],
            dim: [ 2, 22 ],
            italic: [ 3, 23 ],
            underline: [ 4, 24 ],
            inverse: [ 7, 27 ],
            hidden: [ 8, 28 ],
            strikethrough: [ 9, 29 ]
          },
          color: {
            black: [ 30, 39 ],
            red: [ 31, 39 ],
            green: [ 32, 39 ],
            yellow: [ 33, 39 ],
            blue: [ 34, 39 ],
            magenta: [ 35, 39 ],
            cyan: [ 36, 39 ],
            white: [ 37, 39 ],
            blackBright: [ 90, 39 ],
            redBright: [ 91, 39 ],
            greenBright: [ 92, 39 ],
            yellowBright: [ 93, 39 ],
            blueBright: [ 94, 39 ],
            magentaBright: [ 95, 39 ],
            cyanBright: [ 96, 39 ],
            whiteBright: [ 97, 39 ]
          },
          bgColor: {
            bgBlack: [ 40, 49 ],
            bgRed: [ 41, 49 ],
            bgGreen: [ 42, 49 ],
            bgYellow: [ 43, 49 ],
            bgBlue: [ 44, 49 ],
            bgMagenta: [ 45, 49 ],
            bgCyan: [ 46, 49 ],
            bgWhite: [ 47, 49 ],
            bgBlackBright: [ 100, 49 ],
            bgRedBright: [ 101, 49 ],
            bgGreenBright: [ 102, 49 ],
            bgYellowBright: [ 103, 49 ],
            bgBlueBright: [ 104, 49 ],
            bgMagentaBright: [ 105, 49 ],
            bgCyanBright: [ 106, 49 ],
            bgWhiteBright: [ 107, 49 ]
          }
        };
        styles.color.gray = styles.color.blackBright, styles.bgColor.bgGray = styles.bgColor.bgBlackBright, 
        styles.color.grey = styles.color.blackBright, styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
        for (const [groupName, group] of Object.entries(styles)) {
          for (const [styleName, style] of Object.entries(group)) styles[styleName] = {
            open: `[${style[0]}m`,
            close: `[${style[1]}m`
          }, group[styleName] = styles[styleName], codes.set(style[0], style[1]);
          Object.defineProperty(styles, groupName, {
            value: group,
            enumerable: !1
          });
        }
        return Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: !1
        }), styles.color.close = "[39m", styles.bgColor.close = "[49m", setLazyProperty(styles.color, "ansi", (() => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, !1))), 
        setLazyProperty(styles.color, "ansi256", (() => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, !1))), 
        setLazyProperty(styles.color, "ansi16m", (() => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, !1))), 
        setLazyProperty(styles.bgColor, "ansi", (() => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, !0))), 
        setLazyProperty(styles.bgColor, "ansi256", (() => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, !0))), 
        setLazyProperty(styles.bgColor, "ansi16m", (() => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, !0))), 
        styles;
      }();
    },
    4985: (module, __unused_webpack_exports, __webpack_require__) => {
      const cssKeywords = __webpack_require__(8874), reverseKeywords = {};
      for (const key of Object.keys(cssKeywords)) reverseKeywords[cssKeywords[key]] = key;
      const convert = {
        rgb: {
          channels: 3,
          labels: "rgb"
        },
        hsl: {
          channels: 3,
          labels: "hsl"
        },
        hsv: {
          channels: 3,
          labels: "hsv"
        },
        hwb: {
          channels: 3,
          labels: "hwb"
        },
        cmyk: {
          channels: 4,
          labels: "cmyk"
        },
        xyz: {
          channels: 3,
          labels: "xyz"
        },
        lab: {
          channels: 3,
          labels: "lab"
        },
        lch: {
          channels: 3,
          labels: "lch"
        },
        hex: {
          channels: 1,
          labels: [ "hex" ]
        },
        keyword: {
          channels: 1,
          labels: [ "keyword" ]
        },
        ansi16: {
          channels: 1,
          labels: [ "ansi16" ]
        },
        ansi256: {
          channels: 1,
          labels: [ "ansi256" ]
        },
        hcg: {
          channels: 3,
          labels: [ "h", "c", "g" ]
        },
        apple: {
          channels: 3,
          labels: [ "r16", "g16", "b16" ]
        },
        gray: {
          channels: 1,
          labels: [ "gray" ]
        }
      };
      module.exports = convert;
      for (const model of Object.keys(convert)) {
        if (!("channels" in convert[model])) throw new Error("missing channels property: " + model);
        if (!("labels" in convert[model])) throw new Error("missing channel labels property: " + model);
        if (convert[model].labels.length !== convert[model].channels) throw new Error("channel and label counts mismatch: " + model);
        const {channels, labels} = convert[model];
        delete convert[model].channels, delete convert[model].labels, Object.defineProperty(convert[model], "channels", {
          value: channels
        }), Object.defineProperty(convert[model], "labels", {
          value: labels
        });
      }
      convert.rgb.hsl = function(rgb) {
        const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min;
        let h, s;
        max === min ? h = 0 : r === max ? h = (g - b) / delta : g === max ? h = 2 + (b - r) / delta : b === max && (h = 4 + (r - g) / delta), 
        h = Math.min(60 * h, 360), h < 0 && (h += 360);
        const l = (min + max) / 2;
        return s = max === min ? 0 : l <= .5 ? delta / (max + min) : delta / (2 - max - min), 
        [ h, 100 * s, 100 * l ];
      }, convert.rgb.hsv = function(rgb) {
        let rdif, gdif, bdif, h, s;
        const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, v = Math.max(r, g, b), diff = v - Math.min(r, g, b), diffc = function(c) {
          return (v - c) / 6 / diff + .5;
        };
        return 0 === diff ? (h = 0, s = 0) : (s = diff / v, rdif = diffc(r), gdif = diffc(g), 
        bdif = diffc(b), r === v ? h = bdif - gdif : g === v ? h = 1 / 3 + rdif - bdif : b === v && (h = 2 / 3 + gdif - rdif), 
        h < 0 ? h += 1 : h > 1 && (h -= 1)), [ 360 * h, 100 * s, 100 * v ];
      }, convert.rgb.hwb = function(rgb) {
        const r = rgb[0], g = rgb[1];
        let b = rgb[2];
        const h = convert.rgb.hsl(rgb)[0], w = 1 / 255 * Math.min(r, Math.min(g, b));
        return b = 1 - 1 / 255 * Math.max(r, Math.max(g, b)), [ h, 100 * w, 100 * b ];
      }, convert.rgb.cmyk = function(rgb) {
        const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, k = Math.min(1 - r, 1 - g, 1 - b);
        return [ 100 * ((1 - r - k) / (1 - k) || 0), 100 * ((1 - g - k) / (1 - k) || 0), 100 * ((1 - b - k) / (1 - k) || 0), 100 * k ];
      }, convert.rgb.keyword = function(rgb) {
        const reversed = reverseKeywords[rgb];
        if (reversed) return reversed;
        let currentClosestKeyword, currentClosestDistance = 1 / 0;
        for (const keyword of Object.keys(cssKeywords)) {
          const value = cssKeywords[keyword], distance = (y = value, ((x = rgb)[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2);
          distance < currentClosestDistance && (currentClosestDistance = distance, currentClosestKeyword = keyword);
        }
        var x, y;
        return currentClosestKeyword;
      }, convert.keyword.rgb = function(keyword) {
        return cssKeywords[keyword];
      }, convert.rgb.xyz = function(rgb) {
        let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
        r = r > .04045 ? ((r + .055) / 1.055) ** 2.4 : r / 12.92, g = g > .04045 ? ((g + .055) / 1.055) ** 2.4 : g / 12.92, 
        b = b > .04045 ? ((b + .055) / 1.055) ** 2.4 : b / 12.92;
        return [ 100 * (.4124 * r + .3576 * g + .1805 * b), 100 * (.2126 * r + .7152 * g + .0722 * b), 100 * (.0193 * r + .1192 * g + .9505 * b) ];
      }, convert.rgb.lab = function(rgb) {
        const xyz = convert.rgb.xyz(rgb);
        let x = xyz[0], y = xyz[1], z = xyz[2];
        x /= 95.047, y /= 100, z /= 108.883, x = x > .008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116, 
        y = y > .008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116, z = z > .008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        return [ 116 * y - 16, 500 * (x - y), 200 * (y - z) ];
      }, convert.hsl.rgb = function(hsl) {
        const h = hsl[0] / 360, s = hsl[1] / 100, l = hsl[2] / 100;
        let t2, t3, val;
        if (0 === s) return val = 255 * l, [ val, val, val ];
        t2 = l < .5 ? l * (1 + s) : l + s - l * s;
        const t1 = 2 * l - t2, rgb = [ 0, 0, 0 ];
        for (let i = 0; i < 3; i++) t3 = h + 1 / 3 * -(i - 1), t3 < 0 && t3++, t3 > 1 && t3--, 
        val = 6 * t3 < 1 ? t1 + 6 * (t2 - t1) * t3 : 2 * t3 < 1 ? t2 : 3 * t3 < 2 ? t1 + (t2 - t1) * (2 / 3 - t3) * 6 : t1, 
        rgb[i] = 255 * val;
        return rgb;
      }, convert.hsl.hsv = function(hsl) {
        const h = hsl[0];
        let s = hsl[1] / 100, l = hsl[2] / 100, smin = s;
        const lmin = Math.max(l, .01);
        l *= 2, s *= l <= 1 ? l : 2 - l, smin *= lmin <= 1 ? lmin : 2 - lmin;
        return [ h, 100 * (0 === l ? 2 * smin / (lmin + smin) : 2 * s / (l + s)), 100 * ((l + s) / 2) ];
      }, convert.hsv.rgb = function(hsv) {
        const h = hsv[0] / 60, s = hsv[1] / 100;
        let v = hsv[2] / 100;
        const hi = Math.floor(h) % 6, f = h - Math.floor(h), p = 255 * v * (1 - s), q = 255 * v * (1 - s * f), t = 255 * v * (1 - s * (1 - f));
        switch (v *= 255, hi) {
         case 0:
          return [ v, t, p ];

         case 1:
          return [ q, v, p ];

         case 2:
          return [ p, v, t ];

         case 3:
          return [ p, q, v ];

         case 4:
          return [ t, p, v ];

         case 5:
          return [ v, p, q ];
        }
      }, convert.hsv.hsl = function(hsv) {
        const h = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100, vmin = Math.max(v, .01);
        let sl, l;
        l = (2 - s) * v;
        const lmin = (2 - s) * vmin;
        return sl = s * vmin, sl /= lmin <= 1 ? lmin : 2 - lmin, sl = sl || 0, l /= 2, [ h, 100 * sl, 100 * l ];
      }, convert.hwb.rgb = function(hwb) {
        const h = hwb[0] / 360;
        let wh = hwb[1] / 100, bl = hwb[2] / 100;
        const ratio = wh + bl;
        let f;
        ratio > 1 && (wh /= ratio, bl /= ratio);
        const i = Math.floor(6 * h), v = 1 - bl;
        f = 6 * h - i, 0 != (1 & i) && (f = 1 - f);
        const n = wh + f * (v - wh);
        let r, g, b;
        switch (i) {
         default:
         case 6:
         case 0:
          r = v, g = n, b = wh;
          break;

         case 1:
          r = n, g = v, b = wh;
          break;

         case 2:
          r = wh, g = v, b = n;
          break;

         case 3:
          r = wh, g = n, b = v;
          break;

         case 4:
          r = n, g = wh, b = v;
          break;

         case 5:
          r = v, g = wh, b = n;
        }
        return [ 255 * r, 255 * g, 255 * b ];
      }, convert.cmyk.rgb = function(cmyk) {
        const c = cmyk[0] / 100, m = cmyk[1] / 100, y = cmyk[2] / 100, k = cmyk[3] / 100;
        return [ 255 * (1 - Math.min(1, c * (1 - k) + k)), 255 * (1 - Math.min(1, m * (1 - k) + k)), 255 * (1 - Math.min(1, y * (1 - k) + k)) ];
      }, convert.xyz.rgb = function(xyz) {
        const x = xyz[0] / 100, y = xyz[1] / 100, z = xyz[2] / 100;
        let r, g, b;
        return r = 3.2406 * x + -1.5372 * y + -.4986 * z, g = -.9689 * x + 1.8758 * y + .0415 * z, 
        b = .0557 * x + -.204 * y + 1.057 * z, r = r > .0031308 ? 1.055 * r ** (1 / 2.4) - .055 : 12.92 * r, 
        g = g > .0031308 ? 1.055 * g ** (1 / 2.4) - .055 : 12.92 * g, b = b > .0031308 ? 1.055 * b ** (1 / 2.4) - .055 : 12.92 * b, 
        r = Math.min(Math.max(0, r), 1), g = Math.min(Math.max(0, g), 1), b = Math.min(Math.max(0, b), 1), 
        [ 255 * r, 255 * g, 255 * b ];
      }, convert.xyz.lab = function(xyz) {
        let x = xyz[0], y = xyz[1], z = xyz[2];
        x /= 95.047, y /= 100, z /= 108.883, x = x > .008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116, 
        y = y > .008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116, z = z > .008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        return [ 116 * y - 16, 500 * (x - y), 200 * (y - z) ];
      }, convert.lab.xyz = function(lab) {
        let x, y, z;
        y = (lab[0] + 16) / 116, x = lab[1] / 500 + y, z = y - lab[2] / 200;
        const y2 = y ** 3, x2 = x ** 3, z2 = z ** 3;
        return y = y2 > .008856 ? y2 : (y - 16 / 116) / 7.787, x = x2 > .008856 ? x2 : (x - 16 / 116) / 7.787, 
        z = z2 > .008856 ? z2 : (z - 16 / 116) / 7.787, x *= 95.047, y *= 100, z *= 108.883, 
        [ x, y, z ];
      }, convert.lab.lch = function(lab) {
        const l = lab[0], a = lab[1], b = lab[2];
        let h;
        h = 360 * Math.atan2(b, a) / 2 / Math.PI, h < 0 && (h += 360);
        return [ l, Math.sqrt(a * a + b * b), h ];
      }, convert.lch.lab = function(lch) {
        const l = lch[0], c = lch[1], hr = lch[2] / 360 * 2 * Math.PI;
        return [ l, c * Math.cos(hr), c * Math.sin(hr) ];
      }, convert.rgb.ansi16 = function(args, saturation = null) {
        const [r, g, b] = args;
        let value = null === saturation ? convert.rgb.hsv(args)[2] : saturation;
        if (value = Math.round(value / 50), 0 === value) return 30;
        let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
        return 2 === value && (ansi += 60), ansi;
      }, convert.hsv.ansi16 = function(args) {
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      }, convert.rgb.ansi256 = function(args) {
        const r = args[0], g = args[1], b = args[2];
        if (r === g && g === b) return r < 8 ? 16 : r > 248 ? 231 : Math.round((r - 8) / 247 * 24) + 232;
        return 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      }, convert.ansi16.rgb = function(args) {
        let color = args % 10;
        if (0 === color || 7 === color) return args > 50 && (color += 3.5), color = color / 10.5 * 255, 
        [ color, color, color ];
        const mult = .5 * (1 + ~~(args > 50));
        return [ (1 & color) * mult * 255, (color >> 1 & 1) * mult * 255, (color >> 2 & 1) * mult * 255 ];
      }, convert.ansi256.rgb = function(args) {
        if (args >= 232) {
          const c = 10 * (args - 232) + 8;
          return [ c, c, c ];
        }
        let rem;
        args -= 16;
        return [ Math.floor(args / 36) / 5 * 255, Math.floor((rem = args % 36) / 6) / 5 * 255, rem % 6 / 5 * 255 ];
      }, convert.rgb.hex = function(args) {
        const string = (((255 & Math.round(args[0])) << 16) + ((255 & Math.round(args[1])) << 8) + (255 & Math.round(args[2]))).toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      }, convert.hex.rgb = function(args) {
        const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) return [ 0, 0, 0 ];
        let colorString = match[0];
        3 === match[0].length && (colorString = colorString.split("").map((char => char + char)).join(""));
        const integer = parseInt(colorString, 16);
        return [ integer >> 16 & 255, integer >> 8 & 255, 255 & integer ];
      }, convert.rgb.hcg = function(rgb) {
        const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, max = Math.max(Math.max(r, g), b), min = Math.min(Math.min(r, g), b), chroma = max - min;
        let grayscale, hue;
        return grayscale = chroma < 1 ? min / (1 - chroma) : 0, hue = chroma <= 0 ? 0 : max === r ? (g - b) / chroma % 6 : max === g ? 2 + (b - r) / chroma : 4 + (r - g) / chroma, 
        hue /= 6, hue %= 1, [ 360 * hue, 100 * chroma, 100 * grayscale ];
      }, convert.hsl.hcg = function(hsl) {
        const s = hsl[1] / 100, l = hsl[2] / 100, c = l < .5 ? 2 * s * l : 2 * s * (1 - l);
        let f = 0;
        return c < 1 && (f = (l - .5 * c) / (1 - c)), [ hsl[0], 100 * c, 100 * f ];
      }, convert.hsv.hcg = function(hsv) {
        const s = hsv[1] / 100, v = hsv[2] / 100, c = s * v;
        let f = 0;
        return c < 1 && (f = (v - c) / (1 - c)), [ hsv[0], 100 * c, 100 * f ];
      }, convert.hcg.rgb = function(hcg) {
        const h = hcg[0] / 360, c = hcg[1] / 100, g = hcg[2] / 100;
        if (0 === c) return [ 255 * g, 255 * g, 255 * g ];
        const pure = [ 0, 0, 0 ], hi = h % 1 * 6, v = hi % 1, w = 1 - v;
        let mg = 0;
        switch (Math.floor(hi)) {
         case 0:
          pure[0] = 1, pure[1] = v, pure[2] = 0;
          break;

         case 1:
          pure[0] = w, pure[1] = 1, pure[2] = 0;
          break;

         case 2:
          pure[0] = 0, pure[1] = 1, pure[2] = v;
          break;

         case 3:
          pure[0] = 0, pure[1] = w, pure[2] = 1;
          break;

         case 4:
          pure[0] = v, pure[1] = 0, pure[2] = 1;
          break;

         default:
          pure[0] = 1, pure[1] = 0, pure[2] = w;
        }
        return mg = (1 - c) * g, [ 255 * (c * pure[0] + mg), 255 * (c * pure[1] + mg), 255 * (c * pure[2] + mg) ];
      }, convert.hcg.hsv = function(hcg) {
        const c = hcg[1] / 100, v = c + hcg[2] / 100 * (1 - c);
        let f = 0;
        return v > 0 && (f = c / v), [ hcg[0], 100 * f, 100 * v ];
      }, convert.hcg.hsl = function(hcg) {
        const c = hcg[1] / 100, l = hcg[2] / 100 * (1 - c) + .5 * c;
        let s = 0;
        return l > 0 && l < .5 ? s = c / (2 * l) : l >= .5 && l < 1 && (s = c / (2 * (1 - l))), 
        [ hcg[0], 100 * s, 100 * l ];
      }, convert.hcg.hwb = function(hcg) {
        const c = hcg[1] / 100, v = c + hcg[2] / 100 * (1 - c);
        return [ hcg[0], 100 * (v - c), 100 * (1 - v) ];
      }, convert.hwb.hcg = function(hwb) {
        const w = hwb[1] / 100, v = 1 - hwb[2] / 100, c = v - w;
        let g = 0;
        return c < 1 && (g = (v - c) / (1 - c)), [ hwb[0], 100 * c, 100 * g ];
      }, convert.apple.rgb = function(apple) {
        return [ apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255 ];
      }, convert.rgb.apple = function(rgb) {
        return [ rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535 ];
      }, convert.gray.rgb = function(args) {
        return [ args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255 ];
      }, convert.gray.hsl = function(args) {
        return [ 0, 0, args[0] ];
      }, convert.gray.hsv = convert.gray.hsl, convert.gray.hwb = function(gray) {
        return [ 0, 100, gray[0] ];
      }, convert.gray.cmyk = function(gray) {
        return [ 0, 0, 0, gray[0] ];
      }, convert.gray.lab = function(gray) {
        return [ gray[0], 0, 0 ];
      }, convert.gray.hex = function(gray) {
        const val = 255 & Math.round(gray[0] / 100 * 255), string = ((val << 16) + (val << 8) + val).toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      }, convert.rgb.gray = function(rgb) {
        return [ (rgb[0] + rgb[1] + rgb[2]) / 3 / 255 * 100 ];
      };
    },
    9843: (module, __unused_webpack_exports, __webpack_require__) => {
      const conversions = __webpack_require__(4985), route = __webpack_require__(2468), convert = {};
      Object.keys(conversions).forEach((fromModel => {
        convert[fromModel] = {}, Object.defineProperty(convert[fromModel], "channels", {
          value: conversions[fromModel].channels
        }), Object.defineProperty(convert[fromModel], "labels", {
          value: conversions[fromModel].labels
        });
        const routes = route(fromModel);
        Object.keys(routes).forEach((toModel => {
          const fn = routes[toModel];
          convert[fromModel][toModel] = function(fn) {
            const wrappedFn = function(...args) {
              const arg0 = args[0];
              if (null == arg0) return arg0;
              arg0.length > 1 && (args = arg0);
              const result = fn(args);
              if ("object" == typeof result) for (let len = result.length, i = 0; i < len; i++) result[i] = Math.round(result[i]);
              return result;
            };
            return "conversion" in fn && (wrappedFn.conversion = fn.conversion), wrappedFn;
          }(fn), convert[fromModel][toModel].raw = function(fn) {
            const wrappedFn = function(...args) {
              const arg0 = args[0];
              return null == arg0 ? arg0 : (arg0.length > 1 && (args = arg0), fn(args));
            };
            return "conversion" in fn && (wrappedFn.conversion = fn.conversion), wrappedFn;
          }(fn);
        }));
      })), module.exports = convert;
    },
    2468: (module, __unused_webpack_exports, __webpack_require__) => {
      const conversions = __webpack_require__(4985);
      function deriveBFS(fromModel) {
        const graph = function() {
          const graph = {}, models = Object.keys(conversions);
          for (let len = models.length, i = 0; i < len; i++) graph[models[i]] = {
            distance: -1,
            parent: null
          };
          return graph;
        }(), queue = [ fromModel ];
        for (graph[fromModel].distance = 0; queue.length; ) {
          const current = queue.pop(), adjacents = Object.keys(conversions[current]);
          for (let len = adjacents.length, i = 0; i < len; i++) {
            const adjacent = adjacents[i], node = graph[adjacent];
            -1 === node.distance && (node.distance = graph[current].distance + 1, node.parent = current, 
            queue.unshift(adjacent));
          }
        }
        return graph;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph) {
        const path = [ graph[toModel].parent, toModel ];
        let fn = conversions[graph[toModel].parent][toModel], cur = graph[toModel].parent;
        for (;graph[cur].parent; ) path.unshift(graph[cur].parent), fn = link(conversions[graph[cur].parent][cur], fn), 
        cur = graph[cur].parent;
        return fn.conversion = path, fn;
      }
      module.exports = function(fromModel) {
        const graph = deriveBFS(fromModel), conversion = {}, models = Object.keys(graph);
        for (let len = models.length, i = 0; i < len; i++) {
          const toModel = models[i];
          null !== graph[toModel].parent && (conversion[toModel] = wrapConversion(toModel, graph));
        }
        return conversion;
      };
    },
    9668: (module, __unused_webpack_exports, __webpack_require__) => {
      const {Buffer} = __webpack_require__(4300), symbol = Symbol.for("BufferList");
      function BufferList(buf) {
        if (!(this instanceof BufferList)) return new BufferList(buf);
        BufferList._init.call(this, buf);
      }
      BufferList._init = function(buf) {
        Object.defineProperty(this, symbol, {
          value: !0
        }), this._bufs = [], this.length = 0, buf && this.append(buf);
      }, BufferList.prototype._new = function(buf) {
        return new BufferList(buf);
      }, BufferList.prototype._offset = function(offset) {
        if (0 === offset) return [ 0, 0 ];
        let tot = 0;
        for (let i = 0; i < this._bufs.length; i++) {
          const _t = tot + this._bufs[i].length;
          if (offset < _t || i === this._bufs.length - 1) return [ i, offset - tot ];
          tot = _t;
        }
      }, BufferList.prototype._reverseOffset = function(blOffset) {
        const bufferId = blOffset[0];
        let offset = blOffset[1];
        for (let i = 0; i < bufferId; i++) offset += this._bufs[i].length;
        return offset;
      }, BufferList.prototype.get = function(index) {
        if (index > this.length || index < 0) return;
        const offset = this._offset(index);
        return this._bufs[offset[0]][offset[1]];
      }, BufferList.prototype.slice = function(start, end) {
        return "number" == typeof start && start < 0 && (start += this.length), "number" == typeof end && end < 0 && (end += this.length), 
        this.copy(null, 0, start, end);
      }, BufferList.prototype.copy = function(dst, dstStart, srcStart, srcEnd) {
        if (("number" != typeof srcStart || srcStart < 0) && (srcStart = 0), ("number" != typeof srcEnd || srcEnd > this.length) && (srcEnd = this.length), 
        srcStart >= this.length) return dst || Buffer.alloc(0);
        if (srcEnd <= 0) return dst || Buffer.alloc(0);
        const copy = !!dst, off = this._offset(srcStart), len = srcEnd - srcStart;
        let bytes = len, bufoff = copy && dstStart || 0, start = off[1];
        if (0 === srcStart && srcEnd === this.length) {
          if (!copy) return 1 === this._bufs.length ? this._bufs[0] : Buffer.concat(this._bufs, this.length);
          for (let i = 0; i < this._bufs.length; i++) this._bufs[i].copy(dst, bufoff), bufoff += this._bufs[i].length;
          return dst;
        }
        if (bytes <= this._bufs[off[0]].length - start) return copy ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
        copy || (dst = Buffer.allocUnsafe(len));
        for (let i = off[0]; i < this._bufs.length; i++) {
          const l = this._bufs[i].length - start;
          if (!(bytes > l)) {
            this._bufs[i].copy(dst, bufoff, start, start + bytes), bufoff += l;
            break;
          }
          this._bufs[i].copy(dst, bufoff, start), bufoff += l, bytes -= l, start && (start = 0);
        }
        return dst.length > bufoff ? dst.slice(0, bufoff) : dst;
      }, BufferList.prototype.shallowSlice = function(start, end) {
        if (start = start || 0, end = "number" != typeof end ? this.length : end, start < 0 && (start += this.length), 
        end < 0 && (end += this.length), start === end) return this._new();
        const startOffset = this._offset(start), endOffset = this._offset(end), buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
        return 0 === endOffset[1] ? buffers.pop() : buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]), 
        0 !== startOffset[1] && (buffers[0] = buffers[0].slice(startOffset[1])), this._new(buffers);
      }, BufferList.prototype.toString = function(encoding, start, end) {
        return this.slice(start, end).toString(encoding);
      }, BufferList.prototype.consume = function(bytes) {
        if (bytes = Math.trunc(bytes), Number.isNaN(bytes) || bytes <= 0) return this;
        for (;this._bufs.length; ) {
          if (!(bytes >= this._bufs[0].length)) {
            this._bufs[0] = this._bufs[0].slice(bytes), this.length -= bytes;
            break;
          }
          bytes -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
        }
        return this;
      }, BufferList.prototype.duplicate = function() {
        const copy = this._new();
        for (let i = 0; i < this._bufs.length; i++) copy.append(this._bufs[i]);
        return copy;
      }, BufferList.prototype.append = function(buf) {
        if (null == buf) return this;
        if (buf.buffer) this._appendBuffer(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)); else if (Array.isArray(buf)) for (let i = 0; i < buf.length; i++) this.append(buf[i]); else if (this._isBufferList(buf)) for (let i = 0; i < buf._bufs.length; i++) this.append(buf._bufs[i]); else "number" == typeof buf && (buf = buf.toString()), 
        this._appendBuffer(Buffer.from(buf));
        return this;
      }, BufferList.prototype._appendBuffer = function(buf) {
        this._bufs.push(buf), this.length += buf.length;
      }, BufferList.prototype.indexOf = function(search, offset, encoding) {
        if (void 0 === encoding && "string" == typeof offset && (encoding = offset, offset = void 0), 
        "function" == typeof search || Array.isArray(search)) throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
        if ("number" == typeof search ? search = Buffer.from([ search ]) : "string" == typeof search ? search = Buffer.from(search, encoding) : this._isBufferList(search) ? search = search.slice() : Array.isArray(search.buffer) ? search = Buffer.from(search.buffer, search.byteOffset, search.byteLength) : Buffer.isBuffer(search) || (search = Buffer.from(search)), 
        offset = Number(offset || 0), isNaN(offset) && (offset = 0), offset < 0 && (offset = this.length + offset), 
        offset < 0 && (offset = 0), 0 === search.length) return offset > this.length ? this.length : offset;
        const blOffset = this._offset(offset);
        let blIndex = blOffset[0], buffOffset = blOffset[1];
        for (;blIndex < this._bufs.length; blIndex++) {
          const buff = this._bufs[blIndex];
          for (;buffOffset < buff.length; ) {
            if (buff.length - buffOffset >= search.length) {
              const nativeSearchResult = buff.indexOf(search, buffOffset);
              if (-1 !== nativeSearchResult) return this._reverseOffset([ blIndex, nativeSearchResult ]);
              buffOffset = buff.length - search.length + 1;
            } else {
              const revOffset = this._reverseOffset([ blIndex, buffOffset ]);
              if (this._match(revOffset, search)) return revOffset;
              buffOffset++;
            }
          }
          buffOffset = 0;
        }
        return -1;
      }, BufferList.prototype._match = function(offset, search) {
        if (this.length - offset < search.length) return !1;
        for (let searchOffset = 0; searchOffset < search.length; searchOffset++) if (this.get(offset + searchOffset) !== search[searchOffset]) return !1;
        return !0;
      }, function() {
        const methods = {
          readDoubleBE: 8,
          readDoubleLE: 8,
          readFloatBE: 4,
          readFloatLE: 4,
          readInt32BE: 4,
          readInt32LE: 4,
          readUInt32BE: 4,
          readUInt32LE: 4,
          readInt16BE: 2,
          readInt16LE: 2,
          readUInt16BE: 2,
          readUInt16LE: 2,
          readInt8: 1,
          readUInt8: 1,
          readIntBE: null,
          readIntLE: null,
          readUIntBE: null,
          readUIntLE: null
        };
        for (const m in methods) !function(m) {
          BufferList.prototype[m] = null === methods[m] ? function(offset, byteLength) {
            return this.slice(offset, offset + byteLength)[m](0, byteLength);
          } : function(offset = 0) {
            return this.slice(offset, offset + methods[m])[m](0);
          };
        }(m);
      }(), BufferList.prototype._isBufferList = function(b) {
        return b instanceof BufferList || BufferList.isBufferList(b);
      }, BufferList.isBufferList = function(b) {
        return null != b && b[symbol];
      }, module.exports = BufferList;
    },
    4061: (module, __unused_webpack_exports, __webpack_require__) => {
      const ansiStyles = __webpack_require__(6434), {stdout: stdoutColor, stderr: stderrColor} = __webpack_require__(2130), {stringReplaceAll, stringEncaseCRLFWithFirstIndex} = __webpack_require__(3559), {isArray} = Array, levelMapping = [ "ansi", "ansi", "ansi256", "ansi16m" ], styles = Object.create(null);
      class ChalkClass {
        constructor(options) {
          return chalkFactory(options);
        }
      }
      const chalkFactory = options => {
        const chalk = {};
        return ((object, options = {}) => {
          if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) throw new Error("The `level` option should be an integer from 0 to 3");
          const colorLevel = stdoutColor ? stdoutColor.level : 0;
          object.level = void 0 === options.level ? colorLevel : options.level;
        })(chalk, options), chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_), 
        Object.setPrototypeOf(chalk, Chalk.prototype), Object.setPrototypeOf(chalk.template, chalk), 
        chalk.template.constructor = () => {
          throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
        }, chalk.template.Instance = ChalkClass, chalk.template;
      };
      function Chalk(options) {
        return chalkFactory(options);
      }
      for (const [styleName, style] of Object.entries(ansiStyles)) styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          return Object.defineProperty(this, styleName, {
            value: builder
          }), builder;
        }
      };
      styles.visible = {
        get() {
          const builder = createBuilder(this, this._styler, !0);
          return Object.defineProperty(this, "visible", {
            value: builder
          }), builder;
        }
      };
      const usedModels = [ "rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256" ];
      for (const model of usedModels) styles[model] = {
        get() {
          const {level} = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
      for (const model of usedModels) {
        styles["bg" + model[0].toUpperCase() + model.slice(1)] = {
          get() {
            const {level} = this;
            return function(...arguments_) {
              const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
              return createBuilder(this, styler, this._isEmpty);
            };
          }
        };
      }
      const proto = Object.defineProperties((() => {}), {
        ...styles,
        level: {
          enumerable: !0,
          get() {
            return this._generator.level;
          },
          set(level) {
            this._generator.level = level;
          }
        }
      }), createStyler = (open, close, parent) => {
        let openAll, closeAll;
        return void 0 === parent ? (openAll = open, closeAll = close) : (openAll = parent.openAll + open, 
        closeAll = close + parent.closeAll), {
          open,
          close,
          openAll,
          closeAll,
          parent
        };
      }, createBuilder = (self, _styler, _isEmpty) => {
        const builder = (...arguments_) => isArray(arguments_[0]) && isArray(arguments_[0].raw) ? applyStyle(builder, chalkTag(builder, ...arguments_)) : applyStyle(builder, 1 === arguments_.length ? "" + arguments_[0] : arguments_.join(" "));
        return Object.setPrototypeOf(builder, proto), builder._generator = self, builder._styler = _styler, 
        builder._isEmpty = _isEmpty, builder;
      }, applyStyle = (self, string) => {
        if (self.level <= 0 || !string) return self._isEmpty ? "" : string;
        let styler = self._styler;
        if (void 0 === styler) return string;
        const {openAll, closeAll} = styler;
        if (-1 !== string.indexOf("")) for (;void 0 !== styler; ) string = stringReplaceAll(string, styler.close, styler.open), 
        styler = styler.parent;
        const lfIndex = string.indexOf("\n");
        return -1 !== lfIndex && (string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex)), 
        openAll + string + closeAll;
      };
      let template;
      const chalkTag = (chalk, ...strings) => {
        const [firstString] = strings;
        if (!isArray(firstString) || !isArray(firstString.raw)) return strings.join(" ");
        const arguments_ = strings.slice(1), parts = [ firstString.raw[0] ];
        for (let i = 1; i < firstString.length; i++) parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
        return void 0 === template && (template = __webpack_require__(9515)), template(chalk, parts.join(""));
      };
      Object.defineProperties(Chalk.prototype, styles);
      const chalk = Chalk();
      chalk.supportsColor = stdoutColor, chalk.stderr = Chalk({
        level: stderrColor ? stderrColor.level : 0
      }), chalk.stderr.supportsColor = stderrColor, module.exports = chalk;
    },
    9515: module => {
      const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi, STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g, STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/, ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi, ESCAPES = new Map([ [ "n", "\n" ], [ "r", "\r" ], [ "t", "\t" ], [ "b", "\b" ], [ "f", "\f" ], [ "v", "\v" ], [ "0", "\0" ], [ "\\", "\\" ], [ "e", "" ], [ "a", "" ] ]);
      function unescape(c) {
        const u = "u" === c[0], bracket = "{" === c[1];
        return u && !bracket && 5 === c.length || "x" === c[0] && 3 === c.length ? String.fromCharCode(parseInt(c.slice(1), 16)) : u && bracket ? String.fromCodePoint(parseInt(c.slice(2, -1), 16)) : ESCAPES.get(c) || c;
      }
      function parseArguments(name, arguments_) {
        const results = [], chunks = arguments_.trim().split(/\s*,\s*/g);
        let matches;
        for (const chunk of chunks) {
          const number = Number(chunk);
          if (Number.isNaN(number)) {
            if (!(matches = chunk.match(STRING_REGEX))) throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
            results.push(matches[2].replace(ESCAPE_REGEX, ((m, escape, character) => escape ? unescape(escape) : character)));
          } else results.push(number);
        }
        return results;
      }
      function parseStyle(style) {
        STYLE_REGEX.lastIndex = 0;
        const results = [];
        let matches;
        for (;null !== (matches = STYLE_REGEX.exec(style)); ) {
          const name = matches[1];
          if (matches[2]) {
            const args = parseArguments(name, matches[2]);
            results.push([ name ].concat(args));
          } else results.push([ name ]);
        }
        return results;
      }
      function buildStyle(chalk, styles) {
        const enabled = {};
        for (const layer of styles) for (const style of layer.styles) enabled[style[0]] = layer.inverse ? null : style.slice(1);
        let current = chalk;
        for (const [styleName, styles] of Object.entries(enabled)) if (Array.isArray(styles)) {
          if (!(styleName in current)) throw new Error(`Unknown Chalk style: ${styleName}`);
          current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
        }
        return current;
      }
      module.exports = (chalk, temporary) => {
        const styles = [], chunks = [];
        let chunk = [];
        if (temporary.replace(TEMPLATE_REGEX, ((m, escapeCharacter, inverse, style, close, character) => {
          if (escapeCharacter) chunk.push(unescape(escapeCharacter)); else if (style) {
            const string = chunk.join("");
            chunk = [], chunks.push(0 === styles.length ? string : buildStyle(chalk, styles)(string)), 
            styles.push({
              inverse,
              styles: parseStyle(style)
            });
          } else if (close) {
            if (0 === styles.length) throw new Error("Found extraneous } in Chalk template literal");
            chunks.push(buildStyle(chalk, styles)(chunk.join(""))), chunk = [], styles.pop();
          } else chunk.push(character);
        })), chunks.push(chunk.join("")), styles.length > 0) {
          const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${1 === styles.length ? "" : "s"} (\`}\`)`;
          throw new Error(errMessage);
        }
        return chunks.join("");
      };
    },
    3559: module => {
      module.exports = {
        stringReplaceAll: (string, substring, replacer) => {
          let index = string.indexOf(substring);
          if (-1 === index) return string;
          const substringLength = substring.length;
          let endIndex = 0, returnValue = "";
          do {
            returnValue += string.substr(endIndex, index - endIndex) + substring + replacer, 
            endIndex = index + substringLength, index = string.indexOf(substring, endIndex);
          } while (-1 !== index);
          return returnValue += string.substr(endIndex), returnValue;
        },
        stringEncaseCRLFWithFirstIndex: (string, prefix, postfix, index) => {
          let endIndex = 0, returnValue = "";
          do {
            const gotCR = "\r" === string[index - 1];
            returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix, 
            endIndex = index + 1, index = string.indexOf("\n", endIndex);
          } while (-1 !== index);
          return returnValue += string.substr(endIndex), returnValue;
        }
      };
    },
    3909: (__unused_webpack_module, exports, __webpack_require__) => {
      const restoreCursor = __webpack_require__(1354);
      let isHidden = !1;
      exports.show = (writableStream = process.stderr) => {
        writableStream.isTTY && (isHidden = !1, writableStream.write("[?25h"));
      }, exports.hide = (writableStream = process.stderr) => {
        writableStream.isTTY && (restoreCursor(), isHidden = !0, writableStream.write("[?25l"));
      }, exports.toggle = (force, writableStream) => {
        void 0 !== force && (isHidden = force), isHidden ? exports.show(writableStream) : exports.hide(writableStream);
      };
    },
    4011: (module, __unused_webpack_exports, __webpack_require__) => {
      const spinners = Object.assign({}, __webpack_require__(6374)), spinnersList = Object.keys(spinners);
      Object.defineProperty(spinners, "random", {
        get() {
          const randomIndex = Math.floor(Math.random() * spinnersList.length), spinnerName = spinnersList[randomIndex];
          return spinners[spinnerName];
        }
      }), module.exports = spinners;
    },
    8874: module => {
      module.exports = {
        aliceblue: [ 240, 248, 255 ],
        antiquewhite: [ 250, 235, 215 ],
        aqua: [ 0, 255, 255 ],
        aquamarine: [ 127, 255, 212 ],
        azure: [ 240, 255, 255 ],
        beige: [ 245, 245, 220 ],
        bisque: [ 255, 228, 196 ],
        black: [ 0, 0, 0 ],
        blanchedalmond: [ 255, 235, 205 ],
        blue: [ 0, 0, 255 ],
        blueviolet: [ 138, 43, 226 ],
        brown: [ 165, 42, 42 ],
        burlywood: [ 222, 184, 135 ],
        cadetblue: [ 95, 158, 160 ],
        chartreuse: [ 127, 255, 0 ],
        chocolate: [ 210, 105, 30 ],
        coral: [ 255, 127, 80 ],
        cornflowerblue: [ 100, 149, 237 ],
        cornsilk: [ 255, 248, 220 ],
        crimson: [ 220, 20, 60 ],
        cyan: [ 0, 255, 255 ],
        darkblue: [ 0, 0, 139 ],
        darkcyan: [ 0, 139, 139 ],
        darkgoldenrod: [ 184, 134, 11 ],
        darkgray: [ 169, 169, 169 ],
        darkgreen: [ 0, 100, 0 ],
        darkgrey: [ 169, 169, 169 ],
        darkkhaki: [ 189, 183, 107 ],
        darkmagenta: [ 139, 0, 139 ],
        darkolivegreen: [ 85, 107, 47 ],
        darkorange: [ 255, 140, 0 ],
        darkorchid: [ 153, 50, 204 ],
        darkred: [ 139, 0, 0 ],
        darksalmon: [ 233, 150, 122 ],
        darkseagreen: [ 143, 188, 143 ],
        darkslateblue: [ 72, 61, 139 ],
        darkslategray: [ 47, 79, 79 ],
        darkslategrey: [ 47, 79, 79 ],
        darkturquoise: [ 0, 206, 209 ],
        darkviolet: [ 148, 0, 211 ],
        deeppink: [ 255, 20, 147 ],
        deepskyblue: [ 0, 191, 255 ],
        dimgray: [ 105, 105, 105 ],
        dimgrey: [ 105, 105, 105 ],
        dodgerblue: [ 30, 144, 255 ],
        firebrick: [ 178, 34, 34 ],
        floralwhite: [ 255, 250, 240 ],
        forestgreen: [ 34, 139, 34 ],
        fuchsia: [ 255, 0, 255 ],
        gainsboro: [ 220, 220, 220 ],
        ghostwhite: [ 248, 248, 255 ],
        gold: [ 255, 215, 0 ],
        goldenrod: [ 218, 165, 32 ],
        gray: [ 128, 128, 128 ],
        green: [ 0, 128, 0 ],
        greenyellow: [ 173, 255, 47 ],
        grey: [ 128, 128, 128 ],
        honeydew: [ 240, 255, 240 ],
        hotpink: [ 255, 105, 180 ],
        indianred: [ 205, 92, 92 ],
        indigo: [ 75, 0, 130 ],
        ivory: [ 255, 255, 240 ],
        khaki: [ 240, 230, 140 ],
        lavender: [ 230, 230, 250 ],
        lavenderblush: [ 255, 240, 245 ],
        lawngreen: [ 124, 252, 0 ],
        lemonchiffon: [ 255, 250, 205 ],
        lightblue: [ 173, 216, 230 ],
        lightcoral: [ 240, 128, 128 ],
        lightcyan: [ 224, 255, 255 ],
        lightgoldenrodyellow: [ 250, 250, 210 ],
        lightgray: [ 211, 211, 211 ],
        lightgreen: [ 144, 238, 144 ],
        lightgrey: [ 211, 211, 211 ],
        lightpink: [ 255, 182, 193 ],
        lightsalmon: [ 255, 160, 122 ],
        lightseagreen: [ 32, 178, 170 ],
        lightskyblue: [ 135, 206, 250 ],
        lightslategray: [ 119, 136, 153 ],
        lightslategrey: [ 119, 136, 153 ],
        lightsteelblue: [ 176, 196, 222 ],
        lightyellow: [ 255, 255, 224 ],
        lime: [ 0, 255, 0 ],
        limegreen: [ 50, 205, 50 ],
        linen: [ 250, 240, 230 ],
        magenta: [ 255, 0, 255 ],
        maroon: [ 128, 0, 0 ],
        mediumaquamarine: [ 102, 205, 170 ],
        mediumblue: [ 0, 0, 205 ],
        mediumorchid: [ 186, 85, 211 ],
        mediumpurple: [ 147, 112, 219 ],
        mediumseagreen: [ 60, 179, 113 ],
        mediumslateblue: [ 123, 104, 238 ],
        mediumspringgreen: [ 0, 250, 154 ],
        mediumturquoise: [ 72, 209, 204 ],
        mediumvioletred: [ 199, 21, 133 ],
        midnightblue: [ 25, 25, 112 ],
        mintcream: [ 245, 255, 250 ],
        mistyrose: [ 255, 228, 225 ],
        moccasin: [ 255, 228, 181 ],
        navajowhite: [ 255, 222, 173 ],
        navy: [ 0, 0, 128 ],
        oldlace: [ 253, 245, 230 ],
        olive: [ 128, 128, 0 ],
        olivedrab: [ 107, 142, 35 ],
        orange: [ 255, 165, 0 ],
        orangered: [ 255, 69, 0 ],
        orchid: [ 218, 112, 214 ],
        palegoldenrod: [ 238, 232, 170 ],
        palegreen: [ 152, 251, 152 ],
        paleturquoise: [ 175, 238, 238 ],
        palevioletred: [ 219, 112, 147 ],
        papayawhip: [ 255, 239, 213 ],
        peachpuff: [ 255, 218, 185 ],
        peru: [ 205, 133, 63 ],
        pink: [ 255, 192, 203 ],
        plum: [ 221, 160, 221 ],
        powderblue: [ 176, 224, 230 ],
        purple: [ 128, 0, 128 ],
        rebeccapurple: [ 102, 51, 153 ],
        red: [ 255, 0, 0 ],
        rosybrown: [ 188, 143, 143 ],
        royalblue: [ 65, 105, 225 ],
        saddlebrown: [ 139, 69, 19 ],
        salmon: [ 250, 128, 114 ],
        sandybrown: [ 244, 164, 96 ],
        seagreen: [ 46, 139, 87 ],
        seashell: [ 255, 245, 238 ],
        sienna: [ 160, 82, 45 ],
        silver: [ 192, 192, 192 ],
        skyblue: [ 135, 206, 235 ],
        slateblue: [ 106, 90, 205 ],
        slategray: [ 112, 128, 144 ],
        slategrey: [ 112, 128, 144 ],
        snow: [ 255, 250, 250 ],
        springgreen: [ 0, 255, 127 ],
        steelblue: [ 70, 130, 180 ],
        tan: [ 210, 180, 140 ],
        teal: [ 0, 128, 128 ],
        thistle: [ 216, 191, 216 ],
        tomato: [ 255, 99, 71 ],
        turquoise: [ 64, 224, 208 ],
        violet: [ 238, 130, 238 ],
        wheat: [ 245, 222, 179 ],
        white: [ 255, 255, 255 ],
        whitesmoke: [ 245, 245, 245 ],
        yellow: [ 255, 255, 0 ],
        yellowgreen: [ 154, 205, 50 ]
      };
    },
    4605: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), resolveCommand = __webpack_require__(2202), escape = __webpack_require__(5081), readShebang = __webpack_require__(7550), isWin = "win32" === process.platform, isExecutableRegExp = /\.(?:com|exe)$/i, isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
      function parseNonShell(parsed) {
        if (!isWin) return parsed;
        const commandFile = function(parsed) {
          parsed.file = resolveCommand(parsed);
          const shebang = parsed.file && readShebang(parsed.file);
          return shebang ? (parsed.args.unshift(parsed.file), parsed.command = shebang, resolveCommand(parsed)) : parsed.file;
        }(parsed), needsShell = !isExecutableRegExp.test(commandFile);
        if (parsed.options.forceShell || needsShell) {
          const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
          parsed.command = path.normalize(parsed.command), parsed.command = escape.command(parsed.command), 
          parsed.args = parsed.args.map((arg => escape.argument(arg, needsDoubleEscapeMetaChars)));
          const shellCommand = [ parsed.command ].concat(parsed.args).join(" ");
          parsed.args = [ "/d", "/s", "/c", `"${shellCommand}"` ], parsed.command = process.env.comspec || "cmd.exe", 
          parsed.options.windowsVerbatimArguments = !0;
        }
        return parsed;
      }
      module.exports = function(command, args, options) {
        args && !Array.isArray(args) && (options = args, args = null);
        const parsed = {
          command,
          args: args = args ? args.slice(0) : [],
          options: options = Object.assign({}, options),
          file: void 0,
          original: {
            command,
            args
          }
        };
        return options.shell ? parsed : parseNonShell(parsed);
      };
    },
    5081: module => {
      const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
      module.exports.command = function(arg) {
        return arg = arg.replace(metaCharsRegExp, "^$1");
      }, module.exports.argument = function(arg, doubleEscapeMetaChars) {
        return arg = (arg = `"${arg = (arg = (arg = `${arg}`).replace(/(\\*)"/g, '$1$1\\"')).replace(/(\\*)$/, "$1$1")}"`).replace(metaCharsRegExp, "^$1"), 
        doubleEscapeMetaChars && (arg = arg.replace(metaCharsRegExp, "^$1")), arg;
      };
    },
    7550: (module, __unused_webpack_exports, __webpack_require__) => {
      const fs = __webpack_require__(7147), shebangCommand = __webpack_require__(2063);
      module.exports = function(command) {
        const buffer = Buffer.alloc(150);
        let fd;
        try {
          fd = fs.openSync(command, "r"), fs.readSync(fd, buffer, 0, 150, 0), fs.closeSync(fd);
        } catch (e) {}
        return shebangCommand(buffer.toString());
      };
    },
    2202: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), which = __webpack_require__(566), getPathKey = __webpack_require__(3024);
      function resolveCommandAttempt(parsed, withoutPathExt) {
        const env = parsed.options.env || process.env, cwd = process.cwd(), hasCustomCwd = null != parsed.options.cwd, shouldSwitchCwd = hasCustomCwd && void 0 !== process.chdir && !process.chdir.disabled;
        if (shouldSwitchCwd) try {
          process.chdir(parsed.options.cwd);
        } catch (err) {}
        let resolved;
        try {
          resolved = which.sync(parsed.command, {
            path: env[getPathKey({
              env
            })],
            pathExt: withoutPathExt ? path.delimiter : void 0
          });
        } catch (e) {} finally {
          shouldSwitchCwd && process.chdir(cwd);
        }
        return resolved && (resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved)), 
        resolved;
      }
      module.exports = function(parsed) {
        return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, !0);
      };
    },
    8468: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), childProcess = __webpack_require__(2081), crossSpawn = {
        _parse: __webpack_require__(4605)
      }, stripFinalNewline = __webpack_require__(8150), npmRunPath = __webpack_require__(6147), onetime = __webpack_require__(7678), makeError = __webpack_require__(4353), normalizeStdio = __webpack_require__(3111), {spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler} = __webpack_require__(3820), {handleInput, getSpawnedResult, makeAllStream, validateInputSync} = __webpack_require__(4994), {mergePromise, getSpawnedPromise} = __webpack_require__(1708), {joinCommand, parseCommand, getEscapedCommand} = __webpack_require__(4077), handleArguments = (file, args, options = {}) => {
        const parsed = crossSpawn._parse(file, args, options);
        return file = parsed.command, args = parsed.args, (options = {
          maxBuffer: 1e8,
          buffer: !0,
          stripFinalNewline: !0,
          extendEnv: !0,
          preferLocal: !1,
          localDir: (options = parsed.options).cwd || process.cwd(),
          execPath: process.execPath,
          encoding: "utf8",
          reject: !0,
          cleanup: !0,
          all: !1,
          windowsHide: !0,
          ...options
        }).env = (({env: envOption, extendEnv, preferLocal, localDir, execPath}) => {
          const env = extendEnv ? {
            ...process.env,
            ...envOption
          } : envOption;
          return preferLocal ? npmRunPath.env({
            env,
            cwd: localDir,
            execPath
          }) : env;
        })(options), options.stdio = normalizeStdio(options), "win32" === process.platform && "cmd" === path.basename(file, ".exe") && args.unshift("/q"), 
        {
          file,
          args,
          options,
          parsed
        };
      }, handleOutput = (options, value, error) => "string" == typeof value || Buffer.isBuffer(value) ? options.stripFinalNewline ? stripFinalNewline(value) : value : void 0 === error ? void 0 : "", execa = (file, args, options) => {
        const parsed = handleArguments(file, args, options), command = joinCommand(file, args), escapedCommand = getEscapedCommand(file, args);
        let spawned;
        validateTimeout(parsed.options);
        try {
          spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
        } catch (error) {
          const dummySpawned = new childProcess.ChildProcess, errorPromise = Promise.reject(makeError({
            error,
            stdout: "",
            stderr: "",
            all: "",
            command,
            escapedCommand,
            parsed,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
          }));
          return mergePromise(dummySpawned, errorPromise);
        }
        const spawnedPromise = getSpawnedPromise(spawned), timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise), processDone = setExitHandler(spawned, parsed.options, timedPromise), context = {
          isCanceled: !1
        };
        spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned)), spawned.cancel = spawnedCancel.bind(null, spawned, context);
        const handlePromiseOnce = onetime((async () => {
          const [{error, exitCode, signal, timedOut}, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone), stdout = handleOutput(parsed.options, stdoutResult), stderr = handleOutput(parsed.options, stderrResult), all = handleOutput(parsed.options, allResult);
          if (error || 0 !== exitCode || null !== signal) {
            const returnedError = makeError({
              error,
              exitCode,
              signal,
              stdout,
              stderr,
              all,
              command,
              escapedCommand,
              parsed,
              timedOut,
              isCanceled: context.isCanceled,
              killed: spawned.killed
            });
            if (!parsed.options.reject) return returnedError;
            throw returnedError;
          }
          return {
            command,
            escapedCommand,
            exitCode: 0,
            stdout,
            stderr,
            all,
            failed: !1,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
          };
        }));
        return handleInput(spawned, parsed.options.input), spawned.all = makeAllStream(spawned, parsed.options), 
        mergePromise(spawned, handlePromiseOnce);
      };
      module.exports = execa, module.exports.sync = (file, args, options) => {
        const parsed = handleArguments(file, args, options), command = joinCommand(file, args), escapedCommand = getEscapedCommand(file, args);
        let result;
        validateInputSync(parsed.options);
        try {
          result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
        } catch (error) {
          throw makeError({
            error,
            stdout: "",
            stderr: "",
            all: "",
            command,
            escapedCommand,
            parsed,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
          });
        }
        const stdout = handleOutput(parsed.options, result.stdout, result.error), stderr = handleOutput(parsed.options, result.stderr, result.error);
        if (result.error || 0 !== result.status || null !== result.signal) {
          const error = makeError({
            stdout,
            stderr,
            error: result.error,
            signal: result.signal,
            exitCode: result.status,
            command,
            escapedCommand,
            parsed,
            timedOut: result.error && "ETIMEDOUT" === result.error.code,
            isCanceled: !1,
            killed: null !== result.signal
          });
          if (!parsed.options.reject) return error;
          throw error;
        }
        return {
          command,
          escapedCommand,
          exitCode: 0,
          stdout,
          stderr,
          failed: !1,
          timedOut: !1,
          isCanceled: !1,
          killed: !1
        };
      }, module.exports.command = (command, options) => {
        const [file, ...args] = parseCommand(command);
        return execa(file, args, options);
      }, module.exports.commandSync = (command, options) => {
        const [file, ...args] = parseCommand(command);
        return execa.sync(file, args, options);
      }, module.exports.node = (scriptPath, args, options = {}) => {
        args && !Array.isArray(args) && "object" == typeof args && (options = args, args = []);
        const stdio = normalizeStdio.node(options), defaultExecArgv = process.execArgv.filter((arg => !arg.startsWith("--inspect"))), {nodePath = process.execPath, nodeOptions = defaultExecArgv} = options;
        return execa(nodePath, [ ...nodeOptions, scriptPath, ...Array.isArray(args) ? args : [] ], {
          ...options,
          stdin: void 0,
          stdout: void 0,
          stderr: void 0,
          stdio,
          shell: !1
        });
      };
    },
    4077: module => {
      const normalizeArgs = (file, args = []) => Array.isArray(args) ? [ file, ...args ] : [ file ], NO_ESCAPE_REGEXP = /^[\w.-]+$/, DOUBLE_QUOTES_REGEXP = /"/g, SPACES_REGEXP = / +/g;
      module.exports = {
        joinCommand: (file, args) => normalizeArgs(file, args).join(" "),
        getEscapedCommand: (file, args) => normalizeArgs(file, args).map((arg => (arg => "string" != typeof arg || NO_ESCAPE_REGEXP.test(arg) ? arg : `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`)(arg))).join(" "),
        parseCommand: command => {
          const tokens = [];
          for (const token of command.trim().split(SPACES_REGEXP)) {
            const previousToken = tokens[tokens.length - 1];
            previousToken && previousToken.endsWith("\\") ? tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}` : tokens.push(token);
          }
          return tokens;
        }
      };
    },
    4353: (module, __unused_webpack_exports, __webpack_require__) => {
      const {signalsByName} = __webpack_require__(7787);
      module.exports = ({stdout, stderr, all, error, signal, exitCode, command, escapedCommand, timedOut, isCanceled, killed, parsed: {options: {timeout}}}) => {
        exitCode = null === exitCode ? void 0 : exitCode;
        const signalDescription = void 0 === (signal = null === signal ? void 0 : signal) ? void 0 : signalsByName[signal].description, prefix = (({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled}) => timedOut ? `timed out after ${timeout} milliseconds` : isCanceled ? "was canceled" : void 0 !== errorCode ? `failed with ${errorCode}` : void 0 !== signal ? `was killed with ${signal} (${signalDescription})` : void 0 !== exitCode ? `failed with exit code ${exitCode}` : "failed")({
          timedOut,
          timeout,
          errorCode: error && error.code,
          signal,
          signalDescription,
          exitCode,
          isCanceled
        }), execaMessage = `Command ${prefix}: ${command}`, isError = "[object Error]" === Object.prototype.toString.call(error), shortMessage = isError ? `${execaMessage}\n${error.message}` : execaMessage, message = [ shortMessage, stderr, stdout ].filter(Boolean).join("\n");
        return isError ? (error.originalMessage = error.message, error.message = message) : error = new Error(message), 
        error.shortMessage = shortMessage, error.command = command, error.escapedCommand = escapedCommand, 
        error.exitCode = exitCode, error.signal = signal, error.signalDescription = signalDescription, 
        error.stdout = stdout, error.stderr = stderr, void 0 !== all && (error.all = all), 
        "bufferedData" in error && delete error.bufferedData, error.failed = !0, error.timedOut = Boolean(timedOut), 
        error.isCanceled = isCanceled, error.killed = killed && !timedOut, error;
      };
    },
    3820: (module, __unused_webpack_exports, __webpack_require__) => {
      const os = __webpack_require__(2037), onExit = __webpack_require__(2654), setKillTimeout = (kill, signal, options, killResult) => {
        if (!shouldForceKill(signal, options, killResult)) return;
        const timeout = getForceKillAfterTimeout(options), t = setTimeout((() => {
          kill("SIGKILL");
        }), timeout);
        t.unref && t.unref();
      }, shouldForceKill = (signal, {forceKillAfterTimeout}, killResult) => isSigterm(signal) && !1 !== forceKillAfterTimeout && killResult, isSigterm = signal => signal === os.constants.signals.SIGTERM || "string" == typeof signal && "SIGTERM" === signal.toUpperCase(), getForceKillAfterTimeout = ({forceKillAfterTimeout = !0}) => {
        if (!0 === forceKillAfterTimeout) return 5e3;
        if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
        return forceKillAfterTimeout;
      };
      module.exports = {
        spawnedKill: (kill, signal = "SIGTERM", options = {}) => {
          const killResult = kill(signal);
          return setKillTimeout(kill, signal, options, killResult), killResult;
        },
        spawnedCancel: (spawned, context) => {
          spawned.kill() && (context.isCanceled = !0);
        },
        setupTimeout: (spawned, {timeout, killSignal = "SIGTERM"}, spawnedPromise) => {
          if (0 === timeout || void 0 === timeout) return spawnedPromise;
          let timeoutId;
          const timeoutPromise = new Promise(((resolve, reject) => {
            timeoutId = setTimeout((() => {
              ((spawned, signal, reject) => {
                spawned.kill(signal), reject(Object.assign(new Error("Timed out"), {
                  timedOut: !0,
                  signal
                }));
              })(spawned, killSignal, reject);
            }), timeout);
          })), safeSpawnedPromise = spawnedPromise.finally((() => {
            clearTimeout(timeoutId);
          }));
          return Promise.race([ timeoutPromise, safeSpawnedPromise ]);
        },
        validateTimeout: ({timeout}) => {
          if (void 0 !== timeout && (!Number.isFinite(timeout) || timeout < 0)) throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
        },
        setExitHandler: async (spawned, {cleanup, detached}, timedPromise) => {
          if (!cleanup || detached) return timedPromise;
          const removeExitHandler = onExit((() => {
            spawned.kill();
          }));
          return timedPromise.finally((() => {
            removeExitHandler();
          }));
        }
      };
    },
    1708: module => {
      const nativePromisePrototype = (async () => {})().constructor.prototype, descriptors = [ "then", "catch", "finally" ].map((property => [ property, Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property) ]));
      module.exports = {
        mergePromise: (spawned, promise) => {
          for (const [property, descriptor] of descriptors) {
            const value = "function" == typeof promise ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
            Reflect.defineProperty(spawned, property, {
              ...descriptor,
              value
            });
          }
          return spawned;
        },
        getSpawnedPromise: spawned => new Promise(((resolve, reject) => {
          spawned.on("exit", ((exitCode, signal) => {
            resolve({
              exitCode,
              signal
            });
          })), spawned.on("error", (error => {
            reject(error);
          })), spawned.stdin && spawned.stdin.on("error", (error => {
            reject(error);
          }));
        }))
      };
    },
    3111: module => {
      const aliases = [ "stdin", "stdout", "stderr" ], normalizeStdio = options => {
        if (!options) return;
        const {stdio} = options;
        if (void 0 === stdio) return aliases.map((alias => options[alias]));
        if ((options => aliases.some((alias => void 0 !== options[alias])))(options)) throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias => `\`${alias}\``)).join(", ")}`);
        if ("string" == typeof stdio) return stdio;
        if (!Array.isArray(stdio)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
        const length = Math.max(stdio.length, aliases.length);
        return Array.from({
          length
        }, ((value, index) => stdio[index]));
      };
      module.exports = normalizeStdio, module.exports.node = options => {
        const stdio = normalizeStdio(options);
        return "ipc" === stdio ? "ipc" : void 0 === stdio || "string" == typeof stdio ? [ stdio, stdio, stdio, "ipc" ] : stdio.includes("ipc") ? stdio : [ ...stdio, "ipc" ];
      };
    },
    4994: (module, __unused_webpack_exports, __webpack_require__) => {
      const isStream = __webpack_require__(4970), getStream = __webpack_require__(31), mergeStream = __webpack_require__(4034), getBufferedData = async (stream, streamPromise) => {
        if (stream) {
          stream.destroy();
          try {
            return await streamPromise;
          } catch (error) {
            return error.bufferedData;
          }
        }
      }, getStreamPromise = (stream, {encoding, buffer, maxBuffer}) => {
        if (stream && buffer) return encoding ? getStream(stream, {
          encoding,
          maxBuffer
        }) : getStream.buffer(stream, {
          maxBuffer
        });
      };
      module.exports = {
        handleInput: (spawned, input) => {
          void 0 !== input && void 0 !== spawned.stdin && (isStream(input) ? input.pipe(spawned.stdin) : spawned.stdin.end(input));
        },
        makeAllStream: (spawned, {all}) => {
          if (!all || !spawned.stdout && !spawned.stderr) return;
          const mixed = mergeStream();
          return spawned.stdout && mixed.add(spawned.stdout), spawned.stderr && mixed.add(spawned.stderr), 
          mixed;
        },
        getSpawnedResult: async ({stdout, stderr, all}, {encoding, buffer, maxBuffer}, processDone) => {
          const stdoutPromise = getStreamPromise(stdout, {
            encoding,
            buffer,
            maxBuffer
          }), stderrPromise = getStreamPromise(stderr, {
            encoding,
            buffer,
            maxBuffer
          }), allPromise = getStreamPromise(all, {
            encoding,
            buffer,
            maxBuffer: 2 * maxBuffer
          });
          try {
            return await Promise.all([ processDone, stdoutPromise, stderrPromise, allPromise ]);
          } catch (error) {
            return Promise.all([ {
              error,
              signal: error.signal,
              timedOut: error.timedOut
            }, getBufferedData(stdout, stdoutPromise), getBufferedData(stderr, stderrPromise), getBufferedData(all, allPromise) ]);
          }
        },
        validateInputSync: ({input}) => {
          if (isStream(input)) throw new TypeError("The `input` option cannot be a stream in sync mode");
        }
      };
    },
    7749: (__unused_webpack_module, exports, __webpack_require__) => {
      const u = __webpack_require__(8981).E, fs = __webpack_require__(2531), api = [ "access", "appendFile", "chmod", "chown", "close", "copyFile", "fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes", "lchown", "lchmod", "link", "lstat", "mkdir", "mkdtemp", "open", "readFile", "readdir", "readlink", "realpath", "rename", "rmdir", "stat", "symlink", "truncate", "unlink", "utimes", "writeFile" ].filter((key => "function" == typeof fs[key]));
      Object.keys(fs).forEach((key => {
        "promises" !== key && (exports[key] = fs[key]);
      })), api.forEach((method => {
        exports[method] = u(fs[method]);
      })), exports.exists = function(filename, callback) {
        return "function" == typeof callback ? fs.exists(filename, callback) : new Promise((resolve => fs.exists(filename, resolve)));
      }, exports.read = function(fd, buffer, offset, length, position, callback) {
        return "function" == typeof callback ? fs.read(fd, buffer, offset, length, position, callback) : new Promise(((resolve, reject) => {
          fs.read(fd, buffer, offset, length, position, ((err, bytesRead, buffer) => {
            if (err) return reject(err);
            resolve({
              bytesRead,
              buffer
            });
          }));
        }));
      }, exports.write = function(fd, buffer, ...args) {
        return "function" == typeof args[args.length - 1] ? fs.write(fd, buffer, ...args) : new Promise(((resolve, reject) => {
          fs.write(fd, buffer, ...args, ((err, bytesWritten, buffer) => {
            if (err) return reject(err);
            resolve({
              bytesWritten,
              buffer
            });
          }));
        }));
      }, "function" == typeof fs.realpath.native && (exports.realpath.native = u(fs.realpath.native));
    },
    4542: (module, __unused_webpack_exports, __webpack_require__) => {
      const u = __webpack_require__(8981).E, rimraf = __webpack_require__(3456);
      module.exports = {
        remove: u(rimraf),
        removeSync: rimraf.sync
      };
    },
    3456: (module, __unused_webpack_exports, __webpack_require__) => {
      const fs = __webpack_require__(2531), path = __webpack_require__(1017), assert = __webpack_require__(9491), isWindows = "win32" === process.platform;
      function defaults(options) {
        [ "unlink", "chmod", "stat", "lstat", "rmdir", "readdir" ].forEach((m => {
          options[m] = options[m] || fs[m], options[m += "Sync"] = options[m] || fs[m];
        })), options.maxBusyTries = options.maxBusyTries || 3;
      }
      function rimraf(p, options, cb) {
        let busyTries = 0;
        "function" == typeof options && (cb = options, options = {}), assert(p, "rimraf: missing path"), 
        assert.strictEqual(typeof p, "string", "rimraf: path should be a string"), assert.strictEqual(typeof cb, "function", "rimraf: callback function required"), 
        assert(options, "rimraf: invalid options argument provided"), assert.strictEqual(typeof options, "object", "rimraf: options should be object"), 
        defaults(options), rimraf_(p, options, (function CB(er) {
          if (er) {
            if (("EBUSY" === er.code || "ENOTEMPTY" === er.code || "EPERM" === er.code) && busyTries < options.maxBusyTries) {
              busyTries++;
              return setTimeout((() => rimraf_(p, options, CB)), 100 * busyTries);
            }
            "ENOENT" === er.code && (er = null);
          }
          cb(er);
        }));
      }
      function rimraf_(p, options, cb) {
        assert(p), assert(options), assert("function" == typeof cb), options.lstat(p, ((er, st) => er && "ENOENT" === er.code ? cb(null) : er && "EPERM" === er.code && isWindows ? fixWinEPERM(p, options, er, cb) : st && st.isDirectory() ? rmdir(p, options, er, cb) : void options.unlink(p, (er => {
          if (er) {
            if ("ENOENT" === er.code) return cb(null);
            if ("EPERM" === er.code) return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
            if ("EISDIR" === er.code) return rmdir(p, options, er, cb);
          }
          return cb(er);
        }))));
      }
      function fixWinEPERM(p, options, er, cb) {
        assert(p), assert(options), assert("function" == typeof cb), er && assert(er instanceof Error), 
        options.chmod(p, 438, (er2 => {
          er2 ? cb("ENOENT" === er2.code ? null : er) : options.stat(p, ((er3, stats) => {
            er3 ? cb("ENOENT" === er3.code ? null : er) : stats.isDirectory() ? rmdir(p, options, er, cb) : options.unlink(p, cb);
          }));
        }));
      }
      function fixWinEPERMSync(p, options, er) {
        let stats;
        assert(p), assert(options), er && assert(er instanceof Error);
        try {
          options.chmodSync(p, 438);
        } catch (er2) {
          if ("ENOENT" === er2.code) return;
          throw er;
        }
        try {
          stats = options.statSync(p);
        } catch (er3) {
          if ("ENOENT" === er3.code) return;
          throw er;
        }
        stats.isDirectory() ? rmdirSync(p, options, er) : options.unlinkSync(p);
      }
      function rmdir(p, options, originalEr, cb) {
        assert(p), assert(options), originalEr && assert(originalEr instanceof Error), assert("function" == typeof cb), 
        options.rmdir(p, (er => {
          !er || "ENOTEMPTY" !== er.code && "EEXIST" !== er.code && "EPERM" !== er.code ? er && "ENOTDIR" === er.code ? cb(originalEr) : cb(er) : function(p, options, cb) {
            assert(p), assert(options), assert("function" == typeof cb), options.readdir(p, ((er, files) => {
              if (er) return cb(er);
              let errState, n = files.length;
              if (0 === n) return options.rmdir(p, cb);
              files.forEach((f => {
                rimraf(path.join(p, f), options, (er => {
                  if (!errState) return er ? cb(errState = er) : void (0 == --n && options.rmdir(p, cb));
                }));
              }));
            }));
          }(p, options, cb);
        }));
      }
      function rimrafSync(p, options) {
        let st;
        defaults(options = options || {}), assert(p, "rimraf: missing path"), assert.strictEqual(typeof p, "string", "rimraf: path should be a string"), 
        assert(options, "rimraf: missing options"), assert.strictEqual(typeof options, "object", "rimraf: options should be object");
        try {
          st = options.lstatSync(p);
        } catch (er) {
          if ("ENOENT" === er.code) return;
          "EPERM" === er.code && isWindows && fixWinEPERMSync(p, options, er);
        }
        try {
          st && st.isDirectory() ? rmdirSync(p, options, null) : options.unlinkSync(p);
        } catch (er) {
          if ("ENOENT" === er.code) return;
          if ("EPERM" === er.code) return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
          if ("EISDIR" !== er.code) throw er;
          rmdirSync(p, options, er);
        }
      }
      function rmdirSync(p, options, originalEr) {
        assert(p), assert(options), originalEr && assert(originalEr instanceof Error);
        try {
          options.rmdirSync(p);
        } catch (er) {
          if ("ENOTDIR" === er.code) throw originalEr;
          if ("ENOTEMPTY" === er.code || "EEXIST" === er.code || "EPERM" === er.code) !function(p, options) {
            if (assert(p), assert(options), options.readdirSync(p).forEach((f => rimrafSync(path.join(p, f), options))), 
            !isWindows) {
              return options.rmdirSync(p, options);
            }
            {
              const startTime = Date.now();
              do {
                try {
                  return options.rmdirSync(p, options);
                } catch (er) {}
              } while (Date.now() - startTime < 500);
            }
          }(p, options); else if ("ENOENT" !== er.code) throw er;
        }
      }
      module.exports = rimraf, rimraf.sync = rimrafSync;
    },
    5105: (module, __unused_webpack_exports, __webpack_require__) => {
      const {PassThrough: PassThroughStream} = __webpack_require__(2781);
      module.exports = options => {
        options = {
          ...options
        };
        const {array} = options;
        let {encoding} = options;
        const isBuffer = "buffer" === encoding;
        let objectMode = !1;
        array ? objectMode = !(encoding || isBuffer) : encoding = encoding || "utf8", isBuffer && (encoding = null);
        const stream = new PassThroughStream({
          objectMode
        });
        encoding && stream.setEncoding(encoding);
        let length = 0;
        const chunks = [];
        return stream.on("data", (chunk => {
          chunks.push(chunk), objectMode ? length = chunks.length : length += chunk.length;
        })), stream.getBufferedValue = () => array ? chunks : isBuffer ? Buffer.concat(chunks, length) : chunks.join(""), 
        stream.getBufferedLength = () => length, stream;
      };
    },
    31: (module, __unused_webpack_exports, __webpack_require__) => {
      const {constants: BufferConstants} = __webpack_require__(4300), stream = __webpack_require__(2781), {promisify} = __webpack_require__(3837), bufferStream = __webpack_require__(5105), streamPipelinePromisified = promisify(stream.pipeline);
      class MaxBufferError extends Error {
        constructor() {
          super("maxBuffer exceeded"), this.name = "MaxBufferError";
        }
      }
      async function getStream(inputStream, options) {
        if (!inputStream) throw new Error("Expected a stream");
        options = {
          maxBuffer: 1 / 0,
          ...options
        };
        const {maxBuffer} = options, stream = bufferStream(options);
        return await new Promise(((resolve, reject) => {
          const rejectPromise = error => {
            error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH && (error.bufferedData = stream.getBufferedValue()), 
            reject(error);
          };
          (async () => {
            try {
              await streamPipelinePromisified(inputStream, stream), resolve();
            } catch (error) {
              rejectPromise(error);
            }
          })(), stream.on("data", (() => {
            stream.getBufferedLength() > maxBuffer && rejectPromise(new MaxBufferError);
          }));
        })), stream.getBufferedValue();
      }
      module.exports = getStream, module.exports.buffer = (stream, options) => getStream(stream, {
        ...options,
        encoding: "buffer"
      }), module.exports.array = (stream, options) => getStream(stream, {
        ...options,
        array: !0
      }), module.exports.MaxBufferError = MaxBufferError;
    },
    6560: module => {
      module.exports = (flag, argv = process.argv) => {
        const prefix = flag.startsWith("-") ? "" : 1 === flag.length ? "-" : "--", position = argv.indexOf(prefix + flag), terminatorPosition = argv.indexOf("--");
        return -1 !== position && (-1 === terminatorPosition || position < terminatorPosition);
      };
    },
    7: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.SIGNALS = void 0;
      exports.SIGNALS = [ {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
      }, {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
      }, {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
      }, {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
      }, {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
      }, {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
      }, {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
      }, {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
      }, {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
      }, {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
      }, {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: !0
      }, {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      }, {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
      }, {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      }, {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
      }, {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
      }, {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
      }, {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
      }, {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
      }, {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
      }, {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: !0
      }, {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: !0
      }, {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
      }, {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
      }, {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
      }, {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
      }, {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
      }, {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
      }, {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
      }, {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      }, {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      }, {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
      }, {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
      }, {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
      }, {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
      }, {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
      }, {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
      }, {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
      } ];
    },
    7787: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.signalsByNumber = exports.signalsByName = void 0;
      var _os = __webpack_require__(2037), _signals = __webpack_require__(8699), _realtime = __webpack_require__(7603);
      const getSignalByName = function(signalByNameMemo, {name, number, description, supported, action, forced, standard}) {
        return {
          ...signalByNameMemo,
          [name]: {
            name,
            number,
            description,
            supported,
            action,
            forced,
            standard
          }
        };
      }, signalsByName = (0, _signals.getSignals)().reduce(getSignalByName, {});
      exports.signalsByName = signalsByName;
      const getSignalByNumber = function(number, signals) {
        const signal = findSignalByNumber(number, signals);
        if (void 0 === signal) return {};
        const {name, description, supported, action, forced, standard} = signal;
        return {
          [number]: {
            name,
            number,
            description,
            supported,
            action,
            forced,
            standard
          }
        };
      }, findSignalByNumber = function(number, signals) {
        const signal = signals.find((({name}) => _os.constants.signals[name] === number));
        return void 0 !== signal ? signal : signals.find((signalA => signalA.number === number));
      }, signalsByNumber = function() {
        const signals = (0, _signals.getSignals)(), length = _realtime.SIGRTMAX + 1, signalsA = Array.from({
          length
        }, ((value, number) => getSignalByNumber(number, signals)));
        return Object.assign({}, ...signalsA);
      }();
      exports.signalsByNumber = signalsByNumber;
    },
    7603: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.SIGRTMAX = exports.getRealtimeSignals = void 0;
      exports.getRealtimeSignals = function() {
        const length = SIGRTMAX - SIGRTMIN + 1;
        return Array.from({
          length
        }, getRealtimeSignal);
      };
      const getRealtimeSignal = function(value, index) {
        return {
          name: `SIGRT${index + 1}`,
          number: SIGRTMIN + index,
          action: "terminate",
          description: "Application-specific signal (realtime)",
          standard: "posix"
        };
      }, SIGRTMIN = 34, SIGRTMAX = 64;
      exports.SIGRTMAX = SIGRTMAX;
    },
    8699: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.getSignals = void 0;
      var _os = __webpack_require__(2037), _core = __webpack_require__(7), _realtime = __webpack_require__(7603);
      exports.getSignals = function() {
        const realtimeSignals = (0, _realtime.getRealtimeSignals)();
        return [ ..._core.SIGNALS, ...realtimeSignals ].map(normalizeSignal);
      };
      const normalizeSignal = function({name, number: defaultNumber, description, action, forced = !1, standard}) {
        const {signals: {[name]: constantSignal}} = _os.constants, supported = void 0 !== constantSignal;
        return {
          name,
          number: supported ? constantSignal : defaultNumber,
          description,
          supported,
          action,
          forced,
          standard
        };
      };
    },
    5131: module => {
      module.exports = ({stream = process.stdout} = {}) => Boolean(stream && stream.isTTY && "dumb" !== process.env.TERM && !("CI" in process.env));
    },
    4970: module => {
      const isStream = stream => null !== stream && "object" == typeof stream && "function" == typeof stream.pipe;
      isStream.writable = stream => isStream(stream) && !1 !== stream.writable && "function" == typeof stream._write && "object" == typeof stream._writableState, 
      isStream.readable = stream => isStream(stream) && !1 !== stream.readable && "function" == typeof stream._read && "object" == typeof stream._readableState, 
      isStream.duplex = stream => isStream.writable(stream) && isStream.readable(stream), 
      isStream.transform = stream => isStream.duplex(stream) && "function" == typeof stream._transform && "object" == typeof stream._transformState, 
      module.exports = isStream;
    },
    4500: module => {
      module.exports = () => "win32" !== process.platform || (Boolean(process.env.CI) || Boolean(process.env.WT_SESSION) || "vscode" === process.env.TERM_PROGRAM || "xterm-256color" === process.env.TERM || "alacritty" === process.env.TERM);
    },
    6401: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), fs = __webpack_require__(7147), {promisify} = __webpack_require__(3837), pLocate = __webpack_require__(1885), fsStat = promisify(fs.stat), fsLStat = promisify(fs.lstat), typeMappings = {
        directory: "isDirectory",
        file: "isFile"
      };
      function checkType({type}) {
        if (!(type in typeMappings)) throw new Error(`Invalid type specified: ${type}`);
      }
      const matchType = (type, stat) => void 0 === type || stat[typeMappings[type]]();
      module.exports = async (paths, options) => {
        checkType(options = {
          cwd: process.cwd(),
          type: "file",
          allowSymlinks: !0,
          ...options
        });
        const statFn = options.allowSymlinks ? fsStat : fsLStat;
        return pLocate(paths, (async path_ => {
          try {
            const stat = await statFn(path.resolve(options.cwd, path_));
            return matchType(options.type, stat);
          } catch (_) {
            return !1;
          }
        }), options);
      }, module.exports.sync = (paths, options) => {
        checkType(options = {
          cwd: process.cwd(),
          allowSymlinks: !0,
          type: "file",
          ...options
        });
        const statFn = options.allowSymlinks ? fs.statSync : fs.lstatSync;
        for (const path_ of paths) try {
          const stat = statFn(path.resolve(options.cwd, path_));
          if (matchType(options.type, stat)) return path_;
        } catch (_) {}
      };
    },
    9986: (module, __unused_webpack_exports, __webpack_require__) => {
      const chalk = __webpack_require__(4061), isUnicodeSupported = __webpack_require__(4500), main = {
        info: chalk.blue("ℹ"),
        success: chalk.green("✔"),
        warning: chalk.yellow("⚠"),
        error: chalk.red("✖")
      }, fallback = {
        info: chalk.blue("i"),
        success: chalk.green("√"),
        warning: chalk.yellow("‼"),
        error: chalk.red("×")
      };
      module.exports = isUnicodeSupported() ? main : fallback;
    },
    4034: (module, __unused_webpack_exports, __webpack_require__) => {
      const {PassThrough} = __webpack_require__(2781);
      module.exports = function() {
        var sources = [], output = new PassThrough({
          objectMode: !0
        });
        return output.setMaxListeners(0), output.add = add, output.isEmpty = isEmpty, output.on("unpipe", remove), 
        Array.prototype.slice.call(arguments).forEach(add), output;
        function add(source) {
          return Array.isArray(source) ? (source.forEach(add), this) : (sources.push(source), 
          source.once("end", remove.bind(null, source)), source.once("error", output.emit.bind(output, "error")), 
          source.pipe(output, {
            end: !1
          }), this);
        }
        function isEmpty() {
          return 0 == sources.length;
        }
        function remove(source) {
          !(sources = sources.filter((function(it) {
            return it !== source;
          }))).length && output.readable && output.end();
        }
      };
    },
    4341: module => {
      const mimicFn = (to, from) => {
        for (const prop of Reflect.ownKeys(from)) Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
        return to;
      };
      module.exports = mimicFn, module.exports.default = mimicFn;
    },
    6147: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), pathKey = __webpack_require__(3024), npmRunPath = options => {
        let previous;
        options = {
          cwd: process.cwd(),
          path: process.env[pathKey()],
          execPath: process.execPath,
          ...options
        };
        let cwdPath = path.resolve(options.cwd);
        const result = [];
        for (;previous !== cwdPath; ) result.push(path.join(cwdPath, "node_modules/.bin")), 
        previous = cwdPath, cwdPath = path.resolve(cwdPath, "..");
        const execPathDir = path.resolve(options.cwd, options.execPath, "..");
        return result.push(execPathDir), result.concat(options.path).join(path.delimiter);
      };
      module.exports = npmRunPath, module.exports.default = npmRunPath, module.exports.env = options => {
        const env = {
          ...(options = {
            env: process.env,
            ...options
          }).env
        }, path = pathKey({
          env
        });
        return options.path = env[path], env[path] = module.exports(options), env;
      };
    },
    7678: (module, __unused_webpack_exports, __webpack_require__) => {
      const mimicFn = __webpack_require__(4341), calledFunctions = new WeakMap, onetime = (function_, options = {}) => {
        if ("function" != typeof function_) throw new TypeError("Expected a function");
        let returnValue, callCount = 0;
        const functionName = function_.displayName || function_.name || "<anonymous>", onetime = function(...arguments_) {
          if (calledFunctions.set(onetime, ++callCount), 1 === callCount) returnValue = function_.apply(this, arguments_), 
          function_ = null; else if (!0 === options.throw) throw new Error(`Function \`${functionName}\` can only be called once`);
          return returnValue;
        };
        return mimicFn(onetime, function_), calledFunctions.set(onetime, callCount), onetime;
      };
      module.exports = onetime, module.exports.default = onetime, module.exports.callCount = function_ => {
        if (!calledFunctions.has(function_)) throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
        return calledFunctions.get(function_);
      };
    },
    3395: (module, __unused_webpack_exports, __webpack_require__) => {
      const readline = __webpack_require__(4521), chalk = __webpack_require__(4061), cliCursor = __webpack_require__(3909), cliSpinners = __webpack_require__(4011), logSymbols = __webpack_require__(9986), stripAnsi = __webpack_require__(6003), wcwidth = __webpack_require__(2774), isInteractive = __webpack_require__(5131), isUnicodeSupported = __webpack_require__(4500), {BufferListStream} = __webpack_require__(2415), TEXT = Symbol("text"), PREFIX_TEXT = Symbol("prefixText");
      class StdinDiscarder {
        constructor() {
          this.requests = 0, this.mutedStream = new BufferListStream, this.mutedStream.pipe(process.stdout);
          const self = this;
          this.ourEmit = function(event, data, ...args) {
            const {stdin} = process;
            if (self.requests > 0 || stdin.emit === self.ourEmit) {
              if ("keypress" === event) return;
              "data" === event && data.includes(3) && process.emit("SIGINT"), Reflect.apply(self.oldEmit, this, [ event, data, ...args ]);
            } else Reflect.apply(process.stdin.emit, this, [ event, data, ...args ]);
          };
        }
        start() {
          this.requests++, 1 === this.requests && this.realStart();
        }
        stop() {
          if (this.requests <= 0) throw new Error("`stop` called more times than `start`");
          this.requests--, 0 === this.requests && this.realStop();
        }
        realStart() {
          "win32" !== process.platform && (this.rl = readline.createInterface({
            input: process.stdin,
            output: this.mutedStream
          }), this.rl.on("SIGINT", (() => {
            0 === process.listenerCount("SIGINT") ? process.emit("SIGINT") : (this.rl.close(), 
            process.kill(process.pid, "SIGINT"));
          })));
        }
        realStop() {
          "win32" !== process.platform && (this.rl.close(), this.rl = void 0);
        }
      }
      let stdinDiscarder;
      class Ora {
        constructor(options) {
          stdinDiscarder || (stdinDiscarder = new StdinDiscarder), "string" == typeof options && (options = {
            text: options
          }), this.options = {
            text: "",
            color: "cyan",
            stream: process.stderr,
            discardStdin: !0,
            ...options
          }, this.spinner = this.options.spinner, this.color = this.options.color, this.hideCursor = !1 !== this.options.hideCursor, 
          this.interval = this.options.interval || this.spinner.interval || 100, this.stream = this.options.stream, 
          this.id = void 0, this.isEnabled = "boolean" == typeof this.options.isEnabled ? this.options.isEnabled : isInteractive({
            stream: this.stream
          }), this.isSilent = "boolean" == typeof this.options.isSilent && this.options.isSilent, 
          this.text = this.options.text, this.prefixText = this.options.prefixText, this.linesToClear = 0, 
          this.indent = this.options.indent, this.discardStdin = this.options.discardStdin, 
          this.isDiscardingStdin = !1;
        }
        get indent() {
          return this._indent;
        }
        set indent(indent = 0) {
          if (!(indent >= 0 && Number.isInteger(indent))) throw new Error("The `indent` option must be an integer from 0 and up");
          this._indent = indent;
        }
        _updateInterval(interval) {
          void 0 !== interval && (this.interval = interval);
        }
        get spinner() {
          return this._spinner;
        }
        set spinner(spinner) {
          if (this.frameIndex = 0, "object" == typeof spinner) {
            if (void 0 === spinner.frames) throw new Error("The given spinner must have a `frames` property");
            this._spinner = spinner;
          } else if (isUnicodeSupported()) if (void 0 === spinner) this._spinner = cliSpinners.dots; else {
            if ("default" === spinner || !cliSpinners[spinner]) throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
            this._spinner = cliSpinners[spinner];
          } else this._spinner = cliSpinners.line;
          this._updateInterval(this._spinner.interval);
        }
        get text() {
          return this[TEXT];
        }
        set text(value) {
          this[TEXT] = value, this.updateLineCount();
        }
        get prefixText() {
          return this[PREFIX_TEXT];
        }
        set prefixText(value) {
          this[PREFIX_TEXT] = value, this.updateLineCount();
        }
        get isSpinning() {
          return void 0 !== this.id;
        }
        getFullPrefixText(prefixText = this[PREFIX_TEXT], postfix = " ") {
          return "string" == typeof prefixText ? prefixText + postfix : "function" == typeof prefixText ? prefixText() + postfix : "";
        }
        updateLineCount() {
          const columns = this.stream.columns || 80, fullPrefixText = this.getFullPrefixText(this.prefixText, "-");
          this.lineCount = 0;
          for (const line of stripAnsi(fullPrefixText + "--" + this[TEXT]).split("\n")) this.lineCount += Math.max(1, Math.ceil(wcwidth(line) / columns));
        }
        get isEnabled() {
          return this._isEnabled && !this.isSilent;
        }
        set isEnabled(value) {
          if ("boolean" != typeof value) throw new TypeError("The `isEnabled` option must be a boolean");
          this._isEnabled = value;
        }
        get isSilent() {
          return this._isSilent;
        }
        set isSilent(value) {
          if ("boolean" != typeof value) throw new TypeError("The `isSilent` option must be a boolean");
          this._isSilent = value;
        }
        frame() {
          const {frames} = this.spinner;
          let frame = frames[this.frameIndex];
          this.color && (frame = chalk[this.color](frame)), this.frameIndex = ++this.frameIndex % frames.length;
          return ("string" == typeof this.prefixText && "" !== this.prefixText ? this.prefixText + " " : "") + frame + ("string" == typeof this.text ? " " + this.text : "");
        }
        clear() {
          if (!this.isEnabled || !this.stream.isTTY) return this;
          for (let i = 0; i < this.linesToClear; i++) i > 0 && this.stream.moveCursor(0, -1), 
          this.stream.clearLine(), this.stream.cursorTo(this.indent);
          return this.linesToClear = 0, this;
        }
        render() {
          return this.isSilent || (this.clear(), this.stream.write(this.frame()), this.linesToClear = this.lineCount), 
          this;
        }
        start(text) {
          return text && (this.text = text), this.isSilent ? this : this.isEnabled ? (this.isSpinning || (this.hideCursor && cliCursor.hide(this.stream), 
          this.discardStdin && process.stdin.isTTY && (this.isDiscardingStdin = !0, stdinDiscarder.start()), 
          this.render(), this.id = setInterval(this.render.bind(this), this.interval)), this) : (this.text && this.stream.write(`- ${this.text}\n`), 
          this);
        }
        stop() {
          return this.isEnabled ? (clearInterval(this.id), this.id = void 0, this.frameIndex = 0, 
          this.clear(), this.hideCursor && cliCursor.show(this.stream), this.discardStdin && process.stdin.isTTY && this.isDiscardingStdin && (stdinDiscarder.stop(), 
          this.isDiscardingStdin = !1), this) : this;
        }
        succeed(text) {
          return this.stopAndPersist({
            symbol: logSymbols.success,
            text
          });
        }
        fail(text) {
          return this.stopAndPersist({
            symbol: logSymbols.error,
            text
          });
        }
        warn(text) {
          return this.stopAndPersist({
            symbol: logSymbols.warning,
            text
          });
        }
        info(text) {
          return this.stopAndPersist({
            symbol: logSymbols.info,
            text
          });
        }
        stopAndPersist(options = {}) {
          if (this.isSilent) return this;
          const prefixText = options.prefixText || this.prefixText, text = options.text || this.text, fullText = "string" == typeof text ? " " + text : "";
          return this.stop(), this.stream.write(`${this.getFullPrefixText(prefixText, " ")}${options.symbol || " "}${fullText}\n`), 
          this;
        }
      }
      module.exports = function(options) {
        return new Ora(options);
      }, module.exports.promise = (action, options) => {
        if ("function" != typeof action.then) throw new TypeError("Parameter `action` must be a Promise");
        const spinner = new Ora(options);
        return spinner.start(), (async () => {
          try {
            await action, spinner.succeed();
          } catch {
            spinner.fail();
          }
        })(), spinner;
      };
    },
    406: (module, __unused_webpack_exports, __webpack_require__) => {
      const pTry = __webpack_require__(9161), pLimit = concurrency => {
        if (!Number.isInteger(concurrency) && concurrency !== 1 / 0 || !(concurrency > 0)) return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
        const queue = [];
        let activeCount = 0;
        const next = () => {
          activeCount--, queue.length > 0 && queue.shift()();
        }, run = (fn, resolve, ...args) => {
          activeCount++;
          const result = pTry(fn, ...args);
          resolve(result), result.then(next, next);
        }, generator = (fn, ...args) => new Promise((resolve => ((fn, resolve, ...args) => {
          activeCount < concurrency ? run(fn, resolve, ...args) : queue.push(run.bind(null, fn, resolve, ...args));
        })(fn, resolve, ...args)));
        return Object.defineProperties(generator, {
          activeCount: {
            get: () => activeCount
          },
          pendingCount: {
            get: () => queue.length
          }
        }), generator;
      };
      module.exports = pLimit, module.exports.default = pLimit;
    },
    1885: (module, __unused_webpack_exports, __webpack_require__) => {
      const pLimit = __webpack_require__(406);
      class EndError extends Error {
        constructor(value) {
          super(), this.value = value;
        }
      }
      const testElement = async (element, tester) => tester(await element), finder = async element => {
        const values = await Promise.all(element);
        if (!0 === values[1]) throw new EndError(values[0]);
        return !1;
      }, pLocate = async (iterable, tester, options) => {
        options = {
          concurrency: 1 / 0,
          preserveOrder: !0,
          ...options
        };
        const limit = pLimit(options.concurrency), items = [ ...iterable ].map((element => [ element, limit(testElement, element, tester) ])), checkLimit = pLimit(options.preserveOrder ? 1 : 1 / 0);
        try {
          await Promise.all(items.map((element => checkLimit(finder, element))));
        } catch (error) {
          if (error instanceof EndError) return error.value;
          throw error;
        }
      };
      module.exports = pLocate, module.exports.default = pLocate;
    },
    9161: module => {
      const pTry = (fn, ...arguments_) => new Promise((resolve => {
        resolve(fn(...arguments_));
      }));
      module.exports = pTry, module.exports.default = pTry;
    },
    3024: module => {
      const pathKey = (options = {}) => {
        const environment = options.env || process.env;
        return "win32" !== (options.platform || process.platform) ? "PATH" : Object.keys(environment).reverse().find((key => "PATH" === key.toUpperCase())) || "Path";
      };
      module.exports = pathKey, module.exports.default = pathKey;
    },
    4012: module => {
      const codes = {};
      function createErrorType(code, message, Base) {
        Base || (Base = Error);
        class NodeError extends Base {
          constructor(arg1, arg2, arg3) {
            super(function(arg1, arg2, arg3) {
              return "string" == typeof message ? message : message(arg1, arg2, arg3);
            }(arg1, arg2, arg3));
          }
        }
        NodeError.prototype.name = Base.name, NodeError.prototype.code = code, codes[code] = NodeError;
      }
      function oneOf(expected, thing) {
        if (Array.isArray(expected)) {
          const len = expected.length;
          return expected = expected.map((i => String(i))), len > 2 ? `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1] : 2 === len ? `one of ${thing} ${expected[0]} or ${expected[1]}` : `of ${thing} ${expected[0]}`;
        }
        return `of ${thing} ${String(expected)}`;
      }
      createErrorType("ERR_INVALID_OPT_VALUE", (function(name, value) {
        return 'The value "' + value + '" is invalid for option "' + name + '"';
      }), TypeError), createErrorType("ERR_INVALID_ARG_TYPE", (function(name, expected, actual) {
        let determiner;
        var search, pos;
        let msg;
        if ("string" == typeof expected && (search = "not ", expected.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search) ? (determiner = "must not be", 
        expected = expected.replace(/^not /, "")) : determiner = "must be", function(str, search, this_len) {
          return (void 0 === this_len || this_len > str.length) && (this_len = str.length), 
          str.substring(this_len - search.length, this_len) === search;
        }(name, " argument")) msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`; else {
          const type = function(str, search, start) {
            return "number" != typeof start && (start = 0), !(start + search.length > str.length) && -1 !== str.indexOf(search, start);
          }(name, ".") ? "property" : "argument";
          msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
        }
        return msg += ". Received type " + typeof actual, msg;
      }), TypeError), createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), 
      createErrorType("ERR_METHOD_NOT_IMPLEMENTED", (function(name) {
        return "The " + name + " method is not implemented";
      })), createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), createErrorType("ERR_STREAM_DESTROYED", (function(name) {
        return "Cannot call " + name + " after a stream was destroyed";
      })), createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), 
      createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end"), 
      createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), 
      createErrorType("ERR_UNKNOWN_ENCODING", (function(arg) {
        return "Unknown encoding: " + arg;
      }), TypeError), createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), 
      module.exports.q = codes;
    },
    5850: (module, __unused_webpack_exports, __webpack_require__) => {
      var _Object$setPrototypeO;
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      var finished = __webpack_require__(8610), kLastResolve = Symbol("lastResolve"), kLastReject = Symbol("lastReject"), kError = Symbol("error"), kEnded = Symbol("ended"), kLastPromise = Symbol("lastPromise"), kHandlePromise = Symbol("handlePromise"), kStream = Symbol("stream");
      function createIterResult(value, done) {
        return {
          value,
          done
        };
      }
      function readAndResolve(iter) {
        var resolve = iter[kLastResolve];
        if (null !== resolve) {
          var data = iter[kStream].read();
          null !== data && (iter[kLastPromise] = null, iter[kLastResolve] = null, iter[kLastReject] = null, 
          resolve(createIterResult(data, !1)));
        }
      }
      function onReadable(iter) {
        process.nextTick(readAndResolve, iter);
      }
      var AsyncIteratorPrototype = Object.getPrototypeOf((function() {})), ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_defineProperty(_Object$setPrototypeO = {
        get stream() {
          return this[kStream];
        },
        next: function() {
          var _this = this, error = this[kError];
          if (null !== error) return Promise.reject(error);
          if (this[kEnded]) return Promise.resolve(createIterResult(void 0, !0));
          if (this[kStream].destroyed) return new Promise((function(resolve, reject) {
            process.nextTick((function() {
              _this[kError] ? reject(_this[kError]) : resolve(createIterResult(void 0, !0));
            }));
          }));
          var promise, lastPromise = this[kLastPromise];
          if (lastPromise) promise = new Promise(function(lastPromise, iter) {
            return function(resolve, reject) {
              lastPromise.then((function() {
                iter[kEnded] ? resolve(createIterResult(void 0, !0)) : iter[kHandlePromise](resolve, reject);
              }), reject);
            };
          }(lastPromise, this)); else {
            var data = this[kStream].read();
            if (null !== data) return Promise.resolve(createIterResult(data, !1));
            promise = new Promise(this[kHandlePromise]);
          }
          return this[kLastPromise] = promise, promise;
        }
      }, Symbol.asyncIterator, (function() {
        return this;
      })), _defineProperty(_Object$setPrototypeO, "return", (function() {
        var _this2 = this;
        return new Promise((function(resolve, reject) {
          _this2[kStream].destroy(null, (function(err) {
            err ? reject(err) : resolve(createIterResult(void 0, !0));
          }));
        }));
      })), _Object$setPrototypeO), AsyncIteratorPrototype);
      module.exports = function(stream) {
        var _Object$create, iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_defineProperty(_Object$create = {}, kStream, {
          value: stream,
          writable: !0
        }), _defineProperty(_Object$create, kLastResolve, {
          value: null,
          writable: !0
        }), _defineProperty(_Object$create, kLastReject, {
          value: null,
          writable: !0
        }), _defineProperty(_Object$create, kError, {
          value: null,
          writable: !0
        }), _defineProperty(_Object$create, kEnded, {
          value: stream._readableState.endEmitted,
          writable: !0
        }), _defineProperty(_Object$create, kHandlePromise, {
          value: function(resolve, reject) {
            var data = iterator[kStream].read();
            data ? (iterator[kLastPromise] = null, iterator[kLastResolve] = null, iterator[kLastReject] = null, 
            resolve(createIterResult(data, !1))) : (iterator[kLastResolve] = resolve, iterator[kLastReject] = reject);
          },
          writable: !0
        }), _Object$create));
        return iterator[kLastPromise] = null, finished(stream, (function(err) {
          if (err && "ERR_STREAM_PREMATURE_CLOSE" !== err.code) {
            var reject = iterator[kLastReject];
            return null !== reject && (iterator[kLastPromise] = null, iterator[kLastResolve] = null, 
            iterator[kLastReject] = null, reject(err)), void (iterator[kError] = err);
          }
          var resolve = iterator[kLastResolve];
          null !== resolve && (iterator[kLastPromise] = null, iterator[kLastResolve] = null, 
          iterator[kLastReject] = null, resolve(createIterResult(void 0, !0))), iterator[kEnded] = !0;
        })), stream.on("readable", onReadable.bind(null, iterator)), iterator;
      };
    },
    7327: (module, __unused_webpack_exports, __webpack_require__) => {
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly && (symbols = symbols.filter((function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          }))), keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
          "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      var Buffer = __webpack_require__(4300).Buffer, inspect = __webpack_require__(3837).inspect, custom = inspect && inspect.custom || "inspect";
      module.exports = function() {
        function BufferList() {
          !function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
          }(this, BufferList), this.head = null, this.tail = null, this.length = 0;
        }
        var Constructor, protoProps, staticProps;
        return Constructor = BufferList, protoProps = [ {
          key: "push",
          value: function(v) {
            var entry = {
              data: v,
              next: null
            };
            this.length > 0 ? this.tail.next = entry : this.head = entry, this.tail = entry, 
            ++this.length;
          }
        }, {
          key: "unshift",
          value: function(v) {
            var entry = {
              data: v,
              next: this.head
            };
            0 === this.length && (this.tail = entry), this.head = entry, ++this.length;
          }
        }, {
          key: "shift",
          value: function() {
            if (0 !== this.length) {
              var ret = this.head.data;
              return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, 
              --this.length, ret;
            }
          }
        }, {
          key: "clear",
          value: function() {
            this.head = this.tail = null, this.length = 0;
          }
        }, {
          key: "join",
          value: function(s) {
            if (0 === this.length) return "";
            for (var p = this.head, ret = "" + p.data; p = p.next; ) ret += s + p.data;
            return ret;
          }
        }, {
          key: "concat",
          value: function(n) {
            if (0 === this.length) return Buffer.alloc(0);
            for (var src, target, offset, ret = Buffer.allocUnsafe(n >>> 0), p = this.head, i = 0; p; ) src = p.data, 
            target = ret, offset = i, Buffer.prototype.copy.call(src, target, offset), i += p.data.length, 
            p = p.next;
            return ret;
          }
        }, {
          key: "consume",
          value: function(n, hasStrings) {
            var ret;
            return n < this.head.data.length ? (ret = this.head.data.slice(0, n), this.head.data = this.head.data.slice(n)) : ret = n === this.head.data.length ? this.shift() : hasStrings ? this._getString(n) : this._getBuffer(n), 
            ret;
          }
        }, {
          key: "first",
          value: function() {
            return this.head.data;
          }
        }, {
          key: "_getString",
          value: function(n) {
            var p = this.head, c = 1, ret = p.data;
            for (n -= ret.length; p = p.next; ) {
              var str = p.data, nb = n > str.length ? str.length : n;
              if (nb === str.length ? ret += str : ret += str.slice(0, n), 0 == (n -= nb)) {
                nb === str.length ? (++c, p.next ? this.head = p.next : this.head = this.tail = null) : (this.head = p, 
                p.data = str.slice(nb));
                break;
              }
              ++c;
            }
            return this.length -= c, ret;
          }
        }, {
          key: "_getBuffer",
          value: function(n) {
            var ret = Buffer.allocUnsafe(n), p = this.head, c = 1;
            for (p.data.copy(ret), n -= p.data.length; p = p.next; ) {
              var buf = p.data, nb = n > buf.length ? buf.length : n;
              if (buf.copy(ret, ret.length - n, 0, nb), 0 == (n -= nb)) {
                nb === buf.length ? (++c, p.next ? this.head = p.next : this.head = this.tail = null) : (this.head = p, 
                p.data = buf.slice(nb));
                break;
              }
              ++c;
            }
            return this.length -= c, ret;
          }
        }, {
          key: custom,
          value: function(_, options) {
            return inspect(this, function(target) {
              for (var i = 1; i < arguments.length; i++) {
                var source = null != arguments[i] ? arguments[i] : {};
                i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
                  _defineProperty(target, key, source[key]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
                  Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                }));
              }
              return target;
            }({}, options, {
              depth: 0,
              customInspect: !1
            }));
          }
        } ], protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
        BufferList;
      }();
    },
    1195: module => {
      function emitErrorAndCloseNT(self, err) {
        emitErrorNT(self, err), emitCloseNT(self);
      }
      function emitCloseNT(self) {
        self._writableState && !self._writableState.emitClose || self._readableState && !self._readableState.emitClose || self.emit("close");
      }
      function emitErrorNT(self, err) {
        self.emit("error", err);
      }
      module.exports = {
        destroy: function(err, cb) {
          var _this = this, readableDestroyed = this._readableState && this._readableState.destroyed, writableDestroyed = this._writableState && this._writableState.destroyed;
          return readableDestroyed || writableDestroyed ? (cb ? cb(err) : err && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, 
          process.nextTick(emitErrorNT, this, err)) : process.nextTick(emitErrorNT, this, err)), 
          this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), 
          this._destroy(err || null, (function(err) {
            !cb && err ? _this._writableState ? _this._writableState.errorEmitted ? process.nextTick(emitCloseNT, _this) : (_this._writableState.errorEmitted = !0, 
            process.nextTick(emitErrorAndCloseNT, _this, err)) : process.nextTick(emitErrorAndCloseNT, _this, err) : cb ? (process.nextTick(emitCloseNT, _this), 
            cb(err)) : process.nextTick(emitCloseNT, _this);
          })), this);
        },
        undestroy: function() {
          this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, 
          this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, 
          this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, 
          this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
        },
        errorOrDestroy: function(stream, err) {
          var rState = stream._readableState, wState = stream._writableState;
          rState && rState.autoDestroy || wState && wState.autoDestroy ? stream.destroy(err) : stream.emit("error", err);
        }
      };
    },
    8610: (module, __unused_webpack_exports, __webpack_require__) => {
      var ERR_STREAM_PREMATURE_CLOSE = __webpack_require__(4012).q.ERR_STREAM_PREMATURE_CLOSE;
      function noop() {}
      module.exports = function eos(stream, opts, callback) {
        if ("function" == typeof opts) return eos(stream, null, opts);
        opts || (opts = {}), callback = function(callback) {
          var called = !1;
          return function() {
            if (!called) {
              called = !0;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
              callback.apply(this, args);
            }
          };
        }(callback || noop);
        var readable = opts.readable || !1 !== opts.readable && stream.readable, writable = opts.writable || !1 !== opts.writable && stream.writable, onlegacyfinish = function() {
          stream.writable || onfinish();
        }, writableEnded = stream._writableState && stream._writableState.finished, onfinish = function() {
          writable = !1, writableEnded = !0, readable || callback.call(stream);
        }, readableEnded = stream._readableState && stream._readableState.endEmitted, onend = function() {
          readable = !1, readableEnded = !0, writable || callback.call(stream);
        }, onerror = function(err) {
          callback.call(stream, err);
        }, onclose = function() {
          var err;
          return readable && !readableEnded ? (stream._readableState && stream._readableState.ended || (err = new ERR_STREAM_PREMATURE_CLOSE), 
          callback.call(stream, err)) : writable && !writableEnded ? (stream._writableState && stream._writableState.ended || (err = new ERR_STREAM_PREMATURE_CLOSE), 
          callback.call(stream, err)) : void 0;
        }, onrequest = function() {
          stream.req.on("finish", onfinish);
        };
        return !function(stream) {
          return stream.setHeader && "function" == typeof stream.abort;
        }(stream) ? writable && !stream._writableState && (stream.on("end", onlegacyfinish), 
        stream.on("close", onlegacyfinish)) : (stream.on("complete", onfinish), stream.on("abort", onclose), 
        stream.req ? onrequest() : stream.on("request", onrequest)), stream.on("end", onend), 
        stream.on("finish", onfinish), !1 !== opts.error && stream.on("error", onerror), 
        stream.on("close", onclose), function() {
          stream.removeListener("complete", onfinish), stream.removeListener("abort", onclose), 
          stream.removeListener("request", onrequest), stream.req && stream.req.removeListener("finish", onfinish), 
          stream.removeListener("end", onlegacyfinish), stream.removeListener("close", onlegacyfinish), 
          stream.removeListener("finish", onfinish), stream.removeListener("end", onend), 
          stream.removeListener("error", onerror), stream.removeListener("close", onclose);
        };
      };
    },
    6307: (module, __unused_webpack_exports, __webpack_require__) => {
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg), value = info.value;
        } catch (error) {
          return void reject(error);
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self = this, args = arguments;
          return new Promise((function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          }));
        };
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly && (symbols = symbols.filter((function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          }))), keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      var ERR_INVALID_ARG_TYPE = __webpack_require__(4012).q.ERR_INVALID_ARG_TYPE;
      module.exports = function(Readable, iterable, opts) {
        var iterator;
        if (iterable && "function" == typeof iterable.next) iterator = iterable; else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator](); else {
          if (!iterable || !iterable[Symbol.iterator]) throw new ERR_INVALID_ARG_TYPE("iterable", [ "Iterable" ], iterable);
          iterator = iterable[Symbol.iterator]();
        }
        var readable = new Readable(function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
              _defineProperty(target, key, source[key]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            }));
          }
          return target;
        }({
          objectMode: !0
        }, opts)), reading = !1;
        function next() {
          return _next2.apply(this, arguments);
        }
        function _next2() {
          return (_next2 = _asyncToGenerator((function*() {
            try {
              var _ref = yield iterator.next(), value = _ref.value;
              _ref.done ? readable.push(null) : readable.push(yield value) ? next() : reading = !1;
            } catch (err) {
              readable.destroy(err);
            }
          }))).apply(this, arguments);
        }
        return readable._read = function() {
          reading || (reading = !0, next());
        }, readable;
      };
    },
    2457: (module, __unused_webpack_exports, __webpack_require__) => {
      var ERR_INVALID_OPT_VALUE = __webpack_require__(4012).q.ERR_INVALID_OPT_VALUE;
      module.exports = {
        getHighWaterMark: function(state, options, duplexKey, isDuplex) {
          var hwm = function(options, isDuplex, duplexKey) {
            return null != options.highWaterMark ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
          }(options, isDuplex, duplexKey);
          if (null != hwm) {
            if (!isFinite(hwm) || Math.floor(hwm) !== hwm || hwm < 0) throw new ERR_INVALID_OPT_VALUE(isDuplex ? duplexKey : "highWaterMark", hwm);
            return Math.floor(hwm);
          }
          return state.objectMode ? 16 : 16384;
        }
      };
    },
    1354: (module, __unused_webpack_exports, __webpack_require__) => {
      const onetime = __webpack_require__(7678), signalExit = __webpack_require__(2654);
      module.exports = onetime((() => {
        signalExit((() => {
          process.stderr.write("[?25h");
        }), {
          alwaysLast: !0
        });
      }));
    },
    2063: (module, __unused_webpack_exports, __webpack_require__) => {
      const shebangRegex = __webpack_require__(9395);
      module.exports = (string = "") => {
        const match = string.match(shebangRegex);
        if (!match) return null;
        const [path, argument] = match[0].replace(/#! ?/, "").split(" "), binary = path.split("/").pop();
        return "env" === binary ? argument : argument ? `${binary} ${argument}` : binary;
      };
    },
    9395: module => {
      module.exports = /^#!(.*)/;
    },
    6003: (module, __unused_webpack_exports, __webpack_require__) => {
      const ansiRegex = __webpack_require__(4277);
      module.exports = string => "string" == typeof string ? string.replace(ansiRegex(), "") : string;
    },
    8150: module => {
      module.exports = input => {
        const LF = "string" == typeof input ? "\n" : "\n".charCodeAt(), CR = "string" == typeof input ? "\r" : "\r".charCodeAt();
        return input[input.length - 1] === LF && (input = input.slice(0, input.length - 1)), 
        input[input.length - 1] === CR && (input = input.slice(0, input.length - 1)), input;
      };
    },
    2130: (module, __unused_webpack_exports, __webpack_require__) => {
      const os = __webpack_require__(2037), tty = __webpack_require__(6224), hasFlag = __webpack_require__(6560), {env} = process;
      let forceColor;
      function translateLevel(level) {
        return 0 !== level && {
          level,
          hasBasic: !0,
          has256: level >= 2,
          has16m: level >= 3
        };
      }
      function supportsColor(haveStream, streamIsTTY) {
        if (0 === forceColor) return 0;
        if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
        if (hasFlag("color=256")) return 2;
        if (haveStream && !streamIsTTY && void 0 === forceColor) return 0;
        const min = forceColor || 0;
        if ("dumb" === env.TERM) return min;
        if ("win32" === process.platform) {
          const osRelease = os.release().split(".");
          return Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586 ? Number(osRelease[2]) >= 14931 ? 3 : 2 : 1;
        }
        if ("CI" in env) return [ "TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE" ].some((sign => sign in env)) || "codeship" === env.CI_NAME ? 1 : min;
        if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
        if ("truecolor" === env.COLORTERM) return 3;
        if ("TERM_PROGRAM" in env) {
          const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (env.TERM_PROGRAM) {
           case "iTerm.app":
            return version >= 3 ? 3 : 2;

           case "Apple_Terminal":
            return 2;
          }
        }
        return /-256(color)?$/i.test(env.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM) || "COLORTERM" in env ? 1 : min;
      }
      hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never") ? forceColor = 0 : (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) && (forceColor = 1), 
      "FORCE_COLOR" in env && (forceColor = "true" === env.FORCE_COLOR ? 1 : "false" === env.FORCE_COLOR ? 0 : 0 === env.FORCE_COLOR.length ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3)), 
      module.exports = {
        supportsColor: function(stream) {
          return translateLevel(supportsColor(stream, stream && stream.isTTY));
        },
        stdout: translateLevel(supportsColor(!0, tty.isatty(1))),
        stderr: translateLevel(supportsColor(!0, tty.isatty(2)))
      };
    },
    8981: (__unused_webpack_module, exports) => {
      exports.E = function(fn) {
        return Object.defineProperty((function() {
          if ("function" != typeof arguments[arguments.length - 1]) return new Promise(((resolve, reject) => {
            arguments[arguments.length] = (err, res) => {
              if (err) return reject(err);
              resolve(res);
            }, arguments.length++, fn.apply(this, arguments);
          }));
          fn.apply(this, arguments);
        }), "name", {
          value: fn.name
        });
      };
    },
    8236: module => {
      module.exports = function(obj) {
        if (null === obj || "object" != typeof obj) return obj;
        if (obj instanceof Object) var copy = {
          __proto__: getPrototypeOf(obj)
        }; else copy = Object.create(null);
        return Object.getOwnPropertyNames(obj).forEach((function(key) {
          Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
        })), copy;
      };
      var getPrototypeOf = Object.getPrototypeOf || function(obj) {
        return obj.__proto__;
      };
    },
    2531: (module, __unused_webpack_exports, __webpack_require__) => {
      var gracefulQueue, previousSymbol, fs = __webpack_require__(7147), polyfills = __webpack_require__(1959), legacy = __webpack_require__(3808), clone = __webpack_require__(8236), util = __webpack_require__(3837);
      function publishQueue(context, queue) {
        Object.defineProperty(context, gracefulQueue, {
          get: function() {
            return queue;
          }
        });
      }
      "function" == typeof Symbol && "function" == typeof Symbol.for ? (gracefulQueue = Symbol.for("graceful-fs.queue"), 
      previousSymbol = Symbol.for("graceful-fs.previous")) : (gracefulQueue = "___graceful-fs.queue", 
      previousSymbol = "___graceful-fs.previous");
      var retryTimer, debug = function() {};
      if (util.debuglog ? debug = util.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: "), console.error(m);
      }), !fs[gracefulQueue]) {
        var queue = global[gracefulQueue] || [];
        publishQueue(fs, queue), fs.close = function(fs$close) {
          function close(fd, cb) {
            return fs$close.call(fs, fd, (function(err) {
              err || resetQueue(), "function" == typeof cb && cb.apply(this, arguments);
            }));
          }
          return Object.defineProperty(close, previousSymbol, {
            value: fs$close
          }), close;
        }(fs.close), fs.closeSync = function(fs$closeSync) {
          function closeSync(fd) {
            fs$closeSync.apply(fs, arguments), resetQueue();
          }
          return Object.defineProperty(closeSync, previousSymbol, {
            value: fs$closeSync
          }), closeSync;
        }(fs.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", (function() {
          debug(fs[gracefulQueue]), __webpack_require__(9491).equal(fs[gracefulQueue].length, 0);
        }));
      }
      function patch(fs) {
        polyfills(fs), fs.gracefulify = patch, fs.createReadStream = function(path, options) {
          return new fs.ReadStream(path, options);
        }, fs.createWriteStream = function(path, options) {
          return new fs.WriteStream(path, options);
        };
        var fs$readFile = fs.readFile;
        fs.readFile = function(path, options, cb) {
          "function" == typeof options && (cb = options, options = null);
          return function go$readFile(path, options, cb, startTime) {
            return fs$readFile(path, options, (function(err) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$readFile, [ path, options, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(path, options, cb);
        };
        var fs$writeFile = fs.writeFile;
        fs.writeFile = function(path, data, options, cb) {
          "function" == typeof options && (cb = options, options = null);
          return function go$writeFile(path, data, options, cb, startTime) {
            return fs$writeFile(path, data, options, (function(err) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$writeFile, [ path, data, options, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(path, data, options, cb);
        };
        var fs$appendFile = fs.appendFile;
        fs$appendFile && (fs.appendFile = function(path, data, options, cb) {
          "function" == typeof options && (cb = options, options = null);
          return function go$appendFile(path, data, options, cb, startTime) {
            return fs$appendFile(path, data, options, (function(err) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$appendFile, [ path, data, options, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(path, data, options, cb);
        });
        var fs$copyFile = fs.copyFile;
        fs$copyFile && (fs.copyFile = function(src, dest, flags, cb) {
          "function" == typeof flags && (cb = flags, flags = 0);
          return function go$copyFile(src, dest, flags, cb, startTime) {
            return fs$copyFile(src, dest, flags, (function(err) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$copyFile, [ src, dest, flags, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(src, dest, flags, cb);
        });
        var fs$readdir = fs.readdir;
        fs.readdir = function(path, options, cb) {
          "function" == typeof options && (cb = options, options = null);
          var go$readdir = noReaddirOptionVersions.test(process.version) ? function(path, options, cb, startTime) {
            return fs$readdir(path, fs$readdirCallback(path, options, cb, startTime));
          } : function(path, options, cb, startTime) {
            return fs$readdir(path, options, fs$readdirCallback(path, options, cb, startTime));
          };
          return go$readdir(path, options, cb);
          function fs$readdirCallback(path, options, cb, startTime) {
            return function(err, files) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? (files && files.sort && files.sort(), 
              "function" == typeof cb && cb.call(this, err, files)) : enqueue([ go$readdir, [ path, options, cb ], err, startTime || Date.now(), Date.now() ]);
            };
          }
        };
        var noReaddirOptionVersions = /^v[0-5]\./;
        if ("v0.8" === process.version.substr(0, 4)) {
          var legStreams = legacy(fs);
          ReadStream = legStreams.ReadStream, WriteStream = legStreams.WriteStream;
        }
        var fs$ReadStream = fs.ReadStream;
        fs$ReadStream && (ReadStream.prototype = Object.create(fs$ReadStream.prototype), 
        ReadStream.prototype.open = function() {
          var that = this;
          open(that.path, that.flags, that.mode, (function(err, fd) {
            err ? (that.autoClose && that.destroy(), that.emit("error", err)) : (that.fd = fd, 
            that.emit("open", fd), that.read());
          }));
        });
        var fs$WriteStream = fs.WriteStream;
        fs$WriteStream && (WriteStream.prototype = Object.create(fs$WriteStream.prototype), 
        WriteStream.prototype.open = function() {
          var that = this;
          open(that.path, that.flags, that.mode, (function(err, fd) {
            err ? (that.destroy(), that.emit("error", err)) : (that.fd = fd, that.emit("open", fd));
          }));
        }), Object.defineProperty(fs, "ReadStream", {
          get: function() {
            return ReadStream;
          },
          set: function(val) {
            ReadStream = val;
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(fs, "WriteStream", {
          get: function() {
            return WriteStream;
          },
          set: function(val) {
            WriteStream = val;
          },
          enumerable: !0,
          configurable: !0
        });
        var FileReadStream = ReadStream;
        Object.defineProperty(fs, "FileReadStream", {
          get: function() {
            return FileReadStream;
          },
          set: function(val) {
            FileReadStream = val;
          },
          enumerable: !0,
          configurable: !0
        });
        var FileWriteStream = WriteStream;
        function ReadStream(path, options) {
          return this instanceof ReadStream ? (fs$ReadStream.apply(this, arguments), this) : ReadStream.apply(Object.create(ReadStream.prototype), arguments);
        }
        function WriteStream(path, options) {
          return this instanceof WriteStream ? (fs$WriteStream.apply(this, arguments), this) : WriteStream.apply(Object.create(WriteStream.prototype), arguments);
        }
        Object.defineProperty(fs, "FileWriteStream", {
          get: function() {
            return FileWriteStream;
          },
          set: function(val) {
            FileWriteStream = val;
          },
          enumerable: !0,
          configurable: !0
        });
        var fs$open = fs.open;
        function open(path, flags, mode, cb) {
          return "function" == typeof mode && (cb = mode, mode = null), function go$open(path, flags, mode, cb, startTime) {
            return fs$open(path, flags, mode, (function(err, fd) {
              !err || "EMFILE" !== err.code && "ENFILE" !== err.code ? "function" == typeof cb && cb.apply(this, arguments) : enqueue([ go$open, [ path, flags, mode, cb ], err, startTime || Date.now(), Date.now() ]);
            }));
          }(path, flags, mode, cb);
        }
        return fs.open = open, fs;
      }
      function enqueue(elem) {
        debug("ENQUEUE", elem[0].name, elem[1]), fs[gracefulQueue].push(elem), retry();
      }
      function resetQueue() {
        for (var now = Date.now(), i = 0; i < fs[gracefulQueue].length; ++i) fs[gracefulQueue][i].length > 2 && (fs[gracefulQueue][i][3] = now, 
        fs[gracefulQueue][i][4] = now);
        retry();
      }
      function retry() {
        if (clearTimeout(retryTimer), retryTimer = void 0, 0 !== fs[gracefulQueue].length) {
          var elem = fs[gracefulQueue].shift(), fn = elem[0], args = elem[1], err = elem[2], startTime = elem[3], lastTime = elem[4];
          if (void 0 === startTime) debug("RETRY", fn.name, args), fn.apply(null, args); else if (Date.now() - startTime >= 6e4) {
            debug("TIMEOUT", fn.name, args);
            var cb = args.pop();
            "function" == typeof cb && cb.call(null, err);
          } else {
            var sinceAttempt = Date.now() - lastTime, sinceStart = Math.max(lastTime - startTime, 1);
            sinceAttempt >= Math.min(1.2 * sinceStart, 100) ? (debug("RETRY", fn.name, args), 
            fn.apply(null, args.concat([ startTime ]))) : fs[gracefulQueue].push(elem);
          }
          void 0 === retryTimer && (retryTimer = setTimeout(retry, 0));
        }
      }
      global[gracefulQueue] || publishQueue(global, fs[gracefulQueue]), module.exports = patch(clone(fs)), 
      process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched && (module.exports = patch(fs), 
      fs.__patched = !0);
    },
    3808: (module, __unused_webpack_exports, __webpack_require__) => {
      var Stream = __webpack_require__(2781).Stream;
      module.exports = function(fs) {
        return {
          ReadStream: function ReadStream(path, options) {
            if (!(this instanceof ReadStream)) return new ReadStream(path, options);
            Stream.call(this);
            var self = this;
            this.path = path, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", 
            this.mode = 438, this.bufferSize = 65536, options = options || {};
            for (var keys = Object.keys(options), index = 0, length = keys.length; index < length; index++) {
              var key = keys[index];
              this[key] = options[key];
            }
            this.encoding && this.setEncoding(this.encoding);
            if (void 0 !== this.start) {
              if ("number" != typeof this.start) throw TypeError("start must be a Number");
              if (void 0 === this.end) this.end = 1 / 0; else if ("number" != typeof this.end) throw TypeError("end must be a Number");
              if (this.start > this.end) throw new Error("start must be <= end");
              this.pos = this.start;
            }
            if (null !== this.fd) return void process.nextTick((function() {
              self._read();
            }));
            fs.open(this.path, this.flags, this.mode, (function(err, fd) {
              if (err) return self.emit("error", err), void (self.readable = !1);
              self.fd = fd, self.emit("open", fd), self._read();
            }));
          },
          WriteStream: function WriteStream(path, options) {
            if (!(this instanceof WriteStream)) return new WriteStream(path, options);
            Stream.call(this), this.path = path, this.fd = null, this.writable = !0, this.flags = "w", 
            this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, options = options || {};
            for (var keys = Object.keys(options), index = 0, length = keys.length; index < length; index++) {
              var key = keys[index];
              this[key] = options[key];
            }
            if (void 0 !== this.start) {
              if ("number" != typeof this.start) throw TypeError("start must be a Number");
              if (this.start < 0) throw new Error("start must be >= zero");
              this.pos = this.start;
            }
            this.busy = !1, this._queue = [], null === this.fd && (this._open = fs.open, this._queue.push([ this._open, this.path, this.flags, this.mode, void 0 ]), 
            this.flush());
          }
        };
      };
    },
    1959: (module, __unused_webpack_exports, __webpack_require__) => {
      var constants = __webpack_require__(2057), origCwd = process.cwd, cwd = null, platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
      process.cwd = function() {
        return cwd || (cwd = origCwd.call(process)), cwd;
      };
      try {
        process.cwd();
      } catch (er) {}
      if ("function" == typeof process.chdir) {
        var chdir = process.chdir;
        process.chdir = function(d) {
          cwd = null, chdir.call(process, d);
        }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, chdir);
      }
      module.exports = function(fs) {
        constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && function(fs) {
          fs.lchmod = function(path, mode, callback) {
            fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, (function(err, fd) {
              err ? callback && callback(err) : fs.fchmod(fd, mode, (function(err) {
                fs.close(fd, (function(err2) {
                  callback && callback(err || err2);
                }));
              }));
            }));
          }, fs.lchmodSync = function(path, mode) {
            var ret, fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode), threw = !0;
            try {
              ret = fs.fchmodSync(fd, mode), threw = !1;
            } finally {
              if (threw) try {
                fs.closeSync(fd);
              } catch (er) {} else fs.closeSync(fd);
            }
            return ret;
          };
        }(fs);
        fs.lutimes || function(fs) {
          constants.hasOwnProperty("O_SYMLINK") && fs.futimes ? (fs.lutimes = function(path, at, mt, cb) {
            fs.open(path, constants.O_SYMLINK, (function(er, fd) {
              er ? cb && cb(er) : fs.futimes(fd, at, mt, (function(er) {
                fs.close(fd, (function(er2) {
                  cb && cb(er || er2);
                }));
              }));
            }));
          }, fs.lutimesSync = function(path, at, mt) {
            var ret, fd = fs.openSync(path, constants.O_SYMLINK), threw = !0;
            try {
              ret = fs.futimesSync(fd, at, mt), threw = !1;
            } finally {
              if (threw) try {
                fs.closeSync(fd);
              } catch (er) {} else fs.closeSync(fd);
            }
            return ret;
          }) : fs.futimes && (fs.lutimes = function(_a, _b, _c, cb) {
            cb && process.nextTick(cb);
          }, fs.lutimesSync = function() {});
        }(fs);
        fs.chown = chownFix(fs.chown), fs.fchown = chownFix(fs.fchown), fs.lchown = chownFix(fs.lchown), 
        fs.chmod = chmodFix(fs.chmod), fs.fchmod = chmodFix(fs.fchmod), fs.lchmod = chmodFix(fs.lchmod), 
        fs.chownSync = chownFixSync(fs.chownSync), fs.fchownSync = chownFixSync(fs.fchownSync), 
        fs.lchownSync = chownFixSync(fs.lchownSync), fs.chmodSync = chmodFixSync(fs.chmodSync), 
        fs.fchmodSync = chmodFixSync(fs.fchmodSync), fs.lchmodSync = chmodFixSync(fs.lchmodSync), 
        fs.stat = statFix(fs.stat), fs.fstat = statFix(fs.fstat), fs.lstat = statFix(fs.lstat), 
        fs.statSync = statFixSync(fs.statSync), fs.fstatSync = statFixSync(fs.fstatSync), 
        fs.lstatSync = statFixSync(fs.lstatSync), fs.chmod && !fs.lchmod && (fs.lchmod = function(path, mode, cb) {
          cb && process.nextTick(cb);
        }, fs.lchmodSync = function() {});
        fs.chown && !fs.lchown && (fs.lchown = function(path, uid, gid, cb) {
          cb && process.nextTick(cb);
        }, fs.lchownSync = function() {});
        "win32" === platform && (fs.rename = "function" != typeof fs.rename ? fs.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now(), backoff = 0;
            fs$rename(from, to, (function CB(er) {
              if (er && ("EACCES" === er.code || "EPERM" === er.code) && Date.now() - start < 6e4) return setTimeout((function() {
                fs.stat(to, (function(stater, st) {
                  stater && "ENOENT" === stater.code ? fs$rename(from, to, CB) : cb(er);
                }));
              }), backoff), void (backoff < 100 && (backoff += 10));
              cb && cb(er);
            }));
          }
          return Object.setPrototypeOf && Object.setPrototypeOf(rename, fs$rename), rename;
        }(fs.rename));
        function chmodFix(orig) {
          return orig ? function(target, mode, cb) {
            return orig.call(fs, target, mode, (function(er) {
              chownErOk(er) && (er = null), cb && cb.apply(this, arguments);
            }));
          } : orig;
        }
        function chmodFixSync(orig) {
          return orig ? function(target, mode) {
            try {
              return orig.call(fs, target, mode);
            } catch (er) {
              if (!chownErOk(er)) throw er;
            }
          } : orig;
        }
        function chownFix(orig) {
          return orig ? function(target, uid, gid, cb) {
            return orig.call(fs, target, uid, gid, (function(er) {
              chownErOk(er) && (er = null), cb && cb.apply(this, arguments);
            }));
          } : orig;
        }
        function chownFixSync(orig) {
          return orig ? function(target, uid, gid) {
            try {
              return orig.call(fs, target, uid, gid);
            } catch (er) {
              if (!chownErOk(er)) throw er;
            }
          } : orig;
        }
        function statFix(orig) {
          return orig ? function(target, options, cb) {
            function callback(er, stats) {
              stats && (stats.uid < 0 && (stats.uid += 4294967296), stats.gid < 0 && (stats.gid += 4294967296)), 
              cb && cb.apply(this, arguments);
            }
            return "function" == typeof options && (cb = options, options = null), options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
          } : orig;
        }
        function statFixSync(orig) {
          return orig ? function(target, options) {
            var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
            return stats && (stats.uid < 0 && (stats.uid += 4294967296), stats.gid < 0 && (stats.gid += 4294967296)), 
            stats;
          } : orig;
        }
        function chownErOk(er) {
          return !er || ("ENOSYS" === er.code || !(process.getuid && 0 === process.getuid() || "EINVAL" !== er.code && "EPERM" !== er.code));
        }
        fs.read = "function" != typeof fs.read ? fs.read : function(fs$read) {
          function read(fd, buffer, offset, length, position, callback_) {
            var callback;
            if (callback_ && "function" == typeof callback_) {
              var eagCounter = 0;
              callback = function(er, _, __) {
                if (er && "EAGAIN" === er.code && eagCounter < 10) return eagCounter++, fs$read.call(fs, fd, buffer, offset, length, position, callback);
                callback_.apply(this, arguments);
              };
            }
            return fs$read.call(fs, fd, buffer, offset, length, position, callback);
          }
          return Object.setPrototypeOf && Object.setPrototypeOf(read, fs$read), read;
        }(fs.read), fs.readSync = "function" != typeof fs.readSync ? fs.readSync : (fs$readSync = fs.readSync, 
        function(fd, buffer, offset, length, position) {
          for (var eagCounter = 0; ;) try {
            return fs$readSync.call(fs, fd, buffer, offset, length, position);
          } catch (er) {
            if ("EAGAIN" === er.code && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        });
        var fs$readSync;
      };
    },
    8040: (module, __unused_webpack_exports, __webpack_require__) => {
      var core;
      __webpack_require__(7147);
      function isexe(path, options, cb) {
        if ("function" == typeof options && (cb = options, options = {}), !cb) {
          if ("function" != typeof Promise) throw new TypeError("callback not provided");
          return new Promise((function(resolve, reject) {
            isexe(path, options || {}, (function(er, is) {
              er ? reject(er) : resolve(is);
            }));
          }));
        }
        core(path, options || {}, (function(er, is) {
          er && ("EACCES" === er.code || options && options.ignoreErrors) && (er = null, is = !1), 
          cb(er, is);
        }));
      }
      core = "win32" === process.platform || global.TESTING_WINDOWS ? __webpack_require__(8356) : __webpack_require__(2610), 
      module.exports = isexe, isexe.sync = function(path, options) {
        try {
          return core.sync(path, options || {});
        } catch (er) {
          if (options && options.ignoreErrors || "EACCES" === er.code) return !1;
          throw er;
        }
      };
    },
    2610: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = isexe, isexe.sync = function(path, options) {
        return checkStat(fs.statSync(path), options);
      };
      var fs = __webpack_require__(7147);
      function isexe(path, options, cb) {
        fs.stat(path, (function(er, stat) {
          cb(er, !er && checkStat(stat, options));
        }));
      }
      function checkStat(stat, options) {
        return stat.isFile() && function(stat, options) {
          var mod = stat.mode, uid = stat.uid, gid = stat.gid, myUid = void 0 !== options.uid ? options.uid : process.getuid && process.getuid(), myGid = void 0 !== options.gid ? options.gid : process.getgid && process.getgid(), u = parseInt("100", 8), g = parseInt("010", 8), o = parseInt("001", 8), ug = u | g;
          return mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && 0 === myUid;
        }(stat, options);
      }
    },
    8356: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = isexe, isexe.sync = function(path, options) {
        return checkStat(fs.statSync(path), path, options);
      };
      var fs = __webpack_require__(7147);
      function checkStat(stat, path, options) {
        return !(!stat.isSymbolicLink() && !stat.isFile()) && function(path, options) {
          var pathext = void 0 !== options.pathExt ? options.pathExt : process.env.PATHEXT;
          if (!pathext) return !0;
          if (-1 !== (pathext = pathext.split(";")).indexOf("")) return !0;
          for (var i = 0; i < pathext.length; i++) {
            var p = pathext[i].toLowerCase();
            if (p && path.substr(-p.length).toLowerCase() === p) return !0;
          }
          return !1;
        }(path, options);
      }
      function isexe(path, options, cb) {
        fs.stat(path, (function(er, stat) {
          cb(er, !er && checkStat(stat, path, options));
        }));
      }
    },
    2079: (module, exports) => {
      var debug;
      exports = module.exports = SemVer, debug = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER"), console.log.apply(console, args);
      } : function() {}, exports.SEMVER_SPEC_VERSION = "2.0.0";
      var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991, re = exports.re = [], src = exports.src = [], t = exports.tokens = {}, R = 0;
      function tok(n) {
        t[n] = R++;
      }
      tok("NUMERICIDENTIFIER"), src[t.NUMERICIDENTIFIER] = "0|[1-9]\\d*", tok("NUMERICIDENTIFIERLOOSE"), 
      src[t.NUMERICIDENTIFIERLOOSE] = "[0-9]+", tok("NONNUMERICIDENTIFIER"), src[t.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*", 
      tok("MAINVERSION"), src[t.MAINVERSION] = "(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")\\.(" + src[t.NUMERICIDENTIFIER] + ")", 
      tok("MAINVERSIONLOOSE"), src[t.MAINVERSIONLOOSE] = "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[t.NUMERICIDENTIFIERLOOSE] + ")", 
      tok("PRERELEASEIDENTIFIER"), src[t.PRERELEASEIDENTIFIER] = "(?:" + src[t.NUMERICIDENTIFIER] + "|" + src[t.NONNUMERICIDENTIFIER] + ")", 
      tok("PRERELEASEIDENTIFIERLOOSE"), src[t.PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[t.NUMERICIDENTIFIERLOOSE] + "|" + src[t.NONNUMERICIDENTIFIER] + ")", 
      tok("PRERELEASE"), src[t.PRERELEASE] = "(?:-(" + src[t.PRERELEASEIDENTIFIER] + "(?:\\." + src[t.PRERELEASEIDENTIFIER] + ")*))", 
      tok("PRERELEASELOOSE"), src[t.PRERELEASELOOSE] = "(?:-?(" + src[t.PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[t.PRERELEASEIDENTIFIERLOOSE] + ")*))", 
      tok("BUILDIDENTIFIER"), src[t.BUILDIDENTIFIER] = "[0-9A-Za-z-]+", tok("BUILD"), 
      src[t.BUILD] = "(?:\\+(" + src[t.BUILDIDENTIFIER] + "(?:\\." + src[t.BUILDIDENTIFIER] + ")*))", 
      tok("FULL"), tok("FULLPLAIN"), src[t.FULLPLAIN] = "v?" + src[t.MAINVERSION] + src[t.PRERELEASE] + "?" + src[t.BUILD] + "?", 
      src[t.FULL] = "^" + src[t.FULLPLAIN] + "$", tok("LOOSEPLAIN"), src[t.LOOSEPLAIN] = "[v=\\s]*" + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + "?" + src[t.BUILD] + "?", 
      tok("LOOSE"), src[t.LOOSE] = "^" + src[t.LOOSEPLAIN] + "$", tok("GTLT"), src[t.GTLT] = "((?:<|>)?=?)", 
      tok("XRANGEIDENTIFIERLOOSE"), src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*", 
      tok("XRANGEIDENTIFIER"), src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + "|x|X|\\*", 
      tok("XRANGEPLAIN"), src[t.XRANGEPLAIN] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")(?:" + src[t.PRERELEASE] + ")?" + src[t.BUILD] + "?)?)?", 
      tok("XRANGEPLAINLOOSE"), src[t.XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")(?:" + src[t.PRERELEASELOOSE] + ")?" + src[t.BUILD] + "?)?)?", 
      tok("XRANGE"), src[t.XRANGE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAIN] + "$", 
      tok("XRANGELOOSE"), src[t.XRANGELOOSE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAINLOOSE] + "$", 
      tok("COERCE"), src[t.COERCE] = "(^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])", 
      tok("COERCERTL"), re[t.COERCERTL] = new RegExp(src[t.COERCE], "g"), tok("LONETILDE"), 
      src[t.LONETILDE] = "(?:~>?)", tok("TILDETRIM"), src[t.TILDETRIM] = "(\\s*)" + src[t.LONETILDE] + "\\s+", 
      re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], "g");
      tok("TILDE"), src[t.TILDE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAIN] + "$", 
      tok("TILDELOOSE"), src[t.TILDELOOSE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + "$", 
      tok("LONECARET"), src[t.LONECARET] = "(?:\\^)", tok("CARETTRIM"), src[t.CARETTRIM] = "(\\s*)" + src[t.LONECARET] + "\\s+", 
      re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], "g");
      tok("CARET"), src[t.CARET] = "^" + src[t.LONECARET] + src[t.XRANGEPLAIN] + "$", 
      tok("CARETLOOSE"), src[t.CARETLOOSE] = "^" + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + "$", 
      tok("COMPARATORLOOSE"), src[t.COMPARATORLOOSE] = "^" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + ")$|^$", 
      tok("COMPARATOR"), src[t.COMPARATOR] = "^" + src[t.GTLT] + "\\s*(" + src[t.FULLPLAIN] + ")$|^$", 
      tok("COMPARATORTRIM"), src[t.COMPARATORTRIM] = "(\\s*)" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + "|" + src[t.XRANGEPLAIN] + ")", 
      re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], "g");
      tok("HYPHENRANGE"), src[t.HYPHENRANGE] = "^\\s*(" + src[t.XRANGEPLAIN] + ")\\s+-\\s+(" + src[t.XRANGEPLAIN] + ")\\s*$", 
      tok("HYPHENRANGELOOSE"), src[t.HYPHENRANGELOOSE] = "^\\s*(" + src[t.XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[t.XRANGEPLAINLOOSE] + ")\\s*$", 
      tok("STAR"), src[t.STAR] = "(<|>)?=?\\s*\\*";
      for (var i = 0; i < R; i++) debug(i, src[i]), re[i] || (re[i] = new RegExp(src[i]));
      function parse(version, options) {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), version instanceof SemVer) return version;
        if ("string" != typeof version) return null;
        if (version.length > 256) return null;
        if (!(options.loose ? re[t.LOOSE] : re[t.FULL]).test(version)) return null;
        try {
          return new SemVer(version, options);
        } catch (er) {
          return null;
        }
      }
      function SemVer(version, options) {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), version instanceof SemVer) {
          if (version.loose === options.loose) return version;
          version = version.version;
        } else if ("string" != typeof version) throw new TypeError("Invalid Version: " + version);
        if (version.length > 256) throw new TypeError("version is longer than 256 characters");
        if (!(this instanceof SemVer)) return new SemVer(version, options);
        debug("SemVer", version, options), this.options = options, this.loose = !!options.loose;
        var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) throw new TypeError("Invalid Version: " + version);
        if (this.raw = version, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], 
        this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
        m[4] ? this.prerelease = m[4].split(".").map((function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
          }
          return id;
        })) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
      }
      exports.parse = parse, exports.valid = function(version, options) {
        var v = parse(version, options);
        return v ? v.version : null;
      }, exports.clean = function(version, options) {
        var s = parse(version.trim().replace(/^[=v]+/, ""), options);
        return s ? s.version : null;
      }, exports.SemVer = SemVer, SemVer.prototype.format = function() {
        return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), 
        this.version;
      }, SemVer.prototype.toString = function() {
        return this.version;
      }, SemVer.prototype.compare = function(other) {
        return debug("SemVer.compare", this.version, this.options, other), other instanceof SemVer || (other = new SemVer(other, this.options)), 
        this.compareMain(other) || this.comparePre(other);
      }, SemVer.prototype.compareMain = function(other) {
        return other instanceof SemVer || (other = new SemVer(other, this.options)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }, SemVer.prototype.comparePre = function(other) {
        if (other instanceof SemVer || (other = new SemVer(other, this.options)), this.prerelease.length && !other.prerelease.length) return -1;
        if (!this.prerelease.length && other.prerelease.length) return 1;
        if (!this.prerelease.length && !other.prerelease.length) return 0;
        var i = 0;
        do {
          var a = this.prerelease[i], b = other.prerelease[i];
          if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
          if (void 0 === b) return 1;
          if (void 0 === a) return -1;
          if (a !== b) return compareIdentifiers(a, b);
        } while (++i);
      }, SemVer.prototype.compareBuild = function(other) {
        other instanceof SemVer || (other = new SemVer(other, this.options));
        var i = 0;
        do {
          var a = this.build[i], b = other.build[i];
          if (debug("prerelease compare", i, a, b), void 0 === a && void 0 === b) return 0;
          if (void 0 === b) return 1;
          if (void 0 === a) return -1;
          if (a !== b) return compareIdentifiers(a, b);
        } while (++i);
      }, SemVer.prototype.inc = function(release, identifier) {
        switch (release) {
         case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", identifier);
          break;

         case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", identifier);
          break;

         case "prepatch":
          this.prerelease.length = 0, this.inc("patch", identifier), this.inc("pre", identifier);
          break;

         case "prerelease":
          0 === this.prerelease.length && this.inc("patch", identifier), this.inc("pre", identifier);
          break;

         case "major":
          0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, 
          this.minor = 0, this.patch = 0, this.prerelease = [];
          break;

         case "minor":
          0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, 
          this.prerelease = [];
          break;

         case "patch":
          0 === this.prerelease.length && this.patch++, this.prerelease = [];
          break;

         case "pre":
          if (0 === this.prerelease.length) this.prerelease = [ 0 ]; else {
            for (var i = this.prerelease.length; --i >= 0; ) "number" == typeof this.prerelease[i] && (this.prerelease[i]++, 
            i = -2);
            -1 === i && this.prerelease.push(0);
          }
          identifier && (this.prerelease[0] === identifier ? isNaN(this.prerelease[1]) && (this.prerelease = [ identifier, 0 ]) : this.prerelease = [ identifier, 0 ]);
          break;

         default:
          throw new Error("invalid increment argument: " + release);
        }
        return this.format(), this.raw = this.version, this;
      }, exports.inc = function(version, release, loose, identifier) {
        "string" == typeof loose && (identifier = loose, loose = void 0);
        try {
          return new SemVer(version, loose).inc(release, identifier).version;
        } catch (er) {
          return null;
        }
      }, exports.diff = function(version1, version2) {
        if (eq(version1, version2)) return null;
        var v1 = parse(version1), v2 = parse(version2), prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) if (("major" === key || "minor" === key || "patch" === key) && v1[key] !== v2[key]) return prefix + key;
        return defaultResult;
      }, exports.compareIdentifiers = compareIdentifiers;
      var numeric = /^[0-9]+$/;
      function compareIdentifiers(a, b) {
        var anum = numeric.test(a), bnum = numeric.test(b);
        return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
      }
      function compare(a, b, loose) {
        return new SemVer(a, loose).compare(new SemVer(b, loose));
      }
      function gt(a, b, loose) {
        return compare(a, b, loose) > 0;
      }
      function lt(a, b, loose) {
        return compare(a, b, loose) < 0;
      }
      function eq(a, b, loose) {
        return 0 === compare(a, b, loose);
      }
      function neq(a, b, loose) {
        return 0 !== compare(a, b, loose);
      }
      function gte(a, b, loose) {
        return compare(a, b, loose) >= 0;
      }
      function lte(a, b, loose) {
        return compare(a, b, loose) <= 0;
      }
      function cmp(a, op, b, loose) {
        switch (op) {
         case "===":
          return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
          a === b;

         case "!==":
          return "object" == typeof a && (a = a.version), "object" == typeof b && (b = b.version), 
          a !== b;

         case "":
         case "=":
         case "==":
          return eq(a, b, loose);

         case "!=":
          return neq(a, b, loose);

         case ">":
          return gt(a, b, loose);

         case ">=":
          return gte(a, b, loose);

         case "<":
          return lt(a, b, loose);

         case "<=":
          return lte(a, b, loose);

         default:
          throw new TypeError("Invalid operator: " + op);
        }
      }
      function Comparator(comp, options) {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), comp instanceof Comparator) {
          if (comp.loose === !!options.loose) return comp;
          comp = comp.value;
        }
        if (!(this instanceof Comparator)) return new Comparator(comp, options);
        debug("comparator", comp, options), this.options = options, this.loose = !!options.loose, 
        this.parse(comp), this.semver === ANY ? this.value = "" : this.value = this.operator + this.semver.version, 
        debug("comp", this);
      }
      exports.rcompareIdentifiers = function(a, b) {
        return compareIdentifiers(b, a);
      }, exports.major = function(a, loose) {
        return new SemVer(a, loose).major;
      }, exports.minor = function(a, loose) {
        return new SemVer(a, loose).minor;
      }, exports.patch = function(a, loose) {
        return new SemVer(a, loose).patch;
      }, exports.compare = compare, exports.compareLoose = function(a, b) {
        return compare(a, b, !0);
      }, exports.compareBuild = function(a, b, loose) {
        var versionA = new SemVer(a, loose), versionB = new SemVer(b, loose);
        return versionA.compare(versionB) || versionA.compareBuild(versionB);
      }, exports.rcompare = function(a, b, loose) {
        return compare(b, a, loose);
      }, exports.sort = function(list, loose) {
        return list.sort((function(a, b) {
          return exports.compareBuild(a, b, loose);
        }));
      }, exports.rsort = function(list, loose) {
        return list.sort((function(a, b) {
          return exports.compareBuild(b, a, loose);
        }));
      }, exports.gt = gt, exports.lt = lt, exports.eq = eq, exports.neq = neq, exports.gte = gte, 
      exports.lte = lte, exports.cmp = cmp, exports.Comparator = Comparator;
      var ANY = {};
      function Range(range, options) {
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), range instanceof Range) return range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease ? range : new Range(range.raw, options);
        if (range instanceof Comparator) return new Range(range.value, options);
        if (!(this instanceof Range)) return new Range(range, options);
        if (this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease, 
        this.raw = range, this.set = range.split(/\s*\|\|\s*/).map((function(range) {
          return this.parseRange(range.trim());
        }), this).filter((function(c) {
          return c.length;
        })), !this.set.length) throw new TypeError("Invalid SemVer Range: " + range);
        this.format();
      }
      function isSatisfiable(comparators, options) {
        for (var result = !0, remainingComparators = comparators.slice(), testComparator = remainingComparators.pop(); result && remainingComparators.length; ) result = remainingComparators.every((function(otherComparator) {
          return testComparator.intersects(otherComparator, options);
        })), testComparator = remainingComparators.pop();
        return result;
      }
      function isX(id) {
        return !id || "x" === id.toLowerCase() || "*" === id;
      }
      function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
        return ((from = isX(fM) ? "" : isX(fm) ? ">=" + fM + ".0.0" : isX(fp) ? ">=" + fM + "." + fm + ".0" : ">=" + from) + " " + (to = isX(tM) ? "" : isX(tm) ? "<" + (+tM + 1) + ".0.0" : isX(tp) ? "<" + tM + "." + (+tm + 1) + ".0" : tpr ? "<=" + tM + "." + tm + "." + tp + "-" + tpr : "<=" + to)).trim();
      }
      function testSet(set, version, options) {
        for (var i = 0; i < set.length; i++) if (!set[i].test(version)) return !1;
        if (version.prerelease.length && !options.includePrerelease) {
          for (i = 0; i < set.length; i++) if (debug(set[i].semver), set[i].semver !== ANY && set[i].semver.prerelease.length > 0) {
            var allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return !0;
          }
          return !1;
        }
        return !0;
      }
      function satisfies(version, range, options) {
        try {
          range = new Range(range, options);
        } catch (er) {
          return !1;
        }
        return range.test(version);
      }
      function outside(version, range, hilo, options) {
        var gtfn, ltefn, ltfn, comp, ecomp;
        switch (version = new SemVer(version, options), range = new Range(range, options), 
        hilo) {
         case ">":
          gtfn = gt, ltefn = lte, ltfn = lt, comp = ">", ecomp = ">=";
          break;

         case "<":
          gtfn = lt, ltefn = gte, ltfn = gt, comp = "<", ecomp = "<=";
          break;

         default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (satisfies(version, range, options)) return !1;
        for (var i = 0; i < range.set.length; ++i) {
          var comparators = range.set[i], high = null, low = null;
          if (comparators.forEach((function(comparator) {
            comparator.semver === ANY && (comparator = new Comparator(">=0.0.0")), high = high || comparator, 
            low = low || comparator, gtfn(comparator.semver, high.semver, options) ? high = comparator : ltfn(comparator.semver, low.semver, options) && (low = comparator);
          })), high.operator === comp || high.operator === ecomp) return !1;
          if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return !1;
          if (low.operator === ecomp && ltfn(version, low.semver)) return !1;
        }
        return !0;
      }
      Comparator.prototype.parse = function(comp) {
        var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], m = comp.match(r);
        if (!m) throw new TypeError("Invalid comparator: " + comp);
        this.operator = void 0 !== m[1] ? m[1] : "", "=" === this.operator && (this.operator = ""), 
        m[2] ? this.semver = new SemVer(m[2], this.options.loose) : this.semver = ANY;
      }, Comparator.prototype.toString = function() {
        return this.value;
      }, Comparator.prototype.test = function(version) {
        if (debug("Comparator.test", version, this.options.loose), this.semver === ANY || version === ANY) return !0;
        if ("string" == typeof version) try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return !1;
        }
        return cmp(version, this.operator, this.semver, this.options);
      }, Comparator.prototype.intersects = function(comp, options) {
        if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
        var rangeTmp;
        if (options && "object" == typeof options || (options = {
          loose: !!options,
          includePrerelease: !1
        }), "" === this.operator) return "" === this.value || (rangeTmp = new Range(comp.value, options), 
        satisfies(this.value, rangeTmp, options));
        if ("" === comp.operator) return "" === comp.value || (rangeTmp = new Range(this.value, options), 
        satisfies(comp.semver, rangeTmp, options));
        var sameDirectionIncreasing = !(">=" !== this.operator && ">" !== this.operator || ">=" !== comp.operator && ">" !== comp.operator), sameDirectionDecreasing = !("<=" !== this.operator && "<" !== this.operator || "<=" !== comp.operator && "<" !== comp.operator), sameSemVer = this.semver.version === comp.semver.version, differentDirectionsInclusive = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== comp.operator && "<=" !== comp.operator), oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (">=" === this.operator || ">" === this.operator) && ("<=" === comp.operator || "<" === comp.operator), oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ("<=" === this.operator || "<" === this.operator) && (">=" === comp.operator || ">" === comp.operator);
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
      }, exports.Range = Range, Range.prototype.format = function() {
        return this.range = this.set.map((function(comps) {
          return comps.join(" ").trim();
        })).join("||").trim(), this.range;
      }, Range.prototype.toString = function() {
        return this.range;
      }, Range.prototype.parseRange = function(range) {
        var loose = this.options.loose;
        range = range.trim();
        var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace), debug("hyphen replace", range), range = range.replace(re[t.COMPARATORTRIM], "$1$2$3"), 
        debug("comparator trim", range, re[t.COMPARATORTRIM]), range = (range = (range = range.replace(re[t.TILDETRIM], "$1~")).replace(re[t.CARETTRIM], "$1^")).split(/\s+/).join(" ");
        var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], set = range.split(" ").map((function(comp) {
          return function(comp, options) {
            return debug("comp", comp, options), comp = function(comp, options) {
              return comp.trim().split(/\s+/).map((function(comp) {
                return function(comp, options) {
                  debug("caret", comp, options);
                  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
                  return comp.replace(r, (function(_, M, m, p, pr) {
                    var ret;
                    return debug("caret", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = "0" === M ? ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0" : pr ? (debug("replaceCaret pr", pr), 
                    ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0") : (debug("no pr"), 
                    ret = "0" === M ? "0" === m ? ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1) : ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0" : ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0"), 
                    debug("caret return", ret), ret;
                  }));
                }(comp, options);
              })).join(" ");
            }(comp, options), debug("caret", comp), comp = function(comp, options) {
              return comp.trim().split(/\s+/).map((function(comp) {
                return function(comp, options) {
                  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
                  return comp.replace(r, (function(_, M, m, p, pr) {
                    var ret;
                    return debug("tilde", comp, _, M, m, p, pr), isX(M) ? ret = "" : isX(m) ? ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0" : isX(p) ? ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0" : pr ? (debug("replaceTilde pr", pr), 
                    ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0") : ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0", 
                    debug("tilde return", ret), ret;
                  }));
                }(comp, options);
              })).join(" ");
            }(comp, options), debug("tildes", comp), comp = function(comp, options) {
              return debug("replaceXRanges", comp, options), comp.split(/\s+/).map((function(comp) {
                return function(comp, options) {
                  comp = comp.trim();
                  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
                  return comp.replace(r, (function(ret, gtlt, M, m, p, pr) {
                    debug("xRange", comp, ret, gtlt, M, m, p, pr);
                    var xM = isX(M), xm = xM || isX(m), xp = xm || isX(p), anyX = xp;
                    return "=" === gtlt && anyX && (gtlt = ""), pr = options.includePrerelease ? "-0" : "", 
                    xM ? ret = ">" === gtlt || "<" === gtlt ? "<0.0.0-0" : "*" : gtlt && anyX ? (xm && (m = 0), 
                    p = 0, ">" === gtlt ? (gtlt = ">=", xm ? (M = +M + 1, m = 0, p = 0) : (m = +m + 1, 
                    p = 0)) : "<=" === gtlt && (gtlt = "<", xm ? M = +M + 1 : m = +m + 1), ret = gtlt + M + "." + m + "." + p + pr) : xm ? ret = ">=" + M + ".0.0" + pr + " <" + (+M + 1) + ".0.0" + pr : xp && (ret = ">=" + M + "." + m + ".0" + pr + " <" + M + "." + (+m + 1) + ".0" + pr), 
                    debug("xRange return", ret), ret;
                  }));
                }(comp, options);
              })).join(" ");
            }(comp, options), debug("xrange", comp), comp = function(comp, options) {
              return debug("replaceStars", comp, options), comp.trim().replace(re[t.STAR], "");
            }(comp, options), debug("stars", comp), comp;
          }(comp, this.options);
        }), this).join(" ").split(/\s+/);
        return this.options.loose && (set = set.filter((function(comp) {
          return !!comp.match(compRe);
        }))), set = set.map((function(comp) {
          return new Comparator(comp, this.options);
        }), this);
      }, Range.prototype.intersects = function(range, options) {
        if (!(range instanceof Range)) throw new TypeError("a Range is required");
        return this.set.some((function(thisComparators) {
          return isSatisfiable(thisComparators, options) && range.set.some((function(rangeComparators) {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((function(thisComparator) {
              return rangeComparators.every((function(rangeComparator) {
                return thisComparator.intersects(rangeComparator, options);
              }));
            }));
          }));
        }));
      }, exports.toComparators = function(range, options) {
        return new Range(range, options).set.map((function(comp) {
          return comp.map((function(c) {
            return c.value;
          })).join(" ").trim().split(" ");
        }));
      }, Range.prototype.test = function(version) {
        if (!version) return !1;
        if ("string" == typeof version) try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return !1;
        }
        for (var i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return !0;
        return !1;
      }, exports.satisfies = satisfies, exports.maxSatisfying = function(versions, range, options) {
        var max = null, maxSV = null;
        try {
          var rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        return versions.forEach((function(v) {
          rangeObj.test(v) && (max && -1 !== maxSV.compare(v) || (maxSV = new SemVer(max = v, options)));
        })), max;
      }, exports.minSatisfying = function(versions, range, options) {
        var min = null, minSV = null;
        try {
          var rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        return versions.forEach((function(v) {
          rangeObj.test(v) && (min && 1 !== minSV.compare(v) || (minSV = new SemVer(min = v, options)));
        })), min;
      }, exports.minVersion = function(range, loose) {
        range = new Range(range, loose);
        var minver = new SemVer("0.0.0");
        if (range.test(minver)) return minver;
        if (minver = new SemVer("0.0.0-0"), range.test(minver)) return minver;
        minver = null;
        for (var i = 0; i < range.set.length; ++i) {
          range.set[i].forEach((function(comparator) {
            var compver = new SemVer(comparator.semver.version);
            switch (comparator.operator) {
             case ">":
              0 === compver.prerelease.length ? compver.patch++ : compver.prerelease.push(0), 
              compver.raw = compver.format();

             case "":
             case ">=":
              minver && !gt(minver, compver) || (minver = compver);
              break;

             case "<":
             case "<=":
              break;

             default:
              throw new Error("Unexpected operation: " + comparator.operator);
            }
          }));
        }
        if (minver && range.test(minver)) return minver;
        return null;
      }, exports.validRange = function(range, options) {
        try {
          return new Range(range, options).range || "*";
        } catch (er) {
          return null;
        }
      }, exports.ltr = function(version, range, options) {
        return outside(version, range, "<", options);
      }, exports.gtr = function(version, range, options) {
        return outside(version, range, ">", options);
      }, exports.outside = outside, exports.prerelease = function(version, options) {
        var parsed = parse(version, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
      }, exports.intersects = function(r1, r2, options) {
        return r1 = new Range(r1, options), r2 = new Range(r2, options), r1.intersects(r2);
      }, exports.coerce = function(version, options) {
        if (version instanceof SemVer) return version;
        "number" == typeof version && (version = String(version));
        if ("string" != typeof version) return null;
        var match = null;
        if ((options = options || {}).rtl) {
          for (var next; (next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length); ) match && next.index + next[0].length === match.index + match[0].length || (match = next), 
          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
          re[t.COERCERTL].lastIndex = -1;
        } else match = version.match(re[t.COERCE]);
        if (null === match) return null;
        return parse(match[2] + "." + (match[3] || "0") + "." + (match[4] || "0"), options);
      };
    },
    2654: (module, __unused_webpack_exports, __webpack_require__) => {
      var process = global.process;
      const processOk = function(process) {
        return process && "object" == typeof process && "function" == typeof process.removeListener && "function" == typeof process.emit && "function" == typeof process.reallyExit && "function" == typeof process.listeners && "function" == typeof process.kill && "number" == typeof process.pid && "function" == typeof process.on;
      };
      if (processOk(process)) {
        var emitter, assert = __webpack_require__(9491), signals = __webpack_require__(7623), isWin = /^win/i.test(process.platform), EE = __webpack_require__(2361);
        "function" != typeof EE && (EE = EE.EventEmitter), process.__signal_exit_emitter__ ? emitter = process.__signal_exit_emitter__ : ((emitter = process.__signal_exit_emitter__ = new EE).count = 0, 
        emitter.emitted = {}), emitter.infinite || (emitter.setMaxListeners(1 / 0), emitter.infinite = !0), 
        module.exports = function(cb, opts) {
          if (!processOk(global.process)) return function() {};
          assert.equal(typeof cb, "function", "a callback must be provided for exit handler"), 
          !1 === loaded && load();
          var ev = "exit";
          opts && opts.alwaysLast && (ev = "afterexit");
          return emitter.on(ev, cb), function() {
            emitter.removeListener(ev, cb), 0 === emitter.listeners("exit").length && 0 === emitter.listeners("afterexit").length && unload();
          };
        };
        var unload = function() {
          loaded && processOk(global.process) && (loaded = !1, signals.forEach((function(sig) {
            try {
              process.removeListener(sig, sigListeners[sig]);
            } catch (er) {}
          })), process.emit = originalProcessEmit, process.reallyExit = originalProcessReallyExit, 
          emitter.count -= 1);
        };
        module.exports.unload = unload;
        var emit = function(event, code, signal) {
          emitter.emitted[event] || (emitter.emitted[event] = !0, emitter.emit(event, code, signal));
        }, sigListeners = {};
        signals.forEach((function(sig) {
          sigListeners[sig] = function() {
            processOk(global.process) && (process.listeners(sig).length === emitter.count && (unload(), 
            emit("exit", null, sig), emit("afterexit", null, sig), isWin && "SIGHUP" === sig && (sig = "SIGINT"), 
            process.kill(process.pid, sig)));
          };
        })), module.exports.signals = function() {
          return signals;
        };
        var loaded = !1, load = function() {
          !loaded && processOk(global.process) && (loaded = !0, emitter.count += 1, signals = signals.filter((function(sig) {
            try {
              return process.on(sig, sigListeners[sig]), !0;
            } catch (er) {
              return !1;
            }
          })), process.emit = processEmit, process.reallyExit = processReallyExit);
        };
        module.exports.load = load;
        var originalProcessReallyExit = process.reallyExit, processReallyExit = function(code) {
          processOk(global.process) && (process.exitCode = code || 0, emit("exit", process.exitCode, null), 
          emit("afterexit", process.exitCode, null), originalProcessReallyExit.call(process, process.exitCode));
        }, originalProcessEmit = process.emit, processEmit = function(ev, arg) {
          if ("exit" === ev && processOk(global.process)) {
            void 0 !== arg && (process.exitCode = arg);
            var ret = originalProcessEmit.apply(this, arguments);
            return emit("exit", process.exitCode, null), emit("afterexit", process.exitCode, null), 
            ret;
          }
          return originalProcessEmit.apply(this, arguments);
        };
      } else module.exports = function() {
        return function() {};
      };
    },
    7623: module => {
      module.exports = [ "SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM" ], "win32" !== process.platform && module.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT"), 
      "linux" === process.platform && module.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
    },
    5046: (module, __unused_webpack_exports, __webpack_require__) => {
      var Node = {
        child: __webpack_require__(2081),
        crypto: __webpack_require__(6113),
        fs: __webpack_require__(7147),
        os: __webpack_require__(2037),
        path: __webpack_require__(1017),
        process,
        util: __webpack_require__(3837)
      };
      function Attempt(instance, end) {
        var platform = Node.process.platform;
        return "darwin" === platform ? function(instance, callback) {
          var temp = Node.os.tmpdir();
          if (!temp) return callback(new Error("os.tmpdir() not defined."));
          if (!Node.process.env.USER) return callback(new Error("env['USER'] not defined."));
          UUID(instance, (function(error, uuid) {
            if (error) return callback(error);
            function end(error, stdout, stderr) {
              Remove(Node.path.dirname(instance.path), (function(errorRemove) {
                return error ? callback(error) : errorRemove ? callback(errorRemove) : void callback(void 0, stdout, stderr);
              }));
            }
            instance.uuid = uuid, instance.path = Node.path.join(temp, instance.uuid, instance.options.name + ".app"), 
            function(instance, end) {
              var parent = Node.path.dirname(instance.path);
              Node.fs.mkdir(parent, (function(error) {
                if (error) return end(error);
                var zip = Node.path.join(parent, "sudo-prompt-applet.zip");
                Node.fs.writeFile(zip, APPLET, "base64", (function(error) {
                  if (error) return end(error);
                  var command = [];
                  command.push("/usr/bin/unzip"), command.push("-o"), command.push('"' + EscapeDoubleQuotes(zip) + '"'), 
                  command.push('-d "' + EscapeDoubleQuotes(instance.path) + '"'), command = command.join(" "), 
                  Node.child.exec(command, {
                    encoding: "utf-8"
                  }, end);
                }));
              }));
            }(instance, (function(error, stdout, stderr) {
              if (error) return end(error, stdout, stderr);
              !function(instance, end) {
                if (!instance.options.icns) return end();
                Node.fs.readFile(instance.options.icns, (function(error, buffer) {
                  if (error) return end(error);
                  var icns = Node.path.join(instance.path, "Contents", "Resources", "applet.icns");
                  Node.fs.writeFile(icns, buffer, end);
                }));
              }(instance, (function(error) {
                if (error) return end(error);
                !function(instance, end) {
                  var path = EscapeDoubleQuotes(Node.path.join(instance.path, "Contents", "Info.plist")), key = EscapeDoubleQuotes("CFBundleName"), value = instance.options.name + " Password Prompt";
                  if (/'/.test(value)) return end(new Error("Value should not contain single quotes."));
                  var command = [];
                  command.push("/usr/bin/defaults"), command.push("write"), command.push('"' + path + '"'), 
                  command.push('"' + key + '"'), command.push("'" + value + "'"), command = command.join(" "), 
                  Node.child.exec(command, {
                    encoding: "utf-8"
                  }, end);
                }(instance, (function(error, stdout, stderr) {
                  if (error) return end(error, stdout, stderr);
                  !function(instance, end) {
                    var path = Node.path.join(instance.path, "Contents", "MacOS", "sudo-prompt-command"), script = [];
                    for (var key in script.push('cd "' + EscapeDoubleQuotes(Node.process.cwd()) + '"'), 
                    instance.options.env) {
                      var value = instance.options.env[key];
                      script.push("export " + key + '="' + EscapeDoubleQuotes(value) + '"');
                    }
                    script.push(instance.command), script = script.join("\n"), Node.fs.writeFile(path, script, "utf-8", end);
                  }(instance, (function(error) {
                    if (error) return end(error);
                    !function(instance, end) {
                      var binary = Node.path.join(instance.path, "Contents", "MacOS", "applet"), options = {
                        cwd: Node.path.dirname(binary),
                        encoding: "utf-8"
                      };
                      Node.child.exec("./" + Node.path.basename(binary), options, end);
                    }(instance, (function(error, stdout, stderr) {
                      if (error) return end(error, stdout, stderr);
                      !function(instance, end) {
                        var cwd = Node.path.join(instance.path, "Contents", "MacOS");
                        Node.fs.readFile(Node.path.join(cwd, "code"), "utf-8", (function(error, code) {
                          if (error) {
                            if ("ENOENT" === error.code) return end(new Error(PERMISSION_DENIED));
                            end(error);
                          } else Node.fs.readFile(Node.path.join(cwd, "stdout"), "utf-8", (function(error, stdout) {
                            if (error) return end(error);
                            Node.fs.readFile(Node.path.join(cwd, "stderr"), "utf-8", (function(error, stderr) {
                              if (error) return end(error);
                              0 === (code = parseInt(code.trim(), 10)) ? end(void 0, stdout, stderr) : ((error = new Error("Command failed: " + instance.command + "\n" + stderr)).code = code, 
                              end(error, stdout, stderr));
                            }));
                          }));
                        }));
                      }(instance, end);
                    }));
                  }));
                }));
              }));
            }));
          }));
        }(instance, end) : "linux" === platform ? function(instance, end) {
          !function(instance, end) {
            var index = 0, paths = [ "/usr/bin/kdesudo", "/usr/bin/pkexec" ];
            function test() {
              if (index === paths.length) return end(new Error("Unable to find pkexec or kdesudo."));
              var path = paths[index++];
              Node.fs.stat(path, (function(error) {
                if (error) {
                  if ("ENOTDIR" === error.code) return test();
                  if ("ENOENT" === error.code) return test();
                  end(error);
                } else end(void 0, path);
              }));
            }
            test();
          }(0, (function(error, binary) {
            if (error) return end(error);
            var command = [];
            for (var key in command.push('cd "' + EscapeDoubleQuotes(Node.process.cwd()) + '";'), 
            instance.options.env) {
              var value = instance.options.env[key];
              command.push("export " + key + '="' + EscapeDoubleQuotes(value) + '";');
            }
            command.push('"' + EscapeDoubleQuotes(binary) + '"'), /kdesudo/i.test(binary) ? (command.push("--comment", '"' + instance.options.name + ' wants to make changes. Enter your password to allow this."'), 
            command.push("-d"), command.push("--")) : /pkexec/i.test(binary) && command.push("--disable-internal-agent");
            var magic = "SUDOPROMPT\n";
            command.push('/bin/bash -c "echo ' + EscapeDoubleQuotes(magic.trim()) + "; " + EscapeDoubleQuotes(instance.command) + '"'), 
            command = command.join(" "), Node.child.exec(command, {
              encoding: "utf-8",
              maxBuffer: MAX_BUFFER
            }, (function(error, stdout, stderr) {
              var elevated = stdout && stdout.slice(0, magic.length) === magic;
              elevated && (stdout = stdout.slice(magic.length)), error && !elevated && (/No authentication agent found/.test(stderr) ? error.message = NO_POLKIT_AGENT : error.message = PERMISSION_DENIED), 
              end(error, stdout, stderr);
            }));
          }));
        }(instance, end) : "win32" === platform ? function(instance, callback) {
          var temp = Node.os.tmpdir();
          if (!temp) return callback(new Error("os.tmpdir() not defined."));
          UUID(instance, (function(error, uuid) {
            return error ? callback(error) : (instance.uuid = uuid, instance.path = Node.path.join(temp, instance.uuid), 
            /"/.test(instance.path) ? callback(new Error("instance.path cannot contain double-quotes.")) : (instance.pathElevate = Node.path.join(instance.path, "elevate.vbs"), 
            instance.pathExecute = Node.path.join(instance.path, "execute.bat"), instance.pathCommand = Node.path.join(instance.path, "command.bat"), 
            instance.pathStdout = Node.path.join(instance.path, "stdout"), instance.pathStderr = Node.path.join(instance.path, "stderr"), 
            instance.pathStatus = Node.path.join(instance.path, "status"), void Node.fs.mkdir(instance.path, (function(error) {
              if (error) return callback(error);
              function end(error, stdout, stderr) {
                Remove(instance.path, (function(errorRemove) {
                  return error ? callback(error) : errorRemove ? callback(errorRemove) : void callback(void 0, stdout, stderr);
                }));
              }
              !function(instance, end) {
                var script = [];
                script.push("@echo off"), script.push('call "' + instance.pathCommand + '" > "' + instance.pathStdout + '" 2> "' + instance.pathStderr + '"'), 
                script.push('(echo %ERRORLEVEL%) > "' + instance.pathStatus + '"'), script = script.join("\r\n"), 
                Node.fs.writeFile(instance.pathExecute, script, "utf-8", end);
              }(instance, (function(error) {
                if (error) return end(error);
                !function(instance, end) {
                  var cwd = Node.process.cwd();
                  if (/"/.test(cwd)) return end(new Error("process.cwd() cannot contain double-quotes."));
                  var script = [];
                  for (var key in script.push("@echo off"), script.push("chcp 65001>nul"), script.push('cd /d "' + cwd + '"'), 
                  instance.options.env) {
                    var value = instance.options.env[key];
                    script.push("set " + key + "=" + value.replace(/([<>\\|&^])/g, "^$1"));
                  }
                  script.push(instance.command), script = script.join("\r\n"), Node.fs.writeFile(instance.pathCommand, script, "utf-8", end);
                }(instance, (function(error) {
                  if (error) return end(error);
                  !function(instance, end) {
                    var command = [];
                    command.push("powershell.exe"), command.push("Start-Process"), command.push("-FilePath"), 
                    command.push("\"'" + instance.pathExecute.replace(/'/g, "`'") + "'\""), command.push("-WindowStyle hidden"), 
                    command.push("-Verb runAs"), command = command.join(" ");
                    var child = Node.child.exec(command, {
                      encoding: "utf-8"
                    }, (function(error, stdout, stderr) {
                      if (error) return end(new Error(PERMISSION_DENIED), stdout, stderr);
                      end();
                    }));
                    child.stdin.end();
                  }(instance, (function(error, stdout, stderr) {
                    if (error) return end(error, stdout, stderr);
                    WindowsWaitForStatus(instance, (function(error) {
                      if (error) return end(error);
                      !function(instance, end) {
                        Node.fs.readFile(instance.pathStatus, "utf-8", (function(error, code) {
                          if (error) return end(error);
                          Node.fs.readFile(instance.pathStdout, "utf-8", (function(error, stdout) {
                            if (error) return end(error);
                            Node.fs.readFile(instance.pathStderr, "utf-8", (function(error, stderr) {
                              if (error) return end(error);
                              0 === (code = parseInt(code.trim(), 10)) ? end(void 0, stdout, stderr) : ((error = new Error("Command failed: " + instance.command + "\r\n" + stderr)).code = code, 
                              end(error, stdout, stderr));
                            }));
                          }));
                        }));
                      }(instance, end);
                    }));
                  }));
                }));
              }));
            }))));
          }));
        }(instance, end) : void end(new Error("Platform not yet supported."));
      }
      function EscapeDoubleQuotes(string) {
        if ("string" != typeof string) throw new Error("Expected a string.");
        return string.replace(/"/g, '\\"');
      }
      function Remove(path, end) {
        if ("string" != typeof path || !path.trim()) return end(new Error("Argument path not defined."));
        var command = [];
        if ("win32" === Node.process.platform) {
          if (/"/.test(path)) return end(new Error("Argument path cannot contain double-quotes."));
          command.push('rmdir /s /q "' + path + '"');
        } else command.push("/bin/rm"), command.push("-rf"), command.push('"' + EscapeDoubleQuotes(Node.path.normalize(path)) + '"');
        command = command.join(" "), Node.child.exec(command, {
          encoding: "utf-8"
        }, end);
      }
      function UUID(instance, end) {
        Node.crypto.randomBytes(256, (function(error, random) {
          error && (random = Date.now() + "" + Math.random());
          var hash = Node.crypto.createHash("SHA256");
          hash.update("sudo-prompt-3"), hash.update(instance.options.name), hash.update(instance.command), 
          hash.update(random);
          var uuid = hash.digest("hex").slice(-32);
          if (!uuid || "string" != typeof uuid || 32 !== uuid.length) return end(new Error("Expected a valid UUID."));
          end(void 0, uuid);
        }));
      }
      function ValidName(string) {
        return !!/^[a-z0-9 ]+$/i.test(string) && (0 !== string.trim().length && !(string.length > 70));
      }
      function WindowsWaitForStatus(instance, end) {
        Node.fs.stat(instance.pathStatus, (function(error, stats) {
          error && "ENOENT" === error.code || stats.size < 2 ? setTimeout((function() {
            Node.fs.stat(instance.pathStdout, (function(error) {
              if (error) return end(new Error(PERMISSION_DENIED));
              WindowsWaitForStatus(instance, end);
            }));
          }), 1e3) : error ? end(error) : end();
        }));
      }
      module.exports.exec = function() {
        if (arguments.length < 1 || arguments.length > 3) throw new Error("Wrong number of arguments.");
        var command = arguments[0], options = {}, end = function() {};
        if ("string" != typeof command) throw new Error("Command should be a string.");
        if (2 === arguments.length) if (Node.util.isObject(arguments[1])) options = arguments[1]; else {
          if (!Node.util.isFunction(arguments[1])) throw new Error("Expected options or callback.");
          end = arguments[1];
        } else if (3 === arguments.length) {
          if (!Node.util.isObject(arguments[1])) throw new Error("Expected options to be an object.");
          if (options = arguments[1], !Node.util.isFunction(arguments[2])) throw new Error("Expected callback to be a function.");
          end = arguments[2];
        }
        if (/^sudo/i.test(command)) return end(new Error('Command should not be prefixed with "sudo".'));
        if (void 0 === options.name) {
          var title = Node.process.title;
          if (!ValidName(title)) return end(new Error("process.title cannot be used as a valid name."));
          options.name = title;
        } else if (!ValidName(options.name)) {
          var error = "";
          return error += "options.name must be alphanumeric only ", error += "(spaces are allowed) and <= 70 characters.", 
          end(new Error(error));
        }
        if (void 0 !== options.icns) {
          if ("string" != typeof options.icns) return end(new Error("options.icns must be a string if provided."));
          if (0 === options.icns.trim().length) return end(new Error("options.icns must not be empty if provided."));
        }
        if (void 0 !== options.env) {
          if ("object" != typeof options.env) return end(new Error("options.env must be an object if provided."));
          if (0 === Object.keys(options.env).length) return end(new Error("options.env must not be empty if provided."));
          for (var key in options.env) {
            var value = options.env[key];
            if ("string" != typeof key || "string" != typeof value) return end(new Error("options.env environment variables must be strings."));
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) return end(new Error("options.env has an invalid environment variable name: " + JSON.stringify(key)));
            if (/[\r\n]/.test(value)) return end(new Error("options.env has an invalid environment variable value: " + JSON.stringify(value)));
          }
        }
        var platform = Node.process.platform;
        if ("darwin" !== platform && "linux" !== platform && "win32" !== platform) return end(new Error("Platform not yet supported."));
        var instance = {
          command,
          options,
          uuid: void 0,
          path: void 0
        };
        Attempt(instance, end);
      };
      var APPLET = "UEsDBAoAAAAAAO1YcEcAAAAAAAAAAAAAAAAJABwAQ29udGVudHMvVVQJAAPNnElWLZEQV3V4CwABBPUBAAAEFAAAAFBLAwQUAAAACACgeXBHlHaGqKEBAAC+AwAAEwAcAENvbnRlbnRzL0luZm8ucGxpc3RVVAkAA1zWSVYtkRBXdXgLAAEE9QEAAAQUAAAAfZNRb5swFIWfl1/BeA9OpSmqJkqVBCJFop1VyKQ9Ta59S6wa27NNCfv1M0naJWTsEXO+c8+9vo7v97UI3sBYruRdeBPNwgAkVYzL6i7cluvpbXifTOLP6bdV+QNngRbcugBvl/lmFYRThBZaC0AoLdMA55uiDLwHQtljGIQ75/RXhNq2jUiviqiqe6FF2CgNxnW5N5t6IGKOhb7M0f0ijj9lnLpk8il+hS5ZrZeNZAIWQqj2ge+B5YoSwX8T5xEbo17ktc40gIZQCm8glK5BuieovP5Dbp3xHSeZrHyCXYxO3wM+2wNtHHkWMAQP/bkxbkOVXPMxKuK0Dz6CMh+Wv3AwQ9gPM7INU1NtVK3Ha8sXlfoB+m6J6b4fRzv0mkezMf6R1Fe5MbG2VYYF+L+lMaGvpIKy01cOC4zzMazYKeNOQYuDYkjfjMcteCWJa8w/Zi2ugubFA5e8buqisw7qU81ltzB0xx3QC5/TFh7J/e385/zL+7+/wWbR/LwIOl/dvHiCXw03YFfEPJ9dwsWu5sV2kwnod3QoeLeL0eGdJJM/UEsDBAoAAAAAAHSBjkgAAAAAAAAAAAAAAAAPABwAQ29udGVudHMvTWFjT1MvVVQJAAMbpQ9XLZEQV3V4CwABBPUBAAAEFAAAAFBLAwQUAAAACABVHBdH7Dk4KTIIAADIYQAAFQAcAENvbnRlbnRzL01hY09TL2FwcGxldFVUCQADMiPZVVOlD1d1eAsAAQT1AQAABBQAAADtnG9sHEcVwGfti7M1/rONLNVtXHqpzsipis+pHOSWFOzEm25at3XrJI2ozbK+W/suuds79vaSuCKSpaOIxRy1+NSPRPAhlWj7AVRaQCWpTRz+CEo+RSKCCho4K67kVhUyAeV4b3fWt17fXZqKFgHvp8zO3/dmdmfPmtl5L7+8/uPXGWMNELZCaGRMgmjHIlxaBCibdcoGsewCljGCIAiCIAiCIAiCIP7r+M21d67zjb/zEaAdwr1bGHuWMQH2/2wAgqqODj0kf0F+8nGfoFRbJ8p9U0C5g/KRgwEZqZLGfrfwwJx+LP2kVWkelD9zJ2NfBr1nWt2xrhNisxWZ3Ex6MpNSc1Z+soqOO+5i7JMYt7vj9BC5jiZXBwirCT2V1c0qOgZAxwMYt9cbRyxnmUljusa9mKBjGON2tgG/PlXNGyeSRlxNGlOZKjpeBR0KxsFx+MB7VJy5GB46OOSrCLPKfEjrH3/gFry+4zOpuH8sm+VF5srW6ltVjZQ3HVnL3KRDDLsflMSADpyDyjuR0urp6AAdHRgHdOD9iOs6Ypl0OmPUupeecOW19OsQAmn3tzBy4LFH5OED3jz0MbYouM8D460BOdTXCaEF6tsgLkF8GeJPQBj16Rb4PTf5xl2NH4J8a5Vy1N3F3OcZzefMaCo5GeVTuJ2P4cUf/aH5qbbP73/utpfeevdbLzwfYfy+Q80woGan/1E+ljo/703g77IaOJY479t5rqFLDag9OjaTs/R0dCQ5aWrmTHS/qaX1ExnzWC66L2PqY7p5PBnTc71TXnn0sG7mkhkjFx3a0IL30e/rQxB+EXL68J4BBLe73r298DySk5tlGPtJY1BmOhZTc727PBH2Ke+ZhF35nTyP80oQBEEQBPFRcJTZVwpvrxZWpLmJkN0VKT4q2iORUGFBOPfnBuFX9nhELOG67f1D9pWxpw4XVrrmTklz+ZY5Wfwurm/t3ffi9cE+uM41vYbbj2fP5kNXt9sXiopwVRj6xhPlr160mttfuVi4Fs2vXv2rfc5u7UeZfxQ+y4pPh/JrpyUUBjmrofzmadGXKf0eui7KK/ZwJLQUiuRAe+mLUFQ+tFKUV3npd7AU9ytz8iqIiXYoUnoBsqdxDbXk3CXcRov9lYhoW5EQjBxb4NoSY9iQsvn5+QSuusrduAybL3eHIIIbLqyIS9CHlY3loB8rldVKuLfyOsE1+a6zhUVxYsFp3Amqz8tr7Lz8dza1JF8TmC3/syivYVtcfxcWOycWQDvuLcrdnc61y7mGnWsErgmsXDbK5TKkscnypJvGhsuH3TQ2X37YTaPQ8ucw7W6t1LR2TFfjekqb0SGTiedTOmz0klZSSyWf0U01pqVSufXGmThsjs20OpU3Yrjuxbnu4u+GP8b1LO6PcX2L4Q6+v8Q07u9aQFLy71Ckt54TIfjfNdzfDkMYhTAOIXHXh39vCYIgCIIgCIIgCIL4z3Nm+84/Ci1Nn8b0ryHsgbBX1rbgOXD7LZJzNtrC0/gFqYOn8csQ/GONguQchPXzcvy+9CBzvk84HxkO+tJH3bRz5Fb0pb/nS3/fl/6BL/2aL43faLzz3Wbmju8W5p6pttaoR9THjgyZ0zEeH2eqqmbNzLShpXVIpxOqflKP5S1dTehaXDeZqhvHk2bGYOo+LZXal0lnM4ZuWMPJXFazYgmmPp7VjWF9SsunrPVa1HpMn0lPm2r8hGZO3aea+nQyZ+mmmtNjFp5i4oG0lTChE+eDj2pm8lbSgDFoln4yCRp00zQyEDmZtBZLbGxnanHzgWh092d29e/uv+/f+DIQBEEQBEEQBEEQ/7P81rX/FxoZm/Xs/5UmtP8PO/W3M9fGvKoPAEfYXLQJ1HOpmk+AJx80OOb5m/URGG9z9c378rVs9F15tPXP1dS3wvVtC+Q9/H4DFX21fQcY9zvo9eXrj6++D0Af1zfqy9eyx3f16QnVMayufr+zXN+sL99YRx/O69er+RdIgXkNxJv9DfBTDIxLPa6Zudr6enz5euO6ke9Bj7TRzr0noK+JbczfyA9hgOvr9OX98t57XNFX3ydhlOsL+2T8+oK/ucrvNOCfEHbbXhAqeebLB/0V7oYp7+Pt8PsZWnl1+urRpAn7SUCcYBX/hkth95kd2cFYllX3bxB4+xCrzcCO6v4PbXzo1fwbEM/H4ds/f/nCgZH+8k+j0vNPv7Jlz7qPQ1PFx+FVPoZ76ozj42K87YP9/cT7xuf9UfpSeP0MsJvzp0A8/4g3w+78ef4R+F4QBEEQBPH/w1Gm2FeUwturytwpUSnmJfta4Q3h3J8aFeE9xf7d1ZBSOCcqhftZ/m+YKuG6wV4qaQzdGED0Z2jJ/zpa9ZcegjIF7fkVaIBrt11nJxYOOepXpPPyKjsvvytOLcnvCWxJfh87V+xTa0rx1Kpj0a8UFqWJhXL3fgHt9xXn+rCz7Bop3rkTEkNj5e7bIZ7HNRZb/ku5XE6g58HyZUzdj6mLjh1/Pbt7XMt5dvfvtLl1Fbv7BtbhrtyEPW6V038H1yE88yQTTkqC1LJVnIeaCNe7dr3sEPEe6lCb9LWGfa3efvNG8pe5fF8NeW8g3n7jCI+/xOOEVH19KvF9oudHH2n/YOtYgiAIgiAIgiAIgiA+fm69mx3aO8bYtkHn/xlwDq8nkwaavz9h9swzc+DWwRrm71A5CJVVjeChTtk26Fqwu0fxQjUL+9vqHVV/KC53OUd+bJxVfBkw7/gzCO5pr3dOK/g+WUQDeZlV/A2QRwJ5THjn1/xcd9BfhlT1KbgpVwLn+W2amGr2//8CUEsDBBQAAAAIAAVHj0ga7FYjfQEAAKoCAAAhABwAQ29udGVudHMvTWFjT1Mvc3Vkby1wcm9tcHQtc2NyaXB0VVQJAAOJkBBXipAQV3V4CwABBPUBAAAEFAAAAI1SO08cMRDu91cMHIKGxUB5xSGEUqTlFKWMvPYca+EXnjGXy6/PeNcg0qVay+PvObs5U5OLatI0DxvYIwNVm4BdQGIdMhxSkauJ8K1i7FOjvSdwB2A+/WJnXpEJdEGwjvTk0W6HhTW8WldgzKDedVF2Ug2tLn7svz3DDpTFdxWr93C/u7wbVKWyoDhVM/8XZAOPOXvcm+IyXxGcizeaUca0XJ1D0CfQnlEysE2VwbuII0br4gvdCMF37m9IoC39+oxTO2EpS8oZJdtRS0aIKY5/sCQoyLVEMMki6Ghl0BGN9SeuICkPIctXDHDDSB9oGEQi1yZWUAda8EZnIcR/eIOOVao+9TrbkpYFjLmkkHk0KYSGvdt12/e71cP6Hs2c4OJBemtsYusplVX+GLHQ7DKkQ098/ZF38dLEpRCeNUMlMW90BIseeQkWtuu2qKmIyDHCuqFuo1N11Ud/1Cf6CHb7Sfxld2ATklQoUGEDActfZ5326WU74G/HcDv8BVBLAwQKAAAAAADtWHBHqiAGewgAAAAIAAAAEAAcAENvbnRlbnRzL1BrZ0luZm9VVAkAA82cSVYqkRBXdXgLAAEE9QEAAAQUAAAAQVBQTGFwbHRQSwMECgAAAAAAm3lwRwAAAAAAAAAAAAAAABMAHABDb250ZW50cy9SZXNvdXJjZXMvVVQJAANW1klWLZEQV3V4CwABBPUBAAAEFAAAAFBLAwQUAAAACACAeXBHfrnysfYGAAAf3AAAHgAcAENvbnRlbnRzL1Jlc291cmNlcy9hcHBsZXQuaWNuc1VUCQADH9ZJVnGlD1d1eAsAAQT1AQAABBQAAADt3Xk81Hkcx/Hvb5yVo5bGsVlKbcpRRqFlGZGS5JikRBIdI0OZttMZloqiYwrVjD1UqJaUokTRubG72bZVjqR1VZNjp2XEGo9H+9gt+9h/9tHx8H7N4/fw5MHjYeaPz+P7+P7x/bL9griEPNBm+001J0S+ZbvL/NmKwzWHE0IUHebYuRFCEckjL9v/xSvk2EpCpBXZtrYuDra2Oi4hwSvZgSsIMU9MdPdePcZd1aqQu0p3fDkrcFrs+mPWihMU9y6clp5XEFFdbRrEczCtGtfkL3pWfvBGublJ4ct051kuocYtaaqll/IjdfR+V75vlTdl//AJVZU6elZ5f0S7NO3MaE2xMElhF+TUrHgW2nFYeGTrs/OrhDJN5zMX8ZJVKXrqSUM1Rj03bnf85/pJMXECNdl0D1ctfe/j82imziM2nllSa3t5q8+vP1f38k/k22uN1lmnvfz0b8dGxO+mnh91v7WB2tKdrG3d4vmJaHlTvjGzdMqWcw/9frnCtQpPZK9sMKi/Ey/jzgqIPzBy9/dlf9griI2/u+sjcApozWx6/NXytC+qBTlrhb69fE7J6tgOzpWjFSl8qxihr5dYf/qExoeupY6Ze/j2PfL1azhhZ8fU3eelJY+ylk16UJN6KmOU0M4r+75cZhH/mxNndowNb4wx7TCoN4yvMGu8ySq5l5W5t+xQyYbS/Ome7e0W0sXbC5aktl0LEXNYR9obH7dMT721dbNdT/eFzXNEYSH8GU+bQ5s6YniGcj3fHtgXPbo0Oj4i3d5G1Fjfm/Ng7kgpjQDNxw4RRnu+Vloy5ZE3J6OpwlFBzaxS25He2h3lJuizO70zJPLUYtks14RE5yrD8y2tXa5l5Wqh/NBY06yoiCLF08Nk9A5Ojbs43GmR1Ch/PaZsLf3e6uPRSrIM1ROqGjt80leqfdxYbNn+WV7K7ZKiy/t6r1/3ie46V5432T/Oahs9V7NnVzb9zoq2rFgvPxXrcAMzmvWnGjof/RpdsZThIEpex6DGbd5h6STaOyZXxV/YfW9u4KyllmZ3X15IMHHLSJtVPSOvULCsz2TyPC/WL9kGSme/1L01SSzjfbHnqk+OV7OBmevZeo3DBR7lXT5drT0MkX5PwDd1EQ0ebfkh1zy/L8ydd+VJ4CLuRndNjuwj+vMfU8q2l2l1rGtr8FC2D+fdSGk81eltuTjYSMk++4BMd0DXQo35iXbZndGdcXkGFyeG6b28evF22M2w22HlYSXetGSLW4cfFT00WqvN9bkqCujQ9KzdSt+snr+qmbcme+5Y3cDRn9BDLps+dPVltE9UkPeb6XovineiVUznTznyuZaSn/ZvR8VeRUYLqe3iHFqnU6+7+4LmtfsmaS0MdjIvslFJGG/rn7DPdMGLcx4d6eP2Oz92Y49kWbBUjudU2ijHnc7YIODQxD1aPx8PynVr+cmvJoy2+M5nQa2Kt0dvdPxp73LNU6aTeaktTfHH1L+8Pm/XalZcFcfzYxlhTefuzjRGobLKEqPZh8QKxUXWbU/ERvW78ghvTGTUNd0g9YqbcjUy5h0xVbn3S7SS54SOqKt88UR0qZuxKfxlZfODUm52o2HkGTOLw5dqhevvWjH7ssiqxAhKwA91d1nWG9w/GJIc7GwWbKKe/mAsGRqXBb87P10jH8/0LY6kpGQV1KcuAwAAeCt4LiVFWRJKs4DJ6p9GxGHWfLuTM5dt61/pzCCE7vLmSodGJM/ASqdzU2U3VjpY6WClg5XOICudUaI3VjocuWCsdAAAAAAAAAAAAAAAAD5o1Gmr054TSoqWxPvnfrLxVEIc29/cT5YmkmdgPzlCSz8a+8nYT8Z+MvaTB9lPZpJX+8lRktFyRdDF0m6IdcF2MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8ddD8G5oJkUuQnAXwnvxLAAAAADDkEFURRckVE6rIv+Tb1078MiZEetubJ34RHckzcOIXd8uWTpz4hRO/cOIXTvwa5MQvoidZ5S8a9h8nfl1QVhipQ6jyyWeuvTaBGP3D5fwgE4gpeQYmUCZ7XQ0mECYQJhAm0GATyOfVmYOU4sAdNi+cOUpm/9cdNv2Di8kkFN3mYOtrg8sE14xicGFwYXDhmlEAAD5w/Os1o8bTcM0oVjpY6WClg2tGAQAAAAAAAAAAAAAAgL/wb9eMBpow+r817yN/fwnJf33P5g78nWofEZNXD3u95GdSkh3o135/aL2i3vl/gHf/7t59oDlnDSHS8gQhNGQL8uWs6P+iwPYLDuIOzARqyM+E9QOfA3PIfw4IIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhND70J9QSwMEFAAAAAgA7VhwR/dYplZAAAAAagEAAB4AHABDb250ZW50cy9SZXNvdXJjZXMvYXBwbGV0LnJzcmNVVAkAA82cSVZTpQ9XdXgLAAEE9QEAAAQUAAAAY2BgZGBgYFQBEiDsxjDygJQDPlkmEIEaRpJAQg8kLAMML8bi5OIqIFuouKA4A0jLMTD8/w+S5AdrB7PlBIAEAFBLAwQKAAAAAADtWHBHAAAAAAAAAAAAAAAAJAAcAENvbnRlbnRzL1Jlc291cmNlcy9kZXNjcmlwdGlvbi5ydGZkL1VUCQADzZxJVi2REFd1eAsAAQT1AQAABBQAAABQSwMEFAAAAAgA7VhwRzPLNU9TAAAAZgAAACsAHABDb250ZW50cy9SZXNvdXJjZXMvZGVzY3JpcHRpb24ucnRmZC9UWFQucnRmVVQJAAPNnElWU6UPV3V4CwABBPUBAAAEFAAAACWJOw6AIBAFe08DCBVX2QbWhZgQ1vCpCHcXtHkzkzegtCDB5Xp/g0+UyihARnb70kL/UbvffYpjQODcmk9zKXListxCoUsZA7EQ5S0+dVq085gvUEsDBAoAAAAAAIeBjkgAAAAAAAAAAAAAAAAbABwAQ29udGVudHMvUmVzb3VyY2VzL1NjcmlwdHMvVVQJAAM9pQ9XLZEQV3V4CwABBPUBAAAEFAAAAFBLAwQUAAAACAAJgI5ICl5liTUBAADMAQAAJAAcAENvbnRlbnRzL1Jlc291cmNlcy9TY3JpcHRzL21haW4uc2NwdFVUCQADcaIPV1OlD1d1eAsAAQT1AQAABBQAAAB9UMtOAkEQrNldd9dhH3Dz6NGYiPIJHjTxLCZeF9iDcXEJC0RvfoI/4sEfIvoHPEQEhbIHvOok01U16emu7vOkaF2dXu7XqrUTcyMATkxCwYKthCAUbmciAQ8O11yFcGBfbF/4jR24WmCvWjwUeXqfNutn13XyEeYYHkqKam+kghdJGfUCvwIfB6jiGAX6aCHHETroCrYFe6IKNEXfGOXChc0v7HKpBRzdSFrtELvbumKVC80F/FIjzwe9bj91uZRuXJuwAiLjNi7DlsxPaJSUAMrCFOeac3GfpINennQ6d/0sA4z7JxzKiVCCV+YHAs74LuuIONUi//4RIoC63czrIbYQS3PFicWJcTMTv1JHmocmROLJ45gjzfHvXJqjf7ZZ4RT+61uaBbDipGh2ZanBcjh8/gFQSwECHgMKAAAAAADtWHBHAAAAAAAAAAAAAAAACQAYAAAAAAAAABAA7UEAAAAAQ29udGVudHMvVVQFAAPNnElWdXgLAAEE9QEAAAQUAAAAUEsBAh4DFAAAAAgAoHlwR5R2hqihAQAAvgMAABMAGAAAAAAAAQAAAKSBQwAAAENvbnRlbnRzL0luZm8ucGxpc3RVVAUAA1zWSVZ1eAsAAQT1AQAABBQAAABQSwECHgMKAAAAAAB0gY5IAAAAAAAAAAAAAAAADwAYAAAAAAAAABAA7UExAgAAQ29udGVudHMvTWFjT1MvVVQFAAMbpQ9XdXgLAAEE9QEAAAQUAAAAUEsBAh4DFAAAAAgAVRwXR+w5OCkyCAAAyGEAABUAGAAAAAAAAAAAAO2BegIAAENvbnRlbnRzL01hY09TL2FwcGxldFVUBQADMiPZVXV4CwABBPUBAAAEFAAAAFBLAQIeAxQAAAAIAAVHj0ga7FYjfQEAAKoCAAAhABgAAAAAAAEAAADtgfsKAABDb250ZW50cy9NYWNPUy9zdWRvLXByb21wdC1zY3JpcHRVVAUAA4mQEFd1eAsAAQT1AQAABBQAAABQSwECHgMKAAAAAADtWHBHqiAGewgAAAAIAAAAEAAYAAAAAAABAAAApIHTDAAAQ29udGVudHMvUGtnSW5mb1VUBQADzZxJVnV4CwABBPUBAAAEFAAAAFBLAQIeAwoAAAAAAJt5cEcAAAAAAAAAAAAAAAATABgAAAAAAAAAEADtQSUNAABDb250ZW50cy9SZXNvdXJjZXMvVVQFAANW1klWdXgLAAEE9QEAAAQUAAAAUEsBAh4DFAAAAAgAgHlwR3658rH2BgAAH9wAAB4AGAAAAAAAAAAAAKSBcg0AAENvbnRlbnRzL1Jlc291cmNlcy9hcHBsZXQuaWNuc1VUBQADH9ZJVnV4CwABBPUBAAAEFAAAAFBLAQIeAxQAAAAIAO1YcEf3WKZWQAAAAGoBAAAeABgAAAAAAAAAAACkgcAUAABDb250ZW50cy9SZXNvdXJjZXMvYXBwbGV0LnJzcmNVVAUAA82cSVZ1eAsAAQT1AQAABBQAAABQSwECHgMKAAAAAADtWHBHAAAAAAAAAAAAAAAAJAAYAAAAAAAAABAA7UFYFQAAQ29udGVudHMvUmVzb3VyY2VzL2Rlc2NyaXB0aW9uLnJ0ZmQvVVQFAAPNnElWdXgLAAEE9QEAAAQUAAAAUEsBAh4DFAAAAAgA7VhwRzPLNU9TAAAAZgAAACsAGAAAAAAAAQAAAKSBthUAAENvbnRlbnRzL1Jlc291cmNlcy9kZXNjcmlwdGlvbi5ydGZkL1RYVC5ydGZVVAUAA82cSVZ1eAsAAQT1AQAABBQAAABQSwECHgMKAAAAAACHgY5IAAAAAAAAAAAAAAAAGwAYAAAAAAAAABAA7UFuFgAAQ29udGVudHMvUmVzb3VyY2VzL1NjcmlwdHMvVVQFAAM9pQ9XdXgLAAEE9QEAAAQUAAAAUEsBAh4DFAAAAAgACYCOSApeZYk1AQAAzAEAACQAGAAAAAAAAAAAAKSBwxYAAENvbnRlbnRzL1Jlc291cmNlcy9TY3JpcHRzL21haW4uc2NwdFVUBQADcaIPV3V4CwABBPUBAAAEFAAAAFBLBQYAAAAADQANANwEAABWGAAAAAA=", PERMISSION_DENIED = "User did not grant permission.", NO_POLKIT_AGENT = "No polkit authentication agent found.", MAX_BUFFER = 134217728;
    },
    870: module => {
      module.exports = [ [ 768, 879 ], [ 1155, 1158 ], [ 1160, 1161 ], [ 1425, 1469 ], [ 1471, 1471 ], [ 1473, 1474 ], [ 1476, 1477 ], [ 1479, 1479 ], [ 1536, 1539 ], [ 1552, 1557 ], [ 1611, 1630 ], [ 1648, 1648 ], [ 1750, 1764 ], [ 1767, 1768 ], [ 1770, 1773 ], [ 1807, 1807 ], [ 1809, 1809 ], [ 1840, 1866 ], [ 1958, 1968 ], [ 2027, 2035 ], [ 2305, 2306 ], [ 2364, 2364 ], [ 2369, 2376 ], [ 2381, 2381 ], [ 2385, 2388 ], [ 2402, 2403 ], [ 2433, 2433 ], [ 2492, 2492 ], [ 2497, 2500 ], [ 2509, 2509 ], [ 2530, 2531 ], [ 2561, 2562 ], [ 2620, 2620 ], [ 2625, 2626 ], [ 2631, 2632 ], [ 2635, 2637 ], [ 2672, 2673 ], [ 2689, 2690 ], [ 2748, 2748 ], [ 2753, 2757 ], [ 2759, 2760 ], [ 2765, 2765 ], [ 2786, 2787 ], [ 2817, 2817 ], [ 2876, 2876 ], [ 2879, 2879 ], [ 2881, 2883 ], [ 2893, 2893 ], [ 2902, 2902 ], [ 2946, 2946 ], [ 3008, 3008 ], [ 3021, 3021 ], [ 3134, 3136 ], [ 3142, 3144 ], [ 3146, 3149 ], [ 3157, 3158 ], [ 3260, 3260 ], [ 3263, 3263 ], [ 3270, 3270 ], [ 3276, 3277 ], [ 3298, 3299 ], [ 3393, 3395 ], [ 3405, 3405 ], [ 3530, 3530 ], [ 3538, 3540 ], [ 3542, 3542 ], [ 3633, 3633 ], [ 3636, 3642 ], [ 3655, 3662 ], [ 3761, 3761 ], [ 3764, 3769 ], [ 3771, 3772 ], [ 3784, 3789 ], [ 3864, 3865 ], [ 3893, 3893 ], [ 3895, 3895 ], [ 3897, 3897 ], [ 3953, 3966 ], [ 3968, 3972 ], [ 3974, 3975 ], [ 3984, 3991 ], [ 3993, 4028 ], [ 4038, 4038 ], [ 4141, 4144 ], [ 4146, 4146 ], [ 4150, 4151 ], [ 4153, 4153 ], [ 4184, 4185 ], [ 4448, 4607 ], [ 4959, 4959 ], [ 5906, 5908 ], [ 5938, 5940 ], [ 5970, 5971 ], [ 6002, 6003 ], [ 6068, 6069 ], [ 6071, 6077 ], [ 6086, 6086 ], [ 6089, 6099 ], [ 6109, 6109 ], [ 6155, 6157 ], [ 6313, 6313 ], [ 6432, 6434 ], [ 6439, 6440 ], [ 6450, 6450 ], [ 6457, 6459 ], [ 6679, 6680 ], [ 6912, 6915 ], [ 6964, 6964 ], [ 6966, 6970 ], [ 6972, 6972 ], [ 6978, 6978 ], [ 7019, 7027 ], [ 7616, 7626 ], [ 7678, 7679 ], [ 8203, 8207 ], [ 8234, 8238 ], [ 8288, 8291 ], [ 8298, 8303 ], [ 8400, 8431 ], [ 12330, 12335 ], [ 12441, 12442 ], [ 43014, 43014 ], [ 43019, 43019 ], [ 43045, 43046 ], [ 64286, 64286 ], [ 65024, 65039 ], [ 65056, 65059 ], [ 65279, 65279 ], [ 65529, 65531 ], [ 68097, 68099 ], [ 68101, 68102 ], [ 68108, 68111 ], [ 68152, 68154 ], [ 68159, 68159 ], [ 119143, 119145 ], [ 119155, 119170 ], [ 119173, 119179 ], [ 119210, 119213 ], [ 119362, 119364 ], [ 917505, 917505 ], [ 917536, 917631 ], [ 917760, 917999 ] ];
    },
    2774: (module, __unused_webpack_exports, __webpack_require__) => {
      var combining = __webpack_require__(870), DEFAULTS = {
        nul: 0,
        control: 0
      };
      module.exports = function(str) {
        return wcswidth(str, DEFAULTS);
      };
      function wcswidth(str, opts) {
        if ("string" != typeof str) return wcwidth(str, opts);
        for (var s = 0, i = 0; i < str.length; i++) {
          var n = wcwidth(str.charCodeAt(i), opts);
          if (n < 0) return -1;
          s += n;
        }
        return s;
      }
      function wcwidth(ucs, opts) {
        return 0 === ucs ? opts.nul : ucs < 32 || ucs >= 127 && ucs < 160 ? opts.control : function(ucs) {
          var mid, min = 0, max = combining.length - 1;
          if (ucs < combining[0][0] || ucs > combining[max][1]) return !1;
          for (;max >= min; ) if (mid = Math.floor((min + max) / 2), ucs > combining[mid][1]) min = mid + 1; else {
            if (!(ucs < combining[mid][0])) return !0;
            max = mid - 1;
          }
          return !1;
        }(ucs) ? 0 : 1 + (ucs >= 4352 && (ucs <= 4447 || 9001 == ucs || 9002 == ucs || ucs >= 11904 && ucs <= 42191 && 12351 != ucs || ucs >= 44032 && ucs <= 55203 || ucs >= 63744 && ucs <= 64255 || ucs >= 65040 && ucs <= 65049 || ucs >= 65072 && ucs <= 65135 || ucs >= 65280 && ucs <= 65376 || ucs >= 65504 && ucs <= 65510 || ucs >= 131072 && ucs <= 196605 || ucs >= 196608 && ucs <= 262141));
      }
    },
    566: (module, __unused_webpack_exports, __webpack_require__) => {
      const isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(1017), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(8040), getNotFoundError = cmd => Object.assign(new Error(`not found: ${cmd}`), {
        code: "ENOENT"
      }), getPathInfo = (cmd, opt) => {
        const colon = opt.colon || COLON, pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [ "" ] : [ ...isWindows ? [ process.cwd() ] : [], ...(opt.path || process.env.PATH || "").split(colon) ], pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", pathExt = isWindows ? pathExtExe.split(colon) : [ "" ];
        return isWindows && -1 !== cmd.indexOf(".") && "" !== pathExt[0] && pathExt.unshift(""), 
        {
          pathEnv,
          pathExt,
          pathExtExe
        };
      }, which = (cmd, opt, cb) => {
        "function" == typeof opt && (cb = opt, opt = {}), opt || (opt = {});
        const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt), found = [], step = i => new Promise(((resolve, reject) => {
          if (i === pathEnv.length) return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
          const ppRaw = pathEnv[i], pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw, pCmd = path.join(pathPart, cmd), p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          resolve(subStep(p, i, 0));
        })), subStep = (p, i, ii) => new Promise(((resolve, reject) => {
          if (ii === pathExt.length) return resolve(step(i + 1));
          const ext = pathExt[ii];
          isexe(p + ext, {
            pathExt: pathExtExe
          }, ((er, is) => {
            if (!er && is) {
              if (!opt.all) return resolve(p + ext);
              found.push(p + ext);
            }
            return resolve(subStep(p, i, ii + 1));
          }));
        }));
        return cb ? step(0).then((res => cb(null, res)), cb) : step(0);
      };
      module.exports = which, which.sync = (cmd, opt) => {
        opt = opt || {};
        const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt), found = [];
        for (let i = 0; i < pathEnv.length; i++) {
          const ppRaw = pathEnv[i], pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw, pCmd = path.join(pathPart, cmd), p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          for (let j = 0; j < pathExt.length; j++) {
            const cur = p + pathExt[j];
            try {
              if (isexe.sync(cur, {
                pathExt: pathExtExe
              })) {
                if (!opt.all) return cur;
                found.push(cur);
              }
            } catch (ex) {}
          }
        }
        if (opt.all && found.length) return found;
        if (opt.nothrow) return null;
        throw getNotFoundError(cmd);
      };
    },
    2415: (module, __unused_webpack_exports, __webpack_require__) => {
      const DuplexStream = __webpack_require__(4261), inherits = __webpack_require__(3837).inherits, BufferList = __webpack_require__(9668);
      function BufferListStream(callback) {
        if (!(this instanceof BufferListStream)) return new BufferListStream(callback);
        if ("function" == typeof callback) {
          this._callback = callback;
          const piper = function(err) {
            this._callback && (this._callback(err), this._callback = null);
          }.bind(this);
          this.on("pipe", (function(src) {
            src.on("error", piper);
          })), this.on("unpipe", (function(src) {
            src.removeListener("error", piper);
          })), callback = null;
        }
        BufferList._init.call(this, callback), DuplexStream.call(this);
      }
      inherits(BufferListStream, DuplexStream), Object.assign(BufferListStream.prototype, BufferList.prototype), 
      BufferListStream.prototype._new = function(callback) {
        return new BufferListStream(callback);
      }, BufferListStream.prototype._write = function(buf, encoding, callback) {
        this._appendBuffer(buf), "function" == typeof callback && callback();
      }, BufferListStream.prototype._read = function(size) {
        if (!this.length) return this.push(null);
        size = Math.min(size, this.length), this.push(this.slice(0, size)), this.consume(size);
      }, BufferListStream.prototype.end = function(chunk) {
        DuplexStream.prototype.end.call(this, chunk), this._callback && (this._callback(null, this.slice()), 
        this._callback = null);
      }, BufferListStream.prototype._destroy = function(err, cb) {
        this._bufs.length = 0, this.length = 0, cb(err);
      }, BufferListStream.prototype._isBufferList = function(b) {
        return b instanceof BufferListStream || b instanceof BufferList || BufferListStream.isBufferList(b);
      }, BufferListStream.isBufferList = BufferList.isBufferList, module.exports = BufferListStream, 
      module.exports.BufferListStream = BufferListStream, module.exports.BufferList = BufferList;
    },
    4261: (module, __unused_webpack_exports, __webpack_require__) => {
      var objectKeys = Object.keys || function(obj) {
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys;
      };
      module.exports = Duplex;
      var Readable = __webpack_require__(5023), Writable = __webpack_require__(8480);
      __webpack_require__(3837).inherits(Duplex, Readable);
      for (var keys = objectKeys(Writable.prototype), v = 0; v < keys.length; v++) {
        var method = keys[v];
        Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method]);
      }
      function Duplex(options) {
        if (!(this instanceof Duplex)) return new Duplex(options);
        Readable.call(this, options), Writable.call(this, options), this.allowHalfOpen = !0, 
        options && (!1 === options.readable && (this.readable = !1), !1 === options.writable && (this.writable = !1), 
        !1 === options.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", onend)));
      }
      function onend() {
        this._writableState.ended || process.nextTick(onEndNT, this);
      }
      function onEndNT(self) {
        self.end();
      }
      Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function() {
          return this._writableState.highWaterMark;
        }
      }), Object.defineProperty(Duplex.prototype, "writableBuffer", {
        enumerable: !1,
        get: function() {
          return this._writableState && this._writableState.getBuffer();
        }
      }), Object.defineProperty(Duplex.prototype, "writableLength", {
        enumerable: !1,
        get: function() {
          return this._writableState.length;
        }
      }), Object.defineProperty(Duplex.prototype, "destroyed", {
        enumerable: !1,
        get: function() {
          return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed);
        },
        set: function(value) {
          void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = value, 
          this._writableState.destroyed = value);
        }
      });
    },
    5023: (module, __unused_webpack_exports, __webpack_require__) => {
      var Duplex;
      module.exports = Readable, Readable.ReadableState = ReadableState;
      __webpack_require__(2361).EventEmitter;
      var EElistenerCount = function(emitter, type) {
        return emitter.listeners(type).length;
      }, Stream = __webpack_require__(2781), Buffer = __webpack_require__(4300).Buffer, OurUint8Array = global.Uint8Array || function() {};
      var debug, debugUtil = __webpack_require__(3837);
      debug = debugUtil && debugUtil.debuglog ? debugUtil.debuglog("stream") : function() {};
      var StringDecoder, createReadableStreamAsyncIterator, from, BufferList = __webpack_require__(7327), destroyImpl = __webpack_require__(1195), getHighWaterMark = __webpack_require__(2457).getHighWaterMark, _require$codes = __webpack_require__(4012).q, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
      __webpack_require__(3837).inherits(Readable, Stream);
      var errorOrDestroy = destroyImpl.errorOrDestroy, kProxyEvents = [ "error", "close", "destroy", "pause", "resume" ];
      function ReadableState(options, stream, isDuplex) {
        Duplex = Duplex || __webpack_require__(4261), options = options || {}, "boolean" != typeof isDuplex && (isDuplex = stream instanceof Duplex), 
        this.objectMode = !!options.objectMode, isDuplex && (this.objectMode = this.objectMode || !!options.readableObjectMode), 
        this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex), 
        this.buffer = new BufferList, this.length = 0, this.pipes = null, this.pipesCount = 0, 
        this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, 
        this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, 
        this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== options.emitClose, 
        this.autoDestroy = !!options.autoDestroy, this.destroyed = !1, this.defaultEncoding = options.defaultEncoding || "utf8", 
        this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, 
        options.encoding && (StringDecoder || (StringDecoder = __webpack_require__(1576).StringDecoder), 
        this.decoder = new StringDecoder(options.encoding), this.encoding = options.encoding);
      }
      function Readable(options) {
        if (Duplex = Duplex || __webpack_require__(4261), !(this instanceof Readable)) return new Readable(options);
        var isDuplex = this instanceof Duplex;
        this._readableState = new ReadableState(options, this, isDuplex), this.readable = !0, 
        options && ("function" == typeof options.read && (this._read = options.read), "function" == typeof options.destroy && (this._destroy = options.destroy)), 
        Stream.call(this);
      }
      function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
        debug("readableAddChunk", chunk);
        var er, state = stream._readableState;
        if (null === chunk) state.reading = !1, function(stream, state) {
          if (debug("onEofChunk"), state.ended) return;
          if (state.decoder) {
            var chunk = state.decoder.end();
            chunk && chunk.length && (state.buffer.push(chunk), state.length += state.objectMode ? 1 : chunk.length);
          }
          state.ended = !0, state.sync ? emitReadable(stream) : (state.needReadable = !1, 
          state.emittedReadable || (state.emittedReadable = !0, emitReadable_(stream)));
        }(stream, state); else if (skipChunkCheck || (er = function(state, chunk) {
          var er;
          obj = chunk, Buffer.isBuffer(obj) || obj instanceof OurUint8Array || "string" == typeof chunk || void 0 === chunk || state.objectMode || (er = new ERR_INVALID_ARG_TYPE("chunk", [ "string", "Buffer", "Uint8Array" ], chunk));
          var obj;
          return er;
        }(state, chunk)), er) errorOrDestroy(stream, er); else if (state.objectMode || chunk && chunk.length > 0) if ("string" == typeof chunk || state.objectMode || Object.getPrototypeOf(chunk) === Buffer.prototype || (chunk = function(chunk) {
          return Buffer.from(chunk);
        }(chunk)), addToFront) state.endEmitted ? errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT) : addChunk(stream, state, chunk, !0); else if (state.ended) errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF); else {
          if (state.destroyed) return !1;
          state.reading = !1, state.decoder && !encoding ? (chunk = state.decoder.write(chunk), 
          state.objectMode || 0 !== chunk.length ? addChunk(stream, state, chunk, !1) : maybeReadMore(stream, state)) : addChunk(stream, state, chunk, !1);
        } else addToFront || (state.reading = !1, maybeReadMore(stream, state));
        return !state.ended && (state.length < state.highWaterMark || 0 === state.length);
      }
      function addChunk(stream, state, chunk, addToFront) {
        state.flowing && 0 === state.length && !state.sync ? (state.awaitDrain = 0, stream.emit("data", chunk)) : (state.length += state.objectMode ? 1 : chunk.length, 
        addToFront ? state.buffer.unshift(chunk) : state.buffer.push(chunk), state.needReadable && emitReadable(stream)), 
        maybeReadMore(stream, state);
      }
      Object.defineProperty(Readable.prototype, "destroyed", {
        enumerable: !1,
        get: function() {
          return void 0 !== this._readableState && this._readableState.destroyed;
        },
        set: function(value) {
          this._readableState && (this._readableState.destroyed = value);
        }
      }), Readable.prototype.destroy = destroyImpl.destroy, Readable.prototype._undestroy = destroyImpl.undestroy, 
      Readable.prototype._destroy = function(err, cb) {
        cb(err);
      }, Readable.prototype.push = function(chunk, encoding) {
        var skipChunkCheck, state = this._readableState;
        return state.objectMode ? skipChunkCheck = !0 : "string" == typeof chunk && ((encoding = encoding || state.defaultEncoding) !== state.encoding && (chunk = Buffer.from(chunk, encoding), 
        encoding = ""), skipChunkCheck = !0), readableAddChunk(this, chunk, encoding, !1, skipChunkCheck);
      }, Readable.prototype.unshift = function(chunk) {
        return readableAddChunk(this, chunk, null, !0, !1);
      }, Readable.prototype.isPaused = function() {
        return !1 === this._readableState.flowing;
      }, Readable.prototype.setEncoding = function(enc) {
        StringDecoder || (StringDecoder = __webpack_require__(1576).StringDecoder);
        var decoder = new StringDecoder(enc);
        this._readableState.decoder = decoder, this._readableState.encoding = this._readableState.decoder.encoding;
        for (var p = this._readableState.buffer.head, content = ""; null !== p; ) content += decoder.write(p.data), 
        p = p.next;
        return this._readableState.buffer.clear(), "" !== content && this._readableState.buffer.push(content), 
        this._readableState.length = content.length, this;
      };
      function howMuchToRead(n, state) {
        return n <= 0 || 0 === state.length && state.ended ? 0 : state.objectMode ? 1 : n != n ? state.flowing && state.length ? state.buffer.head.data.length : state.length : (n > state.highWaterMark && (state.highWaterMark = function(n) {
          return n >= 1073741824 ? n = 1073741824 : (n--, n |= n >>> 1, n |= n >>> 2, n |= n >>> 4, 
          n |= n >>> 8, n |= n >>> 16, n++), n;
        }(n)), n <= state.length ? n : state.ended ? state.length : (state.needReadable = !0, 
        0));
      }
      function emitReadable(stream) {
        var state = stream._readableState;
        debug("emitReadable", state.needReadable, state.emittedReadable), state.needReadable = !1, 
        state.emittedReadable || (debug("emitReadable", state.flowing), state.emittedReadable = !0, 
        process.nextTick(emitReadable_, stream));
      }
      function emitReadable_(stream) {
        var state = stream._readableState;
        debug("emitReadable_", state.destroyed, state.length, state.ended), state.destroyed || !state.length && !state.ended || (stream.emit("readable"), 
        state.emittedReadable = !1), state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark, 
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        state.readingMore || (state.readingMore = !0, process.nextTick(maybeReadMore_, stream, state));
      }
      function maybeReadMore_(stream, state) {
        for (;!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && 0 === state.length); ) {
          var len = state.length;
          if (debug("maybeReadMore read 0"), stream.read(0), len === state.length) break;
        }
        state.readingMore = !1;
      }
      function updateReadableListening(self) {
        var state = self._readableState;
        state.readableListening = self.listenerCount("readable") > 0, state.resumeScheduled && !state.paused ? state.flowing = !0 : self.listenerCount("data") > 0 && self.resume();
      }
      function nReadingNextTick(self) {
        debug("readable nexttick read 0"), self.read(0);
      }
      function resume_(stream, state) {
        debug("resume", state.reading), state.reading || stream.read(0), state.resumeScheduled = !1, 
        stream.emit("resume"), flow(stream), state.flowing && !state.reading && stream.read(0);
      }
      function flow(stream) {
        var state = stream._readableState;
        for (debug("flow", state.flowing); state.flowing && null !== stream.read(); ) ;
      }
      function fromList(n, state) {
        return 0 === state.length ? null : (state.objectMode ? ret = state.buffer.shift() : !n || n >= state.length ? (ret = state.decoder ? state.buffer.join("") : 1 === state.buffer.length ? state.buffer.first() : state.buffer.concat(state.length), 
        state.buffer.clear()) : ret = state.buffer.consume(n, state.decoder), ret);
        var ret;
      }
      function endReadable(stream) {
        var state = stream._readableState;
        debug("endReadable", state.endEmitted), state.endEmitted || (state.ended = !0, process.nextTick(endReadableNT, state, stream));
      }
      function endReadableNT(state, stream) {
        if (debug("endReadableNT", state.endEmitted, state.length), !state.endEmitted && 0 === state.length && (state.endEmitted = !0, 
        stream.readable = !1, stream.emit("end"), state.autoDestroy)) {
          var wState = stream._writableState;
          (!wState || wState.autoDestroy && wState.finished) && stream.destroy();
        }
      }
      function indexOf(xs, x) {
        for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
        return -1;
      }
      Readable.prototype.read = function(n) {
        debug("read", n), n = parseInt(n, 10);
        var state = this._readableState, nOrig = n;
        if (0 !== n && (state.emittedReadable = !1), 0 === n && state.needReadable && ((0 !== state.highWaterMark ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) return debug("read: emitReadable", state.length, state.ended), 
        0 === state.length && state.ended ? endReadable(this) : emitReadable(this), null;
        if (0 === (n = howMuchToRead(n, state)) && state.ended) return 0 === state.length && endReadable(this), 
        null;
        var ret, doRead = state.needReadable;
        return debug("need readable", doRead), (0 === state.length || state.length - n < state.highWaterMark) && debug("length less than watermark", doRead = !0), 
        state.ended || state.reading ? debug("reading or ended", doRead = !1) : doRead && (debug("do read"), 
        state.reading = !0, state.sync = !0, 0 === state.length && (state.needReadable = !0), 
        this._read(state.highWaterMark), state.sync = !1, state.reading || (n = howMuchToRead(nOrig, state))), 
        null === (ret = n > 0 ? fromList(n, state) : null) ? (state.needReadable = state.length <= state.highWaterMark, 
        n = 0) : (state.length -= n, state.awaitDrain = 0), 0 === state.length && (state.ended || (state.needReadable = !0), 
        nOrig !== n && state.ended && endReadable(this)), null !== ret && this.emit("data", ret), 
        ret;
      }, Readable.prototype._read = function(n) {
        errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
      }, Readable.prototype.pipe = function(dest, pipeOpts) {
        var src = this, state = this._readableState;
        switch (state.pipesCount) {
         case 0:
          state.pipes = dest;
          break;

         case 1:
          state.pipes = [ state.pipes, dest ];
          break;

         default:
          state.pipes.push(dest);
        }
        state.pipesCount += 1, debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var endFn = (!pipeOpts || !1 !== pipeOpts.end) && dest !== process.stdout && dest !== process.stderr ? onend : unpipe;
        function onunpipe(readable, unpipeInfo) {
          debug("onunpipe"), readable === src && unpipeInfo && !1 === unpipeInfo.hasUnpiped && (unpipeInfo.hasUnpiped = !0, 
          debug("cleanup"), dest.removeListener("close", onclose), dest.removeListener("finish", onfinish), 
          dest.removeListener("drain", ondrain), dest.removeListener("error", onerror), dest.removeListener("unpipe", onunpipe), 
          src.removeListener("end", onend), src.removeListener("end", unpipe), src.removeListener("data", ondata), 
          cleanedUp = !0, !state.awaitDrain || dest._writableState && !dest._writableState.needDrain || ondrain());
        }
        function onend() {
          debug("onend"), dest.end();
        }
        state.endEmitted ? process.nextTick(endFn) : src.once("end", endFn), dest.on("unpipe", onunpipe);
        var ondrain = function(src) {
          return function() {
            var state = src._readableState;
            debug("pipeOnDrain", state.awaitDrain), state.awaitDrain && state.awaitDrain--, 
            0 === state.awaitDrain && EElistenerCount(src, "data") && (state.flowing = !0, flow(src));
          };
        }(src);
        dest.on("drain", ondrain);
        var cleanedUp = !1;
        function ondata(chunk) {
          debug("ondata");
          var ret = dest.write(chunk);
          debug("dest.write", ret), !1 === ret && ((1 === state.pipesCount && state.pipes === dest || state.pipesCount > 1 && -1 !== indexOf(state.pipes, dest)) && !cleanedUp && (debug("false write response, pause", state.awaitDrain), 
          state.awaitDrain++), src.pause());
        }
        function onerror(er) {
          debug("onerror", er), unpipe(), dest.removeListener("error", onerror), 0 === EElistenerCount(dest, "error") && errorOrDestroy(dest, er);
        }
        function onclose() {
          dest.removeListener("finish", onfinish), unpipe();
        }
        function onfinish() {
          debug("onfinish"), dest.removeListener("close", onclose), unpipe();
        }
        function unpipe() {
          debug("unpipe"), src.unpipe(dest);
        }
        return src.on("data", ondata), function(emitter, event, fn) {
          if ("function" == typeof emitter.prependListener) return emitter.prependListener(event, fn);
          emitter._events && emitter._events[event] ? Array.isArray(emitter._events[event]) ? emitter._events[event].unshift(fn) : emitter._events[event] = [ fn, emitter._events[event] ] : emitter.on(event, fn);
        }(dest, "error", onerror), dest.once("close", onclose), dest.once("finish", onfinish), 
        dest.emit("pipe", src), state.flowing || (debug("pipe resume"), src.resume()), dest;
      }, Readable.prototype.unpipe = function(dest) {
        var state = this._readableState, unpipeInfo = {
          hasUnpiped: !1
        };
        if (0 === state.pipesCount) return this;
        if (1 === state.pipesCount) return dest && dest !== state.pipes || (dest || (dest = state.pipes), 
        state.pipes = null, state.pipesCount = 0, state.flowing = !1, dest && dest.emit("unpipe", this, unpipeInfo)), 
        this;
        if (!dest) {
          var dests = state.pipes, len = state.pipesCount;
          state.pipes = null, state.pipesCount = 0, state.flowing = !1;
          for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, {
            hasUnpiped: !1
          });
          return this;
        }
        var index = indexOf(state.pipes, dest);
        return -1 === index || (state.pipes.splice(index, 1), state.pipesCount -= 1, 1 === state.pipesCount && (state.pipes = state.pipes[0]), 
        dest.emit("unpipe", this, unpipeInfo)), this;
      }, Readable.prototype.on = function(ev, fn) {
        var res = Stream.prototype.on.call(this, ev, fn), state = this._readableState;
        return "data" === ev ? (state.readableListening = this.listenerCount("readable") > 0, 
        !1 !== state.flowing && this.resume()) : "readable" === ev && (state.endEmitted || state.readableListening || (state.readableListening = state.needReadable = !0, 
        state.flowing = !1, state.emittedReadable = !1, debug("on readable", state.length, state.reading), 
        state.length ? emitReadable(this) : state.reading || process.nextTick(nReadingNextTick, this))), 
        res;
      }, Readable.prototype.addListener = Readable.prototype.on, Readable.prototype.removeListener = function(ev, fn) {
        var res = Stream.prototype.removeListener.call(this, ev, fn);
        return "readable" === ev && process.nextTick(updateReadableListening, this), res;
      }, Readable.prototype.removeAllListeners = function(ev) {
        var res = Stream.prototype.removeAllListeners.apply(this, arguments);
        return "readable" !== ev && void 0 !== ev || process.nextTick(updateReadableListening, this), 
        res;
      }, Readable.prototype.resume = function() {
        var state = this._readableState;
        return state.flowing || (debug("resume"), state.flowing = !state.readableListening, 
        function(stream, state) {
          state.resumeScheduled || (state.resumeScheduled = !0, process.nextTick(resume_, stream, state));
        }(this, state)), state.paused = !1, this;
      }, Readable.prototype.pause = function() {
        return debug("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (debug("pause"), 
        this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, 
        this;
      }, Readable.prototype.wrap = function(stream) {
        var _this = this, state = this._readableState, paused = !1;
        for (var i in stream.on("end", (function() {
          if (debug("wrapped end"), state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            chunk && chunk.length && _this.push(chunk);
          }
          _this.push(null);
        })), stream.on("data", (function(chunk) {
          (debug("wrapped data"), state.decoder && (chunk = state.decoder.write(chunk)), state.objectMode && null == chunk) || (state.objectMode || chunk && chunk.length) && (_this.push(chunk) || (paused = !0, 
          stream.pause()));
        })), stream) void 0 === this[i] && "function" == typeof stream[i] && (this[i] = function(method) {
          return function() {
            return stream[method].apply(stream, arguments);
          };
        }(i));
        for (var n = 0; n < kProxyEvents.length; n++) stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
        return this._read = function(n) {
          debug("wrapped _read", n), paused && (paused = !1, stream.resume());
        }, this;
      }, "function" == typeof Symbol && (Readable.prototype[Symbol.asyncIterator] = function() {
        return void 0 === createReadableStreamAsyncIterator && (createReadableStreamAsyncIterator = __webpack_require__(5850)), 
        createReadableStreamAsyncIterator(this);
      }), Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
        enumerable: !1,
        get: function() {
          return this._readableState.highWaterMark;
        }
      }), Object.defineProperty(Readable.prototype, "readableBuffer", {
        enumerable: !1,
        get: function() {
          return this._readableState && this._readableState.buffer;
        }
      }), Object.defineProperty(Readable.prototype, "readableFlowing", {
        enumerable: !1,
        get: function() {
          return this._readableState.flowing;
        },
        set: function(state) {
          this._readableState && (this._readableState.flowing = state);
        }
      }), Readable._fromList = fromList, Object.defineProperty(Readable.prototype, "readableLength", {
        enumerable: !1,
        get: function() {
          return this._readableState.length;
        }
      }), "function" == typeof Symbol && (Readable.from = function(iterable, opts) {
        return void 0 === from && (from = __webpack_require__(6307)), from(Readable, iterable, opts);
      });
    },
    8480: (module, __unused_webpack_exports, __webpack_require__) => {
      function CorkedRequest(state) {
        var _this = this;
        this.next = null, this.entry = null, this.finish = function() {
          !function(corkReq, state, err) {
            var entry = corkReq.entry;
            corkReq.entry = null;
            for (;entry; ) {
              var cb = entry.callback;
              state.pendingcb--, cb(err), entry = entry.next;
            }
            state.corkedRequestsFree.next = corkReq;
          }(_this, state);
        };
      }
      var Duplex;
      module.exports = Writable, Writable.WritableState = WritableState;
      var internalUtil = {
        deprecate: __webpack_require__(3837).deprecate
      }, Stream = __webpack_require__(2781), Buffer = __webpack_require__(4300).Buffer, OurUint8Array = global.Uint8Array || function() {};
      var realHasInstance, destroyImpl = __webpack_require__(1195), getHighWaterMark = __webpack_require__(2457).getHighWaterMark, _require$codes = __webpack_require__(4012).q, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING, errorOrDestroy = destroyImpl.errorOrDestroy;
      function nop() {}
      function WritableState(options, stream, isDuplex) {
        Duplex = Duplex || __webpack_require__(4261), options = options || {}, "boolean" != typeof isDuplex && (isDuplex = stream instanceof Duplex), 
        this.objectMode = !!options.objectMode, isDuplex && (this.objectMode = this.objectMode || !!options.writableObjectMode), 
        this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex), 
        this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, 
        this.destroyed = !1;
        var noDecode = !1 === options.decodeStrings;
        this.decodeStrings = !noDecode, this.defaultEncoding = options.defaultEncoding || "utf8", 
        this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, 
        this.onwrite = function(er) {
          !function(stream, er) {
            var state = stream._writableState, sync = state.sync, cb = state.writecb;
            if ("function" != typeof cb) throw new ERR_MULTIPLE_CALLBACK;
            if (function(state) {
              state.writing = !1, state.writecb = null, state.length -= state.writelen, state.writelen = 0;
            }(state), er) !function(stream, state, sync, er, cb) {
              --state.pendingcb, sync ? (process.nextTick(cb, er), process.nextTick(finishMaybe, stream, state), 
              stream._writableState.errorEmitted = !0, errorOrDestroy(stream, er)) : (cb(er), 
              stream._writableState.errorEmitted = !0, errorOrDestroy(stream, er), finishMaybe(stream, state));
            }(stream, state, sync, er, cb); else {
              var finished = needFinish(state) || stream.destroyed;
              finished || state.corked || state.bufferProcessing || !state.bufferedRequest || clearBuffer(stream, state), 
              sync ? process.nextTick(afterWrite, stream, state, finished, cb) : afterWrite(stream, state, finished, cb);
            }
          }(stream, er);
        }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, 
        this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== options.emitClose, 
        this.autoDestroy = !!options.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new CorkedRequest(this);
      }
      function Writable(options) {
        var isDuplex = this instanceof (Duplex = Duplex || __webpack_require__(4261));
        if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
        this._writableState = new WritableState(options, this, isDuplex), this.writable = !0, 
        options && ("function" == typeof options.write && (this._write = options.write), 
        "function" == typeof options.writev && (this._writev = options.writev), "function" == typeof options.destroy && (this._destroy = options.destroy), 
        "function" == typeof options.final && (this._final = options.final)), Stream.call(this);
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len, state.writecb = cb, state.writing = !0, state.sync = !0, state.destroyed ? state.onwrite(new ERR_STREAM_DESTROYED("write")) : writev ? stream._writev(chunk, state.onwrite) : stream._write(chunk, encoding, state.onwrite), 
        state.sync = !1;
      }
      function afterWrite(stream, state, finished, cb) {
        finished || function(stream, state) {
          0 === state.length && state.needDrain && (state.needDrain = !1, stream.emit("drain"));
        }(stream, state), state.pendingcb--, cb(), finishMaybe(stream, state);
      }
      function clearBuffer(stream, state) {
        state.bufferProcessing = !0;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
          var l = state.bufferedRequestCount, buffer = new Array(l), holder = state.corkedRequestsFree;
          holder.entry = entry;
          for (var count = 0, allBuffers = !0; entry; ) buffer[count] = entry, entry.isBuf || (allBuffers = !1), 
          entry = entry.next, count += 1;
          buffer.allBuffers = allBuffers, doWrite(stream, state, !0, state.length, buffer, "", holder.finish), 
          state.pendingcb++, state.lastBufferedRequest = null, holder.next ? (state.corkedRequestsFree = holder.next, 
          holder.next = null) : state.corkedRequestsFree = new CorkedRequest(state), state.bufferedRequestCount = 0;
        } else {
          for (;entry; ) {
            var chunk = entry.chunk, encoding = entry.encoding, cb = entry.callback;
            if (doWrite(stream, state, !1, state.objectMode ? 1 : chunk.length, chunk, encoding, cb), 
            entry = entry.next, state.bufferedRequestCount--, state.writing) break;
          }
          null === entry && (state.lastBufferedRequest = null);
        }
        state.bufferedRequest = entry, state.bufferProcessing = !1;
      }
      function needFinish(state) {
        return state.ending && 0 === state.length && null === state.bufferedRequest && !state.finished && !state.writing;
      }
      function callFinal(stream, state) {
        stream._final((function(err) {
          state.pendingcb--, err && errorOrDestroy(stream, err), state.prefinished = !0, stream.emit("prefinish"), 
          finishMaybe(stream, state);
        }));
      }
      function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need && (function(stream, state) {
          state.prefinished || state.finalCalled || ("function" != typeof stream._final || state.destroyed ? (state.prefinished = !0, 
          stream.emit("prefinish")) : (state.pendingcb++, state.finalCalled = !0, process.nextTick(callFinal, stream, state)));
        }(stream, state), 0 === state.pendingcb && (state.finished = !0, stream.emit("finish"), 
        state.autoDestroy))) {
          var rState = stream._readableState;
          (!rState || rState.autoDestroy && rState.endEmitted) && stream.destroy();
        }
        return need;
      }
      __webpack_require__(3837).inherits(Writable, Stream), WritableState.prototype.getBuffer = function() {
        for (var current = this.bufferedRequest, out = []; current; ) out.push(current), 
        current = current.next;
        return out;
      }, function() {
        try {
          Object.defineProperty(WritableState.prototype, "buffer", {
            get: internalUtil.deprecate((function() {
              return this.getBuffer();
            }), "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
          });
        } catch (_) {}
      }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (realHasInstance = Function.prototype[Symbol.hasInstance], 
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function(object) {
          return !!realHasInstance.call(this, object) || this === Writable && (object && object._writableState instanceof WritableState);
        }
      })) : realHasInstance = function(object) {
        return object instanceof this;
      }, Writable.prototype.pipe = function() {
        errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE);
      }, Writable.prototype.write = function(chunk, encoding, cb) {
        var obj, state = this._writableState, ret = !1, isBuf = !state.objectMode && (obj = chunk, 
        Buffer.isBuffer(obj) || obj instanceof OurUint8Array);
        return isBuf && !Buffer.isBuffer(chunk) && (chunk = function(chunk) {
          return Buffer.from(chunk);
        }(chunk)), "function" == typeof encoding && (cb = encoding, encoding = null), isBuf ? encoding = "buffer" : encoding || (encoding = state.defaultEncoding), 
        "function" != typeof cb && (cb = nop), state.ending ? function(stream, cb) {
          var er = new ERR_STREAM_WRITE_AFTER_END;
          errorOrDestroy(stream, er), process.nextTick(cb, er);
        }(this, cb) : (isBuf || function(stream, state, chunk, cb) {
          var er;
          return null === chunk ? er = new ERR_STREAM_NULL_VALUES : "string" == typeof chunk || state.objectMode || (er = new ERR_INVALID_ARG_TYPE("chunk", [ "string", "Buffer" ], chunk)), 
          !er || (errorOrDestroy(stream, er), process.nextTick(cb, er), !1);
        }(this, state, chunk, cb)) && (state.pendingcb++, ret = function(stream, state, isBuf, chunk, encoding, cb) {
          if (!isBuf) {
            var newChunk = function(state, chunk, encoding) {
              state.objectMode || !1 === state.decodeStrings || "string" != typeof chunk || (chunk = Buffer.from(chunk, encoding));
              return chunk;
            }(state, chunk, encoding);
            chunk !== newChunk && (isBuf = !0, encoding = "buffer", chunk = newChunk);
          }
          var len = state.objectMode ? 1 : chunk.length;
          state.length += len;
          var ret = state.length < state.highWaterMark;
          ret || (state.needDrain = !0);
          if (state.writing || state.corked) {
            var last = state.lastBufferedRequest;
            state.lastBufferedRequest = {
              chunk,
              encoding,
              isBuf,
              callback: cb,
              next: null
            }, last ? last.next = state.lastBufferedRequest : state.bufferedRequest = state.lastBufferedRequest, 
            state.bufferedRequestCount += 1;
          } else doWrite(stream, state, !1, len, chunk, encoding, cb);
          return ret;
        }(this, state, isBuf, chunk, encoding, cb)), ret;
      }, Writable.prototype.cork = function() {
        this._writableState.corked++;
      }, Writable.prototype.uncork = function() {
        var state = this._writableState;
        state.corked && (state.corked--, state.writing || state.corked || state.bufferProcessing || !state.bufferedRequest || clearBuffer(this, state));
      }, Writable.prototype.setDefaultEncoding = function(encoding) {
        if ("string" == typeof encoding && (encoding = encoding.toLowerCase()), !([ "hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw" ].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
        return this._writableState.defaultEncoding = encoding, this;
      }, Object.defineProperty(Writable.prototype, "writableBuffer", {
        enumerable: !1,
        get: function() {
          return this._writableState && this._writableState.getBuffer();
        }
      }), Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function() {
          return this._writableState.highWaterMark;
        }
      }), Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
      }, Writable.prototype._writev = null, Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        return "function" == typeof chunk ? (cb = chunk, chunk = null, encoding = null) : "function" == typeof encoding && (cb = encoding, 
        encoding = null), null != chunk && this.write(chunk, encoding), state.corked && (state.corked = 1, 
        this.uncork()), state.ending || function(stream, state, cb) {
          state.ending = !0, finishMaybe(stream, state), cb && (state.finished ? process.nextTick(cb) : stream.once("finish", cb));
          state.ended = !0, stream.writable = !1;
        }(this, state, cb), this;
      }, Object.defineProperty(Writable.prototype, "writableLength", {
        enumerable: !1,
        get: function() {
          return this._writableState.length;
        }
      }), Object.defineProperty(Writable.prototype, "destroyed", {
        enumerable: !1,
        get: function() {
          return void 0 !== this._writableState && this._writableState.destroyed;
        },
        set: function(value) {
          this._writableState && (this._writableState.destroyed = value);
        }
      }), Writable.prototype.destroy = destroyImpl.destroy, Writable.prototype._undestroy = destroyImpl.undestroy, 
      Writable.prototype._destroy = function(err, cb) {
        cb(err);
      };
    },
    4489: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = Object.assign({}, __webpack_require__(7749), __webpack_require__(4542));
      const fs = __webpack_require__(7147);
      Object.getOwnPropertyDescriptor(fs, "promises") && Object.defineProperty(module.exports, "promises", {
        get: () => fs.promises
      });
    },
    5807: (module, __unused_webpack_exports, __webpack_require__) => {
      const path = __webpack_require__(1017), locatePath = __webpack_require__(6401), stop = Symbol("findUp.stop");
      module.exports = async (name, options = {}) => {
        let directory = path.resolve(options.cwd || "");
        const {root} = path.parse(directory), paths = [].concat(name), runMatcher = async locateOptions => {
          if ("function" != typeof name) return locatePath(paths, locateOptions);
          const foundPath = await name(locateOptions.cwd);
          return "string" == typeof foundPath ? locatePath([ foundPath ], locateOptions) : foundPath;
        };
        for (;;) {
          const foundPath = await runMatcher({
            ...options,
            cwd: directory
          });
          if (foundPath === stop) return;
          if (foundPath) return path.resolve(directory, foundPath);
          if (directory === root) return;
          directory = path.dirname(directory);
        }
      }, module.exports.sync = (name, options = {}) => {
        let directory = path.resolve(options.cwd || "");
        const {root} = path.parse(directory), paths = [].concat(name), runMatcher = locateOptions => {
          if ("function" != typeof name) return locatePath.sync(paths, locateOptions);
          const foundPath = name(locateOptions.cwd);
          return "string" == typeof foundPath ? locatePath.sync([ foundPath ], locateOptions) : foundPath;
        };
        for (;;) {
          const foundPath = runMatcher({
            ...options,
            cwd: directory
          });
          if (foundPath === stop) return;
          if (foundPath) return path.resolve(directory, foundPath);
          if (directory === root) return;
          directory = path.dirname(directory);
        }
      }, module.exports.stop = stop;
    },
    9491: module => {
      module.exports = require("assert");
    },
    4300: module => {
      module.exports = require("buffer");
    },
    2081: module => {
      module.exports = require("child_process");
    },
    2057: module => {
      module.exports = require("constants");
    },
    6113: module => {
      module.exports = require("crypto");
    },
    2361: module => {
      module.exports = require("events");
    },
    7147: module => {
      module.exports = require("fs");
    },
    2037: module => {
      module.exports = require("os");
    },
    1017: module => {
      module.exports = require("path");
    },
    7282: module => {
      module.exports = require("process");
    },
    4521: module => {
      module.exports = require("readline");
    },
    2781: module => {
      module.exports = require("stream");
    },
    1576: module => {
      module.exports = require("string_decoder");
    },
    6224: module => {
      module.exports = require("tty");
    },
    3837: module => {
      module.exports = require("util");
    },
    5952: (__unused_webpack_module, exports, __webpack_require__) => {
      const {InvalidArgumentError} = __webpack_require__(4811);
      exports.Argument = class {
        constructor(name, description) {
          switch (this.description = description || "", this.variadic = !1, this.parseArg = void 0, 
          this.defaultValue = void 0, this.defaultValueDescription = void 0, this.argChoices = void 0, 
          name[0]) {
           case "<":
            this.required = !0, this._name = name.slice(1, -1);
            break;

           case "[":
            this.required = !1, this._name = name.slice(1, -1);
            break;

           default:
            this.required = !0, this._name = name;
          }
          this._name.length > 3 && "..." === this._name.slice(-3) && (this.variadic = !0, 
          this._name = this._name.slice(0, -3));
        }
        name() {
          return this._name;
        }
        _concatValue(value, previous) {
          return previous !== this.defaultValue && Array.isArray(previous) ? previous.concat(value) : [ value ];
        }
        default(value, description) {
          return this.defaultValue = value, this.defaultValueDescription = description, this;
        }
        argParser(fn) {
          return this.parseArg = fn, this;
        }
        choices(values) {
          return this.argChoices = values.slice(), this.parseArg = (arg, previous) => {
            if (!this.argChoices.includes(arg)) throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(", ")}.`);
            return this.variadic ? this._concatValue(arg, previous) : arg;
          }, this;
        }
        argRequired() {
          return this.required = !0, this;
        }
        argOptional() {
          return this.required = !1, this;
        }
      }, exports.humanReadableArgName = function(arg) {
        const nameOutput = arg.name() + (!0 === arg.variadic ? "..." : "");
        return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
      };
    },
    9903: (__unused_webpack_module, exports, __webpack_require__) => {
      const EventEmitter = __webpack_require__(2361).EventEmitter, childProcess = __webpack_require__(2081), path = __webpack_require__(1017), fs = __webpack_require__(7147), process = __webpack_require__(7282), {Argument, humanReadableArgName} = __webpack_require__(5952), {CommanderError} = __webpack_require__(4811), {Help} = __webpack_require__(4488), {Option, splitOptionFlags, DualOptions} = __webpack_require__(3112), {suggestSimilar} = __webpack_require__(2007);
      class Command extends EventEmitter {
        constructor(name) {
          super(), this.commands = [], this.options = [], this.parent = null, this._allowUnknownOption = !1, 
          this._allowExcessArguments = !0, this._args = [], this.args = [], this.rawArgs = [], 
          this.processedArgs = [], this._scriptPath = null, this._name = name || "", this._optionValues = {}, 
          this._optionValueSources = {}, this._storeOptionsAsProperties = !1, this._actionHandler = null, 
          this._executableHandler = !1, this._executableFile = null, this._executableDir = null, 
          this._defaultCommandName = null, this._exitCallback = null, this._aliases = [], 
          this._combineFlagAndOptionalValue = !0, this._description = "", this._summary = "", 
          this._argsDescription = void 0, this._enablePositionalOptions = !1, this._passThroughOptions = !1, 
          this._lifeCycleHooks = {}, this._showHelpAfterError = !1, this._showSuggestionAfterError = !0, 
          this._outputConfiguration = {
            writeOut: str => process.stdout.write(str),
            writeErr: str => process.stderr.write(str),
            getOutHelpWidth: () => process.stdout.isTTY ? process.stdout.columns : void 0,
            getErrHelpWidth: () => process.stderr.isTTY ? process.stderr.columns : void 0,
            outputError: (str, write) => write(str)
          }, this._hidden = !1, this._hasHelpOption = !0, this._helpFlags = "-h, --help", 
          this._helpDescription = "display help for command", this._helpShortFlag = "-h", 
          this._helpLongFlag = "--help", this._addImplicitHelpCommand = void 0, this._helpCommandName = "help", 
          this._helpCommandnameAndArgs = "help [command]", this._helpCommandDescription = "display help for command", 
          this._helpConfiguration = {};
        }
        copyInheritedSettings(sourceCommand) {
          return this._outputConfiguration = sourceCommand._outputConfiguration, this._hasHelpOption = sourceCommand._hasHelpOption, 
          this._helpFlags = sourceCommand._helpFlags, this._helpDescription = sourceCommand._helpDescription, 
          this._helpShortFlag = sourceCommand._helpShortFlag, this._helpLongFlag = sourceCommand._helpLongFlag, 
          this._helpCommandName = sourceCommand._helpCommandName, this._helpCommandnameAndArgs = sourceCommand._helpCommandnameAndArgs, 
          this._helpCommandDescription = sourceCommand._helpCommandDescription, this._helpConfiguration = sourceCommand._helpConfiguration, 
          this._exitCallback = sourceCommand._exitCallback, this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties, 
          this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue, 
          this._allowExcessArguments = sourceCommand._allowExcessArguments, this._enablePositionalOptions = sourceCommand._enablePositionalOptions, 
          this._showHelpAfterError = sourceCommand._showHelpAfterError, this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError, 
          this;
        }
        command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
          let desc = actionOptsOrExecDesc, opts = execOpts;
          "object" == typeof desc && null !== desc && (opts = desc, desc = null), opts = opts || {};
          const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/), cmd = this.createCommand(name);
          return desc && (cmd.description(desc), cmd._executableHandler = !0), opts.isDefault && (this._defaultCommandName = cmd._name), 
          cmd._hidden = !(!opts.noHelp && !opts.hidden), cmd._executableFile = opts.executableFile || null, 
          args && cmd.arguments(args), this.commands.push(cmd), cmd.parent = this, cmd.copyInheritedSettings(this), 
          desc ? this : cmd;
        }
        createCommand(name) {
          return new Command(name);
        }
        createHelp() {
          return Object.assign(new Help, this.configureHelp());
        }
        configureHelp(configuration) {
          return void 0 === configuration ? this._helpConfiguration : (this._helpConfiguration = configuration, 
          this);
        }
        configureOutput(configuration) {
          return void 0 === configuration ? this._outputConfiguration : (Object.assign(this._outputConfiguration, configuration), 
          this);
        }
        showHelpAfterError(displayHelp = !0) {
          return "string" != typeof displayHelp && (displayHelp = !!displayHelp), this._showHelpAfterError = displayHelp, 
          this;
        }
        showSuggestionAfterError(displaySuggestion = !0) {
          return this._showSuggestionAfterError = !!displaySuggestion, this;
        }
        addCommand(cmd, opts) {
          if (!cmd._name) throw new Error("Command passed to .addCommand() must have a name\n- specify the name in Command constructor or using .name()");
          return (opts = opts || {}).isDefault && (this._defaultCommandName = cmd._name), 
          (opts.noHelp || opts.hidden) && (cmd._hidden = !0), this.commands.push(cmd), cmd.parent = this, 
          this;
        }
        createArgument(name, description) {
          return new Argument(name, description);
        }
        argument(name, description, fn, defaultValue) {
          const argument = this.createArgument(name, description);
          return "function" == typeof fn ? argument.default(defaultValue).argParser(fn) : argument.default(fn), 
          this.addArgument(argument), this;
        }
        arguments(names) {
          return names.split(/ +/).forEach((detail => {
            this.argument(detail);
          })), this;
        }
        addArgument(argument) {
          const previousArgument = this._args.slice(-1)[0];
          if (previousArgument && previousArgument.variadic) throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
          if (argument.required && void 0 !== argument.defaultValue && void 0 === argument.parseArg) throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
          return this._args.push(argument), this;
        }
        addHelpCommand(enableOrNameAndArgs, description) {
          return !1 === enableOrNameAndArgs ? this._addImplicitHelpCommand = !1 : (this._addImplicitHelpCommand = !0, 
          "string" == typeof enableOrNameAndArgs && (this._helpCommandName = enableOrNameAndArgs.split(" ")[0], 
          this._helpCommandnameAndArgs = enableOrNameAndArgs), this._helpCommandDescription = description || this._helpCommandDescription), 
          this;
        }
        _hasImplicitHelpCommand() {
          return void 0 === this._addImplicitHelpCommand ? this.commands.length && !this._actionHandler && !this._findCommand("help") : this._addImplicitHelpCommand;
        }
        hook(event, listener) {
          const allowedValues = [ "preSubcommand", "preAction", "postAction" ];
          if (!allowedValues.includes(event)) throw new Error(`Unexpected value for event passed to hook : '${event}'.\nExpecting one of '${allowedValues.join("', '")}'`);
          return this._lifeCycleHooks[event] ? this._lifeCycleHooks[event].push(listener) : this._lifeCycleHooks[event] = [ listener ], 
          this;
        }
        exitOverride(fn) {
          return this._exitCallback = fn || (err => {
            if ("commander.executeSubCommandAsync" !== err.code) throw err;
          }), this;
        }
        _exit(exitCode, code, message) {
          this._exitCallback && this._exitCallback(new CommanderError(exitCode, code, message)), 
          process.exit(exitCode);
        }
        action(fn) {
          return this._actionHandler = args => {
            const expectedArgsCount = this._args.length, actionArgs = args.slice(0, expectedArgsCount);
            return this._storeOptionsAsProperties ? actionArgs[expectedArgsCount] = this : actionArgs[expectedArgsCount] = this.opts(), 
            actionArgs.push(this), fn.apply(this, actionArgs);
          }, this;
        }
        createOption(flags, description) {
          return new Option(flags, description);
        }
        addOption(option) {
          const oname = option.name(), name = option.attributeName();
          if (option.negate) {
            const positiveLongFlag = option.long.replace(/^--no-/, "--");
            this._findOption(positiveLongFlag) || this.setOptionValueWithSource(name, void 0 === option.defaultValue || option.defaultValue, "default");
          } else void 0 !== option.defaultValue && this.setOptionValueWithSource(name, option.defaultValue, "default");
          this.options.push(option);
          const handleOptionValue = (val, invalidValueMessage, valueSource) => {
            null == val && void 0 !== option.presetArg && (val = option.presetArg);
            const oldValue = this.getOptionValue(name);
            if (null !== val && option.parseArg) try {
              val = option.parseArg(val, oldValue);
            } catch (err) {
              if ("commander.invalidArgument" === err.code) {
                const message = `${invalidValueMessage} ${err.message}`;
                this.error(message, {
                  exitCode: err.exitCode,
                  code: err.code
                });
              }
              throw err;
            } else null !== val && option.variadic && (val = option._concatValue(val, oldValue));
            null == val && (val = !option.negate && (!(!option.isBoolean() && !option.optional) || "")), 
            this.setOptionValueWithSource(name, val, valueSource);
          };
          return this.on("option:" + oname, (val => {
            const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "cli");
          })), option.envVar && this.on("optionEnv:" + oname, (val => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          })), this;
        }
        _optionEx(config, flags, description, fn, defaultValue) {
          if ("object" == typeof flags && flags instanceof Option) throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
          const option = this.createOption(flags, description);
          if (option.makeOptionMandatory(!!config.mandatory), "function" == typeof fn) option.default(defaultValue).argParser(fn); else if (fn instanceof RegExp) {
            const regex = fn;
            fn = (val, def) => {
              const m = regex.exec(val);
              return m ? m[0] : def;
            }, option.default(defaultValue).argParser(fn);
          } else option.default(fn);
          return this.addOption(option);
        }
        option(flags, description, fn, defaultValue) {
          return this._optionEx({}, flags, description, fn, defaultValue);
        }
        requiredOption(flags, description, fn, defaultValue) {
          return this._optionEx({
            mandatory: !0
          }, flags, description, fn, defaultValue);
        }
        combineFlagAndOptionalValue(combine = !0) {
          return this._combineFlagAndOptionalValue = !!combine, this;
        }
        allowUnknownOption(allowUnknown = !0) {
          return this._allowUnknownOption = !!allowUnknown, this;
        }
        allowExcessArguments(allowExcess = !0) {
          return this._allowExcessArguments = !!allowExcess, this;
        }
        enablePositionalOptions(positional = !0) {
          return this._enablePositionalOptions = !!positional, this;
        }
        passThroughOptions(passThrough = !0) {
          if (this._passThroughOptions = !!passThrough, this.parent && passThrough && !this.parent._enablePositionalOptions) throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");
          return this;
        }
        storeOptionsAsProperties(storeAsProperties = !0) {
          if (this._storeOptionsAsProperties = !!storeAsProperties, this.options.length) throw new Error("call .storeOptionsAsProperties() before adding options");
          return this;
        }
        getOptionValue(key) {
          return this._storeOptionsAsProperties ? this[key] : this._optionValues[key];
        }
        setOptionValue(key, value) {
          return this.setOptionValueWithSource(key, value, void 0);
        }
        setOptionValueWithSource(key, value, source) {
          return this._storeOptionsAsProperties ? this[key] = value : this._optionValues[key] = value, 
          this._optionValueSources[key] = source, this;
        }
        getOptionValueSource(key) {
          return this._optionValueSources[key];
        }
        _prepareUserArgs(argv, parseOptions) {
          if (void 0 !== argv && !Array.isArray(argv)) throw new Error("first parameter to parse must be array or undefined");
          let userArgs;
          switch (parseOptions = parseOptions || {}, void 0 === argv && (argv = process.argv, 
          process.versions && process.versions.electron && (parseOptions.from = "electron")), 
          this.rawArgs = argv.slice(), parseOptions.from) {
           case void 0:
           case "node":
            this._scriptPath = argv[1], userArgs = argv.slice(2);
            break;

           case "electron":
            process.defaultApp ? (this._scriptPath = argv[1], userArgs = argv.slice(2)) : userArgs = argv.slice(1);
            break;

           case "user":
            userArgs = argv.slice(0);
            break;

           default:
            throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
          }
          return !this._name && this._scriptPath && this.nameFromFilename(this._scriptPath), 
          this._name = this._name || "program", userArgs;
        }
        parse(argv, parseOptions) {
          const userArgs = this._prepareUserArgs(argv, parseOptions);
          return this._parseCommand([], userArgs), this;
        }
        async parseAsync(argv, parseOptions) {
          const userArgs = this._prepareUserArgs(argv, parseOptions);
          return await this._parseCommand([], userArgs), this;
        }
        _executeSubCommand(subcommand, args) {
          args = args.slice();
          let launchWithNode = !1;
          const sourceExt = [ ".js", ".ts", ".tsx", ".mjs", ".cjs" ];
          function findFile(baseDir, baseName) {
            const localBin = path.resolve(baseDir, baseName);
            if (fs.existsSync(localBin)) return localBin;
            if (sourceExt.includes(path.extname(baseName))) return;
            const foundExt = sourceExt.find((ext => fs.existsSync(`${localBin}${ext}`)));
            return foundExt ? `${localBin}${foundExt}` : void 0;
          }
          this._checkForMissingMandatoryOptions(), this._checkForConflictingOptions();
          let proc, executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`, executableDir = this._executableDir || "";
          if (this._scriptPath) {
            let resolvedScriptPath;
            try {
              resolvedScriptPath = fs.realpathSync(this._scriptPath);
            } catch (err) {
              resolvedScriptPath = this._scriptPath;
            }
            executableDir = path.resolve(path.dirname(resolvedScriptPath), executableDir);
          }
          if (executableDir) {
            let localFile = findFile(executableDir, executableFile);
            if (!localFile && !subcommand._executableFile && this._scriptPath) {
              const legacyName = path.basename(this._scriptPath, path.extname(this._scriptPath));
              legacyName !== this._name && (localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`));
            }
            executableFile = localFile || executableFile;
          }
          if (launchWithNode = sourceExt.includes(path.extname(executableFile)), "win32" !== process.platform ? launchWithNode ? (args.unshift(executableFile), 
          args = incrementNodeInspectorPort(process.execArgv).concat(args), proc = childProcess.spawn(process.argv[0], args, {
            stdio: "inherit"
          })) : proc = childProcess.spawn(executableFile, args, {
            stdio: "inherit"
          }) : (args.unshift(executableFile), args = incrementNodeInspectorPort(process.execArgv).concat(args), 
          proc = childProcess.spawn(process.execPath, args, {
            stdio: "inherit"
          })), !proc.killed) {
            [ "SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP" ].forEach((signal => {
              process.on(signal, (() => {
                !1 === proc.killed && null === proc.exitCode && proc.kill(signal);
              }));
            }));
          }
          const exitCallback = this._exitCallback;
          exitCallback ? proc.on("close", (() => {
            exitCallback(new CommanderError(process.exitCode || 0, "commander.executeSubCommandAsync", "(close)"));
          })) : proc.on("close", process.exit.bind(process)), proc.on("error", (err => {
            if ("ENOENT" === err.code) {
              const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory", executableMissing = `'${executableFile}' does not exist\n - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead\n - if the default executable name is not suitable, use the executableFile option to supply a custom name or path\n - ${executableDirMessage}`;
              throw new Error(executableMissing);
            }
            if ("EACCES" === err.code) throw new Error(`'${executableFile}' not executable`);
            if (exitCallback) {
              const wrappedError = new CommanderError(1, "commander.executeSubCommandAsync", "(error)");
              wrappedError.nestedError = err, exitCallback(wrappedError);
            } else process.exit(1);
          })), this.runningCommand = proc;
        }
        _dispatchSubcommand(commandName, operands, unknown) {
          const subCommand = this._findCommand(commandName);
          let hookResult;
          return subCommand || this.help({
            error: !0
          }), hookResult = this._chainOrCallSubCommandHook(hookResult, subCommand, "preSubcommand"), 
          hookResult = this._chainOrCall(hookResult, (() => {
            if (!subCommand._executableHandler) return subCommand._parseCommand(operands, unknown);
            this._executeSubCommand(subCommand, operands.concat(unknown));
          })), hookResult;
        }
        _checkNumberOfArguments() {
          this._args.forEach(((arg, i) => {
            arg.required && null == this.args[i] && this.missingArgument(arg.name());
          })), this._args.length > 0 && this._args[this._args.length - 1].variadic || this.args.length > this._args.length && this._excessArguments(this.args);
        }
        _processArguments() {
          const myParseArg = (argument, value, previous) => {
            let parsedValue = value;
            if (null !== value && argument.parseArg) try {
              parsedValue = argument.parseArg(value, previous);
            } catch (err) {
              if ("commander.invalidArgument" === err.code) {
                const message = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'. ${err.message}`;
                this.error(message, {
                  exitCode: err.exitCode,
                  code: err.code
                });
              }
              throw err;
            }
            return parsedValue;
          };
          this._checkNumberOfArguments();
          const processedArgs = [];
          this._args.forEach(((declaredArg, index) => {
            let value = declaredArg.defaultValue;
            declaredArg.variadic ? index < this.args.length ? (value = this.args.slice(index), 
            declaredArg.parseArg && (value = value.reduce(((processed, v) => myParseArg(declaredArg, v, processed)), declaredArg.defaultValue))) : void 0 === value && (value = []) : index < this.args.length && (value = this.args[index], 
            declaredArg.parseArg && (value = myParseArg(declaredArg, value, declaredArg.defaultValue))), 
            processedArgs[index] = value;
          })), this.processedArgs = processedArgs;
        }
        _chainOrCall(promise, fn) {
          return promise && promise.then && "function" == typeof promise.then ? promise.then((() => fn())) : fn();
        }
        _chainOrCallHooks(promise, event) {
          let result = promise;
          const hooks = [];
          return getCommandAndParents(this).reverse().filter((cmd => void 0 !== cmd._lifeCycleHooks[event])).forEach((hookedCommand => {
            hookedCommand._lifeCycleHooks[event].forEach((callback => {
              hooks.push({
                hookedCommand,
                callback
              });
            }));
          })), "postAction" === event && hooks.reverse(), hooks.forEach((hookDetail => {
            result = this._chainOrCall(result, (() => hookDetail.callback(hookDetail.hookedCommand, this)));
          })), result;
        }
        _chainOrCallSubCommandHook(promise, subCommand, event) {
          let result = promise;
          return void 0 !== this._lifeCycleHooks[event] && this._lifeCycleHooks[event].forEach((hook => {
            result = this._chainOrCall(result, (() => hook(this, subCommand)));
          })), result;
        }
        _parseCommand(operands, unknown) {
          const parsed = this.parseOptions(unknown);
          if (this._parseOptionsEnv(), this._parseOptionsImplied(), operands = operands.concat(parsed.operands), 
          unknown = parsed.unknown, this.args = operands.concat(unknown), operands && this._findCommand(operands[0])) return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
          if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) return 1 === operands.length && this.help(), 
          this._dispatchSubcommand(operands[1], [], [ this._helpLongFlag ]);
          if (this._defaultCommandName) return outputHelpIfRequested(this, unknown), this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
          !this.commands.length || 0 !== this.args.length || this._actionHandler || this._defaultCommandName || this.help({
            error: !0
          }), outputHelpIfRequested(this, parsed.unknown), this._checkForMissingMandatoryOptions(), 
          this._checkForConflictingOptions();
          const checkForUnknownOptions = () => {
            parsed.unknown.length > 0 && this.unknownOption(parsed.unknown[0]);
          }, commandEvent = `command:${this.name()}`;
          if (this._actionHandler) {
            let actionResult;
            return checkForUnknownOptions(), this._processArguments(), actionResult = this._chainOrCallHooks(actionResult, "preAction"), 
            actionResult = this._chainOrCall(actionResult, (() => this._actionHandler(this.processedArgs))), 
            this.parent && (actionResult = this._chainOrCall(actionResult, (() => {
              this.parent.emit(commandEvent, operands, unknown);
            }))), actionResult = this._chainOrCallHooks(actionResult, "postAction"), actionResult;
          }
          if (this.parent && this.parent.listenerCount(commandEvent)) checkForUnknownOptions(), 
          this._processArguments(), this.parent.emit(commandEvent, operands, unknown); else if (operands.length) {
            if (this._findCommand("*")) return this._dispatchSubcommand("*", operands, unknown);
            this.listenerCount("command:*") ? this.emit("command:*", operands, unknown) : this.commands.length ? this.unknownCommand() : (checkForUnknownOptions(), 
            this._processArguments());
          } else this.commands.length ? (checkForUnknownOptions(), this.help({
            error: !0
          })) : (checkForUnknownOptions(), this._processArguments());
        }
        _findCommand(name) {
          if (name) return this.commands.find((cmd => cmd._name === name || cmd._aliases.includes(name)));
        }
        _findOption(arg) {
          return this.options.find((option => option.is(arg)));
        }
        _checkForMissingMandatoryOptions() {
          for (let cmd = this; cmd; cmd = cmd.parent) cmd.options.forEach((anOption => {
            anOption.mandatory && void 0 === cmd.getOptionValue(anOption.attributeName()) && cmd.missingMandatoryOptionValue(anOption);
          }));
        }
        _checkForConflictingLocalOptions() {
          const definedNonDefaultOptions = this.options.filter((option => {
            const optionKey = option.attributeName();
            return void 0 !== this.getOptionValue(optionKey) && "default" !== this.getOptionValueSource(optionKey);
          }));
          definedNonDefaultOptions.filter((option => option.conflictsWith.length > 0)).forEach((option => {
            const conflictingAndDefined = definedNonDefaultOptions.find((defined => option.conflictsWith.includes(defined.attributeName())));
            conflictingAndDefined && this._conflictingOption(option, conflictingAndDefined);
          }));
        }
        _checkForConflictingOptions() {
          for (let cmd = this; cmd; cmd = cmd.parent) cmd._checkForConflictingLocalOptions();
        }
        parseOptions(argv) {
          const operands = [], unknown = [];
          let dest = operands;
          const args = argv.slice();
          function maybeOption(arg) {
            return arg.length > 1 && "-" === arg[0];
          }
          let activeVariadicOption = null;
          for (;args.length; ) {
            const arg = args.shift();
            if ("--" === arg) {
              dest === unknown && dest.push(arg), dest.push(...args);
              break;
            }
            if (!activeVariadicOption || maybeOption(arg)) {
              if (activeVariadicOption = null, maybeOption(arg)) {
                const option = this._findOption(arg);
                if (option) {
                  if (option.required) {
                    const value = args.shift();
                    void 0 === value && this.optionMissingArgument(option), this.emit(`option:${option.name()}`, value);
                  } else if (option.optional) {
                    let value = null;
                    args.length > 0 && !maybeOption(args[0]) && (value = args.shift()), this.emit(`option:${option.name()}`, value);
                  } else this.emit(`option:${option.name()}`);
                  activeVariadicOption = option.variadic ? option : null;
                  continue;
                }
              }
              if (arg.length > 2 && "-" === arg[0] && "-" !== arg[1]) {
                const option = this._findOption(`-${arg[1]}`);
                if (option) {
                  option.required || option.optional && this._combineFlagAndOptionalValue ? this.emit(`option:${option.name()}`, arg.slice(2)) : (this.emit(`option:${option.name()}`), 
                  args.unshift(`-${arg.slice(2)}`));
                  continue;
                }
              }
              if (/^--[^=]+=/.test(arg)) {
                const index = arg.indexOf("="), option = this._findOption(arg.slice(0, index));
                if (option && (option.required || option.optional)) {
                  this.emit(`option:${option.name()}`, arg.slice(index + 1));
                  continue;
                }
              }
              if (maybeOption(arg) && (dest = unknown), (this._enablePositionalOptions || this._passThroughOptions) && 0 === operands.length && 0 === unknown.length) {
                if (this._findCommand(arg)) {
                  operands.push(arg), args.length > 0 && unknown.push(...args);
                  break;
                }
                if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
                  operands.push(arg), args.length > 0 && operands.push(...args);
                  break;
                }
                if (this._defaultCommandName) {
                  unknown.push(arg), args.length > 0 && unknown.push(...args);
                  break;
                }
              }
              if (this._passThroughOptions) {
                dest.push(arg), args.length > 0 && dest.push(...args);
                break;
              }
              dest.push(arg);
            } else this.emit(`option:${activeVariadicOption.name()}`, arg);
          }
          return {
            operands,
            unknown
          };
        }
        opts() {
          if (this._storeOptionsAsProperties) {
            const result = {}, len = this.options.length;
            for (let i = 0; i < len; i++) {
              const key = this.options[i].attributeName();
              result[key] = key === this._versionOptionName ? this._version : this[key];
            }
            return result;
          }
          return this._optionValues;
        }
        optsWithGlobals() {
          return getCommandAndParents(this).reduce(((combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts())), {});
        }
        error(message, errorOptions) {
          this._outputConfiguration.outputError(`${message}\n`, this._outputConfiguration.writeErr), 
          "string" == typeof this._showHelpAfterError ? this._outputConfiguration.writeErr(`${this._showHelpAfterError}\n`) : this._showHelpAfterError && (this._outputConfiguration.writeErr("\n"), 
          this.outputHelp({
            error: !0
          }));
          const config = errorOptions || {}, exitCode = config.exitCode || 1, code = config.code || "commander.error";
          this._exit(exitCode, code, message);
        }
        _parseOptionsEnv() {
          this.options.forEach((option => {
            if (option.envVar && option.envVar in process.env) {
              const optionKey = option.attributeName();
              (void 0 === this.getOptionValue(optionKey) || [ "default", "config", "env" ].includes(this.getOptionValueSource(optionKey))) && (option.required || option.optional ? this.emit(`optionEnv:${option.name()}`, process.env[option.envVar]) : this.emit(`optionEnv:${option.name()}`));
            }
          }));
        }
        _parseOptionsImplied() {
          const dualHelper = new DualOptions(this.options), hasCustomOptionValue = optionKey => void 0 !== this.getOptionValue(optionKey) && ![ "default", "implied" ].includes(this.getOptionValueSource(optionKey));
          this.options.filter((option => void 0 !== option.implied && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option))).forEach((option => {
            Object.keys(option.implied).filter((impliedKey => !hasCustomOptionValue(impliedKey))).forEach((impliedKey => {
              this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], "implied");
            }));
          }));
        }
        missingArgument(name) {
          const message = `error: missing required argument '${name}'`;
          this.error(message, {
            code: "commander.missingArgument"
          });
        }
        optionMissingArgument(option) {
          const message = `error: option '${option.flags}' argument missing`;
          this.error(message, {
            code: "commander.optionMissingArgument"
          });
        }
        missingMandatoryOptionValue(option) {
          const message = `error: required option '${option.flags}' not specified`;
          this.error(message, {
            code: "commander.missingMandatoryOptionValue"
          });
        }
        _conflictingOption(option, conflictingOption) {
          const findBestOptionFromValue = option => {
            const optionKey = option.attributeName(), optionValue = this.getOptionValue(optionKey), negativeOption = this.options.find((target => target.negate && optionKey === target.attributeName())), positiveOption = this.options.find((target => !target.negate && optionKey === target.attributeName()));
            return negativeOption && (void 0 === negativeOption.presetArg && !1 === optionValue || void 0 !== negativeOption.presetArg && optionValue === negativeOption.presetArg) ? negativeOption : positiveOption || option;
          }, getErrorMessage = option => {
            const bestOption = findBestOptionFromValue(option), optionKey = bestOption.attributeName();
            return "env" === this.getOptionValueSource(optionKey) ? `environment variable '${bestOption.envVar}'` : `option '${bestOption.flags}'`;
          }, message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
          this.error(message, {
            code: "commander.conflictingOption"
          });
        }
        unknownOption(flag) {
          if (this._allowUnknownOption) return;
          let suggestion = "";
          if (flag.startsWith("--") && this._showSuggestionAfterError) {
            let candidateFlags = [], command = this;
            do {
              const moreFlags = command.createHelp().visibleOptions(command).filter((option => option.long)).map((option => option.long));
              candidateFlags = candidateFlags.concat(moreFlags), command = command.parent;
            } while (command && !command._enablePositionalOptions);
            suggestion = suggestSimilar(flag, candidateFlags);
          }
          const message = `error: unknown option '${flag}'${suggestion}`;
          this.error(message, {
            code: "commander.unknownOption"
          });
        }
        _excessArguments(receivedArgs) {
          if (this._allowExcessArguments) return;
          const expected = this._args.length, s = 1 === expected ? "" : "s", message = `error: too many arguments${this.parent ? ` for '${this.name()}'` : ""}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
          this.error(message, {
            code: "commander.excessArguments"
          });
        }
        unknownCommand() {
          const unknownName = this.args[0];
          let suggestion = "";
          if (this._showSuggestionAfterError) {
            const candidateNames = [];
            this.createHelp().visibleCommands(this).forEach((command => {
              candidateNames.push(command.name()), command.alias() && candidateNames.push(command.alias());
            })), suggestion = suggestSimilar(unknownName, candidateNames);
          }
          const message = `error: unknown command '${unknownName}'${suggestion}`;
          this.error(message, {
            code: "commander.unknownCommand"
          });
        }
        version(str, flags, description) {
          if (void 0 === str) return this._version;
          this._version = str, flags = flags || "-V, --version", description = description || "output the version number";
          const versionOption = this.createOption(flags, description);
          return this._versionOptionName = versionOption.attributeName(), this.options.push(versionOption), 
          this.on("option:" + versionOption.name(), (() => {
            this._outputConfiguration.writeOut(`${str}\n`), this._exit(0, "commander.version", str);
          })), this;
        }
        description(str, argsDescription) {
          return void 0 === str && void 0 === argsDescription ? this._description : (this._description = str, 
          argsDescription && (this._argsDescription = argsDescription), this);
        }
        summary(str) {
          return void 0 === str ? this._summary : (this._summary = str, this);
        }
        alias(alias) {
          if (void 0 === alias) return this._aliases[0];
          let command = this;
          if (0 !== this.commands.length && this.commands[this.commands.length - 1]._executableHandler && (command = this.commands[this.commands.length - 1]), 
          alias === command._name) throw new Error("Command alias can't be the same as its name");
          return command._aliases.push(alias), this;
        }
        aliases(aliases) {
          return void 0 === aliases ? this._aliases : (aliases.forEach((alias => this.alias(alias))), 
          this);
        }
        usage(str) {
          if (void 0 === str) {
            if (this._usage) return this._usage;
            const args = this._args.map((arg => humanReadableArgName(arg)));
            return [].concat(this.options.length || this._hasHelpOption ? "[options]" : [], this.commands.length ? "[command]" : [], this._args.length ? args : []).join(" ");
          }
          return this._usage = str, this;
        }
        name(str) {
          return void 0 === str ? this._name : (this._name = str, this);
        }
        nameFromFilename(filename) {
          return this._name = path.basename(filename, path.extname(filename)), this;
        }
        executableDir(path) {
          return void 0 === path ? this._executableDir : (this._executableDir = path, this);
        }
        helpInformation(contextOptions) {
          const helper = this.createHelp();
          return void 0 === helper.helpWidth && (helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth()), 
          helper.formatHelp(this, helper);
        }
        _getHelpContext(contextOptions) {
          const context = {
            error: !!(contextOptions = contextOptions || {}).error
          };
          let write;
          return write = context.error ? arg => this._outputConfiguration.writeErr(arg) : arg => this._outputConfiguration.writeOut(arg), 
          context.write = contextOptions.write || write, context.command = this, context;
        }
        outputHelp(contextOptions) {
          let deprecatedCallback;
          "function" == typeof contextOptions && (deprecatedCallback = contextOptions, contextOptions = void 0);
          const context = this._getHelpContext(contextOptions);
          getCommandAndParents(this).reverse().forEach((command => command.emit("beforeAllHelp", context))), 
          this.emit("beforeHelp", context);
          let helpInformation = this.helpInformation(context);
          if (deprecatedCallback && (helpInformation = deprecatedCallback(helpInformation), 
          "string" != typeof helpInformation && !Buffer.isBuffer(helpInformation))) throw new Error("outputHelp callback must return a string or a Buffer");
          context.write(helpInformation), this.emit(this._helpLongFlag), this.emit("afterHelp", context), 
          getCommandAndParents(this).forEach((command => command.emit("afterAllHelp", context)));
        }
        helpOption(flags, description) {
          if ("boolean" == typeof flags) return this._hasHelpOption = flags, this;
          this._helpFlags = flags || this._helpFlags, this._helpDescription = description || this._helpDescription;
          const helpFlags = splitOptionFlags(this._helpFlags);
          return this._helpShortFlag = helpFlags.shortFlag, this._helpLongFlag = helpFlags.longFlag, 
          this;
        }
        help(contextOptions) {
          this.outputHelp(contextOptions);
          let exitCode = process.exitCode || 0;
          0 === exitCode && contextOptions && "function" != typeof contextOptions && contextOptions.error && (exitCode = 1), 
          this._exit(exitCode, "commander.help", "(outputHelp)");
        }
        addHelpText(position, text) {
          const allowedValues = [ "beforeAll", "before", "after", "afterAll" ];
          if (!allowedValues.includes(position)) throw new Error(`Unexpected value for position to addHelpText.\nExpecting one of '${allowedValues.join("', '")}'`);
          const helpEvent = `${position}Help`;
          return this.on(helpEvent, (context => {
            let helpStr;
            helpStr = "function" == typeof text ? text({
              error: context.error,
              command: context.command
            }) : text, helpStr && context.write(`${helpStr}\n`);
          })), this;
        }
      }
      function outputHelpIfRequested(cmd, args) {
        cmd._hasHelpOption && args.find((arg => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag)) && (cmd.outputHelp(), 
        cmd._exit(0, "commander.helpDisplayed", "(outputHelp)"));
      }
      function incrementNodeInspectorPort(args) {
        return args.map((arg => {
          if (!arg.startsWith("--inspect")) return arg;
          let debugOption, match, debugHost = "127.0.0.1", debugPort = "9229";
          return null !== (match = arg.match(/^(--inspect(-brk)?)$/)) ? debugOption = match[1] : null !== (match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) ? (debugOption = match[1], 
          /^\d+$/.test(match[3]) ? debugPort = match[3] : debugHost = match[3]) : null !== (match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) && (debugOption = match[1], 
          debugHost = match[3], debugPort = match[4]), debugOption && "0" !== debugPort ? `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}` : arg;
        }));
      }
      function getCommandAndParents(startCommand) {
        const result = [];
        for (let command = startCommand; command; command = command.parent) result.push(command);
        return result;
      }
      exports.Command = Command;
    },
    4811: (__unused_webpack_module, exports) => {
      class CommanderError extends Error {
        constructor(exitCode, code, message) {
          super(message), Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, 
          this.code = code, this.exitCode = exitCode, this.nestedError = void 0;
        }
      }
      exports.CommanderError = CommanderError, exports.InvalidArgumentError = class extends CommanderError {
        constructor(message) {
          super(1, "commander.invalidArgument", message), Error.captureStackTrace(this, this.constructor), 
          this.name = this.constructor.name;
        }
      };
    },
    4488: (__unused_webpack_module, exports, __webpack_require__) => {
      const {humanReadableArgName} = __webpack_require__(5952);
      exports.Help = class {
        constructor() {
          this.helpWidth = void 0, this.sortSubcommands = !1, this.sortOptions = !1;
        }
        visibleCommands(cmd) {
          const visibleCommands = cmd.commands.filter((cmd => !cmd._hidden));
          if (cmd._hasImplicitHelpCommand()) {
            const [, helpName, helpArgs] = cmd._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/), helpCommand = cmd.createCommand(helpName).helpOption(!1);
            helpCommand.description(cmd._helpCommandDescription), helpArgs && helpCommand.arguments(helpArgs), 
            visibleCommands.push(helpCommand);
          }
          return this.sortSubcommands && visibleCommands.sort(((a, b) => a.name().localeCompare(b.name()))), 
          visibleCommands;
        }
        visibleOptions(cmd) {
          const visibleOptions = cmd.options.filter((option => !option.hidden)), showShortHelpFlag = cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag), showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag);
          if (showShortHelpFlag || showLongHelpFlag) {
            let helpOption;
            helpOption = showShortHelpFlag ? showLongHelpFlag ? cmd.createOption(cmd._helpFlags, cmd._helpDescription) : cmd.createOption(cmd._helpShortFlag, cmd._helpDescription) : cmd.createOption(cmd._helpLongFlag, cmd._helpDescription), 
            visibleOptions.push(helpOption);
          }
          if (this.sortOptions) {
            const getSortKey = option => option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
            visibleOptions.sort(((a, b) => getSortKey(a).localeCompare(getSortKey(b))));
          }
          return visibleOptions;
        }
        visibleArguments(cmd) {
          return cmd._argsDescription && cmd._args.forEach((argument => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          })), cmd._args.find((argument => argument.description)) ? cmd._args : [];
        }
        subcommandTerm(cmd) {
          const args = cmd._args.map((arg => humanReadableArgName(arg))).join(" ");
          return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + (args ? " " + args : "");
        }
        optionTerm(option) {
          return option.flags;
        }
        argumentTerm(argument) {
          return argument.name();
        }
        longestSubcommandTermLength(cmd, helper) {
          return helper.visibleCommands(cmd).reduce(((max, command) => Math.max(max, helper.subcommandTerm(command).length)), 0);
        }
        longestOptionTermLength(cmd, helper) {
          return helper.visibleOptions(cmd).reduce(((max, option) => Math.max(max, helper.optionTerm(option).length)), 0);
        }
        longestArgumentTermLength(cmd, helper) {
          return helper.visibleArguments(cmd).reduce(((max, argument) => Math.max(max, helper.argumentTerm(argument).length)), 0);
        }
        commandUsage(cmd) {
          let cmdName = cmd._name;
          cmd._aliases[0] && (cmdName = cmdName + "|" + cmd._aliases[0]);
          let parentCmdNames = "";
          for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) parentCmdNames = parentCmd.name() + " " + parentCmdNames;
          return parentCmdNames + cmdName + " " + cmd.usage();
        }
        commandDescription(cmd) {
          return cmd.description();
        }
        subcommandDescription(cmd) {
          return cmd.summary() || cmd.description();
        }
        optionDescription(option) {
          const extraInfo = [];
          if (option.argChoices && extraInfo.push(`choices: ${option.argChoices.map((choice => JSON.stringify(choice))).join(", ")}`), 
          void 0 !== option.defaultValue) {
            (option.required || option.optional || option.isBoolean() && "boolean" == typeof option.defaultValue) && extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
          }
          return void 0 !== option.presetArg && option.optional && extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`), 
          void 0 !== option.envVar && extraInfo.push(`env: ${option.envVar}`), extraInfo.length > 0 ? `${option.description} (${extraInfo.join(", ")})` : option.description;
        }
        argumentDescription(argument) {
          const extraInfo = [];
          if (argument.argChoices && extraInfo.push(`choices: ${argument.argChoices.map((choice => JSON.stringify(choice))).join(", ")}`), 
          void 0 !== argument.defaultValue && extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`), 
          extraInfo.length > 0) {
            const extraDescripton = `(${extraInfo.join(", ")})`;
            return argument.description ? `${argument.description} ${extraDescripton}` : extraDescripton;
          }
          return argument.description;
        }
        formatHelp(cmd, helper) {
          const termWidth = helper.padWidth(cmd, helper), helpWidth = helper.helpWidth || 80;
          function formatItem(term, description) {
            if (description) {
              const fullText = `${term.padEnd(termWidth + 2)}${description}`;
              return helper.wrap(fullText, helpWidth - 2, termWidth + 2);
            }
            return term;
          }
          function formatList(textArray) {
            return textArray.join("\n").replace(/^/gm, " ".repeat(2));
          }
          let output = [ `Usage: ${helper.commandUsage(cmd)}`, "" ];
          const commandDescription = helper.commandDescription(cmd);
          commandDescription.length > 0 && (output = output.concat([ commandDescription, "" ]));
          const argumentList = helper.visibleArguments(cmd).map((argument => formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument))));
          argumentList.length > 0 && (output = output.concat([ "Arguments:", formatList(argumentList), "" ]));
          const optionList = helper.visibleOptions(cmd).map((option => formatItem(helper.optionTerm(option), helper.optionDescription(option))));
          optionList.length > 0 && (output = output.concat([ "Options:", formatList(optionList), "" ]));
          const commandList = helper.visibleCommands(cmd).map((cmd => formatItem(helper.subcommandTerm(cmd), helper.subcommandDescription(cmd))));
          return commandList.length > 0 && (output = output.concat([ "Commands:", formatList(commandList), "" ])), 
          output.join("\n");
        }
        padWidth(cmd, helper) {
          return Math.max(helper.longestOptionTermLength(cmd, helper), helper.longestSubcommandTermLength(cmd, helper), helper.longestArgumentTermLength(cmd, helper));
        }
        wrap(str, width, indent, minColumnWidth = 40) {
          if (str.match(/[\n]\s+/)) return str;
          const columnWidth = width - indent;
          if (columnWidth < minColumnWidth) return str;
          const leadingStr = str.slice(0, indent), columnText = str.slice(indent), indentString = " ".repeat(indent), regex = new RegExp(".{1," + (columnWidth - 1) + "}([\\s​]|$)|[^\\s​]+?([\\s​]|$)", "g");
          return leadingStr + (columnText.match(regex) || []).map(((line, i) => ("\n" === line.slice(-1) && (line = line.slice(0, line.length - 1)), 
          (i > 0 ? indentString : "") + line.trimRight()))).join("\n");
        }
      };
    },
    3112: (__unused_webpack_module, exports, __webpack_require__) => {
      const {InvalidArgumentError} = __webpack_require__(4811);
      function splitOptionFlags(flags) {
        let shortFlag, longFlag;
        const flagParts = flags.split(/[ |,]+/);
        return flagParts.length > 1 && !/^[[<]/.test(flagParts[1]) && (shortFlag = flagParts.shift()), 
        longFlag = flagParts.shift(), !shortFlag && /^-[^-]$/.test(longFlag) && (shortFlag = longFlag, 
        longFlag = void 0), {
          shortFlag,
          longFlag
        };
      }
      exports.Option = class {
        constructor(flags, description) {
          this.flags = flags, this.description = description || "", this.required = flags.includes("<"), 
          this.optional = flags.includes("["), this.variadic = /\w\.\.\.[>\]]$/.test(flags), 
          this.mandatory = !1;
          const optionFlags = splitOptionFlags(flags);
          this.short = optionFlags.shortFlag, this.long = optionFlags.longFlag, this.negate = !1, 
          this.long && (this.negate = this.long.startsWith("--no-")), this.defaultValue = void 0, 
          this.defaultValueDescription = void 0, this.presetArg = void 0, this.envVar = void 0, 
          this.parseArg = void 0, this.hidden = !1, this.argChoices = void 0, this.conflictsWith = [], 
          this.implied = void 0;
        }
        default(value, description) {
          return this.defaultValue = value, this.defaultValueDescription = description, this;
        }
        preset(arg) {
          return this.presetArg = arg, this;
        }
        conflicts(names) {
          return this.conflictsWith = this.conflictsWith.concat(names), this;
        }
        implies(impliedOptionValues) {
          return this.implied = Object.assign(this.implied || {}, impliedOptionValues), this;
        }
        env(name) {
          return this.envVar = name, this;
        }
        argParser(fn) {
          return this.parseArg = fn, this;
        }
        makeOptionMandatory(mandatory = !0) {
          return this.mandatory = !!mandatory, this;
        }
        hideHelp(hide = !0) {
          return this.hidden = !!hide, this;
        }
        _concatValue(value, previous) {
          return previous !== this.defaultValue && Array.isArray(previous) ? previous.concat(value) : [ value ];
        }
        choices(values) {
          return this.argChoices = values.slice(), this.parseArg = (arg, previous) => {
            if (!this.argChoices.includes(arg)) throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(", ")}.`);
            return this.variadic ? this._concatValue(arg, previous) : arg;
          }, this;
        }
        name() {
          return this.long ? this.long.replace(/^--/, "") : this.short.replace(/^-/, "");
        }
        attributeName() {
          return this.name().replace(/^no-/, "").split("-").reduce(((str, word) => str + word[0].toUpperCase() + word.slice(1)));
        }
        is(arg) {
          return this.short === arg || this.long === arg;
        }
        isBoolean() {
          return !this.required && !this.optional && !this.negate;
        }
      }, exports.splitOptionFlags = splitOptionFlags, exports.DualOptions = class {
        constructor(options) {
          this.positiveOptions = new Map, this.negativeOptions = new Map, this.dualOptions = new Set, 
          options.forEach((option => {
            option.negate ? this.negativeOptions.set(option.attributeName(), option) : this.positiveOptions.set(option.attributeName(), option);
          })), this.negativeOptions.forEach(((value, key) => {
            this.positiveOptions.has(key) && this.dualOptions.add(key);
          }));
        }
        valueFromOption(value, option) {
          const optionKey = option.attributeName();
          if (!this.dualOptions.has(optionKey)) return !0;
          const preset = this.negativeOptions.get(optionKey).presetArg, negativeValue = void 0 !== preset && preset;
          return option.negate === (negativeValue === value);
        }
      };
    },
    2007: (__unused_webpack_module, exports) => {
      exports.suggestSimilar = function(word, candidates) {
        if (!candidates || 0 === candidates.length) return "";
        candidates = Array.from(new Set(candidates));
        const searchingOptions = word.startsWith("--");
        searchingOptions && (word = word.slice(2), candidates = candidates.map((candidate => candidate.slice(2))));
        let similar = [], bestDistance = 3;
        return candidates.forEach((candidate => {
          if (candidate.length <= 1) return;
          const distance = function(a, b) {
            if (Math.abs(a.length - b.length) > 3) return Math.max(a.length, b.length);
            const d = [];
            for (let i = 0; i <= a.length; i++) d[i] = [ i ];
            for (let j = 0; j <= b.length; j++) d[0][j] = j;
            for (let j = 1; j <= b.length; j++) for (let i = 1; i <= a.length; i++) {
              let cost = 1;
              cost = a[i - 1] === b[j - 1] ? 0 : 1, d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost), 
              i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1] && (d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1));
            }
            return d[a.length][b.length];
          }(word, candidate), length = Math.max(word.length, candidate.length);
          (length - distance) / length > .4 && (distance < bestDistance ? (bestDistance = distance, 
          similar = [ candidate ]) : distance === bestDistance && similar.push(candidate));
        })), similar.sort(((a, b) => a.localeCompare(b))), searchingOptions && (similar = similar.map((candidate => `--${candidate}`))), 
        similar.length > 1 ? `\n(Did you mean one of ${similar.join(", ")}?)` : 1 === similar.length ? `\n(Did you mean ${similar[0]}?)` : "";
      };
    },
    6374: module => {
      module.exports = JSON.parse('{"dots":{"interval":80,"frames":["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"]},"dots2":{"interval":80,"frames":["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"]},"dots3":{"interval":80,"frames":["⠋","⠙","⠚","⠞","⠖","⠦","⠴","⠲","⠳","⠓"]},"dots4":{"interval":80,"frames":["⠄","⠆","⠇","⠋","⠙","⠸","⠰","⠠","⠰","⠸","⠙","⠋","⠇","⠆"]},"dots5":{"interval":80,"frames":["⠋","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋"]},"dots6":{"interval":80,"frames":["⠁","⠉","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠤","⠄","⠄","⠤","⠴","⠲","⠒","⠂","⠂","⠒","⠚","⠙","⠉","⠁"]},"dots7":{"interval":80,"frames":["⠈","⠉","⠋","⠓","⠒","⠐","⠐","⠒","⠖","⠦","⠤","⠠","⠠","⠤","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋","⠉","⠈"]},"dots8":{"interval":80,"frames":["⠁","⠁","⠉","⠙","⠚","⠒","⠂","⠂","⠒","⠲","⠴","⠤","⠄","⠄","⠤","⠠","⠠","⠤","⠦","⠖","⠒","⠐","⠐","⠒","⠓","⠋","⠉","⠈","⠈"]},"dots9":{"interval":80,"frames":["⢹","⢺","⢼","⣸","⣇","⡧","⡗","⡏"]},"dots10":{"interval":80,"frames":["⢄","⢂","⢁","⡁","⡈","⡐","⡠"]},"dots11":{"interval":100,"frames":["⠁","⠂","⠄","⡀","⢀","⠠","⠐","⠈"]},"dots12":{"interval":80,"frames":["⢀⠀","⡀⠀","⠄⠀","⢂⠀","⡂⠀","⠅⠀","⢃⠀","⡃⠀","⠍⠀","⢋⠀","⡋⠀","⠍⠁","⢋⠁","⡋⠁","⠍⠉","⠋⠉","⠋⠉","⠉⠙","⠉⠙","⠉⠩","⠈⢙","⠈⡙","⢈⠩","⡀⢙","⠄⡙","⢂⠩","⡂⢘","⠅⡘","⢃⠨","⡃⢐","⠍⡐","⢋⠠","⡋⢀","⠍⡁","⢋⠁","⡋⠁","⠍⠉","⠋⠉","⠋⠉","⠉⠙","⠉⠙","⠉⠩","⠈⢙","⠈⡙","⠈⠩","⠀⢙","⠀⡙","⠀⠩","⠀⢘","⠀⡘","⠀⠨","⠀⢐","⠀⡐","⠀⠠","⠀⢀","⠀⡀"]},"dots8Bit":{"interval":80,"frames":["⠀","⠁","⠂","⠃","⠄","⠅","⠆","⠇","⡀","⡁","⡂","⡃","⡄","⡅","⡆","⡇","⠈","⠉","⠊","⠋","⠌","⠍","⠎","⠏","⡈","⡉","⡊","⡋","⡌","⡍","⡎","⡏","⠐","⠑","⠒","⠓","⠔","⠕","⠖","⠗","⡐","⡑","⡒","⡓","⡔","⡕","⡖","⡗","⠘","⠙","⠚","⠛","⠜","⠝","⠞","⠟","⡘","⡙","⡚","⡛","⡜","⡝","⡞","⡟","⠠","⠡","⠢","⠣","⠤","⠥","⠦","⠧","⡠","⡡","⡢","⡣","⡤","⡥","⡦","⡧","⠨","⠩","⠪","⠫","⠬","⠭","⠮","⠯","⡨","⡩","⡪","⡫","⡬","⡭","⡮","⡯","⠰","⠱","⠲","⠳","⠴","⠵","⠶","⠷","⡰","⡱","⡲","⡳","⡴","⡵","⡶","⡷","⠸","⠹","⠺","⠻","⠼","⠽","⠾","⠿","⡸","⡹","⡺","⡻","⡼","⡽","⡾","⡿","⢀","⢁","⢂","⢃","⢄","⢅","⢆","⢇","⣀","⣁","⣂","⣃","⣄","⣅","⣆","⣇","⢈","⢉","⢊","⢋","⢌","⢍","⢎","⢏","⣈","⣉","⣊","⣋","⣌","⣍","⣎","⣏","⢐","⢑","⢒","⢓","⢔","⢕","⢖","⢗","⣐","⣑","⣒","⣓","⣔","⣕","⣖","⣗","⢘","⢙","⢚","⢛","⢜","⢝","⢞","⢟","⣘","⣙","⣚","⣛","⣜","⣝","⣞","⣟","⢠","⢡","⢢","⢣","⢤","⢥","⢦","⢧","⣠","⣡","⣢","⣣","⣤","⣥","⣦","⣧","⢨","⢩","⢪","⢫","⢬","⢭","⢮","⢯","⣨","⣩","⣪","⣫","⣬","⣭","⣮","⣯","⢰","⢱","⢲","⢳","⢴","⢵","⢶","⢷","⣰","⣱","⣲","⣳","⣴","⣵","⣶","⣷","⢸","⢹","⢺","⢻","⢼","⢽","⢾","⢿","⣸","⣹","⣺","⣻","⣼","⣽","⣾","⣿"]},"line":{"interval":130,"frames":["-","\\\\","|","/"]},"line2":{"interval":100,"frames":["⠂","-","–","—","–","-"]},"pipe":{"interval":100,"frames":["┤","┘","┴","└","├","┌","┬","┐"]},"simpleDots":{"interval":400,"frames":[".  ",".. ","...","   "]},"simpleDotsScrolling":{"interval":200,"frames":[".  ",".. ","..."," ..","  .","   "]},"star":{"interval":70,"frames":["✶","✸","✹","✺","✹","✷"]},"star2":{"interval":80,"frames":["+","x","*"]},"flip":{"interval":70,"frames":["_","_","_","-","`","`","\'","´","-","_","_","_"]},"hamburger":{"interval":100,"frames":["☱","☲","☴"]},"growVertical":{"interval":120,"frames":["▁","▃","▄","▅","▆","▇","▆","▅","▄","▃"]},"growHorizontal":{"interval":120,"frames":["▏","▎","▍","▌","▋","▊","▉","▊","▋","▌","▍","▎"]},"balloon":{"interval":140,"frames":[" ",".","o","O","@","*"," "]},"balloon2":{"interval":120,"frames":[".","o","O","°","O","o","."]},"noise":{"interval":100,"frames":["▓","▒","░"]},"bounce":{"interval":120,"frames":["⠁","⠂","⠄","⠂"]},"boxBounce":{"interval":120,"frames":["▖","▘","▝","▗"]},"boxBounce2":{"interval":100,"frames":["▌","▀","▐","▄"]},"triangle":{"interval":50,"frames":["◢","◣","◤","◥"]},"arc":{"interval":100,"frames":["◜","◠","◝","◞","◡","◟"]},"circle":{"interval":120,"frames":["◡","⊙","◠"]},"squareCorners":{"interval":180,"frames":["◰","◳","◲","◱"]},"circleQuarters":{"interval":120,"frames":["◴","◷","◶","◵"]},"circleHalves":{"interval":50,"frames":["◐","◓","◑","◒"]},"squish":{"interval":100,"frames":["╫","╪"]},"toggle":{"interval":250,"frames":["⊶","⊷"]},"toggle2":{"interval":80,"frames":["▫","▪"]},"toggle3":{"interval":120,"frames":["□","■"]},"toggle4":{"interval":100,"frames":["■","□","▪","▫"]},"toggle5":{"interval":100,"frames":["▮","▯"]},"toggle6":{"interval":300,"frames":["ဝ","၀"]},"toggle7":{"interval":80,"frames":["⦾","⦿"]},"toggle8":{"interval":100,"frames":["◍","◌"]},"toggle9":{"interval":100,"frames":["◉","◎"]},"toggle10":{"interval":100,"frames":["㊂","㊀","㊁"]},"toggle11":{"interval":50,"frames":["⧇","⧆"]},"toggle12":{"interval":120,"frames":["☗","☖"]},"toggle13":{"interval":80,"frames":["=","*","-"]},"arrow":{"interval":100,"frames":["←","↖","↑","↗","→","↘","↓","↙"]},"arrow2":{"interval":80,"frames":["⬆️ ","↗️ ","➡️ ","↘️ ","⬇️ ","↙️ ","⬅️ ","↖️ "]},"arrow3":{"interval":120,"frames":["▹▹▹▹▹","▸▹▹▹▹","▹▸▹▹▹","▹▹▸▹▹","▹▹▹▸▹","▹▹▹▹▸"]},"bouncingBar":{"interval":80,"frames":["[    ]","[=   ]","[==  ]","[=== ]","[ ===]","[  ==]","[   =]","[    ]","[   =]","[  ==]","[ ===]","[====]","[=== ]","[==  ]","[=   ]"]},"bouncingBall":{"interval":80,"frames":["( ●    )","(  ●   )","(   ●  )","(    ● )","(     ●)","(    ● )","(   ●  )","(  ●   )","( ●    )","(●     )"]},"smiley":{"interval":200,"frames":["😄 ","😝 "]},"monkey":{"interval":300,"frames":["🙈 ","🙈 ","🙉 ","🙊 "]},"hearts":{"interval":100,"frames":["💛 ","💙 ","💜 ","💚 ","❤️ "]},"clock":{"interval":100,"frames":["🕛 ","🕐 ","🕑 ","🕒 ","🕓 ","🕔 ","🕕 ","🕖 ","🕗 ","🕘 ","🕙 ","🕚 "]},"earth":{"interval":180,"frames":["🌍 ","🌎 ","🌏 "]},"material":{"interval":17,"frames":["█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","███▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁","██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁","███████▁▁▁▁▁▁▁▁▁▁▁▁▁","████████▁▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","██████████▁▁▁▁▁▁▁▁▁▁","███████████▁▁▁▁▁▁▁▁▁","█████████████▁▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁▁██████████████▁▁▁▁","▁▁▁██████████████▁▁▁","▁▁▁▁█████████████▁▁▁","▁▁▁▁██████████████▁▁","▁▁▁▁██████████████▁▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁██████████████▁","▁▁▁▁▁▁██████████████","▁▁▁▁▁▁██████████████","▁▁▁▁▁▁▁█████████████","▁▁▁▁▁▁▁█████████████","▁▁▁▁▁▁▁▁████████████","▁▁▁▁▁▁▁▁████████████","▁▁▁▁▁▁▁▁▁███████████","▁▁▁▁▁▁▁▁▁███████████","▁▁▁▁▁▁▁▁▁▁██████████","▁▁▁▁▁▁▁▁▁▁██████████","▁▁▁▁▁▁▁▁▁▁▁▁████████","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁██████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","███▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","████▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","██████▁▁▁▁▁▁▁▁▁▁▁▁▁█","████████▁▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","█████████▁▁▁▁▁▁▁▁▁▁▁","███████████▁▁▁▁▁▁▁▁▁","████████████▁▁▁▁▁▁▁▁","████████████▁▁▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","██████████████▁▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁██████████████▁▁▁▁▁","▁▁▁█████████████▁▁▁▁","▁▁▁▁▁████████████▁▁▁","▁▁▁▁▁████████████▁▁▁","▁▁▁▁▁▁███████████▁▁▁","▁▁▁▁▁▁▁▁█████████▁▁▁","▁▁▁▁▁▁▁▁█████████▁▁▁","▁▁▁▁▁▁▁▁▁█████████▁▁","▁▁▁▁▁▁▁▁▁█████████▁▁","▁▁▁▁▁▁▁▁▁▁█████████▁","▁▁▁▁▁▁▁▁▁▁▁████████▁","▁▁▁▁▁▁▁▁▁▁▁████████▁","▁▁▁▁▁▁▁▁▁▁▁▁███████▁","▁▁▁▁▁▁▁▁▁▁▁▁███████▁","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁███████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁","▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁"]},"moon":{"interval":80,"frames":["🌑 ","🌒 ","🌓 ","🌔 ","🌕 ","🌖 ","🌗 ","🌘 "]},"runner":{"interval":140,"frames":["🚶 ","🏃 "]},"pong":{"interval":80,"frames":["▐⠂       ▌","▐⠈       ▌","▐ ⠂      ▌","▐ ⠠      ▌","▐  ⡀     ▌","▐  ⠠     ▌","▐   ⠂    ▌","▐   ⠈    ▌","▐    ⠂   ▌","▐    ⠠   ▌","▐     ⡀  ▌","▐     ⠠  ▌","▐      ⠂ ▌","▐      ⠈ ▌","▐       ⠂▌","▐       ⠠▌","▐       ⡀▌","▐      ⠠ ▌","▐      ⠂ ▌","▐     ⠈  ▌","▐     ⠂  ▌","▐    ⠠   ▌","▐    ⡀   ▌","▐   ⠠    ▌","▐   ⠂    ▌","▐  ⠈     ▌","▐  ⠂     ▌","▐ ⠠      ▌","▐ ⡀      ▌","▐⠠       ▌"]},"shark":{"interval":120,"frames":["▐|\\\\____________▌","▐_|\\\\___________▌","▐__|\\\\__________▌","▐___|\\\\_________▌","▐____|\\\\________▌","▐_____|\\\\_______▌","▐______|\\\\______▌","▐_______|\\\\_____▌","▐________|\\\\____▌","▐_________|\\\\___▌","▐__________|\\\\__▌","▐___________|\\\\_▌","▐____________|\\\\▌","▐____________/|▌","▐___________/|_▌","▐__________/|__▌","▐_________/|___▌","▐________/|____▌","▐_______/|_____▌","▐______/|______▌","▐_____/|_______▌","▐____/|________▌","▐___/|_________▌","▐__/|__________▌","▐_/|___________▌","▐/|____________▌"]},"dqpb":{"interval":100,"frames":["d","q","p","b"]},"weather":{"interval":100,"frames":["☀️ ","☀️ ","☀️ ","🌤 ","⛅️ ","🌥 ","☁️ ","🌧 ","🌨 ","🌧 ","🌨 ","🌧 ","🌨 ","⛈ ","🌨 ","🌧 ","🌨 ","☁️ ","🌥 ","⛅️ ","🌤 ","☀️ ","☀️ "]},"christmas":{"interval":400,"frames":["🌲","🎄"]},"grenade":{"interval":80,"frames":["،  ","′  "," ´ "," ‾ ","  ⸌","  ⸊","  |","  ⁎","  ⁕"," ෴ ","  ⁓","   ","   ","   "]},"point":{"interval":125,"frames":["∙∙∙","●∙∙","∙●∙","∙∙●","∙∙∙"]},"layer":{"interval":150,"frames":["-","=","≡"]},"betaWave":{"interval":80,"frames":["ρββββββ","βρβββββ","ββρββββ","βββρβββ","ββββρββ","βββββρβ","ββββββρ"]},"fingerDance":{"interval":160,"frames":["🤘 ","🤟 ","🖖 ","✋ ","🤚 ","👆 "]},"fistBump":{"interval":80,"frames":["🤜　　　　🤛 ","🤜　　　　🤛 ","🤜　　　　🤛 ","　🤜　　🤛　 ","　　🤜🤛　　 ","　🤜✨🤛　　 ","🤜　✨　🤛　 "]},"soccerHeader":{"interval":80,"frames":[" 🧑⚽️       🧑 ","🧑  ⚽️      🧑 ","🧑   ⚽️     🧑 ","🧑    ⚽️    🧑 ","🧑     ⚽️   🧑 ","🧑      ⚽️  🧑 ","🧑       ⚽️🧑  ","🧑      ⚽️  🧑 ","🧑     ⚽️   🧑 ","🧑    ⚽️    🧑 ","🧑   ⚽️     🧑 ","🧑  ⚽️      🧑 "]},"mindblown":{"interval":160,"frames":["😐 ","😐 ","😮 ","😮 ","😦 ","😦 ","😧 ","😧 ","🤯 ","💥 ","✨ ","　 ","　 ","　 "]},"speaker":{"interval":160,"frames":["🔈 ","🔉 ","🔊 ","🔉 "]},"orangePulse":{"interval":100,"frames":["🔸 ","🔶 ","🟠 ","🟠 ","🔶 "]},"bluePulse":{"interval":100,"frames":["🔹 ","🔷 ","🔵 ","🔵 ","🔷 "]},"orangeBluePulse":{"interval":100,"frames":["🔸 ","🔶 ","🟠 ","🟠 ","🔶 ","🔹 ","🔷 ","🔵 ","🔵 ","🔷 "]},"timeTravel":{"interval":100,"frames":["🕛 ","🕚 ","🕙 ","🕘 ","🕗 ","🕖 ","🕕 ","🕔 ","🕓 ","🕒 ","🕑 ","🕐 "]},"aesthetic":{"interval":80,"frames":["▰▱▱▱▱▱▱","▰▰▱▱▱▱▱","▰▰▰▱▱▱▱","▰▰▰▰▱▱▱","▰▰▰▰▰▱▱","▰▰▰▰▰▰▱","▰▰▰▰▰▰▰","▰▱▱▱▱▱▱"]}}');
    },
    4147: module => {
      module.exports = JSON.parse('{"h$":{"d":">=10.4"}}');
    },
    5478: module => {
      module.exports = {
        i8: "11.1.3"
      };
    }
  }, __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.exports;
  }
  (() => {
    const realFs = __webpack_require__(7147), gracefulFs = __webpack_require__(2531);
    gracefulFs.gracefulify(realFs);
    const chalk = __webpack_require__(4061);
    let verbose = !1, disabled = !1;
    const formatMessages = messages => chalk.reset(messages.join(", ")), logger_info = (...messages) => {
      disabled || console.log(`${chalk.cyan.bold("info")} ${formatMessages(messages)}`);
    }, logger_warn = (...messages) => {
      disabled || console.warn(`${chalk.yellow.bold("warn")} ${formatMessages(messages)}`);
    }, logger_error = (...messages) => {
      disabled || console.error(`${chalk.red.bold("error")} ${formatMessages(messages)}`);
    }, logger_debug = (...messages) => {
      verbose && !disabled && console.log(`${chalk.gray.bold("debug")} ${formatMessages(messages)}`);
    }, logger_log = (...messages) => {
      disabled || console.log(`${formatMessages(messages)}`);
    }, logger_setVerbose = level => {
      verbose = level;
    }, logger_isVerbose = () => verbose, logger_enable = () => {
      disabled = !1;
    };
    function _defineProperty(obj, key, value) {
      return key in obj ? Object.defineProperty(obj, key, {
        value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : obj[key] = value, obj;
    }
    const ora = __webpack_require__(3395);
    class OraNoop {
      constructor() {
        _defineProperty(this, "spinner", {
          interval: 1,
          frames: []
        }), _defineProperty(this, "indent", 0), _defineProperty(this, "isSpinning", !1), 
        _defineProperty(this, "text", ""), _defineProperty(this, "prefixText", ""), _defineProperty(this, "color", "blue");
      }
      succeed(_text) {
        return this;
      }
      fail(_text) {
        return this;
      }
      start(_text) {
        return this;
      }
      stop() {
        return this;
      }
      warn(_text) {
        return this;
      }
      info(_text) {
        return this;
      }
      stopAndPersist() {
        return this;
      }
      clear() {
        return this;
      }
      render() {
        return this;
      }
      frame() {
        return this.text;
      }
    }
    const NoopLoader = OraNoop, os = __webpack_require__(2037), assert = __webpack_require__(9491);
    let _version, _platform = "android";
    const docs = function(section, path, hashOrOverrides) {
      const url = new URL("https://reactnative.dev/"), isObj = "object" == typeof hashOrOverrides, hash = isObj ? hashOrOverrides.hash : hashOrOverrides, version = isObj && hashOrOverrides.version ? hashOrOverrides.version : _version, OS = isObj && hashOrOverrides.os ? hashOrOverrides.os : function() {
        switch (os.platform()) {
         case "aix":
         case "freebsd":
         case "linux":
         case "openbsd":
         case "sunos":
          return "linux";

         case "darwin":
          return "macos";

         case "win32":
          return "windows";

         default:
          return "";
        }
      }(), platform = isObj && hashOrOverrides.platform ? hashOrOverrides.platform : _platform;
      if (url.pathname = _version ? `${section}/${version}/${path}` : `${section}/${path}`, 
      url.searchParams.set("os", OS), url.searchParams.set("platform", platform), isObj) {
        const otherKeys = Object.keys(hashOrOverrides).filter((key => ![ "hash", "version", "os", "platform" ].includes(key)));
        for (let key of otherKeys) url.searchParams.set(key, hashOrOverrides[key]);
      }
      return hash && (assert.doesNotMatch(hash, /#/, "Anchor links should be written withou a '#'"), 
      url.hash = hash), url.toString();
    }.bind(null, "docs");
    class CLIError extends Error {
      constructor(msg, originalError) {
        super(inlineString(msg)), originalError ? this.stack = "string" == typeof originalError ? originalError : originalError.stack || "".split("\n").slice(0, 2).join("\n") : delete this.stack;
      }
    }
    const inlineString = str => str.replace(/(\s{2,})/gm, " ").trim();
    class InvalidNameError extends CLIError {
      constructor(name) {
        super(`"${name}" is not a valid name for a project. Please use a valid identifier name (alphanumeric).`);
      }
    }
    class ReservedNameError extends CLIError {
      constructor(name) {
        super(`Not a valid name for a project. Please do not use the reserved word "${name}".`);
      }
    }
    class HelloWorldError extends CLIError {
      constructor() {
        super("Project name shouldn't contain \"HelloWorld\" name in it, because it is CLI's default placeholder name.");
      }
    }
    const NAME_REGEX = /^[$A-Z_][0-9A-Z_$]*$/i, reservedNames = [ "react", "react-native", "abstract", "continue", "for", "new", "switch", "assert", "default", "goto", "package", "synchronized", "boolean", "do", "if", "private", "this", "break", "double", "implements", "protected", "throw", "byte", "else", "import", "public", "throws", "case", "enum", "instanceof", "return", "transient", "catch", "extends", "int", "short", "try", "char", "final", "interface", "static", "void", "class", "finally", "long", "strictfp", "volatile", "const", "float", "native", "super", "while" ];
    class DirectoryAlreadyExistsError extends CLIError {
      constructor(directory) {
        super(`Cannot initialize new project because directory "${directory}" already exists.`);
      }
    }
    const path = __webpack_require__(1017), fs = __webpack_require__(7147), printRunInstructions_process = __webpack_require__(7282), printRunInstructions_chalk = __webpack_require__(4061);
    const init_printRunInstructions = function(projectDir, projectName) {
      let iosInstructions = "", desktopInstructions = "";
      if ("darwin" === printRunInstructions_process.platform) {
        const iosProjectDir = path.resolve(projectDir, "ios"), iosPodsFile = path.resolve(iosProjectDir, `${projectName}.xcworkspace`), isUsingPods = fs.existsSync(iosPodsFile), relativeXcodeProjectPath = path.relative("..", isUsingPods ? iosPodsFile : path.resolve(iosProjectDir, `${projectName}.xcodeproj`));
        iosInstructions = `\n  ${printRunInstructions_chalk.cyan(`Run instructions for ${printRunInstructions_chalk.bold("iOS")}`)}:\n    • cd "${projectDir}" && npx react-native run-ios\n    ${printRunInstructions_chalk.dim("- or -")}\n    • Open ${relativeXcodeProjectPath} in Xcode or run "xed -b ios"\n    • Hit the Run button\n    `, 
        desktopInstructions = `\n  ${printRunInstructions_chalk.magenta(`Run instructions for ${printRunInstructions_chalk.bold("macOS")}`)}:\n    • See ${printRunInstructions_chalk.underline("https://aka.ms/ReactNativeGuideMacOS")} for the latest up-to-date instructions.\n    `;
      }
      "win32" === printRunInstructions_process.platform && (desktopInstructions = `\n  ${printRunInstructions_chalk.cyan(`Run instructions for ${printRunInstructions_chalk.bold("Windows")}`)}:\n    • See ${printRunInstructions_chalk.underline("https://aka.ms/ReactNativeGuideWindows")} for the latest up-to-date instructions.\n    `);
      const androidInstructions = `\n  ${printRunInstructions_chalk.green(`Run instructions for ${printRunInstructions_chalk.bold("Android")}`)}:\n    • Have an Android emulator running (quickest way to get started), or a device connected.\n    • cd "${projectDir}" && npx react-native run-android\n  `;
      logger_log(`\n  ${androidInstructions}${iosInstructions}${desktopInstructions}\n  `);
    }, {execSync} = __webpack_require__(2081), semver = __webpack_require__(2079), findUp = __webpack_require__(5807);
    function getYarnVersionIfAvailable() {
      let yarnVersion;
      try {
        yarnVersion = (execSync("yarn --version", {
          stdio: [ 0, "pipe", "ignore" ]
        }).toString() || "").trim();
      } catch (error) {
        return null;
      }
      try {
        return semver.gte(yarnVersion, "0.16.0") ? yarnVersion : null;
      } catch (error) {
        return logger_error(`Cannot parse yarn version: ${yarnVersion}`), null;
      }
    }
    const execa = __webpack_require__(8468), packageManagers = {
      yarn: {
        init: [ "init", "-y" ],
        install: [ "add", "--ignore-engines" ],
        installDev: [ "add", "-D", "--ignore-engines" ],
        uninstall: [ "remove" ],
        installAll: [ "install", "--ignore-engines" ]
      },
      npm: {
        init: [ "init", "-y" ],
        install: [ "install", "--save", "--save-exact" ],
        installDev: [ "install", "--save-dev", "--save-exact" ],
        uninstall: [ "uninstall", "--save" ],
        installAll: [ "install" ]
      }
    };
    function configurePackageManager(packageNames, action, options) {
      const pm = function(options) {
        if (options && void 0 !== options.preferYarn) return options.preferYarn && getYarnVersionIfAvailable();
        return cwd = options.root, findUp.sync("yarn.lock", {
          cwd
        }) && getYarnVersionIfAvailable();
        var cwd;
      }(options) ? "yarn" : "npm", [executable, ...flags] = packageManagers[pm][action];
      return function(command, args, options) {
        return execa(command, args, {
          stdio: options.silent && !logger_isVerbose() ? "pipe" : "inherit",
          cwd: options.root
        });
      }(pm, [ executable, ...flags, ...packageNames ], options);
    }
    const walk_fs = __webpack_require__(7147), walk_path = __webpack_require__(1017);
    const tools_walk = function walk(current) {
      if (!walk_fs.lstatSync(current).isDirectory()) return [ current ];
      const files = walk_fs.readdirSync(current).map((child => walk(walk_path.join(current, child))));
      return [].concat.apply([ current ], files);
    }, copyFiles_fs = __webpack_require__(7147), copyFiles_path = __webpack_require__(1017);
    const tools_copyFiles = async function(srcPath, destPath, options = {}) {
      return Promise.all(tools_walk(srcPath).map((async absoluteSrcFilePath => {
        const exclude = options.exclude;
        if (exclude && exclude.some((p => p.test(absoluteSrcFilePath)))) return;
        const relativeFilePath = copyFiles_path.relative(srcPath, absoluteSrcFilePath);
        await function(srcPath, destPath) {
          if (copyFiles_fs.lstatSync(srcPath).isDirectory()) return void (copyFiles_fs.existsSync(destPath) || copyFiles_fs.mkdirSync(destPath));
          return new Promise(((resolve, reject) => {
            !function(srcPath, destPath, cb) {
              let cbCalled = !1;
              const {mode} = copyFiles_fs.statSync(srcPath), readStream = copyFiles_fs.createReadStream(srcPath), writeStream = copyFiles_fs.createWriteStream(destPath);
              function done(err) {
                cbCalled || (cb(err), cbCalled = !0);
              }
              readStream.on("error", (err => {
                done(err);
              })), writeStream.on("error", (err => {
                done(err);
              })), readStream.on("close", (() => {
                done(), copyFiles_fs.chmodSync(destPath, mode);
              })), readStream.pipe(writeStream);
            }(srcPath, destPath, (err => {
              err && reject(err), resolve(destPath);
            }));
          }));
        }(absoluteSrcFilePath, copyFiles_path.resolve(destPath, relativeFilePath));
      })));
    }, replacePathSepForRegex_path = __webpack_require__(1017);
    const template_execa = __webpack_require__(8468), template_path = __webpack_require__(1017), template_fs = __webpack_require__(7147), template_chalk = __webpack_require__(4061);
    async function installTemplatePackage(templateName, root, npm) {
      var options;
      return logger_debug(`Installing template from ${templateName}`), await (options = {
        preferYarn: !npm,
        silent: !0,
        root
      }, configurePackageManager([], "init", options)), function(packageNames, options) {
        return configurePackageManager(packageNames, "install", options);
      }([ templateName ], {
        preferYarn: !npm,
        silent: !0,
        root
      });
    }
    const editTemplate_path = __webpack_require__(1017), editTemplate_fs = __webpack_require__(4489);
    async function replaceNameInUTF8File(filePath, projectName, templateName) {
      logger_debug(`Replacing in ${filePath}`);
      const fileContent = await editTemplate_fs.readFile(filePath, "utf8"), replacedFileContent = fileContent.replace(new RegExp(templateName, "g"), projectName).replace(new RegExp(templateName.toLowerCase(), "g"), projectName.toLowerCase());
      fileContent !== replacedFileContent && await editTemplate_fs.writeFile(filePath, replacedFileContent, "utf8");
    }
    async function renameFile(filePath, oldName, newName) {
      const newFileName = editTemplate_path.join(editTemplate_path.dirname(filePath), editTemplate_path.basename(filePath).replace(new RegExp(oldName, "g"), newName));
      logger_debug(`Renaming ${filePath} -> file:${newFileName}`), await editTemplate_fs.rename(filePath, newFileName);
    }
    function shouldRenameFile(filePath, nameToReplace) {
      return editTemplate_path.basename(filePath).includes(nameToReplace);
    }
    function shouldIgnoreFile(filePath) {
      return filePath.match(/node_modules|yarn.lock|package-lock.json/g);
    }
    function isIosFile(filePath) {
      return filePath.includes("ios");
    }
    const UNDERSCORED_DOTFILES = [ "buckconfig", "eslintrc.js", "flowconfig", "gitattributes", "gitignore", "prettierrc.js", "watchmanconfig", "editorconfig", "bundle", "ruby-version", "node-version", "xcode.env" ];
    async function processDotfiles(filePath) {
      const dotfile = UNDERSCORED_DOTFILES.find((e => filePath.includes(`_${e}`)));
      void 0 !== dotfile && await renameFile(filePath, `_${dotfile}`, `.${dotfile}`);
    }
    function getPackageNameDetails(packageName) {
      const cleanPackageName = packageName.replace(/[^\p{L}\p{N}.]+/gu, ""), packageNameArray = cleanPackageName.split("."), [prefix, ...segments] = packageNameArray;
      return {
        cleanPackageName,
        packageNameArray,
        prefix,
        segments,
        startsWithCom: "com" === prefix
      };
    }
    async function createAndroidPackagePaths(filePath, packageName) {
      const {startsWithCom, segments, packageNameArray} = getPackageNameDetails(packageName), pathFolders = filePath.split("/").slice(-2);
      if ("java" === pathFolders[0] && "com" === pathFolders[1]) {
        const segmentsList = startsWithCom ? segments : packageNameArray;
        if (segmentsList.length > 1) {
          const initialDir = process.cwd();
          process.chdir(filePath);
          try {
            await editTemplate_fs.rename(`${filePath}/${segmentsList.join(".")}`, `${filePath}/${segmentsList[segmentsList.length - 1]}`);
            for (const segment of segmentsList) editTemplate_fs.mkdirSync(segment), process.chdir(segment);
            await editTemplate_fs.rename(`${filePath}/${segmentsList[segmentsList.length - 1]}`, process.cwd());
          } catch {
            throw "Failed to create correct paths for Android.";
          }
          process.chdir(initialDir);
        }
      }
    }
    async function changePlaceholderInTemplate({projectName, placeholderName, placeholderTitle = "Hello App Display Name", projectTitle = projectName, packageName}) {
      if (logger_debug(`Changing ${placeholderName} for ${projectName} in template`), 
      packageName) try {
        await async function({projectName, placeholderName, placeholderTitle, packageName}) {
          !function(packageName) {
            if (packageName.split(".").length < 2) throw `The package name ${packageName} is invalid. It should contain at least two segments, e.g. com.app`;
            if (!/^([a-zA-Z]([a-zA-Z0-9_])*\.)+[a-zA-Z]([a-zA-Z0-9_])*$/u.test(packageName)) throw `The ${packageName} package name is not valid. It can contain only alphanumeric characters and dots.`;
          }(packageName);
          const {cleanPackageName, segments, startsWithCom} = getPackageNameDetails(packageName);
          for (const filePath of tools_walk(process.cwd()).reverse()) {
            if (shouldIgnoreFile(filePath)) continue;
            const iosFile = isIosFile(filePath);
            if (!(await editTemplate_fs.stat(filePath)).isDirectory()) {
              let newName = startsWithCom ? cleanPackageName : `com.${cleanPackageName}`;
              iosFile && (newName = projectName), await replaceNameInUTF8File(filePath, `PRODUCT_BUNDLE_IDENTIFIER = "${startsWithCom ? cleanPackageName : `com.${cleanPackageName}`}"`, 'PRODUCT_BUNDLE_IDENTIFIER = "(.*)"'), 
              filePath.includes("app.json") ? await replaceNameInUTF8File(filePath, projectName, placeholderName) : (await replaceNameInUTF8File(filePath, `return "${projectName}"`, `return "${placeholderName}"`), 
              await replaceNameInUTF8File(filePath, `<string name="app_name">${projectName}</string>`, `<string name="app_name">${placeholderTitle}</string>`), 
              await replaceNameInUTF8File(filePath, newName, `com.${placeholderName}`), await replaceNameInUTF8File(filePath, newName, placeholderName), 
              await replaceNameInUTF8File(filePath, newName, placeholderTitle));
            }
            let fileName = startsWithCom ? segments.join(".") : cleanPackageName;
            shouldRenameFile(filePath, placeholderName) ? (iosFile && (fileName = projectName), 
            await renameFile(filePath, placeholderName, fileName)) : shouldRenameFile(filePath, placeholderName.toLowerCase()) && await renameFile(filePath, placeholderName.toLowerCase(), fileName.toLowerCase());
            try {
              await createAndroidPackagePaths(filePath, packageName);
            } catch (error) {
              throw new CLIError("Failed to create correct paths for Android.");
            }
            await processDotfiles(filePath);
          }
        }({
          projectName,
          placeholderName,
          placeholderTitle,
          packageName
        });
      } catch (error) {
        throw new CLIError(error.message);
      } else for (const filePath of tools_walk(process.cwd()).reverse()) shouldIgnoreFile(filePath) || ((await editTemplate_fs.stat(filePath)).isDirectory() || (await replaceNameInUTF8File(filePath, projectName, placeholderName), 
      await replaceNameInUTF8File(filePath, projectTitle, placeholderTitle)), shouldRenameFile(filePath, placeholderName) ? await renameFile(filePath, placeholderName, projectName) : shouldRenameFile(filePath, placeholderName.toLowerCase()) && await renameFile(filePath, placeholderName.toLowerCase(), projectName.toLowerCase()), 
      await processDotfiles(filePath));
    }
    const runBundleInstall_execa = __webpack_require__(8468);
    const tools_runBundleInstall = async function(loader) {
      try {
        loader.start("Installing Ruby Gems"), await runBundleInstall_execa("bundle", [ "install" ]);
      } catch (error) {
        throw loader.fail(), logger_error(error.stderr || error.stdout), new CLIError(`Looks like your iOS environment is not properly set. Please go to ${docs("environment-setup")} and follow the React Native CLI QuickStart guide for macOS and iOS.`);
      }
      loader.succeed();
    }, installPods_fs = __webpack_require__(7147), installPods_execa = __webpack_require__(8468), installPods_chalk = __webpack_require__(4061), sudo = __webpack_require__(5046);
    async function runPodInstall(loader, directory, shouldHandleRepoUpdate = !0) {
      try {
        loader.start(`Installing CocoaPods dependencies ${installPods_chalk.dim("(this may take a few minutes)")}`), 
        await installPods_execa("bundle", [ "exec", "pod", "install" ]);
      } catch (error) {
        const stderr = error.stderr || error.stdout;
        if (!stderr.includes("pod repo update") || !shouldHandleRepoUpdate) throw loader.fail(), 
        logger_error(stderr), new CLIError(`Looks like your iOS environment is not properly set. Please go to ${docs("environment-setup")} and follow the React Native CLI QuickStart guide for macOS and iOS.`);
        await async function(loader) {
          try {
            loader.start(`Updating CocoaPods repositories ${installPods_chalk.dim("(this may take a few minutes)")}`), 
            await installPods_execa("pod", [ "repo", "update" ]);
          } catch (error) {
            throw logger_log(error.stderr || error.stdout), loader.fail(), new CLIError(`Failed to update CocoaPods repositories for iOS project.\nPlease try again manually: "pod repo update".\nCocoaPods documentation: ${installPods_chalk.dim.underline("https://cocoapods.org/")}`);
          }
        }(loader), await runPodInstall(loader, directory, !1);
      }
    }
    async function installCocoaPodsWithGem() {
      const options = [ "install", "cocoapods", "--no-document" ];
      try {
        await installPods_execa("gem", options);
      } catch (_error) {
        await (command = `gem ${options.join(" ")}`, new Promise(((resolve, reject) => {
          sudo.exec(command, {
            name: "React Native CLI"
          }, (error => {
            error && reject(error), resolve();
          }));
        })));
      }
      var command;
    }
    const tools_installPods = async function({directory, loader}) {
      loader = loader || new NoopLoader;
      try {
        if (!installPods_fs.existsSync("ios")) return;
        process.chdir("ios");
        if (!installPods_fs.existsSync("Podfile")) return;
        installPods_fs.existsSync("../Gemfile") && await tools_runBundleInstall(loader);
        try {
          await installPods_execa("pod", [ "--version" ]);
        } catch (e) {
          loader.info(), await async function(loader) {
            loader.stop(), loader.start("Installing CocoaPods");
            try {
              return await installCocoaPodsWithGem(), loader.succeed();
            } catch (error) {
              throw loader.fail(), logger_error(error.stderr), new CLIError(`An error occured while trying to install CocoaPods, which is required by this template.\nPlease try again manually: sudo gem install cocoapods.\nCocoaPods documentation: ${installPods_chalk.dim.underline("https://cocoapods.org/")}`);
            }
          }(loader);
        }
        await runPodInstall(loader, directory);
      } finally {
        process.chdir("..");
      }
    }, banner_chalk = __webpack_require__(4061), banner = `${banner_chalk.cyan([ "                                                          ", "               ######                ######               ", "             ###     ####        ####     ###             ", "            ##          ###    ###          ##            ", "            ##             ####             ##            ", "            ##             ####             ##            ", "            ##           ##    ##           ##            ", "            ##         ###      ###         ##            ", "             ##  ########################  ##             ", "          ######    ###            ###    ######          ", "      ###     ##    ##              ##    ##     ###      ", "   ###         ## ###      ####      ### ##         ###   ", "  ##           ####      ########      ####           ##  ", " ##             ###     ##########     ###             ## ", "  ##           ####      ########      ####           ##  ", "   ###         ## ###      ####      ### ##         ###   ", "      ###     ##    ##              ##    ##     ###      ", "          ######    ###            ###    ######          ", "             ##  ########################  ##             ", "            ##         ###      ###         ##            ", "            ##           ##    ##           ##            ", "            ##             ####             ##            ", "            ##             ####             ##            ", "            ##          ###    ###          ##            ", "             ###     ####        ####     ###             ", "               ######                ######               ", "                                                          " ].join("\n"))}\n\n${banner_chalk.cyanBright.bold("                  Welcome to React Native!                ")}\n${banner_chalk.dim("                 Learn once, write anywhere               ")}\n`;
    class TemplateAndVersionError extends CLIError {
      constructor(template) {
        super(`Passing both "version" and "template" is not supported. The template you select determines the version of react-native used. Please use only one of these options, for example:\n      \n      --template ${template}@x.y.z\n      \n      where x.y.z is the release of the template that contains the desired "react-native" version. Check the version tab of https://www.npmjs.com/package/${template} for available versions`);
      }
    }
    const init_os = __webpack_require__(2037), init_path = __webpack_require__(1017), init_fs = __webpack_require__(4489);
    async function setProjectDirectory(directory) {
      if (dir = directory, init_fs.existsSync(dir)) throw new DirectoryAlreadyExistsError(directory);
      var dir;
      try {
        init_fs.mkdirSync(directory, {
          recursive: !0
        }), process.chdir(directory);
      } catch (error) {
        throw new CLIError("Error occurred while trying to create project directory.", error);
      }
      return process.cwd();
    }
    async function createFromTemplate({projectName, templateUri, npm, directory, projectTitle, skipInstall, packageName}) {
      logger_debug("Initializing new project"), logger_log(banner);
      const projectDirectory = await setProjectDirectory(directory), loader = (options = {
        text: "Downloading template"
      }, logger_isVerbose() ? new OraNoop : ora(options));
      var options;
      const templateSourceDir = init_fs.mkdtempSync(init_path.join(init_os.tmpdir(), "rncli-init-template-"));
      try {
        loader.start(), await installTemplatePackage(templateUri, templateSourceDir, npm), 
        loader.succeed(), loader.start("Copying template");
        const templateName = (cwd = templateSourceDir, Object.keys(JSON.parse(init_fs.readFileSync(init_path.join(cwd, "./package.json"), "utf8")).dependencies)[0]), templateConfig = function(templateName, templateSourceDir) {
          const configFilePath = template_path.resolve(templateSourceDir, "node_modules", templateName, "template.config.js");
          if (logger_debug(`Getting config from ${configFilePath}`), !template_fs.existsSync(configFilePath)) throw new CLIError(`Couldn't find the "${configFilePath} file inside "${templateName}" template. Please make sure the template is valid.\n      Read more: ${template_chalk.underline.dim("https://github.com/react-native-community/cli/blob/master/docs/init.md#creating-custom-template")}`);
          return require(configFilePath);
        }(templateName, templateSourceDir);
        await async function(templateName, templateDir, templateSourceDir) {
          const templatePath = template_path.resolve(templateSourceDir, "node_modules", templateName, templateDir);
          logger_debug(`Copying template from ${templatePath}`);
          let regexStr = template_path.resolve(templatePath, "node_modules");
          var string;
          await tools_copyFiles(templatePath, process.cwd(), {
            exclude: [ new RegExp((string = regexStr, "\\" === replacePathSepForRegex_path.sep ? string.replace(/(\/|(.)?\\(?![[\]{}()*+?.^$|\\]))/g, ((_match, _, p2) => p2 && "\\" !== p2 ? p2 + "\\\\" : "\\\\")) : string)) ]
          });
        }(templateName, templateConfig.templateDir, templateSourceDir), loader.succeed(), 
        loader.start("Processing template"), await changePlaceholderInTemplate({
          projectName,
          projectTitle,
          placeholderName: templateConfig.placeholderName,
          placeholderTitle: templateConfig.titlePlaceholder,
          packageName
        }), loader.succeed();
        const {postInitScript} = templateConfig;
        postInitScript && (loader.info("Executing post init script "), await function(templateName, postInitScript, templateSourceDir) {
          const scriptPath = template_path.resolve(templateSourceDir, "node_modules", templateName, postInitScript);
          return logger_debug(`Executing post init script located ${scriptPath}`), template_execa(scriptPath, {
            stdio: "inherit"
          });
        }(templateName, postInitScript, templateSourceDir)), skipInstall ? loader.succeed("Dependencies installation skipped") : await async function({directory, npm, loader, root}) {
          loader.start("Installing dependencies"), await function(options) {
            return configurePackageManager([], "installAll", options);
          }({
            preferYarn: !npm,
            silent: !0,
            root
          }), "darwin" === process.platform && await tools_installPods({
            directory,
            loader
          });
          loader.succeed();
        }({
          npm,
          loader,
          root: projectDirectory,
          directory
        });
      } catch (e) {
        throw loader.fail(), e;
      } finally {
        init_fs.removeSync(templateSourceDir);
      }
      var cwd;
    }
    async function createProject(projectName, directory, version, options) {
      const templateUri = function(options, version) {
        return "react-native-template-typescript" === options.template ? (logger_warn("Ignoring custom template: 'react-native-template-typescript'. Starting from React Native v0.71 TypeScript is used by default."), 
        "react-native") : options.template || `react-native@${version}`;
      }(options, version);
      return createFromTemplate({
        projectName,
        templateUri,
        npm: options.npm,
        directory,
        projectTitle: options.title,
        skipInstall: options.skipInstall,
        packageName: options.packageName
      });
    }
    const commands_init = {
      func: async function([projectName], options) {
        if (function(name) {
          if (!String(name).match(NAME_REGEX)) throw new InvalidNameError(name);
          const lowerCaseName = name.toLowerCase();
          if (reservedNames.includes(lowerCaseName)) throw new ReservedNameError(lowerCaseName);
          if (name.match(/helloworld/gi)) throw new HelloWorldError;
        }(projectName), options.template && options.version) throw new TemplateAndVersionError(options.template);
        const root = process.cwd(), version = options.version || "latest", directoryName = init_path.relative(root, options.directory || projectName);
        await createProject(projectName, directoryName, version, options);
        const projectFolder = init_path.join(root, directoryName);
        init_printRunInstructions(projectFolder, projectName);
      },
      detached: !0,
      name: "init <projectName>",
      description: "Initialize a new React Native project named <projectName> in a directory of the same name.",
      options: [ {
        name: "--version <string>",
        description: "Shortcut for `--template react-native@version`"
      }, {
        name: "--template <string>",
        description: "Uses a custom template. Valid arguments are the ones supported by `yarn add [package]` or `npm install [package]`, if you are using `--npm` option"
      }, {
        name: "--npm",
        description: "Forces using npm for initialization"
      }, {
        name: "--directory <string>",
        description: "Uses a custom directory instead of `<projectName>`."
      }, {
        name: "--title <string>",
        description: "Uses a custom app title name for application"
      }, {
        name: "--skip-install",
        description: "Skips dependencies installation step"
      }, {
        name: "--package-name <string>",
        description: "Inits a project with a custom package name (Android) and bundle ID (iOS), e.g. com.example.app"
      } ]
    }, src_chalk = __webpack_require__(4061), {Command: CommanderCommand} = __webpack_require__(9903), detachedCommands = [ commands_init ], pkgVersion = __webpack_require__(5478).i8, program = (new CommanderCommand).version(pkgVersion, "-v", "Output the current version").option("--verbose", "Increase logging verbosity"), handleError = err => {
      if (logger_enable(), program.opts().verbose) logger_error(err.message); else {
        const message = err.message.replace(/\.$/, "");
        logger_error(`${message}.`);
      }
      err.stack && logger_log(err.stack), program.opts().verbose || logger_info(src_chalk.dim(`Run CLI with ${src_chalk.reset("--verbose")} ${src_chalk.dim("flag for more details.")}`)), 
      process.exit(1);
    };
    function isDetachedCommand(command) {
      return !0 === command.detached;
    }
    function attachCommand(command, config) {
      const cmd = program.action((async function(...args) {
        const passedOptions = this.opts(), argv = Array.from(args).slice(0, -1);
        try {
          if (isDetachedCommand(command)) await command.func(argv, passedOptions, config); else {
            if (!function(command) {
              return !isDetachedCommand(command);
            }(command)) throw new Error("A command must be either attached or detached");
            await command.func(argv, config, passedOptions);
          }
        } catch (error) {
          handleError(error);
        }
      })), parts = command.name.match(/([^ ]+) *(.*)/);
      parts && (cmd.name(`react-native-${parts[1]}`), parts[2] && cmd.arguments(parts[2])), 
      command.description && cmd.description(command.description), cmd.addHelpText("after", function(examples) {
        let output = [];
        if (examples && examples.length > 0) {
          const formattedUsage = examples.map((example => `  ${example.desc}: \n  ${src_chalk.cyan(example.cmd)}`)).join("\n\n");
          output = output.concat([ src_chalk.bold("\nExample usage:"), formattedUsage ]);
        }
        return output.join("\n").concat("\n");
      }(command.examples));
      for (const opt of command.options || []) {
        var _opt$description;
        cmd.option(opt.name, null !== (_opt$description = opt.description) && void 0 !== _opt$description ? _opt$description : "", opt.parse || (val => val), "function" == typeof opt.default ? opt.default(config) : opt.default);
      }
    }
    const bin_semver = __webpack_require__(2079), bin_chalk = __webpack_require__(4061), versionRanges = {
      NODE_JS: __webpack_require__(4147).h$.d
    };
    bin_semver.satisfies(process.version, versionRanges.NODE_JS) ? async function() {
      try {
        await async function() {
          logger_setVerbose(process.argv.includes("--verbose"));
          for (const command of detachedCommands) attachCommand(command, void 0);
          program.parse(process.argv);
        }();
      } catch (e) {
        handleError(e);
      }
    }() : console.error(`${bin_chalk.red(`React Native needs Node.js ${versionRanges.NODE_JS}. You're currently on version ${process.version}. Please upgrade Node.js to a supported version and try again.`)}`);
  })();
})();