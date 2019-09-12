class Canvas {
  constructor(idCanvas, width, height) {
    this.canvas = $(idCanvas);
    this.canvas[0].width = width;
    this.canvas[0].height = height;
    this.ctx = this.canvas[0].getContext("2d");
    this.draw = false;
    this.isEmpty = true;
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#b20000";
    this.initPointerEvents();

    document
      .getElementById("clear_btn_canvas")
      .addEventListener("click", this.clearPad.bind(this));
    // $("#clear_btn_canvas").on("click", this.clearPad.bind(this));
  }
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
  clearPad() {
    this.ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
    this.isEmpty = true;
  }
}
