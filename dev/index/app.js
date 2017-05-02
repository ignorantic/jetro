/**
 *     jsnautic.spec.js for Jetro project
 *     October 2016, April 2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jetro.git
 */

import Navbar from '../blocks/navbar/navbar';
import Slider from '../blocks/slider/slider';
import Sidebar from '../blocks/sidebar/sidebar';

document.addEventListener('DOMContentLoaded', function () {

  if (document.querySelector('.navbar')) {

    Navbar.init();

  }

  if (document.querySelector('.slider')) {

    let slider = new Slider();
    slider.init();

  }

  if (document.querySelector('.sidebar')) {

    Sidebar.init();

  }

});
