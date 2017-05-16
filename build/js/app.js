(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     form.js for Jetro project
 *     Created by Andrii Sorokin on 5/7/17
 *     https://github.com/ignorantic/jetro.git
 */

var FeedbackForm = function () {
  function FeedbackForm() {
    _classCallCheck(this, FeedbackForm);
  }

  _createClass(FeedbackForm, null, [{
    key: "init",
    value: function init() {
      FeedbackForm.first = false;
      FeedbackForm.last = false;
      FeedbackForm.email = false;
      FeedbackForm.body = false;
      FeedbackForm.addEventListenerToInputs();
    }
  }, {
    key: "addEventListenerToInputs",
    value: function addEventListenerToInputs() {
      // let firstInput = document.querySelector('#input-first-name');
      // let lastInput = document.querySelector('#input-last-name');
      // let emailInput = document.querySelector('#input-email');
      // let bodyInput = document.querySelector('#input-body');
      // firstInput.addEventListener('blur', e => {
      //   console.log(e.target);
      //   e.target.classList.add('blur');
      // },
      // false);
    }
  }]);

  return FeedbackForm;
}();

exports.default = FeedbackForm;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      let key;
      for (key in style) {
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

},{}],7:[function(require,module,exports){
/**
 * @license
 * Ajax Module for Yii2
 * Released under MIT license
 * Copyright Andrii Sorokin
 */

let yiiAjax = module.exports;

let
  error = function(e) {
    return {
      error: e.message
    };
  },
  extractData = function(data) {
    let result = '';
    let key;
    if (typeof data === 'object') {
      for (key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          continue;
        }
        result += key + '=' + data[key] + '&';
      }
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
    if (response.ok) {
      return response;
    }
    throw new Error(response.statusText);
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
    .then(json)
    .catch(error);
};

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9mb3JtL2Zvcm0uanMiLCJkZXYvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy95aWktYWpheC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0lBTXFCLFk7Ozs7Ozs7MkJBT0w7QUFDWixtQkFBYSxLQUFiLEdBQXFCLEtBQXJCO0FBQ0EsbUJBQWEsSUFBYixHQUFvQixLQUFwQjtBQUNBLG1CQUFhLEtBQWIsR0FBcUIsS0FBckI7QUFDQSxtQkFBYSxJQUFiLEdBQW9CLEtBQXBCO0FBQ0EsbUJBQWEsd0JBQWI7QUFDRDs7OytDQUVpQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7Ozs7O2tCQXpCa0IsWTs7Ozs7Ozs7Ozs7OztBQ05yQjs7Ozs7O0lBTXFCLE07Ozs7Ozs7MkJBRUw7QUFDWixVQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBcEI7QUFDQSxvQkFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxPQUFPLFdBQS9DLEVBQTRELEtBQTVEO0FBQ0Q7OztrQ0FFb0I7QUFDbkIsVUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFWO0FBQUEsVUFDRSxPQUFPLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQURUO0FBRUEsVUFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixpQkFBbEI7QUFDQSxXQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLGdCQUF0QjtBQUNBLGlC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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogICAgIGZvcm0uanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDUvNy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrRm9ybSB7XG5cbiAgc3RhdGljIGZpcnN0O1xuICBzdGF0aWMgbGFzdDtcbiAgc3RhdGljIGVtYWlsO1xuICBzdGF0aWMgYm9keTtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBGZWVkYmFja0Zvcm0uZmlyc3QgPSBmYWxzZTtcbiAgICBGZWVkYmFja0Zvcm0ubGFzdCA9IGZhbHNlO1xuICAgIEZlZWRiYWNrRm9ybS5lbWFpbCA9IGZhbHNlO1xuICAgIEZlZWRiYWNrRm9ybS5ib2R5ID0gZmFsc2U7XG4gICAgRmVlZGJhY2tGb3JtLmFkZEV2ZW50TGlzdGVuZXJUb0lucHV0cygpO1xuICB9XG5cbiAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJUb0lucHV0cygpIHtcbiAgICAvLyBsZXQgZmlyc3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dC1maXJzdC1uYW1lJyk7XG4gICAgLy8gbGV0IGxhc3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dC1sYXN0LW5hbWUnKTtcbiAgICAvLyBsZXQgZW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dC1lbWFpbCcpO1xuICAgIC8vIGxldCBib2R5SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXQtYm9keScpO1xuICAgIC8vIGZpcnN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGUgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgIC8vICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYmx1cicpO1xuICAgIC8vIH0sXG4gICAgLy8gZmFsc2UpO1xuICB9XG59XG4iLCIvKipcbiAqICAgICBuYXZiYXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZiYXIge1xuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIGxldCBuYXZiYXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2J0bicpO1xuICAgIG5hdmJhckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBOYXZiYXIuc2V0RHJvcGRvd24sIGZhbHNlKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXREcm9wZG93bigpIHtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2J0bicpLFxuICAgICAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19saXN0Jyk7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2J0bl9ibGluaycpO1xuICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudV9fZHJhcGRvd24nKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51X19idG5fYmxpbmsnKTtcbiAgICB9LCAzMDApO1xuICB9XG5cbn1cbiIsIi8qKlxuICogICAgIHNpZGViYXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5pbXBvcnQgeWlpQWpheCBmcm9tICd5aWktYWpheCc7XG5pbXBvcnQgaHRtbCBmcm9tICdodG1sLWhlbHBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGViYXIge1xuXG4gIHN0YXRpYyB0b3A7XG4gIHN0YXRpYyBsZWZ0O1xuICBzdGF0aWMgZGlzcGxheTtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBTaWRlYmFyLnRvcCA9IC0xMDAwO1xuICAgIFNpZGViYXIubGVmdCA9IDA7XG4gICAgU2lkZWJhci5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIFNpZGViYXIuY3JlYXRlQm94RGl2KCk7XG4gICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKTtcbiAgICBTaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXJUb0xpbmtzKCk7XG4gICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9MaW5rTGlzdCgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUJveERpdigpIHtcbiAgICBsZXQgbGlua3MgPSBodG1sLnRhZygndWwnLCBudWxsLCB7XG4gICAgICBpZDogJ3BvcHVwLWxpbmtzJyxcbiAgICAgIGNsYXNzOiAncG9wdXAtYm94X19saW5rcydcbiAgICB9KTtcbiAgICBsZXQgdHJpYW5nbGUgPSBodG1sLnRhZygnZGl2JywgbnVsbCwge1xuICAgICAgY2xhc3M6ICdwb3B1cC1ib3hfX3RyaWFuZ2xlJ1xuICAgIH0pO1xuICAgIGxldCBkaXYgPSBodG1sLnRhZygnZGl2JywgW3RyaWFuZ2xlLCBsaW5rc10sXG4gICAgICB7XG4gICAgICAgIGlkOiAncG9wdXAtYm94JyxcbiAgICAgICAgY2xhc3M6ICdwb3B1cC1ib3gnXG4gICAgICB9LCB7XG4gICAgICAgIGRpc3BsYXk6IFNpZGViYXIuZGlzcGxheSxcbiAgICAgICAgdG9wOiBTaWRlYmFyLnRvcCArICdweCdcbiAgICAgIH1cbiAgICApO1xuXG4gICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgIGNhdExpc3QuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKSB7XG5cbiAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgIGxldCB0YWdDbG91ZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWctY2xvdWQnKTtcbiAgICBsZXQgcG9wdXBCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG5cbiAgICBsZXQgaGlkZVBvcHVwID0gZSA9PiB7XG4gICAgICBpZiAoIWNhdExpc3QuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSAmJlxuICAgICAgICAgICF0YWdDbG91ZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpICYmXG4gICAgICAgICAgIXBvcHVwQm94LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgU2lkZWJhci5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBTaWRlYmFyLnRvcCA9IC0xMDAwO1xuICAgICAgICBTaWRlYmFyLnJlbmRlclBvcHVwKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNhdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoaWRlUG9wdXAsIGZhbHNlKTtcbiAgICB0YWdDbG91ZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhpZGVQb3B1cCwgZmFsc2UpO1xuICAgIHBvcHVwQm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGlkZVBvcHVwLCBmYWxzZSk7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvTGlua3MoKSB7XG5cbiAgICBsZXQgY2F0cywgdGFncztcbiAgICBsZXQgdG9BcnJheSA9IGNvbGxlY3Rpb24gPT4gW10uc2xpY2UuY2FsbChjb2xsZWN0aW9uKTtcblxuICAgIGNhdHMgPSB0b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjYXQtbGlzdCAubGluay1saXN0X19pdGVtJykpO1xuICAgIHRhZ3MgPSB0b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN0YWctY2xvdWQgLmxpbmstbGlzdF9faXRlbScpKTtcblxuICAgIGNhdHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgZSA9PiB7XG4gICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB5aWlBamF4LnBvc3QoJy9hamF4L2NhdCcsIHtcbiAgICAgICAgICAgIGlkOiBpdGVtLmRhdGFzZXQuaWRcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFNpZGViYXIubGVmdCA9IGUucGFnZVggKyAxNTtcbiAgICAgICAgICAgICAgU2lkZWJhci50b3AgPSBpdGVtLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgIFNpZGViYXIucmVuZGVyUG9wdXAoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9KTtcbiAgICB0YWdzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgeWlpQWpheC5wb3N0KCcvYWpheC90YWcnLCB7XG4gICAgICAgICAgICBpZDogaXRlbS5kYXRhc2V0LmlkXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBTaWRlYmFyLmxlZnQgPSBlLnBhZ2VYICsgMTU7XG4gICAgICAgICAgICAgIFNpZGViYXIudG9wID0gaXRlbS5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICBTaWRlYmFyLnJlbmRlclBvcHVwKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvTGlua0xpc3QoKSB7XG5cbiAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgIGxldCB0YWdMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZy1jbG91ZCcpO1xuICAgIGxldCBoYW5kbGVMaXN0TW91c2VPdmVyID0gKCkgPT4ge1xuICAgICAgU2lkZWJhci5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9O1xuXG4gICAgY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVMaXN0TW91c2VPdmVyKTtcbiAgICB0YWdMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICB9XG5cbiAgc3RhdGljIHNldFBvcHVwRGF0YShkYXRhKSB7XG4gICAgbGV0IGxpbmtMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWxpbmtzJyk7XG4gICAgaWYgKGxpbmtMaXN0KSB7XG4gICAgICBsaW5rTGlzdC5pbm5lckhUTUwgPSBudWxsO1xuICAgICAgbGlua0xpc3QuYXBwZW5kQ2hpbGQoaHRtbC50YWcoJ3NwYW4nLCBkYXRhLm5hbWUpKTtcbiAgICAgIGRhdGEubGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGlua0xpc3QuYXBwZW5kQ2hpbGQoaHRtbC50YWcoJ2xpJywgbGluaykpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbmRlclBvcHVwKCkge1xuICAgIGxldCBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcbiAgICBwb3B1cEJveC5zdHlsZS50b3AgPSBTaWRlYmFyLnRvcCArICdweCc7XG4gICAgcG9wdXBCb3guc3R5bGUubGVmdCA9IFNpZGViYXIubGVmdCArICdweCc7XG4gICAgcG9wdXBCb3guc3R5bGUuZGlzcGxheSA9IFNpZGViYXIuZGlzcGxheTtcbiAgfVxuXG59XG4iLCIvKipcbiAqICAgICBzbGlkZXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xuXG4gIHN0YXRpYyBUSFVNQlMgPSAnLnRodW1icyc7XG4gIHN0YXRpYyBUSFVNQiA9ICcudGh1bWJzX190aHVtYic7XG4gIHN0YXRpYyBTTElERVIgPSAnLnNsaWRlcic7XG4gIHN0YXRpYyBTTElERSA9ICcuc2xpZGVyX19zbGlkZSc7XG4gIHN0YXRpYyBBQ1RJVkVfU0xJREUgPSAnc2xpZGVyX19zbGlkZV9hY3RpdmUnO1xuICBzdGF0aWMgTEVGVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X2xlZnQnO1xuICBzdGF0aWMgUklHSFRfQlROID0gJy5zbGlkZXJfX2J0bmJveF9yaWdodCc7XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuc2xpZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTbGlkZXIuU0xJREUpO1xuICAgIHRoaXMuc2V0VGltZXIoNTAwMCk7XG5cbiAgICBsZXQgYWN0aXZlU2xpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgIGlmIChhY3RpdmVTbGlkZS5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleCgwKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5MRUZUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgZSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnNob3dQcmV2U2xpZGUoKTtcbiAgICAgIH0sXG4gICAgICBmYWxzZVxuICAgICk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5SSUdIVF9CVE4pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgIGUgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuU0xJREVSKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlVGltZXIoMjAwMCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgbGV0IHRodW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlRIVU1CKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1icy5sZW5ndGg7IGkrKykge1xuICAgICAgdGh1bWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5USFVNQlMpO1xuICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuW2pdID09PSB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICB9XG5cbiAgc2V0VGltZXIoaW50ZXJ2YWwpIHtcbiAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgfSwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgY2xlYXJUaW1lcigpIHtcbiAgICBpZiAodGhpcy50aW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVRpbWVyKGludGVydmFsKSB7XG4gICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFRpbWVyKGludGVydmFsKTtcbiAgICB9XG4gIH1cblxuICBzaG93UHJldlNsaWRlKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgaW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gIH1cblxuICBzaG93TmV4dFNsaWRlKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgaW5kZXgrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gIH1cblxuICBnZXRJbmRleE9mQWN0aXZlU2xpZGUoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhTbGlkZXIuQUNUSVZFX1NMSURFKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB0b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAoKGluZGV4ID49IDApICYmIChpbmRleCA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2xpZGVMaXN0W2luZGV4XS5jbGFzc0xpc3QuYWRkKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiAgICAgYXBwLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiAxMC85LzE2XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IE5hdmJhciBmcm9tICcuLi9jb21wb25lbnRzL25hdmJhci9uYXZiYXInO1xuaW1wb3J0IFNsaWRlciBmcm9tICcuLi9jb21wb25lbnRzL3NsaWRlci9zbGlkZXInO1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXInO1xuaW1wb3J0IEZlZWRiYWNrRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL2Zvcm0vZm9ybSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXInKSkge1xuXG4gICAgTmF2YmFyLmluaXQoKTtcblxuICB9XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKSkge1xuXG4gICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXIoKTtcbiAgICBzbGlkZXIuaW5pdCgpO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKSkge1xuXG4gICAgU2lkZWJhci5pbml0KCk7XG5cbiAgfVxuXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2Zvcm0nKSkge1xuXG4gICAgRmVlZGJhY2tGb3JtLmluaXQoKTtcblxuICB9XG5cbn0pO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogSFRNTCBoZWxwZXJcbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG52YXIgaHRtbCA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIGh0bWxUYWcgICAgIEhUTUwgdGFnXG4gKiBAcGFyYW0gIHtTdHJpbmcsICAgICAgICAgaW5uZXJIVE1MICAgSFRNTCwgRE9NIGVsZW1lbnRcbiAqICAgICAgICAgIERPTSBlbGVtZW50LCAgICAgICAgICAgICAgICBvciBhcnJheSBvZiBET00gZWxlbWVudHNcbiAqICAgICAgICAgIEFycmF5fVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGF0dHJzICAgICAgIEF0dHJpYnV0ZXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2V4YW1wbGUtaWQnLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4YW1wbGUtY2xhc3MtMScsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleGFtcGxlLWNsYXNzLTInXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgc3R5bGUgICAgICAgQ1NTIHN0eWxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzEwcHgnXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogQHJldHVybiB7RE9NIGVsZW1lbnR9XG4gKi9cbmh0bWwudGFnID0gZnVuY3Rpb24gKGh0bWxUYWcsIGlubmVySFRNTCwgYXR0cnMsIHN0eWxlKSB7XG5cbiAgbGV0IGVsZW1lbnQ7XG5cbiAgbGV0XG4gICAgYWRkQXR0cnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBhdHRycykge1xuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhdHRycywga2V5KSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZVN0cjtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXR0cnNba2V5XSkpIHtcbiAgICAgICAgICB2YWx1ZVN0ciA9IGF0dHJzW2tleV0uam9pbignICcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlU3RyID0gYXR0cnNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlU3RyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZENoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodHlwZW9mIGlubmVySFRNTCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpbm5lckhUTUwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGlubmVySFRNTCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGlubmVySFRNTCkpIHtcbiAgICAgICAgaW5uZXJIVE1MLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkU3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICBsZXQga2V5O1xuICAgICAgZm9yIChrZXkgaW4gc3R5bGUpIHtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3R5bGUsIGtleSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHN0eWxlW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgLyogQkVHSU4gKi9cblxuICB0eXBlb2YgaHRtbFRhZyA9PT0gJ3N0cmluZycgP1xuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGh0bWxUYWcpIDpcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgdHlwZW9mIGF0dHJzID09PSAnb2JqZWN0JyAmJiBhZGRBdHRycygpO1xuXG4gIGlubmVySFRNTCAmJiBhZGRDaGlsZHJlbigpO1xuXG4gIHR5cGVvZiBzdHlsZSA9PT0gJ29iamVjdCcgJiYgYWRkU3R5bGVzKCk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIERPTSBlbGVtZW50IG9mIGxpbmtcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmcsICAgICAgICAgaW5uZXJIVE1MICAgSFRNTCwgRE9NIGVsZW1lbnRcbiAqICAgICAgICAgIERPTSBlbGVtZW50LCAgICAgICAgICAgICAgICBvciBhcnJheSBvZiBET00gZWxlbWVudHNcbiAqICAgICAgICAgIEFycmF5fVxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIHVybCAgICAgICAgIFdlYiBhZGRyZXNzXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgYXR0cnMgICAgICAgQXR0cmlidXRlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZXhhbXBsZS1pZCcsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogW1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXhhbXBsZS1jbGFzcy0xJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4YW1wbGUtY2xhc3MtMidcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBzdHlsZSAgICAgICBDU1Mgc3R5bGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnMTBweCdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcmV0dXJuIHtET00gZWxlbWVudH0gICAgICAgICAgICAgICAgTGluayBlbGVtZW50XG4gKi9cbmh0bWwuYSA9IGZ1bmN0aW9uIChpbm5lckhUTUwsIHVybCwgYXR0cnMsIHN0eWxlKSB7XG4gIHZhciBlbGVtZW50ID0gaHRtbC50YWcoJ2EnLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSk7XG4gIGlmICh0eXBlb2YgdXJsID09PSAnc3RyaW5nJykge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBBamF4IE1vZHVsZSBmb3IgWWlpMlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBbmRyaWkgU29yb2tpblxuICovXG5cbmxldCB5aWlBamF4ID0gbW9kdWxlLmV4cG9ydHM7XG5cbmxldFxuICBlcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IGUubWVzc2FnZVxuICAgIH07XG4gIH0sXG4gIGV4dHJhY3REYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBsZXQga2V5O1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAoa2V5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSBrZXkgKyAnPScgKyBkYXRhW2tleV0gKyAnJic7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIGdldENTUkYgPSBmdW5jdGlvbihwYXJhbSwgdG9rZW4pIHtcbiAgICBsZXQgY3NyZlBhcmFtTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHBhcmFtKVswXTtcbiAgICBsZXQgY3NyZlRva2VuTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHRva2VuKVswXTtcbiAgICBsZXQgY3NyZlBhcmFtID0gY3NyZlBhcmFtTWV0YSA/XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShwYXJhbSlbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JykgOiBudWxsO1xuICAgIGxldCBjc3JmVG9rZW4gPSBjc3JmVG9rZW5NZXRhID9cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHRva2VuKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSA6IG51bGw7XG4gICAgcmV0dXJuIGNzcmZQYXJhbSArICc9JyArIGNzcmZUb2tlbjtcbiAgfSxcbiAganNvbiA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfSxcbiAgc3RhdHVzID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICB9O1xuXG55aWlBamF4LnBvc3QgPSBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XG5cbiAgbGV0IGhlYWRlcnMgPSB7XG4gICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnXG4gIH07XG4gIGxldCB0b2tlbiA9IGdldENTUkYoJ2NzcmYtcGFyYW0nLCAnY3NyZi10b2tlbicpO1xuICBsZXQgYm9keSA9IGV4dHJhY3REYXRhKGRhdGEpICsgdG9rZW47XG4gIGxldCByZXF1ZXN0ID0ge1xuICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICBib2R5OiBib2R5XG4gIH07XG4gIHJldHVybiBmZXRjaCh1cmwsIHJlcXVlc3QpXG4gICAgLnRoZW4oc3RhdHVzKVxuICAgIC50aGVuKGpzb24pXG4gICAgLmNhdGNoKGVycm9yKTtcbn07XG4iXX0=
