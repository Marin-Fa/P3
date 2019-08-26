// class Booking {
//   constructor(formID, mapObject) {
//     $("#booking").on("submit", this.book.bind(this));
//     this.mapObject = mapObject;
//     // this.canvas = canvasObject;
//   }
//   book(e) {
//     e.preventDefault();
//     let firstname = $("#fistname").val();
//     let name = $("#name").val();
//   }
//   populateStorage() {
//     if (localStorage.getItem("name") && localStorage.getItem("firstname")) {
//       this.localSurname = localStorage.getItem("name");
//       this.localFirstname = localStorage.getItem("firstname");
//       $("#name").val(this.localSurname);
//       $("#firstname").val(this.localFirstname);
//     }
//   }
// }

let labelElm = document.querySelector("label");
let inputElm = document.querySelector("input");
let canvasElm = document.querySelector("canvas");
let confirmElm = document.querySelector("button");

let firstnameForm = document.getElementById("firstname_bk");
let nameForm = document.getElementById("name_bk");
let canvasForm = document.getElementById("canvas");
let confirmForm = document.getElementById("confirm_btn");

if (!localStorage.getItem("firstname_bk") && "name_bk") {
  populateStorage();
} else {
  setStyles();
}

function populateStorage() {
  localStorage.setItem(
    "firstname_bk",
    document.getElementById("firstname_bk").value
  );
  localStorage.setItem("name_bk", document.getElementById("name_bk").value);
  // localStorage.setItem('canvas', document.getElementById('canvas').value);
  // localStorage.setItem('confirm_btn', document.getElementById('confirm_btn').value);

  setStyles();
}

function setStyles() {
  let currentFirstname = localStorage.getItem("firstname_bk");
  let currentName = localStorage.getItem("name_bk");

  document.getElementById("firstname_bk").value = currentFirstname;
  document.getElementById("name_bk").value = currentName;

  firstnameForm.textContent = currentFirstname;
  nameForm.textContent = currentName;
}

firstnameForm.onchange = populateStorage;
nameForm.onchange = populateStorage;
