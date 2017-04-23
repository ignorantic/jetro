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
 *     Jetro ~ app.js
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvaW5kZXgvYXBwLmpzIiwiZGV2L2xpYi9qc25hdXRpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDT0E7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXJELFFBQUksU0FBUyxhQUFULENBQXVCLFNBQXZCLE1BQXNDLElBQTFDLEVBQWdEOztBQUU1QyxpQkFBUyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RCxZQUFZO0FBQ3RFLGdCQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVY7QUFBQSxnQkFDSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQURYO0FBRUEsZ0JBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsZ0JBQWxCO0FBQ0EsaUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsZUFBdEI7QUFDQSx1QkFBVyxZQUFZO0FBQ25CLG9CQUFJLFNBQUosQ0FBYyxNQUFkLENBQXFCLGdCQUFyQjtBQUNILGFBRkQsRUFFRyxHQUZIO0FBR0gsU0FSRCxFQVFHLEtBUkg7QUFTSDs7QUFFRCxRQUFJLFNBQVMsYUFBVCxDQUF1QixTQUF2QixNQUFzQyxJQUExQyxFQUFnRDs7QUFFNUMsWUFBSSxtQkFBUyxjQUFULEtBQTRCLENBQWhDLEVBQW1DO0FBQy9CLCtCQUFTLGtCQUFULENBQTRCLGVBQTVCLEVBQTZDLHNCQUE3QyxFQUFxRSxDQUFyRTtBQUNIOztBQUVELGlCQUFTLGFBQVQsQ0FBdUIsc0JBQXZCLEVBQStDLGdCQUEvQyxDQUFnRSxPQUFoRSxFQUF5RSxZQUFZO0FBQ2pGLGdCQUFJLFFBQVEsbUJBQVMsY0FBVCxDQUF3QixlQUF4QixFQUF5QyxzQkFBekMsQ0FBWjtBQUNBLG9CQUFRLENBQVIsR0FBWSxPQUFaLEdBQXNCLFFBQVEsU0FBUyxnQkFBVCxDQUEwQixnQkFBMUIsRUFBNEMsTUFBNUMsR0FBcUQsQ0FBbkY7QUFDQSwrQkFBUyxrQkFBVCxDQUE0QixlQUE1QixFQUE2QyxzQkFBN0MsRUFBcUUsS0FBckU7QUFDSCxTQUpELEVBSUcsS0FKSDs7QUFNQSxpQkFBUyxhQUFULENBQXVCLHVCQUF2QixFQUFnRCxnQkFBaEQsQ0FBaUUsT0FBakUsRUFBMEUsWUFBWTtBQUNsRixnQkFBSSxRQUFRLG1CQUFTLGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUMsc0JBQXpDLENBQVo7QUFDQSxvQkFBUSxTQUFTLGdCQUFULENBQTBCLGdCQUExQixFQUE0QyxNQUE1QyxHQUFxRCxDQUE3RCxHQUFpRSxPQUFqRSxHQUEyRSxRQUFRLENBQW5GO0FBQ0EsK0JBQVMsa0JBQVQsQ0FBNEIsZUFBNUIsRUFBNkMsc0JBQTdDLEVBQXFFLEtBQXJFO0FBQ0gsU0FKRCxFQUlHLEtBSkg7QUFLSDs7QUFFRCxRQUFJLFNBQVMsU0FBUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBYjtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLGVBQU8sQ0FBUCxFQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQVk7O0FBRTVDLGdCQUFJLFNBQVMsU0FBUyxzQkFBVCxDQUFnQyxRQUFoQyxFQUEwQyxDQUExQyxDQUFiO0FBQ0EsbUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBVSxLQUFWLEVBQWlCO0FBQzlDLG9CQUFJLFNBQVMsTUFBTSxNQUFOLElBQWdCLE1BQU0sVUFBbkM7QUFDQSxxQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE9BQU8sUUFBUCxDQUFnQixNQUFwQyxFQUE0QyxHQUE1QyxFQUFpRDtBQUM3Qyx3QkFBSSxPQUFPLFFBQVAsQ0FBZ0IsQ0FBaEIsTUFBdUIsT0FBTyxVQUFsQyxFQUE4QztBQUMxQywyQ0FBUyxrQkFBVCxDQUE0QixlQUE1QixFQUE2QyxzQkFBN0MsRUFBcUUsQ0FBckU7QUFDSDtBQUNKO0FBQ0osYUFQRCxFQU9HLEtBUEg7QUFTSCxTQVpELEVBWUcsS0FaSDtBQWFIO0FBRUosQ0FuREQ7QUFSQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7SUFLcUIsUTs7Ozs7Ozt1Q0FFSyxTLEVBQVcsZSxFQUFpQjtBQUM5QyxnQkFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBZjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN0QyxvQkFBSSxTQUFTLENBQVQsRUFBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLGVBQS9CLENBQUosRUFBcUQ7QUFDakQsMkJBQU8sQ0FBUDtBQUNIO0FBQ0o7QUFDRCxtQkFBTyxDQUFDLENBQVI7QUFDSDs7OzJDQUV5QixXLEVBQWEsWSxFQUFjLEssRUFBTztBQUN4RCxnQkFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsV0FBaEMsQ0FBZjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksU0FBUyxNQUE3QixFQUFxQyxHQUFyQyxFQUEwQztBQUN0QyxvQkFBSSxTQUFTLENBQVQsRUFBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLFlBQS9CLENBQUosRUFBa0Q7QUFDOUMsNkJBQVMsQ0FBVCxFQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsWUFBN0I7QUFDSDtBQUNKO0FBQ0QsZ0JBQUssU0FBUyxDQUFWLElBQWlCLFFBQVEsU0FBUyxNQUF0QyxFQUErQztBQUMzQyx5QkFBUyxzQkFBVCxDQUFnQyxXQUFoQyxFQUE2QyxLQUE3QyxFQUFvRCxTQUFwRCxDQUE4RCxHQUE5RCxDQUFrRSxZQUFsRTtBQUNIO0FBQ0o7Ozs7OztrQkF0QmdCLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKipcbiAqICAgICBKZXRybyB+IGFwcC5qc1xuICogICAgIE9jdG9iZXIgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICogICAgIEFwcmlsIDIwMTcgYnkgQW5kcmlpIFNvcm9raW5cbiAqL1xuXG5pbXBvcnQganNOYXV0aWMgZnJvbSAnLi4vbGliL2pzbmF1dGljJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXInKSAhPT0gbnVsbCkge1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpLFxuICAgICAgICAgICAgICAgIGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtZHJhcGRvd24nKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWJ0bi1ibGluaycpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyJykgIT09IG51bGwpIHtcblxuICAgICAgICBpZiAoanNOYXV0aWMuZ2V0QWN0aXZlSW5kZXgoKSA8IDApIHtcbiAgICAgICAgICAgIGpzTmF1dGljLnRvZ2dsZUNsYXNzQnlJbmRleCgnc2xpZGVyX19zbGlkZScsICdzbGlkZXJfX3NsaWRlX2FjdGl2ZScsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fYnRuYm94X2xlZnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGpzTmF1dGljLmdldEFjdGl2ZUluZGV4KCdzbGlkZXJfX3NsaWRlJywgJ3NsaWRlcl9fc2xpZGVfYWN0aXZlJyk7XG4gICAgICAgICAgICBpbmRleCA+IDAgPyBpbmRleC0tIDogaW5kZXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19zbGlkZScpLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBqc05hdXRpYy50b2dnbGVDbGFzc0J5SW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnLCBpbmRleCk7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19idG5ib3hfcmlnaHQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGpzTmF1dGljLmdldEFjdGl2ZUluZGV4KCdzbGlkZXJfX3NsaWRlJywgJ3NsaWRlcl9fc2xpZGVfYWN0aXZlJyk7XG4gICAgICAgICAgICBpbmRleCA8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX3NsaWRlJykubGVuZ3RoIC0gMSA/IGluZGV4KysgOiBpbmRleCA9IDA7XG4gICAgICAgICAgICBqc05hdXRpYy50b2dnbGVDbGFzc0J5SW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnLCBpbmRleCk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBsZXQgdGh1bWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRodW1ic19fdGh1bWInKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1icy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aHVtYnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aHVtYnMnKVswXTtcbiAgICAgICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuW2pdID09PSB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAganNOYXV0aWMudG9nZ2xlQ2xhc3NCeUluZGV4KCdzbGlkZXJfX3NsaWRlJywgJ3NsaWRlcl9fc2xpZGVfYWN0aXZlJywgaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxufSk7XG4iLCJcbi8qKlxuICogICAgIEpldHJvIH4ganNuYXV0LmpzXG4gKiAgICAgQXByaWwgMjAxNyBieSBBbmRyaWkgU29yb2tpblxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGpzTmF1dGljIHtcblxuICAgIHN0YXRpYyBnZXRBY3RpdmVJbmRleChjbGFzc05hbWUsIGFjdGl2ZUNsYXNzTmFtZSkge1xuICAgICAgICBsZXQgbm9kZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChub2RlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoYWN0aXZlQ2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdG9nZ2xlQ2xhc3NCeUluZGV4KHRhcmdldENsYXNzLCBzZXRDbGFzc05hbWUsIGluZGV4KSB7XG4gICAgICAgIGxldCBub2RlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGFyZ2V0Q2xhc3MpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobm9kZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKHNldENsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBub2RlTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKHNldENsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCBub2RlTGlzdC5sZW5ndGgpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRhcmdldENsYXNzKVtpbmRleF0uY2xhc3NMaXN0LmFkZChzZXRDbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=
