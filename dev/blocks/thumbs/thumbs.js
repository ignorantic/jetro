let thumbs = document.querySelectorAll('.thumbs__thumb');
for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].onclick = function () {

        let parent = document.getElementsByClassName('thumbs')[0];
        parent.onclick = function (e) {
            let e = e || event,
                target = e.target || e.srcElement;
            for(let j = 0; j < parent.children.length; j++) {
                if(parent.children[j] == target.parentNode) {
                    return setActiveClass(j);
                }
            }
        }

    }
};