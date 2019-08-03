/*!

 * Font Awesome Free 5.9.0 by @fontawesome - https://fontawesome.com

 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)

 */

(function () {

  'use strict';



  var _WINDOW = {};

  var _DOCUMENT = {};



  try {

    if (typeof window !== 'undefined') _WINDOW = window;

    if (typeof document !== 'undefined') _DOCUMENT = document;

  } catch (e) {}



  var _ref = _WINDOW.navigator || {},

      _ref$userAgent = _ref.userAgent,

      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;



  var WINDOW = _WINDOW;

  var DOCUMENT = _DOCUMENT;

  var IS_BROWSER = !!WINDOW.document;

  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';

  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');



  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';

  var PRODUCTION = function () {

    try {

      return "production" === 'production';

    } catch (e) {

      return false;

    }

  }();



  function bunker(fn) {

    try {

      fn();

    } catch (e) {

      if (!PRODUCTION) {

        throw e;

      }

    }

  }



  function _defineProperty(obj, key, value) {

    if (key in obj) {

      Object.defineProperty(obj, key, {

        value: value,

        enumerable: true,

        configurable: true,

        writable: true

      });

    } else {

      obj[key] = value;

    }



    return obj;

  }



  function _objectSpread(target) {

    for (var i = 1; i < arguments.length; i++) {

      var source = arguments[i] != null ? arguments[i] : {};

      var ownKeys = Object.keys(source);



      if (typeof Object.getOwnPropertySymbols === 'function') {

        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {

          return Object.getOwnPropertyDescriptor(source, sym).enumerable;

        }));

      }



      ownKeys.forEach(function (key) {

        _defineProperty(target, key, source[key]);

      });

    }



    return target;

  }



  var w = WINDOW || {};

  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};

  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};

  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};

  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];

  var namespace = w[NAMESPACE_IDENTIFIER];



  function defineIcons(prefix, icons) {

    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _params$skipHooks = params.skipHooks,

        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;

    var normalized = Object.keys(icons).reduce(function (acc, iconName) {

      var icon = icons[iconName];

      var expanded = !!icon.icon;



      if (expanded) {

        acc[icon.iconName] = icon.icon;

      } else {

        acc[iconName] = icon;

      }



      return acc;

    }, {});



    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {

      namespace.hooks.addPack(prefix, normalized);

    } else {

      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);

    }

    /**

     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction

     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias

     * for `fas` so we'll easy the upgrade process for our users by automatically defining

     * this as well.

     */





    if (prefix === 'fas') {

      defineIcons('fa', icons);

    }

  }



  var icons = {

  };



  bunker(function () {

    defineIcons('fab', icons);

  });



}());

(function () {

  'use strict';



  var _WINDOW = {};

  var _DOCUMENT = {};



  try {

    if (typeof window !== 'undefined') _WINDOW = window;

    if (typeof document !== 'undefined') _DOCUMENT = document;

  } catch (e) {}



  var _ref = _WINDOW.navigator || {},

      _ref$userAgent = _ref.userAgent,

      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;



  var WINDOW = _WINDOW;

  var DOCUMENT = _DOCUMENT;

  var IS_BROWSER = !!WINDOW.document;

  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';

  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');



  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';

  var PRODUCTION = function () {

    try {

      return "production" === 'production';

    } catch (e) {

      return false;

    }

  }();



  function bunker(fn) {

    try {

      fn();

    } catch (e) {

      if (!PRODUCTION) {

        throw e;

      }

    }

  }



  function _defineProperty(obj, key, value) {

    if (key in obj) {

      Object.defineProperty(obj, key, {

        value: value,

        enumerable: true,

        configurable: true,

        writable: true

      });

    } else {

      obj[key] = value;

    }



    return obj;

  }



  function _objectSpread(target) {

    for (var i = 1; i < arguments.length; i++) {

      var source = arguments[i] != null ? arguments[i] : {};

      var ownKeys = Object.keys(source);



      if (typeof Object.getOwnPropertySymbols === 'function') {

        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {

          return Object.getOwnPropertyDescriptor(source, sym).enumerable;

        }));

      }



      ownKeys.forEach(function (key) {

        _defineProperty(target, key, source[key]);

      });

    }



    return target;

  }



  var w = WINDOW || {};

  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};

  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};

  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};

  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];

  var namespace = w[NAMESPACE_IDENTIFIER];



  function defineIcons(prefix, icons) {

    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _params$skipHooks = params.skipHooks,

        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;

    var normalized = Object.keys(icons).reduce(function (acc, iconName) {

      var icon = icons[iconName];

      var expanded = !!icon.icon;



      if (expanded) {

        acc[icon.iconName] = icon.icon;

      } else {

        acc[iconName] = icon;

      }



      return acc;

    }, {});



    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {

      namespace.hooks.addPack(prefix, normalized);

    } else {

      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);

    }

    /**

     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction

     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias

     * for `fas` so we'll easy the upgrade process for our users by automatically defining

     * this as well.

     */





    if (prefix === 'fas') {

      defineIcons('fa', icons);

    }

  }



  var icons = {

    "eye": [576, 512, [], "f06e", "M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"],

    "eye-slash": [640, 512, [], "f070", "M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"],

    "moon": [512, 512, [], "f186", "M279.135 512c78.756 0 150.982-35.804 198.844-94.775 28.27-34.831-2.558-85.722-46.249-77.401-82.348 15.683-158.272-47.268-158.272-130.792 0-48.424 26.06-92.292 67.434-115.836 38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256 0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478-54.76 31.163-91.693 90.042-91.693 157.554 0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"],

    "snowflake": [448, 512, [], "f2dc", "M440.1 355.2l-39.2-23 34.1-9.3c8.4-2.3 13.4-11.1 11.1-19.6l-4.1-15.5c-2.2-8.5-10.9-13.6-19.3-11.3L343 298.2 271.2 256l71.9-42.2 79.7 21.7c8.4 2.3 17-2.8 19.3-11.3l4.1-15.5c2.2-8.5-2.7-17.3-11.1-19.6l-34.1-9.3 39.2-23c7.5-4.4 10.1-14.2 5.8-21.9l-7.9-13.9c-4.3-7.7-14-10.3-21.5-5.9l-39.2 23 9.1-34.7c2.2-8.5-2.7-17.3-11.1-19.6l-15.2-4.1c-8.4-2.3-17 2.8-19.3 11.3l-21.3 81-71.9 42.2v-84.5L306 70.4c6.1-6.2 6.1-16.4 0-22.6l-11.1-11.3c-6.1-6.2-16.1-6.2-22.2 0l-24.9 25.4V16c0-8.8-7-16-15.7-16h-15.7c-8.7 0-15.7 7.2-15.7 16v46.1l-24.9-25.4c-6.1-6.2-16.1-6.2-22.2 0L142.1 48c-6.1 6.2-6.1 16.4 0 22.6l58.3 59.3v84.5l-71.9-42.2-21.3-81c-2.2-8.5-10.9-13.6-19.3-11.3L72.7 84c-8.4 2.3-13.4 11.1-11.1 19.6l9.1 34.7-39.2-23c-7.5-4.4-17.1-1.8-21.5 5.9l-7.9 13.9c-4.3 7.7-1.8 17.4 5.8 21.9l39.2 23-34.1 9.1c-8.4 2.3-13.4 11.1-11.1 19.6L6 224.2c2.2 8.5 10.9 13.6 19.3 11.3l79.7-21.7 71.9 42.2-71.9 42.2-79.7-21.7c-8.4-2.3-17 2.8-19.3 11.3l-4.1 15.5c-2.2 8.5 2.7 17.3 11.1 19.6l34.1 9.3-39.2 23c-7.5 4.4-10.1 14.2-5.8 21.9L10 391c4.3 7.7 14 10.3 21.5 5.9l39.2-23-9.1 34.7c-2.2 8.5 2.7 17.3 11.1 19.6l15.2 4.1c8.4 2.3 17-2.8 19.3-11.3l21.3-81 71.9-42.2v84.5l-58.3 59.3c-6.1 6.2-6.1 16.4 0 22.6l11.1 11.3c6.1 6.2 16.1 6.2 22.2 0l24.9-25.4V496c0 8.8 7 16 15.7 16h15.7c8.7 0 15.7-7.2 15.7-16v-46.1l24.9 25.4c6.1 6.2 16.1 6.2 22.2 0l11.1-11.3c6.1-6.2 6.1-16.4 0-22.6l-58.3-59.3v-84.5l71.9 42.2 21.3 81c2.2 8.5 10.9 13.6 19.3 11.3L375 428c8.4-2.3 13.4-11.1 11.1-19.6l-9.1-34.7 39.2 23c7.5 4.4 17.1 1.8 21.5-5.9l7.9-13.9c4.6-7.5 2.1-17.3-5.5-21.7z"],

    "sun": [512, 512, [], "f185", "M494.2 221.9l-59.8-40.5 13.7-71c2.6-13.2-1.6-26.8-11.1-36.4-9.6-9.5-23.2-13.7-36.2-11.1l-70.9 13.7-40.4-59.9c-15.1-22.3-51.9-22.3-67 0l-40.4 59.9-70.8-13.7C98 60.4 84.5 64.5 75 74.1c-9.5 9.6-13.7 23.1-11.1 36.3l13.7 71-59.8 40.5C6.6 229.5 0 242 0 255.5s6.7 26 17.8 33.5l59.8 40.5-13.7 71c-2.6 13.2 1.6 26.8 11.1 36.3 9.5 9.5 22.9 13.7 36.3 11.1l70.8-13.7 40.4 59.9C230 505.3 242.6 512 256 512s26-6.7 33.5-17.8l40.4-59.9 70.9 13.7c13.4 2.7 26.8-1.6 36.3-11.1 9.5-9.5 13.6-23.1 11.1-36.3l-13.7-71 59.8-40.5c11.1-7.5 17.8-20.1 17.8-33.5-.1-13.6-6.7-26.1-17.9-33.7zm-112.9 85.6l17.6 91.2-91-17.6L256 458l-51.9-77-90.9 17.6 17.6-91.2-76.8-52 76.8-52-17.6-91.2 91 17.6L256 53l51.9 76.9 91-17.6-17.6 91.1 76.8 52-76.8 52.1zM256 152c-57.3 0-104 46.7-104 104s46.7 104 104 104 104-46.7 104-104-46.7-104-104-104zm0 160c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"],

  };



  bunker(function () {

    defineIcons('far', icons);

  });



}());

