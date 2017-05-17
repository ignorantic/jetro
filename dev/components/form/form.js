/**
 *     form.js for Jetro project
 *     Created by Andrii Sorokin on 5/7/17
 *     https://github.com/ignorantic/jetro.git
 */

import isEmpty from 'validator/lib/isEmpty';
// import isEmail from 'validator/lib/isEmail';

export default class FeedbackForm {

  static first;
  static last;
  static email;
  static body;

  static init() {
    FeedbackForm.first = false;
    FeedbackForm.last = false;
    // FeedbackForm.email = false;
    FeedbackForm.body = false;
    (0, FeedbackForm.addEventListenerToInputs)();
  }

  static addEventListenerToInputs() {
    let firstInput = document.querySelector('#input-first-name');
    firstInput.addEventListener('blur', e => {
      if (isEmpty(firstInput.value)) {
        e.target.classList.add('input_state_error');
      } else {
        e.target.classList.remove('input_state_error');
      }
    },
    false);
  }
}
