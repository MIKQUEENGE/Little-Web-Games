var leftPositions = [0, -440, -880];
var imgs = document.getElementsByClassName("imgs")[0];
var left = document.getElementsByClassName("left")[0];
var right = document.getElementsByClassName("right")[0];
var circles = document.getElementsByClassName("circle");
var currentPos = 0;

function move(i) {
    circles[currentPos].className = "circle";
    i%=3;
    if (i < 0) i+=3;
    currentPos = i;
    imgs.style.left = leftPositions[currentPos] + "px";
    circles[currentPos].className = "highlight circle";
}

setInterval(function() {
    move(currentPos+1);
}, 2000);

left.onclick = function() {
    move(currentPos-1);
}

right.onclick = function() {
    move(currentPos+1);
}

for (var i = 0; i < 3; i++) {
    (function(j) {
        circles[j].onclick = function() {
            move(j);
        };
    })(i);
}