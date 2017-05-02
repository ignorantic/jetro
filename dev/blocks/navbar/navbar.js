/**
 *     jsnautic.spec.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

export default class Navbar {

  static init() {
    let navbarElement = document.querySelector('.menu-btn');
    navbarElement.addEventListener('click', Navbar.setDropdown, false);
  }

  static setDropdown() {
    let btn = document.querySelector('.menu-btn'),
      list = document.querySelector('.menu');
    btn.classList.add('menu-btn-blink');
    list.classList.toggle('menu-drapdown');
    setTimeout(() => {
      btn.classList.remove('menu-btn-blink');
    }, 300);
  }

}
