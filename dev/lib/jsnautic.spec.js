/**
 *     jsnautic.spec.js for Jetro project
 *     April 2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jetro.git
 */

import jsNautic from './jsnautic';
import {
  describe,
  it,
  before,
  beforeEach
} from 'mocha';
import {
  expect
} from 'chai';

describe('jsNautic', () => {

  describe('toggleClassByIndex', () => {

    let slide0,
      slide1,
      slide2,
      slide3,
      slide4,
      slide5;

    before(() => {

      let i;
      for (i = 0; i < 6; i++) {
        let slide = document.createElement('div');
        slide.classList.add('slide');
        slide.setAttribute('id', 'slide-' + i);
        document.body.appendChild(slide);
      }

    });

    beforeEach(() => {

      slide0 = document.getElementById('slide-0');
      slide1 = document.getElementById('slide-1');
      slide2 = document.getElementById('slide-2');
      slide3 = document.getElementById('slide-3');
      slide4 = document.getElementById('slide-4');
      slide5 = document.getElementById('slide-5');

      slide0.setAttribute('class', 'slide');
      slide1.setAttribute('class', 'slide');
      slide2.setAttribute('class', 'slide');
      slide3.setAttribute('class', 'slide');
      slide4.setAttribute('class', 'slide');
      slide5.setAttribute('class', 'slide');

    });

    it('toggleClassByIndex to "slide-3"', () => {

      jsNautic.toggleClassByIndex('slide', 'active', 3);

      expect(slide1.getAttribute('class') === 'slide active').to.be.false;
      expect(slide2.getAttribute('class') === 'slide').to.be.true;
      expect(slide3.getAttribute('class') === 'slide active').to.be.true;

      slide3.setAttribute('class', 'slide');

    });

    it('toggleClassByIndex to "slide-5"', () => {

      jsNautic.toggleClassByIndex('slide', 'active', 5);

      expect(slide0.getAttribute('class') === 'slide').to.be.true;
      expect(slide1.getAttribute('class') === 'slide active').to.be.false;
      expect(slide2.getAttribute('class') === 'slide').to.be.true;
      expect(slide3.getAttribute('class') === 'slide').to.be.true;
      expect(slide4.getAttribute('class') === 'slide active').to.be.false;
      expect(slide5.getAttribute('class') === 'slide active').to.be.true;

      slide5.setAttribute('class', 'slide');

    });

  });

  describe('getActiveIndex', () => {

    let slide0,
      slide1,
      slide2,
      slide3,
      slide4,
      slide5;

    before(() => {

      let i;
      for (i = 0; i < 6; i++) {
        let slide = document.createElement('div');
        slide.classList.add('slide');
        slide.setAttribute('id', 'slide-' + i);
        document.body.appendChild(slide);
      }

    });

    beforeEach(() => {

      slide0 = document.getElementById('slide-0');
      slide1 = document.getElementById('slide-1');
      slide2 = document.getElementById('slide-2');
      slide3 = document.getElementById('slide-3');
      slide4 = document.getElementById('slide-4');
      slide5 = document.getElementById('slide-5');

      slide0.setAttribute('class', 'slide');
      slide1.setAttribute('class', 'slide');
      slide2.setAttribute('class', 'slide');
      slide3.setAttribute('class', 'slide');
      slide4.setAttribute('class', 'slide');
      slide5.setAttribute('class', 'slide');

    });

    it('getActiveIndex from "slide-5"', () => {

      slide5.setAttribute('class', 'slide active');
      expect(jsNautic.getActiveIndex('slide', 'active')).to.be.equal(5);
      slide5.setAttribute('class', 'slide');

    });

    it('getActiveIndex from "slide-2"', () => {

      slide2.setAttribute('class', 'slide active');
      expect(jsNautic.getActiveIndex('slide', 'active')).to.be.equal(2);
      slide2.setAttribute('class', 'slide');

    });

    it('getActiveIndex from "slide-4"', () => {

      slide4.setAttribute('class', 'slide active');
      expect(jsNautic.getActiveIndex('slide', 'active')).to.be.equal(4);
      slide4.setAttribute('class', 'slide');

    });
  });
});
