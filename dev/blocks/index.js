import {getActiveIndex} from '../lib/jsnaut'
import {toggleClassByIndex} from '../lib/jsnaut'

document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector('.navbar') != null) {

        document.querySelector('.menu-btn').addEventListener('click', function () {
            let btn = document.querySelector('.menu-btn'),
                list = document.querySelector('.menu');
            btn.classList.add('menu-btn-blink');
            list.classList.toggle('menu-drapdown');
            setTimeout(function () {
                btn.classList.remove('menu-btn-blink')
            }, 300);
        }, false);
    }

    if (document.querySelector('.slider') != null) {

        if (getActiveIndex() < 0) toggleClassByIndex('slider__slide', 'slider__slide_active', 0);

        document.querySelector('.slider__btnbox_left').addEventListener('click', function () {
            let index = getActiveIndex('slider__slide', 'slider__slide_active');
            index > 0 ? index-- : index = document.querySelectorAll('.slider__slide').length - 1;
            toggleClassByIndex('slider__slide', 'slider__slide_active', index);
        }, false);

        document.querySelector('.slider__btnbox_right').addEventListener('click', function () {
            let index = getActiveIndex('slider__slide', 'slider__slide_active');
            index < document.querySelectorAll('.slider__slide').length - 1 ? index++ : index = 0;
            toggleClassByIndex('slider__slide', 'slider__slide_active', index);
        }, false);
    }

    let thumbs = document.querySelectorAll('.thumbs__thumb');
    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', function () {

            let parent = document.getElementsByClassName('thumbs')[0];
            parent.addEventListener('click', function (event) {
                let target = event.target || event.srcElement;
                for(let j = 0; j < parent.children.length; j++) {
                    if(parent.children[j] == target.parentNode) {
                        toggleClassByIndex('slider__slide', 'slider__slide_active', j);
                    }
                }
            }, false);

        }, false);
    }

});