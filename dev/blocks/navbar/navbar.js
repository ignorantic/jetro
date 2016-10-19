if (document.querySelector('.navbar') != null) {

    (function addActiveLink() {
        let address, index, page, links, set, link;
        address = location.href;
        index = address.match(/[a-z][a-z0-9]*\.html$/i);
        if (index != null) page = index;
        else page = 'index.html';
        links = document.querySelectorAll('.navbar__link');
        for (let i = 0; i < links.length; i++) {
            set = links[i].toString();
            link = set.match(/[a-z][a-z0-9]*\.html$/i);
            if (link != null) {
                if (link[0] == page) {
                    toggleClassByIndex('navbar__link', 'navbar__link_active', i);
                }
            }
        }
    })();

    document.querySelector('.navbar__btn').onclick = function () {
        var btn = document.querySelector('.navbar__btn'),
            list = document.querySelector('.navbar__list');
        btn.classList.add('navbar__btn_blink');
        list.classList.toggle('navbar__list_active');
        setTimeout(function () {
            btn.classList.remove('navbar__btn_blink')
        }, 300);
    };
}