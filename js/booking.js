class Booking {
  constructor(formID, mapObject) {
    $("#booking").on("submit", this.book.bind(this));
    this.mapObject = mapObject;
    // this.canvas = canvasObject;
  }
  book(e) {
    e.preventDefault();
    let firstname = $("#fistname").val();
    let name = $("#name").val();
  }
}
