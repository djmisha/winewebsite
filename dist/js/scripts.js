/*! sethmckinney.com v0.0.1 | (c) 2021 Misha | MIT License | https://github.com/djmisha/sethmckinney.com */
// IFFE
(function () {
    var face = document.querySelector(".face");
    var body = document.querySelector("body");
    face.addEventListener("click", (function (event) {
        event.target.classList.toggle("spin");
        body.classList.toggle("spin");
    }));
})();
