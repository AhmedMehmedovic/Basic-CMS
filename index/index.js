"use strict";

if (cookie.getItem("sesija") !== "ulogovan") {
  window.location.href = "http://127.0.0.1:5500/Login/login.html";
}

/// Funkcije
///Funckija odjavi se
let odjava1 = document.getElementById("odjaviSe");
function odjaviSe() {
  cookie.removeItem("sesija");

  window.location.href = "http://127.0.0.1:5500/Login/login.html";
}

////Funkcija za ispis gresaka
function ispisiPoruku(poruka) {
  let ul = document.getElementById("listagreska");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(poruka));
  ul.appendChild(li);
  tacanUnos = false;
  modal2.style.display = "flex";
}

//
let modal2 = document.getElementById("modal2");
/// zatvotri modal za greske
let zatvoriModal2 = document.getElementById("zatvoriModal2");
function zatvoriModalGreske() {
  let ul = document.getElementById("listagreska");
  ul.innerHTML = "";
  modal2.style.display = "none";
}
///UNOS GRESAKA
let tacanUnos = true;

//// Preuzimanje datuma
function preuzmiDatum() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy + "/" + time;
  return today;
}
///Ocisti modal

function obriši() {
  sadrzajModal.value = "";
  //datumModal.value = "";
}

///prikaz email kod odjavi se
const trenutniKorisnik = localStorage.getItem("Email");
let korisnik = document.getElementById("korisnik");
korisnik.innerHTML = trenutniKorisnik;
///

let otkaziModal = document.getElementById("otkaziModal");

let dodajDugme = document.getElementById("dodajSadrzaj");
let modal = document.getElementById("modal");

let zatvoriModal = document.getElementById("zatvoriModal");

let dugmeBrisi = document.getElementById("izbrisiDugme");
let sadrzajModal = document.getElementById("unosteksta");

//let sadrzajModal = document.getElementById("unosteksta");
let datumModal = document.getElementById("datumModal");

dodajDugme.addEventListener("click", function () {
  modal.style.display = "flex";
  datumModal.value = preuzmiDatum();
});
zatvoriModal.addEventListener("click", zatvorimodal);
function zatvorimodal() {
  modal.style.display = "none";
  obriši();
}

let spremiKreirajRed = document.querySelector("button.spremi");

//spremiKreirajRed.addEventListener("click", kreirajRed);
spremiKreirajRed.addEventListener("click", kreirajRed);
function kreirajRed() {
  const tabelaBody = document.getElementById("tabelaBody");

  //let brojacReda = tabelaBody.rows.length;
  //let brojacKolona = tabelaBody.rows[1].cells.length
  if (sadrzajModal.value == "") {
    ispisiPoruku("Polje unosa bilješke mora biti ispunjeno.");
    return 0;
  }

  let rowIndex = 0;
  let editId = document.getElementById("edit-row-id");

  if (editId && editId.value != "") {
    let trs = tabelaBody.getElementsByTagName("tr");

    for (var i = 0; i < trs.length; i++) {
      if (trs[i].getAttribute("id") == editId.value) {
        rowIndex = i;
        i = trs.length;
      }
    }

    document.getElementById(editId.value).remove();
    editId.value = "";
  }

  let uniqueID = Math.random() * 10;

  let tabelaRed = tabelaBody.insertRow(rowIndex);
  tabelaRed.setAttribute("id", uniqueID);

  let kolona1 = tabelaRed.insertCell(0);
  let kolona2 = tabelaRed.insertCell(1);
  let kolona3 = tabelaRed.insertCell(2);

  kolona1.innerHTML =
    '<textarea type="text" class="unosteksta"  disabled style ="color : black">' +
    sadrzajModal.value +
    "</textarea>";

  kolona2.innerHTML = datumModal.value;
  kolona3.innerHTML =
    '<div class="tipke">' +
    '<button type="submit" data-row-id="' +
    uniqueID +
    '"  class="uredi" id="uredi" >Uredi</button>' +
    '<button data-row-id="' +
    uniqueID +
    '" type="submit" class="izbrisi-tipka crveno" >Obriši</button>' +
    "</div>";

  kolona3
    .querySelector("button.izbrisi-tipka")
    .addEventListener("click", function (e) {
      if (confirm("Obrisati?")) {
        e.target.parentNode.parentNode.parentNode.remove();
      }
    });

  //Dugme uredi
  kolona3.querySelector("button.uredi").addEventListener(
    "click",

    function (e) {
      let rowId = e.target.dataset.rowId;
      let row = document.getElementById(rowId);
      ///
      datumModal.value = preuzmiDatum();
      ///
      sadrzajModal.value = row.querySelector("textarea").value;
      //datumModal.value = row.querySelector("td:nth-child(2)").innerHTML;

      let editIdInput = document.getElementById("edit-row-id");

      if (editIdInput) {
        editIdInput.value = rowId;
      }

      modal.style.display = "flex";
    }
  );

  ///FUNKCIJA UREDI ZA DUGME SPREMI NAKON UCITAVANJA

  zatvorimodal();
}

