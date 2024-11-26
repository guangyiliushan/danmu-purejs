var navList = document.getElementById("nav").getElementsByTagName("a");
var showText = document.getElementById("show");
var mainPage = document.getElementById("mainPage")

function setShowText() {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;

    var minFontSize = 12;
    var fontSize = Math.max(minFontSize, windowWidth * 0.2);
    showText.style.fontSize = fontSize + 'px';

    var textHeight = showText.offsetHeight;
    var textWidth = showText.offsetWidth;

    var topOffset = (windowHeight - textHeight) / 2;
    var leftOffset = (windowWidth - textWidth) / 2;

    showText.style.position = 'absolute';
    showText.style.top = topOffset + 'px';
    showText.style.left = leftOffset * 1.1 + 'px';

    showText.style.whiteSpace = 'nowrap';
    showText.style.overflow = 'hidden';
    showText.style.textOverflow = 'ellipsis';
}

setShowText();

window.addEventListener('resize', setShowText);

function reverseNavColor(index) {
    for (var i = 0; i < navList.length; i++) {
        if (i === index) {
            navList[i].style.color = "#000";
            navList[i].style.backgroundColor = "#fff";
        } else {
            navList[i].style.color = "#fff";
            navList[i].style.backgroundColor = "#333";
        }
    }
}

var activeIndex = -1;

for (var i = 0; i < navList.length; i++) {
    (function (i) {
        navList[i].addEventListener("click", function () {
            reverseNavColor(i);
            activeIndex = i;
        });
        navList[i].addEventListener("mouseover", function () {
            if (i !== activeIndex) {
                navList[i].style.color = "#333";
                navList[i].style.backgroundColor = "#ddd";
            }
        });
        navList[i].addEventListener("mouseout", function () {
            if (i !== activeIndex) {
                navList[i].style.color = "#fff";
                navList[i].style.backgroundColor = "#333";
            }
        });
    })(i);
}

