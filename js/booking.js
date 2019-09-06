class Booking {
  constructor(idBooking, canvasObject) {
    $("#booking").on("submit", this.book.bind(this));
    this.booking = $(idBooking);
    this.canvasObject = canvasObject;
    this.initWebStorage();
    this.initBookingInterface();
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
      // console.log(this.firstname);
      // console.log(this.name);
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
        document.getElementById("clock").innerHTML = "Finished";
        sessionStorage.clear();
      }
    }, 1000);
  }
  initBookingInterface() {
    if (
      this.canvasObject.isEmpty ||
      this.name === null ||
      this.firstname === null
    ) {
      $("#confirm_btn").on("click", () => {
        $("#complete_inputs").text("Please fill in the fields");
        $("#booking_status").hide();
        console.log("NOPE FILL IN THE FIIIIELDS");
      });
    } else {
      $("#confirm_btn").on("click", () => {
        $("#booking_status").show();
        $("#booking_form").hide();
        $(".leaflet-popup").hide();
        this.initTimer();
        console.log("OKAYYY BITCH");
      });
      $("#clear_btn").on("click", () => {
        $("#booking_status").hide();
        $("#booking_form").show();
        $(".leaflet-popup").show();
      });
    }
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
      this.initBookingInterface();
    }
  }
}
