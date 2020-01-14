class Slider {
  /**
   * [[Description]]
   * @param {number} interval Duration between each slide
   * @param {string} classSlider Images ID and class in the html
   */
  constructor(interval, classSlider) {
    this.timeInterval = interval;
    this.slideInterval = setInterval(
      this.nextSlide.bind(this),
      this.timeInterval
    );
    this.items = classSlider;
    this.currentSlide = 0;
    this.controls = "play";
    this.pauseBtn = $("#play_button");
    $(document).on("keydown", this.keybordControl.bind(this));

    $("#next").on("click", () => {
      this.nextSlide();
    });

    $("#previous").on("click", () => {
      this.prevSlide();
    });

    $("#play_button").on("click", () => {
      if (this.controls === "play") {
        $(this.pauseBtn).text("Play");
      } else {
        $(this.pauseBtn).text("Pause");
      }
      this.actualControl();
    });
  }
  /**
   * keyboard controlers <- ->
   * Changing slide depending on its current status
   * When user presses the left or right button on the keyboard
   *  @param {object} e event used in the method (keycode)
   */
  keybordControl(e) {
    if (e.keyCode === 39) {
      this.nextSlide();
    } else if (e.keyCode === 37) {
      this.prevSlide();
    }
  }
  /**
   * Showing the slides
   * Change the class name of the slide displayed
   */
  goToSlide(n) {
    this.items[this.currentSlide].className = "slide";
    this.currentSlide = (n + this.items.length) % this.items.length;
    this.items[this.currentSlide].className = "slide showing";
  }
  /**
   * Slide on next image
   * Called when user clicks on next button under carousel
   */
  nextSlide() {
    this.goToSlide(this.currentSlide + 1);
  }
  /**
   * Slide on previous image
   * Called when user clicks on previous button under carousel
   */
  prevSlide() {
    this.goToSlide(this.currentSlide - 1);
  }
  /**
   * Switch on pause and play
   */
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
  /**
   * The slider is played by default when the page is loaded
   */
  actualControl() {
    if (this.controls === "pause") {
      this.playInterval();
    } else {
      this.pauseInterval();
    }
  }
}
