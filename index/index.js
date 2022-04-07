"use strict";

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

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
spremiKreirajRed.addEventListener("click", function (e) {
  kreirajRed(sadrzajModal.value, datumModal.value);
});

function kreirajRed(biljeska, datum, spremiStorage = true, dbID = false) {
  const tabelaBody = document.getElementById("tabelaBody");

  //let brojacReda = tabelaBody.rows.length;
  //let brojacKolona = tabelaBody.rows[1].cells.length
  if (biljeska == "") {
    ispisiPoruku("Polje unosa bilješke mora biti ispunjeno.");
    return 0;
  }

  let editRow = false;
  let rowIndex = 0;
  let editId = document.getElementById("edit-row-id");

  if (editId && editId.value != "") {
    editRow = editId.value;
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

  let uniqueID = dbID === false ? Math.random() * 10 : dbID;

  let tabelaRed = tabelaBody.insertRow(rowIndex);
  tabelaRed.setAttribute("id", uniqueID);

  let kolona1 = tabelaRed.insertCell(0);
  let kolona2 = tabelaRed.insertCell(1);
  let kolona3 = tabelaRed.insertCell(2);

  kolona1.innerHTML =
    '<textarea type="text" class="unosteksta"  disabled style ="color : black">' +
    biljeska +
    "</textarea>";
  ///////////////////////////////
  if (spremiStorage) {
    let biljeskaLokal = localStorage.getItem("biljeskaLokal");

    if (biljeskaLokal == null) {
      console.warn(biljeskaLokal);
      biljeskaLokal = [];
    } else {
      biljeskaLokal = JSON.parse(biljeskaLokal);
    }

    biljeskaLokal.insert(rowIndex, {
      biljeska: biljeska,
      datum: datum,
      uniqueID: uniqueID,
    });

    for (let index = 0; index < biljeskaLokal.length; index++) {
      const biljeskaBaza = biljeskaLokal[index]; //editRow

      if (biljeskaBaza.uniqueID == editRow) {
        biljeskaLokal.remove(index);
      }
    }

    localStorage.setItem("biljeskaLokal", JSON.stringify(biljeskaLokal));
  }

  /////
  kolona2.innerHTML = datum;
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
        let target = e.target;

        let biljeskaLokal = localStorage.getItem("biljeskaLokal");

        if (biljeskaLokal == null) {
          biljeskaLokal = [];
        } else {
          biljeskaLokal = JSON.parse(biljeskaLokal);
        }

        for (let index = 0; index < biljeskaLokal.length; index++) {
          const biljeskaBaza = biljeskaLokal[index]; //editRow

          if (biljeskaBaza.uniqueID == target.dataset.rowId) {
            biljeskaLokal.remove(index);
          }
        }
        localStorage.setItem("biljeskaLokal", JSON.stringify(biljeskaLokal));

        target.parentNode.parentNode.parentNode.remove();
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
let brojRedova = document
  .getElementById("tabelaBody")
  .querySelectorAll("tr:not(.hidden)");

document
  .getElementById("tabelaBody")
  .addEventListener("DOMSubtreeModified", function (e) {
    let tempBrojRedova = document
      .getElementById("tabelaBody")
      .querySelectorAll("tr:not(.hidden)").length;

    if (tempBrojRedova !== brojRedova) {
      brojRedova = tempBrojRedova;
      pagination();
    }
  });

let brojStranica;

///////
function pagination(brojRedovaUlaz = false) {
  brojRedovaUlaz = brojRedovaUlaz === false ? brojRedova : brojRedovaUlaz;
  let izabraniPrikaz = document.getElementsByClassName("broj-prikaza")[0].value;

  brojStranica = Math.ceil(brojRedovaUlaz / izabraniPrikaz);

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
    .querySelectorAll("tr:not(.hidden)");

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

/// Funkcija pretrazivanja

let drugoDodaj = document.getElementById("dodajTabelu");

//drugoDodaj.onclick = ucitajPodatkeLokal();
drugoDodaj.addEventListener("click", function () {
  modal.style.display = "flex";
  datumModal.value = preuzmiDatum();
});
function ucitajPodatkeLokal() {
  let sadrzajBiljeske = localStorage.getItem("biljeskaLokal");

  if (sadrzajBiljeske !== null) {
    sadrzajBiljeske = JSON.parse(sadrzajBiljeske).reverse();

    for (let i = 0; i < sadrzajBiljeske.length; i++) {
      const data = sadrzajBiljeske[i];

      kreirajRed(data.biljeska, data.datum, false, data.uniqueID);

      //console.log("Bilješka: " + data.biljeska + " Datum: " + data.datum);
    }
  }
}

document.addEventListener("DOMContentLoaded", ucitajPodatkeLokal);

document
  .querySelector('input[type="search"]')
  .addEventListener("keyup", function (e) {
    let value = e.target.value;

    let htmlred = tabelaBody.querySelectorAll("tr");
    for (let i = 0; i < htmlred.length; i++) {
      const red = htmlred[i];
      red.classList.remove("hidden");
    }

    htmlred = tabelaBody.querySelectorAll("tr:not(.hidden)");
    //console.log(redovi[0].biljeska);

    for (let i = 0; i < htmlred.length; i++) {
      const red = htmlred[i];
      const note = red.querySelector("textarea").value;

      if (value == "") {
        red.classList.remove("hidden");
        continue;
      }

      if (!note.includes(value)) {
        red.classList.add("hidden");
      } else {
        red.classList.remove("hidden");
      }
    }
    let tempBrojRedova = document
      .getElementById("tabelaBody")
      .querySelectorAll("tr:not(.hidden)").length;
    pagination(tempBrojRedova);
  });
