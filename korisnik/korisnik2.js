"use strict";
if (cookie.getItem("sesija") !== "ulogovan") {
  window.location.href = "http://127.0.0.1:5500/Login/login.html";
}

//Odjava dugme
let odjava1 = document.getElementById("odjaviSe");
function odjaviSe() {
  cookie.removeItem("sesija");
  window.location.href = "http://127.0.0.1:5500/Login/login.html";
}

//// Mjesto za funkcije

function ispisiPoruku(poruka) {
  let ul = document.getElementById("listagreska");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(poruka));
  ul.appendChild(li);
  tacanUnos = false;
}

///Modal

let zatvoriModal = document.getElementById("zatvoriModal");
zatvoriModal.onclick = function () {
  modal.style.display = "none";
  let ul = document.getElementById("listagreska");
  ul.innerHTML = "";
};

let otkaziUnos = function () {
  document.getElementById("psw").value = "";
  document.getElementById("novaSifra").value = "";
  document.getElementById("potvrdiSifru").value = "";
};

document.getElementById("otkaziUnos").addEventListener("click", otkaziUnos);

let spremiVrijednosti = function () {
  let tempVrijednosti = preuzmiVrijednosti();
  if (tempVrijednosti.novaSifra != "") {
    localStorage.setItem("Sifra", md5(tempVrijednosti.novaSifra));
  }
  localStorage.setItem("Email", tempVrijednosti.email);
  localStorage.setItem("Ime_korisnika", tempVrijednosti.ime);
  localStorage.setItem("Prezime_korisnika", tempVrijednosti.prezime);
  localStorage.setItem("adresaLokal", tempVrijednosti.adresa);
  localStorage.setItem("telefonLokal", tempVrijednosti.telefon);
  otkaziUnos();
};

/// kraj

let preuzmiVrijednosti = function () {
  return {
    email: document.getElementById("email").value,
    pasw: document.getElementById("psw").value,
    novaSifra: document.getElementById("novaSifra").value,
    potvrdiSifru: document.getElementById("potvrdiSifru").value,
    ime: document.getElementById("ime").value,
    prezime: document.getElementById("prezime").value,
    adresa: document.getElementById("adresa").value,
    telefon: document.getElementById("telefon").value,

    emailLokalStor: localStorage.getItem("Email"),
    trenutnaSifraULokal: localStorage.getItem("Sifra"),
    imeLokal: localStorage.getItem("Ime_korisnika"),
    prezimeLokal: localStorage.getItem("Prezime_korisnika"),
    adresaLokal: localStorage.getItem("adresaLokal"),
    telefonLokal: localStorage.getItem("telefonLokal"),
  };
};

/// validacoja podataka
let tacanUnos = true;
let modal = document.getElementById("modal");

let forma = document.getElementById("formaDetaljRacuna");
forma.addEventListener("submit", function (e) {
  e.preventDefault();

  let tempVrijednosti = preuzmiVrijednosti();

  if (
    !tempVrijednosti.email.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    )
  ) {
    ispisiPoruku("Unesi ispravan format email adrese");
  }

  if (
    tempVrijednosti.email !== tempVrijednosti.emailLokalStor &&
    tempVrijednosti.pasw == ""
  ) {
    ispisiPoruku("Za izmjenu maila potrebno je unijeti šifru");
  }

  if (tempVrijednosti.pasw != "") {
    if (tempVrijednosti.novaSifra != "") {
      if (!tempVrijednosti.novaSifra.match(/[A-Za-z]/)) {
        ispisiPoruku("Nova Šifra mora sadržavati slova");
      }
      if (!tempVrijednosti.novaSifra.match(/\d/)) {
        ispisiPoruku("Nova Šifra mora sadržavati broj");
      }
      if (!tempVrijednosti.novaSifra.match(/[.]/)) {
        ispisiPoruku("Nova Šifra mora sadržavati tačku");
      }
      if (tempVrijednosti.novaSifra.length < 3) {
        ispisiPoruku("Nova Šifra mora imati više od 3 karaktera");
      }
      if (tempVrijednosti.novaSifra.length > 10) {
        ispisiPoruku("Nova Šifra mora imati manje od 10 karaktera");
      }
    }

    if (md5(tempVrijednosti.pasw) != tempVrijednosti.trenutnaSifraULokal) {
      ispisiPoruku("Niste unijeli ispravnu staru šifru");
    }
  }

  if (tempVrijednosti.novaSifra != tempVrijednosti.potvrdiSifru) {
    ispisiPoruku(
      "Polja nova šifra i potvrdi šifru moraju sadržavati istu vrijednost"
    );
  }

  if (tempVrijednosti.ime.length < 3) {
    ispisiPoruku("Ime mora imati više od 3 karaktera");
  }
  if (tempVrijednosti.ime.length > 10) {
    ispisiPoruku("Ime mora imati manje od 10 karaktera");
  }

  if (tempVrijednosti.prezime.length < 3) {
    ispisiPoruku("Prezime mora imati više od 3 karaktera");
  }
  if (tempVrijednosti.prezime.length > 10) {
    ispisiPoruku("Prezime mora imati manje od 10 karaktera");
  }

  if (tempVrijednosti.adresa.length > 15) {
    ispisiPoruku("Adresa mora imati manje od 15 karaktera");
  }

  if (!tempVrijednosti.telefon.match(/^(\+)+[\d]{1,14}$/)) {
    ispisiPoruku(
      "Broja mora biti u formatu +... i mora sadržavati samo brojeve"
    );
  }

  if (tacanUnos) {
    spremiVrijednosti();
  } else {
    modal.style.display = "flex";
    tacanUnos = true;
  }
});

// funkcija puni vrijednosti forme na pocetku
document.addEventListener("DOMContentLoaded", function () {
  let temp = preuzmiVrijednosti();

  document.getElementById("email").value = temp.emailLokalStor;
  document.getElementById("ime").value = temp.imeLokal;
  document.getElementById("prezime").value = temp.prezimeLokal;
  document.getElementById("adresa").value = temp.adresaLokal;
  document.getElementById("korisnik").innerHTML = temp.emailLokalStor;
  document.getElementById("telefon").value = temp.telefonLokal;
});
