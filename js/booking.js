class Booking {
  constructor(idBooking, canvasObject) {
    this.booking = $(idBooking);
    this.canvasObject = canvasObject;
    this.initWebStorage();
    this.initBookingInterface();
    $("#booking").on("submit", this.book.bind(this));
  }
  initWebStorage() {
    if (
      localStorage.getItem("name_bk") &&
      localStorage.getItem("firstname_bk")
    ) {
      this.name = localStorage.getItem("name_bk");
      this.firstname = localStorage.getItem("firstname_bk");
      $("#name_bk").val(this.name);
      $("#firstname_bk").val(this.firstname);
    }
  }
  checkWebStorage(elt) {
    this.regex = /^[a-zA-Z]+$/;
    this.input = $(elt).val();
    // Correspondance entre un texte et une expression rationnelle
    if (this.input.length === 0 || this.regex.test($(elt).val()) === false) {
      return false;
    } else {
      return true;
    }
  }
  checkCanvas() {
    return !this.canvasObject.isEmpty;
  }
  initBookingInterface() {
    $("#confirm_btn").on("click", () => {
      let firstname = $("#name_bk").val();
      let name = $("#firstname_bk").val();
      if (
        this.canvasObject.isEmpty ||
        firstname == null ||
        firstname == "" ||
        name == null ||
        name == ""
      ) {
        $("#complete_inputs").text("Please fill in the fields");
        $("#booking_status").hide();
      } else {
        $("#booking_status").show();
        $("#booking_form").hide();
        $(".leaflet-popup").hide();
        // $("#map_col").toggleClass("col-lg-9 col-lg-12");
        $("#map_col").removeClass('col-lg-9').addClass('col-lg-12 col-sm-12')
        // $("#map_col").removeClass('col-lg-12 col-sm-12').addClass('col-9')
        $("#booking_inputs_col").hide();
        this.initTimer();
        $("#clear_btn").on("click", () => {
          $("#booking_status").hide();
          $("#booking_form").show();
          $(".leaflet-popup").show();
          $("#booking_inputs_col").show();
          // $("#map_col").toggleClass("col-lg-12 col-lg-9");
          // $("#map_col").removeClass('col-9').addClass('col-lg-12 col-sm-12')
          $("#map_col").removeClass('col-lg-12 col-sm-12').addClass('col-lg-9 col-sm-12')

        });
      }
    });
  }
  book(e) {
    e.preventDefault();
    if (
      this.checkCanvas($("#canvas")) &&
      this.checkWebStorage($("#firstname_bk")) &&
      this.checkWebStorage($("#name_bk"))
    ) {
      localStorage.setItem("firstname_bk", $("#firstname_bk").val());
      localStorage.setItem("name_bk", $("#name_bk").val());
      $("#firstname_bkd").text($("#firstname_bk").val());
      $("#name_bkd").text($("#name_bk").val());
      let stationNameRegex = sessionStorage
        .getItem("stationName")
        .split(/^\d+ - /, 2)[1];
      $("#station").text(stationNameRegex);
      sessionStorage.getItem("stationAddress");
      $("#address").text(sessionStorage.getItem("stationAddress"));
      sessionStorage.setItem("timeNow", Date.now());
    }
  }
  initTimer() {
    const min = 20 * 60 * 1000;
    let chrono = setInterval(() => {
      let time = Date.now() - Number(sessionStorage.getItem("timeNow"));
      let timeRemain = min - time;
      let minutesRemain = Math.floor(timeRemain / 1000 / 60);
      let secondsRemain = Math.floor((timeRemain / 1000) % 60);
      if (String(secondsRemain).length === 1) {
        secondsRemain = "0" + secondsRemain;
      }
      if (time < min) {
        $("#clock").text(minutesRemain + "min " + secondsRemain + "s");
      } else {
        clearInterval(chrono);
        $("#clock").text("Finished");
        sessionStorage.clear();
      }
    }, 1000);
  }
}
