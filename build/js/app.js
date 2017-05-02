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
          _yiiAjax2.default.post('/ajax/cat', {
            id: item.dataset.id
          }).then(function (data) {
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
          _yiiAjax2.default.post('/ajax/tag', {
            id: item.dataset.id
          }).then(function (data) {
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

},{"html-helper":5,"yii-ajax":11}],3:[function(require,module,exports){
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

},{"lodash.foreach":6,"lodash.isarray":7,"lodash.iselement":8,"lodash.isobject":9,"lodash.isstring":10}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
/**
 * @license
 * Ajax Module for Yii2
 * Released under MIT license
 * Copyright Andrii Sorokin
 */

let yiiAjax = module.exports;

let forEach = require('lodash.foreach');
let isObject = require('lodash.isobject');

let status = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

let json = function(response) {
  return response.json();
};

let extractData = function(data) {
  let result = '';
  if (isObject(data)) {
    forEach(data, function (value, key) {
      result += key + '=' + value + '&';
    });
  }
  return result;
};

let getCSRF = function(param, token) {
  let csrfParamMeta = document.getElementsByName(param)[0];
  let csrfTokenMeta = document.getElementsByName(token)[0];
  let csrfParam = csrfParamMeta ?
    document.getElementsByName(param)[0].getAttribute('content') : null;
  let csrfToken = csrfTokenMeta ?
    document.getElementsByName(token)[0].getAttribute('content') : null;
  return csrfParam + '=' + csrfToken;
};

let headers = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
};

yiiAjax.post = function (url, data) {

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

},{"lodash.foreach":12,"lodash.isobject":13}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL25hdmJhci9uYXZiYXIuanMiLCJkZXYvYmxvY2tzL3NpZGViYXIvc2lkZWJhci5qcyIsImRldi9ibG9ja3Mvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy9odG1sLWhlbHBlci9ub2RlX21vZHVsZXMvbG9kYXNoLmZvcmVhY2gvaW5kZXguanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNhcnJheS9pbmRleC5qcyIsImRldi9ub2RlX21vZHVsZXMvaHRtbC1oZWxwZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VsZW1lbnQvaW5kZXguanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNvYmplY3QvaW5kZXguanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNzdHJpbmcvaW5kZXguanMiLCJkZXYvbm9kZV9tb2R1bGVzL3lpaS1hamF4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsyQkFFTDtBQUNaLFVBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixXQUF2QixDQUFwQjtBQUNBLG9CQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLE9BQU8sV0FBL0MsRUFBNEQsS0FBNUQ7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVY7QUFBQSxVQUNFLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBRFQ7QUFFQSxVQUFJLFNBQUosQ0FBYyxHQUFkLENBQWtCLGdC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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogICAgIGpzbmF1dGljLnNwZWMuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZiYXIge1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIGxldCBuYXZiYXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJyk7XG4gICAgbmF2YmFyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIE5hdmJhci5zZXREcm9wZG93biwgZmFsc2UpO1xuICB9XG5cbiAgc3RhdGljIHNldERyb3Bkb3duKCkge1xuICAgIGxldCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1idG4nKSxcbiAgICAgIGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdtZW51LWJ0bi1ibGluaycpO1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1kcmFwZG93bicpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqICAgICBzaWRlYmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IHlpaUFqYXggZnJvbSAneWlpLWFqYXgnO1xuaW1wb3J0IGh0bWwgZnJvbSAnaHRtbC1oZWxwZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWRlYmFyIHtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBTaWRlYmFyLmNyZWF0ZUJveERpdigpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCk7XG4gICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9MaW5rcygpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvTGlua0xpc3QoKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQb3B1cCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUJveERpdigpIHtcbiAgICBsZXQgbGlua3MgPSBodG1sLnVsKG51bGwsIHtcbiAgICAgIGlkOiAncG9wdXAtbGlua3MnLFxuICAgICAgY2xhc3M6ICdwb3B1cC1ib3hfX2xpbmtzJ1xuICAgIH0pO1xuICAgIGxldCB0cmlhbmdsZSA9IGh0bWwuZGl2KG51bGwsIHtcbiAgICAgIGNsYXNzOiAncG9wdXAtYm94X190cmlhbmdsZSdcbiAgICB9KTtcbiAgICBsZXQgZGl2ID0gaHRtbC5kaXYoXG4gICAgICBbXG4gICAgICAgIHRyaWFuZ2xlLFxuICAgICAgICBsaW5rc1xuICAgICAgXSwge1xuICAgICAgICBpZDogJ3BvcHVwLWJveCcsXG4gICAgICAgIGNsYXNzOiAncG9wdXAtYm94J1xuICAgICAgfSwge1xuICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgIHRvcDogJy0xMDAwcHgnXG4gICAgICB9XG4gICAgKTtcblxuICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICBjYXRMaXN0LmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuICBzdGF0aWMgc2V0UG9wdXBEYXRhKGRhdGEpIHtcbiAgICBsZXQgcG9wdXBCb3ggPSBTaWRlYmFyLmdldFBvcHVwKCk7XG4gICAgaWYgKHBvcHVwQm94KSB7XG4gICAgICBsZXQgbGlua0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtbGlua3MnKTtcbiAgICAgIGxpbmtMaXN0LmlubmVySFRNTCA9IG51bGw7XG5cbiAgICAgIGxldCB0YWcgPSBodG1sLnNwYW4oZGF0YS5uYW1lKTtcbiAgICAgIGxpbmtMaXN0LmFwcGVuZENoaWxkKHRhZyk7XG5cbiAgICAgIGRhdGEubGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgICBsaW5rTGlzdC5hcHBlbmRDaGlsZChodG1sLmxpKGxpbmspKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXRQb3B1cFBvc2l0aW9uKGxlZnQsIHRvcCkge1xuICAgIGxldCBwb3B1cEJveCA9IFNpZGViYXIuZ2V0UG9wdXAoKTtcbiAgICBpZiAocG9wdXBCb3gpIHtcbiAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICBwb3B1cEJveC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGhhbmRsZUxpc3RNb3VzZU92ZXIoKSB7XG4gICAgbGV0IHBvcHVwQm94ID0gU2lkZWJhci5nZXRQb3B1cCgpO1xuICAgIGlmICghcG9wdXBCb3gpIHtcbiAgICAgIHBvcHVwQm94ID0gU2lkZWJhci5nZXRQb3B1cCgpO1xuICAgIH1cbiAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKSB7XG5cbiAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgIGxldCB0YWdDbG91ZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWctY2xvdWQnKTtcbiAgICBsZXQgcG9wdXBCb3ggPSBTaWRlYmFyLmdldFBvcHVwKCk7XG5cbiAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoZS5yZWxhdGVkVGFyZ2V0ICE9PSBwb3B1cEJveCkge1xuICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgcG9wdXBCb3guc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRhZ0Nsb3VkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoZS5yZWxhdGVkVGFyZ2V0ICE9PSBwb3B1cEJveCkge1xuICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgcG9wdXBCb3guc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHBvcHVwQm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgIGUgPT4ge1xuICAgICAgICBpZiAoKCFjYXRMaXN0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpICYmXG4gICAgICAgICAgKCF0YWdDbG91ZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSAmJlxuICAgICAgICAgICghcG9wdXBCb3guY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkpIHtcbiAgICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvTGlua3MoKSB7XG5cbiAgICBsZXQgY2F0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NhdC1saXN0IC5saW5rLWxpc3RfX2l0ZW0nKSk7XG4gICAgbGV0IHRhZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN0YWctY2xvdWQgLmxpbmstbGlzdF9faXRlbScpKTtcblxuICAgIGNhdHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHlpaUFqYXgucG9zdCgnL2FqYXgvY2F0Jywge1xuICAgICAgICAgICAgaWQ6IGl0ZW0uZGF0YXNldC5pZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgbGV0IGxlZnQgPSBlLnBhZ2VYICsgNSxcbiAgICAgICAgICAgICAgICB0b3AgPSBpdGVtLm9mZnNldFRvcCArIDE1O1xuICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwRGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cFBvc2l0aW9uKGxlZnQsIHRvcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfSk7XG4gICAgdGFncy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHlpaUFqYXgucG9zdCgnL2FqYXgvdGFnJywge1xuICAgICAgICAgICAgaWQ6IGl0ZW0uZGF0YXNldC5pZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgbGV0IGxlZnQgPSBpdGVtLm9mZnNldExlZnQgKyBpdGVtLm9mZnNldFdpZHRoIC0gMTUsXG4gICAgICAgICAgICAgICAgdG9wID0gaXRlbS5vZmZzZXRUb3AgKyBpdGVtLm9mZnNldEhlaWdodCAtIDE7XG4gICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwUG9zaXRpb24obGVmdCwgdG9wKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9MaW5rTGlzdCgpIHtcblxuICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1saXN0Jyk7XG4gICAgbGV0IHRhZ0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG5cbiAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFNpZGViYXIuaGFuZGxlTGlzdE1vdXNlT3Zlcik7XG4gICAgdGFnTGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBTaWRlYmFyLmhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogICAgIHNsaWRlci5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XG5cbiAgc3RhdGljIFRIVU1CUyA9ICcudGh1bWJzJztcbiAgc3RhdGljIFRIVU1CID0gJy50aHVtYnNfX3RodW1iJztcbiAgc3RhdGljIFNMSURFUiA9ICcuc2xpZGVyJztcbiAgc3RhdGljIFNMSURFID0gJy5zbGlkZXJfX3NsaWRlJztcbiAgc3RhdGljIEFDVElWRV9TTElERSA9ICdzbGlkZXJfX3NsaWRlX2FjdGl2ZSc7XG4gIHN0YXRpYyBMRUZUX0JUTiA9ICcuc2xpZGVyX19idG5ib3hfbGVmdCc7XG4gIHN0YXRpYyBSSUdIVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X3JpZ2h0JztcblxuICBpbml0KCkge1xuXG4gICAgdGhpcy5zbGlkZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5TTElERSk7XG4gICAgdGhpcy5zZXRUaW1lcig1MDAwKTtcblxuICAgIGxldCBhY3RpdmVTbGlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgaWYgKGFjdGl2ZVNsaWRlLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KDApO1xuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLkxFRlRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zaG93UHJldlNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuUklHSFRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuU0xJREVSKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlVGltZXIoMjAwMCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgbGV0IHRodW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlRIVU1CKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1icy5sZW5ndGg7IGkrKykge1xuICAgICAgdGh1bWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5USFVNQlMpO1xuICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuW2pdID09PSB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICB9XG5cbiAgc2V0VGltZXIoaW50ZXJ2YWwpIHtcbiAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgfSwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgY2xlYXJUaW1lcigpIHtcbiAgICBpZiAodGhpcy50aW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVRpbWVyKGludGVydmFsKSB7XG4gICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFRpbWVyKGludGVydmFsKTtcbiAgICB9XG4gIH1cblxuICBzaG93UHJldlNsaWRlKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgaW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gIH1cblxuICBzaG93TmV4dFNsaWRlKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgaW5kZXgrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gIH1cblxuICBnZXRJbmRleE9mQWN0aXZlU2xpZGUoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhTbGlkZXIuQUNUSVZFX1NMSURFKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB0b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoKGluZGV4ID49IDApICYmIChpbmRleCA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVMaXN0W2luZGV4XS5jbGFzc0xpc3QuYWRkKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiAgICAganNuYXV0aWMuc3BlYy5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIE9jdG9iZXIgMjAxNiwgQXByaWwgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vYmxvY2tzL25hdmJhci9uYXZiYXInO1xuaW1wb3J0IFNsaWRlciBmcm9tICcuLi9ibG9ja3Mvc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQgU2lkZWJhciBmcm9tICcuLi9ibG9ja3Mvc2lkZWJhci9zaWRlYmFyJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpKSB7XG5cbiAgICBOYXZiYXIuaW5pdCgpO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpKSB7XG5cbiAgICBsZXQgc2xpZGVyID0gbmV3IFNsaWRlcigpO1xuICAgIHNsaWRlci5pbml0KCk7XG5cbiAgfVxuXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpKSB7XG5cbiAgICBTaWRlYmFyLmluaXQoKTtcblxuICB9XG5cbn0pO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogSFRNTCBoZWxwZXJcbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG52YXIgaHRtbCA9IG1vZHVsZS5leHBvcnRzO1xuXG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2xvZGFzaC5mb3JlYWNoJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCdsb2Rhc2guaXNvYmplY3QnKTtcbnZhciBpc1N0cmluZyA9IHJlcXVpcmUoJ2xvZGFzaC5pc3N0cmluZycpO1xudmFyIGlzRWxlbWVudCA9IHJlcXVpcmUoJ2xvZGFzaC5pc2VsZW1lbnQnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudFxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIGh0bWxUYWcgICAgIEhUTUwgdGFnXG4gKiBAcGFyYW0gIHtTdHJpbmcsIEFycmF5fSAgaW5uZXJIVE1MICAgSFRNTCBvciBhcnJheSBvZiBET00gZWxlbWVudHNcbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBhdHRycyAgICAgICBBdHRyaWJ1dGVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdleGFtcGxlLWlkJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbJ2V4YW1wbGUtY2xhc3MtMScsICdleGFtcGxlLWNsYXNzLTInXVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBzdHlsZSAgICAgICBDU1Mgc3R5bGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMTBweCdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcmV0dXJuIHtET00gZWxlbWVudH1cbiAqL1xuaHRtbC50YWcgPSBmdW5jdGlvbiAoaHRtbFRhZywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcblxuICB2YXIgZWxlbWVudDtcblxuICBpc1N0cmluZyhodG1sVGFnKSA/XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHRtbFRhZykgOlxuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBpZiAoaXNPYmplY3QoYXR0cnMpKSB7XG4gICAgZm9yRWFjaChhdHRycywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIHZhciB2YWx1ZVN0cjtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZVN0ciA9IHZhbHVlLmpvaW4oJyAnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlU3RyID0gdmFsdWU7XG4gICAgICB9XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlU3RyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChpbm5lckhUTUwgIT09IG51bGwpIHtcbiAgICBpZiAoaXNTdHJpbmcoaW5uZXJIVE1MKSkge1xuICAgICAgKGVsZW1lbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoaW5uZXJIVE1MKSkge1xuICAgICAgZm9yRWFjaChpbm5lckhUTUwsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoaXNFbGVtZW50KHZhbHVlKSkge1xuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPYmplY3Qoc3R5bGUpKSB7XG4gICAgZm9yRWFjaChzdHlsZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgbGlua1xuICogQHBhcmFtICB7U3RyaW5nLCBBcnJheX0gIGlubmVySFRNTCAgIEhUTUwgb3IgYXJyYXkgb2YgRE9NIGVsZW1lbnRzXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgdXJsICAgICAgICAgV2ViIGFkZHJlc3NcbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBhdHRycyAgICAgICBBdHRyaWJ1dGVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdleGFtcGxlLWlkJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbJ2V4YW1wbGUtY2xhc3MtMScsICdleGFtcGxlLWNsYXNzLTInXVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBzdHlsZSAgICAgICBDU1Mgc3R5bGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMTBweCdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcmV0dXJuIHtET00gZWxlbWVudH0gICAgICAgICAgICAgICAgTGluayBlbGVtZW50XG4gKi9cbmh0bWwuYSA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIHVybCwgYXR0cnMsIHN0eWxlKSB7XG4gIHZhciBlbGVtZW50ID0gaHRtbC50YWcoJ2EnLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG4gIGlmIChpc1N0cmluZyh1cmwpKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICB9XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBkaXZcbiAqL1xuaHRtbC5kaXYgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdkaXYnLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIHBhcmFncmFwaFxuICovXG5odG1sLnAgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdwJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBoZWFkZXIgMVxuICovXG5odG1sLmgxID0gZnVuY3Rpb24gKGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG4gIHJldHVybiBodG1sLnRhZygnaDEnLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIGhlYWRlciAyXG4gKi9cbmh0bWwuaDIgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcbiAgcmV0dXJuIGh0bWwudGFnKCdoMicsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgaGVhZGVyIDNcbiAqL1xuaHRtbC5oMyA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuICByZXR1cm4gaHRtbC50YWcoJ2gzJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBoZWFkZXIgNFxuICovXG5odG1sLmg0ID0gZnVuY3Rpb24gKGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG4gIHJldHVybiBodG1sLnRhZygnaDQnLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIHVubWFya2VkIGxpc3RcbiAqL1xuaHRtbC51bCA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuICByZXR1cm4gaHRtbC50YWcoJ3VsJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBpdGVtIG9mIGxpc3RcbiAqL1xuaHRtbC5saSA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuICByZXR1cm4gaHRtbC50YWcoJ2xpJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBzcGFuXG4gKi9cbmh0bWwuc3BhbiA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuICByZXR1cm4gaHRtbC50YWcoJ3NwYW4nLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG59O1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG52YXIgYmFzZUVhY2ggPSBjcmVhdGVCYXNlRWFjaChiYXNlRm9yT3duKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRWFjaChlYWNoRnVuYywgZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cbiAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXR1cm4gZWFjaEZ1bmMoY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICogb3IgYF8uZm9yT3duYCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAYWxpYXMgZWFjaFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8oWzEsIDJdKS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gKlxuICogXy5mb3JFYWNoKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUVhY2ggOiBiYXNlRWFjaDtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgdHlwZW9mIGl0ZXJhdGVlID09ICdmdW5jdGlvbicgPyBpdGVyYXRlZSA6IGlkZW50aXR5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcbiIsIi8qKlxuICogbG9kYXNoIDQuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE2IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTYgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSBGdW5jdGlvblxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBET00gZWxlbWVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIERPTSBlbGVtZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNFbGVtZW50KGRvY3VtZW50LmJvZHkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbGVtZW50KCc8Ym9keT4nKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRWxlbWVudCh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMSAmJiBpc09iamVjdExpa2UodmFsdWUpICYmICFpc1BsYWluT2JqZWN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG4gICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnQ7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBsb2Rhc2ggNC4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTYgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNiBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgRnVuY3Rpb25cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N0cmluZygnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N0cmluZygxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHxcbiAgICAoIWlzQXJyYXkodmFsdWUpICYmIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3RyaW5nVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmluZztcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIEFqYXggTW9kdWxlIGZvciBZaWkyXG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogQ29weXJpZ2h0IEFuZHJpaSBTb3Jva2luXG4gKi9cblxubGV0IHlpaUFqYXggPSBtb2R1bGUuZXhwb3J0cztcblxubGV0IGZvckVhY2ggPSByZXF1aXJlKCdsb2Rhc2guZm9yZWFjaCcpO1xubGV0IGlzT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoLmlzb2JqZWN0Jyk7XG5cbmxldCBzdGF0dXMgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpKTtcbn07XG5cbmxldCBqc29uID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn07XG5cbmxldCBleHRyYWN0RGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBpZiAoaXNPYmplY3QoZGF0YSkpIHtcbiAgICBmb3JFYWNoKGRhdGEsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICByZXN1bHQgKz0ga2V5ICsgJz0nICsgdmFsdWUgKyAnJic7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmxldCBnZXRDU1JGID0gZnVuY3Rpb24ocGFyYW0sIHRva2VuKSB7XG4gIGxldCBjc3JmUGFyYW1NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUocGFyYW0pWzBdO1xuICBsZXQgY3NyZlRva2VuTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHRva2VuKVswXTtcbiAgbGV0IGNzcmZQYXJhbSA9IGNzcmZQYXJhbU1ldGEgP1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHBhcmFtKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSA6IG51bGw7XG4gIGxldCBjc3JmVG9rZW4gPSBjc3JmVG9rZW5NZXRhID9cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0b2tlbilbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JykgOiBudWxsO1xuICByZXR1cm4gY3NyZlBhcmFtICsgJz0nICsgY3NyZlRva2VuO1xufTtcblxubGV0IGhlYWRlcnMgPSB7XG4gICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04J1xufTtcblxueWlpQWpheC5wb3N0ID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuXG4gIGxldCB0b2tlbiA9IGdldENTUkYoJ2NzcmYtcGFyYW0nLCAnY3NyZi10b2tlbicpO1xuICBsZXQgYm9keSA9IGV4dHJhY3REYXRhKGRhdGEpICsgdG9rZW47XG4gIGxldCByZXF1ZXN0ID0ge1xuICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICBib2R5OiBib2R5XG4gIH07XG4gIHJldHVybiBmZXRjaCh1cmwsIHJlcXVlc3QpXG4gICAgLnRoZW4oc3RhdHVzKVxuICAgIC50aGVuKGpzb24pO1xufTtcbiJdfQ==
