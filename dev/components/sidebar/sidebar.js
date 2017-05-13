/**
 *     sidebar.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

import yiiAjax from 'yii-ajax';
import html from 'html-helper';

export default class Sidebar {

  static top;
  static left;
  static display;

  static init() {
    Sidebar.top = -1000;
    Sidebar.left = 0;
    Sidebar.display = 'none';
    Sidebar.createBoxDiv();
    Sidebar.addEventListenerToBoxDiv();
    Sidebar.addEventListenerToLinks();
    Sidebar.addEventListenerToLinkList();
  }

  static createBoxDiv() {
    let links = html.tag('ul', null, {
      id: 'popup-links',
      class: 'popup-box__links'
    });
    let triangle = html.tag('div', null, {
      class: 'popup-box__triangle'
    });
    let div = html.tag('div', [triangle, links],
      {
        id: 'popup-box',
        class: 'popup-box'
      }, {
        display: Sidebar.display,
        top: Sidebar.top + 'px'
      }
    );

    let catList = document.querySelector('.sidebar');
    catList.appendChild(div);
  }

  static addEventListenerToBoxDiv() {

    let catList = document.querySelector('#cat-list');
    let tagCloud = document.querySelector('#tag-cloud');
    let popupBox = document.querySelector('#popup-box');

    let hidePopup = e => {
      if (!catList.contains(e.relatedTarget) &&
          !tagCloud.contains(e.relatedTarget) &&
          !popupBox.contains(e.relatedTarget)) {
        Sidebar.display = 'none';
        Sidebar.top = -1000;
        Sidebar.renderPopup();
      }
    };

    catList.addEventListener('mouseout', hidePopup, false);
    tagCloud.addEventListener('mouseout', hidePopup, false);
    popupBox.addEventListener('mouseout', hidePopup, false);
  }

  static addEventListenerToLinks() {

    let cats, tags;
    let toArray = collection => [].slice.call(collection);

    cats = toArray(document.querySelectorAll('#cat-list .link-list__item'));
    tags = toArray(document.querySelectorAll('#tag-cloud .link-list__item'));

    cats.forEach(item => {
      item.addEventListener('mouseover',
        e => {
          if ('ontouchstart' in window) {
            return;
          }
          yiiAjax.post('/ajax/cat', {
            id: item.dataset.id
          })
            .then(data => {
              Sidebar.left = e.pageX + 15;
              Sidebar.top = item.offsetTop;
              Sidebar.setPopupData(data);
              Sidebar.renderPopup();
            });
        },
        false
      );
    });
    tags.forEach(item => {
      item.addEventListener('mouseover',
        e => {
          if ('ontouchstart' in window) {
            return;
          }
          yiiAjax.post('/ajax/tag', {
            id: item.dataset.id
          })
            .then(data => {
              Sidebar.left = e.pageX + 15;
              Sidebar.top = item.offsetTop;
              Sidebar.setPopupData(data);
              Sidebar.renderPopup();
            });
        },
        false
      );
    });
  }

  static addEventListenerToLinkList() {

    let catList = document.querySelector('#cat-list');
    let tagList = document.querySelector('#tag-cloud');
    let handleListMouseOver = () => {
      Sidebar.display = 'block';
    };

    catList.addEventListener('mouseover', handleListMouseOver);
    tagList.addEventListener('mouseover', handleListMouseOver);
  }

  static setPopupData(data) {
    let linkList = document.querySelector('#popup-links');

    if (linkList) {
      linkList.innerHTML = null;
      linkList.appendChild(html.tag('span', data.name));
      data.links.forEach(link => {
        linkList.appendChild(html.tag('li', link));
      });
    }
  }

  static renderPopup() {
    let popupBox = document.querySelector('#popup-box');
    popupBox.style.top = Sidebar.top + 'px';
    popupBox.style.left = Sidebar.left + 'px';
    popupBox.style.display = Sidebar.display;
  }

}
