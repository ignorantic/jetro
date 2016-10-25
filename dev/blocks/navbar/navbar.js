if (document.querySelector('.navbar') != null) {

    (function addActiveLink() {
        let address, index, lastIndex, page, links, set, link;
        address = location.href;
        index = address.match(/\/[a-z][a-z0-9]*[\/\.]/ig);
        if (index == null) page = '/index';
        else {
            lastIndex = index[index.length - 1].slice(0, -1);
            page = lastIndex;
        }
        console.log('page: ' + page);
        links = document.querySelectorAll('.navbar__link');
        for (let i = 0; i < links.length; i++) {
            set = links[i].toString();
            link = set.match(/[\/][a-z][a-z0-9]*[\/\.]/i);
            link[0] = link[0].slice(0, -1);
            if (link[0] != null) {
                if (link[0] == page) {
                    console.log('link: ' + link);
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