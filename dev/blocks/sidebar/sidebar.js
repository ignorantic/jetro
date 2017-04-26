
/**
 *     sidebar.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

import jsNautic from '../../lib/jsnautic';

export default class Sidebar {

    init() {

        let cats = Array.prototype.slice
            .call(document.querySelectorAll('#cat-list .link-list__item'));

        cats.forEach((item) => {
            if ('ontouchstart' in window) {
                item.addEventListener('click',
                    e => {
                        e.preventDefault();
                    },
                    false
                );
            }
            item.addEventListener('mouseover',
                e => {
                    jsNautic.yiiAjaxRequest('/ajax/cat', 'id=' + item.dataset.id)
                    .then(data => {
                        let left = e.pageX + 5;
                        let top = item.offsetTop + 15;
                        Sidebar.setPopupData(data, left, top);
                    });
                },
                false
            );
        });

        let tags = Array.prototype.slice
            .call(document.querySelectorAll('#tag-cloud .link-list__item'));

        tags.forEach((item) => {
            if ('ontouchstart' in window) {
                item.addEventListener('click',
                    e => {
                        e.preventDefault();
                    },
                    false
                );
            }
            item.addEventListener('mouseover',
                () => {
                    jsNautic.yiiAjaxRequest('/ajax/tag', 'id=' + item.dataset.id)
                    .then(data => {
                        let left = item.offsetLeft + 20;
                        let top = item.offsetTop + item.offsetHeight;
                        Sidebar.setPopupData(data, left, top);
                    });
                },
                false
            );
        });

        let catList = document.querySelector('#cat-list');
        let tagList = document.querySelector('#tag-cloud');

        catList.addEventListener('mouseover', Sidebar.handleListMouseOver);
        tagList.addEventListener('mouseover', Sidebar.handleListMouseOver);

    }

    static setPopupData(data, left, top) {
        let popupBox = document.querySelector('#popup-box');
        if (popupBox) {
            popupBox.style.top = top + 'px';
            popupBox.style.left = left + 'px';
            let linkList = document.querySelector('#popup-links');
            let tagString = '<span>' + data.name + '</span>';
            data.links.forEach((link) => {
                tagString += '<li>' + link + '</li>';
            });
            linkList.innerHTML = tagString;
        }
    }

    static handleListMouseOver() {
        let popupBox = document.querySelector('#popup-box');
        if (!popupBox) {
            Sidebar.createBoxDiv();
            Sidebar.addEventListenerToBoxDiv();
            popupBox = document.querySelector('#popup-box');
        }
        popupBox.style.display = 'block';
    }

    static createBoxDiv() {
        let links = document.createElement('ul');
        let triangle = document.createElement('div');
        let div = document.createElement('div');
        links.setAttribute('id', 'popup-links');
        links.classList.add('popup-box__links');
        triangle.classList.add('popup-box__triangle');
        div.setAttribute('id', 'popup-box');
        div.classList.add('popup-box');
        div.style.display = 'none';
        div.style.top = '-1000px';
        div.appendChild(triangle);
        div.appendChild(links);
        let catList = document.querySelector('.sidebar');
        catList.appendChild(div);
    }

    static addEventListenerToBoxDiv() {

        let catList = document.querySelector('#cat-list');
        let tagCloud = document.querySelector('#tag-cloud');
        let popupBox = document.querySelector('#popup-box');

        catList.addEventListener('mouseout',
            e => {
                if (e.relatedTarget !== popupBox) {
                    popupBox.style.display = 'none';
                    popupBox.style.top = '-1000px';
                }
            });

        tagCloud.addEventListener('mouseout',
            e => {
                if (e.relatedTarget !== popupBox) {
                    popupBox.style.display = 'none';
                    popupBox.style.top = '-1000px';
                }
            });

        popupBox.addEventListener('mouseout',
            e => {
                if ((!catList.contains(e.relatedTarget)) &&
                    (!tagCloud.contains(e.relatedTarget)) &&
                    (!popupBox.contains(e.relatedTarget))) {
                    popupBox = document.querySelector('#popup-box');
                    popupBox.style.display = 'none';
                    popupBox.style.top = '-1000px';
                }
            });
    }

}
