(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     jsnautic.spec.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

var Navbar = function () {
  function Navbar() {
    _classCallCheck(this, Navbar);
  }

  _createClass(Navbar, null, [{
    key: 'init',
    value: function init() {
      var navbarElement = document.querySelector('.menu__btn');
      navbarElement.addEventListener('click', Navbar.setDropdown, false);
    }
  }, {
    key: 'setDropdown',
    value: function setDropdown() {
      var btn = document.querySelector('.menu__btn'),
          list = document.querySelector('.menu__list');
      btn.classList.add('menu__btn_blink');
      list.classList.toggle('menu__drapdown');
      setTimeout(function () {
        btn.classList.remove('menu__btn_blink');
      }, 300);
    }
  }]);

  return Navbar;
}();

exports.default = Navbar;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     sidebar.js for Jetro project
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     Created by Andrii Sorokin on 4/23/17
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     https://github.com/ignorantic/jetro.git
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _yiiAjax = require('yii-ajax');

var _yiiAjax2 = _interopRequireDefault(_yiiAjax);

var _htmlHelper = require('html-helper');

var _htmlHelper2 = _interopRequireDefault(_htmlHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sidebar = function () {
  function Sidebar() {
    _classCallCheck(this, Sidebar);
  }

  _createClass(Sidebar, null, [{
    key: 'init',
    value: function init() {
      Sidebar.top = -1000;
      Sidebar.left = 0;
      Sidebar.display = 'none';
      Sidebar.createBoxDiv();
      Sidebar.addEventListenerToBoxDiv();
      Sidebar.addEventListenerToLinks();
      Sidebar.addEventListenerToLinkList();
    }
  }, {
    key: 'createBoxDiv',
    value: function createBoxDiv() {
      var links = _htmlHelper2.default.ul(null, {
        id: 'popup-links',
        class: 'popup-box__links'
      });
      var triangle = _htmlHelper2.default.div(null, {
        class: 'popup-box__triangle'
      });
      var div = _htmlHelper2.default.div([triangle, links], {
        id: 'popup-box',
        class: 'popup-box'
      }, {
        display: Sidebar.display,
        top: Sidebar.top + 'px'
      });

      var catList = document.querySelector('.sidebar');
      catList.appendChild(div);
    }
  }, {
    key: 'addEventListenerToBoxDiv',
    value: function addEventListenerToBoxDiv() {

      var catList = document.querySelector('#cat-list');
      var tagCloud = document.querySelector('#tag-cloud');
      var popupBox = document.querySelector('#popup-box');

      var hidePopup = function hidePopup(e) {
        if (!catList.contains(e.relatedTarget) && !tagCloud.contains(e.relatedTarget) && !popupBox.contains(e.relatedTarget)) {
          Sidebar.display = 'none';
          Sidebar.top = -1000;
          Sidebar.renderPopup();
        }
      };

      catList.addEventListener('mouseout', hidePopup, false);
      tagCloud.addEventListener('mouseout', hidePopup, false);
      popupBox.addEventListener('mouseout', hidePopup, false);
    }
  }, {
    key: 'addEventListenerToLinks',
    value: function addEventListenerToLinks() {

      var cats = void 0,
          tags = void 0;
      var toArray = function toArray(collection) {
        return [].slice.call(collection);
      };

      cats = toArray(document.querySelectorAll('#cat-list .link-list__item'));
      tags = toArray(document.querySelectorAll('#tag-cloud .link-list__item'));

      cats.forEach(function (item) {
        item.addEventListener('mouseover', function (e) {
          if ('ontouchstart' in window) {
            return;
          }
          _yiiAjax2.default.post('/ajax/cat', {
            id: item.dataset.id
          }).then(function (data) {
            Sidebar.left = e.pageX + 15;
            Sidebar.top = item.offsetTop;
            Sidebar.setPopupData(data);
            Sidebar.renderPopup();
          });
        }, false);
      });
      tags.forEach(function (item) {
        item.addEventListener('mouseover', function (e) {
          if ('ontouchstart' in window) {
            return;
          }
          _yiiAjax2.default.post('/ajax/tag', {
            id: item.dataset.id
          }).then(function (data) {
            Sidebar.left = e.pageX + 15;
            Sidebar.top = item.offsetTop;
            Sidebar.setPopupData(data);
            Sidebar.renderPopup();
          });
        }, false);
      });
    }
  }, {
    key: 'addEventListenerToLinkList',
    value: function addEventListenerToLinkList() {

      var catList = document.querySelector('#cat-list');
      var tagList = document.querySelector('#tag-cloud');
      var handleListMouseOver = function handleListMouseOver() {
        Sidebar.display = 'block';
      };

      catList.addEventListener('mouseover', handleListMouseOver);
      tagList.addEventListener('mouseover', handleListMouseOver);
    }
  }, {
    key: 'setPopupData',
    value: function setPopupData(data) {
      var linkList = document.querySelector('#popup-links');

      if (linkList) {
        linkList.innerHTML = null;
        linkList.appendChild(_htmlHelper2.default.span(data.name));
        data.links.forEach(function (link) {
          linkList.appendChild(_htmlHelper2.default.li(link));
        });
      }
    }
  }, {
    key: 'renderPopup',
    value: function renderPopup() {
      var popupBox = document.querySelector('#popup-box');
      popupBox.style.top = Sidebar.top + 'px';
      popupBox.style.left = Sidebar.left + 'px';
      popupBox.style.display = Sidebar.display;
    }
  }]);

  return Sidebar;
}();

exports.default = Sidebar;

},{"html-helper":5,"yii-ajax":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     slider.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

var Slider = function () {
  function Slider() {
    _classCallCheck(this, Slider);
  }

  _createClass(Slider, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.slideList = document.querySelectorAll(Slider.SLIDE);
      this.setTimer(5000);

      var activeSlide = document.getElementsByClassName(Slider.ACTIVE_SLIDE);
      if (activeSlide.length < 1) {
        this.toggleActiveClassToIndex(0);
      }

      document.querySelector(Slider.LEFT_BTN).addEventListener('click', function (e) {
        _this.clearTimer();
        e.stopPropagation();
        _this.showPrevSlide();
      }, false);

      document.querySelector(Slider.RIGHT_BTN).addEventListener('click', function (e) {
        _this.clearTimer();
        e.stopPropagation();
        _this.showNextSlide();
      }, false);

      document.querySelector(Slider.SLIDER).addEventListener('click', function () {
        _this.toggleTimer(2000);
      }, false);

      var thumbs = document.querySelectorAll(Slider.THUMB);
      for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', function () {

          var parent = document.querySelector(Slider.THUMBS);
          parent.addEventListener('click', function (event) {
            var target = event.target || event.srcElement;
            for (var j = 0; j < parent.children.length; j++) {
              if (parent.children[j] === target.parentNode) {
                _this.toggleActiveClassToIndex(j);
              }
            }
          }, false);
        }, false);
      }
    }
  }, {
    key: 'setTimer',
    value: function setTimer(interval) {
      var _this2 = this;

      this.timer = setInterval(function () {
        _this2.showNextSlide();
      }, interval);
    }
  }, {
    key: 'clearTimer',
    value: function clearTimer() {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }, {
    key: 'toggleTimer',
    value: function toggleTimer(interval) {
      if (this.timer !== null) {
        this.clearTimer();
      } else {
        this.setTimer(interval);
      }
    }
  }, {
    key: 'showPrevSlide',
    value: function showPrevSlide() {
      var index = this.getIndexOfActiveSlide();
      if (index > 0) {
        index--;
      } else {
        index = this.slideList.length - 1;
      }
      this.toggleActiveClassToIndex(index);
    }
  }, {
    key: 'showNextSlide',
    value: function showNextSlide() {
      var index = this.getIndexOfActiveSlide();
      if (index < this.slideList.length - 1) {
        index++;
      } else {
        index = 0;
      }
      this.toggleActiveClassToIndex(index);
    }
  }, {
    key: 'getIndexOfActiveSlide',
    value: function getIndexOfActiveSlide() {
      for (var i = 0; i < this.slideList.length; i++) {
        if (this.slideList[i].classList.contains(Slider.ACTIVE_SLIDE)) {
          return i;
        }
      }
      return 0;
    }
  }, {
    key: 'toggleActiveClassToIndex',
    value: function toggleActiveClassToIndex(index) {
      if (index >= 0 && index < this.slideList.length) {
        for (var i = 0; i < this.slideList.length; i++) {
          this.slideList[i].classList.remove(Slider.ACTIVE_SLIDE);
        }
        this.slideList[index].classList.add(Slider.ACTIVE_SLIDE);
      }
    }
  }]);

  return Slider;
}();

