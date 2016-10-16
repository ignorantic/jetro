document.querySelector('.navbar__btn').onclick = function () {
    var btn = document.querySelector('.navbar__btn'),
        list = document.querySelector('.navbar__list');
    btn.classList.add('navbar__btn_blink');
    list.classList.toggle('navbar__list_active');
    setTimeout(function() {btn.classList.remove('navbar__btn_blink')}, 300);
};