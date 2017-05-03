/**
 *     sidebar.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

import yiiAjax from 'yii-ajax';
import html from 'html-helper';

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
    let links = html.ul(null, {
      id: 'popup-links',
      class: 'popup-box__links'
    });
    let triangle = html.div(null, {
      class: 'popup-box__triangle'
    });
    let div = html.div([triangle, links],
      {
        id: 'popup-box',
        class: 'popup-box'
      }, {
        display: 'none',
        top: '-1000px'
      }
    );

    let catList = document.querySelector('.sidebar');
    catList.appendChild(div);
  }

  static setPopupData(data) {
    let popupBox = Sidebar.getPopup();
    if (popupBox) {
      let linkList = document.querySelector('#popup-links');
      linkList.innerHTML = null;

      let tag = html.span(data.name);
      linkList.appendChild(tag);

      data.links.forEach((link) => {
        linkList.appendChild(html.li(link));
      });
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

    function hidePopup(e) {
      if ((!catList.contains(e.relatedTarget)) &&
        (!tagCloud.contains(e.relatedTarget)) &&
        (!popupBox.contains(e.relatedTarget))) {
        popupBox.style.display = 'none';
        popupBox.style.top = '-1000px';
      }
    }

    catList.addEventListener('mouseout', hidePopup, false);
    tagCloud.addEventListener('mouseout', hidePopup, false);
    popupBox.addEventListener('mouseout', hidePopup, false);
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
          yiiAjax.post('/ajax/cat', {
            id: item.dataset.id
          })
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
          yiiAjax.post('/ajax/tag', {
            id: item.dataset.id
          })
            .then(data => {
              let left = item.offsetLeft + item.offsetWidth - 15,
                top = item.offsetTop + item.offsetHeight - 1;
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
