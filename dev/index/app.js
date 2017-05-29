/**
 *     app.js for Jetro project
 *     Created by Andrii Sorokin on 10/9/16
 *     https://github.com/ignorantic/jetro.git
 */

import Navbar from '../components/navbar/navbar';
import Slider from '../components/slider/slider';
import Sidebar from '../components/sidebar/sidebar';
import FeedbackForm from '../components/form/form';

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

  if (document.querySelector('.feedback__form')) {

    let feedbackForm = new FeedbackForm({
      fields: [
        {
          ID: 'input-first-name',
          type: 'text'
        },
        {
          ID: 'input-last-name',
          type: 'text'
        },
        {
          ID: 'input-email',
          type: 'text'
        },
        {
          ID: 'input-body',
          type: 'text'
        }
      ],
      submit: {
        ID: 'submit'
      },
      classes: {
        error: 'input_state_error'
      }
    });
    feedbackForm.init();

  }

});
