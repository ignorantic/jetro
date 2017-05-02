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
      var navbarElement = document.querySelector('.menu-btn');
      navbarElement.addEventListener('click', Navbar.setDropdown, false);
    }
  }, {
    key: 'setDropdown',
    value: function setDropdown() {
      var btn = document.querySelector('.menu-btn'),
          list = document.querySelector('.menu');
      btn.classList.add('menu-btn-blink');
      list.classList.toggle('menu-drapdown');
      setTimeout(function () {
        btn.classList.remove('menu-btn-blink');
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

var _jsnautic = require('../../lib/jsnautic');

var _jsnautic2 = _interopRequireDefault(_jsnautic);

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
      Sidebar.createBoxDiv();
      Sidebar.addEventListenerToBoxDiv();
      Sidebar.addEventListenerToLinks();
      Sidebar.addEventListenerToLinkList();
    }
  }, {
    key: 'getPopup',
    value: function getPopup() {
      return document.querySelector('#popup-box');
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
        display: 'none',
        top: '-1000px'
      });

      var catList = document.querySelector('.sidebar');
      catList.appendChild(div);
    }
  }, {
    key: 'setPopupData',
    value: function setPopupData(data) {
      var popupBox = Sidebar.getPopup();
      if (popupBox) {
        var linkList = document.querySelector('#popup-links');
        linkList.innerHTML = null;

        var tag = _htmlHelper2.default.span(data.name);
        linkList.appendChild(tag);

        data.links.forEach(function (link) {
          linkList.appendChild(_htmlHelper2.default.li(link));
        });
      }
    }
  }, {
    key: 'setPopupPosition',
    value: function setPopupPosition(left, top) {
      var popupBox = Sidebar.getPopup();
      if (popupBox) {
        popupBox.style.top = top + 'px';
        popupBox.style.left = left + 'px';
      }
    }
  }, {
    key: 'handleListMouseOver',
    value: function handleListMouseOver() {
      var popupBox = Sidebar.getPopup();
      if (!popupBox) {
        popupBox = Sidebar.getPopup();
      }
      popupBox.style.display = 'block';
    }
  }, {
    key: 'addEventListenerToBoxDiv',
    value: function addEventListenerToBoxDiv() {

      var catList = document.querySelector('#cat-list');
      var tagCloud = document.querySelector('#tag-cloud');
      var popupBox = Sidebar.getPopup();

      catList.addEventListener('mouseout', function (e) {
        if (e.relatedTarget !== popupBox) {
          popupBox.style.display = 'none';
          popupBox.style.top = '-1000px';
        }
      });

      tagCloud.addEventListener('mouseout', function (e) {
        if (e.relatedTarget !== popupBox) {
          popupBox.style.display = 'none';
          popupBox.style.top = '-1000px';
        }
      });

      popupBox.addEventListener('mouseout', function (e) {
        if (!catList.contains(e.relatedTarget) && !tagCloud.contains(e.relatedTarget) && !popupBox.contains(e.relatedTarget)) {
          popupBox.style.display = 'none';
          popupBox.style.top = '-1000px';
        }
      });
    }
  }, {
    key: 'addEventListenerToLinks',
    value: function addEventListenerToLinks() {

      var cats = Array.prototype.slice.call(document.querySelectorAll('#cat-list .link-list__item'));
      var tags = Array.prototype.slice.call(document.querySelectorAll('#tag-cloud .link-list__item'));

      cats.forEach(function (item) {
        item.addEventListener('mouseover', function (e) {
          if ('ontouchstart' in window) {
            return;
          }
          _jsnautic2.default.yiiAjaxRequest('/ajax/cat', 'id=' + item.dataset.id).then(function (data) {
            var left = e.pageX + 5,
                top = item.offsetTop + 15;
            Sidebar.setPopupData(data);
            Sidebar.setPopupPosition(left, top);
          });
        }, false);
      });
      tags.forEach(function (item) {
        item.addEventListener('mouseover', function () {
          if ('ontouchstart' in window) {
            return;
          }
          _jsnautic2.default.yiiAjaxRequest('/ajax/tag', 'id=' + item.dataset.id).then(function (data) {
            var left = item.offsetLeft + item.offsetWidth - 15,
                top = item.offsetTop + item.offsetHeight - 1;
            Sidebar.setPopupData(data);
            Sidebar.setPopupPosition(left, top);
          });
        }, false);
      });
    }
  }, {
    key: 'addEventListenerToLinkList',
    value: function addEventListenerToLinkList() {

      var catList = document.querySelector('#cat-list');
      var tagList = document.querySelector('#tag-cloud');

      catList.addEventListener('mouseover', Sidebar.handleListMouseOver);
      tagList.addEventListener('mouseover', Sidebar.handleListMouseOver);
    }
  }]);

  return Sidebar;
}();

