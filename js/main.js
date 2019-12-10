$(() => {
  const newMap = new Map("map", 45.758061, 4.83363, 13);
  const newCanvas = new Canvas("canvas", 150, 150);
  const newBooking = new Booking("booking", newCanvas);
  const newSlider = new Slider(5000, $("#slides .slide"));
  $("#booking_inputs_col").hide();
});
