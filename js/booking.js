class Booking {
  constructor(idBooking, mapObject) {
    $("#booking").on("submit", this.book.bind(this));
    this.mapObject = mapObject;
    // this.canvas = canvasObject;

    this.bookingInterface();
    this.webStorage();
  }
  webStorage() {
    if (
      localStorage.getItem("name_bk") &&
      localStorage.getItem("firstname_bk")
      // localStorage.getItem("station_bkd")
    ) {
      this.name = localStorage.getItem("name_bk");
      this.firstname = localStorage.getItem("firstname_bk");
      // this.station = localStorage.getItem("station_bkd");
      $("#name_bk").val(this.name);
      $("#firstname_bk").val(this.firstname);
      // $("station_bkd").val(this.station);
      console.log(this.firstname);
      console.log(this.name);
      console.log(this.station);
    }
  }
  // check inputs (regex ?)

  // check canvas (empty true or false)

  // timer minutes = 20
  book(e) {
    e.preventDefault();

    localStorage.setItem("firstname_bk", $("#firstname_bk").val());
    localStorage.setItem("name_bk", $("#name_bk").val());
    $("#firstname_bkd").text($("#firstname_bk").val());
    $("#name_bkd").text($("#name_bk").val());

    sessionStorage.setItem("station", this.mapObject.station);
    $("#station_bkd").text(sessionStorage.getItem("station"));
    console.log(this.mapObject);
    // undefiiiiiiiiined :'(
  }
  bookingInterface() {
    $("#confirm_btn").on("click", () => {
      $("#booking_status").show();
      $("#booking_form").hide();
      $(".leaflet-popup").hide();
    });
    $("#clear_btn").on("click", () => {
      $("#booking_status").hide();
      $("#booking_form").show();
      $(".leaflet-popup").show();
    });
  }
}
