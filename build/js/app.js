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
                        Sidebar.setPopupData(data, e.pageX, e.pageY);
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
                item.addEventListener('mouseover', function (e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL25hdmJhci9uYXZiYXIuanMiLCJkZXYvYmxvY2tzL3NpZGViYXIvc2lkZWJhci5qcyIsImRldi9ibG9ja3Mvc2xpZGVyL3NsaWRlci5qcyIsImRldi9pbmRleC9hcHAuanMiLCJkZXYvbGliL2pzbmF1dGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0NBOzs7Ozs7SUFNcUIsTTs7Ozs7OzsrQkFFSDtBQUNWLGdCQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBcEI7QUFDQSwwQkFBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxPQUFPLFdBQS9DLEVBQTRELEtBQTVEO0FBQ0g7OztzQ0FFb0I7QUFDakIsZ0JBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBVjtBQUFBLGdCQUNJLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBRFg7QUFFQSxnQkFBSSxTQUFKLENBQWMsR0FBZCxDQUFrQixnQkFBbEI7QUFDQSxpQkFBSyxTQUFMLENBQWUsTUFBZixDQUFzQixlQUF0QjtBQUNBLHVCQUFXLFlBQU07QUFDYixvQkFBSSxTQUFKLENBQWMsTUFBZCxDQUFxQixnQkFBckI7QUFDSCxhQUZELEVBRUcsR0FGSDtBQUdIOzs7Ozs7a0JBZmdCLE07Ozs7Ozs7Ozs7QUNOckI7Ozs7OztBQU1BOzs7Ozs7OztJQUVxQixPOzs7Ozs7OytCQUVWOztBQUVILGdCQUFJLE9BQU8sTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQ04sSUFETSxDQUNELFNBQVMsZ0JBQVQsQ0FBMEIsNEJBQTFCLENBREMsQ0FBWDs7QUFHQSxpQkFBSyxPQUFMLENBQWEsVUFBQyxJQUFELEVBQVU7QUFDbkIsb0JBQUksa0JBQWtCLE1BQXRCLEVBQThCO0FBQzFCLHlCQUFLLGdCQUFMLENBQXNCLE9BQXRCLEVBQ0ksYUFBSztBQUNELDBCQUFFLGNBQUY7QUFDSCxxQkFITCxFQUlJLEtBSko7QUFNSDtBQUNELHFCQUFLLGdCQUFMLENBQXNCLFdBQXRCLEVBQ0ksYUFBSztBQUNELHVDQUFTLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUMsUUFBUSxLQUFLLE9BQUwsQ0FBYSxFQUExRCxFQUNDLElBREQsQ0FDTSxnQkFBUTtBQUNWLGdDQUFRLFlBQVIsQ0FBcUIsSUFBckIsRUFBMkIsRUFBRSxLQUE3QixFQUFvQyxFQUFFLEtBQXRDO0FBQ0gscUJBSEQ7QUFJSCxpQkFOTCxFQU9JLEtBUEo7QUFTSCxhQWxCRDs7QUFvQkEsZ0JBQUksT0FBTyxNQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FDTixJQURNLENBQ0QsU0FBUyxnQkFBVCxDQUEwQiw2QkFBMUIsQ0FEQyxDQUFYOztBQUdBLGlCQUFLLE9BQUwsQ0FBYSxVQUFDLElBQUQsRUFBVTtBQUNuQixvQkFBSSxrQkFBa0IsTUFBdEIsRUFBOEI7QUFDMUIseUJBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFDSSxhQUFLO0FBQ0QsMEJBQUUsY0FBRjtBQUNILHFCQUhMLEVBSUksS0FKSjtBQU1IO0FBQ0QscUJBQUssZ0JBQUwsQ0FBc0IsV0FBdEIsRUFDSSxhQUFLO0FBQ0QsdUNBQVMsY0FBVCxDQUF3QixXQUF4QixFQUFxQyxRQUFRLEtBQUssT0FBTCxDQUFhLEVBQTFELEVBQ0MsSUFERCxDQUNNLGdCQUFRO0FBQ1YsZ0NBQVEsWUFBUixDQUFxQixJQUFyQixFQUEyQixFQUFFLEtBQTdCLEVBQW9DLEVBQUUsS0FBdEM7QUFDSCxxQkFIRDtBQUlILGlCQU5MLEVBT0ksS0FQSjtBQVNILGFBbEJEOztBQW9CQSxnQkFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixXQUF2QixDQUFkO0FBQ0EsZ0JBQUksVUFBVSxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBZDs7QUFFQSxvQkFBUSxnQkFBUixDQUF5QixXQUF6QixFQUFzQyxRQUFRLG1CQUE5QztBQUNBLG9CQUFRLGdCQUFSLENBQXlCLFdBQXpCLEVBQXNDLFFBQVEsbUJBQTlDO0FBRUg7OztxQ0FFbUIsSSxFQUFNLEksRUFBTSxHLEVBQUs7QUFDakMsZ0JBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBYjtBQUNBLGdCQUFJLE1BQUosRUFBWTtBQUNSLHVCQUFPLEtBQVAsQ0FBYSxHQUFiLEdBQW1CLE1BQU0sSUFBekI7QUFDQSx1QkFBTyxLQUFQLENBQWEsSUFBYixHQUFvQixPQUFPLENBQVAsR0FBVyxJQUEvQjtBQUNBLG9CQUFJLFdBQVcsU0FBUyxhQUFULENBQXVCLGNBQXZCLENBQWY7QUFDQSxvQkFBSSxZQUFZLFdBQVcsS0FBSyxJQUFoQixHQUF1QixTQUF2QztBQUNBLHFCQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLFVBQUMsSUFBRCxFQUFVO0FBQ3pCLGlDQUFhLFNBQVMsSUFBVCxHQUFnQixPQUE3QjtBQUNILGlCQUZEO0FBR0EseUJBQVMsU0FBVCxHQUFxQixTQUFyQjtBQUNIO0FBQ0o7Ozs4Q0FFNEI7QUFDekIsZ0JBQUksV0FBVyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBZjtBQUNBLGdCQUFJLENBQUMsUUFBTCxFQUFlO0FBQ1gsd0JBQVEsWUFBUjtBQUNBLHdCQUFRLHdCQUFSO0FBQ0EsMkJBQVcsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQVg7QUFDSDtBQUNELHFCQUFTLEtBQVQsQ0FBZSxPQUFmLEdBQXlCLE9BQXpCO0FBQ0g7Ozt1Q0FFcUI7QUFDbEIsZ0JBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWjtBQUNBLGdCQUFJLFdBQVcsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWY7QUFDQSxnQkFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0Esa0JBQU0sWUFBTixDQUFtQixJQUFuQixFQUF5QixhQUF6QjtBQUNBLGtCQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0Isa0JBQXBCO0FBQ0EscUJBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixxQkFBdkI7QUFDQSxnQkFBSSxZQUFKLENBQWlCLElBQWpCLEVBQXVCLFdBQXZCO0FBQ0EsZ0JBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsV0FBbEI7QUFDQSxnQkFBSSxLQUFKLENBQVUsT0FBVixHQUFvQixNQUFwQjtBQUNBLGdCQUFJLEtBQUosQ0FBVSxHQUFWLEdBQWdCLFNBQWhCO0FBQ0EsZ0JBQUksV0FBSixDQUFnQixRQUFoQjtBQUNBLGdCQUFJLFdBQUosQ0FBZ0IsS0FBaEI7QUFDQSxnQkFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixVQUF2QixDQUFkO0FBQ0Esb0JBQVEsV0FBUixDQUFvQixHQUFwQjtBQUNIOzs7bURBRWlDOztBQUU5QixnQkFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixXQUF2QixDQUFkO0FBQ0EsZ0JBQUksV0FBVyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBZjtBQUNBLGdCQUFJLFdBQVcsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQWY7O0FBRUEsb0JBQVEsZ0JBQVIsQ0FBeUIsVUFBekIsRUFDSSxhQUFLO0FBQ0Qsb0JBQUksRUFBRSxhQUFGLEtBQW9CLFFBQXhCLEVBQWtDO0FBQzlCLDZCQUFTLEtBQVQsQ0FBZSxPQUFmLEdBQXlCLE1BQXpCO0FBQ0g7QUFDSixhQUxMOztBQU9BLHFCQUFTLGdCQUFULENBQTBCLFVBQTFCLEVBQ0ksYUFBSztBQUNELG9CQUFJLEVBQUUsYUFBRixLQUFvQixRQUF4QixFQUFrQztBQUM5Qiw2QkFBUyxLQUFULENBQWUsT0FBZixHQUF5QixNQUF6QjtBQUNIO0FBQ0osYUFMTDs7QUFPQSxxQkFBUyxnQkFBVCxDQUEwQixVQUExQixFQUNJLGFBQUs7QUFDRCxvQkFBSyxFQUFFLGFBQUYsS0FBb0IsT0FBckIsSUFDQyxFQUFFLGFBQUYsS0FBb0IsUUFEckIsSUFFQyxDQUFDLFNBQVMsUUFBVCxDQUFrQixFQUFFLGFBQXBCLENBRk4sRUFFMkM7QUFDdkMsK0JBQVcsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQVg7QUFDQSw2QkFBUyxLQUFULENBQWUsT0FBZixHQUF5QixNQUF6QjtBQUNIO0FBQ0osYUFSTDtBQVNIOzs7Ozs7a0JBaElnQixPOzs7Ozs7Ozs7Ozs7O0FDUnJCOzs7Ozs7SUFNcUIsTTs7Ozs7OzsrQkFVVjtBQUFBOztBQUVILGlCQUFLLFNBQUwsR0FBaUIsU0FBUyxnQkFBVCxDQUEwQixPQUFPLEtBQWpDLENBQWpCO0FBQ0EsaUJBQUssUUFBTCxDQUFjLElBQWQ7O0FBRUEsZ0JBQUksY0FBYyxTQUFTLHNCQUFULENBQWdDLE9BQU8sWUFBdkMsQ0FBbEI7QUFDQSxnQkFBSSxZQUFZLE1BQVosR0FBcUIsQ0FBekIsRUFBNEI7QUFDeEIscUJBQUssd0JBQUwsQ0FBOEIsQ0FBOUI7QUFDSDs7QUFFRCxxQkFBUyxhQUFULENBQXVCLE9BQU8sUUFBOUIsRUFBd0MsZ0JBQXhDLENBQXlELE9BQXpELEVBQ0ksVUFBQyxDQUFELEVBQU87QUFDSCxzQkFBSyxVQUFMO0FBQ0Esa0JBQUUsZUFBRjtBQUNBLHNCQUFLLGFBQUw7QUFDSCxhQUxMLEVBTUksS0FOSjs7QUFTQSxxQkFBUyxhQUFULENBQXVCLE9BQU8sU0FBOUIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQ0ksVUFBQyxDQUFELEVBQU87QUFDSCxzQkFBSyxVQUFMO0FBQ0Esa0JBQUUsZUFBRjtBQUNBLHNCQUFLLGFBQUw7QUFDSCxhQUxMLEVBTUksS0FOSjs7QUFTQSxxQkFBUyxhQUFULENBQXVCLE9BQU8sTUFBOUIsRUFBc0MsZ0JBQXRDLENBQXVELE9BQXZELEVBQ0ksWUFBTTtBQUNGLHNCQUFLLFdBQUwsQ0FBaUIsSUFBakI7QUFDSCxhQUhMLEVBSUksS0FKSjs7QUFPQSxnQkFBSSxTQUFTLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBTyxLQUFqQyxDQUFiO0FBQ0EsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLHVCQUFPLENBQVAsRUFBVSxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxZQUFNOztBQUV0Qyx3QkFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixPQUFPLE1BQTlCLENBQWI7QUFDQSwyQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxpQkFBUztBQUN0Qyw0QkFBSSxTQUFTLE1BQU0sTUFBTixJQUFnQixNQUFNLFVBQW5DO0FBQ0EsNkJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLFFBQVAsQ0FBZ0IsTUFBcEMsRUFBNEMsR0FBNUMsRUFBaUQ7QUFDN0MsZ0NBQUksT0FBTyxRQUFQLENBQWdCLENBQWhCLE1BQXVCLE9BQU8sVUFBbEMsRUFBOEM7QUFDMUMsc0NBQUssd0JBQUwsQ0FBOEIsQ0FBOUI7QUFDSDtBQUNKO0FBQ0oscUJBUEQsRUFPRyxLQVBIO0FBU0gsaUJBWkQsRUFZRyxLQVpIO0FBYUg7QUFFSjs7O2lDQUVRLFEsRUFBVTtBQUFBOztBQUNmLGlCQUFLLEtBQUwsR0FBYSxZQUFZLFlBQU07QUFDM0IsdUJBQUssYUFBTDtBQUNILGFBRlksRUFFVixRQUZVLENBQWI7QUFHSDs7O3FDQUVZO0FBQ1QsZ0JBQUksS0FBSyxLQUFMLEtBQWUsSUFBbkIsRUFBeUI7QUFDckIsOEJBQWMsS0FBSyxLQUFuQjtBQUNBLHFCQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0g7QUFDSjs7O29DQUVXLFEsRUFBVTtBQUNsQixnQkFBSSxLQUFLLEtBQUwsS0FBZSxJQUFuQixFQUF5QjtBQUNyQixxQkFBSyxVQUFMO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUssUUFBTCxDQUFjLFFBQWQ7QUFDSDtBQUNKOzs7d0NBRWU7QUFDWixnQkFBSSxRQUFRLEtBQUsscUJBQUwsRUFBWjtBQUNBLGdCQUFJLFFBQVEsQ0FBWixFQUFlO0FBQ1g7QUFDSCxhQUZELE1BRU87QUFDSCx3QkFBUSxLQUFLLFNBQUwsQ0FBZSxNQUFmLEdBQXdCLENBQWhDO0FBQ0g7QUFDRCxpQkFBSyx3QkFBTCxDQUE4QixLQUE5QjtBQUNIOzs7d0NBRWU7QUFDWixnQkFBSSxRQUFRLEtBQUsscUJBQUwsRUFBWjtBQUNBLGdCQUFJLFFBQVEsS0FBSyxTQUFMLENBQWUsTUFBZixHQUF3QixDQUFwQyxFQUF1QztBQUNuQztBQUNILGFBRkQsTUFFTztBQUNILHdCQUFRLENBQVI7QUFDSDtBQUNELGlCQUFLLHdCQUFMLENBQThCLEtBQTlCO0FBQ0g7OztnREFFdUI7QUFDcEIsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLFNBQUwsQ0FBZSxNQUFuQyxFQUEyQyxHQUEzQyxFQUFnRDtBQUM1QyxvQkFBSSxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLFNBQWxCLENBQTRCLFFBQTVCLENBQXFDLE9BQU8sWUFBNUMsQ0FBSixFQUErRDtBQUMzRCwyQkFBTyxDQUFQO0FBQ0g7QUFDSjtBQUNELG1CQUFPLENBQVA7QUFDSDs7O2lEQUV3QixLLEVBQU87QUFDNUIsZ0JBQUssU0FBUyxDQUFWLElBQWlCLFFBQVEsS0FBSyxTQUFMLENBQWUsTUFBNUMsRUFBcUQ7QUFDakQscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLFNBQUwsQ0FBZSxNQUFuQyxFQUEyQyxHQUEzQyxFQUFnRDtBQUM1Qyx5QkFBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixTQUFsQixDQUE0QixNQUE1QixDQUFtQyxPQUFPLFlBQTFDO0FBQ0g7QUFDRCxxQkFBSyxTQUFMLENBQWUsS0FBZixFQUFzQixTQUF0QixDQUFnQyxHQUFoQyxDQUFvQyxPQUFPLFlBQTNDO0FBQ0g7QUFDSjs7Ozs7O0FBekhnQixNLENBRVYsTSxHQUFTLFM7QUFGQyxNLENBR1YsSyxHQUFRLGdCO0FBSEUsTSxDQUlWLE0sR0FBUyxTO0FBSkMsTSxDQUtWLEssR0FBUSxnQjtBQUxFLE0sQ0FNVixZLEdBQWUsc0I7QUFOTCxNLENBT1YsUSxHQUFXLHNCO0FBUEQsTSxDQVFWLFMsR0FBWSx1QjtrQkFSRixNOzs7OztBQ0FyQjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXJELFFBQUksU0FBUyxhQUFULENBQXVCLFNBQXZCLENBQUosRUFBdUM7O0FBRW5DLHlCQUFPLElBQVA7QUFFSDs7QUFFRCxRQUFJLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFKLEVBQXVDOztBQUVuQyxZQUFJLFNBQVMsc0JBQWI7QUFDQSxlQUFPLElBQVA7QUFFSDs7QUFFRCxRQUFJLFNBQVMsYUFBVCxDQUF1QixVQUF2QixDQUFKLEVBQXdDOztBQUVwQyxZQUFJLFVBQVUsdUJBQWQ7QUFDQSxnQkFBUSxJQUFSO0FBRUg7QUFFSixDQXRCRDtBQVZBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7SUFNcUIsUTs7Ozs7Ozt1Q0FFSyxTLEVBQVcsZSxFQUFpQjtBQUM5QyxnQkFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBZjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN0QyxvQkFBSSxTQUFTLENBQVQsRUFBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLGVBQS9CLENBQUosRUFBcUQ7QUFDakQsMkJBQU8sQ0FBUDtBQUNIO0FBQ0o7QUFDRCxtQkFBTyxDQUFDLENBQVI7QUFDSDs7OzJDQUV5QixXLEVBQWEsWSxFQUFjLEssRUFBTztBQUN4RCxnQkFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsQ0FBZjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN0QyxvQkFBSSxTQUFTLENBQVQsRUFBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLFlBQS9CLENBQUosRUFBa0Q7QUFDOUMsNkJBQVMsQ0FBVCxFQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsWUFBN0I7QUFDSDtBQUNKO0FBQ0QsZ0JBQUssU0FBUyxDQUFWLElBQWlCLFFBQVEsU0FBUyxNQUF0QyxFQUErQztBQUMzQyx5QkFBUyxzQkFBVCxDQUFnQyxXQUFoQyxFQUE2QyxLQUE3QyxFQUFvRCxTQUFwRCxDQUE4RCxHQUE5RCxDQUFrRSxZQUFsRTtBQUNIO0FBQ0o7Ozt1Q0FFcUIsRyxFQUFLLEksRUFBTTs7QUFFN0IsZ0JBQUksZ0JBQWdCLFNBQVMsaUJBQVQsQ0FBMkIsWUFBM0IsRUFBeUMsQ0FBekMsQ0FBcEI7QUFDQSxnQkFBSSxnQkFBZ0IsU0FBUyxpQkFBVCxDQUEyQixZQUEzQixFQUF5QyxDQUF6QyxDQUFwQjtBQUNBLGdCQUFJLFlBQVksZ0JBQ1YsU0FBUyxpQkFBVCxDQUEyQixZQUEzQixFQUF5QyxDQUF6QyxFQUE0QyxZQUE1QyxDQUF5RCxTQUF6RCxDQURVLEdBRVYsSUFGTjtBQUdBLGdCQUFJLFlBQVksZ0JBQ1YsU0FBUyxpQkFBVCxDQUEyQixZQUEzQixFQUF5QyxDQUF6QyxFQUE0QyxZQUE1QyxDQUF5RCxTQUF6RCxDQURVLEdBRVYsSUFGTjtBQUdBLGdCQUFJLFFBQVEsWUFBWSxHQUFaLEdBQWtCLFNBQTlCOztBQUVBLGdCQUFJLFVBQVUsRUFBZDtBQUNBLG9CQUFRLE1BQVIsR0FBaUIsTUFBakI7QUFDQSxvQkFBUSxPQUFSLEdBQWtCO0FBQ2QsZ0NBQWdCO0FBREYsYUFBbEI7QUFHQSxvQkFBUSxXQUFSLEdBQXNCLFNBQXRCO0FBQ0Esb0JBQVEsSUFBUixHQUFlLE9BQU8sR0FBUCxHQUFhLEtBQTVCO0FBQ0EsbUJBQU8sTUFBTSxHQUFOLEVBQVcsT0FBWCxFQUNGLElBREUsQ0FDRyxTQUFTLE1BRFosRUFFRixJQUZFLENBRUcsU0FBUyxJQUZaLENBQVA7QUFJSDs7OytCQUVhLFEsRUFBVTtBQUNwQixnQkFBSSxTQUFTLE1BQVQsSUFBbUIsR0FBbkIsSUFBMEIsU0FBUyxNQUFULEdBQWtCLEdBQWhELEVBQXFEO0FBQ2pELHVCQUFPLFFBQVEsT0FBUixDQUFnQixRQUFoQixDQUFQO0FBQ0g7QUFDRCxtQkFBTyxRQUFRLE1BQVIsQ0FBZSxJQUFJLEtBQUosQ0FBVSxTQUFTLFVBQW5CLENBQWYsQ0FBUDtBQUNIOzs7NkJBRVcsUSxFQUFVO0FBQ2xCLG1CQUFPLFNBQVMsSUFBVCxFQUFQO0FBQ0g7Ozs7OztrQkExRGdCLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5zcGVjLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyIHtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBsZXQgbmF2YmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpO1xuICAgICAgICBuYXZiYXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgTmF2YmFyLnNldERyb3Bkb3duLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldERyb3Bkb3duKCkge1xuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJyksXG4gICAgICAgICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1kcmFwZG93bicpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWJ0bi1ibGluaycpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxufVxuIiwiXG4vKipcbiAqICAgICBzaWRlYmFyLmpzIGZvciBKZXRybyBwcm9qZWN0XG4gKiAgICAgQ3JlYXRlZCBieSBBbmRyaWkgU29yb2tpbiBvbiA0LzIzLzE3XG4gKiAgICAgaHR0cHM6Ly9naXRodWIuY29tL2lnbm9yYW50aWMvamV0cm8uZ2l0XG4gKi9cblxuaW1wb3J0IGpzTmF1dGljIGZyb20gJy4uLy4uL2xpYi9qc25hdXRpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGViYXIge1xuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICBsZXQgY2F0cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgICAgLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NhdC1saXN0IC5saW5rLWxpc3RfX2l0ZW0nKSk7XG5cbiAgICAgICAgY2F0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsXG4gICAgICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGpzTmF1dGljLnlpaUFqYXhSZXF1ZXN0KCcvYWpheC9jYXQnLCAnaWQ9JyArIGl0ZW0uZGF0YXNldC5pZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBTaWRlYmFyLnNldFBvcHVwRGF0YShkYXRhLCBlLnBhZ2VYLCBlLnBhZ2VZKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHRhZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgICAgICAgIC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN0YWctY2xvdWQgLmxpbmstbGlzdF9faXRlbScpKTtcblxuICAgICAgICB0YWdzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJyxcbiAgICAgICAgICAgICAgICBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAganNOYXV0aWMueWlpQWpheFJlcXVlc3QoJy9hamF4L3RhZycsICdpZD0nICsgaXRlbS5kYXRhc2V0LmlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpZGViYXIuc2V0UG9wdXBEYXRhKGRhdGEsIGUucGFnZVgsIGUucGFnZVkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgICAgICBsZXQgdGFnTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWctY2xvdWQnKTtcblxuICAgICAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFNpZGViYXIuaGFuZGxlTGlzdE1vdXNlT3Zlcik7XG4gICAgICAgIHRhZ0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgU2lkZWJhci5oYW5kbGVMaXN0TW91c2VPdmVyKTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBzZXRQb3B1cERhdGEoZGF0YSwgbGVmdCwgdG9wKSB7XG4gICAgICAgIGxldCB0YWdCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG4gICAgICAgIGlmICh0YWdCb3gpIHtcbiAgICAgICAgICAgIHRhZ0JveC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgICAgICAgICAgdGFnQm94LnN0eWxlLmxlZnQgPSBsZWZ0ICsgNSArICdweCc7XG4gICAgICAgICAgICBsZXQgbGlua0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtbGlua3MnKTtcbiAgICAgICAgICAgIGxldCB0YWdTdHJpbmcgPSAnPHNwYW4+JyArIGRhdGEubmFtZSArICc8L3NwYW4+JztcbiAgICAgICAgICAgIGRhdGEubGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgICAgICAgICAgIHRhZ1N0cmluZyArPSAnPGxpPicgKyBsaW5rICsgJzwvbGk+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGlua0xpc3QuaW5uZXJIVE1MID0gdGFnU3RyaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGhhbmRsZUxpc3RNb3VzZU92ZXIoKSB7XG4gICAgICAgIGxldCBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcbiAgICAgICAgaWYgKCFwb3B1cEJveCkge1xuICAgICAgICAgICAgU2lkZWJhci5jcmVhdGVCb3hEaXYoKTtcbiAgICAgICAgICAgIFNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lclRvQm94RGl2KCk7XG4gICAgICAgICAgICBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcbiAgICAgICAgfVxuICAgICAgICBwb3B1cEJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQm94RGl2KCkge1xuICAgICAgICBsZXQgbGlua3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBsZXQgdHJpYW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaW5rcy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3BvcHVwLWxpbmtzJyk7XG4gICAgICAgIGxpbmtzLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWJveF9fbGlua3MnKTtcbiAgICAgICAgdHJpYW5nbGUuY2xhc3NMaXN0LmFkZCgncG9wdXAtYm94X190cmlhbmdsZScpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdpZCcsICdwb3B1cC1ib3gnKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWJveCcpO1xuICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZGl2LnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRyaWFuZ2xlKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGxpbmtzKTtcbiAgICAgICAgbGV0IGNhdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgICAgICBjYXRMaXN0LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJUb0JveERpdigpIHtcblxuICAgICAgICBsZXQgY2F0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtbGlzdCcpO1xuICAgICAgICBsZXQgdGFnQ2xvdWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFnLWNsb3VkJyk7XG4gICAgICAgIGxldCBwb3B1cEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cC1ib3gnKTtcblxuICAgICAgICBjYXRMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JyxcbiAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLnJlbGF0ZWRUYXJnZXQgIT09IHBvcHVwQm94KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGFnQ2xvdWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLFxuICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUucmVsYXRlZFRhcmdldCAhPT0gcG9wdXBCb3gpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBCb3guc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBwb3B1cEJveC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsXG4gICAgICAgICAgICBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoKGUucmVsYXRlZFRhcmdldCAhPT0gY2F0TGlzdCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKGUucmVsYXRlZFRhcmdldCAhPT0gdGFnQ2xvdWQpICYmXG4gICAgICAgICAgICAgICAgICAgICghcG9wdXBCb3guY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAtYm94Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJcbi8qKlxuICogICAgIHNsaWRlci5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIENyZWF0ZWQgYnkgQW5kcmlpIFNvcm9raW4gb24gNC8yMy8xN1xuICogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pZ25vcmFudGljL2pldHJvLmdpdFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XG5cbiAgICBzdGF0aWMgVEhVTUJTID0gJy50aHVtYnMnO1xuICAgIHN0YXRpYyBUSFVNQiA9ICcudGh1bWJzX190aHVtYic7XG4gICAgc3RhdGljIFNMSURFUiA9ICcuc2xpZGVyJztcbiAgICBzdGF0aWMgU0xJREUgPSAnLnNsaWRlcl9fc2xpZGUnO1xuICAgIHN0YXRpYyBBQ1RJVkVfU0xJREUgPSAnc2xpZGVyX19zbGlkZV9hY3RpdmUnO1xuICAgIHN0YXRpYyBMRUZUX0JUTiA9ICcuc2xpZGVyX19idG5ib3hfbGVmdCc7XG4gICAgc3RhdGljIFJJR0hUX0JUTiA9ICcuc2xpZGVyX19idG5ib3hfcmlnaHQnO1xuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICB0aGlzLnNsaWRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlNMSURFKTtcbiAgICAgICAgdGhpcy5zZXRUaW1lcig1MDAwKTtcblxuICAgICAgICBsZXQgYWN0aXZlU2xpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgICAgICBpZiAoYWN0aXZlU2xpZGUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5MRUZUX0JUTikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLFxuICAgICAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ByZXZTbGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTbGlkZXIuUklHSFRfQlROKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsXG4gICAgICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5TTElERVIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVRpbWVyKDIwMDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHRodW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2xpZGVyLlRIVU1CKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aHVtYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRodW1ic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNsaWRlci5USFVNQlMpO1xuICAgICAgICAgICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbltqXSA9PT0gdGFyZ2V0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUFjdGl2ZUNsYXNzVG9JbmRleChqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZXRUaW1lcihpbnRlcnZhbCkge1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93TmV4dFNsaWRlKCk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlVGltZXIoaW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lcihpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93UHJldlNsaWRlKCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBY3RpdmVTbGlkZSgpO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KTtcbiAgICB9XG5cbiAgICBzaG93TmV4dFNsaWRlKCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZBY3RpdmVTbGlkZSgpO1xuICAgICAgICBpZiAoaW5kZXggPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9nZ2xlQWN0aXZlQ2xhc3NUb0luZGV4KGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRJbmRleE9mQWN0aXZlU2xpZGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNsaWRlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoU2xpZGVyLkFDVElWRV9TTElERSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB0b2dnbGVBY3RpdmVDbGFzc1RvSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCB0aGlzLnNsaWRlTGlzdC5sZW5ndGgpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShTbGlkZXIuQUNUSVZFX1NMSURFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2xpZGVMaXN0W2luZGV4XS5jbGFzc0xpc3QuYWRkKFNsaWRlci5BQ1RJVkVfU0xJREUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCJcbi8qKlxuICogICAgIGpzbmF1dGljLnNwZWMuanMgZm9yIEpldHJvIHByb2plY3RcbiAqICAgICBPY3RvYmVyIDIwMTYsIEFwcmlsIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL2Jsb2Nrcy9uYXZiYXIvbmF2YmFyJztcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi4vYmxvY2tzL3NsaWRlci9zbGlkZXInO1xuaW1wb3J0IFNpZGViYXIgZnJvbSAnLi4vYmxvY2tzL3NpZGViYXIvc2lkZWJhcic7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyJykpIHtcblxuICAgICAgICBOYXZiYXIuaW5pdCgpO1xuXG4gICAgfVxuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKSkge1xuXG4gICAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyKCk7XG4gICAgICAgIHNsaWRlci5pbml0KCk7XG5cbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKSkge1xuXG4gICAgICAgIGxldCBzaWRlYmFyID0gbmV3IFNpZGViYXIoKTtcbiAgICAgICAgc2lkZWJhci5pbml0KCk7XG5cbiAgICB9XG5cbn0pO1xuIiwiXG4vKipcbiAqICAgICBqc25hdXRpYy5qcyBmb3IgSmV0cm8gcHJvamVjdFxuICogICAgIEFwcmlsIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqICAgICBodHRwczovL2dpdGh1Yi5jb20vaWdub3JhbnRpYy9qZXRyby5naXRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBqc05hdXRpYyB7XG5cbiAgICBzdGF0aWMgZ2V0QWN0aXZlSW5kZXgoY2xhc3NOYW1lLCBhY3RpdmVDbGFzc05hbWUpIHtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobm9kZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKGFjdGl2ZUNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvZ2dsZUNsYXNzQnlJbmRleCh0YXJnZXRDbGFzcywgc2V0Q2xhc3NOYW1lLCBpbmRleCkge1xuICAgICAgICBsZXQgbm9kZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRhcmdldENsYXNzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhzZXRDbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgbm9kZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShzZXRDbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgbm9kZUxpc3QubGVuZ3RoKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0YXJnZXRDbGFzcylbaW5kZXhdLmNsYXNzTGlzdC5hZGQoc2V0Q2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB5aWlBamF4UmVxdWVzdCh1cmwsIGJvZHkpIHtcblxuICAgICAgICBsZXQgY3NyZlBhcmFtTWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjc3JmLXBhcmFtJylbMF07XG4gICAgICAgIGxldCBjc3JmVG9rZW5NZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtdG9rZW4nKVswXTtcbiAgICAgICAgbGV0IGNzcmZQYXJhbSA9IGNzcmZQYXJhbU1ldGFcbiAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NzcmYtcGFyYW0nKVswXS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBsZXQgY3NyZlRva2VuID0gY3NyZlRva2VuTWV0YVxuICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY3NyZi10b2tlbicpWzBdLmdldEF0dHJpYnV0ZSgnY29udGVudCcpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGxldCB0b2tlbiA9IGNzcmZQYXJhbSArICc9JyArIGNzcmZUb2tlbjtcblxuICAgICAgICBsZXQgcmVxdWVzdCA9IHt9O1xuICAgICAgICByZXF1ZXN0Lm1ldGhvZCA9ICdwb3N0JztcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzID0ge1xuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3QuY3JlZGVudGlhbHMgPSAnaW5jbHVkZSc7XG4gICAgICAgIHJlcXVlc3QuYm9keSA9IGJvZHkgKyAnJicgKyB0b2tlbjtcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwgcmVxdWVzdClcbiAgICAgICAgICAgIC50aGVuKGpzTmF1dGljLnN0YXR1cylcbiAgICAgICAgICAgIC50aGVuKGpzTmF1dGljLmpzb24pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHN0YXR1cyhyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBqc29uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfVxuXG59XG4iXX0=
