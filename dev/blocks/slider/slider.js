$(document).ready(function() {

    "use strict";

    function getNumberOfSlides() {
        return $("div.slider__slide").length;
    }

    function getActiveIndex() {
        return $(".slider__slide_active").index();
    }

    function setActiveClass(index) {
        $(".slider__slide_active").removeClass("slider__slide_active");
        $(".slider__slide").eq(index).addClass("slider__slide_active");
    }

    function setBackClass() {
        $(".slider__slide").removeClass("slider__slide_forward").addClass("slider__slide_back");
    }

    function setForwardClass() {
        $(".slider__slide").removeClass("slider__slide_back").addClass("slider__slide_forward");
    }

    (function() {if (getActiveIndex() < 0) setActiveClass(0)})();

    $(".slider__btn_left").click(function () {
        var index = getActiveIndex();
        if (index > 0) index--;
        else index = getNumberOfSlides() - 1;
        setActiveClass(index);
        setBackClass();
    });

    $(".slider__btn_right").click(function () {
        var index = getActiveIndex();
        if (index < getNumberOfSlides() - 1) index++;
        else index = 0;
        setActiveClass(index);
        setForwardClass();
    });

    $(".slider__thrumb").click(function () {
        var index = $(this).index();
        setActiveClass(index);
    });

});