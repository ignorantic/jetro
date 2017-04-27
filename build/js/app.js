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

    _createClass(Sidebar, null, [{
        key: 'init',
        value: function init() {

            var cats = Array.prototype.slice.call(document.querySelectorAll('#cat-list .link-list__item'));

            cats.forEach(function (item) {
                item.addEventListener('mouseover', function (e) {
                    if ('ontouchstart' in window) {
                        return;
                    }
                    _jsnautic2.default.yiiAjaxRequest('/ajax/cat', 'id=' + item.dataset.id).then(function (data) {
                        var left = e.pageX + 5;
                        var top = item.offsetTop + 15;
                        Sidebar.setPopupData(data);
                        Sidebar.setPopupPosition(left, top);
                    });
                }, false);
            });

            var tags = Array.prototype.slice.call(document.querySelectorAll('#tag-cloud .link-list__item'));

            tags.forEach(function (item) {
                item.addEventListener('mouseover', function () {
                    if ('ontouchstart' in window) {
                        return;
                    }
                    _jsnautic2.default.yiiAjaxRequest('/ajax/tag', 'id=' + item.dataset.id).then(function (data) {
                        var left = item.offsetLeft + 20;
                        var top = item.offsetTop + item.offsetHeight;
                        Sidebar.setPopupData(data);
                        Sidebar.setPopupPosition(left, top);
                    });
                }, false);
            });

            var catList = document.querySelector('#cat-list');
            var tagList = document.querySelector('#tag-cloud');

            catList.addEventListener('mouseover', Sidebar.handleListMouseOver);
            tagList.addEventListener('mouseover', Sidebar.handleListMouseOver);
        }
    }, {
        key: 'getPopup',
        value: function getPopup() {
            return document.querySelector('#popup-box');
        }
    }, {
        key: 'setPopupData',
        value: function setPopupData(data) {
            var popupBox = Sidebar.getPopup();
            if (popupBox) {
                var linkList = document.querySelector('#popup-links');
                var tagString = '<span>' + data.name + '</span>';
                data.links.forEach(function (link) {
                    tagString += '<li>' + link + '</li>';
                });
                linkList.innerHTML = tagString;
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
                Sidebar.createBoxDiv();
                popupBox = Sidebar.getPopup();
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
            Sidebar.addEventListenerToBoxDiv();
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

        _sidebar2.default.init();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL25hdmJhci9uYXZiYXIuanMiLCJkZXYvYmxvY2tzL3NpZGViYXIvc2lkZWJhci5qcyIsImRldi9ibG9ja3Mvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pzbmF1dGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0NBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsrQkFFSDtBQUNWLGdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQSwwQkFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxPQUFPLFdBQS9DLEVBQTRELEtBQTVEO0FBQ0g7OztzQ0FFb0I7QUFDakIsZ0JBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUFBLGdCQUNJLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBRFg7QUFFQSxnQkFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixnQkFBbEI7QUFDQSxpQkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixlQUF0QjtBQUNBLHVCQUFXLFlBQU07QUFDYixvQkFBSSxTQUFKLENBQWMsTUFBZCxDQUFxQixnQkFBckI7QUFDSCxhQUZELEVBRUcsR0FGSDtBQUdIOzs7Ozs7a0JBZmdCLE07Ozs7Ozs7Ozs7QUNOckI7Ozs7OztBQU1BOzs7Ozs7OztJQUVxQixPOzs7Ozs7OytCQUVIOztBQUVWLGdCQUFJLE9BQU8sTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQ04sSUFETSxDQUNELFNBQVMsZ0JBQVQsQ0FBMEIsNEJBQTFCLENBREMsQ0FBWDs7QUFHQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxJQUFELEVBQVU7QUFDbkIscUJBQUssZ0JBQUwsQ0FBc0IsV0FBdEIsRUFDSSxhQUFLO0FBQ0Qsd0JBQUksa0JBQWtCLE1BQXRCLEVBQThCO0FBQzFCO0FBQ0g7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dUJBQU8sUUFBUSxPQUFSLENBQWdCLFFBQWhCLENBQVA7QUFDSDtBQUNELG1CQUFPLFFBQVEsTUFBUixDQUFlLElBQUksS0FBSixDQUFVLFNBQVMsVUFBbkIsQ0FBZixDQUFQO0FBQ0g7Ozs2QkFFVyxRLEVBQVU7QUFDbEIsbUJBQU8sU0FBUyxJQUFULEVBQVA7QUFDSDs7Ozs7O2tCQTFEZ0IsUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8qKlxuICogICAgIGpzbmF1dGljLnNwZWMuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZiYXIge1xuXG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIGxldCBuYXZiYXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJyk7XG4gICAgICAgIG5hdmJhckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBOYXZiYXIuc2V0RHJvcGRvd24sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0RHJvcGRvd24oKSB7XG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1idG4nKSxcbiAgICAgICAgICAgIGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbWVudS1idG4tYmxpbmsnKTtcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LWRyYXBkb3duJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogICAgIHNpZGViYXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5pbXBvcnQganNOYXV0aWMgZnJvbSAnLi4vLi4vbGliL2pzbmF1dGljJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lkZWJhciB7XG5cbiAgICBzdGF0aWMgaW5pdCgpIHtcblxuICAgICAgICBsZXQgY2F0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NhdC1saXN0IC5saW5rLWxpc3RfX2l0ZW0nKSk7XG5cbiAgICAgICAgY2F0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBqc05hdXRpYy55aWlBamF4UmVxdWVzdCgnL2FqYXgvY2F0JywgJ2lkPScgKyBpdGVtLmRhdGFzZXQuaWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBlLnBhZ2VYICsgNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b3AgPSBpdGVtLm9mZnNldFRvcCArIDE1O1xuICAgICAgICAgICAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwUG9zaXRpb24obGVmdCwgdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHRhZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgICAgICAgIC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN0YWctY2xvdWQgLmxpbmstbGlzdF9faXRlbScpKTtcblxuICAgICAgICB0YWdzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBqc05hdXRpYy55aWlBamF4UmVxdWVzdCgnL2FqYXgvdGFnJywgJ2lkPScgKyBpdGVtLmRhdGFzZXQuaWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBpdGVtLm9mZnNldExlZnQgKyAyMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b3AgPSBpdGVtLm9mZnNldFRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwUG9zaXRpb24obGVmdCwgdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0LWxpc3QnKTtcbiAgICAgICAgbGV0IHRhZ0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG5cbiAgICAgICAgY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBTaWRlYmFyLmhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICAgICAgICB0YWdMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFNpZGViYXIuaGFuZGxlTGlzdE1vdXNlT3Zlcik7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UG9wdXAoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFBvcHVwRGF0YShkYXRhKSB7XG4gICAgICAgIGxldCBwb3B1cEJveCA9IFNpZGViYXIuZ2V0UG9wdXAoKTtcbiAgICAgICAgaWYgKHBvcHVwQm94KSB7XG4gICAgICAgICAgICBsZXQgbGlua0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtbGlua3MnKTtcbiAgICAgICAgICAgIGxldCB0YWdTdHJpbmcgPSAnPHNwYW4+JyArIGRhdGEubmFtZSArICc8L3NwYW4+JztcbiAgICAgICAgICAgIGRhdGEubGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgICAgICAgICAgIHRhZ1N0cmluZyArPSAnPGxpPicgKyBsaW5rICsgJzwvbGk+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGlua0xpc3QuaW5uZXJIVE1MID0gdGFnU3RyaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFBvcHVwUG9zaXRpb24obGVmdCwgdG9wKSB7XG4gICAgICAgIGxldCBwb3B1cEJveCA9IFNpZGViYXIuZ2V0UG9wdXAoKTtcbiAgICAgICAgaWYgKHBvcHVwQm94KSB7XG4gICAgICAgICAgICBwb3B1cEJveC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgICAgICAgICAgcG9wdXBCb3guc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGhhbmRsZUxpc3RNb3VzZU92ZXIoKSB7XG4gICAgICAgIGxldCBwb3B1cEJveCA9IFNpZGViYXIuZ2V0UG9wdXAoKTtcbiAgICAgICAgaWYgKCFwb3B1cEJveCkge1xuICAgICAgICAgICAgU2lkZWJhci5jcmVhdGVCb3hEaXYoKTtcbiAgICAgICAgICAgIHBvcHVwQm94ID0gU2lkZWJhci5nZXRQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVCb3hEaXYoKSB7XG4gICAgICAgIGxldCBsaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGxldCB0cmlhbmdsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxpbmtzLnNldEF0dHJpYnV0ZSgnaWQnLCAncG9wdXAtbGlua3MnKTtcbiAgICAgICAgbGlua3MuY2xhc3NMaXN0LmFkZCgncG9wdXAtYm94X19saW5rcycpO1xuICAgICAgICB0cmlhbmdsZS5jbGFzc0xpc3QuYWRkKCdwb3B1cC1ib3hfX3RyaWFuZ2xlJyk7XG4gICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BvcHVwLWJveCcpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgncG9wdXAtYm94Jyk7XG4gICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkaXYuc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodHJpYW5nbGUpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobGlua3MpO1xuICAgICAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG4gICAgICAgIGNhdExpc3QuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgU2lkZWJhci5hZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCkge1xuXG4gICAgICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1saXN0Jyk7XG4gICAgICAgIGxldCB0YWdDbG91ZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWctY2xvdWQnKTtcbiAgICAgICAgbGV0IHBvcHVwQm94ID0gU2lkZWJhci5nZXRQb3B1cCgpO1xuXG4gICAgICAgIGNhdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLFxuICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUucmVsYXRlZFRhcmdldCAhPT0gcG9wdXBCb3gpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBCb3guc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBCb3guc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRhZ0Nsb3VkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLnJlbGF0ZWRUYXJnZXQgIT09IHBvcHVwQm94KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBwb3B1cEJveC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsXG4gICAgICAgICAgICBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoKCFjYXRMaXN0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpICYmXG4gICAgICAgICAgICAgICAgICAgICghdGFnQ2xvdWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKCFwb3B1cEJveC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBwb3B1cEJveC5zdHlsZS50b3AgPSAnLTEwMDBweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogICAgIHNsaWRlci5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XG5cbiAgICBzdGF0aWMgVEhVTUJTID0gJy50aHVtYnMnO1xuICAgIHN0YXRpYyBUSFVNQiA9ICcudGh1bWJzX190aHVtYic7XG4gICAgc3RhdGljIFNMSURFUiA9ICcuc2xpZGVyJztcbiAgICBzdGF0aWMgU0xJREUgPSAnLnNsaWRlcl9fc2xpZGUnO1xuICAgIHN0YXRpYyBBQ1RJVkVfU0xJREUgPSAnc2xpZGVyX19zbGlkZV9hY3RpdmUnO1xuICAgIHN0YXRpYyBMRUZUX0JUTiA9ICcuc2xpZGVyX19idG5ib3hfbGVmdCc7XG4gICAgc3RhdGljIFJJR0hUX0JUTiA9ICcuc2xpZGVyX19idG5ib3hfcmlnaHQnO1xuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICB0aGlzLnNsaWRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlNMSURFKTtcbiAgICAgICAgdGhpcy5zZXRUaW1lcig1MDAwKTtcblxuICAgICAgICBsZXQgYWN0aXZlU2xpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgICAgICBpZiAoYWN0aXZlU2xpZGUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5MRUZUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ByZXZTbGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuUklHSFRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5TTElERVIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVRpbWVyKDIwMDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHRodW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlRIVU1CKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aHVtYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRodW1ic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5USFVNQlMpO1xuICAgICAgICAgICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbltqXSA9PT0gdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZXRUaW1lcihpbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlVGltZXIoaW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lcihpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93UHJldlNsaWRlKCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBY3RpdmVTbGlkZSgpO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KTtcbiAgICB9XG5cbiAgICBzaG93TmV4dFNsaWRlKCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBY3RpdmVTbGlkZSgpO1xuICAgICAgICBpZiAoaW5kZXggPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRJbmRleE9mQWN0aXZlU2xpZGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNsaWRlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoU2xpZGVyLkFDVElWRV9TTElERSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB0b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGgpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2xpZGVMaXN0W2luZGV4XS5jbGFzc0xpc3QuYWRkKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCJcbi8qKlxuICogICAgIGpzbmF1dGljLnNwZWMuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBPY3RvYmVyIDIwMTYsIEFwcmlsIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL2Jsb2Nrcy9uYXZiYXIvbmF2YmFyJztcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi4vYmxvY2tzL3NsaWRlci9zbGlkZXInO1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vYmxvY2tzL3NpZGViYXIvc2lkZWJhcic7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyJykpIHtcblxuICAgICAgICBOYXZiYXIuaW5pdCgpO1xuXG4gICAgfVxuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKSkge1xuXG4gICAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyKCk7XG4gICAgICAgIHNsaWRlci5pbml0KCk7XG5cbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKSkge1xuXG4gICAgICAgIFNpZGViYXIuaW5pdCgpO1xuXG4gICAgfVxuXG59KTtcbiIsIlxuLyoqXG4gKiAgICAganNuYXV0aWMuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBBcHJpbCAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MganNOYXV0aWMge1xuXG4gICAgc3RhdGljIGdldEFjdGl2ZUluZGV4KGNsYXNzTmFtZSwgYWN0aXZlQ2xhc3NOYW1lKSB7XG4gICAgICAgIGxldCBub2RlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhhY3RpdmVDbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b2dnbGVDbGFzc0J5SW5kZXgodGFyZ2V0Q2xhc3MsIHNldENsYXNzTmFtZSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0YXJnZXRDbGFzcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChub2RlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoc2V0Q2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoc2V0Q2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKGluZGV4ID49IDApICYmIChpbmRleCA8IG5vZGVMaXN0Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGFyZ2V0Q2xhc3MpW2luZGV4XS5jbGFzc0xpc3QuYWRkKHNldENsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgeWlpQWpheFJlcXVlc3QodXJsLCBib2R5KSB7XG5cbiAgICAgICAgbGV0IGNzcmZQYXJhbU1ldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY3NyZi1wYXJhbScpWzBdO1xuICAgICAgICBsZXQgY3NyZlRva2VuTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXRva2VuJylbMF07XG4gICAgICAgIGxldCBjc3JmUGFyYW0gPSBjc3JmUGFyYW1NZXRhXG4gICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXBhcmFtJylbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JylcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IGNzcmZUb2tlbiA9IGNzcmZUb2tlbk1ldGFcbiAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtdG9rZW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBsZXQgdG9rZW4gPSBjc3JmUGFyYW0gKyAnPScgKyBjc3JmVG9rZW47XG5cbiAgICAgICAgbGV0IHJlcXVlc3QgPSB7fTtcbiAgICAgICAgcmVxdWVzdC5tZXRob2QgPSAncG9zdCc7XG4gICAgICAgIHJlcXVlc3QuaGVhZGVycyA9IHtcbiAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04J1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0LmNyZWRlbnRpYWxzID0gJ2luY2x1ZGUnO1xuICAgICAgICByZXF1ZXN0LmJvZHkgPSBib2R5ICsgJyYnICsgdG9rZW47XG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHJlcXVlc3QpXG4gICAgICAgICAgICAudGhlbihqc05hdXRpYy5zdGF0dXMpXG4gICAgICAgICAgICAudGhlbihqc05hdXRpYy5qc29uKTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBzdGF0dXMocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMganNvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH1cblxufVxuIl19
