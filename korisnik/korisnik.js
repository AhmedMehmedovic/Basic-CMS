/* sve pod komentarom kod ne valja

"use strict";
if (cookie.getItem("sesija") !== "ulogovan") {
  window.location.href = "http://127.0.0.1:5500/Login/login.html";
}

let tacanUnos = true;
let modal = document.getElementById("modal");



//Odjava dugme
let odjava1 = document.getElementById("odjaviSe");
function odjaviSe() {
  cookie.removeItem("sesija");
  window.location.href = "http://127.0.0.1:5500/Login/login.html";
}

////Ispisi poruku funkcija
function ispisiPoruku(poruka) {
  let ul = document.getElementById("listagreska");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(poruka));
  ul.appendChild(li);
  tacanUnos = false;
}
///Brisi poruku
function brisiPoruku() {
    let ul = document.getElementById("listagreska");
    ul.innerHTML = "";
}
//popunjava mjesta maila
let email = document.getElementById("email");
let korisnikTrenutni = document.getElementById("korisnik");
korisnikTrenutni.innerHTML = localStorage.getItem("Email");
email.value = localStorage.getItem("Email");

////unos nove sifre
//let potvrdiSifru = document.getElementById("potvrdiSifru");
//let novaSifra = document.getElementById("novaSifra");
let ime = document.getElementById("ime");
let prezime = document.getElementById("prezime");

///////
//////
function dodaj_Korisnika() {
  //stari email
  let email = document.getElementById("email").value;
  //stara sifra
  let pasw = document.getElementById("psw").value;
  let trenutnaSifraULokal = localStorage.getItem("Sifra");
  ////////
  let novaSifra = document.getElementById("novaSifra").value;
  let potvrdiSifru = document.getElementById("potvrdiSifru").value;
  let passFS = /[A-Za-z]/;
  let passFBr = /\d/;
  let passFZ = /[.]/;
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  ///
  let emailLokalStor = localStorage.getItem("Email");
  /// IME I PREZIME ZA LOCAL STORAGE
  let ime = document.getElementById("ime").value;
  let prezime = document.getElementById("prezime").value;
  ///
  let imeLokal = localStorage.getItem("Ime_korisnika");
  let prezimeLokal = localStorage.getItem("Prezime_korisnika");
  let d = true;
  ////Za email
  if (email === "") {
    if (email !== emailLokalStor && pasw == "") {
      ispisiPoruku("Za izmjenu maila potrebno je unijeti ??ifru");
    } else if (!email.match(mailformat)) {
      ispisiPoruku("Unesi ispravan format email adrese");
    } else if (tacanUnos && pasw === trenutnaSifraULokal) {
      localStorage.setItem("Email", email);
      d = true;
    }
  }
  ///////////
  /////////////
  ///////////

  if (pasw === "" && novaSifra !== "") {
    ispisiPoruku("Morate unijeti staru ??ifru");

    if (pasw !== trenutnaSifraULokal) {
      ispisiPoruku("Niste unijeli ispravnu staru ??ifru");
    }
  } 
  ////////////
  if (novaSifra !== "" || potvrdiSifru !== "") {
    if (pasw !== trenutnaSifraULokal) {
      ispisiPoruku("Niste unijeli ispravnu staru ??ifru");
    }
    if (novaSifra !== potvrdiSifru) {
      ispisiPoruku(
        "Polja nova ??ifra i potvrdi ??ifru moraju sadr??avati istu vrijednost"
      );
    }
    if (!novaSifra.match(passFS)) {
      ispisiPoruku("??ifra mora sadr??avati slova");
    } else if (!novaSifra.match(passFBr)) {
      ispisiPoruku("??ifra mora sadr??avati broj");
    } else if (!novaSifra.match(passFZ)) {
      ispisiPoruku("??ifra mora sadr??avati ta??ku");
    } else if (novaSifra.length < 3) {
      ispisiPoruku("??ifra mora imati vi??e od 3 karaktera");
    } else if (novaSifra.length > 10) {
      ispisiPoruku("??ifra mora imati manje od 10 karaktera");
    } else if (novaSifra === pasw) {
      ispisiPoruku("Unijeli ste staru ??ifru. Nova ??ifra mora biti razli??ita");
    } else {
      localStorage.setItem("Sifra", novaSifra);
    }
  }

  ///

  ////////
  ////////
  if (prezime !== prezimeLokal && prezime !== "") {
    localStorage.setItem("Prezime_korisnika", prezime);
  }
  if (imeLokal == "") {
    localStorage.setItem("Ime_korisnika", ime);
  }
  ///
  if (ime !== "") {
    localStorage.setItem("Ime_korisnika", ime);
  }
  ///
  if ((d = false)) {
    window.location.href = "http://127.0.0.1:5500/korisnik/korisnik.html";
  } else if (!tacanUnos) {
    modal.style.display = "flex";
  }
  ///
  /*
  
*/
// modal.style.display = "flex";

/*window.location.href = "http://127.0.0.1:5500/korisnik/korisnik.html";

  if (tacanUnos) {
    window.location.href = "http://127.0.0.1:5500/korisnik/korisnik.html";
  }
  ///
}
//////Otkazi brisi polja

function otkaziUnos() {
  let pasw = document.getElementById("psw");

  novaSifra.value = "";
  potvrdiSifru.value = "";
  ime.value = "";
  prezime.value = "";
  email.value = "";
  pasw.value = "";
}

let otkazi = document.getElementById("otkaziUnos");
otkazi.onclick = otkaziUnos;

// Mora biti da sprijeci formu defaultno da salje podatke
document
  .getElementById("formaDetaljRacuna")
  .addEventListener("submit", function (e) {
    e.preventDefault();
  });

///Modal

let zatvoriModal = document.getElementById("zatvoriModal");
zatvoriModal.onclick = function () {
  modal.style.display = "none";
  brisiPoruku();
  otkaziUnos();
};
*/
