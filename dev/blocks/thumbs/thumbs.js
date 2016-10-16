function swingThumb(target) {
    target.style.transform = 'rotate(1deg)';
    setTimeout(function(){ target.style.transform = 'rotate(-1deg)'; }, 100);
    setTimeout(function(){ target.style.transform = 'rotate(0)'; }, 150);
}

let thumbs = document.querySelectorAll('.thumbs__thumb');
for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].onmouseover = function () {

        let parent = document.getElementsByClassName('thumbs')[0];
        parent.onmouseover = function (event) {
            let target = event.target || event.srcElement;
            for (let j = 0; j < parent.children.length; j++) {
                if (parent.children[j] == target.parentNode) {
                    swingThumb(target.parentNode);
                }
            }
        }

    }
}

for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].onclick = function () {

        let parent = document.getElementsByClassName('thumbs')[0];
        parent.onclick = function (event) {
            let target = event.target || event.srcElement;
            for(let j = 0; j < parent.children.length; j++) {
                if(parent.children[j] == target.parentNode) {
                    toggleClassByIndex('slider__slide', 'slider__slide_active', j);
                }
            }
        }

    }
}