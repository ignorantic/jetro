
/**
 *     sidebar.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

import jsNautic from '../../lib/jsnautic';

export default class Sidebar {

    static init() {
        Sidebar.createBoxDiv();
        Sidebar.addEventListenerToBoxDiv();
        Sidebar.addEventListenerToLinks();
        Sidebar.addEventListenerToLinkList();
    }

    static getPopup() {
        return document.querySelector('#popup-box');
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

    static setPopupData(data) {
        let popupBox = Sidebar.getPopup();
        if (popupBox) {
            let linkList = document.querySelector('#popup-links');
            let tagString = '<span>' + data.name + '</span>';
            data.links.forEach((link) => {
                tagString += '<li>' + link + '</li>';
            });
            linkList.innerHTML = tagString;
        }
    }

    static setPopupPosition(left, top) {
        let popupBox = Sidebar.getPopup();
        if (popupBox) {
            popupBox.style.top = top + 'px';
            popupBox.style.left = left + 'px';
        }
    }

    static handleListMouseOver() {
        let popupBox = Sidebar.getPopup();
        if (!popupBox) {
            popupBox = Sidebar.getPopup();
        }
        popupBox.style.display = 'block';
    }

    static addEventListenerToBoxDiv() {

        let catList = document.querySelector('#cat-list');
        let tagCloud = document.querySelector('#tag-cloud');
        let popupBox = Sidebar.getPopup();

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
                    popupBox.style.display = 'none';
                    popupBox.style.top = '-1000px';
                }
            });
    }

    static addEventListenerToLinks() {

        let cats = Array.prototype.slice
            .call(document.querySelectorAll('#cat-list .link-list__item'));
        let tags = Array.prototype.slice
            .call(document.querySelectorAll('#tag-cloud .link-list__item'));

        cats.forEach((item) => {
            item.addEventListener('mouseover',
                e => {
                    if ('ontouchstart' in window) {
                        return;
                    }
                    jsNautic.yiiAjaxRequest('/ajax/cat', 'id=' + item.dataset.id)
                    .then(data => {
                        let left = e.pageX + 5,
                            top = item.offsetTop + 15;
                        Sidebar.setPopupData(data);
                        Sidebar.setPopupPosition(left, top);
                    });
                },
                false
            );
        });
        tags.forEach((item) => {
            item.addEventListener('mouseover',
                () => {
                    if ('ontouchstart' in window) {
                        return;
                    }
                    jsNautic.yiiAjaxRequest('/ajax/tag', 'id=' + item.dataset.id)
                    .then(data => {
                        let left = item.offsetLeft + 20,
                            top = item.offsetTop + item.offsetHeight;
                        Sidebar.setPopupData(data);
                        Sidebar.setPopupPosition(left, top);
                    });
                },
                false
            );
        });
    }

    static addEventListenerToLinkList() {

        let catList = document.querySelector('#cat-list');
        let tagList = document.querySelector('#tag-cloud');

        catList.addEventListener('mouseover', Sidebar.handleListMouseOver);
        tagList.addEventListener('mouseover', Sidebar.handleListMouseOver);
    }

}
