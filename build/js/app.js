(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}(); /**
      *     form.js for Jetro project
      *     Created by Andrii Sorokin on 5/7/17
      *     https://github.com/ignorantic/jetro.git
      */

var _isEmpty = require('validator/lib/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// import isEmail from 'validator/lib/isEmail';

var FeedbackForm = function () {
  function FeedbackForm() {
    _classCallCheck(this, FeedbackForm);
  }

  _createClass(FeedbackForm, null, [{
    key: 'init',
    value: function init() {
      FeedbackForm.first = false;
      FeedbackForm.last = false;
      // FeedbackForm.email = false;
      FeedbackForm.body = false;
      (0, FeedbackForm.addEventListenerToInputs)();
    }
  }, {
    key: 'addEventListenerToInputs',
    value: function addEventListenerToInputs() {
      var firstInput = document.querySelector('#input-first-name');
      firstInput.addEventListener('blur', function (e) {
        if ((0, _isEmpty2.default)(firstInput.value)) {
          e.target.classList.add('input_state_error');
        } else {
          e.target.classList.remove('input_state_error');
        }
      }, false);
    }
  }]);

  return FeedbackForm;
}();

exports.default = FeedbackForm;

},{"validator/lib/isEmpty":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 *     navbar.js for Jetro project
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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}(); /**
      *     sidebar.js for Jetro project
      *     Created by Andrii Sorokin on 4/23/17
      *     https://github.com/ignorantic/jetro.git
      */

var _yiiAjax = require('yii-ajax');

var _yiiAjax2 = _interopRequireDefault(_yiiAjax);

var _htmlHelper = require('html-helper');

var _htmlHelper2 = _interopRequireDefault(_htmlHelper);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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
      var links = _htmlHelper2.default.tag('ul', null, {
        id: 'popup-links',
        class: 'popup-box__links'
      });
      var triangle = _htmlHelper2.default.tag('div', null, {
        class: 'popup-box__triangle'
      });
      var div = _htmlHelper2.default.tag('div', [triangle, links], {
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
            if (data.error) {
              return;
            }
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
            if (data.error) {
              return;
            }
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
        linkList.appendChild(_htmlHelper2.default.tag('span', data.name));
        data.links.forEach(function (link) {
          linkList.appendChild(_htmlHelper2.default.tag('li', link));
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

},{"html-helper":6,"yii-ajax":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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
          parent.addEventListener('click', function (e) {
            var target = e.target || e.srcElement;
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

},{}],5:[function(require,module,exports){
'use strict';

var _navbar = require('../components/navbar/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _slider = require('../components/slider/slider');

var _slider2 = _interopRequireDefault(_slider);

var _sidebar = require('../components/sidebar/sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _form = require('../components/form/form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 *     app.js for Jetro project
 *     Created by Andrii Sorokin on 10/9/16
 *     https://github.com/ignorantic/jetro.git
 */

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

  if (document.querySelector('.feedback__form')) {

    _form2.default.init();
  }
});

},{"../components/form/form":1,"../components/navbar/navbar":2,"../components/sidebar/sidebar":3,"../components/slider/slider":4}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  var element = void 0;

  function addAttrs() {
    for (var key in attrs) {
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
  }

  function addChildren() {
    if (typeof innerHTML === 'string') {
      element.innerHTML = innerHTML;
      return;
    }
    if (innerHTML instanceof HTMLElement) {
      element.appendChild(innerHTML);
      return;
    }
    if (Array.isArray(innerHTML)) {
      innerHTML.forEach(function (value) {
        if (value instanceof HTMLElement) {
          element.appendChild(value);
        }
      });
    }
  }

  function addStyles() {
    var key = void 0;
    for (key in style) {
      if (!Object.prototype.hasOwnProperty.call(style, key)) {
        continue;
      }
      if (typeof style[key] === 'string') {
        element.style[key] = style[key];
      }
    }
  }

  /* BEGIN */

  if (typeof htmlTag === 'string') {
    element = document.createElement(htmlTag);
  } else {
    element = document.createElement('div');
  }

  if ((typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) === 'object') {
    addAttrs();
  }

  if (innerHTML) {
    addChildren();
  }

  if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) === 'object') {
    addStyles();
  }

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

},{}],7:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license
 * Ajax Module for Yii2
 * Released under MIT license
 * Copyright Andrii Sorokin
 */

var yiiAjax = module.exports;

function error(e) {
  return {
    error: e
  };
}

function extractData(data) {
  var result = '';
  var key = void 0;
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    for (key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue;
      }
      result += key + '=' + data[key] + '&';
    }
  }
  return result;
}

