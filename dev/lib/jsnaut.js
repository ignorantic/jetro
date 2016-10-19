'use strict';

function getActiveIndex(className, activeClassName) {
    let nodeList = document.getElementsByClassName(className);
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].classList.contains(activeClassName)) return i;
    }
    return -1;
}

function toggleClassByIndex(targetClass, setClass, index) {
    let nodeList = document.getElementsByClassName(targetClass);
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].classList.contains(setClass)) {
            nodeList[i].classList.remove(setClass)
        }
    }
    if ((index >= 0) && (index < nodeList.length)) {
        document.getElementsByClassName(targetClass)[index].classList.add(setClass);
    }
}