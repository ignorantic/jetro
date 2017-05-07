/**
 *     jsnautic.spec.js for Jetro project
 *     October 2016, April 2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jetro.git
 */

import Navbar from '../components/navbar/navbar';
import Slider from '../components/slider/slider';
import Sidebar from '../components/sidebar/sidebar';

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