Slider.THUMBS = '.thumbs';
Slider.THUMB = '.thumbs__thumb';
Slider.SLIDER = '.slider';
Slider.SLIDE = '.slider__slide';
Slider.ACTIVE_SLIDE = 'slider__slide_active';
Slider.LEFT_BTN = '.slider__btnbox_left';
Slider.RIGHT_BTN = '.slider__btnbox_right';
exports.default = Slider;

},{}],4:[function(require,module,exports){
'use strict';

var _navbar = require('../components/navbar/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _slider = require('../components/slider/slider');

var _slider2 = _interopRequireDefault(_slider);

var _sidebar = require('../components/sidebar/sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {

  if (document.querySelector('.navbar')) {

    _navbar2.default.init();
  }

  if (document.querySelector('.slider')) {

    var slider = new _slider2.default();
    slider.init();
  }

  if (document.querySelector('.sidebar')) {

    _sidebar2.default.init();
  }
}); /**
     *     jsnautic.spec.js for Jetro project
     *     October 2016, April 2017 by Andrii Sorokin
     *     https://github.com/ignorantic/jetro.git
     */

},{"../components/navbar/navbar":1,"../components/sidebar/sidebar":2,"../components/slider/slider":3}],5:[function(require,module,exports){
/**
 * @license
 * HTML helper
 * Released under MIT license
 * Copyright Andrii Sorokin
 */

var html = module.exports;

/**
 * Create and return DOM element
 *
 * @param  {String}         htmlTag     HTML tag
 * @param  {String,         innerHTML   HTML, DOM element
 *          DOM element,                or array of DOM elements
 *          Array}
 * @param  {Object}         attrs       Attributes
 *                                      {
 *                                        id: 'example-id',
 *                                        class: [
 *                                          'example-class-1',
 *                                          'example-class-2'
 *                                          ]
 *                                      }
 * @param  {Object}         style       CSS style
 *                                      {
 *                                        display: 'block',
 *                                        top: '10px'
 *                                      }
 * @return {DOM element}
 */
html.tag = function (htmlTag, innerHTML, attrs, style) {

  let element;

  let
    addAttrs = function() {
      for (let key in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, key)) {
          continue;
        }
        var valueStr;
        if (Array.isArray(attrs[key])) {
          valueStr = attrs[key].join(' ');
        } else {
          valueStr = attrs[key];
        }
        element.setAttribute(key, valueStr);
      }
    },
    addChildren = function() {
      if (typeof innerHTML === 'string') {
        element.innerHTML = innerHTML;
        return;
      }
      if (innerHTML instanceof HTMLElement) {
        element.appendChild(innerHTML);
        return;
      }
      if (Array.isArray(innerHTML)) {
        innerHTML.forEach(value => {
          if (value instanceof HTMLElement) {
            element.appendChild(value);
          }
        });
      }
    },
    addStyles = function() {
      for (let key in style) {
        if (!Object.prototype.hasOwnProperty.call(style, key)) {
          continue;
        }
        if (typeof style[key] === 'string') {
          element.style[key] = style[key];
        }
      }
    };

  /* BEGIN */

  typeof htmlTag === 'string' ?
    element = document.createElement(htmlTag) :
    element = document.createElement('div');

  typeof attrs === 'object' && addAttrs();

  innerHTML && addChildren();

  typeof style === 'object' && addStyles();

  return element;
};