// Uzimanje broja redova
let brojRedova = document.getElementById("tabelaBody").children.length;

document
  .getElementById("tabelaBody")
  .addEventListener("DOMSubtreeModified", function (e) {
    let tempBrojRedova = document.getElementById("tabelaBody").children.length;

    if (tempBrojRedova !== brojRedova) {
      brojRedova = tempBrojRedova;
      pagination();
    }
  });

let brojStranica;
///////
function pagination() {
  let izabraniPrikaz = document.getElementsByClassName("broj-prikaza")[0].value;

  brojStranica = Math.ceil(brojRedova / izabraniPrikaz);

  document.getElementById("broj-stranice").innerHTML = brojStranica;

  let tabelaRedovi = document.getElementById("tabelaBody");
  tabelaRedovi.querySelector("tr").style.display = "none";
  paginationDugmad(brojStranica);

  let trenutnaStranica =
    document.getElementsByClassName("dugmad-strana")[0].children[1].innerHTML;

  prikazRedova(trenutnaStranica);
}

// Funkcija paginacija
function paginationDugmad(brojStranica) {
  let dugmad = document.getElementsByClassName("dugmad-strana")[0];

  let sljedeca = dugmad.children[0];
  let stranica = dugmad.children[1];
  let prethodna = dugmad.children[2];

  if (stranica.innerHTML > 1) {
    prethodna.style.display = "flex";
  } else {
    prethodna.style.display = "none";
  }

  if (brojStranica > 1) {
    sljedeca.style.display = "flex";
  } else {
    sljedeca.style.display = "none";
  }
}

let dugmad = document.getElementsByClassName("dugmad-strana")[0];

let sljedeca = dugmad.children[0];
let stranica = dugmad.children[1];
let prethodna = dugmad.children[2];

prethodna.addEventListener("click", function (e) {
  let trenutnaStranica =
    document.getElementsByClassName("dugmad-strana")[0].children[1].innerHTML;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (trenutnaStranica > 1) {
    stranica.innerHTML--;
    trenutnaStranica--;
  }

  if (trenutnaStranica > 1) {
    prethodna.style.display = "flex";
  } else {
    prethodna.style.display = "none";
  }

  if (brojStranica > 1) {
    sljedeca.style.display = "flex";
  } else {
    sljedeca.style.display = "none";
  }
  prikazRedova(trenutnaStranica);
});

sljedeca.addEventListener("click", function (e) {
  let trenutnaStranica =
    document.getElementsByClassName("dugmad-strana")[0].children[1].innerHTML;
  e.preventDefault();
  if (trenutnaStranica < brojStranica) {
    stranica.innerHTML++;
    trenutnaStranica++;
  }

  if (trenutnaStranica > 1) {
    prethodna.style.display = "flex";
  } else {
    prethodna.style.display = "none";
  }

  if (brojStranica > 1 && trenutnaStranica < brojStranica) {
    sljedeca.style.display = "flex";
  } else {
    sljedeca.style.display = "none";
  }
  prikazRedova(trenutnaStranica);
});

function prikazRedova(stranica) {
  let izabraniPrikaz = document.getElementsByClassName("broj-prikaza")[0].value;
  let zadnjiRed = stranica * izabraniPrikaz;
  let prviRed = zadnjiRed - izabraniPrikaz;

  let tabelaRedovi = document
    .getElementById("tabelaBody")
    .querySelectorAll("tr");

  for (let index = 0; index < tabelaRedovi.length; index++) {
    const red = tabelaRedovi[index];

    if (index >= prviRed && index < zadnjiRed) {
      red.style.display = "table-row";
    } else {
      red.style.display = "none";
    }
  }
}

document
  .getElementsByClassName("broj-prikaza")[0]
  .addEventListener("change", function (e) {
    let trenutnaStranica =
      document.getElementsByClassName("dugmad-strana")[0].children[1].innerHTML;
    prikazRedova(trenutnaStranica);

    let izabraniPrikaz =
      document.getElementsByClassName("broj-prikaza")[0].value;
    brojStranica = Math.ceil(brojRedova / izabraniPrikaz);
    document.getElementById("broj-stranice").innerHTML = brojStranica;
    paginationDugmad(brojStranica);
  });