(function () {

  'use strict';



  var _WINDOW = {};

  var _DOCUMENT = {};



  try {

    if (typeof window !== 'undefined') _WINDOW = window;

    if (typeof document !== 'undefined') _DOCUMENT = document;

  } catch (e) {}



  var _ref = _WINDOW.navigator || {},

      _ref$userAgent = _ref.userAgent,

      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;



  var WINDOW = _WINDOW;

  var DOCUMENT = _DOCUMENT;

  var IS_BROWSER = !!WINDOW.document;

  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';

  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');



  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';

  var PRODUCTION = function () {

    try {

      return "production" === 'production';

    } catch (e) {

      return false;

    }

  }();



  function bunker(fn) {

    try {

      fn();

    } catch (e) {

      if (!PRODUCTION) {

        throw e;

      }

    }

  }



  function _defineProperty(obj, key, value) {

    if (key in obj) {

      Object.defineProperty(obj, key, {

        value: value,

        enumerable: true,

        configurable: true,

        writable: true

      });

    } else {

      obj[key] = value;

    }



    return obj;

  }



  function _objectSpread(target) {

    for (var i = 1; i < arguments.length; i++) {

      var source = arguments[i] != null ? arguments[i] : {};

      var ownKeys = Object.keys(source);



      if (typeof Object.getOwnPropertySymbols === 'function') {

        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {

          return Object.getOwnPropertyDescriptor(source, sym).enumerable;

        }));

      }



      ownKeys.forEach(function (key) {

        _defineProperty(target, key, source[key]);

      });

    }



    return target;

  }



  var w = WINDOW || {};

  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};

  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};

  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};

  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];

  var namespace = w[NAMESPACE_IDENTIFIER];



  function defineIcons(prefix, icons) {

    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _params$skipHooks = params.skipHooks,

        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;

    var normalized = Object.keys(icons).reduce(function (acc, iconName) {

      var icon = icons[iconName];

      var expanded = !!icon.icon;



      if (expanded) {

        acc[icon.iconName] = icon.icon;

      } else {

        acc[iconName] = icon;

      }



      return acc;

    }, {});



    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {

      namespace.hooks.addPack(prefix, normalized);

    } else {

      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);

    }

    /**

     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction

     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias

     * for `fas` so we'll easy the upgrade process for our users by automatically defining

     * this as well.

     */





    if (prefix === 'fas') {

      defineIcons('fa', icons);

    }

  }



  var icons = {

    "arrow-up": [448, 512, [], "f062", "M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"],

    "cloud": [640, 512, [], "f0c2", "M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"],

    "cloud-moon": [576, 512, [], "f6c3", "M342.8 352.7c5.7-9.6 9.2-20.7 9.2-32.7 0-35.3-28.7-64-64-64-17.2 0-32.8 6.9-44.3 17.9-16.3-29.6-47.5-49.9-83.7-49.9-53 0-96 43-96 96 0 2 .5 3.8.6 5.7C27.1 338.8 0 374.1 0 416c0 53 43 96 96 96h240c44.2 0 80-35.8 80-80 0-41.9-32.3-75.8-73.2-79.3zm222.5-54.3c-93.1 17.7-178.5-53.7-178.5-147.7 0-54.2 29-104 76.1-130.8 7.3-4.1 5.4-15.1-2.8-16.7C448.4 1.1 436.7 0 425 0 319.1 0 233.1 85.9 233.1 192c0 8.5.7 16.8 1.8 25 5.9 4.3 11.6 8.9 16.7 14.2 11.4-4.7 23.7-7.2 36.4-7.2 52.9 0 96 43.1 96 96 0 3.6-.2 7.2-.6 10.7 23.6 10.8 42.4 29.5 53.5 52.6 54.4-3.4 103.7-29.3 137.1-70.4 5.3-6.5-.5-16.1-8.7-14.5z"],

    "cloud-rain": [512, 512, [], "f73d", "M416 128c-.6 0-1.1.2-1.6.2 1.1-5.2 1.6-10.6 1.6-16.2 0-44.2-35.8-80-80-80-24.6 0-46.3 11.3-61 28.8C256.4 24.8 219.3 0 176 0 114.1 0 64 50.1 64 112c0 7.3.8 14.3 2.1 21.2C27.8 145.8 0 181.5 0 224c0 53 43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96zM88 374.2c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0z"],

    "cloud-showers-heavy": [512, 512, [], "f740", "M183.9 370.1c-7.6-4.4-17.4-1.8-21.8 6l-64 112c-4.4 7.7-1.7 17.5 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l64-112c4.4-7.6 1.7-17.4-6-21.8zm96 0c-7.6-4.4-17.4-1.8-21.8 6l-64 112c-4.4 7.7-1.7 17.5 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l64-112c4.4-7.6 1.7-17.4-6-21.8zm-192 0c-7.6-4.4-17.4-1.8-21.8 6l-64 112c-4.4 7.7-1.7 17.5 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l64-112c4.4-7.6 1.7-17.4-6-21.8zm384 0c-7.6-4.4-17.4-1.8-21.8 6l-64 112c-4.4 7.7-1.7 17.5 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l64-112c4.4-7.6 1.7-17.4-6-21.8zm-96 0c-7.6-4.4-17.4-1.8-21.8 6l-64 112c-4.4 7.7-1.7 17.5 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l64-112c4.4-7.6 1.7-17.4-6-21.8zM416 128c-.6 0-1.1.2-1.6.2 1.1-5.2 1.6-10.6 1.6-16.2 0-44.2-35.8-80-80-80-24.6 0-46.3 11.3-61 28.8C256.4 24.8 219.3 0 176 0 114.2 0 64 50.1 64 112c0 7.3.8 14.3 2.1 21.2C27.8 145.8 0 181.5 0 224c0 53 43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96z"],

    "cloud-sun": [640, 512, [], "f6c4", "M575.2 325.7c.2-1.9.8-3.7.8-5.6 0-35.3-28.7-64-64-64-12.6 0-24.2 3.8-34.1 10-17.6-38.8-56.5-66-101.9-66-61.8 0-112 50.1-112 112 0 3 .7 5.8.9 8.7-49.6 3.7-88.9 44.7-88.9 95.3 0 53 43 96 96 96h272c53 0 96-43 96-96 0-42.1-27.2-77.4-64.8-90.4zm-430.4-22.6c-43.7-43.7-43.7-114.7 0-158.3 43.7-43.7 114.7-43.7 158.4 0 9.7 9.7 16.9 20.9 22.3 32.7 9.8-3.7 20.1-6 30.7-7.5L386 81.1c4-11.9-7.3-23.1-19.2-19.2L279 91.2 237.5 8.4C232-2.8 216-2.8 210.4 8.4L169 91.2 81.1 61.9C69.3 58 58 69.3 61.9 81.1l29.3 87.8-82.8 41.5c-11.2 5.6-11.2 21.5 0 27.1l82.8 41.4-29.3 87.8c-4 11.9 7.3 23.1 19.2 19.2l76.1-25.3c6.1-12.4 14-23.7 23.6-33.5-13.1-5.4-25.4-13.4-36-24zm-4.8-79.2c0 40.8 29.3 74.8 67.9 82.3 8-4.7 16.3-8.8 25.2-11.7 5.4-44.3 31-82.5 67.4-105C287.3 160.4 258 140 224 140c-46.3 0-84 37.6-84 83.9z"],

    "cogs": [640, 512, [], "f085", "M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"],

    "eye": [576, 512, [], "f06e", "M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"],

    "eye-slash": [640, 512, [], "f070", "M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"],

    "moon": [512, 512, [], "f186", "M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"],

    "snowflake": [448, 512, [], "f2dc", "M440.3 345.2l-33.8-19.5 26-7c8.2-2.2 13.1-10.7 10.9-18.9l-4-14.9c-2.2-8.2-10.7-13.1-18.9-10.9l-70.8 19-63.9-37 63.8-36.9 70.8 19c8.2 2.2 16.7-2.7 18.9-10.9l4-14.9c2.2-8.2-2.7-16.7-10.9-18.9l-26-7 33.8-19.5c7.4-4.3 9.9-13.7 5.7-21.1L430.4 119c-4.3-7.4-13.7-9.9-21.1-5.7l-33.8 19.5 7-26c2.2-8.2-2.7-16.7-10.9-18.9l-14.9-4c-8.2-2.2-16.7 2.7-18.9 10.9l-19 70.8-62.8 36.2v-77.5l53.7-53.7c6.2-6.2 6.2-16.4 0-22.6l-11.3-11.3c-6.2-6.2-16.4-6.2-22.6 0L256 56.4V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v40.4l-19.7-19.7c-6.2-6.2-16.4-6.2-22.6 0L138.3 48c-6.3 6.2-6.3 16.4 0 22.6l53.7 53.7v77.5l-62.8-36.2-19-70.8c-2.2-8.2-10.7-13.1-18.9-10.9l-14.9 4c-8.2 2.2-13.1 10.7-10.9 18.9l7 26-33.8-19.5c-7.4-4.3-16.8-1.7-21.1 5.7L2.1 145.7c-4.3 7.4-1.7 16.8 5.7 21.1l33.8 19.5-26 7c-8.3 2.2-13.2 10.7-11 19l4 14.9c2.2 8.2 10.7 13.1 18.9 10.9l70.8-19 63.8 36.9-63.8 36.9-70.8-19c-8.2-2.2-16.7 2.7-18.9 10.9l-4 14.9c-2.2 8.2 2.7 16.7 10.9 18.9l26 7-33.8 19.6c-7.4 4.3-9.9 13.7-5.7 21.1l15.5 26.8c4.3 7.4 13.7 9.9 21.1 5.7l33.8-19.5-7 26c-2.2 8.2 2.7 16.7 10.9 18.9l14.9 4c8.2 2.2 16.7-2.7 18.9-10.9l19-70.8 62.8-36.2v77.5l-53.7 53.7c-6.3 6.2-6.3 16.4 0 22.6l11.3 11.3c6.2 6.2 16.4 6.2 22.6 0l19.7-19.7V496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-40.4l19.7 19.7c6.2 6.2 16.4 6.2 22.6 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6L256 387.7v-77.5l62.8 36.2 19 70.8c2.2 8.2 10.7 13.1 18.9 10.9l14.9-4c8.2-2.2 13.1-10.7 10.9-18.9l-7-26 33.8 19.5c7.4 4.3 16.8 1.7 21.1-5.7l15.5-26.8c4.3-7.3 1.8-16.8-5.6-21z"],

    "sun": [512, 512, [], "f185", "M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"],

    "tint": [352, 512, [], "f043", "M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448c-61.75 0-112-50.25-112-112 0-8.84 7.16-16 16-16s16 7.16 16 16c0 44.11 35.89 80 80 80 8.84 0 16 7.16 16 16s-7.16 16-16 16z"],

    "water": [576, 512, [], "f773", "M562.1 383.9c-21.5-2.4-42.1-10.5-57.9-22.9-14.1-11.1-34.2-11.3-48.2 0-37.9 30.4-107.2 30.4-145.7-1.5-13.5-11.2-33-9.1-46.7 1.8-38 30.1-106.9 30-145.2-1.7-13.5-11.2-33.3-8.9-47.1 2-15.5 12.2-36 20.1-57.7 22.4-7.9.8-13.6 7.8-13.6 15.7v32.2c0 9.1 7.6 16.8 16.7 16 28.8-2.5 56.1-11.4 79.4-25.9 56.5 34.6 137 34.1 192 0 56.5 34.6 137 34.1 192 0 23.3 14.2 50.9 23.3 79.1 25.8 9.1.8 16.7-6.9 16.7-16v-31.6c.1-8-5.7-15.4-13.8-16.3zm0-144c-21.5-2.4-42.1-10.5-57.9-22.9-14.1-11.1-34.2-11.3-48.2 0-37.9 30.4-107.2 30.4-145.7-1.5-13.5-11.2-33-9.1-46.7 1.8-38 30.1-106.9 30-145.2-1.7-13.5-11.2-33.3-8.9-47.1 2-15.5 12.2-36 20.1-57.7 22.4-7.9.8-13.6 7.8-13.6 15.7v32.2c0 9.1 7.6 16.8 16.7 16 28.8-2.5 56.1-11.4 79.4-25.9 56.5 34.6 137 34.1 192 0 56.5 34.6 137 34.1 192 0 23.3 14.2 50.9 23.3 79.1 25.8 9.1.8 16.7-6.9 16.7-16v-31.6c.1-8-5.7-15.4-13.8-16.3zm0-144C540.6 93.4 520 85.4 504.2 73 490.1 61.9 470 61.7 456 73c-37.9 30.4-107.2 30.4-145.7-1.5-13.5-11.2-33-9.1-46.7 1.8-38 30.1-106.9 30-145.2-1.7-13.5-11.2-33.3-8.9-47.1 2-15.5 12.2-36 20.1-57.7 22.4-7.9.8-13.6 7.8-13.6 15.7v32.2c0 9.1 7.6 16.8 16.7 16 28.8-2.5 56.1-11.4 79.4-25.9 56.5 34.6 137 34.1 192 0 56.5 34.6 137 34.1 192 0 23.3 14.2 50.9 23.3 79.1 25.8 9.1.8 16.7-6.9 16.7-16v-31.6c.1-8-5.7-15.4-13.8-16.3z"],

    "wind": [512, 512, [], "f72e", "M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z"],

  };



  bunker(function () {

    defineIcons('fas', icons);

  });



}());

