
/**
 *     sidebar.js for Jetro project
 *     Created by Andrii Sorokin on 4/23/17
 *     https://github.com/ignorantic/jetro.git
 */

import jsNautic from '../../lib/jsnautic';

export default class Sidebar {

    init() {

        let cats = Array.prototype.slice.call(document.querySelectorAll('.cat-item'));

        cats.forEach((item) => {
            item && item.addEventListener('mouseover',
                e => {
                    jsNautic.yiiAjaxRequest('id=' + item.dataset.id, e);
                },
                false
            );
        });

    }

    static status(response) {
        if (Sidebar.status >= 200 && Sidebar.status < 300) {
            return Promise.resolve(response);
        }
        return Promise.reject(new Error(response.statusText));
    }

    static json() {
        return Sidebar.json();
    }

    static error(err) {
        console.log('Request failed', err);
    }

}