/**
 * Create and return DOM element of link
 *
 * @param  {String,         innerHTML   HTML, DOM element
 *          DOM element,                or array of DOM elements
 *          Array}
 * @param  {String}         url         Web address
 * @param  {Object}         attrs       Attributes
 *                                      {
 *                                        id: 'example-id',
 *                                        class: [
 *                                          'example-class-1',
 *                                          'example-class-2'
 *                                          ]
 *                                      }
 * @param  {Object}         style       CSS style
 *                                      {
 *                                        display: 'block',
 *                                        top: '10px'
 *                                      }
 * @return {DOM element}                Link element
 */
html.a = function (innerHTML, url, attrs, style) {
  var element = html.tag('a', innerHTML, attrs, style);
  if (typeof url === 'string') {
    element.setAttribute('href', url);
  }
  return element;
};

/**
 * Create and return DOM element of div
 */
html.div = function (innerHTML, attrs, style) {
  return html.tag('div', innerHTML, attrs, style);
};

/**
 * Create and return DOM element of paragraph
 */
html.p = function (innerHTML, attrs, style) {
  return html.tag('p', innerHTML, attrs, style);
};

/**
 * Create and return DOM element of header 1
 */
html.h1 = function (innerHTML, attrs, style) {
  return html.tag('h1', innerHTML, attrs, style);
};

