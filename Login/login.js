"use strict";

if (cookie.getItem("sesija") == "ulogovan") {
  window.location.href = "http://127.0.0.1:5500/Index/index.html";
}

//const Cookies = require("cookies");

const email = "herceg@dooherceg.ba";
const sifra = "herceg123";
const emailLokal = localStorage.getItem("Email");
const sifraLokal = localStorage.getItem("Sifra");

let tacanUnos = true;
/////MODAL ////
let modal = document.getElementById("modal");
modal.style.display = "none";

let zatvoriModal = document.getElementById("zatvoriModal");
zatvoriModal.onclick = function () {
  modal.style.display = "none";
  brisiPoruku();
};

//FUnkcija za ispis poruke
function ispisiPoruku(poruka) {
  let ul = document.getElementById("listagreska");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(poruka));
  ul.appendChild(li);
  tacanUnos = false;
}
///// Funkcija brisanja poruke
function brisiPoruku() {
  let ul = document.getElementById("listagreska");
  ul.innerHTML = "";
}

// Prijava funkcija
function dugmePrijava() {
  let unosEmail = document.getElementById("input").value;
  let unosSifra = document.getElementById("sifra").value;
  let zapamti = document.getElementById("zapamti").checked;

  ////// Regex za email i pass
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!unosEmail.match(mailformat)) {
    ispisiPoruku("Unesi ispravan format email adrese");
  }

  if (unosSifra.length < 3) {
    ispisiPoruku("Šifra mora imati više od 3 karaktera");
  }

  if (unosSifra.length > 10) {
    ispisiPoruku("Šifra mora imati manje od 10 karaktera");
  }
  //let sifraLokS = localStorage.getItem("Sifra").value;
  if (emailLokal == unosEmail && sifraLokal == unosSifra) {
    //localStorage.setItem("Email", unosEmail);
    //localStorage.setItem("Sifra", unosSifra);

    if (zapamti == true) {
      cookie.setItem("sesija", "ulogovan", 30);
    } else {
      cookie.setItem("sesija", "ulogovan");
    }
    window.location.href = "http://127.0.0.1:5500/index/index.html";
  } else if (email == unosEmail && sifra == unosSifra) {
    if (zapamti == true) {
      cookie.setItem("sesija", "ulogovan", 30);
    } else {
      cookie.setItem("sesija", "ulogovan");
    }
    window.location.href = "http://127.0.0.1:5500/index/index.html";
  } else {
    ispisiPoruku("Prijava nije uspjela!");
  }

  if (!tacanUnos) {
    modal.style.display = "flex";
  }
}
