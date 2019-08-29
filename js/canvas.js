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
    this.pointerEvents();
    $("#clear_btn_canvas").on("click", this.clearPad.bind(this));
  }
  pointerEvents() {
    this.canvas.on("mousedown touchstart", e => {
      this.ctx.beginPath();
      this.draw = true;
      e.preventDefault();
    });
    this.canvas.on("mousemove touchmove", this.signaturePad.bind(this));
    this.canvas.on("mouseup touchend", () => {
      this.draw = false;
    });
  }
  signaturePad(e) {
    if (this.draw === true) {
      this.posX;
      this.posY;
      if (e.type === "mousemove") {
        this.posX = e.pageX - this.canvas.offset().left;
        this.posY = e.pageY - this.canvas.offset().top;
      } else if (e.type === "touchmove") {
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