function getCSRF(param, token) {
  var csrfParamMeta = document.getElementsByName(param)[0];
  var csrfTokenMeta = document.getElementsByName(token)[0];
  var csrfParam = csrfParamMeta ? document.getElementsByName(param)[0].getAttribute('content') : null;
  var csrfToken = csrfTokenMeta ? document.getElementsByName(token)[0].getAttribute('content') : null;
  return csrfParam + '=' + csrfToken;
}

function json(response) {
  return response.json();
}

function status(response) {
  if (response.ok) {
    return response;
  }
  throw new Error(response.statusText);
}

yiiAjax.post = function (url, data) {
  return yiiAjax.request(url, data, 'post');
};

yiiAjax.request = function (url, data, method) {

  var headers = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  var token = getCSRF('csrf-param', 'csrf-token');
  var body = extractData(data) + token;
  var request = {
    method: method,
    headers: headers,
    credentials: 'include',
    body: body
  };
  return fetch(url, request).then(status).then(json).catch(error);
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

var _assertString = require('./util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmpty(str) {
  (0, _assertString2.default)(str);
  return str.length === 0;
}
module.exports = exports['default'];
},{"./util/assertString":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];
},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9mb3JtL2Zvcm0uanMiLCJkZXYvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy95aWktYWpheC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzRW1wdHkuanMiLCJub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi91dGlsL2Fzc2VydFN0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0tDQUE7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7OztBQUNBOztJLEFBRXFCOzs7Ozs7OzJCQU9MLEFBQ1o7bUJBQUEsQUFBYSxRQUFiLEFBQXFCLEFBQ3JCO21CQUFBLEFBQWEsT0FBYixBQUFvQixBQUNwQjtBQUNBO21CQUFBLEFBQWEsT0FBYixBQUFvQixBQUNwQjtPQUFDLEdBQUcsYUFBSixBQUFpQixBQUNsQjs7OzsrQ0FFaUMsQUFDaEM7VUFBSSxhQUFhLFNBQUEsQUFBUyxjQUExQixBQUFpQixBQUF1QixBQUN4QztpQkFBQSxBQUFXLGlCQUFYLEFBQTRCLFFBQVEsYUFBSyxBQUN2QztZQUFJLHVCQUFRLFdBQVosQUFBSSxBQUFtQixRQUFRLEFBQzdCO1lBQUEsQUFBRSxPQUFGLEFBQVMsVUFBVCxBQUFtQixJQUFuQixBQUF1QixBQUN4QjtBQUZELGVBRU8sQUFDTDtZQUFBLEFBQUUsT0FBRixBQUFTLFVBQVQsQUFBbUIsT0FBbkIsQUFBMEIsQUFDM0I7QUFDRjtBQU5ELFNBQUEsQUFPQSxBQUNEOzs7Ozs7O2tCLEFBekJrQjs7Ozs7Ozs7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QUFPLFFBQVA7QUFDRDtBQUNELFFBQU0sSUFBSSxLQUFKLENBQVUsU0FBUyxVQUFuQixDQUFOO0FBQ0Q7O0FBRUQsUUFBUSxJQUFSLEdBQWUsVUFBVSxHQUFWLEVBQWUsSUFBZixFQUFxQjtBQUNsQyxTQUFPLFFBQVEsT0FBUixDQUFnQixHQUFoQixFQUFxQixJQUFyQixFQUEyQixNQUEzQixDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxRQUFRLE9BQVIsR0FBa0IsVUFBVSxHQUFWLEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2Qjs7QUFFN0MsTUFBSSxVQUFVO0FBQ1osb0JBQWdCO0FBREosR0FBZDtBQUdBLE1BQUksUUFBUSxRQUFRLFlBQVIsRUFBc0IsWUFBdEIsQ0FBWjtBQUNBLE1BQUksT0FBTyxZQUFZLElBQVosSUFBb0IsS0FBL0I7QUFDQSxNQUFJLFVBQVU7QUFDWixZQUFRLE1BREk7QUFFWixhQUFTLE9BRkc7QUFHWixpQkFBYSxTQUhEO0FBSVosVUFBTTtBQUpNLEdBQWQ7QUFNQSxTQUFPLE1BQU0sR0FBTixFQUFXLE9BQVgsRUFDSixJQURJLENBQ0MsTUFERCxFQUVKLElBRkksQ0FFQyxJQUZELEVBR0osS0FISSxDQUdFLEtBSEYsQ0FBUDtBQUlELENBakJEOzs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiAgICAgZm9ybS5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNS83LzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IGlzRW1wdHkgZnJvbSAndmFsaWRhdG9yL2xpYi9pc0VtcHR5Jztcbi8vIGltcG9ydCBpc0VtYWlsIGZyb20gJ3ZhbGlkYXRvci9saWIvaXNFbWFpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrRm9ybSB7XG5cbiAgc3RhdGljIGZpcnN0O1xuICBzdGF0aWMgbGFzdDtcbiAgc3RhdGljIGVtYWlsO1xuICBzdGF0aWMgYm9keTtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBGZWVkYmFja0Zvcm0uZmlyc3QgPSBmYWxzZTtcbiAgICBGZWVkYmFja0Zvcm0ubGFzdCA9IGZhbHNlO1xuICAgIC8vIEZlZWRiYWNrRm9ybS5lbWFpbCA9IGZhbHNlO1xuICAgIEZlZWRiYWNrRm9ybS5ib2R5ID0gZmFsc2U7XG4gICAgKDAsIEZlZWRiYWNrRm9ybS5hZGRFdmVudExpc3RlbmVyVG9JbnB1dHMpKCk7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvSW5wdXRzKCkge1xuICAgIGxldCBmaXJzdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LWZpcnN0LW5hbWUnKTtcbiAgICBmaXJzdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBlID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGZpcnN0SW5wdXQudmFsdWUpKSB7XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lucHV0X3N0YXRlX2Vycm9yJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dF9zdGF0ZV9lcnJvcicpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZmFsc2UpO1xuICB9XG59XG4iLCIvKipcbiAqICAgICBuYXZiYXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZiYXIge1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIGxldCBuYXZiYXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2J0bicpO1xuICAgIG5hdmJhckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBOYXZiYXIuc2V0RHJvcGRvd24sIGZhbHNlKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXREcm9wZG93bigpIHtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2J0bicpLFxuICAgICAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19saXN0Jyk7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2J0bl9ibGluaycpO1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudV9fZHJhcGRvd24nKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51X19idG5fYmxpbmsnKTtcbiAgICB9LCAzMDApO1xuICB9XG5cbn1cbiIsIi8qKlxuICogICAgIHNpZGViYXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5pbXBvcnQgeWlpQWpheCBmcm9tICd5aWktYWpheCc7XG5pbXBvcnQgaHRtbCBmcm9tICdodG1sLWhlbHBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGViYXIge1xuXG4gIHN0YXRpYyB0b3A7XG4gIHN0YXRpYyBsZWZ0O1xuICBzdGF0aWMgZGlzcGxheTtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBTaWRlYmFyLnRvcCA9IC0xMDAwO1xuICAgIFNpZGViYXIubGVmdCA9IDA7XG4gICAgU2lkZWJhci5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIFNpZGViYXIuY3JlYXRlQm94RGl2KCk7XG4gICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKTtcbiAgICBTaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXJUb0xpbmtzKCk7XG4gICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9MaW5rTGlzdCgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUJveERpdigpIHtcbiAgICBsZXQgbGlua3MgPSBodG1sLnRhZygndWwnLCBudWxsLCB7XG4gICAgICBpZDogJ3BvcHVwLWxpbmtzJyxcbiAgICAgIGNsYXNzOiAncG9wdXAtYm94X19saW5rcydcbiAgICB9KTtcbiAgICBsZXQgdHJpYW5nbGUgPSBodG1sLnRhZygnZGl2JywgbnVsbCwge1xuICAgICAgY2xhc3M6ICdwb3B1cC1ib3hfX3RyaWFuZ2xlJ1xuICAgIH0pO1xuICAgIGxldCBkaXYgPSBodG1sLnRhZygnZGl2JywgW3RyaWFuZ2xlLCBsaW5rc10sXG4gICAgICB7XG4gICAgICAgIGlkOiAncG9wdXAtYm94JyxcbiAgICAgICAgY2xhc3M6ICdwb3B1cC1ib3gnXG4gICAgICB9LCB7XG4gICAgICAgIGRpc3BsYXk6IFNpZGViYXIuZGlzcGxheSxcbiAgICAgICAgdG9wOiBTaWRlYmFyLnRvcCArICdweCdcbiAgICAgIH1cbiAgICApO1xuXG4gICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgIGNhdExpc3QuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKSB7XG5cbiAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgIGxldCB0YWdDbG91ZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWctY2xvdWQnKTtcbiAgICBsZXQgcG9wdXBCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG5cbiAgICBsZXQgaGlkZVBvcHVwID0gZSA9PiB7XG4gICAgICBpZiAoIWNhdExpc3QuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSAmJlxuICAgICAgICAgICF0YWdDbG91ZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpICYmXG4gICAgICAgICAgIXBvcHVwQm94LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgU2lkZWJhci5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBTaWRlYmFyLnRvcCA9IC0xMDAwO1xuICAgICAgICBTaWRlYmFyLnJlbmRlclBvcHVwKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNhdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoaWRlUG9wdXAsIGZhbHNlKTtcbiAgICB0YWdDbG91ZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhpZGVQb3B1cCwgZmFsc2UpO1xuICAgIHBvcHVwQm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGlkZVBvcHVwLCBmYWxzZSk7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvTGlua3MoKSB7XG5cbiAgICBsZXQgY2F0cywgdGFncztcbiAgICBsZXQgdG9BcnJheSA9IGNvbGxlY3Rpb24gPT4gW10uc2xpY2UuY2FsbChjb2xsZWN0aW9uKTtcblxuICAgIGNhdHMgPSB0b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjYXQtbGlzdCAubGluay1saXN0X19pdGVtJykpO1xuICAgIHRhZ3MgPSB0b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN0YWctY2xvdWQgLmxpbmstbGlzdF9faXRlbScpKTtcblxuICAgIGNhdHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgZSA9PiB7XG4gICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB5aWlBamF4LnBvc3QoJy9hamF4L2NhdCcsIHtcbiAgICAgICAgICAgIGlkOiBpdGVtLmRhdGFzZXQuaWRcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFNpZGViYXIubGVmdCA9IGUucGFnZVggKyAxNTtcbiAgICAgICAgICAgICAgU2lkZWJhci50b3AgPSBpdGVtLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgIFNpZGViYXIucmVuZGVyUG9wdXAoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHRhZ3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgZSA9PiB7XG4gICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB5aWlBamF4LnBvc3QoJy9hamF4L3RhZycsIHtcbiAgICAgICAgICAgIGlkOiBpdGVtLmRhdGFzZXQuaWRcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFNpZGViYXIubGVmdCA9IGUucGFnZVggKyAxNTtcbiAgICAgICAgICAgICAgU2lkZWJhci50b3AgPSBpdGVtLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgIFNpZGViYXIucmVuZGVyUG9wdXAoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9MaW5rTGlzdCgpIHtcblxuICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1saXN0Jyk7XG4gICAgbGV0IHRhZ0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG4gICAgbGV0IGhhbmRsZUxpc3RNb3VzZU92ZXIgPSAoKSA9PiB7XG4gICAgICBTaWRlYmFyLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICAgIHRhZ0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlTGlzdE1vdXNlT3Zlcik7XG4gIH1cblxuICBzdGF0aWMgc2V0UG9wdXBEYXRhKGRhdGEpIHtcbiAgICBsZXQgbGlua0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtbGlua3MnKTtcbiAgICBpZiAobGlua0xpc3QpIHtcbiAgICAgIGxpbmtMaXN0LmlubmVySFRNTCA9IG51bGw7XG4gICAgICBsaW5rTGlzdC5hcHBlbmRDaGlsZChodG1sLnRhZygnc3BhbicsIGRhdGEubmFtZSkpO1xuICAgICAgZGF0YS5saW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICBsaW5rTGlzdC5hcHBlbmRDaGlsZChodG1sLnRhZygnbGknLCBsaW5rKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyUG9wdXAoKSB7XG4gICAgbGV0IHBvcHVwQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9IFNpZGViYXIudG9wICsgJ3B4JztcbiAgICBwb3B1cEJveC5zdHlsZS5sZWZ0ID0gU2lkZWJhci5sZWZ0ICsgJ3B4JztcbiAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gU2lkZWJhci5kaXNwbGF5O1xuICB9XG5cbn1cbiIsIi8qKlxuICogICAgIHNsaWRlci5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XG5cbiAgc3RhdGljIFRIVU1CUyA9ICcudGh1bWJzJztcbiAgc3RhdGljIFRIVU1CID0gJy50aHVtYnNfX3RodW1iJztcbiAgc3RhdGljIFNMSURFUiA9ICcuc2xpZGVyJztcbiAgc3RhdGljIFNMSURFID0gJy5zbGlkZXJfX3NsaWRlJztcbiAgc3RhdGljIEFDVElWRV9TTElERSA9ICdzbGlkZXJfX3NsaWRlX2FjdGl2ZSc7XG4gIHN0YXRpYyBMRUZUX0JUTiA9ICcuc2xpZGVyX19idG5ib3hfbGVmdCc7XG4gIHN0YXRpYyBSSUdIVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X3JpZ2h0JztcblxuICBpbml0KCkge1xuXG4gICAgdGhpcy5zbGlkZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5TTElERSk7XG4gICAgdGhpcy5zZXRUaW1lcig1MDAwKTtcblxuICAgIGxldCBhY3RpdmVTbGlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgaWYgKGFjdGl2ZVNsaWRlLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KDApO1xuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLkxFRlRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICBlID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2hvd1ByZXZTbGlkZSgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlJJR0hUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgZSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnNob3dOZXh0U2xpZGUoKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5TTElERVIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy50b2dnbGVUaW1lcigyMDAwKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG5cbiAgICBsZXQgdGh1bWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTbGlkZXIuVEhVTUIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGh1bWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aHVtYnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlRIVU1CUyk7XG4gICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW5bal0gPT09IHRhcmdldC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gIH1cblxuICBzZXRUaW1lcihpbnRlcnZhbCkge1xuICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLnNob3dOZXh0U2xpZGUoKTtcbiAgICB9LCBpbnRlcnZhbCk7XG4gIH1cblxuICBjbGVhclRpbWVyKCkge1xuICAgIGlmICh0aGlzLnRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlVGltZXIoaW50ZXJ2YWwpIHtcbiAgICBpZiAodGhpcy50aW1lciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0VGltZXIoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dQcmV2U2xpZGUoKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mQWN0aXZlU2xpZGUoKTtcbiAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICBpbmRleC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KTtcbiAgfVxuXG4gIHNob3dOZXh0U2xpZGUoKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mQWN0aXZlU2xpZGUoKTtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICBpbmRleCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KTtcbiAgfVxuXG4gIGdldEluZGV4T2ZBY3RpdmVTbGlkZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFNsaWRlci5BQ1RJVkVfU0xJREUpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCkge1xuICAgIGlmICgoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnNsaWRlTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgICAgfVxuICAgICAgdGhpcy5zbGlkZUxpc3RbaW5kZXhdLmNsYXNzTGlzdC5hZGQoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqICAgICBhcHAuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDEwLzkvMTZcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhcic7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQgU2lkZWJhciBmcm9tICcuLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhcic7XG5pbXBvcnQgRmVlZGJhY2tGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZm9ybS9mb3JtJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpKSB7XG5cbiAgICBOYXZiYXIuaW5pdCgpO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpKSB7XG5cbiAgICBsZXQgc2xpZGVyID0gbmV3IFNsaWRlcigpO1xuICAgIHNsaWRlci5pbml0KCk7XG5cbiAgfVxuXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpKSB7XG5cbiAgICBTaWRlYmFyLmluaXQoKTtcblxuICB9XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFja19fZm9ybScpKSB7XG5cbiAgICBGZWVkYmFja0Zvcm0uaW5pdCgpO1xuXG4gIH1cblxufSk7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBIVE1MIGhlbHBlclxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBbmRyaWkgU29yb2tpblxuICovXG5cbnZhciBodG1sID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgaHRtbFRhZyAgICAgSFRNTCB0YWdcbiAqIEBwYXJhbSAge1N0cmluZywgICAgICAgICBpbm5lckhUTUwgICBIVE1MLCBET00gZWxlbWVudFxuICogICAgICAgICAgRE9NIGVsZW1lbnQsICAgICAgICAgICAgICAgIG9yIGFycmF5IG9mIERPTSBlbGVtZW50c1xuICogICAgICAgICAgQXJyYXl9XG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgYXR0cnMgICAgICAgQXR0cmlidXRlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZXhhbXBsZS1pZCcsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogW1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXhhbXBsZS1jbGFzcy0xJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4YW1wbGUtY2xhc3MtMidcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBzdHlsZSAgICAgICBDU1Mgc3R5bGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMTBweCdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcmV0dXJuIHtET00gZWxlbWVudH1cbiAqL1xuaHRtbC50YWcgPSBmdW5jdGlvbiAoaHRtbFRhZywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpIHtcblxuICBsZXQgZWxlbWVudDtcblxuICBmdW5jdGlvbiBhZGRBdHRycyAoKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJzKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhdHRycywga2V5KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciB2YWx1ZVN0cjtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGF0dHJzW2tleV0pKSB7XG4gICAgICAgIHZhbHVlU3RyID0gYXR0cnNba2V5XS5qb2luKCcgJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZVN0ciA9IGF0dHJzW2tleV07XG4gICAgICB9XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlU3RyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDaGlsZHJlbiAoKSB7XG4gICAgaWYgKHR5cGVvZiBpbm5lckhUTUwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlubmVySFRNTCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGlubmVySFRNTCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGlubmVySFRNTCkpIHtcbiAgICAgIGlubmVySFRNTC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkU3R5bGVzICgpIHtcbiAgICBsZXQga2V5O1xuICAgIGZvciAoa2V5IGluIHN0eWxlKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHlsZSwga2V5KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc3R5bGVba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiBCRUdJTiAqL1xuXG4gIGlmICh0eXBlb2YgaHRtbFRhZyA9PT0gJ3N0cmluZycpIHtcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChodG1sVGFnKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGF0dHJzID09PSAnb2JqZWN0Jykge1xuICAgIGFkZEF0dHJzKCk7XG4gIH1cblxuICBpZiAoaW5uZXJIVE1MKSB7XG4gICAgYWRkQ2hpbGRyZW4oKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdvYmplY3QnKSB7XG4gICAgYWRkU3R5bGVzKCk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gRE9NIGVsZW1lbnQgb2YgbGlua1xuICpcbiAqIEBwYXJhbSAge1N0cmluZywgICAgICAgICBpbm5lckhUTUwgICBIVE1MLCBET00gZWxlbWVudFxuICogICAgICAgICAgRE9NIGVsZW1lbnQsICAgICAgICAgICAgICAgIG9yIGFycmF5IG9mIERPTSBlbGVtZW50c1xuICogICAgICAgICAgQXJyYXl9XG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgdXJsICAgICAgICAgV2ViIGFkZHJlc3NcbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBhdHRycyAgICAgICBBdHRyaWJ1dGVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdleGFtcGxlLWlkJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleGFtcGxlLWNsYXNzLTEnLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXhhbXBsZS1jbGFzcy0yJ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIHN0eWxlICAgICAgIENTUyBzdHlsZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcxMHB4J1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAqIEByZXR1cm4ge0RPTSBlbGVtZW50fSAgICAgICAgICAgICAgICBMaW5rIGVsZW1lbnRcbiAqL1xuaHRtbC5hID0gZnVuY3Rpb24gKGlubmVySFRNTCwgdXJsLCBhdHRycywgc3R5bGUpIHtcbiAgdmFyIGVsZW1lbnQgPSBodG1sLnRhZygnYScsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKTtcbiAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICB9XG4gIHJldHVybiBlbGVtZW50O1xufTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIEFqYXggTW9kdWxlIGZvciBZaWkyXG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogQ29weXJpZ2h0IEFuZHJpaSBTb3Jva2luXG4gKi9cblxubGV0IHlpaUFqYXggPSBtb2R1bGUuZXhwb3J0cztcblxuZnVuY3Rpb24gZXJyb3IgKGUpIHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvcjogZVxuICB9O1xufVxuXG5mdW5jdGlvbiBleHRyYWN0RGF0YSAoZGF0YSkge1xuICBsZXQgcmVzdWx0ID0gJyc7XG4gIGxldCBrZXk7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKGtleSBpbiBkYXRhKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ICs9IGtleSArICc9JyArIGRhdGFba2V5XSArICcmJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q1NSRiAocGFyYW0sIHRva2VuKSB7XG4gIGxldCBjc3JmUGFyYW1NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUocGFyYW0pWzBdO1xuICBsZXQgY3NyZlRva2VuTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHRva2VuKVswXTtcbiAgbGV0IGNzcmZQYXJhbSA9IGNzcmZQYXJhbU1ldGEgP1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHBhcmFtKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSA6IG51bGw7XG4gIGxldCBjc3JmVG9rZW4gPSBjc3JmVG9rZW5NZXRhID9cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0b2tlbilbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JykgOiBudWxsO1xuICByZXR1cm4gY3NyZlBhcmFtICsgJz0nICsgY3NyZlRva2VuO1xufVxuXG5mdW5jdGlvbiBqc29uIChyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG5mdW5jdGlvbiBzdGF0dXMgKHJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5vaykge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG59XG5cbnlpaUFqYXgucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcbiAgcmV0dXJuIHlpaUFqYXgucmVxdWVzdCh1cmwsIGRhdGEsICdwb3N0Jyk7XG59O1xuXG55aWlBamF4LnJlcXVlc3QgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBtZXRob2QpIHtcblxuICBsZXQgaGVhZGVycyA9IHtcbiAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcbiAgfTtcbiAgbGV0IHRva2VuID0gZ2V0Q1NSRignY3NyZi1wYXJhbScsICdjc3JmLXRva2VuJyk7XG4gIGxldCBib2R5ID0gZXh0cmFjdERhdGEoZGF0YSkgKyB0b2tlbjtcbiAgbGV0IHJlcXVlc3QgPSB7XG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgaGVhZGVyczogaGVhZGVycyxcbiAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIGJvZHk6IGJvZHlcbiAgfTtcbiAgcmV0dXJuIGZldGNoKHVybCwgcmVxdWVzdClcbiAgICAudGhlbihzdGF0dXMpXG4gICAgLnRoZW4oanNvbilcbiAgICAuY2F0Y2goZXJyb3IpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRW1wdHk7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gcmVxdWlyZSgnLi91dGlsL2Fzc2VydFN0cmluZycpO1xuXG52YXIgX2Fzc2VydFN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NlcnRTdHJpbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc0VtcHR5KHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZzIuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHN0ci5sZW5ndGggPT09IDA7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBhc3NlcnRTdHJpbmc7XG5mdW5jdGlvbiBhc3NlcnRTdHJpbmcoaW5wdXQpIHtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIGxpYnJhcnkgKHZhbGlkYXRvci5qcykgdmFsaWRhdGVzIHN0cmluZ3Mgb25seScpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiXX0=