exports.default = Sidebar;

},{"../../lib/jsnautic":5,"html-helper":6}],3:[function(require,module,exports){
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

var _navbar = require('../blocks/navbar/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _slider = require('../blocks/slider/slider');

var _slider2 = _interopRequireDefault(_slider);

var _sidebar = require('../blocks/sidebar/sidebar');

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

},{"../blocks/navbar/navbar":1,"../blocks/sidebar/sidebar":2,"../blocks/slider/slider":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     jsnautic.js for Jetro project
 *     April 2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jetro.git
 */

var jsNautic = function () {
  function jsNautic() {
    _classCallCheck(this, jsNautic);
  }

  _createClass(jsNautic, null, [{
    key: 'getActiveIndex',
    value: function getActiveIndex(className, activeClassName) {
      var nodeList = document.getElementsByClassName(className);
      for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].classList.contains(activeClassName)) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: 'toggleClassByIndex',
    value: function toggleClassByIndex(targetClass, setClassName, index) {
      var nodeList = document.getElementsByClassName(targetClass);
      for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].classList.contains(setClassName)) {
          nodeList[i].classList.remove(setClassName);
        }
      }
      if (index >= 0 && index < nodeList.length) {
        document.getElementsByClassName(targetClass)[index].classList.add(setClassName);
      }
    }
  }, {
    key: 'yiiAjaxRequest',
    value: function yiiAjaxRequest(url, body) {

      var csrfParamMeta = document.getElementsByName('csrf-param')[0];
      var csrfTokenMeta = document.getElementsByName('csrf-token')[0];
      var csrfParam = csrfParamMeta ? document.getElementsByName('csrf-param')[0].getAttribute('content') : null;
      var csrfToken = csrfTokenMeta ? document.getElementsByName('csrf-token')[0].getAttribute('content') : null;
      var token = csrfParam + '=' + csrfToken;

      var request = {};
      request.method = 'post';
      request.headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      request.credentials = 'include';
      request.body = body + '&' + token;
      return fetch(url, request).then(jsNautic.status).then(jsNautic.json);
    }
  }, {
    key: 'status',
    value: function status(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(new Error(response.statusText));
    }
  }, {
    key: 'json',
    value: function json(response) {
      return response.json();
    }
  }]);

  return jsNautic;
}();

