const submit = document.querySelector('#submit');
const add = document.querySelector('#add');
const reset = document.querySelector('#reset');

const eraSelect = document.querySelector('#era');
const rokInput = document.querySelector('#rok');
const eventInput = document.querySelector('#event');
const opisInput = document.querySelector('#opis');

let jsonfile = {};
add.addEventListener('click', (e) => {
    e.preventDefault();

    const era = eraSelect.value;
    const rok = rokInput.value.trim();
    const wydarzenie = eventInput.value.trim();
    const opis = opisInput.value.trim();

    if (rok === '') {
        alert('Pole "Rok" nie może być puste!');
        return;
    }

    const rokValue = parseInt(rok, 10);
    if (isNaN(rokValue) || rokValue < 0) {
        alert('Pole "Rok" musi być liczbą dodatnią!');
        return;
    }

    if (wydarzenie === '' || opis === '') {
        alert('Aby dodać wydarzenie, wypełnij zarówno pole "Wydarzenie", jak i "Opis".');
        return;
    }

    eraSelect.disabled = true;
    rokInput.disabled = true;

    if (!jsonfile[rok]) {
        jsonfile[rok] = [];
    }

    jsonfile[rok].push({
        wydarzenie: wydarzenie,
        opis: opis,
    });

    eventInput.value = '';
    opisInput.value = '';

    console.log(jsonfile);
});

function exportJSON() {
    const jsonData = JSON.stringify(jsonfile, null, 2);
    const blob = new Blob(['\uFEFF' + jsonData], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    let tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let fileName = `Wydarzenia-${document.querySelector('#era').value}-`;
    for (let i = 0; i < 7; i++) {
        fileName += tab[Math.floor(Math.random() * tab.length)];
    }
    fileName += '.json';

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
}

submit.addEventListener('click', (e) => {
    e.preventDefault();

    const era = document.querySelector('#era').value;
    const rok = document.querySelector('#rok').value.trim();
    const wydarzenie = document.querySelector('#event').value.trim();
    const opis = document.querySelector('#opis').value.trim();

    if (!era || !rok) {
        alert('Proszę wybrać erę i podać rok.');
        return;
    }

    const rokValue = parseInt(rok, 10);
    if (isNaN(rokValue) || rokValue < 0) {
        alert('Wartość pola "Rok" musi być liczbą dodatnią.');
        return;
    }

    const czyWydarzeniePuste = wydarzenie === '';
    const czyOpisPusty = opis === '';

    if (czyWydarzeniePuste && czyOpisPusty) {
        exportJSON();
        return;
    }

    if ((czyWydarzeniePuste && !czyOpisPusty) || (!czyWydarzeniePuste && czyOpisPusty)) {
        alert('Jeśli wpisujesz wydarzenie lub opis, oba pola muszą być uzupełnione.');
        return;
    }

    if (!jsonfile[rok]) {
        jsonfile[rok] = [];
    }

    jsonfile[rok].push({
        wydarzenie: wydarzenie,
        opis: opis,
    });

    exportJSON();

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        input.value = '';
        input.disabled = false;
    });

    const selects = document.querySelectorAll('select');
    selects.forEach((select) => {
        select.selectedIndex = 0;
        select.disabled = false;
    });

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
        textarea.value = '';
        textarea.disabled = false;
    });

    jsonfile = {};

    console.log('Formularz zresetowany');
});

reset.addEventListener('click', (e) => {
    e.preventDefault();

    const potwierdzenie = confirm('Czy na pewno chcesz zresetować wszystkie pola?');

    if (potwierdzenie) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            input.value = '';
            input.disabled = false;
        });

        const selects = document.querySelectorAll('select');
        selects.forEach((select) => {
            select.selectedIndex = 0;
            select.disabled = false;
        });

        const textareas = document.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
            textarea.value = '';
            textarea.disabled = false;
        });

        jsonfile = {};

        console.log('Formularz zresetowany');
    }
});
