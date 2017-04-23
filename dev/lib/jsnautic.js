
/**
 *     jsnautic.js for Jetro project
 *     April 2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jetro.git
 */

export default class jsNautic {

    static getActiveIndex(className, activeClassName) {
        let nodeList = document.getElementsByClassName(className);
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].classList.contains(activeClassName)) {
                return i;
            }
        }
        return -1;
    }

    static toggleClassByIndex(targetClass, setClassName, index) {
        let nodeList = document.getElementsByClassName(targetClass);
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].classList.contains(setClassName)) {
                nodeList[i].classList.remove(setClassName);
            }
        }
        if ((index >= 0) && (index < nodeList.length)) {
            document.getElementsByClassName(targetClass)[index].classList.add(setClassName);
        }
    }

    static yiiAjaxRequest(body, e) {

        function status(response) {
            if (status >= 200 && status < 300) {
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText));
        }

        function json() {
            return json();
        }

        function error(err) {
            console.log('Request failed', err);
        }

        let csrfParamMeta = document.getElementsByName('csrf-param')[0];
        let csrfTokenMeta = document.getElementsByName('csrf-token')[0];
        let csrfParam = csrfParamMeta
            ? document.getElementsByName('csrf-param')[0].getAttribute('content')
            : null;
        let csrfToken = csrfTokenMeta
            ? document.getElementsByName('csrf-token')[0].getAttribute('content')
            : null;
        let token = csrfParam + '=' + csrfToken;

        let request = {};
        request.method = 'post';
        request.headers = {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        request.credentials = 'include';
        request.body = body + '&' + token;
        fetch('/ajax/cat', request)
            .then(status)
            .then(json)
            .then((data) => {
                let catBox = document.querySelector('#cat-box');
                if (catBox) {
                    catBox.style.top = e.pageY + 'px';
                    catBox.style.left = e.pageX + 5 + 'px';
                    let linkList = document.querySelector('#cat-links');
                    let catString = '<span>' + data.name + '</span>';
                    data.links.forEach((link) => {
                        catString += '<li>' + link + '</li>';
                    });
                    linkList.innerHTML = catString;
                }
            })
            .catch(error);

    }

}
