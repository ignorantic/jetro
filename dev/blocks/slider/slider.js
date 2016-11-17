if (document.querySelector('.slider') != null) {

    if (getActiveIndex() < 0) toggleClassByIndex('slider__slide', 'slider__slide_active', 0);

    document.querySelector('.slider__btnbox_left').onclick = function () {
        let index = getActiveIndex('slider__slide', 'slider__slide_active');
        if (index > 0) index--;
        else index = document.querySelectorAll('.slider__slide').length - 1;
        toggleClassByIndex('slider__slide', 'slider__slide_active', index);
    };

    document.querySelector('.slider__btnbox_right').onclick = function () {
        let index = getActiveIndex('slider__slide', 'slider__slide_active');
        if (index < document.querySelectorAll('.slider__slide').length - 1) index++;
        else index = 0;
        toggleClassByIndex('slider__slide', 'slider__slide_active', index);
    };
}