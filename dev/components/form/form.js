/**
 *     form.js for Jetro project
 *     Created by Andrii Sorokin on 5/7/17
 *     https://github.com/ignorantic/jetro.git
 */

import isEmpty from 'validator/lib/isEmpty';
// import isEmail from 'validator/lib/isEmail';

export default class FeedbackForm {

  constructor (structure) {
    this.structure = structure;
    this.types = ['text', 'mail'];
  }

  init() {
    this.initForm();
    this.initFields();
    this.initSubmit();
    this.initClasses();
    this.addEventListenerToInputs();
    this.addEventListenerToSubmit();
    delete this.structure;
  }

  initForm() {
    this.form = {};
    if (typeof this.structure.form.ID === 'string') {
      this.form.ID = this.structure.form.ID;
    } else {
      this.form.ID = 'form';
    }
  }

  initFields () {
    this.fields = this.structure.fields.map(item => {
      let field = {};
      if (typeof item.ID === 'string') {
        field.ID = item.ID;
      } else {
        field.ID = 'undefined';
      }
      if (this.types.includes(field.type)) {
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

  addEventListenerToSubmit () {
    document.getElementById(this.submit.ID).addEventListener('click', this.handleSubmit(), false);
  }

  handleBlur (index) {
    return e => {
      if (isEmpty(e.target.value)) {
        e.target.classList.add(this.classes.error);
        this.fields[index].validated = false;
      } else {
        e.target.classList.remove(this.classes.error);
        this.fields[index].validated = true;
      }
    };
  }

  handleSubmit () {
    return e => {
      e.preventDefault();
      if (this.checkFields()) {
        document.getElementById(this.form.ID).submit();
      } else {
        alert('invalid');
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
}
