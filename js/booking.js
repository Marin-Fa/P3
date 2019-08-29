class Booking {
  constructor(idBooking, mapObject, canvasObject) {
    $("#booking").on("submit", this.book.bind(this));
    this.booking = $(idBooking);
    this.mapObject = mapObject;
    this.canvasObject = canvasObject;
    this.bookingInterface();
    this.webStorage();
  }
  webStorage() {
    if (
      localStorage.getItem("name_bk") &&
      localStorage.getItem("firstname_bk")
    ) {
      this.name = localStorage.getItem("name_bk");
      this.firstname = localStorage.getItem("firstname_bk");
      $("#name_bk").val(this.name);
      $("#firstname_bk").val(this.firstname);
      // console.log(this.firstname);
      // console.log(this.name);
    }
  }
  // check inputs (regex ?)
  // check canvas (empty true or false)
  timer() {
    let timeleft = 10;
    let downloadTimer = setInterval(function() {
      document.getElementById("progressBar").value = 10 - timeleft;
      document.getElementById("clock").innerHTML =
        timeleft + " seconds remaining";
      timeleft -= 1;
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("clock").innerHTML = "Finished";
        document.getElementById("progressBar").value = 10;
      }
    }, 1000);
  }
  book(e) {
    e.preventDefault();
    localStorage.setItem("firstname_bk", $("#firstname_bk").val());
    localStorage.setItem("name_bk", $("#name_bk").val());
    $("#firstname_bkd").text($("#firstname_bk").val());
    $("#name_bkd").text($("#name_bk").val());
    // sessionStorage.setItem("station", this.mapObject.selectedStation.name); // héritage qui marche pas
    let stationNameRegex = sessionStorage
      .getItem("stationName")
      .split(/^\d+ - /, 2)[1];
    $("#station").text(stationNameRegex);
    sessionStorage.getItem("stationAddress");
    $("#address").text(sessionStorage.getItem("stationAddress"));
  }
  bookingInterface() {
    $("#confirm_btn").on("click", () => {
      $("#booking_status").show();
      $("#booking_form").hide();
      $(".leaflet-popup").hide();
      this.timer();
    });
    $("#clear_btn").on("click", () => {
      $("#booking_status").hide();
      $("#booking_form").show();
      $(".leaflet-popup").show();
    });
  }
}
