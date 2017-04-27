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
                        var left = item.offsetLeft + 20,
                            top = item.offsetTop + item.offsetHeight;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL25hdmJhci9uYXZiYXIuanMiLCJkZXYvYmxvY2tzL3NpZGViYXIvc2lkZWJhci5qcyIsImRldi9ibG9ja3Mvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pzbmF1dGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0NBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsrQkFFSDtBQUNWLGdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQSwwQkFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxPQUFPLFdBQS9DLEVBQTRELEtBQTVEO0FBQ0g7OztzQ0FFb0I7QUFDakIsZ0JBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUFBLGdCQUNJLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBRFg7QUFFQSxnQkFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixnQkFBbEI7QUFDQSxpQkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixlQUF0QjtBQUNBLHVCQUFXLFlBQU07QUFDYixvQkFBSSxTQUFKLENBQWMsTUFBZCxDQUFxQixnQkFBckI7QUFDSCxhQUZELEVBRUcsR0FGSDtBQUdIOzs7Ozs7a0JBZmdCLE07Ozs7Ozs7Ozs7QUNOckI7Ozs7OztBQU1BOzs7Ozs7OztJQUVxQixPOzs7Ozs7OytCQUVIO0FBQ1Ysb0JBQVEsWUFBUjtBQUNBLG9CQUFRLHdCQUFSO0FBQ0Esb0JBQVEsdUJBQVI7QUFDQSxvQkFBUSwwQkFBUjtBQUNIOzs7bUNBRWlCO0FBQ2QsbUJBQU8sU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQVA7QUFDSDs7O3VDQUVxQjtBQUNsQixnQkFBSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixJQUF2QixDQUFaO0FBQ0EsZ0JBQUksV0FBVyxTQUFTLGFBQVQsQ0FB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QUksU0FBUyxNQUFULElBQW1CLEdBQW5CLElBQTBCLFNBQVMsTUFBVCxHQUFrQixHQUFoRCxFQUFxRDtBQUNqRCx1QkFBTyxRQUFRLE9BQVIsQ0FBZ0IsUUFBaEIsQ0FBUDtBQUNIO0FBQ0QsbUJBQU8sUUFBUSxNQUFSLENBQWUsSUFBSSxLQUFKLENBQVUsU0FBUyxVQUFuQixDQUFmLENBQVA7QUFDSDs7OzZCQUVXLFEsRUFBVTtBQUNsQixtQkFBTyxTQUFTLElBQVQsRUFBUDtBQUNIOzs7Ozs7a0JBMURnQixRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLyoqXG4gKiAgICAganNuYXV0aWMuc3BlYy5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmJhciB7XG5cbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgbGV0IG5hdmJhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1idG4nKTtcbiAgICAgICAgbmF2YmFyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIE5hdmJhci5zZXREcm9wZG93biwgZmFsc2UpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXREcm9wZG93bigpIHtcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpLFxuICAgICAgICAgICAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdtZW51LWJ0bi1ibGluaycpO1xuICAgICAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtZHJhcGRvd24nKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1idG4tYmxpbmsnKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG5cbn1cbiIsIlxuLyoqXG4gKiAgICAgc2lkZWJhci5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmltcG9ydCBqc05hdXRpYyBmcm9tICcuLi8uLi9saWIvanNuYXV0aWMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWRlYmFyIHtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBTaWRlYmFyLmNyZWF0ZUJveERpdigpO1xuICAgICAgICBTaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXJUb0JveERpdigpO1xuICAgICAgICBTaWRlYmFyLmFkZEV2ZW50TGlzdGVuZXJUb0xpbmtzKCk7XG4gICAgICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvTGlua0xpc3QoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UG9wdXAoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUJveERpdigpIHtcbiAgICAgICAgbGV0IGxpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBsaW5rcy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BvcHVwLWxpbmtzJyk7XG4gICAgICAgIGxpbmtzLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWJveF9fbGlua3MnKTtcbiAgICAgICAgdHJpYW5nbGUuY2xhc3NMaXN0LmFkZCgncG9wdXAtYm94X190cmlhbmdsZScpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdpZCcsICdwb3B1cC1ib3gnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWJveCcpO1xuICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZGl2LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcblxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodHJpYW5nbGUpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobGlua3MpO1xuXG4gICAgICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgICAgICAgY2F0TGlzdC5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRQb3B1cERhdGEoZGF0YSkge1xuICAgICAgICBsZXQgcG9wdXBCb3ggPSBTaWRlYmFyLmdldFBvcHVwKCk7XG4gICAgICAgIGlmIChwb3B1cEJveCkge1xuICAgICAgICAgICAgbGV0IGxpbmtMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwLWxpbmtzJyk7XG4gICAgICAgICAgICBsZXQgdGFnU3RyaW5nID0gJzxzcGFuPicgKyBkYXRhLm5hbWUgKyAnPC9zcGFuPic7XG4gICAgICAgICAgICBkYXRhLmxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgICAgICAgICAgICB0YWdTdHJpbmcgKz0gJzxsaT4nICsgbGluayArICc8L2xpPic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpbmtMaXN0LmlubmVySFRNTCA9IHRhZ1N0cmluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzZXRQb3B1cFBvc2l0aW9uKGxlZnQsIHRvcCkge1xuICAgICAgICBsZXQgcG9wdXBCb3ggPSBTaWRlYmFyLmdldFBvcHVwKCk7XG4gICAgICAgIGlmIChwb3B1cEJveCkge1xuICAgICAgICAgICAgcG9wdXBCb3guc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBoYW5kbGVMaXN0TW91c2VPdmVyKCkge1xuICAgICAgICBsZXQgcG9wdXBCb3ggPSBTaWRlYmFyLmdldFBvcHVwKCk7XG4gICAgICAgIGlmICghcG9wdXBCb3gpIHtcbiAgICAgICAgICAgIHBvcHVwQm94ID0gU2lkZWJhci5nZXRQb3B1cCgpO1xuICAgICAgICB9XG4gICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyVG9Cb3hEaXYoKSB7XG5cbiAgICAgICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0LWxpc3QnKTtcbiAgICAgICAgbGV0IHRhZ0Nsb3VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZy1jbG91ZCcpO1xuICAgICAgICBsZXQgcG9wdXBCb3ggPSBTaWRlYmFyLmdldFBvcHVwKCk7XG5cbiAgICAgICAgY2F0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsXG4gICAgICAgICAgICBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS5yZWxhdGVkVGFyZ2V0ICE9PSBwb3B1cEJveCkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBwb3B1cEJveC5zdHlsZS50b3AgPSAnLTEwMDBweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGFnQ2xvdWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLFxuICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUucmVsYXRlZFRhcmdldCAhPT0gcG9wdXBCb3gpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBCb3guc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBCb3guc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHBvcHVwQm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgoIWNhdExpc3QuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKCF0YWdDbG91ZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAoIXBvcHVwQm94LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lclRvTGlua3MoKSB7XG5cbiAgICAgICAgbGV0IGNhdHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgICAgICAgIC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNjYXQtbGlzdCAubGluay1saXN0X19pdGVtJykpO1xuICAgICAgICBsZXQgdGFncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3RhZy1jbG91ZCAubGluay1saXN0X19pdGVtJykpO1xuXG4gICAgICAgIGNhdHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLFxuICAgICAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAganNOYXV0aWMueWlpQWpheFJlcXVlc3QoJy9hamF4L2NhdCcsICdpZD0nICsgaXRlbS5kYXRhc2V0LmlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gZS5wYWdlWCArIDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gaXRlbS5vZmZzZXRUb3AgKyAxNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cFBvc2l0aW9uKGxlZnQsIHRvcCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICB0YWdzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBqc05hdXRpYy55aWlBamF4UmVxdWVzdCgnL2FqYXgvdGFnJywgJ2lkPScgKyBpdGVtLmRhdGFzZXQuaWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBpdGVtLm9mZnNldExlZnQgKyAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgPSBpdGVtLm9mZnNldFRvcCArIGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgU2lkZWJhci5zZXRQb3B1cERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwUG9zaXRpb24obGVmdCwgdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJUb0xpbmtMaXN0KCkge1xuXG4gICAgICAgIGxldCBjYXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1saXN0Jyk7XG4gICAgICAgIGxldCB0YWdMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZy1jbG91ZCcpO1xuXG4gICAgICAgIGNhdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgU2lkZWJhci5oYW5kbGVMaXN0TW91c2VPdmVyKTtcbiAgICAgICAgdGFnTGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBTaWRlYmFyLmhhbmRsZUxpc3RNb3VzZU92ZXIpO1xuICAgIH1cblxufVxuIiwiXG4vKipcbiAqICAgICBzbGlkZXIuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBDcmVhdGVkIGJ5IEFuZHJpaSBTb3Jva2luIG9uIDQvMjMvMTdcbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xuXG4gICAgc3RhdGljIFRIVU1CUyA9ICcudGh1bWJzJztcbiAgICBzdGF0aWMgVEhVTUIgPSAnLnRodW1ic19fdGh1bWInO1xuICAgIHN0YXRpYyBTTElERVIgPSAnLnNsaWRlcic7XG4gICAgc3RhdGljIFNMSURFID0gJy5zbGlkZXJfX3NsaWRlJztcbiAgICBzdGF0aWMgQUNUSVZFX1NMSURFID0gJ3NsaWRlcl9fc2xpZGVfYWN0aXZlJztcbiAgICBzdGF0aWMgTEVGVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X2xlZnQnO1xuICAgIHN0YXRpYyBSSUdIVF9CVE4gPSAnLnNsaWRlcl9fYnRuYm94X3JpZ2h0JztcblxuICAgIGluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5zbGlkZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5TTElERSk7XG4gICAgICAgIHRoaXMuc2V0VGltZXIoNTAwMCk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZVNsaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgICAgaWYgKGFjdGl2ZVNsaWRlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuTEVGVF9CVE4pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQcmV2U2xpZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2xpZGVyLlJJR0hUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuU0xJREVSKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVUaW1lcigyMDAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCB0aHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNsaWRlci5USFVNQik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGh1bWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aHVtYnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuVEhVTUJTKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW5bal0gPT09IHRhcmdldC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2V0VGltZXIoaW50ZXJ2YWwpIHtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd05leHRTbGlkZSgpO1xuICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVRpbWVyKGludGVydmFsKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1ByZXZTbGlkZSgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gICAgfVxuXG4gICAgc2hvd05leHRTbGlkZSgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mQWN0aXZlU2xpZGUoKTtcbiAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChpbmRleCk7XG4gICAgfVxuXG4gICAgZ2V0SW5kZXhPZkFjdGl2ZVNsaWRlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFNsaWRlci5BQ1RJVkVfU0xJREUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KSB7XG4gICAgICAgIGlmICgoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoU2xpZGVyLkFDVElWRV9TTElERSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsaWRlTGlzdFtpbmRleF0uY2xhc3NMaXN0LmFkZChTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5zcGVjLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgT2N0b2JlciAyMDE2LCBBcHJpbCAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IE5hdmJhciBmcm9tICcuLi9ibG9ja3MvbmF2YmFyL25hdmJhcic7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4uL2Jsb2Nrcy9zbGlkZXIvc2xpZGVyJztcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4uL2Jsb2Nrcy9zaWRlYmFyL3NpZGViYXInO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpKSB7XG5cbiAgICAgICAgTmF2YmFyLmluaXQoKTtcblxuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJykpIHtcblxuICAgICAgICBsZXQgc2xpZGVyID0gbmV3IFNsaWRlcigpO1xuICAgICAgICBzbGlkZXIuaW5pdCgpO1xuXG4gICAgfVxuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJykpIHtcblxuICAgICAgICBTaWRlYmFyLmluaXQoKTtcblxuICAgIH1cblxufSk7XG4iLCJcbi8qKlxuICogICAgIGpzbmF1dGljLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQXByaWwgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpzTmF1dGljIHtcblxuICAgIHN0YXRpYyBnZXRBY3RpdmVJbmRleChjbGFzc05hbWUsIGFjdGl2ZUNsYXNzTmFtZSkge1xuICAgICAgICBsZXQgbm9kZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChub2RlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoYWN0aXZlQ2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9nZ2xlQ2xhc3NCeUluZGV4KHRhcmdldENsYXNzLCBzZXRDbGFzc05hbWUsIGluZGV4KSB7XG4gICAgICAgIGxldCBub2RlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGFyZ2V0Q2xhc3MpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobm9kZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKHNldENsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKHNldENsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCBub2RlTGlzdC5sZW5ndGgpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRhcmdldENsYXNzKVtpbmRleF0uY2xhc3NMaXN0LmFkZChzZXRDbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHlpaUFqYXhSZXF1ZXN0KHVybCwgYm9keSkge1xuXG4gICAgICAgIGxldCBjc3JmUGFyYW1NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtcGFyYW0nKVswXTtcbiAgICAgICAgbGV0IGNzcmZUb2tlbk1ldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY3NyZi10b2tlbicpWzBdO1xuICAgICAgICBsZXQgY3NyZlBhcmFtID0gY3NyZlBhcmFtTWV0YVxuICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY3NyZi1wYXJhbScpWzBdLmdldEF0dHJpYnV0ZSgnY29udGVudCcpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGxldCBjc3JmVG9rZW4gPSBjc3JmVG9rZW5NZXRhXG4gICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXRva2VuJylbMF0uZ2V0QXR0cmlidXRlKCdjb250ZW50JylcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IHRva2VuID0gY3NyZlBhcmFtICsgJz0nICsgY3NyZlRva2VuO1xuXG4gICAgICAgIGxldCByZXF1ZXN0ID0ge307XG4gICAgICAgIHJlcXVlc3QubWV0aG9kID0gJ3Bvc3QnO1xuICAgICAgICByZXF1ZXN0LmhlYWRlcnMgPSB7XG4gICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5jcmVkZW50aWFscyA9ICdpbmNsdWRlJztcbiAgICAgICAgcmVxdWVzdC5ib2R5ID0gYm9keSArICcmJyArIHRva2VuO1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCByZXF1ZXN0KVxuICAgICAgICAgICAgLnRoZW4oanNOYXV0aWMuc3RhdHVzKVxuICAgICAgICAgICAgLnRoZW4oanNOYXV0aWMuanNvbik7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgc3RhdHVzKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGpzb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG5cbn1cbiJdfQ==
