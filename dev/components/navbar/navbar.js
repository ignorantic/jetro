/**
 *     jsnautic.spec.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

export default class Navbar {

  static init() {
    let navbarElement = document.querySelector('.menu__btn');
    navbarElement.addEventListener('click', Navbar.setDropdown, false);
  }

  static setDropdown() {
    let btn = document.querySelector('.menu__btn'),
      list = document.querySelector('.menu__list');
    btn.classList.add('menu__btn_blink');
    list.classList.toggle('menu__drapdown');
    setTimeout(() => {
      btn.classList.remove('menu__btn_blink');
    }, 300);
  }

}
