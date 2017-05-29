/**
 *     form.js for Jetro project
 *     Created by Andrii Sorokin on 5/7/17
 *     https://github.com/ignorantic/jetro.git
 */

import includes from 'lodash/includes';
import isEmpty from 'validator/lib/isEmpty';
// import isEmail from 'validator/lib/isEmail';

export default class FeedbackForm {

  constructor (structure) {
    this.structure = structure;
    this.types = ['text', 'mail'];
  }

  init() {
    this.initFields();
    this.initSubmit();
    this.initClasses();
    this.addEventListenerToInputs();
    delete this.structure;
  }

  initFields () {
    this.fields = this.structure.fields.map(item => {
      let field = {};
      if (typeof item.ID === 'string') {
        field.ID = item.ID;
      } else {
        field.ID = 'undefined';
      }
      if (includes(this.types, field.type)) {
        field.type = item.type;
      } else {
        field.type = this.types[0];
      }
      field.validated = false;
      return field;
    });
  }

  initSubmit() {
    this.submit = {};
    if (typeof this.structure.submit.ID === 'string') {
      this.submit.ID = this.structure.submit.ID;
    } else {
      this.submit.ID = 'submit';
    }
  }

  initClasses() {
    this.classes = {};
    if (typeof this.structure.classes.error === 'string') {
      this.classes.error = this.structure.classes.error;
    } else {
      this.classes.error = 'error';
    }
  }

  addEventListenerToInputs () {
    this.fields.forEach(field => {
      let index = this.fields.indexOf(field);
      document.getElementById(field.ID).addEventListener('blur', this.handleBlur(index), false);
    });
  }

  handleBlur (index) {
    return (e) => {
      if (isEmpty(e.target.value)) {
        e.target.classList.add(this.classes.error);
        this.fields[index].validated = false;
      } else {
        e.target.classList.remove(this.classes.error);
        this.fields[index].validated = true;
      }
      if (this.checkFields()) {
        this.enableSubmit();
      } else {
        this.disableSubmit();
      }
    };
  }

  checkFields () {
    let result = true;
    this.fields.forEach(field => {
      if (!field.validated) {
        result = false;
      }
    });
    return result;
  }

  enableSubmit() {
    let submit = document.getElementById(this.submit.ID);
    submit.disabled = false;
  }

  disableSubmit() {
    let submit = document.getElementById(this.submit.ID);
    submit.disabled = true;
  }
}
