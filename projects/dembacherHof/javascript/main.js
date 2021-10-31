$("#mobile-cta").click(function () {
    $("nav").css({
        width: "60%",
        padding: "1em"
    });
});

$("#mobile-exit").click(function () {
    $("nav").css({
        width: "0",
        padding: "0"
    });
});


var slideIndex = 1;
showSlide(slideIndex);

function plusDivs(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    var i;
    var slides = document.getElementsByClassName("slideShow");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

$(".prev").click(function () {
    plusDivs(-1);
});

$(".next").click(function () {
    plusDivs(+1);
})
