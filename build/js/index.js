(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _jsnautic = require('../lib/jsnautic');

var _jsnautic2 = _interopRequireDefault(_jsnautic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelector('.navbar') !== null) {

        document.querySelector('.menu-btn').addEventListener('click', function () {
            var btn = document.querySelector('.menu-btn'),
                list = document.querySelector('.menu');
            btn.classList.add('menu-btn-blink');
            list.classList.toggle('menu-drapdown');
            setTimeout(function () {
                btn.classList.remove('menu-btn-blink');
            }, 300);
        }, false);
    }

    if (document.querySelector('.slider') !== null) {

        if (_jsnautic2.default.getActiveIndex() < 0) {
            _jsnautic2.default.toggleClassByIndex('slider__slide', 'slider__slide_active', 0);
        }

        document.querySelector('.slider__btnbox_left').addEventListener('click', function () {
            var index = _jsnautic2.default.getActiveIndex('slider__slide', 'slider__slide_active');
            index > 0 ? index-- : index = document.querySelectorAll('.slider__slide').length - 1;
            _jsnautic2.default.toggleClassByIndex('slider__slide', 'slider__slide_active', index);
        }, false);

        document.querySelector('.slider__btnbox_right').addEventListener('click', function () {
            var index = _jsnautic2.default.getActiveIndex('slider__slide', 'slider__slide_active');
            index < document.querySelectorAll('.slider__slide').length - 1 ? index++ : index = 0;
            _jsnautic2.default.toggleClassByIndex('slider__slide', 'slider__slide_active', index);
        }, false);
    }

    var thumbs = document.querySelectorAll('.thumbs__thumb');
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', function () {

            var parent = document.getElementsByClassName('thumbs')[0];
            parent.addEventListener('click', function (event) {
                var target = event.target || event.srcElement;
                for (var j = 0; j < parent.children.length; j++) {
                    if (parent.children[j] === target.parentNode) {
                        _jsnautic2.default.toggleClassByIndex('slider__slide', 'slider__slide_active', j);
                    }
                }
            }, false);
        }, false);
    }
});
/**
 *     Jetro ~ index.js
 *     October 2017 by Andrii Sorokin
 *     April 2017 by Andrii Sorokin
 */

},{"../lib/jsnautic":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *     Jetro ~ jsnaut.js
 *     April 2017 by Andrii Sorokin
 */

var jsNautic = function () {
    function jsNautic() {
        _classCallCheck(this, jsNautic);
    }

    _createClass(jsNautic, null, [{
        key: "getActiveIndex",
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
        key: "toggleClassByIndex",
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
    }]);

    return jsNautic;
}();

exports.default = jsNautic;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL2luZGV4LmpzIiwiZGV2L2xpYi9qc25hdXRpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDT0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXJELFFBQUksU0FBUyxhQUFULENBQXVCLFNBQXZCLE1BQXNDLElBQTFDLEVBQWdEOztBQUU1QyxpQkFBUyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RCxZQUFZO0FBQ3RFLGdCQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVY7QUFBQSxnQkFDSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQURYO0FBRUEsZ0JBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsZ0JBQWxCO0FBQ0EsaUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsZUFBdEI7QUFDQSx1QkFBVyxZQUFZO0FBQ25CLG9CQUFJLFNBQUosQ0FBYyxNQUFkLENBQXFCLGdCQUFyQjtBQUNILGFBRkQsRUFFRyxHQUZIO0FBR0gsU0FSRCxFQVFHLEtBUkg7QUFTSDs7QUFFRCxRQUFJLFNBQVMsYUFBVCxDQUF1QixTQUF2QixNQUFzQyxJQUExQyxFQUFnRDs7QUFFNUMsWUFBSSxtQkFBUyxjQUFULEtBQTRCLENBQWhDLEVBQW1DO0FBQy9CLCtCQUFTLGtCQUFULENBQTRCLGVBQTVCLEVBQTZDLHNCQUE3QyxFQUFxRSxDQUFyRTtBQUNIOztBQUVELGlCQUFTLGFBQVQsQ0FBdUIsc0JBQXZCLEVBQStDLGdCQUEvQyxDQUFnRSxPQUFoRSxFQUF5RSxZQUFZO0FBQ2pGLGdCQUFJLFFBQVEsbUJBQVMsY0FBVCxDQUF3QixlQUF4QixFQUF5QyxzQkFBekMsQ0FBWjtBQUNBLG9CQUFRLENBQVIsR0FBWSxPQUFaLEdBQXNCLFFBQVEsU0FBUyxnQkFBVCxDQUEwQixnQkFBMUIsRUFBNEMsTUFBNUMsR0FBcUQsQ0FBbkY7QUFDQSwrQkFBUyxrQkFBVCxDQUE0QixlQUE1QixFQUE2QyxzQkFBN0MsRUFBcUUsS0FBckU7QUFDSCxTQUpELEVBSUcsS0FKSDs7QUFNQSxpQkFBUyxhQUFULENBQXVCLHVCQUF2QixFQUFnRCxnQkFBaEQsQ0FBaUUsT0FBakUsRUFBMEUsWUFBWTtBQUNsRixnQkFBSSxRQUFRLG1CQUFTLGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUMsc0JBQXpDLENBQVo7QUFDQSxvQkFBUSxTQUFTLGdCQUFULENBQTBCLGdCQUExQixFQUE0QyxNQUE1QyxHQUFxRCxDQUE3RCxHQUFpRSxPQUFqRSxHQUEyRSxRQUFRLENBQW5GO0FBQ0EsK0JBQVMsa0JBQVQsQ0FBNEIsZUFBNUIsRUFBNkMsc0JBQTdDLEVBQXFFLEtBQXJFO0FBQ0gsU0FKRCxFQUlHLEtBSkg7QUFLSDs7QUFFRCxRQUFJLFNBQVMsU0FBUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBYjtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLGVBQU8sQ0FBUCxFQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQVk7O0FBRTVDLGdCQUFJLFNBQVMsU0FBUyxzQkFBVCxDQUFnQyxRQUFoQyxFQUEwQyxDQUExQyxDQUFiO0FBQ0EsbUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBVSxLQUFWLEVBQWlCO0FBQzlDLG9CQUFJLFNBQVMsTUFBTSxNQUFOLElBQWdCLE1BQU0sVUFBbkM7QUFDQSxxQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE9BQU8sUUFBUCxDQUFnQixNQUFwQyxFQUE0QyxHQUE1QyxFQUFpRDtBQUM3Qyx3QkFBSSxPQUFPLFFBQVAsQ0FBZ0IsQ0FBaEIsTUFBdUIsT0FBTyxVQUFsQyxFQUE4QztBQUMxQywyQ0FBUyxrQkFBVCxDQUE0QixlQUE1QixFQUE2QyxzQkFBN0MsRUFBcUUsQ0FBckU7QUFDSDtBQUNKO0FBQ0osYUFQRCxFQU9HLEtBUEg7QUFTSCxTQVpELEVBWUcsS0FaSDtBQWFIO0FBRUosQ0FuREQ7QUFSQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7SUFLcUIsUTs7Ozs7Ozt1Q0FFSyxTLEVBQVcsZSxFQUFpQjtBQUM5QyxnQkFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBZjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN0QyxvQkFBSSxTQUFTLENBQVQsRUFBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLGVBQS9CLENBQUosRUFBcUQ7QUFDakQsMkJBQU8sQ0FBUDtBQUNIO0FBQ0o7QUFDRCxtQkFBTyxDQUFDLENBQVI7QUFDSDs7OzJDQUV5QixXLEVBQWEsWSxFQUFjLEssRUFBTztBQUN4RCxnQkFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsQ0FBZjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN0QyxvQkFBSSxTQUFTLENBQVQsRUFBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLFlBQS9CLENBQUosRUFBa0Q7QUFDOUMsNkJBQVMsQ0FBVCxFQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsWUFBN0I7QUFDSDtBQUNKO0FBQ0QsZ0JBQUssU0FBUyxDQUFWLElBQWlCLFFBQVEsU0FBUyxNQUF0QyxFQUErQztBQUMzQyx5QkFBUyxzQkFBVCxDQUFnQyxXQUFoQyxFQUE2QyxLQUE3QyxFQUFvRCxTQUFwRCxDQUE4RCxHQUE5RCxDQUFrRSxZQUFsRTtBQUNIO0FBQ0o7Ozs7OztrQkF0QmdCLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKipcbiAqICAgICBKZXRybyB+IGluZGV4LmpzXG4gKiAgICAgT2N0b2JlciAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKiAgICAgQXByaWwgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmltcG9ydCBqc05hdXRpYyBmcm9tICcuLi9saWIvanNuYXV0aWMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhcicpICE9PSBudWxsKSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYnRuJyksXG4gICAgICAgICAgICAgICAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbWVudS1idG4tYmxpbmsnKTtcbiAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS1kcmFwZG93bicpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKSAhPT0gbnVsbCkge1xuXG4gICAgICAgIGlmIChqc05hdXRpYy5nZXRBY3RpdmVJbmRleCgpIDwgMCkge1xuICAgICAgICAgICAganNOYXV0aWMudG9nZ2xlQ2xhc3NCeUluZGV4KCdzbGlkZXJfX3NsaWRlJywgJ3NsaWRlcl9fc2xpZGVfYWN0aXZlJywgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19idG5ib3hfbGVmdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0ganNOYXV0aWMuZ2V0QWN0aXZlSW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnKTtcbiAgICAgICAgICAgIGluZGV4ID4gMCA/IGluZGV4LS0gOiBpbmRleCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX3NsaWRlJykubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGpzTmF1dGljLnRvZ2dsZUNsYXNzQnlJbmRleCgnc2xpZGVyX19zbGlkZScsICdzbGlkZXJfX3NsaWRlX2FjdGl2ZScsIGluZGV4KTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2J0bmJveF9yaWdodCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0ganNOYXV0aWMuZ2V0QWN0aXZlSW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnKTtcbiAgICAgICAgICAgIGluZGV4IDwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2xpZGUnKS5sZW5ndGggLSAxID8gaW5kZXgrKyA6IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGpzTmF1dGljLnRvZ2dsZUNsYXNzQnlJbmRleCgnc2xpZGVyX19zbGlkZScsICdzbGlkZXJfX3NsaWRlX2FjdGl2ZScsIGluZGV4KTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGxldCB0aHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGh1bWJzX190aHVtYicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGh1bWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRodW1ic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RodW1icycpWzBdO1xuICAgICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW5bal0gPT09IHRhcmdldC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqc05hdXRpYy50b2dnbGVDbGFzc0J5SW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnLCBqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG59KTtcbiIsIlxuLyoqXG4gKiAgICAgSmV0cm8gfiBqc25hdXQuanNcbiAqICAgICBBcHJpbCAyMDE3IGJ5IEFuZHJpaSBTb3Jva2luXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MganNOYXV0aWMge1xuXG4gICAgc3RhdGljIGdldEFjdGl2ZUluZGV4KGNsYXNzTmFtZSwgYWN0aXZlQ2xhc3NOYW1lKSB7XG4gICAgICAgIGxldCBub2RlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5jb250YWlucyhhY3RpdmVDbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHN0YXRpYyB0b2dnbGVDbGFzc0J5SW5kZXgodGFyZ2V0Q2xhc3MsIHNldENsYXNzTmFtZSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0YXJnZXRDbGFzcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChub2RlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoc2V0Q2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgIG5vZGVMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoc2V0Q2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoKGluZGV4ID49IDApICYmIChpbmRleCA8IG5vZGVMaXN0Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGFyZ2V0Q2xhc3MpW2luZGV4XS5jbGFzc0xpc3QuYWRkKHNldENsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
