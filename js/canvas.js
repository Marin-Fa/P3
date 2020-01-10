class Canvas {
  /**
   * [[Description]]
   * Canva API
   * @param {string} idCanvas canvas ID inside the HTML
   * @param {number} width canvas width
   * @param {number} height canvas height
   */
  constructor(idCanvas, width, height) {
    this.canvas = $(idCanvas);
    this.canvas[0].width = width;
    this.canvas[0].height = height;
    this.ctx = this.canvas[0].getContext("2d");
    this.draw = false;
    this.isEmpty = true; // By default the canvas is empty
    // Drawing style
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#b20000";
    this.initPointerEvents();

    $("#clear_btn_canvas").on("click", () => {
      this.clearPad();
    });
  }
  /**
   * Events of the mouse and mobile touch
   */
  initPointerEvents() {
    this.canvas.on("mousedown touchstart", e => {
      // init signature
      this.ctx.beginPath();
      this.draw = true;
      e.preventDefault();
    });
    this.canvas.on("mousemove touchmove", this.signPad.bind(this));
    this.canvas.on("mouseup touchend", () => {
      this.draw = false;
    });
  }
  /**
   * Defining the drawing with the mouse or tactil and place the cursor inside the canvas
   * @param {object} e event used in the method to get positions of mouse or finger
   */
  signPad(e) {
    if (this.draw === true) {
      this.posX;
      this.posY;
      if (e.type === "mousemove") {
        // Desktop pointer coordinates
        this.posX = e.pageX - this.canvas.offset().left;
        this.posY = e.pageY - this.canvas.offset().top;
      } else if (e.type === "touchmove") {
        // Mobile touch coordinates
        this.posX = e.touches[0].pageX - this.canvas.offset().left;
        this.posY = e.touches[0].pageY - this.canvas.offset().top;
      }
      this.isEmpty = false;
      this.ctx.lineTo(this.posX, this.posY);
      this.ctx.stroke();
    }
  }
  /**
   * Clear canvas with "clear_btn_canvas" button
   */
  clearPad() {
    this.ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height); // 0 to X an 0 to Y remove the signature
    this.isEmpty = true;
  }
}