/**
 * Create and return DOM element of header 2
 */
html.h2 = function (innerHTML, attrs, style) {
  return html.tag('h2', innerHTML, attrs, style);
};

/**
 * Create and return DOM element of header 3
 */
html.h3 = function (innerHTML, attrs, style) {
  return html.tag('h3', innerHTML, attrs, style);
};

/**
 * Create and return DOM element of header 4
 */
html.h4 = function (innerHTML, attrs, style) {
  return html.tag('h4', innerHTML, attrs, style);
};

/**
 * Create and return DOM element of unmarked list
 */
html.ul = function (innerHTML, attrs, style) {
  return html.tag('ul', innerHTML, attrs, style);
};

/**
 * Create and return DOM element of item of list
 */
html.li = function (innerHTML, attrs, style) {
  return html.tag('li', innerHTML, attrs, style);
};

/**
 * Create and return DOM element of span
 */
html.span = function (innerHTML, attrs, style) {
  return html.tag('span', innerHTML, attrs, style);
};

},{}],6:[function(require,module,exports){
/**
 * @license
 * Ajax Module for Yii2
 * Released under MIT license
 * Copyright Andrii Sorokin
 */

let yiiAjax = module.exports;

let forEach = require('lodash.foreach');
let isObject = require('lodash.isobject');

let
  extractData = function(data) {
    let result = '';
    if (isObject(data)) {
      forEach(data, function (value, key) {
        result += key + '=' + value + '&';
      });
    }
    return result;
  },
  getCSRF = function(param, token) {
    let csrfParamMeta = document.getElementsByName(param)[0];
    let csrfTokenMeta = document.getElementsByName(token)[0];
    let csrfParam = csrfParamMeta ?
      document.getElementsByName(param)[0].getAttribute('content') : null;
    let csrfToken = csrfTokenMeta ?
      document.getElementsByName(token)[0].getAttribute('content') : null;
    return csrfParam + '=' + csrfToken;
  },
  json = function(response) {
    return response.json();
  },
  status = function(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
  };

yiiAjax.post = function (url, data) {

  let headers = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  let token = getCSRF('csrf-param', 'csrf-token');
  let body = extractData(data) + token;
  let request = {
    method: 'post',
    headers: headers,
    credentials: 'include',
    body: body
  };
  return fetch(url, request)
    .then(status)
    .then(json);
};

},{"lodash.foreach":7,"lodash.isobject":8}],7:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, typeof iteratee == 'function' ? iteratee : identity);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = forEach;

},{}],8:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy95aWktYWpheC9pbmRleC5qcyIsImRldi9ub2RlX21vZHVsZXMveWlpLWFqYXgvbm9kZV9tb2R1bGVzL2xvZGFzaC5mb3JlYWNoL2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy95aWktYWpheC9ub2RlX21vZHVsZXMvbG9kYXNoLmlzb2JqZWN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsyQkFFTDtBQUNaLFVBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFwQjtBQUNBLG9CQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLE9BQU8sV0FBL0MsRUFBNEQsS0FBNUQ7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQVY7QUFBQSxVQUNFLE9BQU8sU0FBUyxhQUFULENBQXVCLGFBQXZCLENBRFQ7QUFFQSxVQUFJLFNBQUosQ0FBYyxHQUFkLENBQWtCLGlCQUFsQjtBQUNBLFdBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsZ0JBQXRCO0FBQ0EsaUJBQVcsWUFBTTtBQUNmLFlBQUksU0FBSixDQUFjLE1BQWQsQ0FBcUIsaUJBQXJCO0FBQ0QsT0FGRCxFQUVHLEdBRkg7QUFHRDs7Ozs7O2tCQWZrQixNOzs7Ozs7Ozs7cWpCQ05yQjs7Ozs7O0FBTUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUIsTzs7Ozs7OzsyQkFNTDtBQUNa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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiAgICAganNuYXV0aWMuc3BlYy5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmJhciB7XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbGV0IG5hdmJhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuJyk7XG4gICAgbmF2YmFyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIE5hdmJhci5zZXREcm9wZG93biwgZmFsc2UpO1xuICB9XG5cbiAgc3RhdGljIHNldERyb3Bkb3duKCkge1xuICAgIGxldCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuJyksXG4gICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2xpc3QnKTtcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnbWVudV9fYnRuX2JsaW5rJyk7XG4gICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdtZW51X19kcmFwZG93bicpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2J0bl9ibGluaycpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiAgICAgc2lkZWJhci5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmltcG9ydCB5aWlBamF4IGZyb20gJ3lpaS1hamF4JztcbmltcG9ydCBodG1sIGZyb20gJ2h0bWwtaGVscGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lkZWJhciB7XG5cbiAgc3RhdGljIHRvcDtcbiAgc3RhdGljIGxlZnQ7XG4gIHN0YXRpYyBkaXNwbGF5O1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIFNpZGViYXIudG9wID0gLTEwMDA7XG4gICAgU2lkZWJhci5sZWZ0ID0gMDtcbiAgICBTaWRlYmFyLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgU2lkZWJhci5jcmVhdGVCb3hEaXYoKTtcbiAgICBTaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXJUb0JveERpdigpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvTGlua3MoKTtcbiAgICBTaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXJUb0xpbmtMaXN0KCk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlQm94RGl2KCkge1xuICAgIGxldCBsaW5rcyA9IGh0bWwudWwobnVsbCwge1xuICAgICAgaWQ6ICdwb3B1cC1saW5rcycsXG4gICAgICBjbGFzczogJ3BvcHVwLWJveF9fbGlua3MnXG4gICAgfSk7XG4gICAgbGV0IHRyaWFuZ2xlID0gaHRtbC5kaXYobnVsbCwge1xuICAgICAgY2xhc3M6ICdwb3B1cC1ib3hfX3RyaWFuZ2xlJ1xuICAgIH0pO1xuICAgIGxldCBkaXYgPSBodG1sLmRpdihbdHJpYW5nbGUsIGxpbmtzXSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdwb3B1cC1ib3gnLFxuICAgICAgICBjbGFzczogJ3BvcHVwLWJveCdcbiAgICAgIH0sIHtcbiAgICAgICAgZGlzcGxheTogU2lkZWJhci5kaXNwbGF5LFxuICAgICAgICB0b3A6IFNpZGViYXIudG9wICsgJ3B4J1xuICAgICAgfVxuICAgICk7XG5cbiAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG4gICAgY2F0TGlzdC5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG5cbiAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJUb0JveERpdigpIHtcblxuICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1saXN0Jyk7XG4gICAgbGV0IHRhZ0Nsb3VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZy1jbG91ZCcpO1xuICAgIGxldCBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcblxuICAgIGxldCBoaWRlUG9wdXAgPSBlID0+IHtcbiAgICAgIGlmICghY2F0TGlzdC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpICYmXG4gICAgICAgICAgIXRhZ0Nsb3VkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkgJiZcbiAgICAgICAgICAhcG9wdXBCb3guY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICBTaWRlYmFyLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIFNpZGViYXIudG9wID0gLTEwMDA7XG4gICAgICAgIFNpZGViYXIucmVuZGVyUG9wdXAoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhpZGVQb3B1cCwgZmFsc2UpO1xuICAgIHRhZ0Nsb3VkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGlkZVBvcHVwLCBmYWxzZSk7XG4gICAgcG9wdXBCb3guYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoaWRlUG9wdXAsIGZhbHNlKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9MaW5rcygpIHtcblxuICAgIGxldCBjYXRzLCB0YWdzO1xuICAgIGxldCB0b0FycmF5ID0gY29sbGVjdGlvbiA9PiBbXS5zbGljZS5jYWxsKGNvbGxlY3Rpb24pO1xuXG4gICAgY2F0cyA9IHRvQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NhdC1saXN0IC5saW5rLWxpc3RfX2l0ZW0nKSk7XG4gICAgdGFncyA9IHRvQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3RhZy1jbG91ZCAubGluay1saXN0X19pdGVtJykpO1xuXG4gICAgY2F0cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHlpaUFqYXgucG9zdCgnL2FqYXgvY2F0Jywge1xuICAgICAgICAgICAgaWQ6IGl0ZW0uZGF0YXNldC5pZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgU2lkZWJhci5sZWZ0ID0gZS5wYWdlWCArIDE1O1xuICAgICAgICAgICAgICBTaWRlYmFyLnRvcCA9IGl0ZW0ub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwRGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgU2lkZWJhci5yZW5kZXJQb3B1cCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH0pO1xuICAgIHRhZ3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgZSA9PiB7XG4gICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB5aWlBamF4LnBvc3QoJy9hamF4L3RhZycsIHtcbiAgICAgICAgICAgIGlkOiBpdGVtLmRhdGFzZXQuaWRcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIFNpZGViYXIubGVmdCA9IGUucGFnZVggKyAxNTtcbiAgICAgICAgICAgICAgU2lkZWJhci50b3AgPSBpdGVtLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgIFNpZGViYXIucmVuZGVyUG9wdXAoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9MaW5rTGlzdCgpIHtcblxuICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1saXN0Jyk7XG4gICAgbGV0IHRhZ0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG4gICAgbGV0IGhhbmRsZUxpc3RNb3VzZU92ZXIgPSAoKSA9PiB7XG4gICAgICBTaWRlYmFyLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICAgIHRhZ0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlTGlzdE1vdXNlT3Zlcik7XG4gIH1cblxuICBzdGF0aWMgc2V0UG9wdXBEYXRhKGRhdGEpIHtcbiAgICBsZXQgbGlua0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtbGlua3MnKTtcblxuICAgIGlmIChsaW5rTGlzdCkge1xuICAgICAgbGlua0xpc3QuaW5uZXJIVE1MID0gbnVsbDtcbiAgICAgIGxpbmtMaXN0LmFwcGVuZENoaWxkKGh0bWwuc3BhbihkYXRhLm5hbWUpKTtcbiAgICAgIGRhdGEubGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGlua0xpc3QuYXBwZW5kQ2hpbGQoaHRtbC5saShsaW5rKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyUG9wdXAoKSB7XG4gICAgbGV0IHBvcHVwQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9IFNpZGViYXIudG9wICsgJ3B4JztcbiAgICBwb3B1cEJveC5zdHlsZS5sZWZ0ID0gU2lkZWJhci5sZWZ0ICsgJ3B4JztcbiAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gU2lkZWJhci5kaXNwbGF5O1xuICB9XG5cbn1cbiIsIi8qKlxuICogICAgIHNsaWRlci5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XG5cbiAgc3RhdGljIFRIVU1CUyA9ICcudGh1bWJzJztcbiAgc3RhdGljIFRIVU1CID0gJy50aHVtYnNfX3RodW1iJztcbiAgc3RhdGljIFNMSURFUiA9ICcuc2xpZGVyJztcbiAgc3RhdGljIFNMSURFID0gJy5zbGlkZXJfX3NsaWRlJztcbiAgc3RhdGljIEFDVElWRV9TTElERSA9ICdzbGlkZXJfX3NsaWRlX2FjdGl2ZSc7XG4gIHN0YXRpYyBMRUZUX0JUTiA9ICcuc2xpZGVyX19idG5ib3hfbGVmdCc7XG4gIHN0YXRpYyBSSUdIVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X3JpZ2h0JztcblxuICBpbml0KCkge1xuXG4gICAgdGhpcy5zbGlkZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5TTElERSk7XG4gICAgdGhpcy5zZXRUaW1lcig1MDAwKTtcblxuICAgIGxldCBhY3RpdmVTbGlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgaWYgKGFjdGl2ZVNsaWRlLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KDApO1xuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLkxFRlRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zaG93UHJldlNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuUklHSFRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuU0xJREVSKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlVGltZXIoMjAwMCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgbGV0IHRodW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlRIVU1CKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1icy5sZW5ndGg7IGkrKykge1xuICAgICAgdGh1bWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5USFVNQlMpO1xuICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuW2pdID09PSB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICB9XG5cbiAgc2V0VGltZXIoaW50ZXJ2YWwpIHtcbiAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgfSwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgY2xlYXJUaW1lcigpIHtcbiAgICBpZiAodGhpcy50aW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVRpbWVyKGludGVydmFsKSB7XG4gICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFRpbWVyKGludGVydmFsKTtcbiAgICB9XG4gIH1cblxuICBzaG93UHJldlNsaWRlKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgaW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gIH1cblxuICBzaG93TmV4dFNsaWRlKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgaW5kZXgrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gIH1cblxuICBnZXRJbmRleE9mQWN0aXZlU2xpZGUoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhTbGlkZXIuQUNUSVZFX1NMSURFKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB0b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoKGluZGV4ID49IDApICYmIChpbmRleCA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVMaXN0W2luZGV4XS5jbGFzc0xpc3QuYWRkKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiAgICAganNuYXV0aWMuc3BlYy5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIE9jdG9iZXIgMjAxNiwgQXByaWwgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyJztcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyJztcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4uL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpKSB7XG5cbiAgICBOYXZiYXIuaW5pdCgpO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpKSB7XG5cbiAgICBsZXQgc2xpZGVyID0gbmV3IFNsaWRlcigpO1xuICAgIHNsaWRlci5pbml0KCk7XG5cbiAgfVxuXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpKSB7XG5cbiAgICBTaWRlYmFyLmluaXQoKTtcblxuICB9XG5cbn0pO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogSFRNTCBoZWxwZXJcbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG52YXIgaHRtbCA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIGh0bWxUYWcgICAgIEhUTUwgdGFnXG4gKiBAcGFyYW0gIHtTdHJpbmcsICAgICAgICAgaW5uZXJIVE1MICAgSFRNTCwgRE9NIGVsZW1lbnRcbiAqICAgICAgICAgIERPTSBlbGVtZW50LCAgICAgICAgICAgICAgICBvciBhcnJheSBvZiBET00gZWxlbWVudHNcbiAqICAgICAgICAgIEFycmF5fVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGF0dHJzICAgICAgIEF0dHJpYnV0ZXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2V4YW1wbGUtaWQnLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4YW1wbGUtY2xhc3MtMScsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleGFtcGxlLWNsYXNzLTInXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgc3R5bGUgICAgICAgQ1NTIHN0eWxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzEwcHgnXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogQHJldHVybiB7RE9NIGVsZW1lbnR9XG4gKi9cbmh0bWwudGFnID0gZnVuY3Rpb24gKGh0bWxUYWcsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG5cbiAgbGV0IGVsZW1lbnQ7XG5cbiAgbGV0XG4gICAgYWRkQXR0cnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBhdHRycykge1xuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhdHRycywga2V5KSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZVN0cjtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXR0cnNba2V5XSkpIHtcbiAgICAgICAgICB2YWx1ZVN0ciA9IGF0dHJzW2tleV0uam9pbignICcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlU3RyID0gYXR0cnNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlU3RyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZENoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodHlwZW9mIGlubmVySFRNTCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpbm5lckhUTUwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGlubmVySFRNTCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGlubmVySFRNTCkpIHtcbiAgICAgICAgaW5uZXJIVE1MLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkU3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc3R5bGUpIHtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3R5bGUsIGtleSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0eWxlW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgLyogQkVHSU4gKi9cblxuICB0eXBlb2YgaHRtbFRhZyA9PT0gJ3N0cmluZycgP1xuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGh0bWxUYWcpIDpcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgdHlwZW9mIGF0dHJzID09PSAnb2JqZWN0JyAmJiBhZGRBdHRycygpO1xuXG4gIGlubmVySFRNTCAmJiBhZGRDaGlsZHJlbigpO1xuXG4gIHR5cGVvZiBzdHlsZSA9PT0gJ29iamVjdCcgJiYgYWRkU3R5bGVzKCk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIGxpbmtcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmcsICAgICAgICAgaW5uZXJIVE1MICAgSFRNTCwgRE9NIGVsZW1lbnRcbiAqICAgICAgICAgIERPTSBlbGVtZW50LCAgICAgICAgICAgICAgICBvciBhcnJheSBvZiBET00gZWxlbWVudHNcbiAqICAgICAgICAgIEFycmF5fVxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIHVybCAgICAgICAgIFdlYiBhZGRyZXNzXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgYXR0cnMgICAgICAgQXR0cmlidXRlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZXhhbXBsZS1pZCcsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogW1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXhhbXBsZS1jbGFzcy0xJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4YW1wbGUtY2xhc3MtMidcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBzdHlsZSAgICAgICBDU1Mgc3R5bGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMTBweCdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcmV0dXJuIHtET00gZWxlbWVudH0gICAgICAgICAgICAgICAgTGluayBlbGVtZW50XG4gKi9cbmh0bWwuYSA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIHVybCwgYXR0cnMsIHN0eWxlKSB7XG4gIHZhciBlbGVtZW50ID0gaHRtbC50YWcoJ2EnLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG4gIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgZGl2XG4gKi9cbmh0bWwuZGl2ID0gZnVuY3Rpb24gKGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG4gIHJldHVybiBodG1sLnRhZygnZGl2JywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBwYXJhZ3JhcGhcbiAqL1xuaHRtbC5wID0gZnVuY3Rpb24gKGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG4gIHJldHVybiBodG1sLnRhZygncCcsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgaGVhZGVyIDFcbiAqL1xuaHRtbC5oMSA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuICByZXR1cm4gaHRtbC50YWcoJ2gxJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBoZWFkZXIgMlxuICovXG5odG1sLmgyID0gZnVuY3Rpb24gKGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG4gIHJldHVybiBodG1sLnRhZygnaDInLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIGhlYWRlciAzXG4gKi9cbmh0bWwuaDMgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdoMycsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgaGVhZGVyIDRcbiAqL1xuaHRtbC5oNCA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuICByZXR1cm4gaHRtbC50YWcoJ2g0JywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiB1bm1hcmtlZCBsaXN0XG4gKi9cbmh0bWwudWwgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCd1bCcsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgaXRlbSBvZiBsaXN0XG4gKi9cbmh0bWwubGkgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdsaScsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2Ygc3BhblxuICovXG5odG1sLnNwYW4gPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdzcGFuJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIEFqYXggTW9kdWxlIGZvciBZaWkyXG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogQ29weXJpZ2h0IEFuZHJpaSBTb3Jva2luXG4gKi9cblxubGV0IHlpaUFqYXggPSBtb2R1bGUuZXhwb3J0cztcblxubGV0IGZvckVhY2ggPSByZXF1aXJlKCdsb2Rhc2guZm9yZWFjaCcpO1xubGV0IGlzT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoLmlzb2JqZWN0Jyk7XG5cbmxldFxuICBleHRyYWN0RGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgaWYgKGlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBmb3JFYWNoKGRhdGEsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJlc3VsdCArPSBrZXkgKyAnPScgKyB2YWx1ZSArICcmJztcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICBnZXRDU1JGID0gZnVuY3Rpb24ocGFyYW0sIHRva2VuKSB7XG4gICAgbGV0IGNzcmZQYXJhbU1ldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShwYXJhbSlbMF07XG4gICAgbGV0IGNzcmZUb2tlbk1ldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0b2tlbilbMF07XG4gICAgbGV0IGNzcmZQYXJhbSA9IGNzcmZQYXJhbU1ldGEgP1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUocGFyYW0pWzBdLmdldEF0dHJpYnV0ZSgnY29udGVudCcpIDogbnVsbDtcbiAgICBsZXQgY3NyZlRva2VuID0gY3NyZlRva2VuTWV0YSA/XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0b2tlbilbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JykgOiBudWxsO1xuICAgIHJldHVybiBjc3JmUGFyYW0gKyAnPScgKyBjc3JmVG9rZW47XG4gIH0sXG4gIGpzb24gPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0sXG4gIHN0YXR1cyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XG4gIH07XG5cbnlpaUFqYXgucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcblxuICBsZXQgaGVhZGVycyA9IHtcbiAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcbiAgfTtcbiAgbGV0IHRva2VuID0gZ2V0Q1NSRignY3NyZi1wYXJhbScsICdjc3JmLXRva2VuJyk7XG4gIGxldCBib2R5ID0gZXh0cmFjdERhdGEoZGF0YSkgKyB0b2tlbjtcbiAgbGV0IHJlcXVlc3QgPSB7XG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgaGVhZGVyczogaGVhZGVycyxcbiAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIGJvZHk6IGJvZHlcbiAgfTtcbiAgcmV0dXJuIGZldGNoKHVybCwgcmVxdWVzdClcbiAgICAudGhlbihzdGF0dXMpXG4gICAgLnRoZW4oanNvbik7XG59O1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG52YXIgYmFzZUVhY2ggPSBjcmVhdGVCYXNlRWFjaChiYXNlRm9yT3duKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRWFjaChlYWNoRnVuYywgZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cbiAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXR1cm4gZWFjaEZ1bmMoY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICogb3IgYF8uZm9yT3duYCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAYWxpYXMgZWFjaFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8oWzEsIDJdKS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gKlxuICogXy5mb3JFYWNoKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUVhY2ggOiBiYXNlRWFjaDtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgdHlwZW9mIGl0ZXJhdGVlID09ICdmdW5jdGlvbicgPyBpdGVyYXRlZSA6IGlkZW50aXR5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iXX0=
