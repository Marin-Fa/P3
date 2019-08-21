class Booking {
  constructor(firstname) {
    this.firstname = firstname;
    this.name = name;
    $("#bookNow").on("click", () => {
      $("#booking").show();
      console.log("test");
    });
  }
  showForm() {
    let x = document.getElementById("booking");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}