(function () {

  'use strict';



  function _typeof(obj) {

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {

      _typeof = function (obj) {

        return typeof obj;

      };

    } else {

      _typeof = function (obj) {

        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;

      };

    }



    return _typeof(obj);

  }



  function _classCallCheck(instance, Constructor) {

    if (!(instance instanceof Constructor)) {

      throw new TypeError("Cannot call a class as a function");

    }

  }



  function _defineProperties(target, props) {

    for (var i = 0; i < props.length; i++) {

      var descriptor = props[i];

      descriptor.enumerable = descriptor.enumerable || false;

      descriptor.configurable = true;

      if ("value" in descriptor) descriptor.writable = true;

      Object.defineProperty(target, descriptor.key, descriptor);

    }

  }



  function _createClass(Constructor, protoProps, staticProps) {

    if (protoProps) _defineProperties(Constructor.prototype, protoProps);

    if (staticProps) _defineProperties(Constructor, staticProps);

    return Constructor;

  }



  function _defineProperty(obj, key, value) {

    if (key in obj) {

      Object.defineProperty(obj, key, {

        value: value,

        enumerable: true,

        configurable: true,

        writable: true

      });

    } else {

      obj[key] = value;

    }



    return obj;

  }



  function _objectSpread(target) {

    for (var i = 1; i < arguments.length; i++) {

      var source = arguments[i] != null ? arguments[i] : {};

      var ownKeys = Object.keys(source);



      if (typeof Object.getOwnPropertySymbols === 'function') {

        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {

          return Object.getOwnPropertyDescriptor(source, sym).enumerable;

        }));

      }



      ownKeys.forEach(function (key) {

        _defineProperty(target, key, source[key]);

      });

    }



    return target;

  }



  function _slicedToArray(arr, i) {

    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();

  }



  function _toConsumableArray(arr) {

    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();

  }



  function _arrayWithoutHoles(arr) {

    if (Array.isArray(arr)) {

      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];



      return arr2;

    }

  }



  function _arrayWithHoles(arr) {

    if (Array.isArray(arr)) return arr;

  }



  function _iterableToArray(iter) {

    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);

  }



  function _iterableToArrayLimit(arr, i) {

    var _arr = [];

    var _n = true;

    var _d = false;

    var _e = undefined;



    try {

      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {

        _arr.push(_s.value);



        if (i && _arr.length === i) break;

      }

    } catch (err) {

      _d = true;

      _e = err;

    } finally {

      try {

        if (!_n && _i["return"] != null) _i["return"]();

      } finally {

        if (_d) throw _e;

      }

    }



    return _arr;

  }



  function _nonIterableSpread() {

    throw new TypeError("Invalid attempt to spread non-iterable instance");

  }



  function _nonIterableRest() {

    throw new TypeError("Invalid attempt to destructure non-iterable instance");

  }



  var noop = function noop() {};



  var _WINDOW = {};

  var _DOCUMENT = {};

  var _MUTATION_OBSERVER = null;

  var _PERFORMANCE = {

    mark: noop,

    measure: noop

  };



  try {

    if (typeof window !== 'undefined') _WINDOW = window;

    if (typeof document !== 'undefined') _DOCUMENT = document;

    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;

    if (typeof performance !== 'undefined') _PERFORMANCE = performance;

  } catch (e) {}



  var _ref = _WINDOW.navigator || {},

      _ref$userAgent = _ref.userAgent,

      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;



  var WINDOW = _WINDOW;

  var DOCUMENT = _DOCUMENT;

  var MUTATION_OBSERVER = _MUTATION_OBSERVER;

  var PERFORMANCE = _PERFORMANCE;

  var IS_BROWSER = !!WINDOW.document;

  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';

  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');



  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';

  var UNITS_IN_GRID = 16;

  var DEFAULT_FAMILY_PREFIX = 'fa';

  var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';

  var DATA_FA_I2SVG = 'data-fa-i2svg';

  var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';

  var DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';

  var DATA_PREFIX = 'data-prefix';

  var DATA_ICON = 'data-icon';

  var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';

  var MUTATION_APPROACH_ASYNC = 'async';

  var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];

  var PRODUCTION = function () {

    try {

      return "production" === 'production';

    } catch (e) {

      return false;

    }

  }();

  var PREFIX_TO_STYLE = {

    'fas': 'solid',

    'far': 'regular',

    'fal': 'light',

    'fab': 'brands',

    'fa': 'solid'

  };

  var STYLE_TO_PREFIX = {

    'solid': 'fas',

    'regular': 'far',

    'light': 'fal',

    'brands': 'fab'

  };

  var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';

  var FONT_FAMILY_PATTERN = /Font Awesome 5 (Solid|Regular|Light|Brands|Free|Pro)/;

  var FONT_WEIGHT_TO_PREFIX = {

    '900': 'fas',

    '400': 'far',

    'normal': 'far',

    '300': 'fal'

  };

  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

  var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];

  var RESERVED_CLASSES = ['xs', 'sm', 'lg', 'fw', 'ul', 'li', 'border', 'pull-left', 'pull-right', 'spin', 'pulse', 'rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'flip-both', 'stack', 'stack-1x', 'stack-2x', 'inverse', 'layers', 'layers-text', 'layers-counter'].concat(oneToTen.map(function (n) {

    return "".concat(n, "x");

  })).concat(oneToTwenty.map(function (n) {

    return "w-".concat(n);

  }));



  var initial = WINDOW.FontAwesomeConfig || {};



  function getAttrConfig(attr) {

    var element = DOCUMENT.querySelector('script[' + attr + ']');



    if (element) {

      return element.getAttribute(attr);

    }

  }



  function coerce(val) {

    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value

    // We'll assume that this is an indication that it should be toggled to true

    // For example <script data-search-pseudo-elements src="..."></script>

    if (val === '') return true;

    if (val === 'false') return false;

    if (val === 'true') return true;

    return val;

  }



  if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {

    var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];

    attrs.forEach(function (_ref) {

      var _ref2 = _slicedToArray(_ref, 2),

          attr = _ref2[0],

          key = _ref2[1];



      var val = coerce(getAttrConfig(attr));



      if (val !== undefined && val !== null) {

        initial[key] = val;

      }

    });

  }



  var _default = {

    familyPrefix: DEFAULT_FAMILY_PREFIX,

    replacementClass: DEFAULT_REPLACEMENT_CLASS,

    autoReplaceSvg: true,

    autoAddCss: true,

    autoA11y: true,

    searchPseudoElements: false,

    observeMutations: true,

    mutateApproach: 'async',

    keepOriginalSource: true,

    measurePerformance: false,

    showMissingIcons: true

  };



  var _config = _objectSpread({}, _default, initial);



  if (!_config.autoReplaceSvg) _config.observeMutations = false;



  var config = _objectSpread({}, _config);



  WINDOW.FontAwesomeConfig = config;



  var w = WINDOW || {};

  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};

  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};

  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};

  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];

  var namespace = w[NAMESPACE_IDENTIFIER];



  var functions = [];



  var listener = function listener() {

    DOCUMENT.removeEventListener('DOMContentLoaded', listener);

    loaded = 1;

    functions.map(function (fn) {

      return fn();

    });

  };



  var loaded = false;



  if (IS_DOM) {

    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);

    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);

  }



  function domready (fn) {

    if (!IS_DOM) return;

    loaded ? setTimeout(fn, 0) : functions.push(fn);

  }



  var PENDING = 'pending';

  var SETTLED = 'settled';

  var FULFILLED = 'fulfilled';

  var REJECTED = 'rejected';



  var NOOP = function NOOP() {};



  var isNode = typeof global !== 'undefined' && typeof global.process !== 'undefined' && typeof global.process.emit === 'function';

  var asyncSetTimer = typeof setImmediate === 'undefined' ? setTimeout : setImmediate;

  var asyncQueue = [];

  var asyncTimer;



  function asyncFlush() {

    // run promise callbacks

    for (var i = 0; i < asyncQueue.length; i++) {

      asyncQueue[i][0](asyncQueue[i][1]);

    } // reset async asyncQueue





    asyncQueue = [];

    asyncTimer = false;

  }



  function asyncCall(callback, arg) {

    asyncQueue.push([callback, arg]);



    if (!asyncTimer) {

      asyncTimer = true;

      asyncSetTimer(asyncFlush, 0);

    }

  }



  function invokeResolver(resolver, promise) {

    function resolvePromise(value) {

      resolve(promise, value);

    }



    function rejectPromise(reason) {

      reject(promise, reason);

    }



    try {

      resolver(resolvePromise, rejectPromise);

    } catch (e) {

      rejectPromise(e);

    }

  }



  function invokeCallback(subscriber) {

    var owner = subscriber.owner;

    var settled = owner._state;

    var value = owner._data;

    var callback = subscriber[settled];

    var promise = subscriber.then;



    if (typeof callback === 'function') {

      settled = FULFILLED;



      try {

        value = callback(value);

      } catch (e) {

        reject(promise, e);

      }

    }



    if (!handleThenable(promise, value)) {

      if (settled === FULFILLED) {

        resolve(promise, value);

      }



      if (settled === REJECTED) {

        reject(promise, value);

      }

    }

  }



  function handleThenable(promise, value) {

    var resolved;



    try {

      if (promise === value) {

        throw new TypeError('A promises callback cannot return that same promise.');

      }



      if (value && (typeof value === 'function' || _typeof(value) === 'object')) {

        // then should be retrieved only once

        var then = value.then;



        if (typeof then === 'function') {

          then.call(value, function (val) {

            if (!resolved) {

              resolved = true;



              if (value === val) {

                fulfill(promise, val);

              } else {

                resolve(promise, val);

              }

            }

          }, function (reason) {

            if (!resolved) {

              resolved = true;

              reject(promise, reason);

            }

          });

          return true;

        }

      }

    } catch (e) {

      if (!resolved) {

        reject(promise, e);

      }



      return true;

    }



    return false;

  }



  function resolve(promise, value) {

    if (promise === value || !handleThenable(promise, value)) {

      fulfill(promise, value);

    }

  }



  function fulfill(promise, value) {

    if (promise._state === PENDING) {

      promise._state = SETTLED;

      promise._data = value;

      asyncCall(publishFulfillment, promise);

    }

  }



  function reject(promise, reason) {

    if (promise._state === PENDING) {

      promise._state = SETTLED;

      promise._data = reason;

      asyncCall(publishRejection, promise);

    }

  }



  function publish(promise) {

    promise._then = promise._then.forEach(invokeCallback);

  }



  function publishFulfillment(promise) {

    promise._state = FULFILLED;

    publish(promise);

  }



  function publishRejection(promise) {

    promise._state = REJECTED;

    publish(promise);



    if (!promise._handled && isNode) {

      global.process.emit('unhandledRejection', promise._data, promise);

    }

  }



  function notifyRejectionHandled(promise) {

    global.process.emit('rejectionHandled', promise);

  }

  /**

   * @class

   */





  function P(resolver) {

    if (typeof resolver !== 'function') {

      throw new TypeError('Promise resolver ' + resolver + ' is not a function');

    }



    if (this instanceof P === false) {

      throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

    }



    this._then = [];

    invokeResolver(resolver, this);

  }



  P.prototype = {

    constructor: P,

    _state: PENDING,

    _then: null,

    _data: undefined,

    _handled: false,

    then: function then(onFulfillment, onRejection) {

      var subscriber = {

        owner: this,

        then: new this.constructor(NOOP),

        fulfilled: onFulfillment,

        rejected: onRejection

      };



      if ((onRejection || onFulfillment) && !this._handled) {

        this._handled = true;



        if (this._state === REJECTED && isNode) {

          asyncCall(notifyRejectionHandled, this);

        }

      }



      if (this._state === FULFILLED || this._state === REJECTED) {

        // already resolved, call callback async

        asyncCall(invokeCallback, subscriber);

      } else {

        // subscribe

        this._then.push(subscriber);

      }



      return subscriber.then;

    },

    catch: function _catch(onRejection) {

      return this.then(null, onRejection);

    }

  };



  P.all = function (promises) {

    if (!Array.isArray(promises)) {

      throw new TypeError('You must pass an array to Promise.all().');

    }



    return new P(function (resolve, reject) {

      var results = [];

      var remaining = 0;



      function resolver(index) {

        remaining++;

        return function (value) {

          results[index] = value;



          if (! --remaining) {

            resolve(results);

          }

        };

      }



      for (var i = 0, promise; i < promises.length; i++) {

        promise = promises[i];



        if (promise && typeof promise.then === 'function') {

          promise.then(resolver(i), reject);

        } else {

          results[i] = promise;

        }

      }



      if (!remaining) {

        resolve(results);

      }

    });

  };



  P.race = function (promises) {

    if (!Array.isArray(promises)) {

      throw new TypeError('You must pass an array to Promise.race().');

    }



    return new P(function (resolve, reject) {

      for (var i = 0, promise; i < promises.length; i++) {

        promise = promises[i];



        if (promise && typeof promise.then === 'function') {

          promise.then(resolve, reject);

        } else {

          resolve(promise);

        }

      }

    });

  };



  P.resolve = function (value) {

    if (value && _typeof(value) === 'object' && value.constructor === P) {

      return value;

    }



    return new P(function (resolve) {

      resolve(value);

    });

  };



  P.reject = function (reason) {

    return new P(function (resolve, reject) {

      reject(reason);

    });

  };



  var picked = typeof Promise === 'function' ? Promise : P;



  var d = UNITS_IN_GRID;

  var meaninglessTransform = {

    size: 16,

    x: 0,

    y: 0,

    rotate: 0,

    flipX: false,

    flipY: false

  };



  function isReserved(name) {

    return ~RESERVED_CLASSES.indexOf(name);

  }



  function bunker(fn) {

    try {

      fn();

    } catch (e) {

      if (!PRODUCTION) {

        throw e;

      }

    }

  }

  function insertCss(css) {

    if (!css || !IS_DOM) {

      return;

    }



    var style = DOCUMENT.createElement('style');

    style.setAttribute('type', 'text/css');

    style.innerHTML = css;

    var headChildren = DOCUMENT.head.childNodes;

    var beforeChild = null;



    for (var i = headChildren.length - 1; i > -1; i--) {

      var child = headChildren[i];

      var tagName = (child.tagName || '').toUpperCase();



      if (['STYLE', 'LINK'].indexOf(tagName) > -1) {

        beforeChild = child;

      }

    }



    DOCUMENT.head.insertBefore(style, beforeChild);

    return css;

  }

  var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function nextUniqueId() {

    var size = 12;

    var id = '';



    while (size-- > 0) {

      id += idPool[Math.random() * 62 | 0];

    }



    return id;

  }

  function toArray(obj) {

    var array = [];



    for (var i = (obj || []).length >>> 0; i--;) {

      array[i] = obj[i];

    }



    return array;

  }

  function classArray(node) {

    if (node.classList) {

      return toArray(node.classList);

    } else {

      return (node.getAttribute('class') || '').split(' ').filter(function (i) {

        return i;

      });

    }

  }

  function getIconName(familyPrefix, cls) {

    var parts = cls.split('-');

    var prefix = parts[0];

    var iconName = parts.slice(1).join('-');



    if (prefix === familyPrefix && iconName !== '' && !isReserved(iconName)) {

      return iconName;

    } else {

      return null;

    }

  }

  function htmlEscape(str) {

    return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  }

  function joinAttributes(attributes) {

    return Object.keys(attributes || {}).reduce(function (acc, attributeName) {

      return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");

    }, '').trim();

  }

  function joinStyles(styles) {

    return Object.keys(styles || {}).reduce(function (acc, styleName) {

      return acc + "".concat(styleName, ": ").concat(styles[styleName], ";");

    }, '');

  }

  function transformIsMeaningful(transform) {

    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;

  }

  function transformForSvg(_ref) {

    var transform = _ref.transform,

        containerWidth = _ref.containerWidth,

        iconWidth = _ref.iconWidth;

    var outer = {

      transform: "translate(".concat(containerWidth / 2, " 256)")

    };

    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");

    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");

    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");

    var inner = {

      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)

    };

    var path = {

      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")

    };

    return {

      outer: outer,

      inner: inner,

      path: path

    };

  }

  function transformForCss(_ref2) {

    var transform = _ref2.transform,

        _ref2$width = _ref2.width,

        width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width,

        _ref2$height = _ref2.height,

        height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height,

        _ref2$startCentered = _ref2.startCentered,

        startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;

    var val = '';



    if (startCentered && IS_IE) {

      val += "translate(".concat(transform.x / d - width / 2, "em, ").concat(transform.y / d - height / 2, "em) ");

    } else if (startCentered) {

      val += "translate(calc(-50% + ".concat(transform.x / d, "em), calc(-50% + ").concat(transform.y / d, "em)) ");

    } else {

      val += "translate(".concat(transform.x / d, "em, ").concat(transform.y / d, "em) ");

    }



    val += "scale(".concat(transform.size / d * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d * (transform.flipY ? -1 : 1), ") ");

    val += "rotate(".concat(transform.rotate, "deg) ");

    return val;

  }



  var ALL_SPACE = {

    x: 0,

    y: 0,

    width: '100%',

    height: '100%'

  };

  function makeIconMasking (_ref) {

    var children = _ref.children,

        attributes = _ref.attributes,

        main = _ref.main,

        mask = _ref.mask,

        transform = _ref.transform;

    var mainWidth = main.width,

        mainPath = main.icon;

    var maskWidth = mask.width,

        maskPath = mask.icon;

    var trans = transformForSvg({

      transform: transform,

      containerWidth: maskWidth,

      iconWidth: mainWidth

    });

    var maskRect = {

      tag: 'rect',

      attributes: _objectSpread({}, ALL_SPACE, {

        fill: 'white'

      })

    };

    var maskInnerGroup = {

      tag: 'g',

      attributes: _objectSpread({}, trans.inner),

      children: [{

        tag: 'path',

        attributes: _objectSpread({}, mainPath.attributes, trans.path, {

          fill: 'black'

        })

      }]

    };

    var maskOuterGroup = {

      tag: 'g',

      attributes: _objectSpread({}, trans.outer),

      children: [maskInnerGroup]

    };

    var maskId = "mask-".concat(nextUniqueId());

    var clipId = "clip-".concat(nextUniqueId());

    var maskTag = {

      tag: 'mask',

      attributes: _objectSpread({}, ALL_SPACE, {

        id: maskId,

        maskUnits: 'userSpaceOnUse',

        maskContentUnits: 'userSpaceOnUse'

      }),

      children: [maskRect, maskOuterGroup]

    };

    var defs = {

      tag: 'defs',

      children: [{

        tag: 'clipPath',

        attributes: {

          id: clipId

        },

        children: [maskPath]

      }, maskTag]

    };

    children.push(defs, {

      tag: 'rect',

      attributes: _objectSpread({

        fill: 'currentColor',

        'clip-path': "url(#".concat(clipId, ")"),

        mask: "url(#".concat(maskId, ")")

      }, ALL_SPACE)

    });

    return {

      children: children,

      attributes: attributes

    };

  }



  function makeIconStandard (_ref) {

    var children = _ref.children,

        attributes = _ref.attributes,

        main = _ref.main,

        transform = _ref.transform,

        styles = _ref.styles;

    var styleString = joinStyles(styles);



    if (styleString.length > 0) {

      attributes['style'] = styleString;

    }



    if (transformIsMeaningful(transform)) {

      var trans = transformForSvg({

        transform: transform,

        containerWidth: main.width,

        iconWidth: main.width

      });

      children.push({

        tag: 'g',

        attributes: _objectSpread({}, trans.outer),

        children: [{

          tag: 'g',

          attributes: _objectSpread({}, trans.inner),

          children: [{

            tag: main.icon.tag,

            children: main.icon.children,

            attributes: _objectSpread({}, main.icon.attributes, trans.path)

          }]

        }]

      });

    } else {

      children.push(main.icon);

    }



    return {

      children: children,

      attributes: attributes

    };

  }



  function asIcon (_ref) {

    var children = _ref.children,

        main = _ref.main,

        mask = _ref.mask,

        attributes = _ref.attributes,

        styles = _ref.styles,

        transform = _ref.transform;



    if (transformIsMeaningful(transform) && main.found && !mask.found) {

      var width = main.width,

          height = main.height;

      var offset = {

        x: width / height / 2,

        y: 0.5

      };

      attributes['style'] = joinStyles(_objectSpread({}, styles, {

        'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")

      }));

    }



    return [{

      tag: 'svg',

      attributes: attributes,

      children: children

    }];

  }



  function asSymbol (_ref) {

    var prefix = _ref.prefix,

        iconName = _ref.iconName,

        children = _ref.children,

        attributes = _ref.attributes,

        symbol = _ref.symbol;

    var id = symbol === true ? "".concat(prefix, "-").concat(config.familyPrefix, "-").concat(iconName) : symbol;

    return [{

      tag: 'svg',

      attributes: {

        style: 'display: none;'

      },

      children: [{

        tag: 'symbol',

        attributes: _objectSpread({}, attributes, {

          id: id

        }),

        children: children

      }]

    }];

  }



  function makeInlineSvgAbstract(params) {

    var _params$icons = params.icons,

        main = _params$icons.main,

        mask = _params$icons.mask,

        prefix = params.prefix,

        iconName = params.iconName,

        transform = params.transform,

        symbol = params.symbol,

        title = params.title,

        extra = params.extra,

        _params$watchable = params.watchable,

        watchable = _params$watchable === void 0 ? false : _params$watchable;



    var _ref = mask.found ? mask : main,

        width = _ref.width,

        height = _ref.height;



    var widthClass = "fa-w-".concat(Math.ceil(width / height * 16));

    var attrClass = [config.replacementClass, iconName ? "".concat(config.familyPrefix, "-").concat(iconName) : '', widthClass].filter(function (c) {

      return extra.classes.indexOf(c) === -1;

    }).concat(extra.classes).join(' ');

    var content = {

      children: [],

      attributes: _objectSpread({}, extra.attributes, {

        'data-prefix': prefix,

        'data-icon': iconName,

        'class': attrClass,

        'role': extra.attributes.role || 'img',

        'xmlns': 'http://www.w3.org/2000/svg',

        'viewBox': "0 0 ".concat(width, " ").concat(height)

      })

    };



    if (watchable) {

      content.attributes[DATA_FA_I2SVG] = '';

    }



    if (title) content.children.push({

      tag: 'title',

      attributes: {

        id: content.attributes['aria-labelledby'] || "title-".concat(nextUniqueId())

      },

      children: [title]

    });



    var args = _objectSpread({}, content, {

      prefix: prefix,

      iconName: iconName,

      main: main,

      mask: mask,

      transform: transform,

      symbol: symbol,

      styles: extra.styles

    });



    var _ref2 = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args),

        children = _ref2.children,

        attributes = _ref2.attributes;



    args.children = children;

    args.attributes = attributes;



    if (symbol) {

      return asSymbol(args);

    } else {

      return asIcon(args);

    }

  }

  function makeLayersTextAbstract(params) {

    var content = params.content,

        width = params.width,

        height = params.height,

        transform = params.transform,

        title = params.title,

        extra = params.extra,

        _params$watchable2 = params.watchable,

        watchable = _params$watchable2 === void 0 ? false : _params$watchable2;



    var attributes = _objectSpread({}, extra.attributes, title ? {

      'title': title

    } : {}, {

      'class': extra.classes.join(' ')

    });



    if (watchable) {

      attributes[DATA_FA_I2SVG] = '';

    }



    var styles = _objectSpread({}, extra.styles);



    if (transformIsMeaningful(transform)) {

      styles['transform'] = transformForCss({

        transform: transform,

        startCentered: true,

        width: width,

        height: height

      });

      styles['-webkit-transform'] = styles['transform'];

    }



    var styleString = joinStyles(styles);



    if (styleString.length > 0) {

      attributes['style'] = styleString;

    }



    var val = [];

    val.push({

      tag: 'span',

      attributes: attributes,

      children: [content]

    });



    if (title) {

      val.push({

        tag: 'span',

        attributes: {

          class: 'sr-only'

        },

        children: [title]

      });

    }



    return val;

  }

  function makeLayersCounterAbstract(params) {

    var content = params.content,

        title = params.title,

        extra = params.extra;



    var attributes = _objectSpread({}, extra.attributes, title ? {

      'title': title

    } : {}, {

      'class': extra.classes.join(' ')

    });



    var styleString = joinStyles(extra.styles);



    if (styleString.length > 0) {

      attributes['style'] = styleString;

    }



    var val = [];

    val.push({

      tag: 'span',

      attributes: attributes,

      children: [content]

    });



    if (title) {

      val.push({

        tag: 'span',

        attributes: {

          class: 'sr-only'

        },

        children: [title]

      });

    }



    return val;

  }



  var noop$1 = function noop() {};



  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {

    mark: noop$1,

    measure: noop$1

  };

  var preamble = "FA \"5.9.0\"";



  var begin = function begin(name) {

    p.mark("".concat(preamble, " ").concat(name, " begins"));

    return function () {

      return end(name);

    };

  };



  var end = function end(name) {

    p.mark("".concat(preamble, " ").concat(name, " ends"));

    p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));

  };



  var perf = {

    begin: begin,

    end: end

  };



  /**

   * Internal helper to bind a function known to have 4 arguments

   * to a given context.

   */



  var bindInternal4 = function bindInternal4(func, thisContext) {

    return function (a, b, c, d) {

      return func.call(thisContext, a, b, c, d);

    };

  };



  /**

   * # Reduce

   *

   * A fast object `.reduce()` implementation.

   *

   * @param  {Object}   subject      The object to reduce over.

   * @param  {Function} fn           The reducer function.

   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].

   * @param  {Object}   thisContext  The context for the reducer.

   * @return {mixed}                 The final result.

   */





  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {

    var keys = Object.keys(subject),

        length = keys.length,

        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,

        i,

        key,

        result;



    if (initialValue === undefined) {

      i = 1;

      result = subject[keys[0]];

    } else {

      i = 0;

      result = initialValue;

    }



    for (; i < length; i++) {

      key = keys[i];

      result = iterator(result, subject[key], key, subject);

    }



    return result;

  };



  function toHex(unicode) {

    var result = '';



    for (var i = 0; i < unicode.length; i++) {

      var hex = unicode.charCodeAt(i).toString(16);

      result += ('000' + hex).slice(-4);

    }



    return result;

  }



  function defineIcons(prefix, icons) {

    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _params$skipHooks = params.skipHooks,

        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;

    var normalized = Object.keys(icons).reduce(function (acc, iconName) {

      var icon = icons[iconName];

      var expanded = !!icon.icon;



      if (expanded) {

        acc[icon.iconName] = icon.icon;

      } else {

        acc[iconName] = icon;

      }



      return acc;

    }, {});



    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {

      namespace.hooks.addPack(prefix, normalized);

    } else {

      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);

    }

    /**

     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction

     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias

     * for `fas` so we'll easy the upgrade process for our users by automatically defining

     * this as well.

     */





    if (prefix === 'fas') {

      defineIcons('fa', icons);

    }

  }



  var styles = namespace.styles,

      shims = namespace.shims;

  var _byUnicode = {};

  var _byLigature = {};

  var _byOldName = {};

  var build = function build() {

    var lookup = function lookup(reducer) {

      return reduce(styles, function (o, style, prefix) {

        o[prefix] = reduce(style, reducer, {});

        return o;

      }, {});

    };



    _byUnicode = lookup(function (acc, icon, iconName) {

      if (icon[3]) {

        acc[icon[3]] = iconName;

      }



      return acc;

    });

    _byLigature = lookup(function (acc, icon, iconName) {

      var ligatures = icon[2];

      acc[iconName] = iconName;

      ligatures.forEach(function (ligature) {

        acc[ligature] = iconName;

      });

      return acc;

    });

    var hasRegular = 'far' in styles;

    _byOldName = reduce(shims, function (acc, shim) {

      var oldName = shim[0];

      var prefix = shim[1];

      var iconName = shim[2];



      if (prefix === 'far' && !hasRegular) {

        prefix = 'fas';

      }



      acc[oldName] = {

        prefix: prefix,

        iconName: iconName

      };

      return acc;

    }, {});

  };

  build();

  function byUnicode(prefix, unicode) {

    return (_byUnicode[prefix] || {})[unicode];

  }

  function byLigature(prefix, ligature) {

    return (_byLigature[prefix] || {})[ligature];

  }

  function byOldName(name) {

    return _byOldName[name] || {

      prefix: null,

      iconName: null

    };

  }



  var styles$1 = namespace.styles;

  var emptyCanonicalIcon = function emptyCanonicalIcon() {

    return {

      prefix: null,

      iconName: null,

      rest: []

    };

  };

  function getCanonicalIcon(values) {

    return values.reduce(function (acc, cls) {

      var iconName = getIconName(config.familyPrefix, cls);



      if (styles$1[cls]) {

        acc.prefix = cls;

      } else if (config.autoFetchSvg && ['fas', 'far', 'fal', 'fab', 'fa'].indexOf(cls) > -1) {

        acc.prefix = cls;

      } else if (iconName) {

        var shim = acc.prefix === 'fa' ? byOldName(iconName) : {};

        acc.iconName = shim.iconName || iconName;

        acc.prefix = shim.prefix || acc.prefix;

      } else if (cls !== config.replacementClass && cls.indexOf('fa-w-') !== 0) {

        acc.rest.push(cls);

      }



      return acc;

    }, emptyCanonicalIcon());

  }

  function iconFromMapping(mapping, prefix, iconName) {

    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {

      return {

        prefix: prefix,

        iconName: iconName,

        icon: mapping[prefix][iconName]

      };

    }

  }



  function toHtml(abstractNodes) {

    var tag = abstractNodes.tag,

        _abstractNodes$attrib = abstractNodes.attributes,

        attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,

        _abstractNodes$childr = abstractNodes.children,

        children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;



    if (typeof abstractNodes === 'string') {

      return htmlEscape(abstractNodes);

    } else {

      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");

    }

  }



  var noop$2 = function noop() {};



  function isWatched(node) {

    var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;

    return typeof i2svg === 'string';

  }



  function getMutator() {

    if (config.autoReplaceSvg === true) {

      return mutators.replace;

    }



    var mutator = mutators[config.autoReplaceSvg];

    return mutator || mutators.replace;

  }



  var mutators = {

    replace: function replace(mutation) {

      var node = mutation[0];

      var abstract = mutation[1];

      var newOuterHTML = abstract.map(function (a) {

        return toHtml(a);

      }).join('\n');



      if (node.parentNode && node.outerHTML) {

        node.outerHTML = newOuterHTML + (config.keepOriginalSource && node.tagName.toLowerCase() !== 'svg' ? "<!-- ".concat(node.outerHTML, " -->") : '');

      } else if (node.parentNode) {

        var newNode = document.createElement('span');

        node.parentNode.replaceChild(newNode, node);

        newNode.outerHTML = newOuterHTML;

      }

    },

    nest: function nest(mutation) {

      var node = mutation[0];

      var abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.

      // Short-circuit to the standard replacement



      if (~classArray(node).indexOf(config.replacementClass)) {

        return mutators.replace(mutation);

      }



      var forSvg = new RegExp("".concat(config.familyPrefix, "-.*"));

      delete abstract[0].attributes.style;

      var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {

        if (cls === config.replacementClass || cls.match(forSvg)) {

          acc.toSvg.push(cls);

        } else {

          acc.toNode.push(cls);

        }



        return acc;

      }, {

        toNode: [],

        toSvg: []

      });

      abstract[0].attributes.class = splitClasses.toSvg.join(' ');

      var newInnerHTML = abstract.map(function (a) {

        return toHtml(a);

      }).join('\n');

      node.setAttribute('class', splitClasses.toNode.join(' '));

      node.setAttribute(DATA_FA_I2SVG, '');

      node.innerHTML = newInnerHTML;

    }

  };



  function performOperationSync(op) {

    op();

  }



  function perform(mutations, callback) {

    var callbackFunction = typeof callback === 'function' ? callback : noop$2;



    if (mutations.length === 0) {

      callbackFunction();

    } else {

      var frame = performOperationSync;



      if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {

        frame = WINDOW.requestAnimationFrame || performOperationSync;

      }



      frame(function () {

        var mutator = getMutator();

        var mark = perf.begin('mutate');

        mutations.map(mutator);

        mark();

        callbackFunction();

      });

    }

  }

  var disabled = false;

  function disableObservation() {

    disabled = true;

  }

  function enableObservation() {

    disabled = false;

  }

  var mo = null;

  function observe(options) {

    if (!MUTATION_OBSERVER) {

      return;

    }



    if (!config.observeMutations) {

      return;

    }



    var treeCallback = options.treeCallback,

        nodeCallback = options.nodeCallback,

        pseudoElementsCallback = options.pseudoElementsCallback,

        _options$observeMutat = options.observeMutationsRoot,

        observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;

    mo = new MUTATION_OBSERVER(function (objects) {

      if (disabled) return;

      toArray(objects).forEach(function (mutationRecord) {

        if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {

          if (config.searchPseudoElements) {

            pseudoElementsCallback(mutationRecord.target);

          }



          treeCallback(mutationRecord.target);

        }



        if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {

          pseudoElementsCallback(mutationRecord.target.parentNode);

        }



        if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {

          if (mutationRecord.attributeName === 'class') {

            var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),

                prefix = _getCanonicalIcon.prefix,

                iconName = _getCanonicalIcon.iconName;



            if (prefix) mutationRecord.target.setAttribute('data-prefix', prefix);

            if (iconName) mutationRecord.target.setAttribute('data-icon', iconName);

          } else {

            nodeCallback(mutationRecord.target);

          }

        }

      });

    });

    if (!IS_DOM) return;

    mo.observe(observeMutationsRoot, {

      childList: true,

      attributes: true,

      characterData: true,

      subtree: true

    });

  }

  function disconnect() {

    if (!mo) return;

    mo.disconnect();

  }



  function styleParser (node) {

    var style = node.getAttribute('style');

    var val = [];



    if (style) {

      val = style.split(';').reduce(function (acc, style) {

        var styles = style.split(':');

        var prop = styles[0];

        var value = styles.slice(1);



        if (prop && value.length > 0) {

          acc[prop] = value.join(':').trim();

        }



        return acc;

      }, {});

    }



    return val;

  }



  function classParser (node) {

    var existingPrefix = node.getAttribute('data-prefix');

    var existingIconName = node.getAttribute('data-icon');

    var innerText = node.innerText !== undefined ? node.innerText.trim() : '';

    var val = getCanonicalIcon(classArray(node));



    if (existingPrefix && existingIconName) {

      val.prefix = existingPrefix;

      val.iconName = existingIconName;

    }



    if (val.prefix && innerText.length > 1) {

      val.iconName = byLigature(val.prefix, node.innerText);

    } else if (val.prefix && innerText.length === 1) {

      val.iconName = byUnicode(val.prefix, toHex(node.innerText));

    }



    return val;

  }



  var parseTransformString = function parseTransformString(transformString) {

    var transform = {

      size: 16,

      x: 0,

      y: 0,

      flipX: false,

      flipY: false,

      rotate: 0

    };



    if (!transformString) {

      return transform;

    } else {

      return transformString.toLowerCase().split(' ').reduce(function (acc, n) {

        var parts = n.toLowerCase().split('-');

        var first = parts[0];

        var rest = parts.slice(1).join('-');



        if (first && rest === 'h') {

          acc.flipX = true;

          return acc;

        }



        if (first && rest === 'v') {

          acc.flipY = true;

          return acc;

        }



        rest = parseFloat(rest);



        if (isNaN(rest)) {

          return acc;

        }



        switch (first) {

          case 'grow':

            acc.size = acc.size + rest;

            break;



          case 'shrink':

            acc.size = acc.size - rest;

            break;



          case 'left':

            acc.x = acc.x - rest;

            break;



          case 'right':

            acc.x = acc.x + rest;

            break;



          case 'up':

            acc.y = acc.y - rest;

            break;



          case 'down':

            acc.y = acc.y + rest;

            break;



          case 'rotate':

            acc.rotate = acc.rotate + rest;

            break;

        }



        return acc;

      }, transform);

    }

  };

  function transformParser (node) {

    return parseTransformString(node.getAttribute('data-fa-transform'));

  }



  function symbolParser (node) {

    var symbol = node.getAttribute('data-fa-symbol');

    return symbol === null ? false : symbol === '' ? true : symbol;

  }



  function attributesParser (node) {

    var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {

      if (acc.name !== 'class' && acc.name !== 'style') {

        acc[attr.name] = attr.value;

      }



      return acc;

    }, {});

    var title = node.getAttribute('title');



    if (config.autoA11y) {

      if (title) {

        extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(nextUniqueId());

      } else {

        extraAttributes['aria-hidden'] = 'true';

        extraAttributes['focusable'] = 'false';

      }

    }



    return extraAttributes;

  }



  function maskParser (node) {

    var mask = node.getAttribute('data-fa-mask');



    if (!mask) {

      return emptyCanonicalIcon();

    } else {

      return getCanonicalIcon(mask.split(' ').map(function (i) {

        return i.trim();

      }));

    }

  }



  function blankMeta() {

    return {

      iconName: null,

      title: null,

      prefix: null,

      transform: meaninglessTransform,

      symbol: false,

      mask: null,

      extra: {

        classes: [],

        styles: {},

        attributes: {}

      }

    };

  }

  function parseMeta(node) {

    var _classParser = classParser(node),

        iconName = _classParser.iconName,

        prefix = _classParser.prefix,

        extraClasses = _classParser.rest;



    var extraStyles = styleParser(node);

    var transform = transformParser(node);

    var symbol = symbolParser(node);

    var extraAttributes = attributesParser(node);

    var mask = maskParser(node);

    return {

      iconName: iconName,

      title: node.getAttribute('title'),

      prefix: prefix,

      transform: transform,

      symbol: symbol,

      mask: mask,

      extra: {

        classes: extraClasses,

        styles: extraStyles,

        attributes: extraAttributes

      }

    };

  }



  function MissingIcon(error) {

    this.name = 'MissingIcon';

    this.message = error || 'Icon unavailable';

    this.stack = new Error().stack;

  }

  MissingIcon.prototype = Object.create(Error.prototype);

  MissingIcon.prototype.constructor = MissingIcon;



  var FILL = {

    fill: 'currentColor'

  };

  var ANIMATION_BASE = {

    attributeType: 'XML',

    repeatCount: 'indefinite',

    dur: '2s'

  };

  var RING = {

    tag: 'path',

    attributes: _objectSpread({}, FILL, {

      d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'

    })

  };



  var OPACITY_ANIMATE = _objectSpread({}, ANIMATION_BASE, {

    attributeName: 'opacity'

  });



  var DOT = {

    tag: 'circle',

    attributes: _objectSpread({}, FILL, {

      cx: '256',

      cy: '364',

      r: '28'

    }),

    children: [{

      tag: 'animate',

      attributes: _objectSpread({}, ANIMATION_BASE, {

        attributeName: 'r',

        values: '28;14;28;28;14;28;'

      })

    }, {

      tag: 'animate',

      attributes: _objectSpread({}, OPACITY_ANIMATE, {

        values: '1;0;1;1;0;1;'

      })

    }]

  };

  var QUESTION = {

    tag: 'path',

    attributes: _objectSpread({}, FILL, {

      opacity: '1',

      d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'

    }),

    children: [{

      tag: 'animate',

      attributes: _objectSpread({}, OPACITY_ANIMATE, {

        values: '1;0;0;0;0;1;'

      })

    }]

  };

  var EXCLAMATION = {

    tag: 'path',

    attributes: _objectSpread({}, FILL, {

      opacity: '0',

      d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'

    }),

    children: [{

      tag: 'animate',

      attributes: _objectSpread({}, OPACITY_ANIMATE, {

        values: '0;0;1;1;0;0;'

      })

    }]

  };

  var missing = {

    tag: 'g',

    children: [RING, DOT, QUESTION, EXCLAMATION]

  };



  var styles$2 = namespace.styles;

  function findIcon(iconName, prefix) {

    return new picked(function (resolve, reject) {

      var val = {

        found: false,

        width: 512,

        height: 512,

        icon: missing

      };



      if (iconName && prefix && styles$2[prefix] && styles$2[prefix][iconName]) {

        var icon = styles$2[prefix][iconName];

        var width = icon[0];

        var height = icon[1];

        var vectorData = icon.slice(4);

        val = {

          found: true,

          width: width,

          height: height,

          icon: {

            tag: 'path',

            attributes: {

              fill: 'currentColor',

              d: vectorData[0]

            }

          }

        };

        return resolve(val);

      }



      if (iconName && prefix && !config.showMissingIcons) {

        reject(new MissingIcon("Icon is missing for prefix ".concat(prefix, " with icon name ").concat(iconName)));

      } else {

        resolve(val);

      }

    });

  }



  var styles$3 = namespace.styles;



  function generateSvgReplacementMutation(node, nodeMeta) {

    var iconName = nodeMeta.iconName,

        title = nodeMeta.title,

        prefix = nodeMeta.prefix,

        transform = nodeMeta.transform,

        symbol = nodeMeta.symbol,

        mask = nodeMeta.mask,

        extra = nodeMeta.extra;

    return new picked(function (resolve, reject) {

      picked.all([findIcon(iconName, prefix), findIcon(mask.iconName, mask.prefix)]).then(function (_ref) {

        var _ref2 = _slicedToArray(_ref, 2),

            main = _ref2[0],

            mask = _ref2[1];



        resolve([node, makeInlineSvgAbstract({

          icons: {

            main: main,

            mask: mask

          },

          prefix: prefix,

          iconName: iconName,

          transform: transform,

          symbol: symbol,

          mask: mask,

          title: title,

          extra: extra,

          watchable: true

        })]);

      });

    });

  }



  function generateLayersText(node, nodeMeta) {

    var title = nodeMeta.title,

        transform = nodeMeta.transform,

        extra = nodeMeta.extra;

    var width = null;

    var height = null;



    if (IS_IE) {

      var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);

      var boundingClientRect = node.getBoundingClientRect();

      width = boundingClientRect.width / computedFontSize;

      height = boundingClientRect.height / computedFontSize;

    }



    if (config.autoA11y && !title) {

      extra.attributes['aria-hidden'] = 'true';

    }



    return picked.resolve([node, makeLayersTextAbstract({

      content: node.innerHTML,

      width: width,

      height: height,

      transform: transform,

      title: title,

      extra: extra,

      watchable: true

    })]);

  }



  function generateMutation(node) {

    var nodeMeta = parseMeta(node);



    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {

      return generateLayersText(node, nodeMeta);

    } else {

      return generateSvgReplacementMutation(node, nodeMeta);

    }

  }



  function onTree(root) {

    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!IS_DOM) return;

    var htmlClassList = DOCUMENT.documentElement.classList;



    var hclAdd = function hclAdd(suffix) {

      return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));

    };



    var hclRemove = function hclRemove(suffix) {

      return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));

    };



    var prefixes = config.autoFetchSvg ? Object.keys(PREFIX_TO_STYLE) : Object.keys(styles$3);

    var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(function (p) {

      return ".".concat(p, ":not([").concat(DATA_FA_I2SVG, "])");

    })).join(', ');



    if (prefixesDomQuery.length === 0) {

      return;

    }



    var candidates = [];



    try {

      candidates = toArray(root.querySelectorAll(prefixesDomQuery));

    } catch (e) {// noop

    }



    if (candidates.length > 0) {

      hclAdd('pending');

      hclRemove('complete');

    } else {

      return;

    }



    var mark = perf.begin('onTree');

    var mutations = candidates.reduce(function (acc, node) {

      try {

        var mutation = generateMutation(node);



        if (mutation) {

          acc.push(mutation);

        }

      } catch (e) {

        if (!PRODUCTION) {

          if (e instanceof MissingIcon) {

            console.error(e);

          }

        }

      }



      return acc;

    }, []);

    return new picked(function (resolve, reject) {

      picked.all(mutations).then(function (resolvedMutations) {

        perform(resolvedMutations, function () {

          hclAdd('active');

          hclAdd('complete');

          hclRemove('pending');

          if (typeof callback === 'function') callback();

          mark();

          resolve();

        });

      }).catch(function () {

        mark();

        reject();

      });

    });

  }

  function onNode(node) {

    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    generateMutation(node).then(function (mutation) {

      if (mutation) {

        perform([mutation], callback);

      }

    });

  }



  function replaceForPosition(node, position) {

    var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));

    return new picked(function (resolve, reject) {

      if (node.getAttribute(pendingAttribute) !== null) {

        // This node is already being processed

        return resolve();

      }



      var children = toArray(node.children);

      var alreadyProcessedPseudoElement = children.filter(function (c) {

        return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;

      })[0];

      var styles = WINDOW.getComputedStyle(node, position);

      var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);

      var fontWeight = styles.getPropertyValue('font-weight');



      if (alreadyProcessedPseudoElement && !fontFamily) {

        // If we've already processed it but the current computed style does not result in a font-family,

        // that probably means that a class name that was previously present to make the icon has been

        // removed. So we now should delete the icon.

        node.removeChild(alreadyProcessedPseudoElement);

        return resolve();

      } else if (fontFamily) {

        var content = styles.getPropertyValue('content');

        var prefix = ~['Light', 'Regular', 'Solid', 'Brands'].indexOf(fontFamily[1]) ? STYLE_TO_PREFIX[fontFamily[1].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[fontWeight];

        var hexValue = toHex(content.length === 3 ? content.substr(1, 1) : content);

        var iconName = byUnicode(prefix, hexValue);

        var iconIdentifier = iconName; // Only convert the pseudo element in this :before/:after position into an icon if we haven't

        // already done so with the same prefix and iconName



        if (iconName && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {

          node.setAttribute(pendingAttribute, iconIdentifier);



          if (alreadyProcessedPseudoElement) {

            // Delete the old one, since we're replacing it with a new one

            node.removeChild(alreadyProcessedPseudoElement);

          }



          var meta = blankMeta();

          var extra = meta.extra;

          extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;

          findIcon(iconName, prefix).then(function (main) {

            var abstract = makeInlineSvgAbstract(_objectSpread({}, meta, {

              icons: {

                main: main,

                mask: emptyCanonicalIcon()

              },

              prefix: prefix,

              iconName: iconIdentifier,

              extra: extra,

              watchable: true

            }));

            var element = DOCUMENT.createElement('svg');



            if (position === ':before') {

              node.insertBefore(element, node.firstChild);

            } else {

              node.appendChild(element);

            }



            element.outerHTML = abstract.map(function (a) {

              return toHtml(a);

            }).join('\n');

            node.removeAttribute(pendingAttribute);

            resolve();

          }).catch(reject);

        } else {

          resolve();

        }

      } else {

        resolve();

      }

    });

  }



  function replace(node) {

    return picked.all([replaceForPosition(node, ':before'), replaceForPosition(node, ':after')]);

  }



  function processable(node) {

    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');

  }



  function searchPseudoElements (root) {

    if (!IS_DOM) return;

    return new picked(function (resolve, reject) {

      var operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);

      var end = perf.begin('searchPseudoElements');

      disableObservation();

      picked.all(operations).then(function () {

        end();

        enableObservation();

        resolve();

      }).catch(function () {

        end();

        enableObservation();

        reject();

      });

    });

  }



  var baseStyles = "svg:not(:root).svg-inline--fa{overflow:visible}.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-lg{vertical-align:-.225em}.svg-inline--fa.fa-w-1{width:.0625em}.svg-inline--fa.fa-w-2{width:.125em}.svg-inline--fa.fa-w-3{width:.1875em}.svg-inline--fa.fa-w-4{width:.25em}.svg-inline--fa.fa-w-5{width:.3125em}.svg-inline--fa.fa-w-6{width:.375em}.svg-inline--fa.fa-w-7{width:.4375em}.svg-inline--fa.fa-w-8{width:.5em}.svg-inline--fa.fa-w-9{width:.5625em}.svg-inline--fa.fa-w-10{width:.625em}.svg-inline--fa.fa-w-11{width:.6875em}.svg-inline--fa.fa-w-12{width:.75em}.svg-inline--fa.fa-w-13{width:.8125em}.svg-inline--fa.fa-w-14{width:.875em}.svg-inline--fa.fa-w-15{width:.9375em}.svg-inline--fa.fa-w-16{width:1em}.svg-inline--fa.fa-w-17{width:1.0625em}.svg-inline--fa.fa-w-18{width:1.125em}.svg-inline--fa.fa-w-19{width:1.1875em}.svg-inline--fa.fa-w-20{width:1.25em}.svg-inline--fa.fa-pull-left{margin-right:.3em;width:auto}.svg-inline--fa.fa-pull-right{margin-left:.3em;width:auto}.svg-inline--fa.fa-border{height:1.5em}.svg-inline--fa.fa-li{width:2em}.svg-inline--fa.fa-fw{width:1.25em}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers-text{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter{background-color:#ff253a;border-radius:1em;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;height:1.5em;line-height:1;max-width:5em;min-width:1.5em;overflow:hidden;padding:.25em;right:0;text-overflow:ellipsis;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-bottom-right{bottom:0;right:0;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom right;transform-origin:bottom right}.fa-layers-bottom-left{bottom:0;left:0;right:auto;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom left;transform-origin:bottom left}.fa-layers-top-right{right:0;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-top-left{left:0;right:auto;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top left;transform-origin:top left}.fa-lg{font-size:1.3333333333em;line-height:.75em;vertical-align:-.0667em}.fa-xs{font-size:.75em}.fa-sm{font-size:.875em}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:2.5em;padding-left:0}.fa-ul>li{position:relative}.fa-li{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.fa-border{border:solid .08em #eee;border-radius:.1em;padding:.2em .25em .15em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left,.fab.fa-pull-left,.fal.fa-pull-left,.far.fa-pull-left,.fas.fa-pull-left{margin-right:.3em}.fa.fa-pull-right,.fab.fa-pull-right,.fal.fa-pull-right,.far.fa-pull-right,.fas.fa-pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1,-1)}:root .fa-flip-both,:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{display:inline-block;height:2em;position:relative;width:2.5em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.svg-inline--fa.fa-stack-1x{height:1em;width:1.25em}.svg-inline--fa.fa-stack-2x{height:2em;width:2.5em}.fa-inverse{color:#fff}.sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable:active,.sr-only-focusable:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}";



  function css () {

    var dfp = DEFAULT_FAMILY_PREFIX;

    var drc = DEFAULT_REPLACEMENT_CLASS;

    var fp = config.familyPrefix;

    var rc = config.replacementClass;

    var s = baseStyles;



    if (fp !== dfp || rc !== drc) {

      var dPatt = new RegExp("\\.".concat(dfp, "\\-"), 'g');

      var rPatt = new RegExp("\\.".concat(drc), 'g');

      s = s.replace(dPatt, ".".concat(fp, "-")).replace(rPatt, ".".concat(rc));

    }



    return s;

  }



  var Library =

  /*#__PURE__*/

  function () {

    function Library() {

      _classCallCheck(this, Library);



      this.definitions = {};

    }



    _createClass(Library, [{

      key: "add",

      value: function add() {

        var _this = this;



        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {

          definitions[_key] = arguments[_key];

        }



        var additions = definitions.reduce(this._pullDefinitions, {});

        Object.keys(additions).forEach(function (key) {

          _this.definitions[key] = _objectSpread({}, _this.definitions[key] || {}, additions[key]);

          defineIcons(key, additions[key]);

          build();

        });

      }

    }, {

      key: "reset",

      value: function reset() {

        this.definitions = {};

      }

    }, {

      key: "_pullDefinitions",

      value: function _pullDefinitions(additions, definition) {

        var normalized = definition.prefix && definition.iconName && definition.icon ? {

          0: definition

        } : definition;

        Object.keys(normalized).map(function (key) {

          var _normalized$key = normalized[key],

              prefix = _normalized$key.prefix,

              iconName = _normalized$key.iconName,

              icon = _normalized$key.icon;

          if (!additions[prefix]) additions[prefix] = {};

          additions[prefix][iconName] = icon;

        });

        return additions;

      }

    }]);



    return Library;

  }();



  function prepIcon(icon) {

    var width = icon[0];

    var height = icon[1];

    var vectorData = icon.slice(4);

    return {

      found: true,

      width: width,

      height: height,

      icon: {

        tag: 'path',

        attributes: {

          fill: 'currentColor',

          d: vectorData[0]

        }

      }

    };

  }



  function ensureCss() {

    if (config.autoAddCss && !_cssInserted) {

      insertCss(css());



      _cssInserted = true;

    }

  }



  function apiObject(val, abstractCreator) {

    Object.defineProperty(val, 'abstract', {

      get: abstractCreator

    });

    Object.defineProperty(val, 'html', {

      get: function get() {

        return val.abstract.map(function (a) {

          return toHtml(a);

        });

      }

    });

    Object.defineProperty(val, 'node', {

      get: function get() {

        if (!IS_DOM) return;

        var container = DOCUMENT.createElement('div');

        container.innerHTML = val.html;

        return container.children;

      }

    });

    return val;

  }



  function findIconDefinition(iconLookup) {

    var _iconLookup$prefix = iconLookup.prefix,

        prefix = _iconLookup$prefix === void 0 ? 'fa' : _iconLookup$prefix,

        iconName = iconLookup.iconName;

    if (!iconName) return;

    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);

  }



  function resolveIcons(next) {

    return function (maybeIconDefinition) {

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});

      var mask = params.mask;



      if (mask) {

        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});

      }



      return next(iconDefinition, _objectSpread({}, params, {

        mask: mask

      }));

    };

  }



  var library = new Library();

  var noAuto = function noAuto() {

    config.autoReplaceSvg = false;

    config.observeMutations = false;

    disconnect();

  };

  var _cssInserted = false;

  var dom = {

    i2svg: function i2svg() {

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};



      if (IS_DOM) {

        ensureCss();

        var _params$node = params.node,

            node = _params$node === void 0 ? DOCUMENT : _params$node,

            _params$callback = params.callback,

            callback = _params$callback === void 0 ? function () {} : _params$callback;



        if (config.searchPseudoElements) {

          searchPseudoElements(node);

        }



        return onTree(node, callback);

      } else {

        return picked.reject('Operation requires a DOM of some kind.');

      }

    },

    css: css,

    insertCss: function insertCss$$1() {

      if (!_cssInserted) {

        insertCss(css());



        _cssInserted = true;

      }

    },

    watch: function watch() {

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var autoReplaceSvgRoot = params.autoReplaceSvgRoot,

          observeMutationsRoot = params.observeMutationsRoot;



      if (config.autoReplaceSvg === false) {

        config.autoReplaceSvg = true;

      }



      config.observeMutations = true;

      domready(function () {

        autoReplace({

          autoReplaceSvgRoot: autoReplaceSvgRoot

        });

        observe({

          treeCallback: onTree,

          nodeCallback: onNode,

          pseudoElementsCallback: searchPseudoElements,

          observeMutationsRoot: observeMutationsRoot

        });

      });

    }

  };

  var parse = {

    transform: function transform(transformString) {

      return parseTransformString(transformString);

    }

  };

  var icon = resolveIcons(function (iconDefinition) {

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _params$transform = params.transform,

        transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,

        _params$symbol = params.symbol,

        symbol = _params$symbol === void 0 ? false : _params$symbol,

        _params$mask = params.mask,

        mask = _params$mask === void 0 ? null : _params$mask,

        _params$title = params.title,

        title = _params$title === void 0 ? null : _params$title,

        _params$classes = params.classes,

        classes = _params$classes === void 0 ? [] : _params$classes,

        _params$attributes = params.attributes,

        attributes = _params$attributes === void 0 ? {} : _params$attributes,

        _params$styles = params.styles,

        styles = _params$styles === void 0 ? {} : _params$styles;

    if (!iconDefinition) return;

    var prefix = iconDefinition.prefix,

        iconName = iconDefinition.iconName,

        icon = iconDefinition.icon;

    return apiObject(_objectSpread({

      type: 'icon'

    }, iconDefinition), function () {

      ensureCss();



      if (config.autoA11y) {

        if (title) {

          attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(nextUniqueId());

        } else {

          attributes['aria-hidden'] = 'true';

          attributes['focusable'] = 'false';

        }

      }



      return makeInlineSvgAbstract({

        icons: {

          main: prepIcon(icon),

          mask: mask ? prepIcon(mask.icon) : {

            found: false,

            width: null,

            height: null,

            icon: {}

          }

        },

        prefix: prefix,

        iconName: iconName,

        transform: _objectSpread({}, meaninglessTransform, transform),

        symbol: symbol,

        title: title,

        extra: {

          attributes: attributes,

          styles: styles,

          classes: classes

        }

      });

    });

  });

  var text = function text(content) {

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _params$transform2 = params.transform,

        transform = _params$transform2 === void 0 ? meaninglessTransform : _params$transform2,

        _params$title2 = params.title,

        title = _params$title2 === void 0 ? null : _params$title2,

        _params$classes2 = params.classes,

        classes = _params$classes2 === void 0 ? [] : _params$classes2,

        _params$attributes2 = params.attributes,

        attributes = _params$attributes2 === void 0 ? {} : _params$attributes2,

        _params$styles2 = params.styles,

        styles = _params$styles2 === void 0 ? {} : _params$styles2;

    return apiObject({

      type: 'text',

      content: content

    }, function () {

      ensureCss();

      return makeLayersTextAbstract({

        content: content,

        transform: _objectSpread({}, meaninglessTransform, transform),

        title: title,

        extra: {

          attributes: attributes,

          styles: styles,

          classes: ["".concat(config.familyPrefix, "-layers-text")].concat(_toConsumableArray(classes))

        }

      });

    });

  };

  var counter = function counter(content) {

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _params$title3 = params.title,

        title = _params$title3 === void 0 ? null : _params$title3,

        _params$classes3 = params.classes,

        classes = _params$classes3 === void 0 ? [] : _params$classes3,

        _params$attributes3 = params.attributes,

        attributes = _params$attributes3 === void 0 ? {} : _params$attributes3,

        _params$styles3 = params.styles,

        styles = _params$styles3 === void 0 ? {} : _params$styles3;

    return apiObject({

      type: 'counter',

      content: content

    }, function () {

      ensureCss();

      return makeLayersCounterAbstract({

        content: content.toString(),

        title: title,

        extra: {

          attributes: attributes,

          styles: styles,

          classes: ["".concat(config.familyPrefix, "-layers-counter")].concat(_toConsumableArray(classes))

        }

      });

    });

  };

  var layer = function layer(assembler) {

    return apiObject({

      type: 'layer'

    }, function () {

      ensureCss();

      var children = [];

      assembler(function (args) {

        Array.isArray(args) ? args.map(function (a) {

          children = children.concat(a.abstract);

        }) : children = children.concat(args.abstract);

      });

      return [{

        tag: 'span',

        attributes: {

          class: "".concat(config.familyPrefix, "-layers")

        },

        children: children

      }];

    });

  };

  var api = {

    noAuto: noAuto,

    config: config,

    dom: dom,

    library: library,

    parse: parse,

    findIconDefinition: findIconDefinition,

    icon: icon,

    text: text,

    counter: counter,

    layer: layer,

    toHtml: toHtml

  };



  var autoReplace = function autoReplace() {

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _params$autoReplaceSv = params.autoReplaceSvgRoot,

        autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;

    if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({

      node: autoReplaceSvgRoot

    });

  };



  function bootstrap() {

    if (IS_BROWSER) {

      if (!WINDOW.FontAwesome) {

        WINDOW.FontAwesome = api;

      }



      domready(function () {

        autoReplace();

        observe({

          treeCallback: onTree,

          nodeCallback: onNode,

          pseudoElementsCallback: searchPseudoElements

        });

      });

    }



    namespace.hooks = _objectSpread({}, namespace.hooks, {

      addPack: function addPack(prefix, icons) {

        namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, icons);

        build();

        autoReplace();

      },

      addShims: function addShims(shims) {

        var _namespace$shims;



        (_namespace$shims = namespace.shims).push.apply(_namespace$shims, _toConsumableArray(shims));



        build();

        autoReplace();

      }

    });

  }



  bunker(bootstrap);



}());
