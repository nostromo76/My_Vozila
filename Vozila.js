class Korisnik {
    constructor(vlasnik, auto, tablice, godiste, kilometraza, DatumUlaska, DatumIzlaska) {
        this.vlasnik = vlasnik;
        this.auto = auto;
        this.tablice = tablice;
        this.godiste = godiste;
        this.kilometraza = kilometraza;
        this.DatumUlaska = DatumUlaska;
        this.DatumIzlaska = DatumIzlaska;
    }
}

function racunajGodiste(date) {
    const sada = new Date();
    const godinaProizvodnje = new Date(date);
    const godisteAuta = sada.getFullYear() - godinaProizvodnje.getFullYear();
    const m = sada.getMonth() - godinaProizvodnje.getMonth();
    if (m < 0 || (m === 0 && sada.getDate() < godinaProizvodnje.getDate())) {
        godisteAuta--;
    }
    return godisteAuta;
}

function racunajStarostVozila(godiste, kilometraza) {
    const sada = new Date();
    const godisteAuta = sada.getFullYear() - godiste;
    if (godiste > sada.getFullYear() || kilometraza < 0) {
        return "Invalid input";
    } else if (godisteAuta > sada.getFullYear() - 3 || (godisteAuta === sada.getFullYear() - 3 && kilometraza < 50000)) {
        return "Nov";
    } else if (godisteAuta > sada.getFullYear() - 10 || (godisteAuta === sada.getFullYear() - 10 && kilometraza < 150000)) {
        return "Srednje star u dobrom stanju";
    } else {
        return "Star";
    }
}

let korisnik = new Korisnik();
let kategorija = racunajStarostVozila(korisnik.godiste, korisnik.kilometraza);

console.log(kategorija);
class Parking {
    constructor() {
        this.korisnici = [];
    }

    //  pogresneTablice = (tablice) => {
    //     const regexRegistarskeTablice = /^[A-Z]{2}-\d{3,4}-[A-Z]{2}$/i;
    //     return regexRegistarskeTablice.test(tablice);
    // };


    dodajKorisnika(vlasnik, auto, tablice, godiste, kilometraza, DatumUlaska, DatumIzlaska) {
        let tabliceRegex = /^[A-Z]{2}-\d{3,4}-[A-Z]{2}$/i;
        if (vlasnik === '' || auto === '' || tablice == '' || godiste === '' || kilometraza === '' || DatumUlaska === '' || DatumIzlaska === '') {
            error.innerHTML = 'Sva polja moraju biti popunjena!', 'danger';
        } else if (!tabliceRegex.test(tablice)) {
            error.innerHTML = `Tablice moraju biti u formatu XX-123-YY ili AA-1234-BB`, `danger`;
            return false;
        } else if (DatumIzlaska < DatumUlaska) {
            error.innerHTML = 'Datum izlaska ne može biti manji od datuma ulaska', 'danger';


        } else {
            const korisnik = new Korisnik(vlasnik, auto, tablice, godiste, kilometraza, DatumUlaska, DatumIzlaska);
            this.korisnici.push(korisnik);
            this.sacuvajParking();
            this.resetForm();
        }
    }

    izmeniKorisnika(index) {
        const korisnik = this.korisnici[index];
        vlasnik.value = korisnik.vlasnik;
        auto.value = korisnik.auto;
        tablice.value = korisnik.tablice;
        godiste.value = korisnik.godiste;
        kilometraza = korisnik.kilometraza;
        DatumUlaska.value = korisnik.DatumUlaska;
        DatumIzlaska.value = korisnik.DatumIzlaska;
        dugme.textContent = "IZMENI";
        dugme.setAttribute("tablice", index);
    }

    sacuvajIzmene(index) {
        const korisnik = this.korisnici[index];
        korisnik.vlasnik = vlasnik.value;
        korisnik.auto = auto.value;
        korisnik.tablice = tablice.value;
        korisnik.godiste = godiste.value;
        korisnik.kilometraza = kilometraza.value;
        korisnik.DatumUlaska = DatumUlaska.value;
        korisnik.DatumIzlaska = DatumIzlaska.value;
        this.sacuvajParking();
        this.resetForm();
    }

    izbrisiKorisnika(index) {
        this.korisnici.splice(index, 1);
        this.sacuvajParking();
    }

    ucitajParking() {
        const parkingData = JSON.parse(localStorage.getItem("parking"));
        if (parkingData) {
            this.korisnici = parkingData.map(
                (data) => new Korisnik(data.vlasnik, data.auto, data.tablice, data.godiste, data.kilometraza, data.DatumUlaska, data.DatumIzlaska)
            );
        }
    }

    sacuvajParking() {
        localStorage.setItem("parking", JSON.stringify(this.korisnici));
        this.prikaziKorisnike();
    }

    // prikaziKorisnike() {
    //     let korisniciHTML = "";
    //     for (let i = 0; i < this.korisnici.length; i++) {
    //         const korisnik = this.korisnici[i];
    //         korisniciHTML += `${korisnik.vlasnik} ${korisnik.auto} ${korisnik.tablice} ${korisnik.DatumUlaska} 
    //         ${korisnik.DatumIzlaska}<button onclick ="parking.izmeniKorisnika(${i})">Izmeni</button>
    //         <button onclick ="parking.izbrisiKorisnika(${i})">Izbriši</button><br />`;
    //     }
    //     rez.innerHTML = korisniciHTML;
    // }

    prikaziKorisnike() {
        let korisniciHTML = "";
        for (let i = 0; i < this.korisnici.length; i++) {
            const korisnik = this.korisnici[i];
        
            //const kategorija = racunajStarostVozila(korisnik.godiste, korisnik.kilometraza);
            korisniciHTML += `
             <tr><td>${korisnik.vlasnik}</td>
             <td>${korisnik.auto}</td>
             <td>${korisnik.tablice}</td>
             <td>${korisnik.DatumUlaska}</td>
            <td>${korisnik.DatumIzlaska}</td>
            <td>${kategorija}</td>
            <td> <button onclick="parking.izmeniKorisnika(${i})">Izmeni</button>
            <button onclick="parking.izbrisiKorisnika(${i})">Izbriši</button></td></tr>`;
        }
        rez.innerHTML = korisniciHTML;
    }

    resetForm() {
        dugme.textContent = "Potvrdi";
        dugme.removeAttribute("name");
        vlasnik.value = "";
        auto.value = "";
        tablice.value = "";
        godiste.value = "";
        kilometraza.value = "";
        DatumUlaska.value = "";
        DatumIzlaska.value = "";
    }
}

let vlasnik = document.getElementById("vlasnik");
let auto = document.getElementById("auto");
let tablice = document.getElementById("tablice");
let godiste=document.getElementById("godiste");
let kilometraza=document.getElementById("kilometraza");
let DatumUlaska = document.getElementById("DatumUlaska");
let DatumIzlaska = document.getElementById("DatumIzlaska");
let rez = document.getElementById("rezultat");
let error = document.getElementById("greska");
const dugme = document.getElementById("submit");
const parking = new Parking();
parking.ucitajParking();
if (parking.korisnici.length > 0) {
    parking.prikaziKorisnike();
}
dugme.addEventListener("click", () => {
    if (dugme.textContent === "Potvrdi") {
        parking.dodajKorisnika(vlasnik.value, auto.value, tablice.value,godiste,kilometraza, DatumUlaska.value, DatumIzlaska.value);
    } else if (dugme.textContent === "IZMENI") {
        const index = parseInt(dugme.getAttribute("tablice"));
        parking.sacuvajIzmene(index);
    }
});