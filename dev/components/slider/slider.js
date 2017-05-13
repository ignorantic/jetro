/**
 *     slider.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

export default class Slider {

  static THUMBS = '.thumbs';
  static THUMB = '.thumbs__thumb';
  static SLIDER = '.slider';
  static SLIDE = '.slider__slide';
  static ACTIVE_SLIDE = 'slider__slide_active';
  static LEFT_BTN = '.slider__btnbox_left';
  static RIGHT_BTN = '.slider__btnbox_right';

  init() {

    this.slideList = document.querySelectorAll(Slider.SLIDE);
    this.setTimer(5000);

    let activeSlide = document.getElementsByClassName(Slider.ACTIVE_SLIDE);
    if (activeSlide.length < 1) {
      this.toggleActiveClassToIndex(0);
    }

    document.querySelector(Slider.LEFT_BTN).addEventListener('click',
      e => {
        this.clearTimer();
        e.stopPropagation();
        this.showPrevSlide();
      },
      false
    );

    document.querySelector(Slider.RIGHT_BTN).addEventListener('click',
      e => {
        this.clearTimer();
        e.stopPropagation();
        this.showNextSlide();
      },
      false
    );

    document.querySelector(Slider.SLIDER).addEventListener('click',
      () => {
        this.toggleTimer(2000);
      },
      false
    );

    let thumbs = document.querySelectorAll(Slider.THUMB);
    for (let i = 0; i < thumbs.length; i++) {
      thumbs[i].addEventListener('click', () => {

        let parent = document.querySelector(Slider.THUMBS);
        parent.addEventListener('click', e => {
          let target = e.target || e.srcElement;
          for (let j = 0; j < parent.children.length; j++) {
            if (parent.children[j] === target.parentNode) {
              this.toggleActiveClassToIndex(j);
            }
          }
        }, false);

      }, false);
    }

  }

  setTimer(interval) {
    this.timer = setInterval(() => {
      this.showNextSlide();
    }, interval);
  }

  clearTimer() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  toggleTimer(interval) {
    if (this.timer !== null) {
      this.clearTimer();
    } else {
      this.setTimer(interval);
    }
  }

  showPrevSlide() {
    let index = this.getIndexOfActiveSlide();
    if (index > 0) {
      index--;
    } else {
      index = this.slideList.length - 1;
    }
    this.toggleActiveClassToIndex(index);
  }

  showNextSlide() {
    let index = this.getIndexOfActiveSlide();
    if (index < this.slideList.length - 1) {
      index++;
    } else {
      index = 0;
    }
    this.toggleActiveClassToIndex(index);
  }

  getIndexOfActiveSlide() {
    for (let i = 0; i < this.slideList.length; i++) {
      if (this.slideList[i].classList.contains(Slider.ACTIVE_SLIDE)) {
        return i;
      }
    }
    return 0;
  }

  toggleActiveClassToIndex(index) {
    if ((index >= 0) && (index < this.slideList.length)) {
      for (let i = 0; i < this.slideList.length; i++) {
        this.slideList[i].classList.remove(Slider.ACTIVE_SLIDE);
      }
      this.slideList[index].classList.add(Slider.ACTIVE_SLIDE);
    }
  }
}
