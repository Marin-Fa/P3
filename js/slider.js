class Slider {
  constructor() {
      this.slides = $("#slides .slide");
      this.currentSlide = 0;
      this.playing = false;        
      this.control = "pause";
      this.slideInterval = setInterval(5000);
      for(let i = 0; i < this.slides.length; i ++) {
        this.slides[i].style.position = 'absolute';
      }
      let controls = $(".controls");
      this.nextSlide();
      this.previousSlide();
      this.initControls();
      this.goToSlide();

  }
  nextSlide() {
      let next = $("#next");
      $(next).on("click", () => {
          this.currentSlide + 1;
          console.log("next");
      });
      
  }
  previousSlide() {
      let previous = $("#previous");
      $(previous).on("click", () => {
          this.currentSlide - 1;
          console.log("previous");
      });
      
  }
  goToSlide(n) {
      // $(this.slides[this.currentSlide]).hasClass('slide'); // hasClass marche pas
      // document.getElementsByClassName("slide") = this.slides[this.currentSlide];
      this.slides[this.currentSlide] = document.getElementsByClassName("slide");
      this.currentSlide = (n + this.slides.length) % this.slides.length;
      // $(this.slides[this.currentSlide]).hasClass('slide showing'); // hasClass marche pas
      // document.getElementsByClassName("slide showing") = this.slides[this.currentSlide];
      this.slides[this.currentSlide] = document.getElementsByClassName("slide showing");
  }
  initControls() {
      if (this.control === "pause") {
          this.pauseSlideshow();
      } else {
          this.playSlideshow();
      }
  }
  pauseSlideshow() {
      let pauseButton = $("#pause");
      if (this.playing === false) {
        this.playing = true;
          $(pauseButton).innerHTML = "Play";
          clearInterval(this.slideInterval);
          console.log("pause");
      }
  }
  playSlideshow() {
      if (this.playing === true) {
        this.playing = false;
          $(pauseButton).innerHTML = "Pause";
          this.slideInterval = setInterval(5000);
          console.log("play");
      }
  }
}
const newSlider = new Slider();