exports.default = jsNautic;

},{}],6:[function(require,module,exports){
/**
 * @license
 * HTML helper
 * Released under MIT license
 * Copyright Andrii Sorokin
 */
var html = module.exports;

var forEach = require('lodash.foreach');
var isArray = require('lodash.isarray');
var isObject = require('lodash.isobject');
var isString = require('lodash.isstring');
var isElement = require('lodash.iselement');

/**
 * Create and return DOM element
 * @param  {String}         htmlTag     HTML tag
 * @param  {String, Array}  innerHTML   HTML or array of DOM elements
 * @param  {Object}         attrs       Attributes
 *                                      {
 *                                        id: 'example-id',
 *                                        class: ['example-class-1', 'example-class-2']
 *                                      }
 * @param  {Object}         style       CSS style
 *                                      {
 *                                        display: 'block',
 *                                        top: '10px'
 *                                      }
 * @return {DOM element}
 */
html.tag = function (htmlTag, innerHTML, attrs, style) {

  var element;

  isString(htmlTag) ?
    element = document.createElement(htmlTag) :
    element = document.createElement('div');

  if (isObject(attrs)) {
    forEach(attrs, function (value, key) {
      var valueStr;
      if (isArray(value)) {
        valueStr = value.join(' ');
      } else {
        valueStr = value;
      }
      element.setAttribute(key, valueStr);
    });
  }

  if (innerHTML !== null) {
    if (isString(innerHTML)) {
      (element.innerHTML = innerHTML);
    } else if (isArray(innerHTML)) {
      forEach(innerHTML, function (value) {
        if (isElement(value)) {
          element.appendChild(value);
        }
      });
    }
  }

  if (isObject(style)) {
    forEach(style, function (value, key) {
      if (isString(value)) {
        element.style[key] = value;
      }
    });
  }

  return element;
};

/**
 * Create and return DOM element of link
 * @param  {String, Array}  innerHTML   HTML or array of DOM elements
 * @param  {String}         url         Web address
 * @param  {Object}         attrs       Attributes
 *                                      {
 *                                        id: 'example-id',
 *                                        class: ['example-class-1', 'example-class-2']
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
  if (isString(url)) {
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

},{"lodash.foreach":7,"lodash.isarray":8,"lodash.iselement":9,"lodash.isobject":10,"lodash.isstring":11}],7:[function(require,module,exports){
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
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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

module.exports = isArray;

},{}],9:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
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
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
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
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isElement;

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
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
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL25hdmJhci9uYXZiYXIuanMiLCJkZXYvYmxvY2tzL3NpZGViYXIvc2lkZWJhci5qcyIsImRldi9ibG9ja3Mvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pzbmF1dGljLmpzIiwiZGV2L25vZGVfbW9kdWxlcy9odG1sLWhlbHBlci9pbmRleC5qcyIsImRldi9ub2RlX21vZHVsZXMvaHRtbC1oZWxwZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5mb3JlYWNoL2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy9odG1sLWhlbHBlci9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJyYXkvaW5kZXguanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlbGVtZW50L2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy9odG1sLWhlbHBlci9ub2RlX21vZHVsZXMvbG9kYXNoLmlzb2JqZWN0L2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy9odG1sLWhlbHBlci9ub2RlX21vZHVsZXMvbG9kYXNoLmlzc3RyaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsyQkFFTDtBQUNaLFVBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixXQUF2QixDQUFwQjtBQUNBLG9CQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLE9BQU8sV0FBL0MsRUFBNEQsS0FBNUQ7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVY7QUFBQSxVQUNFLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBRFQ7QUFFQSxVQUFJLFNBQUosQ0FBYyxHQUFkLENBQWtCLGdCQUFsQjtBQUNBLFdBQUss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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqICAgICBqc25hdXRpYy5zcGVjLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyIHtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBsZXQgbmF2YmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpO1xuICAgIG5hdmJhckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBOYXZiYXIuc2V0RHJvcGRvd24sIGZhbHNlKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXREcm9wZG93bigpIHtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJyksXG4gICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnbWVudS1idG4tYmxpbmsnKTtcbiAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtZHJhcGRvd24nKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWJ0bi1ibGluaycpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiAgICAgc2lkZWJhci5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmltcG9ydCBqc05hdXRpYyBmcm9tICcuLi8uLi9saWIvanNuYXV0aWMnO1xuaW1wb3J0IGh0bWwgZnJvbSAnaHRtbC1oZWxwZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWRlYmFyIHtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBTaWRlYmFyLmNyZWF0ZUJveERpdigpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCk7XG4gICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9MaW5rcygpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvTGlua0xpc3QoKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQb3B1cCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUJveERpdigpIHtcbiAgICBsZXQgbGlua3MgPSBodG1sLnVsKG51bGwsIHtcbiAgICAgIGlkOiAncG9wdXAtbGlua3MnLFxuICAgICAgY2xhc3M6ICdwb3B1cC1ib3hfX2xpbmtzJ1xuICAgIH0pO1xuICAgIGxldCB0cmlhbmdsZSA9IGh0bWwuZGl2KG51bGwsIHtcbiAgICAgIGNsYXNzOiAncG9wdXAtYm94X190cmlhbmdsZSdcbiAgICB9KTtcbiAgICBsZXQgZGl2ID0gaHRtbC5kaXYoXG4gICAgICBbXG4gICAgICAgIHRyaWFuZ2xlLFxuICAgICAgICBsaW5rc1xuICAgICAgXSwge1xuICAgICAgICBpZDogJ3BvcHVwLWJveCcsXG4gICAgICAgIGNsYXNzOiAncG9wdXAtYm94J1xuICAgICAgfSwge1xuICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgIHRvcDogJy0xMDAwcHgnXG4gICAgICB9XG4gICAgKTtcblxuICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICBjYXRMaXN0LmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuICBzdGF0aWMgc2V0UG9wdXBEYXRhKGRhdGEpIHtcbiAgICBsZXQgcG9wdXBCb3ggPSBTaWRlYmFyLmdldFBvcHVwKCk7XG4gICAgaWYgKHBvcHVwQm94KSB7XG4gICAgICBsZXQgbGlua0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtbGlua3MnKTtcbiAgICAgIGxpbmtMaXN0LmlubmVySFRNTCA9IG51bGw7XG5cbiAgICAgIGxldCB0YWcgPSBodG1sLnNwYW4oZGF0YS5uYW1lKTtcbiAgICAgIGxpbmtMaXN0LmFwcGVuZENoaWxkKHRhZyk7XG5cbiAgICAgIGRhdGEubGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgICBsaW5rTGlzdC5hcHBlbmRDaGlsZChodG1sLmxpKGxpbmspKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXRQb3B1cFBvc2l0aW9uKGxlZnQsIHRvcCkge1xuICAgIGxldCBwb3B1cEJveCA9IFNpZGViYXIuZ2V0UG9wdXAoKTtcbiAgICBpZiAocG9wdXBCb3gpIHtcbiAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICBwb3B1cEJveC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGhhbmRsZUxpc3RNb3VzZU92ZXIoKSB7XG4gICAgbGV0IHBvcHVwQm94ID0gU2lkZWJhci5nZXRQb3B1cCgpO1xuICAgIGlmICghcG9wdXBCb3gpIHtcbiAgICAgIHBvcHVwQm94ID0gU2lkZWJhci5nZXRQb3B1cCgpO1xuICAgIH1cbiAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKSB7XG5cbiAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgIGxldCB0YWdDbG91ZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWctY2xvdWQnKTtcbiAgICBsZXQgcG9wdXBCb3ggPSBTaWRlYmFyLmdldFBvcHVwKCk7XG5cbiAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoZS5yZWxhdGVkVGFyZ2V0ICE9PSBwb3B1cEJveCkge1xuICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgcG9wdXBCb3guc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRhZ0Nsb3VkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoZS5yZWxhdGVkVGFyZ2V0ICE9PSBwb3B1cEJveCkge1xuICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgcG9wdXBCb3guc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHBvcHVwQm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoKCFjYXRMaXN0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpICYmXG4gICAgICAgICAgKCF0YWdDbG91ZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSAmJlxuICAgICAgICAgICghcG9wdXBCb3guY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkpIHtcbiAgICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvTGlua3MoKSB7XG5cbiAgICBsZXQgY2F0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NhdC1saXN0IC5saW5rLWxpc3RfX2l0ZW0nKSk7XG4gICAgbGV0IHRhZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN0YWctY2xvdWQgLmxpbmstbGlzdF9faXRlbScpKTtcblxuICAgIGNhdHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGpzTmF1dGljLnlpaUFqYXhSZXF1ZXN0KCcvYWpheC9jYXQnLCAnaWQ9JyArIGl0ZW0uZGF0YXNldC5pZClcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBsZXQgbGVmdCA9IGUucGFnZVggKyA1LFxuICAgICAgICAgICAgICAgIHRvcCA9IGl0ZW0ub2Zmc2V0VG9wICsgMTU7XG4gICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwUG9zaXRpb24obGVmdCwgdG9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9KTtcbiAgICB0YWdzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAganNOYXV0aWMueWlpQWpheFJlcXVlc3QoJy9hamF4L3RhZycsICdpZD0nICsgaXRlbS5kYXRhc2V0LmlkKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIGxldCBsZWZ0ID0gaXRlbS5vZmZzZXRMZWZ0ICsgaXRlbS5vZmZzZXRXaWR0aCAtIDE1LFxuICAgICAgICAgICAgICAgIHRvcCA9IGl0ZW0ub2Zmc2V0VG9wICsgaXRlbS5vZmZzZXRIZWlnaHQgLSAxO1xuICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwRGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cFBvc2l0aW9uKGxlZnQsIHRvcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvTGlua0xpc3QoKSB7XG5cbiAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgIGxldCB0YWdMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZy1jbG91ZCcpO1xuXG4gICAgY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBTaWRlYmFyLmhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICAgIHRhZ0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgU2lkZWJhci5oYW5kbGVMaXN0TW91c2VPdmVyKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqICAgICBzbGlkZXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xuXG4gIHN0YXRpYyBUSFVNQlMgPSAnLnRodW1icyc7XG4gIHN0YXRpYyBUSFVNQiA9ICcudGh1bWJzX190aHVtYic7XG4gIHN0YXRpYyBTTElERVIgPSAnLnNsaWRlcic7XG4gIHN0YXRpYyBTTElERSA9ICcuc2xpZGVyX19zbGlkZSc7XG4gIHN0YXRpYyBBQ1RJVkVfU0xJREUgPSAnc2xpZGVyX19zbGlkZV9hY3RpdmUnO1xuICBzdGF0aWMgTEVGVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X2xlZnQnO1xuICBzdGF0aWMgUklHSFRfQlROID0gJy5zbGlkZXJfX2J0bmJveF9yaWdodCc7XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuc2xpZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTbGlkZXIuU0xJREUpO1xuICAgIHRoaXMuc2V0VGltZXIoNTAwMCk7XG5cbiAgICBsZXQgYWN0aXZlU2xpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgIGlmIChhY3RpdmVTbGlkZS5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleCgwKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5MRUZUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2hvd1ByZXZTbGlkZSgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlJJR0hUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlNMSURFUikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLnRvZ2dsZVRpbWVyKDIwMDApO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIGxldCB0aHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5USFVNQik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aHVtYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRodW1ic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICBsZXQgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuVEhVTUJTKTtcbiAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbltqXSA9PT0gdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgfVxuXG4gIHNldFRpbWVyKGludGVydmFsKSB7XG4gICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgIH0sIGludGVydmFsKTtcbiAgfVxuXG4gIGNsZWFyVGltZXIoKSB7XG4gICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVUaW1lcihpbnRlcnZhbCkge1xuICAgIGlmICh0aGlzLnRpbWVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRUaW1lcihpbnRlcnZhbCk7XG4gICAgfVxuICB9XG5cbiAgc2hvd1ByZXZTbGlkZSgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBY3RpdmVTbGlkZSgpO1xuICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgIGluZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMTtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpO1xuICB9XG5cbiAgc2hvd05leHRTbGlkZSgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBY3RpdmVTbGlkZSgpO1xuICAgIGlmIChpbmRleCA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgIGluZGV4Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gMDtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpO1xuICB9XG5cbiAgZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnNsaWRlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoU2xpZGVyLkFDVElWRV9TTElERSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KSB7XG4gICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGgpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNsaWRlTGlzdFtpbmRleF0uY2xhc3NMaXN0LmFkZChTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogICAgIGpzbmF1dGljLnNwZWMuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBPY3RvYmVyIDIwMTYsIEFwcmlsIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL2Jsb2Nrcy9uYXZiYXIvbmF2YmFyJztcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi4vYmxvY2tzL3NsaWRlci9zbGlkZXInO1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vYmxvY2tzL3NpZGViYXIvc2lkZWJhcic7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXInKSkge1xuXG4gICAgTmF2YmFyLmluaXQoKTtcblxuICB9XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKSkge1xuXG4gICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXIoKTtcbiAgICBzbGlkZXIuaW5pdCgpO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKSkge1xuXG4gICAgU2lkZWJhci5pbml0KCk7XG5cbiAgfVxuXG59KTtcbiIsIi8qKlxuICogICAgIGpzbmF1dGljLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQXByaWwgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpzTmF1dGljIHtcblxuICBzdGF0aWMgZ2V0QWN0aXZlSW5kZXgoY2xhc3NOYW1lLCBhY3RpdmVDbGFzc05hbWUpIHtcbiAgICBsZXQgbm9kZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhhY3RpdmVDbGFzc05hbWUpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBzdGF0aWMgdG9nZ2xlQ2xhc3NCeUluZGV4KHRhcmdldENsYXNzLCBzZXRDbGFzc05hbWUsIGluZGV4KSB7XG4gICAgbGV0IG5vZGVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0YXJnZXRDbGFzcyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhzZXRDbGFzc05hbWUpKSB7XG4gICAgICAgIG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoc2V0Q2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCBub2RlTGlzdC5sZW5ndGgpKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRhcmdldENsYXNzKVtpbmRleF0uY2xhc3NMaXN0LmFkZChzZXRDbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB5aWlBamF4UmVxdWVzdCh1cmwsIGJvZHkpIHtcblxuICAgIGxldCBjc3JmUGFyYW1NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtcGFyYW0nKVswXTtcbiAgICBsZXQgY3NyZlRva2VuTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXRva2VuJylbMF07XG4gICAgbGV0IGNzcmZQYXJhbSA9IGNzcmZQYXJhbU1ldGEgP1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtcGFyYW0nKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSA6XG4gICAgICBudWxsO1xuICAgIGxldCBjc3JmVG9rZW4gPSBjc3JmVG9rZW5NZXRhID9cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXRva2VuJylbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JykgOlxuICAgICAgbnVsbDtcbiAgICBsZXQgdG9rZW4gPSBjc3JmUGFyYW0gKyAnPScgKyBjc3JmVG9rZW47XG5cbiAgICBsZXQgcmVxdWVzdCA9IHt9O1xuICAgIHJlcXVlc3QubWV0aG9kID0gJ3Bvc3QnO1xuICAgIHJlcXVlc3QuaGVhZGVycyA9IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04J1xuICAgIH07XG4gICAgcmVxdWVzdC5jcmVkZW50aWFscyA9ICdpbmNsdWRlJztcbiAgICByZXF1ZXN0LmJvZHkgPSBib2R5ICsgJyYnICsgdG9rZW47XG4gICAgcmV0dXJuIGZldGNoKHVybCwgcmVxdWVzdClcbiAgICAgIC50aGVuKGpzTmF1dGljLnN0YXR1cylcbiAgICAgIC50aGVuKGpzTmF1dGljLmpzb24pO1xuXG4gIH1cblxuICBzdGF0aWMgc3RhdHVzKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XG4gIH1cblxuICBzdGF0aWMganNvbihyZXNwb25zZSkge1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogSFRNTCBoZWxwZXJcbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQW5kcmlpIFNvcm9raW5cbiAqL1xudmFyIGh0bWwgPSBtb2R1bGUuZXhwb3J0cztcblxudmFyIGZvckVhY2ggPSByZXF1aXJlKCdsb2Rhc2guZm9yZWFjaCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoLmlzb2JqZWN0Jyk7XG52YXIgaXNTdHJpbmcgPSByZXF1aXJlKCdsb2Rhc2guaXNzdHJpbmcnKTtcbnZhciBpc0VsZW1lbnQgPSByZXF1aXJlKCdsb2Rhc2guaXNlbGVtZW50Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICBodG1sVGFnICAgICBIVE1MIHRhZ1xuICogQHBhcmFtICB7U3RyaW5nLCBBcnJheX0gIGlubmVySFRNTCAgIEhUTUwgb3IgYXJyYXkgb2YgRE9NIGVsZW1lbnRzXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgYXR0cnMgICAgICAgQXR0cmlidXRlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZXhhbXBsZS1pZCcsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogWydleGFtcGxlLWNsYXNzLTEnLCAnZXhhbXBsZS1jbGFzcy0yJ11cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgc3R5bGUgICAgICAgQ1NTIHN0eWxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzEwcHgnXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogQHJldHVybiB7RE9NIGVsZW1lbnR9XG4gKi9cbmh0bWwudGFnID0gZnVuY3Rpb24gKGh0bWxUYWcsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG5cbiAgdmFyIGVsZW1lbnQ7XG5cbiAgaXNTdHJpbmcoaHRtbFRhZykgP1xuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGh0bWxUYWcpIDpcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgaWYgKGlzT2JqZWN0KGF0dHJzKSkge1xuICAgIGZvckVhY2goYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICB2YXIgdmFsdWVTdHI7XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWVTdHIgPSB2YWx1ZS5qb2luKCcgJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZVN0ciA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZVN0cik7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaW5uZXJIVE1MICE9PSBudWxsKSB7XG4gICAgaWYgKGlzU3RyaW5nKGlubmVySFRNTCkpIHtcbiAgICAgIChlbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGlubmVySFRNTCkpIHtcbiAgICAgIGZvckVhY2goaW5uZXJIVE1MLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKGlzRWxlbWVudCh2YWx1ZSkpIHtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2JqZWN0KHN0eWxlKSkge1xuICAgIGZvckVhY2goc3R5bGUsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIGxpbmtcbiAqIEBwYXJhbSAge1N0cmluZywgQXJyYXl9ICBpbm5lckhUTUwgICBIVE1MIG9yIGFycmF5IG9mIERPTSBlbGVtZW50c1xuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIHVybCAgICAgICAgIFdlYiBhZGRyZXNzXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgYXR0cnMgICAgICAgQXR0cmlidXRlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZXhhbXBsZS1pZCcsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogWydleGFtcGxlLWNsYXNzLTEnLCAnZXhhbXBsZS1jbGFzcy0yJ11cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgc3R5bGUgICAgICAgQ1NTIHN0eWxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzEwcHgnXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogQHJldHVybiB7RE9NIGVsZW1lbnR9ICAgICAgICAgICAgICAgIExpbmsgZWxlbWVudFxuICovXG5odG1sLmEgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCB1cmwsIGF0dHJzLCBzdHlsZSkge1xuICB2YXIgZWxlbWVudCA9IGh0bWwudGFnKCdhJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xuICBpZiAoaXNTdHJpbmcodXJsKSkge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgZGl2XG4gKi9cbmh0bWwuZGl2ID0gZnVuY3Rpb24gKGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG4gIHJldHVybiBodG1sLnRhZygnZGl2JywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBwYXJhZ3JhcGhcbiAqL1xuaHRtbC5wID0gZnVuY3Rpb24gKGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG4gIHJldHVybiBodG1sLnRhZygncCcsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgaGVhZGVyIDFcbiAqL1xuaHRtbC5oMSA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuICByZXR1cm4gaHRtbC50YWcoJ2gxJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBoZWFkZXIgMlxuICovXG5odG1sLmgyID0gZnVuY3Rpb24gKGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG4gIHJldHVybiBodG1sLnRhZygnaDInLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIGhlYWRlciAzXG4gKi9cbmh0bWwuaDMgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdoMycsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgaGVhZGVyIDRcbiAqL1xuaHRtbC5oNCA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuICByZXR1cm4gaHRtbC50YWcoJ2g0JywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiB1bm1hcmtlZCBsaXN0XG4gKi9cbmh0bWwudWwgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCd1bCcsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgaXRlbSBvZiBsaXN0XG4gKi9cbmh0bWwubGkgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdsaScsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2Ygc3BhblxuICovXG5odG1sLnNwYW4gPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdzcGFuJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xudmFyIGJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2goYmFzZUZvck93bik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzIG92ZXIgYG9iamVjdGBcbiAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG52YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBiYXNlRWFjaGAgb3IgYGJhc2VFYWNoUmlnaHRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9XG4gICAgaWYgKCFpc0FycmF5TGlrZShjb2xsZWN0aW9uKSkge1xuICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChjb2xsZWN0aW9uKTtcblxuICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJhc2UgZnVuY3Rpb24gZm9yIG1ldGhvZHMgbGlrZSBgXy5mb3JJbmAgYW5kIGBfLmZvck93bmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUZvcihmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogQXMgd2l0aCBvdGhlciBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcywgb2JqZWN0cyB3aXRoIGEgXCJsZW5ndGhcIlxuICogcHJvcGVydHkgYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIHVzZSBgXy5mb3JJbmBcbiAqIG9yIGBfLmZvck93bmAgZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGFsaWFzIGVhY2hcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICogQHNlZSBfLmZvckVhY2hSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiBfKFsxLCAyXSkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICogICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgYDFgIHRoZW4gYDJgLlxuICpcbiAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlFYWNoIDogYmFzZUVhY2g7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIHR5cGVvZiBpdGVyYXRlZSA9PSAnZnVuY3Rpb24nID8gaXRlcmF0ZWUgOiBpZGVudGl0eSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2g7XG4iLCIvKipcbiAqIGxvZGFzaCA0LjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNiBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE2IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgRE9NIGVsZW1lbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBET00gZWxlbWVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRWxlbWVudChkb2N1bWVudC5ib2R5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRWxlbWVudCgnPGJvZHk+Jyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0VsZW1lbnQodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdmFsdWUubm9kZVR5cGUgPT09IDEgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiAhaXNQbGFpbk9iamVjdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fFxuICAgICAgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT0gb2JqZWN0VGFnIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG4gICAgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbGVtZW50O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogbG9kYXNoIDQuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE2IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTYgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIEZ1bmN0aW9uXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTdHJpbmdgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTdHJpbmcoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTdHJpbmcoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8XG4gICAgKCFpc0FycmF5KHZhbHVlKSAmJiBpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN0cmluZ1RhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTdHJpbmc7XG4iXX0=
