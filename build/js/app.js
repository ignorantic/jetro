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

            var cats = Array.prototype.slice.call(document.querySelectorAll('.cat-item'));

            cats.forEach(function (item) {
                item && item.addEventListener('mouseover', function (e) {
                    _jsnautic2.default.yiiAjaxRequest('id=' + item.dataset.id, e);
                }, false);
            });
        }
    }], [{
        key: 'status',
        value: function status(response) {
            if (Sidebar.status >= 200 && Sidebar.status < 300) {
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText));
        }
    }, {
        key: 'json',
        value: function json() {
            return Sidebar.json();
        }
    }, {
        key: 'error',
        value: function error(err) {
            console.log('Request failed', err);
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

    if (document.querySelector('.cat-item')) {

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
        value: function yiiAjaxRequest(body, e) {

            function status(response) {
                if (status >= 200 && status < 300) {
                    return Promise.resolve(response);
                }
                return Promise.reject(new Error(response.statusText));
            }

            function json() {
                return json();
            }

            function error(err) {
                console.log('Request failed', err);
            }

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
            fetch('/ajax/cat', request).then(status).then(json).then(function (data) {
                var catBox = document.querySelector('#cat-box');
                if (catBox) {
                    catBox.style.top = e.pageY + 'px';
                    catBox.style.left = e.pageX + 5 + 'px';
                    var linkList = document.querySelector('#cat-links');
                    var catString = '<span>' + data.name + '</span>';
                    data.links.forEach(function (link) {
                        catString += '<li>' + link + '</li>';
                    });
                    linkList.innerHTML = catString;
                }
            }).catch(error);
        }
    }]);

    return jsNautic;
}();

