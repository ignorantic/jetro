if (document.querySelector('.navbar') != null) {

    (function addActiveLink() {
        let address, index, lastIndex, page, links, set, link, lastLink;
        address = location.href;
        index = address.match(/(index\.php\/|\/)[a-z][a-z0-9]*(\/|\.html|\.php)/ig);
        console.log('index: ' + index);
        if (index == null) page = '/index.html';
        else {
            lastIndex = index[index.length - 1];
            page = lastIndex.replace('index.php', '');
        }
        console.log('page: ' + page);
        links = document.querySelectorAll('.navbar__link');
        for (let i = 0; i < links.length; i++) {
            set = links[i].toString();
            link = set.match(/\/[a-z][a-z0-9]*(\/|\.html|\.php)$/ig);
            lastLink = link[link.length - 1];
            console.log('lastLink: ' + lastLink);
            if (lastLink != null) {
                if (lastLink == page) {
                    console.log('lastLink: ' + lastLink);
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