if (document.querySelector('.navbar') != null) {

    document.querySelector('.menu-btn').onclick = function () {
        var btn = document.querySelector('.menu-btn'),
            list = document.querySelector('.menu');
        btn.classList.add('menu-btn-blink');
        list.classList.toggle('menu-drapdown');
        setTimeout(function () {
            btn.classList.remove('menu-btn-blink')
        }, 300);
    };
}