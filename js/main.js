$(() => {
  const newMap = new Map("map", 45.758061, 4.83363, 13);
  const newCanvas = new Canvas("canvas", 150, 150);
  const newBooking = new Booking("booking", newMap, newCanvas);
});
