(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _jsnaut = require('../lib/jsnaut');

document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelector('.navbar') != null) {

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

    if (document.querySelector('.slider') != null) {

        if ((0, _jsnaut.getActiveIndex)() < 0) (0, _jsnaut.toggleClassByIndex)('slider__slide', 'slider__slide_active', 0);

        document.querySelector('.slider__btnbox_left').addEventListener('click', function () {
            var index = (0, _jsnaut.getActiveIndex)('slider__slide', 'slider__slide_active');
            index > 0 ? index-- : index = document.querySelectorAll('.slider__slide').length - 1;
            (0, _jsnaut.toggleClassByIndex)('slider__slide', 'slider__slide_active', index);
        }, false);

        document.querySelector('.slider__btnbox_right').addEventListener('click', function () {
            var index = (0, _jsnaut.getActiveIndex)('slider__slide', 'slider__slide_active');
            index < document.querySelectorAll('.slider__slide').length - 1 ? index++ : index = 0;
            (0, _jsnaut.toggleClassByIndex)('slider__slide', 'slider__slide_active', index);
        }, false);
    }

    var thumbs = document.querySelectorAll('.thumbs__thumb');
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', function () {

            var parent = document.getElementsByClassName('thumbs')[0];
            parent.addEventListener('click', function (event) {
                var target = event.target || event.srcElement;
                for (var j = 0; j < parent.children.length; j++) {
                    if (parent.children[j] == target.parentNode) {
                        (0, _jsnaut.toggleClassByIndex)('slider__slide', 'slider__slide_active', j);
                    }
                }
            }, false);
        }, false);
    }
});

},{"../lib/jsnaut":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getActiveIndex = getActiveIndex;
exports.toggleClassByIndex = toggleClassByIndex;
function getActiveIndex(className, activeClassName) {
    var nodeList = document.getElementsByClassName(className);
    for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].classList.contains(activeClassName)) return i;
    }
    return -1;
}

