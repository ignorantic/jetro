function getNumberOfSlides() {
    return document.querySelectorAll('.slider__slide').length;
}

function getActiveIndex() {
    let nodeList = document.querySelectorAll('.slider__slide');
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].classList.contains('slider__slide_active')) return i;
    }
    return -1;
}

function setActiveClass(index) {
    if (getActiveIndex() >= 0) {
        document.querySelector('.slider__slide_active').classList.remove('slider__slide_active');
    }
    document.querySelectorAll('.slider__slide')[index].classList.add('slider__slide_active');
}

(function() {if (getActiveIndex() < 0) setActiveClass(0)})();

document.querySelector('.slider__btn_left').onclick = function () {
    let index = getActiveIndex();
    if (index > 0) index--;
    else index = getNumberOfSlides() - 1;
    setActiveClass(index);
};

document.querySelector('.slider__btn_right').onclick = function () {
    let index = getActiveIndex();
    if (index < getNumberOfSlides() - 1) index++;
    else index = 0;
    setActiveClass(index);
};