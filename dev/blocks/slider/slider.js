$(document).ready(function() {

    "use strict";

    function getNumberOfSlides() {
        return $("div.slider__slide").length;
    }

    function getActiveIndex() {
        return $(".slider__slide_active").index();
    }

    function removeActiveClass() {
        $(".slider__slide_active").removeClass("slider__slide_active");
    }

    function addActiveClass(index) {
        $(".slider__slide").eq(index).addClass("slider__slide_active");
    }

    function toggleBackClass() {
        $(".slider__slide").removeClass("slider__slide_forward").addClass("slider__slide_back");
    }

    function toggleForwardClass() {
        $(".slider__slide").removeClass("slider__slide_back").addClass("slider__slide_forward");
    }

    (function() {if (getActiveIndex() < 0) addActiveClass(0)})();

    $(".slider__btn_left").click(function () {
        var activeIndex = getActiveIndex();
        removeActiveClass();
        toggleBackClass();
        if (activeIndex > 0) activeIndex--;
        else activeIndex = getNumberOfSlides() - 1;
        addActiveClass(activeIndex);
    });

    $(".slider__btn_right").click(function () {
        var activeIndex = getActiveIndex();
        removeActiveClass();
        toggleForwardClass();
        if (activeIndex < getNumberOfSlides() - 1) activeIndex++;
        else activeIndex = 0;
        addActiveClass(activeIndex);
    });
});