function toggleClassByIndex(targetClass, setClassName, index) {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYmxvY2tzL2luZGV4LmpzIiwiZGV2L2xpYi9qc25hdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUdBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7O0FBRXJELFFBQUksU0FBUyxhQUFULENBQXVCLFNBQXZCLEtBQXFDLElBQXpDLEVBQStDOztBQUUzQyxpQkFBUyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RCxZQUFZO0FBQ3RFLGdCQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVY7QUFBQSxnQkFDSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQURYO0FBRUEsZ0JBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsZ0JBQWxCO0FBQ0EsaUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsZUFBdEI7QUFDQSx1QkFBVyxZQUFZO0FBQ25CLG9CQUFJLFNBQUosQ0FBYyxNQUFkLENBQXFCLGdCQUFyQjtBQUNILGFBRkQsRUFFRyxHQUZIO0FBR0gsU0FSRCxFQVFHLEtBUkg7QUFTSDs7QUFFRCxRQUFJLFNBQVMsYUFBVCxDQUF1QixTQUF2QixLQUFxQyxJQUF6QyxFQUErQzs7QUFFM0MsWUFBSSxnQ0FBbUIsQ0FBdkIsRUFBMEIsZ0NBQW1CLGVBQW5CLEVBQW9DLHNCQUFwQyxFQUE0RCxDQUE1RDs7QUFFMUIsaUJBQVMsYUFBVCxDQUF1QixzQkFBdkIsRUFBK0MsZ0JBQS9DLENBQWdFLE9BQWhFLEVBQXlFLFlBQVk7QUFDakYsZ0JBQUksUUFBUSw0QkFBZSxlQUFmLEVBQWdDLHNCQUFoQyxDQUFaO0FBQ0Esb0JBQVEsQ0FBUixHQUFZLE9BQVosR0FBc0IsUUFBUSxTQUFTLGdCQUFULENBQTBCLGdCQUExQixFQUE0QyxNQUE1QyxHQUFxRCxDQUFuRjtBQUNBLDRDQUFtQixlQUFuQixFQUFvQyxzQkFBcEMsRUFBNEQsS0FBNUQ7QUFDSCxTQUpELEVBSUcsS0FKSDs7QUFNQSxpQkFBUyxhQUFULENBQXVCLHVCQUF2QixFQUFnRCxnQkFBaEQsQ0FBaUUsT0FBakUsRUFBMEUsWUFBWTtBQUNsRixnQkFBSSxRQUFRLDRCQUFlLGVBQWYsRUFBZ0Msc0JBQWhDLENBQVo7QUFDQSxvQkFBUSxTQUFTLGdCQUFULENBQTBCLGdCQUExQixFQUE0QyxNQUE1QyxHQUFxRCxDQUE3RCxHQUFpRSxPQUFqRSxHQUEyRSxRQUFRLENBQW5GO0FBQ0EsNENBQW1CLGVBQW5CLEVBQW9DLHNCQUFwQyxFQUE0RCxLQUE1RDtBQUNILFNBSkQsRUFJRyxLQUpIO0FBS0g7O0FBRUQsUUFBSSxTQUFTLFNBQVMsZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQWI7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksT0FBTyxNQUEzQixFQUFtQyxHQUFuQyxFQUF3QztBQUNwQyxlQUFPLENBQVAsRUFBVSxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxZQUFZOztBQUU1QyxnQkFBSSxTQUFTLFNBQVMsc0JBQVQsQ0FBZ0MsUUFBaEMsRUFBMEMsQ0FBMUMsQ0FBYjtBQUNBLG1CQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVUsS0FBVixFQUFpQjtBQUM5QyxvQkFBSSxTQUFTLE1BQU0sTUFBTixJQUFnQixNQUFNLFVBQW5DO0FBQ0EscUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLE9BQU8sUUFBUCxDQUFnQixNQUFuQyxFQUEyQyxHQUEzQyxFQUFnRDtBQUM1Qyx3QkFBRyxPQUFPLFFBQVAsQ0FBZ0IsQ0FBaEIsS0FBc0IsT0FBTyxVQUFoQyxFQUE0QztBQUN4Qyx3REFBbUIsZUFBbkIsRUFBb0Msc0JBQXBDLEVBQTRELENBQTVEO0FBQ0g7QUFDSjtBQUNKLGFBUEQsRUFPRyxLQVBIO0FBU0gsU0FaRCxFQVlHLEtBWkg7QUFhSDtBQUVKLENBakREOzs7Ozs7OztRQ0hnQixjLEdBQUEsYztRQVFBLGtCLEdBQUEsa0I7QUFSVCxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUMsZUFBbkMsRUFBb0Q7QUFDdkQsUUFBSSxXQUFXLFNBQVMsc0JBQVQsQ0FBZ0MsU0FBaEMsQ0FBZjtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3RDLFlBQUksU0FBUyxDQUFULEVBQVksU0FBWixDQUFzQixRQUF0QixDQUErQixlQUEvQixDQUFKLEVBQXFELE9BQU8sQ0FBUDtBQUN4RDtBQUNELFdBQU8sQ0FBQyxDQUFSO0FBQ0g7O0FBRU0sU0FBUyxrQkFBVCxDQUE0QixXQUE1QixFQUF5QyxZQUF6QyxFQUF1RCxLQUF2RCxFQUE4RDtBQUNqRSxRQUFJLFdBQVcsU0FBUyxzQkFBVCxDQUFnQyxXQUFoQyxDQUFmO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFNBQVMsTUFBN0IsRUFBcUMsR0FBckMsRUFBMEM7QUFDdEMsWUFBSSxTQUFTLENBQVQsRUFBWSxTQUFaLENBQXNCLFFBQXRCLENBQStCLFlBQS9CLENBQUosRUFBa0Q7QUFDOUMscUJBQVMsQ0FBVCxFQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsWUFBN0I7QUFDSDtBQUNKO0FBQ0QsUUFBSyxTQUFTLENBQVYsSUFBaUIsUUFBUSxTQUFTLE1BQXRDLEVBQStDO0FBQzNDLGlCQUFTLHNCQUFULENBQWdDLFdBQWhDLEVBQTZDLEtBQTdDLEVBQW9ELFNBQXBELENBQThELEdBQTlELENBQWtFLFlBQWxFO0FBQ0g7QUFDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge2dldEFjdGl2ZUluZGV4fSBmcm9tICcuLi9saWIvanNuYXV0J1xuaW1wb3J0IHt0b2dnbGVDbGFzc0J5SW5kZXh9IGZyb20gJy4uL2xpYi9qc25hdXQnXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyJykgIT0gbnVsbCkge1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ0bicpLFxuICAgICAgICAgICAgICAgIGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnUtYnRuLWJsaW5rJyk7XG4gICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtZHJhcGRvd24nKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWJ0bi1ibGluaycpXG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKSAhPSBudWxsKSB7XG5cbiAgICAgICAgaWYgKGdldEFjdGl2ZUluZGV4KCkgPCAwKSB0b2dnbGVDbGFzc0J5SW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnLCAwKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19idG5ib3hfbGVmdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gZ2V0QWN0aXZlSW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnKTtcbiAgICAgICAgICAgIGluZGV4ID4gMCA/IGluZGV4LS0gOiBpbmRleCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXJfX3NsaWRlJykubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzQnlJbmRleCgnc2xpZGVyX19zbGlkZScsICdzbGlkZXJfX3NsaWRlX2FjdGl2ZScsIGluZGV4KTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2J0bmJveF9yaWdodCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gZ2V0QWN0aXZlSW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnKTtcbiAgICAgICAgICAgIGluZGV4IDwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fc2xpZGUnKS5sZW5ndGggLSAxID8gaW5kZXgrKyA6IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzQnlJbmRleCgnc2xpZGVyX19zbGlkZScsICdzbGlkZXJfX3NsaWRlX2FjdGl2ZScsIGluZGV4KTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGxldCB0aHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGh1bWJzX190aHVtYicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGh1bWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRodW1ic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RodW1icycpWzBdO1xuICAgICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyZW50LmNoaWxkcmVuW2pdID09IHRhcmdldC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzc0J5SW5kZXgoJ3NsaWRlcl9fc2xpZGUnLCAnc2xpZGVyX19zbGlkZV9hY3RpdmUnLCBqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG59KTsiLCJleHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlSW5kZXgoY2xhc3NOYW1lLCBhY3RpdmVDbGFzc05hbWUpIHtcbiAgICBsZXQgbm9kZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobm9kZUxpc3RbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKGFjdGl2ZUNsYXNzTmFtZSkpIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzc0J5SW5kZXgodGFyZ2V0Q2xhc3MsIHNldENsYXNzTmFtZSwgaW5kZXgpIHtcbiAgICBsZXQgbm9kZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRhcmdldENsYXNzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChub2RlTGlzdFtpXS5jbGFzc0xpc3QuY29udGFpbnMoc2V0Q2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgbm9kZUxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShzZXRDbGFzc05hbWUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCBub2RlTGlzdC5sZW5ndGgpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGFyZ2V0Q2xhc3MpW2luZGV4XS5jbGFzc0xpc3QuYWRkKHNldENsYXNzTmFtZSk7XG4gICAgfVxufSJdfQ==
