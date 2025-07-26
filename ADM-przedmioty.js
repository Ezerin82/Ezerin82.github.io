let submit = document.querySelector('#submit');

submit.addEventListener('click', (e) => {
    e.preventDefault();

    const fieldsToCheck = [
        { id: 'nazwa', name: 'Nazwa' },
        { id: 'owner', name: 'Właściciel' },
        { id: 'typ', name: 'Typ' },
        { id: 'waga', name: 'Waga' },
        { id: 'opis', name: 'Opis' },
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

    const wagaValue = parseFloat(document.querySelector('#waga').value);
    if (isNaN(wagaValue) || wagaValue < 0) {
        alert('Waga nie może być mniejsza niż 0 ani niepoprawna. Pole zostało zresetowane.');
        document.querySelector('#waga').value = '';
        return;
    }

    let Przedmiot = {
        Nazwa: document.querySelector('#nazwa').value,
        Owner: document.querySelector('#owner').value,
        Typ: document.querySelector('#typ').value,
        Waga: document.querySelector('#waga').value,
        Opis: document.querySelector('#opis').value,
    };

    const jsonData = JSON.stringify(Przedmiot, null, 2);
    const blob = new Blob(['\uFEFF' + jsonData], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    let tabchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let word = tabchar[Math.floor(Math.random() * 52)];
    for (let i = 0; i < 7; i++) {
        word += tabchar[Math.floor(Math.random() * tabchar.length)];
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = `Przedmiot-${word}.json`;
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
            input.value = '';
        });

        const textareas = document.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
            textarea.value = '';
        });
    }
});
