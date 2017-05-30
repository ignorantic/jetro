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

},{}],2:[function(require,module,exports){
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

},{"html-helper":6,"yii-ajax":7}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

var _navbar = require('../components/navbar/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _slider = require('../components/slider/slider');

var _slider2 = _interopRequireDefault(_slider);

var _sidebar = require('../components/sidebar/sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _feedbackForm = require('feedback-form');

var _feedbackForm2 = _interopRequireDefault(_feedbackForm);

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

    (function () {
      _navbar2.default.init();
    })();
  }

  if (document.querySelector('.slider')) {

    (function () {
      var slider = new _slider2.default();
      slider.init();
    })();
  }

  if (document.querySelector('.sidebar')) {

    (function () {
      _sidebar2.default.init();
    })();
  }

  if (document.querySelector('.feedback__form')) {

    (function () {
      var feedbackForm = new _feedbackForm2.default({
        form: {
          ID: 'feedback-form'
        },
        fields: [{
          ID: 'input-first-name',
          type: 'text'
        }, {
          ID: 'input-last-name',
          type: 'text'
        }, {
          ID: 'input-email',
          type: 'text'
        }, {
          ID: 'input-body',
          type: 'text'
        }],
        submit: {
          ID: 'submit-btn'
        },
        classes: {
          error: 'input_state_error'
        }
      });
      feedbackForm.init();
    })();
  }
});

},{"../components/navbar/navbar":1,"../components/sidebar/sidebar":2,"../components/slider/slider":3,"feedback-form":5}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Feedback Form
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Released under MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright Andrii Sorokin
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _isEmpty = require('validator/lib/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function FeedbackForm(structure) {
    _classCallCheck(this, FeedbackForm);

    this.structure = structure;
    this.types = ['text', 'mail'];
  }

  _createClass(FeedbackForm, [{
    key: 'init',
    value: function init() {
      this.initForm();
      this.initFields();
      this.initSubmit();
      this.initClasses();
      this.addEventListenerToInputs();
      this.addEventListenerToSubmit();
      delete this.structure;
    }
  }, {
    key: 'initForm',
    value: function initForm() {
      this.form = {};
      if (typeof this.structure.form.ID === 'string') {
        this.form.ID = this.structure.form.ID;
      } else {
        this.form.ID = 'form';
      }
    }
  }, {
    key: 'initFields',
    value: function initFields() {
      var _this = this;

      this.fields = this.structure.fields.map(function (item) {
        var field = {};
        if (typeof item.ID === 'string') {
          field.ID = item.ID;
        } else {
          field.ID = 'undefined';
        }
        if (_this.types.includes(field.type)) {
          field.type = item.type;
        } else {
          field.type = _this.types[0];
        }
        field.validated = false;
        return field;
      });
    }
  }, {
    key: 'initSubmit',
    value: function initSubmit() {
      this.submit = {};
      if (typeof this.structure.submit.ID === 'string') {
        this.submit.ID = this.structure.submit.ID;
      } else {
        this.submit.ID = 'submit';
      }
    }
  }, {
    key: 'initClasses',
    value: function initClasses() {
      this.classes = {};
      if (typeof this.structure.classes.error === 'string') {
        this.classes.error = this.structure.classes.error;
      } else {
        this.classes.error = 'error';
      }
    }
  }, {
    key: 'addEventListenerToInputs',
    value: function addEventListenerToInputs() {
      var _this2 = this;

      this.fields.forEach(function (field) {
        var index = _this2.fields.indexOf(field);
        document.getElementById(field.ID).addEventListener('blur', _this2.handleBlur(index), false);
      });
    }
  }, {
    key: 'addEventListenerToSubmit',
    value: function addEventListenerToSubmit() {
      document.getElementById(this.submit.ID).addEventListener('click', this.handleSubmit(), false);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(index) {
      var _this3 = this;

      return function (e) {
        if ((0, _isEmpty2.default)(e.target.value)) {
          e.target.classList.add(_this3.classes.error);
          _this3.fields[index].validated = false;
        } else {
          e.target.classList.remove(_this3.classes.error);
          _this3.fields[index].validated = true;
        }
      };
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      var _this4 = this;

      return function (e) {
        e.preventDefault();
        if (_this4.checkFields()) {
          document.getElementById(_this4.form.ID).submit();
        } else {
          alert('npm! invalid');
        }
      };
    }
  }, {
    key: 'checkFields',
    value: function checkFields() {
      var result = true;
      this.fields.forEach(function (field) {
        if (!field.validated) {
          result = false;
        }
      });
      return result;
    }
  }]);

  return FeedbackForm;
}();

},{"validator/lib/isEmpty":8}],6:[function(require,module,exports){
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
},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbm9kZV9tb2R1bGVzL2ZlZWRiYWNrLWZvcm0vaW5kZXguanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy95aWktYWpheC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzRW1wdHkuanMiLCJub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi91dGlsL2Fzc2VydFN0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0ksQUFNcUI7Ozs7Ozs7MkJBRUwsQUFDWjtVQUFJLGdCQUFnQixTQUFBLEFBQVMsY0FBN0IsQUFBb0IsQUFBdUIsQUFDM0M7b0JBQUEsQUFBYyxpQkFBZCxBQUErQixTQUFTLE9BQXhDLEFBQStDLGFBQS9DLEFBQTRELEFBQzdEOzs7O2tDQUVvQixBQUNuQjtVQUFJLE1BQU0sU0FBQSxBQUFTLGNBQW5CLEFBQVUsQUFBdUI7VUFDL0IsT0FBTyxTQUFBLEFBQVMsY0FEbEIsQUFDUyxBQUF1QixBQUNoQztVQUFBLEFBQUksVUFBSixBQUFjLElBQWQsQUFBa0IsQUFDbEI7V0FBQSxBQUFLLFVBQUwsQUFBZSxPQUFmLEFBQXNCLEFBQ3RCO2lCQUFXLFlBQU0sQUFDZjtZQUFBLEFBQUksVUFBSixBQUFjLE9BQWQsQUFBcUIsQUFDdEI7QUFGRCxTQUFBLEFBRUcsQUFDSjs7Ozs7OztrQixBQWZrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7S0NOckI7Ozs7OztBQU1BOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0ks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QUFQO0FBQ0QsQ0FGRDs7QUFJQSxRQUFRLE9BQVIsR0FBa0IsVUFBVSxHQUFWLEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2Qjs7QUFFN0MsTUFBSSxVQUFVO0FBQ1osb0JBQWdCO0FBREosR0FBZDtBQUdBLE1BQUksUUFBUSxRQUFRLFlBQVIsRUFBc0IsWUFBdEIsQ0FBWjtBQUNBLE1BQUksT0FBTyxZQUFZLElBQVosSUFBb0IsS0FBL0I7QUFDQSxNQUFJLFVBQVU7QUFDWixZQUFRLE1BREk7QUFFWixhQUFTLE9BRkc7QUFHWixpQkFBYSxTQUhEO0FBSVosVUFBTTtBQUpNLEdBQWQ7QUFNQSxTQUFPLE1BQU0sR0FBTixFQUFXLE9BQVgsRUFDSixJQURJLENBQ0MsTUFERCxFQUVKLElBRkksQ0FFQyxJQUZELEVBR0osS0FISSxDQUdFLEtBSEYsQ0FBUDtBQUlELENBakJEOzs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiAgICAgbmF2YmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyIHtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBsZXQgbmF2YmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19idG4nKTtcbiAgICBuYXZiYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgTmF2YmFyLnNldERyb3Bkb3duLCBmYWxzZSk7XG4gIH1cblxuICBzdGF0aWMgc2V0RHJvcGRvd24oKSB7XG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19idG4nKSxcbiAgICAgIGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fbGlzdCcpO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdtZW51X19idG5fYmxpbmsnKTtcbiAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ21lbnVfX2RyYXBkb3duJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9fYnRuX2JsaW5rJyk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqICAgICBzaWRlYmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IHlpaUFqYXggZnJvbSAneWlpLWFqYXgnO1xuaW1wb3J0IGh0bWwgZnJvbSAnaHRtbC1oZWxwZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWRlYmFyIHtcblxuICBzdGF0aWMgdG9wO1xuICBzdGF0aWMgbGVmdDtcbiAgc3RhdGljIGRpc3BsYXk7XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgU2lkZWJhci50b3AgPSAtMTAwMDtcbiAgICBTaWRlYmFyLmxlZnQgPSAwO1xuICAgIFNpZGViYXIuZGlzcGxheSA9ICdub25lJztcbiAgICBTaWRlYmFyLmNyZWF0ZUJveERpdigpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCk7XG4gICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9MaW5rcygpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvTGlua0xpc3QoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVCb3hEaXYoKSB7XG4gICAgbGV0IGxpbmtzID0gaHRtbC50YWcoJ3VsJywgbnVsbCwge1xuICAgICAgaWQ6ICdwb3B1cC1saW5rcycsXG4gICAgICBjbGFzczogJ3BvcHVwLWJveF9fbGlua3MnXG4gICAgfSk7XG4gICAgbGV0IHRyaWFuZ2xlID0gaHRtbC50YWcoJ2RpdicsIG51bGwsIHtcbiAgICAgIGNsYXNzOiAncG9wdXAtYm94X190cmlhbmdsZSdcbiAgICB9KTtcbiAgICBsZXQgZGl2ID0gaHRtbC50YWcoJ2RpdicsIFt0cmlhbmdsZSwgbGlua3NdLFxuICAgICAge1xuICAgICAgICBpZDogJ3BvcHVwLWJveCcsXG4gICAgICAgIGNsYXNzOiAncG9wdXAtYm94J1xuICAgICAgfSwge1xuICAgICAgICBkaXNwbGF5OiBTaWRlYmFyLmRpc3BsYXksXG4gICAgICAgIHRvcDogU2lkZWJhci50b3AgKyAncHgnXG4gICAgICB9XG4gICAgKTtcblxuICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICBjYXRMaXN0LmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCkge1xuXG4gICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0LWxpc3QnKTtcbiAgICBsZXQgdGFnQ2xvdWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG4gICAgbGV0IHBvcHVwQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuXG4gICAgbGV0IGhpZGVQb3B1cCA9IGUgPT4ge1xuICAgICAgaWYgKCFjYXRMaXN0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkgJiZcbiAgICAgICAgICAhdGFnQ2xvdWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSAmJlxuICAgICAgICAgICFwb3B1cEJveC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgIFNpZGViYXIuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgU2lkZWJhci50b3AgPSAtMTAwMDtcbiAgICAgICAgU2lkZWJhci5yZW5kZXJQb3B1cCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGlkZVBvcHVwLCBmYWxzZSk7XG4gICAgdGFnQ2xvdWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoaWRlUG9wdXAsIGZhbHNlKTtcbiAgICBwb3B1cEJveC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhpZGVQb3B1cCwgZmFsc2UpO1xuICB9XG5cbiAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJUb0xpbmtzKCkge1xuXG4gICAgbGV0IGNhdHMsIHRhZ3M7XG4gICAgbGV0IHRvQXJyYXkgPSBjb2xsZWN0aW9uID0+IFtdLnNsaWNlLmNhbGwoY29sbGVjdGlvbik7XG5cbiAgICBjYXRzID0gdG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY2F0LWxpc3QgLmxpbmstbGlzdF9faXRlbScpKTtcbiAgICB0YWdzID0gdG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjdGFnLWNsb3VkIC5saW5rLWxpc3RfX2l0ZW0nKSk7XG5cbiAgICBjYXRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgeWlpQWpheC5wb3N0KCcvYWpheC9jYXQnLCB7XG4gICAgICAgICAgICBpZDogaXRlbS5kYXRhc2V0LmlkXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBTaWRlYmFyLmxlZnQgPSBlLnBhZ2VYICsgMTU7XG4gICAgICAgICAgICAgIFNpZGViYXIudG9wID0gaXRlbS5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICBTaWRlYmFyLnJlbmRlclBvcHVwKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0YWdzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgeWlpQWpheC5wb3N0KCcvYWpheC90YWcnLCB7XG4gICAgICAgICAgICBpZDogaXRlbS5kYXRhc2V0LmlkXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBTaWRlYmFyLmxlZnQgPSBlLnBhZ2VYICsgMTU7XG4gICAgICAgICAgICAgIFNpZGViYXIudG9wID0gaXRlbS5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICBTaWRlYmFyLnJlbmRlclBvcHVwKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvTGlua0xpc3QoKSB7XG5cbiAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgIGxldCB0YWdMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZy1jbG91ZCcpO1xuICAgIGxldCBoYW5kbGVMaXN0TW91c2VPdmVyID0gKCkgPT4ge1xuICAgICAgU2lkZWJhci5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9O1xuXG4gICAgY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVMaXN0TW91c2VPdmVyKTtcbiAgICB0YWdMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICB9XG5cbiAgc3RhdGljIHNldFBvcHVwRGF0YShkYXRhKSB7XG4gICAgbGV0IGxpbmtMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWxpbmtzJyk7XG4gICAgaWYgKGxpbmtMaXN0KSB7XG4gICAgICBsaW5rTGlzdC5pbm5lckhUTUwgPSBudWxsO1xuICAgICAgbGlua0xpc3QuYXBwZW5kQ2hpbGQoaHRtbC50YWcoJ3NwYW4nLCBkYXRhLm5hbWUpKTtcbiAgICAgIGRhdGEubGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGlua0xpc3QuYXBwZW5kQ2hpbGQoaHRtbC50YWcoJ2xpJywgbGluaykpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlclBvcHVwKCkge1xuICAgIGxldCBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcbiAgICBwb3B1cEJveC5zdHlsZS50b3AgPSBTaWRlYmFyLnRvcCArICdweCc7XG4gICAgcG9wdXBCb3guc3R5bGUubGVmdCA9IFNpZGViYXIubGVmdCArICdweCc7XG4gICAgcG9wdXBCb3guc3R5bGUuZGlzcGxheSA9IFNpZGViYXIuZGlzcGxheTtcbiAgfVxuXG59XG4iLCIvKipcbiAqICAgICBzbGlkZXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xuXG4gIHN0YXRpYyBUSFVNQlMgPSAnLnRodW1icyc7XG4gIHN0YXRpYyBUSFVNQiA9ICcudGh1bWJzX190aHVtYic7XG4gIHN0YXRpYyBTTElERVIgPSAnLnNsaWRlcic7XG4gIHN0YXRpYyBTTElERSA9ICcuc2xpZGVyX19zbGlkZSc7XG4gIHN0YXRpYyBBQ1RJVkVfU0xJREUgPSAnc2xpZGVyX19zbGlkZV9hY3RpdmUnO1xuICBzdGF0aWMgTEVGVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X2xlZnQnO1xuICBzdGF0aWMgUklHSFRfQlROID0gJy5zbGlkZXJfX2J0bmJveF9yaWdodCc7XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuc2xpZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTbGlkZXIuU0xJREUpO1xuICAgIHRoaXMuc2V0VGltZXIoNTAwMCk7XG5cbiAgICBsZXQgYWN0aXZlU2xpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgIGlmIChhY3RpdmVTbGlkZS5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleCgwKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5MRUZUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgZSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnNob3dQcmV2U2xpZGUoKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5SSUdIVF9CVE4pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgIGUgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuU0xJREVSKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlVGltZXIoMjAwMCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgbGV0IHRodW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlRIVU1CKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1icy5sZW5ndGg7IGkrKykge1xuICAgICAgdGh1bWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5USFVNQlMpO1xuICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuW2pdID09PSB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICB9XG5cbiAgc2V0VGltZXIoaW50ZXJ2YWwpIHtcbiAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgfSwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgY2xlYXJUaW1lcigpIHtcbiAgICBpZiAodGhpcy50aW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVRpbWVyKGludGVydmFsKSB7XG4gICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFRpbWVyKGludGVydmFsKTtcbiAgICB9XG4gIH1cblxuICBzaG93UHJldlNsaWRlKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgaW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gIH1cblxuICBzaG93TmV4dFNsaWRlKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgaW5kZXgrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gIH1cblxuICBnZXRJbmRleE9mQWN0aXZlU2xpZGUoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhTbGlkZXIuQUNUSVZFX1NMSURFKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB0b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoKGluZGV4ID49IDApICYmIChpbmRleCA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVMaXN0W2luZGV4XS5jbGFzc0xpc3QuYWRkKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiAgICAgYXBwLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiAxMC85LzE2XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IE5hdmJhciBmcm9tICcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXInO1xuaW1wb3J0IFNsaWRlciBmcm9tICcuLi9jb21wb25lbnRzL3NsaWRlci9zbGlkZXInO1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXInO1xuaW1wb3J0IEZlZWRiYWNrRm9ybSBmcm9tICdmZWVkYmFjay1mb3JtJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpKSB7XG5cbiAgICAoKCkgPT4ge1xuICAgICAgTmF2YmFyLmluaXQoKTtcbiAgICB9KSgpO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpKSB7XG5cbiAgICAoKCkgPT4ge1xuICAgICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXIoKTtcbiAgICAgIHNsaWRlci5pbml0KCk7XG4gICAgfSkoKTtcblxuICB9XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJykpIHtcblxuICAgICgoKSA9PiB7XG4gICAgICBTaWRlYmFyLmluaXQoKTtcbiAgICB9KSgpO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19mb3JtJykpIHtcblxuICAgICgoKSA9PiB7XG4gICAgICBsZXQgZmVlZGJhY2tGb3JtID0gbmV3IEZlZWRiYWNrRm9ybSh7XG4gICAgICAgIGZvcm06IHtcbiAgICAgICAgICBJRDogJ2ZlZWRiYWNrLWZvcm0nXG4gICAgICAgIH0sXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIElEOiAnaW5wdXQtZmlyc3QtbmFtZScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIElEOiAnaW5wdXQtbGFzdC1uYW1lJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgSUQ6ICdpbnB1dC1lbWFpbCcsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIElEOiAnaW5wdXQtYm9keScsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHN1Ym1pdDoge1xuICAgICAgICAgIElEOiAnc3VibWl0LWJ0bidcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3Nlczoge1xuICAgICAgICAgIGVycm9yOiAnaW5wdXRfc3RhdGVfZXJyb3InXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZmVlZGJhY2tGb3JtLmluaXQoKTtcbiAgICB9KSgpO1xuXG4gIH1cblxufSk7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBGZWVkYmFjayBGb3JtXG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogQ29weXJpZ2h0IEFuZHJpaSBTb3Jva2luXG4gKi9cblxuaW1wb3J0IGlzRW1wdHkgZnJvbSAndmFsaWRhdG9yL2xpYi9pc0VtcHR5JztcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBGZWVkYmFja0Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yIChzdHJ1Y3R1cmUpIHtcbiAgICB0aGlzLnN0cnVjdHVyZSA9IHN0cnVjdHVyZTtcbiAgICB0aGlzLnR5cGVzID0gWyd0ZXh0JywgJ21haWwnXTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgIHRoaXMuaW5pdEZpZWxkcygpO1xuICAgIHRoaXMuaW5pdFN1Ym1pdCgpO1xuICAgIHRoaXMuaW5pdENsYXNzZXMoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJUb0lucHV0cygpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lclRvU3VibWl0KCk7XG4gICAgZGVsZXRlIHRoaXMuc3RydWN0dXJlO1xuICB9XG5cbiAgaW5pdEZvcm0oKSB7XG4gICAgdGhpcy5mb3JtID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnN0cnVjdHVyZS5mb3JtLklEID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5mb3JtLklEID0gdGhpcy5zdHJ1Y3R1cmUuZm9ybS5JRDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtLklEID0gJ2Zvcm0nO1xuICAgIH1cbiAgfVxuXG4gIGluaXRGaWVsZHMgKCkge1xuICAgIHRoaXMuZmllbGRzID0gdGhpcy5zdHJ1Y3R1cmUuZmllbGRzLm1hcChpdGVtID0+IHtcbiAgICAgIGxldCBmaWVsZCA9IHt9O1xuICAgICAgaWYgKHR5cGVvZiBpdGVtLklEID09PSAnc3RyaW5nJykge1xuICAgICAgICBmaWVsZC5JRCA9IGl0ZW0uSUQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWVsZC5JRCA9ICd1bmRlZmluZWQnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudHlwZXMuaW5jbHVkZXMoZmllbGQudHlwZSkpIHtcbiAgICAgICAgZmllbGQudHlwZSA9IGl0ZW0udHlwZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpZWxkLnR5cGUgPSB0aGlzLnR5cGVzWzBdO1xuICAgICAgfVxuICAgICAgZmllbGQudmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gZmllbGQ7XG4gICAgfSk7XG4gIH1cblxuICBpbml0U3VibWl0KCkge1xuICAgIHRoaXMuc3VibWl0ID0ge307XG4gICAgaWYgKHR5cGVvZiB0aGlzLnN0cnVjdHVyZS5zdWJtaXQuSUQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnN1Ym1pdC5JRCA9IHRoaXMuc3RydWN0dXJlLnN1Ym1pdC5JRDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdWJtaXQuSUQgPSAnc3VibWl0JztcbiAgICB9XG4gIH1cblxuICBpbml0Q2xhc3NlcygpIHtcbiAgICB0aGlzLmNsYXNzZXMgPSB7fTtcbiAgICBpZiAodHlwZW9mIHRoaXMuc3RydWN0dXJlLmNsYXNzZXMuZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmNsYXNzZXMuZXJyb3IgPSB0aGlzLnN0cnVjdHVyZS5jbGFzc2VzLmVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzZXMuZXJyb3IgPSAnZXJyb3InO1xuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJUb0lucHV0cyAoKSB7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLmZpZWxkcy5pbmRleE9mKGZpZWxkKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZpZWxkLklEKS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5oYW5kbGVCbHVyKGluZGV4KSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lclRvU3VibWl0ICgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnN1Ym1pdC5JRCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVN1Ym1pdCgpLCBmYWxzZSk7XG4gIH1cblxuICBoYW5kbGVCbHVyIChpbmRleCkge1xuICAgIHJldHVybiBlID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KGUudGFyZ2V0LnZhbHVlKSkge1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5lcnJvcik7XG4gICAgICAgIHRoaXMuZmllbGRzW2luZGV4XS52YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLmVycm9yKTtcbiAgICAgICAgdGhpcy5maWVsZHNbaW5kZXhdLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdCAoKSB7XG4gICAgcmV0dXJuIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHRoaXMuY2hlY2tGaWVsZHMoKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZvcm0uSUQpLnN1Ym1pdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoJ25wbSEgaW52YWxpZCcpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjaGVja0ZpZWxkcyAoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoIWZpZWxkLnZhbGlkYXRlZCkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogSFRNTCBoZWxwZXJcbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG52YXIgaHRtbCA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIGh0bWxUYWcgICAgIEhUTUwgdGFnXG4gKiBAcGFyYW0gIHtTdHJpbmcsICAgICAgICAgaW5uZXJIVE1MICAgSFRNTCwgRE9NIGVsZW1lbnRcbiAqICAgICAgICAgIERPTSBlbGVtZW50LCAgICAgICAgICAgICAgICBvciBhcnJheSBvZiBET00gZWxlbWVudHNcbiAqICAgICAgICAgIEFycmF5fVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGF0dHJzICAgICAgIEF0dHJpYnV0ZXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2V4YW1wbGUtaWQnLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4YW1wbGUtY2xhc3MtMScsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleGFtcGxlLWNsYXNzLTInXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgc3R5bGUgICAgICAgQ1NTIHN0eWxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzEwcHgnXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogQHJldHVybiB7RE9NIGVsZW1lbnR9XG4gKi9cbmh0bWwudGFnID0gZnVuY3Rpb24gKGh0bWxUYWcsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG5cbiAgbGV0IGVsZW1lbnQ7XG5cbiAgZnVuY3Rpb24gYWRkQXR0cnMgKCkge1xuICAgIGZvciAobGV0IGtleSBpbiBhdHRycykge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXR0cnMsIGtleSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgdmFsdWVTdHI7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhdHRyc1trZXldKSkge1xuICAgICAgICB2YWx1ZVN0ciA9IGF0dHJzW2tleV0uam9pbignICcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVTdHIgPSBhdHRyc1trZXldO1xuICAgICAgfVxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZVN0cik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkQ2hpbGRyZW4gKCkge1xuICAgIGlmICh0eXBlb2YgaW5uZXJIVE1MID09PSAnc3RyaW5nJykge1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpbm5lckhUTUwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChpbm5lckhUTUwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbm5lckhUTUwpKSB7XG4gICAgICBpbm5lckhUTUwuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFN0eWxlcyAoKSB7XG4gICAgbGV0IGtleTtcbiAgICBmb3IgKGtleSBpbiBzdHlsZSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3R5bGUsIGtleSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHN0eWxlW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHN0eWxlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogQkVHSU4gKi9cblxuICBpZiAodHlwZW9mIGh0bWxUYWcgPT09ICdzdHJpbmcnKSB7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHRtbFRhZyk7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhdHRycyA9PT0gJ29iamVjdCcpIHtcbiAgICBhZGRBdHRycygpO1xuICB9XG5cbiAgaWYgKGlubmVySFRNTCkge1xuICAgIGFkZENoaWxkcmVuKCk7XG4gIH1cblxuICBpZiAodHlwZW9mIHN0eWxlID09PSAnb2JqZWN0Jykge1xuICAgIGFkZFN0eWxlcygpO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIGxpbmtcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmcsICAgICAgICAgaW5uZXJIVE1MICAgSFRNTCwgRE9NIGVsZW1lbnRcbiAqICAgICAgICAgIERPTSBlbGVtZW50LCAgICAgICAgICAgICAgICBvciBhcnJheSBvZiBET00gZWxlbWVudHNcbiAqICAgICAgICAgIEFycmF5fVxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIHVybCAgICAgICAgIFdlYiBhZGRyZXNzXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgYXR0cnMgICAgICAgQXR0cmlidXRlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZXhhbXBsZS1pZCcsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogW1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXhhbXBsZS1jbGFzcy0xJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4YW1wbGUtY2xhc3MtMidcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBzdHlsZSAgICAgICBDU1Mgc3R5bGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMTBweCdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcmV0dXJuIHtET00gZWxlbWVudH0gICAgICAgICAgICAgICAgTGluayBlbGVtZW50XG4gKi9cbmh0bWwuYSA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIHVybCwgYXR0cnMsIHN0eWxlKSB7XG4gIHZhciBlbGVtZW50ID0gaHRtbC50YWcoJ2EnLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG4gIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBBamF4IE1vZHVsZSBmb3IgWWlpMlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBbmRyaWkgU29yb2tpblxuICovXG5cbmxldCB5aWlBamF4ID0gbW9kdWxlLmV4cG9ydHM7XG5cbmZ1bmN0aW9uIGVycm9yIChlKSB7XG4gIHJldHVybiB7XG4gICAgZXJyb3I6IGVcbiAgfTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdERhdGEgKGRhdGEpIHtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBsZXQga2V5O1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yIChrZXkgaW4gZGF0YSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCArPSBrZXkgKyAnPScgKyBkYXRhW2tleV0gKyAnJic7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdldENTUkYgKHBhcmFtLCB0b2tlbikge1xuICBsZXQgY3NyZlBhcmFtTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHBhcmFtKVswXTtcbiAgbGV0IGNzcmZUb2tlbk1ldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSh0b2tlbilbMF07XG4gIGxldCBjc3JmUGFyYW0gPSBjc3JmUGFyYW1NZXRhID9cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShwYXJhbSlbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JykgOiBudWxsO1xuICBsZXQgY3NyZlRva2VuID0gY3NyZlRva2VuTWV0YSA/XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodG9rZW4pWzBdLmdldEF0dHJpYnV0ZSgnY29udGVudCcpIDogbnVsbDtcbiAgcmV0dXJuIGNzcmZQYXJhbSArICc9JyArIGNzcmZUb2tlbjtcbn1cblxuZnVuY3Rpb24ganNvbiAocmVzcG9uc2UpIHtcbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuZnVuY3Rpb24gc3RhdHVzIChyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xufVxuXG55aWlBamF4LnBvc3QgPSBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XG4gIHJldHVybiB5aWlBamF4LnJlcXVlc3QodXJsLCBkYXRhLCAncG9zdCcpO1xufTtcblxueWlpQWpheC5yZXF1ZXN0ID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgbWV0aG9kKSB7XG5cbiAgbGV0IGhlYWRlcnMgPSB7XG4gICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnXG4gIH07XG4gIGxldCB0b2tlbiA9IGdldENTUkYoJ2NzcmYtcGFyYW0nLCAnY3NyZi10b2tlbicpO1xuICBsZXQgYm9keSA9IGV4dHJhY3REYXRhKGRhdGEpICsgdG9rZW47XG4gIGxldCByZXF1ZXN0ID0ge1xuICAgIG1ldGhvZDogbWV0aG9kLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICBib2R5OiBib2R5XG4gIH07XG4gIHJldHVybiBmZXRjaCh1cmwsIHJlcXVlc3QpXG4gICAgLnRoZW4oc3RhdHVzKVxuICAgIC50aGVuKGpzb24pXG4gICAgLmNhdGNoKGVycm9yKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0VtcHR5O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IHJlcXVpcmUoJy4vdXRpbC9hc3NlcnRTdHJpbmcnKTtcblxudmFyIF9hc3NlcnRTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzZXJ0U3RyaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNFbXB0eShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcyLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBzdHIubGVuZ3RoID09PSAwO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYXNzZXJ0U3RyaW5nO1xuZnVuY3Rpb24gYXNzZXJ0U3RyaW5nKGlucHV0KSB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBsaWJyYXJ5ICh2YWxpZGF0b3IuanMpIHZhbGlkYXRlcyBzdHJpbmdzIG9ubHknKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107Il19
