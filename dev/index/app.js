/**
 *     app.js for Jetro project
 *     Created by Andrii Sorokin on 10/9/16
 *     https://github.com/ignorantic/jetro.git
 */

import Navbar from '../components/navbar/navbar';
import Slider from '../components/slider/slider';
import Sidebar from '../components/sidebar/sidebar';
import FeedbackForm from 'feedback-form';

document.addEventListener('DOMContentLoaded', () => {

  if (document.querySelector('.navbar')) {

    (() => {
      Navbar.init();
    })();

  }

  if (document.querySelector('.slider')) {

    (() => {
      let slider = new Slider();
      slider.init();
    })();

  }

  if (document.querySelector('.sidebar')) {

    (() => {
      Sidebar.init();
    })();

  }

  if (document.querySelector('.feedback__form')) {

    (() => {
      let feedbackForm = new FeedbackForm({
        form: {
          id: 'feedback-form'
        },
        fields: [
          {
            id: 'input-first-name',
            type: 'text',
            error: 'Invalid first name'
          },
          {
            id: 'input-last-name',
            type: 'text',
            error: 'Invalid last name'
          },
          {
            id: 'input-email',
            type: 'email',
            error: 'Invalid email'
          },
          {
            id: 'input-body',
            type: 'text',
            error: 'Invalid message body'
          }
        ],
        submit: {
          id: 'submit-btn'
        },
        message: {
          id: 'message'
        },
        classes: {
          inputError: 'input_state_error',
          messageNone: 'message_none',
          messageError: 'message_type_error',
          messageSuccess: 'message_type_success'
        }
      });
      feedbackForm.init();
    })();

  }

});
