var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,5000);
for(var i = 0; i < slides.length; i ++) {
    slides[i].style.position = 'absolute';
}

function nextSlide() {
    goToSlide(currentSlide+1);
}

function previousSlide() {
    goToSlide(currentSlide-1);
}

function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n + slides.length) %slides.length;
    slides[currentSlide].className = 'slide showing';
}

var playing = true;
var pauseButton = document.getElementById('pause');

function pauseSlideshow() {
    pauseButton.innerHTML = 'Play';
    playing = false;
    clearInterval(slideInterval);
}

function playSlideshow() {
    pauseButton.innerHTML = 'Pause';
    playing = true;
    slideInterval = setInterval(nextSlide,5000);
}

pauseButton.onclick = function() {
    if(playing) {
        pauseSlideshow();
    } else {
        playSlideshow();
    }
};

var next = document.getElementById('next');
var previous = document.getElementById('previous');

next.onclick = function() {
    // pauseSlideshow();
    nextSlide();
};
previous.onclick = function() {
    // pauseSlideshow();
    previousSlide();
};

var controls = document.querySelectorAll('.controls');
for(var i = 0; i < controls.length; i ++) {
    controls[i].style.display = 'inline-block';
}
