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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/**
 *     sidebar.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

var _jsnautic = require('../../lib/jsnautic');

var _jsnautic2 = _interopRequireDefault(_jsnautic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sidebar = function () {
    function Sidebar() {
        _classCallCheck(this, Sidebar);
    }

    _createClass(Sidebar, [{
        key: 'init',
        value: function init() {

            var cats = Array.prototype.slice.call(document.querySelectorAll('#cat-list .link-list__item'));

            cats.forEach(function (item) {
                if ('ontouchstart' in window) {
                    item.addEventListener('click', function (e) {
                        e.preventDefault();
                    }, false);
                }
                item.addEventListener('mouseover', function (e) {
                    _jsnautic2.default.yiiAjaxRequest('/ajax/cat', 'id=' + item.dataset.id).then(function (data) {
                        var left = e.pageX + 5;
                        var top = item.offsetTop + 15;
                        Sidebar.setPopupData(data, left, top);
                    });
                }, false);
            });

            var tags = Array.prototype.slice.call(document.querySelectorAll('#tag-cloud .link-list__item'));

            tags.forEach(function (item) {
                if ('ontouchstart' in window) {
                    item.addEventListener('click', function (e) {
                        e.preventDefault();
                    }, false);
                }
                item.addEventListener('mouseover', function () {
                    _jsnautic2.default.yiiAjaxRequest('/ajax/tag', 'id=' + item.dataset.id).then(function (data) {
                        var left = item.offsetLeft + 20;
                        var top = item.offsetTop + item.offsetHeight;
                        Sidebar.setPopupData(data, left, top);
                    });
                }, false);
            });

            var catList = document.querySelector('#cat-list');
            var tagList = document.querySelector('#tag-cloud');

            catList.addEventListener('mouseover', Sidebar.handleListMouseOver);
            tagList.addEventListener('mouseover', Sidebar.handleListMouseOver);
        }
    }], [{
        key: 'setPopupData',
        value: function setPopupData(data, left, top) {
            var popupBox = document.querySelector('#popup-box');
            if (popupBox) {
                popupBox.style.top = top + 'px';
                popupBox.style.left = left + 'px';
                var linkList = document.querySelector('#popup-links');
                var tagString = '<span>' + data.name + '</span>';
                data.links.forEach(function (link) {
                    tagString += '<li>' + link + '</li>';
                });
                linkList.innerHTML = tagString;
            }
        }
    }, {
        key: 'handleListMouseOver',
        value: function handleListMouseOver() {
            var popupBox = document.querySelector('#popup-box');
            if (!popupBox) {
                Sidebar.createBoxDiv();
                Sidebar.addEventListenerToBoxDiv();
                popupBox = document.querySelector('#popup-box');
            }
            popupBox.style.display = 'block';
        }
    }, {
        key: 'createBoxDiv',
        value: function createBoxDiv() {
            var links = document.createElement('ul');
            var triangle = document.createElement('div');
            var div = document.createElement('div');
            links.setAttribute('id', 'popup-links');
            links.classList.add('popup-box__links');
            triangle.classList.add('popup-box__triangle');
            div.setAttribute('id', 'popup-box');
            div.classList.add('popup-box');
            div.style.display = 'none';
            div.style.top = '-1000px';
            div.appendChild(triangle);
            div.appendChild(links);
            var catList = document.querySelector('.sidebar');
            catList.appendChild(div);
        }
    }, {
        key: 'addEventListenerToBoxDiv',
        value: function addEventListenerToBoxDiv() {

            var catList = document.querySelector('#cat-list');
            var tagCloud = document.querySelector('#tag-cloud');
            var popupBox = document.querySelector('#popup-box');

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
                    popupBox = document.querySelector('#popup-box');
                    popupBox.style.display = 'none';
                    popupBox.style.top = '-1000px';
                }
            });
        }
    }]);

    return Sidebar;
}();

exports.default = Sidebar;

},{"../../lib/jsnautic":5}],3:[function(require,module,exports){
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

        var sidebar = new _sidebar2.default();
        sidebar.init();
    }
});
/**
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL25hdmJhci9uYXZiYXIuanMiLCJkZXYvYmxvY2tzL3NpZGViYXIvc2lkZWJhci5qcyIsImRldi9ibG9ja3Mvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pzbmF1dGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0NBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsrQkFFSDtBQUNWLGdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQSwwQkFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxPQUFPLFdBQS9DLEVBQTRELEtBQTVEO0FBQ0g7OztzQ0FFb0I7QUFDakIsZ0JBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUFBLGdCQUNJLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBRFg7QUFFQSxnQkFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixnQkFBbEI7QUFDQSxpQkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixlQUF0QjtBQUNBLHVCQUFXLFlBQU07QUFDYixvQkFBSSxTQUFKLENBQWMsTUFBZCxDQUFxQixnQkFBckI7QUFDSCxhQUZELEVBRUcsR0FGSDtBQUdIOzs7Ozs7a0JBZmdCLE07Ozs7Ozs7Ozs7QUNOckI7Ozs7OztBQU1BOzs7Ozs7OztJQUVxQixPOzs7Ozs7OytCQUVWOztBQUVILGdCQUFJLE9BQU8sTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQ04sSUFETSxDQUNELFNBQVMsZ0JBQVQsQ0FBMEIsNEJBQTFCLENBREMsQ0FBWDs7QUFHQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxJQUFELEVBQVU7QUFDbkIsb0JBQUksa0JBQWtCLE1BQXRCLEVBQThCO0FBQzFCLHlCQUFLLGdCQUFMLENBQXNCLE9BQXRCLEVBQ0ksYUFBSztBQUNELDBCQUFF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SDs7OytCQUVhLFEsRUFBVTtBQUNwQixnQkFBSSxTQUFTLE1BQVQsSUFBbUIsR0FBbkIsSUFBMEIsU0FBUyxNQUFULEdBQWtCLEdBQWhELEVBQXFEO0FBQ2pELHVCQUFPLFFBQVEsT0FBUixDQUFnQixRQUFoQixDQUFQO0FBQ0g7QUFDRCxtQkFBTyxRQUFRLE1BQVIsQ0FBZSxJQUFJLEtBQUosQ0FBVSxTQUFTLFVBQW5CLENBQWYsQ0FBUDtBQUNIOzs7NkJBRVcsUSxFQUFVO0FBQ2xCLG1CQUFPLFNBQVMsSUFBVCxFQUFQO0FBQ0g7Ozs7OztrQkExRGdCLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5zcGVjLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyIHtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgbmF2YmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpO1xuICAgICAgICBuYXZiYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgTmF2YmFyLnNldERyb3Bkb3duLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldERyb3Bkb3duKCkge1xuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJyksXG4gICAgICAgICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1kcmFwZG93bicpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWJ0bi1ibGluaycpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxufVxuIiwiXG4vKipcbiAqICAgICBzaWRlYmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IGpzTmF1dGljIGZyb20gJy4uLy4uL2xpYi9qc25hdXRpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGViYXIge1xuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICBsZXQgY2F0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NhdC1saXN0IC5saW5rLWxpc3RfX2l0ZW0nKSk7XG5cbiAgICAgICAgY2F0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGpzTmF1dGljLnlpaUFqYXhSZXF1ZXN0KCcvYWpheC9jYXQnLCAnaWQ9JyArIGl0ZW0uZGF0YXNldC5pZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IGUucGFnZVggKyA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvcCA9IGl0ZW0ub2Zmc2V0VG9wICsgMTU7XG4gICAgICAgICAgICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwRGF0YShkYXRhLCBsZWZ0LCB0b3ApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdGFncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3RhZy1jbG91ZCAubGluay1saXN0X19pdGVtJykpO1xuXG4gICAgICAgIHRhZ3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgICAgICAgICBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAganNOYXV0aWMueWlpQWpheFJlcXVlc3QoJy9hamF4L3RhZycsICdpZD0nICsgaXRlbS5kYXRhc2V0LmlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gaXRlbS5vZmZzZXRMZWZ0ICsgMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9wID0gaXRlbS5vZmZzZXRUb3AgKyBpdGVtLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEsIGxlZnQsIHRvcCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1saXN0Jyk7XG4gICAgICAgIGxldCB0YWdMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZy1jbG91ZCcpO1xuXG4gICAgICAgIGNhdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgU2lkZWJhci5oYW5kbGVMaXN0TW91c2VPdmVyKTtcbiAgICAgICAgdGFnTGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBTaWRlYmFyLmhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHNldFBvcHVwRGF0YShkYXRhLCBsZWZ0LCB0b3ApIHtcbiAgICAgICAgbGV0IHBvcHVwQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuICAgICAgICBpZiAocG9wdXBCb3gpIHtcbiAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgICAgICAgICBwb3B1cEJveC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgICAgICAgICBsZXQgbGlua0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtbGlua3MnKTtcbiAgICAgICAgICAgIGxldCB0YWdTdHJpbmcgPSAnPHNwYW4+JyArIGRhdGEubmFtZSArICc8L3NwYW4+JztcbiAgICAgICAgICAgIGRhdGEubGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgICAgICAgICAgIHRhZ1N0cmluZyArPSAnPGxpPicgKyBsaW5rICsgJzwvbGk+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGlua0xpc3QuaW5uZXJIVE1MID0gdGFnU3RyaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGhhbmRsZUxpc3RNb3VzZU92ZXIoKSB7XG4gICAgICAgIGxldCBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcbiAgICAgICAgaWYgKCFwb3B1cEJveCkge1xuICAgICAgICAgICAgU2lkZWJhci5jcmVhdGVCb3hEaXYoKTtcbiAgICAgICAgICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCk7XG4gICAgICAgICAgICBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcbiAgICAgICAgfVxuICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQm94RGl2KCkge1xuICAgICAgICBsZXQgbGlua3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBsZXQgdHJpYW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaW5rcy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BvcHVwLWxpbmtzJyk7XG4gICAgICAgIGxpbmtzLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWJveF9fbGlua3MnKTtcbiAgICAgICAgdHJpYW5nbGUuY2xhc3NMaXN0LmFkZCgncG9wdXAtYm94X190cmlhbmdsZScpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdpZCcsICdwb3B1cC1ib3gnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWJveCcpO1xuICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZGl2LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRyaWFuZ2xlKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGxpbmtzKTtcbiAgICAgICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgICAgICBjYXRMaXN0LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJUb0JveERpdigpIHtcblxuICAgICAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgICAgICBsZXQgdGFnQ2xvdWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG4gICAgICAgIGxldCBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcblxuICAgICAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLnJlbGF0ZWRUYXJnZXQgIT09IHBvcHVwQm94KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0YWdDbG91ZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsXG4gICAgICAgICAgICBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS5yZWxhdGVkVGFyZ2V0ICE9PSBwb3B1cEJveCkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBwb3B1cEJveC5zdHlsZS50b3AgPSAnLTEwMDBweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcG9wdXBCb3guYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLFxuICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCghY2F0TGlzdC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAoIXRhZ0Nsb3VkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpICYmXG4gICAgICAgICAgICAgICAgICAgICghcG9wdXBCb3guY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiAgICAgc2xpZGVyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyIHtcblxuICAgIHN0YXRpYyBUSFVNQlMgPSAnLnRodW1icyc7XG4gICAgc3RhdGljIFRIVU1CID0gJy50aHVtYnNfX3RodW1iJztcbiAgICBzdGF0aWMgU0xJREVSID0gJy5zbGlkZXInO1xuICAgIHN0YXRpYyBTTElERSA9ICcuc2xpZGVyX19zbGlkZSc7XG4gICAgc3RhdGljIEFDVElWRV9TTElERSA9ICdzbGlkZXJfX3NsaWRlX2FjdGl2ZSc7XG4gICAgc3RhdGljIExFRlRfQlROID0gJy5zbGlkZXJfX2J0bmJveF9sZWZ0JztcbiAgICBzdGF0aWMgUklHSFRfQlROID0gJy5zbGlkZXJfX2J0bmJveF9yaWdodCc7XG5cbiAgICBpbml0KCkge1xuXG4gICAgICAgIHRoaXMuc2xpZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTbGlkZXIuU0xJREUpO1xuICAgICAgICB0aGlzLnNldFRpbWVyKDUwMDApO1xuXG4gICAgICAgIGxldCBhY3RpdmVTbGlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgICAgIGlmIChhY3RpdmVTbGlkZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLkxFRlRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJldlNsaWRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5SSUdIVF9CVE4pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOZXh0U2xpZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlNMSURFUikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlVGltZXIoMjAwMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgdGh1bWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTbGlkZXIuVEhVTUIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1icy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGh1bWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlRIVU1CUyk7XG4gICAgICAgICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuW2pdID09PSB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGopO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNldFRpbWVyKGludGVydmFsKSB7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dOZXh0U2xpZGUoKTtcbiAgICAgICAgfSwgaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGNsZWFyVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVUaW1lcihpbnRlcnZhbCkge1xuICAgICAgICBpZiAodGhpcy50aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVyKGludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dQcmV2U2xpZGUoKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpO1xuICAgIH1cblxuICAgIHNob3dOZXh0U2xpZGUoKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCk7XG4gICAgICAgIGlmIChpbmRleCA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpO1xuICAgIH1cblxuICAgIGdldEluZGV4T2ZBY3RpdmVTbGlkZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhTbGlkZXIuQUNUSVZFX1NMSURFKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCkge1xuICAgICAgICBpZiAoKGluZGV4ID49IDApICYmIChpbmRleCA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zbGlkZUxpc3RbaW5kZXhdLmNsYXNzTGlzdC5hZGQoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIlxuLyoqXG4gKiAgICAganNuYXV0aWMuc3BlYy5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIE9jdG9iZXIgMjAxNiwgQXByaWwgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vYmxvY2tzL25hdmJhci9uYXZiYXInO1xuaW1wb3J0IFNsaWRlciBmcm9tICcuLi9ibG9ja3Mvc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQgU2lkZWJhciBmcm9tICcuLi9ibG9ja3Mvc2lkZWJhci9zaWRlYmFyJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXInKSkge1xuXG4gICAgICAgIE5hdmJhci5pbml0KCk7XG5cbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpKSB7XG5cbiAgICAgICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXIoKTtcbiAgICAgICAgc2xpZGVyLmluaXQoKTtcblxuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpKSB7XG5cbiAgICAgICAgbGV0IHNpZGViYXIgPSBuZXcgU2lkZWJhcigpO1xuICAgICAgICBzaWRlYmFyLmluaXQoKTtcblxuICAgIH1cblxufSk7XG4iLCJcbi8qKlxuICogICAgIGpzbmF1dGljLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQXByaWwgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpzTmF1dGljIHtcblxuICAgIHN0YXRpYyBnZXRBY3RpdmVJbmRleChjbGFzc05hbWUsIGFjdGl2ZUNsYXNzTmFtZSkge1xuICAgICAgICBsZXQgbm9kZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChub2RlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoYWN0aXZlQ2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9nZ2xlQ2xhc3NCeUluZGV4KHRhcmdldENsYXNzLCBzZXRDbGFzc05hbWUsIGluZGV4KSB7XG4gICAgICAgIGxldCBub2RlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGFyZ2V0Q2xhc3MpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobm9kZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKHNldENsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKHNldENsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCBub2RlTGlzdC5sZW5ndGgpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRhcmdldENsYXNzKVtpbmRleF0uY2xhc3NMaXN0LmFkZChzZXRDbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHlpaUFqYXhSZXF1ZXN0KHVybCwgYm9keSkge1xuXG4gICAgICAgIGxldCBjc3JmUGFyYW1NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtcGFyYW0nKVswXTtcbiAgICAgICAgbGV0IGNzcmZUb2tlbk1ldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY3NyZi10b2tlbicpWzBdO1xuICAgICAgICBsZXQgY3NyZlBhcmFtID0gY3NyZlBhcmFtTWV0YVxuICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY3NyZi1wYXJhbScpWzBdLmdldEF0dHJpYnV0ZSgnY29udGVudCcpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGxldCBjc3JmVG9rZW4gPSBjc3JmVG9rZW5NZXRhXG4gICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXRva2VuJylbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JylcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IHRva2VuID0gY3NyZlBhcmFtICsgJz0nICsgY3NyZlRva2VuO1xuXG4gICAgICAgIGxldCByZXF1ZXN0ID0ge307XG4gICAgICAgIHJlcXVlc3QubWV0aG9kID0gJ3Bvc3QnO1xuICAgICAgICByZXF1ZXN0LmhlYWRlcnMgPSB7XG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5jcmVkZW50aWFscyA9ICdpbmNsdWRlJztcbiAgICAgICAgcmVxdWVzdC5ib2R5ID0gYm9keSArICcmJyArIHRva2VuO1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCByZXF1ZXN0KVxuICAgICAgICAgICAgLnRoZW4oanNOYXV0aWMuc3RhdHVzKVxuICAgICAgICAgICAgLnRoZW4oanNOYXV0aWMuanNvbik7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgc3RhdHVzKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGpzb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG5cbn1cbiJdfQ==
