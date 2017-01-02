'use strict';

function getActiveIndex(className, activeClassName) {
    let nodeList = document.getElementsByClassName(className);
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].classList.contains(activeClassName)) return i;
    }
    return -1;
}

function toggleClassByIndex(targetClass, setClass, index) {
    let nodeList = document.getElementsByClassName(targetClass);
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].classList.contains(setClass)) {
            nodeList[i].classList.remove(setClass)
        }
    }
    if ((index >= 0) && (index < nodeList.length)) {
        document.getElementsByClassName(targetClass)[index].classList.add(setClass);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector('.navbar') != null) {
    
        document.querySelector('.menu-btn').onclick = function () {
            var btn = document.querySelector('.menu-btn'),
                list = document.querySelector('.menu');
            btn.classList.add('menu-btn-blink');
            list.classList.toggle('menu-drapdown');
            setTimeout(function () {
                btn.classList.remove('menu-btn-blink')
            }, 300);
        };
    }

    if (document.querySelector('.slider') != null) {
    
        if (getActiveIndex() < 0) toggleClassByIndex('slider__slide', 'slider__slide_active', 0);
    
        document.querySelector('.slider__btnbox_left').onclick = function () {
            let index = getActiveIndex('slider__slide', 'slider__slide_active');
            if (index > 0) index--;
            else index = document.querySelectorAll('.slider__slide').length - 1;
            toggleClassByIndex('slider__slide', 'slider__slide_active', index);
        };
    
        document.querySelector('.slider__btnbox_right').onclick = function () {
            let index = getActiveIndex('slider__slide', 'slider__slide_active');
            if (index < document.querySelectorAll('.slider__slide').length - 1) index++;
            else index = 0;
            toggleClassByIndex('slider__slide', 'slider__slide_active', index);
        };
    }

    let thumbs = document.querySelectorAll('.thumbs__thumb');
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].onclick = function () {
    
            let parent = document.getElementsByClassName('thumbs')[0];
            parent.onclick = function (event) {
                let target = event.target || event.srcElement;
                for(let j = 0; j < parent.children.length; j++) {
                    if(parent.children[j] == target.parentNode) {
                        toggleClassByIndex('slider__slide', 'slider__slide_active', j);
                    }
                }
            }
    
        }
    }

});