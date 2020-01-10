/**
 * [[Description]]
 * When the page is loaded
 */
$(() => {
  const newMap = new Map("map", 45.758061, 4.83363, 13);
  const newCanvas = new Canvas("canvas", 150, 150);
  const newBooking = new Booking("booking", newCanvas);
  const newSlider = new Slider(5000, $("#slides .slide"));
  // Hide booking status on load
  $("#booking_inputs_col").hide();
  // Disable submit functionality for the contact form
  $(".form_contact").submit(function(e) {
    e.preventDefault();
  });
});
