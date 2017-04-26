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
                item && item.addEventListener('mouseover', function (e) {
                    _jsnautic2.default.yiiAjaxRequest('/ajax/cat', 'id=' + item.dataset.id).then(function (data) {
                        Sidebar.setPopupData(data, e.pageX, e.pageY);
                    });
                }, false);
            });

            var tags = Array.prototype.slice.call(document.querySelectorAll('#tag-cloud .link-list__item'));

            tags.forEach(function (item) {
                item && item.addEventListener('mouseover', function (e) {
                    _jsnautic2.default.yiiAjaxRequest('/ajax/tag', 'id=' + item.dataset.id).then(function (data) {
                        Sidebar.setPopupData(data, e.pageX, e.pageY);
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
            var tagBox = document.querySelector('#popup-box');
            if (tagBox) {
                tagBox.style.top = top + 'px';
                tagBox.style.left = left + 5 + 'px';
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
                }
            });

            tagCloud.addEventListener('mouseout', function (e) {
                if (e.relatedTarget !== popupBox) {
                    popupBox.style.display = 'none';
                }
            });

            popupBox.addEventListener('mouseout', function (e) {
                if (e.relatedTarget !== catList && e.relatedTarget !== tagCloud && !popupBox.contains(e.relatedTarget)) {
                    popupBox = document.querySelector('#popup-box');
                    popupBox.style.display = 'none';
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
            return fetch(url, request).then(jsNautic.status).then(jsNautic.json).catch(jsNautic.error);
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
    }, {
        key: 'error',
        value: function error(errorText) {
            console.log('Request failed', errorText);
        }
    }]);

    return jsNautic;
}();

exports.default = jsNautic;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL25hdmJhci9uYXZiYXIuanMiLCJkZXYvYmxvY2tzL3NpZGViYXIvc2lkZWJhci5qcyIsImRldi9ibG9ja3Mvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pzbmF1dGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0NBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsrQkFFSDtBQUNWLGdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQSwwQkFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxPQUFPLFdBQS9DLEVBQTRELEtBQTVEO0FBQ0g7OztzQ0FFb0I7QUFDakIsZ0JBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUFBLGdCQUNJLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBRFg7QUFFQSxnQkFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixnQkFBbEI7QUFDQSxpQkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixlQUF0QjtBQUNBLHVCQUFXLFlBQU07QUFDYixvQkFBSSxTQUFKLENBQWMsTUFBZCxDQUFxQixnQkFBckI7QUFDSCxhQUZELEVBRUcsR0FGSDtBQUdIOzs7Ozs7a0JBZmdCLE07Ozs7Ozs7Ozs7QUNOckI7Ozs7OztBQU1BOzs7Ozs7OztJQUVxQixPOzs7Ozs7OytCQUVWOztBQUVILGdCQUFJLE9BQU8sTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQ04sSUFETSxDQUNELFNBQVMsZ0JBQVQsQ0FBMEIsNEJBQTFCLENBREMsQ0FBWDs7QUFHQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxJQUFELEVBQVU7QUFDbkIsd0JBQVEsS0FBSyxnQkFBTCxDQUFzQixXQUF0QixFQUNKLGFBQUs7QUFDRCx1Q0FBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLFFB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LFlBQTVDLENBQXlELFNBQXpELENBRFUsR0FFVixJQUZOO0FBR0EsZ0JBQUksWUFBWSxnQkFDVixTQUFTLGlCQUFULENBQTJCLFlBQTNCLEVBQXlDLENBQXpDLEVBQTRDLFlBQTVDLENBQXlELFNBQXpELENBRFUsR0FFVixJQUZOO0FBR0EsZ0JBQUksUUFBUSxZQUFZLEdBQVosR0FBa0IsU0FBOUI7O0FBRUEsZ0JBQUksVUFBVSxFQUFkO0FBQ0Esb0JBQVEsTUFBUixHQUFpQixNQUFqQjtBQUNBLG9CQUFRLE9BQVIsR0FBa0I7QUFDZCxnQ0FBZ0I7QUFERixhQUFsQjtBQUdBLG9CQUFRLFdBQVIsR0FBc0IsU0FBdEI7QUFDQSxvQkFBUSxJQUFSLEdBQWUsT0FBTyxHQUFQLEdBQWEsS0FBNUI7QUFDQSxtQkFBTyxNQUFNLEdBQU4sRUFBVyxPQUFYLEVBQ0YsSUFERSxDQUNHLFNBQVMsTUFEWixFQUVGLElBRkUsQ0FFRyxTQUFTLElBRlosRUFHRixLQUhFLENBR0ksU0FBUyxLQUhiLENBQVA7QUFLSDs7OytCQUVhLFEsRUFBVTtBQUNwQixnQkFBSSxTQUFTLE1BQVQsSUFBbUIsR0FBbkIsSUFBMEIsU0FBUyxNQUFULEdBQWtCLEdBQWhELEVBQXFEO0FBQ2pELHVCQUFPLFFBQVEsT0FBUixDQUFnQixRQUFoQixDQUFQO0FBQ0g7QUFDRCxtQkFBTyxRQUFRLE1BQVIsQ0FBZSxJQUFJLEtBQUosQ0FBVSxTQUFTLFVBQW5CLENBQWYsQ0FBUDtBQUNIOzs7NkJBRVcsUSxFQUFVO0FBQ2xCLG1CQUFPLFNBQVMsSUFBVCxFQUFQO0FBQ0g7Ozs4QkFFWSxTLEVBQVc7QUFDcEIsb0JBQVEsR0FBUixDQUFZLGdCQUFaLEVBQThCLFNBQTlCO0FBQ0g7Ozs7OztrQkEvRGdCLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5zcGVjLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyIHtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgbmF2YmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpO1xuICAgICAgICBuYXZiYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgTmF2YmFyLnNldERyb3Bkb3duLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldERyb3Bkb3duKCkge1xuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJyksXG4gICAgICAgICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1kcmFwZG93bicpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWJ0bi1ibGluaycpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxufVxuIiwiXG4vKipcbiAqICAgICBzaWRlYmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IGpzTmF1dGljIGZyb20gJy4uLy4uL2xpYi9qc25hdXRpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGViYXIge1xuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICBsZXQgY2F0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NhdC1saXN0IC5saW5rLWxpc3RfX2l0ZW0nKSk7XG5cbiAgICAgICAgY2F0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtICYmIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgICAgICAgICBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAganNOYXV0aWMueWlpQWpheFJlcXVlc3QoJy9hamF4L2NhdCcsICdpZD0nICsgaXRlbS5kYXRhc2V0LmlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEsIGUucGFnZVgsIGUucGFnZVkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdGFncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3RhZy1jbG91ZCAubGluay1saXN0X19pdGVtJykpO1xuXG4gICAgICAgIHRhZ3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbSAmJiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGpzTmF1dGljLnlpaUFqYXhSZXF1ZXN0KCcvYWpheC90YWcnLCAnaWQ9JyArIGl0ZW0uZGF0YXNldC5pZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwRGF0YShkYXRhLCBlLnBhZ2VYLCBlLnBhZ2VZKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0LWxpc3QnKTtcbiAgICAgICAgbGV0IHRhZ0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG5cbiAgICAgICAgY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBTaWRlYmFyLmhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICAgICAgICB0YWdMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFNpZGViYXIuaGFuZGxlTGlzdE1vdXNlT3Zlcik7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0UG9wdXBEYXRhKGRhdGEsIGxlZnQsIHRvcCkge1xuICAgICAgICBsZXQgdGFnQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuICAgICAgICBpZiAodGFnQm94KSB7XG4gICAgICAgICAgICB0YWdCb3guc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICAgICAgICAgIHRhZ0JveC5zdHlsZS5sZWZ0ID0gbGVmdCArIDUgKyAncHgnO1xuICAgICAgICAgICAgbGV0IGxpbmtMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWxpbmtzJyk7XG4gICAgICAgICAgICBsZXQgdGFnU3RyaW5nID0gJzxzcGFuPicgKyBkYXRhLm5hbWUgKyAnPC9zcGFuPic7XG4gICAgICAgICAgICBkYXRhLmxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgICAgICAgICAgICB0YWdTdHJpbmcgKz0gJzxsaT4nICsgbGluayArICc8L2xpPic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpbmtMaXN0LmlubmVySFRNTCA9IHRhZ1N0cmluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBoYW5kbGVMaXN0TW91c2VPdmVyKCkge1xuICAgICAgICBsZXQgcG9wdXBCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG4gICAgICAgIGlmICghcG9wdXBCb3gpIHtcbiAgICAgICAgICAgIFNpZGViYXIuY3JlYXRlQm94RGl2KCk7XG4gICAgICAgICAgICBTaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXJUb0JveERpdigpO1xuICAgICAgICAgICAgcG9wdXBCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcG9wdXBCb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUJveERpdigpIHtcbiAgICAgICAgbGV0IGxpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGlua3Muc2V0QXR0cmlidXRlKCdpZCcsICdwb3B1cC1saW5rcycpO1xuICAgICAgICBsaW5rcy5jbGFzc0xpc3QuYWRkKCdwb3B1cC1ib3hfX2xpbmtzJyk7XG4gICAgICAgIHRyaWFuZ2xlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWJveF9fdHJpYW5nbGUnKTtcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAncG9wdXAtYm94Jyk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwb3B1cC1ib3gnKTtcbiAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRpdi5zdHlsZS50b3AgPSAnLTEwMDBweCc7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0cmlhbmdsZSk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChsaW5rcyk7XG4gICAgICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICAgICAgY2F0TGlzdC5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKSB7XG5cbiAgICAgICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0LWxpc3QnKTtcbiAgICAgICAgbGV0IHRhZ0Nsb3VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZy1jbG91ZCcpO1xuICAgICAgICBsZXQgcG9wdXBCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG5cbiAgICAgICAgY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsXG4gICAgICAgICAgICBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS5yZWxhdGVkVGFyZ2V0ICE9PSBwb3B1cEJveCkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRhZ0Nsb3VkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLnJlbGF0ZWRUYXJnZXQgIT09IHBvcHVwQm94KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcG9wdXBCb3guYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLFxuICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKChlLnJlbGF0ZWRUYXJnZXQgIT09IGNhdExpc3QpICYmXG4gICAgICAgICAgICAgICAgICAgIChlLnJlbGF0ZWRUYXJnZXQgIT09IHRhZ0Nsb3VkKSAmJlxuICAgICAgICAgICAgICAgICAgICAoIXBvcHVwQm94LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWJveCcpO1xuICAgICAgICAgICAgICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiXG4vKipcbiAqICAgICBzbGlkZXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xuXG4gICAgc3RhdGljIFRIVU1CUyA9ICcudGh1bWJzJztcbiAgICBzdGF0aWMgVEhVTUIgPSAnLnRodW1ic19fdGh1bWInO1xuICAgIHN0YXRpYyBTTElERVIgPSAnLnNsaWRlcic7XG4gICAgc3RhdGljIFNMSURFID0gJy5zbGlkZXJfX3NsaWRlJztcbiAgICBzdGF0aWMgQUNUSVZFX1NMSURFID0gJ3NsaWRlcl9fc2xpZGVfYWN0aXZlJztcbiAgICBzdGF0aWMgTEVGVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X2xlZnQnO1xuICAgIHN0YXRpYyBSSUdIVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X3JpZ2h0JztcblxuICAgIGluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5zbGlkZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5TTElERSk7XG4gICAgICAgIHRoaXMuc2V0VGltZXIoNTAwMCk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZVNsaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgICAgaWYgKGFjdGl2ZVNsaWRlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuTEVGVF9CVE4pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQcmV2U2xpZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlJJR0hUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuU0xJREVSKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVUaW1lcigyMDAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCB0aHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5USFVNQik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGh1bWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aHVtYnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuVEhVTUJTKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW5bal0gPT09IHRhcmdldC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2V0VGltZXIoaW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVRpbWVyKGludGVydmFsKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1ByZXZTbGlkZSgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gICAgfVxuXG4gICAgc2hvd05leHRTbGlkZSgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gICAgfVxuXG4gICAgZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFNsaWRlci5BQ1RJVkVfU0xJREUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KSB7XG4gICAgICAgIGlmICgoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsaWRlTGlzdFtpbmRleF0uY2xhc3NMaXN0LmFkZChTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5zcGVjLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgT2N0b2JlciAyMDE2LCBBcHJpbCAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IE5hdmJhciBmcm9tICcuLi9ibG9ja3MvbmF2YmFyL25hdmJhcic7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4uL2Jsb2Nrcy9zbGlkZXIvc2xpZGVyJztcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4uL2Jsb2Nrcy9zaWRlYmFyL3NpZGViYXInO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpKSB7XG5cbiAgICAgICAgTmF2YmFyLmluaXQoKTtcblxuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJykpIHtcblxuICAgICAgICBsZXQgc2xpZGVyID0gbmV3IFNsaWRlcigpO1xuICAgICAgICBzbGlkZXIuaW5pdCgpO1xuXG4gICAgfVxuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJykpIHtcblxuICAgICAgICBsZXQgc2lkZWJhciA9IG5ldyBTaWRlYmFyKCk7XG4gICAgICAgIHNpZGViYXIuaW5pdCgpO1xuXG4gICAgfVxuXG59KTtcbiIsIlxuLyoqXG4gKiAgICAganNuYXV0aWMuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBBcHJpbCAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MganNOYXV0aWMge1xuXG4gICAgc3RhdGljIGdldEFjdGl2ZUluZGV4KGNsYXNzTmFtZSwgYWN0aXZlQ2xhc3NOYW1lKSB7XG4gICAgICAgIGxldCBub2RlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhhY3RpdmVDbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b2dnbGVDbGFzc0J5SW5kZXgodGFyZ2V0Q2xhc3MsIHNldENsYXNzTmFtZSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0YXJnZXRDbGFzcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChub2RlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoc2V0Q2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoc2V0Q2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKGluZGV4ID49IDApICYmIChpbmRleCA8IG5vZGVMaXN0Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGFyZ2V0Q2xhc3MpW2luZGV4XS5jbGFzc0xpc3QuYWRkKHNldENsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgeWlpQWpheFJlcXVlc3QodXJsLCBib2R5KSB7XG5cbiAgICAgICAgbGV0IGNzcmZQYXJhbU1ldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY3NyZi1wYXJhbScpWzBdO1xuICAgICAgICBsZXQgY3NyZlRva2VuTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXRva2VuJylbMF07XG4gICAgICAgIGxldCBjc3JmUGFyYW0gPSBjc3JmUGFyYW1NZXRhXG4gICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXBhcmFtJylbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JylcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IGNzcmZUb2tlbiA9IGNzcmZUb2tlbk1ldGFcbiAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtdG9rZW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBsZXQgdG9rZW4gPSBjc3JmUGFyYW0gKyAnPScgKyBjc3JmVG9rZW47XG5cbiAgICAgICAgbGV0IHJlcXVlc3QgPSB7fTtcbiAgICAgICAgcmVxdWVzdC5tZXRob2QgPSAncG9zdCc7XG4gICAgICAgIHJlcXVlc3QuaGVhZGVycyA9IHtcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04J1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0LmNyZWRlbnRpYWxzID0gJ2luY2x1ZGUnO1xuICAgICAgICByZXF1ZXN0LmJvZHkgPSBib2R5ICsgJyYnICsgdG9rZW47XG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHJlcXVlc3QpXG4gICAgICAgICAgICAudGhlbihqc05hdXRpYy5zdGF0dXMpXG4gICAgICAgICAgICAudGhlbihqc05hdXRpYy5qc29uKVxuICAgICAgICAgICAgLmNhdGNoKGpzTmF1dGljLmVycm9yKTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBzdGF0dXMocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMganNvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihlcnJvclRleHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JlcXVlc3QgZmFpbGVkJywgZXJyb3JUZXh0KTtcbiAgICB9XG5cbn1cbiJdfQ==