exports.default = jsNautic;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL25hdmJhci9uYXZiYXIuanMiLCJkZXYvYmxvY2tzL3NpZGViYXIvc2lkZWJhci5qcyIsImRldi9ibG9ja3Mvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pzbmF1dGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0NBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsrQkFFSDtBQUNWLGdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQSwwQkFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxPQUFPLFdBQS9DLEVBQTRELEtBQTVEO0FBQ0g7OztzQ0FFb0I7QUFDakIsZ0JBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUFBLGdCQUNJLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBRFg7QUFFQSxnQkFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixnQkFBbEI7QUFDQSxpQkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixlQUF0QjtBQUNBLHVCQUFXLFlBQU07QUFDYixvQkFBSSxTQUFKLENBQWMsTUFBZCxDQUFxQixnQkFBckI7QUFDSCxhQUZELEVBRUcsR0FGSDtBQUdIOzs7Ozs7a0JBZmdCLE07Ozs7Ozs7Ozs7QUNOckI7Ozs7OztBQU1BOzs7Ozs7OztJQUVxQixPOzs7Ozs7OytCQUVWOztBQUVILGdCQUFJLE9BQU8sTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLENBQTJCLFNBQVMsZ0JBQVQsQ0FBMEIsV0FBMUIsQ0FBM0IsQ0FBWDs7QUFFQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxJQUFELEVBQVU7QUFDbkIsd0JBQVEsS0FBSyxnQkFBTCxDQUFzQixXQUF0QixFQUNKLGFBQUs7QUFDRCx1Q0FBUyxjQUFULENBQXdCLFFBQVEsS0FBSyxP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IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5zcGVjLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyIHtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgbmF2YmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpO1xuICAgICAgICBuYXZiYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgTmF2YmFyLnNldERyb3Bkb3duLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldERyb3Bkb3duKCkge1xuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJyksXG4gICAgICAgICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1kcmFwZG93bicpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWJ0bi1ibGluaycpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxufVxuIiwiXG4vKipcbiAqICAgICBzaWRlYmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IGpzTmF1dGljIGZyb20gJy4uLy4uL2xpYi9qc25hdXRpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGViYXIge1xuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICBsZXQgY2F0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXQtaXRlbScpKTtcblxuICAgICAgICBjYXRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0gJiYgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLFxuICAgICAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBqc05hdXRpYy55aWlBamF4UmVxdWVzdCgnaWQ9JyArIGl0ZW0uZGF0YXNldC5pZCwgZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgc3RhdHVzKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChTaWRlYmFyLnN0YXR1cyA+PSAyMDAgJiYgU2lkZWJhci5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBqc29uKCkge1xuICAgICAgICByZXR1cm4gU2lkZWJhci5qc29uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVxdWVzdCBmYWlsZWQnLCBlcnIpO1xuICAgIH1cblxufVxuIiwiXG4vKipcbiAqICAgICBzbGlkZXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xuXG4gICAgc3RhdGljIFRIVU1CUyA9ICcudGh1bWJzJztcbiAgICBzdGF0aWMgVEhVTUIgPSAnLnRodW1ic19fdGh1bWInO1xuICAgIHN0YXRpYyBTTElERVIgPSAnLnNsaWRlcic7XG4gICAgc3RhdGljIFNMSURFID0gJy5zbGlkZXJfX3NsaWRlJztcbiAgICBzdGF0aWMgQUNUSVZFX1NMSURFID0gJ3NsaWRlcl9fc2xpZGVfYWN0aXZlJztcbiAgICBzdGF0aWMgTEVGVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X2xlZnQnO1xuICAgIHN0YXRpYyBSSUdIVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X3JpZ2h0JztcblxuICAgIGluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5zbGlkZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5TTElERSk7XG4gICAgICAgIHRoaXMuc2V0VGltZXIoNTAwMCk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZVNsaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgICAgaWYgKGFjdGl2ZVNsaWRlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuTEVGVF9CVE4pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQcmV2U2xpZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlJJR0hUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuU0xJREVSKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVUaW1lcigyMDAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCB0aHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5USFVNQik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGh1bWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aHVtYnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuVEhVTUJTKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW5bal0gPT09IHRhcmdldC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2V0VGltZXIoaW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVRpbWVyKGludGVydmFsKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1ByZXZTbGlkZSgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gICAgfVxuXG4gICAgc2hvd05leHRTbGlkZSgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gICAgfVxuXG4gICAgZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFNsaWRlci5BQ1RJVkVfU0xJREUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KSB7XG4gICAgICAgIGlmICgoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsaWRlTGlzdFtpbmRleF0uY2xhc3NMaXN0LmFkZChTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5zcGVjLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgT2N0b2JlciAyMDE2LCBBcHJpbCAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IE5hdmJhciBmcm9tICcuLi9ibG9ja3MvbmF2YmFyL25hdmJhcic7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4uL2Jsb2Nrcy9zbGlkZXIvc2xpZGVyJztcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4uL2Jsb2Nrcy9zaWRlYmFyL3NpZGViYXInO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpKSB7XG5cbiAgICAgICAgTmF2YmFyLmluaXQoKTtcbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcicpKSB7XG5cbiAgICAgICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXIoKTtcbiAgICAgICAgc2xpZGVyLmluaXQoKTtcblxuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0LWl0ZW0nKSkge1xuXG4gICAgICAgIGxldCBzaWRlYmFyID0gbmV3IFNpZGViYXIoKTtcbiAgICAgICAgc2lkZWJhci5pbml0KCk7XG5cbiAgICB9XG5cbn0pO1xuIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIEFwcmlsIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBqc05hdXRpYyB7XG5cbiAgICBzdGF0aWMgZ2V0QWN0aXZlSW5kZXgoY2xhc3NOYW1lLCBhY3RpdmVDbGFzc05hbWUpIHtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobm9kZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKGFjdGl2ZUNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvZ2dsZUNsYXNzQnlJbmRleCh0YXJnZXRDbGFzcywgc2V0Q2xhc3NOYW1lLCBpbmRleCkge1xuICAgICAgICBsZXQgbm9kZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRhcmdldENsYXNzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhzZXRDbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShzZXRDbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgbm9kZUxpc3QubGVuZ3RoKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0YXJnZXRDbGFzcylbaW5kZXhdLmNsYXNzTGlzdC5hZGQoc2V0Q2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB5aWlBamF4UmVxdWVzdChib2R5LCBlKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gc3RhdHVzKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24ganNvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBqc29uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0IGZhaWxlZCcsIGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3NyZlBhcmFtTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXBhcmFtJylbMF07XG4gICAgICAgIGxldCBjc3JmVG9rZW5NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtdG9rZW4nKVswXTtcbiAgICAgICAgbGV0IGNzcmZQYXJhbSA9IGNzcmZQYXJhbU1ldGFcbiAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtcGFyYW0nKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBsZXQgY3NyZlRva2VuID0gY3NyZlRva2VuTWV0YVxuICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY3NyZi10b2tlbicpWzBdLmdldEF0dHJpYnV0ZSgnY29udGVudCcpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGxldCB0b2tlbiA9IGNzcmZQYXJhbSArICc9JyArIGNzcmZUb2tlbjtcblxuICAgICAgICBsZXQgcmVxdWVzdCA9IHt9O1xuICAgICAgICByZXF1ZXN0Lm1ldGhvZCA9ICdwb3N0JztcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzID0ge1xuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3QuY3JlZGVudGlhbHMgPSAnaW5jbHVkZSc7XG4gICAgICAgIHJlcXVlc3QuYm9keSA9IGJvZHkgKyAnJicgKyB0b2tlbjtcbiAgICAgICAgZmV0Y2goJy9hamF4L2NhdCcsIHJlcXVlc3QpXG4gICAgICAgICAgICAudGhlbihzdGF0dXMpXG4gICAgICAgICAgICAudGhlbihqc29uKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY2F0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1ib3gnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2F0Qm94KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhdEJveC5zdHlsZS50b3AgPSBlLnBhZ2VZICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgY2F0Qm94LnN0eWxlLmxlZnQgPSBlLnBhZ2VYICsgNSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5rTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlua3MnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhdFN0cmluZyA9ICc8c3Bhbj4nICsgZGF0YS5uYW1lICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdFN0cmluZyArPSAnPGxpPicgKyBsaW5rICsgJzwvbGk+JztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtMaXN0LmlubmVySFRNTCA9IGNhdFN0cmluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yKTtcblxuICAgIH1cblxufVxuIl19
