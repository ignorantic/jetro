/**
 *     form.spec.js for Jetro project
 *     Created by Andrii Sorokin on 5/28/17
 *     https://github.com/ignorantic/jetro.git
 */

import FeedbackForm from '../components/form/form';
import {describe, it, before} from 'mocha';
import {assert} from 'chai';

describe('FeedbackForm', () => {

  describe('functions', () => {

    let form;

    before(() => {
      form = new FeedbackForm({
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
    });

    it('check constructor()', () => {

      assert(typeof form.structure === 'object', 'form.structure is object before init');
      assert(form.fields === void 0, 'form.fields is undefined before init');
      assert(form.submit === void 0, 'form.submit is undefined before init');

    });

    it('check initFields()', () => {

      form.initFields();

      assert(typeof form.fields === 'object', 'form.fields is object');
      assert(form.fields[0].ID === 'input-first-name', 'form.fields[0].ID is string');
      assert(form.fields[1].ID === 'input-last-name', 'form.fields[1].ID is string');
      assert(form.fields[2].validated === false, 'form.fields[2].validated is false');
      assert(form.fields[3].validated === false, 'form.fields[3].validated is false');

    });

    it('check initSubmit()', () => {

      form.initSubmit();

      assert(typeof form.submit === 'object', 'form.submit is object');
      assert(form.submit.ID === 'submit', 'form.submit.ID is string');

    });

    it('check initClasses()', () => {

      form.initClasses();

      assert(typeof form.classes === 'object', 'form.classes is object');
      assert(form.classes.error === 'input_state_error', 'form.classes.error is string');

    });

    it('check checkFields()', () => {

      assert(form.checkFields() === false, 'return false after initialization');
      form.fields[0].validated = true;
      assert(form.checkFields() === false, 'return false if only first is validated');
      form.fields[1].validated = true;
      assert(form.checkFields() === false, 'return false if only first and last are validated');
      form.fields[2].validated = true;
      assert(form.checkFields() === false, 'return false if only first, last and email are validated');
      form.fields[3].validated = true;
      assert(form.checkFields() === true, 'return true if all fields are validated');

    });

  });

});
