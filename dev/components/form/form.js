/**
 *     form.js for Jetro project
 *     Created by Andrii Sorokin on 5/7/17
 *     https://github.com/ignorantic/jetro.git
 */

export default class FeedbackForm {

  static first;
  static last;
  static email;
  static body;

  static init() {
    FeedbackForm.first = false;
    FeedbackForm.last = false;
    FeedbackForm.email = false;
    FeedbackForm.body = false;
    FeedbackForm.addEventListenerToInputs();
  }

  static addEventListenerToInputs() {
    let firstInput = document.querySelector('#input-first-name');
    // let lastInput = document.querySelector('#input-last-name');
    // let emailInput = document.querySelector('#input-email');
    // let bodyInput = document.querySelector('#input-body');
    firstInput.addEventListener('blur', e => {
      console.log(e.target);
      e.target.classList.add('blur');
    },
    false);
  }
}
