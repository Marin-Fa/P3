class Booking {
  constructor(idBooking, mapObject, canvasObject) {
    $("#booking").on("submit", this.book.bind(this));
    this.booking = $(idBooking);
    this.mapObject = mapObject;
    this.canvasObject = canvasObject;
    this.webStorage();
    this.bookingInterface();
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
    if (this.canvasObject.isEmpty === true) {
      return false;
    } else {
      return true;
    }
  }
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
  bookingInterface() {
    if (!this.canvasObject || !this.input) {
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
        this.timer();
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
      this.bookingInterface();
    }
  }
}
