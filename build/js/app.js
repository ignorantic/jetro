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
              console.log(data.error);
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
              console.log(data.error);
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
      error: e
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvY29tcG9uZW50cy9mb3JtL2Zvcm0uanMiLCJkZXYvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmpzIiwiZGV2L2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbm9kZV9tb2R1bGVzL2h0bWwtaGVscGVyL2luZGV4LmpzIiwiZGV2L25vZGVfbW9kdWxlcy95aWktYWpheC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0lBTXFCLFk7Ozs7Ozs7MkJBT0w7QUFDWixtQkFBYSxLQUFiLEdBQXFCLEtBQXJCO0FBQ0EsbUJBQWEsSUFBYixHQUFvQixLQUFwQjtBQUNBLG1CQUFhLEtBQWIsR0FBcUIsS0FBckI7QUFDQSxtQkFBYSxJQUFiLEdBQW9CLEtBQXBCO0FBQ0EsbUJBQWEsd0JBQWI7QUFDRDs7OytDQUVpQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7Ozs7O2tCQXpCa0IsWTs7Ozs7Ozs7Ozs7OztBQ05yQjs7Ozs7O0lBTXFCLE07Ozs7Ozs7MkJBRUw7QUFDWixVQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBcEI7QUFDQSxvQkFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxPQUFPLFdBQS9DLEVBQTRELEtBQTVEO0FBQ0Q7OztrQ0FFb0I7QUFDbkIsVUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFWO0FBQUEsVUFDRSxPQUFPLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQURUO0FBRUEsVUFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixpQkFBbEI7QUFDQSxXQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLGdCQUF0QjtBQUNBLGlC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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqICAgICBmb3JtLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA1LzcvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWVkYmFja0Zvcm0ge1xuXG4gIHN0YXRpYyBmaXJzdDtcbiAgc3RhdGljIGxhc3Q7XG4gIHN0YXRpYyBlbWFpbDtcbiAgc3RhdGljIGJvZHk7XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgRmVlZGJhY2tGb3JtLmZpcnN0ID0gZmFsc2U7XG4gICAgRmVlZGJhY2tGb3JtLmxhc3QgPSBmYWxzZTtcbiAgICBGZWVkYmFja0Zvcm0uZW1haWwgPSBmYWxzZTtcbiAgICBGZWVkYmFja0Zvcm0uYm9keSA9IGZhbHNlO1xuICAgIEZlZWRiYWNrRm9ybS5hZGRFdmVudExpc3RlbmVyVG9JbnB1dHMoKTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9JbnB1dHMoKSB7XG4gICAgLy8gbGV0IGZpcnN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXQtZmlyc3QtbmFtZScpO1xuICAgIC8vIGxldCBsYXN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXQtbGFzdC1uYW1lJyk7XG4gICAgLy8gbGV0IGVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXQtZW1haWwnKTtcbiAgICAvLyBsZXQgYm9keUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LWJvZHknKTtcbiAgICAvLyBmaXJzdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBlID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAvLyAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2JsdXInKTtcbiAgICAvLyB9LFxuICAgIC8vIGZhbHNlKTtcbiAgfVxufVxuIiwiLyoqXG4gKiAgICAgbmF2YmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyIHtcblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBsZXQgbmF2YmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19idG4nKTtcbiAgICBuYXZiYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgTmF2YmFyLnNldERyb3Bkb3duLCBmYWxzZSk7XG4gIH1cblxuICBzdGF0aWMgc2V0RHJvcGRvd24oKSB7XG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19idG4nKSxcbiAgICAgIGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fbGlzdCcpO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdtZW51X19idG5fYmxpbmsnKTtcbiAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ21lbnVfX2RyYXBkb3duJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9fYnRuX2JsaW5rJyk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqICAgICBzaWRlYmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IHlpaUFqYXggZnJvbSAneWlpLWFqYXgnO1xuaW1wb3J0IGh0bWwgZnJvbSAnaHRtbC1oZWxwZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWRlYmFyIHtcblxuICBzdGF0aWMgdG9wO1xuICBzdGF0aWMgbGVmdDtcbiAgc3RhdGljIGRpc3BsYXk7XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgU2lkZWJhci50b3AgPSAtMTAwMDtcbiAgICBTaWRlYmFyLmxlZnQgPSAwO1xuICAgIFNpZGViYXIuZGlzcGxheSA9ICdub25lJztcbiAgICBTaWRlYmFyLmNyZWF0ZUJveERpdigpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCk7XG4gICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9MaW5rcygpO1xuICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvTGlua0xpc3QoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVCb3hEaXYoKSB7XG4gICAgbGV0IGxpbmtzID0gaHRtbC50YWcoJ3VsJywgbnVsbCwge1xuICAgICAgaWQ6ICdwb3B1cC1saW5rcycsXG4gICAgICBjbGFzczogJ3BvcHVwLWJveF9fbGlua3MnXG4gICAgfSk7XG4gICAgbGV0IHRyaWFuZ2xlID0gaHRtbC50YWcoJ2RpdicsIG51bGwsIHtcbiAgICAgIGNsYXNzOiAncG9wdXAtYm94X190cmlhbmdsZSdcbiAgICB9KTtcbiAgICBsZXQgZGl2ID0gaHRtbC50YWcoJ2RpdicsIFt0cmlhbmdsZSwgbGlua3NdLFxuICAgICAge1xuICAgICAgICBpZDogJ3BvcHVwLWJveCcsXG4gICAgICAgIGNsYXNzOiAncG9wdXAtYm94J1xuICAgICAgfSwge1xuICAgICAgICBkaXNwbGF5OiBTaWRlYmFyLmRpc3BsYXksXG4gICAgICAgIHRvcDogU2lkZWJhci50b3AgKyAncHgnXG4gICAgICB9XG4gICAgKTtcblxuICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICBjYXRMaXN0LmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCkge1xuXG4gICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0LWxpc3QnKTtcbiAgICBsZXQgdGFnQ2xvdWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG4gICAgbGV0IHBvcHVwQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuXG4gICAgbGV0IGhpZGVQb3B1cCA9IGUgPT4ge1xuICAgICAgaWYgKCFjYXRMaXN0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkgJiZcbiAgICAgICAgICAhdGFnQ2xvdWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSAmJlxuICAgICAgICAgICFwb3B1cEJveC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgIFNpZGViYXIuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgU2lkZWJhci50b3AgPSAtMTAwMDtcbiAgICAgICAgU2lkZWJhci5yZW5kZXJQb3B1cCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGlkZVBvcHVwLCBmYWxzZSk7XG4gICAgdGFnQ2xvdWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoaWRlUG9wdXAsIGZhbHNlKTtcbiAgICBwb3B1cEJveC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhpZGVQb3B1cCwgZmFsc2UpO1xuICB9XG5cbiAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJUb0xpbmtzKCkge1xuXG4gICAgbGV0IGNhdHMsIHRhZ3M7XG4gICAgbGV0IHRvQXJyYXkgPSBjb2xsZWN0aW9uID0+IFtdLnNsaWNlLmNhbGwoY29sbGVjdGlvbik7XG5cbiAgICBjYXRzID0gdG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY2F0LWxpc3QgLmxpbmstbGlzdF9faXRlbScpKTtcbiAgICB0YWdzID0gdG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjdGFnLWNsb3VkIC5saW5rLWxpc3RfX2l0ZW0nKSk7XG5cbiAgICBjYXRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgeWlpQWpheC5wb3N0KCcvYWpheC9jYXQnLCB7XG4gICAgICAgICAgICBpZDogaXRlbS5kYXRhc2V0LmlkXG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBTaWRlYmFyLmxlZnQgPSBlLnBhZ2VYICsgMTU7XG4gICAgICAgICAgICAgIFNpZGViYXIudG9wID0gaXRlbS5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICBTaWRlYmFyLnJlbmRlclBvcHVwKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfSk7XG4gICAgdGFncy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLFxuICAgICAgICBlID0+IHtcbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHlpaUFqYXgucG9zdCgnL2FqYXgvdGFnJywge1xuICAgICAgICAgICAgaWQ6IGl0ZW0uZGF0YXNldC5pZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgU2lkZWJhci5sZWZ0ID0gZS5wYWdlWCArIDE1O1xuICAgICAgICAgICAgICBTaWRlYmFyLnRvcCA9IGl0ZW0ub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwRGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgU2lkZWJhci5yZW5kZXJQb3B1cCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJUb0xpbmtMaXN0KCkge1xuXG4gICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0LWxpc3QnKTtcbiAgICBsZXQgdGFnTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWctY2xvdWQnKTtcbiAgICBsZXQgaGFuZGxlTGlzdE1vdXNlT3ZlciA9ICgpID0+IHtcbiAgICAgIFNpZGViYXIuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfTtcblxuICAgIGNhdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlTGlzdE1vdXNlT3Zlcik7XG4gICAgdGFnTGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVMaXN0TW91c2VPdmVyKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRQb3B1cERhdGEoZGF0YSkge1xuICAgIGxldCBsaW5rTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1saW5rcycpO1xuICAgIGlmIChsaW5rTGlzdCkge1xuICAgICAgbGlua0xpc3QuaW5uZXJIVE1MID0gbnVsbDtcbiAgICAgIGxpbmtMaXN0LmFwcGVuZENoaWxkKGh0bWwudGFnKCdzcGFuJywgZGF0YS5uYW1lKSk7XG4gICAgICBkYXRhLmxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmtMaXN0LmFwcGVuZENoaWxkKGh0bWwudGFnKCdsaScsIGxpbmspKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW5kZXJQb3B1cCgpIHtcbiAgICBsZXQgcG9wdXBCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG4gICAgcG9wdXBCb3guc3R5bGUudG9wID0gU2lkZWJhci50b3AgKyAncHgnO1xuICAgIHBvcHVwQm94LnN0eWxlLmxlZnQgPSBTaWRlYmFyLmxlZnQgKyAncHgnO1xuICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSBTaWRlYmFyLmRpc3BsYXk7XG4gIH1cblxufVxuIiwiLyoqXG4gKiAgICAgc2xpZGVyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyIHtcblxuICBzdGF0aWMgVEhVTUJTID0gJy50aHVtYnMnO1xuICBzdGF0aWMgVEhVTUIgPSAnLnRodW1ic19fdGh1bWInO1xuICBzdGF0aWMgU0xJREVSID0gJy5zbGlkZXInO1xuICBzdGF0aWMgU0xJREUgPSAnLnNsaWRlcl9fc2xpZGUnO1xuICBzdGF0aWMgQUNUSVZFX1NMSURFID0gJ3NsaWRlcl9fc2xpZGVfYWN0aXZlJztcbiAgc3RhdGljIExFRlRfQlROID0gJy5zbGlkZXJfX2J0bmJveF9sZWZ0JztcbiAgc3RhdGljIFJJR0hUX0JUTiA9ICcuc2xpZGVyX19idG5ib3hfcmlnaHQnO1xuXG4gIGluaXQoKSB7XG5cbiAgICB0aGlzLnNsaWRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlNMSURFKTtcbiAgICB0aGlzLnNldFRpbWVyKDUwMDApO1xuXG4gICAgbGV0IGFjdGl2ZVNsaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICBpZiAoYWN0aXZlU2xpZGUubGVuZ3RoIDwgMSkge1xuICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoMCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuTEVGVF9CVE4pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgIGUgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zaG93UHJldlNsaWRlKCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuUklHSFRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICBlID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlNMSURFUikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLnRvZ2dsZVRpbWVyKDIwMDApO1xuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIGxldCB0aHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5USFVNQik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aHVtYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRodW1ic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICBsZXQgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuVEhVTUJTKTtcbiAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbltqXSA9PT0gdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgfVxuXG4gIHNldFRpbWVyKGludGVydmFsKSB7XG4gICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgIH0sIGludGVydmFsKTtcbiAgfVxuXG4gIGNsZWFyVGltZXIoKSB7XG4gICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVUaW1lcihpbnRlcnZhbCkge1xuICAgIGlmICh0aGlzLnRpbWVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRUaW1lcihpbnRlcnZhbCk7XG4gICAgfVxuICB9XG5cbiAgc2hvd1ByZXZTbGlkZSgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBY3RpdmVTbGlkZSgpO1xuICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgIGluZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMTtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpO1xuICB9XG5cbiAgc2hvd05leHRTbGlkZSgpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBY3RpdmVTbGlkZSgpO1xuICAgIGlmIChpbmRleCA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgIGluZGV4Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gMDtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpO1xuICB9XG5cbiAgZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnNsaWRlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoU2xpZGVyLkFDVElWRV9TTElERSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KSB7XG4gICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGgpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNsaWRlTGlzdFtpbmRleF0uY2xhc3NMaXN0LmFkZChTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogICAgIGFwcC5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gMTAvOS8xNlxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyJztcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyJztcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4uL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyJztcbmltcG9ydCBGZWVkYmFja0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9mb3JtL2Zvcm0nO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyJykpIHtcblxuICAgIE5hdmJhci5pbml0KCk7XG5cbiAgfVxuXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJykpIHtcblxuICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyKCk7XG4gICAgc2xpZGVyLmluaXQoKTtcblxuICB9XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJykpIHtcblxuICAgIFNpZGViYXIuaW5pdCgpO1xuXG4gIH1cblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19mb3JtJykpIHtcblxuICAgIEZlZWRiYWNrRm9ybS5pbml0KCk7XG5cbiAgfVxuXG59KTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIEhUTUwgaGVscGVyXG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogQ29weXJpZ2h0IEFuZHJpaSBTb3Jva2luXG4gKi9cblxudmFyIGh0bWwgPSBtb2R1bGUuZXhwb3J0cztcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICBodG1sVGFnICAgICBIVE1MIHRhZ1xuICogQHBhcmFtICB7U3RyaW5nLCAgICAgICAgIGlubmVySFRNTCAgIEhUTUwsIERPTSBlbGVtZW50XG4gKiAgICAgICAgICBET00gZWxlbWVudCwgICAgICAgICAgICAgICAgb3IgYXJyYXkgb2YgRE9NIGVsZW1lbnRzXG4gKiAgICAgICAgICBBcnJheX1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBhdHRycyAgICAgICBBdHRyaWJ1dGVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdleGFtcGxlLWlkJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleGFtcGxlLWNsYXNzLTEnLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXhhbXBsZS1jbGFzcy0yJ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIHN0eWxlICAgICAgIENTUyBzdHlsZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcxMHB4J1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAqIEByZXR1cm4ge0RPTSBlbGVtZW50fVxuICovXG5odG1sLnRhZyA9IGZ1bmN0aW9uIChodG1sVGFnLCBpbm5lckhUTUwsIGF0dHJzLCBzdHlsZSkge1xuXG4gIGxldCBlbGVtZW50O1xuXG4gIGxldFxuICAgIGFkZEF0dHJzID0gZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXR0cnMsIGtleSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsdWVTdHI7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGF0dHJzW2tleV0pKSB7XG4gICAgICAgICAgdmFsdWVTdHIgPSBhdHRyc1trZXldLmpvaW4oJyAnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZVN0ciA9IGF0dHJzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZVN0cik7XG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRDaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHR5cGVvZiBpbm5lckhUTUwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaW5uZXJIVE1MIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChpbm5lckhUTUwpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShpbm5lckhUTUwpKSB7XG4gICAgICAgIGlubmVySFRNTC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFkZFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGtleTtcbiAgICAgIGZvciAoa2V5IGluIHN0eWxlKSB7XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0eWxlLCBrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzdHlsZVtrZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHN0eWxlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gIC8qIEJFR0lOICovXG5cbiAgdHlwZW9mIGh0bWxUYWcgPT09ICdzdHJpbmcnID9cbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChodG1sVGFnKSA6XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIHR5cGVvZiBhdHRycyA9PT0gJ29iamVjdCcgJiYgYWRkQXR0cnMoKTtcblxuICBpbm5lckhUTUwgJiYgYWRkQ2hpbGRyZW4oKTtcblxuICB0eXBlb2Ygc3R5bGUgPT09ICdvYmplY3QnICYmIGFkZFN0eWxlcygpO1xuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBET00gZWxlbWVudCBvZiBsaW5rXG4gKlxuICogQHBhcmFtICB7U3RyaW5nLCAgICAgICAgIGlubmVySFRNTCAgIEhUTUwsIERPTSBlbGVtZW50XG4gKiAgICAgICAgICBET00gZWxlbWVudCwgICAgICAgICAgICAgICAgb3IgYXJyYXkgb2YgRE9NIGVsZW1lbnRzXG4gKiAgICAgICAgICBBcnJheX1cbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICB1cmwgICAgICAgICBXZWIgYWRkcmVzc1xuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGF0dHJzICAgICAgIEF0dHJpYnV0ZXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2V4YW1wbGUtaWQnLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2V4YW1wbGUtY2xhc3MtMScsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdleGFtcGxlLWNsYXNzLTInXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgc3R5bGUgICAgICAgQ1NTIHN0eWxlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJzEwcHgnXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICogQHJldHVybiB7RE9NIGVsZW1lbnR9ICAgICAgICAgICAgICAgIExpbmsgZWxlbWVudFxuICovXG5odG1sLmEgPSBmdW5jdGlvbiAoaW5uZXJIVE1MLCB1cmwsIGF0dHJzLCBzdHlsZSkge1xuICB2YXIgZWxlbWVudCA9IGh0bWwudGFnKCdhJywgaW5uZXJIVE1MLCBhdHRycywgc3R5bGUpO1xuICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQWpheCBNb2R1bGUgZm9yIFlpaTJcbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5sZXQgeWlpQWpheCA9IG1vZHVsZS5leHBvcnRzO1xuXG5sZXRcbiAgZXJyb3IgPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiBlXG4gICAgfTtcbiAgfSxcbiAgZXh0cmFjdERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGxldCBrZXk7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChrZXkgaW4gZGF0YSkge1xuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ICs9IGtleSArICc9JyArIGRhdGFba2V5XSArICcmJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgZ2V0Q1NSRiA9IGZ1bmN0aW9uKHBhcmFtLCB0b2tlbikge1xuICAgIGxldCBjc3JmUGFyYW1NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUocGFyYW0pWzBdO1xuICAgIGxldCBjc3JmVG9rZW5NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodG9rZW4pWzBdO1xuICAgIGxldCBjc3JmUGFyYW0gPSBjc3JmUGFyYW1NZXRhID9cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKHBhcmFtKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSA6IG51bGw7XG4gICAgbGV0IGNzcmZUb2tlbiA9IGNzcmZUb2tlbk1ldGEgP1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUodG9rZW4pWzBdLmdldEF0dHJpYnV0ZSgnY29udGVudCcpIDogbnVsbDtcbiAgICByZXR1cm4gY3NyZlBhcmFtICsgJz0nICsgY3NyZlRva2VuO1xuICB9LFxuICBqc29uID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICB9LFxuICBzdGF0dXMgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIH07XG5cbnlpaUFqYXgucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcblxuICBsZXQgaGVhZGVycyA9IHtcbiAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcbiAgfTtcbiAgbGV0IHRva2VuID0gZ2V0Q1NSRignY3NyZi1wYXJhbScsICdjc3JmLXRva2VuJyk7XG4gIGxldCBib2R5ID0gZXh0cmFjdERhdGEoZGF0YSkgKyB0b2tlbjtcbiAgbGV0IHJlcXVlc3QgPSB7XG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgaGVhZGVyczogaGVhZGVycyxcbiAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIGJvZHk6IGJvZHlcbiAgfTtcbiAgcmV0dXJuIGZldGNoKHVybCwgcmVxdWVzdClcbiAgICAudGhlbihzdGF0dXMpXG4gICAgLnRoZW4oanNvbilcbiAgICAuY2F0Y2goZXJyb3IpO1xufTtcbiJdfQ==
