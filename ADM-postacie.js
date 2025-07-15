let submit = document.querySelector('#submit');

submit.addEventListener('click', (e) => {
    e.preventDefault();

    // 1. Sprawdzenie czy wszystkie pola są wypełnione
    // Lista pól do sprawdzenia z nazwami do alertu
    const fieldsToCheck = [
        { id: 'imie', name: 'Imię' },
        { id: 'pelna_nazwa', name: 'Pełna nazwa' },
        { id: 'rasa', name: 'Rasa' },
        { id: 'plec', name: 'Płeć' },
        { id: 'wiek', name: 'Wiek' },
        { id: 'klasa', name: 'Klasa' },
        { id: 'pseudonimy', name: 'Pseudonimy' },
        { id: 'fakcje', name: 'Fakcje' },
        { id: 'ranga', name: 'Ranga' },
        { id: 'narodowosc', name: 'Narodowość' },
        { id: 'wiara', name: 'Wiara' },
        { id: 'data_urodzenia', name: 'Data urodzenia' },
        { id: 'miejsce_urodzenia', name: 'Miejsce urodzenia' },
        { id: 'data_smierci', name: 'Data śmierci' },
        { id: 'miejsce_smierci', name: 'Miejsce śmierci' },

        { id: 'wzrost', name: 'Wzrost' },
        { id: 'waga', name: 'Waga' },
        { id: 'kolor_skory', name: 'Kolor skóry' },
        { id: 'rodzaj_wlosow', name: 'Rodzaj włosów' },
        { id: 'kolor_wlosow', name: 'Kolor włosów' },
        { id: 'kolor_oczu', name: 'Kolor oczu' },
        { id: 'blizny', name: 'Blizny' },
        { id: 'cechy', name: 'Cechy szczególne' },
        { id: 'sila', name: 'Siła' },
        { id: 'zrecznosc', name: 'Zwinność' },
        { id: 'kondycja', name: 'Kondycja' },
        { id: 'zdrowie', name: 'Zdrowie' },
        { id: 'energia', name: 'Energia' },
        { id: 'uroda', name: 'Uroda' },

        { id: 'historia', name: 'Historia' },
    ];

    let emptyFields = [];

    for (let field of fieldsToCheck) {
        const el = document.getElementById(field.id);
        if (!el) continue;

        let val = el.value;
        if (val === null || val.trim() === '') {
            emptyFields.push(field.name);
        }
    }

    if (emptyFields.length > 0) {
        alert('Proszę wypełnić następujące pola:\n- ' + emptyFields.join('\n- '));
        return;
    }

    // Sprawdzenie pola wiek
    const wiekInput = document.querySelector('#wiek');
    const wiekValue = parseInt(wiekInput.value, 10);

    if (isNaN(wiekValue) || wiekValue < 0) {
        alert('Wiek nie może być mniejszy niż 0 (ani pusty lub niepoprawny). Pole zostało zresetowane.');
        wiekInput.value = '';
        return; // Przerwij dalsze działanie
    }

    // 1. Lista statystyk z ich opisami (do alertu)
    const statMap = {
        sila: 'Siła',
        zrecznosc: 'Zręczność',
        kondycja: 'Kondycja',
        zdrowie: 'Zdrowie',
        energia: 'Energia',
        uroda: 'Uroda',
    };

    let bledneStatystyki = [];

    // 2. Sprawdź każdą statystykę
    for (let id in statMap) {
        const input = document.querySelector(`#${id}`);
        const value = parseInt(input.value, 10);

        if (isNaN(value) || value < 0 || value > 10) {
            bledneStatystyki.push(statMap[id]); // dodaj do listy alertu
            input.value = ''; // zresetuj tylko to pole
        }
    }

    // 3. Jeśli coś jest nie tak — alert i return
    if (bledneStatystyki.length > 0) {
        alert(`Błędne statystyki (muszą być liczbami 0-10):\n- ${bledneStatystyki.join('\n- ')}`);
        return;
    }

    // Dalej Twój kod (generowanie JSON itd)...

    let klasy = document.querySelector('#klasa').value;
    let tabklasy = klasy
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== '');

    let pseudonimy = document.querySelector('#pseudonimy').value;
    let tabpseudonimy = pseudonimy
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== '');

    let fakcje = document.querySelector('#fakcje').value; // poprawione - było '#klasa'
    let tabfakcje = fakcje
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s !== '');

    let Postac = {
        PodstawoweInfo: {
            Imie: document.querySelector('#imie').value,
            PelnaNazwa: document.querySelector('#pelna_nazwa').value,
            Rasa: document.querySelector('#rasa').value,
            Plec: document.querySelector('#plec').value == 1 ? 'Mężczyzna' : 'Kobieta',
            Wiek: document.querySelector('#wiek').value,
            Klasa: tabklasy,
            Pseudonimy: tabpseudonimy,
            Fakcje: tabfakcje,
            Ranga: document.querySelector('#ranga').value,
            Narodowosc: document.querySelector('#narodowosc').value,
            Wiara: document.querySelector('#wiara').value,
            DataUrodzenia: document.querySelector('#data_urodzenia').value,
            MiejsceUrodzenia: document.querySelector('#miejsce_urodzenia').value, // poprawione
            DataSmierci: document.querySelector('#data_smierci').value,
            MiejsceSmierci: document.querySelector('#miejsce_smierci').value, // poprawione
        },
        InfoOCiele: {
            Wzrost: document.querySelector('#wzrost').value,
            Waga: document.querySelector('#waga').value,
            KolorSkory: document.querySelector('#kolor_skory').value,
            RodzajWlosow: document.querySelector('#rodzaj_wlosow').value,
            KolorWlosow: document.querySelector('#kolor_wlosow').value,
            KolorOczu: document.querySelector('#kolor_oczu').value,
            Blizny: document.querySelector('#blizny').value,
            CechySzczegolne: document.querySelector('#cechy').value,
            Sila: document.querySelector('#sila').value,
            Zwinnosc: document.querySelector('#zrecznosc').value,
            Kondycja: document.querySelector('#kondycja').value,
            Zdrowie: document.querySelector('#zdrowie').value,
            Energia: document.querySelector('#energia').value, // poprawione, było '#zdrowie'
            Uroda: document.querySelector('#uroda').value,
        },
        Historia: document.querySelector('#historia').value,
    };

    const jsonData = JSON.stringify(Postac, null, 2);
    const blob = new Blob(['\uFEFF' + jsonData], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    let tabchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let word = tabchar[Math.floor(Math.random() * 52)];
    for (let i = 0; i < 7; i++) {
        word += tabchar[Math.floor(Math.random() * tabchar.length)];
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = `Postac-${word}.json`;
    a.click();

    URL.revokeObjectURL(url);
});

let reset = document.querySelector('#reset');

reset.addEventListener('click', (e) => {
    e.preventDefault();
    const potwierdzenie = confirm('Czy na pewno chcesz zresetować wszystkie pola?');

    if (potwierdzenie) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });

        const selects = document.querySelectorAll('select');
        selects.forEach((select) => {
            select.selectedIndex = 0;
        });

        const textareas = document.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
            textarea.value = '';
        });
    }
});
