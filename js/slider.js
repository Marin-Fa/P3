class Slider {
  constructor(interval, classSlider) {
    this.timeInterval = interval;
    this.slideInterval = setInterval(
      this.nextSlide.bind(this),
      this.timeInterval
    );
    this.items = classSlider;
    this.currentSlide = 0;
    this.controls = "play";
    this.pauseBtn = $("#singlebutton");

    $(document).on("keydown", this.keybordControl.bind(this));

    $("#next").on("click", () => {
      this.nextSlide();
    });

    $("#previous").on("click", () => {
      this.prevSlide();
    });

    $("#singlebutton").on("click", () => {
      if (this.controls === "play") {
        $(this.pauseBtn).text("Play");
      } else {
        $(this.pauseBtn).text("Pause");
      }
      this.actualControl();
    });
  }
  keybordControl(e) {
    if (e.keyCode === 39) {
      this.nextSlide();
    } else if (e.keyCode === 37) {
      this.prevSlide();
    }
  }
  goToSlide(n) {
    this.items[this.currentSlide].className = "slide";
    this.currentSlide = (n + this.items.length) % this.items.length;
    this.items[this.currentSlide].className = "slide showing";
  }
  nextSlide() {
    this.goToSlide(this.currentSlide + 1);
  }
  prevSlide() {
    this.goToSlide(this.currentSlide - 1);
  }
  playInterval() {
    if (this.controls === "pause") {
      this.slideInterval = setInterval(
        this.nextSlide.bind(this),
        this.timeInterval
      );
      this.controls = "play";
    }
  }
  pauseInterval() {
    if (this.controls === "play") {
      clearInterval(this.slideInterval);
      this.controls = "pause";
    }
  }
  actualControl() {
    if (this.controls === "pause") {
      this.playInterval();
    } else {
      this.pauseInterval();
    }
  }
}
